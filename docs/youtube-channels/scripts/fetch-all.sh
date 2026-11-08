#!/bin/zsh
# 다섯 채널의 일반 영상 전체 자막을 천천히 받는다 (2026-11-08).
# - 원래 언어 자막만: 수동 ko·fr이 있으면 그것, 없으면 자동 fr-orig·ko-orig. 자동 번역 자막은 받지 않는다(429 원인).
# - 간격: 요청 5초, 자막 10초, 영상 사이 15초.
# - 막히면(429 등) 30분 → 2시간 쉬고 이어 받는다. 세 번째로 막히면 멈춘다.
# - 이미 받은 영상(meta.tsv에 있는 것)은 건너뛴다. 다시 돌리면 이어서 받는다.
# - 출처: raw/<채널>/meta.tsv 에 영상ID·제목·올라온 날짜·길이·받은 날짜·자막 종류를 남긴다.
R=${0:A:h:h}/raw
typeset -A chan
chan=(frenchfacile UCtxBWjnaPiqR89Jg9y84_eA
shylavie UCaZHA5I48HA-PmwsfKNtf3g
dailylang UCiP--SK_DhpoZkdBfljpEUA
hanspoon UCGQVDv18ELo1HUOc3LXp6Hg
hazel UCFthmtoPYUgvCUrxtM3ID9A)
order=(frenchfacile shylavie dailylang hanspoon hazel)
blocks=0
blocked() { echo "$1" | grep -qiE "HTTP Error 429|Sign in to confirm|rate.limit" }
on_block() {
  blocks=$((blocks + 1))
  echo "$(date '+%F %T') BLOCKED($blocks) $1"
  if [ $blocks -ge 3 ]; then echo "STOP 세 번째로 막혀 멈춘다"; exit 1; fi
  if [ $blocks -eq 1 ]; then sleep 1800; else sleep 7200; fi
}
today=$(date +%F)
for ch in $order; do
  D=$R/$ch; mkdir -p $D
  M=$D/meta.tsv
  [ -s $M ] || printf "id\ttitle\tupload_date\tduration\tfetched\tsubs\n" > $M
  yt-dlp --flat-playlist --print "%(id)s" "https://www.youtube.com/channel/${chan[$ch]}/videos" > $D/all-ids.txt 2>/dev/null
  sleep 6
  for v in $(cat $D/all-ids.txt); do
    grep -q "^$v	" $M && continue
    while true; do
      J=$D/$v.info.json
      out=$(yt-dlp --skip-download --write-info-json --sleep-requests 5 -o "$D/%(id)s.%(ext)s" "https://www.youtube.com/watch?v=$v" 2>&1)
      if blocked "$out"; then rm -f $J; on_block "info $ch $v"; continue; fi
      break
    done
    if [ ! -s $J ]; then printf "%s\t?\t?\t?\t%s\tinfo-error\n" $v $today >> $M; echo "ERR info $ch $v"; sleep 15; continue; fi
    sleep 8
    man=$(jq -r '(.subtitles//{}) | keys[] | select(test("^(ko|fr)([-_].*)?$")) | select(test("live_chat")|not)' $J | paste -sd, -)
    auto=$(jq -r '(.automatic_captions//{}) | keys[] | select(test("^(ko|fr).*-orig$"))' $J | paste -sd, -)
    if [ -n "$man" ]; then args=(--write-subs --sub-langs "$man"); kind="manual:$man"
    elif [ -n "$auto" ]; then args=(--write-auto-subs --sub-langs "$auto"); kind="auto:$auto"
    else args=(); kind="none:$(jq -r '(.automatic_captions//{}) | keys[] | select(test("-orig$"))' $J | paste -sd, -)"; fi
    if [ ${#args} -gt 0 ]; then
      while true; do
        out=$(yt-dlp --load-info-json $J --skip-download $args --sub-format vtt --sleep-requests 5 --sleep-subtitles 10 -o "$D/%(id)s.%(ext)s" 2>&1)
        if blocked "$out"; then on_block "subs $ch $v"; continue; fi
        break
      done
    fi
    jq -r --arg f $today --arg k "$kind" '[.id, (.title|gsub("\t";" ")), .upload_date, (.duration|tostring), $f, $k] | @tsv' $J >> $M
    rm -f $J
    echo "$(date '+%T') DONE $ch $v $kind"
    sleep 15
  done
  echo "$(date '+%F %T') CHANNEL-DONE $ch"
done
echo "$(date '+%F %T') ALLDONE"
