# ChatGPT 회화 대화 사본

ChatGPT "French Speaking" 프로젝트의 실제 대화를 옮겨 둔 곳이다. 지침(`../chatgpt-instructions.md`)을 개선할 때 근거로 쓴다.

- 원본: ChatGPT 대화 JSON. Claude in Chrome으로 `backend-api/conversation/{id}`를 직접 읽는다 (Chat 001~004는 처음에 사용자가 붙여 준 페이지를 API 원본과 대조함). 발화(`audio_transcription`·`text`)만 옮겼다. 계정 정보·토큰·내부 ID는 저장하지 않는다. 화면용 버튼 표시(GenUI)는 빼고 FR-PROGRESS 줄만 남긴다.
- 순서: `parent_id` 연결을 따라 복원했다 (음성은 `create_time`이 엇갈린다).
- 표기: `🎙️`=음성, `⌨️`=텍스트. 「선생님」 / 『사용자』. 시각은 한국 시간. 텍스트 카드의 복습 목록은 줄여 적었다.
- 사용자가 직접 한 말 외에 내가 붙인 메모는 `> 메모:`로 구분한다.
- 대화방 이름은 ChatGPT에서 숫자(001, 002 …)로 바꿨다.

| 파일 | 날짜 | 내용 | 지침 |
|---|---|---|---|
| chat-001.md | 10-02 | Session 1 (음성 2회, 중간에 끊김) | 압축판 |
| chat-002.md | 10-02 / 10-03 | Session 0 + 메모리·진도 질문 | 압축판 |
| chat-003.md | 10-04 / 10-09 | Session 0 다시 하기 (음성 3회) | 압축판 |
| chat-004.md | 10-09 | Session 2 | 압축판 |
| chat-005.md | 10-13 / 10-15 | Session 3 + 한국어 전환 실패 + 지침 논의 | 압축판 |
| chat-006.md | 10-15 | Session 4 (미완료) | 압축판 |
| chat-007.md | 10-15 / 10-19 | Session 4 다시 | v4 |
| chat-008.md | 10-19 | Session 5 | v4 |
| chat-009.md | 10-19 | Session 6 | v4 |
| chat-010.md | 10-20 | Session 7 | v4 |
| chat-011.md | 10-20 / 10-22 | Session 8 | v4 |
| chat-012.md | 10-22 / 10-23 | Session 9 | v4 |
| chat-013.md | 10-22 / 10-24 | Session 10 | v4 |
| chat-014.md | 10-22 / 10-24 | Session 11 | v4 |
| chat-015.md | 10-22 / 10-24 | Session 12 | v4 |
| chat-016.md | 10-22 / 10-24 | Session 13 | v4 |
| chat-017.md | 10-24 | Session 14 | v4 |
| chat-018.md | 10-24 / 10-25 | Session 15 | v5 |
| chat-019.md | 10-24 / 10-25 | Session 16 | v5 |
| chat-020.md | 10-24 / 10-25 | Session 17 | v5 |
| chat-021.md | 10-24 / 10-25 | Session 18 | v5 |
| chat-022.md | 10-24 / 10-26 | Session 19 (옛 v4 카드) | v6 |
| chat-023.md | 10-24 / 10-29 | Session 20 (옛 v4 카드, 제목이 "Salutation en français"로 바뀜) | v6 |

- 대화방 022·023: Session 19·20 수업 완료(10-26·10-29). 카드는 다시 입력하지 않아 옛 v4 형식 그대로 썼다.
- "Session 21" 대화방: v5 카드가 있지만 v7 대본 형식이 아니다. v7 붙여 넣은 뒤 이 대화방에서 "Session 21"을 다시 입력해 새 카드를 받고 수업한다 (이름은 024로 바꿀 예정).

프로젝트 안 대화 목록은 프로젝트 대화 목록 API(`backend-api/gizmos/{id}/conversations`)로 확인한다.

음성으로 된 것 / 안 된 것 점검표 → [voice-vs-text.md](voice-vs-text.md)
