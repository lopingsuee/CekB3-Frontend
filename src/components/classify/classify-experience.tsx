"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Eye, ImageOff, Loader2, Send, ShieldAlert, UploadCloud, X, Camera, Image as ImageIcon, Grid } from "lucide-react";
import { DragEvent, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ApiConfigError, predictImage, submitFeedback, type PredictResponse } from "@/lib/api";
import { cn } from "@/lib/utils";
import { checkImageQuality, type ImageQualityWarning } from "@/lib/image-quality";
import { saveToHistory, createThumbnail, usePredictionHistory } from "@/lib/history";

import { CameraInput } from "./camera-input";
import { DatasetInput } from "./dataset-input";
import { PredictionResult } from "./prediction-result";
import { PredictionHistory } from "./prediction-history";
import { CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/reveal";

const maxUploadMb = 10;
const maxUploadBytes = maxUploadMb * 1024 * 1024;
const minImageSize = 100;

type FeedbackChoice = "yes" | "no" | "";
type ToastState = { tone: "success" | "error"; message: string } | null;
type InputMode = "upload" | "camera" | "dataset";

async function validateImage(file: File) {
  if (!file.type.startsWith("image/")) {
    throw new Error("File harus berupa gambar JPG, PNG, WEBP, atau format gambar lain yang didukung browser.");
  }
  if (file.size > maxUploadBytes) {
    throw new Error(`Ukuran file maksimal ${maxUploadMb}MB.`);
  }

  const url = URL.createObjectURL(file);
  try {
    await new Promise<void>((resolve, reject) => {
      const image = new Image();
      image.onload = () => {
        if (image.naturalWidth < minImageSize || image.naturalHeight < minImageSize) {
          reject(new Error(`Resolusi gambar minimal ${minImageSize}x${minImageSize}px.`));
        } else {
          resolve();
        }
      };
      image.onerror = () => reject(new Error("Gambar tidak dapat dibaca browser."));
      image.src = url;
    });
    return url;
  } catch (error) {
    URL.revokeObjectURL(url);
    throw error;
  }
}

export function ClassifyExperience() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputMode, setInputMode] = useState<InputMode>("upload");
  
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [imageWarnings, setImageWarnings] = useState<ImageQualityWarning[]>([]);
  
  const [includeGradcam, setIncludeGradcam] = useState(true);
  const [isPredicting, setIsPredicting] = useState(false);
  const [result, setResult] = useState<PredictResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const [feedbackChoice, setFeedbackChoice] = useState<FeedbackChoice>("");
  const [comment, setComment] = useState("");
  const [feedbackSubmitting, setFeedbackSubmitting] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [toast, setToast] = useState<ToastState>(null);

  const { refreshHistory } = usePredictionHistory();

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 4200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const predictionId = result?.prediction_id == null ? "" : String(result.prediction_id);

  async function handleImageSelection(nextFile: File) {
    setError(null);
    setResult(null);
    setFeedbackChoice("");
    setComment("");
    setFeedbackSubmitted(false);
    setImageWarnings([]);

    try {
      const nextPreviewUrl = await validateImage(nextFile);
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setFile(nextFile);
      setPreviewUrl(nextPreviewUrl);

      // Perform quality checks
      const warnings = await checkImageQuality(nextFile);
      setImageWarnings(warnings);
      
    } catch (validationError) {
      setFile(null);
      setPreviewUrl(null);
      setError(validationError instanceof Error ? validationError.message : "File tidak valid.");
    }
  }

  function handleDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setDragging(false);
    const nextFile = event.dataTransfer.files?.[0];
    if (nextFile) void handleImageSelection(nextFile);
  }

  function removeImage() {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(null);
    setPreviewUrl(null);
    setResult(null);
    setError(null);
    setImageWarnings([]);
    setFeedbackChoice("");
    setComment("");
    setFeedbackSubmitted(false);
    if (inputRef.current) inputRef.current.value = "";
  }

  async function handlePredict() {
    if (!file) {
      setError("Pilih gambar terlebih dahulu.");
      return;
    }

    setIsPredicting(true);
    setError(null);
    setResult(null);
    setFeedbackChoice("");
    setComment("");
    setFeedbackSubmitted(false);

    try {
      const response = await predictImage(file, includeGradcam);
      setResult(response);
      
      // Save to history
      const thumb = await createThumbnail(file);
      saveToHistory({
        id: response.prediction_id ? String(response.prediction_id) : Date.now().toString(),
        thumbnail: thumb,
        label: response.label,
        confidence: response.confidence,
        status: response.status as "accepted" | "rejected",
        timestamp: new Date().toISOString()
      });
      refreshHistory();

    } catch (predictError) {
      const message =
        predictError instanceof ApiConfigError
          ? predictError.message
          : predictError instanceof Error
            ? predictError.message
            : "Prediksi gagal dijalankan.";
      setError(message);
    } finally {
      setIsPredicting(false);
    }
  }

  async function handleFeedbackSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!predictionId || !feedbackChoice || feedbackSubmitted) return;

    setFeedbackSubmitting(true);
    try {
      await submitFeedback({
        prediction_id: predictionId,
        is_correct: feedbackChoice === "yes",
        user_comment: comment.trim() ? comment.trim() : null,
      });
      setFeedbackSubmitted(true);
      setToast({ tone: "success", message: "Feedback tersimpan. Terima kasih." });
    } catch (feedbackError) {
      setToast({
        tone: "error",
        message: feedbackError instanceof Error ? feedbackError.message : "Feedback gagal dikirim.",
      });
    } finally {
      setFeedbackSubmitting(false);
    }
  }

  return (
    <main className="px-4 pb-16 pt-10 md:px-6 md:pb-24" aria-labelledby="classify-title">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="grid gap-4 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-end mb-10">
            <div>
              <p className="kicker">Klasifikasi Cerdas</p>
              <h1 id="classify-title" className="type-display mt-4 text-[var(--text-display-sm)] font-black">
                Identifikasi Limbah B3 Rumah Tangga
              </h1>
            </div>
            <p className="max-w-[68ch] text-[var(--color-ink-soft)] lg:justify-self-end text-lg leading-relaxed">
              Ambil foto atau unggah gambar limbah B3. Sistem akan memproses gambar menggunakan MobileViT, 
              menampilkan visualisasi Grad-CAM, serta panduan penanganan limbah sesuai regulasi.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="grid gap-8 max-w-4xl mx-auto w-full items-start">
            {/* Input Panel */}
          <section className="grid gap-6" aria-label="Input Gambar">
            <div className="surface p-4">
              {/* Tabs */}
              <div className="flex bg-[var(--color-paper-2)] p-1 rounded-[var(--radius-md)] mb-6 border border-[var(--color-rule)]">
                {(["upload", "camera", "dataset"] as InputMode[]).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => {
                      if (mode !== inputMode) removeImage();
                      setInputMode(mode);
                    }}
                    className={cn(
                      "flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-bold rounded-[var(--radius-sm)] transition-all",
                      inputMode === mode
                        ? "bg-[var(--color-surface)] shadow-sm text-[var(--color-accent)]"
                        : "text-[var(--color-muted)] hover:text-[var(--color-ink)]"
                    )}
                  >
                    {mode === "upload" && <UploadCloud className="size-4" />}
                    {mode === "camera" && <Camera className="size-4" />}
                    {mode === "dataset" && <Grid className="size-4" />}
                    <span className="capitalize">{mode === "upload" ? "Upload File" : mode === "camera" ? "Kamera" : "Contoh"}</span>
                  </button>
                ))}
              </div>

              {/* Input Area */}
              <div className="relative mb-6">
                <AnimatePresence mode="wait">
                  {previewUrl ? (
                    <motion.div
                      key="preview"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="relative block w-full overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-rule)] bg-[var(--color-surface)]"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={previewUrl} alt="Preview" className="max-h-[25rem] w-full object-contain" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key={inputMode}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {inputMode === "upload" && (
                        <label
                          onDragOver={(event) => { event.preventDefault(); setDragging(true); }}
                          onDragLeave={() => setDragging(false)}
                          onDrop={handleDrop}
                          className={cn(
                            "flex min-h-[24rem] cursor-pointer flex-col items-center justify-center gap-4 rounded-[var(--radius-md)] border-2 border-dashed p-6 text-center transition-colors",
                            dragging
                              ? "border-[var(--color-accent)] bg-[var(--color-accent-faint)]"
                              : "border-[var(--color-rule-strong)] bg-[var(--color-paper-2)] hover:bg-[var(--color-paper-3)]"
                          )}
                        >
                          <input
                            ref={inputRef}
                            type="file"
                            accept="image/*"
                            className="sr-only"
                            onChange={(event) => {
                              const f = event.target.files?.[0];
                              if (f) void handleImageSelection(f);
                            }}
                          />
                          <span className="flex size-16 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-surface)] text-[var(--color-accent)] shadow-[var(--shadow-tight)]">
                            <ImageIcon className="size-8" aria-hidden="true" />
                          </span>
                          <span>
                            <strong className="block font-[family-name:var(--font-display)] text-2xl leading-tight">Tarik gambar ke sini</strong>
                            <span className="mt-2 block text-sm text-[var(--color-muted)]">atau klik untuk memilih file (JPG, PNG, WEBP). Maks {maxUploadMb}MB.</span>
                          </span>
                        </label>
                      )}
                      
                      {inputMode === "camera" && (
                        <CameraInput 
                          isActive={inputMode === "camera" && !previewUrl} 
                          onCapture={(file) => handleImageSelection(file)} 
                        />
                      )}

                      {inputMode === "dataset" && (
                        <DatasetInput 
                          onSelect={(file) => handleImageSelection(file)} 
                        />
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Actions & Warnings */}
              <AnimatePresence>
                {file && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }} 
                    animate={{ opacity: 1, height: "auto" }} 
                    exit={{ opacity: 0, height: 0 }}
                    className="grid gap-3 overflow-hidden"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3 rounded-[var(--radius-md)] bg-[var(--color-paper-2)] p-3 text-sm">
                      <span className="min-w-0 truncate font-semibold">{file.name}</span>
                      <button type="button" className="btn btn-secondary min-h-10 px-3 text-sm" onClick={removeImage}>
                        <X className="size-4" aria-hidden="true" /> Hapus
                      </button>
                    </div>

                    {/* Image Quality Warnings */}
                    {imageWarnings.length > 0 && (
                      <div className="rounded-[var(--radius-md)] bg-amber-500/10 border border-amber-500/20 p-3 text-sm text-amber-600 font-medium">
                        {imageWarnings.includes("blur") && <p className="flex items-center gap-2"><AlertCircle className="size-4 shrink-0" /> Gambar terlihat buram. Hasil prediksi mungkin tidak akurat.</p>}
                        {imageWarnings.includes("dark") && <p className="flex items-center gap-2"><AlertCircle className="size-4 shrink-0" /> Gambar terlalu gelap. Pertimbangkan mengambil foto ulang.</p>}
                        {imageWarnings.includes("bright") && <p className="flex items-center gap-2"><AlertCircle className="size-4 shrink-0" /> Gambar terlalu terang (overexposed).</p>}
                      </div>
                    )}

                    <label className="surface-soft flex cursor-pointer items-center justify-between gap-4 p-3 relative group">
                      <span>
                        <span className="flex items-center gap-2 font-bold">
                          <Eye className="size-4 text-[var(--color-accent)]" aria-hidden="true" />
                          Tampilkan Visualisasi Grad-CAM
                        </span>
                        <span className="mt-1 block text-sm text-[var(--color-muted)]">
                          Grad-CAM menyoroti area yang diperhatikan AI.
                        </span>
                      </span>
                      <input
                        type="checkbox"
                        className="size-5 accent-[var(--color-accent)]"
                        checked={includeGradcam}
                        onChange={(event) => setIncludeGradcam(event.target.checked)}
                      />
                    </label>

                    <Button type="button" isLoading={isPredicting} disabled={!file || isPredicting} onClick={handlePredict} className="h-12 text-lg">
                      {isPredicting ? "Memproses MobileViT..." : "Jalankan Prediksi AI"}
                    </Button>
                    
                    {error && (
                      <p className="flex items-start gap-2 rounded-[var(--radius-md)] bg-[var(--color-danger-soft)] p-3 text-sm font-semibold text-[var(--color-danger)] mt-2">
                        <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                        {error}
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>

          {/* Result Panel */}
          <section className="grid gap-4" aria-label="Hasil prediksi">
            <AnimatePresence mode="wait">
              {isPredicting ? (
                <motion.div
                  key="loading"
                  className="surface grid min-h-[36rem] place-items-center p-5 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div>
                    <Loader2 className="mx-auto size-12 animate-spin text-[var(--color-accent)]" aria-hidden="true" />
                    <h2 className="mt-6 font-[family-name:var(--font-display)] text-3xl font-extrabold">Menganalisis Gambar</h2>
                    <p className="mt-2 text-sm text-[var(--color-muted)]">
                      Mengirim file ke backend dan menjalankan inferensi model MobileViT.
                    </p>
                  </div>
                </motion.div>
              ) : result ? (
                <motion.div key="result_wrapper" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <PredictionResult result={result} originalImage={previewUrl} />
                  
                  {/* Feedback Form */}
                  {predictionId && result.status === "accepted" && (
                    <form className="surface p-6 mt-6 border-t-[4px] border-t-[var(--color-accent)]" onSubmit={handleFeedbackSubmit}>
                      <h3 className="font-[family-name:var(--font-display)] text-2xl font-extrabold flex items-center gap-2">
                        <CheckCircle2 className="size-6 text-[var(--color-accent)]" /> 
                        Bantu Tingkatkan Akurasi Sistem
                      </h3>
                      <p className="text-sm text-[var(--color-muted)] mt-1">Apakah hasil prediksi ini sesuai dengan ekspektasi Anda?</p>
                      
                      <fieldset className="mt-5 grid gap-3 sm:grid-cols-2">
                        <legend className="sr-only">Apakah prediksi sudah sesuai?</legend>
                        {[
                          { value: "yes", label: "Ya, prediksi tepat" },
                          { value: "no", label: "Tidak, ada kesalahan" },
                        ].map((option) => (
                          <label
                            key={option.value}
                            className={cn(
                              "surface-soft flex min-h-14 cursor-pointer items-center gap-3 p-4 font-bold rounded-[var(--radius-md)] border-2 transition-colors",
                              feedbackChoice === option.value ? "border-[var(--color-accent)] bg-[var(--color-accent-faint)]" : "border-transparent hover:border-[var(--color-rule-strong)]"
                            )}
                          >
                            <input
                              type="radio"
                              name="feedback"
                              value={option.value}
                              className="size-5 accent-[var(--color-accent)]"
                              checked={feedbackChoice === option.value}
                              disabled={feedbackSubmitted}
                              onChange={(event) => setFeedbackChoice(event.target.value as FeedbackChoice)}
                            />
                            {option.label}
                          </label>
                        ))}
                      </fieldset>

                      <AnimatePresence>
                        {feedbackChoice === "no" && (
                          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                            <label className="mt-4 block">
                              <span className="text-sm font-bold block mb-2">Kategori yang benar / Komentar Tambahan</span>
                              <textarea
                                className="textarea w-full h-24"
                                value={comment}
                                disabled={feedbackSubmitted}
                                onChange={(event) => setComment(event.target.value)}
                                placeholder="Contoh: Seharusnya ini masuk kategori Baterai Bekas karena..."
                              />
                            </label>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="mt-6 flex flex-wrap items-center gap-4">
                        <Button type="submit" isLoading={feedbackSubmitting} disabled={!feedbackChoice || feedbackSubmitted}>
                          <Send className="size-4" aria-hidden="true" />
                          {feedbackSubmitted ? "Feedback Terkirim" : "Kirim Feedback Evaluasi"}
                        </Button>
                        {feedbackSubmitted && (
                          <span className="flex items-center gap-2 text-sm font-semibold text-[var(--color-accent)]">
                            <CheckCircle2 className="size-4" aria-hidden="true" />
                            Satu feedback sudah tersimpan untuk evaluasi penelitian.
                          </span>
                        )}
                      </div>
                    </form>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  className="surface grid min-h-[36rem] place-items-center p-5 text-center border-2 border-dashed border-[var(--color-rule-strong)]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div>
                    <ShieldAlert className="mx-auto size-16 text-[var(--color-accent)] opacity-50" aria-hidden="true" />
                    <h2 className="mt-6 font-[family-name:var(--font-display)] text-3xl font-extrabold text-[var(--color-ink-soft)]">Menunggu Input</h2>
                    <p className="mt-3 max-w-[42ch] text-sm text-[var(--color-muted)] leading-relaxed mx-auto">
                      Pilih gambar melalui panel di sebelah kiri untuk melihat hasil identifikasi. 
                      Sistem akan menampilkan probabilitas, tingkat bahaya, panduan regulasi, dan analisis Grad-CAM di area ini.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        </div>
        </Reveal>

        {/* Prediction History Component */}
        <Reveal delay={0.2}>
          <PredictionHistory />
        </Reveal>

      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            role="status"
            className={cn(
              "fixed bottom-6 right-6 z-50 flex max-w-md items-center gap-3 rounded-[var(--radius-md)] border p-4 text-sm font-semibold shadow-lg",
              toast.tone === "success"
                ? "border-green-500/30 bg-green-50 text-green-700"
                : "border-red-500/30 bg-red-50 text-red-700",
            )}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
          >
            {toast.tone === "success" ? <CheckCircle2 className="size-5" /> : <AlertCircle className="size-5" />}
            {toast.message}
            <button type="button" className="ml-auto icon-button min-h-8 min-w-8" onClick={() => setToast(null)}>
              <X className="size-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
