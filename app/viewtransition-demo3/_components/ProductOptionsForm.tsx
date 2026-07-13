"use client";

import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
} from "@mui/material";
import {
  PRODUCT_OPTIONS_TYPES,
  ProductOption,
  ProductOptionValue,
} from "../_types/product";
import { productOptions } from "../_consts/productOptions";
import { useModalStore } from "../_stores/modalStore";

type OptionCommon<T> = {
  optionValue: Extract<ProductOptionValue, { type: T }>;
  onChange: (option: ProductOptionValue) => void;
};

const ProductOptionCheckbox = ({
  id,
  name,
  trueLabel,
  falseLabel,
  optionValue,
  onChange,
}: Extract<
  ProductOption,
  { type: (typeof PRODUCT_OPTIONS_TYPES)["CHECKBOX"] }
> &
  OptionCommon<"checkbox">) => {
  const { value } = optionValue;

  const handleChange = (newValue: boolean) => {
    onChange({
      type: PRODUCT_OPTIONS_TYPES.CHECKBOX,
      id,
      value: newValue,
    });
  };

  return (
    <FormControl>
      <FormLabel>{name}</FormLabel>
      <FormControlLabel
        control={
          <Checkbox checked={value} onChange={(_, v) => handleChange(v)} />
        }
        label={value ? trueLabel : falseLabel}
      />
    </FormControl>
  );
};

const ProductOptionRadioGroup = ({
  id,
  name,
  options,
  optionValue,
  onChange,
}: Extract<ProductOption, { type: (typeof PRODUCT_OPTIONS_TYPES)["RADIO"] }> &
  OptionCommon<"radio">) => {
  const { value } = optionValue;
  const handleChange = (newValue: string) => {
    onChange({
      type: PRODUCT_OPTIONS_TYPES.RADIO,
      id,
      value: newValue,
    });
  };

  return (
    <FormControl>
      <FormLabel>{name}</FormLabel>
      <FormGroup>
        <RadioGroup
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          row
        >
          {options.map(({ id: optionId, label }) => (
            <FormControlLabel
              key={optionId}
              value={optionId}
              control={<Radio />}
              label={label}
            />
          ))}
        </RadioGroup>
      </FormGroup>
    </FormControl>
  );
};

const ProductOptionSelect = ({
  id,
  name,
  options,
  optionValue,
  onChange,
}: Extract<ProductOption, { type: (typeof PRODUCT_OPTIONS_TYPES)["SELECT"] }> &
  OptionCommon<"select">) => {
  const { value } = optionValue;
  const handleChange = (newValue: string) => {
    onChange({
      type: PRODUCT_OPTIONS_TYPES.SELECT,
      id,
      value: newValue,
    });
  };

  return (
    <FormControl>
      <InputLabel>{name}</InputLabel>
      <Select
        value={value}
        label={name}
        onChange={(e) => handleChange(e.target.value)}
      >
        {options.map(({ id: optionId, label }) => (
          <MenuItem key={optionId} value={optionId}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

type ProductOptionsFormProps = {
  optionValues: ProductOptionValue[];
  onChange: (options: ProductOptionValue[]) => void;
};

const ProductOptionsForm = ({
  optionValues,
  onChange,
}: ProductOptionsFormProps) => {
  const handleOptionChange = (updatedOption: ProductOptionValue) => {
    const updatedOptions = optionValues.map((option) =>
      option.id === updatedOption.id ? updatedOption : option,
    );
    onChange(updatedOptions);
  };
  const numberOfOptions = useModalStore((s) => s.animation.numberOfOptions);

  return (
    <FormGroup>
      <Stack spacing={2}>
        {productOptions.slice(0, numberOfOptions).map((option) => {
          const optionValue = optionValues.find((o) => o.id === option.id);
          if (!optionValue) return null;

          if (
            option.type === PRODUCT_OPTIONS_TYPES.CHECKBOX &&
            optionValue.type === PRODUCT_OPTIONS_TYPES.CHECKBOX
          ) {
            return (
              <ProductOptionCheckbox
                {...option}
                key={option.id}
                optionValue={optionValue}
                onChange={handleOptionChange}
              />
            );
          } else if (
            option.type === PRODUCT_OPTIONS_TYPES.RADIO &&
            optionValue.type === PRODUCT_OPTIONS_TYPES.RADIO
          ) {
            return (
              <ProductOptionRadioGroup
                {...option}
                key={option.id}
                optionValue={optionValue}
                onChange={handleOptionChange}
              />
            );
          } else if (
            option.type === PRODUCT_OPTIONS_TYPES.SELECT &&
            optionValue.type === PRODUCT_OPTIONS_TYPES.SELECT
          ) {
            return (
              <ProductOptionSelect
                {...option}
                key={option.id}
                optionValue={optionValue}
                onChange={handleOptionChange}
              />
            );
          }
          return null;
        })}
      </Stack>
    </FormGroup>
  );
};

export default ProductOptionsForm;
