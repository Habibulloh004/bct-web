"use client";

import InfinityCard from '@/components/shared/infinityCard'
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function MyClients({ partners }) {
  const { t } = useTranslation();

  return (
    <div className='space-y-5'>
      <div className='flex justify-center items-center pt-5'>
        <h1 className='text-base md:text-lg font-semibold'>{t('aboutUs.clients.title')}</h1>
      </div>
      <InfinityCard
        className={"gap-6"}
        classNameImage={"h-24 mr-6 object-contain rounded-md"}
        data={partners}
        type={'online'}
      />
    </div>
  )
}