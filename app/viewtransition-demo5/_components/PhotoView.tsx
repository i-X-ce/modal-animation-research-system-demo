"use client";

import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import PhotoCard from "./PhotoCard";
import { useAlbumStore } from "../_stores/albumStore";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";

const PhotoView = () => {
  const photos = useAlbumStore((state) => state.photos);
  const movePhoto = useAlbumStore((state) => state.movePhoto);
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      movePhoto(String(active.id), String(over.id));
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragMove={handleDragEnd}
    >
      <SortableContext items={photos} strategy={rectSortingStrategy}>
        <div className="grid grid-cols-8">
          {photos.map((photo) => (
            <PhotoCard key={photo.id} {...photo} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default PhotoView;
