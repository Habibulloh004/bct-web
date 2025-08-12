"use client";

import CustomImage from "@/components/shared/customImage";
import { Button } from "@/components/ui/button";
import React from "react";
import { useCartStore } from "@/store/useCartStore";
import { getTranslatedValue } from "@/lib/functions";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import emblaCarouselAutoplay from "embla-carousel-autoplay";
import { getInitialsFromName, imageUrl } from "@/lib/utils";

export default function ProductHero({ item }) {
  const { t, i18n } = useTranslation();
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

  console.log("ProductHero item:", item);

  return (
    <main className="bg-[#F0F0F0] pt-10">
      <div className="max-w-[1440px] w-11/12 mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left content */}
        <div className="w-full flex flex-col md:items-start gap-4">
          <div>
            <p className="text-sm text-gray-600">{getTranslatedValue(item?.category_name, i18n.language)}</p>
            <h1 className="text-2xl md:text-4xl font-bold">{getTranslatedValue(item?.name, i18n.language)}</h1>
          </div>
          <Carousel
            paginate={"false"}
            plugins={[
              emblaCarouselAutoplay({
                delay: 10000,
              }),
            ]}
            opts={{
              loop: true, // Loopni qo'shish
              align: "center",
            }}
            className="md:hidden w-full text-secondary"
          >
            <CarouselContent className="w-full my-0 py-0 px-2 md:px-4 lg:px-8 lg:gap-8">
              {(item.image).map((item, i) => {
                return (
                  <CarouselItem key={i} className="">
                    <div
                      className="mt-1 relative"
                    >
                      <div className="relative mx-auto aspect-[4/3] rounded-[10px] overflow-hidden">
                        <CustomImage
                          src={`${imageUrl}${item}`}
                          alt={`banner-img`}
                          fill
                          loading="eager"
                          className="w-full mx-auto aspect-video mb-5 object-contain"
                          property={"true"}
                        />
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
          {/* Quantity selector */}
          <div className="w-full flex flex-col max-md:items-center items-start justify-between gap-4">
            <Link href="/warranty-check" className="max-md:w-full block lg:hidden h-11 gap-4 min-w-[200px]">
              <Button className="bg-white text-black px-6 py-2 rounded-md border w-full h-11 hover:bg-white/50 cursor-pointer">
                {t("product.checkWarranty")}
              </Button>
            </Link>
            <div className="max-md:w-full bg-white rounded-md flex items-center px-4 py-2 gap-4 min-w-[200px] justify-between">
              <button
                disabled={!cartItem?.count}
                onClick={() => decrement(item?.id)}
                className="text-xl font-bold w-full"
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
            <Button
              className="max-md:w-full bg-black text-white rounded-md h-11 px-4 py-2 gap-4 min-w-[200px]"
              onClick={() => addProduct(item)}
            >
              {t("product.addToCart")}

            </Button>
            {/* Mobile-only check warranty button */}

          </div>
        </div>

        {/* Center check warranty button (desktop only) */}

        {/* Right images */}
        <div className="w-full hidden md:flex gap-2">
          {(item.image)?.slice(0, 2)?.map(
            (src, index) => (
              <div
                key={index}
                className="relative w-[240px] h-[240px] rounded-md"
              >
                <CustomImage
                  src={src ? imageUrl + src : `/placeholder.svg`}
                  alt={`product-view-${index}`}
                  fill
                  loading="eager"
                  className="object-contain"
                  property={"true"}
                />
              </div>
            )
          )}
        </div>
      </div>
      <div className='w-full h-11 bg-black text-white flex items-center justify-center font-bold mt-4'>
        <h1 className=''>{getTranslatedValue(item?.category_name, i18n.language)} {getInitialsFromName(getTranslatedValue(item?.name, i18n.language))} </h1>
      </div>
    </main>
  );
}
