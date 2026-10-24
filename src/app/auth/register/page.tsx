"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useUserStore } from "@/store/use-user-store";
import { playClickSound, playSuccessSound } from "@/lib/sound";
import {
  Zap,
  Lock,
  Mail,
  User,
  Phone,
  ArrowRight,
  Shield,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff,
  KeyRound,
  Check,
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { registerAccount } = useUserStore();

  const [role, setRole] = useState<"USER" | "COURIER" | "ADMIN">("USER");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [adminInviteCode, setAdminInviteCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const calculateStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length >= 6) score++;
    if (pwd.length >= 8) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
  };

  const strength = calculateStrength(password);
  const strengthLabels = ["Слабый", "Базовый", "Хороший", "Надёжный", "Максимальная защита"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playClickSound();
    setErrorMsg("");

    if (!name.trim()) {
      setErrorMsg("Укажите ваше имя или название компании.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setErrorMsg("Укажите корректный email адрес.");
      return;
    }
    if (password.length < 4) {
      setErrorMsg("Пароль должен содержать не менее 4 символов.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg("Введенные пароли не совпадают.");
      return;
    }

    if (role === "ADMIN") {
      const code = adminInviteCode.trim().toLowerCase();
      if (code !== "admin" && code !== "admin2026" && code !== "aether") {
        setErrorMsg("Неверный код доступа администратора. (Подсказка: admin или admin2026)");
        return;
      }
    }

    setIsLoading(true);

    setTimeout(() => {
      const res = registerAccount({
        name,
        email,
        phone,
        password,
        role,
      });

      setIsLoading(false);

      if (!res.success) {
        setErrorMsg(res.error || "Ошибка регистрации");
        return;
      }

      playSuccessSound();
      setIsSuccess(true);

      setTimeout(() => {
        if (role === "ADMIN") {
          router.push("/admin");
        } else if (role === "COURIER") {
          router.push("/courier");
        } else {
          router.push("/dashboard");
        }
      }, 900);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#0A0B0D] flex">
      {/* Left branding panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0D0E11] border-r border-zinc-800 flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 tech-grid opacity-40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent pointer-events-none" />

        {/* Logo */}
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-500 flex items-center justify-center">
              <Zap className="w-4 h-4 fill-current text-white" />
            </div>
            <span className="font-black text-lg tracking-tight text-white font-mono">
              AETHER
            </span>
          </Link>
        </div>

        {/* Info showcase */}
        <div className="relative z-10 space-y-6">
          <div className="text-[11px] font-mono text-orange-500 tracking-widest uppercase">
            [ РЕГИСТРАЦИЯ В ЭКОСИСТЕМЕ ]
          </div>
          <h2 className="text-4xl xl:text-5xl font-black text-white leading-tight tracking-tight">
            Станьте частью
            <br />
            скоростной
            <br />
            <span className="text-orange-500">логистики.</span>
          </h2>
          <p className="text-zinc-400 text-sm leading-relaxed max-w-sm font-sans">
            Мгновенный доступ к трекингу грузов, вызову дронов и курьеров, а также корпоративному кабинету и API.
          </p>

          <div className="space-y-3 pt-2 font-mono text-xs text-zinc-300">
            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
                <Check className="w-3 h-3" />
              </div>
              <span>Прямое бронирование без посредников</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
                <Check className="w-3 h-3" />
              </div>
              <span>Полное страхование ценных грузов до $250k</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-5 h-5 bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
                <Check className="w-3 h-3" />
              </div>
              <span>Прозрачная телеметрия в режиме 24/7</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-[10px] font-mono text-zinc-700">
          AETHER ENTERPRISE PROTOCOL // REGISTER UNIT
        </div>
      </div>

      {/* Right form panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 py-12">
        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              key="success"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
              className="text-center space-y-4 font-mono"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 250, damping: 14, delay: 0.1 }}
                className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto"
              >
                <CheckCircle className="w-8 h-8 text-emerald-400" />
              </motion.div>
              <p className="text-white font-bold text-lg">
                Аккаунт создан!
              </p>
              <p className="text-zinc-400 text-xs">Авторизуем и перенаправляем в кабинет...</p>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-md font-mono"
            >
              {/* Mobile Header */}
              <div className="mb-6 lg:hidden">
                <Link href="/" className="inline-flex items-center gap-2" onClick={() => playClickSound()}>
                  <div className="w-7 h-7 bg-orange-500 flex items-center justify-center text-white font-bold">
                    <Zap className="w-4 h-4 fill-current" />
                  </div>
                  <span className="font-black text-base tracking-tight text-white">AETHER</span>
                </Link>
              </div>

              <h1 className="text-2xl font-black text-white tracking-tight mb-1">
                Регистрация
              </h1>
              <p className="text-zinc-400 text-xs mb-6 font-sans">
                Выберите роль и заполните профиль для доступа к платформе.
              </p>

              {/* Role selector */}
              <div className="grid grid-cols-3 gap-1 p-1 bg-zinc-900 border border-zinc-800 text-[11px] mb-5">
                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setRole("USER");
                  }}
                  className={`py-1.5 transition-all ${
                    role === "USER"
                      ? "bg-orange-500 text-white font-bold"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Клиент
                </button>
                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setRole("COURIER");
                  }}
                  className={`py-1.5 transition-all ${
                    role === "COURIER"
                      ? "bg-orange-500 text-white font-bold"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Курьер
                </button>
                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setRole("ADMIN");
                  }}
                  className={`py-1.5 transition-all ${
                    role === "ADMIN"
                      ? "bg-orange-500 text-white font-bold"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Администратор
                </button>
              </div>

              {errorMsg && (
                <div className="mb-4 p-2.5 bg-red-950/60 border border-red-800 text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
                {role === "ADMIN" && (
                  <div className="p-3 bg-zinc-900 border border-orange-500/40 space-y-1">
                    <label className="text-[11px] text-orange-400 font-bold flex items-center gap-1">
                      <KeyRound className="w-3.5 h-3.5" />
                      <span>Код допуска администратора</span>
                    </label>
                    <input
                      type="password"
                      value={adminInviteCode}
                      onChange={(e) => setAdminInviteCode(e.target.value)}
                      placeholder="Пароль администратора (напр. admin)"
                      className="w-full glass-input px-3 py-1.5 text-xs text-white font-mono"
                      required
                    />
                    <span className="text-[10px] text-zinc-500 block">
                      Для теста используйте: admin
                    </span>
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-zinc-300 block">ФИО или Организация</label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 w-3.5 h-3.5 text-zinc-500" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Константин Смирнов"
                      className="w-full glass-input pl-8 pr-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-zinc-300 block">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 w-3.5 h-3.5 text-zinc-500" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="user@example.com"
                      className="w-full glass-input pl-8 pr-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-zinc-300 block">Телефон</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 w-3.5 h-3.5 text-zinc-500" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+7 (999) 000-00-00"
                      className="w-full glass-input pl-8 pr-3 py-2 text-xs text-white font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-zinc-300 block">Пароль</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 w-3.5 h-3.5 text-zinc-500" />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Минимум 4 симв."
                        className="w-full glass-input pl-8 pr-8 py-2 text-xs text-white font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-2.5 text-zinc-400 hover:text-white"
                      >
                        {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-zinc-300 block">Повторите пароль</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 w-3.5 h-3.5 text-zinc-500" />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Повтор пароля"
                        className="w-full glass-input pl-8 pr-3 py-2 text-xs text-white font-mono"
                      />
                    </div>
                  </div>
                </div>

                {password && (
                  <div className="flex items-center gap-1.5 pt-1 text-[10px] text-zinc-400">
                    <span>Сложность:</span>
                    <span className="text-orange-400 font-bold">{strengthLabels[strength]}</span>
                  </div>
                )}

                <label className="flex items-start gap-2 pt-1 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-0.5 rounded-none accent-orange-500"
                  />
                  <span className="text-[10px] text-zinc-400 font-sans leading-snug">
                    Я принимаю регламент безопасной доставки и конфиденциальности AETHER.
                  </span>
                </label>

                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full gradient-btn py-2.5 text-xs font-bold text-white flex items-center justify-center gap-1.5 mt-2"
                >
                  <span>{isLoading ? "Регистрация..." : "Зарегистрировать аккаунт"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </motion.button>
              </form>

              <div className="text-center pt-4 border-t border-zinc-800 text-xs mt-5">
                <span className="text-zinc-400">Уже есть аккаунт? </span>
                <Link href="/auth/login" className="text-orange-400 font-bold hover:underline">
                  Войти
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
