"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
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
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [filter, setFilter] = useState<"ALL" | "POPULAR" | "HIGH_VALUE">("ALL");

  const filtered = CATEGORIES.filter((c) => {
    if (filter === "POPULAR") return c.popular;
    if (filter === "HIGH_VALUE") return c.basePrice > 15;
    return true;
  });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="py-16 md:py-24 bg-[#0A0B0D] border-b border-zinc-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2 max-w-xl">
            <span className="text-[10px] font-mono uppercase tracking-wider text-orange-500 bg-orange-500/10 border border-orange-500/30 px-2 py-0.5 rounded-sm inline-block">
              [ КАТЕГОРИИ ПЕРЕВОЗКИ ]
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Специализированные <span className="text-orange-500">классы грузов</span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-sans">
              От конфиденциальных документов до крупногабаритных бизнес-отправлений.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1 p-1 bg-zinc-900 border border-zinc-800 font-mono text-xs">
            {(["ALL", "POPULAR", "HIGH_VALUE"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setFilter(mode)}
                className={`px-3 py-1 transition-all ${
                  filter === mode
                    ? "bg-orange-500 text-white font-bold"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {mode === "ALL" ? "Все 12" : mode === "POPULAR" ? "Популярные" : "Ценные"}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((cat, idx) => {
            const Icon = ICON_MAP[cat.icon] || Package;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: (idx % 4) * 0.05 }}
              >
                <Link
                  href={`/book?category=${cat.id}`}
                  className="group relative p-5 rounded-md bg-[#111215] border border-zinc-800 hover:border-orange-500/60 transition-all duration-200 flex flex-col justify-between h-full font-mono text-xs"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-9 h-9 rounded-sm bg-zinc-900 border border-zinc-700 flex items-center justify-center text-orange-400 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      {cat.tag && (
                        <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 bg-zinc-800 text-zinc-300 border border-zinc-700">
                          {cat.tag}
                        </span>
                      )}
                    </div>

                    <h3 className="text-sm font-bold text-white group-hover:text-orange-400 transition-colors mb-1">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2 font-sans">
                      {cat.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-zinc-800 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] text-zinc-500 block">ТАРИФ</span>
                      <span className="font-bold text-white text-sm">${cat.basePrice.toFixed(2)}</span>
                    </div>
                    <span className="gradient-btn px-2.5 py-1 text-[11px] font-bold text-white flex items-center gap-1">
                      Заказ <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
