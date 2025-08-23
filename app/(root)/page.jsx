import Banner from '@/app/(root)/_components/banner'
import React from 'react'
import Discounts from './_components/discounts'
import AboutUs from './_components/aboutUs'
import { getData } from '@/actions/get'
import Manufacture from './_components/manufacturer'
import Vendors from './_components/vendors'

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
  let partners = await getData({
    endpoint: `/api/partners`,
    tag: ["partners"],
    revalidate: 3600
  })
  let vendors = await getData({
    endpoint: `/api/licenses?page=1&limit=12`,
    tag: ["licenses"],
    revalidate: 3600
  })

  let contact = await getData({
    endpoint: `/api/contacts?page=1&limit=12`,
    tag: ["contacts"],
    revalidate: 3600
  })
  console.log({ banners, categories, products, partners, vendors })

  return (
    <main className='max-w-[1440px] w-11/12 mx-auto font-poppins space-y-2 md:space-y-5'>
      <Banner contact={contact?.data[0]} partners={partners?.data} banners={banners?.data} />
      <Manufacture categories={categories?.data} />
      <Discounts products={products} />
      <Vendors vendors={vendors?.data} />
    </main>
  )
}