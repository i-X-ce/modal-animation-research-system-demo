import { PATH } from "@/consts/path";
import { CssBaseline } from "@mui/material";
import { ReactNode } from "react";
import AlbumAppBar from "./_components/AlbumAppBar";
import Modal from "./_components/Modal";
import PhotoInformation from "./_components/PhotoInformation";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import MouseTracker from "./_components/MouseTracker";

export const metadata = {
  title: PATH.viewTransitionDemo5.label,
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <AppRouterCacheProvider options={{ enableCssLayer: true }}>
        <AlbumAppBar />
        {children}
      </AppRouterCacheProvider>
      <CssBaseline />
      <Modal />
      <PhotoInformation />
      <MouseTracker />
    </>
  );
}
