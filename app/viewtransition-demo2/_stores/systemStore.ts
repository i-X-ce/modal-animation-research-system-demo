"use client";

import { create } from "zustand";
import { ProductOptionValue } from "../_types/product";
import { useModalStore } from "./modalStore";

export const CART_STEP = {
  START: "start",
  ORDERING: "ordering",
  END: "end",
} as const;

export type SystemStep = (typeof CART_STEP)[keyof typeof CART_STEP];

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
};

type SystemState = SystemStore & SystemAction;

const defaultSystemState: SystemStore = {
  systemStep: CART_STEP.START,
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
    set(() => ({ systemStep: CART_STEP.ORDERING }));
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
    set(() => ({ systemStep: CART_STEP.END }));
    get().addSystemLog(SYSTEM_LOG_TAG.ORDER);
  },
  openModal() {
    get().addSystemLog(SYSTEM_LOG_TAG.OPEN_MODAL);
  },
  closeModal() {
    get().addSystemLog(SYSTEM_LOG_TAG.CLOSE_MODAL);
  },
}));
