import { LanguageCode } from '../types/vocabulary';
import { AdaptiveMemorySkill } from './adaptiveSessionMemoryService';

export type AdaptiveSessionGoalStatus = 'active' | 'completed';

export interface AdaptiveSessionGoalStep {
  id: string;
  skill: AdaptiveMemorySkill;
  activityId: string;
  score: number;
  completedAt: string;
}

export interface AdaptiveSessionGoal {
  sessionId: string;
  language: LanguageCode;
  startedAt: string;
  updatedAt: string;
  targetSteps: number;
  maxSteps: number;
  completedSteps: AdaptiveSessionGoalStep[];
  status: AdaptiveSessionGoalStatus;
  completionReason?: string;
}

export interface AdaptiveSessionGoalProgress {
  language: LanguageCode;
  status: AdaptiveSessionGoalStatus;
  completedSteps: number;
  targetSteps: number;
  maxSteps: number;
  uniqueSkills: number;
  averageScore: number;
  remainingSteps: number;
  label: string;
  reason: string;
}

const STORAGE_KEY = 'bensop_adaptive_session_goal_v1';
const storageKey = (language: LanguageCode) => `${STORAGE_KEY}_${language}`;
const TARGET_STEPS = 3;
const MAX_STEPS = 5;

class AdaptiveSessionGoalService {
  private read(language: LanguageCode): AdaptiveSessionGoal | null {
    try {
      const raw = window.localStorage.getItem(storageKey(language)) || window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const goal = JSON.parse(raw) as AdaptiveSessionGoal;
      return goal.language === language ? goal : null;
    } catch {
      return null;
    }
  }

  private write(goal: AdaptiveSessionGoal): void {
    try {
      window.localStorage.setItem(storageKey(goal.language), JSON.stringify(goal));
    } catch {
      // Session goal is an adaptive UI enhancement; core learning persistence is independent.
    }
  }

  private create(language: LanguageCode): AdaptiveSessionGoal {
    const now = new Date().toISOString();
    return {
      sessionId: 'adaptive-goal-' + Date.now(),
      language,
      startedAt: now,
      updatedAt: now,
      targetSteps: TARGET_STEPS,
      maxSteps: MAX_STEPS,
      completedSteps: [],
      status: 'active',
    };
  }

  getOrCreate(language: LanguageCode): AdaptiveSessionGoal {
    const existing = this.read(language);
    if (existing?.status === 'active') return existing;
    const goal = this.create(language);
    this.write(goal);
    return goal;
  }

  recordStep(step: Omit<AdaptiveSessionGoalStep, 'id'>): AdaptiveSessionGoal {
    const goal = this.getOrCreate(step.language);
    const id = [step.skill, step.activityId, step.completedAt].join(':');
    if (goal.completedSteps.some((item) => item.id === id)) return goal;

    goal.completedSteps = [...goal.completedSteps, { ...step, id }].slice(-goal.maxSteps);
    goal.updatedAt = new Date().toISOString();

    const uniqueSkills = new Set(goal.completedSteps.map((item) => item.skill)).size;
    const averageScore = Math.round(
      goal.completedSteps.reduce((sum, item) => sum + item.score, 0) / goal.completedSteps.length
    );

    const targetStepsReady =
      goal.completedSteps.length >= goal.targetSteps &&
      goal.completedSteps.slice(-goal.targetSteps).every((item) => item.score >= 70);

    const evidenceReady =
      targetStepsReady &&
      (uniqueSkills >= 2 || averageScore >= 70);
    const hardStop = goal.completedSteps.length >= goal.maxSteps;

    if (evidenceReady || hardStop) {
      goal.status = 'completed';
      goal.completionReason = evidenceReady
        ? 'Đã hoàn thành đủ số bước mục tiêu và tạo evidence đủ ổn định cho phiên học.'
        : 'Đã đạt giới hạn phiên học; Bensop dừng để tránh tạo thêm hoạt động không cần thiết.';
    }

    this.write(goal);
    return goal;
  }

  getProgress(language: LanguageCode): AdaptiveSessionGoalProgress {
    // Preserve a completed goal long enough for the orchestrator/planner to surface
    // the session-complete state. A new goal is created only when the next activity
    // is actually recorded through recordStep().
    const existing = this.read(language);
    const goal = existing || this.create(language);
    if (!existing) this.write(goal);
    const uniqueSkills = new Set(goal.completedSteps.map((item) => item.skill)).size;
    const averageScore = goal.completedSteps.length
      ? Math.round(goal.completedSteps.reduce((sum, item) => sum + item.score, 0) / goal.completedSteps.length)
      : 0;
    const remainingSteps = goal.status === 'completed'
      ? 0
      : Math.max(0, goal.targetSteps - goal.completedSteps.length);

    return {
      language,
      status: goal.status,
      completedSteps: goal.completedSteps.length,
      targetSteps: goal.targetSteps,
      maxSteps: goal.maxSteps,
      uniqueSkills,
      averageScore,
      remainingSteps,
      label: goal.status === 'completed'
        ? 'HOÀN THÀNH PHIÊN HỌC'
        : goal.completedSteps.length
          ? goal.completedSteps.length + '/' + goal.targetSteps + ' BƯỚC HOÀN THÀNH'
          : 'PHIÊN HỌC MỚI',
      reason: goal.status === 'completed'
        ? goal.completionReason || 'Phiên học đã đạt đủ evidence.'
        : remainingSteps === 1
          ? 'Còn 1 bước để hoàn thành mục tiêu phiên học.'
          : 'Bensop giữ phiên học ngắn và tập trung; ưu tiên evidence thay vì kéo dài không cần thiết.',
    };
  }

  getGoal(language: LanguageCode): AdaptiveSessionGoal {
    // Keep completed sessions visible until the next real learning activity starts.
    return this.read(language) || this.create(language);
  }

  clear(language?: LanguageCode): void {
    try {
      if (!language) {
        window.localStorage.removeItem(STORAGE_KEY);
        window.localStorage.removeItem(storageKey('en'));
        window.localStorage.removeItem(storageKey('zh'));
        return;
      }
      const existing = this.read(language);
      if (existing) {
        this.write(this.create(language));
      }
    } catch {
      // Ignore storage failures.
    }
  }
}

export const adaptiveSessionGoalService = new AdaptiveSessionGoalService();
