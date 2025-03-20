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
    { title: 'Tests - VocabMaster' },
    { name: 'description', content: 'Take vocabulary tests and track your progress' },
  ];
}

/**
 * Tests page component
 * Shows available tests and allows taking them
 */
export default function Tests() {
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
            <T keyName="tests.title">Vocabulary Tests</T>
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            <T keyName="tests.subtitle">
              Take tests to practice and improve your vocabulary
            </T>
          </p>
        </header>
        
        <div className="mb-6 flex justify-end">
          <Button variant="primary" onClick={() => navigate('/tests/new')}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            <T keyName="tests.createNew">Create New Test</T>
          </Button>
        </div>
        
        <Card>
          <CardContent className="p-12 text-center">
            <div className="mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              <T keyName="tests.comingSoon">Test Platform Coming Soon</T>
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
              <T keyName="tests.comingSoonMessage">
                We're building an interactive test platform to help you practice vocabulary effectively. Check back soon!
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