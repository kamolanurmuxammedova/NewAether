"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUserStore } from "@/store/use-user-store";
import { formatCurrency } from "@/lib/utils";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import {
  Zap,
  Search,
  Bell,
  Wallet,
  Shield,
  Truck,
  User,
  ChevronDown,
  Menu,
  X,
  Sparkles,
  ArrowRight,
  LogOut,
} from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const {
    user,
    walletBalance,
    notifications,
    setIsSearchOpen,
    markAllNotificationsRead,
  } = useUserStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const navLinks = [
    { label: "Оформить", href: "/book" },
    { label: "Радар", href: "/track" },
    { label: "Кабинет", href: "/dashboard" },
    ...(user.role === "COURIER" || user.role === "ADMIN"
      ? [{ label: "Курьер", href: "/courier" }]
      : []),
    ...(user.role === "ADMIN"
      ? [{ label: "Админ", href: "/admin" }]
      : []),
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.06] bg-[#09090B]/80 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo - Minimalist & Sleek */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-8 h-8 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center group-hover:border-white/20 transition-colors">
            <Zap className="w-4 h-4 text-indigo-400 group-hover:scale-105 transition-transform" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-base tracking-tight text-white">AETHER</span>
            <span className="text-[9px] font-mono text-zinc-500 bg-white/[0.04] px-1.5 py-0.5 rounded border border-white/[0.05]">
              логистика
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links - Clean, uncluttered */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  isActive
                    ? "text-white bg-white/[0.08]"
                    : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls & Profile - Minimalist Toolbar */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Theme Toggle Button */}
          <ThemeToggle />

          {/* Quick Search Shortcut */}
          <button
            onClick={() => setIsSearchOpen(true)}
            aria-label="Поиск"
            title="Поиск (⌘K)"
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.04] transition-colors"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Wallet Balance Pill */}
          <Link
            href="/dashboard"
            title="Баланс"
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono text-zinc-300 hover:text-white hover:bg-white/[0.04] border border-white/[0.06] transition-colors"
          >
            <Wallet className="w-3.5 h-3.5 text-zinc-400" />
            <span>{formatCurrency(walletBalance)}</span>
          </Link>

          {/* Notifications Button */}
          <div className="relative">
            <button
              onClick={() => {
                setIsNotifOpen(!isNotifOpen);
                setIsProfileOpen(false);
              }}
              aria-label="Уведомления"
              className="relative p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.04] transition-colors"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500" />
              )}
            </button>

            {isNotifOpen && (
              <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-[#111216] border border-white/10 shadow-2xl p-4 z-50">
                <div className="flex items-center justify-between pb-2.5 border-b border-white/5 mb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">Уведомления</span>
                    {unreadCount > 0 && (
                      <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-indigo-500/20 text-indigo-300 font-mono">
                        {unreadCount}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={markAllNotificationsRead}
                    className="text-[10px] text-zinc-400 hover:text-white transition-colors"
                  >
                    Прочитать все
                  </button>
                </div>

                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`p-2.5 rounded-xl border text-xs transition-colors ${
                        n.read
                          ? "bg-white/[0.01] border-white/5 text-zinc-400"
                          : "bg-indigo-500/10 border-indigo-500/20 text-zinc-200"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="font-semibold text-white text-[11px]">{n.title}</span>
                        <span className="text-[9px] text-zinc-500">{n.timestamp}</span>
                      </div>
                      <p className="text-[11px] text-zinc-400 leading-relaxed">{n.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar */}
          <div className="relative">
            <button
              onClick={() => {
                setIsProfileOpen(!isProfileOpen);
                setIsNotifOpen(false);
              }}
              aria-label="Профиль"
              className="w-8 h-8 rounded-full bg-white/[0.08] hover:bg-white/[0.12] border border-white/10 flex items-center justify-center text-xs font-semibold text-zinc-200 transition-colors"
            >
              {user.name.charAt(0)}
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#111216] border border-white/10 shadow-2xl p-3 z-50">
                <div className="pb-2.5 border-b border-white/5 mb-2">
                  <div className="text-xs font-bold text-white">{user.name}</div>
                  <div className="text-[10px] text-zinc-400 truncate">{user.email}</div>
                  <div className="mt-1 text-[9px] font-mono text-indigo-400">
                    {user.role} • {user.tier}
                  </div>
                </div>

                <div className="space-y-0.5">
                  <Link
                    href="/dashboard"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-zinc-300 hover:bg-white/5 hover:text-white transition-colors"
                  >
                    <User className="w-3.5 h-3.5 text-zinc-400" /> Личный кабинет
                  </Link>

                  {user.role === "COURIER" && (
                    <Link
                      href="/courier"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-zinc-300 hover:bg-white/5 hover:text-white transition-colors"
                    >
                      <Truck className="w-3.5 h-3.5 text-zinc-400" /> Панель курьера
                    </Link>
                  )}

                  {user.role === "ADMIN" && (
                    <Link
                      href="/admin"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-zinc-300 hover:bg-white/5 hover:text-white transition-colors"
                    >
                      <Shield className="w-3.5 h-3.5 text-zinc-400" /> Управление
                    </Link>
                  )}

                  <Link
                    href="/auth/login"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-red-400 hover:bg-red-500/10 transition-colors pt-1.5 border-t border-white/5"
                  >
                    <LogOut className="w-3.5 h-3.5 text-red-400" /> Выйти
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Primary CTA Button */}
          <Link
            href="/book"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold gradient-btn"
          >
            <span>Вызвать</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Меню"
            className="md:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.04]"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-5 bg-[#09090B] border-b border-white/10 space-y-1.5 animate-in slide-in-from-top-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-xs font-medium text-zinc-300 hover:bg-white/5 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-white/5">
            <Link
              href="/book"
              onClick={() => setIsMobileMenuOpen(false)}
              className="gradient-btn block w-full py-2.5 rounded-xl text-center text-xs font-semibold text-white"
            >
              Оформить доставку
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
