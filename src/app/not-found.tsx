"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 text-center">
      <motion.p
        className="section-label"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        Lost in the void
      </motion.p>

      <motion.h1
        className="display-title mt-6 text-[22vw] leading-none text-stroke md:text-[14vw]"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        404
      </motion.h1>

      <motion.p
        className="mt-6 max-w-md font-mono text-xs leading-relaxed tracking-brutal text-muted"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        这扇门后面什么都没有。回到入口，重新探索。
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mt-10 flex flex-wrap items-center justify-center gap-6"
      >
        <Link
          href="/"
          className="border border-[#3a3a40] bg-void/40 px-8 py-3 font-mono text-xs tracking-brutal text-bone transition-all duration-500 hover:bg-[#2a2a2e]"
        >
          ← Back to the gate
        </Link>
        <Link
          href="/music"
          className="font-mono text-xs tracking-brutal text-muted transition-colors hover:text-bone"
        >
          The archive →
        </Link>
      </motion.div>
    </div>
  );
}
