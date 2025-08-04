import { Separator } from '@/components/ui/separator'
import React from 'react'
import OrderConfirmForm from './_components/orderConfirmForm'

export default function ConfirmOrder() {
  return (
    <main className="pt-32 w-11/12 mx-auto max-w-[1440px] space-y-4">
      <div className="flex justify-center items-center">
        <h1 className="text-center font-bold text-2xl">Подтверждения заказа</h1>
      </div>
      <Separator />
      <OrderConfirmForm/>
    </main>
  )
}
