"use client";

import { Product } from "../_types/product";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import { useModalStore } from "../_stores/modalStore";
import { motion } from "motion/react";
import { useState } from "react";
import { Add, Remove } from "@mui/icons-material";
import { useCartStore } from "../_stores/cartStore";

const MOTION_LAYOUT_ID: Record<string, string> = {
  IMAGE: "image",
  NAME: "name",
  PRICE: "price",
} as const;

const lIdBase = (productId: string, type: keyof typeof MOTION_LAYOUT_ID) => {
  return `${productId}-${MOTION_LAYOUT_ID[type]}`;
};

const MAX_QTY = 10;
const MIN_QTY = 1;

interface ProductCardProps extends Product {}

const ProductCardModalContent = ({
  id,
  name,
  price,
  img,
  desc,
}: ProductCardProps) => {
  const [qty, setQty] = useState(1);
  const addItem = useCartStore((s) => s.add);
  const closeModal = useModalStore((s) => s.closeModal);

  const handleAddToCart = () => {
    addItem(id, qty);
    closeModal();
  };

  const lId = (type: keyof typeof MOTION_LAYOUT_ID) => {
    return lIdBase(id, type);
  };

  const handleAdd = () => {
    setQty((q) => Math.min(q + 1, MAX_QTY));
    console.log("add", qty);
  };

  const handleRemove = () => {
    setQty((q) => Math.max(q - 1, MIN_QTY));
  };

  return (
    <div className="flex min-w-3xl">
      <motion.div layoutId={lId("IMAGE")} style={{ flexShrink: 0 }}>
        <CardMedia
          component={"img"}
          src={"https://placehold.jp/150x150.png"}
          sx={{ height: 300 }}
          alt={name}
        />
      </motion.div>
      <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h5" gutterBottom>
            <motion.span layoutId={lId("NAME")}>{name}</motion.span>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <motion.span>{desc}</motion.span>
          </Typography>
        </Box>

        <Stack spacing={2}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Stack direction={"row"}>
              <Button
                onClick={handleRemove}
                disabled={qty <= MIN_QTY}
                variant="outlined"
                size="small"
                sx={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
              >
                <Remove />
              </Button>
              <Box
                className="flex items-center justify-center select-none"
                sx={{
                  px: 3,
                  borderTop: (theme) =>
                    `1px ${theme.palette.primary.light} solid`,
                  borderBottom: (theme) =>
                    `1px ${theme.palette.primary.light} solid`,
                }}
              >
                {qty}
              </Box>
              <Button
                onClick={handleAdd}
                disabled={qty >= MAX_QTY}
                variant="outlined"
                size="small"
                sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
              >
                <Add />
              </Button>
            </Stack>
            <Typography variant="h5" color="primary" align="right">
              <motion.span layoutId={lId("PRICE")}>￥{price * qty}</motion.span>
            </Typography>
          </Box>
          <Button onClick={handleAddToCart} variant="contained">
            カートに追加
          </Button>
        </Stack>
      </CardContent>
    </div>
  );
};

const ProductCard = ({ ...props }: ProductCardProps) => {
  const { id, name, price, img } = props;
  const openModal = useModalStore((s) => s.openModal);
  const activeName = useModalStore((s) => s.name);
  const open = useModalStore((s) => s.open);
  const isTarget = activeName === id; // モーダルの内容がこのカードの商品か
  const isOpenCard = isTarget && open; // 現在このカードが開いているか

  const lId = (type: keyof typeof MOTION_LAYOUT_ID) => {
    return lIdBase(id, type);
  };

  const handleClick = () => {
    openModal(<ProductCardModalContent {...props} />, id);
  };

  return (
    <>
      {isOpenCard ? (
        <div />
      ) : (
        <motion.div layoutId={id}>
          <Card>
            <CardActionArea onClick={handleClick}>
              <motion.div layoutId={lId("IMAGE")}>
                <CardMedia
                  sx={{
                    height: 200,
                  }}
                  image="https://placehold.jp/150x150.png"
                />
              </motion.div>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <motion.span layoutId={lId("NAME")}>{name}</motion.span>
                </Typography>
                <Typography variant="h6" color="primary" align="right">
                  <motion.span layoutId={lId("PRICE")}>￥{price}</motion.span>
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </motion.div>
      )}
    </>
  );
};

export default ProductCard;
