import React from 'react'
import ProductHero from './_components/productHero'
import ProductFeatures from './_components/productFeatures'
import { getData } from '@/actions/get';

export default async function Product({ params }) {
  const productId = await params.productId;
  const productData = await getData({
    endpoint: `/api/products/${productId}`,
    tag: ['products', "categories", "top-categories"],
    revalidate: 3600
  })
  console.log({ productData });
  return (
    <main className='pt-20 md:pt-24 font-poppins'>
      <ProductHero item={productData} />
      <ProductFeatures productData={productData} />
    </main>
  )
}
