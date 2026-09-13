"use client";

import Image from "next/image";
import { Photo } from "../_types/photo";
import { useSystemStore } from "../_stores/systemStore";
import { formatIndex } from "../_util/photos";
import ModalCloseButton from "./ModalCloseButton";

interface PhotoModalContentProps extends Photo {}

const PhotoModalContent = ({
  id,
  imageUrl,
  datetime,
}: PhotoModalContentProps) => {
  const indexType = useSystemStore((s) => s.settings.indexType);
  const formattedIndex = formatIndex(datetime, indexType);
  const displayIndex = useSystemStore((s) => s.settings.displayIndexOnModal);

  return (
    <div className="relative w-full h-full">
      <Image
        width={100}
        height={100}
        src={imageUrl}
        className="absolute w-full h-full object-contain bg-center"
        alt={id}
      />
      {displayIndex && (
        <>
          <div className="absolute inset-x-0 h-25 bg-linear-to-t from-transparent to-black/30" />
          <div className="absolute p-4">
            <p className="text-white text-2xl font-bold">{formattedIndex}</p>
          </div>
        </>
      )}
      <ModalCloseButton />
    </div>
  );
};

export default PhotoModalContent;
