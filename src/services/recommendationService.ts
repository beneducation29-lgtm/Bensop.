import { LanguageCode } from '../types/vocabulary';
import { DailyLearningSession } from '../types/learningProgress';
import { vocabularyService } from './vocabularyService';
import { grammarService } from './grammarService';
import { masteryService } from './masteryService';
import { spacedReviewService } from './spacedReviewService';
import { quizSessionStorage } from './quizSessionStorage';
import { listeningService } from './listeningService';
import { speakingService } from './speakingService';
import { readingService } from './readingService';
import { writingService } from './writingService';

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

  getLearningSkillSnapshot(language: LanguageCode = 'en') {
    const vocab = vocabularyService.getAllProgress(language);
    const grammar = grammarService.getAllProgress(language);
    const listening = listeningService.getProgressList().filter((item) => item.language === language);
    const speaking = speakingService.getProgressList().filter((item) => item.language === language);
    const reading = readingService.getProgress().filter((item) => item.language === language);
    const writingCount = writingService.getAll(language).length;

    const average = (values: number[]) =>
      values.length ? Math.round(values.reduce((sum, value) => sum + value, 0) / values.length) : 0;

    return [
      {
        key: 'vocabulary',
        label: 'Vocabulary',
        score: average(Object.values(vocab).map((item) => item.masteryScore)),
        activityCount: Object.keys(vocab).length,
        total: vocabularyService.getAllWords(language).length,
        path: `/tieng-${language === 'en' ? 'anh' : 'trung'}/vocabulary/practice`,
      },
      {
        key: 'grammar',
        label: 'Grammar',
        score: average(Object.values(grammar).map((item) => item.masteryScore)),
        activityCount: Object.keys(grammar).length,
        total: grammarService.getAllConcepts(language).length,
        path: `/tieng-${language === 'en' ? 'anh' : 'trung'}/grammar/review`,
      },
      {
        key: 'listening',
        label: 'Listening',
        score: average(listening.map((item) => item.accuracy)),
        activityCount: listening.length,
        total: listeningService.getAllLessons(language).length,
        path: `/tieng-${language === 'en' ? 'anh' : 'trung'}/listening`,
      },
      {
        key: 'speaking',
        label: 'Speaking',
        score: average(speaking.map((item) => item.bestScore)),
        activityCount: speaking.length,
        total: speakingService.getAllActivities(language).length,
        path: `/tieng-${language === 'en' ? 'anh' : 'trung'}/speaking`,
      },
      {
        key: 'reading',
        label: 'Reading',
        score: average(reading.map((item) => item.bestScore)),
        activityCount: reading.length,
        total: readingService.getAll(language).length,
        path: `/tieng-${language === 'en' ? 'anh' : 'trung'}/reading`,
      },
      {
        key: 'writing',
        label: 'Writing',
        score: 0,
        activityCount: 0,
        total: writingCount,
        path: `/tieng-${language === 'en' ? 'anh' : 'trung'}/writing`,
      },
    ];
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
      return {
        type: 'weakness',
        title: 'Củng cố điểm yếu',
        description: `Câu hỏi “${weakQuestion.label}” đang có mastery ${weakQuestion.mastery}%. Hãy luyện lại để củng cố phản xạ.`,
        cta: 'LUYỆN ĐIỂM YẾU',
        path: '/luyen-tap',
        reason: 'Mastery câu hỏi thấp hơn ngưỡng 70%.',
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
    const lastCategory = history[0]?.categoryId;
    const language: LanguageCode = lastCategory === 'tieng-trung' ? 'zh' : 'en';
    const skills = this.getLearningSkillSnapshot(language);

    const nextSkill = skills
      .slice()
      .sort((a, b) => {
        const aCoverage = a.total ? a.activityCount / a.total : 0;
        const bCoverage = b.total ? b.activityCount / b.total : 0;
        return (a.score - aCoverage * 15) - (b.score - bCoverage * 15);
      })[0];

    if (nextSkill && nextSkill.total > 0) {
      const labels: Record<string, string> = {
        vocabulary: 'Tăng vốn từ',
        grammar: 'Củng cố ngữ pháp',
        listening: 'Luyện nghe',
        speaking: 'Luyện nói',
        reading: 'Luyện đọc',
        writing: 'Luyện viết',
      };

      return {
        type: nextSkill.key as LearningActionType,
        title: labels[nextSkill.key] || 'Tiếp tục học',
        description: `Bensop đang ưu tiên ${nextSkill.label} vì đây là kỹ năng có dữ liệu luyện tập thấp nhất trong hồ sơ hiện tại.`,
        cta: 'BẮT ĐẦU NGAY',
        path: nextSkill.path,
        reason: `${nextSkill.label}: mastery ${nextSkill.score}% · đã luyện ${nextSkill.activityCount}/${nextSkill.total} nội dung.`,
        priority: 'normal',
      };
    }

    return {
      type: 'quiz',
      title: 'Tiếp tục nhịp học',
      description: 'Duy trì một phiên luyện tập ngắn để Bensop tiếp tục cập nhật hồ sơ học tập của bạn.',
      cta: 'LUYỆN TẬP TIẾP',
      path: '/luyen-tap',
      reason: 'Chưa có tín hiệu ưu tiên rõ ràng từ các phòng học.',
      priority: 'normal',
    };
  }}

export const recommendationService = new RecommendationService();
