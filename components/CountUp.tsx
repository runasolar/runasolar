"use client";

import { animate, useInView, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

type Props = {
  to: number;
  duration?: number;
  className?: string;
};

export function CountUp({ to, duration = 1.6, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const value = useMotionValue(0);
  const display = useTransform(value, (latest) =>
    new Intl.NumberFormat("uk-UA").format(Math.round(latest))
  );

  useEffect(() => {
    if (!inView) return;
    const controls = animate(value, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
    });
    return () => controls.stop();
  }, [inView, to, duration, value]);

  useEffect(() => {
    return display.on("change", (v) => {
      if (ref.current) ref.current.textContent = v;
    });
  }, [display]);

  return (
    <span ref={ref} className={className}>
      0
    </span>
  );
}
