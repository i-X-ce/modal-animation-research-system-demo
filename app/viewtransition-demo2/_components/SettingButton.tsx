"use client";

import { Settings } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useModalStore } from "../_stores/modalStore";
import SettingModalContent from "./SettingModalContent";
import { motion } from "motion/react";
import { SYSTEM_STEP, useSystemStore } from "../_stores/systemStore";

const SettingButton = () => {
  const openModal = useModalStore((s) => s.openModal);
  const transition = useModalStore((s) => s.getTransition)();
  const layoutId = "setting";
  const systemStep = useSystemStore((state) => state.systemStep);
  const displaySettings = useModalStore((s) => s.animation.displaySettings);

  const handleOpenSettings = () => {
    openModal(<SettingModalContent />, layoutId);
  };

  if (!displaySettings && systemStep === SYSTEM_STEP.ORDERING) {
    return null;
  }

  return (
    <motion.div transition={transition} layoutId={layoutId}>
      <IconButton onClick={handleOpenSettings} color="inherit">
        <Settings />
      </IconButton>
    </motion.div>
  );
};

export default SettingButton;
