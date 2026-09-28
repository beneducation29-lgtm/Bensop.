import { LanguageCode } from '../types/vocabulary';
import { MasterySnapshot } from '../types/mastery';
import { AdaptiveMemorySkill } from './adaptiveSessionMemoryService';

export interface LearningEvidenceRecord {
  id: string;
  date: string;
  language: LanguageCode;
  skill: AdaptiveMemorySkill;
  activityId: string;
  score: number;
  mastery: number;
  masteryDelta: number;
  confidence: number;
  evidenceLevel?: string;
  completedAt: string;
}

export interface LearningHistorySummary {
  language: LanguageCode;
  totalActivities: number;
  activeDays: number;
  averageScore: number;
  mastery: number;
  masteryDelta: number;
  masteryChanges: number;
  evidenceGains: number;
  recent: LearningEvidenceRecord[];
}

const STORAGE_KEY = 'bensop_adaptive_learning_history_v1';
const MAX_RECORDS = 120;

const read = (): LearningEvidenceRecord[] => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) as LearningEvidenceRecord[] : [];
  } catch {
    return [];
  }
};

const write = (records: LearningEvidenceRecord[]): void => {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(records.slice(-MAX_RECORDS)));
  } catch {
    // Historical evidence is an enhancement; core mastery persistence remains independent.
  }
};

const skillRecord = (snapshot: MasterySnapshot, skill: AdaptiveMemorySkill) => {
  if (skill === 'quiz') return undefined;
  return snapshot.skills.find((item) => item.entityId === skill || item.skill === skill);
};

const snapshotMastery = (snapshot: MasterySnapshot, skill: AdaptiveMemorySkill): number => {
  const record = skillRecord(snapshot, skill);
  return record?.mastery ?? snapshot.overall;
};

const snapshotConfidence = (snapshot: MasterySnapshot, skill: AdaptiveMemorySkill): number => {
  const record = skillRecord(snapshot, skill);
  return record?.confidence ?? 0;
};

const snapshotEvidence = (snapshot: MasterySnapshot, skill: AdaptiveMemorySkill): string | undefined => {
  return skillRecord(snapshot, skill)?.evidenceLevel;
};

const dateKey = (value: string) => value.slice(0, 10);

class AdaptiveLearningHistoryService {
  recordResult(input: {
    language: LanguageCode;
    skill: AdaptiveMemorySkill;
    activityId: string;
    score: number;
    completedAt: string;
  }): LearningEvidenceRecord {
    const records = read();
    const duplicate = records.find(
      (item) =>
        item.language === input.language &&
        item.skill === input.skill &&
        item.activityId === input.activityId
    );
    if (duplicate) return duplicate;

    const snapshot = this.getLanguageSnapshot(input.language);
    const mastery = snapshotMastery(snapshot, input.skill);
    const confidence = snapshotConfidence(snapshot, input.skill);
    const previous = [...records]
      .reverse()
      .find((item) => item.language === input.language && item.skill === input.skill);
    const masteryDelta = previous ? Math.round((mastery - previous.mastery) * 10) / 10 : 0;

    const record: LearningEvidenceRecord = {
      id: [input.language, input.skill, input.activityId].join(':'),
      date: dateKey(input.completedAt),
      language: input.language,
      skill: input.skill,
      activityId: input.activityId,
      score: Math.max(0, Math.min(100, Math.round(input.score))),
      mastery,
      masteryDelta,
      confidence,
      evidenceLevel: snapshotEvidence(snapshot, input.skill),
      completedAt: input.completedAt,
    };

    write([...records, record]);
    return record;
  }

  private getLanguageSnapshot(language: LanguageCode): MasterySnapshot {
    // Lazy import is avoided; masteryService is imported below through the module dependency.
    return masteryService.getSnapshot(language);
  }

  getHistory(language: LanguageCode, limit = 30): LearningEvidenceRecord[] {
    return read()
      .filter((item) => item.language === language)
      .sort((a, b) => b.completedAt.localeCompare(a.completedAt))
      .slice(0, limit);
  }

  getSummary(language: LanguageCode, days = 30): LearningHistorySummary {
    const history = this.getHistory(language, MAX_RECORDS);
    const cutoff = Date.now() - days * 86400000;
    const recentWindow = history.filter((item) => new Date(item.completedAt).getTime() >= cutoff);
    const daySet = new Set(recentWindow.map((item) => item.date));
    const averageScore = recentWindow.length
      ? Math.round(recentWindow.reduce((sum, item) => sum + item.score, 0) / recentWindow.length)
      : 0;
    const latest = recentWindow[0];
    const oldest = recentWindow[recentWindow.length - 1];
    const mastery = latest?.mastery ?? masteryService.getSnapshot(language).overall;
    const masteryDelta = latest && oldest
      ? Math.round((latest.mastery - oldest.mastery) * 10) / 10
      : 0;

    return {
      language,
      totalActivities: recentWindow.length,
      activeDays: daySet.size,
      averageScore,
      mastery: Math.round(mastery),
      masteryDelta,
      masteryChanges: recentWindow.filter((item) => item.masteryDelta !== 0).length,
      evidenceGains: recentWindow.filter((item) => item.evidenceLevel === 'established' || item.evidenceLevel === 'mastered').length,
      recent: recentWindow.slice(0, 6),
    };
  }

  clear(language?: LanguageCode): void {
    try {
      if (!language) {
        window.localStorage.removeItem(STORAGE_KEY);
        return;
      }
      write(read().filter((item) => item.language !== language));
    } catch {
      // Ignore history cleanup failures.
    }
  }
}

import { masteryService } from './masteryService';

export const adaptiveLearningHistoryService = new AdaptiveLearningHistoryService();
