"use client";

import { BezierDefinition, EasingDefinition, Transition } from "motion";
import { ReactNode } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ConfigurationMap } from "../_types/setting";
import { useSystemStore } from "./systemStore";

export const ANIMATION_TYPES = ["view", "classic", "none"] as const;

export type AnimationType = (typeof ANIMATION_TYPES)[number];

type ModalState = {
  open: boolean;
  name: string | null;
  content: ReactNode | null;
  settings: typeof MODAL_CONFIG;
  isAnimation: boolean;
};

type ModalAction = {
  openModal: (content: ReactNode, name?: string) => void;
  closeModal: () => void;
  onExitComplete: () => void;
  setSettings: <C extends keyof typeof MODAL_CONFIG>(
    key: C,
    settings: Partial<ConfigurationMap[C]["value"]>,
  ) => void;
  resetSettings: () => void;
  setIsAnimation: (isAnimation: boolean) => void;
};

type ModalStore = ModalState & ModalAction;

export const MODAL_CONFIG = {
  type: {
    type: "selector",
    label: "アニメーションの種類",
    options: ["view", "classic", "none"],
    value: "view",
  },
  easing: {
    type: "selector",
    label: "イージング",
    options: [
      "linear",
      "easeIn",
      "easeOut",
      "easeInOut",
      "circIn",
      "circOut",
      "circInOut",
      "backIn",
      "backOut",
      "backInOut",
      "anticipate",
    ] as const satisfies Exclude<EasingDefinition, BezierDefinition>[],
    value: "easeInOut" satisfies Exclude<EasingDefinition, BezierDefinition>,
  },
  duration: {
    type: "number",
    label: "アニメーションの時間",
    unit: "秒",
    min: 0,
    max: 5,
    step: 0.1,
    decimalScale: 1,
    value: 0.5,
  },
  coverage: {
    type: "number",
    label: "画面占有率",
    unit: "",
    min: 0.1,
    max: 1,
    step: 0.01,
    decimalScale: 2,
    value: 0.5,
  },
} satisfies ConfigurationMap;

const defaultModalState: ModalState = {
  open: false,
  name: null,
  content: null,
  settings: MODAL_CONFIG,
  isAnimation: false,
} as const;

export const useModalStore = create<ModalStore>()(
  persist(
    (set) => ({
      ...defaultModalState,
      openModal(content: ReactNode, name?: string) {
        set({ open: true, content, name: name || null });
        useSystemStore.getState().openModal();
      },
      closeModal() {
        set({ open: false });
        useSystemStore.getState().closeModal();
      },
      onExitComplete() {
        set({ content: null, name: null });
      },
      setSettings(key, newValue) {
        set((state) => {
          if (state.settings[key] === undefined) {
            console.warn(`Invalid settings key: ${key}`);
            return state;
          }
          return {
            settings: {
              ...state.settings,
              [key]: {
                ...(state.settings[key] ?? {}),
                value: newValue,
              },
            } as typeof state.settings,
          };
        });
      },
      resetSettings() {
        set({ settings: defaultModalState.settings });
      },
      setIsAnimation(isAnimation) {
        set({ isAnimation });
      },
    }),
    {
      name: "modal-store7",
      partialize: (state) => ({
        settings: state.settings,
      }),
    },
  ),
);

export const useModalTransition = (): Transition => {
  const settings = useModalStore((s) => s.settings);
  switch (settings.type.value) {
    case "none":
      return { duration: 0 };
    case "classic":
      return {
        ease: settings.easing.value as Exclude<
          EasingDefinition,
          BezierDefinition
        >,
        duration: settings.duration.value,
      };
    case "view":
      return {
        ease: settings.easing.value as Exclude<
          EasingDefinition,
          BezierDefinition
        >,
        duration: settings.duration.value,
      };
    default:
      return { duration: 0 };
  }
};
