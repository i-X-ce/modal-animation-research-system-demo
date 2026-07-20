import { CssBaseline } from "@mui/material";
import Modal from "./_components/Modal";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import React from "react";

export const metadata = {
  title: "Photo Album Demo",
};

export default function ViewTransitionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppRouterCacheProvider options={{ enableCssLayer: true }}>
        {children}
      </AppRouterCacheProvider>
      <Modal />
      <CssBaseline />
    </>
  );
}
