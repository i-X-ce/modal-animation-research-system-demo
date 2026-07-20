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
  const name = useModalStore((s) => s.name);
  const type = animation.type;
  const coverage = animation.coverage;
  const modalSize = Math.round(Math.sqrt(coverage) * 100);
  const isSettingsModal = name === "settings-modal";

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
          {type === "classic" ? (
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
          ) : (
            <button
              type="button"
              aria-label="モーダルを閉じる"
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
              onClick={handleBackdropClick}
            />
          )}

          <motion.div
            className={[
              "relative overflow-hidden border shadow-[0_24px_120px_rgba(0,0,0,0.55)]",
              isSettingsModal
                ? "border-slate-200 bg-white text-slate-900"
                : "border-white/10 bg-[#171717] text-white",
            ].join(" ")}
            style={{
              width: `min(92vw, ${modalSize}dvw)`,
              height: `min(90vh, ${modalSize}dvh)`,
              viewTransitionName: type === "view" ? name || undefined : undefined,
            }}
            transition={transition}
            initial={
              type === "classic"
                ? { y: "100%", opacity: 0 }
                : type === "none"
                  ? { opacity: 1 }
                  : undefined
            }
            animate={
              type === "classic"
                ? { y: 0, opacity: 1 }
                : type === "none"
                  ? { opacity: 1 }
                  : undefined
            }
            exit={
              type === "classic"
                ? { y: "100%", opacity: 0 }
                : type === "none"
                  ? { opacity: 1 }
                  : undefined
            }
          >
            <div className="relative h-full overflow-auto">
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
