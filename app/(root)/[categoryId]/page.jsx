import React from 'react'
import ProductsList from './_components/productsList'
import {  getCurrencyData, getData } from '@/actions/get';
import JsonLd from '@/components/seo/JsonLd';
import {
  createBreadcrumbJsonLd,
  createCategoryMetadata,
  createCollectionPageJsonLd,
  getSeoText,
  SITE_NAME,
} from '@/lib/seo';

async function getCategoryData(categoryId) {
  try {
    return await getData({
      endpoint: `/api/categories/${categoryId}`,
      tag: ["category", "top-categories"],
      revalidate: 3600
    });
  } catch {
    return null;
  }
}

export async function generateMetadata({ searchParams, params }) {
  const resolvedSearchParams = await searchParams;
  const resolvedParams = await params;
  const page = parseInt(resolvedSearchParams?.page, 10) || 1;
  const categoryId = resolvedParams?.categoryId;
  const categoryData = await getCategoryData(categoryId);

  return createCategoryMetadata({ category: categoryData, categoryId, page });
}

export default async function CategoryPage({ searchParams, params }) {
  const resolvedSearchParams = await searchParams;
  const page = parseInt(resolvedSearchParams?.page, 10) || 1;
  const resolvedParams = await params;
  const categoryId = resolvedParams?.categoryId;
  const limit = 12
  const products = await getData({
    endpoint: `/api/products?page=${page}&limit=${limit}&category_id=${categoryId}`,
    tag: ["products", "top-products", 'categories'],
    revalidate: 3600
  })
  const categoryData = await getCategoryData(categoryId);
  const currency = await getCurrencyData()
  const categoryName = getSeoText(categoryData?.name) || "Каталог оборудования";
  const categoryPath = page > 1 ? `/${categoryId}?page=${page}` : `/${categoryId}`;

  return (
    <main className='font-poppins'>
      <JsonLd
        data={[
          createBreadcrumbJsonLd([
            { name: "Главная", path: "/" },
            { name: categoryName, path: `/${categoryId}` },
          ]),
          createCollectionPageJsonLd({
            name: `${categoryName} в Узбекистане`,
            description: `${categoryName}: решения и оборудование для автоматизации бизнеса от ${SITE_NAME}.`,
            path: categoryPath,
          }),
        ]}
      />
      <ProductsList currency={currency} url={`/${categoryId}`} limit={limit} categoryData={categoryData} products={products} page={page} />
    </main>
  )
}
