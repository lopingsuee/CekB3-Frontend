// src/lib/history.ts
"use client";

import { useEffect, useState } from "react";

export type PredictionHistoryItem = {
  id: string;
  thumbnail: string;
  label: string | null;
  confidence: number | null;
  status: "accepted" | "rejected";
  timestamp: string;
};

const HISTORY_KEY = "cekb3_prediction_history";
const MAX_HISTORY = 10;

export function getHistory(): PredictionHistoryItem[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveToHistory(item: PredictionHistoryItem) {
  if (typeof window === "undefined") return;
  try {
    const current = getHistory();
    const filtered = current.filter((i) => i.id !== item.id);
    const updated = [item, ...filtered].slice(0, MAX_HISTORY);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error("Failed to save history", error);
  }
}

export function clearHistory() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(HISTORY_KEY);
}

export function usePredictionHistory() {
  const [history, setHistory] = useState<PredictionHistoryItem[]>([]);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const refreshHistory = () => {
    setHistory(getHistory());
  };

  return { history, refreshHistory, clearHistory: () => { clearHistory(); refreshHistory(); } };
}

export async function createThumbnail(file: File): Promise<string> {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const MAX_WIDTH = 120;
      const scaleSize = MAX_WIDTH / img.width;
      canvas.width = MAX_WIDTH;
      canvas.height = img.height * scaleSize;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/jpeg", 0.7));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve("");
    };
    img.src = url;
  });
}
