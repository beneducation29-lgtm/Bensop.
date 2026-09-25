import { LanguageCode, MasteryStatus } from './vocabulary';

export type GrammarLevel =
  | 'A1'
  | 'A2'
  | 'B1'
  | 'B2'
  | 'C1'
  | 'C2'
  | 'HSK 1'
  | 'HSK 2'
  | 'HSK 3'
  | 'HSK 4'
  | 'HSK 5'
  | 'HSK 6';

export interface GrammarRuleItem {
  title: string;
  formula: string;
  explanation: string;
}

export interface GrammarExampleItem {
  sentence: string;
  translation: string;
  highlight: string;
  explanation?: string;
}

export interface GrammarCommonMistake {
  incorrect: string;
  correct: string;
  explanation: string;
}

export interface GrammarComparisonAspect {
  title: string;
  targetUsage: string;
  comparedUsage: string;
}

export interface GrammarComparisonItem {
  targetConcept: string;
  comparedConcept: string;
  targetSlug?: string;
  comparedSlug?: string;
  aspects: GrammarComparisonAspect[];
  signalWordsTarget: string[];
  signalWordsCompared: string[];
}

export interface GrammarRelatedConcept {
  title: string;
  slug: string;
  level: string;
}

export interface GrammarConcept {
  id: string;
  language: LanguageCode;
  title: string;
  slug: string;
  level: GrammarLevel;
  topic: string;
  topicName: string;
  shortDescription: string;
  theIdea: string;
  whenToUse: string[];
  rules: GrammarRuleItem[];
  examples: GrammarExampleItem[];
  commonMistakes: GrammarCommonMistake[];
  comparison?: GrammarComparisonItem;
  exceptions?: string[];
  relatedConcepts?: GrammarRelatedConcept[];
  relatedVocabSlugs?: string[];
  lessonIds?: string[];
  relatedLessonSlug?: string;
  relatedCourseSlug?: string;
  relatedArticleSlug?: string;
  relatedQuizSlug?: string;
  questionIds?: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface GrammarTopic {
  id: string;
  language: LanguageCode;
  name: string;
  slug: string;
  description: string;
  conceptCount: number;
  levelRange: string;
  image?: string;
}

export interface GrammarProgress {
  grammarConceptId: string;
  userId: string;
  language: LanguageCode;
  masteryScore: number; // 0 - 100
  status: MasteryStatus;
  practiceCount: number;
  correctCount: number;
  wrongCount: number;
  isSaved?: boolean;
  lastPracticedAt?: string;
  nextReviewAt?: string;
}
