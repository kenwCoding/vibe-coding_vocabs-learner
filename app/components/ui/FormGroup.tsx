import React from 'react';
import { cn } from '../../utils/cn';

export interface FormGroupProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * FormGroup component
 * Used to group related form elements like labels, inputs, and error messages
 */
const FormGroup: React.FC<FormGroupProps> = ({ children, className }) => {
  return (
    <div className={cn("space-y-2", className)}>
      {children}
    </div>
  );
};

export default FormGroup; 