import React, { useState } from 'react';
import { Link } from 'react-router';
import T from './T';
import { Container } from '../ui';
import { useUserStore } from '../../store';
import LanguageSwitcher from './LanguageSwitcher';

/**
 * Navigation bar for the VocabMaster application
 * Shows different links based on authentication state
 */
export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useUserStore();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  
  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };
  
  return (
    <nav className="bg-white shadow-sm dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <Container>
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
                <T keyName="app.name">VocabMaster</T>
              </span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <Link 
                to="/" 
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-700"
              >
                <T keyName="nav.home">Home</T>
              </Link>
              
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/dashboard" 
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-700"
                  >
                    <T keyName="nav.dashboard">Dashboard</T>
                  </Link>
                  <Link 
                    to="/vocabulary" 
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-700"
                  >
                    <T keyName="nav.vocabulary">Vocabulary</T>
                  </Link>
                  <Link 
                    to="/tests" 
                    className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-700"
                  >
                    <T keyName="nav.tests">Tests</T>
                  </Link>
                </>
              ) : (
                <Link 
                  to="/showcase" 
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-700"
                >
                  <T keyName="nav.components">Components</T>
                </Link>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <LanguageSwitcher />
            
            {isAuthenticated ? (
              <div className="relative">
                <button
                  type="button"
                  className="flex items-center max-w-xs rounded-full bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                  id="user-menu-button"
                  aria-expanded={userMenuOpen}
                  aria-haspopup="true"
                  onClick={toggleUserMenu}
                >
                  <span className="sr-only">Open user menu</span>
                  <div className="h-8 w-8 rounded-full bg-primary-500 dark:bg-primary-600 flex items-center justify-center text-white">
                    {user?.username.charAt(0).toUpperCase()}
                  </div>
                </button>
                
                {userMenuOpen && (
                  <div
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                  >
                    <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                      <p className="font-medium">{user?.username}</p>
                      <p className="text-gray-500 dark:text-gray-400 text-xs">{user?.email}</p>
                    </div>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      role="menuitem"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <T keyName="nav.profile">Your Profile</T>
                    </Link>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      role="menuitem"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <T keyName="nav.settings">Settings</T>
                    </Link>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      role="menuitem"
                      onClick={() => {
                        logout();
                        setUserMenuOpen(false);
                      }}
                    >
                      <T keyName="nav.signOut">Sign out</T>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-900 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-700"
                >
                  <T keyName="nav.login">Sign in</T>
                </Link>
                <Link
                  to="/register"
                  className="px-3 py-2 rounded-md text-sm font-medium bg-primary-600 text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                  <T keyName="nav.register">Register</T>
                </Link>
              </div>
            )}
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar; 