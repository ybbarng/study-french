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

### 2026-05-01 — 세션 #6 (avoir subj. prés. 단일 동사 깊이 학습)

- **문제 수**: 15문제 (정답 15, 오답 0, **정답률 100%**)
- **선별 기준**: 사용자 명시 학습 전략 — 7불규칙 한 동사씩 깊이. 두 번째 동사 avoir
- **학습 방식**: 변화표 사전 제시 (어원 진화 설명 포함) → 사용자 암기 → 퀴즈 진입

| # | 동사 | 시제 | 인칭 | 트리거 | 결과 |
|---|------|------|------|--------|------|
| 1 | avoir | subj. prés. | il | il faut que | ⭕ ait |
| 2 | avoir | subj. prés. | je | vouloir que | ⭕ aie |
| 3 | avoir | subj. prés. | nous | il faut que | ⭕ ayons |
| 4 | avoir | subj. prés. | vous | vouloir que | ⭕ ayez |
| 5 | avoir | subj. prés. | ils | bien que | ⭕ aient |
| 6 | avoir | subj. prés. | tu | vouloir que | ⭕ aies |
| 7 | avoir | subj. prés. | elle | douter que | ⭕ ait |
| 8 | avoir | subj. prés. | ils | il est possible que (passé subj 형태 노출) | ⭕ aient |
| 9 | avoir | subj. prés. | nous | pour que | ⭕ ayons |
| 10 | avoir | subj. prés. | vous | il est rare que | ⭕ ayez |
| 11 | avoir | subj. prés. | il | aimer que | ⭕ ait |
| 12 | avoir | subj. prés. | elles | avoir peur que (passé subj 형태) | ⭕ aient |
| 13 | avoir | subj. prés. | tu | il est essentiel que | ⭕ aies |
| 14 | avoir | subj. prés. | je | exiger que | ⭕ aie |
| 15 | avoir | subj. prés. | il | quoi que (cold call) | ⭕ ait |

- **단계 변동**:
  - avoir subj. prés.: ⬜ 1/1 → **Stage 1 학습 진입** (16/16). 다음 세션 cold start ⭕ 시 Stage 2 후보
- **인칭별 정답 횟수**:
  - il/elle (ait): 4회 (Q1, Q7, Q11, Q15)
  - ils/elles (aient): 3회 (Q5, Q8, Q12)
  - tu (aies): 2회 (Q6, Q13)
  - j' (aie): 2회 (Q2, Q14)
  - nous (ayons): 2회 (Q3, Q9)
  - vous (ayez): 2회 (Q4, Q10)
- **메타 토론**:
  - avoir 어미 비대칭(-e/-es/-t)의 어원적 설명 (라틴어 인칭 어미 -m/-s/-t의 차등 보존)
  - 1군(전부 소실) ↔ être(전부 보존) 사이의 혼합 패턴
  - 명령형 + en/y 결합 (aies-en 가능, aies-y 의미상 불가)
- **신규 어휘 노출** (vocabulaire.md 추가 검토): confiance, courage, raison, tort, envie, dictionnaire, trimestre, essentiel, rare, patience, ponctuel, sage, attentif (대다수 기존 등록 가능성, 후속 정리)
- **감지된 취약 패턴**: 없음
- **다음 세션 우선 순위**:
  1. faire 도입 (어간 fass-, 일반 어미. 어제 ❌)
  2. être/avoir Stage 2 cold start 점검 각 1~2문제
  3. faire 정착 후 aller 도입 (이중 어간 aill-/all-, 어제 ❌)

### 2026-05-01 — 세션 #7 (faire subj. prés. 단일 동사 깊이 학습)

- **문제 수**: 15문제 (정답 14, 오답 1, **정답률 93%**)
- **선별 기준**: 사용자 학습 전략 3번째 동사. 어제 ❌이었던 faire 회복 + 자동화
- **학습 방식**: 변화표 사전 제시 (직설법 vs 접속법 어간 분리, 명령형 보너스 없음 강조) → 사용자 암기 → 퀴즈

| # | 동사 | 시제 | 인칭 | 트리거 | 결과 |
|---|------|------|------|--------|------|
| 1 | faire | subj. prés. | il | il faut que | ⭕ fasse (어제 ❌ 회복) |
| 2 | faire | subj. prés. | je | vouloir que | ⭕ fasse |
| 3 | faire | subj. prés. | nous | il est important que | ⭕ fassions |
| 4 | faire | subj. prés. | vous | vouloir que | ❌ fassez → fassiez |
| 5 | faire | subj. prés. | vous | il faut que (재출제) | ⭕ fassiez |
| 6 | faire | subj. prés. | ils | bien que | ⭕ fassent |
| 7 | faire | subj. prés. | tu | vouloir que | ⭕ fasses |
| 8 | faire | subj. prés. | il | pourvu que (희망/기원, 신규 트리거) | ⭕ fasse |
| 9 | faire | subj. prés. | elles | douter que | ⭕ fassent |
| 10 | faire | subj. prés. | nous | pour que | ⭕ fassions |
| 11 | faire | subj. prés. | elle | il est rare que | ⭕ fasse |
| 12 | faire | subj. prés. | ils | avoir peur que | ⭕ fassent |
| 13 | faire | subj. prés. | tu | il est essentiel que | ⭕ fasses |
| 14 | faire | subj. prés. | je | exiger que | ⭕ fasse |
| 15 | faire | subj. prés. | vous | quoi que (cold call, 약점 점검) | ⭕ fassiez |

- **단계 변동**:
  - faire subj. prés.: ⬜ 0/1 (어제 ❌) → **Stage 1 학습 진입** (14/16). 다음 세션 cold start ⭕ 시 Stage 2 후보
- **인칭별 정답 횟수**:
  - il/elle (fasse): 3회 (Q1, Q8, Q11)
  - ils/elles (fassent): 3회 (Q6, Q9, Q12)
  - je (fasse): 2회 (Q2, Q14)
  - tu (fasses): 2회 (Q7, Q13)
  - nous (fassions): 2회 (Q3, Q10)
  - vous (fassiez): 2회 (Q5, Q15) — Q4 ❌ 후 회복
- **감지된 취약 패턴 + 자가 해소**:
  - subj nous/vous -ions/-iez에서 -i 누락 (모음 어간 동사 유추 오류)
  - 사용자 자가 통찰: "être/avoir 어간 ai-/soy-은 -i가 y에 흡수되어 안 보였다. 자음 어간(fass-)에선 -i가 그대로 남는다"
  - 같은 인칭 재출제(Q5)와 cold call(Q15) 모두 ⭕ → 즉시 자체 해소
- **메타 인사이트** (사용자 자가 발견 음운 규칙):
  - 자음 어간 동사 (faire, parler, finir 등) → 접속법 nous/vous는 -ions/-iez 그대로
  - 모음 어간 동사 (être=soi-, avoir=ai-, voir=voy-, croire=croy-) → -i가 y에 흡수
  - → 다른 모음 어간 동사 접속법 활용 도출 시 활용 가능
- **신규 어휘 노출**: pourvu que (희망), prise de sang, bruit, recherches, progrès, choix, prise, sang, soutiendrai (futur soutenir)
- **다음 세션 우선 순위**:
  1. aller 도입 (이중 어간 aill-/all-, 어제 ❌, 가장 어려운 동사)
  2. être/avoir/faire Stage 2 cold start 점검 각 1문제씩
  3. aller 정착 후 pouvoir 도입 (단일 어간 puiss-)

### 2026-05-01 — 세션 #8 (aller subj. prés. 단일 동사 깊이 학습)

- **문제 수**: 15문제 (정답 15, 오답 0, **정답률 100%**)
- **선별 기준**: 사용자 학습 전략 4번째 동사. 가장 어려운 동사(이중 어간 + 잡탕 어원). 어제 ❌
- **학습 방식**: 변화표 + 어원 메타 토론 (라틴어 ire/vadere/ambulare suppletion) → 사용자 암기 → 퀴즈

| # | 동사 | 시제 | 인칭 | 트리거 | 결과 |
|---|------|------|------|--------|------|
| 1 | aller | subj. prés. | il | il faut que | ⭕ aille (어제 ❌ 회복) |
| 2 | aller | subj. prés. | je | vouloir que | ⭕ aille |
| 3 | aller | subj. prés. | nous | il est important que | ⭕ allions (이중 어간 분리) |
| 4 | aller | subj. prés. | vous | vouloir que | ⭕ alliez |
| 5 | aller | subj. prés. | ils | bien que | ⭕ aillent (ils=aill- vs nous=all- 구별) |
| 6 | aller | subj. prés. | tu | vouloir que | ⭕ ailles |
| 7 | aller | subj. prés. | elle | douter que | ⭕ aille |
| 8 | aller | subj. prés. | ils | pourvu que | ⭕ aillent |
| 9 | aller | subj. prés. | nous | pour que (해석 질문) | ⭕ allions |
| 10 | aller | subj. prés. | vous | il est essentiel que | ⭕ alliez |
| 11 | aller | subj. prés. | elle | il est possible que | ⭕ aille |
| 12 | aller | subj. prés. | ils | avoir peur que (passé subj 형태) | ⭕ aillent |
| 13 | aller | subj. prés. | tu | il est rare que | ⭕ ailles |
| 14 | aller | subj. prés. | je | exiger que | ⭕ aille |
| 15 | aller | subj. prés. | nous | quoi que (cold call, 이중 어간 점검) | ⭕ allions |

- **단계 변동**:
  - aller subj. prés.: ⬜ 0/1 (어제 ❌ "몰라") → **Stage 1 학습 진입** (15/16). 다음 세션 cold start ⭕ 시 Stage 2 후보
- **인칭별 정답 횟수**:
  - il/elle (aille): 3회 (Q1, Q7, Q11)
  - ils/elles (aillent): 3회 (Q5, Q8, Q12)
  - nous (allions): 3회 (Q3, Q9, Q15) ← cold call 통과
  - j' (aille): 2회 (Q2, Q14)
  - tu (ailles): 2회 (Q6, Q13)
  - vous (alliez): 2회 (Q4, Q10)
- **메타 토론**:
  - 라틴어 ire(가다 중립)/vadere(진군)/ambulare(걷다) 세 동사의 차이
  - 프랑스어 aller = 라틴어 3동사 통합 (suppletion): vais/vas/va/vont(vadere) + all-/aill-(ambulare 변형) + ir-(ire)
  - Zipf 법칙 + 빈도 효과: ire가 너무 짧아서 음운 침식, 다른 동사로 보충
  - 영어 go/went와 비교
- **이중 어간 분리 완벽**: aill-(단수+ils) ↔ all-(nous/vous) 한 번도 혼동 없음
- **자가 발견 음운 규칙 일관 적용**: 자음 어간 → -ions/-iez 그대로
- **신규 어휘 노출**: aller plus loin (추상 의미 "더 진전하다"), conférence, proposition, offre, réunion, plan
- **다음 세션 우선 순위**:
  1. pouvoir 도입 (단일 어간 puiss-, 어제 무효 출제)
  2. être/avoir/faire/aller Stage 2 cold start 점검 각 1문제
  3. pouvoir 정착 후 savoir 도입 (단일 어간 sach-)
  4. 마지막 vouloir (이중 어간 veuill-/voul-)

## 오늘 누적 성과 (세션 #5~#8)

- **4 동사 자동화 완료**: être / avoir / faire / aller
- **누적 정답률**: 59/60 (98%)
- **7개 불규칙 중 4개 Stage 1 진입**
- **자가 발견 인사이트**: 자음 어간 vs 모음 어간 -i 흡수 규칙 (다른 동사 도출에 활용 가능)

### 2026-05-02 — 세션 #9~#12 (4 cold start + pouvoir/savoir/vouloir)

**누적 결과**: 48/49 (98%). **7불규칙 자동화 완성**.

#### 세션 #9: 4동사 cold start (4문제, 4 ⭕)
- être il (Q1 인칭 미스 후 정정), avoir il, faire il, aller il 모두 ⭕
- → être/avoir/faire/aller subj. prés. 모두 **Stage 2 안정 진입**

#### 세션 #10: pouvoir 단일 동사 집중 (15/15, 100%)
- 6인칭 한 바퀴 + 강화 + cold call 모두 ⭕
- 단일 어간 puiss-, 일반 어미
- 메타: pourvu que의 어원 (pourvoir = pouvoir와 다른 동사)
- Stage 1 진입

#### 세션 #11: savoir 단일 동사 집중 (15/15, 100%)
- 단일 어간 sach-, 일반 어미
- 메타: 명령형 vs 접속법 일치도 토론 (savoir 0/3 일치)
- Stage 1 진입

#### 세션 #12: vouloir 단일 동사 집중 (14/15, 93%)
- 이중 어간 veuill-/voul- (l 개수도 다름)
- Q3 voullions ❌ → voulions (l 한 개) → Q9, Q15 자가 회복
- Stage 1 진입

### 5/1 + 5/2 누적 성과 — 7불규칙 완성 ⭐

| 동사 | Stage | 정답률 |
|------|-------|------|
| être | 2 (안정) | 16/17 |
| avoir | 2 (안정) | 17/17 |
| faire | 2 (안정) | 15/17 |
| aller | 2 (안정) | 16/17 |
| pouvoir | 1 (학습) | 15/15 |
| savoir | 1 (학습) | 15/15 |
| vouloir | 1 (학습) | 14/15 |

**누적**: 108/113 (96%)

### 다음 세션 우선 순위
1. pouvoir/savoir/vouloir cold start 점검 (다른 세션 첫 시도) → Stage 2
2. 1군 규칙 동사 (parler) 접속법 도입
3. 이중 어간 동사 (prendre, venir, boire) 접속법 도입
4. 1군 어간 변화 패턴 학습 시작 (acheter, préférer, jeter, payer)

---

### 2026-06-08 — 세션 #13

- **문제 수**: 7 본문제 + 2 보충 (정답 5, 부분 2, 오답 2, 정답률 71%)
- **선별 기준**: ⬜→1 빠른 진척 목적 (회고: 이게 패착)

| # | 동사 | 시제·형태 | 인칭 | 유형 | 결과 | 비고 |
|---|------|-----------|------|------|------|------|
| 1 | parler | ppe. prés. | — | 빈칸 | ⭕ | parlant 즉답 |
| 2 | savoir | ppe. prés. | — | 빈칸 | ⭕ | sachant 즉답 (예외 인지) |
| 3 | prendre | gérondif | — | 변환 | ❌ | prennant. ils 어간(prenn-) vs nous 어간(pren-) 혼동 |
| 3b | venir | ppe. prés. | — | 빈칸 | ⭕ | venant. 규칙 즉시 복구 |
| 4 | aller | passé simple | 3sg | 인지·변환 | △ | 시제 ⭕, 변환 ❌ (a allé → est allé). **aller=être 조동사 재발** |
| 4b | écrire | passé simple | 3sg | 인지·변환 | △ | 시제 명시 X, 변환 정서법 ❌ (écri → écrit) |
| 5 | finir | passé antérieur | 3sg | 인지·변환 | ⭕ | 자력 추론 "단순과거 + p.p." + 변환 avait fini ⭕ |
| 6 | être | subj. imp. | 1sg | 인지·변환 | ❌ | "fusse 모르겠어" 명시. 5/28 학습 미정착 |
| 6b | chanter | subj. imp. | 3sg | 인지·변환 | △ | 시제 ⭕, 변환 부정확 (chantait/chanter 혼동) |
| 7 | finir | impératif passé | 2sg | 인지·의미 | △ | 시제 ⭕, 의미 부정확 (책망/후회 ≠ 미래완료 명령) |

- **단계 변동**:
  - ppe. prés. 표준 (nous 어간 + -ant): ⬜ → 1 (parler·venir 즉답)
  - ppe. prés. 예외 3개: ⬜ → 1 (sachant 즉답)
  - passé antérieur 인지: ⬜ → 1 (자력 추론, 다음 세션 ⭕면 ✅)

- **감지된 취약 패턴**:
  - **aller = être 조동사 (재발)** — 4/23 복구 표시였는데 5월 이후 다시 약화 → T1 활성 재진입
  - ppe. prés. 어간 혼동: pren- (nous 어간) vs prenn- (ils 어간)
  - 정서법 묵음 자음 (écrit -t)
  - subj. imp. 인식 부족 (fusse) — 5/28 학습 미정착

- **회고 (세션 종료 후 발견)**:
  - **잘못된 우선순위 1**: 인지 시제 위주로 출제 — 이전 답변에서 본인이 "프랑스인도 능동 사용 X, 실용 가치 낮다"고 말해놓고 모순적 출제
  - **잘못된 우선순위 2**: 사용자가 이전 세션 인자에서 "기초부터 점진적으로" 명시했는데 그 맥락 무시
  - 결과: 빠른 진척 카운터(⬜→1)에 끌려 진짜 점검해야 할 영역 (T1 약점 + 매일 쓰는 핵심 시제) 건너뜀
  - **다음 세션 강제 방향**: présent 1군 표준 → 핵심 보조 동사 (être/avoir) → 점진적으로 불규칙 → 다른 시제로 확장. T1 약점 매 세션 1~2문제 포함. **인지 시제는 한 세션 끝에 한두 개만**.
