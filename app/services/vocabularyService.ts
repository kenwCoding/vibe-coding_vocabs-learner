import { gql } from '../lib/gql-utils';

// Types
export interface VocabularyItem {
  id: string;
  word: string;
  translation: string;
  language: string;
  partOfSpeech: string;
  definition: string;
  examples: string[];
  notes?: string;
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  status: 'new' | 'learning' | 'known';
  createdAt: string;
  updatedAt: string;
}

export interface VocabularyItemInput {
  word: string;
  translation: string;
  language: string;
  partOfSpeech: string;
  definition: string;
  examples: string[];
  notes?: string;
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

// Response types
export interface GetVocabularyItemsResponse {
  vocabularyItems: {
    items: VocabularyItem[];
    total: number;
  };
}

export interface GetVocabularyItemResponse {
  vocabularyItem: VocabularyItem;
}

export interface CreateVocabularyItemResponse {
  createVocabularyItem: VocabularyItem;
}

export interface UpdateVocabularyItemResponse {
  updateVocabularyItem: VocabularyItem;
}

export interface DeleteVocabularyItemResponse {
  deleteVocabularyItem: {
    success: boolean;
    message: string;
  };
}

// Queries
export const GET_VOCABULARY_ITEMS = gql`
  query GetVocabularyItems($filter: VocabularyItemFilterInput, $page: Int, $limit: Int) {
    vocabularyItems(filter: $filter, page: $page, limit: $limit) {
      items {
        id
        word
        translation
        language
        partOfSpeech
        definition
        examples
        notes
        tags
        difficulty
        status
        createdAt
        updatedAt
      }
      total
    }
  }
`;

export const GET_VOCABULARY_ITEM = gql`
  query GetVocabularyItem($id: ID!) {
    vocabularyItem(id: $id) {
      id
      word
      translation
      language
      partOfSpeech
      definition
      examples
      notes
      tags
      difficulty
      status
      createdAt
      updatedAt
    }
  }
`;

// Mutations
export const CREATE_VOCABULARY_ITEM = gql`
  mutation CreateVocabularyItem($input: VocabularyItemInput!) {
    createVocabularyItem(input: $input) {
      id
      word
      translation
      language
      partOfSpeech
      definition
      examples
      notes
      tags
      difficulty
      status
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_VOCABULARY_ITEM = gql`
  mutation UpdateVocabularyItem($id: ID!, $input: VocabularyItemInput!) {
    updateVocabularyItem(id: $id, input: $input) {
      id
      word
      translation
      language
      partOfSpeech
      definition
      examples
      notes
      tags
      difficulty
      status
      updatedAt
    }
  }
`;

export const UPDATE_VOCABULARY_STATUS = gql`
  mutation UpdateVocabularyStatus($id: ID!, $status: VocabularyStatus!) {
    updateVocabularyStatus(id: $id, status: $status) {
      id
      status
      updatedAt
    }
  }
`;

export const DELETE_VOCABULARY_ITEM = gql`
  mutation DeleteVocabularyItem($id: ID!) {
    deleteVocabularyItem(id: $id) {
      success
      message
    }
  }
`; 