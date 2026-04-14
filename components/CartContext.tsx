"use client";
import { createContext, useContext, useState, useCallback, ReactNode } from "react";

export interface CartItem {
  name: string;
  brand: string;
  price: string;
  emoji: string;
  qty: number;
}

interface CartCtx {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "qty">) => void;
  removeItem: (name: string) => void;
  updateQty: (name: string, qty: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const Ctx = createContext<CartCtx>({
  items: [], addItem: () => {}, removeItem: () => {}, updateQty: () => {},
  clearCart: () => {}, totalItems: 0, totalPrice: 0,
  isOpen: false, openCart: () => {}, closeCart: () => {},
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = useCallback((item: Omit<CartItem, "qty">) => {
    setItems(prev => {
      const existing = prev.find(i => i.name === item.name);
      if (existing) return prev.map(i => i.name === item.name ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...item, qty: 1 }];
    });
  }, []);

  const removeItem = useCallback((name: string) => {
    setItems(prev => prev.filter(i => i.name !== name));
  }, []);

  const updateQty = useCallback((name: string, qty: number) => {
    if (qty <= 0) { removeItem(name); return; }
    setItems(prev => prev.map(i => i.name === name ? { ...i, qty } : i));
  }, [removeItem]);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((s, i) => s + i.qty, 0);
  const totalPrice = items.reduce((s, i) => {
    const num = parseInt(i.price.replace(/\D/g, ""));
    return s + num * i.qty;
  }, 0);

  return (
    <Ctx.Provider value={{
      items, addItem, removeItem, updateQty, clearCart,
      totalItems, totalPrice, isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
    }}>
      {children}
    </Ctx.Provider>
  );
}

export const useCart = () => useContext(Ctx);
