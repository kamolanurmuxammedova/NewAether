import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DeliveryOrder, PackageCategory, SpeedTier, CourierVehicle, Coordinates } from "@/types";
import { CATEGORIES, SPEED_TIERS } from "@/lib/constants";
import { generateOrderNumber } from "@/lib/utils";

interface OrderStoreState {
  // Booking Draft
  category: PackageCategory;
  speedTier: SpeedTier;
  vehicle: CourierVehicle;
  pickupAddress: string;
  pickupCoords: Coordinates;
  pickupContactName: string;
  pickupContactPhone: string;
  dropoffAddress: string;
  dropoffCoords: Coordinates;
  dropoffContactName: string;
  dropoffContactPhone: string;
  notes: string;
  weightKg: number;
  declaredValue: number;
  insuranceTier: "NONE" | "STANDARD" | "CONCIERGE_TOTAL";
  packagePhotoUrl: string | null;

  // Active & Past Orders
  orders: DeliveryOrder[];
  activeOrderId: string | null;

  // Actions
  setCategory: (category: PackageCategory) => void;
  setSpeedTier: (speed: SpeedTier) => void;
  setVehicle: (vehicle: CourierVehicle) => void;
  setPickup: (address: string, coords: Coordinates, name?: string, phone?: string) => void;
  setDropoff: (address: string, coords: Coordinates, name?: string, phone?: string) => void;
  setNotes: (notes: string) => void;
  setWeight: (weight: number) => void;
  setDeclaredValue: (val: number) => void;
  setInsurance: (tier: "NONE" | "STANDARD" | "CONCIERGE_TOTAL") => void;
  setPackagePhoto: (url: string | null) => void;
  
  calculatePricing: () => {
    subtotal: number;
    surge: number;
    insurance: number;
    total: number;
    distanceKm: number;
    estimatedMin: number;
  };

  createOrder: () => DeliveryOrder;
  cancelOrder: (orderId: string) => void;
  setActiveOrderId: (orderId: string | null) => void;
  updateCourierPosition: (orderId: string, coords: Coordinates) => void;
}

const INITIAL_MOCK_ORDERS: DeliveryOrder[] = [
  {
    id: "ord_101",
    orderNumber: "AETH-982XF",
    category: "ELECTRONICS",
    speedTier: "HYPERSPEED",
    status: "IN_TRANSIT",
    pickupAddress: "Apple Пятое Авеню, 767 5th Ave, Нью-Йорк",
    pickupCoords: { lat: 40.7638, lng: -73.973 },
    pickupContactName: "Логистика Apple Store",
    pickupContactPhone: "+1 (212) 555-0199",
    dropoffAddress: "Пентхаус 14, Парк Авеню, 740, Нью-Йорк",
    dropoffCoords: { lat: 40.7711, lng: -73.9634 },
    dropoffContactName: "Александр Вэнс",
    dropoffContactPhone: "+1 (917) 555-0142",
    estimatedMinutes: 8,
    distanceKm: 2.1,
    weightKg: 1.8,
    notes: "Оставить консьержу, если недоступен. Ценный опломбированный груз.",
    declaredValue: 2499,
    insuranceTier: "CONCIERGE_TOTAL",
    priceSubtotal: 28.5,
    priceSurge: 0,
    priceInsurance: 15.0,
    priceTotal: 43.5,
    courier: {
      id: "cur_01",
      name: "Маркус Стерлинг",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      phone: "+1 (917) 555-8831",
      rating: 4.99,
      completedJobs: 1840,
      vehicle: "CYBER_SCOOTER",
      vehicleName: "Aether Cyber-Rider X",
      vehiclePlate: "NY-AE901",
      currentLocation: { lat: 40.7674, lng: -73.9682 },
      badge: "Quantum Elite",
    },
    liveCourierCoords: { lat: 40.7674, lng: -73.9682 },
    createdAt: new Date(Date.now() - 12 * 60000).toISOString(),
    eta: "8 мин",
  },
  {
    id: "ord_102",
    orderNumber: "AETH-714ML",
    category: "DOCUMENTS",
    speedTier: "SAME_DAY",
    status: "DELIVERED",
    pickupAddress: "Бродвей, 520, Техноцентр Сохо, Нью-Йорк",
    pickupCoords: { lat: 40.7223, lng: -73.9984 },
    pickupContactName: "Клара Крофт",
    pickupContactPhone: "+1 (212) 555-9011",
    dropoffAddress: "Хадсон Ярдс, 30, Нью-Йорк",
    dropoffCoords: { lat: 40.7538, lng: -74.0022 },
    dropoffContactName: "Юридический департамент",
    dropoffContactPhone: "+1 (212) 555-4421",
    estimatedMinutes: 25,
    distanceKm: 4.7,
    weightKg: 0.6,
    insuranceTier: "STANDARD",
    priceSubtotal: 18.0,
    priceSurge: 0,
    priceInsurance: 5.0,
    priceTotal: 23.0,
    createdAt: new Date(Date.now() - 180 * 60000).toISOString(),
    eta: "Доставлен",
  },
];

export const useOrderStore = create<OrderStoreState>()(
  persist(
    (set, get) => ({
      category: "ELECTRONICS",
      speedTier: "HYPERSPEED",
      vehicle: "CYBER_SCOOTER",
      pickupAddress: "Парк Авеню, 740, Верхний Ист-Сайд, Нью-Йорк",
      pickupCoords: { lat: 40.7711, lng: -73.9634 },
      pickupContactName: "Александр Вэнс",
      pickupContactPhone: "+1 (917) 555-0142",
      dropoffAddress: "Бродвей, 520, Техноцентр Сохо, Нью-Йорк",
      dropoffCoords: { lat: 40.7223, lng: -73.9984 },
      dropoffContactName: "Елена Ростова",
      dropoffContactPhone: "+1 (917) 555-0199",
      notes: "Бережное обращение в белых перчатках. Звонить в интерком при прибытии.",
      weightKg: 2.5,
      declaredValue: 1200,
      insuranceTier: "STANDARD",
      packagePhotoUrl: null,

      orders: INITIAL_MOCK_ORDERS,
      activeOrderId: "ord_101",

      setCategory: (category) => set({ category }),
      setSpeedTier: (speedTier) => set({ speedTier }),
      setVehicle: (vehicle) => set({ vehicle }),
      setPickup: (pickupAddress, pickupCoords, name, phone) =>
        set((state) => ({
          pickupAddress,
          pickupCoords,
          pickupContactName: name ?? state.pickupContactName,
          pickupContactPhone: phone ?? state.pickupContactPhone,
        })),
      setDropoff: (dropoffAddress, dropoffCoords, name, phone) =>
        set((state) => ({
          dropoffAddress,
          dropoffCoords,
          dropoffContactName: name ?? state.dropoffContactName,
          dropoffContactPhone: phone ?? state.dropoffContactPhone,
        })),
      setNotes: (notes) => set({ notes }),
      setWeight: (weightKg) => set({ weightKg }),
      setDeclaredValue: (declaredValue) => set({ declaredValue }),
      setInsurance: (insuranceTier) => set({ insuranceTier }),
      setPackagePhoto: (packagePhotoUrl) => set({ packagePhotoUrl }),
      setActiveOrderId: (activeOrderId) => set({ activeOrderId }),

      calculatePricing: () => {
        const { category, speedTier, weightKg, insuranceTier } = get();
        const cat = CATEGORIES.find((c) => c.id === category) || CATEGORIES[0];
        const speed = SPEED_TIERS.find((s) => s.id === speedTier) || SPEED_TIERS[0];
        
        // Base distance approx 4.8 km
        const distanceKm = 4.8;
        const subtotal = (cat.basePrice + distanceKm * 2.2 + weightKg * 1.5) * speed.priceMultiplier;
        const surge = 0.0;
        const insurance =
          insuranceTier === "CONCIERGE_TOTAL" ? 18.0 : insuranceTier === "STANDARD" ? 6.0 : 0.0;
        const total = Math.round((subtotal + surge + insurance) * 100) / 100;
        const estimatedMin = Math.round(distanceKm * 3.5 * (speedTier === "HYPERSPEED" ? 0.7 : 1));

        return {
          subtotal: Math.round(subtotal * 100) / 100,
          surge,
          insurance,
          total,
          distanceKm,
          estimatedMin: Math.max(12, estimatedMin),
        };
      },

      createOrder: () => {
        const state = get();
        const pricing = state.calculatePricing();
        const newOrder: DeliveryOrder = {
          id: `ord_${Date.now()}`,
          orderNumber: generateOrderNumber(),
          category: state.category,
          speedTier: state.speedTier,
          status: "ACCEPTED",
          pickupAddress: state.pickupAddress,
          pickupCoords: state.pickupCoords,
          pickupContactName: state.pickupContactName,
          pickupContactPhone: state.pickupContactPhone,
          dropoffAddress: state.dropoffAddress,
          dropoffCoords: state.dropoffCoords,
          dropoffContactName: state.dropoffContactName,
          dropoffContactPhone: state.dropoffContactPhone,
          estimatedMinutes: pricing.estimatedMin,
          distanceKm: pricing.distanceKm,
          weightKg: state.weightKg,
          notes: state.notes,
          declaredValue: state.declaredValue,
          insuranceTier: state.insuranceTier,
          priceSubtotal: pricing.subtotal,
          priceSurge: pricing.surge,
          priceInsurance: pricing.insurance,
          priceTotal: pricing.total,
          createdAt: new Date().toISOString(),
          eta: `${pricing.estimatedMin} мин`,
          courier: {
            id: "cur_assigned",
            name: "Юлиан Де Врис",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
            phone: "+1 (917) 555-7729",
            rating: 4.98,
            completedJobs: 980,
            vehicle: state.vehicle,
            vehicleName: "Aether Stealth Rider",
            vehiclePlate: "NY-VIP88",
            currentLocation: {
              lat: state.pickupCoords.lat + 0.005,
              lng: state.pickupCoords.lng - 0.004,
            },
            badge: "Fastest Responder",
          },
          liveCourierCoords: {
            lat: state.pickupCoords.lat + 0.005,
            lng: state.pickupCoords.lng - 0.004,
          },
        };

        set((s) => ({
          orders: [newOrder, ...s.orders],
          activeOrderId: newOrder.id,
        }));

        return newOrder;
      },

      cancelOrder: (orderId) => {
        set((s) => ({
          orders: s.orders.map((o) =>
            o.id === orderId ? { ...o, status: "CANCELLED" as const } : o
          ),
          activeOrderId: s.activeOrderId === orderId ? null : s.activeOrderId,
        }));
      },

      updateCourierPosition: (orderId, coords) => {
        set((s) => ({
          orders: s.orders.map((o) =>
            o.id === orderId
              ? {
                  ...o,
                  liveCourierCoords: coords,
                  courier: o.courier
                    ? { ...o.courier, currentLocation: coords }
                    : undefined,
                }
              : o
          ),
        }));
      },
    }),
    {
      name: "aether-order-storage",
      partialize: (state) => ({
        orders: state.orders,
        activeOrderId: state.activeOrderId,
        pickupAddress: state.pickupAddress,
        dropoffAddress: state.dropoffAddress,
      }),
    }
  )
);
