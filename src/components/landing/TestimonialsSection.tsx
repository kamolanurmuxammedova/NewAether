"use client";

import React, { useRef, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Sparkles } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

export function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const t = useTranslation();

  const reviews = useMemo(
    () => [
      {
        name: t.testRev1Author,
        role: t.testRev1Role,
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
        content: t.testRev1Content,
        rating: 5,
        cargoClass: t.testRev1Class,
      },
      {
        name: t.testRev2Author,
        role: t.testRev2Role,
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
        content: t.testRev2Content,
        rating: 5,
        cargoClass: t.testRev2Class,
      },
      {
        name: t.testRev3Author,
        role: t.testRev3Role,
        avatar: "https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=150&auto=format&fit=crop&q=80",
        content: t.testRev3Content,
        rating: 5,
        cargoClass: t.testRev3Class,
      },
      {
        name: t.testRev4Author,
        role: t.testRev4Role,
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        content: t.testRev4Content,
        rating: 5,
        cargoClass: t.testRev4Class,
      },
    ],
    [t]
  );

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="py-24 bg-[#0A0B0D] border-b border-zinc-800/60 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-500/10 border border-orange-500/30 text-orange-400 text-[11px] font-mono uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.testBadge}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            {t.testTitle}
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 font-sans">
            {t.testSubtitle}
          </p>
        </div>

        {/* Review cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="p-6 bg-[#111215] border border-zinc-800 hover:border-orange-500/30 transition-colors duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-0.5 text-orange-400">
                    {[...Array(r.rating)].map((_, idx) => (
                      <Star key={idx} className="w-3.5 h-3.5 fill-orange-400 text-orange-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-orange-400 bg-orange-500/10 px-2 py-0.5 border border-orange-500/20">
                    {r.cargoClass}
                  </span>
                </div>

                <p className="text-sm text-zinc-300 leading-relaxed mb-5 font-sans">
                  &ldquo;{r.content}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-800 flex items-center gap-3">
                <div className="w-10 h-10 overflow-hidden bg-zinc-800 shrink-0 border border-zinc-700">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={r.avatar} alt={r.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-orange-400 transition-colors font-mono">
                    {r.name}
                  </h4>
                  <p className="text-xs text-zinc-500">{r.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
