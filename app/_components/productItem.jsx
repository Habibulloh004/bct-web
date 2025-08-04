import CustomImage from '@/components/shared/customImage'
import { Button } from '@/components/ui/button'
import { getTranslatedValue } from '@/lib/functions';
import React from 'react'
import { useTranslation } from 'react-i18next';

export default function ProductItem({ item }) {
  const { i18n } = useTranslation();
  return (
    <main className="bg-[#EBEBEB99] rounded-2xl p-4 flex">
      <div className='text-start flex justify-around flex-col items-start gap-2 w-full'>
        <div>
          <h1 className='text-md font-medium'>{getTranslatedValue(item?.name, i18n.language)}</h1>
          <p className='text-md text-red-500'>POS система</p>
          <p className='text-sm text-[#ABAFB1] line-clamp-3'>{getTranslatedValue(item?.ads_title, i18n.language)}</p>
        </div>
        <div>
          <Button >
            1 500 000 сум
          </Button>
        </div>
      </div>
      <div className="relative mx-auto aspect-[4/3] rounded-[4px] overflow-hidden min-h-[240px]">
        <CustomImage
          src={'/images/categoryItem1.png'}
          alt={`banner-img`}
          fill
          loading="eager"
          className="w-full mx-auto aspect-video mb-5 object-contain"
          property={"true"}
        />
      </div>
    </main>
  )
}
