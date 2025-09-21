// app/category/[categoryId]/page.jsx
import React from "react";
import ProductsList from "./_components/productsList";
import { getData } from "@/actions/get";

export const revalidate = 600; // 10 daqiqa yangilanadi

// ✅ 1. Static params generatsiya qilish
export async function generateStaticParams() {
  // Barcha kategoriyalarni olish
  const categories = await getData({
    endpoint: "/api/categories",
    tag: ["categories"],
    revalidate: 3600,
  });

  return categories?.data?.map((cat) => ({
    categoryId: String(cat.id), // [categoryId] param uchun
  }));
}

// ✅ 2. Page component
export default async function CategoryPage({ searchParams, params }) {
  const page = parseInt(searchParams?.page, 10) || 1;
  const categoryId = params?.categoryId;
  const limit = 12;

  const products = await getData({
    endpoint: `/api/products?page=${page}&limit=${limit}&category_id=${categoryId}`,
    tag: ["products", "top-products", "categories"],
    revalidate: 3600,
  });

  const categoryData = await getData({
    endpoint: `/api/categories/${categoryId}`,
    tag: ["category", "top-categories"],
    revalidate: 3600,
  });

  return (
    <main className="font-poppins">
      <ProductsList
        limit={limit}
        categoryData={categoryData}
        products={products}
        page={page}
      />
    </main>
  );
}
