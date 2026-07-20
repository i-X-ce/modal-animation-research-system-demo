"use client";

import { Box, Chip, Typography } from "@mui/material";
import { motion } from "motion/react";
import { AlbumPhoto, formatPhotoDate } from "../_consts/photos";

type PhotoModalContentProps = {
  photo: AlbumPhoto;
  takenAt: Date;
};

const PhotoModalContent = ({ photo, takenAt }: PhotoModalContentProps) => {
  return (
    <motion.div
      className="flex h-full min-h-0 flex-col"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          minHeight: 0,
          gap: 2.5,
          p: { xs: 2.5, sm: 3.5 },
          color: "#f8f5ef",
          background:
            "linear-gradient(180deg, rgba(24, 24, 28, 0.96) 0%, rgba(18, 18, 20, 0.94) 100%)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
            alignItems: "flex-start",
          }}
        >
          <Box>
            <Typography
              variant="overline"
              sx={{ color: "rgba(248,245,239,0.68)" }}
            >
              Random Date
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 700, lineHeight: 1.1 }}>
              {formatPhotoDate(takenAt)}
            </Typography>
          </Box>
          <Chip
            label={photo.title}
            sx={{
              color: "#f8f5ef",
              bgcolor: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.18)",
            }}
          />
        </Box>

        <Box
          sx={{
            flex: 1,
            minHeight: 0,
            borderRadius: 4,
            overflow: "hidden",
            position: "relative",
            background: "rgba(255,255,255,0.04)",
            boxShadow: "0 24px 60px rgba(0, 0, 0, 0.22)",
          }}
        >
          <Box
            component="img"
            alt={photo.title}
            src={photo.src}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>

        <Typography
          variant="body2"
          sx={{
            color: "rgba(248,245,239,0.76)",
            lineHeight: 1.85,
          }}
        >
          {photo.caption}
        </Typography>
      </Box>
    </motion.div>
  );
};

export default PhotoModalContent;
