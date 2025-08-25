"use client"

import React from "react"
import { useTranslation } from "react-i18next"
import ManufactureItem from "./manufactureItem"
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

export default function Manufacture({ categories }) {
  const { t } = useTranslation();
  if (!categories?.length) return null;

  return (
    <main className="space-y-4">
      <h1 className="ml-4 md:ml-12 text-start font-bold text-4xl">
        {t("homePage.manufacturerTitle")}
      </h1>

      {/* GRID: responsive ustunlar soni + markazlash */}
      {/* <div
        className="
          pt-5 grid gap-4 justify-items-center
          grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
        "
      >
        {categories.slice().reverse().map((item, index) => (
          <ManufactureItem key={index} item={item} />
        ))}
      </div> */}
      {/* Carousel version */}
      <Carousel className="relative w-full text-foreground mt-5">
        <div className="max-md:hidden pointer-events-none absolute left-0 top-0 h-full w-3 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
        <div className="max-md:hidden pointer-events-none absolute right-0 top-0 h-full w-3 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />
        <CarouselContent className="relative">
          {/* Chapdagi gradient shadow */}

          {/* O‘ngdagi gradient shadow */}

          {categories?.slice()?.reverse()?.map((item, i) => {
            return (
              <CarouselItem
                key={i}
                className={`basis-[60%] sm:basis-[30%] md:basis-[25%] lg:basis-[15%] p-0 mx-2 ${i === 0 && "max-sm:ml-8 max-md:ml-12 ml-8"
                  }`}
              >
                <ManufactureItem key={i} item={item} />

              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </main>
  );
}
