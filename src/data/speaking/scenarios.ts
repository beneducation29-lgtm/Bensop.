import { ConversationScenario } from '../../types/speaking';

export const CONVERSATION_SCENARIOS: ConversationScenario[] = [
  {
    id: 'scen-en-01',
    language: 'en',
    title: 'At the Airport: Gate Check-in & Security',
    slug: 'at-the-airport',
    level: 'B1',
    topic: 'Travel',
    context: 'You are arriving at the check-in counter for your international flight to San Francisco.',
    systemRole: 'Airport Check-in Agent',
    userRole: 'Passenger traveling overseas',
    objectives: [
      'State your destination and flight confirmation code',
      'Declare how many bags you need to check',
      'Confirm your seat preference (window or aisle)'
    ],
    starterPrompt: 'Good morning! Welcome to Star Alliance. May I see your passport and boarding reservation, please?',
    dialogueTurns: [
      { speaker: 'system', text: 'Good morning! Welcome to Star Alliance. May I see your passport and boarding reservation, please?' },
      { speaker: 'user', text: "Good morning! Here is my passport and reservation. I'm flying to San Francisco." },
      { speaker: 'system', text: 'Thank you. Do you have any luggage to check today?' },
      { speaker: 'user', text: 'Yes, I have one suitcase to check and one carry-on bag.' }
    ],
    targetVocabulary: ['passport', 'luggage', 'boarding pass', 'carry-on', 'overhead compartment'],
    targetGrammar: ['Polite requests with Could/Would', 'Present perfect for travel status']
  },
  {
    id: 'scen-en-02',
    language: 'en',
    title: 'At a Fine Dining Restaurant',
    slug: 'at-a-restaurant',
    level: 'A2',
    topic: 'Food',
    context: 'You are having dinner at an Italian bistro and asking the waiter for dietary recommendations.',
    systemRole: 'Bistro Waiter',
    userRole: 'Customer with seafood allergy',
    objectives: [
      'Inquire about the house specialty pasta',
      'Inform the staff about your dietary preference',
      'Order beverages and the main course'
    ],
    starterPrompt: 'Good evening! Welcome to Trattoria Roma. Have you decided on your entrees tonight?',
    targetVocabulary: ['recommendation', 'allergy', 'sparkling water', 'house special', 'dessert'],
    targetGrammar: ['Modal verbs (would like, can have)', 'Descriptive adjectives']
  },
  {
    id: 'scen-en-03',
    language: 'en',
    title: 'Job Interview: System Architect Role',
    slug: 'job-interview',
    level: 'B2',
    topic: 'Work',
    context: 'You are in the final interview round with the VP of Engineering discussing scalable cloud architectures.',
    systemRole: 'VP of Engineering',
    userRole: 'Senior Engineering Candidate',
    objectives: [
      'Explain your experience with microservices and distributed caching',
      'Describe how you tackle unexpected high-concurrency traffic',
      'Articulate your leadership philosophy'
    ],
    starterPrompt: 'Thank you for coming in today. Could you briefly walk us through the most challenging distributed systems project you architected?',
    targetVocabulary: ['scalability', 'redundancy', 'bottleneck', 'throughput', 'trade-off'],
    targetGrammar: ['Past simple vs. past continuous', 'Complex conditionals (if/would)']
  },
  {
    id: 'scen-en-04',
    language: 'en',
    title: 'Hotel Check-in & Concierge Request',
    slug: 'hotel-check-in',
    level: 'B1',
    topic: 'Travel',
    context: 'You arrive at a boutique hotel in London after a long haul flight and need early check-in.',
    systemRole: 'Front Desk Concierge',
    userRole: 'Hotel Guest',
    objectives: [
      'Provide reservation number and request a quiet room on a high floor',
      'Inquire about breakfast hours and gym access',
      'Ask for luggage storage if the room is not ready'
    ],
    starterPrompt: 'Welcome to The Kensington Heritage. How may I assist your arrival today?',
    targetVocabulary: ['reservation', 'high floor', 'continental breakfast', 'luggage storage', 'complimentary'],
    targetGrammar: ['Polite inquiry structures', 'Time expressions']
  },
  {
    id: 'scen-zh-01',
    language: 'zh',
    title: '在餐厅点餐 (At the Restaurant)',
    slug: 'zai-canting-diancan',
    level: 'HSK 2',
    topic: '饮食',
    context: '你在北京一家特色烤鸭店，准备向服务员点菜。',
    systemRole: '餐厅服务员 (Waiter)',
    userRole: '顾客 (Customer)',
    objectives: [
      '询问招牌菜品和份量 (Ask about specialties and portion size)',
      '点半只烤鸭和一份蔬菜 (Order roast duck and vegetables)',
      '提出少油少盐的要求 (Request less oil and salt)'
    ],
    starterPrompt: '您好！欢迎光临全聚德，请问几位？请看下菜单，今天想尝尝我们的招牌烤鸭吗？',
    targetVocabulary: ['招牌菜', '烤鸭', '青菜', '买单', '少放盐'],
    targetGrammar: ['想/要 + 动词', '来一个/份...']
  },
  {
    id: 'scen-zh-02',
    language: 'zh',
    title: '在机场值机与托运 (Airport Check-in & Luggage)',
    slug: 'zai-jichang-zhiji',
    level: 'HSK 3',
    topic: '旅行',
    context: '你在上海浦东机场柜台办理登机手续和行李托运。',
    systemRole: '机场值机工作人员 (Airport Agent)',
    userRole: '乘机旅客 (Passenger)',
    objectives: [
      '出示有效身份证件并说明目的地',
      '办理一件行李托运，确认重量',
      '询问登机口与登机时间'
    ],
    starterPrompt: '您好，请出示您的身份证或护照。请问您去哪里？',
    targetVocabulary: ['登机牌', '行李箱', '托运', '靠窗', '登机口'],
    targetGrammar: ['把字句', '请问...怎么走']
  },
  {
    id: 'scen-zh-03',
    language: 'zh',
    title: '求职面试自我介绍 (Job Interview Introduction)',
    slug: 'qiuzhi-mianshi',
    level: 'HSK 4',
    topic: '工作',
    context: '你正在参加一家互联网科技公司的产品经理面试。',
    systemRole: '招聘主管 (Hiring Manager)',
    userRole: '求职者 (Candidate)',
    objectives: [
      '清晰介绍自己的教育背景与工作经验',
      '分享一个主导落地的成功产品案例',
      '表达对贵公司文化与业务愿景的认同'
    ],
    starterPrompt: '你好，欢迎参加面试。请先做个简短的自我介绍，重点谈谈你过去最有成就感的一个项目。',
    targetVocabulary: ['专业背景', '项目经验', '团队合作', '用户增长', '核心优势'],
    targetGrammar: ['不仅...而且...', '为了...所以...']
  },
  {
    id: 'scen-zh-04',
    language: 'zh',
    title: '去酒店办理入住 (Hotel Check-in in Beijing)',
    slug: 'qu-jiudian-ruzhù',
    level: 'HSK 2',
    topic: '旅行',
    context: '你到达预订好的酒店前台办理入住手续。',
    systemRole: '酒店前台接待 (Hotel Receptionist)',
    userRole: '住客 (Hotel Guest)',
    objectives: [
      '报出预订姓名与手机号',
      '出示证件登记',
      '询问房间Wi-Fi密码和早餐时间'
    ],
    starterPrompt: '您好，欢迎光临如家精选酒店！请问您有预订吗？',
    targetVocabulary: ['预订', '房卡', '押金', '早餐券', '无线网络'],
    targetGrammar: ['我在网上预订了...', '有...吗？']
  }
];
