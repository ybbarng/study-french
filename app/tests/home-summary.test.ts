import { describe, expect, it } from "vitest";
import type { DelfBestMap } from "../src/features/delf/lib/client";
import type { DelfIndexEntry } from "../src/features/delf/lib/set";
import type { Expression } from "../src/features/expressions/lib/expressions";
import {
  lastShadowing,
  masteredLabel,
  practiceRangeLabel,
  summarizeDelf,
  summarizeExpressions,
} from "../src/features/home/lib/summary";
import real from "./mocks/expressions-sessions.json";

// 실제 원본에서 뽑은 id·session·sessionName 에 화면이 쓰지 않는 칸만 채운다
const expressions: Expression[] = real.expressions.map((e) => ({
  ...e,
  group: "A",
  fr: "…",
  ko: "…",
  example: { fr: "…", ko: "…" },
  learned: true,
}));

describe("summarizeExpressions", () => {
  // 원본(258개)에는 앞으로 배울 회차(12-30 까지)도 미리 들어 있어, 분모는 저장한 범위 안 표현만 센다
  const upTo1105 = { mode: "cumulative" as const, to: "11-05" };

  it("누적 범위면 처음부터 그 회차까지의 표현만 센다", () => {
    expect(summarizeExpressions(expressions, [], upTo1105)).toEqual({ total: 93, mastered: 0 });
  });

  it("구간 범위면 그 구간의 표현만 센다", () => {
    const span = { mode: "span" as const, from: "11-01", to: "11-05" };
    expect(summarizeExpressions(expressions, [], span)?.total).toBe(15);
  });

  it("「익힘」은 범위 안 표현만, 중복 없이 센다", () => {
    // E258 은 12-30 회차(범위 밖), E999 는 원본에 없음
    const summary = summarizeExpressions(
      expressions,
      ["E01", "E02", "E02", "E258", "E999"],
      upTo1105
    );
    expect(summary?.mastered).toBe(2);
  });

  it("범위가 저장돼 있지 않으면 null", () => {
    expect(summarizeExpressions(expressions, ["E01"], null)).toBeNull();
  });

  it("범위의 회차가 원본에 없으면 null", () => {
    expect(summarizeExpressions(expressions, [], { mode: "cumulative", to: "10-02" })).toBeNull();
  });
});

describe("masteredLabel", () => {
  it("범위 안 익힘 수와 범위 안 표현 수를 보인다", () => {
    expect(masteredLabel({ total: 93, mastered: 12 })).toBe("12 / 93 acquises");
  });

  it("범위가 없으면 범위를 고르라는 안내", () => {
    expect(masteredLabel(null)).toBe("Choisissez la plage de cours");
  });
});

describe("practiceRangeLabel", () => {
  it.each([
    [{ mode: "cumulative" as const, to: "11-05" }, "jusqu'au cours 11-05"],
    [{ mode: "single" as const, to: "11-05" }, "cours 11-05"],
    [{ mode: "span" as const, from: "11-01", to: "11-05" }, "cours 11-01 → 11-05"],
  ])("%o → %s", (range, label) => {
    expect(practiceRangeLabel(range)).toBe(label);
  });

  it("저장한 범위가 없으면 범위를 고르라는 안내", () => {
    expect(practiceRangeLabel(null)).toBe("Choisissez la plage de cours");
  });
});

describe("lastShadowing", () => {
  const materials = [
    { id: "nicolas-1", title: "Le Petit Nicolas — Chapitre 1" },
    { id: "nicolas-2", title: "Le Petit Nicolas — Chapitre 2" },
  ];

  it("가장 최근에 연습한 자료를 고른다", () => {
    const records = [
      { materialId: "nicolas-1", lastStudiedAt: "2026-11-20T10:00:00.000Z" },
      { materialId: "nicolas-2", lastStudiedAt: "2026-11-22T08:00:00.000Z" },
      { materialId: "nicolas-1", lastStudiedAt: "2026-11-21T09:00:00.000Z" },
    ];
    expect(lastShadowing(records, materials)).toEqual({
      id: "nicolas-2",
      title: "Le Petit Nicolas — Chapitre 2",
      lastStudiedAt: "2026-11-22T08:00:00.000Z",
    });
  });

  it("자료 목록에서 빠진 자료와 시각이 없는 기록은 건너뛴다", () => {
    const records = [
      { materialId: "removed", lastStudiedAt: "2026-11-23T00:00:00.000Z" },
      { materialId: "nicolas-2", lastStudiedAt: null },
      { materialId: "nicolas-1", lastStudiedAt: "2026-11-01T00:00:00.000Z" },
    ];
    expect(lastShadowing(records, materials)?.id).toBe("nicolas-1");
  });

  it("기록이 없으면 null", () => {
    expect(lastShadowing([], materials)).toBeNull();
  });
});

describe("summarizeDelf", () => {
  const set = (id: string, level: DelfIndexEntry["level"]): DelfIndexEntry => ({
    id,
    level,
    kind: "mini",
    title: id,
    areas: [{ area: "CO", minutes: 4, max: 5 }],
    status: "verified",
  });
  const sets = [
    set("a1-mini-01", "A1"),
    set("a1-mini-02", "A1"),
    set("a2-mini-01", "A2"),
    set("a2-mini-02", "A2"),
  ];
  const attempt = (setId: string, createdAt: string): DelfBestMap[string] => ({
    id: `x-${setId}`,
    setId,
    co: { score: 4, max: 5 },
    ce: { score: 3, max: 4 },
    total: { score: 7, max: 9 },
    createdAt,
    count: 1,
  });

  it("가장 최근에 푼 수준에서 아직 안 푼 세트를 다음으로 고른다", () => {
    const best: DelfBestMap = {
      "a1-mini-01": attempt("a1-mini-01", "2026-11-10T00:00:00.000Z"),
      "a2-mini-01": attempt("a2-mini-01", "2026-11-20T00:00:00.000Z"),
    };
    expect(summarizeDelf(sets, best)).toEqual({
      done: 2,
      total: 4,
      next: { id: "a2-mini-02", level: "A2", title: "a2-mini-02" },
    });
  });

  it("그 수준을 다 풀었으면 전체에서 첫 안 푼 세트", () => {
    const best: DelfBestMap = {
      "a2-mini-01": attempt("a2-mini-01", "2026-11-20T00:00:00.000Z"),
      "a2-mini-02": attempt("a2-mini-02", "2026-11-21T00:00:00.000Z"),
    };
    expect(summarizeDelf(sets, best).next?.id).toBe("a1-mini-01");
  });

  it("목록에 없는 세트의 기록은 세지 않는다", () => {
    const best: DelfBestMap = { "b2-exam-09": attempt("b2-exam-09", "2026-11-20T00:00:00.000Z") };
    expect(summarizeDelf(sets, best)).toMatchObject({ done: 0, next: { id: "a1-mini-01" } });
  });
});
