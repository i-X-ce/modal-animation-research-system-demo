"use client";

import { useEffect } from "react";
import { useSystemStore } from "../_stores/systemStore";

const MouseTracker = () => {
  const mouseMove = useSystemStore((s) => s.mouseMove);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouseMove(event.clientX, event.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseMove]);

  return null;
};

export default MouseTracker;
