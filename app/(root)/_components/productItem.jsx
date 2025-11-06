"use client";

import CustomImage from "@/components/shared/customImage";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { convertPriceToUzs, convertUsdtoUzb, getTranslatedValue } from "@/lib/functions";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useCartStore } from "@/store/useCartStore";
import { extractProductImages, formatNumber } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";

export default function ProductItem({currency, item }) {
  const { i18n } = useTranslation();
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const addProduct = (product) => {
    useCartStore.getState().addItem(product);
  };
  const increment = (id) => {
    useCartStore.getState().increment(id);
  };
  const decrement = (id) => {
    useCartStore.getState().decrement(id);
  };

  const allItems = useCartStore((state) => state.items);
  const cartItem = allItems?.find((cartItem) => cartItem.id == item.id);

  const productImages = extractProductImages(item);
  const hasMultipleImages = productImages.length > 1;

  const goToDetails = () => {
    router.push(`/${item?.category_id}/${item?.id}`);
  };

  const autoplayPlugin = React.useRef(
    Autoplay({
      delay: 2000,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
    })
  );

  const handleMouseEnter = () => {
    if (productImages.length > 1) setIsHovered(true);
  };
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <div
      onClick={goToDetails}
      className="h-full flex-col-reverse cursor-pointer rounded-2xl p-2 flex gap-4 transition-all duration-300
                 bg-[var(--pr-card)] hover:bg-[var(--pr-card)] hover:shadow-lg"
    >
      <div className="flex flex-col justify-between gap-2 w-full h-full p-2">
        <div className="space-y-1">
          <h1 className="text-sm sm:text-base font-bold text-[var(--pr-card-text)] line-clamp-2">
            {getTranslatedValue(item?.name || "", i18n.language)}
          </h1>
          <p className="text-[12px] sm:text-sm text-[var(--pr-card-text)] font-semibold line-clamp-2">
            {getTranslatedValue(item?.ads_title || "", i18n.language)}
          </p>
        </div>

        {!cartItem ? (
          <Button
            variant="default"
            className="bg-[var(--pr-card-btn)] text-primary font-bold hover:bg-[var(--pr-card-btn)] hover:opacity-85 h-9 rounded-xl w-full transition-all duration-200 hover:scale-105 max-sm:text-[12px]"
            onClick={(e) => {
              e.stopPropagation();
              addProduct(item);
            }}
          >
            {item?.price ? formatNumber(convertUsdtoUzb(item?.price, currency)) : 1000} сум
          </Button>
        ) : (
          <div
            onClick={(e) => e.stopPropagation()}
            className="h-9 font-bold flex items-center justify-between w-full bg-[var(--pr-card-btn)] text-[var(--pr-card-text)] rounded-xl transition-all duration-200"
          >
            <button
              onClick={() => decrement(item.id)}
              className="w-full text-xl px-2 transition-all duration-200 rounded-lg"
            >
              −
            </button>
            <span className="text-sm font-semibold">{cartItem.count}</span>
            <button
              onClick={() => increment(item.id)}
              className="w-full text-xl px-2 transition-all duration-200 rounded-lg"
            >
              +
            </button>
          </div>
        )}
      </div>

      <div
        className="relative w-full h-full rounded-lg group"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {productImages.length > 0 ? (
          <Carousel
            plugins={isHovered && hasMultipleImages ? [autoplayPlugin.current] : []}
            className="w-full h-full"
            opts={{ align: "center", loop: true }}
          >
            <CarouselContent className="w-full h-full">
              {productImages.map((img, index) => (
                <CarouselItem
                  key={index}
                  className={`${index === 0 ? "pl-8" : "pl-4"} basis-full w-full h-full`}
                >
                  <div className="relative w-full h-full overflow-hidden rounded-md">
                    <CustomImage
                      src={img ?? "/placeholder.svg"}
                      alt={`Product image ${index + 1}`}
                      width={100}
                      height={100}
                      loading="eager"
                      className="max-sm:aspect-square max-sm:h-[100px] h-28 md:h-34 xl:h-36 aspect-video object-contain w-full transition-transform duration-300 group-hover:scale-105"
                      property="true"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        ) : null}

        {hasMultipleImages && (
          <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-1.5 shadow-sm">
            <div className="flex space-x-0.5">
              <div className="w-1 h-1 bg-gray-600 rounded-full" />
              <div className="w-1 h-1 bg-gray-400 rounded-full" />
              <div className="w-1 h-1 bg-gray-400 rounded-full" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
