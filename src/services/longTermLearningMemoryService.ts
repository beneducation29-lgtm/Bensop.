import { LanguageCode } from '../types/vocabulary';
import { AdaptiveMemorySkill } from './adaptiveSessionMemoryService';
import type { SessionOutcome } from './adaptiveSessionOutcomeService';

export interface LearningMemoryEntry {
  id: string;
  language: LanguageCode;
  sessionId: string;
  completedAt: string;
  averageScore: number;
  mastery: number;
  evidenceCoverage: number;
  completedSteps: number;
  strongestSkill?: AdaptiveMemorySkill;
  needsAttentionSkill?: AdaptiveMemorySkill;
  nextFocus?: AdaptiveMemorySkill;
}

export type LearningProgressPattern = 'improving' | 'stable' | 'recurring-weakness' | 'declining' | 'insufficient';
export type LearningRecoveryPattern = 'relearning' | 'recovering' | 'improving' | 'recovered' | 'stable' | 'insufficient';

export interface LearningMemorySummary {
  language: LanguageCode;
  sessions: number;
  completedSessions: number;
  averageScore: number;
  scoreDelta: number;
  masteryDelta: number;
  activeSkills: number;
  consistency: number;
  trend: 'up' | 'down' | 'stable' | 'insufficient';
  progressPattern: LearningProgressPattern;
  recoveryPattern: LearningRecoveryPattern;
  recoverySkill?: AdaptiveMemorySkill;
  attentionFrequency: number;
  strongestSkill?: AdaptiveMemorySkill;
  recurringAttentionSkill?: AdaptiveMemorySkill;
  headline: string;
  reason: string;
}

const STORAGE_KEY = 'bensop_learning_memory_v1';
const MAX_ENTRIES = 30;
const key = (language: LanguageCode) => `${STORAGE_KEY}_${language}`;

class LongTermLearningMemoryService {
  private read(language: LanguageCode): LearningMemoryEntry[] {
    try {
      const raw = window.localStorage.getItem(key(language));
      const items = raw ? JSON.parse(raw) as LearningMemoryEntry[] : [];
      return Array.isArray(items) ? items : [];
    } catch { return []; }
  }

  private write(language: LanguageCode, entries: LearningMemoryEntry[]): void {
    try { window.localStorage.setItem(key(language), JSON.stringify(entries.slice(0, MAX_ENTRIES))); } catch {}
  }

  record(outcome: SessionOutcome): LearningMemoryEntry[] {
    const entries = this.read(outcome.language);
    const entry: LearningMemoryEntry = {
      id: outcome.sessionId,
      language: outcome.language,
      sessionId: outcome.sessionId,
      completedAt: outcome.completedAt,
      averageScore: outcome.averageScore,
      mastery: outcome.mastery,
      evidenceCoverage: outcome.evidenceCoverage,
      completedSteps: outcome.completedSteps,
      strongestSkill: outcome.strongestSkill,
      needsAttentionSkill: outcome.needsAttentionSkill,
      nextFocus: outcome.nextFocus,
    };
    const next = [entry, ...entries.filter(item => item.sessionId !== entry.sessionId)];
    this.write(outcome.language, next);
    return next;
  }

  getEntries(language: LanguageCode, limit = MAX_ENTRIES): LearningMemoryEntry[] {
    return this.read(language).slice(0, limit);
  }

  getSummary(language: LanguageCode): LearningMemorySummary {
    const entries = this.read(language);
    const completed = entries.filter(item => item.completedSteps > 0);
    const recent = completed.slice(0, 5);
    const prior = completed.slice(5, 10);
    const average = (items: LearningMemoryEntry[]) => items.length
      ? Math.round(items.reduce((sum, item) => sum + item.averageScore, 0) / items.length)
      : 0;
    const recentAverage = average(recent);
    const priorAverage = average(prior);
    const scoreDelta = recent.length && prior.length ? recentAverage - priorAverage : 0;
    const masteryDelta = recent.length && prior.length
      ? Math.round((recent[0].mastery - prior[prior.length - 1].mastery) * 10) / 10
      : 0;

    const skillCounts = new Map<AdaptiveMemorySkill, number>();
    completed.forEach(item => {
      if (item.strongestSkill) skillCounts.set(item.strongestSkill, (skillCounts.get(item.strongestSkill) || 0) + 1);
    });
    const strongestSkill = [...skillCounts.entries()].sort((a,b) => b[1] - a[1])[0]?.[0];

    const attentionCounts = new Map<AdaptiveMemorySkill, number>();
    completed.forEach(item => {
      if (item.needsAttentionSkill) attentionCounts.set(item.needsAttentionSkill, (attentionCounts.get(item.needsAttentionSkill) || 0) + 1);
    });
    const recurringAttentionEntry = [...attentionCounts.entries()].sort((a,b) => b[1] - a[1])[0];
    const recurringAttentionSkill = recurringAttentionEntry?.[0];
    const attentionFrequency = recurringAttentionEntry && completed.length
      ? Math.round((recurringAttentionEntry[1] / completed.length) * 100)
      : 0;

    const activeSkills = new Set(completed.flatMap(item => [item.strongestSkill, item.needsAttentionSkill, item.nextFocus].filter(Boolean) as AdaptiveMemorySkill[])).size;
    const activeDays = new Set(completed.map(item => item.completedAt.slice(0, 10))).size;
    const consistency = Math.min(100, Math.round((activeDays / 14) * 100));
    const trend: LearningMemorySummary['trend'] = completed.length < 3 ? 'insufficient' : scoreDelta >= 5 || masteryDelta >= 2 ? 'up' : scoreDelta <= -5 || masteryDelta <= -2 ? 'down' : 'stable';
    const progressPattern: LearningProgressPattern = completed.length < 3
      ? 'insufficient'
      : recurringAttentionSkill && attentionFrequency >= 40 && (trend === 'down' || scoreDelta <= 0)
        ? 'recurring-weakness'
        : trend === 'down'
          ? 'declining'
          : trend === 'up'
            ? 'improving'
            : 'stable';

    const recoverySkill = recurringAttentionSkill;
    const recoveryEntryCount = recoverySkill
      ? completed.filter(item => item.needsAttentionSkill === recoverySkill).length
      : 0;
    const recentRecoveryEntries = recoverySkill
      ? completed.slice(0, 3).filter(item => item.needsAttentionSkill === recoverySkill).length
      : 0;
    const recentRecoveryClear = recoverySkill
      ? completed.slice(0, 2).every(item => item.needsAttentionSkill !== recoverySkill)
      : false;
    const recoverySignal = scoreDelta > 0 || masteryDelta > 0 || trend === 'up';
    const currentMastery = completed[0]?.mastery ?? 0;
    const recoveryPattern: LearningRecoveryPattern = completed.length < 3 || !recoverySkill
      ? 'insufficient'
      : currentMastery < 50 && recentRecoveryEntries >= 2
        ? 'relearning'
        : recentRecoveryEntries > 0 && recoverySignal
          ? 'recovering'
          : recoveryEntryCount >= 2 && recentRecoveryClear && currentMastery >= 70
            ? 'recovered'
            : currentMastery >= 85 && recentRecoveryClear
              ? 'stable'
              : recoveryEntryCount >= 2 && recoverySignal && currentMastery >= 60
                ? 'improving'
                : 'stable';

    const headline = trend === 'up'
      ? 'Chuỗi phiên gần đây đang cho thấy tiến bộ.'
      : trend === 'down'
        ? 'Các phiên gần đây cần thêm củng cố.'
        : trend === 'stable'
          ? 'Năng lực đang duy trì tương đối ổn định.'
          : 'Bensop đang thu thập thêm learning memory.';

    const reason = recurringAttentionSkill
      ? `${recurringAttentionSkill} xuất hiện thường xuyên ở nhóm cần chú ý; hệ thống sẽ tiếp tục đối chiếu với mastery và evidence trước khi ưu tiên.`
      : 'Chưa có kỹ năng nào lặp lại đủ rõ trong memory để tạo kết luận mạnh.';

    return {
      language,
      sessions: entries.length,
      completedSessions: completed.length,
      averageScore: recentAverage,
      scoreDelta,
      masteryDelta,
      activeSkills,
      consistency,
      trend,
      progressPattern,
      recoveryPattern,
      recoverySkill,
      attentionFrequency,
      strongestSkill,
      recurringAttentionSkill,
      headline,
      reason,
    };
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

export const longTermLearningMemoryService = new LongTermLearningMemoryService();
