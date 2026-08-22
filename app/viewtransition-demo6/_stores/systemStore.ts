"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type SystemSettings = {
  columns: number;
  screenWidth: number;
};

type SystemState = {
  settings: SystemSettings;
};

type SystemAction = {
  setSettings: (settings: Partial<SystemState["settings"]>) => void;
  resetSettings: () => void;
};

type SystemStore = SystemState & SystemAction;

const defaultSystemState: SystemState = {
  settings: {
    columns: 8,
    screenWidth: 1920,
  },
} as const;

export const useSystemStore = create<SystemStore>()(
  persist(
    (set) => ({
      ...defaultSystemState,
      setSettings(settings) {
        set((state) => ({
          settings: { ...state.settings, ...settings },
        }));
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
