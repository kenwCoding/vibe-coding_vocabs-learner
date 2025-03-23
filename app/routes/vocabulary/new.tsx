import React, { useState } from 'react';
import { useNavigate } from "react-router";
import type { Route } from '../../+types/root';
import { T } from '../../components/common/T';
import { 
  Container, 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  Button, 
  Input,
  Select,
  Textarea,
  FormGroup,
  FormLabel,
  FormMessage 
} from '../../components/ui';
import AppLayout from '../../components/layout/AppLayout';
import { useUserStore } from '../../store';
import { VocabularyService } from '../../services/vocabulary.service';
import type { VocabListInput } from '../../types/graphql';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Create Vocabulary List - VocabMaster' },
    { name: 'description', content: 'Create a new vocabulary list' },
  ];
}

/**
 * New Vocabulary List page component
 * Allows users to create a new vocabulary list
 */
export default function NewVocabularyList() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useUserStore();
  
  // Form state
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    level: 'beginner' | 'intermediate' | 'advanced';
  }>({
    title: '',
    description: '',
    level: 'beginner'
  });
  
  // Form validation and submission state
  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
    level?: string;
    general?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear errors for the field being edited
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };
  
  // Validate the form
  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length > 100) {
      newErrors.title = 'Title must be less than 100 characters';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length > 500) {
      newErrors.description = 'Description must be less than 500 characters';
    }
    
    if (!formData.level) {
      newErrors.level = 'Difficulty level is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setErrors({});
    
    try {
      const input: VocabListInput = {
        title: formData.title,
        description: formData.description,
        level: formData.level,
        itemIds: [] // Start with empty list, items can be added later
      };
      
      await VocabularyService.createVocabList(input);
      setIsSuccess(true);
      
      // Reset form after successful submission
      setFormData({
        title: '',
        description: '',
        level: 'beginner'
      });
      
      // Show success message briefly before redirecting
      setTimeout(() => {
        navigate('/vocabulary');
      }, 1500);
    } catch (error) {
      console.error('Error creating vocabulary list:', error);
      setErrors({
        general: error instanceof Error 
          ? error.message 
          : 'Failed to create vocabulary list. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
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
            <T keyName="vocabulary.new.title">Create New Vocabulary List</T>
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            <T keyName="vocabulary.new.subtitle">
              Create a new list to organize your vocabulary items
            </T>
          </p>
        </header>
        
        {isSuccess ? (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="mb-4 text-green-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                <T keyName="vocabulary.new.success">Vocabulary List Created!</T>
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                <T keyName="vocabulary.new.successMessage">
                  Your vocabulary list has been created successfully. Redirecting to your lists...
                </T>
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-6">
              {errors.general && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-md text-red-600 dark:text-red-400">
                  {errors.general}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <FormGroup>
                    <FormLabel htmlFor="title">
                      <T keyName="vocabulary.new.form.title">Title</T>
                    </FormLabel>
                    <Input
                      id="title"
                      name="title"
                      type="text"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="e.g., 'Business English Vocabulary'"
                      error={!!errors.title}
                    />
                    {errors.title && <FormMessage>{errors.title}</FormMessage>}
                  </FormGroup>
                  
                  <FormGroup>
                    <FormLabel htmlFor="description">
                      <T keyName="vocabulary.new.form.description">Description</T>
                    </FormLabel>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Describe what this vocabulary list is about"
                      rows={4}
                      error={!!errors.description}
                    />
                    {errors.description && <FormMessage>{errors.description}</FormMessage>}
                  </FormGroup>
                  
                  <FormGroup>
                    <FormLabel htmlFor="level">
                      <T keyName="vocabulary.new.form.level">Difficulty Level</T>
                    </FormLabel>
                    <Select
                      id="level"
                      name="level"
                      value={formData.level}
                      onChange={handleChange}
                      error={!!errors.level}
                    >
                      <option value="beginner">
                        <T keyName="vocabulary.new.form.level.beginner">Beginner</T>
                      </option>
                      <option value="intermediate">
                        <T keyName="vocabulary.new.form.level.intermediate">Intermediate</T>
                      </option>
                      <option value="advanced">
                        <T keyName="vocabulary.new.form.level.advanced">Advanced</T>
                      </option>
                    </Select>
                    {errors.level && <FormMessage>{errors.level}</FormMessage>}
                  </FormGroup>
                  
                  <div className="flex justify-end space-x-4 pt-4">
                    <Button
                      variant="secondary"
                      type="button"
                      onClick={() => navigate('/vocabulary')}
                      disabled={isSubmitting}
                    >
                      <T keyName="common.cancel">Cancel</T>
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <T keyName="common.creating">Creating...</T>
                        </span>
                      ) : (
                        <T keyName="vocabulary.new.form.submit">Create Vocabulary List</T>
                      )}
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </Container>
    </AppLayout>
  );
} 