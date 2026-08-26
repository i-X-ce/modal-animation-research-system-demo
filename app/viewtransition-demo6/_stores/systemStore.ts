"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ConfigurationMap } from "../_types/setting";

export const SYSTEM_STEP = {
  START: "start",
  CHECKING: "checking",
  END: "end",
} as const;

type SystemStep = (typeof SYSTEM_STEP)[keyof typeof SYSTEM_STEP];

export const LOG_TAG = {
  START: "start",
  END: "end",
  CHECK: "check",
  SUBMIT: "submit",
  OPEN_MODAL: "open_modal",
  CLOSE_MODAL: "close_modal",
  MOUSE_MOVE: "mouse_move",
} as const;

export type LogTag = (typeof LOG_TAG)[keyof typeof LOG_TAG];

export interface SystemLog {
  type: "system_log";
  tag: LogTag;
  timestamp: number;
  message: string;
}

export interface MouseLog {
  type: "mouse_log";
  timestamp: number;
  x: number;
  y: number;
}

const generateSystemLog = (tag: LogTag, message?: string): SystemLog => ({
  type: "system_log",
  tag,
  timestamp: Date.now(),
  message: message || "",
});

interface SystemState {
  settings: typeof SYSTEM_CONFIG;
  systemStep: SystemStep;
  systemLog: SystemLog[];
  mouseLog: MouseLog[];
}

type SystemAction = {
  start: () => void; // システムの開始
  complete: () => void; // チェック完了
  end: () => void; // システムの終了
  submit: () => void; // 送信ボタンを押す
  check: () => void; // チェックボックスにチェック
  openModal: () => void; // モーダルを開く
  closeModal: () => void; // モーダルを閉じる
  mouseMove: (x: number, y: number) => void; // マウスの移動
  addSystemLog: (tag: LogTag, message?: string) => void; // システムログを追加
  addMouseLog: (x: number, y: number) => void; // マウスログを追加
  setSettings: <C extends keyof typeof SYSTEM_CONFIG>(
    key: C,
    settings: Partial<ConfigurationMap[C]["value"]>,
  ) => void; // 設定を更新
  resetSettings: () => void; // 設定をリセット
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
    value: 5,
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
  systemStep: SYSTEM_STEP.START,
  systemLog: [],
  mouseLog: [],
} as const;

export const useSystemStore = create<SystemStore>()(
  persist(
    (set, get) => ({
      ...defaultSystemState,
      start() {
        set(() => ({ systemStep: SYSTEM_STEP.CHECKING }));
      },
      complete() {
        set(() => ({ systemStep: SYSTEM_STEP.END }));
      },
      end() {
        set(() => ({
          systemStep: SYSTEM_STEP.START,
          systemLog: [],
          mouseLog: [],
        }));
      },
      submit() {
        set((state) => ({
          systemLog: [...state.systemLog, generateSystemLog(LOG_TAG.SUBMIT)],
        }));
      },
      check() {
        set((state) => ({
          systemLog: [...state.systemLog, generateSystemLog(LOG_TAG.CHECK)],
        }));
      },
      openModal() {
        set((state) => ({
          systemLog: [
            ...state.systemLog,
            generateSystemLog(LOG_TAG.OPEN_MODAL),
          ],
        }));
      },
      closeModal() {
        set((state) => ({
          systemLog: [
            ...state.systemLog,
            generateSystemLog(LOG_TAG.CLOSE_MODAL),
          ],
        }));
      },
      mouseMove(x, y) {
        if (get().systemStep !== SYSTEM_STEP.CHECKING) {
          return;
        }
        set((s) => ({
          mouseLog: [
            ...s.mouseLog,
            { type: "mouse_log", x, y, timestamp: Date.now() },
          ],
        }));
      },
      addSystemLog(tag, message) {
        set((state) => ({
          systemLog: [...state.systemLog, generateSystemLog(tag, message)],
        }));
      },
      addMouseLog(x, y) {
        set((state) => ({
          mouseLog: [
            ...state.mouseLog,
            { type: "mouse_log", timestamp: Date.now(), x, y },
          ],
        }));
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
        set({ settings: defaultSystemState.settings });
      },
    }),
    {
      name: "system-store7",
      partialize: (state) => ({ settings: state.settings }),
    },
  ),
);
