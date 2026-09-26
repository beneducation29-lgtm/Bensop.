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
  durationMinutes: number;
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

  private getPreferredLanguage(): LanguageCode {
    const history = quizSessionStorage.getHistory();
    return history[0]?.categoryId === 'tieng-trung' ? 'zh' : 'en';
  }

  getNextLearningActions(limit = 3, language: LanguageCode = this.getPreferredLanguage()): NextLearningAction[] {
    const actions: NextLearningAction[] = [];
    const add = (action: NextLearningAction) => {
      if (!actions.some((item) => item.path === action.path && item.type === action.type)) actions.push(action);
    };

    const dueReviews = spacedReviewService.getDue();
    dueReviews.slice(0, 2).forEach((next, index) => {
      const path = next.quizSlug ? `/quiz/${next.quizSlug}` : next.lessonSlug ? `/bai-hoc/${next.lessonSlug}` : '/luyen-tap';
      add({
        type: 'review',
        title: index === 0 ? 'Ôn tập đúng lúc' : 'Tiếp tục lượt ôn',
        description: 'Nội dung này đã đến hạn theo lịch Spaced Review của bạn.',
        cta: 'ÔN NGAY',
        path,
        reason: `${dueReviews.length} lượt ôn đang đến hạn.`,
        priority: 'high',
        durationMinutes: next.reviewType === 'quiz' ? 8 : 10,
      });
    });

    const mastery = masteryService.getSnapshot();
    const weakQuestions = mastery.questions.filter((item) => item.mastery < 70).sort((a, b) => a.mastery - b.mastery).slice(0, 2);
    if (weakQuestions.length) {
      add({
        type: 'weakness',
        title: 'Củng cố câu hỏi yếu',
        description: `Bạn có ${weakQuestions.length} câu hỏi dưới ngưỡng mastery 70%. Phiên luyện sẽ tập trung vào các lỗi này.`,
        cta: 'LUYỆN ĐIỂM YẾU',
        path: '/luyen-tap',
        reason: `Câu yếu nhất: “${weakQuestions[0].label}” · mastery ${weakQuestions[0].mastery}%.`,
        priority: 'high',
        durationMinutes: 10,
      });
    }

    const weakTopic = mastery.topics.filter((item) => item.mastery < 80).sort((a, b) => a.mastery - b.mastery)[0];
    if (weakTopic) {
      add({
        type: 'weakness',
        title: 'Củng cố chủ đề',
        description: `Chủ đề “${weakTopic.label}” đang ở mức ${weakTopic.mastery}%. Một phiên luyện ngắn sẽ giúp củng cố kiến thức.`,
        cta: 'MỞ PHÒNG LUYỆN',
        path: '/luyen-tap',
        reason: 'Chủ đề có mastery dưới 80%.',
        priority: 'medium',
        durationMinutes: 12,
      });
    }

    const skills = this.getLearningSkillSnapshot(language);
    const labels: Record<string, string> = {
      vocabulary: 'Tăng vốn từ',
      grammar: 'Củng cố ngữ pháp',
      listening: 'Luyện nghe',
      speaking: 'Luyện nói',
      reading: 'Luyện đọc',
      writing: 'Luyện viết',
    };
    const skillCandidates = skills
      .filter((skill) => skill.total > 0)
      .map((skill) => {
        const coverage = skill.activityCount / skill.total;
        const scoreSignal = skill.activityCount === 0 ? 50 : skill.score;
        return { skill, priorityScore: scoreSignal - coverage * 15 };
      })
      .sort((a, b) => a.priorityScore - b.priorityScore);

    skillCandidates.forEach(({ skill }) => {
      if (actions.length >= limit + 2) return;
      add({
        type: skill.key as LearningActionType,
        title: labels[skill.key] || 'Tiếp tục học',
        description: skill.activityCount === 0
          ? `Bạn chưa có dữ liệu luyện ${skill.label}. Bắt đầu một phiên ngắn để Bensop có thêm tín hiệu cá nhân hóa.`
          : `Bensop đang ưu tiên ${skill.label} dựa trên mastery và mức độ bạn đã luyện.`,
        cta: 'BẮT ĐẦU NGAY',
        path: skill.path,
        reason: `${skill.label}: mastery ${skill.score}% · đã luyện ${skill.activityCount}/${skill.total} nội dung.`,
        priority: skill.activityCount === 0 ? 'medium' : 'normal',
        durationMinutes: skill.key === 'vocabulary' || skill.key === 'grammar' ? 8 : 10,
      });
    });

    if (actions.length < limit) {
      add({
        type: 'quiz',
        title: 'Tiếp tục nhịp học',
        description: 'Duy trì một phiên luyện tập ngắn để Bensop tiếp tục cập nhật hồ sơ học tập.',
        cta: 'LUYỆN TẬP TIẾP',
        path: '/luyen-tap',
        reason: 'Chưa có tín hiệu ưu tiên rõ ràng từ các phòng học.',
        priority: 'normal',
        durationMinutes: 10,
      });
    }
    return actions.slice(0, limit);
  }

  getNextLearningAction(): NextLearningAction {
    return this.getNextLearningActions(1)[0];
  }}

export const recommendationService = new RecommendationService();
