import clsx from "clsx";
import { CreditCard } from "../_types/creditCard";
import { ArrowLeft } from "@mui/icons-material";

interface CreditCardImageProps extends CreditCard {
  className?: string;
}

const CreditCardImage = ({
  cardNumber,
  cardHolder,
  expirationMonth,
  expirationYear,
  className,
}: CreditCardImageProps) => {
  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/1999/xhtml"
      className={clsx("w-full h-full block select-none", className)}
    >
      <foreignObject x={0} y={0} width={400} height={300}>
        <div className="w-full h-full">
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

              <div className="relative text-3xl">{cardNumber}</div>

              <div className="relative flex gap-1 items-center justify-center mt-2">
                <p>有効期限 {">"}</p>
                <div>
                  <p className="text-xs leading-0">MONTH / YEAR</p>
                  <p className="text-lg">
                    {expirationMonth} / {expirationYear.slice(-2)}
                  </p>
                </div>
              </div>

              <div className="absolute bottom-2 inset-x-2 flex justify-between items-baseline px-2">
                <p className="text-xl">{cardHolder}</p>
                <p className="text-3xl font-bold">ABC</p>
              </div>
            </div>
          </div>
        </div>
      </foreignObject>
    </svg>
  );
};

export default CreditCardImage;
