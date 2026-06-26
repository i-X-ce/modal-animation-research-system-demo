"use client";

import {
  Button,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useCartStore } from "../_stores/cartStore";
import { products } from "../_consts/products";
import { useModalStore } from "../_stores/modalStore";

const CartView = () => {
  const items = useCartStore((s) => s.items);
  const remove = useCartStore((s) => s.remove);
  const order = useCartStore((s) => s.order);
  const total = useCartStore((s) => s.getTotalPrice());
  const onClose = useModalStore((s) => s.closeModal);

  const rows = items.map((it) => ({
    ...it,
    product: products.find((p) => p.id === it.productId)!,
  }));

  return (
    <div className="basis-80 p-2">
      <Stack className="sticky top-20 h-[calc(100dvh-100px)] flex flex-col justify-between overflow-y-auto">
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

        <Paper className="p-2 sticky bottom-2">
          <Typography variant="subtitle1" gutterBottom>
            合計: ¥{total}
          </Typography>
          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={() => {
              order();
              onClose();
            }}
            disabled={rows.length === 0}
          >
            注文する
          </Button>
        </Paper>
      </Stack>
    </div>
  );
};

export default CartView;
