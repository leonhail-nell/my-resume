import * as Si from "react-icons/si";
import * as Fa from "react-icons/fa";
import type { ComponentType } from "react";

type IconComponent = ComponentType<{
  size?: number | string;
  color?: string;
  style?: React.CSSProperties;
  className?: string;
}>;

const ICON_LIBRARIES: Record<string, IconComponent> = {
  ...(Si as unknown as Record<string, IconComponent>),
  ...(Fa as unknown as Record<string, IconComponent>),
};

/**
 * Look up a react-icons component by name (e.g., "SiPhp", "SiReact", "FaDatabase").
 * Returns null if the icon doesn't exist.
 *
 * Browse icons: https://react-icons.github.io/react-icons/icons/si/
 *               https://react-icons.github.io/react-icons/icons/fa/
 */
export function getSkillIcon(name?: string | null): IconComponent | null {
  if (!name) return null;
  return ICON_LIBRARIES[name] ?? null;
}

/**
 * Convert a skill level (1-5) to opacity, so higher-level skills look more solid
 * and lower-level skills look faded.
 */
export function levelOpacity(level: number): number {
  const map: Record<number, number> = {
    1: 0.3,
    2: 0.5,
    3: 0.65,
    4: 0.82,
    5: 1,
  };
  return map[level] ?? 1;
}

/**
 * Suggested icon names for common tech skills — used as defaults.
 */
export const SUGGESTED_ICONS: Record<string, string> = {
  PHP: "SiPhp",
  LARAVEL: "SiLaravel",
  LIVEWIRE: "SiLaravel",
  JAVASCRIPT: "SiJavascript",
  TYPESCRIPT: "SiTypescript",
  VUEJS: "SiVuedotjs",
  NUXTJS: "SiNuxtdotjs",
  INERTIAJS: "SiInertia",
  QUASAR: "SiQuasar",
  REACTJS: "SiReact",
  NEXTJS: "SiNextdotjs",
  HTML: "SiHtml5",
  CSS: "SiCss3",
  TAILWIND: "SiTailwindcss",
  VUETIFY: "SiVuetify",
  ELEMENTUI: "SiElement",
  MUI: "SiMui",
  GIT: "SiGit",
};
