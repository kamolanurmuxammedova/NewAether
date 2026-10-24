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

  // Courier coordinates animated between pickup and dropoff
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
    <section className="py-24 bg-[#09090B] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>Спутниковая телеметрия в реальном времени</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Движение флота <br />
              <span className="gradient-accent-text">в прямом эфире</span>
            </h2>
            <p className="text-sm text-zinc-400">
              Полная прозрачность. Непрерывная передача субметровых координат с динамическим пересчетом коридора и зеленой волной светофоров.
            </p>
          </div>

          <Link
            href="/track"
            className="gradient-btn px-6 py-3.5 rounded-2xl text-xs font-bold text-white flex items-center gap-2 self-start md:self-auto shadow-lg"
          >
            <Eye className="w-4 h-4" />
            <span>Открыть радар телеметрии</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Embedded Map Visual */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <DeliveryMap
            pickup={pickup}
            dropoff={dropoff}
            courierPos={courierPos}
            courierName="Маркус Стерлинг"
            vehiclePlate="NY-AE901"
            eta="6 мин"
            distanceKm={2.1}
            className="h-[520px] w-full"
          />
        </motion.div>
      </div>
    </section>
  );
}
