"use client";
import { BezierDefinition, EasingDefinition, Transition } from "motion";
import { ReactNode } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const ANIMATION_TYPES = ["view", "classic", "none"] as const;

export type AnimationType = (typeof ANIMATION_TYPES)[number];

export type ModalAnimation = {
  type: AnimationType; // アニメーションの種類（view: ViewTransition風, classic: スライドイン, none: 無し）
  easing: Exclude<EasingDefinition, BezierDefinition>; // アニメーションのイージング
  duration: number; // アニメーションの時間（秒）
  coverage: number; // 画面占有率
  cardSize: number; // カードのサイズ（モーダルには関係ないんだけど）
  displayNextOrder: boolean; // 次の注文を表示するか
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
  onExitComplete: () => void;
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
    cardSize: 300,
    displayNextOrder: true,
  },
} as const;

export const useModalStore = create<ModalState>()(
  persist(
    (set, get) => ({
      ...defaultModalState,
      openModal(content: ReactNode, name?: string) {
        const bodyElement = document.body;
        if (bodyElement) {
          bodyElement.style.overflow = "hidden";
        }
        set(() => ({ open: true, content, name: name || null }));
      },
      closeModal() {
        set(() => ({ open: false }));
      },
      onExitComplete() {
        const bodyElement = document.body;
        if (bodyElement) {
          bodyElement.style.overflow = "";
        }
      },
      setAnimation(patch) {
        set((s) => ({ animation: { ...s.animation, ...patch } }));
      },
      getTransition() {
        const { animation } = get();
        return getTransitionFromModalAnimation(animation);
      },
    }),
    {
      name: "modal-store",
      partialize: (state) => ({
        animation: state.animation,
      }),
    },
  ),
);
