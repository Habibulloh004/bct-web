import React from 'react'
import ProductHero from './_components/productHero'
import ProductFeatures from './_components/productFeatures'

export default function Product() {
  return (
    <main className='pt-24 font-poppins'>
      <ProductHero />
      <div className='w-full h-11 bg-black text-white flex items-center justify-center font-bold'>
        <h1 className=''>Мобильный компьютер PM86</h1>
      </div>
      <ProductFeatures/>
    </main>
  )
}
