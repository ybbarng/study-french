# Étudier le français (study-fr)

말하기 표현 복습, 듣기, DELF 모의고사를 한 곳에서 이어 하는 프랑스어 학습 사이트입니다. 운영 주소는 `https://study-fr.byb.kr`, 폰에서는 PWA 로 씁니다. 옛 이름은 Français Très Facile(RFI 연습 사이트)이고, 2026-11-23 study-french 저장소 `app/` 으로 옮기며 통합 사이트로 바꿨습니다.

## 화면 구성

학습 영역 다섯 개로 묶습니다. 폰은 아래 탭, 넓은 화면은 헤더 탭으로 오갑니다. 영역 배정은 `src/components/layout/nav.ts` 에 있습니다.

| 영역 | 화면 |
|---|---|
| Accueil `/` | 오늘 이어 할 것(표현 연습, 다음 RFI 연습, 이어 할 쉐도잉, 숫자 듣기, 다음 DELF 세트)과 영역별 진도 |
| Parler `/parler` | 표현 복습 `/expressions`, 표현 연습 게임 `/expressions/practice`. 표현 원본은 study-french `speaking/expressions.json` |
| Écouter `/ecouter` | RFI 「Journal en français facile」 연습 `/exercises`, 이어 듣기 `/playlist`, 쉐도잉 `/shadowing`, 숫자 듣기 `/numbers`, 끝낸 연습 `/completed` |
| DELF `/delf` | DELF A1~B2 모의고사 |
| Suivi `/suivi` | RFI 통계 `/statistics`, 2026 1분기 버즈챌린지 인증 화면 `/buzz-challenge/janvier`·`fevrier`·`mars` |

화면별 데이터와 문서는 [HANDOFF.md](HANDOFF.md) "화면과 데이터".

## 시작하기

pnpm 은 `/opt/homebrew/bin/pnpm` 으로 부릅니다.

```bash
pnpm install
pnpm prisma:generate
node scripts/migrate-progress.ts   # 로컬 progress.db 마이그레이션(멱등)
ADMIN_PASSWORD=local-test pnpm dev
```

[http://localhost:3000](http://localhost:3000)에서 앱을 확인할 수 있습니다.

## 동기화 명령어

RFI 사이트에서 콘텐츠를 가져오는 동기화 스크립트입니다.

```bash
# 도움말
pnpm sync help

# 전체 동기화 (모든 섹션 스크래핑 + H5P 추출)
pnpm sync full

# H5P URL만 업데이트 (기본값)
pnpm sync update-h5p

# 스크립트(Transcription)만 업데이트
pnpm sync update-transcript
```

## 테스트

```bash
pnpm test
```

## 린트

```bash
pnpm lint
```

## 배포

byb.kr 서버에서 Docker 컨테이너로 돕니다(nginx → Traefik → ftf). `main`에 push 하면 GitHub Actions가
이미지를 빌드해 GHCR에 올리고 서버에 배포합니다. 배포 전 `progress.db` 백업, 멱등 마이그레이션, 헬스체크(`/api/progress`)를 거칩니다.

배포 흐름과 DB 안전 정책 자세한 내용은 [docs/DEPLOY.md](docs/DEPLOY.md).

## 기술 스택

- **프레임워크**: Next.js 16 (App Router)
- **언어**: TypeScript
- **스타일링**: Tailwind CSS
- **데이터베이스**: SQLite + Prisma ORM
- **테스트**: Vitest + React Testing Library
- **크롤링**: Cheerio
