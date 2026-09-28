import { GrammarConcept } from '../types/grammar';
import { LanguageCode } from '../types/vocabulary';
import { grammarService } from './grammarService';
import { quizService } from './quizService';

export interface PrerequisiteNode {
  conceptId: string;
  slug: string;
  title: string;
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
}

export const prerequisiteService = new PrerequisiteService();
