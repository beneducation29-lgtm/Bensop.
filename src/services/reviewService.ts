import { LanguageCode, VocabularyWord } from '../types/vocabulary';
import { GrammarConcept } from '../types/grammar';
import { vocabularyService } from './vocabularyService';
import { grammarService } from './grammarService';

export interface VocabularyReviewBuckets {
  dueToday: VocabularyWord[];
  needsPractice: VocabularyWord[];
  recentlyLearned: VocabularyWord[];
  strongWords: VocabularyWord[];
}

export interface GrammarReviewBuckets {
  needsPractice: GrammarConcept[];
  strongConcepts: GrammarConcept[];
  recentlyLearned: GrammarConcept[];
  recommended: GrammarConcept[];
}

class ReviewService {
  getWordsToReview(language: LanguageCode): VocabularyReviewBuckets {
    const allWords = vocabularyService.getAllWords(language);
    const progressMap = vocabularyService.getAllProgress(language);

    const dueToday: VocabularyWord[] = [];
    const needsPractice: VocabularyWord[] = [];
    const recentlyLearned: VocabularyWord[] = [];
    const strongWords: VocabularyWord[] = [];

    allWords.forEach((word) => {
      const p = progressMap[word.id];
      if (!p || p.status === 'NEW') {
        // If unlearned, put top 3 into due today as discovery
        if (dueToday.length < 5) dueToday.push(word);
      } else {
        if (p.wrongCount > p.correctCount || p.status === 'LEARNING') {
          needsPractice.push(word);
        } else if (p.status === 'STRONG' || p.status === 'MASTERED') {
          strongWords.push(word);
        } else {
          recentlyLearned.push(word);
        }
      }
    });

    // Fallback so review mode is always populated with items to practice
    if (dueToday.length === 0 && allWords.length > 0) {
      dueToday.push(...allWords.slice(0, 6));
    }
    if (needsPractice.length === 0 && allWords.length > 6) {
      needsPractice.push(...allWords.slice(6, 12));
    }

    return {
      dueToday,
      needsPractice,
      recentlyLearned,
      strongWords
    };
  }

  getGrammarToReview(language: LanguageCode): GrammarReviewBuckets {
    const allConcepts = grammarService.getAllConcepts(language);
    const progressMap = grammarService.getAllProgress(language);

    const needsPractice: GrammarConcept[] = [];
    const strongConcepts: GrammarConcept[] = [];
    const recentlyLearned: GrammarConcept[] = [];
    const recommended: GrammarConcept[] = [];

    allConcepts.forEach((concept) => {
      const p = progressMap[concept.id];
      if (!p || p.status === 'NEW') {
        if (recommended.length < 4) recommended.push(concept);
      } else {
        if (p.wrongCount > p.correctCount || p.status === 'LEARNING') {
          needsPractice.push(concept);
        } else if (p.status === 'STRONG' || p.status === 'MASTERED') {
          strongConcepts.push(concept);
        } else {
          recentlyLearned.push(concept);
        }
      }
    });

    if (recommended.length === 0 && allConcepts.length > 0) {
      recommended.push(...allConcepts.slice(0, 4));
    }
    if (needsPractice.length === 0 && allConcepts.length > 4) {
      needsPractice.push(...allConcepts.slice(4, 8));
    }

    return {
      needsPractice,
      strongConcepts,
      recentlyLearned,
      recommended
    };
  }
}

export const reviewService = new ReviewService();
