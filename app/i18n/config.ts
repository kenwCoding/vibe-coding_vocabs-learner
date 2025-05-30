import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { isBrowser } from '../utils/browser';

// Import translations
import enCommon from './locales/en/common.json';
import zhCommon from './locales/zh/common.json';

/**
 * Initialize i18next with configuration for our application
 * - Detects browser language
 * - Sets up English and Chinese translations
 * - Configures fallback language to English
 */

// Create a single initialization function that will only run once
const initializeI18n = (() => {
  let isInitialized = false;
  
  return () => {
    if (isInitialized || i18n.isInitialized) {
      if (import.meta.env.DEV && isBrowser) {
        console.log('i18n already initialized, skipping initialization');
      }
      return i18n;
    }
    
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
        debug: import.meta.env.DEV, // Enable debug in development
        defaultNS: 'common',
        ns: ['common'],
        interpolation: {
          escapeValue: false, // React already safely escapes content
        },
        detection: {
          order: ['localStorage', 'navigator'],
          caches: ['localStorage'],
          lookupLocalStorage: 'i18nextLng',
        },
        react: {
          useSuspense: false, // Prevent issues with React Suspense
        },
        // Language names in their own language
        supportedLngs: ['en', 'zh'],
        load: 'languageOnly', // Only load language without region (en instead of en-US)
      });
    
    isInitialized = true;
    
    // Log loaded resources in development
    if (import.meta.env.DEV && isBrowser) {
      console.log('i18n initialized with resources:', i18n.options.resources);
    }
    
    return i18n;
  };
})();

// Execute the initialization
initializeI18n();

export default i18n; 