import { apolloClient } from '../lib/apollo';
import { GET_TEST, GET_TESTS, GENERATE_VOCAB_TEST, SAVE_TEST_RESULT } from '../graphql';
import type { 
  Question, 
  TestSettings, 
  TestType
} from '../types/graphql';

// Define input types
interface GenerateTestInput {
  title: string;
  description: string;
  type: TestType;
  settings: TestSettings;
  vocabItemIds: string[];
  numQuestions: number;
}

interface TestAnswer {
  questionIndex: number;
  answer: string;
}

interface TestResult {
  id: string;
  testId: string;
  userId: string;
  score: number;
  completedAt: string;
  answersWithDetails: {
    questionIndex: number;
    userAnswer: string;
    isCorrect: boolean;
    correctAnswer: string;
  }[];
}

interface Test {
  id: string;
  title: string;
  description: string;
  type: TestType;
  settings: TestSettings;
  questions: Question[];
  createdAt: string;
  updatedAt: string;
}

/**
 * Tests Service
 * Handles all test-related operations including generating tests,
 * fetching tests, and saving test results
 */
export class TestsService {
  /**
   * Get a test by ID
   */
  static async getTest(id: string): Promise<Test> {
    try {
      const { data } = await apolloClient.query({
        query: GET_TEST,
        variables: { id }
      });
      
      return data.getTest;
    } catch (error) {
      console.error('Error fetching test:', error);
      throw error;
    }
  }

  /**
   * Get all tests
   */
  static async getTests(): Promise<Test[]> {
    try {
      const { data } = await apolloClient.query({
        query: GET_TESTS,
        fetchPolicy: 'network-only'
      });
      
      return data.getTests;
    } catch (error) {
      console.error('Error fetching tests:', error);
      throw error;
    }
  }

  /**
   * Generate a vocabulary test based on specified parameters
   */
  static async generateVocabTest(input: GenerateTestInput): Promise<Test> {
    try {
      const { data } = await apolloClient.query({
        query: GENERATE_VOCAB_TEST,
        variables: { input },
        fetchPolicy: 'network-only' // Don't use cache for test generation
      });
      
      return data.generateVocabTest;
    } catch (error) {
      console.error('Error generating vocabulary test:', error);
      throw error;
    }
  }

  /**
   * Save a completed test result
   */
  static async saveTestResult(
    testId: string, 
    score: number, 
    answers: TestAnswer[]
  ): Promise<TestResult> {
    try {
      const { data } = await apolloClient.mutate({
        mutation: SAVE_TEST_RESULT,
        variables: { 
          testId, 
          score, 
          answers 
        }
      });
      
      return data.saveTestResult;
    } catch (error) {
      console.error('Error saving test result:', error);
      throw error;
    }
  }

  /**
   * Calculate score for a test based on user answers
   * This is a helper method that calculates the score locally
   * before submitting to the backend
   */
  static calculateTestScore(questions: Question[], userAnswers: TestAnswer[]): number {
    if (!questions.length) return 0;
    
    let correctAnswers = 0;
    
    userAnswers.forEach(answer => {
      const question = questions[answer.questionIndex];
      
      if (!question) return;
      
      let isCorrect = false;
      
      switch (question.type) {
        case 'multipleChoice':
          // For multiple choice, convert answer to number and check against correctOptionIndex
          isCorrect = parseInt(answer.answer, 10) === question.correctOptionIndex;
          break;
          
        case 'matching':
          // For matching, convert answer to number and check against correctOptionIndex
          isCorrect = parseInt(answer.answer, 10) === question.correctOptionIndex;
          break;
          
        case 'fillInBlanks':
          // For fill in blanks, do a case-insensitive comparison
          isCorrect = answer.answer.toLowerCase() === question.correctAnswer.toLowerCase();
          break;
      }
      
      if (isCorrect) {
        correctAnswers++;
      }
    });
    
    // Return score as percentage
    return (correctAnswers / questions.length) * 100;
  }
} 