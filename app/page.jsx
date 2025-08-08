import Banner from '@/app/_components/banner'
import React from 'react'
import Category from './_components/category'
import Discounts from './_components/discounts'
import Manufacturer from './_components/manufacturer'
import AboutUs from './_components/aboutUs'
import { getData } from '@/actions/get'

export default async function HomePage() {
  const categories = await getData({
    endpoint: "/api/categories",
    tag: ["top-categories", "categories"],
    revalidate: 3600
  });

  const banners = await getData({
    endpoint: "/api/banners",
    tag: "banners",
    revalidate: 3600
  });

  let products = await getData({
    endpoint: `/api/products?page=${1}&limit=20`,
    tag: ['categories', "products", "top-categories"],
    revalidate: 3600
  })
  console.log({ banners, categories, products })

  return (
    <main className='pt-24 md:pt-32 font-poppins'>
      <Banner banners={banners?.data} />
      <Category categories={categories?.data} />
      <Discounts products={products} />
      <Manufacturer />
      <AboutUs />
    </main>
  )
}