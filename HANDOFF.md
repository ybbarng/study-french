# 이어서 할 일 (2026-11-24 세션 정리)

## 다음에 이어갈 지점
- 사용자가 11-23~11-30 음성 수업을 이미 만든 대화방에서 마친 뒤 "정리해 줘"라고 하면, 11-01~11-22 때와 같은 흐름으로 정리한다. 대화 기록 저장, `buzz-challenge/Q4/2026-11.md`(지금 22/30), `speaking/chatgpt-transcripts/README.md`, `speaking/state/current.md`를 고친다. 그다음 `speaking/chatgpt-room-rename.md`대로 11월 대화방 이름을 바꾼다.
- 12-01(알림 있음): ChatGPT 지침 v11로 고친다. 선생님이 자주 어긴 것은 대답 먼저 하기, 여러 단계 몰아 말하기, 맞는 문장 고치기, 표현 번호 읽기, 틀린 문장에 "Très bien"이다. 반복 오류 작문 카드도 더한다(반과거 지나치게 쓰기, « tourner en rond », tu 명령형). 12-01 카드 전에 반영한다. 11월은 지금 지침 그대로 하기로 사용자가 정했다(2026-11-24).
- 12-26(알림 있음): 1월 표현 E259~를 만들고, 연습 화면 검토에 더한다(`pnpm expressions:review-todo`).

## 사용자가 할 일 (책상에도 있음)
- 프랑스어 사이트 새 구조를 폰에서 확인한다. 관리자 암호를 다시 넣고 연습 범위를 저장한다. 연습을 한 판 해 본다. 폰과 맥의 「익힘」이 같은지 본다. DELF를 맛본다. 주소는 https://study-fr.byb.kr
- 일본어 자막으로 볼 애니·드라마를 알려 준다. 회사 일본어 스터디 그룹이 있는지 확인한다.
- 서버 authorized_keys에서 옛 FTF 배포 키 줄을 지운다.
- 채널 확인: 구독 중인 French Facile이 @FrenchFacile12가 맞는지 본다. 새 유튜브 채널 평가(`docs/youtube-channels/2026-11-09-새채널-시험평가.md`)를 보고 뺄 채널이 있는지 정한다.

## FTF 합치기 (2026-11-23 끝남)
- FTF는 이 저장소 `app/`으로 옮겼다. 운영 주소는 https://study-fr.byb.kr, 옛 `ftf.byb.kr`은 301로 넘어간다. 옛 FTF GitHub 저장소는 archive했고 로컬 clone도 지웠다. 앱의 명령·배포는 `app/HANDOFF.md`와 `app/docs/`를 본다.
- 숫자 듣기(`/numbers`)와 학습 영역 구조(`/parler`·`/ecouter`·`/suivi`, 아래 탭)를 넣었다. 새 구조가 괜찮은지는 사용자가 써 보며 판단한다.
- 2026 Q1 버즈챌린지는 사이트 화면이 인증이었다. `buzz-challenge/README.md`에 링크를 합쳤다.

## 일본어·언어 공통 (기록 위치)
- 2027 계획: `~/personal/notes/언어/언어 학습 로드맵.md` "2027 다시 정한 것". 일본어 사이트(study-ja.byb.kr)는 study-japanese 세션이 맡는다(인계 문서 `~/personal/notes/언어/일본어/study-japanese 시작 인계.md`).
- 언어 공통 교훈: `~/personal/notes/언어/언어 일반 이론·학습법/언어 공통 교훈.md`. 노트 폴더는 로컬 git으로 이력을 보호한다(매일 23:40 자동 커밋).

## 끝난 것의 상태
- **맥락 문장 450개 검토는 끝났다.** 고치면 `node speaking/tools/build-contexts.mjs`로 다시 만들고 ChatGPT 소스 파일도 바꿔야 한다.
- **ChatGPT 소스**: `speaking/chatgpt-sessions.md`를 2026-11-23에 다시 올렸다(소스 탭 "…" → 삭제 → 새 파일 올리기).
- **유튜브 자막 평가 흐름**: byb.kr 서버가 매주 일요일 04:00 KST에 새 자막을 `docs/youtube-channels/raw/`에 커밋·push한다. 사용자가 "유튜브 정리해 줘"라고 하면 pull 한 뒤 평가한다. 자세한 것은 `docs/youtube-channels/README.md`.

## 세션이 나중에 할 일 (선택)
- 헤이즐 eCDS2w9pxAA 정밀 평가.
- 음성을 받아야 하는 일은 사용자 승인 뒤에: 데일리랭귀지 자막 없는 영상 41편 받아쓰기, 클립 자르기.
- 답하지 않은 옛 질문: 일본어를 한 분기 미루고 DELF B1을 준비할지. 2026-11-23 계획 논의에서 2027-01-01 일본어 시작으로 정해져 사실상 풀렸다.

## 켜 둔 것
- byb.kr 서버 cron(매주 일요일 04:00 KST, 유튜브 자막 주간 수집). 일부러 켜 둔다. 끄는 법은 ybbarng/servers 저장소 `byb.kr/jobs/youtube-subs/`.
- 이 세션이 띄운 서버·백그라운드 명령·Monitor는 없다.
