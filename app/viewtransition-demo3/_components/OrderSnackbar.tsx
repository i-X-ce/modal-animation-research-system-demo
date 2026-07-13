"use client";

import { useCartStore } from "../_stores/cartStore";

const OrderSnackbar = () => {
  const message = useCartStore((s) => s.message);
  const open = useCartStore((s) => s.messageOpen);

  if (!open || !message) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed left-1/2 top-6 z-60 -translate-x-1/2">
      <div className="rounded-full border border-white/10 bg-[#171717]/90 px-4 py-2 text-sm text-white shadow-lg backdrop-blur-md">
        {message}
      </div>
    </div>
  );
};

export default OrderSnackbar;
