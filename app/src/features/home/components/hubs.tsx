"use client";

import { BarChart3, GraduationCap } from "lucide-react";
import { areaEntries } from "@/components/layout/nav";
import { Skeleton } from "@/components/ui/skeleton";
import BuzzChallengeCard from "@/features/exercises/components/BuzzChallengeCard";
import RecommendedExercises from "@/features/exercises/components/RecommendedExercises";
import {
  useDelfSummary,
  useExpressionsSummary,
  useLastShadowing,
  usePracticeRange,
  useRfiStats,
} from "../hooks/use-summaries";
import { masteredLabel, practiceRangeLabel } from "../lib/summary";
import { EntryCard, EntryGrid, PageTitle, Summary } from "./cards";

export function ParlerHub() {
  const expressions = useExpressionsSummary();
  const range = usePracticeRange();
  return (
    <div>
      <PageTitle
        title="Parler"
        subtitle="Les expressions des cours de conversation : revoir, puis s'entraîner à les placer."
      />
      <EntryGrid
        sections={areaEntries("parler")}
        summaries={{
          "/expressions": <Summary state={expressions} render={masteredLabel} />,
          "/expressions/practice": (
            <Summary
              state={range}
              render={(r) => (r ? `Plage : ${practiceRangeLabel(r)}` : practiceRangeLabel(r))}
              fallback="Plage inconnue"
            />
          ),
        }}
      />
    </div>
  );
}

export function EcouterHub() {
  const rfi = useRfiStats();
  const shadowing = useLastShadowing();
  return (
    <div className="space-y-8">
      <div>
        <PageTitle
          title="Écouter"
          subtitle="RFI, shadowing, nombres : de quoi écouter même en marchant."
        />
        <EntryGrid
          sections={areaEntries("ecouter")}
          summaries={{
            "/exercises": (
              <Summary state={rfi} render={(s) => `${s.completed} / ${s.total} faits`} />
            ),
            "/shadowing": (
              <Summary
                state={shadowing}
                render={(s) => (s ? `Dernier : ${s.title}` : "Pas encore commencé")}
              />
            ),
          }}
        />
      </div>
      <RecommendedExercises />
    </div>
  );
}

export function SuiviHub() {
  const rfi = useRfiStats();
  const delf = useDelfSummary();
  return (
    <div className="space-y-8">
      <PageTitle title="Suivi" subtitle="Où j'en suis, domaine par domaine." />
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <EntryCard
          href="/statistics"
          icon={BarChart3}
          title="Statistiques RFI"
          description="Par niveau, par mois, scores des quiz."
          summary={
            <Summary
              state={rfi}
              render={(s) => `${s.completed} / ${s.total} exercices · ${s.completionRate} %`}
            />
          }
        />
        <EntryCard
          href="/delf"
          icon={GraduationCap}
          title="DELF"
          description="Meilleur score de chaque set sur la page DELF."
          summary={<Summary state={delf} render={(d) => `${d.done} / ${d.total} sets faits`} />}
        />
      </div>
      {rfi.status === "loading" ? (
        <Skeleton className="h-48 rounded-xl" />
      ) : (
        <BuzzChallengeCard completed={rfi.status === "ready" ? rfi.data.completed : 0} />
      )}
    </div>
  );
}
