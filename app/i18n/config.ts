import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
import enCommon from './locales/en/common.json';
import zhCommon from './locales/zh/common.json';

/**
 * Initialize i18next with configuration for our application
 * - Detects browser language
 * - Sets up English and Chinese translations
 * - Configures fallback language to English
 */
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: enCommon,
      },
      zh: {
        common: zhCommon,
      },
    },
    fallbackLng: 'en',
    defaultNS: 'common',
    interpolation: {
      escapeValue: false, // React already safely escapes content
    },
    react: {
      useSuspense: false, // Prevent issues with React Suspense
    },
  });

export default i18n; 