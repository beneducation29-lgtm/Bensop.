import { Question, QuizModel, QuizResult, QuestionBreakdown } from '../../types/quiz';

/**
 * Normalizes text for fill-in-the-blank and translation comparisons
 */
export function normalizeText(text: string): string {
  if (!text) return '';
  return text
    .toLowerCase()
    .trim()
    .replace(/[.,/#!$%^&*;:{}=\-_`~()?"'’]/g, '')
    .replace(/\s+/g, ' ');
}

/**
 * Evaluates whether a user's answer is correct for a specific question type
 */
export function evaluateAnswer(question: Question, userAnswer: any): { isCorrect: boolean; isPartial?: boolean } {
  if (userAnswer === undefined || userAnswer === null || userAnswer === '') {
    return { isCorrect: false };
  }

  switch (question.type) {
    case 'multiple-choice':
    case 'listening':
    case 'image-choice': {
      const isCorrect = String(userAnswer).trim().toLowerCase() === String(question.correctAnswer).trim().toLowerCase();
      return { isCorrect };
    }

    case 'true-false': {
      const isCorrect = Boolean(userAnswer) === Boolean(question.correctAnswer);
      return { isCorrect };
    }

    case 'multiple-select': {
      if (!Array.isArray(userAnswer)) return { isCorrect: false };
      const correctArr = Array.isArray(question.correctAnswer) ? question.correctAnswer : [question.correctAnswer];
      const userNorm = userAnswer.map((a: any) => String(a).trim().toLowerCase()).sort();
      const correctNorm = correctArr.map((a: any) => String(a).trim().toLowerCase()).sort();
      
      const isExact = userNorm.length === correctNorm.length && userNorm.every((val: string, index: number) => val === correctNorm[index]);
      const matchedCount = userNorm.filter((val: string) => correctNorm.includes(val)).length;
      const isPartial = !isExact && matchedCount > 0 && userNorm.length <= correctNorm.length;
      
      return { isCorrect: isExact, isPartial };
    }

    case 'fill-blank': {
      const userNorm = normalizeText(String(userAnswer));
      if (Array.isArray(question.correctAnswer)) {
        const isCorrect = question.correctAnswer.some((ans: string) => normalizeText(ans) === userNorm);
        return { isCorrect };
      }
      return { isCorrect: normalizeText(String(question.correctAnswer)) === userNorm };
    }

    case 'translation': {
      const userNorm = normalizeText(String(userAnswer));
      const acceptable = question.translationPrompt?.acceptableAnswers || [];
      const isCorrect = acceptable.some((ans) => normalizeText(ans) === userNorm) || normalizeText(String(question.correctAnswer)) === userNorm;
      return { isCorrect };
    }

    case 'matching': {
      if (!Array.isArray(userAnswer) || !question.matchingPairs) return { isCorrect: false };
      let correctMatches = 0;
      question.matchingPairs.forEach((pair) => {
        const userMatch = userAnswer.find((u: any) => u.left === pair.left);
        if (userMatch && userMatch.right === pair.right) {
          correctMatches++;
        }
      });
      const isExact = correctMatches === question.matchingPairs.length;
      const isPartial = !isExact && correctMatches > 0;
      return { isCorrect: isExact, isPartial };
    }

    case 'ordering': {
      if (!Array.isArray(userAnswer) || !question.orderingItems) return { isCorrect: false };
      const isCorrect = userAnswer.length === question.orderingItems.length &&
        userAnswer.every((val: string, idx: number) => val === question.orderingItems![idx]);
      return { isCorrect };
    }

    case 'sentence-correction': {
      if (question.sentenceToCorrect) {
        const isCorrect = Number(userAnswer) === question.sentenceToCorrect.errorSegmentIndex;
        return { isCorrect };
      }
      return { isCorrect: String(userAnswer) === String(question.correctAnswer) };
    }

    default:
      return { isCorrect: String(userAnswer) === String(question.correctAnswer) };
  }
}

/**
 * Calculates complete quiz result with granular breakdowns
 */
export function calculateQuizResult(
  questions: Question[],
  answers: Record<string, any>,
  quiz: {
    id: string;
    title: string;
    slug: string;
    categoryId: string;
    categoryName: string;
    passingScore?: number;
  },
  timeSpent: number,
  sessionId: string
): QuizResult {
  let correctCount = 0;
  let wrongCount = 0;
  let unansweredCount = 0;
  let totalPoints = 0;
  let earnedPoints = 0;

  const skillMap: Record<string, { total: number; correct: number }> = {};
  const topicMap: Record<string, { total: number; correct: number }> = {};
  const difficultyMap: Record<string, { total: number; correct: number }> = {};
  const wrongQuestionIds: string[] = [];
  const questionBreakdowns: QuestionBreakdown[] = [];

  questions.forEach((q) => {
    const points = q.points || 10;
    totalPoints += points;

    // Initialize breakdowns
    const skill = q.skill || 'General';
    const topic = q.topicId || 'General';
    const diff = q.difficulty || 'Intermediate';

    if (!skillMap[skill]) skillMap[skill] = { total: 0, correct: 0 };
    if (!topicMap[topic]) topicMap[topic] = { total: 0, correct: 0 };
    if (!difficultyMap[diff]) difficultyMap[diff] = { total: 0, correct: 0 };

    skillMap[skill].total += 1;
    topicMap[topic].total += 1;
    difficultyMap[diff].total += 1;

    const userAnswer = answers[q.id];
    const isAnswered = userAnswer !== undefined && userAnswer !== null && userAnswer !== '';

    if (!isAnswered) {
      unansweredCount++;
      wrongQuestionIds.push(q.id);
      questionBreakdowns.push({
        questionId: q.id,
        question: q,
        userAnswer: null,
        isCorrect: false,
        earnedPoints: 0,
        possiblePoints: points,
        explanation: q.explanation,
      });
      return;
    }

    const { isCorrect, isPartial } = evaluateAnswer(q, userAnswer);

    if (isCorrect) {
      correctCount++;
      earnedPoints += points;
      skillMap[skill].correct += 1;
      topicMap[topic].correct += 1;
      difficultyMap[diff].correct += 1;
    } else {
      wrongCount++;
      wrongQuestionIds.push(q.id);
      if (isPartial) {
        earnedPoints += Math.floor(points / 2);
      }
    }

    questionBreakdowns.push({
      questionId: q.id,
      question: q,
      userAnswer,
      isCorrect,
      isPartiallyCorrect: isPartial,
      earnedPoints: isCorrect ? points : isPartial ? Math.floor(points / 2) : 0,
      possiblePoints: points,
      explanation: q.explanation,
    });
  });

  const totalQuestions = questions.length;
  const answeredCount = totalQuestions - unansweredCount;
  const accuracy = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
  const score = totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0;
  const passingScore = quiz.passingScore ?? 70;
  const passed = score >= passingScore;

  // Format breakdowns to include percentage
  const skillBreakdown: Record<string, { total: number; correct: number; percentage: number }> = {};
  Object.keys(skillMap).forEach((k) => {
    const s = skillMap[k];
    skillBreakdown[k] = { ...s, percentage: s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0 };
  });

  const topicBreakdown: Record<string, { total: number; correct: number; percentage: number }> = {};
  Object.keys(topicMap).forEach((k) => {
    const t = topicMap[k];
    topicBreakdown[k] = { ...t, percentage: t.total > 0 ? Math.round((t.correct / t.total) * 100) : 0 };
  });

  const difficultyBreakdown: Record<string, { total: number; correct: number; percentage: number }> = {};
  Object.keys(difficultyMap).forEach((k) => {
    const d = difficultyMap[k];
    difficultyBreakdown[k] = { ...d, percentage: d.total > 0 ? Math.round((d.correct / d.total) * 100) : 0 };
  });

  return {
    sessionId,
    quizId: quiz.id,
    quizTitle: quiz.title,
    quizSlug: quiz.slug,
    categoryId: quiz.categoryId,
    categoryName: quiz.categoryName,
    totalQuestions,
    answeredCount,
    unansweredCount,
    correctCount,
    wrongCount,
    markedCount: 0,
    totalPoints,
    earnedPoints,
    score,
    accuracy,
    passed,
    timeSpent,
    completedAt: new Date().toISOString(),
    skillBreakdown,
    topicBreakdown,
    difficultyBreakdown,
    questionBreakdowns,
    wrongQuestionIds,
  };
}
