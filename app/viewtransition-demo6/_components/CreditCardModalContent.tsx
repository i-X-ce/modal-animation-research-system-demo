"use client";

import {
  Button,
  Checkbox,
  DialogContent,
  DialogTitle,
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
import { SubmitEventHandler, useTransition } from "react";
import ModalCloseButton from "./ModalCloseButton";

interface CreditCardContentModalProps {
  id: DisplayCreditCard["id"];
}

const CreditCardModalContent = ({ id }: CreditCardContentModalProps) => {
  const props = useCreditCardStore((s) =>
    s.creditCards.find((c) => c.id === id),
  );
  const toggleChecked = useCreditCardStore((s) => s.toggleFieldCheck);
  const submit = useCreditCardStore((s) => s.submitCreditCard);
  const closeModal = useModalStore((s) => s.closeModal);
  const [isPending, startTransition] = useTransition();

  if (!props) {
    return null;
  }

  const handleSubmit: SubmitEventHandler = (e) => {
    e.preventDefault();
    startTransition(async () => {
      await submit(id);
      closeModal();
    });
  };

  const { imageCreditCard, textCreditCard, submitted, checked } = props;

  return (
    <>
      <div className="h-full flex flex-col">
        <DialogTitle>内容チェック</DialogTitle>
        <DialogContent className="flex-1 flex">
          <div className="w-1/2 p-4">
            <CreditCardImage {...imageCreditCard} open />
          </div>

          <Stack component="form" sx={{ flex: 1 }} onSubmit={handleSubmit}>
            <Stack spacing={4} sx={{ flex: 1 }}>
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
                        onChange={() => {
                          toggleChecked(id, checkKey);
                        }}
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
            <div className="flex justify-center mt-4">
              <div className="basis-100">
                <Button
                  variant="contained"
                  fullWidth
                  disabled={submitted}
                  type="submit"
                  loading={isPending}
                >
                  {isPending ? "送信中..." : submitted ? "送信済み" : "送信"}
                </Button>
              </div>
            </div>
          </Stack>
        </DialogContent>
      </div>
      <ModalCloseButton />
    </>
  );
};

export default CreditCardModalContent;
