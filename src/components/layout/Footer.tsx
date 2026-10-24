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
    <footer className="bg-[#07080A] border-t border-zinc-800 pt-14 pb-10 text-zinc-400 font-mono text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 pb-12 border-b border-zinc-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-3 font-sans">
            <Link href="/" className="flex items-center gap-2 font-mono">
              <div className="w-7 h-7 bg-orange-500 flex items-center justify-center text-white font-black text-xs">
                <Zap className="w-4 h-4 fill-current" />
              </div>
              <span className="font-black text-base tracking-tight text-white">AETHER</span>
            </Link>

            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              Городская логистическая инфраструктура. Скоростные выделенные коридоры, алгоритмическая маршрутизация и спутниковая телеметрия.
            </p>

            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-300 font-mono">
              <span className="w-1.5 h-1.5 bg-emerald-500 animate-pulse" />
              <span>СЕТЬ АКТИВНА • 99.98% ТОЧНОСТЬ</span>
            </div>
          </div>

          {/* Column 1 */}
          <div>
            <h4 className="text-[11px] font-bold text-white uppercase tracking-wider mb-3">Логистика</h4>
            <ul className="space-y-2 text-xs text-zinc-400 font-sans">
              <li><Link href="/book" className="hover:text-white transition-colors">Экспресс-доставка</Link></li>
              <li><Link href="/book?category=ELECTRONICS" className="hover:text-white transition-colors">Электроника</Link></li>
              <li><Link href="/book?category=DOCUMENTS" className="hover:text-white transition-colors">Документы</Link></li>
              <li><Link href="/book?category=FRAGILE" className="hover:text-white transition-colors">Ценные грузы</Link></li>
              <li><Link href="/book" className="hover:text-white transition-colors">Дроны (Бета)</Link></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="text-[11px] font-bold text-white uppercase tracking-wider mb-3">Платформа</h4>
            <ul className="space-y-2 text-xs text-zinc-400 font-sans">
              <li><Link href="/track" className="hover:text-white transition-colors">Живой радар</Link></li>
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Кабинет клиента</Link></li>
              <li><Link href="/courier" className="hover:text-white transition-colors">Кабинет курьера</Link></li>
              <li><Link href="/admin" className="hover:text-white transition-colors">Админ-панель</Link></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Тарифы</a></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="text-[11px] font-bold text-white uppercase tracking-wider mb-3">Стандарты</h4>
            <ul className="space-y-2 text-xs text-zinc-400 font-sans">
              <li><span>100% сохранность</span></li>
              <li><span>Страхование Lloyd&apos;s</span></li>
              <li><span>Шифрование данных</span></li>
              <li><span>Биометрический смарт-код</span></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-2 font-sans">
            <h4 className="text-[11px] font-bold text-white uppercase tracking-wider font-mono">Дайджест флота</h4>
            <p className="text-[11px] text-zinc-400">
              Обновления зеленых коридоров и новые городские хабы.
            </p>
            {subscribed ? (
              <div className="p-2 bg-emerald-950 text-emerald-400 border border-emerald-800 text-[11px] flex items-center gap-1.5 font-mono">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Подписка оформлена</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-1.5">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@company.com"
                  className="w-full glass-input px-2.5 py-1.5 text-xs text-white"
                />
                <button
                  type="submit"
                  className="w-full gradient-btn py-1.5 text-xs font-bold text-white font-mono"
                >
                  Подписаться
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-zinc-500 text-[11px]">
          <div>© 2026 AETHER TECHNOLOGIES. ВСЕ ПРАВА ЗАЩИЩЕНЫ.</div>
          <div className="flex gap-4">
            <Link href="/" className="hover:text-zinc-300">Регламент</Link>
            <Link href="/" className="hover:text-zinc-300">Конфиденциальность</Link>
            <Link href="/admin" className="hover:text-orange-400">Консоль</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
