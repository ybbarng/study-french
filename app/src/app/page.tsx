"use client";

import { BookOpen, GraduationCap, Hash, Headphones, Shuffle } from "lucide-react";
import { AREAS } from "@/components/layout/nav";
import { ContinueRow, EntryCard, Summary } from "@/features/home/components/cards";
import {
  useDelfSummary,
  useExpressionsSummary,
  useLastShadowing,
  useNextExercise,
  usePracticeRange,
  useRfiStats,
} from "@/features/home/hooks/use-summaries";
import { masteredLabel, practiceRangeLabel } from "@/features/home/lib/summary";

const area = (id: string) => AREAS.find((a) => a.id === id);

function today(): string {
  return new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "Asia/Seoul",
  }).format(new Date());
}

// 첫 화면: 오늘 바로 이어 할 것과 영역별 입구·짧은 진도. RFI 통계는 듣기·기록 영역으로 옮겼다
export default function HomePage() {
  const expressions = useExpressionsSummary();
  const range = usePracticeRange();
  const nextExercise = useNextExercise();
  const shadowing = useLastShadowing();
  const delf = useDelfSummary();
  const rfi = useRfiStats();

  const parler = area("parler");
  const ecouter = area("ecouter");
  const delfArea = area("delf");
  const suivi = area("suivi");

  return (
    <div className="space-y-8">
      <div>
        <p
          className="text-sm text-muted-foreground first-letter:uppercase"
          suppressHydrationWarning
        >
          {today()}
        </p>
        <h1 className="text-2xl font-bold">Aujourd'hui</h1>
      </div>

      <section aria-labelledby="continuer">
        <h2 id="continuer" className="mb-3 text-lg font-semibold">
          Continuer
        </h2>
        <ul className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
          <ContinueRow
            href="/expressions/practice"
            icon={Shuffle}
            label="Parler"
            title="Pratique des expressions"
            detail={
              <Summary
                state={range}
                render={(r) => (r ? `Plage : ${practiceRangeLabel(r)}` : practiceRangeLabel(r))}
                fallback="Plage inconnue"
              />
            }
          />
          <ContinueRow
            href={
              nextExercise.status === "ready" && nextExercise.data
                ? `/exercises/${nextExercise.data.id}`
                : "/exercises"
            }
            icon={BookOpen}
            label="Écouter · RFI"
            title={
              <Summary
                state={nextExercise}
                render={(e) => (e ? e.title : "Tous les exercices sont faits")}
                fallback="Exercices RFI"
              />
            }
            detail="Prochain exercice à faire"
          />
          <ContinueRow
            href={
              shadowing.status === "ready" && shadowing.data
                ? `/shadowing/${shadowing.data.id}`
                : "/shadowing"
            }
            icon={Headphones}
            label="Écouter · Shadowing"
            title={
              <Summary
                state={shadowing}
                render={(s) => (s ? s.title : "Commencer le shadowing")}
                fallback="Shadowing"
              />
            }
            detail={
              shadowing.status === "ready" && shadowing.data
                ? "Reprendre là où j'en étais"
                : undefined
            }
          />
          <ContinueRow
            href="/numbers"
            icon={Hash}
            label="Écouter · Nombres"
            title="Quelques nombres à l'oreille"
            detail="Écouter, écrire en chiffres — 2 minutes suffisent"
          />
          <ContinueRow
            href={
              delf.status === "ready" && delf.data.next ? `/delf/${delf.data.next.id}` : "/delf"
            }
            icon={GraduationCap}
            label="DELF"
            title={
              <Summary
                state={delf}
                render={(d) =>
                  d.next ? `${d.next.level} · ${d.next.title}` : "Tous les sets sont faits"
                }
                fallback="Examens blancs"
              />
            }
            detail="Prochain examen blanc"
          />
        </ul>
      </section>

      <section aria-labelledby="domaines">
        <h2 id="domaines" className="mb-3 text-lg font-semibold">
          Domaines
        </h2>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {parler && (
            <EntryCard
              href={parler.href}
              icon={parler.icon}
              title={parler.label}
              description="Expressions des cours"
              summary={<Summary state={expressions} render={masteredLabel} />}
            />
          )}
          {ecouter && (
            <EntryCard
              href={ecouter.href}
              icon={ecouter.icon}
              title={ecouter.label}
              description="RFI, shadowing, nombres"
              summary={
                <Summary state={rfi} render={(s) => `RFI ${s.completed} / ${s.total} faits`} />
              }
            />
          )}
          {delfArea && (
            <EntryCard
              href={delfArea.href}
              icon={delfArea.icon}
              title={delfArea.label}
              description="Examens blancs A1–B2"
              summary={<Summary state={delf} render={(d) => `${d.done} / ${d.total} sets faits`} />}
            />
          )}
          {suivi && (
            <EntryCard
              href={suivi.href}
              icon={suivi.icon}
              title={suivi.label}
              description="Statistiques, Buzz Challenge"
              summary={<Summary state={rfi} render={(s) => `RFI ${s.completionRate} % terminé`} />}
            />
          )}
        </div>
      </section>
    </div>
  );
}
