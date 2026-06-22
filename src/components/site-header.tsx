"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Sparkles } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { href: "/", label: "Beranda" },
  { href: "/classify", label: "Klasifikasi" },
  { href: "/tutorial", label: "Tutorial" },
  { href: "/about", label: "Tentang" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--color-rule)] bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 md:py-7 md:px-8 relative">
        <div className="flex items-center">
          <Link
            href="/"
            className="flex items-center relative z-10 -my-8 md:-my-12"
            onClick={() => setOpen(false)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/CekB3_logo.png"
              alt="Logo CEK-B3"
              className="h-16 md:h-24 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Desktop navigation - Centered */}
        <div className="hidden items-center gap-4 lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative px-4 py-2 text-base font-bold transition-colors duration-200",
                  active
                    ? "text-[#006640]"
                    : "text-[#006640]/75 hover:text-[#006640]"
                )}
              >
                {item.label}
                {active && (
                  <motion.div
                    layoutId="activeNavBorder"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-[#006640]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-4 relative z-10">
          {/* Coba Sekarang Button */}
          <Link
            href="/classify"
            className="hidden lg:inline-flex items-center justify-center gap-2 rounded-full bg-[#006640] px-6 py-2.5 text-sm font-bold tracking-wide text-white transition-all hover:bg-[#004d30] hover:scale-105 active:scale-95 uppercase shadow-md"
          >
            <Sparkles className="size-4" />
            Coba Sekarang
          </Link>

          {/* Hamburger trigger */}
          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-[#006640]/20 text-[#006640] ml-2 transition-colors hover:bg-[#006640]/5 lg:hidden"
            aria-label={open ? "Tutup menu" : "Buka menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation panel with framer-motion */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden border-t border-[var(--color-rule)] bg-white md:hidden"
          >
            <div className="mx-auto max-w-6xl px-4 py-4 flex flex-col gap-3">
              {navItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "rounded-[var(--radius-md)] px-4 py-3 text-base font-bold transition-colors",
                      active
                        ? "bg-[#006640]/10 text-[#006640]"
                        : "text-[#006640]/80 hover:bg-gray-50 hover:text-[#006640]"
                    )}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
