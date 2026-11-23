// 프랑스어 숫자 듣기: 문제 만들기, 채점, 한 판 진행.
// 화면 밖에서 시험할 수 있게 난수(rng)는 넣어 받는다.

import { frenchNumber, frenchNumberFeminine } from "@/lib/french-number";

export const NUMBER_RANGES = [
  "small",
  "mid",
  "hard",
  "hundreds",
  "year",
  "price",
  "time",
  "phone",
] as const;
export type NumberRange = (typeof NUMBER_RANGES)[number];

export const NUMBER_RANGE_LABELS: Record<NumberRange, string> = {
  small: "0~20",
  mid: "21~69",
  hard: "70~99 (어려움)",
  hundreds: "100~999",
  year: "연도",
  price: "가격",
  time: "시각",
  phone: "전화번호",
};

export const NUMBER_RANGE_EXAMPLES: Record<NumberRange, string> = {
  small: "quinze",
  mid: "quarante-sept",
  hard: "quatre-vingt-dix-sept",
  hundreds: "trois cent quatre-vingts",
  year: "mille neuf cent quatre-vingt-sept",
  price: "douze euros cinquante",
  time: "quatorze heures trente-cinq",
  phone: "zéro six, douze, trente-quatre…",
};

/** 입력 칸 아래에 보이는 적는 법 */
export const NUMBER_RANGE_INPUT_HINTS: Record<NumberRange, string> = {
  small: "숫자로 적으세요.",
  mid: "숫자로 적으세요.",
  hard: "숫자로 적으세요.",
  hundreds: "숫자로 적으세요.",
  year: "네 자리로 적으세요. 예: 1987",
  price: "12,50 또는 12.50 (센트 없이 1250 도 됩니다)",
  time: "14 h 35 는 1435 처럼 붙여 적어도 됩니다",
  phone: "열 자리를 붙여 적으세요. 예: 0612345678",
};

export type Rng = () => number;

export interface NumberQuestion {
  range: NumberRange;
  /** 보이는 정답 표기: "97", "12,50 €", "14 h 35", "06 12 34 56 78" */
  display: string;
  /** 프랑스어 낱말 표기(읽어 주는 글도 이것) */
  words: string;
  /** 같은 문제인지 가리는 값 */
  key: string;
}

/** [min, max] 정수 */
function randInt(rng: Rng, min: number, max: number): number {
  return Math.floor(rng() * (max - min + 1)) + min;
}

function integerQuestion(range: NumberRange, n: number): NumberQuestion {
  return { range, display: String(n), words: frenchNumber(n), key: `${range}:${n}` };
}

export function priceWords(euros: number, cents: number): string {
  const head = `${frenchNumber(euros)} ${euros >= 2 ? "euros" : "euro"}`;
  return cents === 0 ? head : `${head} ${frenchNumber(cents)}`;
}

export function priceQuestion(euros: number, cents: number): NumberQuestion {
  const display = `${euros},${String(cents).padStart(2, "0")} €`;
  return { range: "price", display, words: priceWords(euros, cents), key: `price:${display}` };
}

export function timeWords(hour: number, minute: number): string {
  const head = `${frenchNumberFeminine(hour)} ${hour >= 2 ? "heures" : "heure"}`;
  return minute === 0 ? head : `${head} ${frenchNumberFeminine(minute)}`;
}

export function timeQuestion(hour: number, minute: number): NumberQuestion {
  const display = `${hour} h ${String(minute).padStart(2, "0")}`;
  return { range: "time", display, words: timeWords(hour, minute), key: `time:${display}` };
}

/** 두 자리 묶음 하나: "06" → "zéro six", "00" → "zéro zéro" */
function phonePairWords(pair: string): string {
  return pair.startsWith("0")
    ? `zéro ${frenchNumber(Number(pair[1]))}`
    : frenchNumber(Number(pair));
}

/** 전화번호 열 자리(0 으로 시작)를 두 자리씩 읽는다. 쉼표는 읽을 때 쉬는 자리 */
export function phoneWords(digits: string): string {
  return (digits.match(/\d{2}/g) ?? []).map(phonePairWords).join(", ");
}

export function phoneQuestion(digits: string): NumberQuestion {
  const display = (digits.match(/\d{2}/g) ?? []).join(" ");
  return { range: "phone", display, words: phoneWords(digits), key: `phone:${digits}` };
}

// 휴대폰(06·07)이 많고, 유선(01~05)·09 도 가끔
const PHONE_PREFIXES = ["06", "06", "06", "07", "07", "01", "02", "03", "04", "05", "09"];

/** 범위 하나에서 문제 하나 */
export function makeQuestion(range: NumberRange, rng: Rng): NumberQuestion {
  switch (range) {
    case "small":
      return integerQuestion(range, randInt(rng, 0, 20));
    case "mid":
      return integerQuestion(range, randInt(rng, 21, 69));
    case "hard":
      return integerQuestion(range, randInt(rng, 70, 99));
    case "hundreds":
      return integerQuestion(range, randInt(rng, 100, 999));
    case "year":
      return integerQuestion(range, randInt(rng, 1900, 2099));
    case "price": {
      // 가게 값처럼 ,00 ·,50 ·,99 가 자주 나오게 한다
      const euros = randInt(rng, 1, 199);
      const pick = rng();
      const cents = pick < 0.2 ? 0 : pick < 0.35 ? 50 : pick < 0.45 ? 99 : randInt(rng, 1, 98);
      return priceQuestion(euros, cents);
    }
    case "time":
      return timeQuestion(randInt(rng, 0, 23), randInt(rng, 0, 59));
    case "phone": {
      const prefix = PHONE_PREFIXES[randInt(rng, 0, PHONE_PREFIXES.length - 1)];
      let rest = "";
      for (let i = 0; i < 8; i++) rest += String(randInt(rng, 0, 9));
      return phoneQuestion(prefix + rest);
    }
  }
}

/** 고른 범위들에서 서로 다른 문제 count 개. 범위는 고르게 돌아가며 뽑는다 */
export function planQuestions(
  ranges: readonly NumberRange[],
  count: number,
  rng: Rng
): NumberQuestion[] {
  if (!ranges.length) return [];
  const out: NumberQuestion[] = [];
  const seen = new Set<string>();
  // 0~20 처럼 좁은 범위만 골라도 끝나게 시도 횟수를 둔다
  for (let tries = 0; out.length < count && tries < count * 50; tries++) {
    const range = ranges[randInt(rng, 0, ranges.length - 1)];
    const q = makeQuestion(range, rng);
    if (seen.has(q.key)) continue;
    seen.add(q.key);
    out.push(q);
  }
  return out;
}

// ── 채점 ─────────────────────────────────────────────

function digitGroups(input: string): string[] {
  return input.match(/\d+/g) ?? [];
}

function sameInteger(a: string, b: number): boolean {
  return a !== "" && Number(a) === b;
}

function gradePrice(q: NumberQuestion, input: string): boolean {
  const m = q.display.match(/^(\d+),(\d{2})/);
  if (!m) return false;
  const euros = Number(m[1]);
  const cents = Number(m[2]);
  const cleaned = input.replace(/[\s €]/g, "");
  const sep = cleaned.search(/[.,]/);
  if (sep >= 0) {
    const e = cleaned.slice(0, sep).replace(/\D/g, "");
    // ",5" 는 50 센트로 본다
    const c = cleaned
      .slice(sep + 1)
      .replace(/\D/g, "")
      .padEnd(2, "0");
    return sameInteger(e || "0", euros) && c.length === 2 && Number(c) === cents;
  }
  const d = cleaned.replace(/\D/g, "");
  if (d === "") return false;
  if (sameInteger(d, euros * 100 + cents) && d.length >= 3) return true;
  return cents === 0 && sameInteger(d, euros);
}

function gradeTime(q: NumberQuestion, input: string): boolean {
  const m = q.display.match(/^(\d+) h (\d{2})$/);
  if (!m) return false;
  const hour = Number(m[1]);
  const minute = Number(m[2]);
  const groups = digitGroups(input);
  if (groups.length === 2) return sameInteger(groups[0], hour) && sameInteger(groups[1], minute);
  if (groups.length !== 1) return false;
  const d = groups[0];
  if (d.length >= 3) return sameInteger(d.slice(0, -2), hour) && sameInteger(d.slice(-2), minute);
  // "14" 만 적으면 정각일 때만 맞다
  return minute === 0 && sameInteger(d, hour);
}

/** 입력이 정답인지. 공백·점·쉼표 같은 구분 기호는 무시한다 */
export function gradeAnswer(q: NumberQuestion, input: string): boolean {
  switch (q.range) {
    case "price":
      return gradePrice(q, input);
    case "time":
      return gradeTime(q, input);
    case "phone":
      // 앞의 0 까지 열 자리를 그대로 본다
      return input.replace(/\D/g, "") === q.display.replace(/\D/g, "");
    default: {
      const d = input.replace(/\D/g, "");
      return sameInteger(d, Number(q.display));
    }
  }
}

// ── 한 판 ───────────────────────────────────────────

export const ROUND_SIZE = 10;
export const RETRY_GAP = 2;
export const MAX_RETRY = 2;

export interface RoundItem {
  question: NumberQuestion;
  /** 다시 나온 횟수(처음은 0) */
  retry: number;
}

/** 답한 뒤 남은 줄. 틀리면 RETRY_GAP 문제 뒤에 같은 문제를 다시 넣는다(최대 MAX_RETRY 번) */
export function queueAfterAnswer(
  rest: readonly RoundItem[],
  item: RoundItem,
  correct: boolean,
  { gap = RETRY_GAP, maxRetry = MAX_RETRY }: { gap?: number; maxRetry?: number } = {}
): RoundItem[] {
  if (correct || item.retry >= maxRetry) return rest.slice();
  const at = Math.min(gap, rest.length);
  return [
    ...rest.slice(0, at),
    { question: item.question, retry: item.retry + 1 },
    ...rest.slice(at),
  ];
}
