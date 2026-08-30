import React from 'react'
import {  getCurrencyData, getData } from '@/actions/get'
import ProductsList from '../[categoryId]/_components/productsList';
import JsonLd from '@/components/seo/JsonLd';
import { createBreadcrumbJsonLd, createCollectionPageJsonLd, createPageMetadata } from '@/lib/seo';

const pageTitle = "Каталог оборудования для автоматизации бизнеса";
const pageDescription =
  "Полный каталог Bar Code Technologies: POS-оборудование, сканеры штрих-кода, терминалы сбора данных, решения для маркировки, Retail, HoReCa, складов и производства в Узбекистане.";

export const metadata = createPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: "/all-products",
  keywords: [
    "каталог POS оборудования",
    "купить сканер штрих кода Ташкент",
    "терминалы сбора данных Узбекистан",
  ],
});

export default async function AllProduct() {
  const pageSize = 60;

  const firstPage = await getData({
    endpoint: `/api/products?page=1&limit=${pageSize}`,
    tag: ["products", "top-products", "categories"],
    revalidate: 3600,
  });

  const totalPages = Math.ceil((firstPage?.total ?? 0) / pageSize);
  const additionalPages = totalPages > 1 ? Array.from({ length: totalPages - 1 }, (_, index) => index + 2) : [];

  const restResponses = additionalPages.length
    ? await Promise.all(
      additionalPages.map((page) =>
        getData({
          endpoint: `/api/products?page=${page}&limit=${pageSize}`,
          tag: ["products", "top-products", "categories"],
          revalidate: 3600,
        })
      )
    )
    : [];

  const mergedProducts = Array.isArray(firstPage?.data) ? [...firstPage.data] : [];
  restResponses.forEach((response) => {
    if (Array.isArray(response?.data)) {
      mergedProducts.push(...response.data);
    }
  });

  const products = {
    ...(firstPage && typeof firstPage === "object" ? firstPage : {}),
    data: mergedProducts,
    total: firstPage?.total ?? mergedProducts.length,
  };

   const currency = await getCurrencyData()


  return (
    <main className=''>
      <JsonLd
        data={[
          createBreadcrumbJsonLd([
            { name: "Главная", path: "/" },
            { name: "Каталог", path: "/all-products" },
          ]),
          createCollectionPageJsonLd({
            name: pageTitle,
            description: pageDescription,
            path: "/all-products",
          }),
        ]}
      />
      <ProductsList currency={currency} url="/all-products" limit={products.data.length || pageSize} categoryData={{
        name: "All products***Все продукты***Barcha mahsulotlar"
      }} products={products} page={1} showPagination={false} />
    </main>
  )
}
