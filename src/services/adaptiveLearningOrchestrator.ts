import { LanguageCode } from '../types/vocabulary';
import { spacedReviewService } from './spacedReviewService';
import { masteryService } from './masteryService';
import { rootCauseService } from './rootCauseService';
import { learningStateService, LearningStateDecision } from './learningStateService';
import { quizService } from './quizService';
import { adaptiveSessionMemoryService, AdaptiveMemorySkill } from './adaptiveSessionMemoryService';
import { crossSkillMasteryBalanceService } from './crossSkillMasteryBalanceService';
import { adaptiveSessionGoalService } from './adaptiveSessionGoalService';
import { dailyLearningContinuityService } from './dailyLearningContinuityService';

export type AdaptivePhase =
  | 'review-due'
  | 'recover-foundation'
  | 'return-to-parent'
  | 'verify-parent'
  | 'targeted-practice'
  | 'adaptive-quiz'
  | 'cross-skill'
  | 'continue'
  | 'challenge'
  | 'start'
  | 'session-complete';

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

const SKILL_PATHS: Record<LanguageCode, Record<AdaptiveMemorySkill, string>> = {
  en: {
    vocabulary: '/tieng-anh/vocabulary/practice', grammar: '/tieng-anh/grammar', listening: '/tieng-anh/listening', speaking: '/tieng-anh/speaking', reading: '/tieng-anh/reading', writing: '/tieng-anh/writing', quiz: '/luyen-tap',
  },
  zh: {
    vocabulary: '/tieng-trung/vocabulary/practice', grammar: '/tieng-trung/grammar', listening: '/tieng-trung/listening', speaking: '/tieng-trung/speaking', reading: '/tieng-trung/reading', writing: '/tieng-trung/writing', quiz: '/luyen-tap',
  },
};

const SKILL_LABELS: Record<AdaptiveMemorySkill, string> = {
  vocabulary: 'Từ vựng', grammar: 'Ngữ pháp', listening: 'Listening', speaking: 'Speaking', reading: 'Reading', writing: 'Writing', quiz: 'Quiz',
};

class AdaptiveLearningOrchestrator {
  buildPlan(language: LanguageCode = 'en'): AdaptiveLearningPlan {
    const state = learningStateService.getPriorityDecision(language);
    const due = spacedReviewService.getDue(new Date(), language);
    const rootCause = rootCauseService.getRootCauseRecommendation(language);

    if (due.length) {
      const review = due[0];
      const path = review.quizSlug ? '/quiz/' + review.quizSlug : review.lessonSlug ? '/bai-hoc/' + review.lessonSlug : review.path || '/luyen-tap';
      return { language, phase: 'review-due', state, title: 'Ôn nội dung đã đến hạn', description: review.title || review.quizSlug || review.lessonSlug || 'Spaced Review', reason: 'Có ' + due.length + ' nội dung đến hạn. Bensop kiểm tra khả năng nhớ trước khi mở rộng kiến thức mới.', path, durationMinutes: review.reviewType === 'quiz' ? 8 : 10, sourceQuestionId: state.source?.entityType === 'question' ? state.source.entityId : undefined };
    }

    if (rootCause && (state.state === 'recovering' || state.state === 'weak' || state.state === 'developing')) {
      const isReturn = rootCause.title.startsWith('Đã phục hồi');
      return { language, phase: isReturn ? 'return-to-parent' : 'recover-foundation', state, title: rootCause.title, description: rootCause.description, reason: rootCause.reason, path: rootCause.path, durationMinutes: 7, sourceQuestionId: rootCause.sourceQuestionId };
    }

    if (state.recommendedAction === 'recovery') {
      return { language, phase: 'recover-foundation', state, title: 'Phục hồi kiến thức nền', description: state.reason, reason: 'Trạng thái hiện tại yêu cầu phục hồi trước khi quay lại kiến thức cấp trên.', path: '/ngan-hang-cau-hoi?focus=weak&lang=' + language, durationMinutes: 7, sourceQuestionId: state.source?.entityType === 'question' ? state.source.entityId : undefined };
    }

    if (state.recommendedAction === 'spaced-review') {
      return { language, phase: 'review-due', state, title: 'Kiểm tra lại kiến thức có nguy cơ quên', description: state.reason, reason: 'Ưu tiên truy hồi trước khi học thêm để phân biệt quên thật với mastery chưa ổn định.', path: '/ngan-hang-cau-hoi?focus=weak&lang=' + language, durationMinutes: 6 };
    }

    if (state.recommendedAction === 'targeted-practice') {
      const weak = masteryService.getWeakQuestions(1, language)[0];
      return { language, phase: 'targeted-practice', state, title: 'Luyện đúng điểm yếu', description: weak?.label || state.reason, reason: state.reason, path: '/ngan-hang-cau-hoi?focus=weak&lang=' + language, durationMinutes: 8, sourceQuestionId: weak?.entityId };
    }

    const goalProgress = adaptiveSessionGoalService.getProgress(language);
    const continuity = dailyLearningContinuityService.syncProgress(goalProgress);
    if (goalProgress.status === 'completed') {
      return {
        language,
        phase: 'session-complete',
        state,
        title: 'Hoàn thành phiên học',
        description: goalProgress.label,
        reason: goalProgress.reason,
        path: language === 'zh' ? '/tieng-trung' : '/tieng-anh',
        sourceQuestionId: continuity.recentActivities[0],
        durationMinutes: 0,
      };
    }

    const continuityFocus = continuity.today.completedSteps > 0
      ? continuity.nextFocus
      : '';
    const balance = crossSkillMasteryBalanceService.getDecision(language);
    if ((state.recommendedAction === 'challenge' || state.recommendedAction === 'continue') && balance.shouldSwitch && balance.skill) {
      return this.buildBalancedSkillPlan(language, state, balance.skill, continuityFocus ? continuityFocus + ' ' + balance.reason : balance.reason);
    }

    if (state.recommendedAction === 'challenge') {
      const rotation = adaptiveSessionMemoryService.getCrossSkillDecision(language);
      if (rotation.shouldSwitch && rotation.suggestedSkill) return this.buildCrossSkillPlan(language, state, rotation.suggestedSkill, rotation.reason);
      return { language, phase: 'challenge', state, title: 'Mở rộng kiến thức', description: 'Mastery và evidence đã ổn định; chuyển sang nội dung khó hơn để kiểm tra khả năng áp dụng.', reason: state.reason, path: language === 'zh' ? '/tieng-trung' : '/tieng-anh', durationMinutes: 10 };
    }

    if (state.recommendedAction === 'continue') {
      const rotation = adaptiveSessionMemoryService.getCrossSkillDecision(language);
      if (rotation.shouldSwitch && rotation.suggestedSkill) return this.buildCrossSkillPlan(language, state, rotation.suggestedSkill, rotation.reason);
      const weak = masteryService.getWeakQuestions(1, language)[0];
      if (weak) {
        const slug = quizService.createAdaptiveQuiz(language, 10);
        return { language, phase: 'adaptive-quiz', state, title: 'Adaptive Quiz · kiểm tra tiếp', description: 'Kiểm tra lại các điểm chưa đủ evidence trước khi mở rộng.', reason: state.reason, path: '/quiz/' + slug, durationMinutes: 8, sourceQuestionId: weak.entityId };
      }
    }

    return { language, phase: 'start', state, title: 'Khởi động phiên học', description: 'Một lượt luyện ngắn để tạo evidence cho hồ sơ học tập.', reason: 'Chưa có tín hiệu đủ mạnh để cá nhân hóa sâu hơn.', path: '/luyen-tap', durationMinutes: 10 };
  }

  private buildBalancedSkillPlan(language: LanguageCode, state: LearningStateDecision, skill: AdaptiveMemorySkill, reason: string): AdaptiveLearningPlan {
    return {
      language,
      phase: 'cross-skill',
      state,
      title: 'Cân bằng kỹ năng · ' + SKILL_LABELS[skill],
      description: 'Bensop ưu tiên kỹ năng đang thiếu evidence hoặc có mastery thấp hơn để hồ sơ học tập cân bằng hơn.',
      reason,
      path: SKILL_PATHS[language][skill],
      durationMinutes: skill === 'vocabulary' || skill === 'grammar' ? 6 : 8,
    };
  }

  private buildCrossSkillPlan(language: LanguageCode, state: LearningStateDecision, skill: AdaptiveMemorySkill, reason: string): AdaptiveLearningPlan {
    return { language, phase: 'cross-skill', state, title: 'Đổi kỹ năng · ' + SKILL_LABELS[skill], description: 'Chuyển sang một kỹ năng khác để tạo thêm evidence mà không lặp lại cùng một dạng hoạt động.', reason, path: SKILL_PATHS[language][skill], durationMinutes: skill === 'vocabulary' || skill === 'grammar' ? 6 : 8 };
  }
}

export const adaptiveLearningOrchestrator = new AdaptiveLearningOrchestrator();
