import React from 'react'
import ConfirmOrder from './_components/ConfirmOrder'
import { getCurrencyData } from '@/actions/get';
import { createNoIndexMetadata } from '@/lib/seo';

export const metadata = createNoIndexMetadata(
  "Оформление заказа",
  "Страница оформления заказа Bar Code Technologies.",
  "/confirm-order"
);

export default async function ConfirmOrderPage() {
  const currency = await getCurrencyData()


  return (
    <ConfirmOrder currency={currency} />
  )
}
