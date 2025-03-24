import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from '../ui';
import VocabItemForm from './VocabItemForm';
import { VocabularyService } from '../../services/vocabulary.service';
import type { VocabItem, VocabItemInput, VocabList } from '../../types/graphql';

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  vocabList: VocabList;
  onItemAdded: (item: VocabItem) => void;
}

/**
 * AddItemModal component
 * Modal dialog for adding new vocabulary items to a vocabulary list
 */
export function AddItemModal({ isOpen, onClose, vocabList, onItemAdded }: AddItemModalProps) {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Handle form submission
  const handleSubmit = async (formData: VocabItemInput) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      // First create the vocabulary item
      const newItem = await VocabularyService.createVocabItem(formData);
      
      // Then update the vocabulary list to include the new item
      if (newItem && newItem.id) {
        // Extract only the relevant fields required by VocabListInput
        const itemIds = [...(vocabList.items?.map(item => item.id) || []), newItem.id];
        
        await VocabularyService.updateVocabList(vocabList.id, {
          title: vocabList.title,
          description: vocabList.description,
          level: vocabList.level,
          itemIds: itemIds
        });
        
        // Notify parent component - the parent will handle refreshing and closing
        onItemAdded(newItem);
      }
    } catch (err) {
      console.error('Error adding vocabulary item:', err);
      setError(err instanceof Error ? err.message : 'Failed to add vocabulary item. Please try again.');
      setIsSubmitting(false);
    }
  };
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('vocabulary.item.addToList', 'Add Vocabulary Item to {{listTitle}}', { listTitle: vocabList.title })}
      maxWidth="lg"
    >
      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-md text-red-600 dark:text-red-400">
          {error}
        </div>
      )}
      
      <VocabItemForm
        onSubmit={handleSubmit}
        onCancel={onClose}
        isSubmitting={isSubmitting}
      />
    </Modal>
  );
}

export default AddItemModal; 