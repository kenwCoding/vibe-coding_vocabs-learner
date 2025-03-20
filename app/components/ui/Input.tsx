import React from 'react';
import { cn } from '../../utils/cn';

/**
 * Input component props
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Shows error styling
   */
  error?: boolean;
  /**
   * Optional left icon
   */
  leftIcon?: React.ReactNode;
  /**
   * Optional right icon
   */
  rightIcon?: React.ReactNode;
  /**
   * Wrapper class name
   */
  wrapperClassName?: string;
}

/**
 * Input component following the VocabMaster design system
 * 
 * @example
 * // Basic input
 * <Input placeholder="Enter your name" />
 * 
 * @example
 * // Input with error state
 * <Input error placeholder="Email address" />
 * 
 * @example
 * // Input with icon
 * <Input 
 *   leftIcon={<SearchIcon className="h-5 w-5 text-gray-400" />} 
 *   placeholder="Search..." 
 * />
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, leftIcon, rightIcon, wrapperClassName, ...props }, ref) => {
    return (
      <div className={cn('relative', wrapperClassName)}>
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            {leftIcon}
          </div>
        )}
        <input
          className={cn(
            'w-full py-2 px-4 border bg-white dark:bg-gray-800 rounded-md text-gray-900 dark:text-gray-100',
            'focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-600 transition-colors',
            'disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed',
            {
              'border-gray-300 dark:border-gray-600': !error,
              'border-error-500 bg-error-50 dark:bg-error-900/10': error,
              'pl-10': leftIcon,
              'pr-10': rightIcon,
            },
            className
          )}
          ref={ref}
          {...props}
        />
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            {rightIcon}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input; 