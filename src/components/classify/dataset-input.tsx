"use client";

import { wasteCategories } from "@/lib/waste-data";

interface DatasetInputProps {
  onSelect: (file: File, url: string) => void;
}

export function DatasetInput({ onSelect }: DatasetInputProps) {
  const handleSelect = async (categoryId: string) => {
    try {
      const res = await fetch(`/samples/${categoryId}.jpg`);
      if (!res.ok) throw new Error("Gagal mengambil gambar contoh");
      const blob = await res.blob();
      const file = new File([blob], `${categoryId}-sample.jpg`, { type: "image/jpeg" });
      const url = URL.createObjectURL(blob);
      onSelect(file, url);
    } catch (error) {
      console.error(error);
      alert("Contoh gambar tidak tersedia secara lokal.");
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 min-h-[24rem]">
      {wasteCategories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => handleSelect(cat.id)}
          className="flex flex-col items-center gap-3 p-4 rounded-[var(--radius-md)] border border-[var(--color-rule)] bg-[var(--color-paper-2)] hover:border-[var(--color-accent)] hover:bg-[var(--color-accent-faint)] transition-colors text-center group"
        >
          <div className="w-full aspect-square rounded-md overflow-hidden bg-[var(--color-surface)] relative border border-[var(--color-rule-strong)] group-hover:border-[var(--color-accent)] transition-colors">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={`/samples/${cat.id}.jpg`} 
              alt={cat.label}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://via.placeholder.com/300?text=" + encodeURIComponent(cat.shortLabel);
              }}
            />
          </div>
          <div className="text-sm font-semibold">{cat.shortLabel}</div>
        </button>
      ))}
    </div>
  );
}
