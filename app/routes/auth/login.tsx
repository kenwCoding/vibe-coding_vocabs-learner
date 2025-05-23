import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import type { Route } from '../../+types/root';
import { T } from '../../components/common/T';
import { Container, Card, CardHeader, CardTitle, CardContent } from '../../components/ui';
import { LoginForm } from '../../components/auth/LoginForm';
import { useAuth } from '../../contexts/AuthContext';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Login - VocabMaster' },
    { name: 'description', content: 'Sign in to your VocabMaster account' },
  ];
}

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  
  // Redirect to dashboard if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      // Navigate to the intended destination or dashboard
      const from = location.state?.from || '/dashboard';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);
  
  // Don't render the login form if already authenticated
  if (isAuthenticated) {
    return null;
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <Container maxWidth="sm">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Link to="/" className="flex items-center">
                <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  <T keyName="app.name">VocabMaster</T>
                </span>
              </Link>
            </div>
            <CardTitle>
              <T keyName="auth.login.title">Sign in to your account</T>
            </CardTitle>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              <T keyName="auth.login.subtitle">
                Welcome back! Enter your credentials to access your account.
              </T>
            </p>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </Container>
    </div>
  );
} 