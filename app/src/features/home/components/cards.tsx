"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import type { NavSection } from "@/components/layout/nav";
import type { JsonState } from "@/lib/use-json";

/** 읽는 중이면 자리표시, 실패하면 fallback, 읽었으면 render 결과 */
export function Summary<T>({
  state,
  render,
  fallback = "—",
}: {
  state: JsonState<T>;
  render: (data: T) => ReactNode;
  fallback?: ReactNode;
}) {
  if (state.status === "loading") {
    return <span className="inline-block h-3 w-24 animate-pulse rounded bg-muted align-middle" />;
  }
  if (state.status === "error") return <>{fallback}</>;
  return <>{render(state.data)}</>;
}

/** 첫 화면 「바로 이어 하기」 한 줄. 폰에서 엄지로 누르기 좋게 줄 전체가 링크다 */
export function ContinueRow({
  href,
  icon: Icon,
  label,
  title,
  detail,
}: {
  href: string;
  icon: LucideIcon;
  /** 영역 이름 등 작은 머리글 */
  label: string;
  title: ReactNode;
  detail?: ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="flex min-h-16 items-center gap-3 px-4 py-3 transition-colors hover:bg-accent"
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {label}
          </span>
          <span className="block truncate font-medium">{title}</span>
          {detail && <span className="block truncate text-sm text-muted-foreground">{detail}</span>}
        </span>
        <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground" />
      </Link>
    </li>
  );
}

/** 영역(또는 영역 안 화면)으로 가는 카드: 아이콘, 이름, 설명, 짧은 진도 */
export function EntryCard({
  href,
  icon: Icon,
  title,
  description,
  summary,
}: {
  href: string;
  icon: LucideIcon;
  title: string;
  description?: string;
  summary?: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex h-full flex-col gap-2 rounded-xl border border-border bg-card p-4 transition-colors hover:bg-accent"
    >
      <span className="flex items-center gap-2 font-semibold">
        <Icon className="h-5 w-5 text-primary" />
        {title}
      </span>
      {description && <span className="text-sm text-muted-foreground">{description}</span>}
      {summary && <span className="mt-auto text-sm font-medium text-foreground">{summary}</span>}
    </Link>
  );
}

/** 영역 입구의 화면 카드 묶음. summaries 에 주소별 진도를 넘기면 카드 아래에 보인다 */
export function EntryGrid({
  sections,
  summaries = {},
}: {
  sections: NavSection[];
  summaries?: Record<string, ReactNode>;
}) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {sections.map((s) => (
        <EntryCard
          key={s.href}
          href={s.href}
          icon={s.icon}
          title={s.label}
          description={s.description}
          summary={summaries[s.href]}
        />
      ))}
    </div>
  );
}

export function PageTitle({ title, subtitle }: { title: string; subtitle?: ReactNode }) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold">{title}</h1>
      {subtitle && <p className="mt-1 text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
