import { LanguageCode } from '../types/vocabulary';
import { learnerProfileService } from './learnerProfileService';
import { spacedReviewService } from './spacedReviewService';
import { masteryService } from './masteryService';
import { recommendationService, LearningActionType } from './recommendationService';
import { LearnerActivitySkill } from './learnerActivityService';

export interface AdaptiveSessionItem {
  id: string;
  type: LearningActionType;
  skill: string;
  skillKey: LearnerActivitySkill | 'lesson';
  language: LanguageCode;
  title: string;
  description: string;
  path: string;
  durationMinutes: number;
  reason: string;
}

export interface AdaptiveSession {
  language: LanguageCode;
  totalMinutes: number;
  generatedAt: string;
  items: AdaptiveSessionItem[];
  summary: string;
}

const SKILL_LABELS: Record<string, string> = {
  vocabulary: 'Từ vựng',
  grammar: 'Ngữ pháp',
  listening: 'Listening',
  speaking: 'Speaking',
  reading: 'Reading',
  writing: 'Writing',
};

const SKILL_PATHS: Record<LanguageCode, Record<string, string>> = {
  en: {
    vocabulary: '/tieng-anh/vocabulary/practice',
    grammar: '/tieng-anh/grammar',
    listening: '/tieng-anh/listening',
    speaking: '/tieng-anh/speaking',
    reading: '/tieng-anh/reading',
    writing: '/tieng-anh/writing',
  },
  zh: {
    vocabulary: '/tieng-trung/vocabulary/practice',
    grammar: '/tieng-trung/grammar',
    listening: '/tieng-trung/listening',
    speaking: '/tieng-trung/speaking',
    reading: '/tieng-trung/reading',
    writing: '/tieng-trung/writing',
  },
};

class AdaptiveSessionService {
  buildSession(language: LanguageCode = 'en'): AdaptiveSession {
    const profile = learnerProfileService.getSnapshot(language);
    const mastery = masteryService.getSnapshot();
    const due = spacedReviewService.getDue();
    const candidates = recommendationService.getNextLearningActions(8, language);
    const items: AdaptiveSessionItem[] = [];
    const used = new Set<string>();

    const add = (item: Omit<AdaptiveSessionItem, 'id'>) => {
      const key = item.path + ':' + item.type;
      if (used.has(key) || items.length >= 5) return;
      used.add(key);
      items.push({ ...item, id: 'adaptive-' + item.type + '-' + item.path.replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '') });
    };

    if (due.length) {
      const review = due[0];
      const path = review.quizSlug ? '/quiz/' + review.quizSlug : review.lessonSlug ? '/bai-hoc/' + review.lessonSlug : '/luyen-tap';
      add({
        type: 'review',
        skill: review.reviewType === 'quiz' ? 'quiz' : 'lesson',
        skillKey: review.reviewType === 'quiz' ? 'quiz' : 'lesson',
        language,
        title: 'Ôn lượt đến hạn',
        description: 'Bắt đầu bằng nội dung đã đến hạn để tận dụng Spaced Review.',
        path,
        durationMinutes: review.reviewType === 'quiz' ? 8 : 10,
        reason: due.length + ' lượt ôn đang đến hạn.',
      });
    }

    const weakQuestion = mastery.questions.filter(q => q.mastery < 70).sort((a, b) => a.mastery - b.mastery)[0];
    if (weakQuestion) {
      add({
        type: 'weakness',
        skill: 'quiz',
        skillKey: 'quiz',
        language,
        title: 'Sửa lỗi câu hỏi yếu',
        description: 'Luyện lại các dạng câu hỏi có mastery thấp trước khi chuyển sang nội dung mới.',
        path: '/luyen-tap',
        durationMinutes: 8,
        reason: 'Câu yếu nhất: ' + weakQuestion.label + ' · mastery ' + weakQuestion.mastery + '%.',
      });
    }

    const ranked = [...profile.skills]
      .filter(s => s.total > 0)
      .sort((a, b) => {
        const signal = (s: typeof a) => s.score - (s.coverage * 15) - (s.momentum * 0.8) - Math.min(10, s.evidenceCount / 3) * 0.5;
        return signal(a) - signal(b);
      });

    ranked.slice(0, 4).forEach(skill => {
      const path = SKILL_PATHS[language][skill.key] || skill.path;
      add({
        type: skill.key as LearningActionType,
        skill: SKILL_LABELS[skill.key] || skill.label,
        skillKey: skill.key,
        language,
        title: skill.momentum < 0 ? 'Ổn định lại ' + (SKILL_LABELS[skill.key] || skill.label) : 'Củng cố ' + (SKILL_LABELS[skill.key] || skill.label),
        description: skill.activityCount === 0
          ? 'Kỹ năng này chưa có đủ evidence. Một bài ngắn sẽ giúp Bensop hiểu bạn tốt hơn.'
          : 'Phiên ngắn được chọn từ mastery, mức độ luyện và xu hướng gần đây.',
        path,
        durationMinutes: skill.key === 'vocabulary' || skill.key === 'grammar' ? 6 : 8,
        reason: skill.trend === 'down'
          ? (SKILL_LABELS[skill.key] || skill.label) + ' đang giảm gần đây (momentum ' + skill.momentum + ').'
          : (SKILL_LABELS[skill.key] || skill.label) + ' có tín hiệu cần củng cố · mastery ' + skill.score + '%.',
      });
    });

    candidates.forEach(action => {
      if (items.length >= 5) return;
      const actionSkill = action.type === 'review' || action.type === 'weakness' || action.type === 'quiz'
        ? 'quiz'
        : action.type as LearnerActivitySkill;
      add({
        type: action.type,
        skill: SKILL_LABELS[action.type] || action.type,
        skillKey: actionSkill,
        language,
        title: action.title,
        description: action.description,
        path: action.path,
        durationMinutes: action.durationMinutes,
        reason: action.reason,
      });
    });

    if (!items.length) {
      add({
        type: 'quiz',
        skill: 'Quiz',
        skillKey: 'quiz',
        language,
        title: 'Khởi động phiên học',
        description: 'Làm một phiên luyện ngắn để tạo evidence đầu tiên cho hồ sơ học tập.',
        path: '/luyen-tap',
        durationMinutes: 10,
        reason: 'Chưa có đủ dữ liệu cá nhân hóa.',
      });
    }

    const capped = items.slice(0, 4);
    const total = capped.reduce((sum, item) => sum + item.durationMinutes, 0);
    return {
      language,
      totalMinutes: total,
      generatedAt: new Date().toISOString(),
      items: capped,
      summary: total + ' phút · ' + (due.length ? 'ưu tiên lượt ôn đến hạn' : 'ưu tiên điểm cần củng cố') + '.',
    };
  }
}

export const adaptiveSessionService = new AdaptiveSessionService();
