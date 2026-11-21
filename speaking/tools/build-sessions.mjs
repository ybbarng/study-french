// 말하기 v10 세션 카드 파일을 만든다 (2026-11-21).
// expressions.json 의 예문과 맥락 1번(질문 → 대답)으로 세션마다 카드를 미리 적어 둔다.
// ChatGPT는 이 파일의 「S N」 카드를 글자 그대로 출력·진행한다(문장을 새로 만들지 않게).
// 사용: node speaking/tools/build-sessions.mjs  → speaking/chatgpt-sessions.md
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const dir = join(dirname(fileURLToPath(import.meta.url)), "..");
const data = JSON.parse(readFileSync(join(dir, "expressions.json"), "utf8"));
const byNum = new Map(data.expressions.map((e) => [Number(e.id.slice(1)), e]));

// 순서: S28부터 3개씩. E82~90 → E61~81 → E34~60 → E01~33 (S28~S57).
const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
const order = [...range(82, 90), ...range(61, 81), ...range(34, 60), ...range(1, 33)];
const sets = [];
for (let i = 0; i < order.length; i += 3) sets.push(order.slice(i, i + 3));
const before = { 21: [61, 62, 63], 22: [64, 65, 66], 23: [67, 68, 69], 24: [70, 71, 72], 25: [73, 74, 75], 26: [76, 77, 78], 27: [79, 80, 81] };
const FIRST = 28;
const neu = (n) => (n >= FIRST ? sets[n - FIRST] : before[n]);

// 소리 낼 표현: 틀 기호를 뺀다(« Il vaut mieux + 동사원형 » → « Il vaut mieux… »)
const spoken = (fr) => fr.replace(/\s*\+\s*\S+/g, "…").replace(/\s*…/g, "…").replace(/…+/g, "…").trim();
// 긴 예문은 쉼표·마침표에서 두 조각으로
const pieces = (s) => {
  if (s.split(/\s+/).length <= 7) return null;
  const cuts = [...s.matchAll(/[,.?!] /g)].map((m) => m.index + 1);
  if (!cuts.length) return null;
  const mid = s.length / 2;
  const c = cuts.sort((a, b) => Math.abs(a - mid) - Math.abs(b - mid))[0];
  return [s.slice(0, c).trim(), s.slice(c).trim()];
};
const id = (n) => `E${String(n).padStart(2, "0")}`;

const out = [
  "# 말하기 세션 카드 (v10)",
  "",
  "이 파일은 스크립트가 만든다(speaking/tools/build-sessions.mjs). 「S N」 카드를 글자 그대로 쓴다.",
  "복습 줄 = 한국어 → 프랑스어 정답. 표현의 「말하기」 = 소리 내어 말할 형태(틀 기호 없음).",
  "",
];
for (let k = 0; k < sets.length; k++) {
  const n = FIRST + k;
  out.push(`## S ${n}`, "");
  out.push(`Session ${n}`, "순서: 복습 → 표현 1·2·3 → 연습 → 끝", "복습:");
  for (const s of [n - 1, n - 3, n - 7]) {
    for (const x of neu(s) ?? []) {
      const e = byNum.get(x);
      out.push(` ${e.id} ${e.example.ko} → ${e.example.fr}`);
    }
  }
  out.push("오늘 표현:");
  sets[k].forEach((x, i) => {
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
console.log(`S${FIRST}~S${FIRST + sets.length - 1} 카드 ${sets.length}개`);
