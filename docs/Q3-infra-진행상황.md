# Q3 글쓰기 인프라 — 구축 진행상황 (체크포인트)

> **compact·세션을 넘어 작업을 이어가기 위한 plan 보존 문서.** 막히거나 맥락을 잃으면 **이 문서부터 읽는다.**
> 상세 청사진: [docs/Q3-writing-design-notes.md](Q3-writing-design-notes.md)
> 관련 메모리: `project_phased-learning-plan`, `project_q3-infra-timing`, `feedback_provide-fixed-vocab`, `feedback_exam-scope-strict`

---

## 전체 plan 요약

- **목표**: Q3(7\~9월) 글쓰기 본격 시작 전 인프라 구축. 메인 = **chunk 능동화** (인지→생산 전환).
- **사용자 부담 ≈ 0**: Claude가 만들고 사용자는 검토. ("돌려놓고 자도 된다")
- **진행 방식 (합의)**: 하나씩 만들고 커밋. 단 active-cards→/write는 강결합이라 연속. 1\~5는 Claude 단독, 6은 사용자 작문, 7은 6 후.

---

## 필수 7개 + 진행 순서

| # | 항목 | 의존 | 상태 |
|---|------|------|------|
| 1 | `writing/active-cards.md` (카드 스키마) | 기반 | ✅ **완료** (커밋 98e0ce9, 구조 사용자 승인) |
| 2 | `/write` 커맨드 (통합 흐름) | ← active-cards | ✅ **완료** (워밍업+4-tier+첨삭+자동분류+저장 통합) |
| 3 | `writing/rubric.md` (DELF B1 PI 채점표 25점) | 독립 | ⬜ 대기 |
| 4 | `writing/exam-topics.md` (B1 주제 풀 50개) | 독립 | ⬜ 대기 |
| 5 | `writing/argumentation-patterns.md` (논증 5패턴) | 독립 | ⬜ 대기 |
| 6 | 베이스라인 측정 1편 | **사용자 작문** 필요 | ⬜ 대기 |
| 7 | 회사 공유 자료 | ← 베이스라인 | ⬜ 대기 |

### 추가 항목 (6/7 결정, 권장)
- ⬜ 글로벌 `~/.claude/CLAUDE.md` 언어 규칙 (Claude Code lenient mode — 대화 불어 우선, 산출물 한국어)
- ⬜ `blog/` + GitHub Pages (첫 글 = 회고 자료 재활용)
- ⬜ 어휘 풀 자동 누적 / Claude Code 교정 기록
- ⬜ 사전 chunk 풀 300개 / `models/` 5\~7편 / `topical-vocab/` 5주제 (7월 초 가능)

---

## 현재 위치 (마지막 갱신: 2026-06-19)

- ✅ **1 active-cards.md 완료** — 4-tier + 카테고리(chunk/cliché/formule/connecteur) + register(W/O/S) + SRS. 사용자 "카드=학습항목, 문법의 취약점카드와 같은 개념" 이해·승인.
- ✅ **2 /write 완료** — `.claude/commands/write.md` 통합 흐름(워밍업+4-tier+첨삭+5질문 자동분류+카드저장). /correct 보조 포함.
- 🔄 **다음 작업 = 3 rubric.md** (DELF B1 PI 채점표). 이후 → 4 exam-topics → 5 argumentation → 6 베이스라인(사용자) → 7 회사공유

---

## 핵심 설계 (절대 잊지 말 것)

1. **/write 단일 통합** — 워밍업 + 4-tier 작문 + 첨삭 + 카드 자동분류 + 저장. (별도 커맨드 폐기, drill 교훈)
2. **4-tier**: T1 적극(1\~2개) / T2 단기 / T3 SRS(1\~3\~7\~14\~30일) / T4 참조. "모든 오류 카드화 ≠ 모든 오류 학습".
3. **register**: 문어W / 구어O / 공유S. Q3는 W+S, O는 Q4 말하기.
4. **5질문 알고리즘**으로 Tier 자동 분류 (빈도/유용성/시험가치/부담/자연정착).
5. **재료는 collocation 완성형** (전치사·관사 포함, 어휘 추측 강요 금지). ← feedback
6. **출제는 배운 범위 안에서만** (미학습 표현·관용구 금지). ← feedback
7. **회사 메트릭**: 월 신규 능동화 ≥ 50 chunk + 월말 평가 ≥ 베이스라인 +3.
8. **목표 현실화**: 9월 17/25 (B1 상위 안정), B2는 2027 Q1. DELF 응시는 선택.
9. **4-tier 요일 메뉴**: 월수금 키워드+번역 / 화목 모델모방 / 주말 자유작문·역번역 / 월말 평가.

---

## 작업 재개 방법 (compact 후)

1. 이 문서 + `Q3-writing-design-notes.md` 읽기.
2. 위 "현재 위치"의 🔄 항목부터 이어서.
3. `writing/` 디렉토리 현재 상태 확인 (`ls writing/`).
4. 각 항목 완료 시 이 문서의 상태표 갱신 + 커밋.
