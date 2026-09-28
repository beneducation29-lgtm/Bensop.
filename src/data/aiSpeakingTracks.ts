import { AISpeakingMode } from '../types/aiSpeaking';
import { LanguageCode } from '../types/vocabulary';

export interface AISpeakingTrack {
  language: LanguageCode;
  title: string;
  description: string;
  displayPolicy: {
    showPinyin: boolean;
    showVietnameseTranslation: boolean;
    translationLanguage: 'vi';
  };
  modes: Array<{
    id: AISpeakingMode;
    title: string;
    goal: string;
    promptStyle: string;
  }>;
}

export const AI_SPEAKING_TRACKS: AISpeakingTrack[] = [
  {
    language: 'en',
    title: 'English AI Speaking Room',
    description: 'Luyện nói tiếng Anh theo tình huống, phản xạ và mục tiêu giao tiếp.',
    displayPolicy: { showPinyin: false, showVietnameseTranslation: true, translationLanguage: 'vi' },
    modes: [
      { id: 'shadowing', title: 'Shadowing', goal: 'Nghe – bắt chước – đồng bộ nhịp nói.', promptStyle: 'Natural English at the learner level.' },
      { id: 'role-play', title: 'Role Play', goal: 'Thực hành hội thoại trong tình huống đời thực.', promptStyle: 'Realistic English dialogue with concise turns.' },
      { id: 'free-conversation', title: 'Free Conversation', goal: 'Duy trì hội thoại mở và phát triển ý.', promptStyle: 'Supportive conversational English with follow-up questions.' },
      { id: 'interview', title: 'Interview', goal: 'Luyện trả lời có cấu trúc và diễn đạt rõ ràng.', promptStyle: 'Structured English interview questions.' },
      { id: 'pronunciation-coach', title: 'Pronunciation Coach', goal: 'Tập trung vào phát âm, trọng âm và connected speech.', promptStyle: 'Short English utterances with targeted pronunciation feedback.' },
    ],
  },
  {
    language: 'zh',
    title: '中文 AI 口语房',
    description: '练习中文会话、情景表达、语音语调和自然反应。',
    displayPolicy: {
      showPinyin: true,
      showVietnameseTranslation: true,
      translationLanguage: 'vi',
    },
    modes: [
      { id: 'shadowing', title: '影子跟读', goal: '听 – 模仿 – 同步语速和节奏。', promptStyle: 'Natural Mandarin at the learner level. Every AI line must include Simplified Chinese + Pinyin + Vietnamese translation.' },
      { id: 'role-play', title: '情景模拟', goal: '在真实生活场景中练习中文对话。', promptStyle: 'Realistic Mandarin dialogue with concise turns. Every AI line must include Simplified Chinese + Pinyin + Vietnamese translation.' },
      { id: 'free-conversation', title: '自由会话', goal: '保持开放式中文交流并扩展观点。', promptStyle: 'Supportive Mandarin conversation with follow-up questions. Every AI line must include Simplified Chinese + Pinyin + Vietnamese translation.' },
      { id: 'interview', title: '面试训练', goal: '练习结构化回答和清晰表达。', promptStyle: 'Structured Mandarin interview questions. Every AI line must include Simplified Chinese + Pinyin + Vietnamese translation.' },
      { id: 'pronunciation-coach', title: '发音教练', goal: '重点训练声调、音节和语流。', promptStyle: 'Short Mandarin utterances with targeted pronunciation feedback. Every AI line must include Simplified Chinese + Pinyin + Vietnamese translation.' },
    ],
  },
];
