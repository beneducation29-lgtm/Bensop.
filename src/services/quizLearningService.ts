import { QuizResult } from '../types/quiz';
import { masteryService } from './masteryService';
import { spacedReviewService } from './spacedReviewService';

export const quizLearningService = {
  recordResult(result: QuizResult): void {
    masteryService.recordQuizResult(result);

    // Strong recall gets a longer interval; weaker recall returns sooner.
    const intervalDays: 1 | 3 | 7 =
      result.score >= 80 ? 7 :
      result.score >= 60 ? 3 :
      1;

    spacedReviewService.scheduleQuiz(
      result.quizSlug,
      result.quizTitle,
      intervalDays,
      result.completedAt,
      result.categoryId === 'tieng-trung'
        ? 'zh'
        : result.categoryId === 'tieng-anh'
          ? 'en'
          : undefined,
    );
  },
};
