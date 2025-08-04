import React from 'react'
import ProductHero from './_components/productHero'
import ProductFeatures from './_components/productFeatures'
import { getData } from '@/actions/get';

export default async function Product({ params }) {
  const productId = await params.productId;
  const productData = await getData({
    endpoint: `/api/products/${productId}`,
    tag: 'product',
    revalidate: 3600
  })
console.log({productData});
  return (
    <main className='pt-24 font-poppins'>
      <ProductHero item={productData} />
      
      <div className='w-full h-11 bg-black text-white flex items-center justify-center font-bold'>
        <h1 className=''>Мобильный компьютер PM86</h1>
      </div>
      <ProductFeatures />
    </main>
  )
}
