import React from 'react'
import ProductHero from './_components/productHero'
import ProductFeatures from './_components/productFeatures'
import { getData } from '@/actions/get';

export default async function Product({ params }) {
  const productId = params.productId;
  const productData = await getData({
    endpoint: `/api/products/${productId}`,
    tag: ['products', 'categories', 'top-categories'],
    revalidate: 3600,
  });

  return (
    <main className="pt-8 font-poppins">
      {/* Desktopda tavsifni Hero ichida yon panelga joylaymiz */}
      <ProductHero item={productData} showInlineFeatures />
      {/* Mobil uchun eski (to‘liq) tavsif bloki qoladi */}
      <div className="lg:hidden">
        <ProductFeatures productData={productData} variant="full" />
      </div>
    </main>
  );
}
