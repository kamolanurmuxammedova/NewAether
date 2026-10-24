"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/use-user-store";
import { Zap, Lock, Mail, User, Phone, ArrowRight, Shield, Check } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useUserStore();

  const [role, setRole] = useState<"USER" | "COURIER">("USER");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(true);

  // Password strength calculation
  const calculateStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
  };

  const strength = calculateStrength(password);
  const strengthLabels = ["Слабый", "Средний", "Надёжный", "Квантовая защита"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, role);
    router.push("/auth/verify-otp");
  };

  return (
    <div className="min-h-screen py-16 flex items-center justify-center px-4 bg-[#09090B] relative overflow-hidden">
      <div className="ambient-glow top-1/4 right-1/3 w-[500px] h-[400px] bg-indigo-600/15" />

      <div className="w-full max-w-md relative z-10">
        <div className="glass-card rounded-3xl p-8 border border-white/10 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-lg">
                <Zap className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">AETHER</span>
            </Link>
            <h1 className="text-2xl font-bold text-white tracking-tight mt-2">Регистрация аккаунта</h1>
            <p className="text-xs text-zinc-400">
              Присоединяйтесь к приватной сети автономной логистики.
            </p>
          </div>

          {/* Account Type Selector */}
          <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-black/40 border border-white/5">
            <button
              type="button"
              onClick={() => setRole("USER")}
              className={`py-2 rounded-xl text-xs font-semibold transition-all ${
                role === "USER"
                  ? "bg-purple-600 text-white shadow-md"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Клиент / Бизнес
            </button>
            <button
              type="button"
              onClick={() => setRole("COURIER")}
              className={`py-2 rounded-xl text-xs font-semibold transition-all ${
                role === "COURIER"
                  ? "bg-purple-600 text-white shadow-md"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Курьер флота
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-1">ФИО / Полное имя</label>
              <div className="relative">
                <User className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full glass-input rounded-xl pl-10 pr-4 py-2 text-xs text-white"
                  placeholder="Александр Вэнс"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-1">Email адрес</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full glass-input rounded-xl pl-10 pr-4 py-2 text-xs text-white"
                  placeholder="vance@enterprise.com"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-1">Номер телефона</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full glass-input rounded-xl pl-10 pr-4 py-2 text-xs text-white font-mono"
                  placeholder="+7 (999) 000-00-00"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-300 block mb-1">Пароль</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full glass-input rounded-xl pl-10 pr-4 py-2 text-xs text-white font-mono"
                  placeholder="Минимум 8 символов"
                />
              </div>

              {/* Password Strength Indicator */}
              {password.length > 0 && (
                <div className="pt-2 space-y-1">
                  <div className="flex justify-between text-[10px] font-mono">
                    <span className="text-zinc-500">Стойкость пароля</span>
                    <span className="text-indigo-400">{strengthLabels[strength - 1] || "Слабый"}</span>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5 h-1">
                    {[1, 2, 3, 4].map((step) => (
                      <div
                        key={step}
                        className={`h-full rounded-full transition-colors ${
                          strength >= step ? "bg-indigo-500" : "bg-white/10"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-2">
              <label className="flex items-start gap-2 text-xs text-zinc-400 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="rounded accent-purple-600 bg-white/10 border-white/20 mt-0.5"
                />
                <span>
                  Я принимаю Условия перевозок AETHER, Криптографический протокол конфиденциальности и соглашение о страховании Lloyd&apos;s.
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full gradient-btn py-3 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-2 shadow-lg"
            >
              <span>Завершить регистрацию</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-center pt-2 text-xs text-zinc-400">
            Уже зарегистрированы?{" "}
            <Link href="/auth/login" className="text-purple-400 hover:text-purple-300 font-semibold">
              Войти
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
