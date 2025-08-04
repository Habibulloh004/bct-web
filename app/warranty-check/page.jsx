"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useTranslation } from 'react-i18next';

export default function WarrantyCheck() {
  const { t } = useTranslation();

  return (
    <div className="pt-24 md:pt-32 mx-auto max-w-5xl w-11/12 px-4">
      <div className="flex justify-center mb-6 md:mb-8">
        <h1 className="text-xl md:text-2xl font-bold">{t('warrantyCheck.title')}</h1>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left column */}
        <div className="flex-1 space-y-4">
          {/* Warranty check form */}
          <div className="border rounded-lg p-4 md:p-6 space-y-3">
            <h2 className="text-lg font-semibold">{t('warrantyCheck.title')}</h2>
            <Input 
              placeholder={t('warrantyCheck.form.serialNumber.placeholder')} 
              className="w-full"
            />
            <Button className="w-full bg-black text-white">
              {t('warrantyCheck.form.check')}
            </Button>
          </div>

          {/* Customer details */}
          <div className="border rounded-lg p-4 md:p-6 space-y-3 text-sm">
            <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
              <span className="font-medium">{t('warrantyCheck.result.customer')}:</span>
              <span className="font-bold">Азиз</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
              <span className="font-medium">{t('warrantyCheck.result.purchaseDate')}:</span>
              <span className="font-bold">07.07.2025</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
              <span className="font-medium">{t('warrantyCheck.result.product')}:</span>
              <span className="font-bold">Мобильный т. PM68</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
              <span className="font-medium">{t('warrantyCheck.result.warranty')}:</span>
              <span className="font-bold">3 года</span>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="flex-1 space-y-4">
          {/* Product image */}
          <div className="border rounded-lg p-4 md:p-6 flex flex-col items-center gap-4">
            <span className="text-lg font-semibold">PM68</span>
            <div className="w-full max-w-[200px] aspect-[3/4] relative">
              <Image
                src="/images/categoryItem1.png"
                alt="Product Image"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Warranty expiry info */}
          <div className="border rounded-lg p-4 md:p-6 text-center">
            <p className="text-sm mb-2">{t('warrantyCheck.result.expiresOn')}</p>
            <p className="text-xl font-semibold">07.07.2028</p>
          </div>
        </div>
      </div>
    </div>
  );
}