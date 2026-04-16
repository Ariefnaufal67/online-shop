"use client";
import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  joinDate: string;
  totalOrders: number;
  totalSpent: number;
}

export interface Order {
  id: string;
  date: string;
  status: "processing" | "shipped" | "delivered" | "cancelled";
  items: { name: string; emoji: string; price: string; qty: number }[];
  total: number;
  tracking?: string;
  estimatedDelivery?: string;
}

interface AuthCtx {
  user: User | null;
  orders: Order[];
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  addOrder: (order: Omit<Order, "id" | "date" | "tracking" | "estimatedDelivery">) => string;
  isLoading: boolean;
}

const Ctx = createContext<AuthCtx>({
  user: null, orders: [],
  login: async () => false,
  register: async () => false,
  logout: () => {},
  addOrder: () => "",
  isLoading: false,
});

// Mock existing users
const MOCK_USERS: (User & { password: string })[] = [
  {
    id: "u1", name: "Ayu Nuvauser", email: "ayu@email.com", password: "123456",
    avatar: "🧕", joinDate: "Januari 2025", totalOrders: 8, totalSpent: 2340000,
  },
];

// Mock orders
const MOCK_ORDERS: Order[] = [
  {
    id: "NVS-20260001",
    date: "12 Apr 2026",
    status: "delivered",
    items: [
      { name: "Power Blazer Hitam", emoji: "🧥", price: "Rp 389.000", qty: 1 },
      { name: "Oxford Shoes",       emoji: "👞", price: "Rp 365.000", qty: 1 },
    ],
    total: 754000,
    tracking: "JNE123456789",
    estimatedDelivery: "14 Apr 2026",
  },
  {
    id: "NVS-20260002",
    date: "5 Apr 2026",
    status: "shipped",
    items: [
      { name: "Midi Dress Floral", emoji: "👗", price: "Rp 329.000", qty: 1 },
    ],
    total: 329000,
    tracking: "SICEPAT987654",
    estimatedDelivery: "17 Apr 2026",
  },
  {
    id: "NVS-20260003",
    date: "28 Mar 2026",
    status: "delivered",
    items: [
      { name: "Oversized Hoodie",  emoji: "👕", price: "Rp 245.000", qty: 2 },
      { name: "Topi Canvas",       emoji: "🧢", price: "Rp 99.000",  qty: 1 },
    ],
    total: 589000,
    tracking: "GOSEND334455",
    estimatedDelivery: "30 Mar 2026",
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 900)); // simulate API
    const found = MOCK_USERS.find(u => u.email === email && u.password === password);
    if (found) {
      const { password: _, ...userData } = found;
      setUser(userData);
      setOrders(MOCK_ORDERS);
      setIsLoading(false);
      return true;
    }
    setIsLoading(false);
    return false;
  }, []);

  const register = useCallback(async (name: string, email: string, _password: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 900));
    const newUser: User = {
      id: "u" + Date.now(), name, email,
      avatar: "🧑", joinDate: "April 2026",
      totalOrders: 0, totalSpent: 0,
    };
    setUser(newUser);
    setOrders([]);
    setIsLoading(false);
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setOrders([]);
  }, []);

  const addOrder = useCallback((order: Omit<Order, "id" | "date" | "tracking" | "estimatedDelivery">): string => {
    const id = "NVS-" + Date.now().toString().slice(-8);
    const couriers = ["JNE", "SICEPAT", "GOSEND", "ANTERAJA"];
    const courier = couriers[Math.floor(Math.random() * couriers.length)];
    const trackNum = courier + Math.floor(Math.random() * 999999999).toString().padStart(9, "0");
    const delivDate = new Date();
    delivDate.setDate(delivDate.getDate() + 3);
    const newOrder: Order = {
      ...order, id,
      date: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }),
      tracking: trackNum,
      estimatedDelivery: delivDate.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }),
    };
    setOrders(prev => [newOrder, ...prev]);
    if (user) setUser(u => u ? { ...u, totalOrders: u.totalOrders + 1, totalSpent: u.totalSpent + order.total } : u);
    return id;
  }, [user]);

  return (
    <Ctx.Provider value={{ user, orders, login, register, logout, addOrder, isLoading }}>
      {children}
    </Ctx.Provider>
  );
}

export const useAuth = () => useContext(Ctx);
