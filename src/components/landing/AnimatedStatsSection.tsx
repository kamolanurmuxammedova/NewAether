"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useUserStore } from "@/store/use-user-store";
import { useTranslation } from "@/lib/i18n";

const STATS = [
  { value: 1247, suffix: "+", label: "Доставок сегодня", prefix: "" },
  { value: 14, suffix: " мин", label: "Среднее время", prefix: "~" },
  { value: 99.98, suffix: "%", label: "SLA выполнено", prefix: "" },
  { value: 84, suffix: "", label: "Курьеров онлайн", prefix: "" },
];

function AnimatedNumber({
  target,
  suffix,
  prefix,
  isInView,
}: {
  target: number;
  suffix: string;
  prefix: string;
  isInView: boolean;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const steps = 80;
    const interval = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 4);
      setDisplay(target * eased);
      if (step >= steps) {
        setDisplay(target);
        clearInterval(timer);
      }
    }, interval);
    return () => clearInterval(timer);
  }, [isInView, target]);

  const formatted =
    target < 100
      ? display.toFixed(target % 1 !== 0 ? 2 : 0)
      : Math.floor(display).toLocaleString("ru");
  return (
    <>
      {prefix}
      {formatted}
      {suffix}
    </>
  );
}

export function AnimatedStatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { language } = useUserStore();
  const t = useTranslation(language);

  const statsList = [
    { value: 1247, suffix: "+", label: t.statDeliveredToday, prefix: "" },
    { value: 14, suffix: " мин", label: t.statAvgTimeMin, prefix: "~" },
    { value: 99.98, suffix: "%", label: t.statSla, prefix: "" },
    { value: 84, suffix: "", label: t.statOnlineCouriers, prefix: "" },
  ];

  return (
    <section ref={ref} className="border-b border-zinc-800/60 bg-[#0A0B0D]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-zinc-800 border border-zinc-800">
          {statsList.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="p-8 text-center group hover:bg-zinc-900/40 transition-colors relative overflow-hidden"
            >
              <div className="text-4xl sm:text-5xl font-black text-white tabular-nums mb-2 tracking-tight">
                <AnimatedNumber
                  target={stat.value}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                  isInView={isInView}
                />
              </div>
              <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
                {stat.label}
              </div>
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-orange-500"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 0.8, delay: i * 0.15 + 0.5 }}
                viewport={{ once: true }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
