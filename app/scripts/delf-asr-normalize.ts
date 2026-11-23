// Whisper 받아쓰기를 대본과 비교하기 전에 맞춘다.
// 대본은 숫자를 낱말로 쓰고(say 가 잘못 읽지 않게), Whisper 는 숫자로 적기 때문이다.
// 숫자 → 낱말 함수는 화면(숫자 듣기)과 같이 쓰려고 src/lib 에 둔다.

import { frenchNumber } from "../src/lib/french-number.ts";

export { frenchNumber };

/** 숫자 덩어리 하나: 0 으로 시작하는 두 자리 이상(전화번호 등)은 한 자리씩 읽는다 */
function spellGroup(digits: string): string {
  if (digits.length > 1 && digits.startsWith("0")) {
    return `zéro ${frenchNumber(Number(digits.slice(1)))}`;
  }
  return frenchNumber(Number(digits));
}

/** Whisper 가 소리 없는 끝부분에 지어내는 자막 문구 */
const HALLUCINATIONS = [/sous-?titrage[^.]*\.?/gi, /sous-?titres?[^.]*amara[^.]*\.?/gi];

export function normalizeHeard(text: string): string {
  let t = text;
  for (const re of HALLUCINATIONS) t = t.replace(re, " ");
  return (
    t
      // 1 000 / 1.000 처럼 끊어 쓴 천 단위를 붙인다
      .replace(/(\d)[ .  ](?=\d{3}\b)/g, "$1")
      // 10h15, 14h, 14 h 30
      .replace(/(\d+)\s*h\s*(\d{2})?\b/gi, (_, h: string, m?: string) =>
        m ? `${spellGroup(h)} heures ${spellGroup(m)}` : `${spellGroup(h)} heures`
      )
      .replace(/(\d+)\s*%/g, (_, d: string) => `${spellGroup(d)} pour cent`)
      .replace(/(\d+)\s*€/g, (_, d: string) => `${spellGroup(d)} euros`)
      .replace(/\d+/g, (d) => spellGroup(d))
  );
}
