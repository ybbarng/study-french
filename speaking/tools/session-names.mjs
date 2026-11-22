// 모든 표현에 「처음 배운 세션」 이름(sessionName)과 번호(session)를 매긴다 (2026-11-23).
// 사용: node speaking/tools/session-names.mjs
//
// - sessionName = 월-회차(대화방 이름과 같다). 10월은 대화방 10-01~10-30(옛 001~030).
// - session = 달이 바뀌어도 순서가 맞는 번호: 10월 1~30, 11월 31~60, 12월 61~90, 1월 91~ …
//   FTF /expressions는 session이 숫자여야 하고, 「마지막으로 한 세션」 목록을 이 번호 순으로 만든다.
// - E01~E90: 아래 표(speaking/state/current.md 세션표의 대화방 기준, 처음 배운 곳. E61~E63만 다시 배운 11-04).
// - E91~: 이미 붙은 sessionName을 그대로 두고 번호만 다시 계산한다.
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const dir = join(dirname(fileURLToPath(import.meta.url)), "..");
const path = join(dir, "expressions.json");
const data = JSON.parse(readFileSync(path, "utf8"));

// [첫 표현 번호, 끝 표현 번호, 세션 이름]
const FIRST_LEARNED = [
  [1, 6, "10-01"], // S1: 카드는 E01~03, 실제로는 E06까지
  [7, 9, "10-04"],
  [10, 12, "10-06"],
  [13, 15, "10-08"],
  [16, 18, "10-09"],
  [19, 21, "10-10"],
  [22, 24, "10-11"],
  [25, 27, "10-12"],
  [28, 30, "10-13"],
  [31, 33, "10-14"],
  [34, 36, "10-15"],
  [37, 39, "10-16"],
  [40, 42, "10-17"],
  [43, 45, "10-18"],
  [46, 48, "10-19"],
  [49, 51, "10-20"],
  [52, 54, "10-21"],
  [55, 57, "10-22"],
  [58, 60, "10-23"],
  [61, 63, "11-04"], // 10-24(10-31 몰아서, 카드 보며 함 — 인출 아님)가 아니라 제대로 배운 11-04로
  [64, 66, "10-25"],
  [67, 69, "10-26"],
  [70, 72, "10-27"],
  [73, 75, "10-28"],
  [76, 78, "10-29"],
  [79, 81, "10-30"],
  [82, 84, "11-01"],
  [85, 87, "11-02"],
  [88, 90, "11-03"],
];

export const sessionNumber = (name) => {
  const [m, d] = name.split("-").map(Number);
  const monthIndex = (m - 10 + 12) % 12; // 10월 = 0, 11월 = 1, 12월 = 2, 1월 = 3 …
  return monthIndex * 30 + d;
};

for (const e of data.expressions) {
  const n = Number(e.id.slice(1));
  if (n <= 90) {
    const row = FIRST_LEARNED.find(([a, b]) => n >= a && n <= b);
    if (!row) throw new Error(`${e.id}: 세션 표에 없음`);
    e.sessionName = row[2];
    e.learned = true; // E01~E90은 10월~11-04에 모두 배웠다
  }
  if (!e.sessionName) throw new Error(`${e.id}: sessionName 없음`);
  e.session = sessionNumber(e.sessionName);
}
data.note =
  "ChatGPT 말하기 수업 표현 원본. sessionName = 처음 배운(배울) 세션 이름(월-회차, 대화방 이름과 같다), session = 순서 번호(10월 1~30, 11월 31~60, 12월 61~90), learned = 이미 배운 표현, review = 다시 볼 이유";
data.updatedAt = new Date().toISOString().slice(0, 10);
writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`);
console.log(`${data.expressions.length}개에 세션 이름·번호를 매김`);
