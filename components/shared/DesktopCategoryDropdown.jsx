// components/DesktopCategoryDropdown.jsx
'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useCategories } from '@/hooks/useCategories';
import { getTranslatedValue } from '@/lib/functions';
import { imageUrl } from '@/lib/utils';
import Image from 'next/image';

export default function DesktopCategoryDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const closeTimeoutRef = useRef(null);
  const { t, i18n } = useTranslation();
  const { categories, loading, hasProducts } = useCategories();

  // tashqariga bosilsa yopish
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
        if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  const handleMainHoverEnter = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setIsOpen(true);
  };

  const handleMainHoverLeave = () => {
    closeTimeoutRef.current = setTimeout(() => setIsOpen(false), 200);
  };

  const handleDropdownClose = () => setIsOpen(false);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger */}
      <Link href="/all-products"
        className="flex items-center cursor-pointer text-white text-lg font-[400] hover:text-white/80 transition-colors"
        onMouseEnter={handleMainHoverEnter}
        onMouseLeave={handleMainHoverLeave}
      >
        {t('header.categories')}
        <ChevronDown
          className={`ml-2 size-4 text-white transition-transform duration-200 ${isOpen ? 'rotate-180' : ''
            }`}
        />
      </Link>

      {/* Dropdown */}
      {isOpen && (
        <div
          className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-[999] min-w-[280px]"
          onMouseEnter={handleMainHoverEnter}
          onMouseLeave={handleMainHoverLeave}
        >
          {loading ? (
            <div className="p-6 text-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-300 mx-auto"></div>
              <p className="mt-2 text-gray-500 text-sm">{t('common.loading')}</p>
            </div>
          ) : categories.length === 0 ? (
            <div className="p-4 text-center text-gray-500">Категории не найдены</div>
          ) : (
            <div className="py-2 max-h-[60vh] overflow-auto">
              {categories?.slice()?.reverse()?.map((category) => {
                const enabled = hasProducts(category.id);
                const label = getTranslatedValue(category.name, i18n.language);

                return enabled ? (
                  <Link
                    key={category.id}
                    href={`/${category.id}`}
                    onClick={handleDropdownClose}
                    className="flex justify-start items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors gap-2"
                  >
                    <Image src={`${imageUrl}${category?.image}`} width={30} height={30} alt={"image"} className='w-[30px] h-[30px] object-contain' />
                    <span className="font-medium">{label}</span>
                  </Link>
                ) : (
                  <div
                    key={category.id}
                    className="flex items-center justify-between px-4 py-3 text-gray-400 cursor-not-allowed select-none"
                    title="Скоро"
                  >
                    <div className='flex justify-start items-center gap-2'>
                      <Image className='w-[30px] h-[30px] object-contain' src={`${imageUrl}${category?.image}`} width={30} height={30} alt={"image"} />
                      <span className="font-medium">{label}</span>
                    </div>

                    <span className="text-xs">(скоро)</span>
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
