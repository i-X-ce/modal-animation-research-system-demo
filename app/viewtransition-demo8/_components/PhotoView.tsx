"use client";

import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  pointerWithin,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import PhotoCard from "./PhotoCard";
import { useAlbumStore } from "../_stores/albumStore";
import { rectSortingStrategy, SortableContext } from "@dnd-kit/sortable";
import { useSystemStore } from "../_stores/systemStore";

const PhotoView = () => {
  const photos = useAlbumStore((state) => state.photos);
  const movePhoto = useAlbumStore((state) => state.movePhoto);
  const activeId = useAlbumStore((state) => state.activePhotoId);
  const setActiveId = useAlbumStore((state) => state.setActivePhotoId);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 3 } }),
  );
  const numberOfCards = useSystemStore((state) => state.settings.numberOfCards);

  const activePhoto = photos.find((photo) => photo.id === activeId);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      movePhoto(String(active.id), String(over.id));
    }
    setActiveId(null);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={pointerWithin}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={photos} strategy={rectSortingStrategy}>
        <div
          className="flex flex-wrap overflow-x-clip"
          // style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
        >
          {photos.slice(0, numberOfCards).map((photo) => (
            <PhotoCard key={photo.id} {...photo} />
          ))}
        </div>
      </SortableContext>

      <DragOverlay dropAnimation={null}>
        {activeId && activePhoto ? (
          <PhotoCard {...activePhoto} isOverlay />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default PhotoView;
