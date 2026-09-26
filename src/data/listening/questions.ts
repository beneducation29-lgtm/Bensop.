export interface ListeningQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
}

export const LISTENING_QUESTIONS: ListeningQuestion[] = [
  {
    id: 'en-lq-01',
    question: 'What drink does John order?',
    options: ['Hot coffee', 'Medium iced latte', 'Tea', 'Orange juice'],
    correctAnswer: 'Medium iced latte',
    explanation: 'John asks for a medium iced latte.'
  },
  {
    id: 'en-lq-02',
    question: 'Which type of milk does John choose?',
    options: ['Whole milk', 'Skim milk', 'Oat milk', 'Almond milk'],
    correctAnswer: 'Oat milk',
    explanation: 'John chooses oat milk and asks for it half-sweet.'
  },
  {
    id: 'en-lq-03',
    question: 'How much is John’s order altogether?',
    options: ['$4.50', '$5.50', '$6.50', '$7.50'],
    correctAnswer: '$6.50',
    explanation: 'The barista says the total is six dollars and fifty cents.'
  },
  {
    id: 'en-lq-04',
    question: 'Where is the passenger flying?',
    options: ['Seoul', 'Tokyo', 'Singapore', 'London'],
    correctAnswer: 'Tokyo',
    explanation: 'The passenger is flying to Tokyo on flight NH892.'
  },
  {
    id: 'en-lq-05',
    question: 'Which gate is the passenger departing from?',
    options: ['A12', 'B14', 'B24', 'C24'],
    correctAnswer: 'B24',
    explanation: 'The agent says the passenger is departing from Gate B24.'
  },
  {
    id: 'en-lq-06',
    question: 'What issue is the team investigating?',
    options: ['Email delivery', 'Search indexing latency', 'User authentication', 'Database backups'],
    correctAnswer: 'Search indexing latency',
    explanation: 'Leo says he will collaborate with Elena on search indexing latency.'
  },
  {
    id: 'zh-lq-01',
    question: '小王昨天去了哪里？',
    options: ['图书馆', '超市', '公园', '医院'],
    correctAnswer: '图书馆',
    explanation: '听力内容中提到小王昨天去了图书馆。'
  },
  {
    id: 'zh-lq-02',
    question: '他为什么去那里？',
    options: ['买东西', '学习', '看电影', '看医生'],
    correctAnswer: '学习',
    explanation: '他去图书馆是为了学习。'
  },
  {
    id: 'zh-lq-03',
    question: '他打算什么时候回家？',
    options: ['中午', '下午', '晚上', '明天'],
    correctAnswer: '晚上',
    explanation: '内容中提到他计划晚上回家。'
  }
];
