"use client";

import { useModalStore } from "../_stores/modalStore";

const ModalCloseButton = () => {
  const closeModal = useModalStore((s) => s.closeModal);

  return (
    <button
      type="button"
      onClick={closeModal}
      className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-md border border-white/20 bg-black/20 text-[18px] text-white/80"
      aria-label="モーダルを閉じる"
    >
      ×
    </button>
  );
};

export default ModalCloseButton;
