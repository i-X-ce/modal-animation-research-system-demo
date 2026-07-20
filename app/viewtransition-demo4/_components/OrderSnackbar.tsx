"use client";

import { Alert, Snackbar } from "@mui/material";
import { useCartStore } from "../_stores/cartStore";

const OrderSnackbar = () => {
  const message = useCartStore((s) => s.message);
  const open = useCartStore((s) => s.messageOpen);

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={open}
    >
      <Alert severity="success">{message}</Alert>
    </Snackbar>
  );
};

export default OrderSnackbar;
