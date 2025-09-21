import React from 'react'
import ConfirmOrder from './_components/ConfirmOrder'
import { getBasicData } from '@/actions/get';

export default async function ConfirmOrderPage() {
   const currency = await getBasicData({
    endpoint: `/api/currency`,
    revalidate: 3600,
  });

  return (
    <ConfirmOrder currency={currency} />
  )
}
