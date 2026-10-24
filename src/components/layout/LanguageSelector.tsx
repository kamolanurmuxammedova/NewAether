"use client";

import React, { useState } from "react";
import { useUserStore } from "@/store/use-user-store";
import { Globe } from "lucide-react";
import { playClickSound } from "@/lib/sound";

const LANGUAGES = [
  { code: "ru", label: "RU", title: "Русский" },
  { code: "en", label: "EN", title: "English" },
  { code: "uz", label: "UZ", title: "O'zbekcha" },
] as const;

export function LanguageSelector() {
  const { language, setLanguage } = useUserStore();
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = (language?.toLowerCase() === "en" ? "en" : language?.toLowerCase() === "uz" ? "uz" : "ru");

  const handleSelect = (code: string) => {
    playClickSound();
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className="relative font-mono text-xs">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        title="Смена языка (RU / EN / UZ)"
        className="flex items-center gap-1 px-2 py-1 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white transition-colors"
      >
        <Globe className="w-3.5 h-3.5 text-orange-500" />
        <span className="font-bold text-[11px] uppercase">{currentLang}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-32 bg-[#121316] border border-zinc-700 shadow-2xl p-1 z-50">
          {LANGUAGES.map((item) => (
            <button
              key={item.code}
              type="button"
              onClick={() => handleSelect(item.code)}
              className={`w-full text-left px-2.5 py-1.5 text-[11px] flex items-center justify-between transition-colors ${
                currentLang === item.code
                  ? "bg-orange-500/10 text-orange-400 font-bold border-l-2 border-orange-500"
                  : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
              }`}
            >
              <span>{item.title}</span>
              <span className="text-[9px] uppercase opacity-60 font-mono">{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
