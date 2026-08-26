"use client";

import { create } from "zustand";
import { photos } from "../_consts/photos";
import { Photo } from "../_types/photo";
import { arrayMove } from "@dnd-kit/sortable";
import { UniqueIdentifier } from "@dnd-kit/core";

type AlbumState = {
  photos: Photo[];
  activeId: UniqueIdentifier | null;
};

type AlbumActions = {
  movePhoto: (activeId: Photo["id"], overId: Photo["id"]) => void;
  setActiveId: (id: UniqueIdentifier | null) => void;
};

type AlbumStore = AlbumState & AlbumActions;

const defaultAlbumState: AlbumState = {
  photos: photos,
  activeId: null,
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
  setActiveId: (id) => set({ activeId: id }),
}));
