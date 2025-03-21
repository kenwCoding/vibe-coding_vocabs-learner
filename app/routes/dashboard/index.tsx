import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router';
import type { Route } from '../../+types/root';
import { T } from '../../components/common/T';
import { Container, Card } from '../../components/ui';
import AppLayout from '../../components/layout/AppLayout';
import { useUserStore } from '../../store';
import { Spinner } from '../../components/ui/Spinner';

// Lazy load the dashboard content to reduce initial bundle size and IPC calls
const DashboardContent = lazy(() => 
  // Add artificial delay to ensure navigation completes before heavy content loads
  new Promise<{ default: React.ComponentType<any> }>(resolve => 
    setTimeout(() => 
      import('../../components/dashboard/DashboardContent').then(module => resolve(module)),
      500 // Half second delay
    )
  )
);

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Dashboard - VocabMaster' },
    { name: 'description', content: 'View your vocabulary learning progress' },
  ];
}

/**
 * Dashboard page component
 * Main hub for authenticated users - optimized to prevent browser throttling
 */
export default function Dashboard() {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isAuthenticated = useUserStore(state => state.isAuthenticated);
  
  // Check authentication on initial render
  useEffect(() => {
    // If not authenticated, redirect to login
    if (!isAuthenticated) {
      navigate('/auth/login');
      return;
    }
    
    // Get username for the greeting
    const user = useUserStore.getState().user;
    if (user) {
      setUsername(user.username || user.email.split('@')[0]);
    }
    
    // Simulate a navigation delay before setting loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [isAuthenticated, navigate]);
  
  // If not authenticated, don't render anything
  if (!isAuthenticated) {
    return null;
  }
  
  return (
    <AppLayout>
      <Container>
        <div className="py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              <T keyName="dashboard.greeting" values={{ name: username || '' }}>
                Hello, {username}
              </T>
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              <T keyName="dashboard.subtitle">
                Here's an overview of your vocabulary learning progress
              </T>
            </p>
          </div>
          
          {isLoading ? (
            <Card className="p-8 flex justify-center items-center min-h-[400px]">
              <Spinner size="lg" />
            </Card>
          ) : (
            <Suspense fallback={
              <Card className="p-8 flex justify-center items-center min-h-[400px]">
                <Spinner size="lg" />
              </Card>
            }>
              <DashboardContent />
            </Suspense>
          )}
        </div>
      </Container>
    </AppLayout>
  );
} 