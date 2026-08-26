"use client";

import { AnimatePresence, motion } from "motion/react";
import { useModalStore, useModalTransition } from "../_stores/modalStore";
import clsx from "clsx";
import { Paper } from "@mui/material";

const Modal = () => {
  const open = useModalStore((s) => s.open);
  const transition = useModalTransition();
  const closeModal = useModalStore((s) => s.closeModal);
  const onExitComplete = useModalStore((s) => s.onExitComplete);
  const name = useModalStore((s) => s.name);
  const content = useModalStore((s) => s.content);
  const type = useModalStore((s) => s.settings.type);
  const coverage = useModalStore((s) => s.settings.coverage);
  const size = Math.round(Math.sqrt(coverage) * 100);
  const isAnimation = useModalStore((s) => s.isAnimation);
  const setIsAnimation = useModalStore((s) => s.setIsAnimation);

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    closeModal();
  };

  const onAnimationStart = () => {
    const bodyElement = document.body;
    if (bodyElement) {
      bodyElement.style.overflow = "hidden";
    }
    setIsAnimation(true);
  };

  const handleExitComplete = () => {
    const bodyElement = document.body;
    if (bodyElement) {
      bodyElement.style.overflow = "";
    }
    onExitComplete();
  };

  const layoutId = (() => {
    if (type === "view") {
      return name || "modal";
    } else if (type === "classic") {
      return "modal";
    }
    return undefined;
  })();

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center z-100">
          <motion.div
            className={clsx(
              "absolute inset-0 bg-black/30 backdrop-blur-lg transition-opacity duration-100",
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transition}
            onClick={handleClose}
            onAnimationStart={onAnimationStart}
            onAnimationComplete={() => setIsAnimation(false)}
          />
          <motion.div
            className="relative"
            layoutId={layoutId}
            transition={transition}
            initial={type === "view" ? {} : { y: 100, opacity: 0 }}
            animate={type === "view" ? {} : { y: 0, opacity: 1 }}
            exit={type === "view" ? {} : { y: 100, opacity: 0 }}
          >
            <Paper
              className={clsx(
                "relative",
                isAnimation ? "overflow-clip" : "overflow-auto",
              )}
              sx={{ height: `${size}dvh`, width: `${size}dvw` }}
            >
              {content}
              {/* <ModalCloseButton /> */}
            </Paper>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
