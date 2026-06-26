"use client";

import { Settings } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useModalStore } from "../_stores/modalStore";
import SettingModalContent from "./SettingModalContent";
import { motion } from "motion/react";

const SettingButton = () => {
  const openModal = useModalStore((s) => s.openModal);
  const transition = useModalStore((s) => s.getTransition)();
  const layoutId = "setting";

  const handleOpenSettings = () => {
    openModal(<SettingModalContent />, layoutId);
  };

  return (
    <motion.div transition={transition} layoutId={layoutId}>
      <IconButton onClick={handleOpenSettings} color="inherit">
        <Settings />
      </IconButton>
    </motion.div>
  );
};

export default SettingButton;
