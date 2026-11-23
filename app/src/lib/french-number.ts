// 숫자를 프랑스어 낱말로 바꾼다. 화면(숫자 듣기)과 DELF 받아쓰기 대조 스크립트가 같이 쓴다.
// 낱말 사이는 1990 개정 전 표기(띄어쓰기)를 따른다: "deux cent quatre-vingts".

const UNITS = [
  "zéro",
  "un",
  "deux",
  "trois",
  "quatre",
  "cinq",
  "six",
  "sept",
  "huit",
  "neuf",
  "dix",
  "onze",
  "douze",
  "treize",
  "quatorze",
  "quinze",
  "seize",
];
const TENS: Record<number, string> = {
  2: "vingt",
  3: "trente",
  4: "quarante",
  5: "cinquante",
  6: "soixante",
};

function below20(n: number): string {
  return n < 17 ? UNITS[n] : `dix-${UNITS[n - 10]}`;
}

function below100(n: number): string {
  if (n < 20) return below20(n);
  if (n < 70) {
    const t = Math.floor(n / 10);
    const u = n % 10;
    if (u === 0) return TENS[t];
    return u === 1 ? `${TENS[t]} et un` : `${TENS[t]}-${UNITS[u]}`;
  }
  if (n < 80) return n === 71 ? "soixante et onze" : `soixante-${below20(n - 60)}`;
  if (n === 80) return "quatre-vingts";
  return `quatre-vingt-${below20(n - 80)}`;
}

function below1000(n: number): string {
  if (n < 100) return below100(n);
  const h = Math.floor(n / 100);
  const r = n % 100;
  const head = h === 1 ? "cent" : `${UNITS[h]} cent${r === 0 ? "s" : ""}`;
  return r === 0 ? head : `${head} ${below100(r)}`;
}

/** 0 이상 정수를 프랑스어 낱말로 (999 999 까지) */
export function frenchNumber(n: number): string {
  if (!Number.isInteger(n) || n < 0 || n > 999_999) return String(n);
  if (n < 1000) return below1000(n);
  const k = Math.floor(n / 1000);
  const r = n % 1000;
  const head = k === 1 ? "mille" : `${below1000(k)} mille`;
  return r === 0 ? head : `${head} ${below1000(r)}`;
}

/** 여성 명사(heure, minute) 앞에서 끝의 un 을 une 로: "vingt et une heures" */
export function frenchNumberFeminine(n: number): string {
  return frenchNumber(n).replace(/\bun$/, "une");
}
