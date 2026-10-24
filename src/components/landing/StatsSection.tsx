"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, ShieldCheck, Leaf, Clock } from "lucide-react";

export function StatsSection() {
  const stats = [
    {
      value: "1.84M+",
      label: "Выполненных доставок",
      subtext: "В 14 мировых мегаполисах",
      icon: Zap,
    },
    {
      value: "14.2м",
      label: "Ср. время по городу",
      subtext: "Зеленый коридор без задержек",
      icon: Clock,
    },
    {
      value: "99.98%",
      label: "SLA сохранности груза",
      subtext: "Поддержка Lloyd's of London",
      icon: ShieldCheck,
    },
    {
      value: "4 120т",
      label: "Сэкономлено CO2",
      subtext: "100% электротранспорт",
      icon: Leaf,
    },
  ];

  return (
    <section className="py-20 bg-[#09090B] border-y border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, scale: 1.03 }}
                className="text-center space-y-2 p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-purple-500/20 transition-colors cursor-default"
              >
                <motion.div
                  className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-400 mx-auto flex items-center justify-center mb-4"
                  initial={{ scale: 0, rotate: -15 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.15 + idx * 0.12, type: "spring", stiffness: 200 }}
                >
                  <Icon className="w-5 h-5" />
                </motion.div>
                <div className="text-3xl sm:text-5xl font-black text-white font-mono tracking-tight">
                  {s.value}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-zinc-200">{s.label}</div>
                <div className="text-[11px] text-zinc-500 font-mono">{s.subtext}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
