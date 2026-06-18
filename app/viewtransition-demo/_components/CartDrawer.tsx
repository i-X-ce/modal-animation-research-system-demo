"use client";

import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useCartStore } from "../_stores/cartStore";
import { products } from "../_consts/products";

export default function CartDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { items, remove, clear } = useCartStore();

  const rows = items.map((it) => ({
    ...it,
    product: products.find((p) => p.id === it.productId)!,
  }));
  const total = rows.reduce((s, r) => s + r.product.price * r.qty, 0);

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 360, p: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6">カート</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          {rows.map((r) => (
            <ListItem
              key={r.productId}
              secondaryAction={
                <Button onClick={() => remove(r.productId)}>削除</Button>
              }
            >
              <ListItemText
                primary={`${r.product.name} x${r.qty}`}
                secondary={`¥${r.product.price * r.qty}`}
              />
            </ListItem>
          ))}
        </List>
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1">合計: ¥{total}</Typography>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 1 }}
            onClick={() => {
              clear();
              onClose();
            }}
          >
            注文する
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}
