import { AppBar, Toolbar, Typography } from "@mui/material";
import SettingButton from "./_components/SettingButton";

export default function Page() {
  return (
    <>
      <AppBar position="sticky" sx={{ zIndex: 20 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            café
          </Typography>
          <SettingButton />
        </Toolbar>
      </AppBar>
    </>
  );
}
