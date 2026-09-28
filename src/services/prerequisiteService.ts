import { GrammarConcept } from '../types/grammar';
import { LanguageCode, VocabularyWord } from '../types/vocabulary';
import { grammarService } from './grammarService';
import { vocabularyService } from './vocabularyService';
import { quizService } from './quizService';

export interface PrerequisiteNode {
  conceptId: string;
  slug: string;
  title: string;
  level: string;
  mastery: number;
  isWeak: boolean;
}

export interface VocabularyPrerequisiteNode {
  wordId: string;
  slug: string;
  word: string;
  level: string;
  mastery: number;
  isWeak: boolean;
}

export interface PrerequisiteRecommendation {
  language: LanguageCode;
  sourceConceptId: string;
  prerequisite: PrerequisiteNode;
  path: string;
  reason: string;
}

export interface VocabularyPrerequisiteRecommendation {
  language: LanguageCode;
  sourceWordId: string;
  prerequisite: VocabularyPrerequisiteNode;
  path: string;
  reason: string;
}

const levelRank: Record<string, number> = {
  'A1': 1, 'A2': 2, 'B1': 3, 'B2': 4, 'C1': 5, 'C2': 6,
  'HSK 1': 1, 'HSK 2': 2, 'HSK 3': 3, 'HSK 4': 4, 'HSK 5': 5, 'HSK 6': 6,
};

class PrerequisiteService {
  getPrerequisites(concept: GrammarConcept, language: LanguageCode): GrammarConcept[] {
    if (concept.language !== language || !concept.relatedConcepts?.length) return [];

    return concept.relatedConcepts
      .map((related) => grammarService.getConceptBySlug(related.slug, language))
      .filter((item): item is GrammarConcept => Boolean(item))
      .filter((item, index, list) => list.findIndex((candidate) => candidate.id === item.id) === index);
  }

  getWeakPrerequisites(concept: GrammarConcept, language: LanguageCode, limit = 3): PrerequisiteNode[] {
    return this.getPrerequisites(concept, language)
      .map((prerequisite) => {
        const progress = grammarService.getProgress(prerequisite.id, language);
        return {
          conceptId: prerequisite.id,
          slug: prerequisite.slug,
          title: prerequisite.title,
          level: prerequisite.level,
          mastery: progress.masteryScore,
          isWeak: progress.masteryScore < 70,
        };
      })
      .filter((item) => item.isWeak)
      .sort((a, b) => {
        const levelDelta = (levelRank[a.level] || 99) - (levelRank[b.level] || 99);
        return a.mastery - b.mastery || levelDelta;
      })
      .slice(0, limit);
  }

  getRecommendation(concept: GrammarConcept, language: LanguageCode): PrerequisiteRecommendation | undefined {
    const prerequisite = this.getWeakPrerequisites(concept, language, 1)[0];
    if (!prerequisite) return undefined;

    const target = grammarService.getConceptById(prerequisite.conceptId);
    if (!target || target.language !== language) return undefined;

    return {
      language,
      sourceConceptId: concept.id,
      prerequisite,
      path: '/quiz/' + quizService.createQuizFromGrammar(target),
      reason: 'Bensop thấy kiến thức nền liên quan này đang yếu hơn, nên lùi một bước trước khi quay lại nội dung hiện tại.',
    };
  }

  getVocabularyPrerequisites(word: VocabularyWord, language: LanguageCode): VocabularyWord[] {
    if (word.language !== language) return [];

    const related = (word.relatedWords || [])
      .map((item) => vocabularyService.getWordBySlug(item.slug, language))
      .filter((item): item is VocabularyWord => Boolean(item));

    const grammarRelated = word.relatedGrammarSlug
      ? grammarService.getConceptBySlug(word.relatedGrammarSlug, language)
      : undefined;

    const grammarWords = grammarRelated?.relatedVocabSlugs
      ?.map((slug) => vocabularyService.getWordBySlug(slug, language))
      .filter((item): item is VocabularyWord => Boolean(item)) || [];

    return [...related, ...grammarWords]
      .filter((item, index, list) => item.id !== word.id && list.findIndex((candidate) => candidate.id === item.id) === index);
  }

  getWeakVocabularyPrerequisites(word: VocabularyWord, language: LanguageCode, limit = 3): VocabularyPrerequisiteNode[] {
    return this.getVocabularyPrerequisites(word, language)
      .map((prerequisite) => {
        const progress = vocabularyService.getProgress(prerequisite.id, language);
        return {
          wordId: prerequisite.id,
          slug: prerequisite.slug,
          word: prerequisite.word,
          level: prerequisite.level,
          mastery: progress.masteryScore,
          isWeak: progress.masteryScore < 70,
        };
      })
      .filter((item) => item.isWeak)
      .sort((a, b) => {
        const levelDelta = (levelRank[a.level] || 99) - (levelRank[b.level] || 99);
        return a.mastery - b.mastery || levelDelta;
      })
      .slice(0, limit);
  }

  getVocabularyRecommendation(word: VocabularyWord, language: LanguageCode): VocabularyPrerequisiteRecommendation | undefined {
    const prerequisite = this.getWeakVocabularyPrerequisites(word, language, 1)[0];
    if (!prerequisite) return undefined;

    const target = vocabularyService.getWordById(prerequisite.wordId);
    if (!target || target.language !== language) return undefined;

    return {
      language,
      sourceWordId: word.id,
      prerequisite,
      path: '/quiz/' + quizService.createQuizFromVocabulary(target),
      reason: 'Bensop thấy một từ nền liên quan đang yếu hơn, nên củng cố từ đó trước khi quay lại từ hiện tại.',
    };
  }
}

export const prerequisiteService = new PrerequisiteService();
