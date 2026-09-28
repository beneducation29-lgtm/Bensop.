import { LanguageCode } from '../types/vocabulary';
import { AdaptiveLearningPlan } from './adaptiveLearningOrchestrator';
import { adaptiveSessionPlannerService } from './adaptiveSessionPlannerService';
import { adaptiveSessionMemoryService } from './adaptiveSessionMemoryService';
import { adaptiveSessionGoalService } from './adaptiveSessionGoalService';
import { dailyLearningContinuityService } from './dailyLearningContinuityService';
import { adaptiveLearningHistoryService } from './adaptiveLearningHistoryService';

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
    dailyLearningContinuityService.recordActivity(
      result.language,
      result.skill,
      result.activityId
    );

    adaptiveSessionGoalService.recordStep({
      skill: result.skill,
      language: result.language,
      activityId: result.activityId,
      score: result.score,
      completedAt: result.completedAt || new Date().toISOString(),
    });

    adaptiveSessionMemoryService.recordStep({
      skill: result.skill,
      language: result.language,
      activityId: result.activityId,
      score: result.score,
      completedAt: result.completedAt || new Date().toISOString(),
    });

    adaptiveLearningHistoryService.recordResult({
      skill: result.skill,
      language: result.language,
      activityId: result.activityId,
      score: result.score,
      completedAt: result.completedAt || new Date().toISOString(),
    });

    return adaptiveSessionPlannerService.build(result.language).current;
  }
}

export const adaptiveMultiskillFeedbackService = new AdaptiveMultiskillFeedbackService();
