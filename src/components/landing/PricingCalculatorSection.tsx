"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useOrderStore } from "@/store/use-order-store";
import { SPEED_TIERS, PRESET_ADDRESSES } from "@/lib/constants";
import { SpeedTier } from "@/types";
import { motion } from "framer-motion";
import { playClickSound, playSuccessSound } from "@/lib/sound";
import {
  Package,
  Sliders,
  ArrowRight,
  ShieldCheck,
  Zap,
} from "lucide-react";

interface ParcelPreset {
  id: string;
  name: string;
  icon: string;
  width: number;
  height: number;
  depth: number;
  weight: number;
  desc: string;
}

const PRESETS: ParcelPreset[] = [
  {
    id: "envelope",
    name: "Конверт / Пакет",
    icon: "✉️",
    width: 25,
    height: 15,
    depth: 2,
    weight: 0.3,
    desc: "Документы, контракты, ключи",
  },
  {
    id: "box",
    name: "Стандартный бокс",
    icon: "📦",
    width: 32,
    height: 20,
    depth: 12,
    weight: 2.2,
    desc: "Гаджеты, обувь, образцы",
  },
  {
    id: "pelican",
    name: "Кейс для техники",
    icon: "🧰",
    width: 45,
    height: 35,
    depth: 22,
    weight: 6.5,
    desc: "Оптика, камеры, платы",
  },
  {
    id: "vault",
    name: "Сейф-контейнер",
    icon: "🗄️",
    width: 55,
    height: 40,
    depth: 30,
    weight: 14.0,
    desc: "Ценные металлы, серверы",
  },
];

export function PricingCalculatorSection() {
  const router = useRouter();
  const { setSpeedTier, setWeight, setInsurance, setPickup, setDropoff } = useOrderStore();

  const [selectedPreset, setSelectedPreset] = useState<string>("box");
  const [boxScale, setBoxScale] = useState({ w: 32, h: 20, d: 12 });
  const [weightKg, setWeightKg] = useState(2.2);
  const [pickupAddr, setPickupAddr] = useState(PRESET_ADDRESSES[0].fullAddress);
  const [dropoffAddr, setDropoffAddr] = useState(PRESET_ADDRESSES[1].fullAddress);
  const [distanceKm, setDistanceKm] = useState(5.4);
  const [selectedSpeed, setSelectedSpeed] = useState<SpeedTier>("HYPERSPEED");
  const [includeInsurance, setIncludeInsurance] = useState(true);

  const speedObj = SPEED_TIERS.find((s) => s.id === selectedSpeed) || SPEED_TIERS[0];
  const baseRate = 9.5;
  const distanceCost = distanceKm * 2.1;
  const weightCost = weightKg * 1.3;
  const insuranceCost = includeInsurance ? 8.0 : 0.0;

  const rawSubtotal = (baseRate + distanceCost + weightCost) * speedObj.priceMultiplier;
  const grandTotal = Math.round((rawSubtotal + insuranceCost) * 100) / 100;
  const calculatedEtaMin = Math.round(distanceKm * 2.4 * (selectedSpeed === "HYPERSPEED" ? 0.75 : 1));

  const handleApplyPreset = (p: ParcelPreset) => {
    playClickSound();
    setSelectedPreset(p.id);
    setBoxScale({ w: p.width, h: p.height, d: p.depth });
    setWeightKg(p.weight);
  };

  const handleBookNow = () => {
    playSuccessSound();
    setSpeedTier(selectedSpeed);
    setWeight(weightKg);
    setInsurance(includeInsurance ? "STANDARD" : "NONE");
    setPickup(pickupAddr, PRESET_ADDRESSES[0].coords);
    setDropoff(dropoffAddr, PRESET_ADDRESSES[1].coords);
    router.push("/book");
  };

  return (
    <section id="pricing" className="py-16 md:py-24 bg-[#0A0B0D] border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="inline-block font-mono text-[10px] uppercase tracking-wider text-orange-500 bg-orange-500/10 border border-orange-500/30 px-2 py-0.5 rounded-sm">
            [ ТАРИФНЫЙ КАЛЬКУЛЯТОР ]
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Калькулятор параметров <span className="text-orange-500">с физикой объема</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-sans">
            Изменяйте размер, вес и дистанцию. Стоимость и ориентир подачи рассчитываются в реальном времени.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start max-w-5xl mx-auto">
          {/* Controls Panel */}
          <div className="lg:col-span-7 p-6 rounded-md border border-zinc-800 bg-[#111215] space-y-5">
            {/* Presets */}
            <div>
              <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2.5 font-bold">
                [1] ГАБАРИТЫ И ТИП ГРУЗА
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {PRESETS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleApplyPreset(p)}
                    className={`p-2.5 rounded-sm text-left border transition-all ${
                      selectedPreset === p.id
                        ? "bg-zinc-800 border-orange-500 text-white"
                        : "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
                    }`}
                  >
                    <span className="text-lg block mb-1">{p.icon}</span>
                    <span className="text-xs font-bold block truncate">{p.name}</span>
                    <span className="text-[10px] text-zinc-500 block truncate">{p.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Weight Slider */}
            <div className="space-y-1.5 font-mono">
              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-400 uppercase">[2] МАССА ОТПРАВЛЕНИЯ</span>
                <span className="text-orange-500 font-bold">{weightKg.toFixed(1)} КГ</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="30"
                step="0.1"
                value={weightKg}
                onChange={(e) => {
                  playClickSound();
                  setWeightKg(parseFloat(e.target.value));
                }}
                className="w-full accent-orange-500 bg-zinc-800 h-1.5 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-zinc-500">
                <span>0.1 КГ</span>
                <span>15 КГ</span>
                <span>30 КГ</span>
              </div>
            </div>

            {/* Distance Slider */}
            <div className="space-y-1.5 font-mono">
              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-400 uppercase">[3] РАССТОЯНИЕ МАРШРУТА</span>
                <span className="text-white font-bold">{distanceKm.toFixed(1)} КМ (~{calculatedEtaMin} МИН)</span>
              </div>
              <input
                type="range"
                min="1"
                max="35"
                step="0.5"
                value={distanceKm}
                onChange={(e) => {
                  playClickSound();
                  setDistanceKm(parseFloat(e.target.value));
                }}
                className="w-full accent-orange-500 bg-zinc-800 h-1.5 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-zinc-500">
                <span>1 КМ</span>
                <span>18 КМ</span>
                <span>35 КМ</span>
              </div>
            </div>

            {/* Speed Tier */}
            <div>
              <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-2 font-bold">
                [4] СКОРОСТЬ ДОСТАВКИ
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 font-mono">
                {SPEED_TIERS.map((tier) => (
                  <button
                    key={tier.id}
                    onClick={() => {
                      playClickSound();
                      setSelectedSpeed(tier.id);
                    }}
                    className={`p-2 rounded-sm border text-left transition-all ${
                      selectedSpeed === tier.id
                        ? "bg-orange-500 text-white font-bold border-orange-500"
                        : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white"
                    }`}
                  >
                    <div className="text-[11px] truncate">{tier.title.split(" ")[0]}</div>
                    <div className="text-[9px] opacity-70">{tier.eta}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Insurance Checkbox */}
            <label className="flex items-center gap-2.5 p-2.5 rounded-sm bg-zinc-900 border border-zinc-800 cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={includeInsurance}
                onChange={(e) => {
                  playClickSound();
                  setIncludeInsurance(e.target.checked);
                }}
                className="w-4 h-4 rounded-none accent-orange-500"
              />
              <div>
                <span className="font-bold text-white block">Полная материальная страховка (+$8.00)</span>
                <span className="text-[10px] text-zinc-400">Покрытие Lloyd&apos;s до $50,000</span>
              </div>
            </label>
          </div>

          {/* Right: Box Size Preview & Breakdown */}
          <div className="lg:col-span-5 space-y-4 font-mono">
            {/* Box preview */}
            <div className="p-5 rounded-md border border-zinc-800 bg-[#111215] text-center space-y-3">
              <span className="text-[10px] uppercase text-zinc-500 tracking-wider block">
                [ ГАБАРИТЫ В МАСШТАБЕ ]
              </span>

              <div className="h-36 flex items-center justify-center bg-[#0C0D10] border border-zinc-900">
                <motion.div
                  className="bg-zinc-800 border-2 border-zinc-600 flex flex-col items-center justify-center text-white"
                  style={{
                    width: `${Math.min(200, Math.max(80, boxScale.w * 3.5))}px`,
                    height: `${Math.min(130, Math.max(50, boxScale.h * 3.5))}px`,
                  }}
                >
                  <Package className="w-5 h-5 text-orange-400 mb-0.5" />
                  <span className="text-[10px] font-bold">
                    {boxScale.w}×{boxScale.h}×{boxScale.d} см
                  </span>
                  <span className="text-[9px] text-zinc-400">
                    {weightKg.toFixed(1)} кг
                  </span>
                </motion.div>
              </div>

              <div className="text-[10px] text-zinc-500">
                Объем: {((boxScale.w * boxScale.h * boxScale.d) / 1000).toFixed(1)} л
              </div>
            </div>

            {/* Cost ticket */}
            <div className="p-5 rounded-md border border-zinc-700 bg-[#141519] space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                <span className="text-xs text-zinc-400">РАСЧЕТНАЯ СТОИМОСТЬ</span>
                <span className="text-2xl font-black text-white">${grandTotal.toFixed(2)}</span>
              </div>

              <div className="space-y-1 text-xs text-zinc-400">
                <div className="flex justify-between">
                  <span>Подача курьера:</span>
                  <span className="text-zinc-200">${baseRate.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Дистанция ({distanceKm.toFixed(1)} км):</span>
                  <span className="text-zinc-200">${distanceCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Масса ({weightKg.toFixed(1)} кг):</span>
                  <span className="text-zinc-200">${weightCost.toFixed(2)}</span>
                </div>
                {includeInsurance && (
                  <div className="flex justify-between text-orange-400">
                    <span>Страховка:</span>
                    <span>+$8.00</span>
                  </div>
                )}
              </div>

              <button
                onClick={handleBookNow}
                className="w-full gradient-btn py-3 text-xs font-bold text-white flex items-center justify-center gap-1.5"
              >
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span>Заказать доставку (${grandTotal.toFixed(2)})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
