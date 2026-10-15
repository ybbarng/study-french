# ChatGPT 회화 대화 사본

ChatGPT "French Speaking" 프로젝트의 실제 대화를 옮겨 둔 곳이다. 지침(`../chatgpt-instructions.md`)을 개선할 때 근거로 쓴다.

- 원본: ChatGPT 대화 JSON (Chat 001~004는 사용자가 붙여 줌, 005~006은 Claude in Chrome으로 `backend-api/conversation/{id}`를 직접 읽음). 발화(`audio_transcription`·`text`)만 옮겼다. 계정 정보·토큰·내부 ID는 저장하지 않는다.
- 순서: `parent_id` 연결을 따라 복원했다 (음성은 `create_time`이 엇갈린다).
- 표기: `🎙️`=음성, `⌨️`=텍스트. 「선생님」 / 『사용자』. 시각은 한국 시간.
- 사용자가 직접 한 말 외에 내가 붙인 메모는 `> 메모:`로 구분한다.

| 파일 | 날짜 | 내용 | 완전한가 |
|---|---|---|---|
| chat-001.md | 10-02 | Session 1 (음성 2회, 중간에 끊김) + 종료 정리 | 거의 전부 (재연결 직후 1개 빠짐) |
| chat-002.md | 10-02 / 10-03 | Session 0 (음성 1회) + 종료 정리 + 메모리·진도 질문 | 전부 |
| chat-003.md | 10-04 / 10-09 | Session 0 다시 하기 (음성 3회) + 종료 정리 | 전부 |
| chat-004.md | 10-09 | Session 2 (음성 1회) + 종료 정리 | 전부 |
| chat-005.md | 10-13 / 10-15 | Session 3 (음성 2회) + 한국어 전환 실패 + 지침 논의 | 전부 |
| chat-006.md | 10-15 | Session 4 (음성 2회) + 종료 정리 | 전부 |

음성으로 된 것 / 안 된 것 점검표 → [voice-vs-text.md](voice-vs-text.md)
