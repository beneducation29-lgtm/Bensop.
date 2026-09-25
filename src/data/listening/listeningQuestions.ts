import { Question } from '../../types/quiz';

export const LISTENING_QUESTIONS: Question[] = [
  {
    id: 'en-lq-01',
    categoryId: 'tieng-anh',
    subjectId: 'en-listening',
    topicId: 'Daily Life',
    skill: 'Listening',
    listeningLessonId: 'en-listen-01',
    audioSegmentId: 'seg-en-01-4',
    type: 'listening',
    difficulty: 'Elementary',
    cefrLevel: 'A2',
    question: 'What type of milk does John ask for in his iced latte?',
    instructions: 'Listen to John\'s order and select the milk option he requested.',
    options: ['Whole milk', 'Oat milk', 'Almond milk', 'Skim milk'],
    correctAnswer: 'Oat milk',
    points: 10,
    tags: ['listening', 'ordering', 'coffee', 'a2'],
    explanation: {
      general: 'John explicitly states: "Oat milk, please. And could you make it half-sweet?"',
      whyCorrect: 'Oat milk was chosen by John along with the half-sweet preference.',
      tip: 'Listen for the sentence immediately following the barista listing options.'
    },
    createdAt: '2026-03-01',
    updatedAt: '2026-03-10'
  },
  {
    id: 'en-lq-02',
    categoryId: 'tieng-anh',
    subjectId: 'en-listening',
    topicId: 'Daily Life',
    skill: 'Listening',
    listeningLessonId: 'en-listen-01',
    audioSegmentId: 'seg-en-01-6',
    type: 'multiple-choice',
    difficulty: 'Elementary',
    cefrLevel: 'A2',
    question: 'Which pastry did John decide to add to his order?',
    options: ['Chocolate croissant', 'Blueberry muffin', 'Cinnamon roll', 'Apple scone'],
    correctAnswer: 'Blueberry muffin',
    points: 10,
    tags: ['listening', 'food', 'pastry'],
    explanation: {
      general: 'The barista offered fresh blueberry muffins right out of the oven, and John agreed to add one.',
      whyCorrect: 'John said: "That sounds tempting! Let\'s add one blueberry muffin, please."'
    },
    createdAt: '2026-03-01',
    updatedAt: '2026-03-10'
  },
  {
    id: 'en-lq-03',
    categoryId: 'tieng-anh',
    subjectId: 'en-listening',
    topicId: 'Daily Life',
    skill: 'Listening',
    listeningLessonId: 'en-listen-01',
    audioSegmentId: 'seg-en-01-7',
    type: 'multiple-choice',
    difficulty: 'Elementary',
    cefrLevel: 'A2',
    question: 'How much was the total order for John\'s drink and pastry?',
    options: ['$4.50', '$5.00', '$6.50', '$7.25'],
    correctAnswer: '$6.50',
    points: 10,
    tags: ['numbers', 'currency', 'listening'],
    explanation: {
      general: 'The barista stated the total amount clearly before asking for payment method.',
      whyCorrect: 'The barista said: "That will be six dollars and fifty cents altogether."'
    },
    createdAt: '2026-03-01',
    updatedAt: '2026-03-10'
  },
  {
    id: 'en-lq-04',
    categoryId: 'tieng-anh',
    subjectId: 'en-listening',
    topicId: 'Travel',
    skill: 'Listening',
    listeningLessonId: 'en-listen-02',
    audioSegmentId: 'seg-en-02-5',
    type: 'listening',
    difficulty: 'Intermediate',
    cefrLevel: 'B1',
    question: 'How much did the passenger\'s checked suitcase weigh?',
    options: ['15 kilos', '18 kilos', '23 kilos', '25 kilos'],
    correctAnswer: '18 kilos',
    points: 10,
    tags: ['travel', 'airport', 'numbers'],
    explanation: {
      general: 'The check-in agent confirmed: "It weighs 18 kilos, well within your 23-kilo allowance."',
      whyCorrect: '18 kilograms is the exact weight measured on the scale.'
    },
    createdAt: '2026-03-01',
    updatedAt: '2026-03-10'
  },
  {
    id: 'en-lq-05',
    categoryId: 'tieng-anh',
    subjectId: 'en-listening',
    topicId: 'Travel',
    skill: 'Listening',
    listeningLessonId: 'en-listen-02',
    audioSegmentId: 'seg-en-02-9',
    type: 'multiple-choice',
    difficulty: 'Intermediate',
    cefrLevel: 'B1',
    question: 'What time does boarding start at Gate B24?',
    options: ['1:45 PM', '2:00 PM', '2:15 PM', '2:45 PM'],
    correctAnswer: '2:15 PM',
    points: 10,
    tags: ['airport', 'time', 'listening'],
    explanation: {
      general: 'The agent said: "Boarding starts at 2:15 PM sharp."',
      whyCorrect: '2:15 PM is the exact boarding time.'
    },
    createdAt: '2026-03-01',
    updatedAt: '2026-03-10'
  },
  {
    id: 'en-lq-06',
    categoryId: 'tieng-anh',
    subjectId: 'en-listening',
    topicId: 'Work',
    skill: 'Listening',
    listeningLessonId: 'en-listen-03',
    audioSegmentId: 'seg-en-03-4',
    type: 'listening',
    difficulty: 'Upper Intermediate',
    cefrLevel: 'B2',
    question: 'What technical issue will Leo and Elena investigate today?',
    options: [
      'Database password leaks',
      'Search indexing latency on large query payloads',
      'Mobile app store review rejections',
      'Broken CSS layouts on Safari'
    ],
    correctAnswer: 'Search indexing latency on large query payloads',
    points: 15,
    tags: ['tech', 'scrum', 'listening', 'b2'],
    explanation: {
      general: 'Leo mentions: "Today I\'ll collaborate with Elena on the search indexing latency."',
      whyCorrect: 'Elena also confirmed memory utilization spikes during complex filters.'
    },
    createdAt: '2026-03-01',
    updatedAt: '2026-03-10'
  },
  {
    id: 'zh-lq-01',
    categoryId: 'tieng-trung',
    subjectId: 'zh-listening',
    topicId: '饮食',
    skill: 'Listening',
    listeningLessonId: 'zh-listen-01',
    audioSegmentId: 'seg-zh-01-4',
    type: 'listening',
    difficulty: 'Elementary',
    hskLevel: 'HSK 2',
    question: '李明除了热拿铁，还要了什么食物？ (What food did Li Ming order besides the hot latte?)',
    options: ['巧克力蛋糕 (Chocolate cake)', '牛角面包 (Croissant)', '三明治 (Sandwich)', '水果沙拉 (Fruit salad)'],
    correctAnswer: '牛角面包 (Croissant)',
    points: 10,
    tags: ['点单', '饮食', '听力', 'HSK2'],
    explanation: {
      general: '李明在对话中明确说到：“不要糖，谢谢。再要一个牛角面包。”',
      whyCorrect: '李明点的是牛角面包，并要求服务员加热。'
    },
    createdAt: '2026-03-01',
    updatedAt: '2026-03-10'
  },
  {
    id: 'zh-lq-02',
    categoryId: 'tieng-trung',
    subjectId: 'zh-listening',
    topicId: '饮食',
    skill: 'Listening',
    listeningLessonId: 'zh-listen-01',
    audioSegmentId: 'seg-zh-01-10',
    type: 'multiple-choice',
    difficulty: 'Elementary',
    hskLevel: 'HSK 2',
    question: '李明用什么方式支付这三十五元？ (How does Li Ming pay the 35 yuan?)',
    options: ['现金 (Cash)', '微信支付 (WeChat Pay)', '信用卡 (Credit card)', '支付宝 (Alipay)'],
    correctAnswer: '微信支付 (WeChat Pay)',
    points: 10,
    tags: ['支付', '微信', '日常'],
    explanation: {
      general: '服务员问怎么支付，李明回答：“我扫微信。”',
      whyCorrect: '李明选择扫码微信支付。'
    },
    createdAt: '2026-03-01',
    updatedAt: '2026-03-10'
  },
  {
    id: 'zh-lq-03',
    categoryId: 'tieng-trung',
    subjectId: 'zh-listening',
    topicId: '旅行',
    skill: 'Listening',
    listeningLessonId: 'zh-listen-02',
    audioSegmentId: 'seg-zh-02-7',
    type: 'listening',
    difficulty: 'Intermediate',
    hskLevel: 'HSK 3',
    question: '张伟乘坐的航班几点开始登机？ (What time does Zhang Wei\'s flight begin boarding?)',
    options: ['下午两点 (2:00 PM)', '下午两点半 (2:30 PM)', '下午三点 (3:00 PM)', '下午三点半 (3:30 PM)'],
    correctAnswer: '下午三点 (3:00 PM)',
    points: 10,
    tags: ['机场', '时间', 'HSK3'],
    explanation: {
      general: '地勤人员交待：“在28号登机口，下午三点开始登机。”',
      whyCorrect: '下午三点是确切的登机时间。'
    },
    createdAt: '2026-03-01',
    updatedAt: '2026-03-10'
  }
];
