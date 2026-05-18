"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CursorGlow() {
  const ringX = useMotionValue(-100);
  const ringY = useMotionValue(-100);
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  // Ring trails behind with spring
  const rsx = useSpring(ringX, { stiffness: 220, damping: 22, mass: 0.45 });
  const rsy = useSpring(ringY, { stiffness: 220, damping: 22, mass: 0.45 });

  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [overMap, setOverMap] = useState(false);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const hasHover = window.matchMedia("(hover: hover)").matches;
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isFinePointer || !hasHover || !isDesktop || reduce) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      ringX.set(e.clientX);
      ringY.set(e.clientY);
      dotX.set(e.clientX);
      dotY.set(e.clientY);
    };
    const enter = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      // Hide custom cursor entirely when over interactive maps (Leaflet shows its own)
      setOverMap(!!t.closest(".leaflet-container, [data-cursor='native']"));
      if (
        t.closest(
          'a, button, input, textarea, select, label, [role="button"], [data-cursor="hover"]'
        )
      ) {
        setHovering(true);
      } else {
        setHovering(false);
      }
    };
    const down = () => setPressed(true);
    const up = () => setPressed(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", enter);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);

    document.documentElement.classList.add("cursor-hidden");

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", enter);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      document.documentElement.classList.remove("cursor-hidden");
    };
  }, [ringX, ringY, dotX, dotY]);

  if (!enabled) return null;

  return (
    <>
      {/* Outer ring — shrinks to a small dot on hover (focusing effect) */}
      <motion.div
        aria-hidden
        animate={{
          width: hovering ? 8 : 36,
          height: hovering ? 8 : 36,
          scale: pressed ? 0.7 : 1,
          borderWidth: hovering ? 0 : 1.5,
          backgroundColor: hovering ? "#FAFAF7" : "rgba(250,250,247,0)",
          opacity: overMap ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 24, mass: 0.4 }}
        style={{
          x: rsx,
          y: rsy,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="cursor-glow pointer-events-none fixed left-0 top-0 z-[200] rounded-full border-bg mix-blend-difference"
      />
      {/* Inner dot — fades out on hover (it merges with the ring shrinking onto the target) */}
      <motion.div
        aria-hidden
        animate={{
          opacity: overMap ? 0 : hovering ? 0 : 1,
          scale: pressed ? 0.6 : 1,
        }}
        transition={{ duration: 0.15 }}
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="cursor-glow pointer-events-none fixed left-0 top-0 z-[200] h-1.5 w-1.5 rounded-full bg-bg mix-blend-difference"
      />
    </>
  );
}
