import { LESSON_CONTENT_BLUEPRINTS } from '../data/contentBlueprints';
import { aiVideoService } from './aiVideoService';
import { CONTENT_EXPANSION } from '../data/contentExpansion';

const ALL_BLUEPRINTS = [...LESSON_CONTENT_BLUEPRINTS, ...CONTENT_EXPANSION];
const getBlueprint = (lessonSlug: string) => ALL_BLUEPRINTS.find((item) => item.lessonSlug === lessonSlug);

const languageRoute = (category: string) => category === 'tieng-trung' ? 'tieng-trung' : 'tieng-anh';

const getEcosystemLinks = (lessonSlug: string) => {
  const blueprint = getBlueprint(lessonSlug);
  if (!blueprint) return [];

  const lang = languageRoute(blueprint.category);
  const links = new Map<string, { label: string; path: string; kind: 'vocabulary' | 'grammar' | 'listening' | 'speaking' | 'reading' | 'writing' | 'quiz' | 'tutor' | 'progress' | 'course' }>();

  blueprint.crossLabLinks.forEach((raw) => {
    const label = raw.split(':')[0].trim();
    const lower = raw.toLowerCase();

    if (lower.includes('vocabulary')) links.set('vocabulary', { label: 'Vocabulary Lab', path: `/${lang}/vocabulary`, kind: 'vocabulary' });
    else if (lower.includes('grammar')) links.set('grammar', { label: 'Grammar Lab', path: `/${lang}/grammar`, kind: 'grammar' });
    else if (lower.includes('listening')) links.set('listening', { label: 'Listening Lab', path: `/${lang}/listening`, kind: 'listening' });
    else if (lower.includes('speaking') || lower.includes('pronunciation')) links.set('speaking', { label: 'Speaking Lab', path: `/${lang}/speaking`, kind: 'speaking' });
    else if (lower.includes('reading')) links.set('reading', { label: 'Reading Lab', path: `/${lang}/reading`, kind: 'reading' });
    else if (lower.includes('writing')) links.set('writing', { label: 'Writing Lab', path: `/${lang}/writing`, kind: 'writing' });
    else if (lower.includes('quiz') || lower.includes('question bank')) links.set('quiz', { label: 'Question Bank & Quiz', path: '/ngan-hang-cau-hoi', kind: 'quiz' });
    else if (lower.includes('ai tutor')) links.set('tutor', { label: 'AI Tutor', path: '/ai-tutor', kind: 'tutor' });
    else if (lower.includes('progress') || lower.includes('dashboard') || lower.includes('daily learning')) links.set('progress', { label: 'Dashboard học tập', path: '/dashboard', kind: 'progress' });
  });

  links.set('course', { label: 'Tiếp tục khóa học', path: `/khoa-hoc/${(LESSON_COURSE_SLUGS[lessonSlug] || '')}`, kind: 'course' });
  return Array.from(links.values()).filter((link) => link.path !== '/khoa-hoc/');
};

const LESSON_COURSE_SLUGS: Record<string, string> = {};

export const contentService = {
  getBlueprint,
  getAllBlueprints: () => ALL_BLUEPRINTS,
  getEcosystemLinks,
  getByCategory: (category: string) =>
    ALL_BLUEPRINTS.filter((item) => item.category === category),
  getVideoQueue: () =>
    ALL_BLUEPRINTS
      .map((item) => item.aiVideo)
      .filter((video) => video.status !== 'published'),
  getProductionManifest: (lessonSlug: string) => {
    const blueprint = getBlueprint(lessonSlug);
    return blueprint ? aiVideoService.buildManifest(blueprint.aiVideo) : undefined;
  }
};
