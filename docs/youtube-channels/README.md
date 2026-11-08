# 프랑스어 학습 유튜브 채널 자료

사용자가 구독하는 프랑스어 학습 채널의 영상을 모아 평가하고, 쓸 만한 것을 말하기·듣기 학습 자료로 쓴다.

## 채널 (출처)

| 채널 | 주소 | 2026-11-08 시험 평가 | 쓰임 |
|---|---|---|---|
| 데일리랭귀지 daily language | https://www.youtube.com/channel/UCiP--SK_DhpoZkdBfljpEUA | 종합 4.00 | 인터뷰 속 표현, 클립 |
| 프랑스어 살롱_Avec 헤이즐 | https://www.youtube.com/channel/UCFthmtoPYUgvCUrxtM3ID9A | 종합 3.32 | 표현 목록만 참고 |
| 샤이라비 Shylavie à la française | https://www.youtube.com/channel/UCaZHA5I48HA-PmwsfKNtf3g | 종합 4.43 | 구어 표현·말투, 드라마 듣기 |
| 프랑스어 한스푼 | https://www.youtube.com/channel/UCGQVDv18ELo1HUOc3LXp6Hg | 종합 3.32 | 약점 문법 드릴 편만 |
| French Facile (@FrenchFacile12, 사용자 확인 중) | https://www.youtube.com/channel/UCtxBWjnaPiqR89Jg9y84_eA | 종합 4.37 | 듣기·쉐도잉 주 자료 |

## 파일

- `2026-11-08-시험평가.md` — 채널마다 최근 5편(평가 21편)의 요약, 정확성 지적, 품질 점수, 클립 후보. 영상마다 제목·주소·올라온 날짜·받은 날짜·자막 종류를 적었다.
- `frenchfacile-전체평가.md` — French Facile 65편 전체 평가(평균 약 4.22, 형식별 차이, 원어민 말실수·사실 오류 목록, 먼저 쓸 영상).
- `shylavie-전체평가.md` — 샤이라비 54편 전체 평가(평균 약 3.89, 설명 오류 목록, 말하기 표현 후보 모음, 먼저 쓸 영상).
- `dailylang-전체평가.md` — 데일리랭귀지 프랑스어 영상 319편 전체 평가(평균 약 3.77, 영상 종류별 차이, 4스킬 루틴 제외 권고, 오류 목록, 말하기 표현 후보).
- `quality-rubric.md` — 품질 점수 기준(6항목, 정확성 두 배).
- `raw/<채널>/` — 받은 자막 원문. 파일 이름 = `<영상ID>.<언어>.vtt`(YouTube 자동 자막, 원래 언어), 읽기용 `.txt`, 채널 영상 목록 `list.tsv`. 영상 주소 = `https://www.youtube.com/watch?v=<영상ID>`.
- `scripts/` — 자막 받기(`fetch2.sh`), 자막 → 읽기용 글(`vtt2txt.py`), 발췌(`sample.sh`).

## 받을 때 지킬 것

- 자동 번역 자막은 받지 않는다(첫 시도에서 429로 막혔다). 원래 언어 자막(fr-orig·ko-orig)만.
- 요청 간격: 페이지 5초, 자막 10초, 영상 사이 15초 이상.
- 출처를 빠짐없이 남긴다: 채널, 영상 제목·주소, 올라온 날짜, 받은 날짜, 자막 종류, 클립은 시작–끝 시간과 `&t=초` 주소.
