"use client";
import { Easing, Transition } from "motion";
import { ReactNode } from "react";
import { flushSync } from "react-dom";
import { create } from "zustand";

export type AnimationType = "view" | "classic" | "none";

export type ModalAnimation = {
  type: AnimationType;
  easing: Easing;
  duration: number;
  coverage: number;
};

export type ModalStore = {
  open: boolean;
  name: string | null;
  content: ReactNode | null;
  animation: ModalAnimation;
};

export const getTransitionFromModalAnimation = (
  animation: ModalAnimation,
): Transition => {
  if (animation.type === "none") {
    return { duration: 0 };
  }
  if (animation.type === "classic") {
    return {
      ease: animation.easing,
      duration: animation.duration,
    };
  }
  return { ease: animation.easing, duration: animation.duration };
};

type ModalAction = {
  openModal: (content: ReactNode, name?: string) => void;
  closeModal: () => void;
  setAnimation: (animation: Partial<ModalStore["animation"]>) => void;
  getTransition: () => Transition;
};

type ModalState = ModalStore & ModalAction;

const defaultModalState: ModalStore = {
  open: false,
  name: null,
  content: null,
  animation: {
    type: "view",
    easing: "easeInOut",
    duration: 0.5,
    coverage: 0.2,
  },
} as const;

export const useModalStore = create<ModalState>((set, get) => ({
  ...defaultModalState,
  openModal(content: ReactNode, name?: string) {
    const bodyElement = document.body;
    if (bodyElement) {
      bodyElement.style.overflow = "hidden";
    }
    set(() => ({ open: true, content, name: name || null }));
  },
  closeModal() {
    const bodyElement = document.body;
    if (bodyElement) {
      bodyElement.style.overflow = "";
    }
    set(() => ({ open: false }));
  },
  setAnimation(patch) {
    set((s) => ({ animation: { ...s.animation, ...patch } }));
  },
  getTransition() {
    const { animation } = get();
    return getTransitionFromModalAnimation(animation);
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
