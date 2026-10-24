"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Zap, ShieldCheck, ArrowRight, RotateCcw } from "lucide-react";

export default function VerifyOtpPage() {
  const router = useRouter();
  const [otp, setOtp] = useState(["8", "4", "9", "2", "", ""]);
  const [countdown, setCountdown] = useState(48);

  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    const newOtp = [...otp];
    newOtp[index] = val.slice(-1);
    setOtp(newOtp);

    // Auto advance focus
    if (val && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen py-16 flex items-center justify-center px-4 bg-[#09090B] relative overflow-hidden">
      <div className="ambient-glow top-1/3 left-1/3 w-[500px] h-[400px] bg-purple-600/15" />

      <div className="w-full max-w-md relative z-10">
        <div className="glass-card rounded-3xl p-8 border border-white/10 shadow-2xl space-y-6 text-center">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-lg mx-auto">
            <ShieldCheck className="w-6 h-6" />
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-white tracking-tight">Верификация доступа</h1>
            <p className="text-xs text-zinc-400">
              Введите 6-значный криптографический код, отправленный на ваш терминал.
            </p>
          </div>

          <form onSubmit={handleVerify} className="space-y-6">
            <div className="flex justify-center gap-2">
              {[0, 1, 2, 3, 4, 5].map((idx) => (
                <input
                  key={idx}
                  ref={(el) => {
                    inputs.current[idx] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={otp[idx]}
                  onChange={(e) => handleChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  className="w-11 h-13 rounded-2xl glass-input text-center text-lg font-mono font-bold text-white focus:border-purple-500 focus:scale-105 transition-all"
                />
              ))}
            </div>

            <button
              type="submit"
              className="w-full gradient-btn py-3 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-2 shadow-lg"
            >
              <span>Подтвердить и войти</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-xs text-zinc-500 font-mono">
            {countdown > 0 ? (
              <span>Повторная отправка через {countdown}с</span>
            ) : (
              <button
                onClick={() => setCountdown(60)}
                className="text-indigo-400 hover:text-white flex items-center gap-1 mx-auto"
              >
                <RotateCcw className="w-3 h-3" /> Отправить код повторно
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
