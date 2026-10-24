"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useUserStore } from "@/store/use-user-store";
import { useOrderStore } from "@/store/use-order-store";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  Wallet,
  MapPin,
  Ticket,
  Shield,
  Headphones,
  Plus,
  ArrowRight,
  Copy,
  Laptop,
  Smartphone,
  Sparkles,
  Zap,
  Trash2,
} from "lucide-react";

export default function UserDashboardPage() {
  const {
    user,
    walletBalance,
    transactions,
    addresses,
    topUpWallet,
    addAddress,
    removeAddress,
    setDefaultAddress,
  } = useUserStore();

  const { orders } = useOrderStore();

  const [activeTab, setActiveTab] = useState<
    "overview" | "deliveries" | "wallet" | "addresses" | "coupons" | "security" | "support"
  >("overview");

  // New Address modal state
  const [isAddAddrOpen, setIsAddAddrOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newApt, setNewApt] = useState("");

  // Top Up modal state
  const [isTopUpOpen, setIsTopUpOpen] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState(250);

  // Support chat state
  const [supportMsgs, setSupportMsgs] = useState([
    {
      sender: "ai",
      text: "Добро пожаловать в персональный консьерж-сервис AETHER Obsidian. Чем я могу помочь по вашим отправлениям сегодня?",
      time: "Только что",
    },
  ]);
  const [supportInput, setSupportInput] = useState("");

  const handleSupportSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportInput.trim()) return;
    const txt = supportInput;
    setSupportMsgs((m) => [...m, { sender: "user", text: txt, time: "Только что" }]);
    setSupportInput("");

    setTimeout(() => {
      setSupportMsgs((m) => [
        ...m,
        {
          sender: "ai",
          text: `Я проверил дорожную обстановку для вашего сектора. Все зеленые коридоры свободны, ориентировочное время подачи курьера менее 12 минут. Подготовить транспорт?`,
          time: "Только что",
        },
      ]);
    }, 1200);
  };

  const handleAddAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newAddress) return;
    addAddress({
      title: newTitle,
      fullAddress: newAddress,
      coords: { lat: 40.758, lng: -73.985 },
      apartment: newApt,
      isDefault: false,
    });
    setNewTitle("");
    setNewAddress("");
    setNewApt("");
    setIsAddAddrOpen(false);
  };

  const activeOrders = orders.filter(
    (o) => o.status !== "DELIVERED" && o.status !== "CANCELLED"
  );

  return (
    <div className="py-8 bg-[#09090B] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* User Hero Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#14151D] via-[#101116] to-[#171822] border border-white/10 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white font-extrabold text-2xl shadow-xl shadow-purple-600/30">
              {user.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-white">{user.name}</h1>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> {user.tier}
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-1 font-mono">{user.email} • ID: {user.id}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 relative z-10">
            <button
              onClick={() => setIsTopUpOpen(true)}
              className="gradient-btn px-5 py-2.5 rounded-2xl text-xs font-bold text-white flex items-center gap-2 shadow-lg"
            >
              <Wallet className="w-4 h-4" />
              <span>Пополнить сейф</span>
            </button>
            <Link
              href="/book"
              className="px-5 py-2.5 rounded-2xl text-xs font-bold text-white bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 transition-colors flex items-center gap-2"
            >
              <Zap className="w-4 h-4 text-indigo-400" />
              <span>Новый вызов</span>
            </Link>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-white/10 scrollbar-none">
          {[
            { id: "overview", label: "Обзор", icon: LayoutDashboard },
            { id: "deliveries", label: "Доставки", icon: Package, badge: activeOrders.length },
            { id: "wallet", label: "Цифровой сейф", icon: Wallet },
            { id: "addresses", label: "Адреса", icon: MapPin },
            { id: "coupons", label: "Промокоды", icon: Ticket },
            { id: "security", label: "Безопасность", icon: Shield },
            { id: "support", label: "Консьерж 24/7", icon: Headphones },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-purple-600/30 border border-purple-500/40 text-white shadow-md shadow-purple-600/20"
                    : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className="w-4 h-4 rounded-full bg-indigo-500 text-white text-[9px] flex items-center justify-center font-bold">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Quick Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-6 rounded-3xl bg-[#111217] border border-white/5 space-y-2">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">
                  Баланс сейфа
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                  {formatCurrency(walletBalance)}
                </div>
                <span className="text-[11px] text-emerald-400 font-mono block">Автопополнение активно</span>
              </div>

              <div className="p-6 rounded-3xl bg-[#111217] border border-white/5 space-y-2">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">
                  Всего доставок
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                  {orders.length}
                </div>
                <span className="text-[11px] text-zinc-400 block">100% доставлено вовремя</span>
              </div>

              <div className="p-6 rounded-3xl bg-[#111217] border border-white/5 space-y-2">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">
                  Сэкономлено CO2
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">
                  84.2 кг
                </div>
                <span className="text-[11px] text-zinc-500 block">100% электротранспорт</span>
              </div>

              <div className="p-6 rounded-3xl bg-[#111217] border border-white/5 space-y-2">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">
                  Рейтинг защиты
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold text-purple-400 font-mono">
                  Tier-1 VIP
                </div>
                <span className="text-[11px] text-zinc-500 block">Биометрический замок</span>
              </div>
            </div>

            {/* Active Deliveries Radar Box */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <h2 className="text-base font-bold text-white uppercase tracking-wider">
                    Активные коридоры ({activeOrders.length})
                  </h2>
                </div>
                <Link
                  href="/book"
                  className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
                >
                  Заказать еще <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {activeOrders.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeOrders.map((ord) => (
                    <div
                      key={ord.id}
                      className="p-6 rounded-3xl bg-[#111217] border border-purple-500/30 shadow-xl space-y-4 relative overflow-hidden"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-white">{ord.orderNumber}</span>
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                          {ord.status}
                        </span>
                      </div>

                      <div className="space-y-1.5 text-xs">
                        <div className="text-zinc-400 truncate">
                          <span className="text-zinc-500 font-mono text-[10px]">КУДА: </span>
                          {ord.dropoffAddress}
                        </div>
                        <div className="flex items-center gap-4 text-[11px] text-zinc-500 font-mono">
                          <span>Время: {ord.eta}</span>
                          <span>•</span>
                          <span>Курьер: {ord.courier?.name || "Назначен"}</span>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                        <span className="text-sm font-bold text-white font-mono">
                          {formatCurrency(ord.priceTotal)}
                        </span>
                        <Link
                          href={`/track?order=${ord.orderNumber}`}
                          className="gradient-btn px-4 py-1.5 rounded-xl text-xs font-bold text-white flex items-center gap-1.5"
                        >
                          <span>Телеметрия</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 rounded-3xl bg-[#111217] border border-white/5 text-center space-y-3">
                  <p className="text-xs text-zinc-400">В данный момент нет активных доставок.</p>
                  <Link
                    href="/book"
                    className="gradient-btn inline-flex px-5 py-2.5 rounded-xl text-xs font-bold text-white"
                  >
                    Оформить доставку
                  </Link>
                </div>
              )}
            </div>

            {/* Recent Past Deliveries */}
            <div className="space-y-4">
              <h2 className="text-base font-bold text-white uppercase tracking-wider">
                Завершенные отправления
              </h2>
              <div className="rounded-3xl bg-[#111217] border border-white/5 overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-white/[0.02] border-b border-white/5 text-zinc-500 font-mono uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-4">Заказ #</th>
                      <th className="p-4">Категория</th>
                      <th className="p-4">Назначение</th>
                      <th className="p-4">Дата</th>
                      <th className="p-4">Стоимость</th>
                      <th className="p-4 text-right">Действия</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-zinc-300">
                    {orders.slice(0, 5).map((ord) => (
                      <tr key={ord.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="p-4 font-mono font-bold text-white">{ord.orderNumber}</td>
                        <td className="p-4">{ord.category}</td>
                        <td className="p-4 truncate max-w-xs">{ord.dropoffAddress}</td>
                        <td className="p-4 text-zinc-500 font-mono">{formatDate(ord.createdAt)}</td>
                        <td className="p-4 font-mono font-semibold text-white">
                          {formatCurrency(ord.priceTotal)}
                        </td>
                        <td className="p-4 text-right">
                          <Link
                            href={`/track?order=${ord.orderNumber}`}
                            className="text-xs text-indigo-400 hover:text-white font-medium mr-3"
                          >
                            Подробнее
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DELIVERIES */}
        {activeTab === "deliveries" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Все грузовые отправления</h2>
              <Link
                href="/book"
                className="gradient-btn px-4 py-2 rounded-xl text-xs font-bold text-white flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" /> Оформить доставку
              </Link>
            </div>

            <div className="space-y-3">
              {orders.map((ord) => (
                <div
                  key={ord.id}
                  className="p-6 rounded-3xl bg-[#111217] border border-white/5 hover:border-white/10 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-white text-sm">{ord.orderNumber}</span>
                      <span className="text-[10px] font-mono uppercase bg-white/5 text-zinc-300 px-2 py-0.5 rounded-full border border-white/10">
                        {ord.category}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                        {ord.status}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400">
                      {ord.pickupAddress} ➔ {ord.dropoffAddress}
                    </p>
                    <p className="text-[11px] text-zinc-500 font-mono">
                      {formatDate(ord.createdAt)} • Тариф: {ord.speedTier}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 self-end md:self-auto">
                    <span className="text-base font-extrabold text-white font-mono">
                      {formatCurrency(ord.priceTotal)}
                    </span>
                    <Link
                      href={`/track?order=${ord.orderNumber}`}
                      className="gradient-btn px-4 py-2 rounded-xl text-xs font-bold text-white"
                    >
                      Отследить
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: DIGITAL VAULT / WALLET */}
        {activeTab === "wallet" && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="p-8 rounded-3xl bg-gradient-to-tr from-purple-900/40 via-[#111217] to-indigo-900/30 border border-purple-500/30 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-purple-300 block mb-1">
                  Цифровой сейф Aether Obsidian Vault
                </span>
                <div className="text-3xl sm:text-5xl font-black text-white font-mono">
                  {formatCurrency(walletBalance)}
                </div>
                <p className="text-xs text-zinc-400 mt-2">
                  Без комиссий, мгновенная оплата в 1 касание и 20% кэшбэк на логистику.
                </p>
              </div>

              <button
                onClick={() => setIsTopUpOpen(true)}
                className="gradient-btn px-6 py-3.5 rounded-2xl text-xs font-bold text-white flex items-center gap-2 shadow-lg self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" /> Пополнить баланс
              </button>
            </div>

            {/* Transaction Log */}
            <div className="space-y-4">
              <h3 className="text-base font-bold text-white uppercase tracking-wider">
                История операций сейфа
              </h3>
              <div className="rounded-3xl bg-[#111217] border border-white/5 overflow-hidden">
                <div className="divide-y divide-white/5">
                  {transactions.map((tx) => (
                    <div key={tx.id} className="p-4 sm:p-5 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${
                            tx.amount > 0
                              ? "bg-emerald-500/20 text-emerald-400"
                              : "bg-purple-500/20 text-purple-400"
                          }`}
                        >
                          {tx.amount > 0 ? "+" : "−"}
                        </div>
                        <div>
                          <div className="font-semibold text-white">{tx.description}</div>
                          <div className="text-[10px] text-zinc-500 font-mono">{tx.timestamp}</div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div
                          className={`font-mono font-bold text-sm ${
                            tx.amount > 0 ? "text-emerald-400" : "text-white"
                          }`}
                        >
                          {tx.amount > 0 ? `+${formatCurrency(tx.amount)}` : formatCurrency(tx.amount)}
                        </div>
                        <span className="text-[10px] font-mono text-zinc-500 uppercase">
                          {tx.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: SAVED LOCATIONS */}
        {activeTab === "addresses" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">Сохраненные хабы и резиденции</h2>
                <p className="text-xs text-zinc-400">Проверенные GPS-локации с допуском консьержа</p>
              </div>
              <button
                onClick={() => setIsAddAddrOpen(true)}
                className="gradient-btn px-4 py-2.5 rounded-2xl text-xs font-bold text-white flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Добавить адрес
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {addresses.map((addr) => (
                <div
                  key={addr.id}
                  className="p-6 rounded-3xl bg-[#111217] border border-white/5 hover:border-purple-500/30 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-white">{addr.title}</span>
                      {addr.isDefault && (
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                          Основной
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">{addr.fullAddress}</p>
                    {addr.apartment && (
                      <p className="text-[11px] text-zinc-500 font-mono">Квартира/Офис: {addr.apartment}</p>
                    )}
                  </div>

                  <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-xs">
                    {!addr.isDefault && (
                      <button
                        onClick={() => setDefaultAddress(addr.id)}
                        className="text-zinc-400 hover:text-white text-[11px]"
                      >
                        Сделать основным
                      </button>
                    )}
                    <button
                      onClick={() => removeAddress(addr.id)}
                      className="text-red-400 hover:text-red-300 text-[11px] flex items-center gap-1 ml-auto"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Удалить
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: COUPONS */}
        {activeTab === "coupons" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <h2 className="text-xl font-bold text-white">Привилегии резидента и промокоды</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  code: "OBSIDIAN50",
                  discount: "$50 Бонус",
                  desc: "Применяется к следующей гиперскоростной доставке.",
                  valid: "Действует до конца года",
                },
                {
                  code: "GREENWAVE",
                  discount: "100% Эко-компенсация",
                  desc: "Бесплатная компенсация углеродного следа на всех рейсах.",
                  valid: "Без ограничений",
                },
                {
                  code: "COVERFREE",
                  discount: "Страховка $25k в подарок",
                  desc: "Бесплатное страховое покрытие Lloyd's of London.",
                  valid: "Привилегия резидента",
                },
              ].map((c) => (
                <div
                  key={c.code}
                  className="p-6 rounded-3xl bg-[#111217] border border-white/5 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm font-bold text-purple-400">{c.code}</span>
                    <button
                      onClick={() => alert(`Код ${c.code} скопирован`)}
                      className="p-1 rounded-lg hover:bg-white/10 text-zinc-400"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div>
                    <div className="text-base font-bold text-white">{c.discount}</div>
                    <div className="text-xs text-zinc-400 mt-1">{c.desc}</div>
                  </div>
                  <div className="text-[10px] font-mono text-zinc-500 pt-2 border-t border-white/5">
                    {c.valid}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: SECURITY & DEVICES */}
        {activeTab === "security" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <h2 className="text-xl font-bold text-white">Безопасность и активные сессии</h2>
            <div className="space-y-4">
              <div className="p-6 rounded-3xl bg-[#111217] border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Laptop className="w-8 h-8 text-indigo-400" />
                  <div>
                    <div className="text-sm font-bold text-white">MacBook Pro 16&quot; (Apple Silicon)</div>
                    <div className="text-xs text-zinc-400">Нью-Йорк, США • Текущая активная сессия</div>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                  Это устройство
                </span>
              </div>

              <div className="p-6 rounded-3xl bg-[#111217] border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Smartphone className="w-8 h-8 text-purple-400" />
                  <div>
                    <div className="text-sm font-bold text-white">iPhone 16 Pro Max</div>
                    <div className="text-xs text-zinc-400">Нью-Йорк, США • Активность 12м назад</div>
                  </div>
                </div>
                <button
                  onClick={() => alert("Сессия завершена")}
                  className="text-xs text-red-400 hover:text-red-300"
                >
                  Отозвать
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: SUPPORT LIVE CHAT */}
        {activeTab === "support" && (
          <div className="p-6 sm:p-8 rounded-3xl bg-[#111217] border border-white/10 h-[560px] flex flex-col justify-between animate-in fade-in duration-300">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white">
                  <Headphones className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">AETHER Консьерж Obsidian</h3>
                  <p className="text-[10px] text-emerald-400 font-mono">Выделенный дежурный офицер 24/7</p>
                </div>
              </div>
              <span className="text-xs font-mono text-zinc-500">Ср. ответ: &lt; 15 сек</span>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-3">
              {supportMsgs.map((m, i) => (
                <div
                  key={i}
                  className={`flex flex-col ${
                    m.sender === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-4 rounded-2xl text-xs leading-relaxed ${
                      m.sender === "user"
                        ? "bg-purple-600 text-white rounded-tr-none"
                        : "bg-white/[0.04] text-zinc-200 rounded-tl-none border border-white/10"
                    }`}
                  >
                    {m.text}
                  </div>
                  <span className="text-[10px] text-zinc-500 mt-1 px-1">{m.time}</span>
                </div>
              ))}
            </div>

            <form onSubmit={handleSupportSend} className="pt-3 border-t border-white/10 flex gap-2">
              <input
                type="text"
                value={supportInput}
                onChange={(e) => setSupportInput(e.target.value)}
                placeholder="Спросите консьержа о зеленом коридоре, VIP-флоте или счетах..."
                className="flex-1 glass-input rounded-2xl px-4 py-3 text-xs text-white"
              />
              <button
                type="submit"
                className="gradient-btn px-6 py-3 rounded-2xl text-xs font-bold text-white flex items-center gap-1.5"
              >
                Отправить
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Top Up Modal */}
      {isTopUpOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md p-6 rounded-3xl bg-[#111217] border border-white/10 text-white space-y-5">
            <h3 className="text-base font-bold">Пополнить сейф Aether</h3>
            <p className="text-xs text-zinc-400">
              Выберите сумму для мгновенного зачисления через Stripe Platinum или Apple Pay.
            </p>

            <div className="grid grid-cols-4 gap-2">
              {[100, 250, 500, 1000].map((amt) => (
                <button
                  key={amt}
                  onClick={() => setTopUpAmount(amt)}
                  className={`py-3 rounded-2xl text-xs font-mono font-bold border transition-colors ${
                    topUpAmount === amt
                      ? "bg-purple-600 border-purple-500 text-white"
                      : "bg-white/5 border-white/10 text-zinc-300"
                  }`}
                >
                  ${amt}
                </button>
              ))}
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setIsTopUpOpen(false)}
                className="px-4 py-2 rounded-xl text-xs bg-white/5 text-zinc-300 hover:text-white"
              >
                Отмена
              </button>
              <button
                onClick={() => {
                  topUpWallet(topUpAmount);
                  setIsTopUpOpen(false);
                }}
                className="gradient-btn px-5 py-2.5 rounded-xl text-xs font-bold text-white"
              >
                Внести ${topUpAmount}.00
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Address Modal */}
      {isAddAddrOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80 backdrop-blur-md">
          <form
            onSubmit={handleAddAddressSubmit}
            className="w-full max-w-md p-6 rounded-3xl bg-[#111217] border border-white/10 text-white space-y-4"
          >
            <h3 className="text-base font-bold">Добавить проверенный адрес</h3>

            <div>
              <label className="text-[11px] text-zinc-400 block mb-1">Название (напр. Студия Трайбека)</label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full glass-input rounded-xl px-4 py-2.5 text-xs text-white"
              />
            </div>

            <div>
              <label className="text-[11px] text-zinc-400 block mb-1">Адрес улицы</label>
              <input
                type="text"
                required
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
                className="w-full glass-input rounded-xl px-4 py-2.5 text-xs text-white"
              />
            </div>

            <div>
              <label className="text-[11px] text-zinc-400 block mb-1">Квартира / Офис / Заметка консьержу</label>
              <input
                type="text"
                value={newApt}
                onChange={(e) => setNewApt(e.target.value)}
                className="w-full glass-input rounded-xl px-4 py-2.5 text-xs text-white"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsAddAddrOpen(false)}
                className="px-4 py-2 rounded-xl text-xs bg-white/5 text-zinc-300 hover:text-white"
              >
                Отмена
              </button>
              <button
                type="submit"
                className="gradient-btn px-5 py-2.5 rounded-xl text-xs font-bold text-white"
              >
                Сохранить адрес
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
