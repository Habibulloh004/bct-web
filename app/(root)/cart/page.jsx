import React from 'react'
import CartComponent from './_components/cartComponent'
import { getBasicData } from '@/actions/get';

export default async function Cart() {

  const currency = await getBasicData({
    endpoint: `/api/currency`,
    revalidate: 43200
  });

  return (
    <CartComponent currency={currency} />
  )
}
