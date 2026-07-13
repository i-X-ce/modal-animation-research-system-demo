"use client";

import { motion } from "motion/react";
import { useModalStore } from "../_stores/modalStore";
import { IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

const ModalCloseButton = () => {
  const closeModal = useModalStore((s) => s.closeModal);
  const transition = useModalStore((s) => s.getTransition)();

  return (
    <motion.div
      className="absolute p-4 top-0 right-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={transition}
    >
      <IconButton onClick={closeModal}>
        <Close />
      </IconButton>
    </motion.div>
  );
};

export default ModalCloseButton;
