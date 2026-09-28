import { AISpeakingMode, AISpeakingScenario } from '../types/aiSpeaking';
import { LanguageCode } from '../types/vocabulary';

export interface AISpeakingTrack {
  language: LanguageCode;
  title: string;
  description: string;
  defaultLevel: 'B1',
    levelOptions: ['A2','B1','B2','C1'],
    displayPolicy: {
    showPinyin: boolean;
    showVietnameseTranslation: boolean;
    translationLanguage: 'vi';
  };
  scenarios: AISpeakingScenario[];
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
    description: 'A real conversation lab: speak naturally, let AI react to what you just said, and keep the situation moving.',
    displayPolicy: { showPinyin: false, showVietnameseTranslation: true, translationLanguage: 'vi' },
    scenarios: [
      { id: 'en-cafe', title: 'At a café', context: 'You are ordering a drink and deciding between two options.', starter: 'Hi! Welcome. What would you like to order today?' },
      { id: 'en-school-project', title: 'School project', context: 'You and a classmate are planning a group project.', starter: 'Hey, we need to finish our project plan today. What should we do first?' },
      { id: 'en-travel', title: 'Travel problem', context: 'You are at a train station and need help with a travel problem.', starter: 'Hi, I think I may have a problem with my ticket. Could you help me?' },
      { id: 'en-job-interview', title: 'Job interview', context: 'You are answering questions in a short interview for a part-time role.', starter: 'Thanks for coming in. Could you tell me a little about yourself?' },
      { id: 'en-friends', title: 'Weekend plans', context: 'You are chatting with a friend about what to do this weekend.', starter: 'I have a free weekend. What would you like to do?' },
    ],
    modes: [
      { id: 'shadowing', title: 'Shadowing', goal: 'Nghe – bắt chước – đồng bộ nhịp nói.', promptStyle: 'Short natural English model lines followed by one focused retry.' },
      { id: 'role-play', title: 'Role Play', goal: 'Thực hành hội thoại trong tình huống đời thực.', promptStyle: 'Stay in character and advance the scene after each learner turn.' },
      { id: 'free-conversation', title: 'Free Conversation', goal: 'Duy trì hội thoại mở và phát triển ý.', promptStyle: 'React to the learner meaning first and follow one detail naturally.' },
      { id: 'interview', title: 'Interview', goal: 'Luyện trả lời có cấu trúc và diễn đạt rõ ràng.', promptStyle: 'Build a coherent interview arc instead of isolated questions.' },
      { id: 'pronunciation-coach', title: 'Pronunciation Coach', goal: 'Tập trung vào phát âm, trọng âm và connected speech.', promptStyle: 'One pronunciation target at a time; never claim audio evidence from text alone.' },
    ],
  },
  {
    language: 'zh',
    title: '中文 AI 口语房',
    description: '真实中文对话实验室：你说一句，AI 听懂后自然回应，并用下一步情景继续带你练习。',
    displayPolicy: { showPinyin: true, showVietnameseTranslation: true, translationLanguage: 'vi' },
    scenarios: [
      { id: 'zh-cafe', title: '在咖啡店', context: '你在咖啡店点饮料，并决定要哪一种。', starter: '你好，欢迎光临。你今天想喝什么？' },
      { id: 'zh-school', title: '学校小组作业', context: '你和同学一起安排一个小组作业。', starter: '我们今天要完成小组作业。你觉得先做什么？' },
      { id: 'zh-travel', title: '车站问路', context: '你在车站，需要询问路线或解决一个小问题。', starter: '你好，我好像找不到我的车次。你可以帮我看看吗？' },
      { id: 'zh-shopping', title: '买东西', context: '你在商店比较两个商品并询问价格。', starter: '你好，这两件商品有什么区别？' },
      { id: 'zh-weekend', title: '周末计划', context: '你和朋友聊天，讨论周末做什么。', starter: '这个周末你有什么计划？' },
    ],
    modes: [
      { id: 'shadowing', title: '影子跟读', goal: '听 – 模仿 – 同步语速和节奏。', promptStyle: '给出短中文示范并一次只练一个重点；每句必须有 Pinyin + 越南语。' },
      { id: 'role-play', title: '情景模拟', goal: '在真实生活场景中练习中文对话。', promptStyle: '保持角色并推进情景；每句必须有简体中文 + Pinyin + 越南语。' },
      { id: 'free-conversation', title: '自由会话', goal: '保持开放式中文交流并扩展观点。', promptStyle: '先回应学习者意思，再抓住一个细节继续；每句必须有 Pinyin + 越南语。' },
      { id: 'interview', title: '面试训练', goal: '练习结构化回答和清晰表达。', promptStyle: '逐步深入的中文面试；每句必须有 Pinyin + 越南语。' },
      { id: 'pronunciation-coach', title: '发音教练', goal: '重点训练声调、音节和语流。', promptStyle: '一次只训练一个发音目标；没有真实音频证据时不要声称判断发音。' },
    ],
  },
];
