"use client";

import {
  Box,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import {
  ANIMATION_TYPES,
  ModalAnimation,
  useModalStore,
} from "../_stores/modalStore";

const EASINGS: ModalAnimation["easing"][] = [
  "easeInOut",
  "easeOut",
  "easeIn",
  "linear",
] as const;

const SettingSlider = ({
  label,
  value,
  min,
  max,
  step,
  onChange,
  unit = "",
  decimalScale = 2,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  decimalScale?: number;
  onChange: (value: number) => void;
}) => {
  return (
    <Stack spacing={1}>
      <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.82)" }}>
        {label}
      </Typography>
      <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
        <Typography sx={{ minWidth: 80, color: "rgba(255,255,255,0.62)" }}>
          {value.toFixed(decimalScale)} {unit}
        </Typography>
        <Slider
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(_, nextValue) => onChange(nextValue as number)}
          size="small"
        />
      </Stack>
    </Stack>
  );
};

const SettingModalContent = () => {
  const animation = useModalStore((s) => s.animation);
  const { type, easing, duration, coverage } = animation;
  const setAnimation = useModalStore((s) => s.setAnimation);

  return (
    <Box>
      <DialogTitle>モーダル設定</DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1.5 }}>
          <FormControl size="small" fullWidth>
            <InputLabel>開閉演出</InputLabel>
            <Select
              value={type}
              label="開閉演出"
              onChange={(e) =>
                setAnimation({ type: e.target.value as ModalAnimation["type"] })
              }
            >
              {ANIMATION_TYPES.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" fullWidth>
            <InputLabel>イージング</InputLabel>
            <Select
              value={easing}
              label="イージング"
              onChange={(e) =>
                setAnimation({
                  easing: e.target.value as ModalAnimation["easing"],
                })
              }
            >
              {EASINGS.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <SettingSlider
            label="アニメーション時間"
            min={0}
            max={1.5}
            step={0.05}
            value={duration}
            onChange={(value) => setAnimation({ duration: value })}
            unit="s"
          />

          <SettingSlider
            label="モーダル占有率"
            min={0.7}
            max={1}
            step={0.01}
            value={coverage}
            onChange={(value) => setAnimation({ coverage: value })}
          />
        </Stack>
      </DialogContent>
    </Box>
  );
};

export default SettingModalContent;
