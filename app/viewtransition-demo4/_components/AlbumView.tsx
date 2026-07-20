"use client";

import { Box, Typography } from "@mui/material";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  useSortable,
} from "@dnd-kit/sortable";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import {
  albumPhotos,
  buildPhotoDate,
  formatPhotoDate,
  type AlbumPhoto,
} from "../_consts/photos";
import { useModalStore } from "../_stores/modalStore";
import PhotoModalContent from "./PhotoModalContent";

type AlbumItem = AlbumPhoto & {
  takenAt: Date;
};

const PhotoCard = ({
  photo,
  onOpen,
}: {
  photo: AlbumItem;
  onOpen: (photo: AlbumItem) => void;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: photo.id });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0) scale(${isDragging ? 1.04 : 1})`
      : undefined,
    transition,
    zIndex: isDragging ? 20 : 1,
  };

  return (
    <motion.button
      ref={setNodeRef}
      type="button"
      layout
      layoutId={photo.id}
      className="group relative w-full overflow-hidden rounded-[28px] text-left focus:outline-none"
      style={style}
      onClick={() => onOpen(photo)}
      {...attributes}
      {...listeners}
    >
      <Box
        sx={{
          aspectRatio: "1 / 1",
          position: "relative",
          background: "#1a1716",
          boxShadow:
            "0 20px 45px rgba(44, 31, 20, 0.12), inset 0 1px 0 rgba(255,255,255,0.06)",
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
            filter: isDragging
              ? "saturate(1.08) contrast(1.05)"
              : "saturate(0.98)",
            transform: "scale(1.01)",
            transition: "filter 180ms ease",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.1) 55%, rgba(0,0,0,0.58) 100%)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            p: 2,
            color: "#f8f5ef",
          }}
        >
          {/* <Typography
            variant="caption"
            sx={{ opacity: 0.8, letterSpacing: 1.4 }}
          >
            {formatPhotoDate(photo.takenAt)}
          </Typography> */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              lineHeight: 1.15,
              textShadow: "0 1px 12px rgba(0,0,0,0.24)",
            }}
          >
            {photo.title}
          </Typography>
        </Box>
      </Box>
    </motion.button>
  );
};

const AlbumView = () => {
  const openModal = useModalStore((state) => state.openModal);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  const initialPhotos = useMemo<AlbumItem[]>(
    () =>
      albumPhotos.map((photo, index) => ({
        ...photo,
        takenAt: buildPhotoDate(index + 1),
      })),
    [],
  );

  const [items, setItems] = useState<AlbumItem[]>(initialPhotos);

  const handleOpen = (photo: AlbumItem) => {
    openModal(
      <PhotoModalContent photo={photo} takenAt={photo.takenAt} />,
      photo.id,
    );
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return;

    setItems((currentItems) => {
      const oldIndex = currentItems.findIndex((item) => item.id === active.id);
      const newIndex = currentItems.findIndex((item) => item.id === over.id);

      if (oldIndex < 0 || newIndex < 0) return currentItems;

      return arrayMove(currentItems, oldIndex, newIndex);
    });
  };

  return (
    <Box
      sx={{
        minHeight: "100dvh",
        px: { xs: 2, sm: 3, lg: 4 },
        py: { xs: 3, sm: 4 },
        color: "#201612",
        background:
          "radial-gradient(circle at top, rgba(255, 247, 233, 0.98) 0%, rgba(240, 228, 211, 0.95) 30%, rgba(198, 173, 147, 0.75) 100%)",
      }}
    >
      <Box
        sx={{
          mx: "auto",
          maxWidth: 1440,
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "end",
            justifyContent: "space-between",
            gap: 2,
            px: { xs: 0.5, sm: 1 },
          }}
        >
          <Box>
            <Typography
              variant="overline"
              sx={{ letterSpacing: 3, opacity: 0.62 }}
            >
              Photo Album
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                lineHeight: 1,
                fontSize: { xs: "2.1rem", sm: "3rem" },
              }}
            >
              Drag. Swap. Open.
            </Typography>
          </Box>
        </Box>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={items.map((item) => item.id)}
            strategy={rectSortingStrategy}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(2, minmax(0, 1fr))",
                  sm: "repeat(3, minmax(0, 1fr))",
                  lg: "repeat(4, minmax(0, 1fr))",
                },
                gap: { xs: 1.5, sm: 2.5 },
              }}
            >
              {items.map((photo) => (
                <PhotoCard key={photo.id} photo={photo} onOpen={handleOpen} />
              ))}
            </Box>
          </SortableContext>
        </DndContext>
      </Box>
    </Box>
  );
};

export default AlbumView;
