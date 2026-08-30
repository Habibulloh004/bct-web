import React from 'react'
import ProductHero from './_components/productHero'
import ProductFeatures from './_components/productFeatures'
import {  getCurrencyData, getData } from '@/actions/get';
import JsonLd from '@/components/seo/JsonLd';
import {
  createBreadcrumbJsonLd,
  createProductJsonLd,
  createProductMetadata,
  getSeoText,
} from '@/lib/seo';
import { convertUsdtoUzb } from '@/lib/functions';

async function getProductData(productId) {
  try {
    return await getData({
      endpoint: `/api/products/${productId}`,
      tag: ['products', 'categories', 'top-categories'],
      revalidate: 3600,
    });
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const productId = resolvedParams?.productId;
  const categoryId = resolvedParams?.categoryId;
  const productData = await getProductData(productId);

  return createProductMetadata({ product: productData, categoryId, productId });
}

export default async function Product({ params }) {
  const resolvedParams = await params;
  const productId = resolvedParams?.productId;
  const categoryId = resolvedParams?.categoryId;
  const productData = await getProductData(productId);
  const currency = await getCurrencyData()
  const productName = getSeoText(productData?.name) || "Оборудование";
  const categoryName = getSeoText(productData?.category_name) || "Каталог";
  const convertedPrice = productData?.price
    ? Math.round(convertUsdtoUzb(productData.price, currency))
    : null;
  const productPrice = Number.isFinite(convertedPrice) ? convertedPrice : null;

  return (
    <main className="pt-8 font-poppins">
      <JsonLd
        data={[
          createBreadcrumbJsonLd([
            { name: "Главная", path: "/" },
            { name: categoryName, path: `/${categoryId}` },
            { name: productName, path: `/${categoryId}/${productId}` },
          ]),
          createProductJsonLd({
            product: productData,
            categoryId,
            productId,
            price: productPrice,
          }),
        ]}
      />
      {/* Desktopda tavsifni Hero ichida yon panelga joylaymiz */}
      <ProductHero currency={currency} item={productData} showInlineFeatures />
      {/* Mobil uchun eski (to‘liq) tavsif bloki qoladi */}
      <ProductFeatures productData={productData} variant="full" />
    </main>
  );
}
