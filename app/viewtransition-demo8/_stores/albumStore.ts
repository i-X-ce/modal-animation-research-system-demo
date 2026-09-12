"use client";

import { create } from "zustand";
import { generatePhotos } from "../_util/photos";
import { Photo } from "../_types/photo";
// import { arrayMove } from "@dnd-kit/sortable";
import { UniqueIdentifier } from "@dnd-kit/core";
import { useSystemStore } from "./systemStore";
import { useModalStore } from "./modalStore";

type AlbumState = {
  photos: Photo[];
  activePhotoId: UniqueIdentifier | null; // 掴んでいる写真ID
  openPhotoId: Photo["id"] | null; // モーダルで開いている写真ID
  isOpenInformation: boolean; // 写真の追加情報を開いているか
};

type AlbumActions = {
  resetPhotos: (seed?: string) => void;
  movePhoto: (activeId: Photo["id"], overId: Photo["id"]) => void;
  setActivePhotoId: (id: UniqueIdentifier | null) => void;
  setOpenPhotoId: (id: Photo["id"] | null) => void;
  removePhoto: (id: Photo["id"]) => void;
  openInformation: () => void;
  closeInformation: () => void;
};

type AlbumStore = AlbumState & AlbumActions;

const defaultAlbumState: AlbumState = {
  photos: [],
  activePhotoId: null,
  openPhotoId: null,
  isOpenInformation: false,
} as const;

export const useAlbumStore = create<AlbumStore>((set, get) => ({
  ...defaultAlbumState,

  resetPhotos() {
    set({
      photos: generatePhotos(
        useSystemStore.getState().settings.numberOfCards,
        useSystemStore.getState().settings.photoType,
        useSystemStore.getState().settings.seed,
      ),
    });
  },
  movePhoto: (/* activeId, overId */) => {
    // set((state) => {
    //   const { photos } = state;
    //   const activeIndex = photos.findIndex((photo) => photo.id === activeId);
    //   const overIndex = photos.findIndex((photo) => photo.id === overId);
    //   if (activeIndex === -1 || overIndex === -1) return state;
    //   useSystemStore.getState().movePhotos(activeId, overId);
    //   return {
    //     photos: arrayMove(photos, activeIndex, overIndex),
    //   };
    // });
  },
  setActivePhotoId: (id) => set({ activePhotoId: id }),
  setOpenPhotoId: (id) => {
    const lockInformation = useSystemStore.getState().settings.lockInformation;
    const isOpenInformation = get().isOpenInformation;
    if (isOpenInformation && lockInformation) {
      return;
    }
    set({ openPhotoId: id });
  },
  removePhoto: (id) => {
    useSystemStore.getState().removePhoto(id);
    useAlbumStore.getState().closeInformation();
    useModalStore.getState().closeModal();
    set((state) => ({
      photos: state.photos.map((photo) =>
        photo.id === id ? { ...photo, isDisplay: false } : photo,
      ),
    }));
  },
  openInformation: () => {
    useSystemStore.getState().openInformation();
    set({ isOpenInformation: true });
  },
  closeInformation: () => {
    useSystemStore.getState().closeInformation();
    set({ isOpenInformation: false });
  },
}));
