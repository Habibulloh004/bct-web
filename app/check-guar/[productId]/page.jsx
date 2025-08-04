"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function WarrantyCheck() {
  return (
    <div className="pt-32 mx-auto max-w-5xl w-11/12 flex flex-col md:flex-row gap-6">
      {/* Left column */}
      <div className="flex-1 space-y-4">
        {/* Warranty check form */}
        <div className="border rounded-lg p-4 space-y-3">
          <h2 className="text-lg font-semibold">Проверка гарантии</h2>
          <Input placeholder="Серийный номер" />
          <Button className="w-full bg-black text-white">Проверить</Button>
        </div>

        {/* Customer details */}
        <div className="border rounded-lg p-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Покупатель:</span>
            <span className="font-bold">Азиз</span>
          </div>
          <div className="flex justify-between">
            <span>Дата покупки:</span>
            <span className="font-bold">07.07.2025</span>
          </div>
          <div className="flex justify-between">
            <span>Товар:</span>
            <span className="font-bold">Мобильный т. PM68</span>
          </div>
          <div className="flex justify-between">
            <span>Гарантия:</span>
            <span className="font-bold">3 года</span>
          </div>
        </div>
      </div>

      {/* Right column */}
      <div className="flex-1 space-y-4">
        {/* Product image */}
        <div className="border rounded-lg p-4 flex flex-col items-center gap-2">
          <span className="text-lg font-semibold">PM68</span>
          <Image
            src="/images/categoryItem1.png"
            alt="Product Image"
            width={140}
            height={240}
            className="object-contain"
          />
        </div>

        {/* Warranty expiry info */}
        <div className="border rounded-lg p-4 text-center">
          <p className="text-sm">Гарантия истекает</p>
          <p className="text-xl font-semibold mt-1">07.07.2028</p>
        </div>
      </div>
    </div>
  );
}
