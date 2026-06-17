"use client";
import React from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import { useModalStore } from "../_stores/modalStore";

export default function ControlsPanel() {
  const { animation, setAnimation } = useModalStore();

  return (
    <Box sx={{ mb: 2 }}>
      <Stack direction="row" spacing={2} alignItems="center">
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>アニメーション</InputLabel>
          <Select
            value={animation.type}
            label="アニメーション"
            onChange={(e) => setAnimation({ type: e.target.value as any })}
          >
            <MenuItem value="view">View Transitions</MenuItem>
            <MenuItem value="classic">Classic (Fade/Slide)</MenuItem>
            <MenuItem value="none">None</MenuItem>
          </Select>
        </FormControl>

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
