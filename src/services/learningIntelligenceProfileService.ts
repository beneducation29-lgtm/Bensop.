import { LanguageCode } from '../types/vocabulary';
import { masteryService } from './masteryService';
import { longTermLearningInsightService } from './longTermLearningInsightService';
import { crossSkillMasteryBalanceService, SkillBalanceSignal } from './crossSkillMasteryBalanceService';
import { AdaptiveMemorySkill } from './adaptiveSessionMemoryService';

export type LearningIntelligenceReadiness = 'needs-evidence' | 'developing' | 'ready' | 'stable';

export interface LearningIntelligenceSkill {
  skill: AdaptiveMemorySkill;
  mastery: number;
  confidence: number;
  attempts: number;
  evidenceLevel: string;
  trend: string;
  recentCount: number;
  needScore: number;
}

export interface LearningIntelligenceProfile {
  language: LanguageCode;
  overallMastery: number;
  evidenceCoverage: number;
  readyCount: number;
  developingCount: number;
  needsEvidenceCount: number;
  strongestSkill?: AdaptiveMemorySkill;
  prioritySkill?: AdaptiveMemorySkill;
  readiness: LearningIntelligenceReadiness;
  priorityScore: number;
  headline: string;
  reason: string;
  skills: LearningIntelligenceSkill[];
}

const SKILLS: AdaptiveMemorySkill[] = [
  'vocabulary',
  'grammar',
  'listening',
  'speaking',
  'reading',
  'writing',
];

const labels: Record<AdaptiveMemorySkill, string> = {
  vocabulary: 'Từ vựng',
  grammar: 'Ngữ pháp',
  listening: 'Listening',
  speaking: 'Speaking',
  reading: 'Reading',
  writing: 'Writing',
  quiz: 'Quiz',
};

class LearningIntelligenceProfileService {
  getProfile(language: LanguageCode): LearningIntelligenceProfile {
    const snapshot = masteryService.getSnapshot(language);
    const insight = longTermLearningInsightService.getInsight(language);
    const balance = crossSkillMasteryBalanceService.getDecision(language);

    const skills = SKILLS.map((skill) => {
      const record = snapshot.skills
        .filter((item) => (item.skill || item.entityId) === skill)
        .sort((a, b) => b.attempts - a.attempts)[0];
      const trend = insight.skills.find((item) => item.skill === skill);
      const signal: SkillBalanceSignal | undefined = balance.signals.find((item) => item.skill === skill);
      return {
        skill,
        mastery: record?.mastery ?? 0,
        confidence: record?.confidence ?? 0,
        attempts: record?.attempts ?? 0,
        evidenceLevel: record?.evidenceLevel ?? 'new',
        trend: trend?.trend ?? 'insufficient',
        recentCount: signal?.recentCount ?? 0,
        needScore: signal?.needScore ?? 0,
      };
    });

    const withEvidence = skills.filter((item) => item.attempts > 0);
    const ready = skills.filter((item) => item.mastery >= 70 && (item.evidenceLevel === 'established' || item.evidenceLevel === 'mastered' || item.confidence >= 40));
    const developing = skills.filter((item) => item.attempts > 0 && !ready.includes(item));
    const needsEvidence = skills.filter((item) => item.attempts === 0);
    const overallMastery = Math.round(withEvidence.length
      ? withEvidence.reduce((sum, item) => sum + item.mastery, 0) / withEvidence.length
      : 0);
    const evidenceCoverage = Math.round((withEvidence.length / SKILLS.length) * 100);
    const strongest = [...skills].sort((a, b) => b.mastery - a.mastery || b.confidence - a.confidence)[0];
    const priority = [...skills].sort((a, b) => b.needScore - a.needScore)[0];
    const priorityScore = Math.round(priority?.needScore ?? 0);

    let readiness: LearningIntelligenceReadiness = 'needs-evidence';
    if (ready.length >= 5 && overallMastery >= 80) readiness = 'stable';
    else if (ready.length >= 3 && evidenceCoverage >= 67) readiness = 'ready';
    else if (withEvidence.length) readiness = 'developing';

    const headline = needsEvidence.length
      ? 'Hồ sơ còn thiếu evidence ở ' + labels[needsEvidence[0].skill] + '.'
      : priority && priority.needScore >= 20
        ? 'Ưu tiên củng cố ' + labels[priority.skill] + ' trước khi mở rộng.'
        : 'Hồ sơ học tập đang cân bằng; có thể tiếp tục tăng độ khó.';

    const reason = needsEvidence.length
      ? 'Bensop chưa đủ dữ liệu thực tế ở tất cả kỹ năng; ưu tiên tạo evidence ngắn trước khi kết luận mastery.'
      : priority && priority.needScore >= 20
        ? 'Tín hiệu kết hợp mastery, confidence, evidence, xu hướng 30 ngày và mức lặp gần đây đang ưu tiên kỹ năng này.'
        : 'Các tín hiệu mastery và evidence hiện tại không cho thấy một điểm yếu đủ lớn để chặn tiến trình.';

    return {
      language,
      overallMastery,
      evidenceCoverage,
      readyCount: ready.length,
      developingCount: developing.length,
      needsEvidenceCount: needsEvidence.length,
      strongestSkill: strongest?.attempts ? strongest.skill : undefined,
      prioritySkill: priority?.attempts || needsEvidence.length ? priority.skill : undefined,
      readiness,
      priorityScore,
      headline,
      reason,
      skills,
    };
  }
}

export const learningIntelligenceProfileService = new LearningIntelligenceProfileService();
