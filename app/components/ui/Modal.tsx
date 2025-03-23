import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../utils/cn';
import { X } from 'lucide-react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

/**
 * Modal component
 * A reusable modal dialog component with overlay
 */
export function Modal({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  className,
  maxWidth = 'md' 
}: ModalProps) {
  // Create a ref for the modal content
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Close modal when clicking outside or pressing escape key
  useEffect(() => {
    if (!isOpen) return;
    
    // Handle click outside
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    
    // Handle escape key
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    // Add event listeners when the modal is open
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);
    
    // Prevent body scrolling
    document.body.style.overflow = 'hidden';
    
    return () => {
      // Clean up event listeners
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
      
      // Restore body scrolling
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);
  
  // Style mapping for max width
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-full'
  };
  
  // Don't render anything if modal is closed
  if (!isOpen) return null;
  
  // Use portal to render modal at the end of document body
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
      <div 
        ref={modalRef}
        className={cn(
          "w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg",
          "overflow-hidden",
          maxWidthClasses[maxWidth],
          className
        )}
      >
        {title && (
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
              {title}
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 focus:outline-none"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}
        
        <div className="px-6 py-4">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}

export default Modal; 