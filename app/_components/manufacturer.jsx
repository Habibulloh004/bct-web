"use client"

import { Separator } from '@/components/ui/separator'
import React from 'react'
import ProductItem from './productItem'
import Link from 'next/link'
import InfinityCard from '@/components/shared/infinityCard'
import { useTranslation } from 'react-i18next'

export default function Manufacturer() {
  const { t } = useTranslation();
  return (
    <div className='space-y-5'>
      <main className='mb-4 max-w-[1440px] mx-auto w-11/12 space-y-4 pt-24' >
        <h1 className='text-center font-bold text-2xl'>{t("homePage.manufacturerTitle")}</h1>
        <Separator className={""} />
      </main>
      <InfinityCard data={[{
        image: "/images/point.png"
      }, {
        image: "/images/biamp.png"
      }, {
        image: "/images/point.png"
      }, {
        image: "/images/point.png"
      }]} />
      <InfinityCard reverse={true} data={[{
        image: "/images/point.png"
      }, {
        image: "/images/point.png"
      }, {
        image: "/images/point.png"
      }, {
        image: "/images/point.png"
      }]} />
      {/* <div className='flex justify-center mt-5'>
        <Link className='hover:underline underline-offset-1font-medium text-md' href="/all-categories">
          Все категории
        </Link>
      </div> */}
    </div>

  )
}
