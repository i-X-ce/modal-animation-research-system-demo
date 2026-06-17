"use client";

import {
  Box,
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ControlsPanel from "./_components/ControlsPanel";
import ProductCard from "./_components/ProductCard";
import { products } from "./data/products";
import { useState } from "react";
import CartDrawer from "./_components/CartDrawer";

export default function Page() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            焼肉セルフオーダー（デモ）
          </Typography>
          <IconButton color="inherit" onClick={() => setCartOpen(true)}>
            <ShoppingCartIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container sx={{ py: 3 }}>
        <ControlsPanel />
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: 16,
          }}
        >
          {products.map((p) => (
            <Box key={p.id}>
              <ProductCard product={p} />
            </Box>
          ))}
        </Box>
      </Container>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
