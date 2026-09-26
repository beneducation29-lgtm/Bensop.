import { SpacedReviewItem } from '../types/content';

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

  getForLesson(lessonSlug: string): SpacedReviewItem[] {
    return this.getAll().filter((item) => item.lessonSlug === lessonSlug);
  },

  getForQuiz(quizSlug: string): SpacedReviewItem[] {
    return this.getAll().filter((item) => item.quizSlug === quizSlug);
  },

  scheduleLesson(lessonSlug: string, completedAt = new Date().toISOString()): SpacedReviewItem[] {
    const existing = read().filter((item) => item.lessonSlug !== lessonSlug);
    const intervals: Array<1 | 3 | 7> = [1, 3, 7];
    const items = intervals.map((intervalDays) => ({
      id: `review-lesson-${lessonSlug}-${intervalDays}`,
      lessonSlug,
      reviewType: 'lesson' as const,
      intervalDays,
      scheduledAt: completedAt,
      dueAt: addDays(completedAt, intervalDays),
    }));
    const next = [...existing, ...items];
    write(next);
    return items;
  },

  scheduleQuiz(
    quizSlug: string,
    _quizTitle: string,
    intervalDays: 1 | 3 | 7,
    completedAt = new Date().toISOString(),
  ): SpacedReviewItem[] {
    const existing = read().filter((item) => item.quizSlug !== quizSlug);
    const item: SpacedReviewItem = {
      id: `review-quiz-${quizSlug}`,
      quizSlug,
      reviewType: 'quiz',
      intervalDays,
      scheduledAt: completedAt,
      dueAt: addDays(completedAt, intervalDays),
    };
    const next = [...existing, item];
    write(next);
    return [item];
  },

  clearLesson(lessonSlug: string): void {
    write(read().filter((item) => item.lessonSlug !== lessonSlug));
  },

  clearQuiz(quizSlug: string): void {
    write(read().filter((item) => item.quizSlug !== quizSlug));
  },

  markComplete(id: string): void {
    const now = new Date().toISOString();
    write(read().map((item) => item.id === id ? { ...item, completedAt: now } : item));
  },

  getDue(now = new Date()): SpacedReviewItem[] {
    const timestamp = now.getTime();
    return this.getAll().filter((item) => !item.completedAt && new Date(item.dueAt).getTime() <= timestamp);
  },
};
