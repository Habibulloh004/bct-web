import React from 'react'
import ProductHero from './_components/productHero'
import ProductFeatures from './_components/productFeatures'
import { getBasicData, getData } from '@/actions/get';

export default async function Product({ params }) {
  const productId = params.productId;
  const productData = await getData({
    endpoint: `/api/products/${productId}`,
    tag: ['products', 'categories', 'top-categories'],
    revalidate: 3600,
  });
  const currency = await getBasicData({
    endpoint: `/api/currency`,
    revalidate: 3600,
  });
  const currencyData = currency?.conversion_rates?.UZS || 13000; // Default qiymat
  console.log({ productData });
  return (
    <main className="pt-8 font-poppins">
      {/* Desktopda tavsifni Hero ichida yon panelga joylaymiz */}
      <ProductHero currency={currencyData} item={productData} showInlineFeatures />
      {/* Mobil uchun eski (to‘liq) tavsif bloki qoladi */}
      <ProductFeatures productData={productData} variant="full" />
    </main>
  );
}
