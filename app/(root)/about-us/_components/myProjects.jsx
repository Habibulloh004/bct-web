"use client";

import { imageUrl } from "@/lib/utils";
import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const PROJECT_IMAGES = [
  "/myProjects/1.jpg",
  "/myProjects/2.jpg",
  "/myProjects/1.jpg",
  "/myProjects/2.jpg",
  "/myProjects/1.jpg",
  "/myProjects/2.jpg",
  "/myProjects/1.jpg",
  "/myProjects/2.jpg",
];

export default function MyProjects({ projects }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const openAt = (i) => {
    setIndex(i);
    setOpen(true);
  };

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % PROJECT_IMAGES.length);
  }, []);
  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + PROJECT_IMAGES.length) % PROJECT_IMAGES.length);
  }, []);

  // Esc / ← →
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    // scroll lock
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, next, prev]);

  // touch swipe
  const startX = useRef(null);
  const onTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (startX.current == null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    if (Math.abs(dx) > 40) {
      dx < 0 ? next() : prev();
    }
    startX.current = null;
  };

  return (
    <div className="w-11/12 max-w-[1440px] mx-auto space-y-5">
      <div className="pb-5 flex justify-center items-center pt-5">
        <h1 className="text-base md:text-lg font-semibold">
          {t("aboutUs.projects.title")}
        </h1>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {projects?.map((src, i) => (
          <button
            key={i}
            onClick={() => openAt(i)}
            className="rounded-xl border bg-white/50 hover:shadow-md transition overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black/30"
          >
            <div className="relative w-full aspect-[16/9]">
              <Image
                src={src?.image ? `${imageUrl}${src?.image}` : "/placeholder.svg"}
                alt={`project ${i + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                priority={i < 4}
                loading="eager"
              />
            </div>
          </button>
        ))}
      </div>

      {/* Modal / Lightbox */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed  inset-0 z-[9999] flex items-center justify-center"
        >
          {/* backdrop */}
          <div
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/80"
          />
          {/* content */}
          <div className="relative z-[101] w-11/12 max-w-5xl">
            {/* close */}
            <button
              onClick={() => setOpen(false)}
              className="absolute -top-12 right-0 md:top-0 md:-right-12 p-2 rounded-full bg-white/90 hover:bg-white shadow"
              aria-label="Close"
            >
              ✕
            </button>

            {/* image wrapper */}
            <div
              className="relative w-full aspect-[16/9] bg-black rounded-xl overflow-hidden select-none"
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <Image
                key={index} // force re-render for smoothness
                src={PROJECT_IMAGES[index]}
                alt={`project large ${index + 1}`}
                fill
                className="object-contain"
                sizes="90vw"
                loading="eager"
                priority
              />

              {/* prev */}
              <button
                onClick={prev}
                aria-label="Previous"
                className="absolute left-2 top-1/2 -translate-y-1/2 px-3 py-2 rounded-full bg-white/90 hover:bg-white shadow"
              >
                ‹
              </button>
              {/* next */}
              <button
                onClick={next}
                aria-label="Next"
                className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-2 rounded-full bg-white/90 hover:bg-white shadow"
              >
                ›
              </button>

              {/* counter */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs md:text-sm px-2 py-1 rounded bg-black/60 text-white">
                {index + 1} / {PROJECT_IMAGES.length}
              </div>
            </div>

            {/* thumbnails row */}
            {/* <div className="mt-3 grid grid-cols-4 sm:grid-cols-6 gap-2">
              {PROJECT_IMAGES.map((src, i) => (
                <button
                  key={`thumb-${i}`}
                  onClick={() => setIndex(i)}
                  className={`relative aspect-[16/9] rounded overflow-hidden border ${
                    i === index ? "ring-2 ring-white border-white" : "border-white/20"
                  }`}
                >
                  <Image
                    src={src}
                    alt={`thumb ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="15vw"
                  />
                </button>
              ))}
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
}
