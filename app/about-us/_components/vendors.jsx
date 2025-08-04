"use client";

import InfinityCard from '@/components/shared/infinityCard'
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function Vendors() {
  const { t } = useTranslation();

  return (
    <div className='space-y-5'>
      <div className='flex justify-center items-center pt-5'>
        <h1 className='text-base md:text-lg font-semibold'>{t('aboutUs.vendors.title')}</h1>
      </div>
      <InfinityCard data={[{
        image: "/images/poster.jpg"
      }, {
        image: "/images/biamp.png"
      }, {
        image: "/images/poster.jpg"
      }, {
        image: "/images/poster.jpg"
      }]} />
      <InfinityCard reverse={true} data={[{
        image: "/images/posbank.jpg"
      }, {
        image: "/images/shtrix.jpg"
      }, {
        image: "/images/poster.jpg"
      }, {
        image: "/images/shtrix.jpg"
      }]} />
      <InfinityCard data={[{
        image: "/images/poster.jpg"
      }, {
        image: "/images/shtrix.jpg"
      }, {
        image: "/images/poster.jpg"
      }, {
        image: "/images/shtrix.jpg"
      }]} />
    </div>
  )
}