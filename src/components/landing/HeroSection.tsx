"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useOrderStore } from "@/store/use-order-store";
import { playClickSound, playRadarPing } from "@/lib/sound";
import { useTranslation } from "@/lib/i18n";
import { Zap, Radio, ArrowRight, Compass } from "lucide-react";

interface District {
  id: string;
  name: string;
  sub: string;
  x: number;
  y: number;
  couriersCount: number;
  avgTimeMin: number;
  baseRate: number;
  surge: string;
  address: string;
}

interface Vehicle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  type: "car" | "drone" | "bike";
}

export function HeroSection() {
  const router = useRouter();
  const t = useTranslation();
  const { setPickup } = useOrderStore();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(heroRef, { once: true });

  const districts: District[] = useMemo(
    () => [
      { id: "city", name: t.distCityName, sub: t.distCitySub, x: 48, y: 42, couriersCount: 28, avgTimeMin: 3.8, baseRate: 14.5, surge: t.heroNorm, address: t.distCityAddr },
      { id: "center", name: t.distCenterName, sub: t.distCenterSub, x: 58, y: 54, couriersCount: 21, avgTimeMin: 4.5, baseRate: 12.0, surge: t.heroPeak, address: t.distCenterAddr },
      { id: "north", name: t.distNorthName, sub: t.distNorthSub, x: 32, y: 28, couriersCount: 16, avgTimeMin: 6.2, baseRate: 9.8, surge: t.heroFree, address: t.distNorthAddr },
      { id: "tech", name: t.distTechName, sub: t.distTechSub, x: 24, y: 68, couriersCount: 14, avgTimeMin: 5.7, baseRate: 11.2, surge: t.heroFree, address: t.distTechAddr },
      { id: "airport", name: t.distAirportName, sub: t.distAirportSub, x: 82, y: 22, couriersCount: 9, avgTimeMin: 12.4, baseRate: 24.0, surge: t.heroExpress, address: t.distAirportAddr },
    ],
    [t]
  );

  const tickerItems = useMemo(
    () => [t.ticker1, t.ticker2, t.ticker3, t.ticker4, t.ticker5, t.ticker6, t.ticker7, t.ticker8, t.ticker9],
    [t]
  );

  const typewriterTexts = useMemo(
    () => [t.heroSub1, t.heroSub2, t.heroSub3, t.heroSub4],
    [t]
  );

  const headlineWords = useMemo(
    () => [t.heroHeadline1, t.heroHeadline2, t.heroHeadline3, t.heroHeadline4],
    [t]
  );

  const [selectedDistrictId, setSelectedDistrictId] = useState<string>("city");
  const selectedDistrict = districts.find((d) => d.id === selectedDistrictId) || districts[0];

  const [simSpeed, setSimSpeed] = useState<number>(1);
  const [typewriterText, setTypewriterText] = useState("");
  const [typewriterIndex, setTypewriterIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayCount, setDisplayCount] = useState({ couriers: 0, time: "0.0", orders: 0 });

  const vehiclesRef = useRef<Vehicle[]>([
    { id: 1, x: 200, y: 150, vx: 0.8, vy: 0.4, type: "drone" },
    { id: 2, x: 340, y: 220, vx: -0.6, vy: 0.5, type: "car" },
    { id: 3, x: 450, y: 180, vx: 0.4, vy: -0.7, type: "bike" },
    { id: 4, x: 180, y: 280, vx: 0.9, vy: -0.3, type: "car" },
    { id: 5, x: 500, y: 310, vx: -0.7, vy: -0.5, type: "drone" },
    { id: 6, x: 280, y: 110, vx: -0.5, vy: 0.8, type: "bike" },
  ]);

  // Typewriter effect
  useEffect(() => {
    const currentText = typewriterTexts[typewriterIndex % typewriterTexts.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && charIndex <= currentText.length) {
      setTypewriterText(currentText.slice(0, charIndex));
      timeout = setTimeout(() => setCharIndex((c) => c + 1), 55);
    } else if (isDeleting && charIndex >= 0) {
      setTypewriterText(currentText.slice(0, charIndex));
      timeout = setTimeout(() => setCharIndex((c) => c - 1), 25);
    } else if (!isDeleting && charIndex > currentText.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else {
      setIsDeleting(false);
      setTypewriterIndex((i) => (i + 1) % typewriterTexts.length);
      setCharIndex(0);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, typewriterIndex, typewriterTexts]);

  // Animated counters
  useEffect(() => {
    if (!isInView) return;

    const duration = 1600;
    const start = performance.now();

    const animateCounters = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);

      setDisplayCount({
        couriers: Math.floor(ease * 84),
        time: (ease * 3.4).toFixed(1),
        orders: Math.floor(ease * 1247),
      });

      if (progress < 1) {
        requestAnimationFrame(animateCounters);
      } else {
        setDisplayCount({ couriers: 84, time: "3.4", orders: 1247 });
      }
    };

    const id = requestAnimationFrame(animateCounters);
    return () => cancelAnimationFrame(id);
  }, [isInView]);

  // Canvas radar animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let angle = 0;

    const render = () => {
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;
      const radius = Math.min(w, h) * 0.44;

      ctx.clearRect(0, 0, w, h);

      // Background grid
      ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
      ctx.lineWidth = 1;
      const step = 28;
      for (let x = 0; x < w; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Range rings
      [0.25, 0.5, 0.75, 1].forEach((frac) => {
        ctx.beginPath();
        ctx.arc(cx, cy, radius * frac, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255, 77, 0, 0.18)";
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Crosshairs
      ctx.strokeStyle = "rgba(255, 77, 0, 0.12)";
      ctx.beginPath();
      ctx.moveTo(cx - radius, cy);
      ctx.lineTo(cx + radius, cy);
      ctx.moveTo(cx, cy - radius);
      ctx.lineTo(cx, cy + radius);
      ctx.stroke();

      // Rotating radar beam
      angle += 0.018 * simSpeed;
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
      grad.addColorStop(0, "rgba(255, 77, 0, 0.25)");
      grad.addColorStop(1, "rgba(255, 77, 0, 0.0)");

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, radius, angle, angle + 0.35);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();

      // Beam lead line
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(angle + 0.35) * radius, cy + Math.sin(angle + 0.35) * radius);
      ctx.strokeStyle = "rgba(255, 77, 0, 0.65)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();

      // Vehicles
      const vehicles = vehiclesRef.current;
      vehicles.forEach((veh) => {
        veh.x += veh.vx * simSpeed;
        veh.y += veh.vy * simSpeed;
        if (veh.x < 10 || veh.x > w - 10) veh.vx *= -1;
        if (veh.y < 10 || veh.y > h - 10) veh.vy *= -1;

        const isDrone = veh.type === "drone";
        ctx.fillStyle = isDrone ? "#FF4D00" : "#EDEDED";
        ctx.fillRect(veh.x - 2, veh.y - 2, 4, 4);
        ctx.strokeStyle = isDrone ? "rgba(255,77,0,0.35)" : "rgba(255,255,255,0.2)";
        ctx.lineWidth = 1;
        ctx.strokeRect(veh.x - 5, veh.y - 5, 10, 10);
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [simSpeed]);

  const handleSelectDistrict = (d: District) => {
    playClickSound();
    playRadarPing();
    setSelectedDistrictId(d.id);
  };

  const handleDispatch = () => {
    playClickSound();
    setPickup(selectedDistrict.address, {
      lat: 55.75 + selectedDistrict.y / 1000,
      lng: 37.61 + selectedDistrict.x / 1000,
    });
    router.push("/book");
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 32 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    }),
  };

  return (
    <section
      ref={heroRef}
      className="relative flex flex-col border-b border-zinc-800/80 overflow-hidden bg-[#0A0B0D]"
    >
      {/* Scrolling ticker */}
      <div className="border-b border-zinc-800 py-2 overflow-hidden shrink-0">
        <div className="flex gap-8 ticker-track whitespace-nowrap">
          {[...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
            <span
              key={i}
              className="text-[11px] font-mono text-zinc-400 flex items-center gap-3 shrink-0"
            >
              <span className="w-1 h-1 bg-orange-500 inline-block rounded-none" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Main hero content */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* LEFT: Text */}
        <div className="lg:col-span-5 space-y-7">
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 font-mono text-[11px] tracking-wider text-orange-400 border border-orange-500/30 bg-orange-500/8 px-3 py-1"
          >
            <span className="w-1.5 h-1.5 bg-emerald-500 inline-block animate-pulse" />
            {t.statusOperational}
          </motion.div>

          {/* Giant headline with word stagger */}
          <div className="space-y-1 overflow-hidden">
            <h1 className="text-5xl sm:text-6xl xl:text-7xl font-black tracking-tight text-white leading-[1.0]">
              {headlineWords.map((word, i) => (
                <motion.span
                  key={word + i}
                  custom={i}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  variants={wordVariants}
                  className={`inline-block mr-3 ${i === 2 ? "text-orange-500" : ""}`}
                >
                  {word}
                </motion.span>
              ))}
            </h1>
          </div>

          {/* Typewriter subtitle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="h-5"
          >
            <p className="text-sm text-zinc-400 font-mono">
              {typewriterText}
              <span className="inline-block w-px h-4 bg-orange-500 ml-0.5 animate-pulse" />
            </p>
          </motion.div>

          {/* Stat chips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.85, duration: 0.6 }}
            className="grid grid-cols-3 gap-2"
          >
            {[
              { label: t.statCouriers, value: displayCount.couriers },
              { label: t.statAvgTime, value: displayCount.time },
              { label: t.statToday, value: displayCount.orders },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-[#111215] border border-zinc-800 p-3 text-center"
              >
                <div className="text-2xl font-black text-white tabular-nums leading-none mb-1">
                  {stat.value}
                </div>
                <div className="text-[10px] font-mono text-zinc-500">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.0, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <motion.button
              onClick={handleDispatch}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="gradient-btn px-6 py-3.5 text-sm font-bold flex items-center justify-center gap-2 group"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>{t.heroOrderBtn}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/track"
                onClick={() => playClickSound()}
                className="px-5 py-3.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-sm font-mono text-zinc-200 flex items-center justify-center gap-2 transition-colors h-full"
              >
                <Compass className="w-4 h-4 text-zinc-400" />
                {t.heroTrackBtn}
              </Link>
            </motion.div>
          </motion.div>

          {/* District info card */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.1, duration: 0.5 }}
            className="border border-zinc-800 bg-[#0F1013] p-4 font-mono space-y-3"
          >
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-orange-500 inline-block" />
                <AnimatePresence mode="wait">
                  <motion.span
                    key={selectedDistrict.id}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.2 }}
                    className="text-xs font-bold text-white uppercase"
                  >
                    {selectedDistrict.name}
                  </motion.span>
                </AnimatePresence>
              </div>
              <span className="text-[10px] px-2 py-0.5 bg-zinc-800 text-zinc-300 border border-zinc-700">
                {selectedDistrict.surge}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              {[
                { v: selectedDistrict.couriersCount, l: t.heroDistrictCouriers },
                { v: `~${selectedDistrict.avgTimeMin}${t.lang === "uz" ? "daq" : t.lang === "en" ? "m" : "м"}`, l: t.heroDistrictDispatch },
                { v: `$${selectedDistrict.baseRate}`, l: t.heroDistrictRate },
              ].map((item) => (
                <AnimatePresence key={item.l} mode="wait">
                  <motion.div
                    key={`${selectedDistrict.id}-${item.l}`}
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-zinc-900 p-2.5 border border-zinc-800"
                  >
                    <div className="text-base font-bold text-orange-400">{item.v}</div>
                    <div className="text-[10px] text-zinc-500">{item.l}</div>
                  </motion.div>
                </AnimatePresence>
              ))}
            </div>
          </motion.div>
        </div>

        {/* RIGHT: Radar canvas */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7"
        >
          <div className="border border-zinc-800 bg-[#0A0B0D] overflow-hidden">
            {/* Radar header */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-zinc-800 font-mono text-[11px]">
              <div className="flex items-center gap-2">
                <Radio className="w-3.5 h-3.5 text-orange-500 animate-pulse" />
                <span className="font-bold text-white">{t.hubTitle}</span>
                <span className="text-zinc-600">{t.hubLive}</span>
              </div>
              <button
                onClick={() => {
                  playClickSound();
                  setSimSpeed((s) => (s === 1 ? 2 : s === 2 ? 4 : 1));
                }}
                className="px-2 py-1 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 transition-colors"
              >
                {simSpeed}x
              </button>
            </div>

            {/* Canvas */}
            <div className="relative w-full h-[380px] sm:h-[440px] bg-[#050608] overflow-hidden">
              <canvas
                ref={canvasRef}
                width={700}
                height={440}
                className="w-full h-full object-cover"
              />
              {districts.map((district) => {
                const isSelected = selectedDistrict.id === district.id;
                return (
                  <button
                    key={district.id}
                    onClick={() => handleSelectDistrict(district)}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 group z-20 focus:outline-none"
                    style={{ left: `${district.x}%`, top: `${district.y}%` }}
                  >
                    <motion.div
                      animate={
                        isSelected
                          ? { scale: [1, 1.25, 1] }
                          : { scale: 1 }
                      }
                      transition={{ repeat: isSelected ? Infinity : 0, duration: 2 }}
                      className={`w-3 h-3 transition-all ${
                        isSelected
                          ? "bg-orange-500 ring-4 ring-orange-500/20"
                          : "bg-zinc-600 border border-zinc-500 group-hover:bg-orange-500"
                      }`}
                    />
                    <div
                      className={`absolute top-4 left-1/2 -translate-x-1/2 px-1.5 py-0.5 text-[9px] font-mono whitespace-nowrap border ${
                        isSelected
                          ? "bg-black border-orange-500 text-orange-400 font-bold"
                          : "bg-zinc-950/90 border-zinc-800 text-zinc-400 group-hover:text-white"
                      }`}
                    >
                      {district.name}
                    </div>
                  </button>
                );
              })}
              <div className="absolute bottom-2 left-2 bg-black/90 border border-zinc-800 px-2 py-1.5 text-[9px] font-mono text-zinc-400 space-y-0.5 pointer-events-none">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-orange-500" /> {t.hubDrones}
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-zinc-300" /> {t.hubCouriers}
                </div>
              </div>
            </div>

            {/* District chips */}
            <div className="flex gap-1 overflow-x-auto p-2 border-t border-zinc-800 font-mono">
              {districts.map((d) => (
                <button
                  key={d.id}
                  onClick={() => handleSelectDistrict(d)}
                  className={`px-2.5 py-1 text-[11px] whitespace-nowrap border transition-all ${
                    selectedDistrict.id === d.id
                      ? "bg-orange-500 text-white font-bold border-orange-500"
                      : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600"
                  }`}
                >
                  {d.name}{" "}
                  <span className="opacity-50">({d.couriersCount})</span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
