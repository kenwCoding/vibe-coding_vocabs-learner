import React from 'react';
import { cn } from '../../utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Helper function to normalize vocabulary level values
 * Ensures consistent level values for badge display
 */
export function normalizeLevel(level: string | undefined): 'beginner' | 'intermediate' | 'advanced' {
  if (!level) return 'beginner';
  
  const normalizedLevel = level.toLowerCase();
  
  if (normalizedLevel === 'beginner') return 'beginner';
  if (normalizedLevel === 'intermediate') return 'intermediate';
  if (normalizedLevel === 'advanced') return 'advanced';
  
  return 'beginner'; // Default to beginner if unknown level
}

/**
 * Helper function to get badge variant based on vocabulary level
 */
export function getLevelVariant(level: string | undefined): 'success' | 'warning' | 'error' {
  const normalizedLevel = normalizeLevel(level);
  
  if (normalizedLevel === 'beginner') return 'success';
  if (normalizedLevel === 'intermediate') return 'warning';
  return 'error'; // Advanced or unknown
}

/**
 * Helper function to format level for display with proper capitalization
 */
export function formatLevelForDisplay(level: string | undefined): string {
  const normalizedLevel = normalizeLevel(level);
  
  if (normalizedLevel === 'beginner') return 'Beginner';
  if (normalizedLevel === 'intermediate') return 'Intermediate';
  if (normalizedLevel === 'advanced') return 'Advanced';
  
  return 'Unknown Level';
}

/**
 * Badge component variants using class-variance-authority for type-safe variants
 * Following the VocabMaster design system
 */
const badgeVariants = cva(
  // Base styles applied to all badges
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
  {
    variants: {
      variant: {
        default: "bg-blue-100 text-blue-800",
        primary: "bg-blue-100 text-blue-800",
        secondary: "bg-gray-100 text-gray-800",
        success: "bg-green-100 text-green-800",
        warning: "bg-yellow-100 text-yellow-800",
        error: "bg-red-100 text-red-800",
        info: "bg-indigo-100 text-indigo-800",
      },
      outline: {
        true: "bg-transparent border border-current",
      },
    },
    defaultVariants: {
      variant: "default",
      outline: false,
    },
    compoundVariants: [
      {
        variant: "primary",
        outline: true,
        className: "text-blue-600 border-blue-600",
      },
      {
        variant: "secondary",
        outline: true,
        className: "text-gray-600 border-gray-600",
      },
      {
        variant: "success",
        outline: true,
        className: "text-green-600 border-green-600",
      },
      {
        variant: "warning",
        outline: true,
        className: "text-yellow-600 border-yellow-600",
      },
      {
        variant: "error",
        outline: true,
        className: "text-red-600 border-red-600",
      },
      {
        variant: "info",
        outline: true,
        className: "text-indigo-600 border-indigo-600",
      },
    ],
  }
);

/**
 * Badge props interface
 */
export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  /**
   * Optional icon to display before the badge text
   */
  leftIcon?: React.ReactNode;
  /**
   * Optional icon to display after the badge text
   */
  rightIcon?: React.ReactNode;
}

/**
 * Badge component for displaying small labels, statuses, or counts
 * 
 * @example
 * // Default badge (primary)
 * <Badge>New</Badge>
 * 
 * @example
 * // Success badge
 * <Badge variant="success">Completed</Badge>
 * 
 * @example
 * // Error badge
 * <Badge variant="error">Failed</Badge>
 */
export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, outline, leftIcon, rightIcon, children, ...props }, ref) => {
    return (
      <div
        className={cn(badgeVariants({ variant, outline, className }))}
        ref={ref}
        {...props}
      >
        {leftIcon && <span className="mr-1">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="ml-1">{rightIcon}</span>}
      </div>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge; 