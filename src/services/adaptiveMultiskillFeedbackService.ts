import { LanguageCode } from '../types/vocabulary';
import { adaptiveLearningOrchestrator, AdaptiveLearningPlan } from './adaptiveLearningOrchestrator';

export type AdaptiveSkill = 'listening' | 'reading' | 'writing' | 'speaking';

export interface AdaptiveSkillResult {
  skill: AdaptiveSkill;
  language: LanguageCode;
  activityId: string;
  score: number;
  completedAt?: string;
}

class AdaptiveMultiskillFeedbackService {
  recordResult(result: AdaptiveSkillResult): AdaptiveLearningPlan {
    // The skill service is responsible for persisting its own evidence/mastery/review.
    // We only re-run orchestration here, avoiding a second persistence path.
    return adaptiveLearningOrchestrator.buildPlan(result.language);
  }
}

export const adaptiveMultiskillFeedbackService = new AdaptiveMultiskillFeedbackService();
