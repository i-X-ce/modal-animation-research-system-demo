"use client";

import { create } from "zustand";
import { CreditCard } from "../_types/creditCard";
import { persist } from "zustand/middleware";
import { ConfigurationMap } from "../_types/setting";

type RandomCreditKey = Exclude<keyof CreditCard, "id">; // ランダムを適用するCreditCardのキー

export interface DisplayCreditCard {
  id: CreditCard["id"];
  imageCreditCard: CreditCard; // 画像表示用のクレジットカード情報
  textCreditCard: CreditCard; // テキスト表示用のクレジットカード情報
  checked: Record<RandomCreditKey, boolean>; // チェック済みのフィールドを記録するためのオブジェクト
  submitted: boolean; // 送信済みかどうか
}

type CreditCardState = {
  creditCards: DisplayCreditCard[];
  settings: typeof CREDIT_CARD_CONFIG;
};

type CreditCardActions = {
  submitCreditCard: (id: string) => Promise<void>;
  toggleFieldCheck: (
    id: string,
    field: Exclude<keyof CreditCard, "id">,
  ) => void;
  resetCreditCards: () => void;
  setSettings: <C extends keyof typeof CREDIT_CARD_CONFIG>(
    key: C,
    settings: Partial<ConfigurationMap[C]["value"]>,
  ) => void;
  resetSettings: () => void;
};

type CreditCardStore = CreditCardState & CreditCardActions;

export const CREDIT_CARD_CONFIG = {
  numberOfCards: {
    type: "number",
    label: "表示するクレジットカードの数",
    unit: "枚",
    min: 0,
    max: 100,
    step: 1,
    decimalScale: 0,
    value: 15,
  },
} satisfies ConfigurationMap;

const generateDisplayCreditCard = (index: number): DisplayCreditCard => {
  const id = `c${index}`;
  const cardNumber = Array.from({ length: 4 })
    .map(() => Math.floor(Math.random() * 9000) + 1000)
    .join(" ");

  const randomPick = <T>(arr: T[]): T =>
    arr[Math.floor(Math.random() * arr.length)];
  const firstNames = [
    "REN",
    "HARUTO",
    "MINATO",
    "SOTA",
    "RIKU",
    "YUITO",
    "HARUKI",
    "SOKU",
    "KAYTO",
    "YUSUKE",
    "DAIKI",
    "RYOTA",
    "KAZUMA",
    "TAICHI",
    "SHOHEI",
    "KENSHIN",
    "SOUTAROU",
    "KEN",
    "TAKUMI",
    "HIROTO",
    "SOU",
    "YU",
    "ATO",
    "ITSUKI",
    "ASAHI",
    "RUI",
    "AOI",
    "EITA",
    "HAYATE",
    "RYUSEI",
    "KOTA",
    "YUMA",
    "KENTO",
    "TAIGA",
    "KOSUKE",
    "REN",
    "SHUN",
    "RYO",
    "YAMATO",
    "SOYA",
    "YUSEI",
    "KOTARO",
    "HIKARU",
    "KAZUKI",
    "SHOTA",
    "NAOKI",
    "TATSUYA",
    "KEISUKE",
    "DAISUKE",
    "RYOJI",
    "YUTA",
    "TETSUYA",
    "KENJI",
    "SATOSHI",
    "MAKOTO",
    "SHINGO",
    "JUN",
    "TAKAYUKI",
    "HIROKI",
    "YUICHI",
    "TSUBASA",
    "TAKUYA",
    "SHINJI",
    "KAZUYA",
    "YUKI",
    "KOUKI",
    "TOMoya",
    "KENTO",
    "NAOTO",
    "TAISUKE",
    "HAYATO",
    "SHUNSUKE",
    "RYOTA",
    "DAICHI",
    "YUYA",
    "KOTARO",
    "KEITA",
    "SOICHIRO",
    "YOSHIKI",
    "KAZUHIRO",
    "MEI",
    "HINA",
    "AOI",
    "RINA",
    "RIN",
    "YUI",
    "SAKURA",
    "MIU",
    "KOHARU",
    "ANNA",
    "HINATA",
    "KANA",
    "AKARI",
    "YUKA",
    "MIO",
    "HIKARI",
    "NANAMI",
    "YUNA",
    "KOTO",
    "SHIORI",
    "ERIKA",
    "AYAKA",
    "SAEMI",
    "MIKOTO",
    "MAO",
    "NEO",
    "RIONA",
    "SERA",
    "HIMARI",
    "KIRARI",
    "CHAHARU",
    "YUZUKI",
    "NATSUMI",
    "MARIA",
    "SAYA",
    "KOTONE",
    "MONA",
    "TSUMUGI",
    "RINKA",
    "YOKO",
  ];
  const lastNames = [
    "TANAKA",
    "SUZUKI",
    "TAKAHASHI",
    "WATANABE",
    "ITO",
    "NAKAMURA",
    "KOBAYASHI",
    "KATO",
    "YOSHIDA",
    "YAMADA",
    "SASAKI",
    "YAMAGUCHI",
    "SAITO",
    "MATSUMOTO",
    "INOUE",
    "KIMURA",
    "HAYASHI",
    "SHIMIZU",
    "YAMAZAKI",
    "MORI",
    "ABE",
    "IKEDA",
    "HASHIMOTO",
    "YAMASHITA",
    "ISHIKAWA",
    "NAKAJIMA",
    "MAEDA",
    "FUJITA",
    "OGAWA",
    "GOTO",
    "OKADA",
    "HASEGAWA",
    "MURAKAMI",
    "KONDO",
    "ISHII",
    "SAITO",
    "SAKAO",
    "ENDO",
    "AOKI",
    "FUJII",
    "NISHIKAWA",
    "MIURA",
    "FUJIWARA",
    "OKAMOTO",
    "MATSUDA",
    "NAKAGAWA",
    "NAKANO",
    "HARADA",
    "ONO",
    "TAMURA",
    "TAKEUCHI",
    "KANeko",
    "WADA",
    "NAKAYAMA",
    "ISHIDA",
    "UEHARA",
    "MORIKAWA",
    "KUDO",
    "ISHIKAWA",
    "FUKUDA",
    "KIUCHI",
    "NOMURA",
    "MARUYAMA",
    "MIYAZAKI",
    "MATSUO",
    "KIKUCHI",
    "KOBAYASHI",
    "SANO",
    "ARAI",
    "SUGIYAMA",
    "OISHI",
    "KOJIMA",
    "MIZUNO",
    "HOSOKAWA",
    "SAKATA",
    "TAKAGI",
    "FURUKAWA",
    "UEDA",
    "SHIBATA",
    "SAKAI",
    "NAGAI",
    "OTANI",
    "TANIGUCHI",
    "FUKUSHIMA",
    "HORI",
    "YANO",
    "TAKADA",
    "NISHIDA",
    "HIROSE",
    "KANEKO",
    "KUROKAWA",
    "MITSUI",
    "KUMAGAI",
    "WATARU",
    "MINAMI",
    "IMAI",
    "KOBAYASHI",
    "SHINDO",
    "YOSHIKAWA",
    "NISHIMURA",
  ];
  const cardHolder = `${randomPick(firstNames)} ${randomPick(lastNames)}`;

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

  const weightedRandomizerChar = (str: string): string => {
    return Math.random() < 0.5 ? randomizerChar(str) : str;
  };

  const textCreditCard: CreditCard = {
    id,
    cardNumber: weightedRandomizerChar(cardNumber),
    cardHolder: weightedRandomizerChar(cardHolder),
    expirationMonth: weightedRandomizerChar(expirationMonth),
    expirationYear: weightedRandomizerChar(expirationYear),
  };

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
  settings: CREDIT_CARD_CONFIG,
} as const;

export const useCreditCardStore = create<CreditCardStore>()(
  persist(
    (set) => ({
      ...defaultCreditCardState,
      async submitCreditCard(id: string) {
        set((state) => ({
          creditCards: state.creditCards.map((card) =>
            card.id === id ? { ...card, submitted: true } : card,
          ),
        }));
        await new Promise((resolve) => setTimeout(resolve, 1000));
      },
      toggleFieldCheck(id: string, field: Exclude<keyof CreditCard, "id">) {
        set((state) => ({
          creditCards: state.creditCards.map((card) =>
            card.id === id && !card.submitted
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
        set(() => ({
          settings: {
            ...defaultCreditCardState.settings,
          },
        }));
      },
    }),
    {
      name: "credit-card-store6",
      partialize: (state) => ({
        settings: state.settings,
      }),
    },
  ),
);
