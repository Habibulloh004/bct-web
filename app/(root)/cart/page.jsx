import React from 'react'
import CartComponent from './_components/cartComponent'
import {  getCurrencyData } from '@/actions/get';
import { createNoIndexMetadata } from '@/lib/seo';

export const metadata = createNoIndexMetadata(
  "Корзина",
  "Страница корзины покупателя Bar Code Technologies.",
  "/cart"
);

export default async function Cart() {

   const currency = await getCurrencyData()


  return (
    <CartComponent currency={currency} />
  )
}
