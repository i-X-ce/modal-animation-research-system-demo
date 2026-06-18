import { Box } from "@mui/material";
import { products } from "../_consts/products";
import ProductCard from "./ProductCard";

const ProductView = () => {
  return (
    <div className="flex-1">
      <Box
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
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
