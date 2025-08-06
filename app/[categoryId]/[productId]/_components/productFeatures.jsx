"use client"

import CustomImage from '@/components/shared/customImage'
import { getTranslatedValue } from '@/lib/functions'
import { getInitialsFromName } from '@/lib/utils'
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function ProductFeatures({ productData }) {
  const { i18n } = useTranslation()
  return (
    <div className='max-w-[1440px] w-11/12 mx-auto flex justify-center items-center flex-col'>
      <h1 className='text-2xl font-bold pt-10'>{getTranslatedValue(productData?.name, i18n.language)}</h1>
      <p className='text-start pt-3'>{getTranslatedValue(productData?.ads_title, i18n.language)}</p>
      {/* <div className='flex justify-center items-center gap-4 pt-10'>
        <div
          className="relative w-[240px] min-h-[240px] aspect-[2/3] rounded-md overflow-hidden"
        >
          <CustomImage
            src="/images/categoryItem1.png"
            alt={`product-view-`}
            fill
            loading="eager"
            className="object-contain"
            property={"true"}
          />
        </div>
        <div
          className="relative w-[240px] min-h-[240px] aspect-[2/3] rounded-md overflow-hidden"
        >
          <CustomImage
            src="/images/categoryItem1.png"
            alt={`product-view-`}
            fill
            loading="eager"
            className="object-contain"
            property={"true"}
          />
        </div>
        <div
          className="relative w-[240px] min-h-[240px] aspect-[2/3] rounded-md overflow-hidden"
        >
          <CustomImage
            src="/images/categoryItem1.png"
            alt={`product-view`}
            fill
            loading="eager"
            className="object-contain"
            property={"true"}
          />
        </div>
      </div> */}
      <div className='pt-4'>
        {getTranslatedValue(productData?.description)}
      </div>
    </div>
  )
}
