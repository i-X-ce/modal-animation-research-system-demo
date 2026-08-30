import { create } from "zustand";
import { persist } from "zustand/middleware";

type SystemSettings = {
  numberOfCards: number;
  columns: number;
  indexType: IndexType;
  lockInformation: boolean; // 画像情報を表示中にモーダルを閉じることができるか
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
    indexType: "datetime",
    lockInformation: false,
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

export const INDEX_TYPES = ["date", "datetime", "number"] as const;

export type IndexType = (typeof INDEX_TYPES)[number];

const MIN_DATE = new Date("2023-01-01T00:00:00Z");
const MAX_DATE = new Date("2025-01-01T00:00:00Z");

export const generateIndex = () => {
  const minDate = new Date(MIN_DATE);
  const maxDate = new Date(MAX_DATE);
  const randomTime =
    minDate.getTime() + Math.random() * (maxDate.getTime() - minDate.getTime());
  return new Date(randomTime).getTime();
};

export const formatIndex = (index: number, indexType: IndexType) => {
  const date = new Date(index);
  switch (indexType) {
    case "date":
      return date.toLocaleDateString("us-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    case "datetime":
      return date.toLocaleString("us-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
    case "number":
      const range = MAX_DATE.getTime() - MIN_DATE.getTime();
      const maxNumber = 1000; // 表示の最大値
      const diff = index - MIN_DATE.getTime();
      return Math.floor((maxNumber * diff) / range).toString();
  }
};
