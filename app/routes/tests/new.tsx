import React from 'react';
import { useNavigate } from "react-router";
import type { Route } from '../../+types/root';
import { T } from '../../components/common/T';
import { Container, Card, CardHeader, CardTitle, CardContent, Button } from '../../components/ui';
import AppLayout from '../../components/layout/AppLayout';
import { useUserStore } from '../../store';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Create New Test - VocabMaster' },
    { name: 'description', content: 'Create a new vocabulary test' },
  ];
}

/**
 * New Test page component
 * Allows users to create a new vocabulary test
 */
export default function NewTest() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useUserStore();
  
  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth/login');
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
            <T keyName="tests.new.title">Create New Test</T>
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            <T keyName="tests.new.subtitle">
              Create a new test to practice your vocabulary
            </T>
          </p>
        </header>
        
        <Card>
          <CardContent className="p-12 text-center">
            <div className="mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              <T keyName="tests.new.comingSoon">Create Test Feature Coming Soon</T>
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
              <T keyName="tests.new.comingSoonMessage">
                We're working on bringing you the ability to create and take vocabulary tests. Check back soon!
              </T>
            </p>
            <div className="flex justify-center space-x-4">
              <Button variant="secondary" onClick={() => navigate('/tests')}>
                <T keyName="common.backToTests">Back to Tests</T>
              </Button>
              <Button onClick={() => navigate('/dashboard')}>
                <T keyName="common.backToDashboard">Back to Dashboard</T>
              </Button>
            </div>
          </CardContent>
        </Card>
      </Container>
    </AppLayout>
  );
} 