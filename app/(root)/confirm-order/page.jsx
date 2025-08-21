"use client";

import { Separator } from '@/components/ui/separator'
import React from 'react'
import OrderConfirmForm from './_components/orderConfirmForm'
import { useTranslation } from 'react-i18next'

export default function ConfirmOrder() {
  const { t } = useTranslation();

  return (
    <main className=" w-11/12 mx-auto max-w-[1440px] space-y-4">
      <div className="flex justify-center items-center">
        <h1 className="text-center font-bold text-xl md:text-2xl px-4">{t('confirmOrder.title')}</h1>
      </div>
      <Separator />
      <OrderConfirmForm/>
    </main>
  )
}