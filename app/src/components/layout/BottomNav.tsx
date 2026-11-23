"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AREAS, areaForPath } from "./nav";

// 폰 아래 탭. 엄지가 닿는 자리에 영역 다섯 개를 둔다(넓은 화면에서는 숨기고 헤더 탭을 쓴다)
export default function BottomNav() {
  const pathname = usePathname();
  const current = areaForPath(pathname).id;

  return (
    <nav
      aria-label="Domaines"
      className="md:hidden fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 backdrop-blur pb-[env(safe-area-inset-bottom)]"
    >
      <ul className="grid grid-cols-5">
        {AREAS.map((area) => {
          const active = current === area.id;
          return (
            <li key={area.id}>
              <Link
                href={area.href}
                aria-current={active ? "page" : undefined}
                className={`flex h-16 flex-col items-center justify-center gap-1 text-[11px] font-medium transition-colors ${
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <area.icon className={`h-5 w-5 ${active ? "stroke-[2.5]" : ""}`} />
                {area.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
