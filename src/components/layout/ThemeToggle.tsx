"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

export function ThemeToggle() {
  const t = useTranslation();
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("aether-theme") as "dark" | "light" | null;
    const initial = stored === "light" ? "light" : "dark";
    setTheme(initial);

    const root = document.documentElement;
    if (initial === "light") {
      root.classList.remove("dark");
      root.classList.add("light");
    } else {
      root.classList.remove("light");
      root.classList.add("dark");
    }
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("aether-theme", next);

    const root = document.documentElement;
    if (next === "light") {
      root.classList.remove("dark");
      root.classList.add("light");
    } else {
      root.classList.remove("light");
      root.classList.add("dark");
    }
  };

  if (!mounted) {
    return (
      <div className="w-8 h-8 flex items-center justify-center p-1.5 rounded-sm text-zinc-400">
        <Moon className="w-4 h-4" />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      title={theme === "dark" ? t.themeToggleLight : t.themeToggleDark}
      aria-label={theme === "dark" ? t.themeToggleLight : t.themeToggleDark}
      className="p-1.5 rounded-sm text-zinc-400 hover:text-zinc-800 dark:hover:text-white hover:bg-zinc-200/80 dark:hover:bg-zinc-800 transition-colors"
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4 text-orange-400 hover:text-orange-300 transition-colors" />
      ) : (
        <Moon className="w-4 h-4 text-zinc-600 hover:text-zinc-900 transition-colors" />
      )}
    </button>
  );
}
