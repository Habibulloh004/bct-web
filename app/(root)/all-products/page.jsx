import React from 'react'
import { getBasicData, getData } from '@/actions/get'
import AllProducts from './_components/allProducts'
import ProductsList from '../[categoryId]/_components/productsList';

export default async function AllProduct({ searchParams, params }) {
  const resolvedSearchParams = await searchParams;
  const page = parseInt(resolvedSearchParams?.page, 10) || 1;
  const limit = 12
  const products = await getData({
    endpoint: `/api/products?page=${page}&limit=${limit}`,
    tag: ["products", "top-products", 'categories'],
    revalidate: 3600
  })
   const currency = await getBasicData({
    endpoint: `/api/currency`,
    revalidate: 3600,
  });
  const currencyData = currency?.conversion_rates?.UZS || 13000; // Default qiymat

  return (
    <main className=''>
      <ProductsList currency={currencyData} url="/all-products" limit={limit} categoryData={{
        name:"All products***Все продукты***Barcha mahsulotlar"
      }} products={products} page={page} />
    </main>
  )
}
