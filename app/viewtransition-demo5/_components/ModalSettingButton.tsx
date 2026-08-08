"use client";

import { Settings } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { motion } from "motion/react";
import { useModalStore, useModalTransition } from "../_stores/modalStore";
import ModalSettingModalContent from "./ModalSettingModalContent";

const ModalSettingButton = () => {
  const openModal = useModalStore((s) => s.openModal);
  const transition = useModalTransition();
  const layoutId = "setting";

  const handleOpenSettings = () => {
    openModal(<ModalSettingModalContent />, layoutId);
  };

  return (
    <motion.div transition={transition} layoutId={layoutId}>
      <IconButton onClick={handleOpenSettings} color="inherit">
        <Settings />
      </IconButton>
    </motion.div>
  );
};

export default ModalSettingButton;
