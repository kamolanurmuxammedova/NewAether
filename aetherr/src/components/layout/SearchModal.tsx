"use client";

import React, { useState, useEffect } from "react";
import { useUserStore } from "@/store/use-user-store";
import { CATEGORIES } from "@/lib/constants";
import { Search, X, ArrowRight, Sparkles, PackageCheck } from "lucide-react";
import Link from "next/link";

export function SearchModal() {
  const { isSearchOpen, setIsSearchOpen } = useUserStore();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchOpen(!isSearchOpen);
      }
      if (e.key === "Escape" && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const filteredCategories = CATEGORIES.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-[#111217] border border-white/10 rounded-3xl shadow-2xl overflow-hidden text-zinc-100 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center px-6 py-4 border-b border-white/10">
          <Search className="w-5 h-5 text-indigo-400 mr-3 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск доставок, адресов, категорий или номер трека..."
            className="w-full bg-transparent text-white placeholder-zinc-500 text-base focus:outline-none"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 rounded-full hover:bg-white/10 text-zinc-400"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="ml-3 text-xs bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg text-zinc-400 hover:text-white"
          >
            ESC
          </button>
        </div>

        {/* Content body */}
        <div className="max-h-[60vh] overflow-y-auto p-6 space-y-6">
          {/* Quick Tracking Query Hint */}
          {query.startsWith("AETH-") || query.length >= 6 ? (
            <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <PackageCheck className="w-6 h-6 text-indigo-400" />
                <div>
                  <h4 className="text-sm font-semibold text-white">
                    Отследить отправление #{query.toUpperCase()}
                  </h4>
                  <p className="text-xs text-zinc-400">Мгновенный спутниковый поиск телеметрии</p>
                </div>
              </div>
              <Link
                href={`/track?order=${encodeURIComponent(query)}`}
                onClick={() => setIsSearchOpen(false)}
                className="gradient-btn px-4 py-1.5 rounded-xl text-xs font-semibold text-white flex items-center gap-1.5"
              >
                Отследить <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : null}

          {/* Categories matches */}
          <div>
            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">
              Подходящие категории доставки
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {filteredCategories.slice(0, 6).map((cat) => (
                <Link
                  key={cat.id}
                  href={`/book?category=${cat.id}`}
                  onClick={() => setIsSearchOpen(false)}
                  className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-indigo-500/30 transition-all group"
                >
                  <div>
                    <div className="text-sm font-medium text-white group-hover:text-indigo-300 transition-colors">
                      {cat.name}
                    </div>
                    <div className="text-xs text-zinc-400">От ${cat.basePrice.toFixed(2)}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-indigo-400 transition-transform group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </div>

          {/* Popular searches */}
          <div>
            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" /> Популярные запросы
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                "Срочный MacBook",
                "Парк Авеню, 740",
                "Договор с биометрией",
                "Инсулин с термобоксом",
                "VIP-курьер Tesla",
                "Цветы за 1 час",
              ].map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="text-xs px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/5 transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
