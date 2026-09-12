"use client";

import { Typography } from "@mui/material";
import { useAlbumStore } from "../_stores/albumStore";
import { checkRemovePhoto } from "../_util/photos";
import { useSystemStore } from "../_stores/systemStore";

const RemovePhotoCounter = () => {
  const isDisplay = useSystemStore((s) => s.settings.removeCounter);
  const maxRemoveCnt = useAlbumStore(
    (s) => s.photos.filter((p) => checkRemovePhoto(p)).length,
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
