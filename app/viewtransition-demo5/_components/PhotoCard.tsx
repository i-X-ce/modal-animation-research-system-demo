"use client";

import { useSortable } from "@dnd-kit/sortable";
import { Photo } from "../_types/photo";
import { motion } from "motion/react";
import clsx from "clsx";
import { useAlbumStore } from "../_stores/albumStore";
import { useModalStore, useModalTransition } from "../_stores/modalStore";
import PhotoModalContent from "./PhotoModalContent";
import Image from "next/image";

interface PhotoCardProps extends Photo {
  isOverlay?: boolean;
}

const PhotoCard = ({ isOverlay, ...photoProps }: PhotoCardProps) => {
  const { id, imageUrl } = photoProps;
  const openModal = useModalStore((s) => s.openModal);
  const { attributes, listeners, setNodeRef } = useSortable({ id });
  const isDragging = useAlbumStore((s) => s.activeId === id);
  const modalTransition = useModalTransition();

  const imageLayoutId = `photo-card-${id}`;
  const containerLayoutId = `photo-card-container-${id}`;

  const handleClick = () => {
    openModal(<PhotoModalContent {...photoProps} />, imageLayoutId);
  };

  console.log(modalTransition);

  const imageContent = (
    <Image
      width={100}
      height={100}
      src={imageUrl}
      alt={id}
      className="w-full h-full object-cover"
    />
  );

  if (isDragging && !isOverlay) {
    return <div />;
  }

  return (
    <motion.div
      {...(isOverlay ? {} : attributes)}
      {...(isOverlay ? {} : listeners)}
      onClick={handleClick}
      layoutId={isDragging && !isOverlay ? undefined : containerLayoutId}
      ref={isOverlay ? undefined : setNodeRef}
      className={clsx(
        "relative w-full aspect-square",
        isOverlay ? "cursor-grabbing" : "cursor-grab",
      )}
      transition={{ type: "spring", bounce: 0.3, duration: 0.3 }}
    >
      <motion.div
        className="absolute inset-0"
        layoutId={imageLayoutId}
        transition={modalTransition}
      >
        {imageContent}
      </motion.div>

      <div>{imageContent}</div>
    </motion.div>
  );
};

export default PhotoCard;
