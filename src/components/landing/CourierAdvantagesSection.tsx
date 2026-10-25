"use client";

import React, { useRef, useMemo } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Bike, DollarSign, Zap, Shield, ArrowRight, Award } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

export function CourierAdvantagesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const t = useTranslation();

  const benefits = useMemo(
    () => [
      {
        icon: DollarSign,
        title: t.courierBenefit1Title,
        desc: t.courierBenefit1Desc,
        badge: t.courierBenefit1Badge,
      },
      {
        icon: Zap,
        title: t.courierBenefit2Title,
        desc: t.courierBenefit2Desc,
        badge: t.courierBenefit2Badge,
      },
      {
        icon: Bike,
        title: t.courierBenefit3Title,
        desc: t.courierBenefit3Desc,
        badge: t.courierBenefit3Badge,
      },
      {
        icon: Shield,
        title: t.courierBenefit4Title,
        desc: t.courierBenefit4Desc,
        badge: t.courierBenefit4Badge,
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
      className="py-16 md:py-24 bg-[#0A0B0D] border-b border-zinc-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-10 rounded-md bg-[#111215] border border-zinc-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-5 space-y-4 font-mono">
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-orange-500/10 border border-orange-500/30 text-orange-400 text-[10px] uppercase">
                <Award className="w-3.5 h-3.5" />
                <span>{t.courierBadge}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-sans">
                {t.courierTitle} <br />
                <span className="text-orange-500">{t.courierTitleAccent}</span>
              </h2>

              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
                {t.courierSubtitle}
              </p>

              <div className="pt-2">
                <Link
                  href="/courier"
                  className="gradient-btn inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white"
                >
                  <span>{t.courierCtaBtn}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Right Benefits Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
              {benefits.map((b, i) => {
                const Icon = b.icon;
                return (
                  <div
                    key={i}
                    className="p-4 rounded-sm bg-zinc-900/70 border border-zinc-800 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-7 h-7 bg-zinc-800 text-orange-400 border border-zinc-700 flex items-center justify-center">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[9px] px-1.5 py-0.5 bg-zinc-800 text-zinc-400 border border-zinc-700">
                        {b.badge}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-white">{b.title}</h4>
                    <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">{b.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
