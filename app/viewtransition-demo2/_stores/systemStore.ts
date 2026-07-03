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

export const SYSTEM_LOG_TAG = {
  START: "start",
  ADD: "add",
  REMOVE: "remove",
  ORDER: "order",
  OPEN_MODAL: "open_modal",
  CLOSE_MODAL: "close_modal",
} as const;

export type SystemLogTag = (typeof SYSTEM_LOG_TAG)[keyof typeof SYSTEM_LOG_TAG];

export type SystemLog = {
  tag: (typeof SYSTEM_LOG_TAG)[keyof typeof SYSTEM_LOG_TAG];
  timestamp: number;
  message?: string;
};

const generateLog = (tag: SystemLogTag, message?: string): SystemLog => ({
  tag,
  timestamp: Temporal.Now.instant().epochMilliseconds,
  message,
});

type SystemStore = {
  systemStep: SystemStep;
  systemLog: SystemLog[];
};

type LogoFile = {
  url: string;
  filename: string;
};

type SystemAction = {
  addSystemLog: (tag: SystemLogTag, message?: string) => void;

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
};

type SystemState = SystemStore & SystemAction;

const defaultSystemState: SystemStore = {
  systemStep: SYSTEM_STEP.START,
  systemLog: [],
};

export const useSystemStore = create<SystemState>((set, get) => ({
  ...defaultSystemState,
  addSystemLog(tag, message) {
    set((s) => ({
      systemLog: [...s.systemLog, generateLog(tag, message)],
    }));
  },

  startOrdering() {
    set(() => ({ systemStep: SYSTEM_STEP.ORDERING }));
    const { animation } = useModalStore.getState();
    get().addSystemLog(
      SYSTEM_LOG_TAG.START,
      `${Object.entries(animation)
        .map(([key, value]) => `${key}=${value}`)
        .join(" | ")}`,
    );
  },
  addItem(productId, options, qty) {
    get().addSystemLog(
      SYSTEM_LOG_TAG.ADD,
      `productId=${productId} | qty=${qty} | ${options.map((o) => `${o.id}=${o.value}`).join(" | ")}`,
    );
  },
  removeItem(productId, index) {
    get().addSystemLog(
      SYSTEM_LOG_TAG.REMOVE,
      `productId=${productId} | index=${index}`,
    );
  },
  order() {
    set(() => ({ systemStep: SYSTEM_STEP.END }));
    get().addSystemLog(SYSTEM_LOG_TAG.ORDER);
  },
  openModal() {
    get().addSystemLog(SYSTEM_LOG_TAG.OPEN_MODAL);
  },
  closeModal() {
    get().addSystemLog(SYSTEM_LOG_TAG.CLOSE_MODAL);
  },
  jsonLink() {
    const json = JSON.stringify(get().systemLog, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    return {
      url: URL.createObjectURL(blob),
      filename: fileName("json"),
    };
  },
  csvLink() {
    const csv = get()
      .systemLog.map(
        (log) => `${log.timestamp},${log.tag},${log.message ?? ""}`,
      )
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    return {
      url: URL.createObjectURL(blob),
      filename: fileName("csv"),
    };
  },
  end() {
    set(() => ({ systemStep: SYSTEM_STEP.START, systemLog: [] }));
  },
}));

const fileName = (extension: "json" | "csv") =>
  `system_log_${Temporal.Now.plainDateTimeISO()
    .toLocaleString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
    .toString()
    .replace(/\D/g, "")}.${extension}`;
