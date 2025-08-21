"use client"
import CustomImage from '@/components/shared/customImage'
import { getTranslatedValue } from '@/lib/functions';
import { imageUrl } from '@/lib/utils';
import Link from 'next/link';
import React from 'react'
import { useTranslation } from 'react-i18next';

export default function ManufactureItem({ item }) {
  const { i18n } = useTranslation();
  return (
    <Link href={`/${item?.id}`} className='bg-primary rounded-2xl p-4 space-y-2'>
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
      <div className='flex justify-start flex-col items-start gap-2 w-full'>
        <h1 className='text-xl text-white font-medium text-start'>{getTranslatedValue(item?.name, i18n?.language)}</h1>
        <p className='text-xs line-clamp-3 text-white/50'>Ведущий области интегрированных платформ управления магазинами, специализирующийся на производстве KIOSK и POS оборудования.</p>
      </div>
    </Link>
  )
}
