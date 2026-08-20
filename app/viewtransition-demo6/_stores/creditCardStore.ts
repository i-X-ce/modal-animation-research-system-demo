"use client";

import { create } from "zustand";
import { CreditCard } from "../_types/creditCard";
import { persist } from "zustand/middleware";

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

  // const randomKeys: RandomCreditKey[] = [
  //   "cardNumber",
  //   "cardHolder",
  //   "expirationMonth",
  //   "expirationYear",
  // ];

  // const randomIndex = Math.floor(Math.random() * randomKeys.length);

  // const textCreditCard: CreditCard =
  //   Math.random() < 1
  //     ? {
  //         ...imageCreditCard,
  //         [randomKeys[randomIndex]]: randomizerChar(
  //           imageCreditCard[randomKeys[randomIndex]],
  //         ),
  //       }
  //     : { ...imageCreditCard };

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
  settings: {
    numberOfCards: MAX_NUMBER_OF_CARDS,
  },
} as const;

export const useCreditCardStore = create<CreditCardStore>()(
  persist(
    (set) => ({
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
    }),
    {
      name: "credit-card-store6",
      partialize: (state) => ({
        settins: state.settings,
      }),
    },
  ),
);
