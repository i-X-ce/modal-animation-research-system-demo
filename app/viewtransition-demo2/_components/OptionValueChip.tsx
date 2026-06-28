import { Chip, ChipProps } from "@mui/material";
import { ProductOptionValue } from "../_types/product";
import {
  getProductOptionLabel,
  productOptions,
} from "../_consts/productOptions";

interface OptionValueChipProps extends ChipProps {
  optionValue: ProductOptionValue;
}

const OptionValueChip = ({
  optionValue: { id: optionId, value },
  ...props
}: OptionValueChipProps) => {
  const option = productOptions.find((opt) => opt.id === optionId);
  if (!option) return null;
  const optionLabel = getProductOptionLabel(option.id, value);
  if (!optionLabel) return null;

  return <Chip {...props} label={`${option.name} ${optionLabel}`} />;
};

export default OptionValueChip;
