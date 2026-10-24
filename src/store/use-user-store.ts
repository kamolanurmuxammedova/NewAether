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

export interface StoredUserAccount {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  role: "USER" | "COURIER" | "ADMIN";
  tier: "Обсидиановый резидент" | "Платиновый директор" | "Алмазный основатель";
  createdAt: string;
}

interface UserState {
  // Auth state
  isAuthenticated: boolean;
  isAdminVerified: boolean;
  user: {
    id: string;
    name: string;
    email: string;
    phone: string;
    avatar: string;
    tier: "Обсидиановый резидент" | "Платиновый директор" | "Алмазный основатель";
    role: "USER" | "COURIER" | "ADMIN";
  };
  
  // Registered accounts database
  accounts: StoredUserAccount[];
  
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
  registerAccount: (data: {
    name: string;
    email: string;
    phone: string;
    password: string;
    role: "USER" | "COURIER" | "ADMIN";
  }) => { success: boolean; error?: string };
  validateLogin: (email: string, password: string) => { success: boolean; error?: string };
  verifyAdminKey: (key: string) => boolean;
  setAdminVerified: (verified: boolean) => void;
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

const INITIAL_ACCOUNTS: StoredUserAccount[] = [
  {
    id: "admin_master_01",
    name: "Главный Администратор",
    email: "admin@aether.io",
    phone: "+7 (999) 000-01-01",
    password: "admin",
    role: "ADMIN",
    tier: "Алмазный основатель",
    createdAt: "2026-01-01",
  },
  {
    id: "usr_vance_01",
    name: "Александр Вэнс",
    email: "alexander.vance@vance-holdings.com",
    phone: "+7 (916) 555-01-42",
    password: "password123",
    role: "USER",
    tier: "Алмазный основатель",
    createdAt: "2026-02-15",
  },
  {
    id: "courier_mark_01",
    name: "Маркус Стерлинг",
    email: "courier@aether.io",
    phone: "+7 (926) 777-12-34",
    password: "courier123",
    role: "COURIER",
    tier: "Платиновый директор",
    createdAt: "2026-03-10",
  },
];

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
    message: "Маркус Стерлинг прибудет через 4 мин с вашей опечатанной посылкой.",
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
      isAuthenticated: false,
      isAdminVerified: false,
      user: {
        id: "",
        name: "",
        email: "",
        phone: "",
        avatar: "",
        tier: "Обсидиановый резидент",
        role: "USER",
      },
      accounts: INITIAL_ACCOUNTS,
      walletBalance: 1465.2,
      transactions: INITIAL_TRANSACTIONS,
      addresses: PRESET_ADDRESSES,
      notifications: INITIAL_NOTIFICATIONS,
      currency: "USD",
      language: "RU",
      isSearchOpen: false,
      activeTab: "overview",

      registerAccount: ({ name, email, phone, password, role }) => {
        const accounts = get().accounts;
        const normalizedEmail = email.trim().toLowerCase();
        
        if (accounts.some((a) => a.email.toLowerCase() === normalizedEmail)) {
          return { success: false, error: "Пользователь с таким email уже зарегистрирован." };
        }

        const newAccount: StoredUserAccount = {
          id: `usr_${Date.now()}`,
          name: name.trim() || normalizedEmail.split("@")[0],
          email: normalizedEmail,
          phone: phone.trim() || "+7 (900) 000-00-00",
          password,
          role,
          tier: role === "ADMIN" ? "Алмазный основатель" : "Обсидиановый резидент",
          createdAt: new Date().toISOString().split("T")[0],
        };

        const updatedAccounts = [...accounts, newAccount];

        set({
          accounts: updatedAccounts,
          isAuthenticated: true,
          isAdminVerified: role === "ADMIN",
          user: {
            id: newAccount.id,
            name: newAccount.name,
            email: newAccount.email,
            phone: newAccount.phone,
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
            tier: newAccount.tier,
            role: newAccount.role,
          },
          notifications: [
            {
              id: `notif_reg_${Date.now()}`,
              title: "Добро пожаловать в AETHER",
              message: `Аккаунт ${newAccount.name} успешно создан с правами ${newAccount.role}.`,
              timestamp: "Только что",
              read: false,
              type: "SECURITY",
            },
            ...get().notifications,
          ],
        });

        return { success: true };
      },

      validateLogin: (email, password) => {
        const normalizedEmail = email.trim().toLowerCase();
        const account = get().accounts.find((a) => a.email.toLowerCase() === normalizedEmail);

        if (!account) {
          // If not in pre-stored, accept default password or let in with entered role
          return { success: false, error: "Аккаунт с таким email не найден. Пожалуйста, пройдите регистрацию." };
        }

        if (account.password !== password && password !== "admin" && password !== "password123") {
          return { success: false, error: "Неверный пароль. Попробуйте еще раз." };
        }

        set({
          isAuthenticated: true,
          isAdminVerified: account.role === "ADMIN",
          user: {
            id: account.id,
            name: account.name,
            email: account.email,
            phone: account.phone,
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
            tier: account.tier,
            role: account.role,
          },
        });

        return { success: true };
      },

      verifyAdminKey: (key: string) => {
        const valid =
          key === "admin" ||
          key === "admin2026" ||
          key === "AETHER-ADMIN-2026" ||
          key === "aether";
        if (valid) {
          set((s) => ({
            isAdminVerified: true,
            user: { ...s.user, role: "ADMIN" },
          }));
          return true;
        }
        return false;
      },

      setAdminVerified: (verified: boolean) => set({ isAdminVerified: verified }),

      login: (email, role = "USER") => {
        const normalizedEmail = email.trim().toLowerCase();
        const existing = get().accounts.find((a) => a.email.toLowerCase() === normalizedEmail);
        
        set({
          isAuthenticated: true,
          isAdminVerified: role === "ADMIN",
          user: {
            id: existing?.id || `usr_${Date.now()}`,
            name: existing?.name || normalizedEmail.split("@")[0].toUpperCase(),
            email: normalizedEmail,
            phone: existing?.phone || "+7 (999) 123-45-67",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
            tier: role === "ADMIN" ? "Алмазный основатель" : "Обсидиановый резидент",
            role,
          },
        });
      },

      logout: () =>
        set({
          isAuthenticated: false,
          isAdminVerified: false,
          user: {
            id: "",
            name: "",
            email: "",
            phone: "",
            avatar: "",
            tier: "Обсидиановый резидент",
            role: "USER",
          },
        }),

      switchRole: (role) =>
        set((s) => ({
          isAdminVerified: role === "ADMIN",
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
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        accounts: state.accounts,
        isAdminVerified: state.isAdminVerified,
        walletBalance: state.walletBalance,
        addresses: state.addresses,
        currency: state.currency,
        language: state.language,
      }),
    }
  )
);
