import { IndexType, PhotoType } from "../_stores/systemStore";
import { EXIFData, Photo, PHOTO_MARKERS } from "../_types/photo";
import seedrandom from "seedrandom";

const generateId = (cnt: number) => {
  return `p${cnt++}`;
};

const generateImgPath = (num: number, photoType: PhotoType) => {
  // return `images/fireworks/fireworks${String((num % 21) + 1).padStart(3, "0")}.jpg`;
  return `images/${photoType}/${photoType}${String((num % 21) + 1).padStart(3, "0")}.jpg`;
};

type PlaceMap = Record<string, readonly string[]>;

const DEFAULT_PLACES = {
  東京都: ["渋谷区", "港区"],
  神奈川県: ["横浜市", "川崎市", "相模原市"],
} as const satisfies PlaceMap;

const REMOVE_PLACES = {
  東京都: ["新宿区"],
} as const satisfies PlaceMap;

const generatePlace = (
  seed: string,
  places: PlaceMap = DEFAULT_PLACES,
): EXIFData["place"] => {
  const rng = seedrandom(seed);
  const prefecture =
    Object.keys(places)[Math.floor(rng() * Object.keys(places).length)];
  const cities = places[prefecture as keyof typeof places];
  const city = cities[Math.floor(rng() * cities.length)];

  return { prefecture, city };
};

const generateEXIFData = (seed: string): EXIFData => {
  const rng = seedrandom(seed);
  const rp = <T>(arr: T[]): T => arr[Math.floor(rng() * arr.length)];
  const rn = (min: number, max: number): number =>
    Math.floor(rng() * (max - min + 1)) + min;

  return {
    make: rp(["Canon", "Nikon", "Sony", "Fujifilm"]),
    model: rp(["EOS R5", "Z7 II", "Alpha 1", "X-T4"]),
    lensModel: rp(["24-70mm f/2.8", "70-200mm f/2.8", "50mm f/1.4"]),
    bodySerialNumber: `SN${rn(100000, 999999)}`,
    software: rp(["Adobe Photoshop", "Lightroom", "Capture One"]),
    fNumber: rn(1, 22),
    exposureTime: rn(1, 1000) / 1000,
    ISOSpeedRatings: rp([100, 200, 400, 800, 1600]),
    exposureBiasValue: rn(-3, 3),
    focalLength: rn(18, 200),
    focalLengthIn35mmFilm: rn(18, 200),
    meteringMode: rp([1, 2, 3]),
    exposureProgram: rp([1, 2, 3, 4]),
    whiteBalance: rp([0, 1]),
    flash: rp([0, 1]),
    place: generatePlace(seed),
    GPSAltitude: rn(0, 10000),
    GPSAltitudeRef: rp([0, 1]),
    GPSImgDirection: rn(0, 360),
    GPSImgDirectionRef: rp(["T", "M"]),
    pixelXDimension: rn(1000, 8000),
    pixelYDimension: rn(1000, 8000),
    xResolution: rn(72, 300),
    yResolution: rn(72, 300),
    resolutionUnit: rp([2, 3]),
    colorSpace: rp([1, 2]),
    JPEGInterchangeFormat: rn(0, 100000),
    JPEGInterchangeFormatLength: rn(0, 100000),
  };
};

const MIN_DATE = new Date("2023-01-01T00:00:00Z");
const MAX_DATE = new Date("2025-01-01T00:00:00Z");

export const generateIndex = (seed?: string) => {
  const rng = seedrandom(seed);
  const minDate = new Date(MIN_DATE);
  const maxDate = new Date(MAX_DATE);
  const randomTime =
    minDate.getTime() + rng() * (maxDate.getTime() - minDate.getTime());
  return new Date(randomTime).getTime();
};

export const formatIndex = (index: number, indexType: IndexType) => {
  const date = new Date(index);
  switch (indexType) {
    case "date":
      return date.toLocaleDateString("us-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    case "datetime":
      return date.toLocaleString("us-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
    case "number":
      const range = MAX_DATE.getTime() - MIN_DATE.getTime();
      const maxNumber = 1000; // 表示の最大値
      const diff = index - MIN_DATE.getTime();
      return Math.floor((maxNumber * diff) / range).toString();
  }
};

export const generatePhoto = (
  cnt: number,
  photoType: PhotoType,
  seed: string,
  shouldRemove: boolean,
): Photo => {
  const photo: Photo = {
    _marker: PHOTO_MARKERS.DEFAULT,
    imageUrl: generateImgPath(cnt, photoType),
    id: generateId(cnt),
    datetime: generateIndex(seed),
    isDisplay: true,
    EXIFData: generateEXIFData(seed),
  };

  if (shouldRemove) {
    return {
      ...photo,
      _marker: PHOTO_MARKERS.REMOVE,
      EXIFData: {
        ...photo.EXIFData,
        place: generatePlace(seed, REMOVE_PLACES),
      },
    };
  } else {
    return photo;
  }
};

export const generatePhotos = (
  cnt: number,
  photoType: PhotoType,
  seed: string,
  removeCnt: number = 0,
): Photo[] => {
  const rng = seedrandom(seed);
  const indexes = Array.from({ length: cnt }, (_, i) => i).sort(
    () => rng() - 0.5,
  );
  const removeIndexSet = new Set<number>(indexes.slice(0, removeCnt));

  return Array.from({ length: cnt }).map((_, i) =>
    generatePhoto(i, photoType, `${seed}-${i}`, removeIndexSet.has(i)),
  );
};
