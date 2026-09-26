import { LESSON_CONTENT_BLUEPRINTS, getLessonContentBlueprint } from '../data/contentBlueprints';
import { aiVideoService } from './aiVideoService';

export const contentService = {
  getBlueprint: getLessonContentBlueprint,
  getAllBlueprints: () => LESSON_CONTENT_BLUEPRINTS,
  getByCategory: (category: string) =>
    LESSON_CONTENT_BLUEPRINTS.filter((item) => item.category === category),
  getVideoQueue: () =>
    LESSON_CONTENT_BLUEPRINTS
      .map((item) => item.aiVideo)
      .filter((video) => video.status !== 'published'),
  getProductionManifest: (lessonSlug: string) => {
    const blueprint = getLessonContentBlueprint(lessonSlug);
    return blueprint ? aiVideoService.buildManifest(blueprint.aiVideo) : undefined;
  }
};
