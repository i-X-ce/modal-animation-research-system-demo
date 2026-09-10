"use client";

// import { useSortable } from "@dnd-kit/sortable";
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
  // const { attributes, listeners, setNodeRef } = useSortable({ id });
  const isDragging = useAlbumStore((s) => s.activePhotoId === id);
  const modalTransition = useModalTransition();
  const setOpenPhotoId = useAlbumStore((s) => s.setOpenPhotoId);

  const imageLayoutId = `photo-card-${id}`;
  const containerLayoutId = `photo-card-container-${id}`;

  const isActiveAnimation = useModalStore(
    (s) => s.isAnimation && s.name === imageLayoutId,
  );
  const isAnimation = useModalStore((s) => s.isAnimation);

  const handleClick = () => {
    openModal(<PhotoModalContent {...photoProps} />, imageLayoutId);
    setOpenPhotoId(id);
  };

  const imageContent = (
    <Image
      width={100}
      height={100}
      src={imageUrl}
      alt={id}
      className="w-full h-full object-cover "
      loading="eager"
      draggable={false}
    />
  );

  if (isDragging && !isOverlay) {
    return <div />;
  }

  return (
    <motion.div
      // {...(isOverlay ? {} : attributes)}
      // {...(isOverlay ? {} : listeners)}
      onClick={handleClick}
      layoutId={isDragging && !isOverlay ? undefined : containerLayoutId}
      // ref={isOverlay ? undefined : setNodeRef}
      className={clsx("relative w-full aspect-square")}
      transition={{ type: "spring", bounce: 0.3, duration: 0.3 }}
    >
      <div className="absolute inset-0">{imageContent}</div>
      <motion.div
        className={clsx("absolute inset-0", isActiveAnimation && "z-100")}
        layoutId={imageLayoutId}
        transition={isAnimation ? modalTransition : { duration: 0 }}
      >
        {imageContent}
      </motion.div>
    </motion.div>
  );
};

export default PhotoCard;
