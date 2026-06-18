import { Product } from "../_types/product";

export const products: Product[] = [
  {
    id: "p1",
    name: "カルビ",
    price: 980,
    img: "/images/meat1.jpg",
    desc: "やわらかいカルビ",
  },
  {
    id: "p2",
    name: "ロース",
    price: 880,
    img: "/images/meat2.jpg",
    desc: "あっさりロース",
  },
  {
    id: "p3",
    name: "タン",
    price: 1180,
    img: "/images/meat3.jpg",
    desc: "厚切りタン",
  },
  {
    id: "p4",
    name: "ハラミ",
    price: 920,
    img: "/images/meat4.jpg",
    desc: "旨味たっぷりハラミ",
  },
] as const;
