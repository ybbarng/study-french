#!/bin/zsh
# 사용: sample.sh 파일.txt 줄수 → 앞·중간·끝에서 각각 줄수만큼
f=$1; n=${2:-80}; t=$(wc -l < $f)
echo "TOTAL $t"; sed -n "1,${n}p" $f | cut -c1-110; echo ----MID; s=$((t/2-n/2)); sed -n "${s},$((s+n))p" $f | cut -c1-110; echo ----END; sed -n "$((t-n)),${t}p" $f | cut -c1-110
