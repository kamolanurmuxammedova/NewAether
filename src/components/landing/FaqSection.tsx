"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

export function FaqSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Как AETHER достигает среднего времени доставки по городу в 14 минут?",
      a: "AETHER использует собственный нейронный алгоритм диспетчеризации в связке с телеметрией муниципальных зеленых коридоров. Курьеры передвигаются на быстрых электроскутерах и байках, полностью объезжая заторы. Назначение курьера происходит быстрее 400 мс без промежуточных сортировочных баз.",
    },
    {
      q: "Какая страховка и защита распространяются на груз?",
      a: "Каждое отправление включает базовую защиту до $5 000 USD. Для особо ценных активов, секретных документов и электроники действует пакет Concierge Total Cover от синдиката Lloyd's of London с покрытием до $250 000 USD без франшизы.",
    },
    {
      q: "Как работает биометрическая передача груза?",
      a: "При прибытии курьера получатель подтверждает личность динамическим зашифрованным PIN-кодом из приложения или сканированием лица. После верификации электронный замок контейнера отпирается, а в ваш цифровой сейф записывается безотзывная цифровая накладная с точными геометками и временем.",
    },
    {
      q: "Могут ли корпоративные клиенты подключиться через API?",
      a: "Да. Мы предоставляем полностью типизированные REST и GraphQL API, вебхуки и готовые интеграции для 1C, SAP, Oracle NetSuite и кастомных систем WMS. Команда разработчиков может запустить автоматический вызов менее чем за час.",
    },
    {
      q: "Какие виды транспорта входят во флот AETHER?",
      a: "Весь флот состоит из электротранспорта с нулевыми выбросами: кастомные Cyber Scooter, гиростабилизированные грузовые электробайки, представительские седаны Tesla Model S, фургоны Mercedes eVito и аэро-дроны в тестовых коридорах.",
    },
    {
      q: "Как отбираются и сертифицируются курьеры?",
      a: "Лишь 4.8% кандидатов проходят отбор в флот AETHER. Каждый курьер проходит глубокую проверку безопасности, обучение премиальному этикету и сертификацию по обращению с особо ценными и конфиденциальными грузами.",
    },
  ];

  return (
    <motion.section
      ref={ref}
      id="faq"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="py-24 bg-[#0A0B0D] border-b border-zinc-800/60 relative"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          className="text-center mb-16 space-y-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500/10 border border-orange-500/30 text-orange-400 text-[11px] font-mono uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Операционная архитектура</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Часто задаваемые <span className="gradient-accent-text">вопросы</span>
          </h2>
          <p className="text-sm text-zinc-400">
            Всё о безопасности, страховании, алгоритмах диспетчеризации и интеграциях.
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
                className={`rounded-2xl border bg-[#111217] overflow-hidden transition-colors duration-200 ${
                  isOpen ? "border-purple-500/30" : "border-white/5"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors"
                >
                  <span className="text-sm sm:text-base font-bold text-white">
                    {faq.q}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 border transition-colors ${
                      isOpen
                        ? "bg-purple-500/10 border-purple-500/30 text-purple-400"
                        : "bg-white/[0.04] border-white/10 text-zinc-400"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-zinc-400 leading-relaxed border-t border-white/5 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
