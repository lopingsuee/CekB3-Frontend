"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const reduceMotion = useReducedMotion();
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "-48px 0px",
  });

  return (
    <motion.div
      ref={ref}
      initial={false}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
      transition={{
        duration: reduceMotion ? 0.15 : 0.42,
        delay: reduceMotion ? 0 : delay,
        ease: easeOut,
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

export function MotionBar({ value, className }: { value: number; className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.span
      aria-hidden="true"
      className={cn("block h-full origin-left", className)}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: Math.max(0, Math.min(value, 1)) }}
      transition={{
        duration: reduceMotion ? 0.15 : 0.5,
        ease: easeOut,
      }}
    />
  );
}
