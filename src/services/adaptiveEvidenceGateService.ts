import { LanguageCode } from '../types/vocabulary';
import { AdaptiveMemorySkill } from './adaptiveSessionMemoryService';
import { AdaptiveSessionGoalStep } from './adaptiveSessionGoalService';

export type EvidenceGateStatus = 'insufficient' | 'developing' | 'ready';

export interface EvidenceGateDecision {
  language: LanguageCode;
  status: EvidenceGateStatus;
  label: string;
  reason: string;
  skill: AdaptiveMemorySkill;
  score: number;
  shouldAdvance: boolean;
}

class AdaptiveEvidenceGateService {
  evaluate(language: LanguageCode, step?: AdaptiveSessionGoalStep): EvidenceGateDecision | undefined {
    if (!step) return undefined;
    const score = Math.max(0, Math.min(100, step.score));
    const status: EvidenceGateStatus = score < 60 ? 'insufficient' : score < 70 ? 'developing' : 'ready';
    return {
      language,
      status,
      label: status === 'insufficient' ? 'Evidence needs work' : status === 'developing' ? 'Evidence developing' : 'Evidence ready',
      reason: status === 'insufficient'
        ? 'Score below 60. Keep the current skill and reinforce it before switching.'
        : status === 'developing'
          ? 'Score 60-69. Continue building evidence before treating the skill as stable.'
          : 'Score 70 or higher. The step has enough evidence for the planner to consider moving on.',
      skill: step.skill,
      score,
      shouldAdvance: status === 'ready',
    };
  }
}

export const adaptiveEvidenceGateService = new AdaptiveEvidenceGateService();
