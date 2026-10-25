"use client";

import React, { useState } from "react";
import { playClickSound, playScannerBeep, playSuccessSound } from "@/lib/sound";
import {
  Printer,
  Copy,
  Check,
  FileText,
  Shield,
  Zap,
  Tag,
  ArrowRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useOrderStore } from "@/store/use-order-store";
import { useTranslation } from "@/lib/i18n";

export function WaybillSection() {
  const router = useRouter();
  const t = useTranslation();
  const { setPickup, setDropoff } = useOrderStore();

  const [trackingCode, setTrackingCode] = useState("AETH-9842-XF");
  const [senderName, setSenderName] = useState("Иван Смирнов (TechCorp)");
  const [recipientName, setRecipientName] = useState("Елена Власова (Alpha HQ)");
  const [originCity, setOriginCity] = useState("Москва, Сити Башня Федерация");
  const [destCity, setDestCity] = useState("Москва, Тверская 15");
  const [weightKg, setWeightKg] = useState("2.4");
  const [isCopied, setIsCopied] = useState(false);
  const [themeMode, setThemeMode] = useState<"dark" | "kraft">("dark");

  const handleCopyCode = () => {
    playScannerBeep();
    navigator.clipboard.writeText(trackingCode);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handlePrint = () => {
    playClickSound();
    window.print();
  };

  const handleBookWithWaybill = () => {
    playSuccessSound();
    setPickup(originCity, { lat: 55.75, lng: 37.62 });
    setDropoff(destCity, { lat: 55.76, lng: 37.61 });
    router.push("/book");
  };

  const generateNewCode = () => {
    playClickSound();
    const rand = Math.floor(1000 + Math.random() * 9000);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const suffix = chars[Math.floor(Math.random() * chars.length)] + chars[Math.floor(Math.random() * chars.length)];
    setTrackingCode(`AETH-${rand}-${suffix}`);
  };

  return (
    <section className="py-16 md:py-24 bg-[#0A0B0D] border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
          <div className="inline-block font-mono text-[10px] uppercase tracking-wider text-orange-500 bg-orange-500/10 border border-orange-500/30 px-2 py-0.5 rounded-sm">
            {t.waybillBadge}
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            {t.waybillTitle} <span className="text-orange-500">{t.waybillTitleAccent}</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 font-sans">
            {t.waybillSubtitle}
          </p>
        </div>

        {/* Waybill Studio Card */}
        <div className="max-w-3xl mx-auto">
          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3 font-mono text-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  playClickSound();
                  setThemeMode((m) => (m === "dark" ? "kraft" : "dark"));
                }}
                className="px-2.5 py-1 rounded-sm bg-zinc-900 border border-zinc-700 text-zinc-300 hover:text-white transition-colors"
              >
                {t.lang === "uz" ? "Qog'oz turi: " : t.lang === "en" ? "Paper: " : "Бумага: "}
                {themeMode === "dark" ? t.waybillThemeDark : t.waybillThemeKraft}
              </button>
              <button
                onClick={generateNewCode}
                className="px-2.5 py-1 rounded-sm bg-zinc-900 border border-zinc-700 text-orange-400 hover:text-orange-300 transition-colors"
              >
                + {t.waybillGenerateBtn}
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyCode}
                className="px-2.5 py-1 rounded-sm bg-zinc-900 border border-zinc-700 text-zinc-300 flex items-center gap-1.5 transition-colors"
              >
                {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{isCopied ? t.waybillCopied : t.waybillCopyBtn}</span>
              </button>

              <button
                onClick={handlePrint}
                className="px-2.5 py-1 rounded-sm bg-zinc-900 border border-zinc-700 text-zinc-300 flex items-center gap-1.5 transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>{t.waybillPrintBtn}</span>
              </button>
            </div>
          </div>

          {/* Physical Manifest Sheet */}
          <div
            className={`p-6 border-2 shadow-xl transition-all relative font-mono text-xs ${
              themeMode === "dark"
                ? "bg-[#111215] border-zinc-700 text-zinc-200"
                : "bg-[#EAE0D0] border-[#8C7B64] text-zinc-900"
            }`}
          >
            {/* Rubber Stamp */}
            <div className="absolute right-6 top-6 transform rotate-6 pointer-events-none select-none z-10">
              <div className="border-2 border-red-600 text-red-600 px-3 py-1 text-sm font-black uppercase tracking-wider opacity-90">
                {t.lang === "uz" ? "FRAGILE / EHTIYOT BO'LING" : t.lang === "en" ? "FRAGILE / HANDLE WITH CARE" : "FRAGILE / ОСТОРОЖНО"}
              </div>
            </div>

            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between sm:items-center pb-4 border-b border-dashed border-current/30 gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-black text-base tracking-tight">AETHER AIR WAYBILL</span>
                </div>
                <div className="text-[10px] opacity-60">
                  STANDARD LOGISTICS MANIFEST • ISO-9001
                </div>
              </div>

              <div>
                <div className="text-[10px] opacity-60">
                  {t.lang === "uz" ? "YUK XATI RAQAMI:" : t.lang === "en" ? "WAYBILL NUMBER:" : "НОМЕР НАКЛАДНОЙ:"}
                </div>
                <div className="text-sm font-black tracking-wider text-orange-500">{trackingCode}</div>
              </div>
            </div>

            {/* Barcode Strip */}
            <div className="py-4 border-b border-dashed border-current/30 flex flex-col items-center justify-center space-y-1">
              <svg className="w-full max-w-sm h-12" viewBox="0 0 240 40">
                <rect x="0" y="0" width="3" height="40" fill="currentColor" />
                <rect x="5" y="0" width="1" height="40" fill="currentColor" />
                <rect x="8" y="0" width="4" height="40" fill="currentColor" />
                <rect x="15" y="0" width="2" height="40" fill="currentColor" />
                <rect x="19" y="0" width="1" height="40" fill="currentColor" />
                <rect x="23" y="0" width="5" height="40" fill="currentColor" />
                <rect x="31" y="0" width="2" height="40" fill="currentColor" />
                <rect x="35" y="0" width="4" height="40" fill="currentColor" />
                <rect x="42" y="0" width="1" height="40" fill="currentColor" />
                <rect x="46" y="0" width="3" height="40" fill="currentColor" />
                <rect x="52" y="0" width="2" height="40" fill="currentColor" />
                <rect x="57" y="0" width="4" height="40" fill="currentColor" />
                <rect x="64" y="0" width="1" height="40" fill="currentColor" />
                <rect x="68" y="0" width="5" height="40" fill="currentColor" />
                <rect x="76" y="0" width="2" height="40" fill="currentColor" />
                <rect x="81" y="0" width="3" height="40" fill="currentColor" />
                <rect x="87" y="0" width="1" height="40" fill="currentColor" />
                <rect x="91" y="0" width="4" height="40" fill="currentColor" />
                <rect x="98" y="0" width="2" height="40" fill="currentColor" />
                <rect x="103" y="0" width="3" height="40" fill="currentColor" />
                <rect x="109" y="0" width="5" height="40" fill="currentColor" />
                <rect x="117" y="0" width="1" height="40" fill="currentColor" />
                <rect x="121" y="0" width="4" height="40" fill="currentColor" />
                <rect x="128" y="0" width="2" height="40" fill="currentColor" />
                <rect x="133" y="0" width="3" height="40" fill="currentColor" />
                <rect x="139" y="0" width="1" height="40" fill="currentColor" />
                <rect x="143" y="0" width="4" height="40" fill="currentColor" />
                <rect x="150" y="0" width="2" height="40" fill="currentColor" />
                <rect x="155" y="0" width="5" height="40" fill="currentColor" />
                <rect x="163" y="0" width="1" height="40" fill="currentColor" />
                <rect x="167" y="0" width="3" height="40" fill="currentColor" />
                <rect x="173" y="0" width="4" height="40" fill="currentColor" />
                <rect x="180" y="0" width="2" height="40" fill="currentColor" />
                <rect x="185" y="0" width="1" height="40" fill="currentColor" />
                <rect x="189" y="0" width="5" height="40" fill="currentColor" />
                <rect x="197" y="0" width="2" height="40" fill="currentColor" />
                <rect x="202" y="0" width="3" height="40" fill="currentColor" />
                <rect x="208" y="0" width="1" height="40" fill="currentColor" />
                <rect x="212" y="0" width="4" height="40" fill="currentColor" />
                <rect x="219" y="0" width="2" height="40" fill="currentColor" />
                <rect x="224" y="0" width="3" height="40" fill="currentColor" />
                <rect x="230" y="0" width="2" height="40" fill="currentColor" />
                <rect x="235" y="0" width="3" height="40" fill="currentColor" />
              </svg>
              <div className="text-[10px] tracking-widest">{trackingCode}</div>
            </div>

            {/* Origin & Destination */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 border-b border-dashed border-current/30 text-xs">
              <div className="space-y-1">
                <div className="text-[10px] opacity-60 uppercase font-bold">
                  [01] {t.lang === "uz" ? "YUBORUVCHI (ORIGIN)" : t.lang === "en" ? "SENDER (ORIGIN)" : "ОТПРАВИТЕЛЬ (ORIGIN)"}
                </div>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="w-full bg-transparent border-b border-current/30 pb-0.5 font-bold focus:outline-none"
                />
                <input
                  type="text"
                  value={originCity}
                  onChange={(e) => setOriginCity(e.target.value)}
                  className="w-full bg-transparent border-b border-current/30 pb-0.5 opacity-70 focus:outline-none text-[11px]"
                />
              </div>

              <div className="space-y-1">
                <div className="text-[10px] opacity-60 uppercase font-bold">
                  [02] {t.lang === "uz" ? "QABUL QILUVCHI (DESTINATION)" : t.lang === "en" ? "RECIPIENT (DESTINATION)" : "ПОЛУЧАТЕЛЬ (DESTINATION)"}
                </div>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className="w-full bg-transparent border-b border-current/30 pb-0.5 font-bold focus:outline-none"
                />
                <input
                  type="text"
                  value={destCity}
                  onChange={(e) => setDestCity(e.target.value)}
                  className="w-full bg-transparent border-b border-current/30 pb-0.5 opacity-70 focus:outline-none text-[11px]"
                />
              </div>
            </div>

            {/* Specs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 py-3 border-b border-dashed border-current/30 text-center text-xs">
              <div>
                <div className="text-[10px] opacity-60">
                  {t.lang === "uz" ? "VAZN" : t.lang === "en" ? "WEIGHT" : "ВЕС"}
                </div>
                <div className="font-bold">{weightKg} {t.lang === "uz" ? "KG" : t.lang === "en" ? "KG" : "КГ"}</div>
              </div>
              <div>
                <div className="text-[10px] opacity-60">
                  {t.lang === "uz" ? "TOIFA" : t.lang === "en" ? "CLASS" : "КЛАСС"}
                </div>
                <div className="font-bold text-orange-500">EXPEDITED</div>
              </div>
              <div>
                <div className="text-[10px] opacity-60">
                  {t.lang === "uz" ? "QIYMAT" : t.lang === "en" ? "VALUE" : "ОЦЕНКА"}
                </div>
                <div className="font-bold">$2,500.00</div>
              </div>
              <div>
                <div className="text-[10px] opacity-60">
                  {t.lang === "uz" ? "PLOMBA" : t.lang === "en" ? "SEAL" : "ПЛОМБА"}
                </div>
                <div className="font-bold text-emerald-500">OK</div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-[10px] opacity-60">
                {t.lang === "uz"
                  ? "AETHER LOGISTIKA TIZIMI • 100% BUTUNLIK KAFOLATI"
                  : t.lang === "en"
                  ? "AETHER LOGISTICS ENGINE • 100% CUSTODY GUARANTEE"
                  : "AETHER LOGISTICS ENGINE • 100% ГАРАНТИЯ СОХРАННОСТИ"}
              </div>

              <button
                onClick={handleBookWithWaybill}
                className="gradient-btn px-5 py-2 text-xs font-bold text-white flex items-center gap-1.5"
              >
                <span>{t.waybillBookBtn}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
