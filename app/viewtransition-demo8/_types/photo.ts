export const PHOTO_MARKERS = {
  DEFAULT: "default",
  REMOVE: "remove",
} as const;

export type PhotoMaker = (typeof PHOTO_MARKERS)[keyof typeof PHOTO_MARKERS];

export interface Photo {
  _marker: PhotoMaker;
  id: string;
  imageUrl: string;
  datetime: number;
  // place: {
  //   prefecture: string;
  //   city: string;
  // };
  isDisplay: boolean;
  EXIFData: EXIFData;
}

export interface EXIFData {
  // --- カメラ・デバイス情報 ---
  /** メーカー名 (ASCII) */
  make: string;
  /** モデル名 (ASCII) */
  model: string;
  /** レンズモデル (ASCII) */
  lensModel: string;
  /** レンズスペック (ASCII / RATIONAL[]) */
  // lensSpecification: [number, number, number, number];
  /** 本体シリアル番号 (ASCII) */
  bodySerialNumber: string;
  /** 処理ソフトウェア (ASCII) */
  software: string;

  // --- 撮影設定（露出・光学データ） ---
  /** 絞り値 F値 (RATIONAL) */
  fNumber: number;
  /** シャッタースピード 秒 (RATIONAL) */
  exposureTime: number;
  /** ISO感度 (SHORT) */
  ISOSpeedRatings: number;
  /** 露出補正値 EV (SRATIONAL) */
  exposureBiasValue: number;
  /** 焦点距離 mm (RATIONAL) */
  focalLength: number;
  /** 35mm換算焦点距離 mm (SHORT) */
  focalLengthIn35mmFilm: number;
  /** 測光方式 (SHORT) 0:不明, 1:平均, 2:中央重点, 3:スポット etc. */
  meteringMode: number;
  /** 露出プログラム (SHORT) 1:マニュアル, 2:ノーマル, 3:絞り優先, 4:シャッター優先 etc. */
  exposureProgram: number;
  /** ホワイトバランス (SHORT) 0:自動, 1:マニュアル */
  whiteBalance: number;
  /** フラッシュ (SHORT) ビットフラッグ構造 */
  flash: number;

  // --- 日時情報 ("YYYY:MM:DD HH:MM:SS" 形式) ---
  /** 撮影日時 (ASCII) */
  // dateTimeOriginal: number;
  /** デジタル化日時 (ASCII) */
  // dateTimeDigitized: number;
  /** ファイル変更日時 (ASCII) */
  // dateTime: number;
  /** サブセック（ミリ秒単位のオフセット）(ASCII) */
  // subSecTimeOriginal: string;

  // --- 位置情報（GPSデータ） ---
  // /** 緯度 [度, 分, 秒] (RATIONAL[3]) */
  // GPSLatitude: [number, number, number];
  // /** 緯度参照 (ASCII) 'N' | 'S' */
  // GPSLatitudeRef: "N" | "S";
  // /** 経度 [度, 分, 秒] (RATIONAL[3]) */
  // GPSLongitude: [number, number, number];
  // /** 経度参照 (ASCII) 'E' | 'W' */
  // GPSLongitudeRef: "E" | "W";
  place: {
    prefecture: string;
    city: string;
  };

  /** 高度 m (RATIONAL) */
  GPSAltitude: number;
  /** 高度参照 (BYTE) 0:海抜以上, 1:海抜以下 */
  GPSAltitudeRef: number;
  /** コンパス方位 0-359.99度 (RATIONAL) */
  GPSImgDirection: number;
  /** 方位参照 (ASCII) 'T':真方位, 'M':磁気方位 */
  GPSImgDirectionRef: string;
  /** GPS時刻 [時, 分, 秒] (RATIONAL[3]) */
  // GPSTimeStamp: [number, number, number];
  /** GPS日付 "YYYY:MM:DD" (ASCII) */
  // GPSDateStamp: string;

  // --- 画像構造・レンダリング情報 ---
  /** 画像幅 px (SHORT / LONG) */
  pixelXDimension: number;
  /** 画像高さ px (SHORT / LONG) */
  pixelYDimension: number;
  /** X方向解像度 (RATIONAL) */
  xResolution: number;
  /** Y方向解像度 (RATIONAL) */
  yResolution: number;
  /** 解像度単位 (SHORT) 2:インチ, 3:センチメートル */
  resolutionUnit: number;
  /** 色空間 (SHORT) 1:sRGB, 65535:Uncalibrated */
  colorSpace: number;

  // --- サムネイル・バイナリ情報 ---
  /** サムネイルデータのオフセット (LONG) */
  JPEGInterchangeFormat: number;
  /** サムネイルデータのバイト長 (LONG) */
  JPEGInterchangeFormatLength: number;
  /** その他の未定義バイナリタグ (UNDEFINED) */
  // [tag: string]: unknown;
}

export const EXIFDATA_LABELS: Record<keyof EXIFData, string> = {
  make: "メーカー",
  model: "モデル",
  lensModel: "レンズ",
  bodySerialNumber: "本体シリアル番号",
  software: "処理ソフトウェア",
  fNumber: "絞り値",
  exposureTime: "シャッタースピード",
  ISOSpeedRatings: "ISO感度",
  exposureBiasValue: "露出補正値",
  focalLength: "焦点距離",
  focalLengthIn35mmFilm: "測定方式",
  meteringMode: "露出プログラム",
  exposureProgram: "ホワイトバランス",
  whiteBalance: "フラッシュ",
  flash: "フラッシュ",

  place: "撮影場所",

  GPSAltitude: "高度",
  GPSAltitudeRef: "高度参照",
  GPSImgDirection: "コンパス方式",
  GPSImgDirectionRef: "方位参照",

  pixelXDimension: "画面幅",
  pixelYDimension: "画像高さ",
  xResolution: "X方向解像度",
  yResolution: "Y方向解像度",
  resolutionUnit: "解像度単位",
  colorSpace: "色空間",

  JPEGInterchangeFormat: "サムネイルデータのオフセット",
  JPEGInterchangeFormatLength: "サムネイルデータのバイト長",
} as const;

export const EXIFDataFormatters = {
  make: (value) => String(value),
  model: (value) => String(value),
  lensModel: (value) => String(value),
  bodySerialNumber: (value) => String(value),
  software: (value) => String(value),
  fNumber: (value) => `f/${value}`,
  exposureTime: (value) => `${value}秒`,
  ISOSpeedRatings: (value) => `ISO ${value}`,
  exposureBiasValue: (value) => `${value} EV`,
  focalLength: (value) => `${value} mm`,
  focalLengthIn35mmFilm: (value) => `${value} mm`,
  meteringMode: (value) => String(value),
  exposureProgram: (value) => String(value),
  whiteBalance: (value) => (value === 0 ? "自動" : "マニュアル"),
  flash: (value) => (value === 0 ? "発光せず" : "発光"),

  place: (value) => `${value.prefecture}, ${value.city}`,

  GPSAltitude: (value) => `${value} m`,
  GPSAltitudeRef: (value) => (value === 0 ? "海抜以上" : "海抜以下"),
  GPSImgDirection: (value) => `${value}°`,
  GPSImgDirectionRef: (value) => (value === "T" ? "真方位" : "磁気方位"),
  pixelXDimension: (value) => `${value} px`,
  pixelYDimension: (value) => `${value} px`,
  xResolution: (value) => `${value} dpi`,
  yResolution: (value) => `${value} dpi`,
  resolutionUnit: (value) =>
    value === 2 ? "インチ" : value === 3 ? "センチメートル" : String(value),
  colorSpace: (value) =>
    value === 1 ? "sRGB" : value === 65535 ? "Uncalibrated" : String(value),
  JPEGInterchangeFormat: (value) => `${value} バイト`,
  JPEGInterchangeFormatLength: (value) => `${value} バイト`,
} as const satisfies {
  [K in keyof EXIFData]: (value: EXIFData[K]) => string;
};

export function formatEXIFValue<K extends keyof EXIFData>(
  key: K,
  value: EXIFData[K],
): string {
  if (value === undefined || value === null) {
    return "-";
  }

  const formatter = EXIFDataFormatters[key];
  if (formatter) {
    return (formatter as (value: EXIFData[K]) => string)(value);
  }

  return String(value);
}
