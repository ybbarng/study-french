#!/bin/zsh
D=/private/tmp/claude-504/-Users-ybbarng-personal-projects-study-french/0f2ae8de-1d2a-4320-a7aa-2b42899a9eff/scratchpad/yt-pilot
typeset -A pick
pick=(dailylang "Sr6182ky0qk OL6d7SVlWpI jXJpGkGSUJU RrvUA8-FFf8 4iRVk_APy04"
hazel "DMAW3v51vYY twWX5nXtNkg 9_krzbaAkjI KYjslXVnXGU 843l59sffpY"
shylavie "cwMCMFqfReY gj2OMxPuMcU e7IDNiUX8H8 J_k3lFVV6Ac 7F185t0SOxM"
hanspoon "U4AgcYkDnwA G3pWqwaWl8o _CLf2ZlYOY0 QGk3nDpZzlo AEd9-9aqouE"
frenchfacile "MVtMfZ35APo cSedKCsn0hk nU3c5sayEGI wXXVuwp0DKo icsBFJp9nLE")
for ch in dailylang hazel shylavie hanspoon frenchfacile; do
  for v in ${=pick[$ch]}; do
    out=$(yt-dlp --skip-download --write-info-json --write-subs --write-auto-subs --sub-langs "ko,fr,fr-orig,ko-orig" --sub-format vtt --sleep-subtitles 3 -o "$D/$ch/%(id)s.%(ext)s" "https://www.youtube.com/watch?v=$v" 2>&1)
    echo "$out" > $D/$ch/$v.log
    if echo "$out" | grep -qiE "429|Sign in to confirm|bot"; then echo "BLOCKED $ch $v"; exit 1; fi
    echo "DONE $ch $v $(ls $D/$ch | grep "^$v" | grep vtt | tr '\n' ' ')"
    sleep 6
  done
done
echo ALLDONE
