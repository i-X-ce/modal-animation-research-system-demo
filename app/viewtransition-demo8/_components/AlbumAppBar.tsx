import { AppBar, Toolbar, Typography } from "@mui/material";
import SettingButton from "./SettingButton";
import RemovePhotoCounter from "./RemovePhotoCounter";

const AlbumAppBar = () => {
  return (
    <AppBar position="sticky" sx={{ zIndex: 50 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Album
        </Typography>
        <RemovePhotoCounter />
        <SettingButton />
      </Toolbar>
    </AppBar>
  );
};

export default AlbumAppBar;
