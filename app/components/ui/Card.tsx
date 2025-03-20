import React from 'react';
import { cn } from '../../utils/cn';

/**
 * Card container props
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Card component for content containers
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden", className)}
        {...props}
      />
    );
  }
);
Card.displayName = 'Card';

/**
 * Card header props
 */
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Card header component
 */
export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("p-6 border-b border-gray-200", className)}
        {...props}
      />
    );
  }
);
CardHeader.displayName = 'CardHeader';

/**
 * Card title props
 */
export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

/**
 * Card title component
 */
export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, ...props }, ref) => {
    return (
      <h3
        ref={ref}
        className={cn("text-lg font-semibold text-gray-900", className)}
        {...props}
      />
    );
  }
);
CardTitle.displayName = 'CardTitle';

/**
 * Card description props
 */
export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

/**
 * Card description component
 */
export const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn("mt-2 text-sm text-gray-600", className)}
        {...props}
      />
    );
  }
);
CardDescription.displayName = 'CardDescription';

/**
 * Card content props
 */
export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Card content component
 */
export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("p-6", className)} {...props} />
    );
  }
);
CardContent.displayName = 'CardContent';

/**
 * Card footer props
 */
export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Card footer component
 */
export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("p-6 bg-gray-50 border-t border-gray-200", className)}
        {...props}
      />
    );
  }
);
CardFooter.displayName = 'CardFooter';

export default Card; 