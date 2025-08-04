import InfinityCard from '@/components/shared/infinityCard'
import React from 'react'

export default function MyClients() {
  return (
    <div className='space-y-5'>
      <div className='flex justify-center items-center pt-5'>
        <h1 className='text-md'>Наши клиенты</h1>
      </div>
      <InfinityCard className={"gap-6"} classNameImage={"mr-6 aspect-[4/3] object-cover rounded-md"} data={[{
        image: "/myClients/safia.jpg"
      }, {
        image: "/myClients/cafelito.png"
      }, {
        image: "/myClients/safia.jpg"
      }, {
        image: "/myClients/cafelito.png"
      }]} />
    </div>
  )
}
