import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AddressItem } from "@/types";
import { PRESET_ADDRESSES } from "@/lib/constants";

export interface WalletTransaction {
  id: string;
  type: "TOPUP" | "ORDER_PAYMENT" | "REFUND" | "CASHBACK";
  amount: number;
  description: string;
  timestamp: string;
  status: "COMPLETED" | "PENDING";
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: "ORDER" | "WALLET" | "PROMO" | "SECURITY";
}

interface UserState {
  // Auth state
  isAuthenticated: boolean;
  user: {
    id: string;
    name: string;
    email: string;
    phone: string;
    avatar: string;
    tier: "Обсидиановый резидент" | "Платиновый директор" | "Алмазный основатель";
    role: "USER" | "COURIER" | "ADMIN";
  };
  
  // Wallet & Payment
  walletBalance: number;
  transactions: WalletTransaction[];
  
  // Addresses
  addresses: AddressItem[];
  
  // Notifications
  notifications: AppNotification[];
  
  // Settings & Locale
  currency: string;
  language: string;
  isSearchOpen: boolean;
  activeTab: string;

  // Actions
  login: (email: string, role?: "USER" | "COURIER" | "ADMIN") => void;
  logout: () => void;
  switchRole: (role: "USER" | "COURIER" | "ADMIN") => void;
  topUpWallet: (amount: number) => void;
  deductWallet: (amount: number, description: string) => boolean;
  addAddress: (address: Omit<AddressItem, "id">) => void;
  removeAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  setCurrency: (currency: string) => void;
  setLanguage: (lang: string) => void;
  setIsSearchOpen: (open: boolean) => void;
}

const INITIAL_TRANSACTIONS: WalletTransaction[] = [
  {
    id: "tx_1",
    type: "TOPUP",
    amount: 500.0,
    description: "Мгновенное пополнение Apple Pay",
    timestamp: "2 часа назад",
    status: "COMPLETED",
  },
  {
    id: "tx_2",
    type: "ORDER_PAYMENT",
    amount: -43.5,
    description: "Гиперскоростная доставка AETH-982XF",
    timestamp: "12 мин назад",
    status: "COMPLETED",
  },
  {
    id: "tx_3",
    type: "CASHBACK",
    amount: 8.7,
    description: "Кэшбэк 20% по программе Obsidian Elite",
    timestamp: "Вчера",
    status: "COMPLETED",
  },
];

const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: "notif_1",
    title: "Скоростной курьер выехал",
    message: "Маркус Стерлинг прибудет через 4 мин с вашей опечатанной техникой.",
    timestamp: "4м назад",
    read: false,
    type: "ORDER",
  },
  {
    id: "notif_2",
    title: "Приоритетный зеленый коридор",
    message: "Для вашего аккаунта активирована беспосадочная скоростная магистраль.",
    timestamp: "1ч назад",
    read: false,
    type: "SECURITY",
  },
  {
    id: "notif_3",
    title: "Пополнение баланса получено",
    message: "$500.00 USD зачислены в ваш цифровой сейф AETHER Obsidian Vault.",
    timestamp: "2ч назад",
    read: true,
    type: "WALLET",
  },
];

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      isAuthenticated: true,
      user: {
        id: "usr_vance_01",
        name: "Александр Вэнс",
        email: "alexander.vance@vance-holdings.com",
        phone: "+1 (917) 555-0142",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
        tier: "Алмазный основатель",
        role: "USER",
      },
      walletBalance: 1465.2,
      transactions: INITIAL_TRANSACTIONS,
      addresses: PRESET_ADDRESSES,
      notifications: INITIAL_NOTIFICATIONS,
      currency: "USD",
      language: "RU",
      isSearchOpen: false,
      activeTab: "overview",

      login: (email, role = "USER") =>
        set((s) => ({
          isAuthenticated: true,
          user: {
            ...s.user,
            email,
            name: email.split("@")[0].toUpperCase(),
            role,
          },
        })),

      logout: () => set({ isAuthenticated: false }),

      switchRole: (role) =>
        set((s) => ({
          user: { ...s.user, role },
        })),

      topUpWallet: (amount) =>
        set((s) => ({
          walletBalance: s.walletBalance + amount,
          transactions: [
            {
              id: `tx_${Date.now()}`,
              type: "TOPUP",
              amount,
              description: "Пополнение баланса через Stripe Platinum",
              timestamp: "Только что",
              status: "COMPLETED",
            },
            ...s.transactions,
          ],
        })),

      deductWallet: (amount, description) => {
        const current = get().walletBalance;
        if (current < amount) return false;
        set((s) => ({
          walletBalance: s.walletBalance - amount,
          transactions: [
            {
              id: `tx_${Date.now()}`,
              type: "ORDER_PAYMENT",
              amount: -amount,
              description,
              timestamp: "Только что",
              status: "COMPLETED",
            },
            ...s.transactions,
          ],
        }));
        return true;
      },

      addAddress: (addr) =>
        set((s) => ({
          addresses: [
            ...s.addresses,
            { ...addr, id: `addr_${Date.now()}` },
          ],
        })),

      removeAddress: (id) =>
        set((s) => ({
          addresses: s.addresses.filter((a) => a.id !== id),
        })),

      setDefaultAddress: (id) =>
        set((s) => ({
          addresses: s.addresses.map((a) => ({
            ...a,
            isDefault: a.id === id,
          })),
        })),

      markNotificationRead: (id) =>
        set((s) => ({
          notifications: s.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        })),

      markAllNotificationsRead: () =>
        set((s) => ({
          notifications: s.notifications.map((n) => ({ ...n, read: true })),
        })),

      setCurrency: (currency) => set({ currency }),
      setLanguage: (language) => set({ language }),
      setIsSearchOpen: (isSearchOpen) => set({ isSearchOpen }),
    }),
    {
      name: "aether-user-storage",
      partialize: (state) => ({
        user: state.user,
        walletBalance: state.walletBalance,
        addresses: state.addresses,
        currency: state.currency,
        language: state.language,
      }),
    }
  )
);
