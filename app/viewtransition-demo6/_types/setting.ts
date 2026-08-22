export const CONFIGURATION_TYPES = {
  NUMBER: "number",
  SELECTOR: "selector",
  BOOLEAN: "boolean",
} as const;

export type ConfigurationType =
  (typeof CONFIGURATION_TYPES)[keyof typeof CONFIGURATION_TYPES];

export type Configuration =
  | {
      type: typeof CONFIGURATION_TYPES.NUMBER;
      label: string;
      unit?: string; // 単位（例: "px", "s", "枚"など）
      min: number;
      max: number;
      step: number; // スライダーのステップ値
      decimalScale?: number; // 小数点以下の桁数（省略時は整数扱い）
      value: number; // 現在の値
    }
  | {
      type: typeof CONFIGURATION_TYPES.SELECTOR;
      label: string;
      options: string[];
      value: string; // 現在の値
    }
  | {
      type: typeof CONFIGURATION_TYPES.BOOLEAN;
      label: string;
      value: boolean; // 現在の値
    };

export type ConfigurationMap = Record<string, Configuration>; // 設定のマップ（キーは設定名、値はConfigurationオブジェクト）
