"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { imageUrl } from "@/lib/utils";
import { getTranslatedValue } from "@/lib/functions";
import { useTranslation } from "react-i18next";

/**
 * props:
 *  - stats: [{ value, label }]
 *  - delays: [ms, ms, ms, ms]       // har slot qancha vaqtda keyingisiga o'tadi
 *  - flipDurationMs: number         // varaqalash animatsiyasi davomiyligi (ms)
 */
export default function StatsQuadFlip({
  stats = [],
  delays = [2000, 3000, 4000, 5000],
  flipDurationMs = 2000,
}) {
  // 4 ta slotga taqsimlash (i % 4)
  const indexed = useMemo(() => stats.map((item, idx) => ({ item, idx })), [stats]);
  const groups = useMemo(() => {
    const result = [[], [], [], []];
    indexed.forEach((item) => {
      const groupIdx = item.idx % 4;
      result[groupIdx].push(item);
    });
    return result;
  }, [indexed]);

  return (
    <div className="w-full max-w-[120px] md:max-w-[200px] lg:max-w-[250px] xl:max-w-[300px] flex-shrink-0">
      {/* Mobile: bitta katta card */}
      <div className="block md:hidden w-full">
        <FlipSlotBook
          items={indexed}
          delay={2000}
          flipDurationMs={flipDurationMs}
          startOffset={200}
          isMobile={true}
        />
      </div>

      {/* Desktop: 2x2 grid */}
      <div className="hidden md:grid grid-cols-2 grid-rows-2 gap-2 md:gap-3 lg:gap-4 w-full h-[200px] lg:h-[250px] xl:h-[300px]">
        {groups.map((items, slotIdx) => (
          <FlipSlotBook
            key={slotIdx}
            items={items}
            delay={delays[slotIdx] ?? 2000}
            flipDurationMs={flipDurationMs}
            startOffset={slotIdx * 1500} // ketma-ket aylanish
            isMobile={false}
          />
        ))}
      </div>
    </div>
  );
}

function FlipSlotBook({
  items = [],
  delay = 3000,
  flipDurationMs = 1200,
  startOffset = 0,
  isMobile = false,
}) {
  // bo'sh holat
  if (!items || items.length === 0) {
    return (
      <div
        className={`rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 shadow-md w-full ${isMobile ? "h-[150px]" : "h-full"
          }`}
      />
    );
  }

  // No duplication; cycle through items as a rotating queue
  const [queue, setQueue] = useState(items);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    setQueue(items);
  }, [items]);

  useEffect(() => {
    if (queue.length < 2) return;

    let timeoutId;

    const schedule = (offset) => {
      timeoutId = setTimeout(() => {
        setIsFlipping(true);
        setTimeout(() => {
          setQueue((q) => {
            const [first, ...rest] = q;
            return [...rest, first];
          });
          setIsFlipping(false);
          schedule(delay);
        }, flipDurationMs);
      }, offset);
    };

    schedule(startOffset);

    return () => clearTimeout(timeoutId);
  }, [queue.length, delay, flipDurationMs, startOffset]);

  const current = queue[0];
  const next = queue[1] ?? queue[0];

  return (
    <div className={`relative w-full ${isMobile ? "h-[150px]" : "h-full"}`}>
      {/* Container with perspective */}
      <div
        className="relative w-full h-full rounded-xl overflow-hidden shadow-lg"
        style={{
          perspective: "1200px",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Back page (keyingi sahifa) */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden"
          style={{
            transformOrigin: "50% 0%",
            transform: isFlipping ? "rotateX(0deg)" : "rotateX(90deg)",
            transition: `transform ${flipDurationMs}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
            backfaceVisibility: "hidden",
            zIndex: isFlipping ? 2 : 1,
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200">
            <SlotContent item={next.item} imgIndex={next.idx} isMobile={isMobile} />
            {/* Subtle shadow for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-transparent rounded-xl pointer-events-none" />
          </div>
        </div>

        {/* Front page (joriy sahifa) */}
        <div
          className="absolute inset-0 w-full h-full backface-hidden"
          style={{
            transformOrigin: "50% 0%",
            transform: isFlipping ? "rotateX(-90deg)" : "rotateX(0deg)",
            transition: `transform ${flipDurationMs}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
            backfaceVisibility: "hidden",
            zIndex: isFlipping ? 1 : 2,
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200">
            <SlotContent item={current.item} imgIndex={current.idx} isMobile={isMobile} />
            {/* Shadow when flipping */}
            <div
              className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent rounded-xl pointer-events-none transition-opacity duration-300"
              style={{
                opacity: isFlipping ? 0.7 : 0,
              }}
            />
          </div>
        </div>

        {/* Book spine shadow */}
        <div
          className="absolute top-0 left-1/2 w-[2px] h-full bg-gradient-to-b from-black/20 to-black/5 pointer-events-none transition-opacity duration-300"
          style={{
            transform: "translateX(-50%)",
            opacity: isFlipping ? 1 : 0,
          }}
        />
      </div>
    </div>
  );
}

function SlotContent({ item, imgIndex, isMobile = false }) {
  const [i18n] = useTranslation();

  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-gray-800 p-2">
      <div className={`${isMobile ? "mb-2" : "mb-1 md:mb-2"}`}>
        <Image
          src={item ? `${imageUrl}${item?.image}` : "/placeholder.png"}
          alt={item?.label ?? ""}
          width={75}
          height={75}
          loading="eager"
          className={`transition-transform duration-200 hover:scale-110 ${isMobile ? "w-8 h-8" : "w-5 h-5 md:w-7 md:h-7 lg:w-10 lg:h-10"
            }`}
        />
      </div>
      <div className="text-center leading-tight">
        <h3
          className={`font-bold text-primary mb-0.5 ${isMobile ? "text-lg" : "text-sm md:text-base lg:text-xl"
            }`}
        >
          {getTranslatedValue(item?.title, i18n.language)}
        </h3>
        <p
          className={`text-gray-600 font-medium ${isMobile ? "text-xs" : "text-[9px] md:text-[10px] lg:text-xs"
            }`}
        >
          {getTranslatedValue(item?.description, i18n.language)}
        </p>
      </div>
    </div>
  );
}