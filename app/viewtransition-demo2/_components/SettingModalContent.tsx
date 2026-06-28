"use client";

import {
  Box,
  Checkbox,
  CheckboxProps,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
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

const SettingSelector = <T extends number | string | boolean>({
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
          <MenuItem key={index} value={String(option)}>
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
  label,
  ...props
}: {
  value: number;
  step: number;
  unit?: string;
  onChange: (value: number) => void;
  label: string;
} & Omit<SliderProps, "onChange">) => {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
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
    </FormControl>
  );
};

const SettingCheckbox = ({
  label,
  value,
  onChange,
  ...props
}: { label: string; value: boolean; onChange: (value: boolean) => void } & Omit<
  CheckboxProps,
  "value" | "onChange"
>) => {
  return (
    <FormControlLabel
      label={label}
      control={
        <Checkbox checked={value} onChange={(_, v) => onChange(v)} {...props} />
      }
    />
  );
};

const SettingModalContent = () => {
  const animation = useModalStore((s) => s.animation);
  const { type, easing, duration, coverage, cardSize, displayNextOrder } =
    animation;
  const setAnimation = useModalStore((s) => s.setAnimation);

  return (
    <Box>
      <DialogTitle>モーダル設定</DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 2 }}>
          <SettingSelector
            label={"種類"}
            value={type}
            onChange={(value) => setAnimation({ type: value })}
            options={ANIMATION_TYPES}
          />
          <SettingSelector
            label={"イージング"}
            value={easing}
            onChange={(value) => setAnimation({ easing: value })}
            options={EASINGS}
          />
          <SettingCheckbox
            label="次の注文を表示する"
            value={displayNextOrder}
            onChange={(value) => setAnimation({ displayNextOrder: value })}
          />
          <SettingSlider
            label="アニメーションの時間"
            min={0}
            max={2}
            value={duration}
            step={0.1}
            unit="s"
            onChange={(value) => setAnimation({ duration: value })}
          />
          <SettingSlider
            label="画面占有率"
            min={0.1}
            max={1}
            value={coverage}
            step={0.1}
            onChange={(value) => setAnimation({ coverage: value })}
          />
          <SettingSlider
            label="最小カードサイズ"
            min={50}
            max={500}
            value={cardSize}
            step={10}
            unit="px"
            onChange={(value) => setAnimation({ cardSize: value })}
          />
        </Stack>
      </DialogContent>
    </Box>
  );
};

export default SettingModalContent;
