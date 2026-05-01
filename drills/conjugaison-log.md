# 동사 굴절 드릴 — 세션 로그

> 각 드릴 세션의 상세 기록을 누적한다.

## 로그 형식

각 세션은 아래 형식으로 기록한다:

```
### YYYY-MM-DD — 세션 #N

- **문제 수**: X문제 (정답 Y, 오답 Z, 정답률 W%)
- **선별 기준**: 🔴 A문제, 취약패턴 B문제, 🟡 C문제, ✅/⬜ D문제

| # | 동사 | 시제 | 인칭 | 유형 | 결과 | 비고 |
|---|------|------|------|------|------|------|
| 1 | faire | cond. prés. | nous | 빈칸 | ⭕ | |
| 2 | aller | futur s. | ils | 오류교정 | ❌ | irons→iront 혼동 |

- **단계 변동**:
  - faire cond. prés.: ⬜ → 1
  - aller futur s.: 2 → 1 (퇴행)
- **감지된 취약 패턴**:
  - nous/ils 어미 혼동 (futur simple)
```

---

## 세션 기록

### 2026-04-13 — 세션 #1

- **문제 수**: 12문제 (정답 9, 오답 3, 정답률 75%)
- **선별 기준**: ⬜ 신규 12문제 (첫 세션)

| # | 동사 | 시제 | 인칭 | 유형 | 결과 | 비고 |
|---|------|------|------|------|------|------|
| 1 | être | présent | je | 빈칸 | ⭕ | |
| 2 | faire | présent | vous | 빈칸 | ⭕ | faites |
| 3 | aller | futur s. | nous | 빈칸 | ❌ | allons(현재)→irons. ir- 어간 미적용 |
| 4 | venir | cond. prés. | elle | 빈칸 | ⭕ | viendrait |
| 5 | mettre | p. passé | - | p.p. 직접 | ❌ | mit(passé simple)→mis |
| 6 | pouvoir | imparfait | tu | 빈칸 | ⭕ | pouvais |
| 7 | finir | présent | ils | 빈칸 | ⭕ | finissent |
| 8 | aller | p. composé | il | 오류교정 | ❌ | a allé→est allé. être 조동사 미적용 |
| 9 | boire | présent | nous | 빈칸 | ⭕ | buvons |
| 10 | écrire | p. passé | - | p.p. 직접 | ⭕ | écrit |
| 11 | manger | imparfait | je | 시제선택 | ⭕ | mangeais/imparfait |
| 12 | vouloir | futur s. | je | 빈칸 | ⭕ | voudrai |

- **단계 변동**: 없음 (첫 세션, 모든 항목 ⬜에서 데이터 수집 시작)
- **감지된 취약 패턴**:
  - aller futur = ir- (현재형 allons와 혼동, 기존 재발)
  - mettre p.p. = mis (mit는 passé simple, 기존 재발)
  - aller = être 조동사 (avoir 사용)

### 2026-04-23 — 세션 #2

- **문제 수**: 12문제 (정답 11, 오답 1, 정답률 92%)
- **선별 기준**: 취약 패턴 3개 재확인 + 신규 도입 9개

| # | 동사 | 시제 | 인칭 | 유형 | 결과 | 비고 |
|---|------|------|------|------|------|------|
| 1 | aller | futur s. | ils | 빈칸 | ❌ | irent→iront. -ent vs -ont 어미 혼동 (ferent 패턴 재발) |
| 2 | mettre | p. passé | - | p.p. 직접 | ⭕ | mis (4/13 오답 복구) |
| 3 | aller | p. composé | il | 오류교정 | ⭕ | a→est (4/13 오답 복구) |
| 4 | être | présent | vous | 빈칸 | ⭕ | êtes |
| 5 | avoir | présent | nous | 빈칸 | ⭕ | avons |
| 6 | dire | présent | vous | 빈칸 | ⭕ | dites |
| 7 | vouloir | présent | ils | 빈칸 | ⭕ | veulent |
| 8 | faire | futur s. | tu | 빈칸 | ⭕ | feras |
| 9 | devoir | futur s. | nous | 빈칸 | ⭕ | devrons |
| 10 | prendre | p. passé | - | p.p. 직접 | ⭕ | pris |
| 11 | boire | imparfait | vous | 빈칸 | ⭕ | buviez |
| 12 | imp/PC | - | - | 시제선택 | ⭕ | regardais/a sonné |

- **단계 변동**: 모든 항목 아직 ⬜ (첫 세션 내 3회 정답 미달, 자료 축적 단계)
  - 취약 패턴 해소 진행: aller p. composé, mettre p. passé (각 1회 정답)
- **감지된 취약 패턴**:
  - **유지**: futur ils 어미 -ont (irent ❌, ferent도 같은 패턴, 재발)
- **취약 패턴 해소 후보**:
  - aller p. composé être 조동사: 4/13 ❌ → 4/23 ✔️
  - mettre p.p. mis: 4/13 ❌ → 4/23 ✔️

### 2026-04-24 — 세션 #3 (월말 평가 직전 점검)

- **문제 수**: 8문제 (정답 7, 오답 1, 정답률 88%)
- **선별 기준**: 모의시험 오답 2패턴(futur ils -ont, faire imparfait) 집중

| # | 동사 | 시제 | 인칭 | 유형 | 결과 | 비고 |
|---|------|------|------|------|------|------|
| 1 | aller | futur s. | ils | 빈칸 | ❌ | irons→iront. 인칭 혼동 (전과는 다른 패턴 — -ont는 알지만 nous로 답) |
| 2 | faire | futur s. | ils | 빈칸 | ⭕ | feront |
| 3 | faire | imparfait | il | 빈칸 | ⭕ | faisait (모의시험 오답 복구) |
| 4 | venir | futur s. | ils | 빈칸 | ⭕ | viendront |
| 5 | faire | imparfait | nous | 빈칸 | ⭕ | faisions |
| 6 | être | futur s. | ils | 빈칸 | ⭕ | seront |
| 7 | avoir | futur s. | ils | 빈칸 | ⭕ | auront |
| 8 | faire | imparfait | vous | 빈칸 | ⭕ | faisiez |

- **단계 변동**:
  - faire imparfait: 신규 → 학습 단계 진입 (3회 정답으로 stage 1 달성)
  - être/avoir/venir/faire futur ils: 신규 정답 도입
- **감지된 취약 패턴**:
  - **잔존**: aller futur ils — 패턴이 진화 (-ent ❌ → -ons ❌). -ont는 알지만 인칭 어미 정확도 미흡
  - **해소**: faire imparfait fais- (3개 형태 정답)

### 2026-04-30 — 세션 #4 (subjonctif 3인칭 단수 도입 + aller futur ils 4차 점검)

- **문제 수**: 10문제 (정답 6, 오답 4, 정답률 60%, Q9 무효 후 재출제)
- **선별 기준**: 🔴 aller futur ils 핵심 표적 + 혼동 쌍 점검 + subjonctif 3인칭 단수 5개 신규 도입
- **마스터 테이블 변경**: subjonctif présent 컬럼 추가

| # | 동사 | 시제 | 인칭 | 유형 | 결과 | 비고 |
|---|------|------|------|------|------|------|
| 1 | aller | futur s. | ils | 빈칸 | ❌ | "몰라" 응답. 4번째 시도도 cold start 실패 |
| 2 | faire | futur s. | ils | 빈칸 | ⭕ | feront. 4/24 ⭕ 안정 유지 |
| 3 | être | futur s. | ils | 빈칸 | ⭕ | seront |
| 4 | aller | futur s. | ils | 빈칸 | ⭕ | iront. Q1 직후 알려준 후 정답 |
| 5 | aller | futur s. | nous | 빈칸 | ⭕ | irons. 인칭 분리 |
| 6 | être | subj. prés. | il | 빈칸 | ❌ | soie→soit. 명령형과 가까운데도 누설 |
| 7 | avoir | subj. prés. | il | 빈칸 | ⭕ | ait |
| 8 | faire | subj. prés. | il | 빈칸 | ❌ | "몰라". fass- 어간 미학습 |
| 9 | (pouvoir subj il) | - | - | - | 무효 | 출제 시 어간 puiss- 누설 → 다른 동사로 재출제 |
| 9' | aller | subj. prés. | il | 빈칸 | ❌ | "몰라". 이중 어간 aill- 미학습 |
| 10 | aller | futur s. | ils | 빈칸 | ⭕ | iront. 같은 세션 내 2회 정답, 단기 정착 |

- **단계 변동**:
  - faire futur ils: ⬜ 2/2 → ⬜ 3/3 (다른 세션 분산 정답, Stage 2 안정 진입 후보)
  - être futur ils: ⬜ 1/1 → ⬜ 2/2
  - aller futur ils: ⬜ 0/3 → ⬜ 2/5 (알려준 후 정답이라 Stage 1 미달, 다른 세션 첫 시도 정답 필요)
  - aller futur nous: ⬜ 0/0 → ⬜ 1/1 (신규 정답)
  - être/faire/aller subj. prés. il: 신규 출제, 모두 ❌
  - avoir subj. prés. il: 신규 출제 ⭕

- **감지된 취약 패턴**:
  - **신규**: subjonctif 3인칭 단수 불규칙 (soit/fasse/aille 미숙, ait만 잡힘)
  - **잔존**: aller futur ils cold start (4회째도 모름)
  - **본인 메모**: 정답 힌트 누설 위반 1건 (Q9 pouvoir에서 "puiss-" 어간 사전 노출). 다음 세션 출제 시 어간 명시 금지 재인지

- **다음 세션 우선 순위**:
  1. aller futur ils (cold start 1회 정답 = Stage 1 진입)
  2. subj 불규칙 5개 (soit/ait/fasse/puisse/aille) 반복 도입
  3. 정착되면 prendre/venir 등 이중 어간 동사 subj 도입

### 2026-05-01 — 세션 #5 (être subj. prés. 단일 동사 깊이 학습)

- **문제 수**: 15문제 (정답 15, 오답 0, **정답률 100%**)
- **선별 기준**: 사용자 요청 — 불규칙 7동사를 한 동사씩 깊이 학습. 첫 동사 être 6인칭 한 바퀴 + 강화 반복 + cold call
- **학습 방식**: 변화표 사전 제시 → 사용자 암기 → 퀴즈 진입 (사용자 명시 요청)

| # | 동사 | 시제 | 인칭 | 트리거 | 결과 |
|---|------|------|------|--------|------|
| 1 | être | subj. prés. | il | il faut que | ⭕ soit (어제 ❌ 회복) |
| 2 | être | subj. prés. | je | vouloir que | ⭕ sois |
| 3 | être | subj. prés. | nous | il est important que | ⭕ soyons |
| 4 | être | subj. prés. | vous | vouloir que | ⭕ soyez |
| 5 | être | subj. prés. | ils | il faut que | ⭕ soient |
| 6 | être | subj. prés. | tu | vouloir que | ⭕ sois |
| 7 | être | subj. prés. | il | bien que | ⭕ soit |
| 8 | être | subj. prés. | ils | douter que | ⭕ soient |
| 9 | être | subj. prés. | nous | pour que | ⭕ soyons |
| 10 | être | subj. prés. | vous | il est nécessaire que | ⭕ soyez |
| 11 | être | subj. prés. | elle | il est possible que | ⭕ soit |
| 12 | être | subj. prés. | elles | avoir peur que (ne explétif) | ⭕ soient |
| 13 | être | subj. prés. | tu | aimer que | ⭕ sois |
| 14 | être | subj. prés. | je | exiger que (어휘 질문) | ⭕ sois |
| 15 | être | subj. prés. | elle | quoi que (cold call) | ⭕ soit |

- **단계 변동**:
  - être subj. prés.: ⬜ 0/1 → **Stage 1 학습 진입** (15/16). 다음 세션 cold start ⭕ 시 Stage 2 후보
- **인칭별 정답 횟수** (Stage 추적용):
  - il/elle (soit): 4회 (Q1, Q7, Q11, Q15)
  - ils/elles (soient): 3회 (Q5, Q8, Q12)
  - tu (sois): 2회 (Q6, Q13)
  - je (sois): 2회 (Q2, Q14)
  - nous (soyons): 2회 (Q3, Q9)
  - vous (soyez): 2회 (Q4, Q10)
- **트리거 노출 다양화**: il faut que / vouloir que / il est important/nécessaire/possible que / bien que / pour que / douter que / avoir peur que (+ ne explétif) / aimer que / exiger que / quoi que
- **신규 어휘** (vocabulaire.md 추가 대상): exiger, exigence, exigeant
- **감지된 취약 패턴**: 없음
- **다음 세션 우선 순위**:
  1. avoir 도입 (être와 같은 방식: 변화표 → 6인칭 → 강화 → cold call)
  2. être Stage 2 점검 (cold start 1~2문제)
  3. faire 또는 aller 도입 (avoir 정착 후)
