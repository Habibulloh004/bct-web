// components/MobileLanguageSwitcher.jsx
'use client';

import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

export default function MobileLanguageSwitcher({ onLanguageChange }) {
  const { i18n, t } = useTranslation();

  const languages = [
    { code: 'ru', name: t('language.ru'), flag: '🇷🇺' },
    { code: 'en', name: t('language.en'), flag: '🇺🇸' },
    { code: 'uz', name: t('language.uz'), flag: '🇺🇿' },
  ];

  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
    if (onLanguageChange) onLanguageChange();
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 px-4 py-2 text-gray-600">
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium">Язык / Language / Til</span>
      </div>
      <div className="space-y-1">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={`w-full flex items-center gap-3 px-6 py-3 text-left hover:bg-gray-50 transition-colors ${
              i18n.language === lang.code ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' : 'text-gray-700'
            }`}
          >
            <span className="text-lg">{lang.flag}</span>
            <span className="text-sm font-medium">{lang.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}