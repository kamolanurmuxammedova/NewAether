"use client";

import React, { useState } from "react";
import { formatCurrency } from "@/lib/utils";
import { useUserStore } from "@/store/use-user-store";
import { useOrderStore } from "@/store/use-order-store";
import { DeliveryMap } from "@/components/map/DeliveryMap";
import { playClickSound, playSuccessSound, playScannerBeep } from "@/lib/sound";
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
  Plus,
  RefreshCw,
  Download,
  Check,
  X,
  Compass,
} from "lucide-react";

interface AdminOrder {
  id: string;
  client: string;
  category: string;
  courier: string;
  status: "ЗАБОР ГРУЗА" | "В ПУТИ" | "ДОСТАВЛЕНО" | "ОТМЕНЕН";
  amount: number;
  corridor: string;
  eta: string;
}

interface AdminCourier {
  id: string;
  name: string;
  vehicle: string;
  rating: number;
  jobs: number;
  status: "ДОСТУПЕН" | "НА МАРШРУТЕ" | "НА ПЕРЕРЫВЕ";
  location: string;
}

export default function AdminHubPage() {
  const { user, switchRole, verifyAdminKey, isAdminVerified, setAdminVerified } = useUserStore();
  const [adminKey, setAdminKey] = useState("");
  const [keyError, setKeyError] = useState(false);

  const [activeTab, setActiveTab] = useState<
    "overview" | "orders" | "couriers" | "analytics" | "tariffs" | "logs"
  >("overview");
  const [orderFilter, setOrderFilter] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [orders, setOrders] = useState<AdminOrder[]>([
    {
      id: "AETH-982XF",
      client: "Александр Вэнс",
      category: "ELECTRONICS",
      courier: "Маркус Стерлинг",
      status: "В ПУТИ",
      amount: 43.5,
      corridor: "Москва Сити ➔ Тверская, 15",
      eta: "8 мин",
    },
    {
      id: "AETH-714ML",
      client: "Клара Крофт",
      category: "DOCUMENTS",
      courier: "Джулиан Де Врис",
      status: "ДОСТАВЛЕНО",
      amount: 23.0,
      corridor: "Ленинградский пр-т ➔ Хамовники",
      eta: "Доставлено",
    },
    {
      id: "AETH-309BC",
      client: "Vance Capital",
      category: "DOCUMENTS",
      courier: "Елена Ростова",
      status: "ЗАБОР ГРУЗА",
      amount: 38.0,
      corridor: "Кутузовский пр-т ➔ Арбат",
      eta: "14 мин",
    },
    {
      id: "AETH-882ZX",
      client: "Lumina Labs",
      category: "MEDICINE",
      courier: "Давид Стерлинг",
      status: "В ПУТИ",
      amount: 54.0,
      corridor: "Технопарк Сколково ➔ Клиника МЕДСИ",
      eta: "11 мин",
    },
    {
      id: "AETH-112QA",
      client: "Антуан Лоран",
      category: "FOOD",
      courier: "Сара Коннор",
      status: "ДОСТАВЛЕНО",
      amount: 28.5,
      corridor: "Ресторан White Rabbit ➔ Патриаршие",
      eta: "Доставлено",
    },
  ]);

  const [couriers, setCouriers] = useState<AdminCourier[]>([
    {
      id: "CUR-01",
      name: "Маркус Стерлинг",
      vehicle: "Cyber Scooter X",
      rating: 4.99,
      jobs: 1840,
      status: "НА МАРШРУТЕ",
      location: "Сити & Пресня",
    },
    {
      id: "CUR-02",
      name: "Джулиан Де Врис",
      vehicle: "Tesla Model S Fleet",
      rating: 4.98,
      jobs: 980,
      status: "ДОСТУПЕН",
      location: "Тверской район",
    },
    {
      id: "CUR-03",
      name: "Елена Ростова",
      vehicle: "Cargo E-Bike Pro",
      rating: 4.96,
      jobs: 742,
      status: "НА МАРШРУТЕ",
      location: "Замоскворечье",
    },
    {
      id: "CUR-04",
      name: "Давид Стерлинг",
      vehicle: "Quantum Air Drone",
      rating: 5.0,
      jobs: 420,
      status: "НА МАРШРУТЕ",
      location: "Воздушный коридор Сколково",
    },
  ]);

  const [baseFare, setBaseFare] = useState(12.0);
  const [kmRate, setKmRate] = useState(2.2);
  const [droneEnabled, setDroneEnabled] = useState(true);

  const [logs, setLogs] = useState([
    { id: 1, time: "15:42:10", type: "ROUTE", msg: "Зеленый коридор активирован для манифеста AETH-982XF на Тверской." },
    { id: 2, time: "15:38:02", type: "SECURITY", msg: "Одноразовый код подтвержден для AETH-714ML. Доставка завершена." },
    { id: 3, time: "15:22:40", type: "FINANCE", msg: "Автоматический клиринг GMV за 1-й час: $14,200.00 обработано." },
    { id: 4, time: "15:10:15", type: "FLEET", msg: "12 дронов передислоцированы в грузовой терминал Карго-Б." },
  ]);

  const [isAddCourierOpen, setIsAddCourierOpen] = useState(false);
  const [newCourierName, setNewCourierName] = useState("");
  const [newCourierVehicle, setNewCourierVehicle] = useState("Cyber Scooter Pro");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleElevateRole = (e: React.FormEvent) => {
    e.preventDefault();
    playClickSound();
    const ok = verifyAdminKey(adminKey.trim());
    if (ok) {
      playSuccessSound();
      setKeyError(false);
      showToast("Доступ администратора подтвержден.");
    } else {
      setKeyError(true);
    }
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: AdminOrder["status"]) => {
    playClickSound();
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    showToast(`Статус заказа ${orderId}: ${newStatus}`);
    setLogs((l) => [
      {
        id: Date.now(),
        time: new Date().toLocaleTimeString(),
        type: "ORDER",
        msg: `Статус манифеста ${orderId} изменен диспетчером на ${newStatus}.`,
      },
      ...l,
    ]);
  };

  const handleToggleCourierStatus = (courierId: string) => {
    playClickSound();
    setCouriers((prev) =>
      prev.map((c) => {
        if (c.id === courierId) {
          const next = c.status === "ДОСТУПЕН" ? "НА ПЕРЕРЫВЕ" : "ДОСТУПЕН";
          return { ...c, status: next };
        }
        return c;
      })
    );
    showToast("Статус курьера обновлен");
  };

  const handleAddCourierSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playClickSound();
    if (!newCourierName.trim()) return;

    const newC: AdminCourier = {
      id: `CUR-0${couriers.length + 1}`,
      name: newCourierName.trim(),
      vehicle: newCourierVehicle,
      rating: 5.0,
      jobs: 0,
      status: "ДОСТУПЕН",
      location: "Центральный Хаб",
    };

    setCouriers([newC, ...couriers]);
    setNewCourierName("");
    setIsAddCourierOpen(false);
    playSuccessSound();
    showToast(`Курьер ${newC.name} добавлен в флот.`);
  };

  const handleExportCSV = () => {
    playScannerBeep();
    const headers = "ID,Client,Category,Courier,Status,Amount,Corridor\n";
    const rows = orders
      .map(
        (o) =>
          `"${o.id}","${o.client}","${o.category}","${o.courier}","${o.status}",${o.amount},"${o.corridor}"`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `aether-manifest-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Манифест выгружен в CSV.");
  };

  const handleSaveTariffs = () => {
    playSuccessSound();
    showToast("Тарифные коэффициенты сохранены.");
  };

  const handleDeElevate = () => {
    playClickSound();
    setAdminVerified(false);
    switchRole("USER");
  };

  // Role Access Guard
  if (user.role !== "ADMIN" || !isAdminVerified) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center px-4 bg-[#0A0B0D]">
        <div className="w-full max-w-md p-6 rounded-md border border-zinc-800 bg-[#111215] text-center space-y-5 font-mono">
          <div className="w-12 h-12 bg-zinc-900 border border-zinc-700 text-orange-500 flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>

          <div className="space-y-1">
            <div className="text-[10px] uppercase tracking-wider text-orange-500">
              [ УРОВЕНЬ ДОСТУПА 04 ]
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              Административный терминал
            </h1>
            <p className="text-xs text-zinc-400 font-sans leading-relaxed">
              Управление заказами, тарифами и флотом требует ввода мастер-пароля администратора.
            </p>
          </div>

          <form onSubmit={handleElevateRole} className="space-y-3 pt-1">
            <div>
              <input
                type="password"
                value={adminKey}
                onChange={(e) => {
                  setAdminKey(e.target.value);
                  setKeyError(false);
                }}
                placeholder="Мастер-пароль (напр. admin)"
                className="w-full glass-input rounded-sm px-3 py-2 text-xs text-white text-center font-mono focus:border-orange-500"
              />
              {keyError && (
                <p className="text-[11px] text-red-400 mt-1 font-mono">
                  Неверный ключ. Используйте: admin
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full gradient-btn py-2 text-xs font-bold text-white flex items-center justify-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4" /> Авторизоваться в консоли
            </button>
          </form>

          <div className="pt-2 border-t border-zinc-800 flex justify-between items-center text-xs">
            <Link
              href="/auth/register"
              className="text-orange-400 hover:underline"
            >
              Регистрация администратора
            </Link>
            <Link
              href="/dashboard"
              className="text-zinc-400 hover:text-white inline-flex items-center gap-1"
            >
              В кабинет <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const filteredOrders = orders.filter((o) => {
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
    <div className="py-6 bg-[#0A0B0D] min-h-screen font-mono">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 right-6 z-50 bg-[#16171B] border border-orange-500 text-white text-xs px-3.5 py-2 rounded-sm shadow-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Admin Header */}
        <div className="p-5 rounded-md bg-[#111215] border border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500 flex items-center justify-center text-white font-bold">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-white">
                  Консоль управления AETHER
                </h1>
                <span className="text-[10px] px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  ONLINE
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                Администратор: <span className="text-white">{user.name}</span> ({user.email})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={handleExportCSV}
              className="gradient-btn px-3.5 py-1.5 text-xs font-bold text-white flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Выгрузить CSV</span>
            </button>

            <button
              onClick={handleDeElevate}
              className="px-3 py-1.5 rounded-sm bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 transition-colors"
            >
              Выйти из админки
            </button>
          </div>
        </div>

        {/* Global KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="p-4 rounded-md bg-[#111215] border border-zinc-800 space-y-1">
            <span className="text-[10px] text-zinc-500 uppercase block">Оборот GMV</span>
            <div className="text-2xl font-black text-white">$1,842,900</div>
            <span className="text-[10px] text-emerald-400 block">+24.8% прирост</span>
          </div>

          <div className="p-4 rounded-md bg-[#111215] border border-zinc-800 space-y-1">
            <span className="text-[10px] text-zinc-500 uppercase block">Рейсов в базе</span>
            <div className="text-2xl font-black text-white">{orders.length} заказов</div>
            <span className="text-[10px] text-zinc-400 block">Диспетчеризация онлайн</span>
          </div>

          <div className="p-4 rounded-md bg-[#111215] border border-zinc-800 space-y-1">
            <span className="text-[10px] text-zinc-500 uppercase block">Курьеров во флоте</span>
            <div className="text-2xl font-black text-orange-500">{couriers.length} операторов</div>
            <span className="text-[10px] text-emerald-400 block">
              {couriers.filter((c) => c.status !== "НА ПЕРЕРЫВЕ").length} на линии
            </span>
          </div>

          <div className="p-4 rounded-md bg-[#111215] border border-zinc-800 space-y-1">
            <span className="text-[10px] text-zinc-500 uppercase block">Точность SLA</span>
            <div className="text-2xl font-black text-white">99.98%</div>
            <span className="text-[10px] text-zinc-500 block">0 инцидентов</span>
          </div>
        </div>

        {/* Tabs Bar */}
        <div className="flex items-center gap-1.5 border-b border-zinc-800 pb-2 overflow-x-auto text-xs">
          {[
            { id: "overview", label: "Аналитика", icon: BarChart3 },
            { id: "orders", label: `Заказы (${orders.length})`, icon: Package },
            { id: "couriers", label: `Флот (${couriers.length})`, icon: Truck },
            { id: "tariffs", label: "Тарифы", icon: Sliders },
            { id: "analytics", label: "Радар", icon: MapPin },
            { id: "logs", label: `Логи (${logs.length})`, icon: ShieldAlert },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  playClickSound();
                  setActiveTab(tab.id as typeof activeTab);
                }}
                className={`px-3 py-1.5 rounded-sm font-bold flex items-center gap-1.5 whitespace-nowrap transition-all border ${
                  isActive
                    ? "bg-zinc-800 border-orange-500 text-white"
                    : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="p-6 rounded-md bg-[#111215] border border-zinc-800 space-y-4">
            <div className="flex justify-between items-center text-xs">
              <div>
                <h3 className="font-bold text-white text-sm">Выручка по месяцам (2026)</h3>
                <p className="text-zinc-400 text-[11px]">Обработанный объем заказов</p>
              </div>
              <span className="text-orange-500 font-bold">+$364k в этом квартале</span>
            </div>

            <div className="h-56 w-full">
              <svg viewBox="0 0 800 240" className="w-full h-full overflow-visible">
                <line x1="0" y1="40" x2="800" y2="40" stroke="rgba(255,255,255,0.05)" />
                <line x1="0" y1="100" x2="800" y2="100" stroke="rgba(255,255,255,0.05)" />
                <line x1="0" y1="160" x2="800" y2="160" stroke="rgba(255,255,255,0.05)" />
                <line x1="0" y1="220" x2="800" y2="220" stroke="rgba(255,255,255,0.05)" />

                <path
                  d="M 50 190 Q 150 160, 250 170 T 450 110 T 650 60 T 750 30"
                  fill="none"
                  stroke="#FF4D00"
                  strokeWidth="2.5"
                />

                {[
                  { cx: 50, cy: 190, label: "Янв ($820k)" },
                  { cx: 200, cy: 165, label: "Фев ($980k)" },
                  { cx: 350, cy: 140, label: "Мар ($1.15M)" },
                  { cx: 500, cy: 100, label: "Апр ($1.42M)" },
                  { cx: 650, cy: 60, label: "Май ($1.68M)" },
                  { cx: 750, cy: 30, label: "Июн ($1.84M)" },
                ].map((pt, i) => (
                  <g key={i}>
                    <circle cx={pt.cx} cy={pt.cy} r="4" fill="#FF4D00" stroke="#FFFFFF" strokeWidth="1.5" />
                    <text
                      x={pt.cx}
                      y={pt.cy - 10}
                      textAnchor="middle"
                      fill="#A1A4AC"
                      fontSize="9"
                      fontFamily="monospace"
                    >
                      {pt.label}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </div>
        )}

        {/* TAB 2: ORDERS MANAGER */}
        {activeTab === "orders" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="relative w-full sm:w-80">
                <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Поиск манифеста или клиента..."
                  className="w-full glass-input rounded-sm pl-9 pr-3 py-1.5 text-xs text-white"
                />
              </div>

              <div className="flex items-center gap-1 overflow-x-auto">
                {[
                  { id: "ALL", label: "Все" },
                  { id: "ЗАБОР ГРУЗА", label: "Забор" },
                  { id: "В ПУТИ", label: "В пути" },
                  { id: "ДОСТАВЛЕНО", label: "Доставлено" },
                  { id: "ОТМЕНЕН", label: "Отменен" },
                ].map((st) => (
                  <button
                    key={st.id}
                    onClick={() => {
                      playClickSound();
                      setOrderFilter(st.id);
                    }}
                    className={`px-2.5 py-1 text-[11px] border transition-colors ${
                      orderFilter === st.id
                        ? "bg-orange-500 border-orange-500 text-white font-bold"
                        : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white"
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-sm bg-[#111215] border border-zinc-800 overflow-x-auto text-xs">
              <table className="w-full text-left min-w-[700px]">
                <thead className="bg-zinc-900/80 border-b border-zinc-800 text-zinc-500 uppercase text-[10px]">
                  <tr>
                    <th className="p-3">Манифест #</th>
                    <th className="p-3">Клиент</th>
                    <th className="p-3">Маршрут</th>
                    <th className="p-3">Курьер</th>
                    <th className="p-3">Статус</th>
                    <th className="p-3">Сумма</th>
                    <th className="p-3 text-right">Действие</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/80 text-zinc-300">
                  {filteredOrders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-zinc-900/40">
                      <td className="p-3 font-bold text-white flex items-center gap-1.5">
                        <span>{ord.id}</span>
                        <Link href="/track" className="text-orange-400 hover:text-orange-300">
                          <Compass className="w-3 h-3" />
                        </Link>
                      </td>
                      <td className="p-3">{ord.client}</td>
                      <td className="p-3 truncate max-w-xs text-zinc-400">{ord.corridor}</td>
                      <td className="p-3 text-zinc-300">{ord.courier}</td>
                      <td className="p-3">
                        <span
                          className={`text-[9px] px-1.5 py-0.5 border ${
                            ord.status === "ДОСТАВЛЕНО"
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                              : ord.status === "ОТМЕНЕН"
                              ? "bg-red-500/10 text-red-400 border-red-500/30"
                              : "bg-orange-500/10 text-orange-400 border-orange-500/30"
                          }`}
                        >
                          {ord.status}
                        </span>
                      </td>
                      <td className="p-3 font-bold text-white">
                        {formatCurrency(ord.amount)}
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-1 text-[10px]">
                          {ord.status !== "В ПУТИ" && (
                            <button
                              onClick={() => handleUpdateOrderStatus(ord.id, "В ПУТИ")}
                              className="px-2 py-0.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700"
                            >
                              В путь
                            </button>
                          )}
                          {ord.status !== "ДОСТАВЛЕНО" && (
                            <button
                              onClick={() => handleUpdateOrderStatus(ord.id, "ДОСТАВЛЕНО")}
                              className="px-2 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-800 hover:bg-emerald-900"
                            >
                              Доставлен
                            </button>
                          )}
                          {ord.status !== "ОТМЕНЕН" && (
                            <button
                              onClick={() => handleUpdateOrderStatus(ord.id, "ОТМЕНЕН")}
                              className="px-2 py-0.5 bg-red-950 text-red-300 border border-red-800 hover:bg-red-900"
                            >
                              Отмена
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: COURIERS FLEET MANAGER */}
        {activeTab === "couriers" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center text-xs">
              <h2 className="font-bold text-white text-sm">Операторы флота ({couriers.length})</h2>
              <button
                onClick={() => {
                  playClickSound();
                  setIsAddCourierOpen(true);
                }}
                className="gradient-btn px-3 py-1.5 text-xs font-bold text-white flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ Добавить курьера</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {couriers.map((cur) => (
                <div
                  key={cur.id}
                  className="p-4 rounded-md bg-[#111215] border border-zinc-800 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-white">{cur.name}</h4>
                      <p className="text-[11px] text-zinc-400">{cur.vehicle}</p>
                    </div>
                    <button
                      onClick={() => handleToggleCourierStatus(cur.id)}
                      className={`text-[10px] px-2 py-0.5 border ${
                        cur.status === "НА ПЕРЕРЫВЕ"
                          ? "bg-zinc-800 text-zinc-400 border-zinc-700"
                          : "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                      }`}
                    >
                      {cur.status} ⇄
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-zinc-800 text-[11px]">
                    <div>
                      <span className="text-zinc-500 block text-[9px]">РЕЙТИНГ</span>
                      <span className="text-orange-400 font-bold">★ {cur.rating}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 block text-[9px]">РЕЙСЫ</span>
                      <span className="text-white">{cur.jobs}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 block text-[9px]">СЕКТОР</span>
                      <span className="text-zinc-300">{cur.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal */}
            {isAddCourierOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
                <div className="p-5 rounded-md border border-zinc-700 bg-[#141519] w-full max-w-sm space-y-3 text-xs">
                  <div className="flex justify-between items-center pb-2 border-b border-zinc-800">
                    <h3 className="font-bold text-white">Регистрация курьера во флот</h3>
                    <button onClick={() => setIsAddCourierOpen(false)} className="text-zinc-400 hover:text-white">
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <form onSubmit={handleAddCourierSubmit} className="space-y-3">
                    <div>
                      <label className="text-zinc-400 block mb-1">ФИО курьера</label>
                      <input
                        type="text"
                        required
                        value={newCourierName}
                        onChange={(e) => setNewCourierName(e.target.value)}
                        placeholder="Артем Васильев"
                        className="w-full glass-input px-3 py-1.5 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="text-zinc-400 block mb-1">Тип транспорта</label>
                      <select
                        value={newCourierVehicle}
                        onChange={(e) => setNewCourierVehicle(e.target.value)}
                        className="w-full glass-input px-3 py-1.5 text-xs text-white bg-[#111215]"
                      >
                        <option value="Cyber Scooter Pro">Cyber Scooter Pro</option>
                        <option value="Cargo E-Bike Extreme">Cargo E-Bike Extreme</option>
                        <option value="Tesla Model S Fast Delivery">Tesla Model S</option>
                        <option value="Quantum Cargo Drone">Quantum Cargo Drone</option>
                      </select>
                    </div>

                    <button type="submit" className="w-full gradient-btn py-2 text-xs font-bold text-white">
                      Подтвердить добавление
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: TARIFFS */}
        {activeTab === "tariffs" && (
          <div className="p-6 rounded-md bg-[#111215] border border-zinc-800 space-y-5 text-xs">
            <div>
              <h2 className="font-bold text-white text-sm">Тарифные ставки платформы</h2>
              <p className="text-zinc-400 text-[11px]">Калибровка базовой ставки и ставки за километр пути</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-sm border border-zinc-800 bg-zinc-900/60 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-300 font-bold">Базовая подача курьера</span>
                  <span className="text-orange-400 font-bold text-sm">${baseFare.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="30"
                  step="0.5"
                  value={baseFare}
                  onChange={(e) => {
                    playClickSound();
                    setBaseFare(parseFloat(e.target.value));
                  }}
                  className="w-full accent-orange-500 bg-zinc-800 h-1.5"
                />
              </div>

              <div className="p-4 rounded-sm border border-zinc-800 bg-zinc-900/60 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-300 font-bold">Ставка за километр пути</span>
                  <span className="text-white font-bold text-sm">${kmRate.toFixed(2)} / км</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="6"
                  step="0.1"
                  value={kmRate}
                  onChange={(e) => {
                    playClickSound();
                    setKmRate(parseFloat(e.target.value));
                  }}
                  className="w-full accent-orange-500 bg-zinc-800 h-1.5"
                />
              </div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-sm bg-zinc-900 border border-zinc-800">
              <div>
                <span className="font-bold text-white block">Воздушный коридор дронов</span>
                <span className="text-[10px] text-zinc-400">Автоматическое распределение при высокой загрузке</span>
              </div>
              <button
                onClick={() => {
                  playClickSound();
                  setDroneEnabled(!droneEnabled);
                }}
                className={`px-3 py-1 text-[10px] border ${
                  droneEnabled ? "bg-orange-500 text-white border-orange-500 font-bold" : "bg-zinc-800 text-zinc-400 border-zinc-700"
                }`}
              >
                {droneEnabled ? "ВКЛЮЧЕН" : "ОТКЛЮЧЕН"}
              </button>
            </div>

            <button
              onClick={handleSaveTariffs}
              className="gradient-btn px-5 py-2 text-xs font-bold text-white flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Сохранить параметры</span>
            </button>
          </div>
        )}

        {/* TAB 5: RADAR & REAL MAP */}
        {activeTab === "analytics" && (
          <div className="space-y-3">
            <h2 className="font-bold text-white text-sm">Интерактивный радар города</h2>
            <div className="p-3 rounded-md bg-[#111215] border border-zinc-800">
              <DeliveryMap
                pickup={{ lat: 55.751244, lng: 37.618423 }}
                dropoff={{ lat: 55.762312, lng: 37.632411 }}
                courierPos={{ lat: 55.756, lng: 37.625 }}
                courierName="Маркус Стерлинг"
                vehiclePlate="AETH-VIP77"
                eta="5 мин"
                distanceKm={3.8}
                interactive={true}
                className="h-[420px] w-full"
              />
            </div>
          </div>
        )}

        {/* TAB 6: LOGS */}
        {activeTab === "logs" && (
          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-white text-sm">Журнал безопасности и диспетчеризации</h2>
              <button
                onClick={() => {
                  playClickSound();
                  setLogs([]);
                  showToast("Журнал очищен");
                }}
                className="px-2.5 py-1 rounded-sm bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
              >
                Очистить
              </button>
            </div>

            <div className="p-4 rounded-md bg-[#111215] border border-zinc-800 text-zinc-400 space-y-2">
              {logs.length === 0 ? (
                <div className="text-zinc-600">Журнал пуст</div>
              ) : (
                logs.map((log) => (
                  <div key={log.id} className="flex items-center gap-2 text-[11px]">
                    <span className="text-orange-500">[{log.time}]</span>
                    <span className="text-white font-bold">{log.type}:</span>
                    <span>{log.msg}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
