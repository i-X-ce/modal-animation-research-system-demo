"use client";

import { useEffect, MouseEventHandler } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useModalStore } from "../_stores/modalStore";
import ModalCloseButton from "./ModalCloseButton";

const Modal = () => {
  const closeModal = useModalStore((s) => s.closeModal);
  const onExitComplete = useModalStore((s) => s.onExitComplete);
  const content = useModalStore((s) => s.content);
  const open = useModalStore((s) => s.open);
  const animation = useModalStore((s) => s.animation);
  const transition = useModalStore((s) => s.getTransition)();
  const type = animation.type;

  useEffect(() => {
    if (!open) {
      return;
    }

    const bodyElement = document.body;
    bodyElement.style.overflow = "hidden";

    return () => {
      bodyElement.style.overflow = "";
    };
  }, [open]);

  const handleBackdropClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    closeModal();
  };

  return (
    <AnimatePresence onExitComplete={onExitComplete}>
      {open && content && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6">
          <motion.button
            type="button"
            aria-label="モーダルを閉じる"
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transition}
            onClick={handleBackdropClick}
          />

          <motion.div
            className="relative w-full max-w-[1120px] overflow-hidden border border-white/10 bg-[#111111] text-white shadow-[0_24px_120px_rgba(0,0,0,0.55)]"
            transition={transition}
            initial={
              type === "view"
                ? { scale: 0.96, opacity: 0 }
                : { y: 40, opacity: 0 }
            }
            animate={
              type === "view" ? { scale: 1, opacity: 1 } : { y: 0, opacity: 1 }
            }
            exit={
              type === "view"
                ? { scale: 0.96, opacity: 0 }
                : { y: 40, opacity: 0 }
            }
          >
            <div className="relative overflow-auto">
              {content}
              <ModalCloseButton />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
