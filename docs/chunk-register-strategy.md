# Chunk Register 전략

> 문어 / 구어 / 공유 chunk 분리 학습 전략. Q3 작문 + Q4 말하기 양 영역에 적용. 향후 다국어 학습 확장에도 활용 가능한 일반 원칙.

## 배경 및 목적

- **5/2 토론 결과**. 사용자가 "문어 chunk와 구어 chunk가 별도 존재하느냐?" 질문 후 답: **YES, register 차이 핵심**.
- Q3 (작문) + Q4 (말하기) 학습 시 register 인식 부재 → 한국어 화자 "교과서 프랑스어" 함정의 핵심 원인.
- 통합 시스템(`active-cards.md`)에 **register 필드** 추가로 해결.

## Register란

**Sociolinguistics 개념**: 같은 언어 안에서 사용 맥락(formal/informal, written/spoken, 사회 계층, 지역 등)에 따라 달라지는 언어 변형.

프랑스어 register 5단계 (학술적 분류):

| 단계 | 명칭 | 사용 맥락 |
|------|------|----------|
| 1 | Soutenu / Littéraire | 문학, 학술, 격식 |
| 2 | Courant / Standard | 일반 글, 격식 회화 |
| 3 | Familier | 친구, 가족 |
| 4 | Populaire | 매우 비격식, 일부 사회 계층 |
| 5 | Argot | 속어, 은어 |

**B1~B2 학습자 우선순위**: 2 (Standard) + 3 (Familier). 1과 4~5는 후순위.

## 문어 vs 구어 Chunk 분리 (5/2 토론 결과)

### 구어 전용 chunk (글에 쓰면 어색)

| Chunk | 의미 | 비고 |
|-------|------|------|
| *du coup* | 그래서 | 회화 매우 자주 |
| *ouais* | 응 | *oui*의 회화체 |
| *bah / ben* | 뭐, 음 | 망설임 |
| *c'est dingue* | 대박 | 감탄 |
| *t'inquiète* | 걱정 마 | *ne t'inquiète pas* 축약 |
| *grave* | 매우 | 강조 (젊은이) |
| *tu vois ?* | 알지? | 청자 확인 |
| *quoi* (문장 끝) | (어조) | *C'est bon, quoi.* |
| *en mode + 명사* | ~한 분위기 | 매우 회화 |
| *en gros* | 간단히 말해 | 회화 |
| *au fait* | 그건 그렇고 | 회화 |

### 문어 전용 chunk (구어로 쓰면 격식적/어색)

| Chunk | 의미 | 비고 |
|-------|------|------|
| *en outre* | 게다가 | 격식 글 |
| *néanmoins* | 그럼에도 | 격식 |
| *par conséquent* | 따라서 | 격식, 구어는 *du coup* |
| *force est de constater que* | ~을 인정해야 한다 | 매우 격식 |
| *il convient de* | ~할 필요가 있다 | 격식 |
| *de surcroît* | 게다가 | 매우 격식 |
| *à cet égard* | 이 점에서 | 격식 |
| *au demeurant* | 사실은/게다가 | 매우 격식 |
| *en somme* | 요약하면 | 격식 |

### 공유 chunk (양쪽 OK)

| Chunk | 의미 |
|-------|------|
| *par exemple* | 예를 들어 |
| *c'est-à-dire* | 즉 |
| *en fait* | 사실은 |
| *d'abord, ensuite, enfin* | 우선, 그 다음, 마지막 |
| *par ailleurs* | 한편 (약간 격식) |
| *vraiment* | 정말로 |
| *donc* | 그래서 |

### 같은 의미 — 다른 Register

| 의미 | 구어 (Q4) | 문어 (Q3) |
|------|----------|----------|
| 그래서 | du coup | par conséquent / donc |
| 게다가 | en plus | de plus / en outre / par ailleurs |
| 그럼에도 | quand même | néanmoins / toutefois |
| 어쨌든 | bref / en gros | en somme |
| 사실은 | en fait | en réalité |
| 정말로 | grave / vraiment | véritablement |
| 그건 그렇고 | au fait | à propos |
| 간단히 말해 | en gros | en bref |

## 양적 분포 (B1~B2 핵심 풀 ~900개)

| 영역 | 양 | 비율 |
|------|-----|------|
| 문어 전용 (Q3 메인) | ~250 chunk | 30% |
| 구어 전용 (Q4 메인) | ~250 chunk | 30% |
| 공유 (양쪽 사용) | ~400 chunk | 40% |

→ **Q3 사용 가능**: 문어 + 공유 = 650 chunk
→ **Q4 사용 가능**: 구어 + 공유 = 650 chunk
→ **시너지**: Q3에 학습한 공유 chunk가 Q4에 그대로 이어짐

## 시스템 통합 — active-cards.md 단일 파일 + Register 필드

5/1 통합 결정과 일치. 새 필드 추가:

```markdown
| Tier | 카테고리 | Register | 표현 | 의미 | 등록일 | 다음 복습일 |
|------|---------|---------|------|------|--------|------------|
| T1 | connecteur | 문어 | en outre | 게다가 | 7/1 | 7/2 |
| T1 | connecteur | 구어 | du coup | 그래서 | 10/1 | 10/2 |
| T1 | connecteur | 공유 | par exemple | 예를 들어 | 7/1 | 7/2 |
| T1 | filler | 구어 | bah, écoute | 음, 그게 | 10/5 | 10/6 |
```

**Q3 (/write)**: register 필드가 **문어 / 공유**인 카드만 활용
**Q4 (/speak)**: register 필드가 **구어 / 공유**인 카드만 활용

→ 같은 시스템, 활동에 따라 자동 필터링.

## Q3 / Q4 학습 순서 권장

```
Q3 (7~9월) 작문:
  ├─ 학습 대상: 문어 (250) + 공유 (400) = 650
  └─ 결과: 공유 400개 자동 정착 → Q4 베이스

Q4 (10~12월) 말하기:
  ├─ 학습 대상: 구어 (250) [공유는 이미 정착]
  └─ 새로 학습할 chunk = 250개만 → 부담 ↓
```

→ **Q3 학습이 Q4의 60% 토대**가 됨. 학습 효율 극대화.

## 한국어 화자 Register 함정

| 함정 | 예 |
|------|-----|
| 글에 회화체 남발 | 이메일에 *du coup* 가득 → 너무 캐주얼 |
| 회화에 격식체 | 친구에게 *par conséquent* → 매우 어색 |
| 구어 chunk 자체 모름 | *du coup, en gros, t'inquiète* 거의 안 씀 → "교과서 프랑스어" 인식 |
| 격식체-반말 혼용 | 한 글에 *vous*와 *tu* 섞기 |
| 어휘 register 불일치 | *je vais bouffer* (속어) → 격식 글에 |
| 인사 register | *Salut!* (친구) vs *Bonjour Madame* (격식) 혼동 |

→ 사용자 메모리에 등록된 "한국어 화자 약점"에 추가 항목.

## DELF 평가에서의 의미

| 시험 | 핵심 register | 잘못 사용 시 |
|------|--------------|-------------|
| DELF 작문 (PI) | 문어 / 공유 | 회화체 사용 시 감점 |
| DELF 구술 (PO) | 구어 / 공유 | 격식체 과다 시 부자연 |
| DELF 듣기 (CO) | 구어 (이해만) | 인지만 OK |
| DELF 독해 (CE) | 문어 (이해만) | 인지만 OK |

→ **B1+ 통과 = register 인식 필수**.

## 향후 발전 가능성 ⭐

### 1. Register 세분화 (B2+ 학습 시)

현재 3분류 (문어/구어/공유) → 향후 5분류 가능:

| 단계 | 명칭 | 추가 시점 |
|------|------|----------|
| 1 | Soutenu | C1 학습 시 |
| 2 | **Courant (현재 "문어")** | 현재 |
| 3 | **Familier (현재 "구어")** | 현재 |
| 4 | Populaire | (선택, 회화 능숙 시) |
| 5 | Argot | (특수 관심 시) |

→ B2+ 진입 시 active-cards.md의 register 필드를 5단계로 확장.

### 2. 발화 상황별 sub-register

구어 안에서도 상황 분리:
- 가족 / 친구 (Familier)
- 직장 동료 / 비공식 (Standard 회화)
- 상사 / 격식 (Formel 회화)
- 공공 발표 / 매체 (Soutenu 구어)

→ DELF B2/C1 구술 평가 = 격식 회화 능력 측정.

### 3. Genre 별 chunk 분류

문어 안에서도 장르 분리:
- 이메일 (격식 / 친근)
- 기사 / 보고서
- 의견글 / 에세이
- 문학 / 시
- 학술 논문

→ 각 장르별 정형 표현 풀.

### 4. 시대 / 세대 분류

- 구식 (parents+ 세대)
- 현대 표준
- 젊은이 (MZ 세대 회화)
- 인터넷 / SNS 표현

→ 회화 자연스러움의 더 미세한 영역.

### 5. 지역 분류

- France (파리 / 남부)
- Belgique (벨기에 프랑스어)
- Suisse (스위스 프랑스어)
- Québec (캐나다 프랑스어)

→ 사용자가 특정 지역 친근감 형성 시 활용.

### 6. 다국어 확장 — 일반 원칙

이 register 분리 전략은 **언어 비특정 (language-agnostic)**:

| 언어 | 적용 가능성 |
|------|-----------|
| 스페인어 | ⭐⭐⭐⭐⭐ (구어 vs 문어 강한 차이) |
| 이탈리아어 | ⭐⭐⭐⭐⭐ (Italian formal vs informal) |
| 독일어 | ⭐⭐⭐⭐ (Sie vs du, formal Schriftsprache) |
| 일본어 | ⭐⭐⭐⭐⭐ (경어 체계, 매우 강한 register) |
| 한국어 | (모국어, 이미 본능적 인식) |

**2027 새 언어 학습 시**:
- 같은 active-cards.md 구조 + register 필드 활용
- 첫 6개월: Standard register만 (단순화)
- 6개월 후: 구어/문어 분리 도입
- → **본 시스템이 다국어 공통 인프라**가 될 수 있음

### 7. AI 활용 자동 register 분류

향후 Claude 또는 다른 AI 도구로:
- 자동 register 분류 (chunk 입력 시 자동 태그)
- Register 불일치 자동 감지 (글에 회화 chunk 사용 시 경고)
- Register 변환 ("이 회화 표현을 격식체로")

→ 6월 인프라 구축 시 5질문 알고리즘에 register 자동 분류 포함.

### 8. Register-aware 작문 평가

DELF 채점표에 register 일관성 항목이 명시적으로는 없지만, 채점관이 implicit 평가.
향후 자체 평가 메트릭에 명시적 추가:
- "Register 일관성 점수" (0~5)
- 한 글에 register 혼용 시 감점

→ 사용자 평가 시스템에 추가 가능.

## 한 줄 요약

> **Chunk는 문어/구어/공유로 구분하여 학습**. active-cards.md + register 필드로 통합 관리.
> Q3에 공유 chunk 학습 → Q4 베이스 자동. 학습 효율 ↑.
> 향후 5단계 세분화, 다국어 확장, 자동 분류 등으로 발전 가능.

## 참조 위치

- **Q3 작문 노트**: `docs/Q3-writing-design-notes.md`
- **Q4 말하기 노트**: `docs/Q4-speaking-design-notes.md`
- **사용자 함정 카드**: 향후 `writing/contrastive-cliches.md` (register 함정 포함)

## 6월 인프라 구축 체크리스트 (이 문서 관련)

- [ ] active-cards.md에 **register 필드** 명시
- [ ] 5질문 알고리즘에 **register 자동 분류** 로직
- [ ] 사전 chunk 풀 ~900개 정리 시 **register 필드 입력**
- [ ] /write에 **register 필터링 자동 적용** (문어/공유만)
- [ ] /speak (Q4)에 **register 필터링 자동 적용** (구어/공유만)
- [ ] (선택) Register 일관성 평가 메트릭

## 다음 토론 주제 (5~9월)

- 사전 풀의 register 분포 결정 (30/30/40 비율 적정한가)
- B2+ 학습 시 register 5단계 확장 시점
- Register 자동 분류 정확도 (Claude의 한계)
- 다국어 확장 시 register 시스템 보편화 방안

## 이론적 배경 (5/2 토론 추가) ⭐

### 응용 언어학의 두 진영 — 50년 논쟁

| 진영 | 입장 | 학습관 |
|------|------|--------|
| **Generative Grammar** (Chomsky 1957~) | 언어 = 문법 규칙 + 어휘 | 규칙 + 단어 → 무한 조합 |
| **Lexical Approach** (Lewis 1993) | 언어 = 거대한 chunk 집합 | chunk 모으기 + 약간 변형 |

**Lewis의 명언**:
> "Language is grammaticalised lexis, not lexicalised grammar."
> (언어는 문법화된 어휘이지, 어휘화된 문법이 아니다.)

→ 현대 우세 관점: **Lewis 쪽**. 학습 효율성 측면에서 chunk 중심 학습이 더 효과적.

### 주요 chunk 중심 이론

| 이론 | 핵심 주장 |
|------|----------|
| **Lexical Approach** (Lewis 1993) | 언어 80%+가 chunk |
| **Construction Grammar** (Goldberg 1995) | 모든 단위(단어~구문)가 form-meaning pair |
| **Usage-based theory** (Tomasello, Bybee) | 언어 = 사용 통계로 학습된 패턴 |
| **Formulaic Language Research** (Wray 2002, Erman & Warren 2000) | L1 화자 발화의 **~50%가 chunk** (실증 연구) |

### L1 vs L2 학습 메커니즘

**용어 정의**:
- **L1** (First Language): 모국어, 어린 시절 자연 습득
- **L2** (Second Language): 두 번째 학습한 언어 (외국어)
- **L3, L4...**: 세 번째, 네 번째 언어

**핵심 차이**:

| | L1 (어린이 모국어) | L2 (성인 외국어) |
|---|------------------|----------------|
| 시기 | 만 0~5세 결정적 시기 | 어느 시기든 |
| 방법 | 무의식적, 노출만 | 의식적, 의도적 |
| 속도 | 5년에 모든 기본 | 5년에 B2 도달 어려움 |
| 음소 변별 | 모든 음소 가능 | 모국어에 없는 음소 한계 |
| **chunk 축적** | **무의식적 수만 개** | **의식적 학습 필수** |
| 문법 | 자동 추출 | 명시적 학습 필요 |
| 궁극 도달 | 원어민 수준 | "이해 가능한 외국인" |

→ **L2 학습자는 L1 화자처럼 chunk를 무의식 축적할 수 없음 → 의식적 카드화 필요**.

### 비율 추정 (L1 화자)

L1 화자 일상 발화/작문:
- **80~90%가 chunk** (다양한 크기)
- **10~20%가 새 조합** (chunk 변형 + 새 단어 결합)

→ Q3/Q4에 chunk 1,000개 능동화 = 일상의 80~90%를 자연스럽게 처리 가능.

### LLM 비유 (컴퓨터공학 관점)

| 인간 L2 학습 | LLM (Claude/GPT) |
|------------|-----------------|
| chunk 수집 | 토큰 시퀀스 통계 학습 |
| 빈도 효과 | n-gram 가중치 |
| 자연스러움 = chunk 적합도 | 다음 토큰 예측 확률 |
| 새 표현 생성 = chunk 변형 | 학습된 패턴 외삽 |

**Transformer = 거대한 chunk 학습 기계**. 인간 언어 학습과 메커니즘 유사.
→ LLM이 자연스럽게 작동한다는 것 자체가 chunk 중심 언어관의 증거.

### L3 효과 (Cross-linguistic transfer)

SLA 연구:
- **L2를 잘 배운 사람은 L3을 더 효율적으로 배움**
- 메타 학습 효과 — L2 학습 경험 = 학습 전략 자체 습득
- 특히 로망스어 (프랑스어 ↔ 스페인어/이탈리아어/포르투갈어) 간 전이 강함

**사용자 적용**:
- 프랑스어 B1 안정 후 스페인어 학습 시 → 6개월에 B1 가능 예상
- 어휘 70%+ 추측 가능
- 문법 패턴 유사

→ 우리 chunk 시스템이 **L3 학습에도 그대로 활용 가능**.

### Critical Period Hypothesis (결정적 시기 가설)

성인 L2 학습 한계 — 가장 큰 차이는 **음소 변별**:
- 일본어 화자 = /R/ /L/ 변별 한계
- 한국어 화자 = 비음(/R/) /y/ 등 변별 한계

→ 5/1 발음 학습 우선순위 결정 ("이해 가능성 우선, 원어민 발음 추구 X")의 학문적 근거.

### 우리 시스템의 학문적 위치

5/1~5/2 설계한 시스템 = **응용 언어학 현대 우세 관점과 일치**:

| 시스템 요소 | 학문적 근거 |
|----------|------------|
| Chunk 중심 학습 | Lewis (Lexical Approach), Wray (Formulaic Language) |
| 빈도 기반 우선순위 | Usage-based theory (Bybee, Tomasello) |
| 4-tier 카테고리 (formule/connecteur 등) | Construction Grammar (Goldberg) |
| Register 분리 | Sociolinguistics |
| SRS (간격 반복) | 빈도 효과 시뮬레이션 |
| 발음은 핵심 음소만 | Critical Period Hypothesis |
| 다국어 확장 가능성 | L3 효과 (Cross-linguistic transfer) |

→ **단순 직관이 아니라 학문적으로 검증된 가장 효율적 방향**.

## 학습 순서 결정 (5/2 결정) ⭐

### 두 옵션 비교

| 측면 | Q3 쓰기 먼저 (선택) | Q3 말하기 먼저 (옵션) |
|------|------------------|--------------------|
| 가용 시간 적합성 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **인프라 부담** ⭐ | ⭐⭐⭐⭐⭐ (텍스트만) | ⭐⭐ (Whisper+웹앱 1달+) |
| 사용자 부담 (원어민) | ⭐⭐⭐⭐⭐ | ⭐⭐ |
| Q2 문법 토대 직접 활용 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| 공유 chunk 시너지 | ⭐⭐⭐⭐⭐ (Q3 → Q4 자동) | ⭐⭐⭐⭐ |
| 자연스러움 일상 효용 | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| L1 학습 경로 | ⚠️ | ⭐⭐⭐⭐ |
| 동기 부여 (즉시 효과) | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

→ **5 vs 3 — 쓰기 먼저 우위**.

### 결정적 요인

**1. 인프라 부담 차이 (가장 결정적)**
- 쓰기 = Claude만으로 가능 (인프라 0)
- 말하기 = Whisper + francais-tres-facile 확장 (1달+ 작업)
- 말하기 먼저 → 6월 인프라 작업 + 학습 동시 → 둘 다 부족
- 9월 인프라 작업 (Q4 직전 1달) = 적절

**2. 사용자 부담 (원어민 1:1 부담)**
- 메모리 등록: "원어민 부담 → 단계적 접근"
- 첫 분기에 강도 높은 회화 = 부담

**3. Q3 학습이 Q4 베이스 (시너지)**
- 공유 chunk 400 학습 = Q4 베이스 60%
- Q4 새 학습 = 250 → 150~200으로 감소 가능

### 보강 안 (5/2 추가)

Q3 동안 구어 chunk 부분 노출:

| 활동 | 빈도 | 효과 |
|------|------|------|
| Q3 작문에서 구어 chunk 만남 시 T4 (인지만) 등록 | 자동 | Q4 시작 시 "처음 보는 것" X |
| 주 1~2회 짧은 shadowing (10~15분) | 7~9월 보조 | Q4 인프라 미리 익숙 |
| 꼬마 니콜라 / 유튜브 시청 시 구어 chunk 의식 | 자율 | 인지 누적 |

→ Q4 시작 시점: 공유 chunk 400 + 구어 chunk 50~100 인지 = **새 학습 ~150~200개만**.

### 한 줄 결론

> **Q3 쓰기 먼저 + 보조 shadowing 유지**. 인프라 부담 차이가 결정적 요인.
> Q3 학습이 Q4의 60% 토대 자동 생성 → 효율 극대화.
