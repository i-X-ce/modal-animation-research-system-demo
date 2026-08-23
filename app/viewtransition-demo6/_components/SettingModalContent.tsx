"use client";

import {
  Box,
  Button,
  Checkbox,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
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
import { MODAL_CONFIG, useModalStore } from "../_stores/modalStore";
import { Add, Remove } from "@mui/icons-material";
import { SYSTEM_CONFIG, useSystemStore } from "../_stores/systemStore";
import {
  CREDIT_CARD_CONFIG,
  useCreditCardStore,
} from "../_stores/creditCardStore";
import ModalCloseButton from "./ModalCloseButton";
import { Configuration, CONFIGURATION_TYPES } from "../_types/setting";

const SettingSelector = <
  C extends Extract<
    Configuration,
    { type: typeof CONFIGURATION_TYPES.SELECTOR }
  >,
>({
  label,
  value,
  onChange,
  options,
}: {
  onChange: (value: C["value"]) => void;
} & C) => {
  return (
    <FormControl size="small">
      <InputLabel>{label}</InputLabel>
      <Select
        value={value}
        label={label}
        onChange={(e) => onChange(e.target.value)}
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

const SettingSlider = <
  C extends Extract<Configuration, { type: typeof CONFIGURATION_TYPES.NUMBER }>,
>({
  label,
  min,
  max,
  step,
  value,
  unit,
  decimalScale = 0,
  onChange,
  ...props
}: {
  onChange: (value: C["value"]) => void;
} & C &
  Omit<SliderProps, "onChange">) => {
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
          onChange={(_, value) => onChange(value as number)}
          marks
          value={value}
          min={min}
          max={max}
          step={step}
          {...props}
        />
        <IconButton onClick={() => onChange(Math.min(max, value + step))}>
          <Add />
        </IconButton>
      </Stack>
    </FormControl>
  );
};

const SettingCheckbox = <
  C extends Extract<
    Configuration,
    { type: typeof CONFIGURATION_TYPES.BOOLEAN }
  >,
>({
  label,
  value,
  onChange,
}: {
  onChange: (value: C["value"]) => void;
} & C) => {
  return (
    <FormControlLabel
      label={label}
      onChange={(_, v) => onChange(v)}
      checked={value}
      control={<Checkbox />}
    />
  );
};

const SwitchConfigUI = ({
  config,
  onChange,
}: {
  config: Configuration;
  onChange: (value: Configuration["value"]) => void;
}) => {
  switch (config.type) {
    case CONFIGURATION_TYPES.NUMBER:
      return <SettingSlider {...config} onChange={onChange} />;
    case CONFIGURATION_TYPES.SELECTOR:
      return <SettingSelector {...config} onChange={onChange} />;
    case CONFIGURATION_TYPES.BOOLEAN:
      return <SettingCheckbox {...config} onChange={onChange} />;
    default:
      return null;
  }
};

const SettingTitle = ({ children }: { children: string }) => {
  return (
    <Divider textAlign="left">
      <Typography>{children}</Typography>
    </Divider>
  );
};

const SettingModalContent = () => {
  const modalSettings = useModalStore((s) => s.settings);
  const setModalSettings = useModalStore((s) => s.setSettings);
  const resetModalSettings = useModalStore((s) => s.resetSettings);

  const systemSettings = useSystemStore((s) => s.settings);
  const setSystemSettings = useSystemStore((s) => s.setSettings);
  const resetSystemSettings = useSystemStore((s) => s.resetSettings);

  const creditCardSettings = useCreditCardStore((s) => s.settings);
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
            {Object.entries(MODAL_CONFIG).map(([_key, _config]) => {
              const key = _key as keyof typeof MODAL_CONFIG;
              const config = {
                ..._config,
                value: modalSettings[key].value,
              } as Configuration;
              return (
                <SwitchConfigUI
                  key={key}
                  config={config}
                  onChange={(value) => setModalSettings(key, value)}
                />
              );
            })}

            <SettingTitle>システムの設定</SettingTitle>
            {Object.entries(CREDIT_CARD_CONFIG).map(([_key, _config]) => {
              const key = _key as keyof typeof CREDIT_CARD_CONFIG;
              const config = {
                ..._config,
                value: creditCardSettings[key].value,
              } as Configuration;
              return (
                <SwitchConfigUI
                  key={key}
                  config={config}
                  onChange={(value) => setCreditCardSettings(key, value)}
                />
              );
            })}
            {Object.entries(systemSettings).map(([_key, _config]) => {
              const key = _key as keyof typeof SYSTEM_CONFIG;
              const config = {
                ..._config,
                value: systemSettings[key].value,
              } as Configuration;
              return (
                <SwitchConfigUI
                  key={key}
                  config={config}
                  onChange={(value) => setSystemSettings(key, value)}
                />
              );
            })}
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
