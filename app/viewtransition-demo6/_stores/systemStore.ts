"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ConfigurationMap } from "../_types/setting";
import { useModalStore } from "./modalStore";
import { CreditCard } from "../_types/creditCard";
import { useCreditCardStore } from "./creditCardStore";

export const SYSTEM_STEP = {
  START: "start",
  CHECKING: "checking",
  END: "end",
} as const;

type SystemStep = (typeof SYSTEM_STEP)[keyof typeof SYSTEM_STEP];

export const LOG_TAG = {
  START: "start",
  COMPLETE: "complete",
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

export interface OutputLog {
  tag: LogTag;
  timestamp: number;
  x: number;
  y: number;
  message: string;
}

const generateSystemLog = (tag: LogTag, message?: string): SystemLog => {
  return {
    type: "system_log",
    tag,
    timestamp: Date.now(),
    message: message || "",
  };
};

const combineLogs = (
  systemLog: SystemLog[],
  mouseLog: MouseLog[],
): OutputLog[] => {
  const combinedLog: OutputLog[] = [...systemLog, ...mouseLog]
    .sort((a, b) => a.timestamp - b.timestamp)
    .reduce((acc, log) => {
      const lastLog = acc[acc.length - 1];
      const newLog: OutputLog = (() => {
        if (log.type === "system_log") {
          return {
            tag: log.tag,
            timestamp: log.timestamp,
            x: lastLog?.x ?? 0,
            y: lastLog?.y ?? 0,
            message: log.message,
          };
        } else {
          return {
            tag: LOG_TAG.MOUSE_MOVE,
            timestamp: log.timestamp,
            x: log.x,
            y: log.y,
            message: "",
          };
        }
      })();
      return [...acc, newLog];
    }, [] as OutputLog[]);
  return combinedLog;
};

interface SystemState {
  settings: typeof SYSTEM_CONFIG;
  systemStep: SystemStep;
  systemLog: SystemLog[];
  mouseLog: MouseLog[];
}

interface LogFile {
  url: string;
  filename: string;
}

type SystemAction = {
  start: () => void; // システムの開始
  complete: () => void; // チェック完了
  end: () => void; // システムの終了
  submit: (cardId: CreditCard["id"]) => void; // 送信ボタンを押す
  check: (
    id: string,
    field: Exclude<keyof CreditCard, "id">,
    value: boolean,
  ) => void; // チェックボックスにチェック
  openModal: () => void; // モーダルを開く
  closeModal: () => void; // モーダルを閉じる
  mouseMove: (x: number, y: number) => void; // マウスの移動
  addMouseLog: (x: number, y: number) => void; // マウスログを追加
  setSettings: <C extends keyof typeof SYSTEM_CONFIG>(
    key: C,
    settings: Partial<ConfigurationMap[C]["value"]>,
  ) => void; // 設定を更新
  resetSettings: () => void; // 設定をリセット
  csvLink: () => LogFile;
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
  requiresAllSubmits: {
    type: "boolean",
    label: "全て送信しないとチェック完了できなくする",
    value: true,
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
        const modalSettings = useModalStore.getState().settings;
        const creditCardSettings = useCreditCardStore.getState().settings;
        set((state) => ({
          systemStep: SYSTEM_STEP.CHECKING,
          systemLog: [
            ...state.systemLog,
            generateSystemLog(
              LOG_TAG.START,
              [
                ...Object.entries(state.settings),
                ...Object.entries(modalSettings),
                ...Object.entries(creditCardSettings),
              ]
                .map(([key, config]) => `${key}=${config.value}`)
                .join(" | "),
            ),
          ],
        }));
      },
      complete() {
        set((s) => ({
          systemStep: SYSTEM_STEP.END,
          systemLog: [...s.systemLog, generateSystemLog(LOG_TAG.COMPLETE)],
        }));
      },
      end() {
        set(() => ({
          systemStep: SYSTEM_STEP.START,
          systemLog: [],
          mouseLog: [],
        }));
      },
      submit(cardId) {
        set((state) => ({
          systemLog: [
            ...state.systemLog,
            generateSystemLog(LOG_TAG.SUBMIT, `cardId=${cardId}`),
          ],
        }));
      },
      check(id, field, value) {
        set((state) => ({
          systemLog: [
            ...state.systemLog,
            generateSystemLog(
              LOG_TAG.CHECK,
              `cardId=${id} | field=${field} | value=${String(value)}`,
            ),
          ],
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
      csvLink() {
        const { systemLog, mouseLog } = useSystemStore.getState();
        const combinedLogs = combineLogs(systemLog, mouseLog);

        const escapeCSV = (value: string | number) => {
          if (value === null || value === undefined) return '""';
          const str = String(value);
          return `"${str.replace(/"/g, '""')}"`;
        };

        const headers = Object.keys(combinedLogs[0] || {})
          .map(escapeCSV)
          .join(",");

        const rows = combinedLogs.map((log) =>
          Object.values(log).map(escapeCSV).join(","),
        );

        const csv = [headers, ...rows].join("\n");

        const bom = new Uint8Array([0xef, 0xbb, 0xbf]);
        const blob = new Blob([bom, csv], { type: "text/csv;charset=utf-8;" });

        return {
          url: URL.createObjectURL(blob),
          filename: fileName("csv"),
        };
      },
    }),
    {
      name: "system-store6",
      partialize: (state) => ({ settings: state.settings }),
    },
  ),
);

const fileName = (extension: "json" | "csv") =>
  `system_log_${new Date()
    .toLocaleString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
    .replace(/\D/g, "")}.${extension}`;
