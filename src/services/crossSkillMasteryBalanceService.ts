import { LanguageCode } from '../types/vocabulary';
import { masteryService } from './masteryService';
import { adaptiveSessionMemoryService, AdaptiveMemorySkill } from './adaptiveSessionMemoryService';

export interface SkillBalanceSignal {
  skill: AdaptiveMemorySkill;
  mastery: number;
  confidence: number;
  attempts: number;
  recentCount: number;
  needScore: number;
}

export interface CrossSkillBalanceDecision {
  skill?: AdaptiveMemorySkill;
  shouldSwitch: boolean;
  reason: string;
  signals: SkillBalanceSignal[];
}

const SUPPORTED_SKILLS: AdaptiveMemorySkill[] = [
  'vocabulary',
  'grammar',
  'listening',
  'speaking',
  'reading',
  'writing',
];

const normalizeSkill = (value?: string): AdaptiveMemorySkill | undefined =>
  SUPPORTED_SKILLS.includes(value as AdaptiveMemorySkill) ? value as AdaptiveMemorySkill : undefined;

class CrossSkillMasteryBalanceService {
  getDecision(language: LanguageCode): CrossSkillBalanceDecision {
    const snapshot = masteryService.getSnapshot(language);
    const recent = adaptiveSessionMemoryService.getRecentSteps(language, 8);
    const recentCounts = recent.reduce<Record<string, number>>((acc, step) => {
      acc[step.skill] = (acc[step.skill] || 0) + 1;
      return acc;
    }, {});

    const signals = SUPPORTED_SKILLS.map((skill) => {
      const record = snapshot.skills
        .filter(item => normalizeSkill(item.skill || item.entityId) === skill)
        .sort((a, b) => b.attempts - a.attempts)[0];
      const mastery = record?.mastery ?? 0;
      const confidence = record?.confidence ?? 0;
      const attempts = record?.attempts ?? 0;
      const recentCount = recentCounts[skill] || 0;
      const evidenceGap = Math.max(0, 70 - mastery);
      const confidenceGap = Math.max(0, 60 - confidence);
      const coverageGap = attempts === 0 ? 18 : attempts < 2 ? 10 : 0;
      const repetitionPenalty = recentCount >= 2 && mastery >= 70 ? 12 : recentCount * 2;
      const needScore = evidenceGap * 1.1 + confidenceGap * 0.35 + coverageGap + repetitionPenalty;
      return { skill, mastery, confidence, attempts, recentCount, needScore };
    }).sort((a, b) => b.needScore - a.needScore);

    if (!signals.length || signals.every(signal => signal.attempts === 0)) {
      return {
        shouldSwitch: false,
        reason: 'Chưa có đủ evidence đa kỹ năng để cân bằng phiên học.',
        signals,
      };
    }

    const target = signals[0];
    const current = recent[0]?.skill;
    if (!target || target.skill === current || target.attempts === 0 && recent.length < 2) {
      return {
        shouldSwitch: false,
        skill: target?.skill,
        reason: 'Tín hiệu Mastery hiện tại chưa cho thấy cần đổi kỹ năng; tiếp tục theo kế hoạch ưu tiên.',
        signals,
      };
    }

    const currentSignal = signals.find(signal => signal.skill === current);
    const meaningfulGap = target.needScore - (currentSignal?.needScore ?? 0);
    const targetIsUnderEvidence = target.mastery < 70 || target.confidence < 60 || target.attempts < 2;
    const repeatedStableCurrent = (currentSignal?.recentCount ?? 0) >= 2 && (currentSignal?.mastery ?? 0) >= 70;

    if (!targetIsUnderEvidence && meaningfulGap < 15) {
      return {
        shouldSwitch: false,
        skill: target.skill,
        reason: 'Các kỹ năng đang tương đối cân bằng; chưa cần ưu tiên một kỹ năng khác chỉ vì chênh lệch nhỏ.',
        signals,
      };
    }

    if (meaningfulGap >= 10 || repeatedStableCurrent) {
      return {
        shouldSwitch: true,
        skill: target.skill,
        reason: target.attempts === 0
          ? 'Kỹ năng ' + target.skill + ' chưa có evidence; Bensop ưu tiên một lượt ngắn để hiểu năng lực thực tế.'
          : 'Kỹ năng ' + target.skill + ' có tín hiệu cần củng cố (mastery ' + target.mastery + '%, confidence ' + target.confidence + '%). Bensop ưu tiên kỹ năng này để cân bằng evidence đa kỹ năng.',
        signals,
      };
    }

    return {
      shouldSwitch: false,
      skill: target.skill,
      reason: 'Có chênh lệch nhẹ giữa các kỹ năng nhưng chưa đủ mạnh để thay đổi phiên học.',
      signals,
    };
  }
}

export const crossSkillMasteryBalanceService = new CrossSkillMasteryBalanceService();
