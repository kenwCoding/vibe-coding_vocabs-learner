import React from 'react';
import T from './T';
import { Container } from '../ui';

/**
 * Simple navigation bar for the VocabMaster application
 * Uses regular anchor tags until we resolve React Router Link issues
 */
export const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-sm dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <Container>
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
                <T keyName="app.name">VocabMaster</T>
              </span>
            </a>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <a 
                href="/" 
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-700"
              >
                <T keyName="nav.home">Home</T>
              </a>
              <a 
                href="/showcase" 
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-700"
              >
                <T keyName="nav.components">Components</T>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar; 