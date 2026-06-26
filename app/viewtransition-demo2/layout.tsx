import React from "react";
import { CssBaseline } from "@mui/material";
import Modal from "./_components/Modal";
import OrderSnackbar from "./_components/OrderSnackbar";

export const metadata = {
  title: "ViewTransition Demo",
};

export default function ViewTransitionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Modal />
      <OrderSnackbar />
      <CssBaseline />
    </>
  );
}
