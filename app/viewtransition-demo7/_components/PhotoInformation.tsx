"use client";

import { Box, IconButton, Paper, Stack } from "@mui/material";
import { useState } from "react";
import { Info } from "@mui/icons-material";
import { useAlbumStore } from "../_stores/albumStore";
import { formatIndex, useSystemStore } from "../_stores/systemStore";

const PhotoInformationContent = () => {
  const photo = useAlbumStore((s) =>
    s.photos.find((p) => p.id === s.openPhotoId),
  );
  const indexType = useSystemStore((s) => s.settings.indexType);
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  if (!photo) return null;

  const { datetime, place } = photo;

  return (
    <Box
      sx={{
        position: "fixed",
        display: "flex",
        alignItems: "center",
        insetBlock: 0,
        right: 0,
        p: 2,
        zIndex: 100,
      }}
    >
      <Paper elevation={3}>
        <IconButton onClick={handleToggle} size="large">
          <Info />
        </IconButton>

        {open && (
          <Stack spacing={2} sx={{ p: 2 }}>
            <Box>時間: {formatIndex(datetime, indexType)}</Box>
            <Box>
              場所: {place.prefecture}, {place.city}
            </Box>
          </Stack>
        )}
      </Paper>
    </Box>
  );
};

const PhotoInformation = () => {
  const photoOpenPhotoId = useAlbumStore((s) => s.openPhotoId);
  return <PhotoInformationContent key={photoOpenPhotoId} />;
};

export default PhotoInformation;
