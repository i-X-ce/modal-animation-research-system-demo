import React from "react";
import ProductModal from "./_components/ProductModal";

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
      <ProductModal />
    </>
  );
}
