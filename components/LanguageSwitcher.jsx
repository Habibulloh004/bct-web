// components/LanguageSwitcher.jsx
'use client';

import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { lngItems } from '@/lib/utils';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
  };

  return (
    <div className="relative group">
      {/* Active language button */}
      <button className="h-10 w-10 flex items-center justify-center rounded-full border border-primary bg-white hover:bg-gray-100 transition-colors">
        <Image
          src={
            lngItems.find((lang) => lang.locale === i18n.language)?.icon ||
            '/assets/enIcon.svg'
          }
          alt="lang"
          width={24}
          height={24}
          className="rounded-full"
        />
      </button>

      {/* Dropdown menu */}
      <div className="absolute right-0 top-full mt-1 w-12 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        {lngItems.map((lang) => (
          <button
            key={lang.id}
            onClick={() => changeLanguage(lang.locale)}
            className={` w-20 gap-2 px-2 flex items-center justify-center py-2 transition-colors first:rounded-t-lg last:rounded-b-lg ${
              i18n.language === lang.locale ? 'bg-blue-50' : 'bg-white hover:bg-gray-50'
            }`}
          >
            <h1>{lang?.title}</h1>
            <Image
              src={lang.icon}
              alt={lang.title}
              width={24}
              height={24}
              className="rounded-full"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
