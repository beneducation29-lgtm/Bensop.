import { GrammarConcept, GrammarProgress } from '../types/grammar';
import { LanguageCode } from '../types/vocabulary';
import { ENGLISH_GRAMMAR_CONCEPTS } from '../data/grammar/english';
import { CHINESE_GRAMMAR_CONCEPTS } from '../data/grammar/chinese';
import { calculateMasteryStatus, calculateNewMasteryScore } from '../types/learningProgress';

const STORAGE_KEY_PREFIX = 'bensop_grammar_progress_';
const STORAGE_KEY_SAVED = 'bensop_grammar_saved';

class GrammarService {
  private getStorageKey(language: LanguageCode): string {
    return `${STORAGE_KEY_PREFIX}${language}`;
  }

  getAllConcepts(language: LanguageCode): GrammarConcept[] {
    return language === 'en' ? ENGLISH_GRAMMAR_CONCEPTS : CHINESE_GRAMMAR_CONCEPTS;
  }

  getConceptBySlug(slug: string, language?: LanguageCode): GrammarConcept | undefined {
    if (language) {
      const concepts = this.getAllConcepts(language);
      return concepts.find((c) => c.slug.toLowerCase() === slug.toLowerCase());
    }
    const all = [...ENGLISH_GRAMMAR_CONCEPTS, ...CHINESE_GRAMMAR_CONCEPTS];
    return all.find((c) => c.slug.toLowerCase() === slug.toLowerCase());
  }

  getConceptById(id: string): GrammarConcept | undefined {
    const all = [...ENGLISH_GRAMMAR_CONCEPTS, ...CHINESE_GRAMMAR_CONCEPTS];
    return all.find((c) => c.id === id);
  }

  getConceptsByTopic(topicSlug: string, language: LanguageCode): GrammarConcept[] {
    const concepts = this.getAllConcepts(language);
    return concepts.filter((c) => c.topic === topicSlug || c.tags.includes(topicSlug));
  }

  searchConcepts(query: string, language?: LanguageCode): GrammarConcept[] {
    const concepts = language ? this.getAllConcepts(language) : [...ENGLISH_GRAMMAR_CONCEPTS, ...CHINESE_GRAMMAR_CONCEPTS];
    if (!query || !query.trim()) return concepts;

    const q = query.trim().toLowerCase();
    return concepts.filter((c) => {
      const matchTitle = c.title.toLowerCase().includes(q);
      const matchDesc = c.shortDescription.toLowerCase().includes(q);
      const matchIdea = c.theIdea.toLowerCase().includes(q);
      const matchTopic = c.topicName.toLowerCase().includes(q);
      const matchTags = c.tags.some((t) => t.toLowerCase().includes(q));
      return matchTitle || matchDesc || matchIdea || matchTopic || matchTags;
    });
  }

  // --- PROGRESS & PERSISTENCE ---

  private getProgressMap(language: LanguageCode): Record<string, GrammarProgress> {
    try {
      const raw = localStorage.getItem(this.getStorageKey(language));
      if (!raw) return {};
      return JSON.parse(raw);
    } catch {
      return {};
    }
  }

  private saveProgressMap(language: LanguageCode, map: Record<string, GrammarProgress>): void {
    try {
      localStorage.setItem(this.getStorageKey(language), JSON.stringify(map));
    } catch (e) {
      console.error('Failed to save grammar progress', e);
    }
  }

  getProgress(conceptId: string, language: LanguageCode): GrammarProgress {
    const map = this.getProgressMap(language);
    if (map[conceptId]) return map[conceptId];

    return {
      grammarConceptId: conceptId,
      userId: 'user_active',
      language,
      masteryScore: 0,
      status: 'NEW',
      practiceCount: 0,
      correctCount: 0,
      wrongCount: 0
    };
  }

  getAllProgress(language: LanguageCode): Record<string, GrammarProgress> {
    return this.getProgressMap(language);
  }

  markAsViewed(conceptId: string, language: LanguageCode): GrammarProgress {
    const map = this.getProgressMap(language);
    const existing = this.getProgress(conceptId, language);
    if (existing.status === 'NEW') {
      const updated: GrammarProgress = {
        ...existing,
        masteryScore: 20,
        status: 'LEARNING',
        lastPracticedAt: new Date().toISOString()
      };
      map[conceptId] = updated;
      this.saveProgressMap(language, map);
      return updated;
    }
    return existing;
  }

  updateConceptMastery(
    conceptId: string,
    language: LanguageCode,
    isCorrect: boolean
  ): GrammarProgress {
    const map = this.getProgressMap(language);
    const existing = this.getProgress(conceptId, language);
    const newScore = calculateNewMasteryScore(existing.masteryScore, isCorrect);
    const updated: GrammarProgress = {
      ...existing,
      masteryScore: newScore,
      status: calculateMasteryStatus(newScore),
      correctCount: existing.correctCount + (isCorrect ? 1 : 0),
      wrongCount: existing.wrongCount + (isCorrect ? 0 : 1),
      practiceCount: existing.practiceCount + 1,
      lastPracticedAt: new Date().toISOString()
    };
    map[conceptId] = updated;
    this.saveProgressMap(language, map);
    return updated;
  }

  // --- BOOKMARKS & SAVED ---

  getSavedConceptIds(): string[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_SAVED);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  toggleSaveConcept(conceptId: string): boolean {
    const saved = this.getSavedConceptIds();
    let next: string[];
    let isSavedNow = false;
    if (saved.includes(conceptId)) {
      next = saved.filter((id) => id !== conceptId);
      isSavedNow = false;
    } else {
      next = [...saved, conceptId];
      isSavedNow = true;
    }
    localStorage.setItem(STORAGE_KEY_SAVED, JSON.stringify(next));
    return isSavedNow;
  }

  isConceptSaved(conceptId: string): boolean {
    return this.getSavedConceptIds().includes(conceptId);
  }
}

export const grammarService = new GrammarService();
