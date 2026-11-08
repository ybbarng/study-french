#!/bin/zsh
# 매주 새로 올라온 영상의 자막만 받는다 (서버 cron용, 2026-11-08).
# 채널 목록 = ../channels.tsv (collect=weekly인 줄). 채널을 더하거나 빼려면 그 파일만 고친다.
# 받는 것은 자막과 영상 정보뿐(--skip-download). 영상·음성은 받지 않는다.
# - 원래 언어 자막만: 수동 ko·fr, 없으면 자동 fr-orig·ko-orig. 자동 번역 자막은 받지 않는다(429 원인).
# - 간격: 요청 5초, 자막 10초, 영상 사이 15초. 채널마다 최근 MAX_PER_CHANNEL편까지만 본다.
# - 막히면(429·로봇 확인) 그 회차는 바로 멈추고 종료 코드 2. 다음 회차에 이어 받는다.
# - 출처: raw/<채널>/meta.tsv 에 영상ID·제목·올라온 날짜·길이·받은 날짜·자막 종류.
# 사용: fetch-new.sh  (끝에 요약 한 줄: NEW=<받은 수> BLOCKED=<0|1>)
set -u
BASE=${0:A:h:h}
R=$BASE/raw
MAX_PER_CHANNEL=${MAX_PER_CHANNEL:-30}
today=$(date +%F)
new=0
blocked() { echo "$1" | grep -qiE "HTTP Error 429|Sign in to confirm|rate.limit" }
stop_blocked() { echo "$(date '+%F %T') BLOCKED $1"; echo "NEW=$new BLOCKED=1"; exit 2 }

tail -n +2 $BASE/channels.tsv | while IFS=$'\t' read -r key cid name collect; do
  [ "$collect" = "weekly" ] || continue
  D=$R/$key; mkdir -p $D
  M=$D/meta.tsv
  [ -s $M ] || printf "id\ttitle\tupload_date\tduration\tfetched\tsubs\n" > $M
  ids=$(yt-dlp --flat-playlist --playlist-end $MAX_PER_CHANNEL --print "%(id)s" "https://www.youtube.com/channel/$cid/videos" 2>&1)
  blocked "$ids" && stop_blocked "list $key"
  sleep 6
  for v in ${(f)ids}; do
    [[ $v == *" "* ]] && continue
    grep -q "^$v	" $M && continue
    J=$D/$v.info.json
    out=$(yt-dlp --skip-download --write-info-json --sleep-requests 5 -o "$D/%(id)s.%(ext)s" "https://www.youtube.com/watch?v=$v" 2>&1)
    if blocked "$out"; then rm -f $J; stop_blocked "info $key $v"; fi
    if [ ! -s $J ]; then echo "ERR info $key $v"; sleep 15; continue; fi
    sleep 8
    man=$(jq -r '(.subtitles//{}) | keys[] | select(test("^(ko|fr)([-_].*)?$")) | select(test("live_chat")|not)' $J | paste -sd, -)
    auto=$(jq -r '(.automatic_captions//{}) | keys[] | select(test("^(ko|fr).*-orig$"))' $J | paste -sd, -)
    if [ -n "$man" ]; then args=(--write-subs --sub-langs "$man"); kind="manual:$man"
    elif [ -n "$auto" ]; then args=(--write-auto-subs --sub-langs "$auto"); kind="auto:$auto"
    else args=(); kind="none:$(jq -r '(.automatic_captions//{}) | keys[] | select(test("-orig$"))' $J | paste -sd, -)"; fi
    if [ ${#args} -gt 0 ]; then
      out=$(yt-dlp --load-info-json $J --skip-download $args --sub-format vtt --sleep-requests 5 --sleep-subtitles 10 -o "$D/%(id)s.%(ext)s" 2>&1)
      if blocked "$out"; then rm -f $J; stop_blocked "subs $key $v"; fi
    fi
    jq -r --arg f $today --arg k "$kind" '[.id, (.title|gsub("\t";" ")), .upload_date, (.duration|tostring), $f, $k] | @tsv' $J >> $M
    rm -f $J
    new=$((new + 1))
    echo "$(date '+%T') DONE $key $v $kind"
    sleep 15
  done
done
echo "NEW=$new BLOCKED=0"
