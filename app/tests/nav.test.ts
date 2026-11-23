import { describe, expect, it } from "vitest";
import { activeSection, areaEntries, areaForPath } from "@/components/layout/nav";

describe("areaForPath", () => {
  it.each([
    ["/", "accueil"],
    ["/parler", "parler"],
    ["/expressions", "parler"],
    ["/expressions/practice", "parler"],
    ["/ecouter", "ecouter"],
    ["/exercises/abc123", "ecouter"],
    ["/completed", "ecouter"],
    ["/playlist", "ecouter"],
    ["/shadowing/nicolas-1", "ecouter"],
    ["/numbers", "ecouter"],
    ["/delf/a1-mini-01", "delf"],
    ["/suivi", "suivi"],
    ["/statistics", "suivi"],
    ["/buzz-challenge/janvier", "suivi"],
  ])("%s 는 %s 영역이다", (path, area) => {
    expect(areaForPath(path).id).toBe(area);
  });

  it("앞부분만 같은 다른 주소는 그 영역으로 보지 않는다", () => {
    expect(areaForPath("/delfx").id).toBe("accueil");
    expect(areaForPath("/expressionsfoo").id).toBe("accueil");
  });
});

describe("activeSection", () => {
  it("가장 길게 맞는 메뉴를 고른다", () => {
    expect(activeSection("/expressions/practice")?.label).toBe("Pratique");
    expect(activeSection("/expressions")?.label).toBe("Expressions");
    expect(activeSection("/exercises/abc123")?.label).toBe("Exercices RFI");
  });

  it("버즈챌린지 달마다 같은 메뉴를 고른다", () => {
    expect(activeSection("/buzz-challenge/janvier")?.label).toBe("Buzz Challenge");
    expect(activeSection("/buzz-challenge/fevrier")?.label).toBe("Buzz Challenge");
  });

  it("영역 입구는 Vue d'ensemble 이다", () => {
    expect(activeSection("/ecouter")?.label).toBe("Vue d'ensemble");
  });
});

describe("areaEntries", () => {
  it("영역 입구 자신은 빼고 돌려준다", () => {
    expect(areaEntries("parler").map((s) => s.href)).toEqual([
      "/expressions",
      "/expressions/practice",
    ]);
  });
});
