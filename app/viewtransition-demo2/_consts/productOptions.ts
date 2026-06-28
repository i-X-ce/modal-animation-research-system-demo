import {
  PRODUCT_OPTIONS_TYPES,
  ProductOption,
  ProductOptionValue,
} from "../_types/product";

export const productOptions: ProductOption[] = [
  {
    type: PRODUCT_OPTIONS_TYPES.RADIO,
    id: "size",
    name: "サイズ",
    options: [
      { id: "s", label: "S" },
      { id: "m", label: "M" },
      { id: "l", label: "L" },
    ],
  },
  {
    type: PRODUCT_OPTIONS_TYPES.RADIO,
    id: "temperature",
    name: "温度",
    options: [
      { id: "hot", label: "ホット" },
      { id: "ice", label: "アイス" },
    ],
  },
  {
    type: PRODUCT_OPTIONS_TYPES.RADIO,
    id: "ice",
    name: "氷",
    options: [
      { id: "no_ice", label: "無し" },
      { id: "less_ice", label: "少なめ" },
      { id: "normal_ice", label: "普通" },
      { id: "extra_ice", label: "多め" },
    ],
  },
  {
    type: PRODUCT_OPTIONS_TYPES.RADIO,
    id: "syrup",
    name: "甘さ",
    options: [
      { id: "no_sugar", label: "無糖" },
      { id: "less_sugar", label: "微糖" },
      { id: "normal_sugar", label: "加糖" },
    ],
  },
  {
    type: PRODUCT_OPTIONS_TYPES.SELECT,
    id: "topping",
    name: "トッピング",
    options: [
      { id: "none", label: "無し" },
      { id: "whipped_cream", label: "ホイップクリーム" },
      { id: "chocolate_sauce", label: "チョコレートソース" },
      { id: "caramel_sauce", label: "キャラメルソース" },
      { id: "strawberry_sauce", label: "いちごソース" },
      { id: "tapioca", label: "タピオカ" },
    ],
  },
] as const;

export const defaultProductOptionValues: ProductOptionValue[] =
  productOptions.map((options) => {
    switch (options.type) {
      case PRODUCT_OPTIONS_TYPES.CHECKBOX:
        return {
          type: PRODUCT_OPTIONS_TYPES.CHECKBOX,
          id: options.id,
          value: false,
        };
      case PRODUCT_OPTIONS_TYPES.RADIO:
        return {
          type: PRODUCT_OPTIONS_TYPES.RADIO,
          id: options.id,
          value: options.options[0].id,
        };
      case PRODUCT_OPTIONS_TYPES.SELECT:
        return {
          type: PRODUCT_OPTIONS_TYPES.SELECT,
          id: options.id,
          value: options.options[0].id,
        };
    }
  });

export const getProductOptionLabel = (
  optionId: ProductOption["id"],
  optionValue: ProductOptionValue["value"],
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
        return {
          type: PRODUCT_OPTIONS_TYPES.CHECKBOX,
          id: option.id,
          value: Math.random() < 0.5,
        };
      case PRODUCT_OPTIONS_TYPES.RADIO:
        return {
          type: PRODUCT_OPTIONS_TYPES.RADIO,
          id: option.id,
          value:
            option.options[Math.floor(Math.random() * option.options.length)]
              .id,
        };
      case PRODUCT_OPTIONS_TYPES.SELECT:
        return {
          type: PRODUCT_OPTIONS_TYPES.SELECT,
          id: option.id,
          value:
            option.options[Math.floor(Math.random() * option.options.length)]
              .id,
        };
    }
  });
};
