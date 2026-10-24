"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, ArrowRight, Sparkles } from "lucide-react";

export function PopularDeliveriesSection() {
  const routes = [
    {
      id: "rt_1",
      category: "Электроника и техника",
      title: "Apple Пятое Авеню ➔ Лофт в Трайбека",
      from: "767 5th Ave (Apple Cube)",
      to: "Франклин и Гринвич, Трайбека",
      distance: "5.8 км",
      time: "16 мин",
      price: "$29.50",
      security: "PIN-вручение",
      badge: "Скоростной коридор",
    },
    {
      id: "rt_2",
      category: "Юридические договоры и M&A",
      title: "Уолл Стрит ➔ Мидтаун Юридический Центр",
      from: "Уолл Стрит, 14 (Фин. район)",
      to: "Парк Авеню, 375 (Сигрэм Билдинг)",
      distance: "7.1 км",
      time: "19 мин",
      price: "$26.00",
      security: "Биометрия",
      badge: "Защищенный сейф",
    },
    {
      id: "rt_3",
      category: "Дизайнерская одежда и кутюр",
      title: "Бутик на Мэдисон ➔ Сентрал Парк Юг",
      from: "Мэдисон Авеню, 712",
      to: "Сентрал Парк Вест, 15",
      distance: "2.4 км",
      time: "9 мин",
      price: "$22.50",
      security: "Белые перчатки",
      badge: "Кофр с плечиками",
    },
    {
      id: "rt_4",
      category: "Фармацевтика с термобоксом",
      title: "БиоЛаб Центр ➔ Верхний Ист-Сайд",
      from: "Мед. коридор Первой Авеню",
      to: "Парк Авеню, 740",
      distance: "3.2 км",
      time: "11 мин",
      price: "$24.00",
      security: "Холодовая цепь",
      badge: "Термопечать",
    },
  ];

  return (
    <section className="py-24 bg-[#09090B] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-mono uppercase tracking-widest text-purple-400">
              Проверенные скоростные коридоры
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Популярные <span className="gradient-accent-text">городские маршруты</span>
            </h2>
            <p className="text-sm text-zinc-400">
              Регулярные экспресс-линии с предварительно согласованным доступом в здания и нулевыми задержками.
            </p>
          </div>

          <Link
            href="/book"
            className="inline-flex items-center gap-2 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            <span>Настроить персональный мульти-маршрут</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {routes.map((r, idx) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.65, delay: idx * 0.13, ease: "easeOut" }}
              whileHover={{ y: -6, scale: 1.01, transition: { duration: 0.2 } }}
              className="p-7 rounded-3xl bg-[#111217] border border-white/5 hover:border-purple-500/30 transition-colors duration-300 group shadow-lg relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-purple-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> {r.category}
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                  {r.badge}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-4 group-hover:text-indigo-300 transition-colors">
                {r.title}
              </h3>

              {/* Waypoints */}
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2.5 text-xs text-zinc-300">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                  <span className="text-zinc-500 font-mono text-[10px]">ОТКУДА:</span>
                  <span className="truncate">{r.from}</span>
                </div>
                <div className="h-3 border-l border-dashed border-zinc-700 ml-1" />
                <div className="flex items-center gap-2.5 text-xs text-zinc-300">
                  <div className="w-2 h-2 rounded-full bg-indigo-400 shrink-0" />
                  <span className="text-zinc-500 font-mono text-[10px]">КУДА:</span>
                  <span className="truncate">{r.to}</span>
                </div>
              </div>

              {/* Metrics & Action */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-indigo-400" /> {r.time}
                  </span>
                  <span>•</span>
                  <span>{r.distance}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-base font-extrabold text-white font-mono">{r.price}</span>
                  <Link
                    href="/book"
                    className="gradient-btn px-4 py-2 rounded-xl text-xs font-bold text-white flex items-center gap-1 group-hover:shadow-lg transition-all"
                  >
                    <span>Вызвать</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
