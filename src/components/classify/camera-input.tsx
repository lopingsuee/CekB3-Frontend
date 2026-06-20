"use client";

import { useEffect, useRef, useState } from "react";
import { Camera, SwitchCamera } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CameraInputProps {
  onCapture: (file: File, url: string) => void;
  isActive: boolean;
}

export function CameraInput({ onCapture, isActive }: CameraInputProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [facingMode, setFacingMode] = useState<"environment" | "user">("environment");

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsReady(false);
  };

  const startCamera = async (mode = facingMode) => {
    stopCamera();
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: mode, width: { ideal: 1280 }, height: { ideal: 720 } },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsReady(true);
      }
    } catch (err) {
      setError("Akses kamera ditolak atau tidak tersedia. Pastikan memberikan izin akses.");
    }
  };

  useEffect(() => {
    if (isActive) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [isActive, facingMode]);

  const handleCapture = () => {
    if (!videoRef.current || !streamRef.current) return;
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0);
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], `capture-${Date.now()}.jpg`, { type: "image/jpeg" });
          const url = URL.createObjectURL(blob);
          onCapture(file, url);
          stopCamera();
        }
      }, "image/jpeg", 0.9);
    }
  };

  if (!isActive) return null;

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[24rem] overflow-hidden rounded-[var(--radius-md)] bg-black/90">
      {error ? (
        <div className="p-6 text-center text-white">
          <Camera className="mx-auto size-12 mb-4 text-white/40" />
          <p>{error}</p>
          <Button variant="secondary" className="mt-4" onClick={() => startCamera()}>Coba Lagi</Button>
        </div>
      ) : (
        <>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="absolute inset-0 w-full h-full object-cover"
            onLoadedMetadata={() => videoRef.current?.play()}
          />
          
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="w-[70%] h-[70%] border-2 border-white/50 border-dashed rounded-lg" />
          </div>

          <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-6 z-10">
            <button
              onClick={() => setFacingMode(prev => prev === "user" ? "environment" : "user")}
              className="size-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              aria-label="Tukar Kamera"
            >
              <SwitchCamera className="size-5" />
            </button>
            <button
              onClick={handleCapture}
              disabled={!isReady}
              className="size-16 rounded-full border-4 border-white bg-[var(--color-accent)] hover:bg-[var(--color-accent-2)] transition-colors disabled:opacity-50 flex items-center justify-center"
              aria-label="Ambil Foto"
            >
              <Camera className="size-6 text-[var(--color-ink)]" />
            </button>
            <div className="size-12" />
          </div>
        </>
      )}
    </div>
  );
}
