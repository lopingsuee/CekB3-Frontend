import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { GraduationCap, BookOpen, Target, Lightbulb } from "lucide-react";

// Inline SVG components for brand icons
function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="none"
      className={className}
    >
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.113.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="none"
      className={className}
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tentang",
  description: "Penjelasan mengenai latar belakang proyek tugas akhir skripsi CEK-B3.",
};

export default function AboutPage() {
  return (
    <main className="px-4 pb-16 pt-10 md:px-6 md:pb-24 overflow-hidden" aria-labelledby="about-title">
      <div className="mx-auto max-w-6xl">
        
        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Skripsi Context */}
          <div className="flex flex-col">
            <Reveal>
              <span className="inline-block px-4 py-1.5 rounded-full border border-[var(--color-accent)]/20 text-sm font-bold tracking-wide text-[var(--color-accent)] mb-6 bg-[var(--color-accent)]/5">
                Proyek Tugas Akhir
              </span>
              <h1 id="about-title" className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl font-extrabold text-[var(--color-ink)] leading-tight mb-6">
                Di Balik Sistem Klasifikasi CEK-B3
              </h1>
              <p className="text-lg text-[var(--color-ink-soft)] leading-relaxed mb-10">
                Website ini merupakan antarmuka (frontend) dari sistem kecerdasan buatan yang dibangun sebagai bagian dari penelitian <strong>Tugas Akhir Skripsi</strong>. Tujuannya adalah merancang solusi teknologi yang dapat membantu masyarakat awam dalam mengidentifikasi limbah B3 (Bahan Berbahaya dan Beracun) rumah tangga secara mandiri, langsung dari kamera ponsel mereka.
              </p>
            </Reveal>

            <div className="grid sm:grid-cols-2 gap-6">
              <Reveal delay={0.1}>
                <div className="bg-[var(--color-paper-2)] border border-[var(--color-rule)] rounded-2xl p-6 h-full transition-colors hover:border-[var(--color-accent)]/50 hover:bg-[var(--color-surface)] shadow-sm">
                  <div className="size-10 rounded-lg bg-[var(--color-accent)]/10 text-[var(--color-accent)] flex items-center justify-center mb-4">
                    <Target className="size-5" />
                  </div>
                  <h3 className="font-bold text-lg text-[var(--color-ink)] mb-2">Tujuan Penelitian</h3>
                  <p className="text-[var(--color-ink-soft)] text-sm leading-relaxed">
                    Meningkatkan kesadaran masyarakat tentang bahaya limbah B3 domestik dan mencegah pembuangan sembarangan yang dapat mencemari lingkungan.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="bg-[var(--color-paper-2)] border border-[var(--color-rule)] rounded-2xl p-6 h-full transition-colors hover:border-[var(--color-accent)]/50 hover:bg-[var(--color-surface)] shadow-sm">
                  <div className="size-10 rounded-lg bg-[var(--color-accent)]/10 text-[var(--color-accent)] flex items-center justify-center mb-4">
                    <Lightbulb className="size-5" />
                  </div>
                  <h3 className="font-bold text-lg text-[var(--color-ink)] mb-2">Pendekatan Teknologi</h3>
                  <p className="text-[var(--color-ink-soft)] text-sm leading-relaxed">
                    Menggabungkan arsitektur web modern yang responsif dengan model <em>deep learning</em> MobileViT-XS yang ringan untuk inferensi visual seketika.
                  </p>
                </div>
              </Reveal>
            </div>
            
            <Reveal delay={0.3}>
              <div className="mt-8 bg-[var(--color-accent)]/5 border border-[var(--color-accent)]/20 rounded-2xl p-6 flex gap-4 items-start">
                <BookOpen className="size-6 text-[var(--color-accent)] shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-[var(--color-ink)] mb-1">Status Proyek</h4>
                  <p className="text-sm text-[var(--color-ink-soft)] leading-relaxed">
                    Sistem ini sedang dalam tahap pengujian dan validasi sebagai syarat kelulusan program sarjana. Seluruh kode dan dataset akan didokumentasikan untuk keperluan akademik.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Author Card */}
          <div className="flex justify-center lg:justify-end mt-10 lg:mt-0">
            <Reveal delay={0.4} className="w-full max-w-[340px]">
              <div className="group flex flex-col">
                
                {/* Image Card Container */}
                <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-gray-200 border border-[var(--color-rule-strong)] shadow-md transition-all duration-500 ease-out group-hover:shadow-2xl group-hover:-translate-y-2">
                  
                  {/* Author Image */}
                  <div className="absolute inset-0">
                    <Image
                      src="/images/author.jpg"
                      alt="Aditya Umar"
                      fill
                      className="object-cover object-center grayscale transition-all duration-700 ease-in-out group-hover:grayscale-0 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 340px"
                      priority
                    />
                  </div>

                  {/* Inner Gradient for bottom icons */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />

                  {/* Bottom Icons inside the card */}
                  <div className="absolute bottom-5 left-5 right-5 flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <Link href="#" className="size-10 rounded-full border border-white/20 bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/80 hover:bg-white hover:text-black hover:scale-110 transition-all duration-300">
                        <LinkedinIcon className="size-4" />
                      </Link>
                      <Link href="#" className="size-10 rounded-full border border-white/20 bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/80 hover:bg-white hover:text-black hover:scale-110 transition-all duration-300">
                        <GithubIcon className="size-4" />
                      </Link>
                    </div>
                    
                    {/* University Tag */}
                    <div className="flex items-center gap-2 border-t border-white/20 pt-3">
                      <GraduationCap className="size-4 text-white/70" />
                      <span className="text-[10px] font-bold tracking-widest text-white/70 uppercase">
                        Gunadarma University
                      </span>
                    </div>
                  </div>
                </div>

                {/* Text below card */}
                <div className="mt-5 text-left">
                  <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold text-[var(--color-ink)] group-hover:text-[var(--color-accent)] transition-colors duration-300">
                    Aditya Umar
                  </h2>
                  <p className="text-[var(--color-muted)] text-sm font-bold tracking-widest uppercase mt-1">
                    Web and data enthusiast
                  </p>
                </div>

              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </main>
  );
}
