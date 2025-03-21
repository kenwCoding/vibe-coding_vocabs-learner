import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router';
import { T } from '../common/T';
import { Card, CardHeader, CardTitle, CardContent } from '../ui';
import { useUserStore, useVocabularyStore, useTestStore } from '../../store';

/**
 * Dashboard Content component
 * Contains all the dashboard data visualization, loaded after initial navigation completes
 */
export default function DashboardContent() {
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const user = useUserStore(state => state.user);
  
  // Load data only after component mounts
  useEffect(() => {
    // Delay data loading to ensure component is mounted
    const timer = setTimeout(() => {
      setIsDataLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);
  
  // Memoize data - only calculated when isDataLoaded is true
  const { recentLists, recentTests, stats } = useMemo(() => {
    if (!isDataLoaded || !user) {
      return {
        recentLists: [],
        recentTests: [],
        stats: {
          vocabListCount: 0,
          completedTestCount: 0,
          averageScore: 0
        }
      };
    }
    
    // Access store data only once
    const vocabLists = useVocabularyStore.getState().vocabLists;
    const tests = useTestStore.getState().tests;
    const attempts = useTestStore.getState().attempts;
    
    // Get recent lists - limit to 3
    const recentLists = Object.values(vocabLists)
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, 3);
      
    // Get recent tests - limit to 3
    const recentTests = Object.values(tests)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 3);
      
    // Calculate stats
    const userAttempts = attempts.filter(attempt => attempt.userId === user.id);
    const completedTests = userAttempts.filter(attempt => attempt.completedAt);
    const averageScore = completedTests.length 
      ? completedTests.reduce((sum, attempt) => sum + (attempt.score || 0), 0) / completedTests.length
      : 0;
    
    return {
      recentLists,
      recentTests,
      stats: {
        vocabListCount: Object.keys(vocabLists).length,
        completedTestCount: completedTests.length,
        averageScore
      }
    };
  }, [isDataLoaded, user]);
  
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Stats Card 1 */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-primary-100 dark:bg-primary-900">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  <T keyName="dashboard.stats.vocabLists">Vocabulary Lists</T>
                </p>
                <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">{stats.vocabListCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Stats Card 2 */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 dark:bg-green-900">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  <T keyName="dashboard.stats.testsCompleted">Tests Completed</T>
                </p>
                <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">{stats.completedTestCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Stats Card 3 */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  <T keyName="dashboard.stats.averageScore">Average Score</T>
                </p>
                <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {stats.averageScore.toFixed(1)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Vocabulary Lists */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            <T keyName="dashboard.recentLists">Recent Vocabulary Lists</T>
          </h2>
          <Link to="/vocabulary" className="text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300">
            <T keyName="dashboard.viewAll">View all</T>
          </Link>
        </div>
        
        {recentLists.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentLists.map(list => (
              <Card key={list.id}>
                <CardHeader>
                  <CardTitle>{list.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{list.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      {list.level}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {list.itemIds.length} <T keyName="dashboard.items">items</T>
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                <T keyName="dashboard.noLists">You don't have any vocabulary lists yet.</T>
              </p>
              <Link to="/vocabulary/new" className="mt-2 inline-flex items-center text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                <T keyName="dashboard.createList">Create your first list</T>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
      
      {/* Recent Tests */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            <T keyName="dashboard.recentTests">Recent Tests</T>
          </h2>
          <Link to="/tests" className="text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300">
            <T keyName="dashboard.viewAll">View all</T>
          </Link>
        </div>
        
        {recentTests.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentTests.map(test => (
              <Card key={test.id}>
                <CardHeader>
                  <CardTitle>{test.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{test.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                      {test.type}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {test.questions.length} <T keyName="dashboard.questions">questions</T>
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                <T keyName="dashboard.noTests">No tests available yet.</T>
              </p>
              <Link to="/tests/new" className="mt-2 inline-flex items-center text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                <T keyName="dashboard.createTest">Create a test</T>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
} 