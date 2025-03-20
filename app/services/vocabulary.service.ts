import { apolloClient } from '../lib/apollo';
import {
  GET_VOCAB_ITEM,
  GET_VOCAB_ITEMS,
  GET_VOCAB_LIST,
  GET_VOCAB_LISTS,
  CREATE_VOCAB_ITEM,
  UPDATE_VOCAB_ITEM,
  DELETE_VOCAB_ITEM,
  CREATE_VOCAB_LIST,
  UPDATE_VOCAB_LIST,
  DELETE_VOCAB_LIST
} from '../graphql';
import type { VocabItem, VocabItemInput, VocabList, VocabListInput } from '../types/graphql';

// Define types for cache data
interface VocabItemsData {
  getVocabItems: VocabItem[];
}

interface VocabListsData {
  getVocabLists: VocabList[];
}

/**
 * Vocabulary Service
 * Handles all vocabulary-related operations including fetching, creating,
 * updating and deleting vocabulary items and lists
 */
export class VocabularyService {
  /**
   * Get a single vocabulary item by ID
   */
  static async getVocabItem(id: string): Promise<VocabItem> {
    try {
      const { data } = await apolloClient.query({
        query: GET_VOCAB_ITEM,
        variables: { id }
      });
      
      return data.getVocabItem;
    } catch (error) {
      console.error('Error fetching vocabulary item:', error);
      throw error;
    }
  }

  /**
   * Get all vocabulary items
   */
  static async getVocabItems(): Promise<VocabItem[]> {
    try {
      const { data } = await apolloClient.query({
        query: GET_VOCAB_ITEMS,
        fetchPolicy: 'network-only' // Ensure we get fresh data
      });
      
      return data.getVocabItems;
    } catch (error) {
      console.error('Error fetching vocabulary items:', error);
      throw error;
    }
  }

  /**
   * Create a new vocabulary item
   */
  static async createVocabItem(input: VocabItemInput): Promise<VocabItem> {
    try {
      const { data } = await apolloClient.mutate({
        mutation: CREATE_VOCAB_ITEM,
        variables: { input },
        // Update the cache to include the new item
        update(cache, { data: { createVocabItem } }) {
          try {
            // Read the query from the cache
            const existingItemsData = cache.readQuery<VocabItemsData>({
              query: GET_VOCAB_ITEMS
            });

            if (existingItemsData?.getVocabItems) {
              // Write the new data back to the cache
              cache.writeQuery<VocabItemsData>({
                query: GET_VOCAB_ITEMS,
                data: {
                  getVocabItems: [
                    ...existingItemsData.getVocabItems,
                    createVocabItem
                  ]
                }
              });
            }
          } catch (e) {
            console.warn('Cache update failed:', e);
          }
        }
      });
      
      return data.createVocabItem;
    } catch (error) {
      console.error('Error creating vocabulary item:', error);
      throw error;
    }
  }

  /**
   * Update an existing vocabulary item
   */
  static async updateVocabItem(id: string, input: VocabItemInput): Promise<VocabItem> {
    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_VOCAB_ITEM,
        variables: { id, input }
      });
      
      return data.updateVocabItem;
    } catch (error) {
      console.error('Error updating vocabulary item:', error);
      throw error;
    }
  }

  /**
   * Delete a vocabulary item
   */
  static async deleteVocabItem(id: string): Promise<boolean> {
    try {
      const { data } = await apolloClient.mutate({
        mutation: DELETE_VOCAB_ITEM,
        variables: { id },
        // Update the cache to remove the deleted item
        update(cache) {
          try {
            const existingItemsData = cache.readQuery<VocabItemsData>({
              query: GET_VOCAB_ITEMS
            });

            if (existingItemsData?.getVocabItems) {
              cache.writeQuery<VocabItemsData>({
                query: GET_VOCAB_ITEMS,
                data: {
                  getVocabItems: existingItemsData.getVocabItems.filter(
                    (item: VocabItem) => item.id !== id
                  )
                }
              });
            }
          } catch (e) {
            console.warn('Cache update failed:', e);
          }
        }
      });
      
      return data.deleteVocabItem;
    } catch (error) {
      console.error('Error deleting vocabulary item:', error);
      throw error;
    }
  }

  /**
   * Get a vocabulary list by ID
   */
  static async getVocabList(id: string): Promise<VocabList> {
    try {
      const { data } = await apolloClient.query({
        query: GET_VOCAB_LIST,
        variables: { id }
      });
      
      return data.getVocabList;
    } catch (error) {
      console.error('Error fetching vocabulary list:', error);
      throw error;
    }
  }

  /**
   * Get all vocabulary lists
   */
  static async getVocabLists(): Promise<VocabList[]> {
    try {
      const { data } = await apolloClient.query({
        query: GET_VOCAB_LISTS,
        fetchPolicy: 'network-only'
      });
      
      return data.getVocabLists;
    } catch (error) {
      console.error('Error fetching vocabulary lists:', error);
      throw error;
    }
  }

  /**
   * Create a new vocabulary list
   */
  static async createVocabList(input: VocabListInput): Promise<VocabList> {
    try {
      const { data } = await apolloClient.mutate({
        mutation: CREATE_VOCAB_LIST,
        variables: { input },
        update(cache, { data: { createVocabList } }) {
          try {
            const existingListsData = cache.readQuery<VocabListsData>({
              query: GET_VOCAB_LISTS
            });

            if (existingListsData?.getVocabLists) {
              cache.writeQuery<VocabListsData>({
                query: GET_VOCAB_LISTS,
                data: {
                  getVocabLists: [
                    ...existingListsData.getVocabLists,
                    createVocabList
                  ]
                }
              });
            }
          } catch (e) {
            console.warn('Cache update failed:', e);
          }
        }
      });
      
      return data.createVocabList;
    } catch (error) {
      console.error('Error creating vocabulary list:', error);
      throw error;
    }
  }

  /**
   * Update an existing vocabulary list
   */
  static async updateVocabList(id: string, input: VocabListInput): Promise<VocabList> {
    try {
      const { data } = await apolloClient.mutate({
        mutation: UPDATE_VOCAB_LIST,
        variables: { id, input }
      });
      
      return data.updateVocabList;
    } catch (error) {
      console.error('Error updating vocabulary list:', error);
      throw error;
    }
  }

  /**
   * Delete a vocabulary list
   */
  static async deleteVocabList(id: string): Promise<boolean> {
    try {
      const { data } = await apolloClient.mutate({
        mutation: DELETE_VOCAB_LIST,
        variables: { id },
        update(cache) {
          try {
            const existingListsData = cache.readQuery<VocabListsData>({
              query: GET_VOCAB_LISTS
            });

            if (existingListsData?.getVocabLists) {
              cache.writeQuery<VocabListsData>({
                query: GET_VOCAB_LISTS,
                data: {
                  getVocabLists: existingListsData.getVocabLists.filter(
                    (list: VocabList) => list.id !== id
                  )
                }
              });
            }
          } catch (e) {
            console.warn('Cache update failed:', e);
          }
        }
      });
      
      return data.deleteVocabList;
    } catch (error) {
      console.error('Error deleting vocabulary list:', error);
      throw error;
    }
  }
} 