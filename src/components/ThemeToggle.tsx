"use client";

import { useTheme } from "../lib/theme";
import { Icon } from "./Icons";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={!isDark}
      title={isDark ? "Light mode" : "Dark mode"}
      className="flex size-8 shrink-0 cursor-pointer select-none items-center justify-center border border-line bg-bg text-muted hover:border-fg hover:text-fg focus-visible:text-fg focus-visible:outline-none"
    >
      <Icon name={isDark ? "sun" : "moon"} className="h-4 w-4" size={16} />
    </button>
  );
}
