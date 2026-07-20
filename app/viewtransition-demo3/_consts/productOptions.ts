import {
  PRODUCT_OPTIONS_TYPES,
  ProductOption,
  ProductOptionValue,
} from "../_types/product";

export const productOptions: ProductOption[] = [
  {
    type: PRODUCT_OPTIONS_TYPES.RADIO,
    id: "timing",
    name: "提供タイミング",
    options: [
      { id: "before", label: "食前" },
      { id: "during", label: "食中" },
      { id: "after", label: "食後" },
    ],
  },
  {
    type: PRODUCT_OPTIONS_TYPES.RADIO,
    id: "glass",
    name: "グラスの選択",
    options: [
      { id: "standard", label: "標準" },
      { id: "premium", label: "プレミアム" },
    ],
  },
  {
    type: PRODUCT_OPTIONS_TYPES.RADIO,
    id: "decantation",
    name: "デキャンタージュ",
    options: [
      { id: "required", label: "必要" },
      { id: "not_required", label: "不要" },
    ],
  },
  {
    type: PRODUCT_OPTIONS_TYPES.RADIO,
    id: "snack",
    name: "おつまみ追加",
    options: [
      { id: "none", label: "なし" },
      { id: "cheese", label: "チーズ盛り合わせ" },
      { id: "olive", label: "オリーブ" },
    ],
  },
] as const;

const toProductOptionValue = (value: unknown): ProductOptionValue =>
  value as ProductOptionValue;

const getDefaultProductOptionValue = (option: ProductOption) => {
  switch (option.type) {
    case PRODUCT_OPTIONS_TYPES.CHECKBOX:
      return toProductOptionValue({
        type: PRODUCT_OPTIONS_TYPES.CHECKBOX,
        id: option.id,
        value: false,
      });
    case PRODUCT_OPTIONS_TYPES.RADIO:
      if (option.id === "timing") {
        return toProductOptionValue({
          type: PRODUCT_OPTIONS_TYPES.RADIO,
          id: option.id,
          value: "during",
        });
      }
      if (option.id === "glass") {
        return toProductOptionValue({
          type: PRODUCT_OPTIONS_TYPES.RADIO,
          id: option.id,
          value: "premium",
        });
      }
      if (option.id === "decantation") {
        return toProductOptionValue({
          type: PRODUCT_OPTIONS_TYPES.RADIO,
          id: option.id,
          value: "required",
        });
      }
      if (option.id === "snack") {
        return toProductOptionValue({
          type: PRODUCT_OPTIONS_TYPES.RADIO,
          id: option.id,
          value: "none",
        });
      }
      return toProductOptionValue({
        type: PRODUCT_OPTIONS_TYPES.RADIO,
        id: option.id,
        value: option.options[0].id,
      });
    case PRODUCT_OPTIONS_TYPES.SELECT:
      return toProductOptionValue({
        type: PRODUCT_OPTIONS_TYPES.SELECT,
        id: option.id,
        value: option.options[0].id,
      });
  }
};

export const defaultProductOptionValues = productOptions.map(
  getDefaultProductOptionValue,
) as ProductOptionValue[];

export const getProductOptionLabel = (
  optionId: ProductOption["id"],
  optionValue: string | boolean,
): string | undefined => {
  const option = productOptions.find((opt) => opt.id === optionId);
  if (!option) return undefined;

  switch (option.type) {
    case PRODUCT_OPTIONS_TYPES.CHECKBOX:
      return optionValue ? option.trueLabel : option.falseLabel;
    case PRODUCT_OPTIONS_TYPES.RADIO:
    case PRODUCT_OPTIONS_TYPES.SELECT:
      return option.options.find((opt) => opt.id === optionValue)?.label;
  }
};

export const randomProductOptionValues = (
  length = productOptions.length,
): ProductOptionValue[] => {
  const filteredOptions = productOptions.slice(0, length);

  return filteredOptions.map((option) => {
    switch (option.type) {
      case PRODUCT_OPTIONS_TYPES.CHECKBOX:
        return toProductOptionValue({
          type: PRODUCT_OPTIONS_TYPES.CHECKBOX,
          id: option.id,
          value: Math.random() < 0.5,
        });
      case PRODUCT_OPTIONS_TYPES.RADIO:
        return toProductOptionValue({
          type: PRODUCT_OPTIONS_TYPES.RADIO,
          id: option.id,
          value:
            option.options[Math.floor(Math.random() * option.options.length)]
              .id,
        });
      case PRODUCT_OPTIONS_TYPES.SELECT:
        return toProductOptionValue({
          type: PRODUCT_OPTIONS_TYPES.SELECT,
          id: option.id,
          value:
            option.options[Math.floor(Math.random() * option.options.length)]
              .id,
        });
    }
  }) as ProductOptionValue[];
};
