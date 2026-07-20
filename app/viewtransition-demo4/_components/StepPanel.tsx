"use client";

import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  SxProps,
  Typography,
} from "@mui/material";
import { SYSTEM_STEP, useSystemStore } from "../_stores/systemStore";
import CartView from "./CartView";
import ProductView from "./ProductView";
import { useModalStore } from "../_stores/modalStore";
import { motion } from "motion/react";

const StepPanel = () => {
  const step = useSystemStore((state) => state.systemStep);
  const startOrdering = useSystemStore((state) => state.startOrdering);
  const containerSx: SxProps = {
    p: 4,
  };
  const jsonLink = useSystemStore((state) => state.jsonLink);
  const csvLink = useSystemStore((state) => state.csvLink);
  const end = useSystemStore((state) => state.end);
  const openModal = useModalStore((s) => s.openModal);
  const closeModal = useModalStore((s) => s.closeModal);

  const handleOpenEndModal = () => {
    const endModalContent = (
      <Box>
        <DialogTitle>終了確認</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            本当に終了しますか？
          </Typography>
          <Typography variant="body1" gutterBottom>
            直前に計測したログファイルのダウンロードができなくなります。
          </Typography>
          <DialogActions>
            <Button onClick={closeModal}>キャンセル</Button>
            <Button
              onClick={() => {
                closeModal();
                end();
              }}
              variant="contained"
              color="error"
            >
              終了する
            </Button>
          </DialogActions>
        </DialogContent>
      </Box>
    );

    openModal(endModalContent, "end-modal");
  };

  if (step === SYSTEM_STEP.START) {
    return (
      <Box sx={containerSx}>
        <Button onClick={startOrdering} size="large" variant="contained">
          スタート
        </Button>
      </Box>
    );
  } else if (step === SYSTEM_STEP.ORDERING) {
    return (
      <div className="flex">
        <ProductView />
        <CartView />
      </div>
    );
  } else if (step === SYSTEM_STEP.END) {
    return (
      <Box sx={containerSx}>
        <Stack spacing={2} sx={{ display: "flex", alignItems: "start" }}>
          <Stack direction={"row"} spacing={2}>
            <Button
              size="large"
              variant="contained"
              href={csvLink().url}
              download={csvLink().filename}
            >
              CSVでログをダウンロード
            </Button>
            <Button
              size="large"
              variant="contained"
              href={jsonLink().url}
              download={jsonLink().filename}
            >
              JSONでログをダウンロード
            </Button>
          </Stack>
          <motion.div>
            <Button
              size="large"
              variant="contained"
              color="error"
              onClick={handleOpenEndModal}
            >
              終了
            </Button>
          </motion.div>
        </Stack>
      </Box>
    );
  }
};

export default StepPanel;
