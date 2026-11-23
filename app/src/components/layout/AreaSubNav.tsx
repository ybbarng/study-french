"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { activeSection, areaForPath } from "./nav";

// 영역 안 화면 사이를 오가는 작은 메뉴. 화면이 하나뿐인 영역(첫 화면, DELF)에서는 그리지 않는다
export default function AreaSubNav() {
  const pathname = usePathname();
  const area = areaForPath(pathname);
  if (area.sections.length < 2) return null;
  const active = activeSection(pathname);

  return (
    <nav
      aria-label={area.label}
      className="-mx-4 mb-6 flex gap-2 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
    >
      {area.sections.map((s) => {
        const on = active?.href === s.href;
        return (
          <Link
            key={s.href}
            href={s.href}
            aria-current={on ? "page" : undefined}
            className={`inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
              on
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-muted-foreground hover:bg-accent hover:text-foreground"
            }`}
          >
            <s.icon className="h-4 w-4" />
            {s.label}
          </Link>
        );
      })}
    </nav>
  );
}
