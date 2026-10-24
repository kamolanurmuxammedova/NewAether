"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CATEGORIES } from "@/lib/constants";
import {
  Laptop,
  FileCheck,
  UtensilsCrossed,
  HeartPulse,
  Gem,
  Sparkles,
  Shirt,
  Package,
  Cat,
  Armchair,
  Truck,
  HelpCircle,
  ArrowRight,
} from "lucide-react";

const ICON_MAP: Record<string, React.ElementType> = {
  Laptop,
  FileCheck,
  UtensilsCrossed,
  HeartPulse,
  Gem,
  Sparkles,
  Shirt,
  Package,
  Cat,
  Armchair,
  Truck,
  HelpCircle,
};

export function CategoriesSection() {
  const [filter, setFilter] = useState<"ALL" | "POPULAR" | "HIGH_VALUE">("ALL");

  const filtered = CATEGORIES.filter((c) => {
    if (filter === "POPULAR") return c.popular;
    if (filter === "HIGH_VALUE") return c.basePrice > 15;
    return true;
  });

  return (
    <section className="py-24 bg-[#070709] border-y border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-mono uppercase tracking-widest text-indigo-400">
              Специализированная перевозка
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Адаптировано под любой <br />
              <span className="gradient-accent-text">класс груза</span>
            </h2>
            <p className="text-sm text-zinc-400">
              От конфиденциальных документов до 1 500 кг бизнес-грузов — наши контейнеры и курьеры обеспечивают идеальную сохранность.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white/[0.04] border border-white/10 self-start md:self-auto">
            {(["ALL", "POPULAR", "HIGH_VALUE"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setFilter(mode)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  filter === mode
                    ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {mode === "ALL" ? "Все 12 классов" : mode === "POPULAR" ? "Популярные" : "Особо ценные"}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((cat, idx) => {
            const Icon = ICON_MAP[cat.icon] || Package;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: (idx % 4) * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={`/book?category=${cat.id}`}
                  className="group relative p-6 rounded-3xl bg-[#111217] border border-white/5 hover:border-indigo-500/40 hover:bg-[#15161E] transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-indigo-500/10 flex flex-col justify-between h-full"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-600/20 group-hover:text-white transition-all">
                        <Icon className="w-6 h-6" />
                      </div>
                      {cat.tag && (
                        <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
                          {cat.tag}
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors mb-2">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">
                      {cat.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-xs">
                    <div className="text-zinc-400">
                      <span className="text-[10px] text-zinc-500 block">Базовый тариф</span>
                      <span className="font-extrabold text-white font-mono text-sm">${cat.basePrice.toFixed(2)}</span>
                    </div>
                    <span className="gradient-btn px-3 py-1.5 rounded-xl text-[11px] font-semibold text-white flex items-center gap-1 opacity-90 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">
                      Вызвать <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
