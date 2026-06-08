# francais-tres-facile (ftf) 로드맵

쉐도잉 도구를 ftf로 이전(2026-06-09 완료)한 시점부터 Q4 말하기 인프라 본격 확장, 그리고 2027 다국어 확장까지의 큰 그림. 작업 트리거는 사용자 결정 시점에 별도 요청서로 만든다.

## 이전 완료 현황

ftf 안 구조:
```
src/app/shadowing/                  ← 페이지 (home + [materialId])
src/features/shadowing/
  components/                       ← 8개로 분리 (MaterialList·ItemSelector·UnitTabs·StepBar·ShadowingPlayer·RecordingPanel·HelpModal)
  lib/                              ← items·assets·format·steps
  store/shadowing-store.ts          ← zustand
  types.ts
shadowing-pipeline/                 ← Python 파이프라인 (별도 디렉토리)
  pipeline.py, configs/, SPEC.md, NOTES.md
public/shadowing/
  data/, audio/nicolas-1/
```

ftf 기존 RFI 시스템(playlist·exercises·buzz-challenge·statistics·Prisma DB)과 **shadowing이 별도 feature로 분리**됨. 헤더 nav 통합 완료.

## 단계별 계획

### 단기 — 지금 ~ 6/24 (시험 직전)
- **ftf 작업 중단**. 6/25 최종 평가가 우선.
- shadowing은 학습 보조로만 (사이트 접근).
- grammaire-francaise에선 시험 범위 복습 + drill만.

### 6/25 직후 ~ 6/30 (Q3 인프라 구축 주간)
- 주로 grammaire-francaise 쪽 (Q3 쓰기 인프라 7개 항목).
- **ftf 쪽 마무리 정리**:
  - grammaire-francaise의 `shadowing/` 디렉토리 삭제 (이전 완료라 중복)
  - GitHub Pages 비활성화 또는 ftf로 도메인 이전
  - ftf 측 `shadowing-pipeline/` 안에 ramp-up 문서가 충분한지 점검

### Q3 (7월 ~ 9월 중) — 쓰기 집중기
- ftf 큰 변화 없음. 보조 shadowing 주 1~2회.
- pipeline.py로 신규 자료 1~2개 추가 가능 (꼬마니콜라 2장 등).
- 발견되는 자잘한 UI 개선만.

### 9월 말 ~ 10월 초 — Q4 사전 작업 (1~2주, 가장 중요)
ftf 본격 확장 시작점.
- **RFI 121개 A2 자료를 shadowing pipeline으로 처리** (`/sync-rfi` 커맨드 도입)
  - 기존 exercises DB와 shadowing 데이터 매핑 결정
  - audio 캐싱 전략 (121개 × paragraphs/sentences → 수 GB)
- **Prisma 스키마 확장**: shadowing 진도 테이블 (사용자·자료·단계·진행률)
- **인증과 결합**: 현재 RFI 시스템에 auth 이미 있으니 shadowing도 묶기
- 음성 인프라 강화 준비 (다음 단계 위해)

### Q4 (10월 ~ 12월) — 말하기 본격기

ftf 추가 기능:
1. **Whisper 전사 통합** (사용자 발화 → 텍스트)
   - 현재 파이프라인의 Whisper는 자료 alignment용. 사용자 발화용 별도 통합 필요.
2. **녹음 영구 저장** (현재 in-memory Blob → DB/S3 또는 로컬 파일)
3. **A/B 비교 강화** — 발음 차이 시각화 (아래 별도 섹션)
4. **요약 말하기 모드** (들은 내용 자기 말로 재진술) — 신규
5. **시나리오 모드** (식당·길찾기 등) — 신규
6. **DELF 구술 모의** — 신규

추가될 슬래시 커맨드 (Claude Code 측):
- `/speak`, `/shadow`, `/prepare`, `/record`, `/sync-rfi`

### 2027 (다국어 확장)
- ftf 구조를 `study-french` 식으로 분리 또는 일반화
- 스페인어 사이트 시작 (스택 동일: Next.js·TS·Tailwind·shadcn·zustand·Prisma)
- pipeline.py 다국어 지원 일반화 (`language` 옵션 이미 있음)

## 발음 차이 시각화 옵션 (Q4)

Q4 학습 목표(5/1 결정): **이해 가능성 > 자연스러움 > 발음 정확성**. 이 우선순위에 맞춰 시각화 방법 선택.

| 방법 | 보는 것 | 구현 난이도 | DELF 평가 매칭 | 우리 우선순위 |
|---|---|---|---|---|
| **단어 단위 정답률** | Whisper로 사용자 발화 transcribe → 원본과 단어 일치율 색 표시 | 쉬움 (이미 pipeline에 Whisper 있음) | "이해 가능성" 1순위 | ⭐ 1 |
| **피치 곡선 (F0)** | 시간×기본 주파수 — 억양 | 중 (ml5.js·Meyda 라이브러리) | "억양" — 한국어 화자 큰 약점 | ⭐ 2 |
| **파형 비교** | 시간×진폭 — 소리 크기·길이·리듬 | 쉬움 (Canvas + HTMLAudio) | "리듬·속도" 직관 | ⭐ 3 |
| **스펙트로그램** | 시간×주파수×에너지 — 음소 차이 | 중 (`wavesurfer.js` spectrogram plugin) | 보조 | 4 |
| **음소 단위 평가 점수** | Azure/Google Pronunciation Assessment API | 쉬움 (API 호출, 유료) | 정밀 평가 | 5 (필요 시) |

권고 (Q4 본격 작업 시):
- **1차**: 단어 단위 정답률 + 파형 비교 (거의 무료, 핵심 가치)
- **2차**: 피치 곡선 (라이브러리만 추가)
- **3차** (필요 시): Azure Pronunciation Assessment (정밀 평가 필요할 때 API)

## 결정해야 할 것 (시점별)

| 시점 | 결정 사항 | 비고 |
|---|---|---|
| 6/26~30 | grammaire-francaise/shadowing 디렉토리 제거 + GitHub Pages 정리 | 안 정리하면 중복 |
| 9월 말 | RFI 121개를 shadowing 모드로 변환할지 / 일부만 변환할지 | 디스크·시간 비용 |
| 9월 말 | Prisma 스키마 shadowing 진도를 RFI exercise와 합칠지 분리할지 | DB 설계 |
| 10월 초 | Whisper 자체 호스팅 vs API (OpenAI) | 비용·속도 |
| 10월 초 | 녹음 저장 정책 (로컬만 / DB / 클라우드) | 사용자 부담 |
| 10월 초 | 발음 시각화 어디까지 구현 (1차 / 2차 / 3차) | 시간·가치 |

## 작업 트리거

이 로드맵은 **참조용**. 실제 작업은:
1. 시점이 오면 사용자가 "ftf에서 X 작업 진행"이라고 요청
2. Claude가 이 문서를 참조해 해당 단계 상세 요청서 작성
3. 사용자 검토 후 ftf 새 세션에서 실행

## 관련 문서

- `shadowing/SPEC.md` — 5단계 학습 흐름, 데이터 구조, UI 컴포넌트 설계
- `shadowing/NOTES.md` — 운영 가이드 (자료 추가 절차, config, 알려진 한계)
- `shadowing/TRANSFER.md` — ftf 이전 가이드 (이전 완료 후 ftf 측에 정리되어야 함)
- memory `project_phased-learning-plan` — Q2~Q4 + 2027 다국어 큰 그림
- memory `project_q3-infra-timing` — 6/26~30 Q3 인프라 작업 시점
- memory `project_shadowing` + `project_shadowing-pipeline-limits` — 쉐도잉 컨텍스트
