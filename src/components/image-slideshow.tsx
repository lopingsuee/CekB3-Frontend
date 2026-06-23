"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ImageSlideshow() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev === 0 ? 1 : 0));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-black/5 bg-[#e4e1d5]">
      <AnimatePresence>
        {index === 0 ? (
          <motion.div
            key="img1"
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full flex items-center justify-center bg-[#dedcd0]"
          >
            <img 
              src="/images/gradcam-before.png" 
              alt="Gambar Asli" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </motion.div>
        ) : (
          <motion.div
            key="img2"
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(10px)" }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full flex items-center justify-center bg-[#e4e1d5]"
          >
            <img 
              src="/images/gradcam-after.png" 
              alt="Hasil Grad-CAM" 
              className="absolute inset-0 w-full h-full object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
