import { PATH } from "@/consts/path";
import { CssBaseline } from "@mui/material";
import { ReactNode } from "react";
import AlbumAppBar from "./_components/AlbumAppBar";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import ClientProviders from "./_components/ClientProviders";

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
      <ClientProviders />
    </>
  );
}
