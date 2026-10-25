"use client";

import React from "react";
import { motion } from "framer-motion";
import { Apple, Smartphone, QrCode, Sparkles, Zap } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

export function DownloadAppSection() {
  const t = useTranslation();

  return (
    <section className="py-24 bg-[#070709] border-t border-white/[0.06] relative overflow-hidden">
      <div className="ambient-glow -bottom-32 left-1/3 w-[600px] h-[350px] bg-orange-600/10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="p-8 sm:p-16 rounded-3xl bg-gradient-to-tr from-[#13141C] via-[#0E0F14] to-[#12131A] border border-white/10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Description */}
            <motion.div
              className="lg:col-span-7 space-y-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t.appBadge}</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                {t.appTitle} <br />
                <span className="text-orange-500">{t.appTitleAccent}</span>
              </h2>

              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-xl font-sans">
                {t.appSubtitle}
              </p>

              {/* App badges & QR code */}
              <motion.div
                className="flex flex-wrap items-center gap-4 pt-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              >
                <a
                  href="#download"
                  className="px-6 py-3.5 rounded-2xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 text-white flex items-center gap-3 transition-all hover:scale-105"
                >
                  <Apple className="w-6 h-6 text-white" />
                  <div className="text-left">
                    <span className="text-[10px] text-zinc-400 block font-mono">{t.appDownloadOn}</span>
                    <span className="text-xs font-bold font-sans">{t.appApple}</span>
                  </div>
                </a>

                <a
                  href="#download"
                  className="px-6 py-3.5 rounded-2xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 text-white flex items-center gap-3 transition-all hover:scale-105"
                >
                  <Smartphone className="w-6 h-6 text-orange-400" />
                  <div className="text-left">
                    <span className="text-[10px] text-zinc-400 block font-mono">{t.appDownloadOn}</span>
                    <span className="text-xs font-bold font-sans">{t.appGooglePlay}</span>
                  </div>
                </a>

                {/* Instant QR Box */}
                <div className="hidden sm:flex items-center gap-3 p-2.5 rounded-2xl bg-white/[0.03] border border-white/10">
                  <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center text-black">
                    <QrCode className="w-8 h-8" />
                  </div>
                  <div className="text-[11px] text-zinc-400 pr-2 font-mono">
                    <span className="font-semibold text-white block">
                      {t.lang === "uz" ? "Telefonga QR-kod" : t.lang === "en" ? "Phone QR Code" : "QR-код на телефон"}
                    </span>
                    <span>
                      {t.lang === "uz" ? "Tezkor o'rnatish" : t.lang === "en" ? "Instant Installation" : "Мгновенная установка"}
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Holographic Phone Mockup */}
            <motion.div
              className="lg:col-span-5 flex justify-center"
              initial={{ opacity: 0, y: 50, rotateY: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                className="relative w-64 sm:w-72 rounded-[42px] p-3 bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-950 border border-white/20 shadow-2xl"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* Screen */}
                <div className="w-full rounded-[34px] bg-[#09090B] overflow-hidden p-4 space-y-4 border border-white/5 font-mono">
                  {/* Dynamic Island */}
                  <div className="w-24 h-5 bg-black rounded-full mx-auto flex items-center justify-between px-2 text-[8px] text-zinc-500">
                    <span className="text-orange-400 font-bold">14m</span>
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>

                  {/* App Screen Header */}
                  <div className="flex items-center justify-between pt-2">
                    <div>
                      <div className="text-[10px] text-zinc-500 uppercase tracking-wider">
                        {t.lang === "uz" ? "Yo'lda" : t.lang === "en" ? "In Transit" : "В пути"}
                      </div>
                      <div className="text-xs font-bold text-white">AETH-982XF</div>
                    </div>
                    <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      {t.lang === "uz" ? "Yashil koridor" : t.lang === "en" ? "Green Corridor" : "Зеленый коридор"}
                    </span>
                  </div>

                  {/* Micro Map */}
                  <div className="h-32 rounded-2xl bg-[#111217] border border-white/10 p-3 relative overflow-hidden flex flex-col justify-between">
                    <div className="flex justify-between items-center text-[10px] text-zinc-400">
                      <span>{t.distCityAddr.split(",")[0]}</span>
                      <Zap className="w-3.5 h-3.5 text-orange-400 animate-bounce" />
                    </div>
                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-orange-500 to-amber-500 w-3/4 rounded-full" />
                    </div>
                    <div className="flex justify-between items-center text-[10px] text-zinc-400">
                      <span>{t.lang === "uz" ? "Tezlik: 38 km/s" : t.lang === "en" ? "Speed: 38 km/h" : "Скорость: 38 км/ч"}</span>
                      <span className="text-white font-bold">{t.lang === "uz" ? "Kelish: 6 daq" : t.lang === "en" ? "ETA: 6 min" : "Прибытие: 6 мин"}</span>
                    </div>
                  </div>

                  {/* Courier Card */}
                  <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/5 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center text-white text-xs font-bold">
                      М
                    </div>
                    <div className="text-left flex-1">
                      <div className="text-[11px] font-bold text-white">Marcus Sterling</div>
                      <div className="text-[9px] text-zinc-400">Cyber Scooter • 4.99 ★</div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button className="w-full gradient-btn py-2.5 rounded-xl text-[11px] font-bold text-white shadow-md">
                    {t.lang === "uz" ? "Topshirish kodi: 8492" : t.lang === "en" ? "Handover PIN: 8492" : "Код передачи: 8492"}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
