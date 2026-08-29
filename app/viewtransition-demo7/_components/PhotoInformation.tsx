"use client";

import { Box, IconButton, Paper, Stack } from "@mui/material";
import { useState } from "react";
import { Delete, Info } from "@mui/icons-material";
import { useAlbumStore } from "../_stores/albumStore";
import { formatIndex, useSystemStore } from "../_stores/systemStore";

const PhotoInformationContent = () => {
  const photo = useAlbumStore((s) =>
    s.photos.find((p) => p.id === s.openPhotoId),
  );
  const indexType = useSystemStore((s) => s.settings.indexType);
  const [open, setOpen] = useState(false);
  const removePhoto = useAlbumStore((s) => s.removePhoto);

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const handleRemove = () => {
    if (!photo) return;
    removePhoto(photo.id);
  };

  if (!photo) return null;

  const { datetime, place } = photo;

  return (
    <Box
      sx={{
        position: "fixed",
        display: "flex",
        justifyContent: "center",
        insetInline: 0,
        bottom: 0,
        p: 2,
        zIndex: 100,
        pointerEvents: "none",
      }}
    >
      <Stack spacing={1} direction={"row"}>
        <Paper elevation={3} sx={{ pointerEvents: "auto", alignSelf: "end" }}>
          <Stack direction={"row"} sx={{ alignItems: "end" }}>
            <IconButton onClick={handleToggle} size="large">
              <Info />
            </IconButton>
            <IconButton onClick={handleRemove} size="large" color="error">
              <Delete />
            </IconButton>
          </Stack>
        </Paper>

        {open && (
          <Paper elevation={3}>
            <Stack spacing={2} sx={{ p: 2 }}>
              <Box>時間: {formatIndex(datetime, indexType)}</Box>
              <Box>
                場所: {place.prefecture}, {place.city}
              </Box>
            </Stack>
          </Paper>
        )}
      </Stack>
    </Box>
  );
};

const PhotoInformation = () => {
  const photoOpenPhotoId = useAlbumStore((s) => s.openPhotoId);
  return <PhotoInformationContent key={photoOpenPhotoId} />;
};

export default PhotoInformation;
