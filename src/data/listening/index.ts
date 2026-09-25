import { ENGLISH_LISTENING_LESSONS } from './english';
import { CHINESE_LISTENING_LESSONS } from './chinese';
import { ListeningLesson } from '../../types/listening';

export const ALL_LISTENING_LESSONS: ListeningLesson[] = [
  ...ENGLISH_LISTENING_LESSONS,
  ...CHINESE_LISTENING_LESSONS
];

export { ENGLISH_LISTENING_LESSONS, CHINESE_LISTENING_LESSONS };
