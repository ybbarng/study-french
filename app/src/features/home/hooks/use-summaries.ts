"use client";

// 첫 화면·영역 입구의 요약을 이미 있는 API·정적 파일에서 읽는다. 새 API·DB 는 만들지 않는다.

import type { DelfBestMap } from "@/features/delf/lib/client";
import { parseDelfIndex } from "@/features/delf/lib/set";
import { EXPRESSIONS_URL, parseExpressions } from "@/features/expressions/lib/expressions";
import { type PracticeRange, parsePracticeRange } from "@/features/expressions/lib/practice-range";
import type { ShadowingMaterialSummary, ShadowingProgressRecord } from "@/features/shadowing/types";
import { type JsonState, useJson } from "@/lib/use-json";
import type { ExerciseWithProgress } from "@/types";
import {
  type DelfSummary,
  type ExpressionsSummary,
  type LastShadowing,
  lastShadowing,
  summarizeDelf,
  summarizeExpressions,
} from "../lib/summary";

/** 여러 상태를 하나로: 하나라도 실패하면 error, 하나라도 읽는 중이면 loading */
function combine<A, B, R>(a: JsonState<A>, b: JsonState<B>, f: (a: A, b: B) => R): JsonState<R> {
  if (a.status === "error" || b.status === "error") return { status: "error" };
  if (a.status === "loading" || b.status === "loading") return { status: "loading" };
  return { status: "ready", data: f(a.data, b.data) };
}

const asMastered = (json: unknown) => (json as { mastered?: string[] }).mastered ?? [];

export function useExpressionsSummary(): JsonState<ExpressionsSummary> {
  const data = useJson(EXPRESSIONS_URL, parseExpressions);
  const mastered = useJson("/api/expressions/progress", asMastered);
  return combine(data, mastered, (d, m) => summarizeExpressions(d.expressions, m));
}

export function usePracticeRange(): JsonState<PracticeRange | null> {
  return useJson("/api/expressions/practice-setting", (json) =>
    parsePracticeRange((json as { range?: unknown }).range)
  );
}

export interface RfiStats {
  total: number;
  completed: number;
  completionRate: number;
}

export function useRfiStats(): JsonState<RfiStats> {
  return useJson("/api/progress", (json) => (json as { stats: RfiStats }).stats);
}

export function useNextExercise(): JsonState<ExerciseWithProgress | null> {
  return useJson(
    "/api/exercises/recommendations",
    (json) => (json as { exercises?: ExerciseWithProgress[] }).exercises?.[0] ?? null
  );
}

export function useLastShadowing(): JsonState<LastShadowing | null> {
  const materials = useJson(
    "/shadowing/data/materials.json",
    (json) => (json as { materials: ShadowingMaterialSummary[] }).materials
  );
  const records = useJson(
    "/api/shadowing/progress",
    (json) => (json as { records: ShadowingProgressRecord[] }).records
  );
  return combine(materials, records, (m, r) => lastShadowing(r, m));
}

export function useDelfSummary(): JsonState<DelfSummary> {
  const sets = useJson("/delf/sets/index.json", (json) =>
    parseDelfIndex(json).sets.filter((s) => s.status === "verified")
  );
  const best = useJson("/api/delf/attempts", (json) => (json as { best?: DelfBestMap }).best ?? {});
  return combine(sets, best, summarizeDelf);
}
