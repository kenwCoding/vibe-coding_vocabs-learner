import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
  className?: string;
}

/**
 * Select component
 * A styled select dropdown for choosing from options
 */
const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, children, ...props }, ref) => {
    return (
      <select
        className={cn(
          "block w-full px-3 py-2 border rounded-md shadow-sm appearance-none",
          "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500",
          "text-gray-900 bg-white dark:bg-gray-800 dark:text-gray-100",
          "dark:border-gray-700",
          error
            ? "border-red-300 focus:border-red-500 focus:ring-red-500"
            : "border-gray-300 dark:border-gray-600",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </select>
    );
  }
);

Select.displayName = 'Select';

export default Select; 