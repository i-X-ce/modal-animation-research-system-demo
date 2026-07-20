import { Product } from "../_types/product";

const heroImage =
  "https://www.figma.com/api/mcp/asset/f63ccea0-38de-410d-8a76-66fb11203368";

export const products: Product[] = [
  {
    id: "wine-001",
    number: "001",
    name: "Château Margaux 2015",
    origin: "FRANCE",
    category: "赤ワイン",
    description:
      "深みのあるガーネット色。カシスやブラックベリーの凝縮した果実香に、シダーの余韻が重なります。",
    price: 185000,
    img: heroImage,
  },
  {
    id: "wine-002",
    number: "002",
    name: "Barolo Riserva 2010",
    origin: "ITALY",
    category: "赤ワイン",
    description:
      "チェリーやスミレの香りが広がる、重厚で複雑な味わい。長い余韻が特徴です。",
    price: 120000,
    img: heroImage,
  },
  {
    id: "wine-003",
    number: "003",
    name: "Vega Sicilia Único 2009",
    origin: "SPAIN",
    category: "赤ワイン",
    description:
      "成熟した赤い果実とスパイスの香りが調和。滑らかなタンニンと力強いボディです。",
    price: 200000,
    img: heroImage,
  },
  {
    id: "wine-004",
    number: "004",
    name: "Opus One 2016",
    origin: "USA",
    category: "赤ワイン",
    description:
      "ブラックチェリーやカカオの香り。リッチでエレガントな味わいが特徴です。",
    price: 170000,
    img: heroImage,
  },
  {
    id: "wine-005",
    number: "005",
    name: "Penfolds Grange 2014",
    origin: "AUSTRALIA",
    category: "赤ワイン",
    description:
      "濃厚なベリーの香りとスモーキーなニュアンス。凝縮感のある味わいです。",
    price: 150000,
    img: heroImage,
  },
  {
    id: "wine-006",
    number: "006",
    name: "Domaine de la Romanée-Conti 2013",
    origin: "FRANCE",
    category: "赤ワイン",
    description:
      "繊細な赤果実のアロマと複雑なスパイス香。エレガントなフィニッシュです。",
    price: 320000,
    img: heroImage,
  },
  {
    id: "wine-007",
    number: "007",
    name: "Concha y Toro Don Melchor 2017",
    origin: "CHILE",
    category: "赤ワイン",
    description:
      "カシスやブラックベリーの豊かな香り。バランスの良いボディとタンニンです。",
    price: 50000,
    img: heroImage,
  },
];

export const categories: {
  number: string;
  label: string;
  selected?: boolean;
}[] = [
  { number: "01.", label: "赤ワイン", selected: true },
  { number: "02.", label: "白ワイン" },
  { number: "03.", label: "ロゼ" },
  { number: "04.", label: "スパークリングワイン" },
  { number: "05.", label: "デザートワイン" },
];
