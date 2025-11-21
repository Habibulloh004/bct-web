import React from 'react'
import CartComponent from './_components/cartComponent'
import {  getCurrencyData } from '@/actions/get';

export default async function Cart() {

   const currency = await getCurrencyData()


  return (
    <CartComponent currency={currency} />
  )
}
