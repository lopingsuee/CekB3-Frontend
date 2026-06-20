"use client";

import CountUp from "react-countup";
import { Activity, BrainCircuit, Cloud, Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { getHealth, getModelInfo, type HealthResponse, type ModelInfoResponse } from "@/lib/api";
import { Reveal } from "@/components/reveal";

type ApiState = {
  health?: HealthResponse;
  model?: ModelInfoResponse;
  error?: string;
};

export function ImpactMetrics() {
  const [state, setState] = useState<ApiState>({});

  useEffect(() => {
    let cancelled = false;

    Promise.all([getHealth(), getModelInfo()])
      .then(([health, model]) => {
        if (!cancelled) setState({ health, model });
      })
      .catch((error: unknown) => {
        if (!cancelled) setState({ error: error instanceof Error ? error.message : "Gagal membaca API" });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const classCount = state.health?.classes ?? state.model?.classes;
  const modelName = state.health?.model ?? state.model?.model_name ?? "MobileViT-XS";

  const metrics = [
    {
      label: "Kategori Limbah",
      value: classCount,
      suffix: classCount ? " kelas" : "",
      icon: Activity,
      note: state.error ? "Hubungkan env API untuk nilai real-time" : "Dibaca dari endpoint /health",
    },
    {
      label: "Model AI",
      value: modelName.replace("mobilevit_xs", "MobileViT-XS"),
      icon: BrainCircuit,
      note: "Arsitektur klasifikasi citra ringan",
    },
    {
      label: "Visual Explanation",
      value: "Grad-CAM",
      icon: Eye,
      note: "Area citra yang memengaruhi prediksi",
    },
    {
      label: "Deployment",
      value: "Cloud-Based",
      icon: Cloud,
      note: "Frontend Vercel, backend Hugging Face Spaces",
    },
  ];

  return (
    <section className="bg-[var(--color-accent)] text-white py-16 md:py-24" aria-labelledby="impact-title">
      <div className="w-full">
        <Reveal className="text-center mb-12 md:mb-16 px-4 md:px-6">
          <h2 id="impact-title" className="font-[family-name:var(--font-display)] text-3xl md:text-4xl lg:text-5xl font-bold">
            Kredibilitas Sistem
          </h2>
          <p className="mt-4 text-white/80 text-lg">
            Metrik yang menjelaskan kemampuan CEK-B3 tanpa angka karangan.
          </p>
        </Reveal>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/20 border-y border-white/20">
          {metrics.map((metric, index) => {
            return (
              <Reveal key={metric.label} delay={index * 0.04}>
                <div className="flex h-full flex-col items-center justify-center p-8 text-center">
                  <p className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow-sm">
                    {typeof metric.value === "number" ? (
                      <>
                        <CountUp end={metric.value} duration={1.4} enableScrollSpy scrollSpyOnce />
                        {metric.suffix}
                      </>
                    ) : (
                      metric.value ?? "—"
                    )}
                  </p>
                  <p className="mt-4 text-sm md:text-xs lg:text-sm font-bold tracking-widest uppercase text-white/70">
                    {metric.label}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
