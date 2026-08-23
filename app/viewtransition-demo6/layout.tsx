import { CssBaseline } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ReactNode } from "react";
import Modal from "./_components/Modal";
import MouseTracker from "./_components/MouseTracker";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <AppRouterCacheProvider options={{ enableCssLayer: true }}>
        {children}
      </AppRouterCacheProvider>
      <CssBaseline />
      <Modal />
      <MouseTracker />
    </>
  );
}
