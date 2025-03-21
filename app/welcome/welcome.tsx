import React from 'react';
import { Link, useNavigate } from 'react-router';
import { T } from "../components/common/T";
import { Button } from "../components/ui";
import { useUserStore } from "../store";

export function Welcome() {
  const { isAuthenticated } = useUserStore();
  const navigate = useNavigate();
  
  return (
    <div className="bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 pb-16">
      {/* Hero Section */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-20">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-6">
              <T keyName="home.hero.title">
                Master New Vocabulary <span className="text-primary-600 dark:text-primary-400">Effectively</span>
              </T>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
              <T keyName="home.hero.subtitle">
                Expand your language skills with our AI-powered vocabulary learning platform. 
                Create custom lists, take adaptive tests, and track your progress.
              </T>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              {isAuthenticated ? (
                <Button 
                  variant="primary" 
                  onClick={() => navigate('/dashboard')}
                >
                  <T keyName="home.hero.dashboardButton">Go to Dashboard</T>
                </Button>
              ) : (
                <>
                  <Button 
                    variant="primary" 
                    onClick={() => navigate('/auth/register')}
                  >
                    <T keyName="home.hero.getStartedButton">Get Started Free</T>
                  </Button>
                  <Button 
                    variant="secondary" 
                    onClick={() => navigate('/auth/login')}
                  >
                    <T keyName="home.hero.loginButton">Sign In</T>
                  </Button>
                </>
              )}
            </div>
          </div>
          <div className="flex-1 hidden md:block">
            <div className="relative">
              {/* Hero image representing vocabulary learning */}
              <div className="relative z-10 shadow-xl rounded-lg overflow-hidden border-4 border-white dark:border-gray-800">
                <div className="bg-gradient-to-br from-primary-500 to-primary-700 p-8 aspect-[4/3] flex items-center justify-center">
                  <div className="text-center text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32 mx-auto mb-4 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <h3 className="text-2xl font-bold">VocabMaster</h3>
                    <p className="text-primary-100">Learn. Practice. Master.</p>
                  </div>
                </div>
              </div>
              {/* Background decorative elements */}
              <div className="absolute top-4 -right-4 w-32 h-32 bg-yellow-400 dark:bg-yellow-600 rounded-lg opacity-50 dark:opacity-30 -z-1"></div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-blue-400 dark:bg-blue-600 rounded-lg opacity-50 dark:opacity-30 -z-1"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
          <T keyName="home.features.title">Why Choose VocabMaster?</T>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              <T keyName="home.features.feature1.title">Personalized Learning</T>
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              <T keyName="home.features.feature1.description">
                Create custom vocabulary lists tailored to your interests, profession, or learning goals.
              </T>
            </p>
          </div>
          
          {/* Feature 2 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              <T keyName="home.features.feature2.title">Progress Tracking</T>
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              <T keyName="home.features.feature2.description">
                Monitor your learning journey with detailed statistics and visualizations of your improvement over time.
              </T>
            </p>
          </div>
          
          {/* Feature 3 */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              <T keyName="home.features.feature3.title">AI-Powered Tests</T>
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              <T keyName="home.features.feature3.description">
                Take adaptive tests that adjust to your knowledge level and focus on areas where you need more practice.
              </T>
            </p>
          </div>
        </div>
      </div>
      
      {/* Call to Action */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="bg-primary-600 dark:bg-primary-700 rounded-2xl p-8 md:p-12 shadow-xl">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              <T keyName="home.cta.title">Ready to Expand Your Vocabulary?</T>
            </h2>
            <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
              <T keyName="home.cta.description">
                Join thousands of learners who have improved their language skills with VocabMaster.
              </T>
            </p>
            <Button 
              variant="secondary" 
              onClick={() => navigate(isAuthenticated ? '/dashboard' : '/auth/register')}
            >
              <T keyName="home.cta.button">
                {isAuthenticated ? 'Go to Dashboard' : 'Start Learning Now'}
              </T>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
