import { ENGLISH_SPEAKING_ACTIVITIES } from './english';
import { CHINESE_SPEAKING_ACTIVITIES } from './chinese';
import { CONVERSATION_SCENARIOS } from './scenarios';
import { SpeakingActivity } from '../../types/speaking';

export const ALL_SPEAKING_ACTIVITIES: SpeakingActivity[] = [
  ...ENGLISH_SPEAKING_ACTIVITIES,
  ...CHINESE_SPEAKING_ACTIVITIES
];

export {
  ENGLISH_SPEAKING_ACTIVITIES,
  CHINESE_SPEAKING_ACTIVITIES,
  CONVERSATION_SCENARIOS
};
