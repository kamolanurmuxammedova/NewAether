"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useOrderStore } from "@/store/use-order-store";
import { DeliveryMap } from "@/components/map/DeliveryMap";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Coordinates } from "@/types";
import { useTranslation } from "@/lib/i18n";
import {
  Zap,
  Phone,
  MessageSquare,
  Star,
  FileDown,
  RotateCcw,
  AlertTriangle,
  Send,
} from "lucide-react";

function TrackOrderContent() {
  const router = useRouter();
  const t = useTranslation();
  const searchParams = useSearchParams();
  const orderNumParam = searchParams.get("order");

  const { orders, activeOrderId, cancelOrder, updateCourierPosition } = useOrderStore();

  const currentOrder =
    orders.find((o) => o.orderNumber === orderNumParam || o.id === activeOrderId) ||
    orders[0];

  const [activeTab, setActiveTab] = useState<"MAP" | "CHAT" | "INVOICE">("MAP");
  const [courierPos, setCourierPos] = useState<Coordinates>(
    currentOrder?.liveCourierCoords || { lat: 40.7674, lng: -73.9682 }
  );

  // Modal states
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const [ratingVal, setRatingVal] = useState(5);
  const [tipVal, setTipVal] = useState(10);
  const [chatMessages, setChatMessages] = useState([
    {
      sender: "courier",
      text:
        t.lang === "uz"
          ? "Assalomu alaykum! Yukingizni oldim, termoboksga joyladim va yashil koridor bo'ylab harakatlanmoqdaman."
          : t.lang === "en"
          ? "Hello! I've picked up your cargo, secured it in the thermal pod, and am moving along the green corridor."
          : "Здравствуйте! Забрал ваш груз, поместил в защитный термобокс и двигаюсь по зеленому коридору.",
      time: "4м назад",
    },
  ]);
  const [newMsg, setNewMsg] = useState("");

  // Live courier movement simulation
  useEffect(() => {
    if (!currentOrder || currentOrder.status === "DELIVERED" || currentOrder.status === "CANCELLED") return;

    const interval = setInterval(() => {
      setCourierPos((prev) => {
        const dest = currentOrder.dropoffCoords;
        const deltaLat = (dest.lat - prev.lat) * 0.04;
        const deltaLng = (dest.lng - prev.lng) * 0.04;
        const newCoords = {
          lat: prev.lat + deltaLat,
          lng: prev.lng + deltaLng,
        };
        updateCourierPosition(currentOrder.id, newCoords);
        return newCoords;
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [currentOrder, updateCourierPosition]);

  if (!currentOrder) {
    return (
      <div className="py-20 text-center min-h-[60vh] flex flex-col items-center justify-center font-mono">
        <h2 className="text-2xl font-bold text-white mb-2">
          {t.lang === "uz" ? "Faol telemetriya topilmadi" : t.lang === "en" ? "No active telemetry found" : "Активная телеметрия не найдена"}
        </h2>
        <p className="text-sm text-zinc-400 mb-6 font-sans">
          {t.lang === "uz" ? "Sun'iy yo'ldosh orqali kuzatish uchun buyurtma bering." : t.lang === "en" ? "Place an order to track via satellite." : "Оформите заказ, чтобы отслеживать движение со спутника."}
        </p>
        <button
          onClick={() => router.push("/book")}
          className="gradient-btn px-6 py-3 rounded-2xl text-xs font-bold text-white"
        >
          {t.heroOrderBtn}
        </button>
      </div>
    );
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMsg.trim()) return;
    setChatMessages((msgs) => [
      ...msgs,
      { sender: "user", text: newMsg, time: "Только что" },
    ]);
    setNewMsg("");

    setTimeout(() => {
      setChatMessages((msgs) => [
        ...msgs,
        {
          sender: "courier",
          text:
            t.lang === "uz"
              ? "Tushundim! Kirish eshigi oldiga yetib kelmoqdaman."
              : t.lang === "en"
              ? "Understood! Arriving at the main entrance."
              : "Вас понял! Подъезжаю ко входу.",
          time: "Только что",
        },
      ]);
    }, 1500);
  };

  const handleConfirmCancel = () => {
    cancelOrder(currentOrder.id);
    setIsCancelOpen(false);
  };

  const statusSteps = [
    { label: t.lang === "uz" ? "Qabul qilindi" : t.lang === "en" ? "Accepted" : "Принят", status: "ACCEPTED" },
    { label: t.lang === "uz" ? "Biriktirildi" : t.lang === "en" ? "Assigned" : "Назначен", status: "COURIER_ASSIGNED" },
    { label: t.lang === "uz" ? "Yuk olindi" : t.lang === "en" ? "Picked Up" : "Груз получен", status: "PICKING_UP" },
    { label: t.lang === "uz" ? "Yo'lda" : t.lang === "en" ? "In Transit" : "В пути", status: "IN_TRANSIT" },
    { label: t.lang === "uz" ? "Yetkazildi" : t.lang === "en" ? "Delivered" : "Доставлен", status: "ARRIVED" },
  ];

  return (
    <div className="py-8 bg-[#09090B] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-[#111217] border border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold text-sm">
              <Zap className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-white font-mono">{currentOrder.orderNumber}</h1>
                <span className="text-[10px] font-mono uppercase bg-emerald-500/10 text-emerald-400 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                  {currentOrder.status}
                </span>
              </div>
              <p className="text-xs text-zinc-400">
                {currentOrder.category} • {formatDate(currentOrder.createdAt)}
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("MAP")}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors ${
                activeTab === "MAP"
                  ? "bg-orange-600 text-white"
                  : "bg-white/[0.04] text-zinc-400 hover:text-white"
              }`}
            >
              {t.trackTabMap}
            </button>
            <button
              onClick={() => setActiveTab("CHAT")}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                activeTab === "CHAT"
                  ? "bg-orange-600 text-white"
                  : "bg-white/[0.04] text-zinc-400 hover:text-white"
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" /> {t.trackTabChat}
            </button>
            <button
              onClick={() => setActiveTab("INVOICE")}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                activeTab === "INVOICE"
                  ? "bg-orange-600 text-white"
                  : "bg-white/[0.04] text-zinc-400 hover:text-white"
              }`}
            >
              <FileDown className="w-3.5 h-3.5" /> {t.trackTabInvoice}
            </button>
          </div>
        </div>

        {/* Status Stepper Progression */}
        <div className="p-6 rounded-3xl bg-[#111217] border border-white/10">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            {statusSteps.map((s, idx) => (
              <div key={idx} className="flex flex-col items-center flex-1">
                <div className="flex items-center w-full">
                  <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center text-xs font-bold font-mono">
                    ✓
                  </div>
                  {idx < statusSteps.length - 1 && (
                    <div className="h-0.5 flex-1 mx-2 bg-emerald-500/40 rounded-full" />
                  )}
                </div>
                <span className="text-[10px] sm:text-xs text-white font-medium mt-1 text-center">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Grid View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Main Panel: Map or Chat or Invoice */}
          <div className="lg:col-span-8 space-y-6">
            {activeTab === "MAP" && (
              <div className="space-y-4">
                <DeliveryMap
                  pickup={currentOrder.pickupCoords}
                  dropoff={currentOrder.dropoffCoords}
                  courierPos={courierPos}
                  courierName={currentOrder.courier?.name || "Маркус Стерлинг"}
                  vehiclePlate={currentOrder.courier?.vehiclePlate || "NY-AE901"}
                  eta={currentOrder.eta}
                  distanceKm={currentOrder.distanceKm}
                  className="h-[520px] w-full"
                />

                {/* Corridor Status Strip */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-4 rounded-2xl bg-[#111217] border border-white/5 text-center">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase block">{t.trackSpeed}</span>
                    <span className="text-base font-bold text-white font-mono">38.4 {t.lang === "uz" ? "km/s" : t.lang === "en" ? "km/h" : "км/ч"}</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#111217] border border-white/5 text-center">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase block">
                      {t.lang === "uz" ? "Yashil koridor" : t.lang === "en" ? "Green Corridor" : "Зеленый коридор"}
                    </span>
                    <span className="text-base font-bold text-emerald-400 font-mono">
                      {t.lang === "uz" ? "Erkin" : t.lang === "en" ? "Clear" : "Свободен"}
                    </span>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#111217] border border-white/5 text-center">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase block">
                      {t.lang === "uz" ? "Boks holati" : t.lang === "en" ? "Pod Seal" : "Пломба бокса"}
                    </span>
                    <span className="text-base font-bold text-orange-400 font-mono">
                      {t.lang === "uz" ? "Muhrlangan 100%" : t.lang === "en" ? "100% Sealed" : "Опломбирован 100%"}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "CHAT" && (
              <div className="p-6 rounded-3xl bg-[#111217] border border-white/10 h-[520px] flex flex-col justify-between">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-xs">
                      {currentOrder.courier?.name.charAt(0) || "М"}
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-white">
                        {currentOrder.courier?.name || "Маркус Стерлинг"}
                      </h3>
                      <p className="text-[10px] text-emerald-400 font-mono">На маршруте • Свободные руки</p>
                    </div>
                  </div>
                  <span className="text-xs text-zinc-500 font-mono">Сквозное шифрование</span>
                </div>

                <div className="flex-1 overflow-y-auto py-4 space-y-3">
                  {chatMessages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex flex-col ${
                        msg.sender === "user" ? "items-end" : "items-start"
                      }`}
                    >
                      <div
                        className={`max-w-[75%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                          msg.sender === "user"
                            ? "bg-purple-600 text-white rounded-tr-none"
                            : "bg-white/[0.05] text-zinc-200 rounded-tl-none border border-white/10"
                        }`}
                      >
                        {msg.text}
                      </div>
                      <span className="text-[10px] text-zinc-500 mt-1 px-1">{msg.time}</span>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendMessage} className="pt-3 border-t border-white/10 flex gap-2">
                  <input
                    type="text"
                    value={newMsg}
                    onChange={(e) => setNewMsg(e.target.value)}
                    placeholder="Написать курьеру..."
                    className="flex-1 glass-input rounded-2xl px-4 py-2.5 text-xs text-white"
                  />
                  <button
                    type="submit"
                    aria-label="Отправить"
                    className="gradient-btn px-4 py-2.5 rounded-2xl text-white text-xs font-bold flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            )}

            {activeTab === "INVOICE" && (
              <div className="p-8 rounded-3xl bg-[#111217] border border-white/10 space-y-6">
                <div className="flex items-center justify-between pb-6 border-b border-white/10">
                  <div>
                    <h2 className="text-xl font-bold text-white">Криптографическая накладная</h2>
                    <p className="text-xs text-zinc-400 font-mono">Манифест #{currentOrder.orderNumber}</p>
                  </div>
                  <button
                    onClick={() => alert("Загрузка PDF-накладной...")}
                    className="gradient-btn px-4 py-2 rounded-xl text-xs font-bold text-white flex items-center gap-1.5"
                  >
                    <FileDown className="w-3.5 h-3.5" /> Скачать PDF
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-6 text-xs">
                  <div>
                    <span className="text-zinc-500 uppercase tracking-wider block font-mono text-[10px]">
                      Отправитель
                    </span>
                    <p className="font-semibold text-white mt-1">{currentOrder.pickupContactName}</p>
                    <p className="text-zinc-400">{currentOrder.pickupAddress}</p>
                  </div>
                  <div>
                    <span className="text-zinc-500 uppercase tracking-wider block font-mono text-[10px]">
                      Получатель
                    </span>
                    <p className="font-semibold text-white mt-1">{currentOrder.dropoffContactName}</p>
                    <p className="text-zinc-400">{currentOrder.dropoffAddress}</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2 text-xs font-mono">
                  <div className="flex justify-between text-zinc-400">
                    <span>Базовый тариф</span>
                    <span className="text-white">${currentOrder.priceSubtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Страховое покрытие ({currentOrder.insuranceTier})</span>
                    <span className="text-indigo-400">${currentOrder.priceInsurance.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-white font-bold pt-2 border-t border-white/10">
                    <span>Итого списано</span>
                    <span className="text-emerald-400">${currentOrder.priceTotal.toFixed(2)} USD</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar: Handover PIN & Courier Controls */}
          <div className="lg:col-span-4 space-y-6">
            {/* Handover Dynamic PIN Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-tr from-purple-900/30 via-[#111217] to-indigo-900/20 border border-purple-500/30 shadow-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-300">
                  Биометрический PIN передачи
                </span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  Активен
                </span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Назовите этот 4-значный код курьеру для открытия электронного замка термобокса.
              </p>
              <div className="py-3 text-center rounded-2xl bg-black/60 border border-white/10 font-mono text-3xl font-extrabold text-white tracking-widest">
                8 4 9 2
              </div>
            </div>

            {/* Courier Profile Info */}
            <div className="p-6 rounded-3xl bg-[#111217] border border-white/10 space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                  {currentOrder.courier?.name.charAt(0) || "М"}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">
                    {currentOrder.courier?.name || "Маркус Стерлинг"}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-zinc-400 mt-0.5">
                    <span className="flex items-center text-amber-400">
                      ★ {currentOrder.courier?.rating || 4.99}
                    </span>
                    <span>•</span>
                    <span className="font-mono">{currentOrder.courier?.completedJobs || 1840} поездок</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-zinc-400">
                  <span>Транспорт</span>
                  <span className="text-white font-medium">
                    {currentOrder.courier?.vehicleName || "Aether Cyber-Rider X"}
                  </span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Номерной знак</span>
                  <span className="text-indigo-400 font-mono">
                    {currentOrder.courier?.vehiclePlate || "NY-AE901"}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5">
                <a
                  href="tel:+19175558831"
                  className="px-3 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-xs font-semibold text-white flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400" /> {t.trackCallCourier}
                </a>
                <button
                  onClick={() => setIsRatingOpen(true)}
                  className="px-3 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-xs font-semibold text-white flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Star className="w-3.5 h-3.5 text-amber-400" /> {t.trackRateOrder}
                </button>
              </div>
            </div>

            {/* Order Controls */}
            <div className="p-5 rounded-3xl bg-[#111217] border border-white/10 space-y-3">
              <button
                onClick={() => router.push("/book")}
                className="w-full gradient-btn py-3 rounded-2xl text-xs font-bold text-white flex items-center justify-center gap-2 shadow-lg"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                {t.lang === "uz" ? "Yetkazishni takrorlash" : t.lang === "en" ? "Repeat this dispatch" : "Повторить эту доставку"}
              </button>

              {currentOrder.status !== "CANCELLED" && currentOrder.status !== "DELIVERED" && (
                <button
                  onClick={() => setIsCancelOpen(true)}
                  className="w-full py-2.5 rounded-2xl bg-red-500/10 hover:bg-red-500/20 text-xs font-semibold text-red-400 border border-red-500/20 transition-colors"
                >
                  {t.trackCancelOrder}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Cancel Confirmation Modal */}
      {isCancelOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md p-6 rounded-3xl bg-[#111217] border border-white/10 text-white space-y-4">
            <div className="flex items-center gap-3 text-red-400">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-base font-bold text-white">Отменить доставку?</h3>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Курьер уже находится в пути по зеленому коридору. Отмена вернет зарезервированный слот в общий пул.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setIsCancelOpen(false)}
                className="px-4 py-2 rounded-xl text-xs bg-white/5 text-zinc-300 hover:text-white"
              >
                Оставить активным
              </button>
              <button
                onClick={handleConfirmCancel}
                className="px-4 py-2 rounded-xl text-xs bg-red-600 hover:bg-red-500 font-bold text-white"
              >
                Подтвердить отмену
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Rate Courier Modal */}
      {isRatingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md p-6 rounded-3xl bg-[#111217] border border-white/10 text-white space-y-5">
            <h3 className="text-base font-bold">Оценить работу курьера</h3>
            <p className="text-xs text-zinc-400">
              Ваш отзыв напрямую влияет на рейтинг курьера и назначение на скоростные линии.
            </p>

            <div className="flex justify-center gap-2 py-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRatingVal(star)}
                  className="p-1 hover:scale-125 transition-transform"
                >
                  <Star
                    className={`w-7 h-7 ${
                      star <= ratingVal
                        ? "fill-amber-400 text-amber-400"
                        : "text-zinc-600"
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Tip Selection */}
            <div>
              <span className="text-xs text-zinc-400 block mb-2 font-semibold">
                Добавить чаевые (100% курьеру)
              </span>
              <div className="grid grid-cols-4 gap-2">
                {[5, 10, 20, 50].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setTipVal(amt)}
                    className={`py-2 rounded-xl text-xs font-mono font-bold border transition-colors ${
                      tipVal === amt
                        ? "bg-purple-600 border-purple-500 text-white"
                        : "bg-white/5 border-white/10 text-zinc-300"
                    }`}
                  >
                    +${amt}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setIsRatingOpen(false)}
                className="px-4 py-2 rounded-xl text-xs bg-white/5 text-zinc-300 hover:text-white"
              >
                Закрыть
              </button>
              <button
                onClick={() => {
                  alert(`Спасибо! Оценка ${ratingVal} звезд и чаевые $${tipVal} отправлены.`);
                  setIsRatingOpen(false);
                }}
                className="gradient-btn px-5 py-2 rounded-xl text-xs font-bold text-white"
              >
                Отправить отзыв
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-[#09090B] flex items-center justify-center text-zinc-400">
          Загрузка спутниковой телеметрии...
        </div>
      }
    >
      <TrackOrderContent />
    </React.Suspense>
  );
}
