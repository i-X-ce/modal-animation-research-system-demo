export type Product = {
  id: string;
  name: string;
  price: number;
  img: string;
};

export const PRODUCT_OPTIONS_TYPES = {
  CHECKBOX: "checkbox",
  RADIO: "radio",
  SELECT: "select",
} as const;

export type ProductOptionType =
  (typeof PRODUCT_OPTIONS_TYPES)[keyof typeof PRODUCT_OPTIONS_TYPES];

export type ProductOption =
  | {
      type: (typeof PRODUCT_OPTIONS_TYPES)["CHECKBOX"];
      id: string;
      name: string;
      trueLabel: string;
      falseLabel: string;
    }
  | {
      type: (typeof PRODUCT_OPTIONS_TYPES)["RADIO"];
      id: string;
      name: string;
      options: { id: string; label: string }[];
    }
  | {
      type: (typeof PRODUCT_OPTIONS_TYPES)["SELECT"];
      id: string;
      name: string;
      options: { id: string; label: string }[];
    };

export type ProductOptionValue =
  | {
      type: (typeof PRODUCT_OPTIONS_TYPES)["CHECKBOX"];
      id: string;
      value: boolean;
    }
  | {
      type: (typeof PRODUCT_OPTIONS_TYPES)["RADIO"];
      id: string;
      value: string;
    }
  | {
      type: (typeof PRODUCT_OPTIONS_TYPES)["SELECT"];
      id: string;
      value: string;
    };
