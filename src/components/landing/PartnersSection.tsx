"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "@/lib/i18n";

export function PartnersSection() {
  const t = useTranslation();

  const partners = useMemo(
    () => [
      { name: "APPLE CORPORATE", category: t.partnerCat1 },
      { name: "CARTIER", category: t.partnerCat2 },
      { name: "LLOYD'S OF LONDON", category: t.partnerCat3 },
      { name: "STRIPE INFRASTRUCTURE", category: t.partnerCat4 },
      { name: "SONY ENTERPRISE", category: t.partnerCat5 },
      { name: "TESLA FLEET", category: t.partnerCat6 },
    ],
    [t]
  );

  return (
    <section className="py-20 bg-[#09090B] border-t border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="text-xs font-mono uppercase tracking-widest text-zinc-500">
            {t.partnersTitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
          {partners.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4, scale: 1.05 }}
              className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors text-center group cursor-default"
            >
              <div className="font-mono text-xs font-bold text-zinc-300 group-hover:text-white transition-colors tracking-widest">
                {p.name}
              </div>
              <div className="text-[10px] text-zinc-500 mt-1 font-mono">
                {p.category}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
