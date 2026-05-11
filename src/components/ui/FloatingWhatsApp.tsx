"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface FloatingWhatsAppProps {
  link?: string;
}

export default function FloatingWhatsApp({ link }: FloatingWhatsAppProps) {
  const href = (typeof link === "string" ? link : "").trim() || "/book";
  const isExternal = /^https?:\/\//i.test(href) || href.startsWith("//");

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
      className="fixed bottom-24 right-6 z-50 flex items-center justify-center"
    >
      <Link
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        aria-label="Contact us on WhatsApp"
        className="w-12 h-12 rounded-full bg-[#25D366] hover:bg-[#1ebd5a] text-white shadow-lg shadow-[#25D366]/40 flex items-center justify-center transition-all duration-200 hover:scale-110"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12.031 0C5.385 0 .003 5.383.003 12.029c0 2.128.552 4.2 1.6 6.035L0 24l6.096-1.597c1.78.94 3.784 1.436 5.932 1.436 6.646 0 12.03-5.383 12.03-12.03S18.677 0 12.031 0zm0 21.848c-1.802 0-3.559-.484-5.099-1.401l-.365-.216-3.791.994.996-3.696-.237-.377c-1.008-1.602-1.54-3.466-1.54-5.387 0-5.541 4.51-10.053 10.054-10.053 5.54 0 10.05 4.512 10.05 10.053 0 5.542-4.51 10.054-10.05 10.054zm5.518-7.535c-.303-.151-1.792-.885-2.07-.987-.278-.101-.481-.151-.684.152-.202.303-.782.987-.959 1.189-.177.202-.354.227-.657.076-1.353-.68-2.39-1.282-3.328-2.614-.24-.343.238-.316.674-.848.151-.177.227-.303.328-.48.101-.202.051-.354-.025-.505-.076-.152-.684-1.646-.934-2.253-.243-.591-.489-.511-.684-.52-.177-.008-.38-.008-.583-.008s-.53.076-.808.38c-.278.303-1.06 1.036-1.06 2.526 0 1.49 1.086 2.93 1.237 3.132.152.202 2.133 3.256 5.171 4.568.723.313 1.287.5 1.727.64.726.23 1.386.197 1.905.119.58-.088 1.792-.733 2.045-1.441.253-.708.253-1.314.177-1.441-.076-.127-.278-.202-.581-.354z" />
        </svg>
      </Link>
    </motion.div>
  );
}
