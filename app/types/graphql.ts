/**
 * GraphQL Types
 * These types reflect the GraphQL schema from the backend
 */

// User related types
export interface User {
  id: string;
  username: string;
  email: string;
  nativeLanguage: 'en' | 'zh';
  preferences: UserPreferences;
  createdAt: string;
  updatedAt: string;
}

export interface UserPreferences {
  darkMode: boolean;
}

// Auth related types
export interface AuthPayload {
  token: string;
  user: User;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterUserInput {
  username: string;
  email: string;
  password: string;
  nativeLanguage: 'en' | 'zh';
  preferences?: UserPreferencesInput;
}

export interface UserPreferencesInput {
  darkMode: boolean;
}

export interface UpdateUserInput {
  username?: string;
  email?: string;
  nativeLanguage?: 'en' | 'zh';
  preferences?: UserPreferencesInput;
}

// Vocabulary related types
export interface VocabItem {
  id: string;
  term: string;
  definitionEn: string;
  definitionZh: string;
  exampleSentence: string;
  partOfSpeech: string;
  difficultyRating: 1 | 2 | 3 | 4 | 5;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface VocabList {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  items: VocabItem[];
  creator: User;
  createdAt: string;
  updatedAt: string;
}

export interface VocabItemInput {
  term: string;
  definitionEn: string;
  definitionZh: string;
  exampleSentence: string;
  partOfSpeech: string;
  difficultyRating: 1 | 2 | 3 | 4 | 5;
  tags?: string[];
}

export interface VocabListInput {
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  itemIds: string[];
}

// Test related types
export type TestType = 'multipleChoice' | 'matching' | 'fillInBlanks';

export interface TestSettings {
  timeLimit?: number;
  randomizeQuestions: boolean;
  randomizeOptions: boolean;
  showFeedbackAfterEachQuestion: boolean;
}

export interface TestSettingsInput {
  timeLimit?: number;
  randomizeQuestions: boolean;
  randomizeOptions: boolean;
  showFeedbackAfterEachQuestion: boolean;
}

export interface BaseQuestion {
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

export type Question = MultipleChoiceQuestion | MatchingQuestion | FillInBlanksQuestion; 