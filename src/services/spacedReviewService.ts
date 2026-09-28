import { SpacedReviewItem } from '../types/content';
import { LanguageCode } from '../types/vocabulary';

const KEY = 'bensop_spaced_review';

const read = (): SpacedReviewItem[] => {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]') as SpacedReviewItem[];
  } catch {
    return [];
  }
};

const write = (items: SpacedReviewItem[]) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(items));
  } catch {
    // Review scheduling is an enhancement; learning remains usable without storage.
  }
};

const addDays = (iso: string, days: number) => {
  const date = new Date(iso);
  date.setDate(date.getDate() + days);
  return date.toISOString();
};

export const spacedReviewService = {
  getAll(): SpacedReviewItem[] {
    return read().sort((a, b) => a.dueAt.localeCompare(b.dueAt));
  },

  getForLesson(lessonSlug: string, language?: LanguageCode): SpacedReviewItem[] {
    return this.getAll().filter(
      (item) => item.lessonSlug === lessonSlug && (!language || item.language === language),
    );
  },

  getForQuiz(quizSlug: string, language?: LanguageCode): SpacedReviewItem[] {
    return this.getAll().filter(
      (item) => item.quizSlug === quizSlug && (!language || item.language === language),
    );
  },

  scheduleLesson(
    lessonSlug: string,
    completedAt = new Date().toISOString(),
    language?: LanguageCode,
  ): SpacedReviewItem[] {
    const existing = read().filter((item) => item.lessonSlug !== lessonSlug || (language && item.language !== language));
    const intervals: Array<1 | 3 | 7> = [1, 3, 7];
    const items = intervals.map((intervalDays) => ({
      id: `review-lesson-${language || 'unknown'}-${lessonSlug}-${intervalDays}`,
      lessonSlug,
      reviewType: 'lesson' as const,
      language,
      intervalDays,
      scheduledAt: completedAt,
      dueAt: addDays(completedAt, intervalDays),
    }));
    const next = [...existing, ...items];
    write(next);
    return items;
  },

  scheduleSkillReview(
    reviewType: 'listening' | 'speaking' | 'reading' | 'writing',
    sourceId: string,
    title: string,
    path: string,
    intervalDays: 1 | 3 | 7,
    completedAt = new Date().toISOString(),
    language?: LanguageCode,
  ): SpacedReviewItem[] {
    const existing = read().filter((item) => !(item.reviewType === reviewType && item.sourceId === sourceId && (!language || item.language === language)));
    const item: SpacedReviewItem = {
      id: `review-${reviewType}-${language || 'unknown'}-${sourceId}`,
      reviewType,
      sourceId,
      title,
      path,
      language,
      intervalDays,
      scheduledAt: completedAt,
      dueAt: addDays(completedAt, intervalDays),
    };
    write([...existing, item]);
    return [item];
  },

  scheduleQuiz(
    quizSlug: string,
    _quizTitle: string,
    intervalDays: 1 | 3 | 7,
    completedAt = new Date().toISOString(),
    language?: LanguageCode,
  ): SpacedReviewItem[] {
    const existing = read().filter((item) => item.quizSlug !== quizSlug || (language && item.language !== language));
    const item: SpacedReviewItem = {
      id: `review-quiz-${language || 'unknown'}-${quizSlug}`,
      quizSlug,
      reviewType: 'quiz',
      language,
      intervalDays,
      scheduledAt: completedAt,
      dueAt: addDays(completedAt, intervalDays),
    };
    const next = [...existing, item];
    write(next);
    return [item];
  },

  clearLesson(lessonSlug: string, language?: LanguageCode): void {
    write(read().filter((item) => item.lessonSlug !== lessonSlug || (language ? item.language !== language : false)));
  },

  clearQuiz(quizSlug: string, language?: LanguageCode): void {
    write(read().filter((item) => item.quizSlug !== quizSlug || (language ? item.language !== language : false)));
  },

  markComplete(id: string): void {
    const now = new Date().toISOString();
    write(read().map((item) => item.id === id ? { ...item, completedAt: now } : item));
  },

  getDue(now = new Date(), language?: LanguageCode): SpacedReviewItem[] {
    const timestamp = now.getTime();
    return this.getAll().filter(
      (item) =>
        !item.completedAt &&
        new Date(item.dueAt).getTime() <= timestamp &&
        (!language || item.language === language),
    );
  },
};
