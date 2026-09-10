import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useModalStore } from "./modalStore";
import { Photo } from "../_types/photo";

export const SYSTEM_STEP = {
  START: "start",
  DOING: "doing",
  END: "end",
} as const;

type SystemStep = (typeof SYSTEM_STEP)[keyof typeof SYSTEM_STEP];

export const LOG_TAG = {
  START: "start", // システムの開始
  COMPLETE: "complete", // タスク完了
  END: "end", // システムの終了
  DELETE: "delete", // 画像の削除
  SWAP: "swap", // 画像の入れ替え
  OPEN_INFORMATION: "open_information", // 画像情報の表示
  CLOSE_INFORMATION: "close_information", // 画像情報の非表示
  OPEN_MODAL: "open_modal", // モーダルを開く
  CLOSE_MODAL: "close_modal", // モーダルを閉じる
  MOUSE_MOVE: "mouse_move", // マウスの移動
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

const generateSystemLog = (tag: LogTag, message?: string): SystemLog => ({
  type: "system_log",
  tag,
  timestamp: Date.now(),
  message: message || "",
});

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

export const PHOTO_INFORMATION_DIRECTIONS = [
  "top",
  "bottom",
  "left",
  "right",
] as const;

type PhotoInformationDirection = (typeof PHOTO_INFORMATION_DIRECTIONS)[number];

type SystemSettings = {
  numberOfCards: number;
  columns: number;
  indexType: IndexType;
  lockInformation: boolean; // 画像情報を表示中にモーダルを閉じることができるか
  displayIndexOnModal: boolean; // モーダルにインデックスを表示するか
  photoInformationDirection: PhotoInformationDirection; // 画像情報の表示位置
};

type SystemState = {
  settings: SystemSettings;
  systemStep: SystemStep;
  systemLog: SystemLog[];
  mouseLog: MouseLog[];
};

type LogFile = {
  url: string;
  filename: string;
};

type SystemAction = {
  setSettings: (settings: Partial<SystemState["settings"]>) => void;
  resetSettings: () => void;
  start: () => void; // システムの開始
  complete: () => void; // チェック完了
  end: () => void; // システムの終了
  removePhoto: (photoId: Photo["id"]) => void; // 画像の削除
  movePhotos: (photoId1: Photo["id"], photoId2: Photo["id"]) => void; // 画像の入れ替え
  openInformation: () => void; // 画像情報の表示
  closeInformation: () => void; // 画像情報の非表示
  openModal: () => void; // モーダルを開く
  closeModal: () => void; // モーダルを閉じる
  mouseMove: (x: number, y: number) => void; // マウスの移動
  csvLink: () => LogFile; // CSVリンクを生成
};

type SystemStore = SystemState & SystemAction;

export const MAX_NUMBER_OF_CARDS = 100;

const defaultSystemState: SystemState = {
  settings: {
    numberOfCards: 18,
    columns: 6,
    indexType: "date",
    lockInformation: false,
    displayIndexOnModal: true,
    photoInformationDirection: "bottom",
  },
  systemStep: SYSTEM_STEP.START,
  systemLog: [],
  mouseLog: [],
} as const;

export const useSystemStore = create<SystemStore>()(
  persist(
    (set, get) => ({
      ...defaultSystemState,
      setSettings(settings) {
        set((state) => ({
          settings: { ...state.settings, ...settings },
        }));
      },
      resetSettings() {
        set({ settings: defaultSystemState.settings });
      },
      start() {
        const modalSettings = useModalStore.getState().settings;
        set((state) => ({
          systemStep: SYSTEM_STEP.DOING,
          systemLog: [
            ...state.systemLog,
            generateSystemLog(
              LOG_TAG.START,
              [
                ...Object.entries(state.settings),
                ...Object.entries(modalSettings),
              ]
                .map(([key, value]) => `${key}=${value}`)
                .join(" | "),
            ),
          ],
        }));
      },
      complete() {
        set((state) => ({
          systemStep: SYSTEM_STEP.END,
          systemLog: [...state.systemLog, generateSystemLog(LOG_TAG.COMPLETE)],
        }));
      },
      end() {
        set(() => ({
          systemStep: SYSTEM_STEP.START,
          systemLog: [],
          mouseLog: [],
        }));
      },
      removePhoto(photoId) {
        set((state) => ({
          systemLog: [
            ...state.systemLog,
            generateSystemLog(LOG_TAG.DELETE, `photoId=${photoId}`),
          ],
        }));
      },
      movePhotos(photoId1, photoId2) {
        set((state) => ({
          systemLog: [
            ...state.systemLog,
            generateSystemLog(
              LOG_TAG.SWAP,
              `photoId1=${photoId1} | photoId2=${photoId2}`,
            ),
          ],
        }));
      },
      openInformation() {
        set((state) => ({
          systemLog: [
            ...state.systemLog,
            generateSystemLog(LOG_TAG.OPEN_INFORMATION),
          ],
        }));
      },
      closeInformation() {
        set((state) => ({
          systemLog: [
            ...state.systemLog,
            generateSystemLog(LOG_TAG.CLOSE_INFORMATION),
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
        if (get().systemStep !== SYSTEM_STEP.DOING) {
          return;
        }
        set((state) => ({
          mouseLog: [
            ...state.mouseLog,
            { type: "mouse_log", timestamp: Date.now(), x, y },
          ],
        }));
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
      name: "system-store7",
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
