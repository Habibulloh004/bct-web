// components/MobileCategoryMenu.jsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useCategories } from '@/hooks/useCategories';

export default function MobileCategoryMenu({ onLinkClick }) {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [expandedTopCategory, setExpandedTopCategory] = useState(null);
  const { t } = useTranslation();
  const { topCategories, getCategoriesByTopCategory, loading } = useCategories();

  const toggleCategories = () => {
    setIsCategoriesOpen(!isCategoriesOpen);
    if (!isCategoriesOpen) {
      setExpandedTopCategory(null);
    }
  };

  const toggleTopCategory = (topCategoryId) => {
    setExpandedTopCategory(
      expandedTopCategory === topCategoryId ? null : topCategoryId
    );
  };

  return (
    <div className="border-b">
      {/* Categories Header - Trigger */}
      <button
        onClick={toggleCategories}
        className="w-full flex items-center justify-between px-4 py-4 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-medium text-gray-900">{t('header.categories')}</span>
        <ChevronDown 
          className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
            isCategoriesOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>
      
      {/* Categories Content */}
      {isCategoriesOpen && (
        <div className="bg-gray-50">
          {loading ? (
            <div className="p-6 text-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-300 mx-auto"></div>
              <p className="mt-2 text-gray-500 text-sm">{t('common.loading')}</p>
            </div>
          ) : topCategories.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              Категории не найдены
            </div>
          ) : (
            <>
              {topCategories.map((topCategory) => {
                const subCategories = getCategoriesByTopCategory(topCategory.id);
                const hasSubCategories = subCategories.length > 0;
                const isExpanded = expandedTopCategory === topCategory.id;

                return (
                  <div key={topCategory.id} className="border-b border-gray-200 last:border-b-0">
                    {hasSubCategories ? (
                      <>
                        {/* Top Category with Subcategories - Clickable */}
                        <button
                          onClick={() => toggleTopCategory(topCategory.id)}
                          className="w-full flex items-center justify-between px-4 py-3 text-left text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          <span className="font-medium">{topCategory.name}</span>
                          <ChevronDown 
                            className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                              isExpanded ? 'rotate-180' : ''
                            }`} 
                          />
                        </button>

                        {/* Subcategories */}
                        {isExpanded && (
                          <div className="bg-white border-l-4 border-gray-300 ml-4">
                            {subCategories.map((category) => (
                              <Link
                                key={category.id}
                                href={`/${category.id}`}
                                onClick={onLinkClick}
                                className="block px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-800 transition-colors border-b border-gray-100 last:border-b-0"
                              >
                                {category.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      /* Top Category without Subcategories - Disabled */
                      <div className="flex items-center justify-between px-4 py-3 text-gray-400">
                        <span>{topCategory.name}</span>
                        <span className="text-xs">(скоро)</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </>
          )}
        </div>
      )}
    </div>
  );
}