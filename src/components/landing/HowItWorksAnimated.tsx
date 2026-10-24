"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Package, MapPin, Zap, CheckCircle } from "lucide-react";
import { useUserStore } from "@/store/use-user-store";
import { useTranslation } from "@/lib/i18n";

export function HowItWorksAnimated() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const { language } = useUserStore();
  const t = useTranslation(language);

  const steps = [
    {
      number: "01",
      icon: MapPin,
      title: t.step1Title,
      desc: t.step1Desc,
      accent: true,
    },
    {
      number: "02",
      icon: Package,
      title: t.step2Title,
      desc: t.step2Desc,
      accent: false,
    },
    {
      number: "03",
      icon: Zap,
      title: t.step3Title,
      desc: t.step3Desc,
      accent: true,
    },
    {
      number: "04",
      icon: CheckCircle,
      title: t.step4Title,
      desc: t.step4Desc,
      accent: false,
      green: true,
    },
  ];

  return (
    <section ref={ref} className="py-20 border-b border-zinc-800/60 bg-[#0A0B0D]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <div className="text-[11px] font-mono text-orange-500 tracking-widest uppercase mb-4">
            {t.stepsBadge}
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            {t.stepsTitle}{" "}
            <span className="text-orange-500">{t.stepsTitleHighlight}</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-zinc-800 divide-y lg:divide-y-0 divide-x-0 lg:divide-x divide-zinc-800">
          {steps.map((step, i) => {
            const Icon = step.icon;
            const iconColor = step.green
              ? "text-emerald-400"
              : step.accent
              ? "text-orange-500"
              : "text-zinc-300";
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: i * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group p-8 hover:bg-zinc-900/40 transition-colors relative overflow-hidden"
              >
                {/* Big number background */}
                <div className="absolute top-3 right-4 text-[80px] font-black text-zinc-900/60 leading-none select-none pointer-events-none">
                  {step.number}
                </div>

                <div className="w-10 h-10 border border-zinc-800 flex items-center justify-center mb-6 group-hover:border-orange-500/50 transition-colors relative z-10">
                  <Icon className={`w-5 h-5 ${iconColor}`} />
                </div>
                <h3 className="text-sm font-bold text-white mb-3 font-mono relative z-10">
                  {step.title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed font-sans relative z-10">
                  {step.desc}
                </p>

                {/* Animated orange bottom line */}
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-orange-500"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  transition={{ duration: 0.8, delay: i * 0.15 + 0.4 }}
                  viewport={{ once: true }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
