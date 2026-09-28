import { LanguageCode } from '../types/vocabulary';
import { Question } from '../types/quiz';
import { QUESTIONS_BANK } from '../data/questions';
import { vocabularyService } from './vocabularyService';
import { grammarService } from './grammarService';
import { quizService } from './quizService';
import { masteryService } from './masteryService';
import { prerequisiteService } from './prerequisiteService';

export interface RootCauseRecommendation {
  language: LanguageCode;
  kind: 'vocabulary' | 'grammar' | 'quiz';
  title: string;
  description: string;
  path: string;
  reason: string;
  sourceQuestionId: string;
}

class RootCauseService {
  private findQuestion(language: LanguageCode): Question | undefined {
    const persistent = masteryService.getPersistentWeaknesses(5, language);
    const weak = masteryService.getWeakQuestions(8, language);
    const ids = [...persistent, ...weak].map((item) => item.entityId);
    return ids.map((id) => QUESTIONS_BANK.find((q) => q.id === id)).find((q): q is Question => Boolean(q));
  }

  private getGrammarRecommendation(
    concept: ReturnType<typeof grammarService.getAllConcepts>[number],
    language: LanguageCode,
    sourceQuestionId: string,
  ): RootCauseRecommendation {
    const prerequisite = prerequisiteService.getRecommendation(concept, language);
    if (prerequisite) {
      return {
        language,
        kind: 'grammar',
        title: 'Lùi một bước · củng cố kiến thức nền',
        description: prerequisite.prerequisite.title,
        path: prerequisite.path,
        reason: prerequisite.reason,
        sourceQuestionId,
      };
    }

    return {
      language,
      kind: 'grammar',
      title: 'Củng cố nền tảng ngữ pháp',
      description: concept.title,
      path: '/quiz/' + quizService.createQuizFromGrammar(concept),
      reason: 'Lỗi lặp lại có liên quan đến cấu trúc ngữ pháp nền này.',
      sourceQuestionId,
    };
  }

  getRootCauseRecommendation(language: LanguageCode): RootCauseRecommendation | undefined {
    const question = this.findQuestion(language);
    if (!question) return undefined;

    const vocabulary = vocabularyService.getAllWords(language).filter((word) =>
      word.questionIds?.includes(question.id) ||
      word.topicId === question.topicId ||
      word.tags.some((tag) => question.tags.some((qTag) => qTag.toLowerCase() === tag.toLowerCase()))
    );

    const grammar = grammarService.getAllConcepts(language).filter((concept) =>
      concept.questionIds?.includes(question.id) ||
      concept.topic === question.topicId ||
      concept.tags.some((tag) => question.tags.some((qTag) => qTag.toLowerCase() === tag.toLowerCase()))
    );

    if (question.skill === 'Grammar' && grammar.length) {
      return this.getGrammarRecommendation(grammar[0], language, question.id);
    }

    if (question.skill === 'Vocabulary' && vocabulary.length) {
      const word = vocabulary[0];
      return {
        language, kind: 'vocabulary', title: 'Củng cố từ vựng nền', description: word.word + ' · ' + word.meaning,
        path: '/quiz/' + quizService.createQuizFromVocabulary(word),
        reason: 'Lỗi lặp lại có thể bắt nguồn từ vốn từ hoặc ngữ cảnh sử dụng.', sourceQuestionId: question.id,
      };
    }

    if (grammar.length) {
      return this.getGrammarRecommendation(grammar[0], language, question.id);
    }

    if (vocabulary.length) {
      const word = vocabulary[0];
      return {
        language, kind: 'vocabulary', title: 'Củng cố từ vựng nền', description: word.word + ' · ' + word.meaning,
        path: '/quiz/' + quizService.createQuizFromVocabulary(word),
        reason: 'Bensop tìm thấy từ vựng liên quan trực tiếp đến dạng lỗi.', sourceQuestionId: question.id,
      };
    }

    return undefined;
  }
}

export const rootCauseService = new RootCauseService();
