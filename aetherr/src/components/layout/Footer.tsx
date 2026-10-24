"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Zap, CheckCircle2, Send } from "lucide-react";

export function Footer() {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="relative bg-[#070709] border-t border-white/[0.08] pt-20 pb-12 overflow-hidden text-zinc-400">
      {/* Background ambient light */}
      <div className="ambient-glow -bottom-40 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-purple-900/15" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 pb-16 border-b border-white/[0.08]">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-purple-600/30">
                <Zap className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">AETHER</span>
            </Link>

            <p className="text-sm text-zinc-400 leading-relaxed max-w-sm">
              Городская логистическая инфраструктура нового поколения. Скоростные зеленые коридоры, белый протокол безопасности и микро-точная спутниковая телеметрия.
            </p>

            {/* Operational Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>14 мировых хабов онлайн • 99.98% точность</span>
            </div>
          </div>

          {/* Column 1: Services */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4">Логистика</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/book" className="hover:text-white transition-colors">Гиперскорость Direct</Link></li>
              <li><Link href="/book?category=ELECTRONICS" className="hover:text-white transition-colors">Ценная электроника</Link></li>
              <li><Link href="/book?category=DOCUMENTS" className="hover:text-white transition-colors">Секретные документы</Link></li>
              <li><Link href="/book?category=FRAGILE" className="hover:text-white transition-colors">Арт-объекты с гироскопом</Link></li>
              <li><Link href="/book?category=MEDICINE" className="hover:text-white transition-colors">Холодовая цепь фармы</Link></li>
              <li><Link href="/book" className="hover:text-white transition-colors">Дроны-курьеры (Бета)</Link></li>
            </ul>
          </div>

          {/* Column 2: Ecosystem */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4">Экосистема</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/track" className="hover:text-white transition-colors">Спутниковый радар</Link></li>
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Кабинет клиента</Link></li>
              <li><Link href="/courier" className="hover:text-white transition-colors">Стать курьером флота</Link></li>
              <li><Link href="/admin" className="hover:text-white transition-colors">API телеметрии</Link></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Тарифы в реальном времени</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Вопросы и протоколы</a></li>
            </ul>
          </div>

          {/* Column 3: Architecture & Legal */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4">Безопасность</h4>
            <ul className="space-y-2.5 text-xs">
              <li><span className="text-zinc-500">100% гарантия сохранности</span></li>
              <li><span className="text-zinc-500">Страхование Lloyd&apos;s</span></li>
              <li><span className="text-zinc-500">Сертификат SOC2 Type II</span></li>
              <li><span className="text-zinc-500">Биометрическая защита</span></li>
              <li><span className="text-zinc-500">Документация API</span></li>
              <li><span className="text-zinc-500">Индекс экологичности</span></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest">Aether Сводка</h4>
            <p className="text-xs text-zinc-400">
              Получайте обновления о расширении сети коридоров, закрытых тарифах и ключах доступа к API.
            </p>
            {subscribed ? (
              <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Приоритетный доступ подключен.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="executive@enterprise.com"
                    required
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    type="submit"
                    aria-label="Подписаться"
                    className="absolute right-1.5 top-1.5 w-6 h-6 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center transition-colors"
                  >
                    <Send className="w-3 h-3" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex items-center gap-4">
            <p>© 2026 AETHER Logistics Technologies Inc. Все права защищены.</p>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">Квантовое диспетчирование v3.8</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="hover:text-zinc-400 cursor-pointer">Протокол безопасности</span>
            <span className="hover:text-zinc-400 cursor-pointer">Правила перевозки</span>
            <span className="hover:text-zinc-400 cursor-pointer">Статус глобальной сети</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
