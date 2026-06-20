"use client";

import { usePredictionHistory } from "@/lib/history";
import { formatClassName, formatPercent } from "@/lib/waste-data";
import { Clock, CheckCircle2, ShieldAlert } from "lucide-react";

function timeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.round((now.getTime() - date.getTime()) / 1000);
  if (seconds < 60) return "Baru saja";
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes} menit yang lalu`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} jam yang lalu`;
  const days = Math.round(hours / 24);
  return `${days} hari yang lalu`;
}

export function PredictionHistory() {
  const { history } = usePredictionHistory();

  if (history.length === 0) return null;

  return (
    <section className="mt-16 border-t border-[var(--color-rule)] pt-12">
      <h2 className="font-[family-name:var(--font-display)] text-2xl font-extrabold mb-6">Riwayat Prediksi Terbaru</h2>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {history.map((item) => (
          <div key={item.id} className="surface flex flex-col overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-rule-strong)]">
            <div className="aspect-[4/3] bg-black/5 relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {item.thumbnail ? (
                <img src={item.thumbnail} alt={item.label || "Thumbnail"} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[var(--color-muted)] text-sm font-medium">
                  No Image
                </div>
              )}
            </div>
            <div className="p-3 flex-1 flex flex-col justify-between gap-2">
              <div>
                <p className="font-semibold text-sm line-clamp-1">{item.label ? formatClassName(item.label) : "Tidak diketahui"}</p>
                <div className="flex items-center gap-2 mt-1">
                  {item.status === "accepted" ? (
                    <CheckCircle2 className="size-3 text-[var(--color-accent)]" />
                  ) : (
                    <ShieldAlert className="size-3 text-[var(--color-danger)]" />
                  )}
                  <span className="text-xs font-mono">{formatPercent(item.confidence)}</span>
                </div>
              </div>
              <p className="text-[10px] text-[var(--color-muted)] flex items-center gap-1">
                <Clock className="size-3" />
                {timeAgo(item.timestamp)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
