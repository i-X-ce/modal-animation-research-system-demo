"use client";

import { create } from "zustand";
import { products } from "../_consts/products";
import { ProductOptionValue } from "../_types/product";

export type CartItem = {
  productId: string;
  options: ProductOptionValue[];
  qty: number;
};

type CartStore = {
  items: CartItem[];
  message: string | null;
  messageOpen: boolean;
};

type CartAction = {
  add: (productId: string, options: ProductOptionValue[], qty?: number) => void;
  remove: (targetIndex: number) => void;
  getTotalPrice: () => number;
  order: () => Promise<void>;
};

type CartState = CartStore & CartAction;

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  message: null,
  messageOpen: false,
  add(productId, options, qty = 1) {
    set((s) => {
      return {
        items: [...s.items, { productId, options, qty }],
      };
    });
  },
  remove(targetIndex) {
    set((s) => ({
      items: s.items.filter((_, index) => targetIndex !== index),
    }));
  },
  getTotalPrice() {
    const { items } = get();
    return items.reduce((total, item) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product) return total;
      return total + product.price * item.qty;
    }, 0);
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
