"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import React, { useState, useRef } from "react";
import { useCartStore } from "@/store/useCartStore";
import { getTranslatedValue } from "@/lib/functions";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { getInitialsFromName, imageUrl } from "@/lib/utils";
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from "lucide-react";

export default function ProductHero({ item }) {
  const { t, i18n } = useTranslation();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastMousePosition, setLastMousePosition] = useState({ x: 0, y: 0 });
  const fullscreenRef = useRef(null);

  const addProduct = (product) => {
    useCartStore.getState().addItem(product);
  };

  const increment = (id) => {
    useCartStore.getState().increment(id);
  };

  const decrement = (id) => {
    useCartStore.getState().decrement(id);
  };

  const cartItem = useCartStore((state) =>
    state.items.find((cartItem) => cartItem.id == item?.id)
  );

  const images = item?.image || [];

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

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

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.5, 0.5));
  };

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
      
      setImagePosition(prev => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY
      }));
      
      setLastMousePosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  console.log("ProductHero item:", item);

  return (
    <>
      <main className="pb-4">
        <div className="max-w-[1440px] w-11/12 md:w-10/12 mx-auto flex flex-col-reverse lg:flex-row items-start justify-between gap-8">
          {/* Left content */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            <div className="max-md:hidden">
              <p className="text-sm text-gray-600">{getTranslatedValue(item?.category_name, i18n.language)}</p>
              <h1 className="text-2xl md:text-4xl font-bold">{getTranslatedValue(item?.name, i18n.language)}</h1>
            </div>

            {/* Quantity selector */}
            <div className="w-full flex flex-col max-md:flex-row max-md:items-center items-start justify-between gap-2">
              <div className="border max-md:w-full bg-white rounded-md flex items-center px-4 py-[6px] gap-4 md:min-w-[200px] justify-between">
                <button
                  disabled={!cartItem?.count}
                  onClick={() => decrement(item?.id)}
                  className="text-xl font-bold w-full disabled:opacity-50"
                >
                  −
                </button>
                <span className="text-lg font-semibold">{cartItem?.count || 0}</span>
                <button
                  onClick={() => cartItem?.count ? increment(item?.id) : addProduct(item)}
                  className="w-full text-xl font-bold"
                >
                  +
                </button>
              </div>
              <button
                className="max-md:w-full bg-primary line-clamp-1 text-white rounded-md h-11 px-4 py-2 gap-4 md:min-w-[200px]"
                onClick={() => addProduct(item)}
              >
                {t("product.addToCart")}
              </button>
              {/* Desktop-only check warranty button */}
              <Link href="/warranty-check" className="max-md:hidden max-md:w-full h-11 gap-4 min-w-[200px]">
                <Button className="bg-white text-black px-6 py-2 rounded-md border w-full h-11 hover:bg-white/50 cursor-pointer">
                  {t("product.checkWarranty")}
                </Button>
              </Link>
            </div>
          </div>

          {/* Right content - Image Gallery */}
          <div className="w-full lg:w-1/2 flex flex-col gap-3">
            {/* Main Image Display */}
            <div className="relative">
              {/* Navigation arrows - faqat ko'p rasm bo'lganda */}
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

              {/* Main Image */}
              <div
                className="relative w-full h-[200px] md:h-[280px] rounded-lg overflow-hidden cursor-zoom-in group"
                onClick={openFullscreen}
              >
                <Image
                  src={images[activeImageIndex] ? `${imageUrl}${images[activeImageIndex]}` : '/placeholder.svg'}
                  alt={`${getTranslatedValue(item?.name, i18n.language)} - view ${activeImageIndex + 1}`}
                  fill
                  priority
                  className="object-contain group-hover:scale-105 transition-transform duration-300"
                />
                {/* Zoom hint */}
                <div className="absolute top-3 right-3 bg-black/60 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-4 h-4" />
                </div>
              </div>

              {/* Image counter - faqat ko'p rasm bo'lganda */}
              {images.length > 1 && (
                <div className="absolute bottom-3 left-3 bg-black/70 text-white px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                  {activeImageIndex + 1} / {images.length}
                </div>
              )}
            </div>

            {/* Thumbnail Gallery - har doim ko'rsatish */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`relative min-w-[50px] w-[50px] h-[50px] rounded-md overflow-hidden border-2 transition-all flex-shrink-0 ${
                    index === activeImageIndex 
                      ? 'border-primary ring-2 ring-primary/20 shadow-md transform ' 
                      : 'border-gray-200 hover:border-gray-400 hover:shadow-sm opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={img ? `${imageUrl}${img}` : '/placeholder.svg'}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                  {/* Active indicator */}
                  {index === activeImageIndex && (
                    <div className="absolute inset-0 bg-primary/10 rounded-sm"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className='hidden w-full h-11 bg-black text-white items-center justify-center font-bold mt-6'>
          <h1 className=''>{getTranslatedValue(item?.category_name, i18n.language)} {getInitialsFromName(getTranslatedValue(item?.name, i18n.language))}</h1>
        </div>
      </main>

      {/* Fullscreen Image Modal */}
      {isFullscreen && (
        <div 
          className="z-[999] fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
          onClick={closeFullscreen}
        >
          {/* Close button */}
          <button
            onClick={closeFullscreen}
            className="absolute top-4 right-4 z-60 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Zoom controls */}
          <div className="absolute top-4 left-4 z-60 flex gap-2">
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

          {/* Navigation in fullscreen - faqat ko'p rasm bo'lganda */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-60 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-60 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Image counter in fullscreen - faqat ko'p rasm bo'lganda */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-60 bg-white/20 text-white px-4 py-2 rounded-full font-medium">
              {activeImageIndex + 1} / {images.length}
            </div>
          )}

          {/* Fullscreen Image */}
          <div 
            ref={fullscreenRef}
            className="relative max-w-full max-h-full overflow-hidden select-none"
            style={{
              transform: `scale(${zoomLevel}) translate(${imagePosition.x / zoomLevel}px, ${imagePosition.y / zoomLevel}px)`,
              transition: isDragging ? 'none' : 'transform 0.2s ease-out',
              cursor: zoomLevel > 1 ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in'
            }}
            onClick={(e) => e.stopPropagation()}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <Image
              src={images[activeImageIndex] ? `${imageUrl}${images[activeImageIndex]}` : '/placeholder.svg'}
              alt={`${getTranslatedValue(item?.name, i18n.language)} - fullscreen view ${activeImageIndex + 1}`}
              width={900}
              height={700}
              priority
              className="object-contain"
              style={{
                maxWidth: '90vw',
                maxHeight: '90vh',
                width: 'auto',
                height: 'auto'
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}