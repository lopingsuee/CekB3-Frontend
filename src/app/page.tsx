import { AlertTriangle, ArrowRight, CheckCircle2, FileImage, Microscope, ShieldCheck, Sprout, UploadCloud } from "lucide-react";
import { CategoryCarousel } from "@/components/category-carousel";
import { ImageSlideshow } from "@/components/image-slideshow";
import { ImpactMetrics } from "@/components/impact-metrics";
import { Reveal } from "@/components/reveal";
import { ButtonLink } from "@/components/ui/button";
import { InteractiveTour } from "@/components/interactive-tour";



const safetyCards = [
  {
    title: "Risiko kesehatan",
    body: "Logam berat, uap merkuri, atau residu pestisida dapat mengganggu pernapasan, kulit, dan saraf.",
    icon: AlertTriangle,
  },
  {
    title: "Risiko lingkungan",
    body: "Bahan kimia yang masuk tanah atau saluran air dapat menyebar lebih jauh dari lokasi pembuangan.",
    icon: Sprout,
  },
  {
    title: "Regulasi pemerintah",
    body: "Limbah tertentu perlu dipisahkan karena diatur sebagai Limbah B3 dalam PP 22/2021.",
    icon: FileImage,
  },
  {
    title: "Pentingnya pemilahan",
    body: "Pemilahan sejak rumah membantu petugas, bank sampah, dan fasilitas pengolahan bekerja lebih aman.",
    icon: CheckCircle2,
  },
];

export default function Home() {
  return (
    <main>
      <section className="relative w-full" aria-labelledby="hero-title">
        {/* Full-width Image Background */}
        <div className="relative w-full h-[50vh] min-h-[400px] md:h-[60vh] max-h-[600px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/image1.jpg"
            alt="Hero Background"
            className="absolute inset-0 h-full w-full object-cover"
          />
          {/* Dark overlay for better text contrast if needed */}
          <div className="absolute inset-0 bg-black/10" />
        </div>

        {/* Overlapping Card */}
        <div className="relative z-10 px-4 md:px-6 -mt-24 md:-mt-32 pb-16 md:pb-24 mx-auto max-w-5xl">
          <Reveal className="bg-white rounded-md shadow-2xl border-b-[6px] border-[var(--color-accent)] p-8 md:p-12 text-center">
            <h1 id="hero-title" className="font-[family-name:var(--font-display)] text-3xl md:text-4xl lg:text-5xl font-extrabold text-[var(--color-ink)] leading-tight">
              Kenali Limbah B3 Rumah Tangga dengan Bantuan AI
            </h1>
            <p className="mt-4 mx-auto max-w-[75ch] text-base md:text-lg text-[var(--color-ink-soft)]">
              Unggah foto limbah rumah tangga dan dapatkan klasifikasi, tingkat bahaya, regulasi
              terkait, serta rekomendasi penanganan yang tepat.
            </p>
            
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <ButtonLink href="/classify" className="w-full sm:w-auto min-w-[200px] justify-center">
                Mulai Klasifikasi
                <ArrowRight className="size-4" aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href="/about" variant="secondary" className="w-full sm:w-auto min-w-[200px] justify-center">
                Pelajari Sistem
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      <ImpactMetrics />

      <section id="sistem" className="page-band px-4 md:px-8" aria-labelledby="workflow-title">
        <div className="w-full">
          <InteractiveTour />
        </div>
      </section>

      <CategoryCarousel />

      <section className="w-full bg-[var(--color-paper)] border-y border-[var(--color-rule)] py-20 md:py-32" aria-labelledby="gradcam-title">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-6 md:px-12 lg:px-16 lg:grid-cols-2 lg:items-center">
          
          {/* Left: Visuals */}
          <Reveal>
            <div className="relative mb-8 md:mb-16 lg:mb-0">
              <ImageSlideshow />
              
              {/* Floating Info Box */}
              <div className="mt-6 md:absolute md:-bottom-8 md:left-8 md:w-[85%] rounded-2xl bg-white border border-[var(--color-rule)] p-6 shadow-xl z-10">
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--color-ink)] mb-2">
                  Transparansi Penuh
                </h3>
                <p className="text-sm text-[var(--color-ink-soft)] leading-relaxed">
                  Bukan black-box. Grad-CAM membuktikan akurasi dengan menyoroti pola visual spesifik pada gambar limbah.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Right: Text Content */}
          <Reveal delay={0.1}>
            <div className="lg:pl-12">
              <h2 id="gradcam-title" className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl font-extrabold text-[var(--color-ink)] leading-tight mb-6">
                AI yang Tidak Sekadar Menebak
              </h2>
              <p className="text-lg md:text-xl text-[var(--color-ink-soft)] mb-6 leading-relaxed">
                Sistem tidak hanya memberikan hasil klasifikasi, tetapi menggunakan teknologi Grad-CAM untuk memvisualisasikan area pada foto yang menjadi dasar pengambilan keputusan model.
              </p>
              <p className="text-base text-[var(--color-muted)] mb-10 leading-relaxed">
                Visualisasi berupa peta panas (heatmap) ini membantu Anda memahami bagaimana AI melihat dan menganalisis limbah, sehingga prediksi yang dihasilkan dapat dipertanggungjawabkan.
              </p>

              <ul className="space-y-5">
                {[
                  "Visualisasi interaktif untuk tiap prediksi",
                  "Penjelasan berbasis area (heatmap) yang jelas",
                  "Meningkatkan kredibilitas keputusan saat sidang"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4">
                    <CheckCircle2 className="size-6 text-[var(--color-accent)] shrink-0" />
                    <span className="text-[var(--color-ink-soft)] font-medium text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="w-full bg-white py-16 md:py-24" aria-labelledby="safety-title">
        <div className="mx-auto max-w-6xl px-6 md:px-12 lg:px-16">
          <Reveal className="max-w-3xl">
            <p className="kicker">Edukasi keselamatan</p>
            <h2 id="safety-title" className="font-[family-name:var(--font-display)] text-3xl md:text-4xl lg:text-5xl font-extrabold text-[var(--color-ink)] mt-3">
              Mengapa Limbah B3 Tidak Boleh Dibuang Sembarangan?
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {safetyCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <Reveal key={card.title} delay={index * 0.04}>
                  <article className="flex gap-5 p-6 rounded-2xl border border-[var(--color-rule-strong)] bg-[var(--color-surface)] sm:flex-row flex-col transition-all hover:shadow-md hover:border-[var(--color-accent)]">
                    <span className="flex size-14 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-accent-faint)] text-[var(--color-accent)]">
                      <Icon className="size-7" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-[family-name:var(--font-display)] text-xl font-bold leading-tight text-[var(--color-ink)]">
                        {card.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">{card.body}</p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="w-full border-t border-[var(--color-rule)] bg-[var(--color-accent-faint)] py-16 md:py-24" aria-labelledby="footer-cta-title">
        <Reveal className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
            <div>
              <p className="kicker">Siap dicoba</p>
              <h2 id="footer-cta-title" className="type-section mt-3 text-[clamp(2rem,3vw,3.25rem)]">
                Mulai Identifikasi Limbah B3 Anda Sekarang
              </h2>
            </div>
            <ButtonLink href="/classify">
              Coba CEK-B3
              <ArrowRight className="size-4" aria-hidden="true" />
            </ButtonLink>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
