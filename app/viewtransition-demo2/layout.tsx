import React from "react";
import { CssBaseline } from "@mui/material";
import Modal from "./_components/Modal";
import OrderSnackbar from "./_components/OrderSnackbar";
import StepPanel from "./_components/StepPanel";

export const metadata = {
  title: "ViewTransition Demo2",
};

export default function ViewTransitionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <StepPanel />
      <Modal />
      <OrderSnackbar />
      <CssBaseline />
    </>
  );
}
