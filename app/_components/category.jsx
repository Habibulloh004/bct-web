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
      <main className='max-w-[1440px] mx-auto w-11/12 space-y-4' >
        <h1 className='text-center font-bold text-2xl'>{t("homePage.manufacturerTitle")}</h1>
        <Separator className={""} />
        <div className='pt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4'>
          {categories?.slice()?.reverse()?.map((item, index) => (
            <CategoryItem item={item} key={index} />
          ))}
        </div>
        {/* <div className='flex justify-center mt-5'>
          <Link className='hover:underline underline-offset-1font-medium text-md' href="/all-categories">
            {t("homePage.categoryLink")}
          </Link>
        </div> */}
      </main>
    )
  }
}
