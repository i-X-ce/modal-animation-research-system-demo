"use client";

import { Box, IconButton } from "@mui/material";
import { useModalStore } from "../_stores/modalStore";
import { Close } from "@mui/icons-material";

const ModalCloseButton = () => {
  const closeModal = useModalStore((s) => s.closeModal);

  return (
    <Box sx={{ position: "absolute", p: 1, top: 0, right: 0 }}>
      <IconButton onClick={closeModal}>
        <Close />
      </IconButton>
    </Box>
  );
};

export default ModalCloseButton;
