"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Phone, Calculator } from "lucide-react";
import { COMPANY } from "@/lib/data";

export function MobileCTA() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [120, 0]);
  const opacity = useTransform(scrollY, [0, 300], [0, 1]);

  return (
    <motion.div
      style={{ y, opacity }}
      className="fixed inset-x-3 bottom-3 z-40 flex gap-2 lg:hidden"
    >
      <a
        href={`tel:${COMPANY.phonesRaw[0]}`}
        className="flex flex-1 items-center justify-center gap-2 rounded-full border border-line bg-bg/95 px-4 py-4 text-sm font-medium shadow-lift backdrop-blur-md"
      >
        <Phone className="h-4 w-4 text-leaf-600" />
        Зателефонувати
      </a>
      <a
        href="#contact"
        className="flex flex-1 items-center justify-center gap-2 rounded-full bg-leaf-600 px-4 py-4 text-sm font-medium text-bg shadow-lift"
      >
        <Calculator className="h-4 w-4" />
        Розрахувати
      </a>
    </motion.div>
  );
}
