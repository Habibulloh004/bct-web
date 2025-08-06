"use client"

import { Separator } from '@/components/ui/separator'
import React from 'react'
import CategoryItem from './categoryItem'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import ProductItem from './productItem'
import { useTranslation } from 'react-i18next'

export default function Discounts({ products }) {
  const productsData =products?.data?.filter((pr) => pr?.discount)
  const { t } = useTranslation();
  if (productsData?.length > 0) {
    return (
      <main className='max-w-[1440px] mx-auto w-11/12 space-y-4 pt-24' >
        <h1 className='text-center font-bold text-2xl'>{t("homePage.discountTitle")}</h1>
        <Separator className={""} />
        <div className='pt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
          {productsData?.map((item, index) => (
            <ProductItem key={index} item={item} />
          ))}
        </div>
        {/* <div className='flex justify-center mt-5'>
          <Link className='hover:underline underline-offset-1font-medium text-md' href="/all-categories">
            Все категории
          </Link>
        </div> */}
      </main>
    )
  }

}
