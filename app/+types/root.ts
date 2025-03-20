/**
 * Root types for the application
 */
export namespace Route {
  /**
   * Meta arguments type for route meta functions
   */
  export interface MetaArgs {
    data?: unknown;
    params: Record<string, string>;
    location: {
      pathname: string;
      search: string;
      hash: string;
    };
  }

  /**
   * Link function type definition
   */
  export type LinksFunction = () => Array<{
    rel: string;
    href: string;
    crossOrigin?: string;
  }>;

  /**
   * ErrorBoundary props type
   */
  export interface ErrorBoundaryProps {
    error: Error;
  }
} 