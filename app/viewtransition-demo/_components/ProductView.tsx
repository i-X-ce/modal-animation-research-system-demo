"use client";

import { Box } from "@mui/material";
import { products } from "../_consts/products";
import ProductCard from "./ProductCard";
import { useModalStore } from "../_stores/modalStore";

const ProductView = () => {
  const cardSize = useModalStore((s) => s.animation.cardSize);

  return (
    <div className="flex-1">
      <Box
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(auto-fill, minmax(${cardSize}px, 1fr))`,
          gap: "16px",
          padding: "16px",
        }}
      >
        {products.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </Box>
    </div>
  );
};

export default ProductView;
