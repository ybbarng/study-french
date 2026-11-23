"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/Logo";
import PasswordPrompt from "@/components/PasswordPrompt";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AREAS, areaForPath, SITE_SHORT_NAME } from "./nav";

// 맨 위 막대. 넓은 화면에서는 영역 탭을 여기 두고, 폰에서는 아래 탭(BottomNav)으로 옮긴다
export default function Header() {
  const pathname = usePathname();
  const current = areaForPath(pathname).id;

  return (
    <header className="bg-header text-white shadow-lg">
      {/* French tricolor accent bar */}
      <div className="french-tricolor h-1" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <Link href="/" className="flex items-center">
            <Logo size="sm" showText text={SITE_SHORT_NAME} className="sm:hidden" />
            <Logo size="md" showText className="hidden sm:flex" />
          </Link>

          <div className="flex items-center gap-1">
            <nav className="hidden md:flex items-center gap-1 mr-2" aria-label="Domaines">
              {AREAS.map((area) => (
                <Link
                  key={area.id}
                  href={area.href}
                  aria-current={current === area.id ? "page" : undefined}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    current === area.id
                      ? "bg-white/20 text-white"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <area.icon className="h-4 w-4" />
                  {area.label}
                </Link>
              ))}
            </nav>
            <PasswordPrompt />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
