import React from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router';
import type { Route } from '../../+types/root';
import { T } from '../../components/common/T';
import { Container, Card, CardHeader, CardTitle, CardContent } from '../../components/ui';
import AppLayout from '../../components/layout/AppLayout';
import { useUserStore } from '../../store';
import Button from '../../components/ui/Button';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Vocabulary - VocabMaster' },
    { name: 'description', content: 'Manage your vocabulary lists' },
  ];
}

/**
 * Vocabulary page component
 * Shows vocabulary lists and allows creating new ones
 */
export default function Vocabulary() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useUserStore();
  
  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  
  if (!isAuthenticated || !user) {
    return null; // Will redirect via useEffect
  }
  
  return (
    <AppLayout>
      <Container maxWidth="lg">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            <T keyName="vocabulary.title">Vocabulary Lists</T>
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            <T keyName="vocabulary.subtitle">
              Create and manage your vocabulary lists
            </T>
          </p>
        </header>
        
        <div className="mb-6 flex justify-end">
          <Button variant="primary" onClick={() => navigate('/vocabulary/new')}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            <T keyName="vocabulary.createNew">Create New List</T>
          </Button>
        </div>
        
        <Card>
          <CardContent className="p-12 text-center">
            <div className="mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              <T keyName="vocabulary.comingSoon">Vocabulary Management Coming Soon</T>
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
              <T keyName="vocabulary.comingSoonMessage">
                We're working on bringing you powerful vocabulary management tools. Check back soon!
              </T>
            </p>
            <Button onClick={() => navigate('/dashboard')}>
              <T keyName="common.backToDashboard">Back to Dashboard</T>
            </Button>
          </CardContent>
        </Card>
      </Container>
    </AppLayout>
  );
} 