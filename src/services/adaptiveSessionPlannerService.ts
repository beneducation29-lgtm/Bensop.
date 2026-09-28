import { LanguageCode } from '../types/vocabulary';
import { AdaptiveLearningPlan, adaptiveLearningOrchestrator } from './adaptiveLearningOrchestrator';
import { adaptiveSessionGoalService } from './adaptiveSessionGoalService';
import { adaptiveSessionMemoryService, AdaptiveMemorySkill } from './adaptiveSessionMemoryService';
import { adaptiveEvidenceGateService } from './adaptiveEvidenceGateService';

export interface AdaptiveSessionPlan {
  language: LanguageCode;
  current: AdaptiveLearningPlan;
  upcoming: AdaptiveLearningPlan[];
  completedSteps: number;
  targetSteps: number;
  reason: string;
}

const SKILL_PATHS: Record<LanguageCode, Record<AdaptiveMemorySkill, string>> = {
  en: {
    vocabulary: '/tieng-anh/vocabulary/practice',
    grammar: '/tieng-anh/grammar',
    listening: '/tieng-anh/listening',
    speaking: '/tieng-anh/speaking',
    reading: '/tieng-anh/reading',
    writing: '/tieng-anh/writing',
    quiz: '/luyen-tap',
  },
  zh: {
    vocabulary: '/tieng-trung/vocabulary/practice',
    grammar: '/tieng-trung/grammar',
    listening: '/tieng-trung/listening',
    speaking: '/tieng-trung/speaking',
    reading: '/tieng-trung/reading',
    writing: '/tieng-trung/writing',
    quiz: '/luyen-tap',
  },
};

const LABELS: Record<AdaptiveMemorySkill, string> = {
  vocabulary: 'Từ vựng',
  grammar: 'Ngữ pháp',
  listening: 'Listening',
  speaking: 'Speaking',
  reading: 'Reading',
  writing: 'Writing',
  quiz: 'Quiz',
};

class AdaptiveSessionPlannerService {
  build(language: LanguageCode): AdaptiveSessionPlan {
    const current = adaptiveLearningOrchestrator.buildPlan(language);
    const goal = adaptiveSessionGoalService.getProgress(language);
    const recentSteps = adaptiveSessionMemoryService.getRecentSteps(language, 6);
    const recent = recentSteps.map((step) => step.skill);
    const lastStep = adaptiveSessionGoalService.getGoal(language).completedSteps.at(-1);
    const evidenceGate = adaptiveEvidenceGateService.evaluate(language, lastStep);
    const gatedCurrent = goal.status === 'active' && evidenceGate && !evidenceGate.shouldAdvance
      ? this.buildEvidenceGatePlan(language, current, evidenceGate)
      : current;
    const upcoming = this.buildUpcoming(language, gatedCurrent, recent, Math.max(0, goal.remainingSteps - 1));

    return {
      language,
      current: gatedCurrent,
      upcoming,
      completedSteps: goal.completedSteps,
      targetSteps: goal.targetSteps,
      reason: goal.status === 'completed'
        ? 'Phiên đã hoàn thành; không tạo thêm bước dự phòng.'
        : upcoming.length
          ? 'Bensop giữ bước hiện tại theo Orchestrator và chuẩn bị trước một vài hướng tiếp theo, nhưng sẽ tính lại sau mỗi kết quả.'
          : 'Bước tiếp theo sẽ được tính lại sau khi có evidence mới.',
    };
  }

  private buildEvidenceGatePlan(language: LanguageCode, current: AdaptiveLearningPlan, gate: { status: string; label: string; reason: string; skill: AdaptiveMemorySkill }): AdaptiveLearningPlan {
    const path = gate.skill === 'quiz'
      ? '/luyen-tap'
      : SKILL_PATHS[language][gate.skill];
    return {
      ...current,
      phase: 'targeted-practice',
      title: gate.status === 'insufficient' ? 'Củng cố trước khi chuyển bước' : 'Ổn định evidence · ' + LABELS[gate.skill],
      description: gate.label,
      reason: gate.reason,
      path,
      durationMinutes: gate.skill === 'vocabulary' || gate.skill === 'grammar' ? 6 : 8,
    };
  }

  private buildUpcoming(
    language: LanguageCode,
    current: AdaptiveLearningPlan,
    recent: AdaptiveMemorySkill[],
    count: number
  ): AdaptiveLearningPlan[] {
    if (count <= 0 || current.phase === 'review-due' || current.phase === 'recover-foundation' || current.phase === 'return-to-parent' || current.phase === 'verify-parent' || current.phase === 'session-complete') {
      return [];
    }

    const candidates: AdaptiveMemorySkill[] = ['vocabulary', 'grammar', 'listening', 'speaking', 'reading', 'writing'];
    const selected = candidates
      .filter((skill) => skill !== currentSkill(current) && !recent.slice(0, 2).includes(skill))
      .slice(0, count);

    return selected.map((skill, index) => ({
      language,
      phase: 'cross-skill',
      state: current.state,
      title: 'Dự kiến · ' + LABELS[skill],
      description: 'Bước dự phòng, chỉ được dùng nếu evidence của bước trước cho phép chuyển tiếp.',
      reason: 'Kế hoạch phiên tránh lặp hai kỹ năng gần nhất; Orchestrator sẽ tính lại quyết định sau mỗi kết quả.',
      path: SKILL_PATHS[language][skill],
      durationMinutes: skill === 'vocabulary' || skill === 'grammar' ? 6 : 8,
      sourceQuestionId: index === 0 ? current.sourceQuestionId : undefined,
    }));
  }
}

const currentSkill = (plan: AdaptiveLearningPlan): AdaptiveMemorySkill | undefined => {
  const entry = Object.entries(SKILL_PATHS[plan.language]).find(([, path]) => path === plan.path);
  return entry?.[0] as AdaptiveMemorySkill | undefined;
};

export const adaptiveSessionPlannerService = new AdaptiveSessionPlannerService();
