"use client";

import { useModalStore } from "../_stores/modalStore";

const ModalCloseButton = () => {
  const closeModal = useModalStore((s) => s.closeModal);

  return (
    <button
      type="button"
      onClick={closeModal}
      className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/30 text-xl text-white/80 transition hover:border-white/25 hover:text-white"
      aria-label="モーダルを閉じる"
    >
      ×
    </button>
  );
};

export default ModalCloseButton;
