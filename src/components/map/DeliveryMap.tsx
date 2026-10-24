"use client";

import React, { useEffect, useState } from "react";
import { Coordinates } from "@/types";
import { Zap, Layers } from "lucide-react";

interface DeliveryMapProps {
  pickup: Coordinates;
  dropoff: Coordinates;
  courierPos?: Coordinates;
  courierName?: string;
  vehiclePlate?: string;
  eta?: string;
  distanceKm?: number;
  interactive?: boolean;
  onMapClick?: (coords: Coordinates) => void;
  className?: string;
}

export function DeliveryMap({
  pickup,
  dropoff,
  courierPos,
  courierName = "Юлиан Де Врис",
  vehiclePlate = "NY-VIP88",
  eta = "14 мин",
  distanceKm = 4.2,
  className = "h-[450px] w-full",
}: DeliveryMapProps) {
  const [zoomLevel, setZoomLevel] = useState(14);
  const [trafficMode, setTrafficMode] = useState<"standard" | "satellite" | "telemetry">("telemetry");
  const [pulseAngle, setPulseAngle] = useState(0);

  // Calculate midpoints and bounding box for realistic SVG projection
  const minLat = Math.min(pickup.lat, dropoff.lat, courierPos?.lat ?? pickup.lat) - 0.006;
  const maxLat = Math.max(pickup.lat, dropoff.lat, courierPos?.lat ?? pickup.lat) + 0.006;
  const minLng = Math.min(pickup.lng, dropoff.lng, courierPos?.lng ?? pickup.lng) - 0.008;
  const maxLng = Math.max(pickup.lng, dropoff.lng, courierPos?.lng ?? pickup.lng) + 0.008;

  const project = (coords: Coordinates) => {
    const x = ((coords.lng - minLng) / (maxLng - minLng || 0.01)) * 800 + 100;
    const y = 500 - ((coords.lat - minLat) / (maxLat - minLat || 0.01)) * 400 - 50;
    return { x: Math.max(50, Math.min(950, x)), y: Math.max(50, Math.min(450, y)) };
  };

  const p1 = project(pickup);
  const p2 = project(dropoff);
  const cPos = courierPos ? project(courierPos) : { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };

  // Generate intermediate bezier curve route to mimic urban road grid
  const midX = (p1.x + p2.x) / 2 + 40;
  const midY = (p1.y + p2.y) / 2 - 35;
  const routePath = `M ${p1.x} ${p1.y} Q ${midX} ${midY} ${p2.x} ${p2.y}`;

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseAngle((a) => (a + 4) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative overflow-hidden rounded-3xl border border-white/10 bg-[#09090B] shadow-2xl ${className}`}>
      {/* Dark / Light Ambient Grid Vector Map */}
      <svg
        viewBox="0 0 1000 500"
        className="w-full h-full object-cover select-none"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="50%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#6366F1" />
          </linearGradient>

          <pattern id="urbanGrid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            <circle cx="0" cy="0" r="1.5" fill="rgba(255,255,255,0.07)" />
          </pattern>

          <filter id="glowRoute" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Street Network Texture */}
        <rect width="100%" height="100%" fill="#0C0D12" className="delivery-map-bg transition-colors" />
        <rect width="100%" height="100%" fill="url(#urbanGrid)" />

        {/* Major Arteries / Roads */}
        <g stroke="rgba(255,255,255,0.06)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" className="delivery-map-road">
          <path d="M -50 140 C 200 120, 450 180, 1050 150" />
          <path d="M -50 380 C 300 360, 600 420, 1050 370" />
          <path d="M 280 -50 C 310 200, 270 380, 290 550" />
          <path d="M 720 -50 C 700 200, 740 380, 710 550" />
        </g>

        {/* Secondary Avenues */}
        <g stroke="rgba(255,255,255,0.025)" strokeWidth="3" className="delivery-map-avenue">
          <line x1="0" y1="240" x2="1000" y2="240" />
          <line x1="0" y1="460" x2="1000" y2="460" />
          <line x1="500" y1="0" x2="500" y2="500" />
          <line x1="150" y1="0" x2="150" y2="500" />
          <line x1="850" y1="0" x2="850" y2="500" />
        </g>

        {/* Traffic Green-Wave Corridor (Simulated) */}
        <path
          d={routePath}
          fill="none"
          stroke="rgba(16, 185, 129, 0.15)"
          strokeWidth="16"
          strokeLinecap="round"
        />

        {/* Main Glowing Delivery Route */}
        <path
          d={routePath}
          fill="none"
          stroke="url(#routeGradient)"
          strokeWidth="5"
          strokeLinecap="round"
          filter="url(#glowRoute)"
        />

        {/* Animated Dashed Pulse Line */}
        <path
          d={routePath}
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeDasharray="6, 12"
          strokeDashoffset={-pulseAngle * 1.5}
          strokeLinecap="round"
          opacity="0.9"
        />

        {/* Pickup Location Marker */}
        <g transform={`translate(${p1.x}, ${p1.y})`}>
          <circle r="22" fill="#10B981" fillOpacity="0.15" />
          <circle r="12" fill="#10B981" fillOpacity="0.3" />
          <circle r="6" fill="#10B981" />
          <text
            x="0"
            y="-18"
            textAnchor="middle"
            fill="#10B981"
            fontSize="10"
            fontWeight="700"
            letterSpacing="1"
          >
            ОТПРАВЛЕНИЕ
          </text>
        </g>

        {/* Dropoff Location Marker */}
        <g transform={`translate(${p2.x}, ${p2.y})`}>
          <circle r="24" fill="#6366F1" fillOpacity="0.15" />
          <circle r="14" fill="#6366F1" fillOpacity="0.35" />
          <circle r="6" fill="#6366F1" />
          <text
            x="0"
            y="-18"
            textAnchor="middle"
            fill="#818CF8"
            fontSize="10"
            fontWeight="700"
            letterSpacing="1"
          >
            НАЗНАЧЕНИЕ
          </text>
        </g>

        {/* Real-time Courier Position Marker */}
        <g transform={`translate(${cPos.x}, ${cPos.y})`}>
          {/* Radar Waves */}
          <circle
            r="32"
            fill="none"
            stroke="#7C3AED"
            strokeWidth="1.5"
            strokeOpacity="0.6"
            className="animate-radar"
          />
          <circle r="16" fill="#7C3AED" fillOpacity="0.4" />
          <circle r="10" fill="#7C3AED" />
          <polygon
            points="0,-8 6,6 0,3 -6,6"
            fill="#FFFFFF"
            transform="rotate(45)"
          />
        </g>
      </svg>

      {/* Top Floating Telemetry Bar */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 bg-[#111217]/90 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/10 shadow-lg pointer-events-auto">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-semibold text-zinc-200 uppercase tracking-wider">
              Телеметрия Aether
            </span>
          </div>
          <span className="text-zinc-600">|</span>
          <span className="text-xs font-mono text-emerald-400">Зеленый коридор активен</span>
        </div>

        <div className="flex items-center gap-2 bg-[#111217]/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 shadow-lg pointer-events-auto">
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-xs font-bold text-white tracking-wide">ETA {eta}</span>
          <span className="text-xs text-zinc-400">({distanceKm} км)</span>
        </div>
      </div>

      {/* Bottom Floating Courier Card */}
      <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row items-center justify-between gap-3 pointer-events-none">
        <div className="bg-[#111217]/95 backdrop-blur-xl px-4 py-3 rounded-2xl border border-white/10 shadow-2xl flex items-center gap-3 pointer-events-auto w-full sm:w-auto">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
              {courierName.charAt(0)}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[#111217]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-white">{courierName}</span>
              <span className="text-[10px] bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded-full font-semibold border border-purple-500/30">
                VIP Флот
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 font-mono">{vehiclePlate} • Cyber Rider</p>
          </div>
        </div>

        {/* Map Layers & Controls */}
        <div className="flex items-center gap-1.5 bg-[#111217]/90 backdrop-blur-md p-1.5 rounded-2xl border border-white/10 shadow-lg pointer-events-auto self-end sm:self-auto">
          <button
            type="button"
            onClick={() => setTrafficMode(trafficMode === "telemetry" ? "standard" : "telemetry")}
            className="px-3 py-1.5 rounded-xl text-xs font-medium bg-white/5 hover:bg-white/10 text-zinc-300 transition-colors flex items-center gap-1.5"
          >
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            <span>Слои пробок</span>
          </button>
          <div className="h-4 w-[1px] bg-white/10 mx-0.5" />
          <button
            type="button"
            aria-label="Приблизить"
            onClick={() => setZoomLevel((z) => Math.min(18, z + 1))}
            className="w-7 h-7 rounded-xl flex items-center justify-center bg-white/5 hover:bg-white/10 text-white font-bold text-sm transition-colors"
          >
            +
          </button>
          <button
            type="button"
            aria-label="Отдалить"
            onClick={() => setZoomLevel((z) => Math.max(10, z - 1))}
            className="w-7 h-7 rounded-xl flex items-center justify-center bg-white/5 hover:bg-white/10 text-white font-bold text-sm transition-colors"
          >
            -
          </button>
        </div>
      </div>
    </div>
  );
}
