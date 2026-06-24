# Active Cards — Q3 글쓰기 능동화 카드

> chunk·함정·정형표현·연결사를 **한 파일**에서 4-tier + SRS로 관리하는 통합 카드 시스템.
> **`/write`가 자동 관리한다** — 작문 첨삭 중 chunk 추출·Tier 분류·복습 스케줄을 Claude가 처리.
> 사용자 부담은 "작문 + OK 한 번". (drill처럼 따로 호출하면 안 쓰니까 /write에 통합)

---

## 시스템 정의

### 4-tier (부담 조절)

| Tier | 의미 | 처리 | 분량 |
|------|------|------|------|
| **T1** | 오늘의 적극 학습 | 의식적 반복 + 다음날 워밍업 출제 | 1\~2개 |
| **T2** | 단기 복습 | 워밍업 회전 출제 | 5\~10개 |
| **T3** | 간격 반복 (정착) | SRS 자동 스케줄 | 제한 없음 |
| **T4** | 참조 보관 | 카드만 보관, 능동 학습 X | 제한 없음 |

> 핵심 원칙: **모든 오류 카드화 ≠ 모든 오류 의식 학습.** 매일 N개 나와도 T1으로 올릴 건 **1\~2개만** 선택. 나머지는 카드만 누적.

### 카테고리

| 코드 | 의미 | 예 |
|------|------|-----|
| **chunk** | 써야 할 collocation | en terrasse, prendre une décision |
| **cliché** | 한국어 화자 함정 (회피 패턴) | à la terrasse → en terrasse |
| **formule** | 글의 뼈대 정형표현 | Pour ma part, je pense que… |
| **connecteur** | 연결사 | donc, néanmoins, par ailleurs |

### register (사용역)

| 코드 | 의미 | 사용 분기 |
|------|------|----------|
| **W** | 문어 (écrit) | Q3 글쓰기 |
| **O** | 구어 (oral) | Q4 말하기 |
| **S** | 공유 (both) | Q3 + Q4 |

> Q3 글쓰기는 **W + S** 카드를 사용 (O는 Q4 말하기 분기에서 활성화).

### SRS 간격

1일 → 3일 → 7일 → 14일 → 30일 → 숙달(T4 인지)

### 카드 컬럼

`카테고리 | reg | 표현/패턴 | 의미·용법 | 흔한 오류(있으면) | 등록일 | 다음 복습일 | 사용횟수`

### T1 우선순위 결정 (ROI)

| 우선 | 기준 |
|------|------|
| ⭐⭐⭐ T1 | 같은 세션 2회+ 등장 / 매일 쓰이는 정형 / DELF 채점표 직격 |
| ⭐⭐ T2 | 자주 쓰이나 한 번에 외우기 부담 / 시간 지나면 자연 정착 |
| ⭐ T4 | 단발성 어휘 오류 / 향후 학습으로 자동 해소 예정 |

---

## T1 — 적극 학습 중 (1\~2개)

| 카테고리 | reg | 표현/패턴 | 의미·용법 | 흔한 오류 | 등록일 | 다음 복습일 | 사용 |
|---|---|---|---|---|---|---|---|
| chunk | W | après + avoir/être + p.p. (infinitif passé) | "~한 후에" (주절보다 선행) | après passer ❌ → avoir passé / être동사 일치 누락 | 2026-06-24 | 2026-06-25 | 3 |
| cliché | W | 재귀동사 복합과거 일치: se=COD→일치 / se=COI→무일치 | s'est lavée(자신을) vs s'est lavé les mains(손을·COI) / se sont vus(서로를) vs se sont parlé(à) / 본질재귀(s'est souvenue)=주어일치, 예외 s'est rendu compte | "재귀=무조건 일치" 과잉일반화 | 2026-06-24 | 2026-06-25 | 0 |

## T2 — 단기 복습 (5\~10개)

| 카테고리 | reg | 표현/패턴 | 의미·용법 | 흔한 오류 | 등록일 | 다음 복습일 | 사용 |
|---|---|---|---|---|---|---|---|
| cliché | S | en ville (무관사) ↔ dans la/cette ville (특정) | 일반 "도시에"=en ville / 특정 도시=dans+관사 | en cette ville ❌ (재발, en은 무관사) | 2026-06-23 | 2026-06-27 | 2 |
| chunk | W | beaucoup de + 무관사 (+ 복수면 동사 복수) | 많은 ~ (de l'argent ❌ → d'argent) | des tas de / beaucoup de l'argent / 동사 단수 ❌ | 2026-06-23 | 2026-06-25 | 1 |
| chunk | S | arriver à / dans (+ 전치사) | ~에 도착하다 | arriver la rue ❌ | 2026-06-24 | 2026-06-25 | 0 |
| chunk | S | rentrer chez soi | 귀가하다 | je vais chez moi (덜 자연) | 2026-06-24 | 2026-06-25 | 0 |
| chunk | S | sur le/mon chemin | 가는 길에 | dans mon chemin ❌ | 2026-06-24 | 2026-06-25 | 0 |
| cliché | S | prendre le déjeuner / déjeuner(동사) | 식사하다 (점심=déjeuner, 아침=petit-déjeuner) | manger le déjeuner ❌ / petit-déjeuner(아침) 혼동 | 2026-06-24 | 2026-06-25 | 0 |
| cliché | S | campagne(시골) ≠ compagne(동반자) | 철자로 뜻 바뀜 | à la compagne ❌ | 2026-06-22 | 2026-06-26 | 1 |
| cliché | S | même si + 직설법 | 양보 "설령 ~라도" | même s'il soit ❌ → est | 2026-06-22 | 2026-06-26 | 1 |
| chunk | W | en + 제롱디프 (주어 일치) | ~하면서 (en me déplaçant) | en se déplaçant ❌ (je 주어) | 2026-06-23 | 2026-06-24 | 0 |
| chunk | S | un embouteillage / embouteillé | 교통체증 / (도로가) 막힌 | "막히다" 미상 | 2026-06-23 | 2026-06-24 | 0 |
| cliché | S | le reste(나머지) ≠ les restes(남은 음식) | 단/복수로 뜻 바뀜 | les restes ❌ | 2026-06-23 | 2026-06-24 | 0 |
| cliché | S | la santé (여성) | 건강 | mon santé ❌ → ma | 2026-06-23 | 2026-06-24 | 0 |
| cliché | S | place → endroit / lieu | 장소 (place=광장·자리) | place 오용 | 2026-06-22 | 2026-06-25 | 0 |
| cliché | S | chercher → trouver / aller | 찾다 ≠ 가다·이용 | chercher 남용 | 2026-06-22 | 2026-06-25 | 0 |
| chunk | W | tout ce dont / ce que | ~하는 (모든) 것 | 관계대명사 누락 | 2026-06-22 | 2026-06-25 | 0 |
| connecteur | W | Premièrement / Deuxièmement / Enfin | 첫째/둘째/마지막 | En premier·seconde ❌ | 2026-06-22 | 2026-06-25 | 0 |
| chunk | S | transports en commun | 대중교통 | La transport ❌ / des tas de transport ❌ | 2026-06-22 | 2026-06-26 | 1 |
| cliché | S | S'il (엘리지옹) | Si + il → S'il | Si il ❌ (재발) | 2026-06-22 | 2026-06-25 | 0 |
| chunk | W | préférer A plutôt que B | A를 B보다 선호 | plus vivre que ❌ | 2026-06-22 | 2026-06-25 | 0 |
| chunk | S | jouer à + 게임 | (게임)을 하다 | faire le jeu ❌ | 2026-06-22 | 2026-06-25 | 0 |
| chunk | W | un entraînement à l'écriture | 작문 훈련 | s'exercer 작문 ❌ | 2026-06-22 | 2026-06-25 | 0 |
| chunk | S | pour progresser | 실력을 늘리려고 | — | 2026-06-22 | 2026-06-25 | 0 |
| cliché | S | quelque chose (불변 단수) | 무언가 | quelque choses ❌ | 2026-06-22 | 2026-06-25 | 0 |
| chunk | S | un personnage de soutien | 서포터 (게임 역할) | l'assistant position ❌ | 2026-06-22 | 2026-06-25 | 0 |
| chunk | S | soigner ses coéquipiers | 팀원을 치료하다 | récupérer la forme ❌ | 2026-06-22 | 2026-06-25 | 0 |
| formule | S | Ce qui me séduit, c'est… | 내가 매력 느끼는 건 ~ (강조 분열문) | que je suis charmé ❌ | 2026-06-22 | 2026-06-25 | 0 |
| cliché | S | utiliser (not utilize) / on peut | 사용하다 / 활용 | 영어혼용 + on peux | 2026-06-22 | 2026-06-25 | 0 |
| cliché | S | en dehors de | ~밖에·외부에 | dehors Buzzvil ❌ | 2026-06-22 | 2026-06-25 | 0 |
| cliché | S | chercher sur Internet | 인터넷에서 검색하다 | rechercher l'internet ❌ | 2026-06-22 | 2026-06-25 | 0 |
| formule | S | Je veux dire… / C'est dommage | 내 말은~ / 아쉽다 | (잘 씀, 강화) | 2026-06-22 | 2026-06-25 | 0 |

## T3 — 간격 반복 (정착)

| 카테고리 | reg | 표현/패턴 | 의미·용법 | 흔한 오류 | 정착일 | 다음 복습일 | 단계 |
|---|---|---|---|---|---|---|---|
| _(정착 시 이동)_ | | | | | | | |

## T4 — 참조 보관 (능동 학습 X)

| 카테고리 | reg | 표현/패턴 | 의미·용법 | 흔한 오류 | 발견일 | 비고 |
|---|---|---|---|---|---|---|
| cliché | S | insectes (not insects) | 곤충 | 영어 혼용 | 2026-06-22 | 단발 |
| chunk | S | se déplacer | 이동하다 | (자연 표현) | 2026-06-22 | 참조 |
| chunk | S | tout près | 바로 가까이 | (자연 표현) | 2026-06-22 | 참조 |
| cliché | S | le français (남성) | 프랑스어 | la français ❌ | 2026-06-23 | 향후 자동 해소 |
| cliché | S | populaire (not popular) | 인기 있는/대중적 | popular ❌ (영어 혼용) | 2026-06-24 | 단발 |
| chunk | S | une rue gourmande / des restaurants | 맛집 거리 | rue de goût ❌ | 2026-06-24 | 참조 |

---

## 사전 풀 (Q3 시작 시 베이스라인 자가 분류 → T1\~T4 배치)

> 5/1 작문 시범 결과 + 핵심 정형표현. Q3 시작 시 사용자가 "이미 능동/반복 필요/모름"으로 자가 분류하면 그게 베이스라인이 되고, 카드가 T1\~T4로 흩어진다.

### chunk (collocation)

| reg | 표현 | 의미 | 흔한 오류 |
|---|---|---|---|
| S | en terrasse | 카페 야외석에 | ~~à la terrasse~~ ⭐ 5/1 큰 수확 |
| S | prendre une décision | 결정을 내리다 | ~~faire une décision~~ |
| S | faire la queue | 줄을 서다 | |
| S | prendre une photo | 사진을 찍다 | |
| S | passer un examen | 시험을 보다 | ~~voir un examen~~ |
| S | tomber dans les pommes | 기절하다 | (단발성 → T4 후보) |

### cliché (한국어 화자 함정) — 5/1 시범 13개

| reg | 정답/회피 | 함정 | 비고 |
|---|---|---|---|
| S | offrir (호의·선물) | ~~donner~~ | ⭐⭐ 한 세션 2회 등장 — T1 1순위 |
| S | donner/raconter qch **à qqn** | 수령자 누락 | "주다/말하다" 직역 |
| S | depuis(지속) ↔ il y a(시점) | 혼동 | 시간 표현 핵심 |
| S | son + 모음명사 | ~~sa + 모음~~ | 발음 hiatus 회피 |
| W/S | en + gérondif / pendant + 명사 | ~~pendant + 동사원형~~ | 강한 직역 함정 |
| S | 명사 직접 목적어 | l'histoire de… 풀어쓰기 | "X의 이야기" → "X" |
| S | arriver / être servi (음식) | ~~sortir~~ | 동사 선택 |
| S | personnage / thé / heure | character / téa / hour | 영어 혼용 → T4 |
| W | avec X écrit dessus | qui est écrit… | 관계절 어색 구조 |

### formule (정형표현 6카테고리)

| reg | 표현 | 기능 |
|---|---|---|
| W | Pour ma part, je pense que… | 의견 |
| S | Il me semble que… | 인상 |
| W | Cela dit, … | 양보 |
| S | En revanche, … | 대조 |
| W | En somme, … | 요약 |
| S | Ce qui m'intéresse, c'est… | 강조 |
| S | Ça fait + 기간 + que + 절 | "~한 지 ~됐다" ⭐ 5/1 수확 |

### connecteur (연결사)

| reg | 표현 | 단계 |
|---|---|---|
| S | donc / alors | A2\~B1 |
| W | en effet / par ailleurs | B1\~B2 |
| W | néanmoins / cependant | B1\~B2 |
| W | en dépit de / faute de | C1 |

---

## 통계 (주 1회 /write 자동 산출)

> 신규 chunk 수 / Tier 이동(T2→T3 정착) / 활용 빈도 / 활용 미달(사용 권장) 등.
> **회사 공유 = 매달 1,500단어 (양적만, 6/22 확정).** 질적(rubric DELF B1 6항목)·chunk는 **내부 측정/방향타 도구** (회사 공유 X).
