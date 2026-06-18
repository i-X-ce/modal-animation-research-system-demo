"use client";
import { create } from "zustand";
import { products } from "../_consts/products";

export type CartItem = { productId: string; qty: number };

type CartStore = {
  items: CartItem[];
};

type CartAction = {
  add: (productId: string, qty?: number) => void;
  remove: (productId: string) => void;
  getTotalPrice: () => number;
  updateQty: (productId: string, qty: number) => void;
  clear: () => void;
};

type CartState = CartStore & CartAction;

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
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
}));
