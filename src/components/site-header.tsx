"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { href: "/", label: "Beranda" },
  { href: "/classify", label: "Klasifikasi" },
  { href: "/about", label: "Tentang" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--color-rule)] bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:py-6 md:px-8">
        <Link
          href="/"
          className="flex items-center gap-3 font-[family-name:var(--font-display)] text-2xl md:text-3xl font-extrabold leading-none text-[#006640]"
          onClick={() => setOpen(false)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/CekB3_logo.jpg"
            alt="Logo CEK-B3"
            className="h-12 md:h-16 w-auto object-contain rounded-md"
          />
          <span className="tracking-tight">CEK-B3</span>
        </Link>

        <div className="flex items-center">
          {/* Desktop navigation */}
          <div className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-4 py-2 text-lg font-bold transition-colors duration-200",
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

          {/* Hamburger trigger */}
          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-[#006640]/20 text-[#006640] transition-colors hover:bg-[#006640]/5 lg:hidden"
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
