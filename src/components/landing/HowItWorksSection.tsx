"use client";

import React from "react";
import { ShieldCheck, Cpu, Navigation, KeyRound, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Точка и проверка",
      description:
        "Выберите класс груза, прикрепите фото и укажите точные геокоординаты вплоть до конкретного входа в здание или консьерж-зоны.",
      icon: Navigation,
      badge: "GPS высокой точности",
    },
    {
      number: "02",
      title: "Квантовый подбор флота",
      description:
        "Нейросетевой алгоритм за 400 миллисекунд назначает оптимальный транспорт с учетом дорожной обстановки и параметров груза.",
      icon: Cpu,
      badge: "Подбор за 400 мс",
    },
    {
      number: "03",
      title: "Движение по коридору",
      description:
        "Курьер движется по зеленой волне светофоров в гиростабилизированных термобоксах с непрерывной трансляцией координат.",
      icon: ShieldCheck,
      badge: "Беспосадочный путь",
    },
    {
      number: "04",
      title: "Биометрическая передача",
      description:
        "Вручение по динамическому одноразовому PIN-коду или биометрии. Безотзывная цифровая накладная поступает в ваш сейф.",
      icon: KeyRound,
      badge: "Крипто-защита",
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-[#09090B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-20 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold">
            <span>Безупречное исполнение</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Создано для доставки <span className="gradient-accent-text">без задержек</span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
            От моментального назначения до криптографического подтверждения вручения — испытайте самую совершенную платформу городской доставки.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="relative group p-8 rounded-3xl bg-[#111217] border border-white/5 hover:border-purple-500/40 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-purple-500/10 flex flex-col justify-between"
              >
                {/* Step indicator line */}
                <div className="flex items-center justify-between mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-indigo-400 group-hover:scale-110 group-hover:bg-purple-600/20 transition-all">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-3xl font-black font-mono text-zinc-800 group-hover:text-zinc-600 transition-colors">
                    {step.number}
                  </span>
                </div>

                <div className="space-y-3">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20">
                    {step.badge}
                  </span>
                  <h3 className="text-xl font-bold text-white group-hover:text-purple-200 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-xs text-zinc-500 group-hover:text-indigo-400 transition-colors">
                  <span>Шаг {idx + 1} из 4</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
