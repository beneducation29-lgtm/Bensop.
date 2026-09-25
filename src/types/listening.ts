export type ListeningLevel =
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

export type ListeningDifficulty =
  | 'Beginner'
  | 'Elementary'
  | 'Intermediate'
  | 'Upper Intermediate'
  | 'Advanced';

export interface TranscriptSegment {
  id: string;
  startTime: number; // in seconds, e.g. 4.2
  endTime: number; // in seconds, e.g. 8.5
  speaker: string; // e.g. "ANNA", "JOHN", "LI MING"
  text: string;
  translation?: string; // Vietnamese translation
  pinyin?: string; // Pinyin transcription for Chinese
}

export interface ListeningLesson {
  id: string;
  language: 'en' | 'zh';
  title: string;
  slug: string;
  level: ListeningLevel;
  topic: string;
  duration: number; // in seconds, e.g. 134 (02:14)
  transcript: string;
  transcriptSegments: TranscriptSegment[];
  audioUrl?: string; // audio file or placeholder synthesized stream
  thumbnail?: string;
  vocabularyIds: string[];
  grammarIds: string[];
  questionIds: string[];
  courseId?: string;
  lessonId?: string;
  difficulty: ListeningDifficulty;
  tags: string[];
  comprehensionPoints?: string[];
  culturalNote?: string;
  createdAt: string;
  updatedAt: string;
}

export type ListeningPracticeMode =
  | 'understand'
  | 'choose'
  | 'fill'
  | 'type'
  | 'dictation'
  | 'shadowing';

export interface FillBlankItem {
  id: string;
  segmentId: string;
  prefix: string;
  blank: string;
  suffix: string;
  hint?: string;
}

export interface DictationEvaluation {
  wordAccuracy: number;
  grammarAccuracy: number;
  spellingAccuracy: number;
  overallAccuracy: number;
  diff: {
    word: string;
    expected?: string;
    status: 'correct' | 'incorrect' | 'missing' | 'extra';
  }[];
}

export interface ListeningProgress {
  userId: string;
  listeningLessonId: string;
  language: 'en' | 'zh';
  completed: boolean;
  attempts: number;
  accuracy: number;
  bestScore: number;
  timeSpent: number; // seconds
  lastAttemptAt: string;
  completedAt?: string;
}

export interface ListeningResult {
  lessonId: string;
  score: number;
  accuracy: number;
  totalQuestions: number;
  correctQuestions: number;
  timeSpent: number;
  wordsUnderstood: number;
  comprehensionAccuracy: number;
  dictationAccuracy?: number;
  recommendedPractice: string[];
  breakdown: {
    comprehension: number;
    vocabulary: number;
    grammar: number;
    dictation?: number;
  };
}
