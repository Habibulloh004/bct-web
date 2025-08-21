import React from 'react'
import ProductsList from './_components/productsList'
import { getData } from '@/actions/get';

export default async function CategoryPage({ searchParams, params }) {
  const resolvedSearchParams = await searchParams;
  const page = parseInt(resolvedSearchParams?.page, 10) || 1;
  const categoryId = await params?.categoryId;
  const limit = 12 
  const products = await getData({
    endpoint: `/api/products?page=${page}&limit=${limit}&category_id=${categoryId}`,
    tag: ["products", "top-products", 'categories'],
    revalidate: 3600
  })
  const categoryData = await getData({
    endpoint: `/api/categories/${categoryId}`,
    tag: ["category", "top-categories"],
    revalidate: 3600
  });
  return (
    <main className='font-poppins'>
      <ProductsList limit={limit} categoryData={categoryData} products={products} page={page} />
    </main>
  )
}
