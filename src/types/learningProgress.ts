import { LanguageCode, MasteryStatus, VocabularyWord } from './vocabulary';
import { GrammarConcept } from './grammar';
import { ListeningLesson } from './listening';
import { SpeakingActivity } from './speaking';

export interface DailyLearningSession {
  date: string;
  newWords: VocabularyWord[];
  grammarConcept: GrammarConcept;
  practiceQuestionCount: number;
  reviewWordCount: number;
  listeningLesson?: ListeningLesson;
  speakingActivity?: SpeakingActivity;
  completedTasks?: {
    words: boolean;
    grammar: boolean;
    quiz: boolean;
    listening: boolean;
    speaking: boolean;
  };
  isCompleted: boolean;
}

export interface LanguageProgressSummary {
  language: LanguageCode;
  vocabulary: {
    seen: number;
    learning: number;
    learned: number;
    mastered: number;
    reviewNeeded: number;
    total: number;
    accuracy: number;
  };
  grammar: {
    viewed: number;
    practiced: number;
    strong: number;
    mastered: number;
    needsPractice: number;
    total: number;
    accuracy: number;
  };
  listening?: {
    completedLessons: number;
    totalLessons: number;
    totalMinutes: number;
    accuracy: number;
  };
  speaking?: {
    completedActivities: number;
    totalActivities: number;
    overallScore: number;
    pronunciationScore: number;
    fluencyScore: number;
  };
}

export function calculateMasteryStatus(score: number): MasteryStatus {
  if (score >= 90) return 'MASTERED';
  if (score >= 70) return 'STRONG';
  if (score >= 50) return 'FAMILIAR';
  if (score >= 20) return 'LEARNING';
  return 'NEW';
}

export function calculateNewMasteryScore(
  currentScore: number,
  isCorrect: boolean,
  usedHint: boolean = false
): number {
  let delta = 0;
  if (isCorrect) {
    delta = usedHint ? 5 : 10;
  } else {
    delta = -6;
  }
  const next = Math.max(0, Math.min(100, currentScore + delta));
  return next;
}
