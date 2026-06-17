"use client";
import { create } from "zustand";

type AnimationType = "view" | "classic" | "none";

type ModalState = {
  open: boolean;
  productId: string | null;
  animation: {
    type: AnimationType;
    duration: number;
    easing: string;
    coverage: number;
  };
  openProduct: (id: string) => void;
  close: () => void;
  setAnimation: (patch: Partial<ModalState["animation"]>) => void;
};

export const useModalStore = create<ModalState>((set) => ({
  open: false,
  productId: null,
  animation: { type: "view", duration: 450, easing: "ease", coverage: 0.8 },
  openProduct(id: string) {
    set(() => ({ open: true, productId: id }));
  },
  close() {
    set(() => ({ open: false, productId: null }));
  },
  setAnimation(patch) {
    set((s) => ({ animation: { ...s.animation, ...patch } }));
  },
}));
