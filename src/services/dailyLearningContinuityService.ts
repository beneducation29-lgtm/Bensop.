import { LanguageCode } from '../types/vocabulary';
import { AdaptiveMemorySkill } from './adaptiveSessionMemoryService';
import { AdaptiveSessionGoalProgress } from './adaptiveSessionGoalService';

export interface DailyLearningRecord {
  date: string;
  language: LanguageCode;
  completedSteps: number;
  targetSteps: number;
  skills: AdaptiveMemorySkill[];
  averageScore: number;
  completed: boolean;
  completedAt?: string;
}

export interface DailyLearningContinuity {
  language: LanguageCode;
  today: DailyLearningRecord;
  previous?: DailyLearningRecord;
  streakDays: number;
  recentActivities: string[];
  nextFocus: string;
  reason: string;
}

const STORAGE_KEY = 'bensop_daily_learning_continuity_v1';

const dateKey = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

class DailyLearningContinuityService {
  private read(): DailyLearningRecord[] {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) as DailyLearningRecord[] : [];
    } catch {
      return [];
    }
  }

  private write(records: DailyLearningRecord[]): void {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(records.slice(-30)));
    } catch {
      // Continuity is an enhancement; core learning persistence remains independent.
    }
  }

  syncProgress(progress: AdaptiveSessionGoalProgress): DailyLearningContinuity {
    const today = dateKey();
    const records = this.read();
    const existing = records.find((item) => item.date === today && item.language === progress.language);
    const record: DailyLearningRecord = existing || {
      date: today,
      language: progress.language,
      completedSteps: 0,
      targetSteps: progress.targetSteps,
      skills: [],
      averageScore: 0,
      completed: false,
    };

    record.completedSteps = progress.completedSteps;
    record.targetSteps = progress.targetSteps;
    record.completed = progress.status === 'completed';
    record.averageScore = progress.averageScore;

    if (record.completed && !record.completedAt) {
      record.completedAt = new Date().toISOString();
    }

    const next = existing
      ? records.map((item) => item === existing ? record : item)
      : [...records, record];

    this.write(next);
    return this.getContinuity(progress.language);
  }

  recordActivity(language: LanguageCode, skill: AdaptiveMemorySkill, activityId: string): void {
    const records = this.read();
    const today = dateKey();
    const existing = records.find((item) => item.date === today && item.language === language);
    if (!existing) return;
    existing.skills = Array.from(new Set([...existing.skills, skill]));
    this.write(records);
    try {
      const key = `bensop_daily_recent_${language}`;
      const raw = window.localStorage.getItem(key);
      const activities = raw ? JSON.parse(raw) as string[] : [];
      window.localStorage.setItem(key, JSON.stringify([activityId, ...activities.filter((id) => id !== activityId)].slice(0, 12)));
    } catch {
      // Ignore continuity cache failures.
    }
  }

  getRecentActivityIds(language: LanguageCode): string[] {
    try {
      const raw = window.localStorage.getItem(`bensop_daily_recent_${language}`);
      return raw ? JSON.parse(raw) as string[] : [];
    } catch {
      return [];
    }
  }

  getContinuity(language: LanguageCode): DailyLearningContinuity {
    const records = this.read().filter((item) => item.language === language).sort((a, b) => b.date.localeCompare(a.date));
    const today = records.find((item) => item.date === dateKey()) || {
      date: dateKey(),
      language,
      completedSteps: 0,
      targetSteps: 3,
      skills: [],
      averageScore: 0,
      completed: false,
    };

    const previous = records.find((item) => item.date < today.date);
    let streakDays = today.completed ? 1 : 0;
    let cursor = new Date(today.date + 'T00:00:00');

    for (let i = 0; i < 29; i += 1) {
      cursor.setDate(cursor.getDate() - 1);
      const key = dateKey(cursor);
      const record = records.find((item) => item.date === key);
      if (!record?.completed) break;
      streakDays += 1;
    }

    const recentActivities = this.getRecentActivityIds(language);
    const nextFocus = today.completed
      ? 'Giữ nhịp bằng kỹ năng khác hoặc nội dung mới.'
      : today.completedSteps === 0
        ? 'Bắt đầu một bước học có mục tiêu rõ ràng.'
        : 'Hoàn thành thêm evidence cho phiên học hiện tại.';

    return {
      language,
      today,
      previous,
      streakDays,
      recentActivities,
      nextFocus,
      reason: today.completed
        ? 'Phiên hôm nay đã đủ evidence; phiên tiếp theo nên tạo evidence mới thay vì lặp lại hoạt động vừa hoàn thành.'
        : 'Bensop giữ lại tiến độ trong ngày để phiên kế tiếp tiếp tục từ đúng trạng thái hiện tại.',
    };
  }
}

export const dailyLearningContinuityService = new DailyLearningContinuityService();
