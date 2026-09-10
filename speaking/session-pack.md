# 세션 팩 — 상태 독립 말하기 커리큘럼 (Session 1~60)

> **왜 이 파일이 있나**: 2026-09-19 \~ 10-11 여행 중 맥북이 없어 GitHub·카드 갱신이 불가능하다. 그래서 **진행 상황을 어디에도 저장하지 않아도 굴러가는** 커리큘럼이 필요하다.
>
> **핵심 장치**: 진도의 기준이 날짜가 아니라 **세션 번호**다. 매일 안 해도 되고(빠진 날이 날아가지 않음), 하루에 여러 번 해도 겹치지 않는다(그만큼 진도가 나감).
>
> **세션 번호를 아는 법**: 세션 = 대화방 1개, 매번 새 방을 만든다 → **프로젝트 안의 대화방 개수 + 1 = 오늘 세션 번호.** 기억하거나 메모할 필요가 없다.

## 1. 진행 규칙 (산술 — 표가 필요 없음)

```
Session N (1 ≤ N ≤ 30)
  신규 = E(3N-2), E(3N-1), E(3N)
  복습 = Session N-1 · N-3 · N-7 의 신규   (번호가 1보다 작으면 건너뜀)

Session N (N ≥ 31)
  신규 없음. 회전 복습 = E((3N-2) mod 90), E((3N-1) mod 90), E(3N mod 90)
  대신 과제 난이도를 올린다 (아래 3-B)
```

예) Session 13 → 신규 E37·E38·E39 / 복습 = Session 12(E34\~36) · Session 10(E28\~30) · Session 6(E16\~18)

## 2. 세션 절차 (ChatGPT가 따를 것)

1. 사용자가 « Session N »이라고 말하면 위 산술로 오늘 항목을 정한다. **사용자에게 목록을 읽어주지 않는다.**
2. **복습 먼저**: 해당 표현이 자연스럽게 필요해지는 질문을 던진다. **암송을 요구하지 않는다.**
3. **신규 3개**: 상황을 만들어 그 표현이 나오게 유도한다. 안 나오면 한 번 모델을 들려주고 사용자가 쓰게 한다.
4. 나머지는 자유 대화. **유창성·지속이 최우선**, 교정은 한 번에 하나만.
5. 세션 끝에 **채팅에 한 줄** 남긴다 (음성으로 길게 읽지 않는다):
   ```
   FR-PROGRESS | Session N | I: (도움 없이 쓴 표현) | H: (힌트 후) | F: (못 씀)
   ```
6. 가능하면 위 한 줄을 **프로젝트 메모리에도 저장**한다. 저장이 안 되면 그냥 넘어간다 (진행에 지장 없음).

## 3. 과제 난이도

**A. Session 1~30 (기본)** — 표현이 나오는 상황을 만들고, 문장으로 답하게 한다.

**B. Session 31~60 (심화)** — 같은 표현을 다음 조건에서 다시 쓰게 한다:
- **시간 압박**: "20초 안에 3문장으로"
- **제약**: "그 단어를 쓰지 말고 설명해봐"
- **전환**: 현재 이야기를 과거로 / 1인칭을 3인칭으로
- **연결**: 표현 2개를 한 문장에 넣기
- **반론**: 사용자 의견에 ChatGPT가 반대 입장을 취하고 방어하게 하기

## 4. 표현 목록 (E01 \~ E90)

### 블록 A — 생존·복구 (E01\~E15) · Session 1\~5
막혔을 때 대화를 이어가는 도구. **여기가 가장 중요하다** — 이게 되면 나머지 세션이 굴러간다.

| 번호 | 표현 | 뜻 |
|---|---|---|
| E01 | Peux-tu répéter, s'il te plaît ? | 다시 말해줄래? |
| E02 | Plus lentement, s'il te plaît. | 더 천천히 |
| E03 | Peux-tu l'écrire ? | 그거 써줄래? (발음이 안 들릴 때 최강) |
| E04 | Qu'est-ce que ça veut dire, … ? | …가 무슨 뜻이야? |
| E05 | Comment on dit … en français ? | …를 프랑스어로 뭐라고 해? |
| E06 | Je cherche le mot. | 단어가 생각이 안 나 |
| E07 | Je ne sais pas comment le dire. | 어떻게 말해야 할지 모르겠어 |
| E08 | Je veux dire que … | 내 말은 …라는 거야 |
| E09 | C'est-à-dire … | 그러니까 = |
| E10 | Attends, je réfléchis. | 잠깐, 생각 좀 할게 |
| E11 | Ce n'est pas ça. Je recommence. | 그게 아니야. 다시 말할게 |
| E12 | C'est une sorte de … | 일종의 …야 (단어 모를 때 우회) |
| E13 | C'est comme … mais … | …랑 비슷한데 …해 |
| E14 | Tu me comprends ? | 내 말 알아들었어? |
| E15 | Je n'ai pas bien compris ta question. | 질문을 잘 못 알아들었어 |

### 블록 B — 묘사 (E16\~E33) · Session 6\~11
여행 중 매일 쓸 것. 장소·날씨·음식·사람.

| 번호 | 표현 | 뜻 |
|---|---|---|
| E16 | Je suis à … / Je suis en train de … | …에 있어 / …하는 중이야 |
| E17 | Il y a beaucoup de … | …이 많아 |
| E18 | Ça ressemble à … | …처럼 생겼어 |
| E19 | Il fait froid / frais / doux. | 춥다 / 선선하다 / 포근하다 |
| E20 | Le ciel est dégagé / couvert. | 하늘이 맑다 / 흐리다 |
| E21 | C'est au bord de … | …가에 있어 (바닷가·호숫가) |
| E22 | On voit … au loin. | 저 멀리 …가 보여 |
| E23 | Ça sent bon. | 냄새가 좋다 |
| E24 | C'est délicieux / fade / trop salé. | 맛있다 / 싱겁다 / 너무 짜다 |
| E25 | J'ai goûté … pour la première fois. | …를 처음 먹어봤어 |
| E26 | C'est une spécialité de la région. | 이 지역 명물이야 |
| E27 | Les gens ont l'air … | 사람들이 …해 보여 |
| E28 | Il y a du monde / Il n'y a personne. | 사람이 많다 / 아무도 없다 |
| E29 | C'est calme / animé. | 조용하다 / 활기차다 |
| E30 | Ça coûte à peu près … | 대략 …쯤 해 |
| E31 | Je trouve ça … | 내가 보기엔 …해 |
| E32 | Ce qui m'a frappé, c'est … | 인상적이었던 건 …야 |
| E33 | À côté de moi, il y a … | 내 옆에 …가 있어 |

### 블록 C — 서사 (E34\~E48) · Session 12\~16
과거 이야기. 복합과거·반과거를 **구어 속도로** 굴리는 게 목표.

| 번호 | 표현 | 뜻 |
|---|---|---|
| E34 | Ce matin, je suis allé à … | 오늘 아침 …에 갔어 |
| E35 | D'abord … et ensuite … | 먼저 … 그다음 … |
| E36 | Après ça, on a décidé de … | 그 후에 …하기로 했어 |
| E37 | Pendant que j'attendais, … | 기다리는 동안 … |
| E38 | Tout à coup, … | 갑자기 … |
| E39 | Je ne m'y attendais pas. | 예상 못 했어 |
| E40 | On a eu de la chance. | 운이 좋았어 |
| E41 | Ça a duré environ … | 대략 … 걸렸어 |
| E42 | J'ai failli + 원형 | 하마터면 …할 뻔했어 |
| E43 | On s'est perdus. | 우리 길을 잃었어 |
| E44 | J'ai oublié … / J'ai perdu … | …를 깜빡했어 / 잃어버렸어 |
| E45 | Heureusement, … / Malheureusement, … | 다행히 … / 아쉽게도 … |
| E46 | Finalement, ça s'est bien passé. | 결국 잘 됐어 |
| E47 | C'était la première fois que … | …한 건 처음이었어 |
| E48 | Je m'en souviendrai longtemps. | 오래 기억에 남을 거야 |

### 블록 D — 의견·비교 (E49\~E60) · Session 17\~20
한국 ↔ 일본 비교가 자연스러운 소재.

| 번호 | 표현 | 뜻 |
|---|---|---|
| E49 | À mon avis, … | 내 생각엔 |
| E50 | Je trouve que … / Je pense que … | …라고 생각해 |
| E51 | Contrairement à …, … | …와 달리 |
| E52 | En Corée, on … alors qu'ici, on … | 한국에선 …하는데 여기선 … |
| E53 | …, eux, le font. | …사람들은 그렇게 해 (대동사) |
| E54 | C'est plus … que … | …보다 더 …해 |
| E55 | Ce que je préfère, c'est … | 내가 제일 좋아하는 건 …야 |
| E56 | Ça dépend de … | …에 따라 달라 |
| E57 | Je suis d'accord, mais … | 동의하는데, 다만 … |
| E58 | Ce n'est pas une erreur, c'est une différence. | 틀린 게 아니라 다른 거야 |
| E59 | D'un côté … de l'autre … | 한편으론 … 다른 한편으론 … |
| E60 | Ça vaut la peine. / Ça n'en vaut pas la peine. | 그럴 가치가 있어 / 없어 |

### 블록 E — 감정·반응·구어 담화표지 (E61\~E72) · Session 21\~24
**말이 사람처럼 들리게** 만드는 부분. 문어에는 안 나오는 것들.

| 번호 | 표현 | 뜻 |
|---|---|---|
| E61 | En fait, … | 사실은 |
| E62 | Du coup, … | 그래서 (구어) |
| E63 | Quand même ! | 그래도 / 참나 |
| E64 | Bref, … | 요컨대 |
| E65 | Ça m'a plu. / Ça ne m'a pas plu. | 좋았어 / 별로였어 |
| E66 | J'étais content(e) de … | …해서 좋았어 |
| E67 | J'ai été surpris(e) par … | …에 놀랐어 |
| E68 | Ça m'énerve un peu. | 좀 짜증나 |
| E69 | J'ai hâte de … | …가 기대돼 |
| E70 | Ça m'est égal. | 난 상관없어 |
| E71 | Tant pis. / Tant mieux. | 할 수 없지 / 잘됐네 |
| E72 | Franchement, … | 솔직히 |

### 블록 F — 계획·가정·조언 (E73\~E84) · Session 25\~28

| 번호 | 표현 | 뜻 |
|---|---|---|
| E73 | Demain, on va … | 내일 …할 거야 |
| E74 | J'ai l'intention de … | …할 생각이야 |
| E75 | Si j'ai le temps, je … | 시간 있으면 … |
| E76 | Il faut réserver à l'avance. | 미리 예약해야 해 |
| E77 | Ça vaut mieux de … | …하는 편이 나아 |
| E78 | Tu devrais … | 너 …하는 게 좋겠어 |
| E79 | À ta place, je … | 내가 너라면 … |
| E80 | J'aimerais … (조건법) | …하고 싶어 (공손) |
| E81 | Si j'avais su, j'aurais … | 알았더라면 …했을 텐데 |
| E82 | Ça dépend du temps qu'il fera. | 날씨에 따라 달라 |
| E83 | On verra. | 두고 보자 |
| E84 | En principe, on part à … | 원칙적으론 …에 출발해 |

### 블록 G — 롤플레이 (E85\~E90) · Session 29\~30
홋카이도는 프랑스어권이 아니라 **가상 연습**이지만, 상호작용 훈련으로 유지.

| 번호 | 표현 | 뜻 |
|---|---|---|
| E85 | Je voudrais …, s'il vous plaît. | …주세요 |
| E86 | Vous auriez une table pour deux ? | 두 명 자리 있나요? |
| E87 | Il y a un problème avec … | …에 문제가 있어요 |
| E88 | Est-ce que vous pourriez m'aider ? | 도와주실 수 있나요? |
| E89 | Pour aller à …, c'est par où ? | …에 가려면 어느 쪽인가요? |
| E90 | Je peux payer par carte ? | 카드로 계산돼요? |

## 5. 대화 주제 풀 (신규 표현 유도용 상황)

**일상·묘사**: 오늘 어디 있어? / 뭐 먹었어? / 날씨 / 찍은 사진 묘사 / 사람·분위기
**서사**: 어제 하루 / 지금까지 최고의 순간 / 작은 해프닝 / 처음 먹어본 음식 / 인상적인 만남
**의견·비교**: 여기 vs 한국 / 혼자 vs 함께 여행 / 가장 놀란 것 / 여행 총평
**계획**: 내일 뭐 할 거야? / 남은 일정 / 다음에 또 온다면
**롤플레이**: 주문 / 길 묻기 / 호텔 프런트 / 쇼핑 / 돌발 상황(분실·지각)

> 홋카이도 소재: 단풍·온천·동물원·해산물·수프카레·라멘·기차 이동·가을 음식 축제(삿포로·아사히카와)·눈 없는 가을 풍경.
> 사용자가 2026-09-04 작문(`writing/exercises/2026-09-04-작문-홋카이도.md`)에서 이 소재의 어휘를 이미 다뤘다 → **쓰기에서 말하기로 전이**시키기 좋다.

## 6. 사용자 약점 (참고만, 과교정 금지)
- 실시간 수준 A1 후반\~A2 (읽기·쓰기는 B1). **아는 것을 그 자리에서 조립하는 속도가 병목.**
- 반복 오류: 전치사(chez·à/dans) · 성수 일치 · 총칭 관사 les · 동사 인칭
- 긴 질문을 못 알아듣는 경우가 있다 → **10단어 이내로 짧게, 한 번에 하나만**
- ChatGPT 음성이 'un'을 영어 /ɜːr/처럼 뭉개는 버그가 있었다 → 안 들리면 **E03(써줄래?)**로 넘어가게 유도
