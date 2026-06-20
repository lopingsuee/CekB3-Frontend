"use client";

import { useState } from "react";
import { formatClassName, formatPercent, getWasteCategory, hazardMeta, type HazardLevel } from "@/lib/waste-data";
import { type PredictResponse } from "@/lib/api";
import { CheckCircle2, ShieldAlert, Info, ImageOff, Leaf, Shield, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PredictionResultProps {
  result: PredictResponse;
  originalImage: string | null;
}

export function PredictionResult({ result, originalImage }: PredictionResultProps) {
  const [eduMode, setEduMode] = useState(false);
  
  if (result.status !== "accepted") {
    return (
      <motion.div
        key="reject"
        className="surface p-6 sm:p-10 text-center border border-[var(--color-danger)]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <ShieldAlert className="mx-auto size-16 text-[var(--color-danger)] mb-6" />
        <h2 className="font-[family-name:var(--font-display)] text-3xl font-extrabold text-[var(--color-danger)]">Prediksi Ditolak</h2>
        <p className="mt-4 text-lg text-[var(--color-ink-soft)] max-w-md mx-auto">
          {result.message || "Gambar tidak dikenali sebagai limbah B3 rumah tangga yang didukung atau kualitas gambar terlalu rendah."}
        </p>
        <div className="mt-8 p-4 bg-[var(--color-danger-soft)] rounded-[var(--radius-md)] text-sm text-[var(--color-danger)] font-semibold max-w-md mx-auto text-left">
          <p className="flex items-center gap-2 mb-2"><AlertTriangle className="size-4" /> Kemungkinan penyebab:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Objek bukan termasuk 8 kategori limbah yang dilatih.</li>
            <li>Confidence score di bawah batas toleransi (Out-of-Distribution).</li>
            <li>Gambar terlalu buram atau objek terpotong.</li>
          </ul>
        </div>
      </motion.div>
    );
  }

  const category = getWasteCategory(result.label);
  const hazardLevel = (result.hazard_level ?? category?.hazard ?? "medium") as HazardLevel;
  const hazard = hazardMeta[hazardLevel] ?? hazardMeta.medium;
  const confidence = result.confidence ?? 0;

  let confidenceInterp = "";
  if (confidence > 0.85) confidenceInterp = "Sistem sangat yakin terhadap hasil prediksi ini.";
  else if (confidence > 0.6) confidenceInterp = "Sistem cukup yakin. Periksa Grad-CAM untuk melihat area fokus AI.";
  else confidenceInterp = "Keyakinan sistem rendah. Disarankan untuk mengambil foto ulang dengan pencahayaan dan sudut yang lebih baik.";

  return (
    <motion.div
      key="result"
      className="grid gap-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <article className="surface p-6 relative overflow-hidden">
        <div className="absolute top-4 right-4 flex bg-[var(--color-paper-3)] rounded-[var(--radius-pill)] p-1 z-10">
          <button 
            onClick={() => setEduMode(false)}
            className={`px-3 py-1 text-xs font-bold rounded-[var(--radius-pill)] transition-colors ${!eduMode ? 'bg-[var(--color-surface)] shadow-sm' : 'text-[var(--color-muted)] hover:text-[var(--color-ink)]'}`}
          >
            Teknis
          </button>
          <button 
            onClick={() => setEduMode(true)}
            className={`px-3 py-1 text-xs font-bold rounded-[var(--radius-pill)] transition-colors flex items-center gap-1 ${eduMode ? 'bg-[var(--color-surface)] shadow-sm text-[var(--color-accent)]' : 'text-[var(--color-muted)] hover:text-[var(--color-ink)]'}`}
          >
            <Leaf className="size-3" /> Edukasi
          </button>
        </div>

        <div className="flex flex-col gap-4 pr-32">
          <div>
            <p className="text-sm font-bold text-[var(--color-muted)]">Label prediksi</p>
            <h2 className="mt-1 font-[family-name:var(--font-display)] text-4xl md:text-5xl font-extrabold leading-tight">
              {formatClassName(result.label)}
            </h2>
          </div>
          <span className={`w-fit rounded-[var(--radius-pill)] px-3 py-1 text-sm font-extrabold ${hazard.className}`}>
            {hazard.label}
          </span>
        </div>

        <div className="mt-8 bg-[var(--color-paper-2)] rounded-[var(--radius-md)] p-4 border border-[var(--color-rule)]">
          <div className="flex justify-between items-end mb-2">
            <span className="text-sm font-bold text-[var(--color-muted)]">Tingkat Keyakinan (Confidence)</span>
            <span className="font-[family-name:var(--font-display)] text-2xl font-extrabold">{formatPercent(confidence)}</span>
          </div>
          <div className="h-3 w-full bg-[var(--color-paper-3)] rounded-full overflow-hidden">
            <motion.div 
              className={`h-full ${confidence > 0.85 ? 'bg-[var(--color-accent)]' : confidence > 0.6 ? 'bg-amber-500' : 'bg-red-500'}`}
              initial={{ width: 0 }}
              animate={{ width: `${confidence * 100}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
          <p className="text-xs text-[var(--color-ink-soft)] mt-3 flex items-start gap-1.5">
            <Info className="size-4 shrink-0 mt-0.5 text-[var(--color-muted)]" />
            {confidenceInterp}
          </p>
        </div>
      </article>

      <AnimatePresence mode="wait">
        {!eduMode ? (
          <motion.div key="technical" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="grid gap-6 xl:grid-cols-2">
            <article className="surface p-6">
              <h3 className="font-[family-name:var(--font-display)] text-2xl font-extrabold">Regulasi dan Rekomendasi</h3>
              <p className="mt-3 text-sm font-semibold text-[var(--color-ink-soft)] bg-[var(--color-paper-2)] p-3 rounded-[var(--radius-sm)] border border-[var(--color-rule)]">
                <Shield className="inline size-4 mr-2 text-[var(--color-accent)]" />
                {result.regulation || category?.regulation || "Regulasi belum tersedia untuk prediksi ini."}
              </p>
              <ul className="mt-5 grid gap-3">
                {(result.recommendation?.length ? result.recommendation : category?.handling ?? []).map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-[var(--color-ink-soft)]">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[var(--color-accent)]" aria-hidden="true" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="surface p-6 flex flex-col">
              <h3 className="font-[family-name:var(--font-display)] text-2xl font-extrabold mb-4">Top 3 Prediksi</h3>
              <div className="flex-1 flex flex-col justify-center gap-5">
                {result.top_k?.slice(0, 3).map(([label, prob], index) => (
                  <div key={`${label}-${index}`}>
                    <div className="flex items-center justify-between gap-3 text-sm mb-2">
                      <span className="font-bold">{formatClassName(label)}</span>
                      <span className="font-[family-name:var(--font-mono)]">{formatPercent(prob)}</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-[var(--radius-pill)] bg-[var(--color-paper-3)]">
                      <motion.div 
                        className="h-full bg-[var(--color-accent)]"
                        initial={{ width: 0 }}
                        animate={{ width: `${prob * 100}%` }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </motion.div>
        ) : (
          <motion.div key="education" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="grid gap-6">
            <article className="surface p-6 bg-[var(--color-accent-faint)] border-[var(--color-accent)]">
              <h3 className="font-[family-name:var(--font-display)] text-2xl font-extrabold flex items-center gap-2 text-[var(--color-accent)]">
                <Leaf className="size-6" /> Edukasi Limbah B3
              </h3>
              <p className="mt-2 text-sm text-[var(--color-ink-soft)] leading-relaxed">
                {category?.description || "Informasi deskriptif belum tersedia."}
              </p>
              
              <div className="mt-6 grid md:grid-cols-2 gap-6">
                <div className="bg-white/50 p-4 rounded-[var(--radius-md)] border border-black/5">
                  <h4 className="font-bold text-[var(--color-danger)] mb-3 flex items-center gap-2">
                    <AlertTriangle className="size-4" /> Dampak Kesehatan
                  </h4>
                  <ul className="list-disc pl-4 space-y-2 text-sm text-[var(--color-ink-soft)]">
                    {category?.healthImpact?.map((impact, i) => (
                      <li key={i}>{impact}</li>
                    )) || <li>Belum ada data dampak kesehatan.</li>}
                  </ul>
                </div>
                <div className="bg-white/50 p-4 rounded-[var(--radius-md)] border border-black/5">
                  <h4 className="font-bold text-amber-600 mb-3 flex items-center gap-2">
                    <Leaf className="size-4" /> Dampak Lingkungan
                  </h4>
                  <ul className="list-disc pl-4 space-y-2 text-sm text-[var(--color-ink-soft)]">
                    {category?.environmentalImpact?.map((impact, i) => (
                      <li key={i}>{impact}</li>
                    )) || <li>Belum ada data dampak lingkungan.</li>}
                  </ul>
                </div>
              </div>
            </article>
          </motion.div>
        )}
      </AnimatePresence>

      <article className="surface p-6">
        <h3 className="font-[family-name:var(--font-display)] text-2xl font-extrabold flex justify-between items-center">
          Analisis Visual Grad-CAM
        </h3>
        <p className="text-sm text-[var(--color-muted)] mt-1">Area dengan warna merah/kuning menunjukkan bagian yang diperhatikan oleh model AI.</p>
        
        {result.gradcam && originalImage ? (
          <div className="mt-6 grid gap-6">
            <div className="relative rounded-[var(--radius-md)] overflow-hidden border border-[var(--color-rule)] bg-[var(--color-paper-2)]">
              <span className="absolute top-4 left-4 bg-black/60 text-white text-sm px-3 py-1.5 rounded-md backdrop-blur-sm z-10 font-bold">Gambar Asli</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={originalImage} alt="Original" className="w-full h-auto object-contain max-h-[36rem] mx-auto" />
            </div>
            <div className="relative rounded-[var(--radius-md)] overflow-hidden border border-[var(--color-rule)] bg-[var(--color-paper-2)]">
              <span className="absolute top-4 left-4 bg-[var(--color-accent)] text-[var(--color-ink)] font-bold text-sm px-3 py-1.5 rounded-md backdrop-blur-sm z-10">Hasil Grad-CAM</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`data:image/png;base64,${result.gradcam}`} alt="Grad-CAM" className="w-full h-auto object-contain max-h-[36rem] mx-auto" />
            </div>
          </div>
        ) : (
          <div className="mt-6 flex flex-col items-center justify-center min-h-[16rem] rounded-[var(--radius-md)] border border-dashed border-[var(--color-rule-strong)] bg-[var(--color-paper-2)]">
            <ImageOff className="size-10 text-[var(--color-muted)] mb-3" />
            <p className="text-sm font-semibold text-[var(--color-muted)]">Visualisasi Grad-CAM tidak diminta atau gagal dimuat.</p>
          </div>
        )}
      </article>
    </motion.div>
  );
}
