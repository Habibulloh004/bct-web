"use client"

import { Separator } from '@/components/ui/separator'
import React from 'react'
import ProductItem from './productItem'
import Link from 'next/link'
import InfinityCard from '@/components/shared/infinityCard'
import { useTranslation } from 'react-i18next'

export default function Manufacturer() {
  const { t } = useTranslation();
  return (
    <div className='pb-4 max-w-[1440px] mx-auto w-full'>
      <InfinityCard colorOnHover data={[{
        image: "/myClients/point.png"
      }, {
        image: "/myClients/biamp.png"
      }, {
        image: "/myClients/sewoo.png"
      }, {
        image: "/myClients/zebra.png"
      }, {
        image: "/myClients/sewoo.png"
      }, {
        image: "/myClients/possible.png"
      }, {
        image: "/myClients/sewoo.png"
      }]} />
      <InfinityCard colorOnHover reverse={true} data={[{
        image: "/myClients/imu.png"
      }, {
        image: "/myClients/hanshow.png"
      }, {
        image: "/myClients/possible.png"
      }, {
        image: "/myClients/sensormatic.png"
      }, {
        image: "/myClients/sewoo.png"
      }, {
        image: "/myClients/possible.png"
      }, {
        image: "/myClients/sewoo.png"
      }]} />
    </div>

  )
}
