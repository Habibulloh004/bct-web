import React from 'react'
import ConfirmOrder from './_components/ConfirmOrder'
import { getCurrencyData } from '@/actions/get';

export default async function ConfirmOrderPage() {
  const currency = await getCurrencyData()


  return (
    <ConfirmOrder currency={currency} />
  )
}
