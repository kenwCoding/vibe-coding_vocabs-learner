import React from 'react';
import Navbar from '../common/Navbar';

/**
 * Main application layout with navigation and footer
 */
const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="flex-grow py-8">
        {children}
      </main>
    </div>
  );
};

export default AppLayout; 