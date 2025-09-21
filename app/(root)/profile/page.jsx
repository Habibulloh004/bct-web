import React from 'react'
import ProfileComponent from './_components/profileComponent'
import { getBasicData } from '@/actions/get';

export default async function ProfilePage() {
  const currency = await getBasicData({
    endpoint: `/api/currency`,
    revalidate: 3600,
  });
  
  const currencyData = currency?.conversion_rates?.UZS || 13000; // Default qiymat

  return (
    <ProfileComponent currency={currencyData} />
  )
}
