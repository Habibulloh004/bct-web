import React from 'react'
import ProfileComponent from './_components/profileComponent'
import {  getCurrencyData } from '@/actions/get';

export default async function ProfilePage() {
   const currency = await getCurrencyData()



  return (
    <ProfileComponent currency={currency} />
  )
}
