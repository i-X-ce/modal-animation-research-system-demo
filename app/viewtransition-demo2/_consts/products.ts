import { withBasePath } from "@/consts/path";
import { Product } from "../_types/product";

let cnt = 0;

const generateId = () => {
  return `p${++cnt}`;
};

const generateImgPath = () => {
  return withBasePath(
    `/images/coffee/coffee${((cnt % 11) + 1).toString().padStart(3, "0")}.jpg`,
  );
};

// mogrify -path dist -format jpg -quality 85 *.png

export const products: Product[] = [
  {
    id: generateId(),
    name: "ブルーマウンテン",
    price: 1800,
    img: generateImgPath(),
  },
  { id: generateId(), name: "モカ", price: 1400, img: generateImgPath() },
  {
    id: generateId(),
    name: "キリマンジャロ",
    price: 1300,
    img: generateImgPath(),
  },
  { id: generateId(), name: "コナ", price: 2200, img: generateImgPath() },
  { id: generateId(), name: "マンデリン", price: 1350, img: generateImgPath() },
  { id: generateId(), name: "グアテマラ", price: 1250, img: generateImgPath() },
  { id: generateId(), name: "ブラジル", price: 1100, img: generateImgPath() },
  { id: generateId(), name: "コロンビア", price: 1150, img: generateImgPath() },
  { id: generateId(), name: "トラジャ", price: 1500, img: generateImgPath() },
  { id: generateId(), name: "ケニア", price: 1400, img: generateImgPath() },
  { id: generateId(), name: "パナマ", price: 2500, img: generateImgPath() },
  { id: generateId(), name: "ハラール", price: 1300, img: generateImgPath() },
  {
    id: generateId(),
    name: "エスプレッソブレンド",
    price: 900,
    img: generateImgPath(),
  },
  {
    id: generateId(),
    name: "フレンチロースト",
    price: 950,
    img: generateImgPath(),
  },
  {
    id: generateId(),
    name: "イタリアンロースト",
    price: 950,
    img: generateImgPath(),
  },
  {
    id: generateId(),
    name: "カフェオレベース",
    price: 1100,
    img: generateImgPath(),
  },
  {
    id: generateId(),
    name: "コールドブリュー",
    price: 1200,
    img: generateImgPath(),
  },
  {
    id: generateId(),
    name: "深煎り炭火焼",
    price: 1000,
    img: generateImgPath(),
  },
  {
    id: generateId(),
    name: "浅煎りエチオピア",
    price: 1300,
    img: generateImgPath(),
  },
  {
    id: generateId(),
    name: "中煎りコスタリカ",
    price: 1200,
    img: generateImgPath(),
  },
  {
    id: generateId(),
    name: "ハワイアンコナ",
    price: 2400,
    img: generateImgPath(),
  },
  {
    id: generateId(),
    name: "ジャマイカンミックス",
    price: 1700,
    img: generateImgPath(),
  },
  {
    id: generateId(),
    name: "エイジドコーヒー",
    price: 1900,
    img: generateImgPath(),
  },
  {
    id: generateId(),
    name: "オーガニックブレンド",
    price: 1100,
    img: generateImgPath(),
  },
  {
    id: generateId(),
    name: "カフェインレスモカ",
    price: 1450,
    img: generateImgPath(),
  },
  {
    id: generateId(),
    name: "シングルオリジン・ルワンダ",
    price: 1350,
    img: generateImgPath(),
  },
  {
    id: generateId(),
    name: "サン・ルイス・デ・パラオ",
    price: 1600,
    img: generateImgPath(),
  },
  {
    id: generateId(),
    name: "ニカラグアSHB",
    price: 1250,
    img: generateImgPath(),
  },
  {
    id: generateId(),
    name: "ホンジュラス・アルト",
    price: 1200,
    img: generateImgPath(),
  },
  {
    id: generateId(),
    name: "パプアニューギニア・ハイランド",
    price: 1400,
    img: generateImgPath(),
  },
  {
    id: generateId(),
    name: "ベトナムロブスタ",
    price: 800,
    img: generateImgPath(),
  },
  {
    id: generateId(),
    name: "インド・モンスーン",
    price: 1300,
    img: generateImgPath(),
  },
  {
    id: generateId(),
    name: "イエメン・サナア",
    price: 2000,
    img: generateImgPath(),
  },
  {
    id: generateId(),
    name: "ドミニカ・プリンセサ",
    price: 1250,
    img: generateImgPath(),
  },
  {
    id: generateId(),
    name: "メキシコ・チアパス",
    price: 1150,
    img: generateImgPath(),
  },
  {
    id: generateId(),
    name: "エルサルバドル・パカマラ",
    price: 1800,
    img: generateImgPath(),
  },
  {
    id: generateId(),
    name: "東ティモール・レテフォホ",
    price: 1300,
    img: generateImgPath(),
  },
  {
    id: generateId(),
    name: "ルワンダ・ブルボン",
    price: 1400,
    img: generateImgPath(),
  },
  {
    id: generateId(),
    name: "ブルンジ・カイザ",
    price: 1350,
    img: generateImgPath(),
  },
  {
    id: generateId(),
    name: "スマトラ・タイガー",
    price: 1450,
    img: generateImgPath(),
  },
  {
    id: generateId(),
    name: "ゴールデンマウンテン",
    price: 1600,
    img: generateImgPath(),
  },
  {
    id: generateId(),
    name: "シルバークラウド",
    price: 1550,
    img: generateImgPath(),
  },
  {
    id: generateId(),
    name: "ブロンズロースト",
    price: 1200,
    img: generateImgPath(),
  },
  {
    id: generateId(),
    name: "プラチナアロマ",
    price: 2100,
    img: generateImgPath(),
  },
  {
    id: generateId(),
    name: "ダイアモンドドリップ",
    price: 3000,
    img: generateImgPath(),
  },
  {
    id: generateId(),
    name: "アメジストベリー",
    price: 1500,
    img: generateImgPath(),
  },
  {
    id: generateId(),
    name: "エメラルドグリーン",
    price: 1400,
    img: generateImgPath(),
  },
  {
    id: generateId(),
    name: "ルビーシトラス",
    price: 1500,
    img: generateImgPath(),
  },
  {
    id: generateId(),
    name: "サファイアショコラ",
    price: 1600,
    img: generateImgPath(),
  },
  {
    id: generateId(),
    name: "オブシディアンブラック",
    price: 1300,
    img: generateImgPath(),
  },
  {
    id: generateId(),
    name: "朝霧のコーヒー",
    price: 1000,
    img: generateImgPath(),
  },
  {
    id: generateId(),
    name: "真昼のブレンド",
    price: 1000,
    img: generateImgPath(),
  },
  {
    id: generateId(),
    name: "夕暮れのエスプレッソ",
    price: 1100,
    img: generateImgPath(),
  },
  { id: generateId(), name: "深夜の静寂", price: 1200, img: generateImgPath() },
  {
    id: generateId(),
    name: "春風のタンザニア",
    price: 1300,
    img: generateImgPath(),
  },
  { id: generateId(), name: "夏の輝き", price: 1200, img: generateImgPath() },
  {
    id: generateId(),
    name: "秋風のマンデリン",
    price: 1350,
    img: generateImgPath(),
  },
  {
    id: generateId(),
    name: "冬のぬくもり",
    price: 1400,
    img: generateImgPath(),
  },
  {
    id: generateId(),
    name: "星空ブレンド",
    price: 1500,
    img: generateImgPath(),
  },
  { id: generateId(), name: "月光カフェ", price: 1500, img: generateImgPath() },
  { id: generateId(), name: "霧の谷", price: 1200, img: generateImgPath() },
  { id: generateId(), name: "山頂の雫", price: 1800, img: generateImgPath() },
  { id: generateId(), name: "海岸の波音", price: 1100, img: generateImgPath() },
  { id: generateId(), name: "森の囁き", price: 1250, img: generateImgPath() },
  { id: generateId(), name: "風の旋律", price: 1300, img: generateImgPath() },
  { id: generateId(), name: "大地の恵み", price: 1200, img: generateImgPath() },
  { id: generateId(), name: "太陽の恵み", price: 1200, img: generateImgPath() },
  {
    id: generateId(),
    name: "雨上がりの香り",
    price: 1100,
    img: generateImgPath(),
  },
  { id: generateId(), name: "雪解け水", price: 1100, img: generateImgPath() },
  {
    id: generateId(),
    name: "熱砂のコーヒー",
    price: 1300,
    img: generateImgPath(),
  },
  { id: generateId(), name: "桜ブレンド", price: 1400, img: generateImgPath() },
  { id: generateId(), name: "新緑の苦味", price: 1200, img: generateImgPath() },
  { id: generateId(), name: "紅葉のコク", price: 1300, img: generateImgPath() },
  { id: generateId(), name: "雪見の贅沢", price: 1600, img: generateImgPath() },
  { id: generateId(), name: "極上の休息", price: 1700, img: generateImgPath() },
  {
    id: generateId(),
    name: "至福のひととき",
    price: 1800,
    img: generateImgPath(),
  },
  {
    id: generateId(),
    name: "内緒のコーヒー",
    price: 2000,
    img: generateImgPath(),
  },
  {
    id: generateId(),
    name: "思い出の香り",
    price: 1500,
    img: generateImgPath(),
  },
  { id: generateId(), name: "旅路の合間", price: 1100, img: generateImgPath() },
  { id: generateId(), name: "約束の場所", price: 1600, img: generateImgPath() },
  { id: generateId(), name: "静寂の杯", price: 1400, img: generateImgPath() },
  { id: generateId(), name: "情熱の赤", price: 1300, img: generateImgPath() },
  { id: generateId(), name: "孤独の青", price: 1300, img: generateImgPath() },
  { id: generateId(), name: "希望の白", price: 1300, img: generateImgPath() },
  { id: generateId(), name: "調和の緑", price: 1300, img: generateImgPath() },
  { id: generateId(), name: "自由な一杯", price: 1200, img: generateImgPath() },
  {
    id: generateId(),
    name: "挑戦のロースト",
    price: 1400,
    img: generateImgPath(),
  },
  { id: generateId(), name: "成功の香り", price: 1700, img: generateImgPath() },
  {
    id: generateId(),
    name: "はじまりのコーヒー",
    price: 1000,
    img: generateImgPath(),
  },
  {
    id: generateId(),
    name: "おわりの安らぎ",
    price: 1000,
    img: generateImgPath(),
  },
  {
    id: generateId(),
    name: "抹茶エスプレッソ",
    price: 1100,
    img: generateImgPath(),
  },
  {
    id: generateId(),
    name: "ほうじ茶ラテコーヒー",
    price: 1100,
    img: generateImgPath(),
  },
  {
    id: generateId(),
    name: "ジャスミンコーヒー",
    price: 1200,
    img: generateImgPath(),
  },
  {
    id: generateId(),
    name: "ハーブの香る一杯",
    price: 1200,
    img: generateImgPath(),
  },
  {
    id: generateId(),
    name: "スパイスコーヒー",
    price: 1300,
    img: generateImgPath(),
  },
  {
    id: generateId(),
    name: "蜂蜜香るドリップ",
    price: 1400,
    img: generateImgPath(),
  },
  {
    id: generateId(),
    name: "シナモンブレンド",
    price: 1300,
    img: generateImgPath(),
  },
  {
    id: generateId(),
    name: "キャラメルマキアート豆",
    price: 1500,
    img: generateImgPath(),
  },
  {
    id: generateId(),
    name: "究極のマンデリン",
    price: 1800,
    img: generateImgPath(),
  },
  {
    id: generateId(),
    name: "夢幻のブレンド",
    price: 2500,
    img: generateImgPath(),
  },
] as const;

export const findProductById = (id: Product["id"]) => {
  return products.find((product) => product.id === id);
};

/**
 * ランダムな商品を取得する関数
 * 10%: 同じ商品
 * 40%: 近く（隣あっている）の商品
 * 50%: 遠く（二つ以上離れている）の商品
 * @param prevProductId
 */
export const randomProduct = (
  prevProductId?: Product["id"],
  length = products.length,
) => {
  const prevIndex = products.findIndex(
    (product) => product.id === prevProductId,
  );

  const filteredProducts = products.slice(0, length);

  const random = Math.random();
  if (random < 0.1 && prevIndex !== -1) {
    // 10%の確率で同じ商品を返す
    return filteredProducts[prevIndex];
  } else if (random < 0.5 && prevIndex !== -1) {
    // 40%の確率で近く（隣あっている）商品を返す
    const neighborIndices = [
      prevIndex - 1 >= 0 ? prevIndex - 1 : null,
      prevIndex + 1 < filteredProducts.length ? prevIndex + 1 : null,
    ].filter((index): index is number => index !== null);
    const randomNeighborIndex =
      neighborIndices[Math.floor(Math.random() * neighborIndices.length)];
    return filteredProducts[randomNeighborIndex];
  } else {
    // 50%の確率で遠く（二つ以上離れている）商品を返す
    const farIndices = filteredProducts
      .map((_, index) => index)
      .filter((index) => prevIndex === -1 || Math.abs(index - prevIndex) > 1);
    const randomFarIndex =
      farIndices[Math.floor(Math.random() * farIndices.length)];
    return filteredProducts[randomFarIndex];
  }
};
