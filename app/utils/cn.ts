import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class values using clsx and then merges Tailwind classes using tailwind-merge
 * This ensures proper class name merging and avoids conflicts or redundancies
 * 
 * @example
 * // Simple usage
 * cn('text-red-500', 'bg-blue-500')
 * 
 * @example
 * // With conditional classes
 * cn('text-lg', isLarge && 'text-xl', { 'font-bold': isBold })
 * 
 * @example
 * // Merging Tailwind utilities properly
 * cn('px-2 py-1', 'py-2') // Outputs 'px-2 py-2' instead of 'px-2 py-1 py-2'
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
} 