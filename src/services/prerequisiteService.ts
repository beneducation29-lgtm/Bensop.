import { GrammarConcept } from '../types/grammar';
import { LanguageCode, VocabularyWord } from '../types/vocabulary';
import { grammarService } from './grammarService';
import { vocabularyService } from './vocabularyService';
import { quizService } from './quizService';

export type PrerequisiteKind = 'grammar' | 'vocabulary';

export interface PrerequisiteNode {
  kind: 'grammar';
  conceptId: string;
  slug: string;
  title: string;
  level: string;
  mastery: number;
  isWeak: boolean;
  depth: number;
}

export interface VocabularyPrerequisiteNode {
  kind: 'vocabulary';
  wordId: string;
  slug: string;
  word: string;
  level: string;
  mastery: number;
  isWeak: boolean;
  depth: number;
}

export type KnowledgePrerequisiteNode = PrerequisiteNode | VocabularyPrerequisiteNode;

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

export type RecoveryReadiness = 'needs-relearning' | 'recovering' | 'ready-to-return';

export interface RecoveryGate {
  language: LanguageCode;
  kind: PrerequisiteKind;
  entityId: string;
  label: string;
  mastery: number;
  confidence: number;
  evidenceLevel?: string;
  readiness: RecoveryReadiness;
  reason: string;
}

export interface DeepPrerequisiteRecommendation {
  language: LanguageCode;
  sourceId: string;
  sourceKind: PrerequisiteKind;
  prerequisite: KnowledgePrerequisiteNode;
  path: string;
  depth: number;
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
          kind: 'grammar' as const,
          conceptId: prerequisite.id,
          slug: prerequisite.slug,
          title: prerequisite.title,
          level: prerequisite.level,
          mastery: progress.masteryScore,
          isWeak: progress.masteryScore < 70,
          depth: 1,
        };
      })
      .filter((item) => item.isWeak)
      .sort((a, b) => a.mastery - b.mastery || (levelRank[a.level] || 99) - (levelRank[b.level] || 99))
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
          kind: 'vocabulary' as const,
          wordId: prerequisite.id,
          slug: prerequisite.slug,
          word: prerequisite.word,
          level: prerequisite.level,
          mastery: progress.masteryScore,
          isWeak: progress.masteryScore < 70,
          depth: 1,
        };
      })
      .filter((item) => item.isWeak)
      .sort((a, b) => a.mastery - b.mastery || (levelRank[a.level] || 99) - (levelRank[b.level] || 99))
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

  getDeepGrammarPrerequisites(
    concept: GrammarConcept,
    language: LanguageCode,
    maxDepth = 3,
  ): PrerequisiteNode[] {
    const results: PrerequisiteNode[] = [];
    const visited = new Set<string>();

    const walk = (current: GrammarConcept, depth: number) => {
      if (depth > maxDepth || current.language !== language) return;

      for (const prerequisite of this.getPrerequisites(current, language)) {
        if (visited.has(prerequisite.id)) continue;
        visited.add(prerequisite.id);

        const progress = grammarService.getProgress(prerequisite.id, language);
        const node: PrerequisiteNode = {
          kind: 'grammar',
          conceptId: prerequisite.id,
          slug: prerequisite.slug,
          title: prerequisite.title,
          level: prerequisite.level,
          mastery: progress.masteryScore,
          isWeak: progress.masteryScore < 70,
          depth,
        };

        results.push(node);
        walk(prerequisite, depth + 1);
      }
    };

    walk(concept, 1);
    return results;
  }

  getDeepVocabularyPrerequisites(
    word: VocabularyWord,
    language: LanguageCode,
    maxDepth = 3,
  ): VocabularyPrerequisiteNode[] {
    const results: VocabularyPrerequisiteNode[] = [];
    const visited = new Set<string>();

    const walk = (current: VocabularyWord, depth: number) => {
      if (depth > maxDepth || current.language !== language) return;

      for (const prerequisite of this.getVocabularyPrerequisites(current, language)) {
        if (visited.has(prerequisite.id)) continue;
        visited.add(prerequisite.id);

        const progress = vocabularyService.getProgress(prerequisite.id, language);
        const node: VocabularyPrerequisiteNode = {
          kind: 'vocabulary',
          wordId: prerequisite.id,
          slug: prerequisite.slug,
          word: prerequisite.word,
          level: prerequisite.level,
          mastery: progress.masteryScore,
          isWeak: progress.masteryScore < 70,
          depth,
        };

        results.push(node);
        walk(prerequisite, depth + 1);
      }
    };

    walk(word, 1);
    return results;
  }

  getRecoveryReadiness(node: KnowledgePrerequisiteNode, language: LanguageCode): RecoveryGate {
    const mastery = node.mastery;
    const confidence = node.kind === 'grammar'
      ? grammarService.getProgress(node.conceptId, language).masteryScore
      : vocabularyService.getProgress(node.wordId, language).masteryScore;
    const readiness: RecoveryReadiness =
      mastery < 50 ? 'needs-relearning' : mastery < 70 ? 'recovering' : 'ready-to-return';

    return {
      language,
      kind: node.kind,
      entityId: node.kind === 'grammar' ? node.conceptId : node.wordId,
      label: node.kind === 'grammar' ? node.title : node.word,
      mastery,
      confidence,
      evidenceLevel: undefined,
      readiness,
      reason: readiness === 'needs-relearning'
        ? 'Nền tảng vẫn yếu, cần học lại trước khi quay lên kiến thức cấp trên.'
        : readiness === 'recovering'
          ? 'Nền tảng đang phục hồi; cần thêm một lượt kiểm tra ổn định.'
          : 'Nền tảng đã đạt ngưỡng để quay lại kiến thức cấp trên.'
    };
  }

  getDeepRecommendation(
    source: GrammarConcept | VocabularyWord,
    language: LanguageCode,
  ): DeepPrerequisiteRecommendation | undefined {
    if (source.language !== language) return undefined;

    const nodes = 'id' in source && 'slug' in source && 'title' in source
      ? this.getDeepGrammarPrerequisites(source as GrammarConcept, language)
      : this.getDeepVocabularyPrerequisites(source as VocabularyWord, language);

    const weak = nodes
      .filter((node) => node.isWeak)
      .sort((a, b) => a.mastery - b.mastery || a.depth - b.depth)[0];

    if (!weak) return undefined;

    const path = weak.kind === 'grammar'
      ? '/quiz/' + quizService.createQuizFromGrammar(grammarService.getConceptById(weak.conceptId)!)
      : '/quiz/' + quizService.createQuizFromVocabulary(vocabularyService.getWordById(weak.wordId)!);

    return {
      language,
      sourceId: 'id' in source ? source.id : source.id,
      sourceKind: weak.kind,
      prerequisite: weak,
      path,
      depth: weak.depth,
      reason: weak.depth > 1
        ? 'Bensop lần theo nhiều tầng kiến thức và tìm thấy một nền tảng sâu hơn đang yếu.'
        : 'Bensop tìm thấy kiến thức nền liên quan đang yếu.',
    };
  }
}

export const prerequisiteService = new PrerequisiteService();
