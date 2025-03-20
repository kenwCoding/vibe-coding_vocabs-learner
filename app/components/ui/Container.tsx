import React from 'react';
import { cn } from '../../utils/cn';

/**
 * Container component props
 */
export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Maximum width of the container
   */
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

/**
 * Container component for consistent page layout and spacing
 * 
 * @example
 * // Default container (max-width: 1280px)
 * <Container>Content goes here</Container>
 * 
 * @example
 * // Small container
 * <Container maxWidth="sm">Narrower content</Container>
 * 
 * @example
 * // Full width container with padding
 * <Container maxWidth="full">Edge-to-edge content</Container>
 */
export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, maxWidth = 'xl', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'w-full mx-auto px-4 sm:px-6 lg:px-8',
          {
            'max-w-xs': maxWidth === 'xs',
            'max-w-sm': maxWidth === 'sm',
            'max-w-md': maxWidth === 'md',
            'max-w-lg': maxWidth === 'lg',
            'max-w-xl': maxWidth === 'xl',
            'max-w-2xl': maxWidth === '2xl',
            'max-w-full': maxWidth === 'full',
          },
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = 'Container';

export default Container; 