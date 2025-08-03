import Banner from '@/components/shared/banner'
import React from 'react'

export default function HomePage() {
  return (
    <main className='max-w-[1440px] mx-auto w-11/12 pt-24'>
      <Banner banners={[
        { image: '/images/background1.jpg', title: 'Welcome to Our Store', description: 'Discover the latest gadgets and accessories' },
        { image: '/images/background1.jpg', title: 'Welcome to Our Store', description: 'Discover the latest gadgets and accessories' },
        { image: '/images/background1.jpg', title: 'Welcome to Our Store', description: 'Discover the latest gadgets and accessories' },
      ]} />
    </main>
  )
}
