import {
  BarChart3,
  BookOpen,
  CheckCircle,
  ClipboardList,
  GraduationCap,
  Hash,
  Headphones,
  Home,
  type LucideIcon,
  MessageSquareQuote,
  Music,
  Shuffle,
  Trophy,
} from "lucide-react";

// 사이트 정보 구조: 학습 영역(말하기·듣기·시험·기록)마다 화면을 묶는다.
// 옛 주소(/expressions, /exercises/[id], /buzz-challenge/[month] …)는 그대로 두고
// 어느 영역에 속하는지만 여기서 정한다. 영역 첫 화면(href)은 그 영역의 입구다.

export type AreaId = "accueil" | "parler" | "ecouter" | "delf" | "suivi";

export interface NavSection {
  href: string;
  label: string;
  icon: LucideIcon;
  /** 영역 입구 화면에 보이는 한 줄 설명 */
  description?: string;
}

export interface NavArea {
  id: AreaId;
  label: string;
  href: string;
  icon: LucideIcon;
  /** 이 영역에 속하는 주소의 앞부분 */
  prefixes: string[];
  /** 영역 안 화면들(영역 입구 포함). 하나뿐이면 영역 안 메뉴를 그리지 않는다 */
  sections: NavSection[];
}

export const SITE_NAME = "Étudier le français";
export const SITE_SHORT_NAME = "study-fr";

export const AREAS: NavArea[] = [
  {
    id: "accueil",
    label: "Accueil",
    href: "/",
    icon: Home,
    prefixes: [],
    sections: [{ href: "/", label: "Accueil", icon: Home }],
  },
  {
    id: "parler",
    label: "Parler",
    href: "/parler",
    icon: MessageSquareQuote,
    prefixes: ["/parler", "/expressions"],
    sections: [
      { href: "/parler", label: "Vue d'ensemble", icon: MessageSquareQuote },
      {
        href: "/expressions",
        label: "Expressions",
        icon: BookOpen,
        description: "Revoir les expressions des cours, marquer « acquis ».",
      },
      {
        href: "/expressions/practice",
        label: "Pratique",
        icon: Shuffle,
        description: "Petit jeu : trouver l'expression qui convient à la situation.",
      },
    ],
  },
  {
    id: "ecouter",
    label: "Écouter",
    href: "/ecouter",
    icon: Headphones,
    prefixes: ["/ecouter", "/exercises", "/completed", "/playlist", "/shadowing", "/numbers"],
    sections: [
      { href: "/ecouter", label: "Vue d'ensemble", icon: Headphones },
      {
        href: "/exercises",
        label: "Exercices RFI",
        icon: BookOpen,
        description: "Journal en français facile de RFI : écouter puis faire le quiz.",
      },
      {
        href: "/playlist",
        label: "Écoute",
        icon: Music,
        description: "Enchaîner les audios RFI, idéal en marchant.",
      },
      {
        href: "/shadowing",
        label: "Shadowing",
        icon: Headphones,
        description: "Répéter phrase par phrase après le locuteur.",
      },
      {
        href: "/numbers",
        label: "Nombres",
        icon: Hash,
        description: "Écouter un nombre, l'écrire en chiffres.",
      },
      {
        href: "/completed",
        label: "Terminés",
        icon: CheckCircle,
        description: "Exercices RFI déjà faits, par mois.",
      },
    ],
  },
  {
    id: "delf",
    label: "DELF",
    href: "/delf",
    icon: GraduationCap,
    prefixes: ["/delf"],
    sections: [
      {
        href: "/delf",
        label: "DELF",
        icon: GraduationCap,
        description: "Examens blancs A1–B2 : compréhension orale, écrite, production écrite.",
      },
    ],
  },
  {
    id: "suivi",
    label: "Suivi",
    href: "/suivi",
    icon: BarChart3,
    prefixes: ["/suivi", "/statistics", "/buzz-challenge"],
    sections: [
      { href: "/suivi", label: "Vue d'ensemble", icon: ClipboardList },
      {
        href: "/statistics",
        label: "Statistiques",
        icon: BarChart3,
        description: "Statistiques détaillées des exercices RFI.",
      },
      {
        href: "/buzz-challenge/mars",
        label: "Buzz Challenge",
        icon: Trophy,
        description: "Écrans de validation du Buzz Challenge 2026 T1 (janvier–mars).",
      },
    ],
  },
];

function matches(pathname: string, prefix: string): boolean {
  return pathname === prefix || pathname.startsWith(`${prefix}/`);
}

/** 주소가 속한 영역. 어디에도 속하지 않으면 accueil */
export function areaForPath(pathname: string): NavArea {
  return AREAS.find((a) => a.prefixes.some((p) => matches(pathname, p))) ?? AREAS[0];
}

/**
 * 영역 안에서 지금 화면에 해당하는 메뉴. 가장 길게 맞는 주소를 고른다
 * (/expressions/practice 는 Expressions 가 아니라 Pratique, /exercises/123 은 Exercices RFI).
 * /buzz-challenge/* 는 월마다 주소가 달라 Buzz Challenge 메뉴로 묶는다
 */
export function activeSection(pathname: string): NavSection | null {
  const area = areaForPath(pathname);
  let best: NavSection | null = null;
  let bestLength = -1;
  for (const s of area.sections) {
    const key = s.href.startsWith("/buzz-challenge/") ? "/buzz-challenge" : s.href;
    if (matches(pathname, key) && key.length > bestLength) {
      best = s;
      bestLength = key.length;
    }
  }
  return best;
}

/** 영역 입구에 카드로 보일 화면들(입구 자신은 뺀다) */
export function areaEntries(id: AreaId): NavSection[] {
  const area = AREAS.find((a) => a.id === id);
  if (!area) return [];
  return area.sections.filter((s) => s.href !== area.href);
}
