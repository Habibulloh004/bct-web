"use client"

import { Separator } from '@/components/ui/separator'
import React from 'react'
import CategoryItem from './categoryItem'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import ProductItem from './productItem'
import { useTranslation } from 'react-i18next'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'

export default function Discounts({ products }) {
  const productsData = products?.data
  const { t } = useTranslation();
  if (productsData?.length > 0) {
    return (
      <main className='space-y-4' >
        <h1 className='ml-4 md:ml-12 text-start font-bold text-2xl md:text-4xl'>{t("homePage.discountTitle")}</h1>
        {/* Grid version */}
        <div className="pt-5 flex flex-wrap justify-center gap-4">
          {productsData?.map((item, index) => (
            <div
              key={index}
              className="w-[calc(100%/2-1rem)] sm:w-[calc(100%/3-1rem)] md:w-[calc(100%/4-1rem)] xl:w-[calc(100%/5-1rem)] 2xl:w-[calc(100%/6-1rem)]"
            >
              <ProductItem item={item} />
            </div>
          ))}
        </div>

        {/* Carousel version */}
        {/* <Carousel className="relative w-full text-foreground mt-5">
          <div className="max-md:hidden pointer-events-none absolute left-0 top-0 h-full w-3 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
          <div className="max-md:hidden pointer-events-none absolute right-0 top-0 h-full w-3 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />
          <CarouselContent className="relative">
            {productsData?.slice()?.reverse()?.map((item, i) => {
              return (
                <CarouselItem
                  key={i}
                  className={`basis-[60%] sm:basis-[30%] md:basis-[25%] lg:basis-[15%] p-0 mx-2 ${i === 0 && "max-sm:ml-8 max-md:ml-12 ml-8"
                    }`}
                >
                  <ProductItem key={i} item={item} />
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel> */}
        {/* <div className='flex justify-center mt-5'>
          <Link className='hover:underline underline-offset-1font-medium text-md' href="/all-categories">
            Все категории
          </Link>
        </div> */}
      </main>
    )
  }

}
