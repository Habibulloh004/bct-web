"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { getTranslatedValue } from "@/lib/functions";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function ProductFeatures({ productData, variant = "full", className }) {
  const { i18n, t } = useTranslation();
  const name = getTranslatedValue(productData?.name, i18n.language);
  const lead = getTranslatedValue(productData?.ads_title, i18n.language);
  const desc = getTranslatedValue(productData?.description, i18n.language);

  // --- Yangi: inline (desktop) varianti uchun "show more/less"
  const contentRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    if (!contentRef.current) return;
    const el = contentRef.current;
    const check = () => {
      // scrollHeight > clientHeight bo‘lsa tugma ko‘rsatiladi
      setIsOverflowing(el.scrollHeight - 2 > el.clientHeight);
    };

    check();

    // resize observer bilan dinamik tekshirish
    const ro = new ResizeObserver(check);
    ro.observe(el);
    if (el.parentElement) ro.observe(el.parentElement);
    return () => ro.disconnect();
  }, [desc, variant]);

  if (variant === "inline") {
    return (
      <aside
        className={cn(
          "w-full bg-white border rounded-xl p-2 shadow-sm",
          className
        )}
      >
        <h2 className="text-xl font-semibold mb-1">{name}</h2>
        {lead ? <p className="text-sm text-muted-foreground mb-3">{lead}</p> : null}

        {/* Ko‘rinadigan zona: collapsed = ekranga sig‘adigancha, expanded = to‘liq */}
        <div className="relative">
          <div
            ref={contentRef}
            className={cn(
              "prose prose-sm max-w-none transition-[max-height] duration-200 ease-out overflow-hidden",
              // Ekranga sig‘sin: sticky panelda taxminiy bo‘shliqni hisobga olib  (100vh - ~240px)
              expanded ? "h-full" : "max-h-[calc(100vh-550px)]"
            )}
            // content HTML
            dangerouslySetInnerHTML={{ __html: desc || "" }}
          />

          {/* Pastdan fade — faqat overflow bo‘lsa va collapsed holatda */}
          {!expanded && isOverflowing && (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent rounded-b-xl" />
          )}
        </div>
        <div
          className="h-9 cursor-pointer text-blue-500 underline"
          onClick={() => setExpanded((v) => !v)}
        >
          {expanded ? (t("product.showLess") || "Yopish") : (t("product.showMore") || "Ko‘proq ko‘rsatish")}
        </div>
      </aside>
    );
  }

  // FULL (mobil) varianti — o‘zgarmagan
  return (
    <div className={cn("bg-primary w-full py-4 h-full", className)}>
      <div className="w-11/12 md:w-10/12 max-w-[1440px] mx-auto flex flex-col items-start">
        <h1 className="text-white text-2xl font-bold">{name}</h1>
        {lead ? <p className="w-full md:w-2/3 text-start text-white/95 pt-3">{lead}</p> : null}
        <div
          className="w-full pt-4 text-white prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: desc || "" }}
        />
      </div>
    </div>
  );
}
