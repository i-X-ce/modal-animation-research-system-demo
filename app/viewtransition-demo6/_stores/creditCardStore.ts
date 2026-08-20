"use client";

import { create } from "zustand";
import { CreditCard } from "../_types/creditCard";

type RandomCreditKey = Exclude<keyof CreditCard, "id">; // ランダムを適用するCreditCardのキー

export interface DisplayCreditCard {
  id: CreditCard["id"];
  imageCreditCard: CreditCard; // 画像表示用のクレジットカード情報
  textCreditCard: CreditCard; // テキスト表示用のクレジットカード情報
  checked: Record<RandomCreditKey, boolean>; // チェック済みのフィールドを記録するためのオブジェクト
  submitted: boolean; // 送信済みかどうか
}

interface CreditCardSettings {
  numberOfCards: number; // 表示するクレジットカードの数
}

type CreditCardState = {
  creditCards: DisplayCreditCard[];
  settings: CreditCardSettings;
};

type CreditCardActions = {
  submitCreditCard: (id: string) => void;
  toggleFieldCheck: (
    id: string,
    field: Exclude<keyof CreditCard, "id">,
  ) => void;
  resetCreditCards: () => void;
  setSettings: (settings: Partial<CreditCardSettings>) => void;
  resetSettings: () => void;
};

type CreditCardStore = CreditCardState & CreditCardActions;

const generateDisplayCreditCard = (index: number): DisplayCreditCard => {
  const id = `c${index}`;
  const cardNumber = Array.from({ length: 4 })
    .map(() => Math.floor(Math.random() * 9000) + 1000)
    .join(" ");
  const cardHolder = `Card Holder ${index}`;
  const expirationMonth = `${Math.floor(Math.random() * 12) + 1}`.padStart(
    2,
    "0",
  );
  const expirationYear = `${Math.floor(Math.random() * 5) + 23}`;
  const imageCreditCard: CreditCard = {
    id,
    cardNumber,
    cardHolder,
    expirationMonth,
    expirationYear,
  };

  const randomizerChar = (str: string): string => {
    const strs = str.split(" ");
    const strsIndex = Math.floor(Math.random() * strs.length);
    const charsIndex = Math.floor(Math.random() * strs[strsIndex].length);
    const targetChar = strs[strsIndex][charsIndex];
    const chars = [
      ...(targetChar.match(/[A-Z]/)
        ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        : "0123456789"),
    ].filter((c) => c !== targetChar);
    const newChar = chars[Math.floor(Math.random() * chars.length)];
    strs[strsIndex] =
      strs[strsIndex].substring(0, charsIndex) +
      newChar +
      strs[strsIndex].substring(charsIndex + 1);
    return strs.join(" ");
  };

  const randomKeys: RandomCreditKey[] = [
    "cardNumber",
    "cardHolder",
    "expirationMonth",
    "expirationYear",
  ];

  const randomIndex = Math.floor(Math.random() * randomKeys.length);

  const textCreditCard: CreditCard =
    Math.random() < 1
      ? {
          ...imageCreditCard,
          [randomKeys[randomIndex]]: randomizerChar(
            imageCreditCard[randomKeys[randomIndex]],
          ),
        }
      : { ...imageCreditCard };

  return {
    id,
    imageCreditCard,
    textCreditCard,
    checked: {
      cardNumber: false,
      cardHolder: false,
      expirationMonth: false,
      expirationYear: false,
    },
    submitted: false,
  };
};

export const MAX_NUMBER_OF_CARDS = 100;

const defaultCreditCardState: CreditCardState = {
  creditCards: Array.from({ length: MAX_NUMBER_OF_CARDS }, (_, index) =>
    generateDisplayCreditCard(index),
  ),
  settings: {
    numberOfCards: MAX_NUMBER_OF_CARDS,
  },
} as const;

export const useCreditCardStore = create<CreditCardStore>()((set) => ({
  ...defaultCreditCardState,
  submitCreditCard(id: string) {
    set((state) => ({
      creditCards: state.creditCards.map((card) =>
        card.id === id ? { ...card, submitted: true } : card,
      ),
    }));
  },
  toggleFieldCheck(id: string, field: Exclude<keyof CreditCard, "id">) {
    set((state) => ({
      creditCards: state.creditCards.map((card) =>
        card.id === id
          ? {
              ...card,
              checked: {
                ...card.checked,
                [field]: !card.checked[field],
              },
            }
          : card,
      ),
    }));
  },
  resetCreditCards() {
    set(() => ({
      creditCards: Array.from({ length: MAX_NUMBER_OF_CARDS }, (_, index) =>
        generateDisplayCreditCard(index),
      ),
    }));
  },
  setSettings(settings: Partial<CreditCardSettings>) {
    set((state) => ({
      settings: {
        ...state.settings,
        ...settings,
      },
    }));
  },
  resetSettings() {
    set(() => ({
      settings: {
        ...defaultCreditCardState.settings,
      },
    }));
  },
}));
