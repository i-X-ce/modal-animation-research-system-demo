import { AppBar, Toolbar, Typography } from "@mui/material";
import SettingButton from "./SettingButton";

const CreditCardAppBar = () => {
  return (
    <AppBar position="sticky" sx={{ zIndex: 50 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Credit Card
        </Typography>
        <SettingButton />
      </Toolbar>
    </AppBar>
  );
};

export default CreditCardAppBar;
