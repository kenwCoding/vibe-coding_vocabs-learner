import React, { useState } from 'react';
import type { ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  FormGroup, 
  FormLabel, 
  FormMessage, 
  Input, 
  Textarea, 
  Select, 
  Button 
} from '../ui';
import type { VocabItem, VocabItemInput } from '../../types/graphql';

export interface VocabItemFormProps {
  item?: VocabItem; // If provided, we're in edit mode
  onSubmit: (data: VocabItemInput) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

/**
 * Vocabulary Item Form component
 * Used for creating and editing vocabulary items
 */
export function VocabItemForm({ item, onSubmit, onCancel, isSubmitting }: VocabItemFormProps) {
  const { t } = useTranslation();
  const isEditMode = !!item;
  
  // Form state
  const [formData, setFormData] = useState<VocabItemInput>({
    term: item?.term || '',
    definitionEn: item?.definitionEn || '',
    definitionZh: item?.definitionZh || '',
    exampleSentence: item?.exampleSentence || '',
    partOfSpeech: item?.partOfSpeech || 'noun',
    difficultyRating: item?.difficultyRating || 1,
    tags: item?.tags || []
  });
  
  // Tags input state
  const [tagInput, setTagInput] = useState('');
  
  // Form validation and errors
  const [errors, setErrors] = useState<{
    term?: string;
    definitionEn?: string;
    definitionZh?: string;
    exampleSentence?: string;
    partOfSpeech?: string;
    difficultyRating?: string;
    general?: string;
  }>({});
  
  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // Special handling for difficulty rating
    if (name === 'difficultyRating') {
      setFormData(prev => ({
        ...prev,
        [name]: parseInt(value, 10) as 1 | 2 | 3 | 4 | 5
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear error for the field being edited
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };
  
  // Handle tag input
  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };
  
  // Add tag to the form data
  const addTag = () => {
    const trimmedTag = tagInput.trim();
    if (!trimmedTag) return;
    
    // Only add if not already in the list
    if (!formData.tags?.includes(trimmedTag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...(prev.tags || []), trimmedTag]
      }));
    }
    
    setTagInput('');
  };
  
  // Remove tag from the form data
  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.filter(tag => tag !== tagToRemove) || []
    }));
  };
  
  // Handle tag input key press (add tag on Enter)
  const handleTagKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };
  
  // Validate the form
  const validateForm = (): boolean => {
    const newErrors: typeof errors = {};
    
    if (!formData.term.trim()) {
      newErrors.term = t('vocabulary.item.errors.termRequired', 'Term is required');
    }
    
    if (!formData.definitionEn.trim()) {
      newErrors.definitionEn = t('vocabulary.item.errors.definitionEnRequired', 'English definition is required');
    }
    
    if (!formData.definitionZh.trim()) {
      newErrors.definitionZh = t('vocabulary.item.errors.definitionZhRequired', 'Chinese definition is required');
    }
    
    if (!formData.exampleSentence.trim()) {
      newErrors.exampleSentence = t('vocabulary.item.errors.exampleRequired', 'Example sentence is required');
    }
    
    if (!formData.partOfSpeech) {
      newErrors.partOfSpeech = t('vocabulary.item.errors.partOfSpeechRequired', 'Part of speech is required');
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
    
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Error submitting vocabulary item:', error);
      setErrors({
        general: error instanceof Error 
          ? error.message 
          : t('vocabulary.item.errors.generalError', 'Failed to save vocabulary item. Please try again.')
      });
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.general && (
        <div className="p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-md text-red-600 dark:text-red-400">
          {errors.general}
        </div>
      )}
      
      <FormGroup>
        <FormLabel htmlFor="term">
          {t('vocabulary.item.form.term', 'Term')}
        </FormLabel>
        <Input
          id="term"
          name="term"
          value={formData.term}
          onChange={handleChange}
          placeholder={t('vocabulary.item.form.termPlaceholder', 'Enter the vocabulary term')}
          error={!!errors.term}
        />
        {errors.term && <FormMessage>{errors.term}</FormMessage>}
      </FormGroup>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormGroup>
          <FormLabel htmlFor="definitionEn">
            {t('vocabulary.item.form.definitionEn', 'English Definition')}
          </FormLabel>
          <Textarea
            id="definitionEn"
            name="definitionEn"
            value={formData.definitionEn}
            onChange={handleChange}
            placeholder={t('vocabulary.item.form.definitionEnPlaceholder', 'Definition in English')}
            rows={3}
            error={!!errors.definitionEn}
          />
          {errors.definitionEn && <FormMessage>{errors.definitionEn}</FormMessage>}
        </FormGroup>
        
        <FormGroup>
          <FormLabel htmlFor="definitionZh">
            {t('vocabulary.item.form.definitionZh', 'Chinese Definition')}
          </FormLabel>
          <Textarea
            id="definitionZh"
            name="definitionZh"
            value={formData.definitionZh}
            onChange={handleChange}
            placeholder={t('vocabulary.item.form.definitionZhPlaceholder', 'Definition in Chinese')}
            rows={3}
            error={!!errors.definitionZh}
          />
          {errors.definitionZh && <FormMessage>{errors.definitionZh}</FormMessage>}
        </FormGroup>
      </div>
      
      <FormGroup>
        <FormLabel htmlFor="exampleSentence">
          {t('vocabulary.item.form.example', 'Example Sentence')}
        </FormLabel>
        <Textarea
          id="exampleSentence"
          name="exampleSentence"
          value={formData.exampleSentence}
          onChange={handleChange}
          placeholder={t('vocabulary.item.form.examplePlaceholder', 'Example sentence using the term')}
          rows={2}
          error={!!errors.exampleSentence}
        />
        {errors.exampleSentence && <FormMessage>{errors.exampleSentence}</FormMessage>}
      </FormGroup>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormGroup>
          <FormLabel htmlFor="partOfSpeech">
            {t('vocabulary.item.form.partOfSpeech', 'Part of Speech')}
          </FormLabel>
          <Select
            id="partOfSpeech"
            name="partOfSpeech"
            value={formData.partOfSpeech}
            onChange={handleChange}
            error={!!errors.partOfSpeech}
          >
            <option value="noun">{t('vocabulary.item.form.partOfSpeech.noun', 'Noun')}</option>
            <option value="verb">{t('vocabulary.item.form.partOfSpeech.verb', 'Verb')}</option>
            <option value="adjective">{t('vocabulary.item.form.partOfSpeech.adjective', 'Adjective')}</option>
            <option value="adverb">{t('vocabulary.item.form.partOfSpeech.adverb', 'Adverb')}</option>
            <option value="pronoun">{t('vocabulary.item.form.partOfSpeech.pronoun', 'Pronoun')}</option>
            <option value="preposition">{t('vocabulary.item.form.partOfSpeech.preposition', 'Preposition')}</option>
            <option value="conjunction">{t('vocabulary.item.form.partOfSpeech.conjunction', 'Conjunction')}</option>
            <option value="interjection">{t('vocabulary.item.form.partOfSpeech.interjection', 'Interjection')}</option>
            <option value="phrase">{t('vocabulary.item.form.partOfSpeech.phrase', 'Phrase')}</option>
            <option value="other">{t('vocabulary.item.form.partOfSpeech.other', 'Other')}</option>
          </Select>
          {errors.partOfSpeech && <FormMessage>{errors.partOfSpeech}</FormMessage>}
        </FormGroup>
        
        <FormGroup>
          <FormLabel htmlFor="difficultyRating">
            {t('vocabulary.item.form.difficulty', 'Difficulty')}
          </FormLabel>
          <Select
            id="difficultyRating"
            name="difficultyRating"
            value={formData.difficultyRating.toString()}
            onChange={handleChange}
            error={!!errors.difficultyRating}
          >
            <option value="1">{t('vocabulary.item.form.difficulty.1', '1 - Very Easy')}</option>
            <option value="2">{t('vocabulary.item.form.difficulty.2', '2 - Easy')}</option>
            <option value="3">{t('vocabulary.item.form.difficulty.3', '3 - Medium')}</option>
            <option value="4">{t('vocabulary.item.form.difficulty.4', '4 - Hard')}</option>
            <option value="5">{t('vocabulary.item.form.difficulty.5', '5 - Very Hard')}</option>
          </Select>
          {errors.difficultyRating && <FormMessage>{errors.difficultyRating}</FormMessage>}
        </FormGroup>
      </div>
      
      <FormGroup>
        <FormLabel htmlFor="tags">
          {t('vocabulary.item.form.tags', 'Tags')}
        </FormLabel>
        <div className="flex">
          <Input
            id="tagInput"
            name="tagInput"
            value={tagInput}
            onChange={handleTagInputChange}
            onKeyPress={handleTagKeyPress}
            placeholder={t('vocabulary.item.form.tagsPlaceholder', 'Add tags (e.g., business, idiom)')}
            className="flex-grow"
          />
          <Button
            type="button"
            variant="secondary"
            className="ml-2"
            onClick={addTag}
          >
            {t('vocabulary.item.form.addTag', 'Add')}
          </Button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {formData.tags?.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
            >
              {tag}
              <button
                type="button"
                className="ml-1.5 text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 focus:outline-none"
                onClick={() => removeTag(tag)}
              >
                &times;
              </button>
            </span>
          ))}
        </div>
      </FormGroup>
      
      <div className="flex justify-end space-x-4 pt-4">
        <Button
          variant="secondary"
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          {t('common.cancel', 'Cancel')}
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
              {t('common.saving', 'Saving...')}
            </span>
          ) : (
            isEditMode ? 
              t('vocabulary.item.form.update', 'Update Item') : 
              t('vocabulary.item.form.create', 'Create Item')
          )}
        </Button>
      </div>
    </form>
  );
}

export default VocabItemForm; 