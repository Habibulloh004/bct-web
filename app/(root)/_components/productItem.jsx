"use client";

import CustomImage from "@/components/shared/customImage";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { getTranslatedValue } from "@/lib/functions";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useCartStore } from "@/store/useCartStore";
import { formatNumber, imageUrl } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";

export default function ProductItem({ item }) {
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

  const goToDetails = () => {
    router.push(`/${item?.category_id}/${item?.id}`);
  };

  // Autoplay plugin - only when hovered
  const autoplayPlugin = React.useRef(
    Autoplay({
      delay: 2000,
      stopOnInteraction: false,
      stopOnMouseEnter: false
    })
  );

  const handleMouseEnter = () => {
    if (item?.image?.length > 1) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const hasMultipleImages = item?.image?.length > 1;

  return (
    <div
      onClick={goToDetails}
      className="flex-col-reverse cursor-pointer bg-[#cccbca] rounded-2xl p-2 flex gap-4 hover:shadow-lg transition-all duration-300 hover:bg-[#cccbca]"
    >
      <div className="flex flex-col justify-between gap-2 w-full h-full p-2">
        <div className="space-y-1">
          <h1 className="text-base font-bold text-primary">
            {getTranslatedValue(item?.name || "", i18n.language)}
          </h1>
          <p className="text-sm text-primary font-semibold line-clamp-2">
            {getTranslatedValue(item?.ads_title || "", i18n.language)}
          </p>
          {/* <div
            className="w-full pt-4 text-white uppercase"
            dangerouslySetInnerHTML={{ __html: getTranslatedValue(productData?.description, i18n.language) }}
          /> */}
        </div>

        {!cartItem ? (
          <Button
            variant="default"
            className="bg-white text-primary font-bold hover:bg-white/95 h-9 rounded-xl w-full transition-all duration-200 hover:scale-105"
            onClick={(e) => {
              e.stopPropagation();
              addProduct(item);
            }}
          >
            {item.price ? formatNumber(item.price) : 1000} сум
          </Button>
        ) : (
          <div
            onClick={(e) => e.stopPropagation()}
            className="h-9 font-bold flex items-center justify-between w-full bg-white text-black rounded-xl transition-all duration-200"
          >
            <button
              variant="ghost"
              size="sm"
              onClick={() => decrement(item.id)}
              className="w-full text-xl px-2 textt-primary transition-all duration-200 rounded-lg"
            >
              −
            </button>
            <span className="text-sm font-semibold">{cartItem.count}</span>
            <button
              variant="ghost"
              size="sm"
              onClick={() => increment(item.id)}
              className="w-full text-xl px-2 textt-primary transition-all duration-200 rounded-lg"
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
        {hasMultipleImages ? (
          <Carousel
            plugins={isHovered ? [autoplayPlugin.current] : []}
            className="w-full h-full"
            opts={{
              align: "center",
              loop: true,
            }}
          >
            <CarouselContent className="w-full h-full">
              {item.image.map((img, index) => (
                <CarouselItem key={index} className="w-full h-full">
                  <div className="relative w-full h-full overflow-hidden rounded-md">
                    <CustomImage
                      src={`${imageUrl}${img}`}
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
        ) : (
          <Carousel
            plugins={isHovered ? [autoplayPlugin.current] : []}
            className="w-full h-full"
            opts={{
              align: "center",
              loop: true,
            }}
          >
            <CarouselContent className="w-full h-full">
              {item.image.map((img, index) => (
                <CarouselItem key={index} className="w-full h-full">
                  <div className="relative w-full h-full overflow-hidden rounded-md">
                    <CustomImage
                      src={`${imageUrl}${img}`}
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
        )}

        {/* Multiple images indicator */}
        {hasMultipleImages && (
          <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-1.5 shadow-sm">
            <div className="flex space-x-0.5">
              <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}