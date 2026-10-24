"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Check stored theme; default is "dark" as requested ("дефолтный 1")
    const stored = localStorage.getItem("aether-theme") as "dark" | "light" | null;
    const initial = stored === "light" ? "light" : "dark";
    setTheme(initial);
    if (initial === "light") {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
    }
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("aether-theme", next);
    if (next === "light") {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
    }
  };

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Переключить тему"
        className="p-2 rounded-lg text-zinc-400"
      >
        <Moon className="w-4 h-4" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      title={theme === "dark" ? "Переключить на светлую тему" : "Переключить на темную тему"}
      aria-label="Переключить тему"
      className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.04] transition-colors group"
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4 text-zinc-400 group-hover:text-amber-300 transition-colors" />
      ) : (
        <Moon className="w-4 h-4 text-zinc-500 group-hover:text-indigo-600 transition-colors" />
      )}
    </button>
  );
}
