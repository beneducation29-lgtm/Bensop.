import { LESSON_CONTENT_BLUEPRINTS, getLessonContentBlueprint } from '../data/contentBlueprints';

export const contentService = {
  getBlueprint: getLessonContentBlueprint,
  getAllBlueprints: () => LESSON_CONTENT_BLUEPRINTS,
  getByCategory: (category: string) =>
    LESSON_CONTENT_BLUEPRINTS.filter((item) => item.category === category),
  getVideoQueue: () =>
    LESSON_CONTENT_BLUEPRINTS
      .map((item) => item.aiVideo)
      .filter((video) => video.status !== 'published')
};
