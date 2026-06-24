"use client";

import {
  Box,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  SliderProps,
  Stack,
  Typography,
} from "@mui/material";
import {
  ANIMATION_TYPES,
  ModalAnimation,
  useModalStore,
} from "../_stores/modalStore";
import { ReactNode } from "react";
import { Add, Remove } from "@mui/icons-material";

const EASINGS: ModalAnimation["easing"][] = [
  "linear",
  "easeIn",
  "easeOut",
  "easeInOut",
  "circIn",
  "circOut",
  "circInOut",
  "backIn",
  "backOut",
  "backInOut",
  "anticipate",
] as const;

const SettingItem = ({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) => {
  return (
    <Stack spacing={1}>
      <Typography variant="subtitle1" gutterBottom>
        {label}
      </Typography>
      {children}
    </Stack>
  );
};

const SettingSelector = <T extends number | string>({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: T) => void;
  options: T[] | ReadonlyArray<T>;
}) => {
  return (
    <FormControl size="small">
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        label={label}
        onChange={(e) => onChange(e.target.value as T)}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const SettingSlider = ({
  value = 0,
  min = 0,
  max = 0,
  step = 0.1,
  unit = "",
  onChange,
  ...props
}: {
  value: number;
  step: number;
  unit?: string;
  onChange: (value: number) => void;
} & Omit<SliderProps, "onChange">) => {
  return (
    <Stack direction={"row"} spacing={2} sx={{ alignItems: "center" }}>
      <Typography noWrap sx={{ flexShrink: 0 }}>
        {value.toFixed(1)} {unit}
      </Typography>
      <IconButton onClick={() => onChange(Math.max(min, value - step))}>
        <Remove />
      </IconButton>
      <Slider
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(_, value) => onChange(value as number)}
        {...props}
      />
      <IconButton onClick={() => onChange(Math.min(max, value + step))}>
        <Add />
      </IconButton>
    </Stack>
  );
};

const SettingModalContent = () => {
  const animation = useModalStore((s) => s.animation);
  const { type, easing, duration, coverage, cardSize } = animation;
  const setAnimation = useModalStore((s) => s.setAnimation);

  return (
    <Box>
      <DialogTitle>モーダル設定</DialogTitle>
      <DialogContent>
        <Stack spacing={3}>
          <SettingItem label="アニメーションの種類">
            <SettingSelector
              label={"種類"}
              value={type}
              onChange={(value) => setAnimation({ type: value })}
              options={ANIMATION_TYPES}
            />
          </SettingItem>
          <SettingItem label="イージング">
            <SettingSelector
              label={"ease"}
              value={easing}
              onChange={(value) => setAnimation({ easing: value })}
              options={EASINGS}
            />
          </SettingItem>
          <SettingItem label="アニメーションの時間">
            <SettingSlider
              min={0}
              max={2}
              value={duration}
              step={0.1}
              unit="s"
              onChange={(value) => setAnimation({ duration: value })}
            />
          </SettingItem>
          <SettingItem label="画面占有率">
            <SettingSlider
              min={0.1}
              max={1}
              value={coverage}
              step={0.1}
              unit="s"
              onChange={(value) => setAnimation({ coverage: value })}
            />
          </SettingItem>
          <SettingItem label="最小カードサイズ">
            <SettingSlider
              min={50}
              max={500}
              value={cardSize}
              step={10}
              unit="px"
              onChange={(value) => setAnimation({ cardSize: value })}
            />
          </SettingItem>
        </Stack>
      </DialogContent>
    </Box>
  );
};

export default SettingModalContent;
