import { create } from "zustand";
import { persist } from "zustand/middleware";

type SystemSettings = {
  numberOfCards: number;
  columns: number;
};

type SystemState = {
  settings: SystemSettings;
};

type SystemAction = {
  setSettings: (settings: Partial<SystemState["settings"]>) => void;
  resetSettings: () => void;
};

type SystemStore = SystemState & SystemAction;

export const MAX_NUMBER_OF_CARDS = 100;

const defaultSystemState: SystemState = {
  settings: {
    numberOfCards: MAX_NUMBER_OF_CARDS,
    columns: 8,
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
      name: "system-store5",
      partialize: (state) => ({ settings: state.settings }),
    },
  ),
);
