import React from "react";
import { CssBaseline } from "@mui/material";
import Modal from "./_components/Modal";
import OrderSnackbar from "./_components/OrderSnackbar";
import StepPanel from "./_components/StepPanel";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import MouseTracker from "./_components/MouseTracker";

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
      <AppRouterCacheProvider options={{ enableCssLayer: true }}>
        {children}
      </AppRouterCacheProvider>
      <StepPanel />
      <Modal />
      <OrderSnackbar />
      <MouseTracker />
      <CssBaseline />
    </>
  );
}
