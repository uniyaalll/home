"use client";

import { useTheme } from "../lib/theme";
import { Icon } from "./Icons";

type ThemeToggleProps = {
  size?: "sm" | "md";
};

export function ThemeToggle({ size = "sm" }: ThemeToggleProps) {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";
  const box = size === "md" ? "size-8" : "size-6";
  const icon = size === "md" ? "h-4 w-4" : "h-3.5 w-3.5";
  const iconPx = size === "md" ? 16 : 14;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={!isDark}
      title={isDark ? "Light mode" : "Dark mode"}
      className={`relative z-20 flex ${box} shrink-0 cursor-pointer select-none items-center justify-center border border-line bg-bg text-muted hover:text-fg focus-visible:text-fg focus-visible:outline-none motion-app`}
    >

      <Icon name={isDark ? "sun" : "moon"} className={icon} size={iconPx} />
    </button>
  );
}
