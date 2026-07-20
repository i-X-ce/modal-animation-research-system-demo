"use client";

import { useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import ProductOptionsForm from "./ProductOptionsForm";
import { useCartStore } from "../_stores/cartStore";
import { useModalStore } from "../_stores/modalStore";
import { Product } from "../_types/product";
import { defaultProductOptionValues } from "../_consts/productOptions";

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
  const [optionValues, setOptionValues] = useState(defaultProductOptionValues);
  const addItem = useCartStore((s) => s.add);
  const closeModal = useModalStore((s) => s.closeModal);

  const handleAdd = () => {
    addItem(product.id, optionValues, qty, {
      x: 0,
      y: 0,
      w: 0,
      h: 0,
    });
    closeModal();
  };

  return (
    <div className="grid min-h-[min(82vh,780px)] bg-[#171717] text-white lg:grid-cols-[0.42fr_0.58fr]">
      <div className="relative min-h-80 overflow-hidden border-b border-white/10 lg:min-h-full lg:border-b-0 lg:border-r lg:border-white/10">
        <img
          alt={product.name}
          src={product.img}
          className="absolute inset-0 h-full w-full object-cover object-left"
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/15 via-black/10 to-transparent" />
        <div className="absolute left-6 top-6 rounded-full border border-white/15 bg-black/30 px-3 py-1 text-[12px] tracking-[0.28em] text-white/80">
          #{product.number}
        </div>
      </div>

      <div className="flex flex-col gap-6 px-6 py-6 lg:px-8 lg:py-7">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-[14px] leading-none text-[#a3b3ff]">
            <span>#{product.number}</span>
            <span>・</span>
            <span>{product.origin}</span>
          </div>
          <h2 className="font-wine-serif text-[32px] font-normal leading-[1.1] text-white">
            {product.name}
          </h2>
          <div className="flex items-center gap-1 whitespace-nowrap text-white">
            <span className="font-wine-serif text-[14px]">¥</span>
            <span className="font-wine-serif text-[28px] font-normal">
              {formatPrice(product.price)}
            </span>
            <span className="text-[14px] text-[#737373]">/ grass</span>
          </div>
        </div>

        <Box sx={{ flex: 1, overflowY: "auto", pr: 1 }}>
          <Stack spacing={3}>
            <Typography
              variant="body2"
              sx={{ color: "rgba(255,255,255,0.78)", lineHeight: 2 }}
            >
              {product.description}
            </Typography>
            <ProductOptionsForm
              optionValues={optionValues}
              onChange={setOptionValues}
            />
          </Stack>
        </Box>

        <Stack
          spacing={3}
          sx={{ borderTop: "1px solid rgba(255,255,255,0.12)", pt: 3 }}
        >
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() =>
                setQty((current) => Math.max(MIN_QTY, current - 1))
              }
              className="flex h-10 w-10 items-center justify-center rounded-md border border-[#5a5a5a] bg-[#625fff] text-[18px] text-white"
              aria-label="数量を減らす"
            >
              −
            </button>
            <div className="flex h-10 min-w-12 items-center justify-center px-3 text-[16px] text-white">
              {qty}
            </div>
            <button
              type="button"
              onClick={() =>
                setQty((current) => Math.min(MAX_QTY, current + 1))
              }
              className="flex h-10 w-10 items-center justify-center rounded-md border border-[#5a5a5a] bg-[#625fff] text-[18px] text-white"
              aria-label="数量を増やす"
            >
              +
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              disableRipple
              onClick={closeModal}
              variant="outlined"
              sx={{
                height: 50,
                borderColor: "rgba(255,255,255,0.18)",
                color: "white",
                textTransform: "none",
                transition: "none",
                borderRadius: 0.5,
                "&:hover": { borderColor: "rgba(255,255,255,0.3)" },
              }}
            >
              キャンセル
            </Button>
            <Button
              disableRipple
              onClick={handleAdd}
              variant="contained"
              sx={{
                height: 50,
                backgroundColor: "#625fff",
                color: "white",
                textTransform: "none",
                transition: "none",
                borderRadius: 0.5,
                boxShadow: "none",
                "&:hover": { backgroundColor: "#6f6cff", boxShadow: "none" },
              }}
            >
              カートに追加
            </Button>
          </div>
        </Stack>
      </div>
    </div>
  );
}
