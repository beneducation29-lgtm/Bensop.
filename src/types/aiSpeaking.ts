import { LanguageCode } from './vocabulary';

export type AISpeakingMode =
  | 'shadowing'
  | 'role-play'
  | 'free-conversation'
  | 'interview'
  | 'pronunciation-coach';

/**
 * Display layer for speaking turns.
 * Chinese turns intentionally carry Pinyin + Vietnamese translation so learners
 * can understand the line before/after speaking without switching tracks.
 */
export interface AISpeakingTurnDisplay {
  /** Original utterance in the active learning language. */
  text: string;
  /** Required for Chinese AI turns; omitted for English. */
  pinyin?: string;
  /** Vietnamese support translation; required for Chinese AI turns. */
  vietnameseTranslation?: string;
}

export interface AISpeakingTurn {
  id: string;
  role: 'learner' | 'ai';
  text: string;
  createdAt: string;
  audioUrl?: string;
  display?: AISpeakingTurnDisplay;
  feedback?: AISpeakingTurnFeedback;
}

export interface AISpeakingTurnFeedback {
  pronunciation?: number;
  fluency?: number;
  grammar?: number;
  vocabulary?: number;
  relevance?: number;
  note: string;
  corrections?: Array<{
    original: string;
    improved: string;
    explanation: string;
  }>;
}

export interface AISpeakingSession {
  id: string;
  language: LanguageCode;
  mode: AISpeakingMode;
  level: string;
  topic: string;
  scenario?: string;
  conversationMemory?: AISpeakingConversationMemory;
  startedAt: string;
  turns: AISpeakingTurn[];
  status: 'ready' | 'active' | 'completed';
}

export interface AISpeakingConversationMemory {
  topicFocus?: string;
  scenarioState?: string;
  learnerGoal?: string;
  recentPreferences?: string[];
  usedPrompts?: string[];
  usefulCorrections?: string[];
  lastLearnerIntent?: string;
  stage?: string;
  openThread?: string;
  learnerDetails?: string[];
  conversationMove?: 'follow-thread'|'clarify'|'deepen'|'challenge'|'offer-choice'|'transition';
}

export interface AISpeakingPerformanceSnapshot {
  fluency?: number;
  grammar?: number;
  vocabulary?: number;
  relevance?: number;
  average?: number;
  trend?: 'improving'|'stable'|'struggling';
}

export interface AISpeakingRoomContext {
  language: LanguageCode;
  level: string;
  mode: AISpeakingMode;
  topic?: string;
  scenario?: string;
  learnerGoal?: string;
  performanceSnapshot?: AISpeakingPerformanceSnapshot;
}

export interface AISpeakingReply {
  text: string;
  /** Pinyin is populated for Chinese AI replies. */
  pinyin?: string;
  /** Vietnamese translation is populated for Chinese AI replies. */
  vietnameseTranslation?: string;
  nextPrompt?: string;
  feedback?: AISpeakingTurnFeedback;
  suggestedModes?: AISpeakingMode[];
  conversationMemory?: AISpeakingConversationMemory;
}
