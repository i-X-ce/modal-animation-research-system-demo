import { PATH } from "@/consts/path";
import { CssBaseline } from "@mui/material";
import { ReactNode } from "react";
import AlbumAppBar from "./_components/AlbumAppBar";

export const metadata = {
  title: PATH.viewTransitionDemo5.label,
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <AlbumAppBar />
      {children}
      <CssBaseline />
    </>
  );
}
