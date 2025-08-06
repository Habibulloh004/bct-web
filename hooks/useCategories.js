// hooks/useCategories.js
'use client';

import { useState, useEffect } from 'react';
import { getData } from '@/actions/get'; // sizning getData funksiyangiz

export function useCategories() {
  const [topCategories, setTopCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);

        // Top categories olish
        const topCategoriesResponse = await getData({
          endpoint: '/api/top-categories',
          tag: ['top-categories'],
          revalidate: 3600
        });

        // Categories olish
        const categoriesResponse = await getData({
          endpoint: '/api/categories',
          tag: ["top-categories", 'categories'],
          revalidate: 3600
        });

        setTopCategories(topCategoriesResponse.data || []);
        setCategories(categoriesResponse.data || []);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Top category'ga tegishli category'larni topish
  const getCategoriesByTopCategory = (topCategoryId) => {
    return categories.filter(cat => cat.top_category_id === topCategoryId);
  };

  return {
    topCategories,
    categories,
    loading,
    getCategoriesByTopCategory
  };
}