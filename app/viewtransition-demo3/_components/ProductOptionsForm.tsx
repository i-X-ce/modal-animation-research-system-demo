"use client";

import { Box, Button, Stack, Typography } from "@mui/material";
import { PRODUCT_OPTIONS_TYPES, ProductOptionValue } from "../_types/product";
import { productOptions } from "../_consts/productOptions";

type ProductOptionsFormProps = {
  optionValues: ProductOptionValue[];
  onChange: (options: ProductOptionValue[]) => void;
};

const optionButtonSx = {
  flex: 1,
  minHeight: 44,
  borderRadius: 999,
  borderWidth: 1,
  textTransform: "none",
  fontSize: 14,
  letterSpacing: 0,
  boxShadow: "none",
  transition: "none",
  px: 2,
  whiteSpace: "nowrap",
  "&:hover": {
    boxShadow: "none",
  },
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

  return (
    <Stack spacing={3}>
      {productOptions.map((option) => {
        const optionValue = optionValues.find(
          (value) => value.id === option.id,
        );
        if (!optionValue) return null;

        if (
          option.type === PRODUCT_OPTIONS_TYPES.RADIO &&
          optionValue.type === PRODUCT_OPTIONS_TYPES.RADIO
        ) {
          const radioOptionValue = optionValue as Extract<
            ProductOptionValue,
            { type: typeof PRODUCT_OPTIONS_TYPES.RADIO }
          >;
          return (
            <Stack key={option.id} spacing={1.5}>
              <Typography
                variant="body2"
                sx={{ color: "#e8e8e8", fontWeight: 600 }}
              >
                {option.name}
              </Typography>
              <Stack direction="row" spacing={1.5} sx={{ flexWrap: "wrap" }}>
                {option.options.map((choice) => {
                  const selected = radioOptionValue.value === choice.id;
                  return (
                    <Button
                      key={choice.id}
                      disableRipple
                      onClick={() =>
                        handleOptionChange({
                          type: PRODUCT_OPTIONS_TYPES.RADIO,
                          id: option.id,
                          value: choice.id,
                        })
                      }
                      variant="outlined"
                      sx={{
                        ...optionButtonSx,
                        borderColor: selected
                          ? "#8797ff"
                          : "rgba(255,255,255,0.16)",
                        color: selected ? "#a8b6ff" : "rgba(255,255,255,0.5)",
                        backgroundColor: selected
                          ? "rgba(135,151,255,0.06)"
                          : "transparent",
                        minWidth: choice.label.length > 6 ? 132 : 110,
                        flex:
                          option.options.length > 2 ? "1 1 150px" : "1 1 210px",
                      }}
                    >
                      {choice.label}
                    </Button>
                  );
                })}
              </Stack>
            </Stack>
          );
        }

        if (
          option.type === PRODUCT_OPTIONS_TYPES.CHECKBOX &&
          optionValue.type === PRODUCT_OPTIONS_TYPES.CHECKBOX
        ) {
          const checkboxOptionValue = optionValue as Extract<
            ProductOptionValue,
            { type: typeof PRODUCT_OPTIONS_TYPES.CHECKBOX }
          >;
          return (
            <Box key={option.id}>
              <Typography
                variant="body2"
                sx={{ color: "#e8e8e8", fontWeight: 600 }}
              >
                {option.name}
              </Typography>
              <Button
                disableRipple
                onClick={() =>
                  handleOptionChange({
                    type: PRODUCT_OPTIONS_TYPES.CHECKBOX,
                    id: option.id,
                    value: !checkboxOptionValue.value,
                  })
                }
                variant="outlined"
                sx={{
                  ...optionButtonSx,
                  mt: 1.5,
                  flex: "0 0 auto",
                  minWidth: 160,
                  borderColor: checkboxOptionValue.value
                    ? "#8797ff"
                    : "rgba(255,255,255,0.16)",
                  color: checkboxOptionValue.value
                    ? "#a8b6ff"
                    : "rgba(255,255,255,0.5)",
                }}
              >
                {checkboxOptionValue.value
                  ? option.trueLabel
                  : option.falseLabel}
              </Button>
            </Box>
          );
        }

        return null;
      })}
    </Stack>
  );
};

export default ProductOptionsForm;
