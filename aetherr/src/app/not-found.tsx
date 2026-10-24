import Link from "next/link";
import { Zap, Compass, ArrowRight, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 bg-[#09090B] relative overflow-hidden text-center">
      <div className="ambient-glow top-1/3 left-1/3 w-[500px] h-[350px] bg-purple-600/15" />

      <div className="max-w-lg space-y-6 relative z-10">
        <div className="w-16 h-16 rounded-3xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-indigo-400 mx-auto shadow-xl">
          <Compass className="w-8 h-8 animate-spin" style={{ animationDuration: "12s" }} />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-indigo-400">
            Ошибка 404 • Отклонение координат
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Маршрут не найден
          </h1>
          <p className="text-sm text-zinc-400 max-w-sm mx-auto leading-relaxed">
            Запрошенная путевая точка отсутствует в городской координатной сетке или маршрут был перенаправлен.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="gradient-btn px-6 py-3 rounded-2xl text-xs font-bold text-white flex items-center gap-2 shadow-lg"
          >
            <Home className="w-4 h-4" /> На главную страницу
          </Link>
          <Link
            href="/track"
            className="px-5 py-3 rounded-2xl text-xs font-semibold text-zinc-300 hover:text-white bg-white/[0.04] border border-white/10 transition-colors"
          >
            Открыть радар доставки
          </Link>
        </div>
      </div>
    </div>
  );
}
