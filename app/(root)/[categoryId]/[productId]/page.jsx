// app/products/[productId]/page.js
import React from "react";
import ProductHero from "./_components/productHero";
import ProductFeatures from "./_components/productFeatures";
import { getData } from "@/actions/get";

// ISR uchun global revalidate
export const revalidate = 600; // 10 daqiqa yangilanadi

// build vaqtida static params olish
export async function generateStaticParams() {
  const products = await getData({
    endpoint: `/api/products`,
    tag: ["products"],
    revalidate: 3600,
  });

  // faqat ID larni qaytaramiz
  return products?.data?.map((p) => ({
    productId: String(p.id),
  }));
}

export default async function ProductPage({ params }) {
  const { productId } = params;

  const productData = await getData({
    endpoint: `/api/products/${productId}`,
    tag: ["products", "categories", "top-categories"],
    revalidate: 3600,
  });

  return (
    <main className="pt-8 font-poppins">
      {/* Desktop uchun */}
      <ProductHero item={productData} showInlineFeatures />
      {/* Mobil uchun */}
      <ProductFeatures productData={productData} variant="full" />
    </main>
  );
}
