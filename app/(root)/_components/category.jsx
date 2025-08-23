"use client"

import { Separator } from '@/components/ui/separator'
import React from 'react'
import CategoryItem from './categoryItem'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useTranslation } from 'react-i18next'

export default function Category({ categories }) {
  const { t } = useTranslation();
  if (categories?.length > 0) {
    return (
      <main className="space-y-4">
        <h1 className="ml-4 md:ml-12 text-start font-bold text-2xl">
          {t("homePage.manufacturerTitle")}
        </h1>

        {/* FLEX: 6 ta/qatordan başlaydi, qolganlari markazda */}
        <div className="pt-5 flex flex-wrap justify-center gap-4">
          {categories.slice().reverse().map((item, index) => (
            <div
              key={index}
              className="
                w-1/2
                md:w-1/3
                lg:w-1/4
                xl:w-1/6
              "
            >
              <CategoryItem item={item} />
            </div>
          ))}
        </div>
      </main>
    )
  }
  return null
}
