"use client";

import clsx from "clsx";
import { ArrowLeft } from "@mui/icons-material";
import { memo } from "react";
import {
  DisplayCreditCard,
  useCreditCardStore,
} from "../_stores/creditCardStore";

interface CreditCardImageProps {
  id: DisplayCreditCard["id"];
  open?: boolean;
  className?: string;
}

const MaskBar = memo(({ disable = false }: { disable?: boolean }) => {
  const isMask = useCreditCardStore((s) => s.settings.mask.value);

  if (disable) {
    return null;
  }

  if (!isMask) {
    return null;
  }

  return <div className="absolute inset-0 bg-black" />;
});

MaskBar.displayName = "MaskBar";

const CreditCardImage = memo(
  ({ id, open, className }: CreditCardImageProps) => {
    const isBlur = useCreditCardStore((s) => s.settings.blur.value);
    const props = useCreditCardStore((s) =>
      s.creditCards.find((c) => c.id === id),
    );

    if (!props) {
      return null;
    }

    const { cardNumber, cardHolder, expirationMonth, expirationYear } =
      props.imageCreditCard;

    return (
      <svg
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/1999/xhtml"
        className={clsx("w-full h-full block select-none", className)}
      >
        <foreignObject x={0} y={0} width={400} height={300}>
          <div className="w-full h-full relative">
            <div className="w-full h-full text-gray-200 bg-white flex items-center justify-center">
              <div className="relative bg-green-900 h-[80%] aspect-[1.586/1] p-6 rounded-lg overflow-clip shadow-md">
                <div className="absolute bg-green-950 w-[200%] h-[200%] left-[40%] rotate-20" />

                <div className="absolute top-0 left-0 p-2">
                  <ArrowLeft />
                </div>

                <div className="relative px-4 pt-10 flex gap-6 items-center">
                  <div className="w-15 h-13 flex justify-between gap-px rounded-lg overflow-clip">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <div key={index} className="bg-amber-200 flex-1" />
                    ))}
                  </div>
                  <p className="text-xl">ABC CARD</p>
                </div>

                <div className="relative text-3xl">
                  <MaskBar disable={open} />
                  {cardNumber}
                </div>

                <div className="relative flex gap-1 items-center justify-center mt-2">
                  <p>有効期限 {">"}</p>
                  <div className="flex flex-col items-center">
                    <p className="text-[10px] leading-0">MONTH / YEAR</p>
                    <div className="text-lg relative">
                      <MaskBar disable={open} />
                      {expirationMonth} / {expirationYear.slice(-2)}
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-2 inset-x-2 flex justify-between items-baseline px-2">
                  <div className="relative text-xl">
                    <MaskBar disable={open} />
                    {cardHolder}
                  </div>
                  <p className="text-3xl font-bold">ABC</p>
                </div>
              </div>
            </div>

            {isBlur && !open && (
              <div className="absolute inset-0 backdrop-blur-sm" />
            )}
          </div>
        </foreignObject>
      </svg>
    );
  },
);

CreditCardImage.displayName = "CreditCardImage";

export default CreditCardImage;
