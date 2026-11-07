// 맥락 문장을 expressions.json에 합치고, ChatGPT 프로젝트 파일(chatgpt-contexts.md)을 만든다.
// 사용: node speaking/tools/build-contexts.mjs [맥락 JSON]
//   맥락 JSON을 주면 그 내용으로 각 표현의 contexts를 바꾼다. 안 주면 expressions.json에 있는 contexts로 md만 다시 만든다.
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const dir = join(dirname(fileURLToPath(import.meta.url)), "..");
const jsonPath = join(dir, "expressions.json");
const mdPath = join(dir, "chatgpt-contexts.md");
const data = JSON.parse(readFileSync(jsonPath, "utf8"));

// 깊게 다시 배우는 순서 (Session 28부터 2개씩). 새 표현 → 구어·반응 → 서사 → 의견 → 복구 → 묘사
const FIRST_SESSION = 28;
const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => `E${String(a + i).padStart(2, "0")}`);
const order = [...range(82, 90), ...range(61, 81), ...range(34, 48), ...range(49, 60), ...range(1, 15), ...range(16, 33)];

const src = process.argv[2];
if (src) {
  const ctx = JSON.parse(readFileSync(src, "utf8"));
  for (const e of data.expressions) {
    const list = ctx[e.id];
    if (!Array.isArray(list) || list.length !== 5) throw new Error(`${e.id}: 맥락이 5개가 아님`);
    for (const c of list) for (const k of ["cue", "cueKo", "reply", "replyKo"]) if (!c[k]) throw new Error(`${e.id}: ${k} 비어 있음`);
    e.contexts = list.map(({ cue, cueKo, reply, replyKo, direction, combo }) => ({
      cue,
      cueKo,
      reply,
      replyKo,
      ...(direction ? { direction } : {}),
      ...(combo ? { combo } : {}),
    }));
  }
}
const sessions = [];
for (let i = 0; i < order.length; i += 2) sessions.push({ session: FIRST_SESSION + i / 2, ids: order.slice(i, i + 2) });
data.deepSessions = sessions;
data.updatedAt = new Date().toISOString().slice(0, 10);
writeFileSync(jsonPath, `${JSON.stringify(data, null, 2)}\n`);

const byId = Object.fromEntries(data.expressions.map((e) => [e.id, e]));
const last = sessions.at(-1).session;

// 세션마다 다시 꺼낼 맥락을 미리 계산한다(ChatGPT가 계산하면 틀린다, 2026-11-08 확인).
// N-1의 두 표현 = 맥락 4, N-3 = 5, N-7 = 2, N-14 = 3 (N-3·7·14는 N이 짝수면 첫째, 홀수면 둘째).
// 아직 v9 순서에 없는 세션(28 미만) 자리는 「다시 볼 표현」을 차례로 채운다(맥락 4).
const reviewIds = data.expressions.filter((e) => e.review).map((e) => e.id);
let reviewCursor = 0;
const recall = new Map();
for (const s of sessions) {
  const today = new Set(s.ids);
  const picks = [];
  const fromReview = () => {
    for (let k = 0; k < reviewIds.length; k++) {
      const id = reviewIds[(reviewCursor + k) % reviewIds.length];
      if (!today.has(id) && !picks.some((p) => p.startsWith(`${id}-`))) {
        reviewCursor = (reviewCursor + k + 1) % reviewIds.length;
        return `${id}-4`;
      }
    }
    return null;
  };
  for (const [gap, ctx, both] of [
    [1, 4, true],
    [3, 5, false],
    [7, 2, false],
    [14, 3, false],
  ]) {
    const prev = sessions.find((p) => p.session === s.session - gap);
    if (!prev) {
      for (let k = 0; k < (both ? 2 : 1); k++) {
        const p = fromReview();
        if (p) picks.push(p);
      }
      continue;
    }
    const ids = both ? prev.ids : [prev.ids[s.session % 2 === 0 ? 0 : prev.ids.length - 1]];
    for (const id of ids) picks.push(`${id}-${ctx}`);
  }
  recall.set(s.session, picks);
}
const lines = [
  "# chatgpt-contexts.md — 말하기 수업 맥락 문장 (지침 v9가 읽는 파일)",
  "",
  `[순서] 세션마다 오늘 표현 2개. 한 바퀴가 끝나면 처음부터 다시 돈다: S${last + 1} = S${FIRST_SESSION}, S${last + 2} = S${FIRST_SESSION + 1} …`,
  ...sessions.map((s) => `S${s.session} ${s.ids.join(" ")}`),
  "",
  "[다시 꺼내기] 세션마다 ①에 낼 맥락. E25-4 = E25의 맥락 4번. 이 목록 그대로 쓴다.",
  ...sessions.map((s) => `S${s.session} ① ${recall.get(s.session).join(" ")}`),
  "",
  `[다시 볼 표현] 지난 수업에서 틀리거나 흔들린 표현: ${data.expressions
    .filter((e) => e.review)
    .map((e) => e.id)
    .join(" ")}`,
  "",
  "[맥락] 1~3 = 처음 배우는 날 a·b·c, 4~5 = 다시 꺼내기. 형식: 번호 「상황」 [연출: 말하는 방식] 한국어 → 답 예시",
];
for (const id of order) {
  const e = byId[id];
  lines.push("", `${id} ${e.fr} = ${e.ko}`);
  (e.contexts || []).forEach((c, i) =>
    lines.push(`${i + 1} 「${c.cue}」${c.direction ? ` [연출: ${c.direction}]` : ""} ${c.cueKo} → ${c.reply}`),
  );
}
writeFileSync(mdPath, `${lines.join("\n")}\n`);
console.log(`세션 ${sessions.length}개 (S${FIRST_SESSION}~S${last}), 맥락 있는 표현 ${data.expressions.filter((e) => e.contexts).length}개`);
