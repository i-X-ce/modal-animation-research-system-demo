import { generateIndex } from "../_stores/systemStore";
import { Photo } from "../_types/photo";

let cnt = 0;

const generateId = () => {
  return `p${cnt++}`;
};

const generateImgPath = (num: number) => {
  return `https://picsum.photos/seed/${num + 200}/500/500`;
};

const generatePlace = (): Photo["place"] => {
  const places = {
    北海道: ["札幌市", "函館市", "旭川市"],
    青森県: ["青森市", "弘前市", "八戸市"],
    宮城県: ["仙台市", "石巻市", "大崎市"],

    東京都: ["新宿区", "渋谷区", "港区"],
    神奈川県: ["横浜市", "川崎市", "相模原市"],
    埼玉県: ["さいたま市", "川口市", "川越市"],

    愛知県: ["名古屋市", "豊田市", "岡崎市"],
    静岡県: ["静岡市", "浜松市", "沼津市"],
    長野県: ["長野市", "松本市", "上田市"],

    大阪府: ["大阪市", "堺市", "東大阪市"],
    京都府: ["京都市", "宇治市", "亀岡市"],
    兵庫県: ["神戸市", "姫路市", "西宮市"],

    広島県: ["広島市", "福山市", "呉市"],
    岡山県: ["岡山市", "倉敷市", "津山市"],
    山口県: ["下関市", "山口市", "宇部市"],

    香川県: ["高松市", "丸亀市", "坂出市"],
    愛媛県: ["松山市", "今治市", "新居浜市"],
    高知県: ["高知市", "南国市", "四万十市"],

    福岡県: ["福岡市", "北九州市", "久留米市"],
    熊本県: ["熊本市", "八代市", "天草市"],
    沖縄県: ["那覇市", "沖縄市", "うるま市"],
  } as const satisfies Record<string, readonly [string, string, string]>;

  const prefecture =
    Object.keys(places)[Math.floor(Math.random() * Object.keys(places).length)];
  const cities = places[prefecture as keyof typeof places];
  const city = cities[Math.floor(Math.random() * cities.length)];

  return { prefecture, city };
};

export const photos: Photo[] = Array.from({ length: 100 }).map(() => ({
  imageUrl: generateImgPath(cnt),
  id: generateId(),
  datetime: generateIndex(),
  place: generatePlace(),
}));
