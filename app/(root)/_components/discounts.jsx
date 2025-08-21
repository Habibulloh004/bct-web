"use client"

import { Separator } from '@/components/ui/separator'
import React from 'react'
import CategoryItem from './categoryItem'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import ProductItem from './productItem'
import { useTranslation } from 'react-i18next'

export default function Discounts({ products }) {
  const productsData =products?.data
  const { t } = useTranslation();
  if (productsData?.length > 0) {
    return (
      <main className='space-y-4' >
        <h1 className='ml-4 md:ml-12 text-start font-bold text-4xl'>{t("homePage.discountTitle")}</h1>
        <div className='pt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4'>
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
