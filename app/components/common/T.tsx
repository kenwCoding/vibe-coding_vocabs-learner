import { useTranslation } from 'react-i18next';
import React from 'react';

/**
 * Props for the Text (T) component
 * @property {string} keyName - Translation key name
 * @property {Record<string, any>} [values] - Values to interpolate into the translation
 * @property {string} [ns] - Namespace for the translation
 * @property {string} [className] - Additional CSS classes to apply
 * @property {React.ElementType} [tag] - HTML tag to render the text in
 * @property {React.ReactNode} [children] - Children elements (optional fallback)
 */
interface TProps {
  keyName: string;
  values?: Record<string, any>;
  ns?: string;
  className?: string;
  tag?: React.ElementType;
  children?: React.ReactNode;
}

/**
 * T (Text) component for internationalization
 * Renders text content based on translation keys, with optional fallback to children
 * 
 * @example
 * // Basic usage
 * <T keyName="buttons.save">Save</T>
 * 
 * @example
 * // With variables
 * <T keyName="test.score" values={{ score: 85, total: 100 }}>
 *   You scored 85 out of 100
 * </T>
 * 
 * @example
 * // With custom HTML tag and classes
 * <T keyName="dashboard.welcome" tag="h2" className="text-xl font-semibold">
 *   Welcome to your dashboard
 * </T>
 */
export const T = ({ 
  keyName, 
  values, 
  ns = 'common', 
  className = '', 
  tag: Tag = 'span',
  children
}: TProps) => {
  const { t } = useTranslation(ns);
  
  // If children are provided, they serve as fallback
  return (
    <Tag className={className}>
      {t(keyName, values) || children}
    </Tag>
  );
};

export default T; 