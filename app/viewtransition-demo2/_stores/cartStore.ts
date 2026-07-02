"use client";

import { create } from "zustand";
import { products } from "../_consts/products";
import { ProductOptionValue } from "../_types/product";
import { useSystemStore } from "./systemStore";

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

const defaultCartState: CartStore = {
  items: [],
  message: null,
  messageOpen: false,
} as const;

export const useCartStore = create<CartState>((set, get) => ({
  ...defaultCartState,
  add(productId, options, qty = 1) {
    set((s) => {
      return {
        items: [...s.items, { productId, options, qty }],
      };
    });

    useSystemStore.getState().addItem(productId, options, qty);
  },
  remove(targetIndex) {
    const { items } = get();
    set(() => ({
      items: items.filter((_, index) => targetIndex !== index),
    }));

    useSystemStore
      .getState()
      .removeItem(items[targetIndex].productId, targetIndex);
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
    set(() => ({
      messageOpen: false,
    }));

    useSystemStore.getState().order();
  },
}));
