"use client";

import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Stack,
  Typography,
  Button,
  Paper,
} from "@mui/material";
import { AnimationType, useModalStore } from "../_stores/modalStore";

type DocumentWithViewTransition = Document & {
  startViewTransition?: (updateCallback: () => void) => void;
};

export default function ControlsPanel() {
  const { animation, setAnimation } = useModalStore();

  const open = useModalStore((s) => s.open);
  const openModal = useModalStore((s) => s.openModal);

  const handleOpen = () => {
    const update = () => {
      openModal(
        <Box sx={{ p: 3, minWidth: 320 }}>
          <Typography variant="h6" gutterBottom>
            モーダル
          </Typography>
          <Typography>テスト</Typography>
        </Box>,
        "test",
      );
    };

    const startViewTransition = (
      document as DocumentWithViewTransition
    ).startViewTransition;

    if (animation.type === "view" && startViewTransition) {
      startViewTransition(update);
      return;
    }

    update();
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Stack direction="row" spacing={2}>
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>アニメーション</InputLabel>
          <Select
            value={animation.type}
            label="アニメーション"
            onChange={(e) =>
              setAnimation({ type: e.target.value as AnimationType })
            }
          >
            <MenuItem value="view">View Transitions</MenuItem>
            <MenuItem value="classic">Classic (Fade/Slide)</MenuItem>
            <MenuItem value="none">None</MenuItem>
          </Select>
        </FormControl>

        {!open && (
          <Paper
            sx={{ p: 2, minWidth: 160 }}
            style={{ viewTransitionName: "test" }}
          >
            <Typography>テスト</Typography>
          </Paper>
        )}

        <Button onClick={handleOpen}>モーダルテスト</Button>

        <Box sx={{ width: 200 }}>
          <Typography variant="caption">
            Duration: {animation.duration}ms
          </Typography>
          <Slider
            value={animation.duration}
            min={100}
            max={2000}
            onChange={(_, v) => setAnimation({ duration: v as number })}
          />
        </Box>

        <Box sx={{ width: 200 }}>
          <Typography variant="caption">
            Coverage: {Math.round(animation.coverage * 100)}%
          </Typography>
          <Slider
            value={animation.coverage}
            min={0.2}
            max={1}
            step={0.05}
            onChange={(_, v) => setAnimation({ coverage: v as number })}
          />
        </Box>
      </Stack>
    </Box>
  );
}
