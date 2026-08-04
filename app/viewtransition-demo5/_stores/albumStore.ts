import { create } from "zustand";
import { photos } from "../_consts/photos";
import { Photo } from "../_types/photo";
import { arrayMove } from "@dnd-kit/sortable";

type AlbumState = {
  photos: Photo[];
};

type AlbumActions = {
  movePhoto: (activeId: Photo["id"], overId: Photo["id"]) => void;
};

type AlbumStore = AlbumState & AlbumActions;

const defaultAlbumState: AlbumState = {
  photos: photos,
} as const;

export const useAlbumStore = create<AlbumStore>((set) => ({
  ...defaultAlbumState,

  movePhoto: (activeId, overId) =>
    set((state) => {
      const { photos } = state;
      const activeIndex = photos.findIndex((photo) => photo.id === activeId);
      const overIndex = photos.findIndex((photo) => photo.id === overId);
      if (activeIndex === -1 || overIndex === -1) return state;

      return {
        photos: arrayMove(photos, activeIndex, overIndex),
      };
    }),
}));
