"use client";

import { motion } from "motion/react";
import CreditCardImage from "./CreditCardImage";
import { useModalStore, useModalTransition } from "../_stores/modalStore";
import clsx from "clsx";
import CreditCardContentModal from "./CreditCardContentModal";
import {
  DisplayCreditCard,
  useCreditCardStore,
} from "../_stores/creditCardStore";
import { memo } from "react";

interface CreditCardCardProps {
  id: DisplayCreditCard["id"];
}

const CreditCardCard = memo(({ id }: CreditCardCardProps) => {
  const props = useCreditCardStore((s) =>
    s.creditCards.find((c) => c.id === id),
  );

  const layoutId = `credit-card-${id}`;
  const transition = useModalTransition();
  const openModal = useModalStore((s) => s.openModal);
  const animationModal = useModalStore(
    (s) => s.isAnimation && s.name === layoutId,
  );

  if (!props) {
    return null;
  }

  const handleClick = () => {
    openModal(<CreditCardContentModal id={id} />, layoutId);
  };

  const imageContent = <CreditCardImage {...props.imageCreditCard} />;

  return (
    <button onClick={handleClick} className="relative">
      <div className="absolute inset-0">{imageContent}</div>
      <motion.div
        transition={transition}
        layoutId={layoutId}
        className={clsx("relative", animationModal ? "z-500" : "")}
      >
        <div>{imageContent}</div>
      </motion.div>
    </button>
  );
});

CreditCardCard.displayName = "CreditCardCard";

export default CreditCardCard;
