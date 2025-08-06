"use client";

import CustomImage from "@/components/shared/customImage";
import { Button } from "@/components/ui/button";
import { getTranslatedValue } from "@/lib/functions";
import { useRouter } from "next/navigation";
import React from "react";
import { useTranslation } from "react-i18next";
import { useCartStore } from "@/store/useCartStore";
import { imageUrl } from "@/lib/utils";

export default function ProductItem({ item }) {
  const { i18n } = useTranslation();
  const router = useRouter();

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

  return (
    <div
      onClick={goToDetails}
      className="cursor-pointer bg-[#EBEBEB99] rounded-2xl p-4 flex gap-4"
    >
      <div className="flex flex-col justify-between gap-2 w-full min-h-[200px] p-2">
        <div className="space-y-1">
          <h1 className="text-base font-semibold">
            {getTranslatedValue(item?.name || "", i18n.language)}
          </h1>
          <p className="text-sm text-red-500">POS система</p>
          <p className="text-sm text-muted-foreground line-clamp-3">
            {getTranslatedValue(item?.ads_title || "", i18n.language)}
          </p>
        </div>

        {!cartItem ? (
          <Button
            variant="default"
            className="h-10 rounded-xl w-full"
            onClick={(e) => {
              e.stopPropagation();
              addProduct(item);
            }}
          >
            {item.price?item.price?.toLocaleString("ru-RU"):1000} сум
          </Button>
        ) : (
          <div
            onClick={(e) => e.stopPropagation()}
            className="h-10 flex items-center justify-between w-full bg-black text-white px-4 py-2 rounded-xl"
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={() => decrement(item.id)}
              className="text-xl px-2 text-white hover:bg-transparent hover:text-white"
            >
              −
            </Button>
            <span className="text-sm font-semibold">{cartItem.count}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => increment(item.id)}
                className="text-xl px-2 text-white hover:bg-transparent hover:text-white"
              >
                +
              </Button>
          </div>
        )}
      </div>

      <div className="relative w-full h-full rounded-lg overflow-hidden">
        <CustomImage
          src={
            item?.image?.length > 0
              ? `${imageUrl}${item?.image[0]}`
              : "/placeholder.svg"
          }
          alt="banner-img"
          fill
          loading="eager"
          className="object-cover w-full h-full"
          property="true"
        />
      </div>
    </div>
  );
}
