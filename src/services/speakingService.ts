import { SpeakingActivity, SpeakingProgress, ConversationScenario } from '../types/speaking';
import { ALL_SPEAKING_ACTIVITIES, CONVERSATION_SCENARIOS } from '../data/speaking';
import { learnerActivityService } from './learnerActivityService';

const SPEAKING_PROGRESS_KEY = 'bensop_speaking_progress';

class SpeakingService {
  public getAllActivities(language?: 'en' | 'zh'): SpeakingActivity[] {
    if (!language) return ALL_SPEAKING_ACTIVITIES;
    return ALL_SPEAKING_ACTIVITIES.filter((a) => a.language === language);
  }

  public getActivities(
    language?: 'en' | 'zh',
    filters?: {
      type?: string;
      level?: string;
      topic?: string;
      search?: string;
    }
  ): SpeakingActivity[] {
    let list = this.getAllActivities(language);

    if (filters?.type && filters.type !== 'ALL') {
      list = list.filter((a) => a.type === filters.type);
    }

    if (filters?.level && filters.level !== 'ALL') {
      list = list.filter((a) => a.level === filters.level);
    }

    if (filters?.topic && filters.topic !== 'ALL') {
      list = list.filter((a) => a.topic.toLowerCase() === filters.topic?.toLowerCase());
    }

    if (filters?.search) {
      const q = filters.search.toLowerCase().trim();
      list = list.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.prompt.toLowerCase().includes(q) ||
          (a.targetText && a.targetText.toLowerCase().includes(q)) ||
          a.topic.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    return list;
  }

  public getActivityBySlug(slug: string, language?: 'en' | 'zh'): SpeakingActivity | null {
    return (
      ALL_SPEAKING_ACTIVITIES.find(
        (a) => a.slug === slug && (!language || a.language === language)
      ) || null
    );
  }

  public getActivityById(id: string): SpeakingActivity | null {
    return ALL_SPEAKING_ACTIVITIES.find((a) => a.id === id) || null;
  }

  public getScenarios(language?: 'en' | 'zh'): ConversationScenario[] {
    if (!language) return CONVERSATION_SCENARIOS;
    return CONVERSATION_SCENARIOS.filter((s) => s.language === language);
  }

  public getTopics(language: 'en' | 'zh'): string[] {
    const list = this.getAllActivities(language);
    return Array.from(new Set(list.map((a) => a.topic)));
  }

  public getRelatedActivities(current: SpeakingActivity, count: number = 3): SpeakingActivity[] {
    return ALL_SPEAKING_ACTIVITIES.filter(
      (a) =>
        a.id !== current.id &&
        a.language === current.language &&
        (a.topic === current.topic || a.type === current.type)
    ).slice(0, count);
  }

  public getProgressList(): SpeakingProgress[] {
    try {
      const data = localStorage.getItem(SPEAKING_PROGRESS_KEY);
      if (!data) return [];
      return JSON.parse(data) as SpeakingProgress[];
    } catch {
      return [];
    }
  }

  public getActivityProgress(activityId: string): SpeakingProgress | null {
    const list = this.getProgressList();
    return list.find((p) => p.activityId === activityId) || null;
  }

  public saveProgress(progress: SpeakingProgress): void {
    try {
      const list = this.getProgressList();
      const idx = list.findIndex((p) => p.activityId === progress.activityId);
      if (idx >= 0) {
        list[idx] = {
          ...list[idx],
          attempts: list[idx].attempts + 1,
          bestScore: Math.max(list[idx].bestScore, progress.bestScore),
          pronunciationScore: Math.max(list[idx].pronunciationScore, progress.pronunciationScore),
          fluencyScore: Math.max(list[idx].fluencyScore, progress.fluencyScore),
          grammarScore: Math.max(list[idx].grammarScore, progress.grammarScore),
          vocabularyScore: Math.max(list[idx].vocabularyScore, progress.vocabularyScore),
          lastAttemptAt: new Date().toISOString(),
          completed: list[idx].completed || progress.completed
        };
      } else {
        list.push(progress);
      }
      localStorage.setItem(SPEAKING_PROGRESS_KEY, JSON.stringify(list));
      learnerActivityService.record({skill:'speaking',language:progress.language,activityId:progress.activityId,score:progress.bestScore,evidenceType:'assessment',timestamp:progress.lastAttemptAt,metadata:{completed:progress.completed}});
    } catch (e) {
      console.warn('Failed to save speaking progress:', e);
    }
  }
}

export const speakingService = new SpeakingService();
