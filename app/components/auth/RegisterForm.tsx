import React, { useState } from 'react';
import { Link } from 'react-router';
import { Button, Input, Alert } from '../ui';
import { T } from '../common/T';
import { useAuth } from '../../contexts/AuthContext';
import { Spinner } from '../ui/Spinner';
import type { RegisterData } from '../../+types/user';

/**
 * RegisterForm Component
 * Handles user registration with form validation
 */
export function RegisterForm() {
  const { register, isLoading, error, clearError } = useAuth();
  
  const [formData, setFormData] = useState<RegisterData>({
    username: '',
    email: '',
    password: '',
    nativeLanguage: 'en'
  });
  
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  
  const [formErrors, setFormErrors] = useState<{
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    acceptTerms?: string;
  }>({});

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Form validation
  const validateForm = (): boolean => {
    const errors: {
      username?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
      acceptTerms?: string;
    } = {};
    let isValid = true;

    // Username validation
    if (!formData.username) {
      errors.username = 'Username is required';
      isValid = false;
    } else if (formData.username.length < 3) {
      errors.username = 'Username must be at least 3 characters';
      isValid = false;
    }

    // Email validation
    if (!formData.email) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    // Confirm password validation
    if (formData.password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    // Terms acceptance validation
    if (!acceptTerms) {
      errors.acceptTerms = 'You must accept the terms and conditions';
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
      await register(formData);
    } catch (err) {
      // Error will be handled by the auth context
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <Alert variant="error" onClose={clearError}>
          {error}
        </Alert>
      )}

      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          <T keyName="auth.register.usernameLabel">Username</T>
        </label>
        <div className="mt-1">
          <Input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            value={formData.username}
            onChange={handleChange}
            error={!!formErrors.username}
            required
            className="w-full"
          />
          {formErrors.username && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">{formErrors.username}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          <T keyName="auth.register.emailLabel">Email address</T>
        </label>
        <div className="mt-1">
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
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
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          <T keyName="auth.register.passwordLabel">Password</T>
        </label>
        <div className="mt-1">
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
            error={!!formErrors.password}
            required
            className="w-full"
          />
          {formErrors.password && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">{formErrors.password}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          <T keyName="auth.register.confirmPasswordLabel">Confirm password</T>
        </label>
        <div className="mt-1">
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={!!formErrors.confirmPassword}
            required
            className="w-full"
          />
          {formErrors.confirmPassword && (
            <p className="mt-2 text-sm text-red-600 dark:text-red-400">{formErrors.confirmPassword}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="nativeLanguage" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          <T keyName="auth.register.nativeLanguageLabel">Native language</T>
        </label>
        <div className="mt-1">
          <select
            id="nativeLanguage"
            name="nativeLanguage"
            value={formData.nativeLanguage}
            onChange={handleChange}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="en">English</option>
            <option value="zh">Chinese (中文)</option>
            <option value="es">Spanish (Español)</option>
            <option value="fr">French (Français)</option>
            <option value="de">German (Deutsch)</option>
            <option value="ja">Japanese (日本語)</option>
          </select>
        </div>
      </div>

      <div className="flex items-center">
        <input
          id="acceptTerms"
          name="acceptTerms"
          type="checkbox"
          checked={acceptTerms}
          onChange={(e) => setAcceptTerms(e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
        />
        <label htmlFor="acceptTerms" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
          <T keyName="auth.register.agreeToTerms">
            I agree to the <a href="#" className="text-primary-600 hover:text-primary-500">Terms of Service</a> and <a href="#" className="text-primary-600 hover:text-primary-500">Privacy Policy</a>
          </T>
        </label>
      </div>
      {formErrors.acceptTerms && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.acceptTerms}</p>
      )}

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
              <T keyName="auth.register.creatingAccount">Creating account...</T>
            </div>
          ) : (
            <T keyName="auth.register.createAccount">Create account</T>
          )}
        </Button>
      </div>

      <div className="text-center mt-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          <T keyName="auth.register.alreadyHaveAccount">Already have an account?</T>{' '}
          <Link 
            to="/login" 
            className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
          >
            <T keyName="auth.register.login">Sign in</T>
          </Link>
        </p>
      </div>
    </form>
  );
} 