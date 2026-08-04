"use client";

import { useSortable } from "@dnd-kit/sortable";
import { Photo } from "../_types/photo";
import { motion } from "motion/react";

interface PhotoCardProps extends Photo {}

const PhotoCard = ({ id, imageUrl }: PhotoCardProps) => {
  const { attributes, listeners, setNodeRef } = useSortable({ id });

  return (
    <motion.div
      {...attributes}
      {...listeners}
      layoutId={id}
      ref={setNodeRef}
      className="w-full aspect-square"
    >
      <img src={imageUrl} alt={id} className="w-full h-full object-cover" />
    </motion.div>
  );
};

export default PhotoCard;
