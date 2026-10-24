"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useUserStore } from "@/store/use-user-store";
import { formatCurrency } from "@/lib/utils";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { LanguageSelector } from "@/components/layout/LanguageSelector";
import { useTranslation } from "@/lib/i18n";
import { isSoundEnabled, setSoundEnabled, playClickSound } from "@/lib/sound";
import {
  Zap,
  Search,
  Bell,
  Wallet,
  Shield,
  Truck,
  User,
  Menu,
  X,
  ArrowRight,
  LogOut,
  Volume2,
  VolumeX,
  LogIn,
} from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const {
    user,
    isAuthenticated,
    walletBalance,
    notifications,
    language,
    setIsSearchOpen,
    markAllNotificationsRead,
    logout,
  } = useUserStore();

  const t = useTranslation(language);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setSoundOn(isSoundEnabled());
  }, []);

  const handleToggleSound = () => {
    const next = !soundOn;
    setSoundEnabled(next);
    setSoundOn(next);
    if (next) playClickSound();
  };

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    router.push("/auth/login");
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const navLinks = [
    { label: t.navBook, href: "/book" },
    { label: t.navRadar, href: "/track" },
    { label: t.navPricing, href: "/#pricing" },
    { label: t.navCabinet, href: "/dashboard" },
    { label: t.navCourier, href: "/courier" },
    { label: t.navAdmin, href: "/admin", isSpecial: true },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b transition-all duration-300 font-sans ${
        scrolled
          ? "bg-[#0A0B0D]/97 backdrop-blur-md border-zinc-800"
          : "bg-[#0A0B0D]/95 backdrop-blur-sm border-zinc-800"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-3">
        {/* Brand Logo - Sharp Technical Monospace */}
        <Link
          href="/"
          className="flex items-center gap-2 group shrink-0"
          onClick={() => playClickSound()}
        >
          <div className="w-7 h-7 bg-orange-500 flex items-center justify-center text-white shadow-sm font-black text-xs">
            <Zap className="w-4 h-4 fill-current" />
          </div>
          <div className="flex items-center gap-1.5 font-mono">
            <span className="font-black text-sm tracking-tight text-white">AETHER</span>
            <span className="text-[9px] text-zinc-500 bg-zinc-900 px-1 py-0.5 border border-zinc-800">
              LOGISTICS
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 font-mono">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && link.href !== "/#pricing" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => playClickSound()}
                className={`px-3 py-1 text-xs transition-all flex items-center gap-1.5 border ${
                  isActive
                    ? "text-white bg-zinc-800 border-zinc-700"
                    : link.isSpecial
                    ? "text-orange-400 bg-orange-500/10 border-orange-500/30 hover:bg-orange-500/20"
                    : "text-zinc-400 hover:text-white border-transparent hover:bg-zinc-900"
                }`}
              >
                {link.isSpecial && <Shield className="w-3 h-3 text-orange-500" />}
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Toolbar */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Language Switcher 3 Languages (RU / EN / UZ) */}
          <LanguageSelector />

          {/* Sound Toggle */}
          <button
            onClick={handleToggleSound}
            aria-label="Звук"
            title={soundOn ? "Звук: ВКЛ" : "Звук: ВЫКЛ"}
            className="p-1.5 rounded-sm text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            {soundOn ? <Volume2 className="w-4 h-4 text-orange-400" /> : <VolumeX className="w-4 h-4 opacity-40" />}
          </button>

          {/* Theme Toggle (Dark / Light) */}
          <ThemeToggle />

          {/* Search */}
          <button
            onClick={() => {
              playClickSound();
              setIsSearchOpen(true);
            }}
            aria-label="Поиск"
            className="p-1.5 rounded-sm text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Wallet Balance Pill (Only if authenticated) */}
          {isAuthenticated && (
            <Link
              href="/dashboard"
              onClick={() => playClickSound()}
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono text-zinc-300 hover:text-white bg-zinc-900 border border-zinc-800 transition-colors"
            >
              <Wallet className="w-3.5 h-3.5 text-zinc-500" />
              <span>{formatCurrency(walletBalance)}</span>
            </Link>
          )}

          {/* Notifications (Only if authenticated) */}
          {isAuthenticated && (
            <div className="relative">
              <button
                onClick={() => {
                  playClickSound();
                  setIsNotifOpen(!isNotifOpen);
                  setIsProfileOpen(false);
                }}
                className="relative p-1.5 rounded-sm text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-orange-500 rounded-none animate-pulse" />
                )}
              </button>

              {isNotifOpen && (
                <div className="absolute right-0 mt-2 w-72 rounded-sm bg-[#121316] border border-zinc-700 shadow-xl p-3 z-50 font-mono text-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-zinc-800 mb-2">
                    <span className="font-bold text-white uppercase text-[11px]">{t.navNotifications}</span>
                    <button
                      onClick={() => {
                        playClickSound();
                        markAllNotificationsRead();
                      }}
                      className="text-[10px] text-zinc-500 hover:text-zinc-300"
                    >
                      {t.navMarkAllRead}
                    </button>
                  </div>

                  <div className="space-y-1.5 max-h-60 overflow-y-auto">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        className="p-2 border border-zinc-800 bg-zinc-900/60 text-[11px] space-y-0.5"
                      >
                        <div className="flex justify-between font-bold text-zinc-200">
                          <span>{n.title}</span>
                          <span className="text-[9px] text-zinc-500">{n.timestamp}</span>
                        </div>
                        <p className="text-zinc-400 font-sans text-[11px] leading-tight">{n.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* User Profile or Guest Login Button */}
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => {
                  playClickSound();
                  setIsProfileOpen(!isProfileOpen);
                  setIsNotifOpen(false);
                }}
                className="w-7 h-7 bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-mono font-bold text-white transition-colors"
              >
                {user.name ? user.name.charAt(0) : "U"}
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-sm bg-[#121316] border border-zinc-700 shadow-xl p-3 z-50 font-mono text-xs space-y-2">
                  <div className="pb-2 border-b border-zinc-800">
                    <div className="font-bold text-white">{user.name || "Пользователь"}</div>
                    <div className="text-[10px] text-zinc-500 truncate">{user.email}</div>
                    <div className="text-[10px] text-orange-400 font-bold mt-0.5">
                      РОЛЬ: {user.role}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Link
                      href="/dashboard"
                      onClick={() => setIsProfileOpen(false)}
                      className="block px-2 py-1 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                    >
                      Личный кабинет
                    </Link>

                    <Link
                      href="/courier"
                      onClick={() => setIsProfileOpen(false)}
                      className="block px-2 py-1 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                    >
                      Панель курьера
                    </Link>

                    <Link
                      href="/admin"
                      onClick={() => setIsProfileOpen(false)}
                      className="block px-2 py-1 text-orange-400 hover:bg-zinc-800 font-bold"
                    >
                      Админ-панель
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-2 py-1 text-red-400 hover:bg-zinc-800 pt-1 border-t border-zinc-800"
                    >
                      {t.navLogout}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/auth/login"
              onClick={() => playClickSound()}
              className="px-2.5 py-1 text-xs font-mono text-zinc-300 hover:text-white bg-zinc-900 border border-zinc-800 hover:border-zinc-700 flex items-center gap-1.5 transition-colors"
            >
              <LogIn className="w-3.5 h-3.5 text-orange-500" />
              <span>{t.navLoginBtn}</span>
            </Link>
          )}

          {/* Primary CTA */}
          <Link
            href="/book"
            onClick={() => playClickSound()}
            className="gradient-btn px-3.5 py-1 text-xs font-mono font-bold flex items-center gap-1.5"
          >
            <span>{t.navOrderBtn}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          {/* Mobile Menu */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-1.5 rounded-sm text-zinc-400 hover:text-white hover:bg-zinc-800"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 py-3 bg-[#0C0D10] border-b border-zinc-800 font-mono text-xs space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-2 py-1.5 text-zinc-300 hover:text-white hover:bg-zinc-900"
            >
              {link.label}
            </Link>
          ))}
          {!isAuthenticated && (
            <Link
              href="/auth/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-2 py-1.5 text-orange-400 font-bold border-t border-zinc-800 pt-2"
            >
              {t.navLoginBtn}
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
