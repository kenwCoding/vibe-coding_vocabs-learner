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
 * Mock data for vocabulary items
 */
const mockVocabItems: Record<string, VocabItem> = {
  'v1': {
    id: 'v1',
    term: 'ubiquitous',
    definitionEn: 'Present, appearing, or found everywhere.',
    definitionZh: '无所不在的，普遍存在的',
    exampleSentence: 'Mobile phones have become ubiquitous in modern society.',
    partOfSpeech: 'adjective',
    difficultyRating: 4,
    tags: ['formal', 'academic']
  },
  'v2': {
    id: 'v2',
    term: 'paradigm',
    definitionEn: 'A typical example or pattern of something; a pattern or model.',
    definitionZh: '范例，典范；模式',
    exampleSentence: 'The company is a paradigm of successful industry.',
    partOfSpeech: 'noun',
    difficultyRating: 4,
    tags: ['academic', 'business']
  },
  'v3': {
    id: 'v3',
    term: 'serendipity',
    definitionEn: 'The occurrence and development of events by chance in a happy or beneficial way.',
    definitionZh: '意外发现的礼物；机缘巧合',
    exampleSentence: 'The discovery of penicillin was a serendipity.',
    partOfSpeech: 'noun',
    difficultyRating: 5,
    tags: ['uncommon', 'positive']
  }
};

/**
 * Mock data for vocabulary lists
 */
const mockVocabLists: Record<string, VocabList> = {
  'l1': {
    id: 'l1',
    title: 'Advanced English Vocabulary',
    description: 'A collection of advanced English words for academic writing',
    level: 'advanced',
    itemIds: ['v1', 'v2', 'v3'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
};

/**
 * Vocabulary store to manage vocabulary items and lists
 * Uses persist middleware to save data across page refreshes
 */
export const useVocabularyStore = create<VocabularyState>()(
  persist(
    (set) => ({
      vocabItems: mockVocabItems,
      vocabLists: mockVocabLists,
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