"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Bike, DollarSign, Zap, Shield, ArrowRight, Award } from "lucide-react";

export function CourierAdvantagesSection() {
  const benefits = [
    {
      icon: DollarSign,
      title: "$48.50 / час средний доход",
      desc: "Ведущие городские курьеры зарабатывают по максимальным ставкам со 100% сохранением чаевых.",
      badge: "Лидер рынка",
    },
    {
      icon: Zap,
      title: "Мгновенные выплаты за 60 сек",
      desc: "Выводите заработанные средства в любое время прямо на банковскую карту или Apple Wallet.",
      badge: "Без задержек",
    },
    {
      icon: Bike,
      title: "Субсидии на электротранспорт",
      desc: "Беспроцентная аренда фирменных электроскутеров Cyber Scooter и мощных электробайков.",
      badge: "100% Эко",
    },
    {
      icon: Shield,
      title: "Безопасность премиум-класса",
      desc: "Никаких наличных. Свободный пропуск в лобби премиум-зданий и полное страховое покрытие.",
      badge: "VIP Протокол",
    },
  ];

  return (
    <section className="py-24 bg-[#09090B] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-b from-[#14151D] to-[#0E0F14] border border-white/10 shadow-2xl relative overflow-hidden">
          {/* Ambient Glow */}
          <div className="ambient-glow -top-20 -right-20 w-[450px] h-[350px] bg-purple-600/15" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            {/* Left Content */}
            <motion.div
              className="lg:col-span-5 space-y-6"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold">
                <Award className="w-3.5 h-3.5" />
                <span>Присоединяйтесь к квантовому флоту</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Управляйте будущим <br />
                <span className="gradient-accent-text">автономной логистики</span>
              </h2>

              <p className="text-sm text-zinc-400 leading-relaxed">
                Мы доставляем не просто еду. Курьеры AETHER — сертифицированные специалисты городской логистики, перевозящие ценные грузы с достоинством и беспрецедентной оплатой.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <Link
                  href="/courier"
                  className="gradient-btn px-6 py-3.5 rounded-2xl text-xs font-bold text-white text-center flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>Подать заявку в курьеры</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/courier"
                  className="px-5 py-3.5 rounded-2xl text-xs font-semibold text-zinc-300 hover:text-white bg-white/[0.04] border border-white/10 text-center transition-colors"
                >
                  Панель курьера
                </Link>
              </div>
            </motion.div>

            {/* Right Benefit Cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((b, i) => {
                const Icon = b.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.6, delay: 0.1 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="p-6 rounded-2xl bg-[#111217] border border-white/5 hover:border-purple-500/30 transition-colors group"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-purple-400 group-hover:scale-110 group-hover:bg-purple-600/20 transition-all">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                        {b.badge}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-white mb-1.5 group-hover:text-purple-200 transition-colors">
                      {b.title}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {b.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
