export type SpeakingActivityType =
  | 'read-aloud'
  | 'shadowing'
  | 'pronunciation'
  | 'repeat-after-me'
  | 'sentence-practice'
  | 'question-answer'
  | 'role-play'
  | 'free-speaking';

export type SpeakingLevel =
  | 'A1'
  | 'A2'
  | 'B1'
  | 'B2'
  | 'C1'
  | 'C2'
  | 'HSK 1'
  | 'HSK 2'
  | 'HSK 3'
  | 'HSK 4'
  | 'HSK 5'
  | 'HSK 6';

export interface WordFeedback {
  word: string;
  score: number;
  status: 'strong' | 'needs-practice' | 'difficult';
  phonetic?: string;
  note?: string;
}

export interface PronunciationEvaluation {
  word: string;
  expectedPronunciation: string;
  detectedPronunciation: string;
  score: number;
  feedback: string;
}

export interface SpeakingEvaluation {
  pronunciationScore: number;
  fluencyScore: number;
  accuracyScore: number;
  vocabularyScore: number;
  grammarScore: number;
  overallScore: number;
  feedback: string;
  detectedErrors: string[];
  suggestions: string[];
  wordFeedbacks: WordFeedback[];
  transcription?: string;
  strengths: string[];
  areasToImprove: string[];
  nextPracticeSuggestions: string[];
}

export interface SpeakingActivity {
  id: string;
  language: 'en' | 'zh';
  title: string;
  slug: string;
  type: SpeakingActivityType;
  level: SpeakingLevel;
  topic: string;
  prompt: string;
  targetText?: string;
  pinyin?: string;
  translation?: string;
  referenceAudioUrl?: string;
  vocabularyIds: string[];
  grammarIds: string[];
  expectedDuration: number; // in seconds
  evaluationCriteria: string[];
  scenario?: string;
  systemRole?: string;
  userRole?: string;
  sampleResponses?: string[];
  hints?: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface UserRecording {
  id: string;
  userId: string;
  activityId: string;
  audioUrl: string;
  blob?: Blob;
  duration: number;
  createdAt: string;
  evaluation?: SpeakingEvaluation;
}

export interface SpeakingProgress {
  userId: string;
  activityId: string;
  language: 'en' | 'zh';
  attempts: number;
  bestScore: number;
  pronunciationScore: number;
  fluencyScore: number;
  grammarScore: number;
  vocabularyScore: number;
  lastAttemptAt: string;
  completed: boolean;
}

export interface ConversationScenario {
  id: string;
  language: 'en' | 'zh';
  title: string;
  slug: string;
  level: SpeakingLevel;
  topic: string;
  context: string;
  systemRole: string;
  userRole: string;
  objectives: string[];
  starterPrompt: string;
  dialogueTurns?: {
    speaker: 'system' | 'user';
    text: string;
    translation?: string;
    pinyin?: string;
  }[];
  targetVocabulary: string[];
  targetGrammar: string[];
}

export interface LanguageSkillProfile {
  userId: string;
  language: 'en' | 'zh';
  vocabularyScore: number;
  grammarScore: number;
  listeningScore: number;
  speakingScore: number;
  lastUpdated: string;
}
