"use client";
import { ReactNode } from "react";
import { flushSync } from "react-dom";
import { create } from "zustand";

export type AnimationType = "view" | "classic" | "none";

type ModalStore = {
  open: boolean;
  name: string | null;
  content: ReactNode | null;
  animation: {
    type: AnimationType;
    easing: string;
    duration: number;
    coverage: number;
  };
};

type ModalAction = {
  openModal: (content: ReactNode, name?: string) => void;
  closeModal: () => void;
  setAnimation: (animation: Partial<ModalStore["animation"]>) => void;
};

type ModalState = ModalStore & ModalAction;

export const useModalStore = create<ModalState>((set) => ({
  open: false,
  name: null,
  content: null,
  animation: { type: "view", duration: 450, easing: "ease", coverage: 0.8 },
  openModal(content: ReactNode, name?: string) {
    set(() => ({ open: true, content, name: name || null }));
  },
  closeModal() {
    set(() => ({ open: false }));
  },
  setAnimation(patch) {
    set((s) => ({ animation: { ...s.animation, ...patch } }));
  },
}));

export const useToggleModal = () => {
  const openModal = useModalStore((s) => s.openModal);
  const closeModal = useModalStore((s) => s.closeModal);
  const open = useModalStore((s) => s.open);

  const handleOpenModal: ModalAction["openModal"] = (...props) => {
    if (!document.startViewTransition) {
      openModal(...props);
      return;
    }

    document.startViewTransition(() => {
      flushSync(() => {
        openModal(...props);
      });
    });
  };

  const handleCloseModal: ModalAction["closeModal"] = (...props) => {
    if (!document.startViewTransition) {
      closeModal(...props);
      return;
    }

    document.startViewTransition(() => {
      flushSync(() => {
        closeModal(...props);
      });
    });
  };

  return {
    open,
    handleOpenModal,
    handleCloseModal,
  };
};
