"use client";

import { Photo } from "../_types/photo";

interface PhotoModalContentProps extends Photo {}

const PhotoModalContent = ({ imageUrl, datetime }: PhotoModalContentProps) => {
  const date = new Date(datetime);
  const formattedDate = date.toLocaleString("us-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="relative w-full h-full">
      <img
        src={imageUrl}
        className="absolute w-full h-full object-cover bg-center"
      />
      <div className="absolute inset-x-0 h-25 bg-linear-to-t from-transparent to-black/30" />
      <div className="absolute p-4">
        <p className="text-white text-2xl font-bold">{formattedDate}</p>
      </div>
    </div>
  );
};

export default PhotoModalContent;
