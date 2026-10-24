"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CourierCursor() {
  const [enabled, setEnabled] = useState(true);
  const [cursorMode, setCursorMode] = useState<"car" | "drone" | "crosshair">("car");
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [angle, setAngle] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (typeof window === "undefined") return;
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      setIsTouch(true);
      return;
    }

    const saved = localStorage.getItem("aether_cursor_mode");
    if (saved) {
      if (saved === "off") setEnabled(false);
      else setCursorMode(saved as "car" | "drone" | "crosshair");
    }

    let lastX = 0;
    let lastY = 0;
    let lastTime = performance.now();

    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      const dt = Math.max(1, now - lastTime);
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const spd = Math.round((dist / dt) * 1000);

      if (dist > 3) {
        const rad = Math.atan2(dy, dx);
        setAngle((rad * 180) / Math.PI);
      }

      setSpeed(Math.min(999, spd));
      setPos({ x: e.clientX, y: e.clientY });

      lastX = e.clientX;
      lastY = e.clientY;
      lastTime = now;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!isClient || isTouch || !enabled) return null;

  return (
    <>
      {/* Floating Cursor Body */}
      <div
        className="pointer-events-none fixed z-50 transition-transform duration-75 ease-out select-none"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="relative flex items-center justify-center">
          {/* Radar ping ring when moving fast */}
          {speed > 400 && (
            <div className="absolute w-12 h-12 rounded-full border border-purple-500/40 animate-ping" />
          )}

          {/* Vehicle Icon rotated */}
          <div
            className="w-8 h-8 rounded-full bg-zinc-950/90 border border-purple-500/60 shadow-lg shadow-purple-500/20 backdrop-blur-md flex items-center justify-center text-white transition-transform duration-100"
            style={{ transform: `rotate(${angle}deg)` }}
          >
            {cursorMode === "car" && (
              <span className="text-xs">🏎️</span>
            )}
            {cursorMode === "drone" && (
              <span className="text-xs">🛸</span>
            )}
            {cursorMode === "crosshair" && (
              <div className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse" />
            )}
          </div>

          {/* Speed Telemetry Badge */}
          <div className="absolute left-9 top-0 bg-black/85 backdrop-blur-md border border-white/10 rounded-md px-1.5 py-0.5 text-[9px] font-mono text-purple-300 flex items-center gap-1 whitespace-nowrap shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{speed} px/s</span>
          </div>
        </div>
      </div>
    </>
  );
}
