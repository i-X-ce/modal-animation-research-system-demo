import { AppBar, Toolbar, Typography } from "@mui/material";

const AlbumAppBar = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6">Album</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default AlbumAppBar;
