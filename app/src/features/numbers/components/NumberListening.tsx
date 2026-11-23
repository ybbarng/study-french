"use client";

import { ArrowLeft, Check, Hash, RotateCcw, Snail, Volume2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { type FrenchVoiceOption, useFrenchVoices } from "../hooks/use-french-voices";
import {
  gradeAnswer,
  NUMBER_RANGE_EXAMPLES,
  NUMBER_RANGE_INPUT_HINTS,
  NUMBER_RANGE_LABELS,
  NUMBER_RANGES,
  type NumberQuestion,
  type NumberRange,
  planQuestions,
  queueAfterAnswer,
  ROUND_SIZE,
  type RoundItem,
} from "../lib/numbers";

const RANGES_KEY = "ftf-numbers-ranges";
const DEFAULT_RANGES: NumberRange[] = ["hard"];

function readRanges(): NumberRange[] | null {
  try {
    const raw = localStorage.getItem(RANGES_KEY);
    if (!raw) return null;
    const ranges = raw
      .split(",")
      .filter((r): r is NumberRange => (NUMBER_RANGES as readonly string[]).includes(r));
    return ranges.length ? ranges : null;
  } catch {
    return null;
  }
}

function writeRanges(ranges: NumberRange[]) {
  try {
    localStorage.setItem(RANGES_KEY, ranges.join(","));
  } catch {
    // 저장소를 못 쓰는 브라우저에서는 이번 방문에만 기억한다
  }
}

// ── 한 판 상태 ─────────────────────────────────────────

interface Round {
  queue: RoundItem[];
  item: RoundItem | null;
  /** 지금 문제에 낸 답. null 이면 아직 */
  answer: { input: string; correct: boolean } | null;
  shown: number;
  correctCount: number;
  answeredCount: number;
  /** 한 번이라도 틀린 문제(처음 틀린 순서) */
  wrong: NumberQuestion[];
}

function advance(r: Round): Round {
  const [item = null, ...queue] = r.queue;
  return { ...r, queue, item, answer: null, shown: item ? r.shown + 1 : r.shown };
}

function newRound(questions: NumberQuestion[]): Round {
  return advance({
    queue: questions.map((question) => ({ question, retry: 0 })),
    item: null,
    answer: null,
    shown: 0,
    correctCount: 0,
    answeredCount: 0,
    wrong: [],
  });
}

function answerRound(r: Round, input: string): Round {
  if (!r.item || r.answer) return r;
  const correct = gradeAnswer(r.item.question, input);
  const q = r.item.question;
  return {
    ...r,
    answer: { input, correct },
    correctCount: r.correctCount + (correct ? 1 : 0),
    answeredCount: r.answeredCount + 1,
    wrong: correct || r.wrong.some((w) => w.key === q.key) ? r.wrong : [...r.wrong, q],
    queue: queueAfterAnswer(r.queue, r.item, correct),
  };
}

// ── 화면 ─────────────────────────────────────────────

function Chip({
  pressed,
  onClick,
  children,
}: {
  pressed: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={pressed}
      className={cn(
        "rounded-full border px-3 py-1.5 text-sm transition-colors",
        pressed
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border text-foreground hover:bg-accent"
      )}
    >
      {children}
    </button>
  );
}

export default function NumberListening() {
  const voices = useFrenchVoices();
  const [ranges, setRanges] = useState<NumberRange[]>(DEFAULT_RANGES);
  const [round, setRound] = useState<Round | null>(null);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = readRanges();
    if (saved) setRanges(saved);
  }, []);

  const toggleRange = (r: NumberRange) => {
    setRanges((prev) => {
      const next = prev.includes(r) ? prev.filter((x) => x !== r) : [...prev, r];
      if (!next.length) return prev;
      // 화면 순서대로 저장한다
      const ordered = NUMBER_RANGES.filter((x) => next.includes(x));
      writeRanges(ordered);
      return ordered;
    });
  };

  // 음성은 누른 손길 안에서 불러야 폰 브라우저가 막지 않는다. 그래서 효과(useEffect)가 아니라 손길 처리에서 읽는다
  const play = (next: Round) => {
    setRound(next);
    setInput("");
    if (next.item) {
      voices.speak(next.item.question.words);
      inputRef.current?.focus();
    }
  };

  const start = (questions: NumberQuestion[]) => play(newRound(questions));

  const submit = () => {
    if (!round?.item) return;
    if (round.answer) {
      play(advance(round));
      return;
    }
    if (input.trim() === "") return;
    setRound(answerRound(round, input));
  };

  const question = round?.item?.question ?? null;

  // 첫 문제는 입력 칸이 시작을 누른 뒤에 생기므로, 문제가 바뀔 때마다 입력 칸으로 옮긴다
  const shown = round?.shown ?? 0;
  useEffect(() => {
    if (shown > 0) inputRef.current?.focus();
  }, [shown]);

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Hash className="h-5 w-5 text-primary" />
          <CardTitle>숫자 듣기</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          프랑스어로 읽는 숫자를 듣고 숫자로 적습니다. 한 판은 {ROUND_SIZE}문제, 틀린 것은 그 판에서
          다시 나와요.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {round === null ? (
          <Setup
            ranges={ranges}
            onToggle={toggleRange}
            voiceOptions={voices.options}
            selectedVoice={voices.selectedUri}
            onVoice={voices.select}
            voicesLoaded={voices.loaded}
            canSpeak={voices.available}
            supported={voices.supported}
            onTry={() => voices.speak("quatre-vingt-dix-sept")}
            onStart={() => start(planQuestions(ranges, ROUND_SIZE, Math.random))}
          />
        ) : question && round.item ? (
          <div className="space-y-4">
            <div className="flex items-center gap-x-4 text-sm">
              <span className="tabular-nums text-muted-foreground">
                {round.shown}번째 · 남음 {round.queue.length}
              </span>
              <span className="font-semibold tabular-nums">
                {round.correctCount} / {round.answeredCount}
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="ml-auto"
                onClick={() => setRound({ ...round, item: null, queue: [], answer: null })}
              >
                그만
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground">
                {NUMBER_RANGE_LABELS[question.range]}
              </span>
              {round.item.retry > 0 && (
                <span className="text-xs text-orange-600 dark:text-orange-400">
                  아까 틀린 문제예요
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                className="h-14 text-base"
                onClick={() => {
                  voices.speak(question.words);
                  inputRef.current?.focus();
                }}
              >
                <Volume2 /> 다시 듣기
              </Button>
              <Button
                variant="outline"
                className="h-14 text-base"
                onClick={() => {
                  voices.speak(question.words, { slow: true });
                  inputRef.current?.focus();
                }}
              >
                <Snail /> 느리게
              </Button>
            </div>

            <form
              className="space-y-2"
              onSubmit={(e) => {
                e.preventDefault();
                submit();
              }}
            >
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                readOnly={round.answer !== null}
                inputMode={question.range === "price" ? "decimal" : "numeric"}
                autoComplete="off"
                enterKeyHint={round.answer ? "next" : "done"}
                aria-label="들은 숫자"
                placeholder="들은 숫자"
                className="h-14 text-center text-2xl tabular-nums"
              />
              <p className="text-xs text-muted-foreground">
                {NUMBER_RANGE_INPUT_HINTS[question.range]}
              </p>

              {round.answer && (
                <div
                  className={cn(
                    "space-y-1 rounded-xl border p-4",
                    round.answer.correct
                      ? "border-green-300 bg-green-50/60 dark:border-green-800 dark:bg-green-950/40"
                      : "border-red-300 bg-red-50/60 dark:border-red-800 dark:bg-red-950/40"
                  )}
                >
                  <p
                    className={cn(
                      "flex items-center gap-1 font-semibold",
                      round.answer.correct
                        ? "text-green-700 dark:text-green-400"
                        : "text-red-700 dark:text-red-400"
                    )}
                  >
                    {round.answer.correct ? <Check className="size-4" /> : <X className="size-4" />}
                    {round.answer.correct
                      ? "맞았어요"
                      : `틀렸어요 (적은 답: ${round.answer.input})`}
                  </p>
                  <p className="text-2xl font-semibold tabular-nums">{question.display}</p>
                  <p lang="fr" className="break-words italic">
                    {question.words}
                  </p>
                </div>
              )}

              <Button
                type="submit"
                className="h-12 w-full text-base"
                disabled={!round.answer && input.trim() === ""}
              >
                {round.answer ? (round.queue.length ? "다음" : "결과 보기") : "확인"}
              </Button>
            </form>
          </div>
        ) : (
          <Result
            round={round}
            speak={voices.speak}
            canSpeak={voices.available}
            onRetryWrong={() => start(round.wrong)}
            onAgain={() => start(planQuestions(ranges, ROUND_SIZE, Math.random))}
            onSetup={() => setRound(null)}
          />
        )}
      </CardContent>
    </Card>
  );
}

function Setup({
  ranges,
  onToggle,
  voiceOptions,
  selectedVoice,
  onVoice,
  voicesLoaded,
  canSpeak,
  supported,
  onTry,
  onStart,
}: {
  ranges: NumberRange[];
  onToggle: (r: NumberRange) => void;
  voiceOptions: FrenchVoiceOption[];
  selectedVoice: string | null;
  onVoice: (uri: string) => void;
  voicesLoaded: boolean;
  canSpeak: boolean;
  supported: boolean;
  onTry: () => void;
  onStart: () => void;
}) {
  return (
    <div className="space-y-4">
      <div className="space-y-2 rounded-xl border border-border bg-muted/40 p-3">
        <p className="text-sm font-medium">범위(여러 개 고르면 섞어서 냅니다)</p>
        <div className="flex flex-wrap gap-1.5">
          {NUMBER_RANGES.map((r) => (
            <Chip key={r} pressed={ranges.includes(r)} onClick={() => onToggle(r)}>
              {NUMBER_RANGE_LABELS[r]}
            </Chip>
          ))}
        </div>
        <ul className="space-y-0.5 text-xs text-muted-foreground">
          {ranges.map((r) => (
            <li key={r}>
              {NUMBER_RANGE_LABELS[r]}: <span lang="fr">{NUMBER_RANGE_EXAMPLES[r]}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-2">
        <label htmlFor="numbers-voice" className="text-sm font-medium">
          목소리
        </label>
        {voiceOptions.length > 0 ? (
          <div className="flex gap-2">
            <select
              id="numbers-voice"
              value={selectedVoice ?? ""}
              onChange={(e) => onVoice(e.target.value)}
              className="h-10 min-w-0 flex-1 rounded-md border border-input bg-background px-3 text-sm"
            >
              {voiceOptions.map((v) => (
                <option key={v.uri} value={v.uri}>
                  {v.label}
                </option>
              ))}
            </select>
            <Button variant="outline" className="h-10" onClick={onTry}>
              <Volume2 /> 들어 보기
            </Button>
          </div>
        ) : !voicesLoaded ? (
          <p className="text-sm text-muted-foreground">목소리를 찾는 중…</p>
        ) : (
          <p className="rounded-xl border border-border p-3 text-sm text-muted-foreground">
            {supported
              ? "이 기기에 프랑스어 목소리가 없습니다. 안드로이드는 설정 › 텍스트 음성 변환에서 프랑스어 음성 데이터를 받은 뒤 새로고침하세요."
              : "이 브라우저는 음성 합성을 지원하지 않습니다. 크롬이나 사파리로 열어 보세요."}
          </p>
        )}
      </div>

      <Button className="h-12 w-full text-base" onClick={onStart} disabled={!canSpeak}>
        시작
      </Button>
    </div>
  );
}

function Result({
  round,
  speak,
  canSpeak,
  onRetryWrong,
  onAgain,
  onSetup,
}: {
  round: Round;
  speak: (text: string, opts?: { slow?: boolean }) => void;
  canSpeak: boolean;
  onRetryWrong: () => void;
  onAgain: () => void;
  onSetup: () => void;
}) {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border p-3 text-center">
        <div className="text-xs text-muted-foreground">맞힘</div>
        <div className="text-2xl font-semibold tabular-nums">
          {round.correctCount} / {round.answeredCount}
        </div>
      </div>

      {round.wrong.length > 0 ? (
        <div className="space-y-2">
          <p className="text-sm font-medium">틀린 문제 {round.wrong.length}개</p>
          <ul className="rounded-xl border border-border">
            {round.wrong.map((q) => (
              <li
                key={q.key}
                className="flex items-start gap-2 border-t border-border p-3 first:border-t-0"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-semibold tabular-nums">{q.display}</p>
                  <p lang="fr" className="break-words text-sm italic text-muted-foreground">
                    {q.words}
                  </p>
                </div>
                {canSpeak && (
                  <Button
                    variant="outline"
                    size="icon-sm"
                    className="shrink-0"
                    onClick={() => speak(q.words)}
                    aria-label={`${q.display} 듣기`}
                  >
                    <Volume2 />
                  </Button>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        round.answeredCount > 0 && (
          <p className="rounded-xl border border-green-300 bg-green-50/60 p-4 text-center font-semibold text-green-700 dark:border-green-800 dark:bg-green-950/40 dark:text-green-400">
            모두 맞혔어요!
          </p>
        )
      )}

      <div className="grid gap-2">
        {round.wrong.length > 0 && (
          <Button className="h-12 w-full text-base" onClick={onRetryWrong} disabled={!canSpeak}>
            <RotateCcw /> 틀린 것만 다시
          </Button>
        )}
        <Button
          variant={round.wrong.length ? "outline" : "default"}
          className="h-12 w-full text-base"
          onClick={onAgain}
          disabled={!canSpeak}
        >
          한 판 더
        </Button>
        <Button variant="ghost" className="w-full" onClick={onSetup}>
          <ArrowLeft /> 범위·목소리 바꾸기
        </Button>
      </div>
    </div>
  );
}
