import React from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../utils/cn';
import T from './T';

/**
 * Language options for the application
 */
export const LANGUAGES = [
  { code: 'en', flag: '🇺🇸' },
  { code: 'zh', flag: '🇹🇼' }
];

/**
 * LanguageSwitcher component props
 */
interface LanguageSwitcherProps {
  className?: string;
  variant?: 'dropdown' | 'buttons';
}

/**
 * Language Switcher Component
 * Allows users to change the application language
 */
export function LanguageSwitcher({ 
  className, 
  variant = 'dropdown' 
}: LanguageSwitcherProps) {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);
  
  // Get current language display information
  const currentLanguage = LANGUAGES.find(lang => lang.code === i18n.language) || LANGUAGES[0];
  
  /**
   * Change the application language
   * @param langCode - Language code to switch to
   */
  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setIsOpen(false);
    
    // Save language preference to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('i18nextLng', langCode);
    }
  };
  
  // Dropdown style language switcher
  if (variant === 'dropdown') {
    return (
      <div className={cn("relative", className)}>
        <button
          type="button"
          className="flex items-center space-x-1 px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
          onClick={() => setIsOpen(!isOpen)}
          aria-haspopup="true"
          aria-expanded={isOpen}
          title={t('language.switcher')}
        >
          <span className="text-base">{currentLanguage.flag}</span>
          <span className="text-sm text-gray-700 dark:text-gray-300">
            <T keyName={`language.${currentLanguage.code}`}>{currentLanguage.code === 'en' ? 'English' : '繁體中文'}</T>
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {isOpen && (
          <div className="absolute right-0 z-20 mt-1 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1" role="menu" aria-orientation="vertical">
              {LANGUAGES.map(language => (
                <button
                  key={language.code}
                  className={cn(
                    "block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700",
                    language.code === i18n.language 
                      ? "bg-gray-100 dark:bg-gray-700 text-primary-600 dark:text-primary-400" 
                      : "text-gray-700 dark:text-gray-300"
                  )}
                  onClick={() => changeLanguage(language.code)}
                  role="menuitem"
                >
                  <div className="flex items-center">
                    <span className="mr-2 text-base">{language.flag}</span>
                    <T keyName={`language.${language.code}`}>
                      {language.code === 'en' ? 'English' : '繁體中文'}
                    </T>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
  
  // Simple buttons style language switcher
  return (
    <div className={cn("flex space-x-2", className)}>
      {LANGUAGES.map(language => (
        <button
          key={language.code}
          className={cn(
            "inline-flex items-center px-3 py-1 rounded-md text-sm",
            language.code === i18n.language 
              ? "bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300" 
              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          )}
          onClick={() => changeLanguage(language.code)}
        >
          <span className="mr-1">{language.flag}</span>
          <T keyName={`language.${language.code}`}>
            {language.code === 'en' ? 'English' : '繁體中文'}
          </T>
        </button>
      ))}
    </div>
  );
}

export default LanguageSwitcher; 