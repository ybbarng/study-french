"use client";

import { BookOpen, ChevronRight, ListChecks, Star, Volume2 } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useJson } from "@/lib/use-json";
import type { ExerciseWithProgress } from "@/types";

const levelVariant = (level: string): "a1" | "a2" | "b1" | "b2" | "secondary" => {
  switch (level) {
    case "A1":
      return "a1";
    case "A2":
      return "a2";
    case "B1":
      return "b1";
    case "B2":
      return "b2";
    default:
      return "secondary";
  }
};

interface Recommendations {
  exercises: ExerciseWithProgress[];
  total: number;
}

// 아직 안 푼 RFI 연습(옛 첫 화면의 「À faire」). 듣기 영역 입구에서 쓴다
export default function RecommendedExercises() {
  const state = useJson("/api/exercises/recommendations", (json) => json as Recommendations);

  if (state.status === "loading") return <Skeleton className="h-96 rounded-xl" />;

  const recommendations = state.status === "ready" ? state.data.exercises : [];
  const remainingCount = state.status === "ready" ? state.data.total : 0;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-lg">À faire</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Comprendre l'actualité · A2 · {remainingCount} exercices restants
          </p>
        </div>
        <Link href="/exercises" className="text-sm text-primary hover:underline shrink-0">
          Voir tout →
        </Link>
      </CardHeader>
      <CardContent>
        {state.status === "error" ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            Impossible de charger les exercices.
          </p>
        ) : recommendations.length === 0 ? (
          <div className="py-8 text-center">
            <Star className="w-12 h-12 mx-auto text-amber-500 fill-amber-500 mb-3" />
            <p className="font-medium text-lg">Félicitations !</p>
            <p className="text-muted-foreground mt-1">
              Vous avez terminé tous les exercices disponibles.
            </p>
            <Link
              href="/completed"
              className="inline-block mt-4 text-primary hover:underline text-sm"
            >
              Voir vos exercices terminés →
            </Link>
          </div>
        ) : (
          <ul className="divide-y divide-border -mx-6">
            {recommendations.map((exercise) => (
              <li key={exercise.id}>
                <Link
                  href={`/exercises/${exercise.id}`}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-muted/50 transition-colors"
                >
                  {exercise.thumbnailUrl ? (
                    <div className="w-20 h-14 rounded-md overflow-hidden bg-muted shrink-0">
                      <img
                        src={exercise.thumbnailUrl}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-20 h-14 rounded-md bg-muted shrink-0 flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-muted-foreground" />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant={levelVariant(exercise.level)}>{exercise.level}</Badge>
                      <span className="text-xs text-muted-foreground truncate">
                        {exercise.categories
                          .map((c: { category: string }) => c.category)
                          .join(", ")}
                      </span>
                    </div>
                    <p className="font-medium truncate">{exercise.title}</p>
                    {exercise.publishedAt && (
                      <p className="text-sm text-muted-foreground">
                        {new Date(exercise.publishedAt).toLocaleDateString("fr-FR")}
                      </p>
                    )}
                  </div>

                  <div className="hidden sm:flex items-center gap-2 text-muted-foreground shrink-0">
                    {exercise.audioUrl && <Volume2 className="w-5 h-5" />}
                    {exercise.h5pEmbedUrl && <ListChecks className="w-5 h-5" />}
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
