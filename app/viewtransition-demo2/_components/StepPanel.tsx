"use client";

import { Box, Button, Stack, SxProps } from "@mui/material";
import { SYSTEM_STEP, useSystemStore } from "../_stores/systemStore";
import CartView from "./CartView";
import ProductView from "./ProductView";

const StepPanel = () => {
  const step = useSystemStore((state) => state.systemStep);
  const startOrdering = useSystemStore((state) => state.startOrdering);
  const containerSx: SxProps = {
    p: 4,
  };
  const jsonLink = useSystemStore((state) => state.jsonLink);
  const csvLink = useSystemStore((state) => state.csvLink);
  const end = useSystemStore((state) => state.end);

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
          <Button size="large" variant="contained" color="error" onClick={end}>
            終了
          </Button>
        </Stack>
      </Box>
    );
  }
};

export default StepPanel;
