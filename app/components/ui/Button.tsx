import React from 'react';
import { cn } from '../../utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Button component variants using class-variance-authority for type-safe variants
 * Following the VocabMaster design system
 */
const buttonVariants = cva(
  // Base styles applied to all buttons
  "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50",
        secondary: "bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 active:bg-blue-100 disabled:opacity-50",
        text: "bg-transparent text-blue-600 hover:bg-blue-50 active:bg-blue-100 disabled:opacity-50",
      },
      size: {
        sm: "text-sm px-3 py-1.5 h-8",
        md: "text-base px-4 py-2 h-10",
        lg: "text-lg px-5 py-2.5 h-12",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
    },
  }
);

/**
 * Button props interface
 */
export interface ButtonProps 
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * Optional icon to display before the button text
   */
  leftIcon?: React.ReactNode;
  /**
   * Optional icon to display after the button text
   */
  rightIcon?: React.ReactNode;
}

/**
 * Button component following the VocabMaster design system
 * 
 * @example
 * // Primary button (default)
 * <Button>Click me</Button>
 * 
 * @example
 * // Secondary button
 * <Button variant="secondary">Cancel</Button>
 * 
 * @example
 * // Text button with icon
 * <Button variant="text" rightIcon={<ArrowRightIcon />}>Learn more</Button>
 * 
 * @example
 * // Full width primary button
 * <Button fullWidth>Submit</Button>
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, leftIcon, rightIcon, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        {...props}
      >
        {leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button; 