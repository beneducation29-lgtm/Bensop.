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
  recoveryStatus?: 'none' | 'recovering' | 'recovered' | 'relearning';
  recoveryCount?: number;
  lastRecoveryAt?: string;
  failureStreak?: number;
  persistenceScore?: number;
  parentVerificationStatus?: 'pending' | 'verified' | 'needs-review';
  parentVerificationCount?: number;
  lastParentVerificationScore?: number;
  lastParentVerificationAt?: string;
}

export interface MasterySnapshot {
  overall: number;
  skills: MasteryRecord[];
  topics: MasteryRecord[];
  questions: MasteryRecord[];
  updatedAt: string;
}
