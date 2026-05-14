"use client";

import { motion, useReducedMotion } from "framer-motion";

type Props = {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  animateOnView?: boolean;
};

export function SplitText({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.06,
  as = "h2",
  animateOnView = true,
}: Props) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  const Tag = as as keyof JSX.IntrinsicElements;
  const MotionWord = motion.span;

  if (reduce) {
    return <Tag className={className}>{text}</Tag>;
  }

  const variants = {
    hidden: { y: "100%", opacity: 0 },
    show: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: delay + i * stagger,
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    }),
  };

  return (
    <Tag className={className}>
      {words.map((w, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-bottom"
          style={{ marginRight: "0.25em" }}
        >
          <MotionWord
            className={`inline-block will-change-transform ${wordClassName ?? ""}`}
            initial="hidden"
            whileInView={animateOnView ? "show" : undefined}
            animate={animateOnView ? undefined : "show"}
            viewport={{ once: true, margin: "-60px" }}
            custom={i}
            variants={variants}
          >
            {w}
          </MotionWord>
        </span>
      ))}
    </Tag>
  );
}
