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
const banners = await getData({
  endpoint: "/api/banners",
  tag: "banners",
  revalidate: 0
});
const products = await getData({
    endpoint: `/api/products?page=${1}&limit=10`,
    tag: 'categories',
    revalidate: 3600
  })
  console.log({banners})
  return (
    <main className='pt-24 font-poppins'>
      <Banner banners={banners?.data} />
      <Category categories={categories?.data} />
      <Discounts products={products} />
      <Manufacturer />
      <AboutUs />
    </main>
  )
}
