import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import Button from '../../components/ui/Button';
import { Container, Input } from '../../components/ui';
import { T } from '../../components/common/T';
import type { Route } from '../../+types/root';
import { useUserStore } from '../../store';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Register - VocabMaster' },
    { name: 'description', content: 'Create a new VocabMaster account' },
  ];
}

/**
 * Registration page component
 * Allows users to create a new account
 */
export default function Register() {
  const navigate = useNavigate();
  const { register, isLoading, error, clearError } = useUserStore();
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nativeLanguage, setNativeLanguage] = useState<'en' | 'zh'>('en');
  const [formErrors, setFormErrors] = useState<{
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  
  const validateForm = () => {
    const errors: {
      username?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};
    let isValid = true;
    
    if (!username) {
      errors.username = 'Username is required';
      isValid = false;
    } else if (username.length < 3) {
      errors.username = 'Username must be at least 3 characters';
      isValid = false;
    }
    
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
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
      isValid = false;
    }
    
    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }
    
    setFormErrors(errors);
    return isValid;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      await register(username, email, password, nativeLanguage);
      navigate('/dashboard');
    } catch (err) {
      // Error will be handled by the store
    }
  };
  
  return (
    <div className="flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          <T keyName="auth.register.title">Create a new account</T>
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          <T keyName="auth.register.alreadyHaveAccount">Already have an account?</T>{' '}
          <Link 
            to="/login" 
            className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
          >
            <T keyName="auth.register.login">Sign in here</T>
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 rounded-md bg-red-50 dark:bg-red-900/20 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  {/* Error icon */}
                  <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-red-800 dark:text-red-200">{error}</p>
                </div>
              </div>
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
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
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
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
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                <T keyName="auth.register.passwordLabel">Password</T>
              </label>
              <div className="mt-1">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
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

            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                <T keyName="auth.register.confirmPasswordLabel">Confirm password</T>
              </label>
              <div className="mt-1">
                <Input
                  id="confirm-password"
                  name="confirm-password"
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
              <label htmlFor="native-language" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                <T keyName="auth.register.nativeLanguageLabel">Native language</T>
              </label>
              <div className="mt-1">
                <select
                  id="native-language"
                  name="native-language"
                  value={nativeLanguage}
                  onChange={(e) => setNativeLanguage(e.target.value as 'en' | 'zh')}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="en">English</option>
                  <option value="zh">Chinese (中文)</option>
                </select>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                <T keyName="auth.register.agreeToTerms">
                  I agree to the <a href="#" className="text-primary-600 hover:text-primary-500">Terms of Service</a> and <a href="#" className="text-primary-600 hover:text-primary-500">Privacy Policy</a>
                </T>
              </label>
            </div>

            <div>
              <Button 
                type="submit"
                variant="primary"
                fullWidth={true}
                disabled={isLoading}
              >
                {isLoading ? (
                  <T keyName="auth.register.creatingAccount">Creating account...</T>
                ) : (
                  <T keyName="auth.register.createAccount">Create account</T>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 