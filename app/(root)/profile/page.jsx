import React from 'react'
import ProfileComponent from './_components/profileComponent'
import {  getCurrencyData } from '@/actions/get';
import { createNoIndexMetadata } from '@/lib/seo';

export const metadata = createNoIndexMetadata(
  "Профиль клиента",
  "Личный кабинет клиента Bar Code Technologies.",
  "/profile"
);

export default async function ProfilePage() {
   const currency = await getCurrencyData()



  return (
    <ProfileComponent currency={currency} />
  )
}
