export type LanguageCode = 'en' | 'zh';

export type VocabularyLevel =
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

export type MasteryStatus = 'NEW' | 'LEARNING' | 'FAMILIAR' | 'STRONG' | 'MASTERED';

export interface VocabularyExample {
  sentence: string;
  translation: string;
  highlight?: string;
  audio?: string;
}

export interface VocabularyRelatedWord {
  word: string;
  slug: string;
  partOfSpeech?: string;
  meaning: string;
}

export interface VocabularyWord {
  id: string;
  language: LanguageCode;
  word: string;
  slug: string;
  pronunciation: string; // phonetic IPA or pinyin
  phonetic?: string; // Pinyin for Chinese, IPA for English
  partOfSpeech: string;
  meaning: string;
  definitions?: string[];
  examples: VocabularyExample[];
  synonyms?: string[];
  antonyms?: string[];
  collocations?: string[];
  relatedWords?: VocabularyRelatedWord[];
  topicId: string;
  topicName: string;
  level: VocabularyLevel;
  frequency?: number; // 1-5
  tags: string[];
  audio?: string;
  image?: string;
  relatedLessonSlug?: string;
  relatedCourseSlug?: string;
  relatedArticleSlug?: string;
  relatedQuizSlug?: string;
  relatedGrammarSlug?: string;
  questionIds?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface VocabularyTopic {
  id: string;
  language: LanguageCode;
  name: string;
  slug: string;
  description: string;
  wordCount: number;
  difficulty: string; // e.g., 'A1–B2' or 'HSK 1–3'
  image: string;
  tags?: string[];
}

export interface VocabularyProgress {
  wordId: string;
  userId: string;
  language: LanguageCode;
  masteryScore: number; // 0 - 100
  status: MasteryStatus;
  isMarkedLearned: boolean;
  isSaved?: boolean;
  lastReviewedAt?: string;
  nextReviewAt?: string;
  reviewCount: number;
  correctCount: number;
  wrongCount: number;
}
