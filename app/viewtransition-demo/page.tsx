import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import { Settings } from "@mui/icons-material";
import ProductView from "./_components/ProductView";
import CartView from "./_components/CartView";

export default function Page() {
  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            YAKINIKU
          </Typography>
          <IconButton color="inherit">
            <Settings />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className="flex">
        <ProductView />
        <CartView />
      </div>
    </>
  );
}
