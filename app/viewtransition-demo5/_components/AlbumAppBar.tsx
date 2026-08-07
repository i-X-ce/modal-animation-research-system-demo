import { AppBar, Toolbar, Typography } from "@mui/material";
import ModalSettingButton from "./ModalSettingButton";

const AlbumAppBar = () => {
  return (
    <AppBar position="sticky" sx={{ zIndex: 50 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Album
        </Typography>
        <ModalSettingButton />
      </Toolbar>
    </AppBar>
  );
};

export default AlbumAppBar;
