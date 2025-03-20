import { gql } from '../lib/gql-utils';
import type { VocabularyItem } from './vocabularyService';

// Types for tests
export type TestType = 'multiplechoice' | 'translation' | 'spelling' | 'matching';
export type TestStatus = 'inprogress' | 'completed' | 'abandoned';

export interface Test {
  id: string;
  title: string;
  description?: string;
  type: TestType;
  status: TestStatus;
  score?: number;
  totalQuestions: number;
  completedQuestions: number;
  createdAt: string;
  updatedAt: string;
  startedAt?: string;
  completedAt?: string;
}

export interface TestQuestion {
  id: string;
  testId: string;
  vocabularyItem: VocabularyItem;
  options?: string[];
  userAnswer?: string;
  isCorrect?: boolean;
  timeSpent?: number;
}

export interface CreateTestInput {
  title: string;
  description?: string;
  type: TestType;
  vocabularyIds?: string[];
  filters?: {
    difficulty?: ('beginner' | 'intermediate' | 'advanced')[];
    status?: ('new' | 'learning' | 'known')[];
    tags?: string[];
    limit?: number;
  };
}

// Response types
export interface GetTestsResponse {
  tests: {
    items: Test[];
    total: number;
  };
}

export interface GetTestResponse {
  test: Test & {
    questions: TestQuestion[];
  };
}

export interface CreateTestResponse {
  createTest: Test;
}

export interface SubmitTestAnswerResponse {
  submitTestAnswer: {
    questionId: string;
    isCorrect: boolean;
    correctAnswer: string;
  };
}

export interface CompleteTestResponse {
  completeTest: {
    test: Test;
    score: number;
    totalCorrect: number;
    totalQuestions: number;
  };
}

// Queries
export const GET_TESTS = gql`
  query GetTests($status: TestStatus, $page: Int, $limit: Int) {
    tests(status: $status, page: $page, limit: $limit) {
      items {
        id
        title
        description
        type
        status
        score
        totalQuestions
        completedQuestions
        createdAt
        updatedAt
        startedAt
        completedAt
      }
      total
    }
  }
`;

export const GET_TEST = gql`
  query GetTest($id: ID!) {
    test(id: $id) {
      id
      title
      description
      type
      status
      score
      totalQuestions
      completedQuestions
      createdAt
      updatedAt
      startedAt
      completedAt
      questions {
        id
        vocabularyItem {
          id
          word
          translation
          language
          partOfSpeech
          definition
          examples
        }
        options
        userAnswer
        isCorrect
        timeSpent
      }
    }
  }
`;

// Mutations
export const CREATE_TEST = gql`
  mutation CreateTest($input: CreateTestInput!) {
    createTest(input: $input) {
      id
      title
      description
      type
      status
      totalQuestions
      completedQuestions
      createdAt
      startedAt
    }
  }
`;

export const START_TEST = gql`
  mutation StartTest($id: ID!) {
    startTest(id: $id) {
      id
      status
      startedAt
    }
  }
`;

export const SUBMIT_TEST_ANSWER = gql`
  mutation SubmitTestAnswer($questionId: ID!, $answer: String!, $timeSpent: Int) {
    submitTestAnswer(questionId: $questionId, answer: $answer, timeSpent: $timeSpent) {
      questionId
      isCorrect
      correctAnswer
    }
  }
`;

export const COMPLETE_TEST = gql`
  mutation CompleteTest($id: ID!) {
    completeTest(id: $id) {
      test {
        id
        status
        score
        completedAt
      }
      score
      totalCorrect
      totalQuestions
    }
  }
`;

export const ABANDON_TEST = gql`
  mutation AbandonTest($id: ID!) {
    abandonTest(id: $id) {
      id
      status
    }
  }
`; 