import { LanguageCode } from '../types/vocabulary';
import { DailyLearningSession } from '../types/learningProgress';
import { vocabularyService } from './vocabularyService';
import { grammarService } from './grammarService';
import { masteryService } from './masteryService';
import { spacedReviewService } from './spacedReviewService';
import { quizSessionStorage } from './quizSessionStorage';

export type LearningActionType =
  | 'review'
  | 'weakness'
  | 'lesson'
  | 'vocabulary'
  | 'grammar'
  | 'listening'
  | 'speaking'
  | 'reading'
  | 'writing'
  | 'quiz';

export interface NextLearningAction {
  type: LearningActionType;
  title: string;
  description: string;
  cta: string;
  path: string;
  reason: string;
  priority: 'high' | 'medium' | 'normal';
}

class RecommendationService {
  getDailyLearningSession(language: LanguageCode): DailyLearningSession {
    const allWords = vocabularyService.getAllWords(language);
    const allConcepts = grammarService.getAllConcepts(language);

    const todayStr = new Date().toISOString().split('T')[0];
    const daySeed = new Date().getDate();

    const wordStartIndex = (daySeed * 3) % Math.max(1, allWords.length - 6);
    const conceptIndex = daySeed % Math.max(1, allConcepts.length);

    const selectedWords = allWords.slice(wordStartIndex, wordStartIndex + 5);
    const selectedConcept = allConcepts[conceptIndex] || allConcepts[0];

    return {
      date: todayStr,
      newWords: selectedWords,
      grammarConcept: selectedConcept,
      practiceQuestionCount: 10,
      reviewWordCount: 8,
      isCompleted: false
    };
  }

  getPersonalizedRecommendations(language: LanguageCode) {
    const allWords = vocabularyService.getAllWords(language);
    const allConcepts = grammarService.getAllConcepts(language);

    return {
      suggestedWords: allWords.slice(0, 4),
      suggestedConcept: allConcepts[0],
      suggestedQuizSlug: language === 'en' ? 'phrasal-verbs-cong-so' : 'hsk-phan-xa-tu-vung-thanh-dieu',
      weakTopicSuggestion: language === 'en' ? 'Verb Tenses & Inversion' : '把字句与被字句'
    };
  }

  getNextLearningAction(): NextLearningAction {
    const dueReviews = spacedReviewService.getDue();
    if (dueReviews.length > 0) {
      const next = dueReviews[0];
      const path = next.quizSlug
        ? `/quiz/${next.quizSlug}`
        : next.lessonSlug
          ? `/bai-hoc/${next.lessonSlug}`
          : '/luyen-tap';

      return {
        type: 'review',
        title: 'Ôn tập đúng lúc',
        description: 'Bạn đang có nội dung đến hạn. Hoàn thành lượt ôn này trước khi mở nội dung mới.',
        cta: 'ÔN NGAY',
        path,
        reason: `Có ${dueReviews.length} lượt Spaced Review đang đến hạn.`,
        priority: 'high',
      };
    }

    const mastery = masteryService.getSnapshot();
    const weakQuestion = mastery.questions
      .filter((item) => item.mastery < 70)
      .sort((a, b) => a.mastery - b.mastery)[0];

    if (weakQuestion) {
      const reviewSlug = `quiz-review-${weakQuestion.entityId}`;
      return {
        type: 'weakness',
        title: 'Củng cố điểm yếu',
        description: `Câu hỏi “${weakQuestion.label}” đang có mastery ${weakQuestion.mastery}%. Hãy luyện lại để củng cố phản xạ.`,
        cta: 'LUYỆN ĐIỂM YẾU',
        path: '/luyen-tap',
        reason: `Mastery câu hỏi thấp hơn ngưỡng 70%.`,
        priority: 'high',
      };
    }

    const weakTopic = mastery.topics
      .filter((item) => item.mastery < 80)
      .sort((a, b) => a.mastery - b.mastery)[0];

    if (weakTopic) {
      return {
        type: 'weakness',
        title: 'Củng cố chủ đề',
        description: `Chủ đề “${weakTopic.label}” đang ở mức ${weakTopic.mastery}%. Một phiên luyện tập ngắn sẽ giúp củng cố kiến thức.`,
        cta: 'MỞ PHÒNG LUYỆN',
        path: '/luyen-tap',
        reason: 'Chủ đề có mastery dưới 80%.',
        priority: 'medium',
      };
    }

    const history = quizSessionStorage.getHistory();
    if (history.length === 0) {
      return {
        type: 'lesson',
        title: 'Bắt đầu bằng một bài học',
        description: 'Chưa có đủ dữ liệu học tập. Hãy hoàn thành một bài học hoặc quiz để Bensop bắt đầu cá nhân hóa lộ trình.',
        cta: 'KHÁM PHÁ BÀI HỌC',
        path: '/tieng-anh',
        reason: 'Chưa có lịch sử quiz để cá nhân hóa.',
        priority: 'normal',
      };
    }

    const lastCategory = history[0]?.categoryId;
    const languagePath = lastCategory === 'tieng-trung' ? '/tieng-trung' : '/tieng-anh';
    return {
      type: 'quiz',
      title: 'Tiếp tục nhịp học',
      description: 'Không có lượt ôn đến hạn hoặc điểm yếu nổi bật. Hãy duy trì nhịp học bằng một phiên luyện tập ngắn.',
      cta: 'LUYỆN TẬP TIẾP',
      path: '/luyen-tap',
      reason: `Phiên gần nhất thuộc ${lastCategory === 'tieng-trung' ? 'Tiếng Trung' : 'Tiếng Anh'}; tiếp tục cùng nhóm nội dung.`,
      priority: 'normal',
    };
  }
}

export const recommendationService = new RecommendationService();
