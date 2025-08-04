"use client";

import CustomImage from "@/components/shared/customImage";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

export default function ProductHero() {
  const [count, setCount] = useState(5);

  return (
    <main className="bg-[#F0F0F0] pt-10">
      <div className="max-w-[1440px] w-11/12 mx-auto flex flex-col md:flex-row items-center justify-between gap-8">  
        {/* Left content */}
        <div className="flex flex-col items-start gap-4">
          <div>
            <p className="text-sm text-gray-600">Мобильный компьютер</p>
            <h1 className="text-4xl font-bold">PM86</h1>
          </div>

          {/* Quantity selector */}
          <div className="bg-white rounded-md flex items-center px-4 py-2 gap-4 min-w-[200px] justify-between">
            <button
              onClick={() => setCount((prev) => Math.max(prev - 1, 1))}
              className="text-xl font-bold w-full"
            >
              -
            </button>
            <span className="text-lg font-semibold">{count}</span>
            <button
              onClick={() => setCount((prev) => prev + 1)}
              className="w-full text-xl font-bold"
            >
              +
            </button>
          </div>

          {/* Add to cart button */}
          <Button className="bg-black text-white px-6 py-2 rounded-md h-11">
            Добавить в корзину
          </Button>
        </div>

        {/* Center check warranty button */}
        <div className="hidden md:block">
          <Button className="bg-white text-black px-6 py-2 rounded-md border h-11">
            Проверить гарантию
          </Button>
        </div>

        {/* Right images */}
        <div className="flex gap-6">
          {[1, 2].map((_, index) => (
            <div
              key={index}
              className="relative w-[240px] min-h-[240px] aspect-[2/3] rounded-md overflow-hidden"
            >
              <CustomImage
                src="/images/categoryItem1.png"
                alt={`product-view-${index}`}
                fill
                loading="eager"
                className="object-contain"
                property={"true"}
              />
            </div>
          ))}
        </div>

        {/* Mobile-only check warranty button */}
        <div className="block md:hidden mt-6">
          <Button className="bg-white text-black px-6 py-2 rounded-md border w-full h-11">
            Проверить гарантию
          </Button>
        </div>
      </div>
    </main>
  );
}
