"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { playScannerBeep, playSuccessSound, playClickSound } from "@/lib/sound";
import { useTranslation } from "@/lib/i18n";
import {
  Package,
  Scan,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Activity,
  Maximize2,
  Lock,
  ArrowRight,
  Sliders,
} from "lucide-react";
import Link from "next/link";

interface JourneyStage {
  step: string;
  title: string;
  subtitle: string;
  detail: string;
  badge: string;
  metric: string;
  metricLabel: string;
}

export function ScrollJourneySection() {
  const t = useTranslation();
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isScanned, setIsScanned] = useState(false);
  const [tiltAngle, setTiltAngle] = useState(0);

  const stages: JourneyStage[] = useMemo(
    () => [
      {
        step: "01",
        title: t.journeyStage1Title,
        subtitle: t.journeyStage1Sub,
        detail: t.journeyStage1Detail,
        badge: t.journeyStage1Badge,
        metric: t.journeyStage1Metric,
        metricLabel: t.journeyStage1MetricLabel,
      },
      {
        step: "02",
        title: t.journeyStage2Title,
        subtitle: t.journeyStage2Sub,
        detail: t.journeyStage2Detail,
        badge: t.journeyStage2Badge,
        metric: t.journeyStage2Metric,
        metricLabel: t.journeyStage2MetricLabel,
      },
      {
        step: "03",
        title: t.journeyStage3Title,
        subtitle: t.journeyStage3Sub,
        detail: t.journeyStage3Detail,
        badge: t.journeyStage3Badge,
        metric: t.journeyStage3Metric,
        metricLabel: t.journeyStage3MetricLabel,
      },
      {
        step: "04",
        title: t.journeyStage4Title,
        subtitle: t.journeyStage4Sub,
        detail: t.journeyStage4Detail,
        badge: t.journeyStage4Badge,
        metric: t.journeyStage4Metric,
        metricLabel: t.journeyStage4MetricLabel,
      },
    ],
    [t]
  );

  const handleStepClick = (index: number) => {
    playClickSound();
    setActiveStep(index);
    if (index === 0) playScannerBeep();
    if (index === 3) playSuccessSound();
  };

  const handleTestScan = () => {
    playScannerBeep();
    setIsScanned(true);
    setTimeout(() => setIsScanned(false), 1800);
  };

  const currentStage = stages[activeStep];
  const progressPercent = (activeStep / (stages.length - 1)) * 100;

  return (
    <section className="py-16 md:py-24 bg-[#0A0B0D] border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
          <div className="inline-block font-mono text-[10px] uppercase tracking-wider text-orange-500 bg-orange-500/10 border border-orange-500/30 px-2 py-0.5 rounded-sm">
            {t.journeyBadge}
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            {t.journeyTitle}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-sans">
            {t.journeySubtitle}
          </p>
        </div>

        {/* Stepper Rail */}
        <div className="mb-10 relative max-w-4xl mx-auto">
          <div className="h-0.5 w-full bg-zinc-800 relative">
            <motion.div
              className="h-full bg-orange-500"
              style={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <div className="flex justify-between items-center -mt-3.5 relative z-10">
            {stages.map((s, idx) => {
              const isActive = idx === activeStep;
              const isPast = idx < activeStep;
              return (
                <button
                  key={s.step}
                  onClick={() => handleStepClick(idx)}
                  className="flex flex-col items-center group focus:outline-none"
                >
                  <div
                    className={`w-7 h-7 flex items-center justify-center font-mono text-xs font-bold transition-all border ${
                      isActive
                        ? "bg-orange-500 text-white border-orange-400 ring-2 ring-orange-500/30"
                        : isPast
                        ? "bg-zinc-800 text-emerald-400 border-zinc-600"
                        : "bg-zinc-900 text-zinc-500 border-zinc-800 group-hover:border-zinc-600"
                    }`}
                  >
                    {isPast ? "✓" : s.step}
                  </div>
                  <span
                    className={`text-[11px] font-mono mt-2 transition-colors hidden sm:inline ${
                      isActive ? "text-orange-400 font-bold" : "text-zinc-500 group-hover:text-zinc-300"
                    }`}
                  >
                    {s.title.split("&")[0].split("/")[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Stage Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center max-w-5xl mx-auto">
          {/* Left: Box Visualizer */}
          <div className="lg:col-span-6">
            <div className="rounded-md p-6 border border-zinc-800 bg-[#111215] relative font-mono space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500 animate-pulse" />
                  <span className="text-zinc-300 font-bold">
                    MANIFEST #{1000 + activeStep * 324}
                  </span>
                </div>
                <span className="text-[10px] px-2 py-0.5 bg-orange-500/10 text-orange-400 border border-orange-500/30">
                  {currentStage.badge}
                </span>
              </div>

              {/* Box Box Box */}
              <div className="relative h-56 flex items-center justify-center bg-[#0C0D10] border border-zinc-900">
                {isScanned && (
                  <motion.div
                    className="absolute inset-x-4 h-0.5 bg-red-500 shadow-md shadow-red-500/80 z-20"
                    initial={{ top: "10%" }}
                    animate={{ top: "90%" }}
                    transition={{ duration: 1, repeat: 1, repeatType: "reverse" }}
                  />
                )}

                <motion.div
                  className="w-40 h-40 bg-zinc-900 border-2 border-zinc-700 relative flex flex-col justify-between p-3 select-none"
                  animate={{
                    rotateZ: activeStep === 2 ? tiltAngle : 0,
                  }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-6 bg-black border-y border-zinc-700 flex items-center justify-center">
                    <span className="text-[8px] tracking-widest text-zinc-400 font-bold">
                      AETHER CARGO
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-[8px] text-zinc-400">
                    <span className="text-orange-500 font-bold">FRAGILE</span>
                    <span>STAGE {activeStep + 1}/4</span>
                  </div>

                  <div className="w-10 h-10 border border-zinc-700 bg-black flex items-center justify-center text-orange-400 mx-auto">
                    <Package className="w-5 h-5" />
                  </div>

                  <div className="flex justify-between text-[8px] text-zinc-500 border-t border-zinc-800 pt-1">
                    <span>STATUS: OK</span>
                    <span>100% SEALED</span>
                  </div>
                </motion.div>
              </div>

              {/* Controls */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-zinc-800 text-xs">
                <button
                  onClick={handleTestScan}
                  className="px-3 py-1.5 rounded-sm bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 flex items-center gap-1.5 transition-colors"
                >
                  <Scan className="w-3.5 h-3.5 text-orange-400" />
                  <span>
                    {isScanned
                      ? t.lang === "uz"
                        ? "Skanerlanmoqda..."
                        : t.lang === "en"
                        ? "Scanning..."
                        : "Сканирование..."
                      : t.lang === "uz"
                      ? "Test skanerlash"
                      : t.lang === "en"
                      ? "Test Scan"
                      : "Тестовый скан"}
                  </span>
                </button>

                {activeStep === 2 && (
                  <button
                    onClick={() => {
                      playClickSound();
                      setTiltAngle((a) => (a === 0 ? 10 : a === 10 ? -10 : 0));
                    }}
                    className="px-2.5 py-1.5 rounded-sm bg-zinc-800 text-zinc-300 text-[11px] border border-zinc-700"
                  >
                    {t.lang === "uz" ? "Og'ish testi" : t.lang === "en" ? "Tilt Test" : "Тест наклона"} ({tiltAngle}°)
                  </button>
                )}

                <span className="text-zinc-500 text-[11px]">
                  {currentStage.metricLabel}: <strong className="text-white">{currentStage.metric}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Right: Stage Detail */}
          <div className="lg:col-span-6 space-y-5">
            <div className="space-y-2">
              <span className="text-[11px] font-mono text-orange-500 uppercase tracking-widest font-bold">
                [ {t.lang === "uz" ? "BOSQICH" : t.lang === "en" ? "STAGE" : "ЭТАП"} {currentStage.step} / 04 ]
              </span>
              <h3 className="text-2xl font-black text-white">
                {currentStage.title}
              </h3>
              <p className="text-sm text-zinc-300 font-medium">
                {currentStage.subtitle}
              </p>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans">
                {currentStage.detail}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 font-mono">
              <div className="p-3.5 rounded-md bg-[#111215] border border-zinc-800">
                <div className="text-xl font-black text-white">{currentStage.metric}</div>
                <div className="text-[10px] text-zinc-500 mt-0.5">{currentStage.metricLabel}</div>
              </div>
              <div className="p-3.5 rounded-md bg-[#111215] border border-zinc-800">
                <div className="text-xl font-black text-emerald-400">0.00%</div>
                <div className="text-[10px] text-zinc-500 mt-0.5">
                  {t.lang === "uz" ? "Xavf darajasi" : t.lang === "en" ? "Incident Risk" : "Риск инцидентов"}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <button
                onClick={() => handleStepClick((activeStep + 1) % stages.length)}
                className="gradient-btn px-5 py-2.5 text-xs font-bold text-white flex items-center gap-2"
              >
                <span>{t.lang === "uz" ? "Keyingi bosqich" : t.lang === "en" ? "Next Stage" : "Следующий этап"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                href="/track"
                onClick={() => playClickSound()}
                className="px-4 py-2.5 rounded-md bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-mono text-zinc-300 transition-colors"
              >
                {t.lang === "uz" ? "Kuzatuvni ochish" : t.lang === "en" ? "Open Tracking" : "Открыть трекинг"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
