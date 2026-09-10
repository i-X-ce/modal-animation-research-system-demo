"use client";

import { Box, Button, Stack } from "@mui/material";
import { SYSTEM_STEP, useSystemStore } from "../_stores/systemStore";
import CreditCardPageContainer from "./CreditCardPageContainer";
import CreditCardView from "./CreditCardView";
import CreditCardAppBar from "./CreditCardAppBar";

const StepPanel = () => {
  const step = useSystemStore((s) => s.systemStep);
  const start = useSystemStore((s) => s.start);
  const complete = useSystemStore((s) => s.complete);
  const end = useSystemStore((s) => s.end);
  const csvLink = useSystemStore((s) => s.csvLink);

  const content = (() => {
    switch (step) {
      case SYSTEM_STEP.START:
        return (
          <Box sx={{ p: 4 }}>
            <Button onClick={start} variant="contained">
              スタート
            </Button>
          </Box>
        );
      case SYSTEM_STEP.CHECKING:
        return (
          <>
            <CreditCardView />
            <Box sx={{ p: 2, display: "flex", justifyContent: "end" }}>
              <Button onClick={complete} variant="contained">
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

  return (
    <CreditCardPageContainer>
      <CreditCardAppBar />
      {content}
    </CreditCardPageContainer>
  );
};

export default StepPanel;
