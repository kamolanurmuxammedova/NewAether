"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { DeliveryMap } from "@/components/map/DeliveryMap";
import { Coordinates } from "@/types";
import { motion } from "framer-motion";
import { ArrowRight, Radio, Eye } from "lucide-react";

export function LivePreviewSection() {
  const pickup: Coordinates = { lat: 40.7638, lng: -73.973 };
  const dropoff: Coordinates = { lat: 40.7711, lng: -73.9634 };

  const [courierPos, setCourierPos] = useState<Coordinates>({
    lat: 40.766,
    lng: -73.97,
  });

  useEffect(() => {
    let progress = 0.35;
    const interval = setInterval(() => {
      progress += 0.02;
      if (progress > 0.85) progress = 0.2;
      setCourierPos({
        lat: pickup.lat + (dropoff.lat - pickup.lat) * progress,
        lng: pickup.lng + (dropoff.lng - pickup.lng) * progress,
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [pickup.lat, pickup.lng, dropoff.lat, dropoff.lng]);

  return (
    <section className="py-16 md:py-24 bg-[#0A0B0D] border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 font-mono">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-orange-500/10 border border-orange-500/30 text-orange-400 text-[10px] uppercase">
              <Radio className="w-3 h-3 animate-pulse" />
              <span>СПУТНИКОВАЯ ТЕЛЕМЕТРИЯ 24/7</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-sans">
              Движение флота <span className="text-orange-500">в прямом эфире</span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-sans">
              Непрерывная передача субметровых GPS-координат и динамическая калибровка зеленой волны.
            </p>
          </div>

          <Link
            href="/track"
            className="gradient-btn px-4 py-2.5 text-xs font-bold text-white flex items-center gap-1.5 self-start md:self-auto"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Открыть радар</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Embedded Map Visual */}
        <div className="p-3 rounded-md bg-[#111215] border border-zinc-800 overflow-hidden">
          <DeliveryMap
            pickup={pickup}
            dropoff={dropoff}
            courierPos={courierPos}
            courierName="Маркус Стерлинг"
            vehiclePlate="NY-VIP88"
            eta="12 мин"
            distanceKm={3.8}
            interactive={true}
            className="h-[420px] w-full"
          />
        </div>
      </div>
    </section>
  );
}
