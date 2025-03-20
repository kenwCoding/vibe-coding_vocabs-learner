import { gql } from '../lib/gql-utils';

// Queries
export const GET_TEST = gql`
  query GetTest($id: ID!) {
    getTest(id: $id) {
      id
      title
      description
      type
      settings {
        timeLimit
        randomizeQuestions
        randomizeOptions
        showFeedbackAfterEachQuestion
      }
      questions {
        ... on MultipleChoiceQuestion {
          type
          prompt
          options
          correctOptionIndex
          vocabItemId
          difficultyRating
        }
        ... on MatchingQuestion {
          type
          term
          options
          correctOptionIndex
          vocabItemId
          difficultyRating
        }
        ... on FillInBlanksQuestion {
          type
          sentence
          blankIndex
          correctAnswer
          vocabItemId
          difficultyRating
        }
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_TESTS = gql`
  query GetTests {
    getTests {
      id
      title
      description
      type
      createdAt
    }
  }
`;

export const GENERATE_VOCAB_TEST = gql`
  query GenerateVocabTest($input: GenerateTestInput!) {
    generateVocabTest(input: $input) {
      id
      title
      description
      type
      settings {
        timeLimit
        randomizeQuestions
        randomizeOptions
        showFeedbackAfterEachQuestion
      }
      questions {
        ... on MultipleChoiceQuestion {
          type
          prompt
          options
          correctOptionIndex
          vocabItemId
          difficultyRating
        }
        ... on MatchingQuestion {
          type
          term
          options
          correctOptionIndex
          vocabItemId
          difficultyRating
        }
        ... on FillInBlanksQuestion {
          type
          sentence
          blankIndex
          correctAnswer
          vocabItemId
          difficultyRating
        }
      }
    }
  }
`;

// Mutations
export const SAVE_TEST_RESULT = gql`
  mutation SaveTestResult($testId: ID!, $score: Float!, $answers: [TestAnswerInput!]!) {
    saveTestResult(testId: $testId, score: $score, answers: $answers) {
      id
      testId
      userId
      score
      completedAt
      answersWithDetails {
        questionIndex
        userAnswer
        isCorrect
        correctAnswer
      }
    }
  }
`; 