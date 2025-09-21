"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import React, { useMemo } from "react";
import Link from "next/link";
import { useTranslation } from 'react-i18next';
import { useCartStore } from "@/store/useCartStore";
import { getTranslatedValue } from "@/lib/functions";
import { formatNumber, imageUrl } from "@/lib/utils";
import CustomImage from "@/components/shared/customImage";

export default function Cart() {
  const { t, i18n } = useTranslation();
  const { items } = useCartStore();
  const removeItem = (id) => {
    useCartStore.getState().removeItem(id);
  };

  const increment = (id) => {
    useCartStore.getState().increment(id);
  };

  const decrement = (id) => {
    useCartStore.getState().decrement(id);
  };

  const getTotalPrice = useCartStore((state) => state.getTotalPrice);

  const total = useMemo(() => getTotalPrice(), [items, getTotalPrice]);

  return (
    <main className=" w-11/12 xl:w-9/12 2xl:w-7/12 mx-auto max-w-[1440px] space-y-4">
      <div className="flex justify-center items-center">
        <h1 className="text-center font-bold text-xl md:text-2xl">{t('cart.title')}</h1>
      </div>
      <Separator />

      {/* Mobile Layout */}
      <div className="block lg:hidden space-y-6">
        <div className="rounded-xl bg-[#F9F9F9] p-4 md:p-6">
          <h2 className="text-lg font-semibold mb-4">{t('cart.yourOrder')}</h2>
          <div className="space-y-4">
            {items?.length > 0 ? (
              <>
                {items?.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-4"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="relative w-32 h-32 shrink-0 rounded-md overflow-hidden">
                        <CustomImage
                          src={item?.image[0] ? `${imageUrl}${item?.image[0]}` : '/placeholder.svg'}
                          alt="Product"
                          fill={true}
                          className="object-contain"
                        />
                      </div>
                      <div className="w-full flex justify-between items-center gap-2 mb-2">
                        <h3 className="text-sm font-semibold">
                          {getTranslatedValue(item?.name, i18n.language)}
                        </h3>
                        <p className="text-primary font-bold text-sm">
                          {formatNumber(item?.price)} {t('common.currency')}
                        </p>
                      </div>
                      <div className="w-full flex items-center justify-center gap-4 bg-primary text-white px-4 py-2 rounded-xl">
                        <button
                          onClick={() => decrement(item?.id)}
                          className="w-full text-xl px-2 text-white hover:bg-transparent hover:text-white"
                        >
                          -
                        </button>
                        <span className="min-w-4 text-center text-lg font-semibold">
                          {item?.count}
                        </span>
                        <button
                          onClick={() => increment(item?.id)}
                          className="w-full text-xl px-2 text-white hover:bg-transparent hover:text-white"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item?.id)}
                        className="pt-2 cursor-pointer text-xs text-gray-500 hover:underline"
                      >
                        {t('cart.buttons.remove')}
                      </button>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="text-center text-sm text-gray-500">
                {t('confirmOrder.noItems') || 'Корзина пуста'}
              </div>
            )}
          </div>
        </div>

        {/* Summary - Mobile */}
        <div className="bg-white rounded-xl p-4 md:p-6 space-y-4">
          <div className="text-sm flex justify-between text-muted-foreground">
            <span>{t('cart.summary.order')}</span>
            <span>{formatNumber(total)} {t('common.currency')}</span>
          </div>
          <div className="text-sm flex justify-between text-muted-foreground">
            <span>{t('cart.summary.bonus')}</span>
            <span>0 {t('common.currency')}</span>
          </div>
          <div className="text-sm flex justify-between text-muted-foreground pb-2 border-b">
            <span>{t('cart.summary.delivery')}</span>
            <span>0 {t('common.currency')}</span>
          </div>

          <div className="text-base flex justify-between font-semibold">
            <span>{t('cart.summary.total')}</span>
            <span>{formatNumber(total)} {t('common.currency')}</span>
          </div>
          <Link href="/confirm-order">
            <Button className="w-full bg-primary text-white rounded-xl text-base py-6">
              {t('cart.buttons.order')}
            </Button>
          </Link>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <ResizablePanelGroup
          direction="horizontal"
          className="mt-10 w-full gap-6"
        >
          {/* Cart Items */}
          <ResizablePanel defaultSize={60} minSize={40} className="rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-2">{t('cart.yourOrder')}</h2>
            <div className="scrollbar-custom overflow-y-auto max-h-[500px] space-y-4 pr-2">
              {items?.length > 0 ? (
                <>
                  {items?.map((item, index) => (
                    <div
                      key={index}
                      className="border bg-white rounded-xl flex items-center justify-between p-4"
                    >
                      <div className="w-full flex justify-center items-center flex-col  space-y-2 max-w-[70%]">
                        <div className="w-full flex justify-between items-center gap-2">
                          <h3 className="text-sm font-semibold">
                            {getTranslatedValue(item?.name, i18n.language)}
                          </h3>
                          <p className="text-primary font-bold">
                            {formatNumber(item?.price)} {t('common.currency')}
                          </p>

                        </div>
                        <div className="w-full flex items-center justify-center gap-4 bg-primary text-white px-4 py-2 rounded-xl">
                          <button
                            onClick={() => decrement(item?.id)}
                            className="w-full text-xl px-2 text-white hover:bg-transparent hover:text-white"
                          >
                            -
                          </button>
                          <span className="min-w-4 text-center text-lg font-semibold">
                            {item?.count}
                          </span>
                          <button
                            onClick={() => increment(item?.id)}
                            className="w-full text-xl px-2 text-white hover:bg-transparent hover:text-white"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item?.id)}
                          className="cursor-pointer text-xs text-gray-500 hover:underline"
                        >
                          {t('cart.buttons.remove')}
                        </button>
                      </div>
                      <div className="relative w-32 h-32 shrink-0 rounded-md overflow-hidden">
                        <CustomImage
                          src={item?.image[0] ? `${imageUrl}${item?.image[0]}` : '/placeholder.svg'}
                          alt="Product"
                          fill={true}
                          className="object-contain"
                        />
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="text-center text-sm text-gray-500">
                  {t('confirmOrder.noItems') || 'Корзина пуста'}
                </div>
              )}
            </div>
          </ResizablePanel>

          <ResizableHandle />

          {/* Summary */}
          <ResizablePanel defaultSize={40} minSize={30} className="">
            <div className="bg-white rounded-xl p-6 space-y-4 border">
              <div className="text-sm flex justify-between text-muted-foreground">
                <span>{t('cart.summary.order')}</span>
                <span>{formatNumber(total)} {t('common.currency')}</span>
              </div>
              <div className="text-sm flex justify-between text-muted-foreground">
                <span>{t('cart.summary.bonus')}</span>
                <span>0 {t('common.currency')}</span>
              </div>
              <div className="text-sm flex justify-between text-muted-foreground pb-2 border-b">
                <span>{t('cart.summary.delivery')}</span>
                <span>0 {t('common.currency')}</span>
              </div>

              <div className="text-base flex justify-between font-semibold">
                <span>{t('cart.summary.total')}</span>
                <span>{formatNumber(total)} {t('common.currency')}</span>
              </div>

              <Link href="/confirm-order">
                <Button className="w-full bg-primary text-white rounded-xl text-base py-6">
                  {t('cart.buttons.order')}
                </Button>
              </Link>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </main>
  );
}