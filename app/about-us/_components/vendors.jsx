import InfinityCard from '@/components/shared/infinityCard'
import React from 'react'

export default function Vendors() {
  return (
    <div className='space-y-5'>
      <div className='flex justify-center items-center pt-5'>
        <h1 className='text-md'>Вендоры</h1>
      </div>
      <InfinityCard data={[{
        image: "/images/poster.jpg"
      }, {
        image: "/images/shtrix.jpg"
      }, {
        image: "/images/poster.jpg"
      }, {
        image: "/images/shtrix.jpg"
      }]} />
      <InfinityCard reverse={true} data={[{
        image: "/images/posbank.jpg"
      }, {
        image: "/images/shtrix.jpg"
      }, {
        image: "/images/poster.jpg"
      }, {
        image: "/images/shtrix.jpg"
      }]} />
      <InfinityCard data={[{
        image: "/images/poster.jpg"
      }, {
        image: "/images/shtrix.jpg"
      }, {
        image: "/images/poster.jpg"
      }, {
        image: "/images/shtrix.jpg"
      }]} />

    </div>
  )
}
