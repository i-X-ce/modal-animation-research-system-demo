"use client";
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useModalStore } from "../_stores/modalStore";
import { products } from "../data/products";
import { useCartStore } from "../_stores/cartStore";

export default function ProductModal() {
  const { open, productId, close, animation } = useModalStore();
  const cart = useCartStore();

  const product = products.find((p) => p.id === productId);
  if (!product) return null;

  const handleAdd = () => {
    cart.add(product.id, 1);
    close();
  };

  return (
    <Dialog open={open} onClose={close} fullWidth maxWidth="sm">
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span>{product.name}</span>
        <IconButton onClick={close}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <div style={{ display: "flex", gap: 16 }}>
          <img
            src={product.img}
            alt=""
            style={{
              width: 160,
              borderRadius: 8,
              viewTransitionName: `card-${product.id}`,
            }}
          />
          <div>
            <Typography>{product.desc}</Typography>
            <Typography sx={{ mt: 1, fontWeight: 600 }}>
              ¥{product.price}
            </Typography>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAdd} variant="contained">
          カートに追加
        </Button>
      </DialogActions>
    </Dialog>
  );
}
