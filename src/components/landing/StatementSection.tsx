"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useUserStore } from "@/store/use-user-store";
import { useTranslation } from "@/lib/i18n";

export function StatementSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { language } = useUserStore();
  const t = useTranslation(language);

  return (
    <section ref={ref} className="py-24 md:py-36 border-b border-zinc-800/60 overflow-hidden bg-[#0A0B0D]">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
          className="text-[11px] font-mono text-orange-500 tracking-widest mb-8 uppercase"
        >
          {t.philBadge}
        </motion.div>

        <div className="overflow-hidden mb-6">
          <motion.h2
            initial={{ y: "100%", opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-tight"
          >
            {t.philH2Part1}{" "}
            <span className="text-orange-500">{t.philH2Part2}</span>{" "}
            {t.philH2Part3}
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed font-sans"
        >
          {t.philDesc}
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent max-w-md mx-auto mt-12"
        />
      </div>
    </section>
  );
}
