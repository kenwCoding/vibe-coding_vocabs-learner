import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Types of tests supported by the application
 */
export type TestType = 'multipleChoice' | 'matching' | 'fillInBlanks';

/**
 * Question formats
 */
interface BaseQuestion {
  id: string;
  vocabItemId: string;
  difficultyRating: 1 | 2 | 3 | 4 | 5;
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multipleChoice';
  prompt: string;
  options: string[];
  correctOptionIndex: number;
}

export interface MatchingQuestion extends BaseQuestion {
  type: 'matching';
  term: string;
  options: string[];
  correctOptionIndex: number;
}

export interface FillInBlanksQuestion extends BaseQuestion {
  type: 'fillInBlanks';
  sentence: string;
  blankIndex: number;
  correctAnswer: string;
}

export type TestQuestion = 
  | MultipleChoiceQuestion 
  | MatchingQuestion 
  | FillInBlanksQuestion;

/**
 * Test data structure
 */
export interface Test {
  id: string;
  title: string;
  description: string;
  type: TestType;
  questions: TestQuestion[];
  settings: {
    timeLimit?: number; // seconds, undefined means no time limit
    randomizeQuestions: boolean;
    randomizeOptions: boolean;
    showFeedbackAfterEachQuestion: boolean;
  };
  createdAt: string;
}

/**
 * User's attempt at taking a test
 */
export interface TestAttempt {
  id: string;
  testId: string;
  userId: string;
  startedAt: string;
  completedAt?: string;
  answers: {
    questionId: string;
    userAnswer: string | number;
    isCorrect: boolean;
    timeSpent: number; // seconds
  }[];
  score?: number; // percentage
}

/**
 * State management for tests
 */
interface TestState {
  tests: Record<string, Test>;
  currentTest: Test | null;
  currentAttempt: TestAttempt | null;
  attempts: TestAttempt[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  createTest: (test: Omit<Test, 'id' | 'createdAt'>) => string;
  updateTest: (id: string, test: Partial<Test>) => void;
  deleteTest: (id: string) => void;
  startTest: (testId: string, userId: string) => void;
  submitAnswer: (questionId: string, answer: string | number, timeSpent: number) => void;
  completeTest: () => void;
  clearCurrentTest: () => void;
  clearError: () => void;
}

/**
 * Helper to generate random IDs
 */
const generateId = () => Math.random().toString(36).substring(2, 9);

/**
 * Mock data for tests
 */
const mockTests: Record<string, Test> = {
  't1': {
    id: 't1',
    title: 'Academic Vocabulary Quiz',
    description: 'Test your knowledge of advanced academic vocabulary',
    type: 'multipleChoice',
    questions: [
      {
        id: 'q1',
        type: 'multipleChoice',
        vocabItemId: 'v1',
        difficultyRating: 4,
        prompt: 'Which of the following best defines "ubiquitous"?',
        options: [
          'Present, appearing, or found everywhere',
          'Rare and unusual',
          'Confusing or complex',
          'Important or significant'
        ],
        correctOptionIndex: 0
      },
      {
        id: 'q2',
        type: 'multipleChoice',
        vocabItemId: 'v2',
        difficultyRating: 4,
        prompt: 'What does "paradigm" refer to?',
        options: [
          'A paradox or contradiction',
          'A typical example or pattern of something',
          'A method of computation',
          'An extreme situation'
        ],
        correctOptionIndex: 1
      }
    ],
    settings: {
      randomizeQuestions: true,
      randomizeOptions: true,
      showFeedbackAfterEachQuestion: true
    },
    createdAt: new Date().toISOString()
  }
};

/**
 * Test store for managing tests and user attempts
 */
export const useTestStore = create<TestState>()(
  persist(
    (set, get) => ({
      tests: mockTests,
      currentTest: null,
      currentAttempt: null,
      attempts: [],
      isLoading: false,
      error: null,
      
      createTest: (test) => {
        const id = generateId();
        set((state) => ({
          tests: {
            ...state.tests,
            [id]: {
              ...test,
              id,
              createdAt: new Date().toISOString()
            }
          }
        }));
        return id;
      },

      updateTest: (id, test) => {
        set((state) => ({
          tests: {
            ...state.tests,
            [id]: {
              ...state.tests[id],
              ...test
            }
          }
        }));
      },

      deleteTest: (id) => {
        set((state) => {
          const { [id]: testToDelete, ...remainingTests } = state.tests;
          return {
            tests: remainingTests
          };
        });
      },

      startTest: (testId, userId) => {
        try {
          const test = get().tests[testId];
          if (!test) {
            throw new Error('Test not found');
          }
          
          // Randomize questions if needed
          let questions = [...test.questions];
          if (test.settings.randomizeQuestions) {
            questions = questions.sort(() => Math.random() - 0.5);
          }
          
          // Randomize options for each question if needed
          if (test.settings.randomizeOptions) {
            questions = questions.map(q => {
              if (q.type === 'multipleChoice' || q.type === 'matching') {
                const options = [...q.options];
                const correctOption = options[q.correctOptionIndex];
                const shuffledOptions = options.sort(() => Math.random() - 0.5);
                const newCorrectIndex = shuffledOptions.indexOf(correctOption);
                
                return {
                  ...q,
                  options: shuffledOptions,
                  correctOptionIndex: newCorrectIndex
                };
              }
              return q;
            });
          }
          
          // Create new test with possibly randomized questions
          const currentTest = {
            ...test,
            questions
          };
          
          // Create a new attempt
          const attemptId = generateId();
          const attempt: TestAttempt = {
            id: attemptId,
            testId,
            userId,
            startedAt: new Date().toISOString(),
            answers: []
          };
          
          set({
            currentTest,
            currentAttempt: attempt,
            isLoading: false,
            error: null
          });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'An error occurred',
            isLoading: false
          });
        }
      },

      submitAnswer: (questionId, answer, timeSpent) => {
        const { currentTest, currentAttempt } = get();
        
        if (!currentTest || !currentAttempt) {
          set({ error: 'No active test' });
          return;
        }
        
        const question = currentTest.questions.find(q => q.id === questionId);
        
        if (!question) {
          set({ error: 'Question not found' });
          return;
        }
        
        // Determine if answer is correct
        let isCorrect = false;
        
        if (question.type === 'multipleChoice' || question.type === 'matching') {
          isCorrect = answer === question.correctOptionIndex;
        } else if (question.type === 'fillInBlanks') {
          isCorrect = String(answer).toLowerCase() === question.correctAnswer.toLowerCase();
        }
        
        // Record the answer
        set((state) => {
          if (!state.currentAttempt) return state;
          
          return {
            currentAttempt: {
              ...state.currentAttempt,
              answers: [
                ...state.currentAttempt.answers,
                {
                  questionId,
                  userAnswer: answer,
                  isCorrect,
                  timeSpent
                }
              ]
            }
          };
        });
      },

      completeTest: () => {
        const { currentTest, currentAttempt } = get();
        
        if (!currentTest || !currentAttempt) {
          set({ error: 'No active test' });
          return;
        }
        
        // Calculate score
        const totalQuestions = currentTest.questions.length;
        const correctAnswers = currentAttempt.answers.filter(a => a.isCorrect).length;
        const score = (correctAnswers / totalQuestions) * 100;
        
        // Mark test as completed
        const completedAttempt = {
          ...currentAttempt,
          completedAt: new Date().toISOString(),
          score
        };
        
        set((state) => ({
          currentAttempt: completedAttempt,
          attempts: [...state.attempts, completedAttempt]
        }));
      },

      clearCurrentTest: () => {
        set({
          currentTest: null,
          currentAttempt: null
        });
      },

      clearError: () => {
        set({ error: null });
      }
    }),
    {
      name: 'test-storage',
      partialize: (state) => ({
        tests: state.tests,
        attempts: state.attempts
      }),
    }
  )
); 