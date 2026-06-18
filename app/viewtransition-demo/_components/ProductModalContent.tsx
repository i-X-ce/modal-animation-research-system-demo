"use client";

import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { products } from "../_consts/products";
import type { ReactElement } from "react";

type Props = {
  productId: string;
  onAdd: () => void;
  onClose: () => void;
};

export default function ProductModalContent({
  productId,
  onAdd,
  onClose,
}: Props): ReactElement | null {
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return null;
  }

  return (
    <>
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <span>{product.name}</span>
        <IconButton onClick={onClose} aria-label="閉じる">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <Box
            component="img"
            src={product.img}
            alt={product.name}
            sx={{
              width: { xs: "100%", sm: 220 },
              maxWidth: 220,
              aspectRatio: "1 / 1",
              objectFit: "cover",
              borderRadius: 2,
            }}
          />
          <Box>
            <Typography>{product.desc}</Typography>
            <Typography sx={{ mt: 1, fontWeight: 600 }}>
              ¥{product.price}
            </Typography>
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onAdd} variant="contained">
          カートに追加
        </Button>
      </DialogActions>
    </>
  );
}
