"use client";

import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
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
  ModalSettings,
  useModalStore,
} from "../_stores/modalStore";
import { Add, Remove } from "@mui/icons-material";
import { useSystemStore } from "../_stores/systemStore";
import {
  MAX_NUMBER_OF_CARDS,
  useCreditCardStore,
} from "../_stores/creditCardStore";
import ModalCloseButton from "./ModalCloseButton";

const EASINGS: ModalSettings["easing"][] = [
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
  decimalScale = 1,
  ...props
}: {
  value: number;
  step: number;
  unit?: string;
  onChange: (value: number) => void;
  label: string;
  decimalScale?: number;
} & Omit<SliderProps, "onChange">) => {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Stack direction={"row"} spacing={2} sx={{ alignItems: "center" }}>
        <Typography noWrap sx={{ flexShrink: 0, width: 100 }}>
          {value.toFixed(decimalScale)} {unit}
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
          marks
          {...props}
        />
        <IconButton onClick={() => onChange(Math.min(max, value + step))}>
          <Add />
        </IconButton>
      </Stack>
    </FormControl>
  );
};

// const SettingCheckbox = ({
//   label,
//   value,
//   onChange,
//   ...props
// }: { label: string; value: boolean; onChange: (value: boolean) => void } & Omit<
//   CheckboxProps,
//   "value" | "onChange"
// >) => {
//   return (
//     <FormControlLabel
//       label={label}
//       control={
//         <Checkbox checked={value} onChange={(_, v) => onChange(v)} {...props} />
//       }
//     />
//   );
// };

const SettingTitle = ({ children }: { children: string }) => {
  return (
    <Divider textAlign="left">
      <Typography>{children}</Typography>
    </Divider>
  );
};

const SettingModalContent = () => {
  const modalSettings = useModalStore((s) => s.settings);
  const { type, easing, duration, coverage } = modalSettings;
  const setModalSettings = useModalStore((s) => s.setSettings);
  const resetModalSettings = useModalStore((s) => s.resetSettings);

  const systemSettings = useSystemStore((s) => s.settings);
  const { columns, screenWidth } = systemSettings;
  const setSystemSettings = useSystemStore((s) => s.setSettings);
  const resetSystemSettings = useSystemStore((s) => s.resetSettings);

  const creditCardSettings = useCreditCardStore((s) => s.settings);
  const { numberOfCards } = creditCardSettings;
  const setCreditCardSettings = useCreditCardStore((s) => s.setSettings);
  const resetCreditCardSettings = useCreditCardStore((s) => s.resetSettings);

  const handleReset = () => {
    resetModalSettings();
    resetSystemSettings();
    resetCreditCardSettings();
  };

  return (
    <>
      <Box>
        <DialogTitle>設定</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <SettingTitle>モーダルの設定</SettingTitle>
            <SettingSelector
              label={"種類"}
              value={type}
              onChange={(value) => setModalSettings({ type: value })}
              options={ANIMATION_TYPES}
            />
            <SettingSelector
              label={"イージング"}
              value={easing}
              onChange={(value) => setModalSettings({ easing: value })}
              options={EASINGS}
            />
            <SettingSlider
              label="アニメーションの時間"
              min={0}
              max={2}
              value={duration}
              step={0.1}
              unit="s"
              onChange={(value) => setModalSettings({ duration: value })}
            />
            <SettingSlider
              label="画面占有率"
              min={0.1}
              max={1}
              value={coverage}
              step={0.1}
              onChange={(value) => setModalSettings({ coverage: value })}
            />

            <SettingTitle>システムの設定</SettingTitle>
            <SettingSlider
              label="カード枚数"
              min={0}
              max={MAX_NUMBER_OF_CARDS}
              value={numberOfCards}
              step={1}
              unit="枚"
              decimalScale={0}
              onChange={(value) =>
                setCreditCardSettings({ numberOfCards: value })
              }
            />
            <SettingSlider
              label="一行に表示するカード枚数"
              min={0}
              max={20}
              value={columns}
              step={1}
              unit="枚"
              decimalScale={0}
              onChange={(value) => setSystemSettings({ columns: value })}
            />
            <SettingSlider
              label="画面幅"
              min={0}
              max={1920}
              value={screenWidth}
              step={10}
              unit="px"
              decimalScale={0}
              onChange={(value) => setSystemSettings({ screenWidth: value })}
            />
          </Stack>
          <DialogActions>
            <Button onClick={handleReset} variant="outlined">
              設定を初期値に戻す
            </Button>
          </DialogActions>
        </DialogContent>
      </Box>
      <ModalCloseButton />
    </>
  );
};

export default SettingModalContent;
