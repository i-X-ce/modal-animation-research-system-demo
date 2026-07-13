import React from "react";
import Modal from "./_components/Modal";
import OrderSnackbar from "./_components/OrderSnackbar";

export const metadata = {
  title: "Vintage Selection",
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
    </>
  );
}
