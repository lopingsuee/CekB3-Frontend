// src/lib/image-quality.ts

export type ImageQualityWarning = "blur" | "dark" | "bright" | "none";

export async function checkImageQuality(file: File): Promise<ImageQualityWarning[]> {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const MAX_DIM = 400;
      let width = img.width;
      let height = img.height;
      
      if (width > MAX_DIM || height > MAX_DIM) {
        if (width > height) {
          height = Math.round((height * MAX_DIM) / width);
          width = MAX_DIM;
        } else {
          width = Math.round((width * MAX_DIM) / height);
          height = MAX_DIM;
        }
      }
      
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) {
        URL.revokeObjectURL(url);
        return resolve([]);
      }

      ctx.drawImage(img, 0, 0, width, height);
      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;
      
      let brightnessSum = 0;
      for (let i = 0; i < data.length; i += 4) {
        brightnessSum += 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
      }
      const avgBrightness = brightnessSum / (width * height);
      
      const warnings: ImageQualityWarning[] = [];
      
      if (avgBrightness < 30) warnings.push("dark");
      if (avgBrightness > 230) warnings.push("bright");

      let edgeSum = 0;
      for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
          const idx = (y * width + x) * 4;
          const left = (y * width + (x - 1)) * 4;
          const top = ((y - 1) * width + x) * 4;
          
          const p = 0.299 * data[idx] + 0.587 * data[idx+1] + 0.114 * data[idx+2];
          const pl = 0.299 * data[left] + 0.587 * data[left+1] + 0.114 * data[left+2];
          const pt = 0.299 * data[top] + 0.587 * data[top+1] + 0.114 * data[top+2];
          
          edgeSum += Math.abs(p - pl) + Math.abs(p - pt);
        }
      }
      
      const avgEdge = edgeSum / ((width - 2) * (height - 2));
      if (avgEdge < 6) {
        warnings.push("blur");
      }

      URL.revokeObjectURL(url);
      resolve(warnings);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve([]);
    };
    img.src = url;
  });
}
