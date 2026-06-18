import React from "react";
import { CssBaseline } from "@mui/material";
import Modal from "./_components/Modal";

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
      <CssBaseline />
    </>
  );
}
