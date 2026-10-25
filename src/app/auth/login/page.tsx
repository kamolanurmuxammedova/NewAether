"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useUserStore } from "@/store/use-user-store";
import { playClickSound, playSuccessSound } from "@/lib/sound";
import { useTranslation } from "@/lib/i18n";
import {
  Zap,
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Eye,
  EyeOff,
  UserCheck,
  Shield,
  Truck,
  CheckCircle,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const t = useTranslation();
  const { validateLogin, login } = useUserStore();

  const [email, setEmail] = useState("alexander.vance@vance-holdings.com");
  const [password, setPassword] = useState("password123");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playClickSound();
    setErrorMsg("");
    setIsLoading(true);

    setTimeout(() => {
      const res = validateLogin(email, password);
      setIsLoading(false);
      if (!res.success) {
        setErrorMsg(res.error || "Неверный логин или пароль");
        return;
      }
      playSuccessSound();
      setIsSuccess(true);
      setTimeout(() => {
        if (email.toLowerCase().includes("admin")) router.push("/admin");
        else if (email.toLowerCase().includes("courier")) router.push("/courier");
        else router.push("/dashboard");
      }, 900);
    }, 600);
  };

  const handleQuickLogin = (
    quickEmail: string,
    role: "USER" | "COURIER" | "ADMIN"
  ) => {
    playClickSound();
    login(quickEmail, role);
    playSuccessSound();
    setIsSuccess(true);
    setTimeout(() => {
      if (role === "ADMIN") router.push("/admin");
      else if (role === "COURIER") router.push("/courier");
      else router.push("/dashboard");
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#0A0B0D] flex">
      {/* ── Left branding panel ── */}
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

        {/* Statement */}
        <div className="relative z-10 space-y-6">
          <div className="text-[11px] font-mono text-orange-500 tracking-widest uppercase">
            [ СИСТЕМА ДОСТАВКИ ]
          </div>
          <h2 className="text-4xl xl:text-5xl font-black text-white leading-tight tracking-tight">
            Логистика
            <br />
            нового
            <br />
            <span className="text-orange-500">поколения.</span>
          </h2>
          <p className="text-zinc-400 text-sm leading-relaxed max-w-xs font-sans">
            Полный контроль над каждой посылкой. Реальное время. Верифицированные курьеры.
          </p>

          <div className="grid grid-cols-2 gap-2 pt-2">
            {[
              { v: "~14 мин", l: "Среднее время" },
              { v: "84", l: "Курьеров онлайн" },
              { v: "99.98%", l: "SLA выполнено" },
              { v: "24/7", l: "Поддержка" },
            ].map((s) => (
              <div
                key={s.l}
                className="bg-zinc-900/60 border border-zinc-800 p-3"
              >
                <div className="text-lg font-black text-white font-mono">
                  {s.v}
                </div>
                <div className="text-[10px] font-mono text-zinc-500">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 text-[10px] font-mono text-zinc-700">
          AETHER TELEMETRY v4.2 / SECURE AUTH PROTOCOL
        </div>
      </div>

      {/* ── Right form panel ── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              key="success"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
              className="text-center space-y-4"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 250, damping: 14, delay: 0.1 }}
                className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto"
              >
                <CheckCircle className="w-8 h-8 text-emerald-400" />
              </motion.div>
              <p className="text-white font-bold font-mono text-lg">
                Вход выполнен!
              </p>
              <p className="text-zinc-400 text-sm">Перенаправление...</p>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-sm"
            >
              {/* Mobile logo */}
              <div className="mb-8 lg:hidden">
                <Link href="/" className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-orange-500 flex items-center justify-center">
                    <Zap className="w-4 h-4 fill-current text-white" />
                  </div>
                  <span className="font-black text-base tracking-tight text-white font-mono">
                    AETHER
                  </span>
                </Link>
              </div>

              <h1 className="text-2xl font-black text-white tracking-tight mb-1 font-mono">
                {t.authModalLoginBtn}
              </h1>
              <p className="text-zinc-400 text-sm mb-8 font-sans">
                {t.lang === "uz" ? "Kabinetga kirish uchun ma'lumotlarni kiriting." : t.lang === "en" ? "Enter your credentials to access your console." : "Введите данные для доступа к кабинету."}
              </p>

              {/* Quick login shortcuts */}
              <div className="mb-6 p-3 bg-zinc-900 border border-zinc-800">
                <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-2">
                  {t.lang === "uz" ? "[ TEZKOR KIRISH ]" : t.lang === "en" ? "[ QUICK SIGN IN ]" : "[ БЫСТРЫЙ ВХОД ]"}
                </p>
                <div className="grid grid-cols-3 gap-1">
                  <button
                    type="button"
                    onClick={() =>
                      handleQuickLogin(
                        "alexander.vance@vance-holdings.com",
                        "USER"
                      )
                    }
                    className="py-1.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-xs text-zinc-200 flex items-center justify-center gap-1 transition-colors"
                  >
                    <UserCheck className="w-3 hand-3 text-orange-400" />
                    {t.lang === "uz" ? "Mijoz" : t.lang === "en" ? "Client" : "Клиент"}
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleQuickLogin("courier@aether.io", "COURIER")
                    }
                    className="py-1.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-xs text-zinc-200 flex items-center justify-center gap-1 transition-colors"
                  >
                    <Truck className="w-3 h-3" />
                    {t.navCourier}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickLogin("admin@aether.io", "ADMIN")}
                    className="py-1.5 bg-orange-500/15 hover:bg-orange-500/25 border border-orange-500/40 text-xs text-orange-400 flex items-center justify-center gap-1 transition-colors font-bold"
                  >
                    <Shield className="w-3 h-3" />
                    {t.lang === "uz" ? "Admin" : t.lang === "en" ? "Admin" : "Админ"}
                  </button>
                </div>
              </div>

              {/* Error */}
              <AnimatePresence>
                {errorMsg && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-4 p-3 bg-red-950/60 border border-red-800 text-red-300 text-xs flex items-center gap-2 overflow-hidden"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                    {errorMsg}
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-mono text-zinc-400 block mb-1.5">
                    EMAIL
                  </label>
                  <div className="relative">
                    <Mail className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full glass-input pl-9 pr-3 py-2.5 text-sm text-white"
                      placeholder="name@enterprise.com"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-mono text-zinc-400">
                      ПАРОЛЬ
                    </label>
                    <Link
                      href="/auth/forgot-password"
                      className="text-[10px] text-orange-400 hover:underline font-mono"
                    >
                      Забыли?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-3" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full glass-input pl-9 pr-10 py-2.5 text-sm text-white font-mono"
                      placeholder="••••••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-zinc-400 hover:text-white"
                    >
                      {showPassword ? (
                        <EyeOff className="w-3.5 h-3.5" />
                      ) : (
                        <Eye className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full gradient-btn py-3 text-sm font-bold flex items-center justify-center gap-2 mt-2"
                >
                  {isLoading ? (
                    <svg
                      className="animate-spin w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeOpacity="0.3"
                      />
                      <path
                        d="M12 2a10 10 0 0 1 10 10"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    </svg>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      {t.authModalLoginBtn}
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </form>

              <p className="text-center mt-6 text-xs text-zinc-500 font-mono">
                {t.lang === "uz" ? "Hisobingiz yo'qmi?" : t.lang === "en" ? "Don't have an account?" : "Нет аккаунта?"}{" "}
                <Link
                  href="/auth/register"
                  className="text-orange-400 font-bold hover:underline"
                >
                  {t.authModalRegisterBtn}
                </Link>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
