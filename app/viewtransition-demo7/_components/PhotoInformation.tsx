"use client";

import { Box, IconButton, Paper, Stack } from "@mui/material";
import { Delete, Info } from "@mui/icons-material";
import { useAlbumStore } from "../_stores/albumStore";
import { formatIndex, useSystemStore } from "../_stores/systemStore";
import {
  EXIFData,
  EXIFDATA_LABELS,
  EXIFDataFormatters,
  formatEXIFValue,
} from "../_types/photo";

const PhotoInformationContent = () => {
  const photo = useAlbumStore((s) =>
    s.photos.find((p) => p.id === s.openPhotoId),
  );
  const indexType = useSystemStore((s) => s.settings.indexType);
  const open = useAlbumStore((s) => s.isOpenInformation);
  const openInformation = useAlbumStore((s) => s.openInformation);
  const closeInformation = useAlbumStore((s) => s.closeInformation);
  const removePhoto = useAlbumStore((s) => s.removePhoto);
  const direction = useSystemStore((s) => s.settings.photoInformationDirection);

  const handleToggle = () => {
    if (open) {
      closeInformation();
    } else {
      openInformation();
    }
  };

  const handleRemove = () => {
    if (!photo) return;
    removePhoto(photo.id);
  };

  const isVertical = direction === "top" || direction === "bottom";

  if (!photo) return null;

  const { datetime, EXIFData } = photo;

  return (
    <Box
      sx={{
        position: "fixed",
        display: "flex",
        alignItems: isVertical ? "auto" : "center",
        justifyContent: isVertical ? "center" : "auto",
        insetInline: isVertical ? 0 : "auto",
        insetBlock: !isVertical ? 0 : "auto",
        top: direction === "top" ? 0 : "none",
        bottom: direction === "bottom" ? 0 : "none",
        left: direction === "left" ? 0 : "none",
        right: direction === "right" ? 0 : "none",
        p: 2,
        zIndex: 100,
        pointerEvents: "none",
      }}
    >
      <Stack
        spacing={1}
        direction={isVertical ? "row" : "column"}
        sx={{
          alignItems:
            direction === "top" || direction === "left" ? "start" : "end",
        }}
      >
        <Paper elevation={3} sx={{ pointerEvents: "auto" }}>
          <Stack
            direction={isVertical ? "row" : "column"}
            sx={{ alignItems: "end" }}
          >
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
            <Stack
              spacing={2}
              sx={{
                p: 2,
                maxHeight: "80dvh",
                overflowY: "auto",
                pointerEvents: "auto",
              }}
            >
              <Box>時間: {formatIndex(datetime, indexType)}</Box>
              {Object.entries(EXIFData).map(([_key, _value]) => {
                const key = _key as keyof EXIFData;
                const label = EXIFDATA_LABELS[key];
                const value = _value as EXIFData[keyof EXIFData];
                return (
                  <Box key={_key}>
                    {label}: {formatEXIFValue(key, value)}
                  </Box>
                );
              })}
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
