"use client";

import { ReactNode } from "react";
import { useSystemStore } from "../_stores/systemStore";

interface CreditCardPageContentProps {
  children: ReactNode;
}

const CreditCardPageContainer = ({ children }: CreditCardPageContentProps) => {
  const screenWidth = useSystemStore((s) => s.settings.screenWidth.value);

  return (
    <div className="flex justify-center">
      <div style={{ width: screenWidth }}>{children}</div>
    </div>
  );
};

export default CreditCardPageContainer;
