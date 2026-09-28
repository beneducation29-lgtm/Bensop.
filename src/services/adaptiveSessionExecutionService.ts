import { LanguageCode } from '../types/vocabulary';
import { QuizResult } from '../types/quiz';
import { AdaptiveLearningPlan, adaptiveLearningOrchestrator } from './adaptiveLearningOrchestrator';
import { adaptiveSessionMemoryService } from './adaptiveSessionMemoryService';
import { adaptiveSessionGoalService } from './adaptiveSessionGoalService';
import { dailyLearningContinuityService } from './dailyLearningContinuityService';

interface AdaptiveStepRecord {
  id: string;
  type: 'quiz';
  completedAt: string;
  score: number;
  passed: boolean;
}

interface AdaptiveSessionExecution {
  sessionId: string;
  language: LanguageCode;
  startedAt: string;
  updatedAt: string;
  completedSteps: AdaptiveStepRecord[];
  nextPlan?: AdaptiveLearningPlan;
}

const STORAGE_KEY = 'bensop_adaptive_session_execution_v1';

const getLanguage = (result: QuizResult): LanguageCode | undefined =>
  result.categoryId === 'tieng-trung'
    ? 'zh'
    : result.categoryId === 'tieng-anh'
      ? 'en'
      : undefined;

class AdaptiveSessionExecutionService {
  private read(): AdaptiveSessionExecution | null {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) as AdaptiveSessionExecution : null;
    } catch {
      return null;
    }
  }

  private write(session: AdaptiveSessionExecution): void {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    } catch {
      // Adaptive execution is an enhancement; learning persistence remains handled by existing services.
    }
  }

  recordQuizResult(result: QuizResult): AdaptiveLearningPlan | undefined {
    const language = getLanguage(result);
    if (!language) return undefined;

    const now = new Date().toISOString();
    const existing = this.read();
    const session: AdaptiveSessionExecution = existing?.language === language
      ? existing
      : {
          sessionId: 'adaptive-session-' + Date.now(),
          language,
          startedAt: now,
          updatedAt: now,
          completedSteps: [],
        };

    const alreadyRecorded = session.completedSteps.some((step) => step.id === result.sessionId);
    if (!alreadyRecorded) {
      session.completedSteps.push({
        id: result.sessionId,
        type: 'quiz',
        completedAt: result.completedAt,
        score: result.score,
        passed: result.passed,
      });
    }

    dailyLearningContinuityService.recordActivity(
      language,
      'quiz',
      result.quizSlug || result.sessionId
    );

    adaptiveSessionGoalService.recordStep({
      skill: 'quiz',
      language,
      activityId: result.quizSlug || result.sessionId,
      score: result.score,
      completedAt: result.completedAt,
    });

    adaptiveSessionMemoryService.recordStep({
      skill: 'quiz',
      language,
      activityId: result.quizSlug || result.sessionId,
      score: result.score,
      completedAt: result.completedAt,
    });

    session.updatedAt = now;

    // Re-run the orchestrator after mastery + spaced review + session memory have been persisted.
    // This makes the next step respond to the result instead of using the pre-attempt plan.
    const nextPlan = adaptiveLearningOrchestrator.buildPlan(language);
    session.nextPlan = nextPlan;
    this.write(session);

    return nextPlan;
  }

  getNextPlan(language: LanguageCode): AdaptiveLearningPlan | undefined {
    const session = this.read();
    return session?.language === language ? session.nextPlan : undefined;
  }

  clear(): void {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage failures.
    }
  }
}

export const adaptiveSessionExecutionService = new AdaptiveSessionExecutionService();
