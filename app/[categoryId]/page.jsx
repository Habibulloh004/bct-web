import React from 'react'
import Banner from '../_components/banner'
import ProductsList from './_components/productsList'
import { getData } from '@/actions/get';

export default async function CategoryPage({searchParams, params}) {
  const resolvedSearchParams = await searchParams;
  const page = parseInt(resolvedSearchParams?.page, 10) || 1;
  const categoryId =await params.categoryId;
  const categories = await getData({
    endpoint: `/api/products?page=${page}&limit=10&category_id=${categoryId}`,
    tag: 'categories',
    revalidate: 3600
  })
  const banners = await getData({
    endpoint: "/api/banners",
    tag: "banners",
    revalidate: 3600
  });
  const categoryData= await getData({
    endpoint: `/api/categories/${categoryId}`,
    tag: "category",
    revalidate: 3600
  });
  console.log(categories);
  return (
    <main className='pt-24 font-poppins'>
      <Banner banners={banners?.data} />
      <ProductsList categoryData={categoryData} products={categories} page={page} />
    </main>
  )
}
