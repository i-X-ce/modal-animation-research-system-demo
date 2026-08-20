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
import { useModalStore } from "../_stores/modalStore";

interface CreditCardContentModalProps {
  id: DisplayCreditCard["id"];
}

const CreditCardContentModal = ({ id }: CreditCardContentModalProps) => {
  const props = useCreditCardStore((s) =>
    s.creditCards.find((c) => c.id === id),
  );
  const toggleChecked = useCreditCardStore((s) => s.toggleFieldCheck);
  const submit = useCreditCardStore((s) => s.submitCreditCard);
  const closeModal = useModalStore((s) => s.closeModal);

  if (!props) {
    return null;
  }

  const handleSubmit = () => {
    submit(id);
    closeModal();
  };

  const { imageCreditCard, textCreditCard, submitted, checked } = props;

  return (
    <DialogContent className="h-full flex-1 flex">
      <div className="w-1/2 p-4">
        <CreditCardImage {...imageCreditCard} />
      </div>

      <Stack sx={{ flex: 1 }}>
        <Stack spacing={4} sx={{ flex: 1, py: 4 }}>
          <Typography gutterBottom color="textSecondary">
            誤りのある箇所をチェックして、送信ボタンを押してください。
          </Typography>
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
                    disabled={submitted}
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
              onClick={handleSubmit}
              disabled={submitted}
            >
              送信
            </Button>
          </div>
        </div>
      </Stack>
    </DialogContent>
  );
};

export default CreditCardContentModal;
