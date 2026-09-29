import { LanguageCode } from '../types/vocabulary';
import { AdaptiveMemorySkill } from './adaptiveSessionMemoryService';
import { AdaptiveSessionGoalStep } from './adaptiveSessionGoalService';
import { masteryService } from './masteryService';

export type EvidenceGateStatus = 'insufficient' | 'developing' | 'ready';

export interface EvidenceGateDecision {
  language: LanguageCode;
  status: EvidenceGateStatus;
  label: string;
  reason: string;
  skill: AdaptiveMemorySkill;
  score: number;
  mastery: number;
  confidence: number;
  evidenceLevel?: string;
  shouldAdvance: boolean;
}

class AdaptiveEvidenceGateService {
  evaluate(language: LanguageCode, step?: AdaptiveSessionGoalStep): EvidenceGateDecision | undefined {
    if (!step) return undefined;

    const score = Math.max(0, Math.min(100, step.score));
    const snapshot = masteryService.getSnapshot(language);
    const skillRecord = step.skill === 'quiz'
      ? undefined
      : snapshot.skills.find((item) => item.entityId === step.skill || item.skill === step.skill);
    const mastery = skillRecord?.mastery ?? score;
    const confidence = skillRecord?.confidence ?? 0;
    const evidenceLevel = skillRecord?.evidenceLevel;

    const scoreReady = score >= 70;
    const masteryReady = mastery >= 70;
    const evidenceReady = evidenceLevel === 'established' || evidenceLevel === 'mastered';
    const confidenceReady = confidence >= 40;
    const shouldAdvance = scoreReady && masteryReady && (evidenceReady || confidenceReady);

    const status: EvidenceGateStatus =
      shouldAdvance ? 'ready' :
      score < 60 || mastery < 50 ? 'insufficient' :
      'developing';

    return {
      language,
      status,
      label: status === 'insufficient'
        ? 'Evidence cần củng cố'
        : status === 'developing'
          ? 'Evidence đang hình thành'
          : 'Evidence đủ để chuyển bước',
      reason: status === 'insufficient'
        ? 'Điểm hoặc mastery còn thấp. Bensop giữ kỹ năng hiện tại để củng cố trước khi chuyển bước.'
        : status === 'developing'
          ? 'Điểm đã có nhưng mastery, confidence hoặc evidence chưa đủ ổn định để coi kỹ năng là sẵn sàng.'
          : 'Điểm, mastery và evidence đã đạt ngưỡng; Bensop có thể chuyển sang bước tiếp theo.',
      skill: step.skill,
      score,
      mastery,
      confidence,
      evidenceLevel,
      shouldAdvance,
    };
  }
}

export const adaptiveEvidenceGateService = new AdaptiveEvidenceGateService();
