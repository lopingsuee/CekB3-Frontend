import type { Metadata } from "next";
import { ClassifyExperience } from "@/components/classify/classify-experience";

export const metadata: Metadata = {
  title: "Klasifikasi",
  description: "Unggah foto limbah rumah tangga untuk klasifikasi CEK-B3.",
};

export default function ClassifyPage() {
  return <ClassifyExperience />;
}
