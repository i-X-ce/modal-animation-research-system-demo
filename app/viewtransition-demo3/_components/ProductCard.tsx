"use client";

import { useModalStore } from "../_stores/modalStore";
import { Product } from "../_types/product";
import ProductModalContent from "./ProductModalContent";

export default function ProductCard({
  id,
  number,
  name,
  origin,
  description,
  price,
  img,
  category,
}: Product) {
  const openModal = useModalStore((s) => s.openModal);

  const handleClick = () => {
    openModal(
      <ProductModalContent
        product={{
          id,
          number,
          name,
          origin,
          category,
          description,
          price,
          img,
        }}
      />,
      id,
    );
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="group flex h-full flex-col overflow-hidden bg-[#171717] text-left transition-transform duration-200 hover:-translate-y-1"
    >
      <div className="relative h-[240px] overflow-hidden">
        <img
          alt={name}
          src={img}
          className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent" />
      </div>

      <div className="flex flex-1 flex-col justify-between px-6 pb-6 pt-5">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-[14px] leading-none text-[#a3b3ff]">
            <span className="font-serif">#</span>
            <span>{number}</span>
            <span>・</span>
            <span>{origin}</span>
          </div>
          <h3 className="font-wine-serif text-[24px] font-normal leading-[1.2] text-white">
            {name}
          </h3>
          <p className="text-[14px] leading-7 text-white/80">{description}</p>
        </div>

        <div className="mt-10 flex items-baseline gap-2 whitespace-nowrap text-white">
          <span className="font-wine-serif text-[14px]">￥</span>
          <span className="font-wine-serif text-[24px] font-normal">
            {price.toLocaleString()}
          </span>
          <span className="text-[14px] text-[#737373]">/ glass</span>
        </div>
      </div>
    </button>
  );
}
