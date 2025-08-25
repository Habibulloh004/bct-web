"use client"

import { getTranslatedValue } from '@/lib/functions'
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function ProductFeatures({ productData }) {
  const { i18n } = useTranslation()
  return (
    <div className='bg-primary w-full py-4 h-full'>
      <div className='w-11/12 md:w-10/12 max-w-[1440px] mx-auto flex justify-start items-start flex-col'>
        <h1 className='text-white text-2xl font-bold'>{getTranslatedValue(productData?.name, i18n.language)}</h1>
        <p className='w-full md:w-2/3 text-start text-white pt-3'>{getTranslatedValue(productData?.ads_title, i18n.language)}</p>
        <div
          className="w-full pt-4 text-white"
          dangerouslySetInnerHTML={{ __html: getTranslatedValue(productData?.description, i18n.language) }}
        />
      </div>
    </div>
  )
}
