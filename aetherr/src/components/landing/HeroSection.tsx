"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useOrderStore } from "@/store/use-order-store";
import { PRESET_ADDRESSES, CATEGORIES } from "@/lib/constants";
import { PackageCategory } from "@/types";
import {
  Zap,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Clock,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";

export function HeroSection() {
  const router = useRouter();
  const { setPickup, setDropoff, setCategory } = useOrderStore();

  const [pickupInput, setPickupInput] = useState(PRESET_ADDRESSES[0].fullAddress);
  const [dropoffInput, setDropoffInput] = useState(PRESET_ADDRESSES[1].fullAddress);
  const [selectedCat, setSelectedCat] = useState<PackageCategory>("ELECTRONICS");

  const handleInstantDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    const pAddr = PRESET_ADDRESSES.find((a) => a.fullAddress === pickupInput) || PRESET_ADDRESSES[0];
    const dAddr = PRESET_ADDRESSES.find((a) => a.fullAddress === dropoffInput) || PRESET_ADDRESSES[1];

    setPickup(pAddr.fullAddress, pAddr.coords);
    setDropoff(dAddr.fullAddress, dAddr.coords);
    setCategory(selectedCat);
    router.push("/book");
  };

  const quickCategories = [
    { id: "ELECTRONICS" as PackageCategory, name: "Электроника", price: "$16" },
    { id: "DOCUMENTS" as PackageCategory, name: "Документы", price: "$12" },
    { id: "FOOD" as PackageCategory, name: "Рестораны", price: "$9.5" },
    { id: "MEDICINE" as PackageCategory, name: "Фармацевтика", price: "$11" },
    { id: "FRAGILE" as PackageCategory, name: "Ценные грузы", price: "$22" },
    { id: "LUXURY" as PackageCategory, name: "Премиум", price: "$14" },
  ];

  return (
    <section className="relative pt-8 pb-16 md:pt-16 md:pb-24 overflow-hidden">
      {/* Soft, calm background atmospheric glows (toned down, no harsh glare) */}
      <div className="ambient-glow top-0 left-1/3 w-[500px] h-[350px] bg-indigo-600/10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Text / Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            {/* Subtle Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              <span className="text-zinc-300 font-medium">Автономная логистика нового поколения</span>
              <span className="text-zinc-600">•</span>
              <span className="font-mono text-zinc-400 text-[11px]">v3.8</span>
            </div>

            {/* Headline - Refined typography, comfortable contrast */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12]">
              Невидимая{" "}
              <span className="gradient-accent-text">скорость</span>{" "}
              современной коммерции.
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-zinc-400 max-w-xl leading-relaxed">
              Автономная доставка по требованию для ценных активов, конфиденциальных документов,
              ресторанных блюд и бизнес-грузов. Подача курьера до 90 секунд. 100% гарантия сохранности.
            </p>

            {/* Quick Metrics Ticker */}
            <div className="grid grid-cols-3 gap-6 pt-2 border-t border-white/[0.06] max-w-md">
              <div>
                <div className="text-xl sm:text-2xl font-bold text-zinc-100 font-mono">14.2м</div>
                <div className="text-xs text-zinc-500 mt-0.5">Ср. доставка</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-zinc-100 font-mono">99.98%</div>
                <div className="text-xs text-zinc-500 mt-0.5">Точность SLA</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-zinc-100 font-mono">$100k</div>
                <div className="text-xs text-zinc-500 mt-0.5">Страховка Lloyd&apos;s</div>
              </div>
            </div>

            {/* CTAs - Calm, sleek, easy on the eyes */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/book"
                className="gradient-btn px-6 py-3 rounded-xl text-xs font-semibold text-white inline-flex items-center gap-2 group"
              >
                <span>Вызвать курьера</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="/track"
                className="px-5 py-3 rounded-xl text-xs font-medium text-zinc-300 hover:text-white bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] transition-colors inline-flex items-center gap-2"
              >
                <Clock className="w-3.5 h-3.5 text-zinc-400" />
                <span>Радар телеметрии</span>
              </Link>
            </div>
          </div>

          {/* Right Floating Dispatch Console - Clean minimalist card without harsh neon halos */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-[#101115] border border-white/[0.08] p-6 space-y-5 shadow-xl">
              {/* Card Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-xs font-semibold text-white tracking-wide">
                    Быстрый заказ доставки
                  </span>
                </div>
                <span className="text-[10px] font-mono text-zinc-400 bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.06]">
                  Фиксированные тарифы
                </span>
              </div>

              <form onSubmit={handleInstantDispatch} className="space-y-4">
                {/* Category Pills */}
                <div>
                  <label className="text-[11px] font-medium text-zinc-400 block mb-2">
                    Категория груза
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {quickCategories.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setSelectedCat(cat.id)}
                        className={`p-2 rounded-xl text-left border text-xs transition-colors ${
                          selectedCat === cat.id
                            ? "bg-white/[0.1] border-white/25 text-white"
                            : "bg-white/[0.02] border-white/[0.05] text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.04]"
                        }`}
                      >
                        <span className="font-medium block truncate text-[11px]">{cat.name}</span>
                        <span className="text-[10px] text-zinc-500 font-mono">{cat.price}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Pickup Address */}
                <div>
                  <label className="text-[11px] font-medium text-zinc-400 block mb-1.5 flex items-center justify-between">
                    <span className="flex items-center gap-1 text-zinc-300">
                      <MapPin className="w-3.5 h-3.5 text-zinc-400" /> Откуда забрать
                    </span>
                    <span className="text-[10px] text-zinc-500 font-normal">Адрес отправления</span>
                  </label>
                  <select
                    value={pickupInput}
                    onChange={(e) => setPickupInput(e.target.value)}
                    className="w-full rounded-xl px-3 py-2.5 text-xs bg-[#0D0E12] text-zinc-200 border border-white/[0.08] focus:border-white/20 focus:outline-none transition-colors"
                  >
                    {PRESET_ADDRESSES.map((addr) => (
                      <option key={addr.id} value={addr.fullAddress} className="bg-[#111217] text-zinc-200">
                        {addr.title} — {addr.fullAddress}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Destination Address */}
                <div>
                  <label className="text-[11px] font-medium text-zinc-400 block mb-1.5 flex items-center justify-between">
                    <span className="flex items-center gap-1 text-zinc-300">
                      <MapPin className="w-3.5 h-3.5 text-zinc-400" /> Куда доставить
                    </span>
                    <span className="text-[10px] text-zinc-500 font-normal">Пункт назначения</span>
                  </label>
                  <select
                    value={dropoffInput}
                    onChange={(e) => setDropoffInput(e.target.value)}
                    className="w-full rounded-xl px-3 py-2.5 text-xs bg-[#0D0E12] text-zinc-200 border border-white/[0.08] focus:border-white/20 focus:outline-none transition-colors"
                  >
                    {PRESET_ADDRESSES.map((addr) => (
                      <option key={addr.id} value={addr.fullAddress} className="bg-[#111217] text-zinc-200">
                        {addr.title} — {addr.fullAddress}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Estimated summary box */}
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-zinc-400">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>Время в пути:</span>
                    <span className="font-semibold text-zinc-200 font-mono">~14 мин</span>
                  </div>
                  <div className="text-right">
                    <span className="text-zinc-500 text-[10px] block">Ориентировочно</span>
                    <span className="font-bold text-sm text-white font-mono">$24.50</span>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full gradient-btn py-3 rounded-xl text-xs font-semibold text-white flex items-center justify-center gap-1.5"
                >
                  <span>Оформить доставку</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </form>

              {/* Micro Guarantee footer */}
              <div className="pt-1 flex items-center justify-center gap-4 text-[10px] text-zinc-500 font-mono">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-zinc-400" /> Биометрия
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-zinc-400" /> Страховка Lloyd&apos;s
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
