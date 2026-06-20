export type HazardLevel = "high" | "medium" | "low";

export type WasteCategory = {
  id: string;
  label: string;
  shortLabel: string;
  description: string;
  examples: string[];
  hazard: HazardLevel;
  regulation: string;
  handling: string[];
  environmentalImpact: string[];
  healthImpact: string[];
};

export const hazardMeta: Record<
  HazardLevel,
  {
    label: string;
    tone: string;
    className: string;
  }
> = {
  high: {
    label: "Bahaya tinggi",
    tone: "Korosif, toksik, mudah menyala, atau berdampak kuat pada kesehatan.",
    className: "hazard-high",
  },
  medium: {
    label: "Bahaya sedang",
    tone: "Perlu pemilahan dan penyimpanan aman sebelum diserahkan.",
    className: "hazard-medium",
  },
  low: {
    label: "Risiko rendah",
    tone: "Tidak terdeteksi sebagai B3, tetap perlu dipilah sesuai jenis sampah.",
    className: "hazard-low",
  },
};

export const wasteCategories: WasteCategory[] = [
  {
    id: "baterai_bekas",
    label: "Baterai Bekas",
    shortLabel: "Baterai",
    description: "Baterai kecil, baterai ponsel, dan aki yang dapat mengandung logam berat.",
    examples: ["AA/AAA", "Baterai ponsel", "Aki"],
    hazard: "high",
    regulation: "PP 22/2021 Lampiran IX",
    handling: ["Simpan terpisah dalam wadah tertutup", "Jangan terkena air", "Bawa ke drop box baterai atau TPS B3"],
    environmentalImpact: ["Mencemari tanah dan air tanah dengan logam berat beracun", "Membutuhkan ratusan tahun untuk terurai di alam bebas", "Kandungan merkuri dan kadmium meracuni ekosistem air"],
    healthImpact: ["Paparan timbal dapat merusak sistem saraf dan ginjal", "Merkuri sangat beracun bagi otak, terutama pada anak-anak", "Kadmium bersifat karsinogenik (pemicu kanker)"],
  },
  {
    id: "lampu_tl_cfl_neon",
    label: "Lampu TL, CFL, Neon",
    shortLabel: "Lampu",
    description: "Lampu pendar yang dapat mengandung uap merkuri dan pecahan kaca berbahaya.",
    examples: ["Lampu TL", "Lampu CFL", "Neon"],
    hazard: "high",
    regulation: "PP 22/2021 Lampiran IX",
    handling: ["Simpan dalam kardus", "Jangan dihancurkan", "Jika pecah, gunakan sarung tangan dan ventilasi ruangan"],
    environmentalImpact: ["Pelepasan uap merkuri ke atmosfer saat lampu pecah", "Kaca tajam melukai hewan liar dan mengganggu rantai makanan", "Merkuri dapat menumpuk di tubuh organisme laut"],
    healthImpact: ["Menghirup uap merkuri merusak sistem saraf pusat", "Pecahan kaca dapat menyebabkan luka fisik yang serius", "Debu fosfor pada lampu bisa memicu iritasi saluran pernapasan"],
  },
  {
    id: "kaleng_aerosol",
    label: "Kaleng Aerosol",
    shortLabel: "Aerosol",
    description: "Kemasan bertekanan untuk parfum, deodoran, cat semprot, atau insektisida.",
    examples: ["Deodoran spray", "Cat semprot", "Pembersih aerosol"],
    hazard: "medium",
    regulation: "PP 22/2021 Lampiran IX",
    handling: ["Jauhkan dari panas", "Jangan dibakar atau ditusuk", "Serahkan ke pengepul atau TPS B3"],
    environmentalImpact: ["Gas propelan menyumbang pada pembentukan gas rumah kaca", "Meningkatkan risiko ledakan dan kebakaran di tempat pembuangan akhir", "Cairan sisa mencemari tanah jika kaleng bocor"],
    healthImpact: ["Risiko cedera berat akibat kaleng meledak bila terkena panas tinggi", "Menghirup residu gas dapat menyebabkan pusing kronis", "Iritasi mata dan kulit jika cairan dalam kaleng menyemprot tanpa kendali"],
  },
  {
    id: "cat_pelarut",
    label: "Cat dan Pelarut",
    shortLabel: "Cat",
    description: "Sisa cat, thinner, pernis, atau pelarut yang mudah menyala dan beruap.",
    examples: ["Thinner", "Cat minyak", "Pernis"],
    hazard: "high",
    regulation: "PP 22/2021 Lampiran IX",
    handling: ["Tutup rapat wadah", "Jauhkan dari api", "Jangan dibuang ke saluran air"],
    environmentalImpact: ["Mematikan mikroorganisme pengurai di tanah", "Menyebabkan pencemaran air jika dibuang melalui wastafel atau selokan", "Mengeluarkan Volatile Organic Compounds (VOC) yang menurunkan kualitas udara"],
    healthImpact: ["Uap VOC dapat merusak paru-paru dan sistem saraf", "Beberapa pigmen cat mengandung logam karsinogenik", "Kontak fisik menyebabkan dermatitis dan iritasi parah pada kulit"],
  },
  {
    id: "pestisida_insektisida",
    label: "Pestisida dan Insektisida",
    shortLabel: "Pestisida",
    description: "Bahan pembasmi hama rumah tangga atau kebun yang beracun bagi manusia dan lingkungan.",
    examples: ["Racun tikus", "Obat nyamuk", "Herbisida"],
    hazard: "high",
    regulation: "PP 22/2021 Lampiran IX",
    handling: ["Simpan di tempat terkunci", "Jangan mencuci wadah di wastafel", "Bungkus aman sebelum diserahkan"],
    environmentalImpact: ["Membunuh satwa non-target seperti lebah dan burung", "Meresap ke sumur dan mencemari persediaan air minum", "Menciptakan zona mati beracun di tanah sekitar pembuangan"],
    healthImpact: ["Terhirup saat disemprotkan menyebabkan masalah paru kronis", "Tertelan bisa berakibat keracunan akut hingga fatal", "Mengganggu sistem endokrin dan reproduksi manusia"],
  },
  {
    id: "oli_bekas",
    label: "Oli Bekas",
    shortLabel: "Oli",
    description: "Pelumas bekas dari kendaraan atau mesin yang dapat mencemari tanah dan air.",
    examples: ["Oli motor", "Oli rem", "Grease"],
    hazard: "medium",
    regulation: "PP 22/2021 Lampiran IX",
    handling: ["Tampung dalam jerigen", "Jangan ditumpahkan ke tanah", "Serahkan ke bengkel atau pengepul resmi"],
    environmentalImpact: ["Satu liter oli dapat mencemari jutaan liter air tanah", "Menghalangi sinar matahari masuk ke perairan dan membunuh fitoplankton", "Merusak struktur dan kesuburan tanah secara permanen"],
    healthImpact: ["Mengandung hidrokarbon aromatik yang terbukti karsinogenik", "Kontak kulit jangka panjang dapat memicu kanker kulit", "Uap dari oli panas sangat mengiritasi paru-paru"],
  },
  {
    id: "obat_obatan_kadaluwarsa",
    label: "Obat Kedaluwarsa",
    shortLabel: "Obat",
    description: "Obat sisa atau kedaluwarsa yang berisiko disalahgunakan dan mencemari lingkungan.",
    examples: ["Tablet", "Sirup", "Antibiotik sisa"],
    hazard: "medium",
    regulation: "PP 22/2021 Lampiran IX",
    handling: ["Pisahkan dari obat aktif", "Rusak bentuk fisik jika perlu", "Bawa ke apotek atau fasilitas kesehatan penerima"],
    environmentalImpact: ["Antibiotik yang terbuang mempercepat mutasi bakteri kebal superbug", "Hormon sisa mengganggu siklus reproduksi ikan dan amfibi", "Mencemari perairan karena instalasi pengolahan air tidak bisa menyaring sisa obat"],
    healthImpact: ["Risiko sangat tinggi tertelan oleh anak-anak jika dibuang di tempat sampah biasa", "Dapat disalahgunakan oleh pihak tidak bertanggung jawab jika dijual kembali", "Reaksi alergi atau keracunan jika terminum melalui air yang tercemar"],
  },
  {
    id: "non_b3",
    label: "Non-B3",
    shortLabel: "Non-B3",
    description: "Sampah domestik biasa yang tidak termasuk kategori limbah B3 pada sistem ini.",
    examples: ["Kertas", "Botol PET", "Sisa sayur"],
    hazard: "low",
    regulation: "Bukan termasuk Limbah B3",
    handling: ["Pilahkan organik dan anorganik", "Daur ulang yang masih bernilai", "Buang residu ke petugas kebersihan"],
    environmentalImpact: ["Sampah organik membusuk di TPA dan menghasilkan gas metana (gas rumah kaca)", "Plastik terurai menjadi mikroplastik dan mencemari lautan", "Memerlukan ruang TPA yang sangat luas jika tidak dipilah"],
    healthImpact: ["Tumpukan sampah dapat menjadi sarang nyamuk dan tikus pembawa penyakit", "Bau tak sedap menurunkan kualitas hidup di sekitar penampungan", "Asap akibat pembakaran liar sangat beracun dan memicu penyakit paru"],
  },
];

export function getWasteCategory(id: string | null | undefined) {
  if (!id) return undefined;
  return wasteCategories.find((category) => category.id === id);
}

export function formatClassName(id: string | null | undefined) {
  const known = getWasteCategory(id);
  if (known) return known.label;
  if (!id) return "Belum tersedia";
  return id
    .split("_")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function formatPercent(value: number | null | undefined) {
  if (typeof value !== "number" || Number.isNaN(value)) return "—";
  return `${(value * 100).toFixed(value >= 0.995 ? 0 : 1)}%`;
}
