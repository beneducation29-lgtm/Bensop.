import { QuizSession, QuizResult, QuizAttemptSummary } from '../types/quiz';

const ACTIVE_SESSION_KEY = 'bensop_active_quiz_session';
const ATTEMPTS_HISTORY_KEY = 'bensop_quiz_attempts_history';

export const quizSessionStorage = {
  saveActiveSession(session: QuizSession): void {
    try {
      localStorage.setItem(ACTIVE_SESSION_KEY, JSON.stringify(session));
    } catch (e) {
      console.warn('Failed to save session to localStorage', e);
    }
  },

  getActiveSession(): QuizSession | null {
    try {
      const data = localStorage.getItem(ACTIVE_SESSION_KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.warn('Failed to read session from localStorage', e);
      return null;
    }
  },

  clearActiveSession(): void {
    try {
      localStorage.removeItem(ACTIVE_SESSION_KEY);
    } catch (e) {
      console.warn('Failed to clear session', e);
    }
  },

  saveResult(result: QuizResult): void {
    try {
      // Save specific result
      localStorage.setItem(`bensop_result_${result.sessionId}`, JSON.stringify(result));

      // Append to history summaries
      const history = this.getHistory();
      const timeMin = Math.floor(result.timeSpent / 60);
      const timeSec = result.timeSpent % 60;
      const formattedTime = `${timeMin}m ${timeSec < 10 ? '0' : ''}${timeSec}s`;

      const summary: QuizAttemptSummary = {
        sessionId: result.sessionId,
        quizId: result.quizId,
        quizSlug: result.quizSlug,
        quizTitle: result.quizTitle,
        categoryId: result.categoryId,
        categoryName: result.categoryName,
        score: result.score,
        accuracy: result.accuracy,
        passed: result.passed,
        date: new Date().toLocaleDateString('vi-VN', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        timeSpent: formattedTime,
        correctCount: result.correctCount,
        totalQuestions: result.totalQuestions,
      };

      const updatedHistory = [summary, ...history.filter((h) => h.sessionId !== result.sessionId)];
      localStorage.setItem(ATTEMPTS_HISTORY_KEY, JSON.stringify(updatedHistory));
    } catch (e) {
      console.warn('Failed to save quiz result', e);
    }
  },

  getResult(sessionId: string): QuizResult | null {
    try {
      const data = localStorage.getItem(`bensop_result_${sessionId}`);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  },

  getHistory(): QuizAttemptSummary[] {
    try {
      const data = localStorage.getItem(ATTEMPTS_HISTORY_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },
};
