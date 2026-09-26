import { QuizResult } from '../types/quiz';
import { MasteryRecord, MasterySnapshot } from '../types/mastery';

const STORAGE_KEY = 'bensop_mastery';

const emptySnapshot = (): MasterySnapshot => ({
  overall: 0,
  skills: [],
  topics: [],
  questions: [],
  updatedAt: new Date().toISOString(),
});

const read = (): MasterySnapshot => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptySnapshot();
    const parsed = JSON.parse(raw) as MasterySnapshot;
    return {
      overall: Number(parsed.overall) || 0,
      skills: Array.isArray(parsed.skills) ? parsed.skills : [],
      topics: Array.isArray(parsed.topics) ? parsed.topics : [],
      questions: Array.isArray(parsed.questions) ? parsed.questions : [],
      updatedAt: parsed.updatedAt || new Date().toISOString(),
    };
  } catch {
    return emptySnapshot();
  }
};

const write = (snapshot: MasterySnapshot) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  } catch {
    // Learning should remain usable if storage is unavailable.
  }
};

const upsert = (
  records: MasteryRecord[],
  input: Omit<MasteryRecord, 'mastery' | 'attempts' | 'correct' | 'lastScore' | 'lastAttemptAt' | 'trend'>,
  score: number,
  correct: number,
  attempted: number,
): MasteryRecord[] => {
  const index = records.findIndex((item) => item.id === input.id);
  const previous = index >= 0 ? records[index] : undefined;
  const previousMastery = previous?.mastery ?? 0;
  const previousAttempts = previous?.attempts ?? 0;
  const previousCorrect = previous?.correct ?? 0;

  // Give recent evidence more weight while retaining prior learning history.
  const mastery = previous
    ? Math.round(previousMastery * 0.6 + score * 0.4)
    : Math.round(score);
  const trend = mastery > previousMastery ? 'up' : mastery < previousMastery ? 'down' : 'stable';

  const next: MasteryRecord = {
    ...input,
    mastery: Math.max(0, Math.min(100, mastery)),
    attempts: previousAttempts + attempted,
    correct: previousCorrect + correct,
    lastScore: score,
    lastAttemptAt: new Date().toISOString(),
    trend,
  };

  if (index < 0) return [...records, next];
  const clone = [...records];
  clone[index] = next;
  return clone;
};

export const masteryService = {
  getSnapshot(): MasterySnapshot {
    return read();
  },

  recordQuizResult(result: QuizResult): MasterySnapshot {
    const snapshot = read();

    Object.entries(result.skillBreakdown).forEach(([skill, stat]) => {
      snapshot.skills = upsert(
        snapshot.skills,
        {
          id: `skill:${result.categoryId}:${skill}`,
          entityType: 'skill',
          entityId: skill,
          label: skill,
          categoryId: result.categoryId,
          skill: skill as MasteryRecord['skill'],
        },
        stat.percentage,
        stat.correct,
        stat.total,
      );
    });

    Object.entries(result.topicBreakdown).forEach(([topic, stat]) => {
      snapshot.topics = upsert(
        snapshot.topics,
        {
          id: `topic:${result.categoryId}:${topic}`,
          entityType: 'topic',
          entityId: topic,
          label: topic,
          categoryId: result.categoryId,
        },
        stat.percentage,
        stat.correct,
        stat.total,
      );
    });

    result.questionBreakdowns.forEach((item) => {
      const question = item.question;
      const score = item.possiblePoints > 0
        ? Math.round((item.earnedPoints / item.possiblePoints) * 100)
        : 0;

      snapshot.questions = upsert(
        snapshot.questions,
        {
          id: `question:${question.id}`,
          entityType: 'question',
          entityId: question.id,
          label: question.question,
          categoryId: question.categoryId,
          skill: question.skill,
        },
        score,
        item.isCorrect ? 1 : 0,
        1,
      );
    });

    const allSkills = snapshot.skills;
    snapshot.overall = allSkills.length
      ? Math.round(allSkills.reduce((sum, item) => sum + item.mastery, 0) / allSkills.length)
      : result.accuracy;
    snapshot.updatedAt = new Date().toISOString();
    write(snapshot);
    return snapshot;
  },

  getWeakAreas(limit = 5): MasteryRecord[] {
    return read().topics
      .filter((item) => item.mastery < 80)
      .sort((a, b) => a.mastery - b.mastery)
      .slice(0, limit);
  },
};
