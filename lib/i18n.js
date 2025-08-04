// lib/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation files
import ru from '../locales/ru/common.json';
import en from '../locales/en/common.json';
import uz from '../locales/uz/common.json';

const resources = {
  ru: {
    common: ru
  },
  en: {
    common: en
  },
  uz: {
    common: uz
  }
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ru',
    debug: process.env.NODE_ENV === 'development',
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },

    interpolation: {
      escapeValue: false,
    },

    react: {
      useSuspense: false,
    },

    ns: ['common'],
    defaultNS: 'common'
  });

export default i18n;