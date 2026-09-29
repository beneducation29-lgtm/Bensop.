import { LanguageCode } from '../types/vocabulary';

export type AdaptiveMemorySkill =
  | 'quiz'
  | 'vocabulary'
  | 'grammar'
  | 'listening'
  | 'speaking'
  | 'reading'
  | 'writing';

export interface AdaptiveMemoryStep {
  id: string;
  skill: AdaptiveMemorySkill;
  language: LanguageCode;
  activityId: string;
  score: number;
  completedAt: string;
}

export interface CrossSkillDecision {
  shouldSwitch: boolean;
  currentSkill?: AdaptiveMemorySkill;
  suggestedSkill?: AdaptiveMemorySkill;
  consecutiveCount: number;
  averageScore: number;
  reason: string;
}

interface AdaptiveMemoryState {
  language: LanguageCode;
  updatedAt: string;
  steps: AdaptiveMemoryStep[];
}

const STORAGE_KEY = 'bensop_adaptive_session_memory_v1';
const storageKey = (language: LanguageCode) => `${STORAGE_KEY}_${language}`;
const MAX_STEPS = 12;
const SKILL_ROTATION: AdaptiveMemorySkill[] = [
  'vocabulary',
  'grammar',
  'listening',
  'speaking',
  'reading',
  'writing',
  'quiz',
];

class AdaptiveSessionMemoryService {
  private read(language: LanguageCode): AdaptiveMemoryState {
    try {
      const raw = window.localStorage.getItem(storageKey(language));
      if (!raw) return { language, updatedAt: new Date().toISOString(), steps: [] };
      const parsed = JSON.parse(raw) as AdaptiveMemoryState;
      return parsed.language === language
        ? parsed
        : { language, updatedAt: new Date().toISOString(), steps: [] };
    } catch {
      return { language, updatedAt: new Date().toISOString(), steps: [] };
    }
  }

  private write(state: AdaptiveMemoryState): void {
    try {
      window.localStorage.setItem(storageKey(state.language), JSON.stringify(state));
    } catch {
      // Memory is an adaptive enhancement; core learning persistence remains independent.
    }
  }

  recordStep(step: Omit<AdaptiveMemoryStep, 'id'>): void {
    const state = this.read(step.language);
    const id = [step.language, step.skill, step.activityId, step.completedAt].join(':');
    if (state.steps.some((item) => item.id === id)) return;

    state.steps = [
      ...state.steps,
      { ...step, id },
    ].slice(-MAX_STEPS);
    state.updatedAt = new Date().toISOString();
    this.write(state);
  }

  getRecentSteps(language: LanguageCode, limit = 8): AdaptiveMemoryStep[] {
    return this.read(language).steps.slice(-limit).reverse();
  }

  getCrossSkillDecision(language: LanguageCode): CrossSkillDecision {
    const recent = this.getRecentSteps(language, 8);
    if (!recent.length) {
      return {
        shouldSwitch: false,
        consecutiveCount: 0,
        averageScore: 0,
        reason: 'Chưa có đủ lịch sử phiên học để điều phối giữa các kỹ năng.',
      };
    }

    const currentSkill = recent[0].skill;
    const consecutive = recent.filter((step) => step.skill === currentSkill);
    const consecutiveCount = consecutive.length;
    const averageScore = Math.round(
      consecutive.reduce((sum, step) => sum + step.score, 0) / consecutive.length
    );

    if (consecutiveCount < 2 || averageScore < 70) {
      return {
        shouldSwitch: false,
        currentSkill,
        consecutiveCount,
        averageScore,
        reason: averageScore < 70
          ? 'Kỹ năng vừa luyện vẫn cần thêm evidence; Bensop giữ nguyên hướng luyện thay vì chuyển quá sớm.'
          : 'Lịch sử gần đây chưa đủ dài để cần xoay kỹ năng.',
      };
    }

    const suggestedSkill = SKILL_ROTATION.find((skill) => skill !== currentSkill && !recent.slice(0, 3).some((step) => step.skill === skill));
    if (!suggestedSkill) {
      return {
        shouldSwitch: false,
        currentSkill,
        consecutiveCount,
        averageScore,
        reason: 'Các kỹ năng gần đây đều đã được chạm tới; tiếp tục theo tín hiệu Mastery hiện tại.',
      };
    }

    return {
      shouldSwitch: true,
      currentSkill,
      suggestedSkill,
      consecutiveCount,
      averageScore,
      reason: 'Bạn vừa hoàn thành ' + consecutiveCount + ' lượt ' + currentSkill + ' liên tiếp với kết quả ổn định (' + averageScore + '%). Bensop chuyển sang ' + suggestedSkill + ' để tạo evidence đa kỹ năng.',
    };
  }

  clear(language?: LanguageCode): void {
    try {
      if (!language) {
        window.localStorage.removeItem(STORAGE_KEY);
        window.localStorage.removeItem(storageKey('en'));
        window.localStorage.removeItem(storageKey('zh'));
        return;
      }
      const state = this.read(language);
      this.write({ language, updatedAt: new Date().toISOString(), steps: [] });
      void state;
    } catch {
      // Ignore storage failures.
    }
  }
}

export const adaptiveSessionMemoryService = new AdaptiveSessionMemoryService();
