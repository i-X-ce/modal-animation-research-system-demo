"use client";

import {
  Button,
  Checkbox,
  DialogContent,
  FormControlLabel,
  Stack,
  Typography,
} from "@mui/material";
import {
  DisplayCreditCard,
  useCreditCardStore,
} from "../_stores/creditCardStore";
import CreditCardImage from "./CreditCardImage";
import { CREDIT_CARD_KEYS_LABELS } from "../_types/creditCard";

interface CreditCardContentModalProps {
  id: DisplayCreditCard["id"];
}

const CreditCardContentModal = ({ id }: CreditCardContentModalProps) => {
  const props = useCreditCardStore((s) =>
    s.creditCards.find((c) => c.id === id),
  );
  const toggleChecked = useCreditCardStore((s) => s.toggleFieldCheck);
  const submit = useCreditCardStore((s) => s.submitCreditCard);

  if (!props) {
    return null;
  }

  const { imageCreditCard, textCreditCard, submitted, checked } = props;

  return (
    <div className="flex h-full">
      <div className="w-1/2 p-4">
        <CreditCardImage {...imageCreditCard} />
      </div>

      <DialogContent className="flex-1 flex flex-col">
        <Stack spacing={4} className="flex-1">
          {Object.entries(textCreditCard).map(([key, value]) => {
            if (key === "id") return null;
            const checkKey = key as keyof typeof checked;

            return (
              <Stack key={key} spacing={1}>
                <Typography variant="h6">
                  {CREDIT_CARD_KEYS_LABELS[checkKey]}
                </Typography>
                <Stack direction={"row"} sx={{ alignItems: "center" }}>
                  <FormControlLabel
                    onChange={() => toggleChecked(id, checkKey)}
                    checked={checked?.[checkKey]}
                    control={<Checkbox />}
                    label={value}
                  />
                </Stack>
              </Stack>
            );
          })}
        </Stack>
        <div className="flex justify-center">
          <div className="basis-100">
            <Button
              variant="contained"
              fullWidth
              onClick={() => submit(id)}
              disabled={submitted}
            >
              送信
            </Button>
          </div>
        </div>
      </DialogContent>
    </div>
  );
};

export default CreditCardContentModal;
