"use client";

import React, { useState } from "react";
import { formatCurrency } from "@/lib/utils";
import { useUserStore } from "@/store/use-user-store";
import Link from "next/link";
import {
  ShieldAlert,
  TrendingUp,
  Users,
  Truck,
  Package,
  DollarSign,
  Activity,
  Layers,
  MapPin,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  FileText,
  BarChart3,
  Sliders,
  Sparkles,
  Zap,
  Lock,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export default function AdminHubPage() {
  const { user, switchRole } = useUserStore();
  const [adminKey, setAdminKey] = useState("");
  const [keyError, setKeyError] = useState(false);

  const [activeTab, setActiveTab] = useState<
    "overview" | "orders" | "couriers" | "analytics" | "logs"
  >("overview");
  const [orderFilter, setOrderFilter] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  const handleElevateRole = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminKey === "AETHER-ADMIN-2026" || adminKey.toLowerCase() === "admin") {
      switchRole("ADMIN");
      setKeyError(false);
    } else {
      setKeyError(true);
    }
  };

  // Role Access Guard
  if (user.role !== "ADMIN") {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 bg-[#09090B] relative overflow-hidden">
        <div className="ambient-glow top-1/3 left-1/3 w-[500px] h-[350px] bg-red-600/10" />

        <div className="w-full max-w-md glass-card rounded-3xl p-8 border border-white/10 shadow-2xl text-center space-y-6 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center mx-auto shadow-lg">
            <Lock className="w-7 h-7" />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-red-400">
              Ограниченный доступ • Уровень безопасности 4
            </span>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Административный барьер доступа
            </h1>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Ваш аккаунт <span className="text-white font-mono">{user.email}</span> авторизован с привилегиями <span className="text-purple-400 font-bold">{user.role}</span>. Доступ к панели глобального управления требует подтвержденных прав администратора.
            </p>
          </div>

          <form onSubmit={handleElevateRole} className="space-y-3 pt-2">
            <div>
              <input
                type="password"
                value={adminKey}
                onChange={(e) => {
                  setAdminKey(e.target.value);
                  setKeyError(false);
                }}
                placeholder="Введите мастер-ключ (напр. admin)"
                className="w-full glass-input rounded-xl px-4 py-2.5 text-xs text-white text-center font-mono focus:border-red-500"
              />
              {keyError && (
                <p className="text-[11px] text-red-400 mt-1.5 font-mono">
                  Неверный токен допуска безопасности.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full gradient-btn py-2.5 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-1.5 shadow-lg"
            >
              <ShieldCheck className="w-4 h-4" /> Авторизоваться как Администратор
            </button>
          </form>

          <div className="pt-2 border-t border-white/5">
            <Link
              href="/dashboard"
              className="text-xs text-zinc-400 hover:text-white inline-flex items-center gap-1"
            >
              Вернуться в личный кабинет <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const mockAdminOrders = [
    {
      id: "AETH-982XF",
      client: "Александр Вэнс",
      category: "ELECTRONICS",
      courier: "Маркус Стерлинг",
      status: "В ПУТИ",
      amount: 43.5,
      corridor: "Apple 5-я Авеню ➔ Парк Авеню, 740",
      eta: "8 мин",
    },
    {
      id: "AETH-714ML",
      client: "Клара Крофт",
      category: "DOCUMENTS",
      courier: "Джулиан Де Врис",
      status: "ДОСТАВЛЕНО",
      amount: 23.0,
      corridor: "Бродвей, 520 ➔ Хадсон Ярдс, 30",
      eta: "Доставлено",
    },
    {
      id: "AETH-309BC",
      client: "Vance Capital",
      category: "DOCUMENTS",
      courier: "Елена Ростова",
      status: "ЗАБОР ГРУЗА",
      amount: 38.0,
      corridor: "Уолл-Стрит ➔ Мидтаун Ист",
      eta: "14 мин",
    },
    {
      id: "AETH-882ZX",
      client: "Lumina Labs",
      category: "MEDICINE",
      courier: "Давид Стерлинг",
      status: "В ПУТИ",
      amount: 54.0,
      corridor: "Лабораторный комплекс ➔ Гора Синай",
      eta: "11 мин",
    },
    {
      id: "AETH-112QA",
      client: "Антуан Лоран",
      category: "FOOD",
      courier: "Сара Коннор",
      status: "ДОСТАВЛЕНО",
      amount: 28.5,
      corridor: "Ресторан L'Horizon ➔ Сентрал Парк Юг",
      eta: "Доставлено",
    },
  ];

  const mockCouriers = [
    {
      id: "CUR-01",
      name: "Маркус Стерлинг",
      vehicle: "Cyber Scooter X",
      rating: 4.99,
      jobs: 1840,
      status: "НА МАРШРУТЕ",
      location: "Верхний Ист-Сайд",
    },
    {
      id: "CUR-02",
      name: "Джулиан Де Врис",
      vehicle: "Tesla Model S Fleet",
      rating: 4.98,
      jobs: 980,
      status: "ДОСТУПЕН",
      location: "Техно-хаб Сохо",
    },
    {
      id: "CUR-03",
      name: "Елена Ростова",
      vehicle: "Cargo E-Bike Pro",
      rating: 4.96,
      jobs: 742,
      status: "ЗАБОР ГРУЗА",
      location: "Финансовый квартал",
    },
    {
      id: "CUR-04",
      name: "Давид Стерлинг",
      vehicle: "Quantum Air Drone",
      rating: 5.0,
      jobs: 420,
      status: "НА МАРШРУТЕ",
      location: "Воздушный коридор Мидтауна",
    },
  ];

  const filteredOrders = mockAdminOrders.filter((o) => {
    if (orderFilter !== "ALL" && o.status !== orderFilter) return false;
    if (
      searchTerm &&
      !o.id.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !o.client.toLowerCase().includes(searchTerm.toLowerCase())
    )
      return false;
    return true;
  });

  return (
    <div className="py-8 bg-[#09090B] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Admin Header */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#15161F] via-[#101116] to-[#161724] border border-white/10 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white font-extrabold text-2xl shadow-xl shadow-purple-600/30">
              <Zap className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-white">
                  Центр управления и телеметрии
                </h1>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Управление флотом
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-1 font-mono">
                Статус системы: 100% Штатно • 418 активных коридоров в режиме реального времени
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => alert("Формирование корпоративного аудита логистики в PDF...")}
              className="gradient-btn px-5 py-2.5 rounded-2xl text-xs font-bold text-white flex items-center gap-2 shadow-lg"
            >
              <FileText className="w-4 h-4" />
              <span>Экспорт манифеста аудита</span>
            </button>
          </div>
        </div>

        {/* Global KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-6 rounded-3xl bg-[#111217] border border-white/5 space-y-2">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">
              Месячный оборот GMV
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
              $1,842,900
            </div>
            <span className="text-[11px] text-emerald-400 font-mono block">
              +24.8% прирост за месяц
            </span>
          </div>

          <div className="p-6 rounded-3xl bg-[#111217] border border-white/5 space-y-2">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">
              Рейсы и коридоры в движении
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-indigo-400 font-mono">
              418 на маршруте
            </div>
            <span className="text-[11px] text-zinc-400 block">Ср. назначение: 38 сек</span>
          </div>

          <div className="p-6 rounded-3xl bg-[#111217] border border-white/5 space-y-2">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">
              Загрузка активного флота
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-purple-400 font-mono">
              94.2%
            </div>
            <span className="text-[11px] text-emerald-400 block">1 240 курьеров на линии</span>
          </div>

          <div className="p-6 rounded-3xl bg-[#111217] border border-white/5 space-y-2">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">
              Надежность сети по SLA
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
              99.98%
            </div>
            <span className="text-[11px] text-zinc-500 block">0 страховых исков Lloyd&apos;s</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-2 overflow-x-auto">
          {[
            { id: "overview", label: "Сводная аналитика", icon: BarChart3 },
            { id: "orders", label: "Телеметрия заказов", icon: Package },
            { id: "couriers", label: "Флот и курьеры", icon: Truck },
            { id: "analytics", label: "Коридоры и карта", icon: MapPin },
            { id: "logs", label: "Журнал аудита", icon: ShieldAlert },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-purple-600/30 border border-purple-500/40 text-white shadow-md shadow-purple-600/20"
                    : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: EXECUTIVE ANALYTICS */}
        {activeTab === "overview" && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* SVG Revenue Chart */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#111217] border border-white/5 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-white">
                    Динамика выручки и объем коридоров (2026)
                  </h3>
                  <p className="text-xs text-zinc-400">Суммарный обработанный GMV по 14 мегаполисам мира</p>
                </div>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 self-start sm:self-auto">
                  +$364k в этом квартале
                </span>
              </div>

              {/* Vector SVG Chart */}
              <div className="h-64 w-full relative">
                <svg viewBox="0 0 800 240" className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal grid lines */}
                  <line x1="0" y1="40" x2="800" y2="40" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
                  <line x1="0" y1="100" x2="800" y2="100" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
                  <line x1="0" y1="160" x2="800" y2="160" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
                  <line x1="0" y1="220" x2="800" y2="220" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />

                  {/* Area fill */}
                  <path
                    d="M 50 190 Q 150 160, 250 170 T 450 110 T 650 60 T 750 30 L 750 220 L 50 220 Z"
                    fill="url(#chartGradient)"
                  />

                  {/* Smooth line */}
                  <path
                    d="M 50 190 Q 150 160, 250 170 T 450 110 T 650 60 T 750 30"
                    fill="none"
                    stroke="#818CF8"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />

                  {/* Datapoints */}
                  {[
                    { cx: 50, cy: 190, label: "Янв ($820k)" },
                    { cx: 200, cy: 165, label: "Фев ($980k)" },
                    { cx: 350, cy: 140, label: "Мар ($1.15M)" },
                    { cx: 500, cy: 100, label: "Апр ($1.42M)" },
                    { cx: 650, cy: 60, label: "Май ($1.68M)" },
                    { cx: 750, cy: 30, label: "Июн ($1.84M)" },
                  ].map((pt, i) => (
                    <g key={i}>
                      <circle cx={pt.cx} cy={pt.cy} r="5" fill="#7C3AED" stroke="#FFFFFF" strokeWidth="2" />
                      <text
                        x={pt.cx}
                        y={pt.cy - 12}
                        textAnchor="middle"
                        fill="#A1A1AA"
                        fontSize="10"
                        fontFamily="monospace"
                      >
                        {pt.label}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>
            </div>

            {/* Category Share & City Heatmap breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-3xl bg-[#111217] border border-white/5 space-y-4">
                <h4 className="text-sm font-bold text-white">Объем по категориям грузов</h4>
                <div className="space-y-3 text-xs font-mono">
                  {[
                    { name: "Электроника и гаджеты", pct: "38%", color: "bg-purple-500" },
                    { name: "Секретные документы", pct: "24%", color: "bg-indigo-500" },
                    { name: "Ресторанные блюда (термо)", pct: "16%", color: "bg-blue-500" },
                    { name: "Фармацевтика холодовой цепи", pct: "12%", color: "bg-emerald-500" },
                    { name: "Хрупкое искусство и прочее", pct: "10%", color: "bg-amber-500" },
                  ].map((c) => (
                    <div key={c.name} className="space-y-1">
                      <div className="flex justify-between text-zinc-300">
                        <span>{c.name}</span>
                        <span className="text-white font-bold">{c.pct}</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                        <div style={{ width: c.pct }} className={`h-full ${c.color} rounded-full`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-[#111217] border border-white/5 space-y-4">
                <h4 className="text-sm font-bold text-white">Топ мегаполисов по объёму</h4>
                <div className="space-y-3 text-xs">
                  {[
                    { city: "Нью-Йорк (Манхэттен-Бруклин)", active: "142 активно", volume: "$680k", status: "Оптимально" },
                    { city: "Лондон (Мейфэр-Сити)", active: "88 активно", volume: "$420k", status: "Оптимально" },
                    { city: "Токио (Минато-Сибуя)", active: "94 активно", volume: "$390k", status: "Оптимально" },
                    { city: "Париж (1-й—8-й округ)", active: "52 активно", volume: "$210k", status: "Оптимально" },
                    { city: "Дубай (DIFC-Марина)", active: "42 активно", volume: "$142k", status: "Оптимально" },
                  ].map((metro) => (
                    <div
                      key={metro.city}
                      className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between"
                    >
                      <div>
                        <div className="font-bold text-white">{metro.city}</div>
                        <div className="text-[10px] text-zinc-500 font-mono">{metro.active}</div>
                      </div>
                      <div className="text-right font-mono">
                        <div className="font-bold text-emerald-400">{metro.volume}</div>
                        <div className="text-[10px] text-indigo-400">{metro.status}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ORDERS MANAGER */}
        {activeTab === "orders" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Поиск по манифесту или клиенту..."
                  className="w-full glass-input rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white"
                />
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto overflow-x-auto">
                {[
                  { id: "ALL", label: "Все" },
                  { id: "В ПУТИ", label: "В пути" },
                  { id: "ДОСТАВЛЕНО", label: "Доставлено" },
                  { id: "ЗАБОР ГРУЗА", label: "Забор" },
                ].map((st) => (
                  <button
                    key={st.id}
                    onClick={() => setOrderFilter(st.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                      orderFilter === st.id
                        ? "bg-purple-600 text-white"
                        : "bg-white/5 text-zinc-400 hover:text-white"
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-[#111217] border border-white/5 overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[600px]">
                <thead className="bg-white/[0.02] border-b border-white/5 text-zinc-500 font-mono uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-4">Манифест #</th>
                    <th className="p-4">Клиент</th>
                    <th className="p-4">Коридор</th>
                    <th className="p-4">Назначенный флот</th>
                    <th className="p-4">Статус</th>
                    <th className="p-4 font-mono">Сумма</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-zinc-300">
                  {filteredOrders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-4 font-mono font-bold text-white">{ord.id}</td>
                      <td className="p-4">{ord.client}</td>
                      <td className="p-4 truncate max-w-xs text-zinc-400">{ord.corridor}</td>
                      <td className="p-4">{ord.courier}</td>
                      <td className="p-4">
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                            ord.status === "ДОСТАВЛЕНО"
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                              : "bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
                          }`}
                        >
                          {ord.status}
                        </span>
                      </td>
                      <td className="p-4 font-mono font-bold text-white">
                        {formatCurrency(ord.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: COURIERS */}
        {activeTab === "couriers" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <h2 className="text-xl font-bold text-white">Активный транспорт и операторы флота</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockCouriers.map((cur) => (
                <div
                  key={cur.id}
                  className="p-6 rounded-3xl bg-[#111217] border border-white/5 hover:border-purple-500/30 transition-all space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white">{cur.name}</h4>
                      <p className="text-xs text-zinc-400 font-mono">{cur.vehicle}</p>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                      {cur.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-xs pt-2 border-t border-white/5 font-mono">
                    <div>
                      <span className="text-zinc-500 block text-[10px]">РЕЙТИНГ</span>
                      <span className="text-amber-400 font-bold">★ {cur.rating}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 block text-[10px]">РЕЙСЫ</span>
                      <span className="text-white">{cur.jobs}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 block text-[10px]">СЕКТОР</span>
                      <span className="text-zinc-300">{cur.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: CITY CORRIDORS */}
        {activeTab === "analytics" && (
          <div className="p-8 rounded-3xl bg-[#111217] border border-white/5 space-y-6 animate-in fade-in duration-300">
            <h2 className="text-xl font-bold text-white">Телеметрия автономных зеленых коридоров</h2>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-2xl">
              Синхронизация светофорной инфраструктуры непрерывно калибруется через прямое интеграционное API города. Курьеры двигаются без остановок по выделенным высокоскоростным магистралям «зеленой волны».
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                <span className="text-zinc-500 block text-[10px]">ПРИОРИТЕТ СВЕТОФОРОВ</span>
                <span className="text-emerald-400 font-bold text-sm">Активен (99.4% проход)</span>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                <span className="text-zinc-500 block text-[10px]">СРЕДНЯЯ СКОРОСТЬ В КОРИДОРЕ</span>
                <span className="text-white font-bold text-sm">41.2 км/ч</span>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                <span className="text-zinc-500 block text-[10px]">ВОЗДУШНЫЕ СЛОТЫ ДРОНОВ</span>
                <span className="text-indigo-400 font-bold text-sm">38 слотов (бета)</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: AUDIT LOGS */}
        {activeTab === "logs" && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <h2 className="text-xl font-bold text-white">Криптографический журнал аудита и безопасности</h2>
            <div className="p-6 rounded-3xl bg-[#111217] border border-white/5 font-mono text-xs text-zinc-400 space-y-2.5">
              <div className="flex items-center gap-3">
                <span className="text-emerald-400">[2026-10-20 00:28:14]</span>
                <span className="text-white">CORRIDOR_LOCK_SUCCESS:</span>
                <span>Зеленая волна активирована для манифеста AETH-982XF на 5-й Авеню.</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-indigo-400">[2026-10-20 00:24:02]</span>
                <span className="text-white">BIOMETRIC_HANDOVER_VERIFIED:</span>
                <span>Лицо получателя заказа AETH-714ML подтверждено. Смарт-бокс открыт.</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-purple-400">[2026-10-20 00:19:40]</span>
                <span className="text-white">STRIPE_VAULT_SETTLEMENT:</span>
                <span>Депозит $500.00 зачислен на счет usr_vance_01. Комиссия: $0.00.</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-emerald-400">[2026-10-20 00:11:55]</span>
                <span className="text-white">FLEET_REBALANCING_EXECUTED:</span>
                <span>14 кибер-скутеров направлены в район Трайбека на вечерний пик.</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
