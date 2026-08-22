"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ConfigurationMap } from "../_types/setting";

type SystemState = {
  settings: typeof SYSTEM_CONFIG;
};

type SystemAction = {
  setSettings: <C extends keyof typeof SYSTEM_CONFIG>(
    key: C,
    settings: Partial<ConfigurationMap[C]["value"]>,
  ) => void;
  resetSettings: () => void;
};

type SystemStore = SystemState & SystemAction;

export const SYSTEM_CONFIG = {
  columns: {
    type: "number",
    label: "一行に表示するカード枚数",
    unit: "枚",
    min: 1,
    max: 20,
    step: 1,
    decimalScale: 0,
    value: 8,
  },
  screenWidth: {
    type: "number",
    label: "画面幅",
    unit: "px",
    min: 0,
    max: 1920,
    step: 10,
    decimalScale: 0,
    value: 1920,
  },
} satisfies ConfigurationMap;

const defaultSystemState: SystemState = {
  settings: SYSTEM_CONFIG,
} as const;

export const useSystemStore = create<SystemStore>()(
  persist(
    (set) => ({
      ...defaultSystemState,
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
        set({ settings: defaultSystemState.settings });
      },
    }),
    {
      name: "system-store6",
      partialize: (state) => ({ settings: state.settings }),
    },
  ),
);
