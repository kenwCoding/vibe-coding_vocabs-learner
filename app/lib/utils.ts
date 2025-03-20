/**
 * WARNING: For the cn() utility function to merge class names, 
 * import from '../../utils/cn' instead of this file.
 */
import { clsx } from 'clsx';
import type { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function for merging class names with Tailwind classes
 * Used to combine conditional class names with Tailwind's utility classes
 * 
 * @param inputs - Class values to merge
 * @returns A string of merged class names
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a date to a readable string
 * 
 * @param date - Date to format
 * @param options - Intl.DateTimeFormatOptions
 * @returns Formatted date string
 */
export function formatDate(
  date: Date | string,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', options).format(dateObj);
}

/**
 * Truncate a string to a specified length
 * 
 * @param str - String to truncate
 * @param length - Maximum length
 * @param ending - String to append at the end (default: '...')
 * @returns Truncated string
 */
export function truncateString(str: string, length: number, ending = '...'): string {
  if (str.length <= length) {
    return str;
  }
  return str.substring(0, length - ending.length) + ending;
}

/**
 * Delay execution for a specified time
 * 
 * @param ms - Milliseconds to delay
 * @returns A promise that resolves after the delay
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Handle API errors and provide a human-readable message
 * 
 * @param error - The error object
 * @returns A user-friendly error message
 */
export function handleApiError(error: any): string {
  if (error?.graphQLErrors?.length) {
    // GraphQL error
    return error.graphQLErrors[0]?.message || 'Something went wrong';
  } else if (error?.networkError) {
    // Network error
    return 'Network error. Please check your connection.';
  } else if (error?.message) {
    // Error with message
    return error.message;
  }
  
  // Default error message
  return 'An unexpected error occurred';
} 