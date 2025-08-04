// components/DesktopCategoryDropdown.jsx
'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useCategories } from '@/hooks/useCategories';

export default function DesktopCategoryDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredTopCategory, setHoveredTopCategory] = useState(null);
  const dropdownRef = useRef(null);
  const hoverTimeoutRef = useRef(null);
  const closeTimeoutRef = useRef(null);
  const { t } = useTranslation();
  const { topCategories, getCategoriesByTopCategory, loading } = useCategories();

  // Dropdown tashqarisiga click qilganda yopish
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setHoveredTopCategory(null);
        
        // Clear any pending timeouts
        if (hoverTimeoutRef.current) {
          clearTimeout(hoverTimeoutRef.current);
        }
        if (closeTimeoutRef.current) {
          clearTimeout(closeTimeoutRef.current);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const handleDropdownClose = () => {
    setIsOpen(false);
    setHoveredTopCategory(null);
  };

  // Main dropdown hover handlers
  const handleMainHoverEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    setIsOpen(true);
  };

  const handleMainHoverLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
      setHoveredTopCategory(null);
    }, 200); // 200ms delay before closing
  };

  // Top category hover handlers
  const handleTopCategoryEnter = (topCategoryId) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setHoveredTopCategory(topCategoryId);
  };

  const handleTopCategoryLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredTopCategory(null);
    }, 1000); // 150ms delay before closing subcategory
  };

  // Submenu hover handlers
  const handleSubMenuEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
  };

  const handleSubMenuLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredTopCategory(null);
    }, 300);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button - Hover Only */}
      <div
        className="flex items-center cursor-pointer text-white text-lg font-[400] hover:text-white/80 transition-colors"
        onMouseEnter={handleMainHoverEnter}
        onMouseLeave={handleMainHoverLeave}
      >
        {t('header.categories')}
        <ChevronDown className={`ml-2 size-4 text-white transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-[999] min-w-[250px]"
          onMouseEnter={handleMainHoverEnter}
          onMouseLeave={handleMainHoverLeave}
        >
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
            <div className="py-2">
              {topCategories.map((topCategory) => {
                const subCategories = getCategoriesByTopCategory(topCategory.id);
                const hasSubCategories = subCategories.length > 0;

                return (
                  <div
                    key={topCategory.id}
                    className="relative"
                    onMouseEnter={() => handleTopCategoryEnter(topCategory.id)}
                    onMouseLeave={handleTopCategoryLeave}
                  >
                    {hasSubCategories ? (
                      <>
                        {/* Top Category with Subcategories - Only Trigger */}
                        <div className="flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-50 cursor-pointer">
                          <span className="font-medium">{topCategory.name}</span>
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        </div>

                        {/* Subcategories */}
                        {hoveredTopCategory === topCategory.id && (
                          <div className='pl-1 absolute left-full top-0 ml-0 min-w-[200px] z-[1000]'>
                            <div
                              className="bg-white border border-gray-200 rounded-lg shadow-xl"
                              onMouseEnter={handleSubMenuEnter}
                              onMouseLeave={handleSubMenuLeave}
                            >
                              <div className="py-2">
                                {subCategories.map((category) => (
                                  <Link
                                    key={category.id}
                                    href={`/${category.id}`}
                                    onClick={handleDropdownClose}
                                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                                  >
                                    {category.name}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      /* Top Category without Subcategories - Disabled */
                      <div className="flex items-center justify-between px-4 py-3 text-gray-400 cursor-not-allowed">
                        <span>{topCategory.name}</span>
                        <span className="text-xs">(скоро)</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}