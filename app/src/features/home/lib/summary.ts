// 첫 화면과 영역 입구가 보여 주는 짧은 진도 요약. 이미 있는 API·정적 파일의 응답만으로 계산한다.

import type { DelfBestMap } from "@/features/delf/lib/client";
import type { DelfIndexEntry } from "@/features/delf/lib/set";
import type { Expression } from "@/features/expressions/lib/expressions";
import type { PracticeRange } from "@/features/expressions/lib/practice-range";
import type { ShadowingMaterialSummary, ShadowingProgressRecord } from "@/features/shadowing/types";

export interface ExpressionsSummary {
  total: number;
  mastered: number;
}

/**
 * 표현 전체 수와 「익힘」 수(원본에 있는 표현만 센다).
 * 원본에는 아직 배우지 않은 앞 회차까지 미리 들어 있어, 마지막 회차 이름은 "최근 수업"이 아니다.
 * 지금 어디까지 배웠는지는 서버에 저장한 연습 범위(practiceRangeLabel)로만 보인다
 */
export function summarizeExpressions(
  expressions: readonly Expression[],
  mastered: readonly string[]
): ExpressionsSummary {
  const ids = new Set(expressions.map((e) => e.id));
  return {
    total: expressions.length,
    mastered: new Set(mastered.filter((id) => ids.has(id))).size,
  };
}

/** 연습 범위가 저장돼 있지 않을 때 보일 안내 */
export const PRACTICE_RANGE_PROMPT = "Choisissez la plage de cours";

/** 표현 연습 범위를 짧은 프랑스어로. 저장한 적이 없으면 범위를 고르라는 안내 */
export function practiceRangeLabel(range: PracticeRange | null): string {
  if (!range) return PRACTICE_RANGE_PROMPT;
  switch (range.mode) {
    case "cumulative":
      return `jusqu'au cours ${range.to}`;
    case "single":
      return `cours ${range.to}`;
    case "span":
      return `cours ${range.from} → ${range.to}`;
  }
}

export interface LastShadowing {
  id: string;
  title: string;
  lastStudiedAt: string;
}

/** 가장 최근에 연습한 쉐도잉 자료. 기록이 없거나 자료 목록에 없는 id 뿐이면 null */
export function lastShadowing(
  records: readonly Pick<ShadowingProgressRecord, "materialId" | "lastStudiedAt">[],
  materials: readonly Pick<ShadowingMaterialSummary, "id" | "title">[]
): LastShadowing | null {
  const titles = new Map(materials.map((m) => [m.id, m.title]));
  let best: LastShadowing | null = null;
  for (const r of records) {
    const title = titles.get(r.materialId);
    if (!title || !r.lastStudiedAt) continue;
    if (!best || r.lastStudiedAt > best.lastStudiedAt) {
      best = { id: r.materialId, title, lastStudiedAt: r.lastStudiedAt };
    }
  }
  return best;
}

export interface DelfSummary {
  /** 한 번 이상 푼 세트 수(목록에 있는 세트만) */
  done: number;
  total: number;
  /** 다음에 풀 세트: 가장 최근에 푼 수준에서 아직 안 푼 첫 세트, 없으면 전체에서 첫 안 푼 세트 */
  next: Pick<DelfIndexEntry, "id" | "level" | "title"> | null;
}

export function summarizeDelf(sets: readonly DelfIndexEntry[], best: DelfBestMap): DelfSummary {
  const done = sets.filter((s) => best[s.id]).length;
  let recentLevel: DelfIndexEntry["level"] | null = null;
  let recentAt = "";
  for (const s of sets) {
    const b = best[s.id];
    if (b && b.createdAt > recentAt) {
      recentAt = b.createdAt;
      recentLevel = s.level;
    }
  }
  const unattempted = sets.filter((s) => !best[s.id]);
  const next =
    (recentLevel ? unattempted.find((s) => s.level === recentLevel) : undefined) ??
    unattempted[0] ??
    null;
  return {
    done,
    total: sets.length,
    next: next ? { id: next.id, level: next.level, title: next.title } : null,
  };
}
