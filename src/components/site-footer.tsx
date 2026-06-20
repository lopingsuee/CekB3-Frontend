"use client";

import Link from "next/link";
import { Recycle, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { name: "Beranda", href: "/" },
  { name: "Klasifikasi", href: "/classify" },
  { name: "Tentang", href: "/about" },
];

export function SiteFooter() {
  return (
    <footer className="w-full bg-[var(--color-ink)] pt-12 pb-6 overflow-hidden">
      <div className="mx-auto w-[90%] md:w-[75%] max-w-6xl">
        {/* Top Section */}
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-8 items-start">
          {/* Left: Logo & Desc */}
          <div>
            <div className="mb-4 flex items-center gap-3 font-[family-name:var(--font-display)] text-xl font-extrabold text-white">
              <span className="flex size-8 items-center justify-center rounded-[var(--radius-pill)] bg-[var(--color-surface)] text-[var(--color-ink)]">
                <Recycle className="size-4" aria-hidden="true" />
              </span>
              CEK-B3
            </div>
            <p className="text-sm md:text-base text-white/60 max-w-sm leading-relaxed">
              Kenali limbah B3 lebih awal, lalu ambil keputusan pembuangan yang bertanggung jawab. Sistem klasifikasi cerdas untuk melindungi lingkungan kita.
            </p>
          </div>

          {/* Right: Navigation Links */}
          <nav className="flex flex-col border-t border-white/10 text-white lg:w-full">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href} className="border-b border-white/10 block overflow-hidden">
                <motion.div
                  whileHover="hover"
                  initial="initial"
                  className="flex items-center justify-between py-4 group"
                  variants={{
                    initial: { scale: 1 },
                    hover: { scale: 1.02, originX: 0 },
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <span className="text-lg md:text-xl font-bold transition-colors duration-300 group-hover:text-[var(--color-accent)]">
                    {item.name}
                  </span>
                  <motion.div
                    variants={{
                      initial: { opacity: 0, x: -10 },
                      hover: { opacity: 1, x: 0 },
                    }}
                  >
                    <ArrowUpRight className="size-5 text-[var(--color-accent)]" />
                  </motion.div>
                </motion.div>
              </Link>
            ))}
          </nav>
        </div>

        {/* Giant Text */}
        <div className="mt-8 mb-4 flex justify-center">
          <span className="font-[family-name:var(--font-display)] text-[12vw] xl:text-[180px] font-black leading-none tracking-tight text-white/[0.04] select-none">
            CEK-B3
          </span>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between text-xs md:text-sm text-white/40 pt-6 border-t border-white/10">
          <p>© {new Date().getFullYear()} CEK-B3.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
