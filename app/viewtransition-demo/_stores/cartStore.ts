"use client";
import { create } from "zustand";
import { products } from "../_consts/products";

export type CartItem = { productId: string; qty: number };

type CartStore = {
  items: CartItem[];
  message: string | null;
  messageOpen: boolean;
};

type CartAction = {
  add: (productId: string, qty?: number) => void;
  remove: (productId: string) => void;
  getTotalPrice: () => number;
  updateQty: (productId: string, qty: number) => void;
  clear: () => void;
  order: () => Promise<void>;
};

type CartState = CartStore & CartAction;

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  message: null,
  messageOpen: false,
  add(productId, qty = 1) {
    set((s) => {
      const exists = s.items.find((i) => i.productId === productId);
      if (exists)
        return {
          items: s.items.map((i) =>
            i.productId === productId ? { ...i, qty: i.qty + qty } : i,
          ),
        };
      return { items: [...s.items, { productId, qty }] };
    });
  },
  remove(productId) {
    set((s) => ({ items: s.items.filter((i) => i.productId !== productId) }));
  },
  getTotalPrice() {
    const { items } = get();
    return items.reduce((total, item) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product) return total;
      return total + product.price * item.qty;
    }, 0);
  },
  updateQty(productId, qty) {
    set((s) => ({
      items: s.items.map((i) =>
        i.productId === productId ? { ...i, qty } : i,
      ),
    }));
  },
  clear() {
    set(() => ({ items: [] }));
  },
  async order() {
    const { items } = get();
    if (items.length === 0) return;

    set(() => ({ message: "注文中...", messageOpen: true }));
    await new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {});
    set(() => ({ items: [], message: "注文が完了しました！" }));
    await new Promise((resolve) => setTimeout(resolve, 3000)).then(() => {});
    set(() => ({ messageOpen: false }));
  },
}));
