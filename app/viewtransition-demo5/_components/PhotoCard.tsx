"use client";

import { useSortable } from "@dnd-kit/sortable";
import { Photo } from "../_types/photo";
import { motion, Transition } from "motion/react";
import clsx from "clsx";
import { useAlbumStore } from "../_stores/albumStore";
import { useModalStore } from "../_stores/modalStore";
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
  const isAnimation = useModalStore((s) => s.isAnimation);
  const modalTransition = useModalStore((s) => s.getTransition)();
  const transition: Transition = isAnimation
    ? modalTransition
    : { type: "spring", bounce: 0.3, duration: 0.3 };

  const layoutId = `photo-card-${id}`;

  const handleClick = () => {
    openModal(<PhotoModalContent {...photoProps} />, layoutId);
  };

  if (isDragging && !isOverlay) {
    return <div />;
  }

  return (
    <motion.div
      {...(isOverlay ? {} : attributes)}
      {...(isOverlay ? {} : listeners)}
      onClick={handleClick}
      layoutId={isDragging && !isOverlay ? undefined : layoutId}
      ref={isOverlay ? undefined : setNodeRef}
      className={clsx(
        "w-full aspect-square",
        isOverlay ? "cursor-grabbing" : "cursor-grab",
      )}
      transition={transition}
    >
      <motion.div>
        <Image
          width={100}
          height={100}
          src={imageUrl}
          alt={id}
          className="w-full h-full object-cover"
        />
      </motion.div>
    </motion.div>
  );
};

export default PhotoCard;
