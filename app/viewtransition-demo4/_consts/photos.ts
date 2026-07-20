import { withBasePath } from "@/consts/path";

export type AlbumPhoto = {
  id: string;
  src: string;
  title: string;
  caption: string;
};

export const albumPhotos: AlbumPhoto[] = [
  {
    id: "coffee-001",
    src: withBasePath("/images/coffee/coffee001.jpg"),
    title: "Morning Roast",
    caption: "柔らかな光が差し込む、最初の一杯。",
  },
  {
    id: "coffee-002",
    src: withBasePath("/images/coffee/coffee002.jpg"),
    title: "Steam Drift",
    caption: "湯気の層が写真の輪郭を少しだけ溶かす。",
  },
  {
    id: "coffee-003",
    src: withBasePath("/images/coffee/coffee003.jpg"),
    title: "Bitter Edge",
    caption: "濃い色の中に、落ち着いた余白がある。",
  },
  {
    id: "coffee-004",
    src: withBasePath("/images/coffee/coffee004.jpg"),
    title: "Counter Light",
    caption: "カウンターの反射が一瞬だけ焦点になる。",
  },
  {
    id: "coffee-006",
    src: withBasePath("/images/coffee/coffee006.jpg"),
    title: "Cup Shadow",
    caption: "影の向きまで記録したくなる瞬間。",
  },
  {
    id: "coffee-008",
    src: withBasePath("/images/coffee/coffee008.jpg"),
    title: "Cream Line",
    caption: "やわらかな境界線がアルバムに温度を足す。",
  },
  {
    id: "meat-001",
    src: withBasePath("/images/meat/meat001.jpg"),
    title: "Marble Cut",
    caption: "赤身と脂のコントラストがきれいに立つ。",
  },
  {
    id: "meat-003",
    src: withBasePath("/images/meat/meat003.jpg"),
    title: "Char Line",
    caption: "焼き目の線が、写真の奥行きを強める。",
  },
  {
    id: "meat-004",
    src: withBasePath("/images/meat/meat004.jpg"),
    title: "Seared Surface",
    caption: "表面の艶が残る、熱の記憶。",
  },
  {
    id: "meat-006",
    src: withBasePath("/images/meat/meat006.jpg"),
    title: "Plated Moment",
    caption: "皿に置かれた瞬間の静けさを残す。",
  },
  {
    id: "meat-008",
    src: withBasePath("/images/meat/meat008.jpg"),
    title: "Rich Slice",
    caption: "厚みのあるカットをそのまま表紙に。",
  },
  {
    id: "meat-011",
    src: withBasePath("/images/meat/meat011.jpg"),
    title: "Flame Finish",
    caption: "最後の火入れで輪郭が少しだけ強くなる。",
  },
];

const randomFloat = (seed: number) => {
  const value = Math.sin(seed * 999 + 17) * 10000;
  return value - Math.floor(value);
};

export const buildPhotoDate = (seed: number) => {
  const start = new Date(2020, 0, 1).getTime();
  const end = new Date(2025, 11, 31).getTime();
  const offset = Math.floor(randomFloat(seed) * (end - start));
  return new Date(start + offset);
};

export const formatPhotoDate = (date: Date) =>
  new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
