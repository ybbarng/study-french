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
