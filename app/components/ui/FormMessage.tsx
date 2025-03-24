import React from 'react';
import { cn } from '../../utils/cn';

export interface FormMessageProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * FormMessage component
 * Used to display validation messages or errors for form inputs
 */
const FormMessage: React.FC<FormMessageProps> = ({ children, className }) => {
  return (
    <p className={cn("mt-1 text-sm text-red-600 dark:text-red-400", className)}>
      {children}
    </p>
  );
};

export default FormMessage; 