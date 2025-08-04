import Banner from '@/app/_components/banner'
import React from 'react'
import Category from './_components/category'
import Discounts from './_components/discounts'
import Manufacturer from './_components/manufacturer'
import InfinityCard from '@/components/shared/infinityCard'
import AboutUs from './_components/aboutUs'
import { getData } from '@/actions/get'

export default async function HomePage() {
const categories = await getData({
  endpoint: "/api/categories",
  tag: "categories",
  revalidate: 3600
});
  console.log(categories)
  return (
    <main className='pt-24 font-poppins'>
      <Banner banners={[
        { image: '/images/background1.jpg', title: 'Welcome to Our Store', description: 'Discover the latest gadgets and accessories' },
        { image: '/images/background1.jpg', title: 'Welcome to Our Store', description: 'Discover the latest gadgets and accessories' },
        { image: '/images/background1.jpg', title: 'Welcome to Our Store', description: 'Discover the latest gadgets and accessories' },
      ]} />
      <Category categories={categories?.data} />
      <Discounts />
      <Manufacturer />
      <AboutUs />
    </main>
  )
}
