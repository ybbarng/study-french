// 말하기 v10 세션 카드 파일을 만든다 (2026-11-21).
// expressions.json 의 예문과 맥락 1번(질문 → 대답)으로 세션마다 카드를 미리 적어 둔다.
// ChatGPT는 이 파일의 「S 월-회차」 카드를 글자 그대로 출력·진행한다(문장을 새로 만들지 않게).
// 사용: node speaking/tools/build-sessions.mjs  → speaking/chatgpt-sessions.md
//
// 구성 (2026-11-21 사용자 결정)
// - 오늘 표현: 11-01~11-04는 이미 한 그대로(E82~90, E61~63). 11-05부터는 새 표현 E91~ 3개씩.
// - 복습: 1·3·7회 전 세션의 오늘 표현(9줄) + 옛 표현 E01~E90을 3개씩 돌리는 줄(한 달에 한 바퀴).
// - 세션 이름 = 월-회차(11-01 … 11-30). 새 표현이 모자란 회차는 만들지 않는다.
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const dir = join(dirname(fileURLToPath(import.meta.url)), "..");
const data = JSON.parse(readFileSync(join(dir, "expressions.json"), "utf8"));
const byNum = new Map(data.expressions.map((e) => [Number(e.id.slice(1)), e]));
const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);

// 세션 순서(0 = 11-01)
const DONE = [[82, 83, 84], [85, 86, 87], [88, 89, 90], [61, 62, 63]]; // 11-01~11-04, 이미 함
const newIds = [...byNum.keys()].filter((n) => n >= 91).sort((a, b) => a - b);
const sessions = [...DONE];
for (let i = 0; i + 3 <= newIds.length; i += 3) sessions.push(newIds.slice(i, i + 3));
const MONTHS = ["11", "12"];
const PER_MONTH = 30;
const count = Math.min(sessions.length, MONTHS.length * PER_MONTH);
const label = (i) => `${MONTHS[Math.floor(i / PER_MONTH)]}-${String((i % PER_MONTH) + 1).padStart(2, "0")}`;
// 11-01 이전(옛 번호 S21~S27)의 오늘 표현: 복습 계산용
const before = { "-7": [61, 62, 63], "-6": [64, 65, 66], "-5": [67, 68, 69], "-4": [70, 71, 72], "-3": [73, 74, 75], "-2": [76, 77, 78], "-1": [79, 80, 81] };
const todayOf = (i) => (i >= 0 ? sessions[i] : before[String(i)]);

// 옛 표현 돌리기(복습 줄 3개): 11월은 11-05부터 E01~E90을 한 바퀴.
// 12월부터는 그 달 1회차부터 「지난달 새로 배운 표현 → 그 앞의 표현」 순서로 돈다.
const OLD_NOV = [...range(64, 81), ...range(34, 60), ...range(1, 33), ...range(61, 63), ...range(82, 90)];
const oldPool = (monthIdx) => {
  if (monthIdx === 0) return OLD_NOV;
  const learnedBefore = new Set([...OLD_NOV, ...sessions.slice(0, monthIdx * PER_MONTH).flat()]);
  const prevMonthNew = sessions
    .slice((monthIdx - 1) * PER_MONTH, monthIdx * PER_MONTH)
    .flat()
    .filter((x) => !OLD_NOV.includes(x)); // 11월이면 E91~E168
  const rest = [...learnedBefore].filter((x) => !prevMonthNew.includes(x)).sort((a, b) => a - b);
  return [...prevMonthNew, ...rest];
};
const oldOf = (i) => {
  const monthIdx = Math.floor(i / PER_MONTH);
  if (monthIdx === 0 && i < DONE.length) return [];
  const pool = oldPool(monthIdx);
  const start = monthIdx === 0 ? i - DONE.length : i % PER_MONTH;
  const k = (start * 3) % pool.length;
  return pool.slice(k, k + 3);
};

// 소리 낼 표현: 틀 기호를 뺀다(« Il vaut mieux + 동사원형 » → « Il vaut mieux… »)
// 괄호 속 덧붙임도 뺀다(« J'en ai marre (de …). » → « J'en ai marre. »)
const spoken = (fr) =>
  fr
    .replace(/\s*\([^)]*\)/g, "")
    .replace(/\s*\+\s*\S+/g, "…")
    .replace(/\s*…/g, "…")
    .replace(/…+/g, "…")
    .trim();
// 긴 예문은 쉼표·마침표에서 두 조각으로
const pieces = (s) => {
  if (s.split(/\s+/).length <= 7) return null;
  const cuts = [...s.matchAll(/[,.?!] /g)].map((m) => m.index + 1);
  if (!cuts.length) return null;
  const mid = s.length / 2;
  const c = cuts.sort((a, b) => Math.abs(a - mid) - Math.abs(b - mid))[0];
  return [s.slice(0, c).trim(), s.slice(c).trim()];
};
const reviewLine = (x) => {
  const e = byNum.get(x);
  return ` ${e.id} ${e.example.ko} → ${e.example.fr}`;
};

const out = [
  "# 말하기 세션 카드 (v10)",
  "",
  "이 파일은 스크립트가 만든다(speaking/tools/build-sessions.mjs). 「S 월-회차」 카드를 글자 그대로 쓴다.",
  "복습 줄 = 한국어 → 프랑스어 정답. 표현의 「말하기」 = 소리 내어 말할 형태(틀 기호 없음).",
  "",
];
for (let k = 0; k < count; k++) {
  const n = label(k);
  out.push(`## S ${n}`, "");
  out.push(`Session ${n}`, "순서: 복습 → 표현 1·2·3 → 연습 → 끝", "복습:");
  const seen = new Set(sessions[k]);
  const lines = [];
  for (const s of [k - 1, k - 3, k - 7]) for (const x of todayOf(s) ?? []) if (!seen.has(x)) (seen.add(x), lines.push(x));
  for (const x of oldOf(k)) if (!seen.has(x)) (seen.add(x), lines.push(x));
  out.push(...lines.map(reviewLine));
  out.push("오늘 표현:");
  sessions[k].forEach((x, i) => {
    const e = byNum.get(x);
    const c = e.contexts[0];
    out.push(`${i + 1}. ${e.id} ${e.fr} = ${e.ko}`);
    out.push(` 말하기) ${spoken(e.fr)}`);
    out.push(` 예) ${e.example.fr} — ${e.example.ko}`);
    const p = pieces(e.example.fr);
    if (p) out.push(` 조각) ${p[0]} / ${p[1]}`);
    out.push(` 질문) ${c.cue} — ${c.cueKo} → ${c.reply}`);
  });
  out.push(`연습: 질문 3 → 1 → 2 (예문 없이 다시)`);
  out.push("→ 카드를 소리 내어 한 번 읽고 음성 버튼을 눌러.", "");
}
writeFileSync(join(dir, "chatgpt-sessions.md"), `${out.join("\n")}\n`);
console.log(`${label(0)}~${label(count - 1)} 카드 ${count}개 (새 표현 ${newIds.length}개)`);
