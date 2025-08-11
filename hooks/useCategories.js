// hooks/useCategories.js
'use client';

import { useState, useEffect, useMemo } from 'react';
import { getData } from '@/actions/get';

export function useCategories() {
  const [topCategories, setTopCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]); // <-- products
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);

        // Parallel fetch
        const [topRes, catRes, prodRes] = await Promise.all([
          getData({
            endpoint: '/api/top-categories',
            tag: ['top-categories'],
            revalidate: 3600,
          }),
          getData({
            endpoint: '/api/categories',
            tag: ['top-categories', 'categories'],
            revalidate: 3600,
          }),
          // Agar backendda faqat kerakli maydonlarni beradigan query bo'lsa, shuni ishlating:
          // endpoint: '/api/products?fields=id,category_id'
          getData({
            endpoint: '/api/products',
            tag: ['products'],
            revalidate: 600,
          }),
        ]);

        setTopCategories(topRes?.data || []);
        setCategories(catRes?.data || []);

        // Normalize products: category_id || categoryId
        const normalizedProducts = (prodRes?.data || []).map((p) => ({
          id: p.id,
          category_id:
            p.category_id !== undefined
              ? p.category_id
              : p.categoryId !== undefined
              ? p.categoryId
              : null,
        }));
        setProducts(normalizedProducts);
      } catch (e) {
        console.error('Failed to fetch categories/products:', e);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  // Top category bo'yicha filter (agar boshqa joyda kerak bo'lsa)
  const getCategoriesByTopCategory = (topCategoryId) =>
    categories.filter((cat) => cat.top_category_id === topCategoryId);

  // Real mahsulotlar asosida tekshiradi
  const hasProducts = useMemo(() => {
    const set = new Set(
      products
        .map((p) => p.category_id)
        .filter((cid) => cid !== null && cid !== undefined)
    );
    return (categoryId) => set.has(categoryId);
  }, [products]);

  return {
    topCategories,
    categories,
    loading,
    getCategoriesByTopCategory,
    hasProducts,
  };
}
