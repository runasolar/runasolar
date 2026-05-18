"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { PhonePopup } from "./PhonePopup";

/**
 * Single sticky phone FAB in the bottom-right corner (all viewports, always visible).
 * Click → opens PhonePopup with all phones, messengers, socials, address.
 */
export function MobileCTA() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed bottom-5 right-5 z-40 lg:bottom-7 lg:right-7"
      >
        <button
          onClick={() => setOpen(true)}
          aria-label="Звʼязатися"
          className="group relative grid h-14 w-14 place-items-center rounded-full bg-leaf-600 text-bg shadow-lift transition-all hover:scale-105 hover:bg-leaf-700 active:scale-95 lg:h-16 lg:w-16"
        >
          {/* Ping rings */}
          <span className="absolute inset-0 animate-ping rounded-full bg-leaf-600/40" />
          <span className="absolute inset-0 rounded-full bg-leaf-600" />
          <Phone
            className="relative h-6 w-6 lg:h-7 lg:w-7"
            strokeWidth={2.2}
          />
        </button>
      </motion.div>

      <PhonePopup open={open} onClose={() => setOpen(false)} />
    </>
  );
}
