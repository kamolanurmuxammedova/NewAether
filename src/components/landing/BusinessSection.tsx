"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Building2, ArrowRight, Check } from "lucide-react";

export function BusinessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const enterprisePerks = [
    "REST и GraphQL API логистики с поддержкой вебхуков",
    "Выделенные курьеры с персональным допуском в ваши локации",
    "Консолидированные институциональные инвойсы и НДС-отчеты",
    "Финансовый SLA со 100% компенсацией при нарушении сроков",
    "Оптимизатор мульти-маршрутов (до 250 точек за один рейс)",
    "Круглосуточный консьерж и личный диспетчер флота 24/7",
  ];

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="py-16 md:py-24 bg-[#0A0B0D] border-b border-zinc-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-orange-500/10 border border-orange-500/30 text-orange-400 text-[10px] font-mono uppercase">
              <Building2 className="w-3.5 h-3.5" />
              <span>ДЛЯ КОРПОРАТИВНЫХ КЛИЕНТОВ</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Выделенный флот <br />
              <span className="text-orange-500">без капитальных затрат</span>
            </h2>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
              Оснастите ритейл, юридическую компанию или лабораторию инфраструктурой скоростной доставки. Интеграция API за считанные минуты.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {enterprisePerks.map((perk, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-zinc-300 font-sans">
                  <div className="w-4 h-4 bg-zinc-800 text-orange-400 border border-zinc-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>{perk}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/dashboard"
                className="gradient-btn px-5 py-2.5 text-xs font-bold text-white flex items-center gap-1.5"
              >
                <span>Подключить бизнес-аккаунт</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <Link
                href="/admin"
                className="px-4 py-2.5 rounded-sm bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-mono text-zinc-300 transition-colors"
              >
                API документация
              </Link>
            </div>
          </div>

          {/* Right Code/Architecture preview */}
          <div className="lg:col-span-6 font-mono text-xs">
            <div className="p-4 rounded-md border border-zinc-800 bg-[#111215] space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-800 text-[11px] text-zinc-500">
                <span>API DISPATCH WEBHOOK</span>
                <span className="text-emerald-400">STATUS 200 OK</span>
              </div>
              <pre className="text-[11px] text-zinc-300 leading-relaxed overflow-x-auto bg-[#0C0D10] p-3 border border-zinc-900">
{`curl -X POST https://api.aether.io/v4/dispatch \\
  -H "Authorization: Bearer sec_live_98x" \\
  -d '{
    "corridor": "PARK_AVE_EXPRESS",
    "sla_tier": "HYPERSPEED",
    "crypto_lock": true,
    "declared_value": 50000
  }'`}
              </pre>
              <div className="text-[10px] text-zinc-500 flex justify-between">
                <span>RESP_TIME: 18ms</span>
                <span>CLUSTER: EU-WEST-1</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
