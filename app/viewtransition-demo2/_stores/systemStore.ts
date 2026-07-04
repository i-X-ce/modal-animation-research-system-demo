"use client";

import { create } from "zustand";
import { ProductOptionValue } from "../_types/product";
import { useModalStore } from "./modalStore";

export const SYSTEM_STEP = {
  START: "start",
  ORDERING: "ordering",
  END: "end",
} as const;

export type SystemStep = (typeof SYSTEM_STEP)[keyof typeof SYSTEM_STEP];

export const LOG_TAG = {
  START: "start",
  ADD: "add",
  REMOVE: "remove",
  ORDER: "order",
  OPEN_MODAL: "open_modal",
  CLOSE_MODAL: "close_modal",
  MOUSE_MOVE: "mouse_move",
} as const;

export type LogTag = (typeof LOG_TAG)[keyof typeof LOG_TAG];

export type SystemLog = {
  _type: "system_log";
  tag: (typeof LOG_TAG)[keyof typeof LOG_TAG];
  timestamp: number;
  message: string;
};

export type MouseLog = {
  _type: "mouse_log";
  timestamp: number;
  x: number;
  y: number;
};

const generateSystemLog = (tag: LogTag, message?: string): SystemLog => ({
  _type: "system_log",
  tag,
  timestamp: Date.now(),
  message: message || "",
});

type SystemStore = {
  systemStep: SystemStep;
  systemLog: SystemLog[];
  mouseLog: MouseLog[];
};

type LogoFile = {
  url: string;
  filename: string;
};

type SystemAction = {
  addSystemLog: (tag: LogTag, message?: string) => void;
  startOrdering: () => void;
  addItem: (
    productId: string,
    options: ProductOptionValue[],
    qty: number,
  ) => void;
  removeItem: (productId: string, index: number) => void;
  order: () => void;
  openModal: () => void;
  closeModal: () => void;
  jsonLink: () => LogoFile;
  csvLink: () => LogoFile;
  end: () => void;
  mouseMove: (x: number, y: number) => void;
};

type SystemState = SystemStore & SystemAction;

const defaultSystemState: SystemStore = {
  systemStep: SYSTEM_STEP.START,
  systemLog: [],
  mouseLog: [],
};

type OutputLog = {
  tag: LogTag;
  timestamp: number;
  x: number;
  y: number;
  message: string;
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
        if (log._type === "system_log") {
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

export const useSystemStore = create<SystemState>((set, get) => ({
  ...defaultSystemState,
  addSystemLog(tag, message) {
    set((s) => ({
      systemLog: [...s.systemLog, generateSystemLog(tag, message)],
    }));
  },

  startOrdering() {
    set(() => ({ systemStep: SYSTEM_STEP.ORDERING }));
    const { animation } = useModalStore.getState();
    get().addSystemLog(
      LOG_TAG.START,
      `${Object.entries(animation)
        .map(([key, value]) => `${key}=${value}`)
        .join(" | ")}`,
    );
  },
  addItem(productId, options, qty) {
    get().addSystemLog(
      LOG_TAG.ADD,
      `productId=${productId} | qty=${qty} | ${options.map((o) => `${o.id}=${o.value}`).join(" | ")}`,
    );
  },
  removeItem(productId, index) {
    get().addSystemLog(
      LOG_TAG.REMOVE,
      `productId=${productId} | index=${index}`,
    );
  },
  order() {
    set(() => ({ systemStep: SYSTEM_STEP.END }));
    get().addSystemLog(LOG_TAG.ORDER);
  },
  openModal() {
    get().addSystemLog(LOG_TAG.OPEN_MODAL);
  },
  closeModal() {
    get().addSystemLog(LOG_TAG.CLOSE_MODAL);
  },
  jsonLink() {
    const { systemLog, mouseLog } = get();
    const combinedLogs = combineLogs(systemLog, mouseLog);

    const json = JSON.stringify(combinedLogs, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    return {
      url: URL.createObjectURL(blob),
      filename: fileName("json"),
    };
  },
  csvLink() {
    const { systemLog, mouseLog } = get();
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
  end() {
    set(() => ({ systemStep: SYSTEM_STEP.START, systemLog: [], mouseLog: [] }));
  },
  mouseMove(x, y) {
    if (get().systemStep !== SYSTEM_STEP.ORDERING) return;

    set((s) => ({
      mouseLog: [
        ...s.mouseLog,
        {
          _type: "mouse_log",
          x,
          y,
          timestamp: Date.now(),
        },
      ],
    }));
  },
}));

const fileName = (extension: "json" | "csv") =>
  `system_log_${
    new Date()
      .toLocaleString("ja-JP", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
      .replace(/\D/g, "") + `.${extension}`
  }.${extension}`;
