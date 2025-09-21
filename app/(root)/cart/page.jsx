import React from 'react'
import CartComponent from './_components/cartComponent'
import { getBasicData } from '@/actions/get';

export default async function Cart() {

  const currency = await getBasicData({
    endpoint: `/api/currency`,
    revalidate: 3600,
  });
  const currencyData = currency?.conversion_rates?.UZS || 13000; // Default qiymat

  return (
    <CartComponent currency={currencyData} />
  )
}
