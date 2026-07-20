"use client";

import { products } from "../_consts/products";
import ProductCard from "./ProductCard";

const ProductView = () => {
  return (
    <div className="flex-1">
      <div className="grid grid-cols-3 gap-8 pb-8">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default ProductView;
