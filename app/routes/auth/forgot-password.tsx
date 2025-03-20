import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import type { Route } from '../../+types/root';
import { T } from '../../components/common/T';
import { Container, Card, CardHeader, CardTitle, CardContent, Button, Input, Alert } from '../../components/ui';
import { useAuth } from '../../contexts/AuthContext';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Reset Password - VocabMaster' },
    { name: 'description', content: 'Reset your VocabMaster password' },
  ];
}

/**
 * ForgotPassword Component
 * Allows users to request a password reset
 */
export default function ForgotPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const [email, setEmail] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);
  
  // Redirect to dashboard if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      // Navigate to the dashboard if already logged in
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);
  
  // Don't render the form if already authenticated
  if (isAuthenticated) {
    return null;
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    
    try {
      // This would normally call an API endpoint
      // For now, we'll just simulate a successful response
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess(true);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <T keyName="auth.forgotPassword.title">Reset your password</T>
            </CardTitle>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              <T keyName="auth.forgotPassword.description">
                Enter your email address and we'll send you instructions to reset your password.
              </T>
            </p>
          </CardHeader>
          <CardContent>
            {success ? (
              <div className="text-center">
                <Alert variant="success">
                  <T keyName="auth.forgotPassword.successMessage">
                    If an account exists with that email, we've sent password reset instructions.
                  </T>
                </Alert>
                <div className="mt-4">
                  <Link
                    to="/login"
                    className="text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
                  >
                    <T keyName="auth.forgotPassword.backToLogin">Back to login</T>
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <Alert variant="error" onClose={() => setError(null)}>
                    {error}
                  </Alert>
                )}

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    <T keyName="auth.forgotPassword.emailLabel">Email address</T>
                  </label>
                  <div className="mt-1">
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full"
                    />
                  </div>
                </div>

                <div>
                  <Button 
                    type="submit"
                    variant="primary"
                    fullWidth={true}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <T keyName="auth.forgotPassword.sending">Sending instructions...</T>
                    ) : (
                      <T keyName="auth.forgotPassword.submit">Send reset instructions</T>
                    )}
                  </Button>
                </div>

                <div className="text-center mt-4">
                  <Link
                    to="/login"
                    className="text-sm text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
                  >
                    <T keyName="auth.forgotPassword.rememberPassword">Remember your password?</T>
                  </Link>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}
