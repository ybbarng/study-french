// 검토 패치를 새 표현 초안(drafts/*.json)에 적용한다 (2026-11-23).
// 사용: node speaking/tools/apply-review.mjs <초안.json> <패치.json>
// 패치: [{id, field("fr"|"example.fr"|…), from, to, why}]. from이 지금 값과 다르면 적용하지 않고 알린다.
import { readFileSync, writeFileSync } from "node:fs";

const [draftPath, patchPath] = process.argv.slice(2);
const draft = JSON.parse(readFileSync(draftPath, "utf8"));
const patches = JSON.parse(readFileSync(patchPath, "utf8"));
const byId = new Map(draft.map((x) => [x.id, x]));
let ok = 0;
const bad = [];
for (const p of patches) {
  const x = byId.get(p.id);
  if (!x) {
    bad.push(`${p.id}: 없는 id`);
    continue;
  }
  const [a, b] = p.field.split(".");
  const cur = b ? x[a]?.[b] : x[a];
  if (cur !== p.from) {
    bad.push(`${p.id}.${p.field}: from 불일치 (지금: ${cur})`);
    continue;
  }
  if (b) x[a][b] = p.to;
  else x[a] = p.to;
  ok++;
}
writeFileSync(draftPath, `${JSON.stringify(draft, null, 2)}\n`);
console.log(`적용 ${ok}개, 실패 ${bad.length}개`);
if (bad.length) console.log(bad.join("\n"));
