import { gql } from '../lib/gql-utils';

// Queries
export const GET_VOCAB_ITEM = gql`
  query GetVocabItem($id: ID!) {
    getVocabItem(id: $id) {
      id
      term
      definitionEn
      definitionZh
      exampleSentence
      partOfSpeech
      difficultyRating
      tags
      createdAt
      updatedAt
    }
  }
`;

export const GET_VOCAB_ITEMS = gql`
  query GetVocabItems {
    getVocabItems {
      id
      term
      definitionEn
      definitionZh
      partOfSpeech
      difficultyRating
      tags
      createdAt
    }
  }
`;

export const GET_VOCAB_LIST = gql`
  query GetVocabList($id: ID!) {
    getVocabListById(id: $id) {
      id
      title
      description
      level
      items {
        id
        term
        definitionEn
        definitionZh
        partOfSpeech
        difficultyRating
        tags
        exampleSentence
      }
      creator {
        id
        username
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_VOCAB_LISTS = gql`
  query GetVocabLists {
    getVocabLists {
      id
      title
      description
      level
      creator {
        id
        username
      }
      createdAt
    }
  }
`;

// Mutations
export const CREATE_VOCAB_ITEM = gql`
  mutation CreateVocabItem($input: VocabItemInput!) {
    createVocabItem(input: $input) {
      id
      term
      definitionEn
      definitionZh
      exampleSentence
      partOfSpeech
      difficultyRating
      tags
      createdAt
    }
  }
`;

export const UPDATE_VOCAB_ITEM = gql`
  mutation UpdateVocabItem($id: ID!, $input: VocabItemInput!) {
    updateVocabItem(id: $id, input: $input) {
      id
      term
      definitionEn
      definitionZh
      exampleSentence
      partOfSpeech
      difficultyRating
      tags
      updatedAt
    }
  }
`;

export const DELETE_VOCAB_ITEM = gql`
  mutation DeleteVocabItem($id: ID!) {
    deleteVocabItem(id: $id)
  }
`;

export const CREATE_VOCAB_LIST = gql`
  mutation CreateVocabList($input: VocabListInput!) {
    createVocabList(input: $input) {
      id
      title
      description
      level
      items {
        id
        term
      }
      createdAt
    }
  }
`;

export const UPDATE_VOCAB_LIST = gql`
  mutation UpdateVocabList($id: ID!, $input: VocabListInput!) {
    updateVocabList(id: $id, input: $input) {
      id
      title
      description
      level
      items {
        id
        term
      }
      updatedAt
    }
  }
`;

export const DELETE_VOCAB_LIST = gql`
  mutation DeleteVocabList($id: ID!) {
    deleteVocabList(id: $id)
  }
`; 