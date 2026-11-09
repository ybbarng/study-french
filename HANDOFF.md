# 이어서 할 일 (2026-11-09 세션 정리)

## 사용자가 할 일
- **Session 28 음성 수업**: ChatGPT 프로젝트 French speaking의 대화방 031(카드 준비됨)에서 음성 수업 → "세션 종료" → study-french 세션에 "정리해 줘".
  - 정리할 때 세션이 할 일: 대화 기록 저장, 10분 안팎이었는지, "못 들음"이 FR-PROGRESS에 남았는지, [연출: …]을 소리 내 읽지 않았는지 확인, `buzz-challenge/Q4/2026-11.md` 만들기, `speaking/chatgpt-transcripts/README.md` 갱신.
- **FTF 표현 화면 확인**: https://ftf.byb.kr/expressions 에서 폰·맥 각각 암호 입력 → 폰에서 익힘 누르고 맥에서 새로고침해 보이는지.
- **DELF 모의고사 맛보기**: https://ftf.byb.kr/delf 에서 B1 미니 하나. 듣기 음성·난이도를 보고 수준마다 미니 100·실제 25까지 늘릴지 정한다. 쓰기 답은 "첨삭 요청용 복사"로 study-french 세션에 붙여 넣는다.
- **채널 확인**: 구독 중인 French Facile이 @FrenchFacile12가 맞는지.
- **새 유튜브 채널**: `docs/youtube-channels/2026-11-09-새채널-시험평가.md`를 보고, 주간 수집에 더한 Pierre·Easy French·Nelly 중 뺄 것이 있는지.
- **답하지 않은 질문**: 일본어 시작을 한 분기 미루고 DELF B1을 준비할지.

## 끝난 것의 상태
- **맥락 문장 450개 검토는 끝났다.** 표현 90개 × 5개, tech-writer 검토로 139곳을 고쳐 `speaking/expressions.json`에 반영했다. 연출은 direction, 함께 쓰는 표현은 combo 필드로 옮겼다. `speaking/chatgpt-contexts.md`(빌드 결과)를 ChatGPT 프로젝트 소스에 올렸다. 고치면 `node speaking/tools/build-contexts.mjs`로 다시 만들고 ChatGPT 소스 파일도 바꿔야 한다.
- **유튜브 자막 평가 흐름**: byb.kr 서버가 매주 일요일 04:00 KST에 `channels.tsv`의 collect=weekly 채널 6곳 새 자막을 받아 이 저장소 `docs/youtube-channels/raw/`에 커밋·push한다. 평가는 서버가 하지 않는다. 사용자가 "유튜브 정리해 줘"라고 하면 이 저장소에서 pull 한 뒤 새 자막을 평가한다. 자세한 것은 `docs/youtube-channels/README.md`.

## 세션이 나중에 할 일 (선택)
- 사용자가 "유튜브 정리해 줘"라고 하면: pull 한 뒤 주간 수집으로 새로 들어온 자막을 `quality-rubric.md` 기준으로 평가.
- 헤이즐 eCDS2w9pxAA 정밀 평가(twWX5nXtNkg는 자막에 프랑스어가 적음).
- 음성을 받아야 하는 일은 사용자 승인 뒤에: 데일리랭귀지 자막 없는 프랑스어 영상 41편 받아쓰기, 쓸 만한 영상의 클립 자르기.

## 켜 둔 것
- byb.kr 서버 cron(매주 일요일 04:00 KST, 유튜브 자막 주간 수집). 일부러 켜 둔다. 끄는 법은 ybbarng/servers 저장소 `byb.kr/jobs/youtube-subs/`.
