import { LanguageCode } from '../types/vocabulary';
import { adaptiveLearningOrchestrator, AdaptiveLearningPlan } from './adaptiveLearningOrchestrator';
import { adaptiveSessionMemoryService } from './adaptiveSessionMemoryService';

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
    // We only record session memory here, then re-run orchestration.
    adaptiveSessionMemoryService.recordStep({
      skill: result.skill,
      language: result.language,
      activityId: result.activityId,
      score: result.score,
      completedAt: result.completedAt || new Date().toISOString(),
    });

    return adaptiveLearningOrchestrator.buildPlan(result.language);
  }
}

export const adaptiveMultiskillFeedbackService = new AdaptiveMultiskillFeedbackService();
