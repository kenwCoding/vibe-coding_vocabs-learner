import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Props for the Translation component
 */
interface TProps {
  /**
   * Translation key string from the localization files
   */
  t: string;
  /**
   * Dynamic values to interpolate into the translation
   */
  values?: Record<string, string | number>;
}

/**
 * Translation component that simplifies i18n text rendering
 * 
 * @example
 * <T t="common.buttons.save" />
 * 
 * @example With values
 * <T t="greeting" values={{ name: 'John' }} />
 */
export const T: React.FC<TProps> = ({ t: key, values }) => {
  const { t } = useTranslation();
  return <>{t(key, values)}</>;
};

export default T; 