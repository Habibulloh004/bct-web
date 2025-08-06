"use client"
import CustomImage from '@/components/shared/customImage'
import { getTranslatedValue } from '@/lib/functions';
import { imageUrl } from '@/lib/utils';
import Link from 'next/link';
import React from 'react'
import { useTranslation } from 'react-i18next';

export default function CategoryItem({ item }) {
  const { i18n } = useTranslation();
  return (
    <Link href={`/${item?.id}`} className='bg-[#EBEBEB99] rounded-2xl p-4'>
      <div className="relative mx-auto aspect-[4/3] rounded-[4px] overflow-hidden">
        <CustomImage
          src={item?.image ? `${imageUrl}${item?.image}` : "/placeholder.svg"}
          alt={`banner-img`}
          fill
          loading="eager"
          className="w-full mx-auto aspect-video mb-5 object-contain"
          property={"true"}
        />
      </div>
      <div className='flex justify-center flex-col items-center gap-2 w-full'>
        <h1 className='text-xl font-medium'>{getTranslatedValue(item?.name, i18n?.language)}</h1>
        <p className='text-md text-red-500'>{getTranslatedValue(item?.top_category_name || "POS система***POS система***POS система", i18n?.language)} </p>
      </div>
    </Link>
  )
}
