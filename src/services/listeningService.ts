import { ListeningLesson, ListeningProgress, DictationEvaluation } from '../types/listening';
import { ALL_LISTENING_LESSONS } from '../data/listening';
import { learnerActivityService } from './learnerActivityService';

const LISTENING_PROGRESS_KEY = 'bensop_listening_progress';

class ListeningService {
  public getAllLessons(language?: 'en' | 'zh'): ListeningLesson[] {
    if (!language) return ALL_LISTENING_LESSONS;
    return ALL_LISTENING_LESSONS.filter((l) => l.language === language);
  }

  public getLessons(
    language?: 'en' | 'zh',
    filters?: {
      level?: string;
      topic?: string;
      difficulty?: string;
      search?: string;
    }
  ): ListeningLesson[] {
    let list = this.getAllLessons(language);

    if (filters?.level && filters.level !== 'ALL') {
      list = list.filter((l) => l.level === filters.level);
    }

    if (filters?.topic && filters.topic !== 'ALL') {
      list = list.filter((l) => l.topic.toLowerCase() === filters.topic?.toLowerCase());
    }

    if (filters?.difficulty && filters.difficulty !== 'ALL') {
      list = list.filter((l) => l.difficulty === filters.difficulty);
    }

    if (filters?.search) {
      const q = filters.search.toLowerCase().trim();
      list = list.filter(
        (l) =>
          l.title.toLowerCase().includes(q) ||
          l.topic.toLowerCase().includes(q) ||
          l.transcript.toLowerCase().includes(q) ||
          l.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    return list;
  }

  public getLessonBySlug(slug: string, language?: 'en' | 'zh'): ListeningLesson | null {
    return (
      ALL_LISTENING_LESSONS.find(
        (l) => l.slug === slug && (!language || l.language === language)
      ) || null
    );
  }

  public getLessonById(id: string): ListeningLesson | null {
    return ALL_LISTENING_LESSONS.find((l) => l.id === id) || null;
  }

  public getTopics(language: 'en' | 'zh'): string[] {
    const lessons = this.getAllLessons(language);
    return Array.from(new Set(lessons.map((l) => l.topic)));
  }

  public getRelatedLessons(currentLesson: ListeningLesson, count: number = 3): ListeningLesson[] {
    return ALL_LISTENING_LESSONS.filter(
      (l) =>
        l.id !== currentLesson.id &&
        l.language === currentLesson.language &&
        (l.topic === currentLesson.topic || l.level === currentLesson.level)
    ).slice(0, count);
  }

  public evaluateDictation(userText: string, expectedText: string): DictationEvaluation {
    const clean = (s: string) => s.toLowerCase().replace(/[,.!?;"'()，。！？；：“”‘’]/g, '').trim();
    const userWords = clean(userText).split(/\s+/).filter(Boolean);
    const expectedWords = clean(expectedText).split(/\s+/).filter(Boolean);

    let matchCount = 0;
    const diff: DictationEvaluation['diff'] = [];

    const maxLen = Math.max(userWords.length, expectedWords.length);

    for (let i = 0; i < maxLen; i++) {
      const u = userWords[i];
      const e = expectedWords[i];

      if (u && e && u === e) {
        matchCount++;
        diff.push({ word: u, expected: e, status: 'correct' });
      } else if (u && e && u !== e) {
        diff.push({ word: u, expected: e, status: 'incorrect' });
      } else if (!u && e) {
        diff.push({ word: '', expected: e, status: 'missing' });
      } else if (u && !e) {
        diff.push({ word: u, status: 'extra' });
      }
    }

    const totalExpected = expectedWords.length || 1;
    const wordAccuracy = Math.round((matchCount / totalExpected) * 100);
    const spellingAccuracy = Math.min(100, Math.round(wordAccuracy * 1.05));
    const grammarAccuracy = Math.min(100, Math.round(wordAccuracy * 0.98));
    const overallAccuracy = Math.round((wordAccuracy + spellingAccuracy + grammarAccuracy) / 3);

    return {
      wordAccuracy,
      grammarAccuracy,
      spellingAccuracy,
      overallAccuracy,
      diff
    };
  }

  public getProgressList(): ListeningProgress[] {
    try {
      const data = localStorage.getItem(LISTENING_PROGRESS_KEY);
      if (!data) return [];
      return JSON.parse(data) as ListeningProgress[];
    } catch {
      return [];
    }
  }

  public getLessonProgress(lessonId: string): ListeningProgress | null {
    const list = this.getProgressList();
    return list.find((p) => p.listeningLessonId === lessonId) || null;
  }

  public saveProgress(progress: ListeningProgress): void {
    try {
      const list = this.getProgressList();
      const idx = list.findIndex((p) => p.listeningLessonId === progress.listeningLessonId);
      if (idx >= 0) {
        list[idx] = {
          ...list[idx],
          attempts: list[idx].attempts + 1,
          bestScore: Math.max(list[idx].bestScore, progress.bestScore),
          accuracy: Math.round((list[idx].accuracy + progress.accuracy) / 2),
          timeSpent: list[idx].timeSpent + progress.timeSpent,
          lastAttemptAt: new Date().toISOString(),
          completed: list[idx].completed || progress.completed,
          completedAt: progress.completed ? new Date().toISOString() : list[idx].completedAt
        };
      } else {
        list.push(progress);
      }
      localStorage.setItem(LISTENING_PROGRESS_KEY, JSON.stringify(list));
      learnerActivityService.record({skill:'listening',language:progress.language,activityId:progress.listeningLessonId,score:progress.accuracy,evidenceType:'assessment',timestamp:progress.lastAttemptAt,metadata:{completed:progress.completed}});
    } catch (e) {
      console.warn('Failed to save listening progress:', e);
    }
  }
}

export const listeningService = new ListeningService();
