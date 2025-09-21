"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import React, { useState, useRef } from "react";
import { useCartStore } from "@/store/useCartStore";
import { getTranslatedValue } from "@/lib/functions";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { formatNumber, getInitialsFromName, imageUrl } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Minus, Plus, X, ZoomIn, ZoomOut } from "lucide-react";
import ProductFeatures from "./productFeatures";
import { useCurrency } from "@/components/context/CurrencyContext";

export default function ProductHero({ item, showInlineFeatures }) {
  const { t, i18n } = useTranslation();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePosition, setLastMousePosition] = useState({ x: 0, y: 0 });
  const fullscreenRef = useRef(null);

  const addProduct = (product) => useCartStore.getState().addItem(product);
  const increment = (id) => useCartStore.getState().increment(id);
  const decrement = (id) => useCartStore.getState().decrement(id);
  const cartItem = useCartStore((s) => s.items.find((ci) => ci.id == item?.id));

  const images = item?.image || [];
  const nextImage = () => setActiveImageIndex((p) => (p + 1) % images.length);
  const prevImage = () => setActiveImageIndex((p) => (p - 1 + images.length) % images.length);

  const openFullscreen = () => {
    setIsFullscreen(true);
    setZoomLevel(1);
    setImagePosition({ x: 0, y: 0 });
  };
  const closeFullscreen = () => {
    setIsFullscreen(false);
    setZoomLevel(1);
    setImagePosition({ x: 0, y: 0 });
  };
  const handleZoomIn = () => setZoomLevel((p) => Math.min(p + 0.5, 3));
  const handleZoomOut = () => setZoomLevel((p) => Math.max(p - 0.5, 0.5));
  const handleMouseDown = (e) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      setLastMousePosition({ x: e.clientX, y: e.clientY });
    }
  };
  const handleMouseMove = (e) => {
    if (isDragging && zoomLevel > 1) {
      const deltaX = e.clientX - lastMousePosition.x;
      const deltaY = e.clientY - lastMousePosition.y;
      setImagePosition((prev) => ({ x: prev.x + deltaX, y: prev.y + deltaY }));
      setLastMousePosition({ x: e.clientX, y: e.clientY });
    }
  };
  const handleMouseUp = () => setIsDragging(false);
  const { convert } = useCurrency();
  return (
    <>
      <section className="pb-2">
        <div className="max-w-[1440px] w-11/12 md:w-10/12 mx-auto flex flex-col lg:flex-row lg:items-start justify-between gap-4">
          <div className="order-1 w-full lg:w-1/2 flex flex-col gap-3">
            <div className="relative">
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all backdrop-blur-sm"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all backdrop-blur-sm"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}

              <div
                className="relative w-full h-[220px] md:h-[320px] lg:h-[420px] rounded-lg overflow-hidden cursor-zoom-in group bg-white"
                onClick={openFullscreen}
              >
                <Image
                  src={images[activeImageIndex] ? `${imageUrl}${images[activeImageIndex]}` : "/placeholder.svg"}
                  alt={`${getTranslatedValue(item?.name, i18n.language)} - view ${activeImageIndex + 1}`}
                  fill
                  priority
                  className="object-contain group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 bg-black/60 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-4 h-4" />
                </div>
              </div>

              {images.length > 1 && (
                <div className="absolute bottom-3 left-3 bg-black/70 text-white px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                  {activeImageIndex + 1} / {images.length}
                </div>
              )}
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`relative min-w-[56px] w-[56px] h-[56px] rounded-md overflow-hidden border-2 transition-all flex-shrink-0 ${index === activeImageIndex
                    ? "border-primary ring-2 ring-primary/20 shadow-md"
                    : "border-gray-200 hover:border-gray-400 hover:shadow-sm opacity-80 hover:opacity-100"
                    }`}
                >
                  <Image
                    src={img ? `${imageUrl}${img}` : "/placeholder.svg"}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
            <h1 className="md:hidden text-black/40 text-2xl md:text-4xl font-bold">
              {item?.price ? formatNumber(convert(item?.price)) : 1000} сум
            </h1>
            <div className="lg:hidden flex flex-wrap items-center gap-3 pt-3">
              <div className="max-sm:w-full inline-flex items-center gap-1">
                <Button
                  variant="outline"
                  className="h-11 w-20 sm:w-11 text-xl"
                  disabled={!cartItem?.count}
                  onClick={() => decrement(item?.id)}
                  aria-label="decrement"
                >
                  −
                </Button>
                <button
                  variant="secondary"
                  className="h-11 max-sm:w-full min-w-[56px] pointer-events-none select-none"
                >
                  {cartItem?.count || 0}
                </button>
                <Button
                  variant="outline"
                  className="h-11 w-20 sm:w-11 text-xl"
                  onClick={() => (cartItem?.count ? increment(item?.id) : addProduct(item))}
                  aria-label="increment"
                >
                  +
                </Button>
              </div>

              <Button
                className="max-sm:w-full h-11 px-6 bg-primary text-white"
                onClick={() => addProduct(item)}
              >
                {t("product.addToCart")}
              </Button>

              <Link href="/warranty-check" className="max-sm:w-full h-11">
                <Button className="max-sm:w-full h-11 px-6 bg-white text-black border hover:bg-white/50">
                  {t("product.checkWarranty")}
                </Button>
              </Link>
            </div>
          </div>

          <div className="order-2 w-full lg:w-1/2 flex flex-col gap-4 lg:sticky lg:top-24">
            <div className="max-md:hidden">
              <p className="text-sm text-muted-foreground">
                {getTranslatedValue(item?.category_name, i18n.language)}
              </p>
              <h1 className="text-2xl md:text-4xl font-bold">
                {getTranslatedValue(item?.name, i18n.language)}
              </h1>
              <h1 className="text-black/40 text-2xl md:text-4xl font-bold">
                {item?.price ? formatNumber(convert(item?.price)) : 1000} сум
              </h1>
            </div>

            <div className="hidden lg:inline-flex gap-3 flex-wrap items-center">
              <div className="inline-flex items-center gap-1">
                <Button
                  variant="outline"
                  className="h-11 w-11 text-xl"
                  disabled={!cartItem?.count}
                  onClick={() => decrement(item?.id)}
                  aria-label="decrement"
                >
                  <Minus />
                </Button>
                <Button
                  variant="secondary"
                  className="h-11 min-w-[56px] pointer-events-none select-none"
                >
                  {cartItem?.count || 0}
                </Button>
                <Button
                  variant="outline"
                  className="h-11 w-11 text-xl"
                  onClick={() => (cartItem?.count ? increment(item?.id) : addProduct(item))}
                  aria-label="increment"
                >
                  <Plus />
                </Button>
              </div>

              <Button
                className="h-11 px-6 bg-primary text-white"
                onClick={() => addProduct(item)}
              >
                {t("product.addToCart")}
              </Button>

              <Link href="/warranty-check" className="h-11">
                <Button className="h-11 px-6 bg-white text-black border hover:bg-white/50">
                  {t("product.checkWarranty")}
                </Button>
              </Link>
            </div>

            {showInlineFeatures && (
              <div className="hidden lg:block">
                <ProductFeatures productData={item} variant="inline" />
              </div>
            )}
          </div>

        </div>

        <div className="hidden w-full h-11 bg-black text-white items-center justify-center font-bold mt-6">
          <h1>
            {getTranslatedValue(item?.category_name, i18n.language)}{" "}
            {getInitialsFromName(getTranslatedValue(item?.name, i18n.language))}
          </h1>
        </div>
      </section>

      {isFullscreen && (
        <div
          className="z-[999] fixed inset-0 bg-black/95 flex items-center justify-center"
          onClick={closeFullscreen}
        >
          <button
            onClick={closeFullscreen}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="absolute top-4 left-4 flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleZoomOut();
              }}
              className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all disabled:opacity-50"
              disabled={zoomLevel <= 0.5}
            >
              <ZoomOut className="w-5 h-5" />
            </button>
            <span className="bg-white/20 text-white px-3 py-2 rounded-full text-sm font-medium">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleZoomIn();
              }}
              className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all disabled:opacity-50"
              disabled={zoomLevel >= 3}
            >
              <ZoomIn className="w-5 h-5" />
            </button>
          </div>

          <div
            ref={fullscreenRef}
            className="relative max-w-full max-h-full overflow-hidden select-none"
            style={{
              transform: `scale(${zoomLevel}) translate(${imagePosition.x / zoomLevel}px, ${imagePosition.y / zoomLevel}px)`,
              transition: isDragging ? "none" : "transform 0.2s ease-out",
              cursor: zoomLevel > 1 ? (isDragging ? "grabbing" : "grab") : "zoom-in",
            }}
            onClick={(e) => e.stopPropagation()}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <Image
              src={images[activeImageIndex] ? `${imageUrl}${images[activeImageIndex]}` : "/placeholder.svg"}
              alt={`${getTranslatedValue(item?.name, i18n.language)} - fullscreen view ${activeImageIndex + 1}`}
              width={900}
              height={700}
              priority
              className="object-contain"
              style={{ maxWidth: "90vw", maxHeight: "90vh", width: "auto", height: "auto" }}
            />
          </div>
        </div>
      )}
    </>
  );
}