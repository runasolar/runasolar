"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

type ObjectType = "home" | "business";
type PowerLevel = 0 | 1;

type Props = {
  type: ObjectType;
  level: PowerLevel;
};

/**
 * Hero scene — photoreal 3D render with crossfade between
 * small-power and large-power variants. Both renders have the inverter,
 * battery and solar panels baked in. Background is already transparent.
 */
export function HouseScene({ type, level }: Props) {
  const reduce = useReducedMotion();
  const blend = level === 0 ? 0 : 1;

  return (
    <div className="relative h-full w-full">
      {/* Sun — layered disc with corona and atmospheric wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[8%] -top-[4%] -z-0 h-20 w-20 sm:h-24 sm:w-24 lg:h-32 lg:w-32"
      >
        {/* Outer atmospheric wash — huge soft yellow glow */}
        <motion.div
          animate={
            reduce
              ? undefined
              : { scale: [1, 1.1, 1], opacity: [0.55, 0.85, 0.55] }
          }
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -inset-[180%] rounded-full bg-sun-200/55 blur-3xl"
        />

        {/* Mid corona */}
        <motion.div
          animate={
            reduce
              ? undefined
              : { scale: [1, 1.06, 1], opacity: [0.6, 0.9, 0.6] }
          }
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.4,
          }}
          className="absolute -inset-[55%] rounded-full bg-sun-400/35 blur-2xl"
        />

        {/* Inner corona — golden ring */}
        <motion.div
          animate={reduce ? undefined : { scale: [1, 1.03, 1] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -inset-[18%] rounded-full bg-sun-400/50 blur-xl"
        />

        {/* Sun disc — bright core */}
        <motion.div
          animate={reduce ? undefined : { scale: [1, 1.04, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 35% 35%, rgb(var(--color-sun-50)) 0%, rgb(var(--color-sun-200)) 38%, rgb(var(--color-sun-500)) 100%)",
            boxShadow:
              "0 0 32px rgba(232,179,64,0.55), 0 0 80px rgba(247,221,146,0.4)",
          }}
        />
      </div>

      {/* Cool green wash — bottom left */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-8 bottom-0 -z-0 h-[55%] w-[40%] rounded-full bg-leaf-100/55 blur-3xl"
      />

      {/* Drifting cloud accents */}
      <motion.div
        aria-hidden
        animate={reduce ? undefined : { x: [0, 40, 0] }}
        transition={{ duration: 38, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute left-[8%] top-[12%] h-3 w-20 rounded-full bg-bg/80 blur-md"
      />
      <motion.div
        aria-hidden
        animate={reduce ? undefined : { x: [0, -30, 0] }}
        transition={{ duration: 44, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute right-[22%] top-[18%] h-2.5 w-14 rounded-full bg-bg/70 blur-md"
      />

      {/* Image stack — crossfade between small and large */}
      <motion.div
        animate={{ opacity: 1 - blend }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
          src={`/hero/${type}-small.webp`}
          alt={
            type === "home"
              ? "Приватний будинок з сонячною станцією"
              : "Комерційний об'єкт з сонячною станцією"
          }
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1100px"
          className="object-contain"
        />
      </motion.div>

      <motion.div
        animate={{ opacity: blend }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
          src={`/hero/${type}-large.webp`}
          alt=""
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1100px"
          className="object-contain"
        />
      </motion.div>

      {/* Energy particles — sun → roof panels */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 1200 640"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        {[0, 1, 2, 3].map((i) => (
          <circle key={i} r="4" fill="#FFE6A6" opacity="0.7">
            <animateMotion
              dur={`${2.6 + i * 0.4}s`}
              repeatCount="indefinite"
              begin={`${i * 0.7}s`}
              path="M 920,80 Q 780,170 600,250"
            />
            <animate
              attributeName="opacity"
              values="0;0.8;0.8;0"
              keyTimes="0;0.15;0.8;1"
              dur={`${2.6 + i * 0.4}s`}
              repeatCount="indefinite"
              begin={`${i * 0.7}s`}
            />
          </circle>
        ))}
      </svg>

      {/* Soft ground separation line */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-[8%] bottom-[6%] h-px bg-gradient-to-r from-transparent via-ink/12 to-transparent"
      />
    </div>
  );
}
