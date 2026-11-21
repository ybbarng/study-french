// 새 표현(E91~)을 expressions.json에 더한다 (2026-11-21).
// 사용: node speaking/tools/add-expressions.mjs <새표현.json>
// 입력: [{id, group, fr, ko, example{fr,ko}, cue, cueKo, reply, replyKo, source}]
// - id는 기존 끝 번호 다음부터 빠짐없이 이어져야 한다. 같은 fr이 이미 있으면 멈춘다.
// - session = 옛 세션 번호(숫자, 11-01 = 28), sessionName = 배울 세션 이름(11-05부터 3개씩), learned = false, contexts = [맥락 1개].
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const dir = join(dirname(fileURLToPath(import.meta.url)), "..");
const path = join(dir, "expressions.json");
const data = JSON.parse(readFileSync(path, "utf8"));
const add = JSON.parse(readFileSync(process.argv[2], "utf8"));

const GROUPS = { F: "반응·맞장구", G: "의견·생각", H: "부탁·제안·약속", I: "감정·상태" };
const norm = (s) => s.toLowerCase().replace(/[^a-zà-ÿ' ]/g, "").trim();
const have = new Set(data.expressions.map((e) => norm(e.fr)));
const last = Math.max(...data.expressions.map((e) => Number(e.id.slice(1))));
const FIRST_NEW_SESSION = 5; // 11-05
const label = (i) => {
  const n = FIRST_NEW_SESSION - 1 + Math.floor(i / 3); // 0-based within months of 30
  return `${["11", "12"][Math.floor(n / 30)]}-${String((n % 30) + 1).padStart(2, "0")}`;
};

const errors = [];
add.forEach((x, i) => {
  const want = `E${last + 1 + i}`;
  if (x.id !== want) errors.push(`${x.id}: id가 ${want}이어야 함`);
  if (!GROUPS[x.group]) errors.push(`${x.id}: group ${x.group}`);
  for (const k of ["fr", "ko", "cue", "cueKo", "reply", "replyKo", "source"]) if (!x[k]?.trim()) errors.push(`${x.id}: ${k} 비어 있음`);
  if (!x.example?.fr || !x.example?.ko) errors.push(`${x.id}: example 비어 있음`);
  if (have.has(norm(x.fr))) errors.push(`${x.id}: 이미 있는 표현 ${x.fr}`);
  have.add(norm(x.fr));
});
if (add.length % 3) errors.push(`개수 ${add.length}는 3의 배수가 아님`);
if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

Object.assign(data.groups, GROUPS);
for (const [i, x] of add.entries()) {
  data.expressions.push({
    id: x.id,
    group: x.group,
    fr: x.fr,
    ko: x.ko,
    example: { fr: x.example.fr, ko: x.example.ko },
    // FTF /expressions는 session이 숫자여야 한다(옛 번호: 11-01 = 28). 세션 이름은 sessionName에.
    session: 28 + FIRST_NEW_SESSION - 1 + Math.floor(i / 3),
    sessionName: label(i),
    learned: false,
    source: x.source,
    contexts: [{ cue: x.cue, cueKo: x.cueKo, reply: x.reply, replyKo: x.replyKo }],
  });
}
data.updatedAt = new Date().toISOString().slice(0, 10);
writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`);
console.log(`${add.length}개 추가: ${add[0].id}~${add.at(-1).id}, 세션 ${label(0)}~${label(add.length - 1)}`);
