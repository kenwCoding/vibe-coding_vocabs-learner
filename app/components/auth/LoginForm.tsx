import React, { useState } from 'react';
import { Link } from 'react-router';
import { Button, Input, Alert } from '../ui';
import { T } from '../common/T';
import { useAuth } from '../../contexts/AuthContext';
import { Spinner } from '../ui/Spinner';

/**
 * LoginForm Component
 * Handles user login with email and password
 */
export function LoginForm() {
  const { login, isLoading, error, clearError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  // Form validation
  const validateForm = (): boolean => {
    const errors: { email?: string; password?: string } = {};
    let isValid = true;

    if (!email) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
      isValid = false;
    }

    if (!password) {
      errors.password = 'Password is required';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    if (!validateForm()) {
      return;
    }

    try {
      await login(email, password);
    } catch (err) {
      // Error will be handled by the auth context
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert variant="error" onClose={clearError}>
          {error}
        </Alert>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          <T keyName="auth.login.emailLabel">Email address</T>
        </label>
        <div className="mt-1">
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!formErrors.email}
            required
            className="w-full"
          />
          {formErrors.email && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">{formErrors.email}</p>
          )}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            <T keyName="auth.login.passwordLabel">Password</T>
          </label>
          <div className="text-sm">
            <Link
              to="/forgot-password"
              className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
            >
              <T keyName="auth.login.forgotPassword">Forgot your password?</T>
            </Link>
          </div>
        </div>
        <div className="mt-1">
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!formErrors.password}
            required
            className="w-full"
          />
          {formErrors.password && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">{formErrors.password}</p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
            <T keyName="auth.login.rememberMe">Remember me</T>
          </label>
        </div>
        
        <div className="text-sm">
          <Link
            to="/register"
            className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
          >
            <T keyName="auth.login.noAccount">Don't have an account?</T>
          </Link>
        </div>
      </div>

      <div>
        <Button 
          type="submit"
          variant="primary"
          fullWidth={true}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <Spinner size="sm" className="mr-2" />
              <T keyName="auth.login.signingIn">Signing in...</T>
            </div>
          ) : (
            <T keyName="auth.login.signIn">Sign in</T>
          )}
        </Button>
      </div>
    </form>
  );
} 