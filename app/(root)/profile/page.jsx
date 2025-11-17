import React from 'react'
import ProfileComponent from './_components/profileComponent'
import { getBasicData } from '@/actions/get';

export default async function ProfilePage() {
  const currency = await getBasicData({
    endpoint: `/api/currency`,
    revalidate: 43200
  });


  return (
    <ProfileComponent currency={currency} />
  )
}
