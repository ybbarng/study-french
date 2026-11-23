import { describe, expect, it } from "vitest";
import {
  gradeAnswer,
  makeQuestion,
  type NumberQuestion,
  type NumberRange,
  phoneQuestion,
  planQuestions,
  priceQuestion,
  queueAfterAnswer,
  type RoundItem,
  timeQuestion,
} from "../src/features/numbers/lib/numbers";
import { frenchNumber, frenchNumberFeminine } from "../src/lib/french-number";

/** 늘 같은 순서를 내는 난수(시험이 언제 돌아도 같게) */
function seededRng(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 2 ** 32;
  };
}

function integer(range: NumberRange, n: number): NumberQuestion {
  return { range, display: String(n), words: frenchNumber(n), key: `${range}:${n}` };
}

describe("frenchNumber: 70~99 와 연도", () => {
  it.each([
    [70, "soixante-dix"],
    [71, "soixante et onze"],
    [77, "soixante-dix-sept"],
    [80, "quatre-vingts"],
    [81, "quatre-vingt-un"],
    [90, "quatre-vingt-dix"],
    [91, "quatre-vingt-onze"],
    [97, "quatre-vingt-dix-sept"],
    [99, "quatre-vingt-dix-neuf"],
    [1900, "mille neuf cents"],
    [1987, "mille neuf cent quatre-vingt-sept"],
    [2000, "deux mille"],
    [2026, "deux mille vingt-six"],
    [2099, "deux mille quatre-vingt-dix-neuf"],
  ])("%i 을 %s 로 읽는다", (n, words) => {
    expect(frenchNumber(n)).toBe(words);
  });

  it("여성형은 끝의 un 만 une 로 바꾼다", () => {
    expect(frenchNumberFeminine(21)).toBe("vingt et une");
    expect(frenchNumberFeminine(1)).toBe("une");
    expect(frenchNumberFeminine(81)).toBe("quatre-vingt-une");
    expect(frenchNumberFeminine(11)).toBe("onze");
  });
});

describe("가격·시각·전화번호 문제의 표기", () => {
  it("가격은 euros 뒤에 센트를 붙여 읽고, 1 유로는 단수로 쓴다", () => {
    expect(priceQuestion(12, 50)).toMatchObject({
      display: "12,50 €",
      words: "douze euros cinquante",
    });
    expect(priceQuestion(1, 0)).toMatchObject({ display: "1,00 €", words: "un euro" });
    expect(priceQuestion(80, 5)).toMatchObject({
      display: "80,05 €",
      words: "quatre-vingts euros cinq",
    });
  });

  it("시각은 24시간제로 heures 와 분을 여성형으로 읽는다", () => {
    expect(timeQuestion(14, 35)).toMatchObject({
      display: "14 h 35",
      words: "quatorze heures trente-cinq",
    });
    expect(timeQuestion(21, 1)).toMatchObject({
      display: "21 h 01",
      words: "vingt et une heures une",
    });
    expect(timeQuestion(1, 0)).toMatchObject({ display: "1 h 00", words: "une heure" });
    expect(timeQuestion(0, 15)).toMatchObject({ words: "zéro heure quinze" });
  });

  it("전화번호는 두 자리씩 끊어 읽고 0 으로 시작하는 묶음은 zéro 를 앞에 붙인다", () => {
    expect(phoneQuestion("0612345678")).toMatchObject({
      display: "06 12 34 56 78",
      words: "zéro six, douze, trente-quatre, cinquante-six, soixante-dix-huit",
    });
    expect(phoneQuestion("0100979900").words).toBe(
      "zéro un, zéro zéro, quatre-vingt-dix-sept, quatre-vingt-dix-neuf, zéro zéro"
    );
  });
});

describe("문제 뽑기", () => {
  const bounds: Partial<Record<NumberRange, [number, number]>> = {
    small: [0, 20],
    mid: [21, 69],
    hard: [70, 99],
    hundreds: [100, 999],
    year: [1900, 2099],
  };

  it.each(Object.entries(bounds))("%s 범위의 숫자는 범위 안에서만 나온다", (range, [min, max]) => {
    const rng = seededRng(7);
    const values = Array.from({ length: 300 }, () =>
      Number(makeQuestion(range as NumberRange, rng).display)
    );
    expect(values.filter((v) => v < min || v > max)).toEqual([]);
  });

  it("가격은 1~199 유로, 시각은 0~23시 0~59분, 전화번호는 0 으로 시작하는 열 자리다", () => {
    const rng = seededRng(11);
    for (let i = 0; i < 200; i++) {
      const price = makeQuestion("price", rng).display.match(/^(\d+),(\d{2}) €$/);
      expect(price).not.toBeNull();
      expect(Number(price?.[1])).toBeGreaterThanOrEqual(1);
      expect(Number(price?.[1])).toBeLessThanOrEqual(199);

      const time = makeQuestion("time", rng).display.match(/^(\d+) h (\d{2})$/);
      expect(Number(time?.[1])).toBeLessThanOrEqual(23);
      expect(Number(time?.[2])).toBeLessThanOrEqual(59);

      expect(makeQuestion("phone", rng).display).toMatch(/^0\d( \d{2}){4}$/);
    }
  });

  it("한 판의 문제는 서로 겹치지 않고 고른 범위에서만 나온다", () => {
    const qs = planQuestions(["hard", "phone"], 10, seededRng(3));
    expect(qs).toHaveLength(10);
    expect(new Set(qs.map((q) => q.key)).size).toBe(10);
    expect(qs.filter((q) => q.range !== "hard" && q.range !== "phone")).toEqual([]);
  });

  it("범위를 하나도 고르지 않으면 문제가 없다", () => {
    expect(planQuestions([], 10, seededRng(1))).toEqual([]);
  });
});

describe("채점", () => {
  it("정수는 공백·점 같은 구분 기호와 앞의 0 을 무시한다", () => {
    expect(gradeAnswer(integer("hard", 97), "97")).toBe(true);
    expect(gradeAnswer(integer("hard", 97), " 9 7 ")).toBe(true);
    expect(gradeAnswer(integer("hard", 97), "097")).toBe(true);
    expect(gradeAnswer(integer("year", 1987), "1.987")).toBe(true);
    expect(gradeAnswer(integer("hard", 97), "77")).toBe(false);
    expect(gradeAnswer(integer("small", 0), "")).toBe(false);
    expect(gradeAnswer(integer("small", 0), "0")).toBe(true);
  });

  it("가격은 쉼표·점·센트 붙여 쓰기를 모두 받고 € 기호는 무시한다", () => {
    const q = priceQuestion(12, 50);
    expect(gradeAnswer(q, "12,50")).toBe(true);
    expect(gradeAnswer(q, "12.50 €")).toBe(true);
    expect(gradeAnswer(q, "12,5")).toBe(true);
    expect(gradeAnswer(q, "1250")).toBe(true);
    expect(gradeAnswer(q, "12")).toBe(false);
    expect(gradeAnswer(q, "12,05")).toBe(false);
  });

  it("센트가 없는 가격은 유로만 적어도 맞다", () => {
    expect(gradeAnswer(priceQuestion(80, 0), "80")).toBe(true);
    expect(gradeAnswer(priceQuestion(80, 0), "80,00")).toBe(true);
    expect(gradeAnswer(priceQuestion(80, 0), "8")).toBe(false);
  });

  it("시각은 h·콜론·공백으로 나누거나 붙여 적어도 맞다", () => {
    const q = timeQuestion(14, 35);
    for (const input of ["14 h 35", "14h35", "14:35", "14 35", "1435"]) {
      expect([input, gradeAnswer(q, input)]).toEqual([input, true]);
    }
    expect(gradeAnswer(q, "14")).toBe(false);
    expect(gradeAnswer(q, "2:35")).toBe(false);
    expect(gradeAnswer(timeQuestion(9, 0), "9")).toBe(true);
    expect(gradeAnswer(timeQuestion(9, 5), "905")).toBe(true);
  });

  it("전화번호는 앞의 0 까지 열 자리가 같아야 맞다", () => {
    const q = phoneQuestion("0612345678");
    expect(gradeAnswer(q, "06 12 34 56 78")).toBe(true);
    expect(gradeAnswer(q, "06.12.34.56.78")).toBe(true);
    expect(gradeAnswer(q, "0612345678")).toBe(true);
    expect(gradeAnswer(q, "612345678")).toBe(false);
    expect(gradeAnswer(q, "0612345687")).toBe(false);
  });
});

describe("틀린 문제 다시 내기", () => {
  const item = (n: number, retry = 0): RoundItem => ({ question: integer("hard", n), retry });
  const numbers = (items: RoundItem[]) => items.map((i) => `${i.question.display}/${i.retry}`);

  it("맞히면 남은 줄을 그대로 둔다", () => {
    expect(numbers(queueAfterAnswer([item(71), item(72)], item(70), true))).toEqual([
      "71/0",
      "72/0",
    ]);
  });

  it("틀리면 두 문제 뒤에 같은 문제를 다시 넣는다", () => {
    expect(numbers(queueAfterAnswer([item(71), item(72), item(73)], item(70), false))).toEqual([
      "71/0",
      "72/0",
      "70/1",
      "73/0",
    ]);
  });

  it("남은 문제가 적으면 줄 끝에 넣고, 두 번 다시 나온 문제는 더 넣지 않는다", () => {
    expect(numbers(queueAfterAnswer([item(71)], item(70), false))).toEqual(["71/0", "70/1"]);
    expect(numbers(queueAfterAnswer([item(71)], item(70, 2), false))).toEqual(["71/0"]);
  });
});
