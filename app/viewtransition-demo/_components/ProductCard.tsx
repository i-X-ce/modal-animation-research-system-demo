"use client";
import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { products } from "../data/products";
import { useModalStore } from "../_stores/modalStore";

type Props = { product: (typeof products)[number] };

export default function ProductCard({ product }: Props) {
  const { openProduct, animation } = useModalStore();

  const handleOpen = () => {
    if (
      animation.type === "view" &&
      typeof document !== "undefined" &&
      (document as any).startViewTransition
    ) {
      (document as any).startViewTransition(() => openProduct(product.id));
    } else {
      openProduct(product.id);
    }
  };

  return (
    <Card onClick={handleOpen} sx={{ cursor: "pointer" }}>
      <CardMedia
        component="img"
        height="140"
        image={product.img}
        alt={product.name}
        style={{ viewTransitionName: `card-${product.id}` }}
      />
      <CardContent>
        <Typography variant="h6">{product.name}</Typography>
        <Typography color="text.secondary">¥{product.price}</Typography>
      </CardContent>
    </Card>
  );
}
