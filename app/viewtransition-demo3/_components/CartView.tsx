"use client";

import { useCartStore } from "../_stores/cartStore";
import { products } from "../_consts/products";
import { useModalStore } from "../_stores/modalStore";

const CartView = () => {
  const items = useCartStore((s) => s.items);
  const remove = useCartStore((s) => s.remove);
  const order = useCartStore((s) => s.order);
  const total = useCartStore((s) => s.getTotalPrice());
  const closeModal = useModalStore((s) => s.closeModal);

  const rows = items.map((it) => ({
    ...it,
    product: products.find((p) => p.id === it.productId)!,
  }));
  const tax = Math.round(total * 0.1);
  const grandTotal = total + tax;

  return (
    <div className="flex h-full flex-col justify-between bg-[#171717] px-4 pb-4 pt-6 text-white">
      <div className="space-y-4">
        <div className="px-2">
          <h2 className="text-[18px] font-normal leading-none text-white">
            Current Order
          </h2>
        </div>

        <div
          className="space-y-4 overflow-y-auto pr-1"
          style={{ maxHeight: "calc(100dvh - 320px)" }}
        >
          {rows.length === 0 ? (
            <div className="rounded-sm border border-white/10 bg-[#0a0a0a] p-4 text-sm text-white/60">
              まだ注文はありません。
            </div>
          ) : (
            rows.map((row, index) => (
              <article
                key={`${row.productId}-${index}`}
                className="relative flex gap-4 bg-[#0a0a0a] p-4"
              >
                <div className="h-20 w-12.5 shrink-0 overflow-hidden bg-white/5">
                  <img
                    alt={row.product.name}
                    src={row.product.img}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1 space-y-2 pr-6">
                  <div className="flex items-center gap-2 text-[14px] leading-none text-[#a3b3ff]">
                    <span># {row.product.number}</span>
                  </div>
                  <div className="flex items-baseline gap-2 text-white">
                    <h3 className="truncate text-[16px] font-normal leading-none">
                      {row.product.name}
                    </h3>
                    <span className="text-xs text-[#a3b3ff]">({row.qty})</span>
                  </div>
                  <ul className="space-y-1 text-[12px] leading-5 text-[#737373]">
                    <li>・食事と一緒に</li>
                    <li>・プレミアム リーデル</li>
                    <li>・デキャンタージュ希望</li>
                  </ul>
                  <div className="flex items-baseline gap-2 text-white">
                    <span className="font-wine-serif text-[12px]">￥</span>
                    <span className="font-wine-serif text-[16px]">
                      {(row.product.price * row.qty).toLocaleString()}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  className="absolute right-2 top-2 text-white/60"
                  onClick={() => remove(index)}
                  aria-label="注文から削除"
                >
                  ×
                </button>
              </article>
            ))
          )}
        </div>
      </div>

      <div className="space-y-4 border-t border-white/10 bg-[#171717] pt-6">
        <div className="space-y-2 border border-white/10 bg-[#0a0a0a] p-4">
          <div className="flex items-center justify-between text-[12px] text-white/60">
            <span>小計</span>
            <span>￥ {total.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between text-[12px] text-white/60">
            <span>消費税</span>
            <span>￥ {tax.toLocaleString()}</span>
          </div>
          <div className="flex items-end justify-between pt-2 text-white">
            <span className="text-[18px] font-normal">合計</span>
            <span className="font-wine-serif text-[24px] text-[#a3b3ff]">
              ￥ {grandTotal.toLocaleString()}
            </span>
          </div>
        </div>

        <button
          type="button"
          className="flex h-13.75 w-full items-center justify-center gap-2 bg-[#615fff] px-4 text-[16px] font-medium text-white disabled:cursor-not-allowed disabled:bg-white/10"
          onClick={() => {
            order();
            closeModal();
          }}
          disabled={rows.length === 0}
        >
          <span>注文を確定</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
};

export default CartView;
