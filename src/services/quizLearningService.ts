import { QuizResult } from '../types/quiz';
import { masteryService } from './masteryService';
import { spacedReviewService } from './spacedReviewService';

export const quizLearningService = {
  recordResult(result: QuizResult): void {
    masteryService.recordQuizResult(result);

    const language = result.categoryId === 'tieng-trung'
      ? 'zh'
      : result.categoryId === 'tieng-anh'
        ? 'en'
        : undefined;

    const questionMastery = language
      ? masteryService.getSnapshot(language).questions
      : [];
    const attemptedMastery = result.questionBreakdowns
      .map((item) => questionMastery.find((record) => record.entityId === item.questionId)?.mastery)
      .filter((value): value is number => typeof value === 'number');
    const averageQuestionMastery = attemptedMastery.length
      ? Math.round(attemptedMastery.reduce((sum, value) => sum + value, 0) / attemptedMastery.length)
      : result.score;

    const reviewQuality: 'again' | 'hard' | 'good' | 'easy' =
      result.score < 50 || averageQuestionMastery < 50
        ? 'again'
        : result.score < 70 || averageQuestionMastery < 70
          ? 'hard'
          : result.score >= 85 && averageQuestionMastery >= 80
            ? 'easy'
            : 'good';

    const intervalDays: 1 | 3 | 7 =
      reviewQuality === 'again'
        ? 1
        : reviewQuality === 'hard'
          ? 3
          : reviewQuality === 'easy'
            ? 7
            : 3;

    spacedReviewService.scheduleQuiz(
      result.quizSlug,
      result.quizTitle,
      intervalDays,
      result.completedAt,
      language,
      reviewQuality,
    );
  },
};
