"use client";

import { CheckCircle, Circle } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MONTHS, monthProgress } from "../lib/buzz-challenge";

const COLORS: Record<
  string,
  {
    border: string;
    bg: string;
    completeBorder: string;
    completeBg: string;
    progress: string;
    icon: string;
  }
> = {
  janvier: {
    border: "border-blue-200 dark:border-blue-800",
    bg: "bg-blue-50/50 dark:bg-blue-950/30",
    completeBorder: "border-blue-400 dark:border-blue-600",
    completeBg: "bg-blue-100 dark:bg-blue-900/50",
    progress: "bg-blue-500",
    icon: "text-blue-600 dark:text-blue-400",
  },
  fevrier: {
    border: "border-rose-200 dark:border-rose-800",
    bg: "bg-rose-50/50 dark:bg-rose-950/30",
    completeBorder: "border-rose-400 dark:border-rose-600",
    completeBg: "bg-rose-100 dark:bg-rose-900/50",
    progress: "bg-rose-500",
    icon: "text-rose-600 dark:text-rose-400",
  },
  mars: {
    border: "border-emerald-200 dark:border-emerald-800",
    bg: "bg-emerald-50/50 dark:bg-emerald-950/30",
    completeBorder: "border-emerald-400 dark:border-emerald-600",
    completeBg: "bg-emerald-100 dark:bg-emerald-900/50",
    progress: "bg-emerald-500",
    icon: "text-emerald-600 dark:text-emerald-400",
  },
};

const TOTAL = MONTHS.at(-1)?.endIndex ?? 0;

// 2026 1분기 사내 챌린지 인증 화면으로 가는 카드(옛 첫 화면 맨 위에 있던 것). 기록 영역 입구에서 쓴다
export default function BuzzChallengeCard({ completed }: { completed: number }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Buzz Challenge de Brice – 2026 1Q</CardTitle>
        <p className="text-sm text-muted-foreground">
          Écrans de validation du 1er trimestre 2026 (2026 1분기 인증 화면) · {completed} / {TOTAL}{" "}
          exercices RFI terminés
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {MONTHS.map((month) => {
            const colors = COLORS[month.key];
            const progress = monthProgress(completed, month);
            const isComplete = completed >= month.endIndex;
            return (
              <Link
                key={month.key}
                href={`/buzz-challenge/${month.key}`}
                className={`block p-4 rounded-lg border transition-all hover:scale-[1.02] hover:shadow-md ${
                  isComplete
                    ? `${colors.completeBorder} ${colors.completeBg}`
                    : `${colors.border} ${colors.bg}`
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{month.name}</span>
                  {isComplete ? (
                    <CheckCircle className={`w-5 h-5 ${colors.icon}`} />
                  ) : (
                    <Circle className={`w-5 h-5 ${colors.icon} opacity-50`} />
                  )}
                </div>
                <div className="text-2xl font-bold mb-1">
                  {progress} / {month.target}
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${colors.progress}`}
                    style={{ width: `${(progress / month.target) * 100}%` }}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
