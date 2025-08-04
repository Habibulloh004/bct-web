"use client";

import CustomImage from "@/components/shared/customImage";
import { Button } from "@/components/ui/button";
import React from "react";
import { useCartStore } from "@/store/useCartStore";
import { getTranslatedValue } from "@/lib/functions";
import { useTranslation } from "react-i18next";

export default function ProductHero({ item }) {
  const { i18n } = useTranslation();
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
        <div className="flex flex-col items-start gap-4">
          <div>
            <p className="text-sm text-gray-600">Мобильный компьютер</p>
            <h1 className="text-4xl font-bold">{getTranslatedValue(item?.name, i18n.language)}</h1>
          </div>

          {/* Quantity selector */}
          {cartItem ? (
            <div className="bg-white rounded-md flex items-center px-4 py-2 gap-4 min-w-[200px] justify-between">
              <button
                onClick={() => decrement(item?.id)}
                className="text-xl font-bold w-full"
              >
                −
              </button>
              <span className="text-lg font-semibold">{cartItem.count}</span>
              <button
                onClick={() => increment(item?.id)}
                className="w-full text-xl font-bold"
              >
                +
              </button>
            </div>
          ) : (
            <Button
              className="bg-black text-white px-6 py-2 rounded-md h-11"
              onClick={() => addProduct(item)}
            >
              Добавить в корзину
            </Button>
          )}
        </div>

        {/* Center check warranty button (desktop only) */}
        <div className="hidden lg:block">
          <Button className="bg-white text-black px-6 py-2 rounded-md border h-11 hover:bg-transparent cursor-pointer">
            Проверить гарантию
          </Button>
        </div>

        {/* Right images */}
        <div className="flex gap-2">
          {(item.image).map(
            (src, index) => (
              <div
                key={index}
                className="relative w-[240px] min-h-[240px] aspect-[2/3] rounded-md"
              >
                <CustomImage
                  src={src ? "https://q-bit.uz"+ src : `/placeholder.svg`}
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
