"use client";

import { useState } from "react";
import { useCartStore } from "../_stores/cartStore";
import { useModalStore } from "../_stores/modalStore";
import { Product } from "../_types/product";

type ProductModalContentProps = {
  product: Product;
};

const MAX_QTY = 10;
const MIN_QTY = 1;

const formatPrice = (value: number) => value.toLocaleString();

export default function ProductModalContent({
  product,
}: ProductModalContentProps) {
  const [qty, setQty] = useState(1);
  const addItem = useCartStore((s) => s.add);
  const closeModal = useModalStore((s) => s.closeModal);

  const handleAdd = () => {
    addItem(product.id, [], qty, {
      x: 0,
      y: 0,
      w: 0,
      h: 0,
    });
    closeModal();
  };

  return (
    <div className="grid min-h-[min(80vh,720px)] bg-[#111111] text-white lg:grid-cols-[1.08fr_0.92fr]">
      <div className="relative min-h-90 overflow-hidden border-b border-white/10 lg:border-b-0 lg:border-r lg:border-white/10">
        <img
          alt={product.name}
          src={product.img}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-black/10 to-transparent" />
        <div className="absolute left-6 top-6 rounded-full border border-white/15 bg-black/35 px-3 py-1 text-[12px] tracking-[0.28em] text-white/80 backdrop-blur-md">
          #{product.number}
        </div>
      </div>

      <div className="flex flex-col justify-between gap-10 p-6 lg:p-8">
        <div className="space-y-5">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[14px] leading-none text-[#a3b3ff]">
              <span>#{product.number}</span>
              <span>・</span>
              <span>{product.origin}</span>
            </div>
            <h2 className="font-wine-serif text-[32px] font-normal leading-tight text-white">
              {product.name}
            </h2>
          </div>

          <p className="max-w-[34ch] text-[14px] leading-8 text-white/80">
            {product.description}
          </p>

          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[12px] text-[#a3b3ff]">
              {product.category}
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[12px] text-white/70">
              Vintage Selection
            </span>
          </div>
        </div>

        <div className="space-y-5">
          <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-5">
            <div className="flex items-center gap-1 text-white">
              <span className="font-wine-serif text-[14px]">￥</span>
              <span className="font-wine-serif text-[28px] font-normal">
                {formatPrice(product.price * qty)}
              </span>
            </div>
            <div className="flex items-center">
              <button
                type="button"
                onClick={() =>
                  setQty((current) => Math.max(MIN_QTY, current - 1))
                }
                className="flex h-10 w-10 items-center justify-center border border-white/15 text-white transition hover:border-white/30"
                aria-label="数量を減らす"
              >
                −
              </button>
              <div className="flex h-10 min-w-12 items-center justify-center border-y border-white/15 px-3 text-sm text-white">
                {qty}
              </div>
              <button
                type="button"
                onClick={() =>
                  setQty((current) => Math.min(MAX_QTY, current + 1))
                }
                className="flex h-10 w-10 items-center justify-center border border-white/15 text-white transition hover:border-white/30"
                aria-label="数量を増やす"
              >
                +
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className="flex h-13.75 w-full items-center justify-center gap-2 bg-[#615fff] text-[16px] font-medium text-white transition hover:bg-[#7370ff]"
          >
            <span>カートに追加</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
