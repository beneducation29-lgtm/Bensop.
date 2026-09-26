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
    question: '李明想喝什么？',
    options: ['中杯热拿铁', '冰咖啡', '绿茶', '果汁'],
    correctAnswer: '中杯热拿铁',
    explanation: '李明明确说：“请给我一杯中杯热拿铁。”'
  },
  {
    id: 'zh-lq-02',
    question: '李明的牛角面包需要怎么处理？',
    options: ['不用加热', '加热一下', '切成两半', '带走再加热'],
    correctAnswer: '加热一下',
    explanation: '服务员询问后，李明回答：“请加热一下，谢谢。”'
  },
  {
    id: 'zh-lq-03',
    question: '张伟的航班飞往哪里？',
    options: ['北京', '上海', '广州', '深圳'],
    correctAnswer: '上海',
    explanation: '张伟说自己乘坐飞往上海的 MU5186 次航班。'
  },
  {
    id: 'zh-lq-04',
    question: '张伟的行李有多重？',
    options: ['12公斤', '16公斤', '20公斤', '23公斤'],
    correctAnswer: '16公斤',
    explanation: '地勤人员说行李重十六公斤，没有超重。'
  },
  {
    id: 'zh-lq-05',
    question: '新的统计口径让次月留存率发生了什么变化？',
    options: ['下降5%', '上升5%', '上升10%', '没有变化'],
    correctAnswer: '上升5%',
    explanation: '王芳提到次月留存率上升了百分之五。'
  },
  {
    id: 'zh-lq-06',
    question: '产品团队做了什么来改善用户留存？',
    options: ['降低价格', '更换服务器', '优化新手引导并推送专属权益', '关闭新功能'],
    correctAnswer: '优化新手引导并推送专属权益',
    explanation: '陈明解释，团队优化了新手引导流程，并针对活跃用户推送专属权益。'
  },
  {
    id: 'zh-lq-07',
    question: '两斤西红柿多少钱？',
    options: ['3.5元', '5元', '7元', '10元'],
    correctAnswer: '7元',
    explanation: '西红柿每斤三块五，两斤正好七块钱。'
  },
  {
    id: 'zh-lq-08',
    question: '三根黄瓜多少钱？',
    options: ['2元', '3元', '5元', '6元'],
    correctAnswer: '3元',
    explanation: '摊主最后说明三根黄瓜三块钱。'
  },
  {
    id: 'zh-lq-09',
    question: '从现在到外滩和平饭店大约需要多久？',
    options: ['20分钟', '30分钟', '40分钟', '60分钟'],
    correctAnswer: '40分钟',
    explanation: '司机说晚高峰路况下差不多需要四十分钟。'
  },
  {
    id: 'zh-lq-10',
    question: '乘客为什么比较在意时间？',
    options: ['要赶飞机', '要去医院', '七点半和朋友约了吃晚饭', '要去上班'],
    correctAnswer: '七点半和朋友约了吃晚饭',
    explanation: '乘客说自己和朋友约了七点半吃晚饭。'
  },
  {
    id: 'zh-lq-11',
    question: '患者的体温是多少？',
    options: ['36.8度', '37.2度', '37.8度', '38.8度'],
    correctAnswer: '37.8度',
    explanation: '患者说量体温是三十七度八。'
  },
  {
    id: 'zh-lq-12',
    question: '化验报告预计什么时候可以打印？',
    options: ['五分钟后', '二十分钟后', '一小时后', '第二天'],
    correctAnswer: '二十分钟后',
    explanation: '医生说抽血后二十分钟可以在自助机上打印报告。'
  },
  {
    id: 'zh-lq-13',
    question: '租客每月需要为宽带分摊多少钱？',
    options: ['30元', '50元', '80元', '100元'],
    correctAnswer: '50元',
    explanation: '房东说明宽带费用每个月分摊五十块钱。'
  },
  {
    id: 'zh-lq-14',
    question: '非人为损坏的大电器由谁负责维修？',
    options: ['租客', '房东', '物业公司', '维修平台'],
    correctAnswer: '房东',
    explanation: '房东明确表示非人为损坏情况下，大电器维修费用由她承担。'
  },
  {
    id: 'zh-lq-15',
    question: '小明和小雨准备什么时候集合？',
    options: ['周五晚上', '周六早上七点', '周六中午', '周日下午'],
    correctAnswer: '周六早上七点',
    explanation: '小明提议周六早上七点在地铁站集合。'
  },
  {
    id: 'zh-lq-16',
    question: '小明负责带什么？',
    options: ['水果和零食', '两瓶矿泉水', '雨伞和地图', '早餐'],
    correctAnswer: '水果和零食',
    explanation: '小雨说自己负责带水果和零食，而让小明带两瓶矿泉水。'
  },
  {
    id: 'zh-lq-17',
    question: '教授的研讨课要求哪项先修基础？',
    options: ['英语写作', '离散数学、高等概率统计和Python', '经济学', '物理学'],
    correctAnswer: '离散数学、高等概率统计和Python',
    explanation: '教授列出了离散数学、高等概率统计和扎实的Python编程基础。'
  },
  {
    id: 'zh-lq-18',
    question: '课程期末需要完成什么？',
    options: ['个人演讲', '闭卷考试', '多模态深度学习开源实验项目', '阅读报告'],
    correctAnswer: '多模态深度学习开源实验项目',
    explanation: '教授说期末需要分组完成一个关于多模态深度学习的开源实验项目。'
  },
  {
    id: 'zh-lq-19',
    question: '今年春晚几点开始？',
    options: ['六点', '七点', '八点', '九点'],
    correctAnswer: '八点',
    explanation: '奶奶说春晚八点整开始。'
  },
  {
    id: 'zh-lq-20',
    question: '爸爸正在做什么？',
    options: ['包饺子', '擀饺子皮', '拌馅', '看电视'],
    correctAnswer: '擀饺子皮',
    explanation: '奶奶说爸爸正在擀饺子皮，妈妈在拌三鲜馅。'
  },
  {
    id: 'zh-lq-21',
    question: '华北地区傍晚将出现什么天气变化？',
    options: ['大幅降温', '暴雨', '大雾', '持续升温'],
    correctAnswer: '大幅降温',
    explanation: '天气播报说强冷空气南下，华北地区傍晚将迎来大幅度降温。'
  },
  {
    id: 'zh-lq-22',
    question: '夜间最低气温预计是多少？',
    options: ['零下十度', '零下五度', '零度', '五度'],
    correctAnswer: '零下五度',
    explanation: '播报员说夜间最低气温将骤降至零下五度。'
  },
  {
    id: 'en-lq-07',
    question: 'Where does Mark live now?',
    options: ['Chicago', 'Austin', 'Seattle', 'Boston'],
    correctAnswer: 'Austin',
    explanation: 'Mark says he relocated to Austin six months ago.'
  },
  {
    id: 'en-lq-08',
    question: 'When does Mark prefer to meet Emma for brunch?',
    options: ['Friday evening', 'Saturday morning', 'Saturday afternoon', 'Sunday morning'],
    correctAnswer: 'Saturday morning',
    explanation: 'Mark says Saturday morning works best for him.'
  },
  {
    id: 'en-lq-09',
    question: 'What color is the router indicator?',
    options: ['Green', 'Blue', 'Orange', 'Red'],
    correctAnswer: 'Orange',
    explanation: 'The user says the internet indicator has been flashing orange.'
  },
  {
    id: 'en-lq-10',
    question: 'How long should the user unplug the power adapter?',
    options: ['10 seconds', '30 seconds', '60 seconds', '90 seconds'],
    correctAnswer: '30 seconds',
    explanation: 'The technician asks the user to unplug it for thirty seconds.'
  },
  {
    id: 'en-lq-11',
    question: 'What share of peak midday electricity demand did solar supply?',
    options: ['24%', '32%', '42%', '52%'],
    correctAnswer: '42%',
    explanation: 'The newscaster says solar supplied over 42% of peak midday demand.'
  },
  {
    id: 'en-lq-12',
    question: 'What are regulators expected to announce?',
    options: ['New import taxes', 'Residential rooftop subsidies', 'A new power plant', 'Higher electricity prices'],
    correctAnswer: 'Residential rooftop subsidies',
    explanation: 'The bulletin says regulators are expected to unveil additional subsidies for residential rooftop retrofits.'
  },
  {
    id: 'en-lq-13',
    question: 'How many nights does the caller want to stay in London?',
    options: ['One', 'Two', 'Three', 'Five'],
    correctAnswer: 'Three',
    explanation: 'The caller asks to reserve a double room for three nights.'
  },
  {
    id: 'en-lq-14',
    question: 'What is included with the room rate?',
    options: ['Airport transfer', 'Dinner', 'Continental breakfast', 'Parking'],
    correctAnswer: 'Continental breakfast',
    explanation: 'The receptionist says a full continental breakfast is included.'
  }
];