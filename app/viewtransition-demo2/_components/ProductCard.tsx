"use client";

import { Product, ProductOptionValue } from "../_types/product";
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
import { useLayoutEffect, useRef, useState } from "react";
import { Add, Remove } from "@mui/icons-material";
import { CartItem, useCartStore } from "../_stores/cartStore";
import {
  defaultProductOptionValues,
  randomProductOptionValues,
} from "../_consts/productOptions";
import ProductOptionsForm from "./ProductOptionsForm";
import { findProductNameById, randomProduct } from "../_consts/products";
import OptionValueChip from "./OptionValueChip";

const MOTION_LAYOUT_ID = {
  IMAGE: "image",
  NAME: "name",
  PRICE: "price",
} as const satisfies Record<string, string>;

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
}: ProductCardProps) => {
  const [qty, setQty] = useState(1);
  const addItem = useCartStore((s) => s.add);
  const closeModal = useModalStore((s) => s.closeModal);
  const transition = useModalStore((s) => s.getTransition)();
  const animationType = useModalStore((s) => s.animation.type);
  const [optionValues, setOptionValues] = useState<ProductOptionValue[]>(
    defaultProductOptionValues,
  );
  const [isOrdered, setIsOrdered] = useState(false);
  const [nextProduct, setNextProduct] = useState<CartItem | null>(null);
  const displayNextOrder = useModalStore((s) => s.animation.displayNextOrder);
  const numberOfCards = useModalStore((s) => s.animation.numberOfCards);
  const numberOfOptions = useModalStore((s) => s.animation.numberOfOptions);
  const displayProductNumber = useModalStore(
    (s) => s.animation.displayProductNumber,
  );

  const handleAddToCart = () => {
    if (isOrdered) {
      closeModal();
    } else {
      addItem(id, optionValues.slice(0, numberOfOptions), qty);

      if (displayNextOrder) {
        setIsOrdered(true);
        const _nextProduct = randomProduct(id, numberOfCards);
        setNextProduct({
          productId: _nextProduct.id,
          options: randomProductOptionValues(numberOfOptions),
          qty: 1,
        });
      } else {
        closeModal();
      }
    }
  };

  const lId = (type: keyof typeof MOTION_LAYOUT_ID) => {
    return animationType === "view" ? lIdBase(id, type) : undefined;
  };

  const handleAdd = () => {
    setQty((q) => Math.min(q + 1, MAX_QTY));
  };

  const handleRemove = () => {
    setQty((q) => Math.max(q - 1, MIN_QTY));
  };

  return (
    <div className="relative flex h-full">
      <motion.div
        layoutId={lId("IMAGE")}
        transition={transition}
        className="flex-2"
      >
        <CardMedia
          component={"img"}
          src={img}
          sx={{ height: "100%" }}
          alt={name}
        />
      </motion.div>
      <CardContent
        sx={{
          flex: 3,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Stack spacing={4} sx={{ flex: 1, py: 2 }}>
          <Stack spacing={1}>
            <motion.div layoutId={lId("NAME")} transition={transition}>
              <Typography variant="h5" gutterBottom>
                {findProductNameById(id, displayProductNumber)}
              </Typography>
            </motion.div>
          </Stack>

          <motion.div
            transition={transition}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {isOrdered ? (
              <Box>
                <Typography variant="body1" gutterBottom>
                  次の商品:{" "}
                  <Typography component={"span"} variant="h6" color="primary">
                    {findProductNameById(
                      nextProduct?.productId,
                      displayProductNumber,
                    )}
                  </Typography>
                </Typography>
                <Stack direction={"row"} sx={{ flexWrap: "wrap", gap: 2 }}>
                  {nextProduct?.options?.map((o) => (
                    <OptionValueChip key={o.id} optionValue={o} />
                  ))}
                </Stack>
              </Box>
            ) : (
              <ProductOptionsForm
                optionValues={optionValues}
                onChange={setOptionValues}
              />
            )}
          </motion.div>
        </Stack>

        <Stack spacing={2}>
          {!isOrdered && (
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <motion.div
                transition={transition}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
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
              </motion.div>
              <motion.div layoutId={lId("PRICE")} transition={transition}>
                <Typography variant="h5" color="primary" align="right">
                  ￥{price * qty}
                </Typography>
              </motion.div>
            </Box>
          )}
          <motion.div
            transition={transition}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Button onClick={handleAddToCart} variant="contained" fullWidth>
              {isOrdered ? "閉じる" : "カートに追加"}
            </Button>
          </motion.div>
        </Stack>
      </CardContent>
    </div>
  );
};

const ProductCard = ({ ...props }: ProductCardProps) => {
  const { id, price, img } = props;
  const openModal = useModalStore((s) => s.openModal);
  const activeName = useModalStore((s) => s.name);
  const open = useModalStore((s) => s.open);
  const isTarget = activeName === id; // モーダルの内容がこのカードの商品か
  const isOpenCard = isTarget && open; // 現在このカードが開いているか
  const transition = useModalStore((s) => s.getTransition)();
  const animationType = useModalStore((s) => s.animation.type);
  const displayProductNumber = useModalStore(
    (s) => s.animation.displayProductNumber,
  );
  const [cardHeight, setCardHeight] = useState<number | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const cardSize = useModalStore((s) => s.animation.cardSize);

  const lId = (type: keyof typeof MOTION_LAYOUT_ID) => {
    return lIdBase(id, type);
  };

  const handleClick = () => {
    openModal(<ProductCardModalContent {...props} />, id);
  };

  useLayoutEffect(() => {
    if (cardRef.current) {
      setCardHeight(cardRef.current.offsetHeight);
    }
  }, [setCardHeight, cardSize]);

  if (animationType === "view" && isOpenCard) {
    return <div style={{ height: `${cardHeight}px` }} />;
  }

  return (
    <motion.div layoutId={id} transition={transition} ref={cardRef}>
      <Card sx={{ height: "100%" }}>
        <CardActionArea
          onClick={handleClick}
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
          }}
        >
          <motion.div
            layoutId={lId("IMAGE")}
            transition={transition}
            className="w-full"
          >
            <CardMedia
              sx={{
                height: 200,
              }}
              image={img}
            />
          </motion.div>
          <CardContent
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <motion.div layoutId={lId("NAME")} transition={transition}>
              <Typography variant="h6" gutterBottom>
                {findProductNameById(id, displayProductNumber)}
              </Typography>
            </motion.div>
            <motion.div
              layoutId={lId("PRICE")}
              transition={transition}
              className="w-fit ml-auto"
            >
              <Typography variant="h6" color="primary" align="right">
                ￥{price}
              </Typography>
            </motion.div>
          </CardContent>
        </CardActionArea>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
