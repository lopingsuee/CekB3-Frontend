"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, Zap, CheckCircle2, FileImage, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    id: 1,
    title: "Upload Gambar",
    description: "Unggah foto limbah rumah tangga melalui antarmuka CEK-B3. Sistem akan memvalidasi kualitas gambar secara otomatis.",
    icon: UploadCloud,
  },
  {
    id: 2,
    title: "Analisis AI MobileViT",
    description: "Sistem mengekstrak fitur visual limbah dan menjalankan model klasifikasi MobileViT secara real-time.",
    icon: Zap,
  },
  {
    id: 3,
    title: "Hasil & Rekomendasi",
    description: "Dapatkan prediksi jenis limbah, tingkat probabilitas (confidence score), serta panduan penanganan limbah yang aman.",
    icon: CheckCircle2,
  },
];

export function InteractiveTour() {
  const [activeStep, setActiveStep] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play logic
  useEffect(() => {
    if (!isAutoPlaying) return;

    const timers: NodeJS.Timeout[] = [];
    
    // Total duration per step: 4 seconds
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev % 3) + 1);
    }, 4000);

    return () => {
      clearInterval(interval);
      timers.forEach(clearTimeout);
    };
  }, [isAutoPlaying]);

  const handleStepClick = (stepId: number) => {
    setActiveStep(stepId);
    setIsAutoPlaying(false); // Stop autoplay when user interacts
  };

  return (
    <div className="py-10">
      <div className="text-center mb-16">
        <span className="inline-block px-4 py-1.5 rounded-full border border-[var(--color-accent)]/20 text-sm font-bold tracking-wide text-[var(--color-accent)] mb-6 bg-[var(--color-accent)]/5">
          Simulasi Sistem
        </span>
        <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-extrabold mb-4 text-[var(--color-ink)]">
          Lihat CEK-B3 Beraksi
        </h2>
        <p className="text-[var(--color-ink-soft)] text-lg max-w-2xl mx-auto">
          Ikuti simulasi langkah demi langkah bagaimana AI kami memproses dan mengidentifikasi limbah B3 Anda.
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr_2fr] gap-8 lg:gap-12 items-center">
        
        {/* Left Column: Steps */}
        <div className="flex flex-col gap-4">
          {STEPS.map((step) => {
            const isActive = activeStep === step.id;
            const Icon = step.icon;
            
            return (
              <button
                key={step.id}
                onClick={() => handleStepClick(step.id)}
                className={cn(
                  "text-left p-6 rounded-2xl transition-all duration-300 relative group overflow-hidden border",
                  isActive 
                    ? "bg-[var(--color-paper-2)] border-[var(--color-rule-strong)] shadow-sm" 
                    : "border-transparent hover:bg-[var(--color-paper-2)]/50"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeStepIndicatorLight"
                    className="absolute inset-0 border-2 border-[var(--color-accent)]/30 rounded-2xl pointer-events-none"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                
                <div className="flex gap-4 relative z-10">
                  <div className={cn(
                    "flex items-center justify-center size-10 rounded-lg shrink-0 transition-colors shadow-sm",
                    isActive ? "bg-[var(--color-accent)] text-white" : "bg-white text-[var(--color-muted)] border border-[var(--color-rule)]"
                  )}>
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <h3 className={cn(
                      "font-bold text-lg mb-2 transition-colors",
                      isActive ? "text-[var(--color-ink)]" : "text-[var(--color-ink-soft)] group-hover:text-[var(--color-ink)]"
                    )}>
                      {step.id}. {step.title}
                    </h3>
                    <p className={cn(
                      "text-sm leading-relaxed transition-colors",
                      isActive ? "text-[var(--color-ink-soft)]" : "text-[var(--color-muted)]"
                    )}>
                      {step.description}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Mockup */}
        <div className="bg-[var(--color-surface)] rounded-2xl border border-[var(--color-rule-strong)] shadow-xl overflow-hidden min-h-[400px] flex flex-col relative">
          {/* Mac OS Window Header */}
          <div className="bg-[var(--color-paper-2)] px-4 py-3 border-b border-[var(--color-rule-strong)] flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="size-3 rounded-full bg-[#FF5F56]" />
              <div className="size-3 rounded-full bg-[#FFBD2E]" />
              <div className="size-3 rounded-full bg-[#27C93F]" />
            </div>
            <div className="mx-auto bg-white border border-[var(--color-rule)] px-3 py-1 rounded-md text-xs font-mono text-[var(--color-muted)] flex items-center gap-2 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse" />
              cek-b3.app/dashboard
            </div>
          </div>

          {/* Mockup Body */}
          <div className="flex-1 p-6 flex items-center justify-center relative overflow-hidden bg-[radial-gradient(ellipse_at_center,var(--color-accent-faint)_0%,transparent_100%)]">
            <AnimatePresence mode="wait">
              {activeStep === 1 && <Step1Upload key="step1" />}
              {activeStep === 2 && <Step2Analysis key="step2" />}
              {activeStep === 3 && <Step3Result key="step3" />}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}

// --- Step 1 Component ---
function Step1Upload() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center w-full max-w-md"
    >
      <div className="size-20 rounded-2xl bg-[var(--color-accent)]/10 text-[var(--color-accent)] flex items-center justify-center mb-6 shadow-sm border border-[var(--color-accent)]/20">
        <FileImage className="size-10" />
      </div>
      <h3 className="text-xl font-bold mb-2 text-[var(--color-ink)]">Tarik gambar ke sini</h3>
      <p className="text-[var(--color-muted)] text-sm mb-8">Format didukung: JPG, PNG, WEBP (Max 10MB)</p>
      
      {/* Uploading progress bar */}
      <div className="w-full">
        <div className="h-2 bg-[var(--color-rule-strong)] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-[var(--color-accent)]"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 3, ease: "linear" }}
          />
        </div>
        <p className="text-center text-xs text-[var(--color-muted)] mt-2 font-medium">Mengunggah limbah_kaca.jpg...</p>
      </div>
    </motion.div>
  );
}

// --- Step 2 Component ---
function Step2Analysis() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Memvalidasi kualitas gambar...", status: "pending" },
    { id: 2, text: "Mengekstrak fitur visual...", status: "pending" },
    { id: 3, text: "Menjalankan model MobileViT...", status: "pending" },
  ]);

  useEffect(() => {
    const timer1 = setTimeout(() => setTasks(t => t.map(x => x.id === 1 ? { ...x, status: "done" } : x)), 800);
    const timer2 = setTimeout(() => setTasks(t => t.map(x => x.id === 2 ? { ...x, status: "done" } : x)), 1800);
    const timer3 = setTimeout(() => setTasks(t => t.map(x => x.id === 3 ? { ...x, status: "done" } : x)), 3000);
    return () => { clearTimeout(timer1); clearTimeout(timer2); clearTimeout(timer3); };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col gap-4 w-full max-w-sm"
    >
      {tasks.map((task) => (
        <div key={task.id} className="bg-white border border-[var(--color-rule)] shadow-sm rounded-xl p-4 flex items-center gap-4">
          <div className="w-6 flex justify-center shrink-0">
            {task.status === "pending" ? (
              <Loader2 className="size-5 text-[var(--color-accent)] animate-spin" />
            ) : (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
                <CheckCircle2 className="size-5 text-[var(--color-accent)]" />
              </motion.div>
            )}
          </div>
          <span className={cn(
            "text-sm font-semibold transition-colors duration-300",
            task.status === "pending" ? "text-[var(--color-ink)]" : "text-[var(--color-muted)]"
          )}>
            {task.text}
          </span>
        </div>
      ))}
    </motion.div>
  );
}

// --- Step 3 Component ---
function Step3Result() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="w-full max-w-lg bg-white rounded-xl border border-[var(--color-rule-strong)] overflow-hidden shadow-lg"
    >
      <div className="p-5 border-b border-[var(--color-rule)] flex justify-between items-center bg-[var(--color-paper-2)]">
        <h4 className="font-bold text-[var(--color-ink)]">Hasil Analisis AI</h4>
        <div className="size-8 rounded bg-[var(--color-accent)]/10 flex items-center justify-center border border-[var(--color-accent)]/20">
          <CheckCircle2 className="size-5 text-[var(--color-accent)]" />
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-end mb-2">
          <div>
            <p className="text-[var(--color-muted)] text-xs font-bold uppercase tracking-wider mb-1">Kategori Terdeteksi</p>
            <p className="font-extrabold text-2xl text-[var(--color-ink)]">Baterai Bekas</p>
          </div>
          <div className="text-right">
            <p className="text-[var(--color-muted)] text-xs font-bold uppercase tracking-wider mb-1">Confidence Score</p>
            <p className="font-extrabold text-xl text-[var(--color-accent)]">98.5%</p>
          </div>
        </div>

        {/* Confidence Progress */}
        <div className="h-3 bg-[var(--color-rule-strong)] rounded-full overflow-hidden mb-6">
          <motion.div
            className="h-full bg-[var(--color-accent)]"
            initial={{ width: "0%" }}
            animate={{ width: "98.5%" }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
          />
        </div>

        {/* Recommendation Box */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 rounded-lg p-4 flex gap-3"
        >
          <div className="shrink-0 mt-0.5">
            <Zap className="size-4 text-[var(--color-accent)]" />
          </div>
          <p className="text-sm text-[var(--color-ink-soft)] font-medium leading-relaxed">
            <strong className="text-[var(--color-ink)] block mb-1">Rekomendasi Penanganan:</strong> 
            Limbah B3 dengan prioritas tinggi. Pisahkan dari sampah biasa dan simpan di wadah kering sebelum diserahkan ke fasilitas daur ulang baterai.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
