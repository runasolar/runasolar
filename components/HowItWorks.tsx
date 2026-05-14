"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Sun, Battery, Home, Zap, Workflow } from "lucide-react";
import { SplitText } from "./SplitText";
import { SectionEyebrow } from "./SectionEyebrow";
import { SectionHeader } from "./SectionHeader";

const STEPS = [
  {
    n: "01",
    icon: Sun,
    title: "Сонячні панелі ловлять світло",
    text: "Tier-1 модулі на даху перетворюють фотони на постійний струм навіть у хмарну погоду — приблизно 25% від пікової потужності.",
  },
  {
    n: "02",
    icon: Zap,
    title: "Гібридний інвертор керує потоком",
    text: "Розумна електроніка вирішує куди направити струм: дім, акумулятор чи в мережу за 'Зеленим тарифом'. Перемикається за 0.02 сек.",
  },
  {
    n: "03",
    icon: Battery,
    title: "Літій-залізо акумулятор зберігає",
    text: "LiFePO4-блок 5–20 кВт·год тримає енергію на ніч і блекаут. 6 000+ циклів = 15 років активного використання.",
  },
  {
    n: "04",
    icon: Home,
    title: "Дім працює без перебоїв",
    text: "Світло, котел, інтернет, холодильник — усе живиться плавно. Ви бачите цифри в смартфоні: скільки сонця, скільки витрачено, скільки заробили.",
  },
];

export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="bg-bg py-6 lg:py-10">
      <div className="container-x">
        <div className="relative overflow-clip rounded-[2rem] bg-ink text-bg lg:rounded-[3rem]">
          <div className="px-5 py-16 lg:px-10 lg:py-24">
            <SectionHeader
              index="03 / 09"
              eyebrowIcon={Workflow}
              eyebrowLabel="Як це працює"
              variant="onDark"
              title="Чотири кроки від сонця до розетки."
              description="Від першої фотонної енергії до плавного живлення вашого дому. Усе автоматично, без вашої участі."
            />

            <div ref={ref} className="relative mt-12 lg:mt-16">
              <div className="grid lg:grid-cols-12 lg:gap-16">
                {/* Sticky visual */}
                <div className="lg:col-span-6">
                  <div className="sticky top-24 hidden lg:block">
                    <SystemDiagram progress={scrollYProgress} />
                  </div>
                </div>

                {/* Steps */}
                <ol className="relative lg:col-span-6">
                  <div className="absolute left-5 top-2 h-full w-px bg-bg/10 lg:left-7" />
                  <motion.div
                    style={{ height: lineHeight }}
                    className="absolute left-5 top-2 w-px bg-sun-400 lg:left-7"
                  />

                  {STEPS.map((step, i) => (
                    <motion.li
                      key={step.n}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="relative grid grid-cols-[40px_1fr] gap-4 py-10 lg:grid-cols-[56px_1fr] lg:gap-6 lg:py-16"
                    >
                      <span className="relative z-10 grid h-10 w-10 place-items-center rounded-full border border-bg/20 bg-ink text-sun-400 lg:h-14 lg:w-14">
                        <step.icon className="h-4 w-4 lg:h-5 lg:w-5" strokeWidth={2} />
                      </span>
                      <div>
                        <div className="h-display text-xs font-medium tabular-nums text-bg/40">
                          {step.n} / 04
                        </div>
                        <h3 className="h-display mt-2 text-2xl font-semibold text-balance lg:text-3xl">
                          {step.title}
                        </h3>
                        <p className="mt-3 text-base text-bg/65 text-pretty lg:text-lg">
                          {step.text}
                        </p>
                      </div>
                    </motion.li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* SVG diagram that animates with scroll progress */
function SystemDiagram({ progress }: { progress: any }) {
  const sunOpacity = useTransform(progress, [0, 0.25], [0.3, 1]);
  const inverterOpacity = useTransform(progress, [0.2, 0.5], [0.3, 1]);
  const batteryOpacity = useTransform(progress, [0.45, 0.75], [0.3, 1]);
  const homeOpacity = useTransform(progress, [0.7, 1], [0.3, 1]);

  const flow1 = useTransform(progress, [0, 0.5], [0, 1]);
  const flow2 = useTransform(progress, [0.25, 0.75], [0, 1]);
  const flow3 = useTransform(progress, [0.5, 1], [0, 1]);

  return (
    <div className="relative aspect-square w-full max-w-[480px] overflow-hidden rounded-3xl border border-bg/10 bg-bg/[0.02] p-8">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-sun-400/10 blur-3xl"
      />

      <svg viewBox="0 0 400 400" className="relative h-full w-full">
        {/* Sun */}
        <motion.g style={{ opacity: sunOpacity }}>
          <circle cx="80" cy="80" r="32" fill="#E8B340" />
          <circle cx="80" cy="80" r="44" fill="none" stroke="#E8B340" strokeWidth="1" opacity="0.4" />
          <circle cx="80" cy="80" r="56" fill="none" stroke="#E8B340" strokeWidth="1" opacity="0.2" />
          <text x="80" y="135" textAnchor="middle" fill="#FAFAF7" fontSize="11" fontWeight="500">
            Сонце
          </text>
        </motion.g>

        {/* Panels */}
        <motion.g style={{ opacity: sunOpacity }}>
          <g transform="translate(180, 50) rotate(-12)">
            <rect x="0" y="0" width="120" height="80" fill="#1A1F1B" stroke="#2E5D3A" strokeWidth="2" rx="4" />
            {[0, 1, 2].map((row) =>
              [0, 1, 2, 3].map((col) => (
                <rect
                  key={`${row}-${col}`}
                  x={col * 28 + 6}
                  y={row * 24 + 6}
                  width="22"
                  height="18"
                  fill="#2E5D3A"
                  opacity="0.7"
                />
              ))
            )}
          </g>
          <text x="240" y="160" textAnchor="middle" fill="#FAFAF7" fontSize="11" fontWeight="500">
            Панелі
          </text>
        </motion.g>

        {/* Flow line: panels → inverter */}
        <motion.path
          d="M 240 140 Q 240 180 200 220"
          fill="none"
          stroke="#E8B340"
          strokeWidth="2"
          strokeDasharray="4 4"
          style={{ pathLength: flow1 }}
        />

        {/* Inverter */}
        <motion.g style={{ opacity: inverterOpacity }}>
          <rect x="160" y="220" width="80" height="50" rx="8" fill="#2E5D3A" />
          <text x="200" y="248" textAnchor="middle" fill="#FAFAF7" fontSize="10" fontWeight="600">
            Інвертор
          </text>
          <text x="200" y="290" textAnchor="middle" fill="#FAFAF7" fontSize="10" opacity="0.6">
            Гібрид
          </text>
        </motion.g>

        {/* Flow inverter → battery */}
        <motion.path
          d="M 165 250 Q 110 270 80 290"
          fill="none"
          stroke="#E8B340"
          strokeWidth="2"
          strokeDasharray="4 4"
          style={{ pathLength: flow2 }}
        />

        {/* Battery */}
        <motion.g style={{ opacity: batteryOpacity }}>
          <rect x="40" y="290" width="80" height="60" rx="8" fill="#1A1F1B" stroke="#2E5D3A" strokeWidth="2" />
          <rect x="48" y="298" width="64" height="14" rx="2" fill="#2E5D3A" />
          <rect x="48" y="316" width="40" height="6" rx="2" fill="#2E5D3A" opacity="0.6" />
          <text x="80" y="372" textAnchor="middle" fill="#FAFAF7" fontSize="11" fontWeight="500">
            Акумулятор
          </text>
        </motion.g>

        {/* Flow inverter → home */}
        <motion.path
          d="M 235 250 Q 290 270 320 300"
          fill="none"
          stroke="#E8B340"
          strokeWidth="2"
          strokeDasharray="4 4"
          style={{ pathLength: flow3 }}
        />

        {/* Home */}
        <motion.g style={{ opacity: homeOpacity }}>
          <path d="M 280 320 L 320 285 L 360 320 L 360 360 L 280 360 Z" fill="#FAFAF7" />
          <rect x="306" y="335" width="14" height="25" fill="#1A1F1B" />
          <rect x="328" y="332" width="12" height="12" fill="#1A1F1B" />
          <text x="320" y="385" textAnchor="middle" fill="#FAFAF7" fontSize="11" fontWeight="500">
            Будинок
          </text>
        </motion.g>
      </svg>
    </div>
  );
}
