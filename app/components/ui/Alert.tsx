import React from 'react';
import { cn } from '../../utils/cn';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps {
  children: React.ReactNode;
  variant?: AlertVariant;
  className?: string;
  icon?: React.ReactNode;
  onClose?: () => void;
}

/**
 * Alert component for displaying messages of different types
 * Used for providing feedback to users
 */
export function Alert({
  children,
  variant = 'info',
  className,
  icon,
  onClose,
}: AlertProps) {
  // Style mappings based on variant
  const variantStyles = {
    info: 'bg-blue-50 text-blue-800 dark:bg-blue-900/20 dark:text-blue-200',
    success: 'bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-200',
    warning: 'bg-yellow-50 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200',
    error: 'bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-200',
  };

  // Icon color mappings
  const iconColorStyles = {
    info: 'text-blue-400 dark:text-blue-300',
    success: 'text-green-400 dark:text-green-300',
    warning: 'text-yellow-400 dark:text-yellow-300',
    error: 'text-red-400 dark:text-red-300',
  };

  // Default icons based on variant if not provided
  const defaultIcon = icon || getDefaultIcon(variant, iconColorStyles[variant]);

  return (
    <div
      className={cn(
        'rounded-md p-4',
        variantStyles[variant],
        className
      )}
      role="alert"
    >
      <div className="flex">
        {defaultIcon && (
          <div className="flex-shrink-0 mr-3">
            {defaultIcon}
          </div>
        )}
        <div className="flex-1">
          <div className="text-sm">{children}</div>
        </div>
        {onClose && (
          <div className="flex-shrink-0 ml-2">
            <button
              type="button"
              className={cn(
                'rounded-md inline-flex p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2',
                iconColorStyles[variant],
                'hover:bg-opacity-20 hover:bg-gray-500'
              )}
              onClick={onClose}
              aria-label="Close"
            >
              <span className="sr-only">Close</span>
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Helper function to get default icons based on variant
function getDefaultIcon(variant: AlertVariant, colorClass: string) {
  switch (variant) {
    case 'info':
      return (
        <svg
          className={cn('h-5 w-5', colorClass)}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          />
        </svg>
      );
    case 'success':
      return (
        <svg
          className={cn('h-5 w-5', colorClass)}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      );
    case 'warning':
      return (
        <svg
          className={cn('h-5 w-5', colorClass)}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      );
    case 'error':
      return (
        <svg
          className={cn('h-5 w-5', colorClass)}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
            clipRule="evenodd"
          />
        </svg>
      );
    default:
      return null;
  }
} 