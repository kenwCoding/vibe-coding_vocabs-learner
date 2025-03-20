/**
 * Utility functions for browser detection and safe localStorage access
 */

// Check if the code is running in a browser environment
export const isBrowser = typeof window !== 'undefined';

/**
 * Safe localStorage get method that works in both browser and server environments
 * @param key The key to retrieve from localStorage
 * @returns The value from localStorage or null
 */
export const safeLocalStorageGet = (key: string): string | null => {
  if (isBrowser) {
    return localStorage.getItem(key);
  }
  return null;
};

/**
 * Safe localStorage set method that works in both browser and server environments
 * @param key The key to set in localStorage
 * @param value The value to set
 */
export const safeLocalStorageSet = (key: string, value: string): void => {
  if (isBrowser) {
    localStorage.setItem(key, value);
  }
};

/**
 * Safe localStorage remove method that works in both browser and server environments
 * @param key The key to remove from localStorage
 */
export const safeLocalStorageRemove = (key: string): void => {
  if (isBrowser) {
    localStorage.removeItem(key);
  }
}; 