"use client";

import { Typography } from "@mui/material";
import { useAlbumStore } from "../_stores/albumStore";
import { useSystemStore } from "../_stores/systemStore";
import { PHOTO_MARKERS } from "../_types/photo";

const RemovePhotoCounter = () => {
  const isDisplay = useSystemStore((s) => s.settings.displayRemoveCounter);
  const maxRemoveCnt = useAlbumStore(
    (s) => s.photos.filter((p) => p._marker === PHOTO_MARKERS.REMOVE).length,
  );
  const removeCnt = useAlbumStore(
    (s) => s.photos.filter((p) => !p.isDisplay).length,
  );

  if (!isDisplay) return null;

  return (
    <Typography>
      {removeCnt} / {maxRemoveCnt}
    </Typography>
  );
};

export default RemovePhotoCounter;
