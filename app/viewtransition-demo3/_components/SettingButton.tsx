"use client";

import { Settings } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useModalStore } from "../_stores/modalStore";
import SettingModalContent from "./SettingModalContent";

const SettingButton = () => {
  const openModal = useModalStore((s) => s.openModal);

  const handleOpenSettings = () => {
    openModal(<SettingModalContent />, "settings-modal");
  };

  return (
    <IconButton
      onClick={handleOpenSettings}
      color="inherit"
      size="small"
      sx={{ color: "rgba(255,255,255,0.82)" }}
      aria-label="モーダル設定を開く"
    >
      <Settings fontSize="small" />
    </IconButton>
  );
};

export default SettingButton;
