"use client";

import { create } from "zustand";
import { photos } from "../_consts/photos";
import { Photo } from "../_types/photo";
import { arrayMove } from "@dnd-kit/sortable";
import { UniqueIdentifier } from "@dnd-kit/core";

type AlbumState = {
  photos: Photo[];
  activePhotoId: UniqueIdentifier | null; // 掴んでいる写真ID
  openPhotoId: Photo["id"] | null; // モーダルで開いている写真ID
};

type AlbumActions = {
  movePhoto: (activeId: Photo["id"], overId: Photo["id"]) => void;
  setActivePhotoId: (id: UniqueIdentifier | null) => void;
  setOpenPhotoId: (id: Photo["id"] | null) => void;
  removePhoto: (id: Photo["id"]) => void;
};

type AlbumStore = AlbumState & AlbumActions;

const defaultAlbumState: AlbumState = {
  photos: photos,
  activePhotoId: null,
  openPhotoId: null,
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
  setActivePhotoId: (id) => set({ activePhotoId: id }),
  setOpenPhotoId: (id) => set({ openPhotoId: id }),
  removePhoto: (id) =>
    set((state) => ({
      photos: state.photos.filter((photo) => photo.id !== id),
    })),
}));
