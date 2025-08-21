"use client"

import { Separator } from '@/components/ui/separator'
import React from 'react'
import CategoryItem from './categoryItem'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useTranslation } from 'react-i18next'

export default function Category({ categories }) {
  console.log(categories)
  const { t } = useTranslation();
  if (categories?.length > 0) {
    return (
      <main className='space-y-4' >
        <h1 className='ml-4 md:ml-12 text-start font-bold text-2xl'>{t("homePage.manufacturerTitle")}</h1>
        <div className='pt-5 grid grid-cols-2 md:grid-cols-3-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4'>
          {categories?.slice()?.reverse()?.map((item, index) => (
            <CategoryItem item={item} key={index} />
          ))}
        </div>
      </main>
    )
  }
}
