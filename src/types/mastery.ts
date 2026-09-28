import { SkillType } from './quiz';

export type MasteryEntityType = 'skill' | 'topic' | 'question';

export interface MasteryRecord {
  id: string;
  entityType: MasteryEntityType;
  entityId: string;
  label: string;
  categoryId: string;
  skill?: SkillType;
  topicId?: string;
  mastery: number;
  attempts: number;
  correct: number;
  lastScore: number;
  lastAttemptAt: string;
  trend: 'up' | 'down' | 'stable';
  accuracy?: number;
  confidence?: number;
  evidenceLevel?: 'new' | 'developing' | 'established' | 'mastered';
}

export interface MasterySnapshot {
  overall: number;
  skills: MasteryRecord[];
  topics: MasteryRecord[];
  questions: MasteryRecord[];
  updatedAt: string;
}
