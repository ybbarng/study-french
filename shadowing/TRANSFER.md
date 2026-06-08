# 쉐도잉 → francais-tres-facile (ftf) 이전 가이드

이 디렉토리(`grammaire-francaise/shadowing/`)를 ftf repo로 옮길 때 새 세션이 따라가도록 작성. **`SPEC.md`(설계)·`NOTES.md`(운영)·이 파일을 차례로 읽고 시작한다.**

## 현재 상태 (2026-06-08 기준)

- 배포 URL: https://gh.byb.kr/grammaire-francaise/shadowing/ (GitHub Pages, main/root, custom domain)
- 자료 1개: Le Petit Nicolas Chapitre 1 — 83 sentences / 17 paragraphs / 8 segments / 405s
- 사이트 = 정적 HTML/CSS/JS (Next.js 아님). ftf로 옮길 때 Next.js·TS로 변환.

## 옮길 파일

```
shadowing/
├── SPEC.md                  ✅ 옮김 (설계 문서)
├── NOTES.md                 ✅ 옮김 (운영 가이드 — 자료 추가 절차, config 옵션, 한계, 디버깅)
├── TRANSFER.md              ❌ ftf 이전 후 삭제 (이 파일은 일회용)
├── pipeline.py              ✅ 옮김 (자료 생성 파이프라인)
├── configs/                 ✅ 옮김 (자료별 config)
├── data/                    ✅ 옮김 (단, *_whisper.json·*_silences.json은 캐시라 제외)
├── audio/                   ✅ 옮김 (단, source.mp3·silence.mp3는 캐시라 제외)
├── index.html               ⚠ Next.js 페이지로 변환 (홈 목록)
├── material.html            ⚠ Next.js 페이지로 변환 (자료 학습 페이지)
├── css/style.css            ⚠ Tailwind로 변환 (사용자 선호 스택)
└── js/                      ⚠ TypeScript React 컴포넌트로 변환
```

## Next.js 변환 가이드 (사용자 선호 스택)

- Framework: Next.js (App Router)
- 언어: TypeScript (`strict: true`)
- 스타일: Tailwind CSS, shadcn-ui, `cn()` (clsx + tailwind-merge)
- 상태: zustand (currentUnit·currentIndex·currentStep 등)
- 패키지 매니저: pnpm
- 린트/포맷: biome (indent space 2)
- Git hooks: lefthook
- 그 외: react-hook-form / zod (필요 시) / date-fns / @tanstack/react-query (자료 fetch)

### 페이지 매핑
- `app/page.tsx` ← `index.html` + `js/home.js` (자료 목록)
- `app/[materialId]/page.tsx` ← `material.html` + `js/material.js` (학습 페이지, 5단계 + 녹음)
- 데이터: `public/data/materials.json` + `public/data/{id}.json`
- 오디오: `public/audio/{id}/full.mp3` 등

### 5단계 학습 흐름 (그대로 유지)
1. 첫 듣기 — 자막 OFF, 1.0x
2. 텍스트+듣기 — 자막 ON, 1.0x
3. Slow Shadowing — 자막 ON, 0.75x
4. Pure Shadowing — 자막 OFF, 1.0x
5. 셀프 체크 — 녹음 (MediaRecorder API, HTTPS 필요)

### 학습 단위 (4개, 순서)
**문장 → 문단 → 구간 → 전체** (사용자가 6/7 결정한 순서. material.html 탭 순서 그대로).

### 녹음 기능
- MediaRecorder API (audio/webm)
- 키: `${currentUnit}_${currentIndex}` → Blob
- A/B 비교 (원본 재생 → 0.5s 정지 → 내 녹음)
- 다운로드 링크 자동 생성
- HTTPS 환경 필수 (GitHub Pages·Vercel 자동 HTTPS, localhost는 예외)

## 운영 정보 (memory에서 가져온 핵심)

### 알려진 한계 (`NOTES.md`에 자세히)

1. **음악 → 음성 전환 (챕터 시작)**
   - ffmpeg silencedetect는 음악을 silence로 안 잡음 (음량 ~-19dB)
   - Whisper도 음악을 첫 단어 sub-token에 흡수해서 word.start=0
   - → `overrides`로 `start` 수동 지정. 챕터당 1건.
   - 자동화 옵션: silero-vad 도입 (Next.js 호환은 별도 작업)

2. **노래로 부르는 챕터 제목**: Whisper timestamp 매우 부정확. overrides로 처리.

3. **끝 자음 잘림** (6/8 두 단계로 보완):
   - word 직후 punctuation 토큰 audio time을 word.end에 흡수 (`extract_whisper_words`)
   - `default_tail_pad` 0.2s 기본 padding
   - 여전히 짧으면 0.3으로 늘리거나 자료별 override

4. **silence 없는 sentence 경계**: silence-snap window(1.2s) 밖 → padding으로 대응. `snap_window` 자료별 조정 가능.

### 자료 추가 시 config 형식 (`configs/nicolas-1.json` 참조)

필수 필드 + 사용자 결정한 기본값은 `NOTES.md` "Config 옵션" 표 참고. 핵심:
- `material_id`, `language`, `audio_source`, `reference_text`, `whisper_model`
- `title_text` (챕터 제목 별도 sentence로)
- `overrides` (sentence 인덱스별 start/end 강제)
- `silence_noise_db: '-30dB'`, `silence_min_duration: 0.2`, `snap_window: 1.2`, `snap_pad: 0.05`
- `default_lead_pad: 0.05`, `default_tail_pad: 0.2`
- `silence_sec: 0.3` (sentence 사이 무음)
- `segment_target_sec: 60`

### 검증 카테고리 (`pipeline.py` 출력 `data/{id}_report.json`)
- **OK** — 깨끗
- **FALSE_POSITIVE** — 발음 동일 매칭 통과 (끝 묵음 등)
- **REAL_CUT_END / REAL_CUT_START** — 단어 누락, auto_fix가 boundary 확장
- **EXTRA_AT_START / EXTRA_AT_END** — 군더더기, auto_fix가 trim

### nicolas-1 적용된 override (참고)
```json
"overrides": {
  "1": { "start": 25.4, "end": 27.02 },   // 노래 제목
  "2": { "start": 32.72 }                 // 음악→음성 전환
}
```

## .gitignore 패턴 (캐시 제외)

```
shadowing/audio/*/source.mp3
shadowing/audio/*/silence.mp3
shadowing/data/*_whisper.json
shadowing/data/*_silences.json
```

ftf에서는 `audio/*/source.mp3` 같이 경로 조정.

## 새 세션이 memory에 저장할 항목

ftf 프로젝트의 memory는 비어 있으니, 아래 두 항목을 다시 저장:

1. **project_shadowing** — ftf 컨텍스트로 갱신
   - 배포 위치: ftf의 새 도메인 (정해진 후)
   - 사이트 = Next.js·TS
   - 자료 = Le Petit Nicolas Chapitre 1 (이전 후 동일)
   - 다음 자료 추가는 `configs/<id>.json` + `python3 pipeline.py`

2. **project_shadowing-pipeline-limits** — 한계와 대응 패턴
   - 음악 전환 override 패턴
   - 끝 자음 보완 (punctuation 흡수 + padding)
   - silence-snap window 조정
   - 검증 카테고리 분포 점검

## 이전 후 처리 (grammaire-francaise 쪽)

1. `git rm -r shadowing/` (커밋 히스토리는 보존)
2. `.gitignore`에서 shadowing 관련 패턴 제거
3. `.nojekyll`은 다른 용도 없으니 같이 제거 가능
4. GitHub Pages 비활성화 또는 ftf로 도메인 이전

## 검증

이전 후 ftf 사이트가 정상 동작하는지 확인:
- 로컬: `pnpm dev` → http://localhost:3000
- 자료 목록 로드 / 학습 페이지 진입 / 5단계 전환 / 단위 4개 (문장→전체) / 녹음 + A/B 비교
- 정적 빌드 (`pnpm build && pnpm start`)에서 audio 경로 정상
- 배포 후 HTTPS에서 녹음 권한 정상
