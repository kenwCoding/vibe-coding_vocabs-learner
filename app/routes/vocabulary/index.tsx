import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router';
import type { Route } from '../../+types/root';
import { T } from '../../components/common/T';
import { Container, Card, CardHeader, CardTitle, CardContent, Button, Spinner, Badge } from '../../components/ui';
import AppLayout from '../../components/layout/AppLayout';
import { useUserStore } from '../../store';
import { VocabularyService } from '../../services/vocabulary.service';
import type { VocabList } from '../../types/graphql';

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
  const [lists, setLists] = useState<VocabList[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch vocabulary lists when component mounts
  useEffect(() => {
    const fetchLists = async () => {
      if (!isAuthenticated) return;
      
      try {
        setIsLoading(true);
        const data = await VocabularyService.getVocabLists();
        setLists(data);
      } catch (err) {
        console.error('Error fetching vocabulary lists:', err);
        setError('Failed to load vocabulary lists. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchLists();
  }, [isAuthenticated]);
  
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
        
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Spinner size="lg" />
          </div>
        ) : error ? (
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-red-500 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                <T keyName="common.error">Error</T>
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
              <Button onClick={() => window.location.reload()}>
                <T keyName="common.retry">Retry</T>
              </Button>
            </CardContent>
          </Card>
        ) : lists.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                <T keyName="vocabulary.noLists">No Vocabulary Lists Yet</T>
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                <T keyName="vocabulary.createFirstList">
                  You don't have any vocabulary lists yet. Create your first list to get started.
                </T>
              </p>
              <Button onClick={() => navigate('/vocabulary/new')}>
                <T keyName="vocabulary.createFirst">Create Your First List</T>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lists.map((list) => (
              <Card key={list.id} className="hover:shadow-md transition-shadow duration-200">
                <CardHeader>
                  <CardTitle>{list.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                    {list.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <Badge variant={list.level === 'beginner' ? 'success' : list.level === 'intermediate' ? 'warning' : 'error'}>
                      {list.level}
                    </Badge>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {list.items?.length || 0} <T keyName="vocabulary.items">items</T>
                    </span>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Link
                      to={`/vocabulary/${list.id}`}
                      className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 text-sm font-medium"
                    >
                      <T keyName="vocabulary.viewList">View List</T> →
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </Container>
    </AppLayout>
  );
} 