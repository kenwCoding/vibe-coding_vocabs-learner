import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { isBrowser } from '../utils/browser';

/**
 * Represents a single vocabulary item
 */
export interface VocabItem {
  id: string;
  term: string;
  definitionEn: string;
  definitionZh: string;
  exampleSentence: string;
  partOfSpeech: string;
  difficultyRating: 1 | 2 | 3 | 4 | 5; // 1 = easiest, 5 = hardest
  tags: string[];
}

/**
 * Represents a curated list of vocabulary items
 */
export interface VocabList {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  itemIds: string[];
  createdAt: string;
  updatedAt: string;
}

/**
 * Vocabulary state management
 */
interface VocabularyState {
  vocabItems: Record<string, VocabItem>;
  vocabLists: Record<string, VocabList>;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  addVocabItem: (item: Omit<VocabItem, 'id'>) => string;
  updateVocabItem: (id: string, item: Partial<VocabItem>) => void;
  deleteVocabItem: (id: string) => void;
  
  addVocabList: (list: Omit<VocabList, 'id' | 'createdAt' | 'updatedAt'>) => string;
  updateVocabList: (id: string, list: Partial<VocabList>) => void;
  deleteVocabList: (id: string) => void;
  addItemToList: (listId: string, itemId: string) => void;
  removeItemFromList: (listId: string, itemId: string) => void;
  
  clearError: () => void;
}

/**
 * Generate a random ID for new items
 */
const generateId = () => Math.random().toString(36).substring(2, 9);

/**
 * Empty initial vocabulary items
 */
const initialVocabItems: Record<string, VocabItem> = {};

/**
 * Empty initial vocabulary lists
 */
const initialVocabLists: Record<string, VocabList> = {};

/**
 * Vocabulary store to manage vocabulary items and lists
 * Uses persist middleware to save data across page refreshes
 */
export const useVocabularyStore = create<VocabularyState>()(
  persist(
    (set) => ({
      vocabItems: initialVocabItems,
      vocabLists: initialVocabLists,
      isLoading: false,
      error: null,

      addVocabItem: (item) => {
        const id = generateId();
        set((state) => ({
          vocabItems: {
            ...state.vocabItems,
            [id]: { ...item, id }
          }
        }));
        return id;
      },

      updateVocabItem: (id, item) => {
        set((state) => ({
          vocabItems: {
            ...state.vocabItems,
            [id]: { ...state.vocabItems[id], ...item }
          }
        }));
      },

      deleteVocabItem: (id) => {
        set((state) => {
          const { [id]: itemToDelete, ...remainingItems } = state.vocabItems;
          
          // Also remove references to this item from any lists
          const updatedLists = Object.entries(state.vocabLists).reduce(
            (acc, [listId, list]) => {
              if (list.itemIds.includes(id)) {
                acc[listId] = {
                  ...list,
                  itemIds: list.itemIds.filter(itemId => itemId !== id),
                  updatedAt: new Date().toISOString()
                };
              } else {
                acc[listId] = list;
              }
              return acc;
            },
            {} as Record<string, VocabList>
          );
          
          return {
            vocabItems: remainingItems,
            vocabLists: updatedLists
          };
        });
      },

      addVocabList: (list) => {
        const id = generateId();
        const now = new Date().toISOString();
        
        set((state) => ({
          vocabLists: {
            ...state.vocabLists,
            [id]: { 
              ...list, 
              id, 
              createdAt: now, 
              updatedAt: now 
            }
          }
        }));
        
        return id;
      },

      updateVocabList: (id, list) => {
        set((state) => ({
          vocabLists: {
            ...state.vocabLists,
            [id]: { 
              ...state.vocabLists[id], 
              ...list, 
              updatedAt: new Date().toISOString() 
            }
          }
        }));
      },

      deleteVocabList: (id) => {
        set((state) => {
          const { [id]: listToDelete, ...remainingLists } = state.vocabLists;
          return {
            vocabLists: remainingLists
          };
        });
      },

      addItemToList: (listId, itemId) => {
        set((state) => {
          const list = state.vocabLists[listId];
          if (!list) return state;
          
          // Only add if it doesn't already exist
          if (list.itemIds.includes(itemId)) return state;
          
          return {
            vocabLists: {
              ...state.vocabLists,
              [listId]: {
                ...list,
                itemIds: [...list.itemIds, itemId],
                updatedAt: new Date().toISOString()
              }
            }
          };
        });
      },

      removeItemFromList: (listId, itemId) => {
        set((state) => {
          const list = state.vocabLists[listId];
          if (!list) return state;
          
          return {
            vocabLists: {
              ...state.vocabLists,
              [listId]: {
                ...list,
                itemIds: list.itemIds.filter(id => id !== itemId),
                updatedAt: new Date().toISOString()
              }
            }
          };
        });
      },

      clearError: () => {
        set({ error: null });
      }
    }),
    {
      name: 'vocabulary-storage',
      partialize: (state) => ({ 
        vocabItems: state.vocabItems,
        vocabLists: state.vocabLists
      }),
      skipHydration: !isBrowser, // Skip hydration in non-browser environments
    }
  )
); 