import { VocabularyWord, LanguageCode, VocabularyProgress, MasteryStatus } from '../types/vocabulary';
import { ENGLISH_VOCABULARY_WORDS } from '../data/vocabulary/english';
import { CHINESE_VOCABULARY_WORDS } from '../data/vocabulary/chinese';
import { calculateMasteryStatus, calculateNewMasteryScore } from '../types/learningProgress';
import { learnerActivityService } from './learnerActivityService';

const STORAGE_KEY_PREFIX = 'bensop_vocab_progress_';
const STORAGE_KEY_SAVED = 'bensop_vocab_saved';

class VocabularyService {
  private getStorageKey(language: LanguageCode): string {
    return `${STORAGE_KEY_PREFIX}${language}`;
  }

  getAllWords(language: LanguageCode): VocabularyWord[] {
    return language === 'en' ? ENGLISH_VOCABULARY_WORDS : CHINESE_VOCABULARY_WORDS;
  }

  getWordBySlug(slug: string, language?: LanguageCode): VocabularyWord | undefined {
    if (language) {
      const words = this.getAllWords(language);
      return words.find((w) => w.slug.toLowerCase() === slug.toLowerCase() || w.word.toLowerCase() === slug.toLowerCase());
    }
    const all = [...ENGLISH_VOCABULARY_WORDS, ...CHINESE_VOCABULARY_WORDS];
    return all.find((w) => w.slug.toLowerCase() === slug.toLowerCase() || w.word.toLowerCase() === slug.toLowerCase());
  }

  getWordById(id: string): VocabularyWord | undefined {
    const all = [...ENGLISH_VOCABULARY_WORDS, ...CHINESE_VOCABULARY_WORDS];
    return all.find((w) => w.id === id);
  }

  getWordsByTopic(topicIdOrSlug: string, language: LanguageCode): VocabularyWord[] {
    const words = this.getAllWords(language);
    return words.filter((w) => w.topicId === topicIdOrSlug || w.tags.includes(topicIdOrSlug));
  }

  getWordsByLevel(level: string, language: LanguageCode): VocabularyWord[] {
    const words = this.getAllWords(language);
    return words.filter((w) => w.level === level);
  }

  searchWords(query: string, language?: LanguageCode): VocabularyWord[] {
    const words = language ? this.getAllWords(language) : [...ENGLISH_VOCABULARY_WORDS, ...CHINESE_VOCABULARY_WORDS];
    if (!query || !query.trim()) return words;

    const q = query.trim().toLowerCase();
    return words.filter((w) => {
      const matchWord = w.word.toLowerCase().includes(q);
      const matchMean = w.meaning.toLowerCase().includes(q);
      const matchPron = w.pronunciation.toLowerCase().includes(q);
      const matchPhon = w.phonetic?.toLowerCase().includes(q);
      const matchTopic = w.topicName.toLowerCase().includes(q);
      const matchTags = w.tags.some((t) => t.toLowerCase().includes(q));
      return matchWord || matchMean || matchPron || matchPhon || matchTopic || matchTags;
    });
  }

  // --- PROGRESS & PERSISTENCE ---

  private getProgressMap(language: LanguageCode): Record<string, VocabularyProgress> {
    try {
      const raw = localStorage.getItem(this.getStorageKey(language));
      if (!raw) return {};
      return JSON.parse(raw);
    } catch {
      return {};
    }
  }

  private saveProgressMap(language: LanguageCode, map: Record<string, VocabularyProgress>): void {
    try {
      localStorage.setItem(this.getStorageKey(language), JSON.stringify(map));
    } catch (e) {
      console.error('Failed to save vocabulary progress', e);
    }
  }

  getProgress(wordId: string, language: LanguageCode): VocabularyProgress {
    const map = this.getProgressMap(language);
    if (map[wordId]) return map[wordId];

    return {
      wordId,
      userId: 'user_active',
      language,
      masteryScore: 0,
      status: 'NEW',
      isMarkedLearned: false,
      reviewCount: 0,
      correctCount: 0,
      wrongCount: 0
    };
  }

  getAllProgress(language: LanguageCode): Record<string, VocabularyProgress> {
    return this.getProgressMap(language);
  }

  markAsLearned(wordId: string, language: LanguageCode): VocabularyProgress {
    const map = this.getProgressMap(language);
    const existing = this.getProgress(wordId, language);
    const nextScore = Math.max(existing.masteryScore, 40); // Marked learned gives baseline familiar score
    const updated: VocabularyProgress = {
      ...existing,
      isMarkedLearned: true,
      masteryScore: nextScore,
      status: calculateMasteryStatus(nextScore),
      lastReviewedAt: new Date().toISOString()
    };
    map[wordId] = updated;
    this.saveProgressMap(language, map);
    return updated;
  }

  updateWordMastery(
    wordId: string,
    language: LanguageCode,
    isCorrect: boolean,
    usedHint: boolean = false
  ): VocabularyProgress {
    const map = this.getProgressMap(language);
    const existing = this.getProgress(wordId, language);
    const newScore = calculateNewMasteryScore(existing.masteryScore, isCorrect, usedHint);
    const updated: VocabularyProgress = {
      ...existing,
      masteryScore: newScore,
      status: calculateMasteryStatus(newScore),
      correctCount: existing.correctCount + (isCorrect ? 1 : 0),
      wrongCount: existing.wrongCount + (isCorrect ? 0 : 1),
      reviewCount: existing.reviewCount + 1,
      lastReviewedAt: new Date().toISOString()
    };
    map[wordId] = updated;
    this.saveProgressMap(language, map);
    learnerActivityService.record({skill:'vocabulary',language,activityId:wordId,score:newScore,evidenceType:'mastery',timestamp:updated.lastReviewedAt||new Date().toISOString(),metadata:{isCorrect,usedHint}});
    return updated;
  }

  // --- BOOKMARKS & SAVED ---

  getSavedWordIds(): string[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_SAVED);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  toggleSaveWord(wordId: string): boolean {
    const saved = this.getSavedWordIds();
    let next: string[];
    let isSavedNow = false;
    if (saved.includes(wordId)) {
      next = saved.filter((id) => id !== wordId);
      isSavedNow = false;
    } else {
      next = [...saved, wordId];
      isSavedNow = true;
    }
    localStorage.setItem(STORAGE_KEY_SAVED, JSON.stringify(next));
    return isSavedNow;
  }

  isWordSaved(wordId: string): boolean {
    return this.getSavedWordIds().includes(wordId);
  }
}

export const vocabularyService = new VocabularyService();
