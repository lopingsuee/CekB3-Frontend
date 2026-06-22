import { Reveal } from "@/components/reveal";

const tutorials = [
  {
    id: 1,
    title: "TUTORIAL 1",
    description: "Pilih foto limbah rumah tangga dengan pencahayaan cukup dan objek terlihat jelas. Pastikan limbah berada di tengah frame gambar.",
  },
  {
    id: 2,
    title: "TUTORIAL 2",
    description: "Sistem AI akan memproses gambar menggunakan model MobileViT-XS. Tunggu sejenak selagi AI menganalisis pola visual dari foto limbah Anda.",
  },
  {
    id: 3,
    title: "TUTORIAL 3",
    description: "Setelah proses selesai, Anda akan melihat hasil klasifikasi yang mencakup jenis limbah, tingkat bahaya, dan regulasi pemerintah yang terkait.",
  },
  {
    id: 4,
    title: "TUTORIAL 4",
    description: "Ikuti rekomendasi penanganan yang diberikan oleh sistem agar limbah B3 dapat dibuang, disimpan sementara, atau didaur ulang dengan aman.",
  },
];

export const metadata = {
  title: "Tutorial",
  description: "Panduan menggunakan fitur klasifikasi CEK-B3",
};

export default function TutorialPage() {
  return (
    <main className="min-h-screen bg-[var(--color-paper)] py-16 md:py-24 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 md:px-12 lg:px-16">
        <Reveal>
          <div className="text-center mb-20 md:mb-28">
            <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl font-extrabold text-[var(--color-ink)]">
              Cara Menggunakan Sistem
            </h1>
            <p className="mt-6 text-lg text-[var(--color-ink-soft)] max-w-2xl mx-auto">
              Ikuti panduan 4 langkah mudah ini untuk memanfaatkan fitur identifikasi cerdas limbah B3 rumah tangga Anda.
            </p>
          </div>
        </Reveal>

        <div className="flex flex-col gap-16 md:gap-24 mt-20 md:mt-32">
          {tutorials.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.1}>
              <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
                
                {/* Left Side: Number & Text */}
                <div className="flex-1 flex gap-6 md:gap-10 w-full">
                  {/* Big Number */}
                  <div className="text-7xl md:text-8xl lg:text-[10rem] font-light text-[var(--color-ink)] leading-none font-[family-name:var(--font-display)] shrink-0">
                    {item.id}
                  </div>
                  
                  {/* Text Content */}
                  <div className="flex flex-col justify-center mt-2 md:mt-6">
                    <h2 className="text-xl md:text-2xl font-bold text-[var(--color-ink)] tracking-wider uppercase mb-3 md:mb-4">
                      {item.title}
                    </h2>
                    <p className="text-[var(--color-ink-soft)] text-base md:text-lg leading-relaxed max-w-sm">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Right Side: Image Placeholder */}
                <div className="flex-1 w-full">
                  <div className="w-full aspect-[4/3] bg-[#e4e1d5] rounded-lg flex items-center justify-center border border-black/5 shadow-inner transition-colors hover:bg-[#dedcd0]">
                    <span className="text-[var(--color-ink-soft)] text-sm md:text-base font-medium tracking-widest uppercase">
                      Gambar
                    </span>
                  </div>
                </div>

              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </main>
  );
}
