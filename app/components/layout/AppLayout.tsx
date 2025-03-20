import React from 'react';
import Navbar from '../common/Navbar';

/**
 * Main application layout with navigation and footer
 */
const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-6">
        {children}
      </main>
    </div>
  );
};

export default AppLayout; 