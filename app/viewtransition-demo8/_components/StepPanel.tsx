"use client";

import { Box, Button, Stack } from "@mui/material";
import { SYSTEM_STEP, useSystemStore } from "../_stores/systemStore";
import PhotoView from "./PhotoView";

const StepPanel = () => {
  const step = useSystemStore((s) => s.systemStep);
  const start = useSystemStore((s) => s.start);
  const complete = useSystemStore((s) => s.complete);
  const end = useSystemStore((s) => s.end);
  const csvLink = useSystemStore((s) => s.csvLink);

  const handleStart = () => {
    const element = document.documentElement;
    if (element.requestFullscreen) {
      element.requestFullscreen();
    }
    const bodyElement = document.body;
    if (bodyElement) {
      bodyElement.style.overflow = "hidden";
    }
    start();
  };

  const handleComplete = () => {
    const bodyElement = document.body;
    if (bodyElement) {
      bodyElement.style.overflow = "";
    }
    complete();
  };

  const content = (() => {
    switch (step) {
      case SYSTEM_STEP.START:
        return (
          <Box sx={{ p: 4 }}>
            <Button onClick={handleStart} variant="contained">
              スタート
            </Button>
          </Box>
        );
      case SYSTEM_STEP.DOING:
        return (
          <>
            <PhotoView />
            <Box sx={{ p: 2, display: "flex", justifyContent: "end" }}>
              <Button
                onClick={handleComplete}
                size="large"
                variant="contained"
                href={csvLink().url}
                download={csvLink().filename}
              >
                チェック完了
              </Button>
            </Box>
          </>
        );
      case SYSTEM_STEP.END:
        return (
          <Box sx={{ p: 4 }}>
            <Stack spacing={2} sx={{ display: "flex", alignItems: "center" }}>
              <Button
                size="large"
                variant="contained"
                href={csvLink().url}
                download={csvLink().filename}
              >
                ログをCSVでダウンロード
              </Button>
              <Button onClick={end} size="large" variant="contained">
                終了する
              </Button>
            </Stack>
          </Box>
        );
    }
  })();

  return content;
};

export default StepPanel;
