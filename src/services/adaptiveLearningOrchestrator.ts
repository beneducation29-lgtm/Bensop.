import { LanguageCode } from '../types/vocabulary';
import { spacedReviewService } from './spacedReviewService';
import { masteryService } from './masteryService';
import { rootCauseService } from './rootCauseService';
import { learningStateService, LearningStateDecision } from './learningStateService';
import { quizService } from './quizService';

export type AdaptivePhase =
  | 'review-due'
  | 'recover-foundation'
  | 'return-to-parent'
  | 'verify-parent'
  | 'targeted-practice'
  | 'adaptive-quiz'
  | 'continue'
  | 'challenge'
  | 'start';

export interface AdaptiveLearningPlan {
  language: LanguageCode;
  phase: AdaptivePhase;
  state: LearningStateDecision;
  title: string;
  description: string;
  reason: string;
  path: string;
  durationMinutes: number;
  sourceQuestionId?: string;
}

class AdaptiveLearningOrchestrator {
  buildPlan(language: LanguageCode = 'en'): AdaptiveLearningPlan {
    const state = learningStateService.getPriorityDecision(language);
    const due = spacedReviewService.getDue(new Date(), language);
    const rootCause = rootCauseService.getRootCauseRecommendation(language);

    if (due.length) {
      const review = due[0];
      const path = review.quizSlug
        ? '/quiz/' + review.quizSlug
        : review.lessonSlug
          ? '/bai-hoc/' + review.lessonSlug
          : review.path || '/luyen-tap';

      return {
        language,
        phase: 'review-due',
        state,
        title: 'Ôn nội dung đã đến hạn',
        description: review.title || review.quizSlug || review.lessonSlug || 'Spaced Review',
        reason: 'Có ' + due.length + ' nội dung đến hạn. Bensop kiểm tra khả năng nhớ trước khi mở rộng kiến thức mới.',
        path,
        durationMinutes: review.reviewType === 'quiz' ? 8 : 10,
        sourceQuestionId: state.source?.entityType === 'question' ? state.source.entityId : undefined,
      };
    }

    if (rootCause && (state.state === 'recovering' || state.state === 'weak' || state.state === 'developing')) {
      const isReturn = rootCause.title.startsWith('Đã phục hồi');
      return {
        language,
        phase: isReturn ? 'return-to-parent' : 'recover-foundation',
        state,
        title: rootCause.title,
        description: rootCause.description,
        reason: rootCause.reason,
        path: rootCause.path,
        durationMinutes: 7,
        sourceQuestionId: rootCause.sourceQuestionId,
      };
    }

    if (state.recommendedAction === 'recovery') {
      return {
        language,
        phase: 'recover-foundation',
        state,
        title: 'Phục hồi kiến thức nền',
        description: state.reason,
        reason: 'Trạng thái hiện tại yêu cầu phục hồi trước khi quay lại kiến thức cấp trên.',
        path: '/ngan-hang-cau-hoi?focus=weak&lang=' + language,
        durationMinutes: 7,
        sourceQuestionId: state.source?.entityType === 'question' ? state.source.entityId : undefined,
      };
    }

    if (state.recommendedAction === 'spaced-review') {
      return {
        language,
        phase: 'review-due',
        state,
        title: 'Kiểm tra lại kiến thức có nguy cơ quên',
        description: state.reason,
        reason: 'Ưu tiên truy hồi trước khi học thêm để phân biệt quên thật với mastery chưa ổn định.',
        path: '/ngan-hang-cau-hoi?focus=weak&lang=' + language,
        durationMinutes: 6,
      };
    }

    if (state.recommendedAction === 'targeted-practice') {
      const weak = masteryService.getWeakQuestions(1, language)[0];
      return {
        language,
        phase: 'targeted-practice',
        state,
        title: 'Luyện đúng điểm yếu',
        description: weak?.label || state.reason,
        reason: state.reason,
        path: '/ngan-hang-cau-hoi?focus=weak&lang=' + language,
        durationMinutes: 8,
        sourceQuestionId: weak?.entityId,
      };
    }

    if (state.recommendedAction === 'challenge') {
      return {
        language,
        phase: 'challenge',
        state,
        title: 'Mở rộng kiến thức',
        description: 'Mastery và evidence đã ổn định; chuyển sang nội dung khó hơn để kiểm tra khả năng áp dụng.',
        reason: state.reason,
        path: language === 'zh' ? '/tieng-trung' : '/tieng-anh',
        durationMinutes: 10,
      };
    }

    if (state.recommendedAction === 'continue') {
      const weak = masteryService.getWeakQuestions(1, language)[0];
      if (weak) {
        const slug = quizService.createAdaptiveQuiz(language, 10);
        return {
          language,
          phase: 'adaptive-quiz',
          state,
          title: 'Adaptive Quiz · kiểm tra tiếp',
          description: 'Kiểm tra lại các điểm chưa đủ evidence trước khi mở rộng.',
          reason: state.reason,
          path: '/quiz/' + slug,
          durationMinutes: 8,
          sourceQuestionId: weak.entityId,
        };
      }
    }

    return {
      language,
      phase: 'start',
      state,
      title: 'Khởi động phiên học',
      description: 'Một lượt luyện ngắn để tạo evidence cho hồ sơ học tập.',
      reason: 'Chưa có tín hiệu đủ mạnh để cá nhân hóa sâu hơn.',
      path: '/luyen-tap',
      durationMinutes: 10,
    };
  }
}

export const adaptiveLearningOrchestrator = new AdaptiveLearningOrchestrator();
