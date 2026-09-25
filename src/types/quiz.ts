export type QuestionType =
  | 'multiple-choice'
  | 'multiple-select'
  | 'true-false'
  | 'fill-blank'
  | 'matching'
  | 'ordering'
  | 'sentence-correction'
  | 'translation'
  | 'listening'
  | 'image-choice';

export type SkillType =
  | 'Vocabulary'
  | 'Grammar'
  | 'Reading'
  | 'Listening'
  | 'Speaking'
  | 'Writing'
  | 'Pronunciation';

export type DifficultyLevel =
  | 'Beginner'
  | 'Elementary'
  | 'Intermediate'
  | 'Upper Intermediate'
  | 'Advanced';

export interface MatchingPair {
  left: string;
  right: string;
}

export interface Question {
  id: string;
  categoryId: 'tieng-anh' | 'tieng-trung' | 'phat-trien-ban-than' | 'suc-khoe-doi-song';
  subjectId: string;
  topicId: string;
  vocabularyId?: string;
  grammarConceptId?: string;
  listeningLessonId?: string;
  audioSegmentId?: string;
  speakingActivityId?: string;
  lessonId?: string;
  courseId?: string;
  skill: SkillType;
  type: QuestionType;
  difficulty: DifficultyLevel;
  cefrLevel?: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  hskLevel?: 'HSK 1' | 'HSK 2' | 'HSK 3' | 'HSK 4' | 'HSK 5' | 'HSK 6';
  question: string;
  instructions?: string;
  options?: string[]; // for multiple-choice, multiple-select, image-choice, sentence-correction
  correctAnswer: any; // string, string[], boolean, MatchingPair[], string (for fill-blank)
  explanation: {
    general: string;
    whyCorrect?: string;
    whyWrong?: Record<string, string>;
    grammarRule?: string;
    vocabularyNote?: string;
    example?: string;
    tip?: string;
  };
  hint?: string[];
  example?: string;
  tags: string[];
  points: number;
  timeLimit?: number; // in seconds
  audioUrl?: string; // for listening questions
  imageUrl?: string; // for image-choice questions
  imageOptions?: { id: string; label: string; imageUrl?: string }[];
  matchingPairs?: MatchingPair[]; // for matching questions
  orderingItems?: string[]; // for ordering questions
  sentenceToCorrect?: {
    original: string;
    segments: string[];
    errorSegmentIndex: number;
    correction: string;
  };
  translationPrompt?: {
    sourceLanguage: 'EN' | 'ZH' | 'VI';
    targetLanguage: 'EN' | 'ZH' | 'VI';
    sourceText: string;
    acceptableAnswers: string[];
  };
  stats?: {
    timesAttempted: number;
    timesCorrect: number;
    accuracy: number;
  };
  createdAt: string;
  updatedAt: string;
}

export type QuizType =
  | 'practice'
  | 'topic'
  | 'lesson'
  | 'course'
  | 'placement'
  | 'review'
  | 'mock-test'
  | 'daily';

export interface QuizModel {
  id: string;
  title: string;
  slug: string;
  categoryId: 'tieng-anh' | 'tieng-trung' | 'phat-trien-ban-than' | 'suc-khoe-doi-song';
  categoryName: string;
  description: string;
  type: QuizType;
  skills: SkillType[];
  topics: string[];
  questionIds: string[];
  questionCount: number;
  difficulty: DifficultyLevel;
  duration: number; // in minutes (0 means untimed)
  passingScore: number; // percentage, e.g. 70
  randomizeQuestions: boolean;
  randomizeOptions: boolean;
  showExplanation: boolean;
  allowRetry: boolean;
  relatedLessonSlug?: string;
  relatedCourseSlug?: string;
  createdAt: string;
}

export type QuizSessionStatus =
  | 'not-started'
  | 'in-progress'
  | 'completed'
  | 'abandoned';

export interface QuizSession {
  id: string;
  userId: string;
  quizId: string;
  quizSlug: string;
  quizTitle: string;
  categoryId: string;
  categoryName: string;
  questionIds: string[];
  currentQuestionIndex: number;
  answers: Record<string, any>; // questionId -> answer
  markedForReview: string[]; // array of questionIds
  timeRemaining: number; // in seconds
  totalTimeSpent: number; // in seconds
  startedAt: string;
  completedAt?: string;
  status: QuizSessionStatus;
  score?: number;
  accuracy?: number;
  result?: QuizResult;
}

export interface QuestionBreakdown {
  questionId: string;
  question: Question;
  userAnswer: any;
  isCorrect: boolean;
  isPartiallyCorrect?: boolean;
  earnedPoints: number;
  possiblePoints: number;
  explanation: Question['explanation'];
}

export interface QuizResult {
  sessionId: string;
  quizId: string;
  quizTitle: string;
  quizSlug: string;
  categoryId: string;
  categoryName: string;
  totalQuestions: number;
  answeredCount: number;
  unansweredCount: number;
  correctCount: number;
  wrongCount: number;
  markedCount: number;
  totalPoints: number;
  earnedPoints: number;
  score: number; // 0-100 percentage
  accuracy: number; // 0-100 percentage
  passed: boolean;
  timeSpent: number; // in seconds
  completedAt: string;
  skillBreakdown: Record<string, { total: number; correct: number; percentage: number }>;
  topicBreakdown: Record<string, { total: number; correct: number; percentage: number }>;
  difficultyBreakdown: Record<string, { total: number; correct: number; percentage: number }>;
  questionBreakdowns: QuestionBreakdown[];
  wrongQuestionIds: string[];
}

export interface QuizAttemptSummary {
  sessionId: string;
  quizId: string;
  quizSlug: string;
  quizTitle: string;
  categoryId: string;
  categoryName: string;
  score: number;
  accuracy: number;
  passed: boolean;
  date: string;
  timeSpent: string;
  correctCount: number;
  totalQuestions: number;
}

export interface WeakAreaItem {
  id: string;
  topicId: string;
  topicName: string;
  categoryName: string;
  skill: SkillType;
  accuracy: number;
  attemptsCount: number;
  recommendedAction: string;
  recommendedQuizSlug?: string;
  recommendedLessonSlug?: string;
}

export interface LearningAnalytics {
  overallAccuracy: number;
  questionsAnswered: number;
  questionsCorrect: number;
  quizzesCompleted: number;
  averageScore: number;
  totalStudyTimeMinutes: number;
  skillBreakdown: Record<string, number>; // skill -> accuracy percentage
  topicBreakdown: Record<string, number>; // topic -> accuracy percentage
  weakAreas: WeakAreaItem[];
  strongAreas: { name: string; accuracy: number; count: number }[];
  streakDays: number;
  recentAttempts: QuizAttemptSummary[];
}
