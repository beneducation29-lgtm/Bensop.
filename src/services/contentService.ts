import { LESSON_CONTENT_BLUEPRINTS } from '../data/contentBlueprints';
import { aiVideoService } from './aiVideoService';
import { CONTENT_EXPANSION } from '../data/contentExpansion';

const ALL_BLUEPRINTS = [...LESSON_CONTENT_BLUEPRINTS, ...CONTENT_EXPANSION];
const getBlueprint = (lessonSlug: string) => ALL_BLUEPRINTS.find((item) => item.lessonSlug === lessonSlug);

export const contentService = {
  getBlueprint,
  getAllBlueprints: () => ALL_BLUEPRINTS,
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
