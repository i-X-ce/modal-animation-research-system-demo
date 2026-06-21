"use client";

import { Paper } from "@mui/material";
import { useModalStore } from "../_stores/modalStore";
import { AnimatePresence, motion } from "motion/react";
import clsx from "clsx";
import { MouseEventHandler, useState } from "react";
import ModalCloseButton from "./ModalCloseButton";

const Modal = () => {
  const closeModal = useModalStore((s) => s.closeModal);
  const onExitComplete = useModalStore((s) => s.onExitComplete);
  const name = useModalStore((s) => s.name);
  const content = useModalStore((s) => s.content);
  const open = useModalStore((s) => s.open);
  const animation = useModalStore((s) => s.animation);
  const { type, coverage } = animation;
  const size = Math.round(Math.sqrt(coverage) * 100);
  const transition = useModalStore((s) => s.getTransition)();
  const [isAnimation, setIsAnimation] = useState(false);

  const handleClose: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    closeModal();
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
    <AnimatePresence onExitComplete={onExitComplete}>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <motion.div
            className={clsx(
              "absolute inset-0 bg-black/30 backdrop-blur-lg transition-opacity duration-100",
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transition}
            onClick={handleClose}
            onAnimationStart={() => setIsAnimation(true)}
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
              <ModalCloseButton />
              {content}
            </Paper>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
