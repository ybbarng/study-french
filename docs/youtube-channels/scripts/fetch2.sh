#!/bin/zsh
D=/private/tmp/claude-504/-Users-ybbarng-personal-projects-study-french/0f2ae8de-1d2a-4320-a7aa-2b42899a9eff/scratchpad/yt-pilot
typeset -A pick
pick=(dailylang "Sr6182ky0qk OL6d7SVlWpI jXJpGkGSUJU RrvUA8-FFf8 4iRVk_APy04"
hazel "DMAW3v51vYY twWX5nXtNkg 9_krzbaAkjI KYjslXVnXGU 843l59sffpY"
shylavie "cwMCMFqfReY gj2OMxPuMcU e7IDNiUX8H8 J_k3lFVV6Ac 7F185t0SOxM"
hanspoon "U4AgcYkDnwA G3pWqwaWl8o _CLf2ZlYOY0 QGk3nDpZzlo AEd9-9aqouE"
frenchfacile "MVtMfZ35APo cSedKCsn0hk nU3c5sayEGI wXXVuwp0DKo icsBFJp9nLE")
blocked() { echo "$1" | grep -qiE "HTTP Error 429|Sign in to confirm" }
for ch in dailylang hazel shylavie hanspoon frenchfacile; do
  for v in ${=pick[$ch]}; do
    J=$D/$ch/$v.info.json
    if [ ! -s $J ]; then
      out=$(yt-dlp --skip-download --write-info-json --sleep-requests 5 -o "$D/$ch/%(id)s.%(ext)s" "https://www.youtube.com/watch?v=$v" 2>&1)
      echo "$out" > $D/$ch/$v.info.log
      if blocked "$out"; then echo "BLOCKED info $ch $v"; exit 1; fi
      sleep 8
    fi
    man=$(jq -r '(.subtitles//{}) | keys[] | select(test("^(ko|fr)([-_].*)?$")) | select(test("live_chat")|not)' $J | paste -sd, -)
    auto=$(jq -r '(.automatic_captions//{}) | keys[] | select(test("^(ko|fr).*-orig$"))' $J | paste -sd, -)
    echo "$v manual=[$man] autoorig=[$auto]" >> $D/$ch/subs-choice.txt
    if ls $D/$ch/$v.*.vtt >/dev/null 2>&1; then echo "SKIP-have $ch $v"; continue; fi
    if [ -n "$man" ]; then args=(--write-subs --sub-langs "$man")
    elif [ -n "$auto" ]; then args=(--write-auto-subs --sub-langs "$auto")
    else echo "NOSUBS $ch $v"; sleep 15; continue; fi
    out=$(yt-dlp --load-info-json $J --skip-download $args --sub-format vtt --sleep-requests 5 --sleep-subtitles 10 -o "$D/$ch/%(id)s.%(ext)s" 2>&1)
    echo "$out" > $D/$ch/$v.subs.log
    if blocked "$out"; then echo "BLOCKED subs $ch $v"; exit 1; fi
    echo "DONE $ch $v man=[$man] auto=[$auto] files: $(cd $D/$ch; ls $v.*.vtt 2>/dev/null | tr '\n' ' ')"
    sleep 15
  done
done
echo ALLDONE
