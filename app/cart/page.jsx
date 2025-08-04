"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { useTranslation } from 'react-i18next';
import { useCartStore } from "@/store/useCartStore";
import { getTranslatedValue } from "@/lib/functions";

export default function Cart() {
  const { t, i18n } = useTranslation();
  const { items } = useCartStore(); // Assuming useCartStore is imported from your store
  const removeItem = (id) => {
    useCartStore.getState().removeItem(id);
  }

  const increment = (id) => {
    useCartStore.getState().increment(id);
  };

  const decrement = (id) => {
    useCartStore.getState().decrement(id);
  };
  return (
    <main className="pt-24 md:pt-32 w-11/12 mx-auto max-w-[1440px] space-y-4">
      <div className="flex justify-center items-center">
        <h1 className="text-center font-bold text-xl md:text-2xl">{t('cart.title')}</h1>
      </div>
      <Separator />

      {/* Mobile Layout */}
      <div className="block lg:hidden space-y-6">
        {/* Cart Products - Mobile */}
        <div className="rounded-xl bg-[#F9F9F9] p-4 md:p-6">
          <h2 className="text-lg font-semibold mb-4">{t('cart.yourOrder')}</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 shadow-sm"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold mb-1">PM86</h3>
                    <p className="text-red-500 font-bold text-sm mb-3">1 500 000 {t('common.currency')}</p>

                    <div className="w-full flex items-center gap-3 bg-black text-white px-3 py-2 rounded-xl mb-3">
                      <button className="w-full h-full text-lg font-bold">-</button>
                      <span className="text-sm font-semibold">1</span>
                      <button className="w-full h-full text-lg font-bold">+</button>
                    </div>

                    <button className="text-xs text-gray-500 hover:underline">
                      {t('cart.buttons.remove')}
                    </button>
                  </div>

                  <Image
                    src="/images/categoryItem1.png"
                    alt="Product"
                    width={100}
                    height={100}
                    className="object-contain ml-4"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary - Mobile */}
        <div className="bg-white rounded-xl p-4 md:p-6 space-y-4">
          <div className="text-sm flex justify-between text-muted-foreground">
            <span>{t('cart.summary.order')}</span>
            <span>4 500 000 {t('common.currency')}</span>
          </div>
          <div className="text-sm flex justify-between text-muted-foreground">
            <span>{t('cart.summary.bonus')}</span>
            <span>10 000 {t('common.currency')}</span>
          </div>
          <div className="text-sm flex justify-between text-muted-foreground pb-2 border-b">
            <span>{t('cart.summary.delivery')}</span>
            <span>30 000 {t('common.currency')}</span>
          </div>

          <div className="text-base flex justify-between font-semibold">
            <span>{t('cart.summary.total')}</span>
            <span>4 520 000 {t('common.currency')}</span>
          </div>

          <Link href="/confirm-order">
            <Button className="w-full bg-black text-white rounded-xl text-base py-6">
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
          {/* Left: Cart Products */}
          <ResizablePanel defaultSize={60} minSize={40} className="rounded-xl bg-[#F9F9F9] p-6">
            <h2 className="text-lg font-semibold mb-2">{t('cart.yourOrder')}</h2>
            <div className="scrollbar-custom overflow-y-auto max-h-[500px] space-y-4 pr-2">
              {items?.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl flex items-center justify-between p-4 shadow-sm"
                >
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold">{getTranslatedValue(item?.name, i18n.language)}</h3>
                    <p className="text-red-500 font-bold">1 500 000 {t('common.currency')}</p>

                    <div className="w-full flex items-center gap-4 bg-black text-white px-4 py-2 rounded-full">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => decrement(item?.id)}
                        className="text-xl px-2 text-white hover:bg-transparent hover:text-white"
                      >
                        -
                      </Button>
                      <span className="w-4 text-center text-lg font-semibold">{item?.count}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => increment(item?.id)}
                        className="text-xl px-2 text-white hover:bg-transparent hover:text-white"
                      >
                        +
                      </Button>                    </div>

                    <button onClick={() => removeItem(item?.id)} className=" cursor-pointer text-xs text-gray-500 hover:underline">
                      {t('cart.buttons.remove')}
                    </button>
                  </div>

                  <Image
                    src={item?.image[0] ? `https://q-bit.uz${item?.image[0]}` : '/placeholder.svg'}
                    alt="Product"
                    width={100}
                    height={100}
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </ResizablePanel>

          <ResizableHandle />

          {/* Right: Summary */}
          <ResizablePanel defaultSize={40} minSize={30} className="bg-white rounded-xl p-6 space-y-4">
            <div className="text-sm flex justify-between text-muted-foreground">
              <span>{t('cart.summary.order')}</span>
              <span>4 500 000 {t('common.currency')}</span>
            </div>
            <div className="text-sm flex justify-between text-muted-foreground">
              <span>{t('cart.summary.bonus')}</span>
              <span>10 000 {t('common.currency')}</span>
            </div>
            <div className="text-sm flex justify-between text-muted-foreground pb-2 border-b">
              <span>{t('cart.summary.delivery')}</span>
              <span>30 000 {t('common.currency')}</span>
            </div>

            <div className="text-base flex justify-between font-semibold">
              <span>{t('cart.summary.total')}</span>
              <span>4 520 000 {t('common.currency')}</span>
            </div>

            <Link href="/confirm-order">
              <Button className="w-full bg-black text-white rounded-xl text-base py-6">
                {t('cart.buttons.order')}
              </Button>
            </Link>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </main>
  );
}