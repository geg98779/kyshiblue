"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { motion, AnimatePresence } from "framer-motion";

const GateScene = dynamic(() => import("@/three/scenes/GateScene"), {
  ssr: false,
});

type Phase = "intro" | "idle" | "exiting";

export default function Gate() {
  const router = useRouter();
  const progressRef = useRef(0);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const [phase, setPhase] = useState<Phase>("intro");
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);

    if (mq.matches) {
      progressRef.current = 1;
      setPhase("idle");
      return;
    }

    // 入场镜头推进
    tweenRef.current = gsap.to(progressRef, {
      current: 1,
      duration: 3.6,
      ease: "power2.out",
      onComplete: () => setPhase("idle"),
    });

    return () => {
      tweenRef.current?.kill();
    };
  }, []);

  const skipIntro = useCallback(() => {
    tweenRef.current?.kill();
    progressRef.current = 1;
    setPhase("idle");
  }, []);

  const enterWorld = useCallback(() => {
    if (phase === "exiting") return;
    setPhase("exiting");
    tweenRef.current?.kill();
    gsap.to(progressRef, {
      current: 2,
      duration: reduced ? 0.3 : 1.6,
      ease: "power2.in",
      onComplete: () => router.push("/music"),
    });
  }, [phase, reduced, router]);

  // ESC 跳过入场
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && phase === "intro") skipIntro();
      if (e.key === "Enter" && phase === "idle") enterWorld();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, skipIntro, enterWorld]);

  const lyrics = [
    "Sipping on the blue",
    "Young Kysh making a move",
    "Make me outta the hood",
  ];

  return (
    <section
      className="relative h-[100svh] w-full overflow-hidden"
      aria-label="The gate — 3D 入口"
    >
      {/* 3D 场景 */}
      <div className="absolute inset-0">
        <GateScene progressRef={progressRef} />
      </div>

      {/* 黑色渐显遮罩 */}
      <motion.div
        className="pointer-events-none absolute inset-0 bg-void"
        initial={{ opacity: 1 }}
        animate={{ opacity: phase === "exiting" ? 0 : 0 }}
        transition={{ duration: 1.4 }}
      />
      <AnimatePresence>
        {phase === "exiting" && (
          <motion.div
            className="pointer-events-none absolute inset-0 z-20 bg-void"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeIn", delay: 0.4 }}
          />
        )}
      </AnimatePresence>

      {/* Gate — 幽蓝氛围层，压在 3D 场景之上、文字之下 */}
      <div className="gate-aurora pointer-events-none absolute inset-0 z-[5] opacity-90" />

      {/* HTML 覆盖层：错落双行大字 + 可悬浮歌词 */}
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-6">
        <div className="flex w-full max-w-[min(92vw,860px)] flex-col items-start">
          <motion.div
            className="pointer-events-auto w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: reduced ? 0 : 1.3,
              duration: 1,
              ease: "easeOut",
            }}
          >
            <h1 className="display-title gate-title w-full">
              <span className="block">
                <span className="gate-word-hollow text-[9.6vw] md:text-[7.6vw]">
                  The Ice
                </span>
              </span>
              <span className="gate-line-two mt-[1.5vw] block pl-[8vw] md:pl-[6vw]">
                <span className="gate-word-solid text-[7.1vw] md:text-[5.6vw]">
                  Chain Shine
                </span>
              </span>
            </h1>
          </motion.div>

          <motion.div
            className="pointer-events-auto mt-[3vw] flex flex-col items-start gap-3"
            initial={{ opacity: 0, y: 18 }}
            animate={{
              opacity: phase === "idle" ? 1 : 0,
              y: phase === "idle" ? 0 : 18,
            }}
            transition={{ duration: 0.7 }}
          >
            {lyrics.map((line) => (
              <p
                key={line}
                className="lyric-line max-w-xl font-mono text-xs leading-relaxed tracking-brutal drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)]"
              >
                {line}
              </p>
            ))}
          </motion.div>

          <motion.div
            className="pointer-events-auto mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: phase === "idle" ? 1 : 0,
              y: phase === "idle" ? 0 : 20,
            }}
            transition={{ duration: 0.7 }}
          >
            <button
              onClick={enterWorld}
              disabled={phase !== "idle"}
              className="group relative border border-[#3a3a40] bg-void/60 px-12 py-4 font-mono text-sm tracking-brutal text-bone backdrop-blur-md transition-all duration-500 hover:border-[#4b6c82] hover:bg-[#0f1620]"
            >
              Enter the world
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] tracking-brutal text-muted opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                ↓ The archive
              </span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* 跳过按钮 */}
      <AnimatePresence>
        {phase === "intro" && (
          <motion.button
            onClick={skipIntro}
            className="absolute bottom-8 right-8 z-20 font-mono text-xs tracking-brutal text-muted transition-colors hover:text-bone"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1 }}
          >
            Skip →
          </motion.button>
        )}
      </AnimatePresence>

      {/* 底部提示 */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === "idle" ? 0.7 : 0 }}
        transition={{ duration: 0.8 }}
      >
        <p className="font-mono text-[10px] tracking-brutal text-muted">
          Move your mouse — the world reacts
        </p>
      </motion.div>

      {/* 向下滚动提示 */}
      {phase === "idle" && (
        <motion.div
          className="absolute bottom-0 left-1/2 z-10 h-16 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-bone/30 to-transparent"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      )}
    </section>
  );
}
