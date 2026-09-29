import { LanguageCode } from '../types/vocabulary';
import { AdaptiveMemorySkill } from './adaptiveSessionMemoryService';
import { adaptiveSessionGoalService, AdaptiveSessionGoal } from './adaptiveSessionGoalService';
import { learningIntelligenceProfileService } from './learningIntelligenceProfileService';
import { longTermLearningMemoryService } from './longTermLearningMemoryService';

export type SessionOutcomeStatus = 'completed' | 'in-progress';

export interface SessionOutcome {
  language: LanguageCode;
  sessionId: string;
  status: SessionOutcomeStatus;
  completedAt: string;
  completedSteps: number;
  averageScore: number;
  strongestSkill?: AdaptiveMemorySkill;
  needsAttentionSkill?: AdaptiveMemorySkill;
  evidenceCoverage: number;
  mastery: number;
  headline: string;
  summary: string;
  nextFocus?: AdaptiveMemorySkill;
  nextAction: string;
}

const STORAGE_KEY = 'bensop_session_outcome_v1';
const key = (language: LanguageCode) => `${STORAGE_KEY}_${language}`;

class AdaptiveSessionOutcomeService {
  private read(language: LanguageCode): SessionOutcome | undefined {
    try {
      const raw = window.localStorage.getItem(key(language));
      return raw ? JSON.parse(raw) as SessionOutcome : undefined;
    } catch { return undefined; }
  }

  private write(outcome: SessionOutcome): void {
    try { window.localStorage.setItem(key(outcome.language), JSON.stringify(outcome)); } catch {}
  }

  private build(language: LanguageCode, goal: AdaptiveSessionGoal): SessionOutcome {
    const intelligence = learningIntelligenceProfileService.getProfile(language);
    const completed = goal.completedSteps;
    const skillScores = new Map<AdaptiveMemorySkill, number[]>();
    completed.forEach(step => {
      const values = skillScores.get(step.skill) || [];
      values.push(step.score);
      skillScores.set(step.skill, values);
    });
    const ranked = [...skillScores.entries()]
      .map(([skill, scores]) => ({ skill, score: Math.round(scores.reduce((a,b) => a+b, 0) / scores.length) }))
      .sort((a,b) => b.score - a.score);
    const strongestSkill = ranked[0]?.skill;
    const weakestSessionSkill = ranked.at(-1)?.skill;
    const nextFocus = intelligence.prioritySkill || weakestSessionSkill;
    const averageScore = completed.length
      ? Math.round(completed.reduce((sum, step) => sum + step.score, 0) / completed.length)
      : 0;

    return {
      language,
      sessionId: goal.sessionId,
      status: goal.status === 'completed' ? 'completed' : 'in-progress',
      completedAt: goal.updatedAt,
      completedSteps: completed.length,
      averageScore,
      strongestSkill,
      needsAttentionSkill: weakestSessionSkill,
      evidenceCoverage: intelligence.evidenceCoverage,
      mastery: intelligence.overallMastery,
      headline: goal.status === 'completed'
        ? averageScore >= 80 ? 'Phiên học tạo evidence tốt' : 'Phiên học đã hoàn tất'
        : 'Phiên học đang được xây evidence',
      summary: goal.status === 'completed'
        ? `Đã hoàn thành ${completed.length} bước với điểm trung bình ${averageScore}%. Hồ sơ hiện có ${intelligence.evidenceCoverage}% evidence coverage.`
        : `Đã hoàn thành ${completed.length} bước. Bensop sẽ tiếp tục cập nhật quyết định từ evidence mới.`,
      nextFocus,
      nextAction: nextFocus
        ? `Phiên tiếp theo ưu tiên ${nextFocus} theo tín hiệu mới nhất của hồ sơ học tập.`
        : 'Tiếp tục một hoạt động ngắn để tạo thêm evidence.',
    };
  }

  sync(language: LanguageCode): SessionOutcome {
    const goal = adaptiveSessionGoalService.getGoal(language);
    const outcome = this.build(language, goal);
    this.write(outcome);
    longTermLearningMemoryService.record(outcome);
    return outcome;
  }

  get(language: LanguageCode): SessionOutcome | undefined {
    return this.read(language);
  }

  clear(language?: LanguageCode): void {
    try {
      if (language) window.localStorage.removeItem(key(language));
      else {
        window.localStorage.removeItem(key('en'));
        window.localStorage.removeItem(key('zh'));
        window.localStorage.removeItem(STORAGE_KEY);
      }
    } catch {}
  }
}

export const adaptiveSessionOutcomeService = new AdaptiveSessionOutcomeService();
