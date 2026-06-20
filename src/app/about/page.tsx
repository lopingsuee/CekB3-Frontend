import type { Metadata } from "next";
import { BrainCircuit, Database, Eye, Layers3, ServerCog, Sparkles } from "lucide-react";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Tentang",
  description: "Penjelasan penelitian, model, Grad-CAM, dataset, dan arsitektur CEK-B3.",
};

const sections = [
  {
    title: "Tentang CEK-B3",
    icon: Sparkles,
    body: "CEK-B3 adalah frontend untuk membantu masyarakat mengenali limbah B3 rumah tangga melalui klasifikasi citra berbasis AI, lalu membaca rekomendasi penanganan awal yang lebih aman.",
  },
  {
    title: "MobileViT-XS",
    icon: BrainCircuit,
    body: "Model MobileViT-XS digunakan karena ringan untuk inferensi cloud dan tetap mampu mempelajari pola visual melalui kombinasi karakteristik CNN dan transformer.",
  },
  {
    title: "Grad-CAM",
    icon: Eye,
    body: "Grad-CAM menambahkan lapisan penjelasan visual agar pengguna dapat melihat area gambar yang paling memengaruhi keputusan model.",
  },
  {
    title: "Dataset Limbah B3",
    icon: Database,
    body: "Dataset difokuskan pada kategori limbah B3 rumah tangga seperti baterai, lampu, aerosol, cat, pestisida, oli, obat kedaluwarsa, dan kelas non-B3.",
  },
  {
    title: "Arsitektur Sistem",
    icon: Layers3,
    body: "Frontend Next.js berkomunikasi langsung dengan backend FastAPI yang menjalankan preprocessing gambar, inference model, pengecekan out-of-distribution, dan pencatatan feedback.",
  },
  {
    title: "Teknologi yang Digunakan",
    icon: ServerCog,
    body: "Stack frontend menggunakan Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, React Intersection Observer, Lucide React, React CountUp, dan native fetch.",
  },
];

export default function AboutPage() {
  return (
    <main className="px-4 pb-16 pt-10 md:px-6 md:pb-24" aria-labelledby="about-title">
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-4xl">
          <p className="kicker">Dokumentasi singkat</p>
          <h1 id="about-title" className="type-display mt-4 text-[var(--text-display-sm)]">
            Sistem dibuat untuk mudah dipahami, mudah diuji, dan layak dipresentasikan.
          </h1>
          <p className="mt-6 max-w-[70ch] text-lg text-[var(--color-ink-soft)]">
            Halaman ini merangkum bagian penelitian yang biasanya ditanyakan saat demonstrasi:
            tujuan sistem, model, transparansi, dataset, arsitektur, dan teknologi.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <Reveal key={section.title} delay={index * 0.04}>
                <article className="surface grid h-full gap-5 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="font-[family-name:var(--font-display)] text-3xl font-extrabold leading-tight">
                      {section.title}
                    </h2>
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-accent-faint)] text-[var(--color-accent)]">
                      <Icon className="size-6" aria-hidden="true" />
                    </span>
                  </div>
                  <p className="text-[var(--color-ink-soft)]">{section.body}</p>
                </article>
              </Reveal>
            );
          })}
        </div>

        <section className="mt-12 grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]" aria-labelledby="architecture-title">
          <Reveal className="surface-soft p-5">
            <p className="kicker">Alur integrasi</p>
            <h2 id="architecture-title" className="type-section mt-4 text-[clamp(2rem,3vw,3.25rem)]">
              Frontend ringan, backend tetap menjadi pusat komputasi model.
            </h2>
            <p className="mt-4 text-[var(--color-ink-soft)]">
              API URL dan API key dibaca dari environment variable frontend. Dengan cara ini, source code
              siap dipush ke repository dan konfigurasi produksi dapat diatur di Vercel.
            </p>
          </Reveal>

          <Reveal delay={0.08} className="surface p-5">
            <ol className="grid gap-3">
              {[
                "Pengguna memilih gambar pada halaman klasifikasi.",
                "Frontend mengirim multipart file ke /predict dengan header X-API-Key bila tersedia.",
                "Backend memvalidasi file, menjalankan MobileViT-XS, dan membuat Grad-CAM bila diminta.",
                "Frontend menampilkan hasil serta mengirim feedback pengguna ke /feedback.",
              ].map((item, index) => (
                <li key={item} className="grid gap-3 rounded-[var(--radius-md)] bg-[var(--color-paper-2)] p-3 sm:grid-cols-[3rem_minmax(0,1fr)]">
                  <span className="font-[family-name:var(--font-mono)] text-sm font-bold text-[var(--color-accent)]">
                    {(index + 1).toString().padStart(2, "0")}
                  </span>
                  <span className="text-sm font-semibold text-[var(--color-ink-soft)]">{item}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </section>
      </div>
    </main>
  );
}
