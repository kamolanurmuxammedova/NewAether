"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, Sparkles } from "lucide-react";

export function TestimonialsSection() {
  const reviews = [
    {
      name: "Эвелин Вэнс",
      role: "Управляющий партнер, Vance Capital",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
      content:
        "Мы перевели всю корпоративную курьерскую службу на AETHER. Договоры и банковские обязательства, которые раньше шли 2 часа через весь Манхэттен, теперь доставляются быстрее 18 минут с абсолютной гарантией.",
      rating: 5,
      cargoClass: "Конфиденциальные документы",
    },
    {
      name: "Дэвид Стерлинг",
      role: "Вице-президент по разработке, Quantum Lab",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      content:
        "Гиростабилизированные кейсы с пневмоподвеской и непрерывная телеметрия вибраций дают нам 100% уверенность при перемещении опытных образцов микроэлектроники стоимостью в сотни тысяч долларов.",
      rating: 5,
      cargoClass: "Ценные прототипы и чипы",
    },
    {
      name: "Шеф-повар Антуан Лоран",
      role: "Шеф-повар, L'Horizon NY",
      avatar: "https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=150&auto=format&fit=crop&q=80",
      content:
        "До AETHER доставка ресторанных сетов была невозможна без нарушения композиции блюда. Их термобоксы доставляют гастрономические шедевры в точности такими, какими они вышли из-под ножа.",
      rating: 5,
      cargoClass: "Ресторанная гастрономия",
    },
    {
      name: "София Чен",
      role: "Директор по логистике, Lumina Tech",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      content:
        "REST и GraphQL API платформы — эталон простоты и надежности. Мы программно отправляем более 4 000 заказов ежемесячно. За 14 месяцев работы — ни единого инцидента.",
      rating: 5,
      cargoClass: "Корпоративный API",
    },
  ];

  return (
    <section className="py-24 bg-[#070709] border-t border-white/[0.06] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Репутация и доверие</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Выбор <br />
            <span className="gradient-accent-text">лидеров индустрии</span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-400">
            Нам доверяют требовательные семейные офисы, юридические компании, мишленовские рестораны и технологические лидеры.
          </p>
        </motion.div>

        {/* Review cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.65, delay: i * 0.13, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -5, scale: 1.01 }}
              className="p-8 rounded-3xl bg-[#111217] border border-white/5 hover:border-purple-500/30 transition-colors duration-300 flex flex-col justify-between group shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(r.rating)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20">
                    {r.cargoClass}
                  </span>
                </div>

                <p className="text-sm text-zinc-300 leading-relaxed mb-6 italic">
                  &ldquo;{r.content}&rdquo;
                </p>
              </div>

              <div className="pt-6 border-t border-white/5 flex items-center gap-4">
                <div className="w-11 h-11 rounded-full overflow-hidden bg-white/10 shrink-0 border border-white/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={r.avatar} alt={r.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                    {r.name}
                  </h4>
                  <p className="text-xs text-zinc-400">{r.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
