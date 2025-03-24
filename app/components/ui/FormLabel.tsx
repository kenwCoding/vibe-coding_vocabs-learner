import React from 'react';
import { cn } from '../../utils/cn';

export interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  className?: string;
  htmlFor: string;
}

/**
 * FormLabel component
 * A styled label for form elements
 */
const FormLabel: React.FC<FormLabelProps> = ({ children, className, htmlFor, ...props }) => {
  return (
    <label
      className={cn(
        "block text-sm font-medium text-gray-700 dark:text-gray-300",
        className
      )}
      htmlFor={htmlFor}
      {...props}
    >
      {children}
    </label>
  );
};

export default FormLabel; 