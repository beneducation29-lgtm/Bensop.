export type ContentCategory = 'tieng-trung' | 'tieng-anh' | 'phat-trien-ban-than' | 'suc-khoe-doi-song';

export interface ContentSource {
  title: string;
  publisher: string;
  url: string;
  usage: 'framework' | 'fact-check' | 'teaching-method' | 'inspiration';
}

export interface VideoScene {
  id: string;
  durationSeconds: number;
  visual: string;
  narration: string;
  onScreen: string[];
  interaction?: string;
}

export interface AIVideoLesson {
  id: string;
  title: string;
  format: 'explainer' | 'scenario' | 'whiteboard' | 'visual-dialogue';
  targetMinutes: number;
  voiceLanguage: 'vi' | 'en' | 'zh';
  status: 'script-ready' | 'production' | 'published';
  videoUrl?: string;
  thumbnailUrl?: string;
  scenes: VideoScene[];
}

export interface ContentEcosystemLink {
  label: string;
  path: string;
  kind: 'vocabulary' | 'grammar' | 'listening' | 'speaking' | 'reading' | 'writing' | 'quiz' | 'tutor' | 'progress' | 'course';
}

export interface LessonContentBlueprint {
  lessonSlug: string;
  title?: string;
  category: ContentCategory;
  learningObjective: string[];
  prerequisite?: string[];
  hook: string;
  misconception: string;
  coreIdea: string;
  practicalChallenge: string;
  spacedReview: string[];
  crossLabLinks: string[];
  sources: ContentSource[];
  aiVideo: AIVideoLesson;
}


export interface SpacedReviewItem {
  id: string;
  lessonSlug: string;
  intervalDays: 1 | 3 | 7;
  scheduledAt: string;
  dueAt: string;
  completedAt?: string;
}
