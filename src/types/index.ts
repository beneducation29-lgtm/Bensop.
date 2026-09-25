export interface Category {
  id: string;
  name: string;
  slug: string;
  englishTitle: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  number: string;
  topics: string[];
  color?: string;
}

export interface Topic {
  id: string;
  categoryId: 'tieng-trung' | 'tieng-anh' | 'phat-trien-ban-than' | 'suc-khoe-doi-song';
  name: string;
  englishName: string;
  slug: string;
  description: string;
  stats: {
    lessonsCount: number;
    itemsCount: string;
    topicsCount?: number;
  };
  featuredArticleSlugs?: string[];
  courseSlugs?: string[];
}

export interface Article {
  id: string;
  categoryId: 'tieng-trung' | 'tieng-anh' | 'phat-trien-ban-than' | 'suc-khoe-doi-song';
  categoryName: string;
  topicSlug?: string;
  title: string;
  subtitle?: string;
  slug: string;
  excerpt: string;
  content: string[];
  keyTakeaways?: string[];
  image: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  publishedAt: string;
  readingTime: string;
  views?: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  difficulty?: 'Cơ bản' | 'Trung cấp' | 'Nâng cao';
  relatedVocabIds?: string[];
  relatedGrammarIds?: string[];
  relatedLessonSlug?: string;
  relatedCourseSlug?: string;
  relatedQuizId?: string;
  relatedArticleSlugs?: string[];
  vocabularyBox?: {
    word: string;
    phonetic: string;
    meaning: string;
    example: string;
  }[];
  grammarBox?: {
    title: string;
    formula: string;
    explanation: string;
  }[];
}

export interface Course {
  id: string;
  categoryId: 'tieng-trung' | 'tieng-anh' | 'phat-trien-ban-than' | 'suc-khoe-doi-song';
  categoryName: string;
  topicSlug?: string;
  title: string;
  slug: string;
  description: string;
  level: string;
  duration: string;
  lessonsCount: number;
  image?: string;
  firstLessonSlug?: string;
  modules: {
    title: string;
    lessons: {
      title: string;
      slug: string;
      duration: string;
    }[];
  }[];
  relatedArticleSlugs?: string[];
  relatedQuizId?: string;
}

export interface Lesson {
  id: string;
  courseSlug: string;
  courseTitle: string;
  categoryId: 'tieng-trung' | 'tieng-anh' | 'phat-trien-ban-than' | 'suc-khoe-doi-song';
  categoryName: string;
  title: string;
  slug: string;
  order: number;
  totalLessonsInCourse: number;
  duration: string;
  summary: string;
  content: string[];
  keyPoints: string[];
  examples: {
    label: string;
    target: string;
    translation: string;
    note?: string;
  }[];
  exercise?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
  relatedArticleSlug?: string;
  relatedQuizId?: string;
  prevLessonSlug?: string;
  nextLessonSlug?: string;
}

export interface LearningPathLevel {
  levelNumber: string;
  title: string;
  subtitle: string;
  description: string;
  status: 'completed' | 'in-progress' | 'locked';
  courseSlugs: string[];
  lessonCount: number;
  quizCount: number;
  skills: string[];
}

export interface LearningPath {
  id: string;
  categoryId: 'tieng-trung' | 'tieng-anh' | 'phat-trien-ban-than' | 'suc-khoe-doi-song';
  categoryName: string;
  title: string;
  slug: string;
  description: string;
  estimatedHours: string;
  levels: LearningPathLevel[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  categoryId: string;
  categoryName: string;
  title: string;
  subtitle: string;
  difficulty: 'Cơ bản' | 'Trung cấp' | 'Nâng cao';
  timeLimit?: string;
  relatedCourseSlug?: string;
  relatedArticleSlug?: string;
  questions: QuizQuestion[];
}

export interface VocabularyItem {
  id: string;
  word: string;
  phonetic: string;
  meaning: string;
  example: string;
  exampleTranslation: string;
  category: string;
  level: string;
  topic?: string;
}

export interface SavedItem {
  id: string;
  type: 'article' | 'course' | 'lesson' | 'vocabulary';
  title: string;
  slug: string;
  category: string;
  savedAt: string;
  meta: string;
}

export interface UserActivity {
  id: string;
  title: string;
  type: 'lesson' | 'article' | 'quiz' | 'course';
  slug: string;
  timestamp: string;
  category: string;
}

export interface UserProgress {
  name: string;
  streakDays: number;
  lessonsCompleted: number;
  quizScore: number;
  totalTime: string;
  coursesProgress: {
    chinese: number;
    english: number;
    growth: number;
    health: number;
  };
  completedLessons: string[];
  savedItems: SavedItem[];
  recentActivity: UserActivity[];
}

export * from './listening';
export * from './speaking';
export * from './learningProgress';

