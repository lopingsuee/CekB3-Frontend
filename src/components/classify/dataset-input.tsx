"use client";

import { wasteCategories } from "@/lib/waste-data";

interface DatasetInputProps {
  onSelect: (file: File, url: string) => void;
}

const sampleImages: Record<string, string> = {
  baterai_bekas: "batre-sample.jpg",
  lampu_tl_cfl_neon: "lampu-sample.jpg",
  kaleng_aerosol: "aerosol-sample.jpg",
  cat_pelarut: "cat-sample.jpg",
  pestisida_insektisida: "insekti-sample.png",
  oli_bekas: "oli-sample.jpg",
  obat_obatan_kadaluwarsa: "obat-sample.jpg",
  non_b3: "nonb3-sample.png",
};

export function DatasetInput({ onSelect }: DatasetInputProps) {
  const handleSelect = async (categoryId: string) => {
    try {
      const filename = sampleImages[categoryId];
      if (!filename) throw new Error("Contoh gambar tidak terdaftar");
      const res = await fetch(`/images/sample/${filename}`);
      if (!res.ok) throw new Error("Gagal mengambil gambar contoh");
      const blob = await res.blob();
      const mimeType = filename.endsWith(".png") ? "image/png" : "image/jpeg";
      const file = new File([blob], filename, { type: mimeType });
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
              src={`/images/sample/${sampleImages[cat.id]}`} 
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
