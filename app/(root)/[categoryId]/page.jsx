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
import { createCategoryPath, extractMongoId } from '@/lib/routes';
import { permanentRedirect } from 'next/navigation';

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
  const categoryId = extractMongoId(resolvedParams?.categoryId);
  const categoryData = await getCategoryData(categoryId);

  return createCategoryMetadata({ category: categoryData, categoryId, page });
}

export default async function CategoryPage({ searchParams, params }) {
  const resolvedSearchParams = await searchParams;
  const page = parseInt(resolvedSearchParams?.page, 10) || 1;
  const resolvedParams = await params;
  const categoryId = extractMongoId(resolvedParams?.categoryId);
  const limit = 12
  const products = await getData({
    endpoint: `/api/products?page=${page}&limit=${limit}&category_id=${categoryId}`,
    tag: ["products", "top-products", 'categories'],
    revalidate: 3600
  })
  const categoryData = await getCategoryData(categoryId);
  const currency = await getCurrencyData()
  const categoryName = getSeoText(categoryData?.name) || "Каталог оборудования";
  const canonicalCategoryPath = categoryData ? createCategoryPath(categoryData) : `/${categoryId}`;
  const categoryPath = page > 1 ? `${canonicalCategoryPath}?page=${page}` : canonicalCategoryPath;

  if (categoryData && resolvedParams?.categoryId !== canonicalCategoryPath.slice(1)) {
    permanentRedirect(categoryPath);
  }

  return (
    <main className='font-poppins'>
      <JsonLd
        data={[
          createBreadcrumbJsonLd([
            { name: "Главная", path: "/" },
            { name: categoryName, path: canonicalCategoryPath },
          ]),
          createCollectionPageJsonLd({
            name: `${categoryName} в Узбекистане`,
            description: `${categoryName}: решения и оборудование для автоматизации бизнеса от ${SITE_NAME}.`,
            path: categoryPath,
          }),
        ]}
      />
      <ProductsList currency={currency} url={canonicalCategoryPath} limit={limit} categoryData={categoryData} products={products} page={page} />
    </main>
  )
}
