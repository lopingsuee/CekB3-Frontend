"use client";

import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { animate } from "framer-motion";
import { wasteCategories } from "@/lib/waste-data";

function CategoryCard({ category }: { category: any }) {
  const getImageForCategory = (id: string) => {
    switch (id) {
      case "baterai_bekas": return "/images/batre.png";
      case "lampu_tl_cfl_neon": return "/images/bohlam.png";
      case "kaleng_aerosol": return "/images/aerosol.png";
      case "cat_pelarut": return "/images/cat.png";
      case "pestisida_insektisida": return "/images/pestisida.png";
      case "oli_bekas": return "/images/oli.png";
      case "obat_obatan_kadaluwarsa": return "/images/obat_kapsul.png";
      default: return null;
    }
  };

  const imgSrc = getImageForCategory(category.id);

  return (
    <div className="flex flex-col rounded-2xl bg-[#fcfaf2] p-5 md:p-6 shadow-sm ring-1 ring-black/5 shrink-0 w-[280px] h-[360px] md:w-[340px] md:h-[400px]">
      {imgSrc ? (
        <div className="w-full rounded-xl bg-white h-32 mb-4 md:h-36 md:mb-6 flex items-center justify-center overflow-hidden ring-1 ring-black/5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imgSrc} alt={category.label} className="w-full h-full object-contain p-2 mix-blend-multiply" />
        </div>
      ) : (
        <div className="w-full rounded-xl bg-black/5 h-32 mb-4 md:h-36 md:mb-6 flex items-center justify-center">
          <span className="text-xs text-black/30 font-medium tracking-wider uppercase">No Image</span>
        </div>
      )}
      
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-[family-name:var(--font-display)] text-lg md:text-xl font-bold uppercase tracking-tight text-[var(--color-ink)]">
          {category.label}
        </h3>
        <ArrowUpRight className="size-5 text-[var(--color-ink)]" />
      </div>
      
      <p className="text-sm text-[var(--color-ink-soft)] leading-relaxed line-clamp-4">
        {category.description}
      </p>
    </div>
  );
}

export function CategoryCarousel() {
  const railRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);
  
  // Smooth auto-scroll using Framer Motion
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const interval = setInterval(() => {
      // Pause if user is dragging or hovering the mouse over the carousel
      if (isDragging.current || rail.matches(':hover')) return;

      const child = rail.firstElementChild as HTMLElement;
      if (!child) return;
      
      const scrollAmount = child.clientWidth;
      const maxScrollLeft = rail.scrollWidth - rail.clientWidth;
      
      let targetScroll = rail.scrollLeft + scrollAmount;
      if (Math.ceil(rail.scrollLeft) >= maxScrollLeft - 10) {
        targetScroll = 0; // Mentok, kembali ke awal
      }

      // Smooth translation via framer-motion
      animate(rail.scrollLeft, targetScroll, {
        duration: 0.8,
        ease: "easeInOut",
        onUpdate: (latest) => {
          rail.scrollLeft = latest;
        }
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  // Mouse Drag Handlers (Native touch swipe is ignored here so it remains seamless)
  const handlePointerDown = (e: React.PointerEvent) => {
    if (!railRef.current || e.pointerType !== "mouse") return;
    isDragging.current = true;
    startX.current = e.pageX - railRef.current.offsetLeft;
    scrollLeftStart.current = railRef.current.scrollLeft;
    railRef.current.style.cursor = 'grabbing';
    railRef.current.style.userSelect = 'none'; // Cegah blok teks saat drag
  };

  const handlePointerUpOrLeave = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    isDragging.current = false;
    if (railRef.current) {
      railRef.current.style.cursor = 'grab';
      railRef.current.style.removeProperty('user-select');
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current || !railRef.current || e.pointerType !== "mouse") return;
    e.preventDefault();
    const x = e.pageX - railRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5; // Drag speed multiplier
    railRef.current.scrollLeft = scrollLeftStart.current - walk;
  };

  return (
    <section id="kategori" className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-16 mb-10">
        <p className="kicker mb-3 md:hidden">Kategori yang didukung</p>
        <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl lg:text-5xl font-extrabold text-[var(--color-ink)] leading-tight">
          Kategori yang didukung
        </h2>
        <p className="mt-4 text-base md:text-lg text-[var(--color-ink-soft)] max-w-2xl">
          Delapan kelas limbah rumah tangga dalam satu alur klasifikasi. Bisa ditarik (drag), di-scroll manual, atau biarkan bergeser sendiri.
        </p>
      </div>
      
      <div 
        ref={railRef} 
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUpOrLeave}
        onPointerLeave={handlePointerUpOrLeave}
        className="flex overflow-x-auto px-6 md:px-12 lg:px-16 pb-8 cursor-grab touch-pan-x [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {wasteCategories.map((cat) => (
          <div key={cat.id} className="pr-4 md:pr-6 shrink-0">
            <CategoryCard category={cat} />
          </div>
        ))}
      </div>
    </section>
  );
}
