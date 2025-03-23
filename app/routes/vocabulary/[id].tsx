import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router';
import type { Route } from '../../+types/root';
import { T } from '../../components/common/T';
import { 
  Container, 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  Button, 
  Spinner, 
  Badge 
} from '../../components/ui';
import { getLevelVariant, formatLevelForDisplay } from '../../components/ui/Badge';
import AppLayout from '../../components/layout/AppLayout';
import { useUserStore } from '../../store';
import { VocabularyService } from '../../services/vocabulary.service';
import type { VocabList, VocabItem } from '../../types/graphql';
import { ArrowLeft } from 'lucide-react';

export function meta({ params }: Route.MetaArgs) {
  return [
    { title: `Vocabulary List - VocabMaster` },
    { name: 'description', content: 'View vocabulary list details' },
  ];
}

/**
 * Single Vocabulary List page component
 * Shows details of a vocabulary list and its items
 */
export default function VocabularyList() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { user, isAuthenticated } = useUserStore();
  
  const [list, setList] = useState<VocabList | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch vocabulary list when component mounts
  useEffect(() => {
    const fetchList = async () => {
      if (!isAuthenticated || !id) return;
      
      try {
        setIsLoading(true);
        const data = await VocabularyService.getVocabList(id);
        console.log('Fetched vocabulary list:', data);
        console.log('List level:', data.level);
        setList(data);
      } catch (err) {
        console.error('Error fetching vocabulary list:', err);
        setError('Failed to load vocabulary list. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchList();
  }, [id, isAuthenticated]);
  
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
              <div className="flex justify-center space-x-4">
                <Button onClick={() => navigate('/vocabulary')}>
                  <T keyName="common.backToLists">Back to Lists</T>
                </Button>
                <Button variant="primary" onClick={() => window.location.reload()}>
                  <T keyName="common.retry">Retry</T>
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : !list ? (
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-yellow-500 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                <T keyName="vocabulary.notFound">List Not Found</T>
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                <T keyName="vocabulary.notFoundMessage">
                  The vocabulary list you're looking for could not be found.
                </T>
              </p>
              <Button onClick={() => navigate('/vocabulary')}>
                <T keyName="common.backToLists">Back to Lists</T>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            <header className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-4">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {list.title}
                  </h1>
                  <Badge 
                    variant={getLevelVariant(list.level)}
                    className="capitalize"
                  >
                    {formatLevelForDisplay(list.level)}
                  </Badge>
                </div>
                <Link
                  to="/vocabulary"
                  className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 flex items-center gap-1"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <T keyName="common.back">Back</T>
                </Link>
              </div>
              <div className="mt-4 md:mt-0 flex space-x-3">
                <Button onClick={() => navigate('/vocabulary')}>
                  <T keyName="common.backToLists">Back to Lists</T>
                </Button>
                <Button variant="primary">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                  <T keyName="common.edit">Edit</T>
                </Button>
              </div>
            </header>
            
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                <T keyName="vocabulary.items">Vocabulary Items</T> ({list.items?.length || 0})
              </h2>
              <Button variant="primary" size="sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                <T keyName="vocabulary.addItem">Add New Item</T>
              </Button>
            </div>
            
            {list.items?.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                    <T keyName="vocabulary.noItems">No Items Yet</T>
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                    <T keyName="vocabulary.noItemsMessage">
                      This vocabulary list doesn't have any items yet. Add your first item to get started.
                    </T>
                  </p>
                  <Button variant="primary">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    <T keyName="vocabulary.addFirstItem">Add Your First Item</T>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {list.items?.map((item) => (
                  <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow duration-200">
                    <div className="md:flex">
                      <div className="md:w-1/3 bg-gray-50 dark:bg-gray-800 p-6 flex flex-col justify-center">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                          {item.term}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                          {item.partOfSpeech}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {item.tags?.map((tag) => (
                            <span 
                              key={tag} 
                              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="md:w-2/3 p-6">
                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                            <T keyName="vocabulary.definition">Definition (English)</T>
                          </h4>
                          <p className="text-gray-900 dark:text-gray-100">{item.definitionEn}</p>
                        </div>
                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                            <T keyName="vocabulary.definitionZh">Definition (Chinese)</T>
                          </h4>
                          <p className="text-gray-900 dark:text-gray-100">{item.definitionZh}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                            <T keyName="vocabulary.example">Example</T>
                          </h4>
                          <p className="text-gray-900 dark:text-gray-100 italic">{item.exampleSentence}</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}
      </Container>
    </AppLayout>
  );
} 