import { AppBar, Toolbar, Typography } from "@mui/material";
import ProductView from "./_components/ProductView";
import CartView from "./_components/CartView";
import SettingButton from "./_components/SettingButton";

export default function Page() {
  return (
    <>
      <AppBar position="sticky" sx={{ zIndex: 20 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            YAKINIKU
          </Typography>
          <SettingButton />
        </Toolbar>
      </AppBar>
      <div className="flex">
        <ProductView />
        <CartView />
      </div>
    </>
  );
}
