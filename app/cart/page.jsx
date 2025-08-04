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

export default function Cart() {
  return (
    <main className="pt-32 w-11/12 mx-auto max-w-[1440px] space-y-4">
      <div className="flex justify-center items-center">
        <h1 className="text-center font-bold text-2xl">Корзина</h1>
      </div>
      <Separator />

      <ResizablePanelGroup
        direction="horizontal"
        className="mt-10 w-full gap-6"
      >
        {/* Left: Cart Products */}
        <ResizablePanel defaultSize={60} minSize={40} className="rounded-xl bg-[#F9F9F9] p-6">
          <h2 className="text-lg font-semibold mb-2">Ваш заказ</h2>
          <div className="scrollbar-custom overflow-y-auto max-h-[500px] space-y-4 pr-2">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl flex items-center justify-between p-4 shadow-sm"
              >
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold">PM86</h3>
                  <p className="text-red-500 font-bold">1 500 000 сум</p>

                  <div className="flex items-center gap-4 bg-black text-white px-4 py-2 rounded-full w-fit">
                    <button className="text-xl font-bold">-</button>
                    <span className="text-lg font-semibold">1</span>
                    <button className="text-xl font-bold">+</button>
                  </div>

                  <button className="text-xs text-gray-500 hover:underline">
                    Убрать
                  </button>
                </div>

                <Image
                  src="/images/categoryItem1.png"
                  alt="Product"
                  width={80}
                  height={80}
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
            <span>Заказ</span>
            <span>4 500 000 сум</span>
          </div>
          <div className="text-sm flex justify-between text-muted-foreground">
            <span>Бонус</span>
            <span>10 000 сум</span>
          </div>
          <div className="text-sm flex justify-between text-muted-foreground pb-2 border-b">
            <span>Доставка</span>
            <span>30 000 сум</span>
          </div>

          <div className="text-base flex justify-between font-semibold">
            <span>Общая сумма</span>
            <span>4 520 000 сум</span>
          </div>

          <Link href="/confirm-order">
            <Button className="w-full bg-black text-white rounded-xl text-base py-6">
              Заказать
            </Button>
          </Link>
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
}
