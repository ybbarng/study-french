# study-french

Claude Code와 대화형으로 프랑스어를 학습하는 프로젝트입니다. 분기별로 영역을 전환합니다 — **문법(Q2) → 작문(Q3) → 말하기(Q4)**.

## 목표
1. A1부터 C2(문어체 포함)까지 프랑스어를 체계적으로 학습
2. 프랑스어 문장을 자유롭게 구사할 수 있는 수준 도달

## 진행 상황 (분기별)

| 분기 | 영역 | 상태 | 요약 |
|------|------|------|------|
| **Q2** (4\~6월) | [문법](grammar/) | ✅ 완료 | 1\~15장 + 보충 + 대조 완주. 단계별 평가 3개 + 1차 모의 통과(24/25). DELF 진단 **B2 도달** |
| **Q3** (7\~9월) | [작문](writing/) | 🔄 진행 중 | 매달 1,500단어 이상 작문. chunk 능동화(4-tier + SRS) 시스템 |
| **Q4** (10\~12월) | 말하기 | ⬜ 예정 | (인프라 준비 중) |

🏆 **2026-06-18 — 체계적 문법 학습 완료** (시작 3/9, 약 100일). 상세는 [grammar/README.md](grammar/README.md).

## 학습 방식
- **전체 프랑스어로 진행** — 원어민 선생님과 대화하듯 (일상 대화도 프랑스어 우선)
- 정형화된 퀴즈가 아닌 **대화형 수업 + 피드백**
- **간격 반복**(에빙하우스 곡선: 1→3→7→14→30일) + **복습 우선**(내재화가 진도보다 우선)
- 슬래시 커맨드로 세션 관리

## 영역별 안내
- 📘 **[grammar/](grammar/)** — 문법 커리큘럼(68항목)·시험 체계·진행 일정. [자료](grammar/materials/) · [시험](grammar/tests/) · [드릴](grammar/drills/)
- ✍️ **[writing/](writing/)** — 작문. [chunk 카드](writing/active-cards.md) · [채점표](writing/rubric.md) · [연습](writing/exercises/)
- 🗣️ **speaking/** — 말하기 (Q4 예정)
- 🏅 **[buzz-challenge/](buzz-challenge/)** — 사내 챌린지 인증 ([Q2 문법](buzz-challenge/Q2/) · [Q3 작문](buzz-challenge/Q3/))
- 📎 **docs/** — 공통 참고 ([어휘 풀](docs/vocabulaire.md) · quizzes · youtube-insights · notion-export)

## 커맨드

| 커맨드 | 용도 |
|--------|------|
| `/study` | 학습 세션 시작 (페이스 확인 → 복습 워밍업 → 수업) |
| `/review` | 취약점 복습 |
| `/write` | 작문 연습 (chunk 능동화 + 첨삭) |
| `/drill` | 동사 굴절 드릴 (집중 반복) |
| `/test` | 모의시험 (수시) |
| `/study-status` | 페이스 점검 + 전체 일정 출력 |
| `/end` | 세션 종료 + 기록 + 커밋 |

## 구조

영역(grammar/writing/speaking) 기준. 전역·시간축 파일은 루트에 둔다.

```
├── README.md · CLAUDE.md · progress.md   # 개요 · 규칙 · 진도표
├── sessions/              # 세션별 상세 기록 (영역 혼합, 시간순)
├── grammar/               # 문법 (Q2) — materials · tests · drills (+ README)
├── writing/               # 글쓰기 (Q3) — active-cards · rubric · exercises
├── speaking/              # 말하기 (Q4 예정)
├── buzz-challenge/        # 사내 챌린지 (README + Q2/문법 · Q3/작문)
├── docs/                  # 공통 참고 (vocabulaire · quizzes · youtube-insights · notion-export)
└── .claude/commands/      # 슬래시 커맨드 정의
```

상세 진도는 [progress.md](progress.md), 문법 커리큘럼은 [grammar/README.md](grammar/README.md) 참고.
