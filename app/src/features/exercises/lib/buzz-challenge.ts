export interface MonthConfig {
  key: string;
  name: string;
  target: number;
  startIndex: number;
  endIndex: number;
}

export const MONTHS: MonthConfig[] = [
  { key: "janvier", name: "Janvier", target: 31, startIndex: 0, endIndex: 31 },
  { key: "fevrier", name: "Février", target: 28, startIndex: 31, endIndex: 59 },
  { key: "mars", name: "Mars", target: 31, startIndex: 59, endIndex: 90 },
];

/** 끝낸 연습 수(누적)로 본 그 달의 진행: 그 달 몫만 0~target 으로 자른다 */
export function monthProgress(completed: number, month: MonthConfig): number {
  return Math.max(0, Math.min(month.target, completed - month.startIndex));
}

/**
 * Build a map from exercise ID to month key based on completion order.
 * Exercises are sorted by completedAt ascending, then sliced into month ranges.
 */
export function buildMonthMap(
  exercises: { id: string; completedAt: Date | string | null }[]
): Map<string, string> {
  const sorted = [...exercises].sort((a, b) => {
    const dateA = a.completedAt ? new Date(a.completedAt).getTime() : 0;
    const dateB = b.completedAt ? new Date(b.completedAt).getTime() : 0;
    return dateA - dateB;
  });

  const map = new Map<string, string>();
  for (const month of MONTHS) {
    const slice = sorted.slice(month.startIndex, month.endIndex);
    for (const ex of slice) {
      map.set(ex.id, month.key);
    }
  }
  return map;
}
