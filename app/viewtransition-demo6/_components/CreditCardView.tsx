"use client";

import { useCreditCardStore } from "../_stores/creditCardStore";
import { useSystemStore } from "../_stores/systemStore";
import CreditCardCard from "./CreditCardCard";

const CreditCardView = () => {
  const numberOfCards = useCreditCardStore(
    (s) => s.settings.numberOfCards.value,
  );
  const columns = useSystemStore((s) => s.settings.columns.value);
  const creditCards = useCreditCardStore((s) => s.creditCards);

  return (
    <div
      className="grid"
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
    >
      {creditCards.slice(0, numberOfCards).map(({ id }) => (
        <CreditCardCard key={id} id={id} />
      ))}
    </div>
  );
};

export default CreditCardView;
