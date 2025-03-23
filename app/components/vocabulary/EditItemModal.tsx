import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from '../ui';
import VocabItemForm from './VocabItemForm';
import { VocabularyService } from '../../services/vocabulary.service';
import type { VocabItem, VocabItemInput } from '../../types/graphql';

interface EditItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: VocabItem;
  onItemUpdated: (item: VocabItem) => void;
}

/**
 * EditItemModal component
 * Modal dialog for editing existing vocabulary items
 */
export function EditItemModal({ isOpen, onClose, item, onItemUpdated }: EditItemModalProps) {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Handle form submission
  const handleSubmit = async (formData: VocabItemInput) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Update the vocabulary item
      const updatedItem = await VocabularyService.updateVocabItem(item.id, formData);
      
      if (updatedItem) {
        // Notify parent component
        onItemUpdated(updatedItem);
        
        // Close the modal
        onClose();
      }
    } catch (err) {
      console.error('Error updating vocabulary item:', err);
      setError(err instanceof Error ? err.message : 'Failed to update vocabulary item. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('vocabulary.item.edit', 'Edit Vocabulary Item')}
      maxWidth="lg"
    >
      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-md text-red-600 dark:text-red-400">
          {error}
        </div>
      )}
      
      <VocabItemForm
        item={item}
        onSubmit={handleSubmit}
        onCancel={onClose}
        isSubmitting={isSubmitting}
      />
    </Modal>
  );
}

export default EditItemModal; 