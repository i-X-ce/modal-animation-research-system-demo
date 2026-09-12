"use client";

import { BezierDefinition, EasingDefinition, Transition } from "motion";
import { ReactNode } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useSystemStore } from "./systemStore";
import { useAlbumStore } from "./albumStore";

export const ANIMATION_TYPES = ["view", "classic", "none"] as const;
export type AnimationType = (typeof ANIMATION_TYPES)[number];

export const BACKDROP_TYPES = ["blur", "white", "black"] as const;
export type BackdropType = (typeof BACKDROP_TYPES)[number];

export type ModalSettings = {
  type: AnimationType; // アニメーションの種類（view: ViewTransition風, classic: スライドイン, none: 無し）
  easing: Exclude<EasingDefinition, BezierDefinition>; // アニメーションのイージング
  duration: number; // アニメーションの時間（秒）
  coverage: number; // 画面占有率
  backdrop: BackdropType; // 背景の種類（blur: ぼかし, white: 白, black: 黒）
};

type ModalState = {
  open: boolean;
  name: string | null;
  content: ReactNode | null;
  settings: ModalSettings;
  isAnimation: boolean;
};

type ModalAction = {
  openModal: (content: ReactNode, name?: string) => void;
  closeModal: () => void;
  onExitComplete: () => void;
  setSettings: (settings: Partial<ModalState["settings"]>) => void;
  resetSettings: () => void;
  setIsAnimation: (isAnimation: boolean) => void;
};

type ModalStore = ModalState & ModalAction;

const defaultModalState: ModalState = {
  open: false,
  name: null,
  content: null,
  settings: {
    type: "view",
    easing: "easeInOut",
    duration: 0.5,
    coverage: 0.5,
    backdrop: "blur",
  },
  isAnimation: false,
} as const;

export const useModalStore = create<ModalStore>()(
  persist(
    (set) => ({
      ...defaultModalState,
      openModal(content: ReactNode, name?: string) {
        useSystemStore.getState().openModal();
        set({ open: true, content, name: name || null });
      },
      closeModal() {
        const isOpenInformation = useAlbumStore.getState().isOpenInformation;
        const lockInformation =
          useSystemStore.getState().settings.lockInformation;
        if (isOpenInformation && lockInformation) {
          return;
        }
        useAlbumStore.getState().closeInformation();
        useSystemStore.getState().closeModal();
        set({ open: false });
      },
      onExitComplete() {
        set({ content: null, name: null });
      },
      setSettings(settings) {
        set((state) => ({
          settings: { ...state.settings, ...settings },
        }));
      },
      resetSettings() {
        set({ settings: defaultModalState.settings });
      },
      setIsAnimation(isAnimation) {
        set({ isAnimation });
      },
    }),
    {
      name: "modal-store8",
      partialize: (state) => ({
        settings: state.settings,
      }),
    },
  ),
);

export const useModalTransition = (): Transition => {
  const { settings } = useModalStore();
  switch (settings.type) {
    case "none":
      return { duration: 0 };
    case "classic":
      return {
        ease: settings.easing,
        duration: settings.duration,
      };
    case "view":
      return {
        ease: settings.easing,
        duration: settings.duration,
      };
    default:
      return { duration: 0 };
  }
};
