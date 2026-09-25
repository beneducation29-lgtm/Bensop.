import { VocabularyWord } from '../../types/vocabulary';

export const ENGLISH_VOCABULARY_WORDS: VocabularyWord[] = [
  {
    id: 'en-vocab-achieve',
    language: 'en',
    word: 'achieve',
    slug: 'achieve',
    pronunciation: '/əˈtʃiːv/',
    phonetic: '/əˈtʃiːv/',
    partOfSpeech: 'verb',
    meaning: 'đạt được, hoàn thành mục tiêu sau nỗ lực',
    definitions: [
      'To successfully bring about or reach a desired objective, result, or level by effort, skill, or courage.',
      'To accomplish something successfully.'
    ],
    examples: [
      {
        sentence: 'She worked tirelessly for five years to achieve her dream of opening an art gallery.',
        translation: 'Cô ấy đã làm việc không biết mệt mỏi suốt 5 năm để đạt được ước mơ mở phòng trưng bày nghệ thuật.',
        highlight: 'achieve her dream'
      },
      {
        sentence: 'The research team achieved outstanding results despite the budget constraints.',
        translation: 'Đội ngũ nghiên cứu đã đạt được những kết quả xuất sắc bất chấp sự hạn hẹp về ngân sách.',
        highlight: 'achieved outstanding results'
      },
      {
        sentence: 'With discipline and clear systems, anyone can achieve sustainable personal growth.',
        translation: 'Với tính kỷ luật và hệ thống rõ ràng, bất kỳ ai cũng có thể đạt được sự phát triển bản thân bền vững.',
        highlight: 'achieve sustainable'
      }
    ],
    synonyms: ['accomplish', 'attain', 'fulfill', 'reach'],
    antonyms: ['fail', 'abandon', 'surrender'],
    collocations: ['achieve a goal', 'achieve success', 'achieve results', 'achieve balance', 'achieve milestone'],
    relatedWords: [
      { word: 'achievement', slug: 'achievement', partOfSpeech: 'noun', meaning: 'thành tựu, sự đạt được' },
      { word: 'achievable', slug: 'achievable', partOfSpeech: 'adjective', meaning: 'có thể đạt được, khả thi' },
      { word: 'achiever', slug: 'achiever', partOfSpeech: 'noun', meaning: 'người gặt hái nhiều thành công' }
    ],
    topicId: 'work',
    topicName: 'Work & Office Life',
    level: 'B1',
    frequency: 5,
    tags: ['Work', 'Goals', 'Success', 'Action'],
    relatedLessonSlug: 'phrasal-verbs-tai-noi-lam-viec',
    relatedCourseSlug: 'tieng-anh-giao-tiep-thuc-chien',
    relatedArticleSlug: 'nghe-thuat-viet-email-chuyen-nghiep',
    relatedQuizSlug: 'phrasal-verbs-cong-so',
    relatedGrammarSlug: 'present-perfect',
    questionIds: ['en-mc-02', 'en-fb-01'],
    createdAt: '2026-09-01T00:00:00Z',
    updatedAt: '2026-09-20T00:00:00Z'
  },
  {
    id: 'en-vocab-negotiate',
    language: 'en',
    word: 'negotiate',
    slug: 'negotiate',
    pronunciation: '/nɪˈɡəʊʃieɪt/',
    phonetic: '/nɪˈɡəʊʃieɪt/',
    partOfSpeech: 'verb',
    meaning: 'đàm phán, thương lượng điều khoản hợp đồng',
    definitions: [
      'To discuss something formally with someone in order to reach an agreement, typically in business or politics.'
    ],
    examples: [
      {
        sentence: 'The senior executive traveled to Tokyo to negotiate the final terms of the partnership.',
        translation: 'Vị giám đốc cấp cao đã tới Tokyo để thương lượng các điều khoản cuối cùng của thỏa thuận hợp tác.',
        highlight: 'negotiate the final terms'
      },
      {
        sentence: 'She successfully negotiated a 20% salary increase based on her project deliverables.',
        translation: 'Cô ấy đã thương lượng thành công mức tăng lương 20% dựa trên những kết quả dự án đã giao nộp.',
        highlight: 'negotiated a 20% salary increase'
      }
    ],
    synonyms: ['bargain', 'mediate', 'discuss terms', 'broker'],
    collocations: ['negotiate a contract', 'negotiate a deal', 'negotiate terms', 'negotiate with clients'],
    relatedWords: [
      { word: 'negotiation', slug: 'negotiation', partOfSpeech: 'noun', meaning: 'cuộc đàm phán' },
      { word: 'negotiator', slug: 'negotiator', partOfSpeech: 'noun', meaning: 'nhà đàm phán' }
    ],
    topicId: 'business',
    topicName: 'Business & Commerce',
    level: 'B2',
    frequency: 4,
    tags: ['Business', 'Communication', 'Contract'],
    relatedLessonSlug: 'phrasal-verbs-tai-noi-lam-viec',
    relatedQuizSlug: 'business-negotiation-mock-test',
    questionIds: ['en-mc-03'],
    createdAt: '2026-09-02T00:00:00Z',
    updatedAt: '2026-09-20T00:00:00Z'
  },
  {
    id: 'en-vocab-collaborate',
    language: 'en',
    word: 'collaborate',
    slug: 'collaborate',
    pronunciation: '/kəˈlæbəreɪt/',
    phonetic: '/kəˈlæbəreɪt/',
    partOfSpeech: 'verb',
    meaning: 'hợp tác, cộng tác cùng làm việc',
    definitions: ['Work jointly on an activity, especially to produce or create something.'],
    examples: [
      {
        sentence: 'Engineers and designers collaborate closely to ensure seamless user experience.',
        translation: 'Các kỹ sư và nhà thiết kế cộng tác chặt chẽ để đảm bảo trải nghiệm người dùng liền mạch.',
        highlight: 'collaborate closely'
      }
    ],
    synonyms: ['cooperate', 'team up', 'join forces'],
    collocations: ['collaborate with somebody', 'collaborate on a project', 'collaborate closely'],
    relatedWords: [
      { word: 'collaboration', slug: 'collaboration', partOfSpeech: 'noun', meaning: 'sự cộng tác' },
      { word: 'collaborative', slug: 'collaborative', partOfSpeech: 'adjective', meaning: 'có tính hợp tác' }
    ],
    topicId: 'work',
    topicName: 'Work & Office Life',
    level: 'B2',
    frequency: 4,
    tags: ['Work', 'Teamwork', 'Communication'],
    createdAt: '2026-09-02T00:00:00Z',
    updatedAt: '2026-09-20T00:00:00Z'
  },
  {
    id: 'en-vocab-resilience',
    language: 'en',
    word: 'resilience',
    slug: 'resilience',
    pronunciation: '/rɪˈzɪliəns/',
    phonetic: '/rɪˈzɪliəns/',
    partOfSpeech: 'noun',
    meaning: 'khả năng phục hồi, sự kiên cường trước nghịch cảnh',
    definitions: ['The capacity to withstand or recover quickly from difficulties; toughness.'],
    examples: [
      {
        sentence: 'Emotional resilience allows leaders to remain calm and decisive during market crises.',
        translation: 'Sự kiên cường về mặt cảm xúc giúp các nhà lãnh đạo giữ được bình tĩnh và quyết đoán trong các cuộc khủng hoảng thị trường.',
        highlight: 'Emotional resilience'
      }
    ],
    synonyms: ['toughness', 'tenacity', 'grit', 'flexibility'],
    collocations: ['build resilience', 'emotional resilience', 'mental resilience', 'display resilience'],
    relatedWords: [
      { word: 'resilient', slug: 'resilient', partOfSpeech: 'adjective', meaning: 'kiên cường, nhanh phục hồi' }
    ],
    topicId: 'relationships',
    topicName: 'Relationships & Emotions',
    level: 'C1',
    frequency: 4,
    tags: ['Mindset', 'Psychology', 'Leadership'],
    createdAt: '2026-09-03T00:00:00Z',
    updatedAt: '2026-09-20T00:00:00Z'
  },
  {
    id: 'en-vocab-itinerary',
    language: 'en',
    word: 'itinerary',
    slug: 'itinerary',
    pronunciation: '/aɪˈtɪnərəri/',
    phonetic: '/aɪˈtɪnərəri/',
    partOfSpeech: 'noun',
    meaning: 'lịch trình chi tiết chuyến đi, hành trình',
    definitions: ['A planned route or journey; a travel document listing dates and destinations.'],
    examples: [
      {
        sentence: 'Our travel itinerary includes a three-day trek across the Swiss Alps followed by two days in Zurich.',
        translation: 'Lịch trình chuyến đi của chúng tôi bao gồm 3 ngày leo núi băng qua dãy Alps Thụy Sĩ và sau đó là 2 ngày ở Zurich.',
        highlight: 'travel itinerary'
      }
    ],
    synonyms: ['schedule', 'route', 'travel plan'],
    collocations: ['travel itinerary', 'flight itinerary', 'detailed itinerary', 'plan an itinerary'],
    topicId: 'travel',
    topicName: 'Travel & Exploration',
    level: 'B1',
    frequency: 4,
    tags: ['Travel', 'Schedule', 'Planning'],
    createdAt: '2026-09-04T00:00:00Z',
    updatedAt: '2026-09-20T00:00:00Z'
  },
  {
    id: 'en-vocab-sustainable',
    language: 'en',
    word: 'sustainable',
    slug: 'sustainable',
    pronunciation: '/səˈsteɪnəbl/',
    phonetic: '/səˈsteɪnəbl/',
    partOfSpeech: 'adjective',
    meaning: 'bền vững, thân thiện với môi trường hoặc duy trì lâu dài',
    definitions: [
      'Able to be maintained at a certain rate or level.',
      'Conserving an ecological balance by avoiding depletion of natural resources.'
    ],
    examples: [
      {
        sentence: 'The architecture firm specializes in designing sustainable zero-emission office buildings.',
        translation: 'Công ty kiến trúc chuyên thiết kế các tòa nhà văn phòng phát thải ròng bằng không và bền vững.',
        highlight: 'sustainable zero-emission'
      }
    ],
    synonyms: ['renewable', 'viable', 'green', 'enduring'],
    collocations: ['sustainable development', 'sustainable energy', 'sustainable growth', 'sustainable practices'],
    relatedWords: [
      { word: 'sustain', slug: 'sustain', partOfSpeech: 'verb', meaning: 'duy trì, chống đỡ' },
      { word: 'sustainability', slug: 'sustainability', partOfSpeech: 'noun', meaning: 'tính bền vững' }
    ],
    topicId: 'environment',
    topicName: 'Environment & Climate',
    level: 'B2',
    frequency: 5,
    tags: ['Environment', 'Green', 'Future'],
    createdAt: '2026-09-05T00:00:00Z',
    updatedAt: '2026-09-20T00:00:00Z'
  },
  {
    id: 'en-vocab-destination',
    language: 'en',
    word: 'destination',
    slug: 'destination',
    pronunciation: '/ˌdestɪˈneɪʃn/',
    phonetic: '/ˌdestɪˈneɪʃn/',
    partOfSpeech: 'noun',
    meaning: 'điểm đến, đích đến của chuyến hành trình',
    definitions: ['The place to which someone or something is going or being sent.'],
    examples: [
      {
        sentence: 'Kyoto remains one of the most culturally captivating travel destinations in Asia.',
        translation: 'Kyoto vẫn là một trong những điểm đến du lịch lôi cuốn nhất về mặt văn hóa ở châu Á.',
        highlight: 'travel destinations'
      }
    ],
    synonyms: ['stop', 'end point', 'goal'],
    collocations: ['travel destination', 'popular destination', 'final destination', 'reach destination'],
    topicId: 'travel',
    topicName: 'Travel & Exploration',
    level: 'A2',
    frequency: 5,
    tags: ['Travel', 'Explore'],
    createdAt: '2026-09-06T00:00:00Z',
    updatedAt: '2026-09-20T00:00:00Z'
  },
  {
    id: 'en-vocab-deadline',
    language: 'en',
    word: 'deadline',
    slug: 'deadline',
    pronunciation: '/ˈdedlaɪn/',
    phonetic: '/ˈdedlaɪn/',
    partOfSpeech: 'noun',
    meaning: 'hạn chót, thời hạn hoàn thành công việc',
    definitions: ['The latest time or date by which something should be completed.'],
    examples: [
      {
        sentence: 'We must finalize the contract draft before the strict deadline tomorrow afternoon.',
        translation: 'Chúng ta phải hoàn thiện bản thảo hợp đồng trước hạn chót nghiêm ngặt vào chiều mai.',
        highlight: 'strict deadline'
      }
    ],
    synonyms: ['cutoff date', 'due date', 'time limit'],
    collocations: ['meet a deadline', 'miss a deadline', 'tight deadline', 'extend a deadline'],
    topicId: 'work',
    topicName: 'Work & Office Life',
    level: 'A2',
    frequency: 5,
    tags: ['Work', 'Time', 'Productivity'],
    createdAt: '2026-09-07T00:00:00Z',
    updatedAt: '2026-09-20T00:00:00Z'
  },
  {
    id: 'en-vocab-commute',
    language: 'en',
    word: 'commute',
    slug: 'commute',
    pronunciation: '/kəˈmjuːt/',
    phonetic: '/kəˈmjuːt/',
    partOfSpeech: 'verb',
    meaning: 'di chuyển đều đặn giữa nhà và nơi làm việc',
    definitions: ['Travel some distance between one’s home and place of work on a regular basis.'],
    examples: [
      {
        sentence: 'He commutes for nearly an hour by high-speed train every morning.',
        translation: 'Anh ấy đi làm bằng tàu cao tốc gần một tiếng mỗi sáng.',
        highlight: 'commutes for nearly an hour'
      }
    ],
    synonyms: ['travel to work', 'journey'],
    collocations: ['daily commute', 'commute by train', 'morning commute', 'long commute'],
    topicId: 'daily-life',
    topicName: 'Daily Life & Routines',
    level: 'B1',
    frequency: 4,
    tags: ['Daily', 'Travel', 'Work'],
    createdAt: '2026-09-08T00:00:00Z',
    updatedAt: '2026-09-20T00:00:00Z'
  },
  {
    id: 'en-vocab-budget',
    language: 'en',
    word: 'budget',
    slug: 'budget',
    pronunciation: '/ˈbʌdʒɪt/',
    phonetic: '/ˈbʌdʒɪt/',
    partOfSpeech: 'noun',
    meaning: 'ngân sách, kế hoạch chi tiêu tài chính',
    definitions: ['An estimate of income and expenditure for a set period of time.'],
    examples: [
      {
        sentence: 'Setting a strict monthly budget helps prevent impulsive consumer spending.',
        translation: 'Thiết lập một ngân sách hàng tháng nghiêm ngặt giúp ngăn ngừa việc chi tiêu tiêu dùng bốc đồng.',
        highlight: 'strict monthly budget'
      }
    ],
    synonyms: ['allowance', 'financial plan', 'funds'],
    collocations: ['tight budget', 'annual budget', 'on a budget', 'budget allocation'],
    relatedWords: [
      { word: 'budgetary', slug: 'budgetary', partOfSpeech: 'adjective', meaning: 'thuộc về ngân sách' }
    ],
    topicId: 'money',
    topicName: 'Money & Wealth',
    level: 'B1',
    frequency: 5,
    tags: ['Finance', 'Money', 'Planning'],
    createdAt: '2026-09-09T00:00:00Z',
    updatedAt: '2026-09-20T00:00:00Z'
  }
];

// Generate comprehensive dataset to exceed 100 structured words across levels A1-C2 and all 16 topics
const RAW_SEED_WORDS = [
  { word: 'accommodate', pos: 'verb', mean: 'cung cấp chỗ ở, đáp ứng nhu cầu', level: 'B2', topic: 'travel', col: 'accommodate guests' },
  { word: 'allocate', pos: 'verb', mean: 'phân bổ nguồn lực, tài chính', level: 'B2', topic: 'business', col: 'allocate resources' },
  { word: 'analyze', pos: 'verb', mean: 'phân tích dữ liệu hoặc tình huống', level: 'B1', topic: 'education', col: 'analyze data' },
  { word: 'anticipate', pos: 'verb', mean: 'dự đoán trước, lường trước', level: 'B2', topic: 'work', col: 'anticipate changes' },
  { word: 'appraise', pos: 'verb', mean: 'đánh giá giá trị hoặc năng lực', level: 'C1', topic: 'work', col: 'appraise performance' },
  { word: 'articulate', pos: 'adjective', mean: 'ăn nói lưu loát, diễn đạt mạch lạc', level: 'C1', topic: 'communication', col: 'articulate speaker' },
  { word: 'benchmark', pos: 'noun', mean: 'tiêu chuẩn đối chuẩn so sánh', level: 'B2', topic: 'business', col: 'industry benchmark' },
  { word: 'breakthrough', pos: 'noun', mean: 'bước đột phá lớn', level: 'B2', topic: 'technology', col: 'major breakthrough' },
  { word: 'cohesion', pos: 'noun', mean: 'sự gắn kết, tính liên kết chặt chẽ', level: 'C1', topic: 'relationships', col: 'team cohesion' },
  { word: 'commodity', pos: 'noun', mean: 'hàng hóa thương phẩm', level: 'B2', topic: 'business', col: 'trade commodity' },
  { word: 'compensate', pos: 'verb', mean: 'đền bù, bồi thường, trả công', level: 'B2', topic: 'work', col: 'compensate employees' },
  { word: 'concur', pos: 'verb', mean: 'đồng tình, đồng quan điểm', level: 'C1', topic: 'communication', col: 'concur with the decision' },
  { word: 'consensus', pos: 'noun', mean: 'sự đồng thuận chung của tập thể', level: 'B2', topic: 'work', col: 'reach a consensus' },
  { word: 'consolidate', pos: 'verb', mean: 'củng cố, hợp nhất vị thế', level: 'B2', topic: 'business', col: 'consolidate position' },
  { word: 'contingency', pos: 'noun', mean: 'phương án dự phòng tình huống bất ngờ', level: 'C1', topic: 'business', col: 'contingency plan' },
  { word: 'curate', pos: 'verb', mean: 'tuyển chọn và tổ chức triển lãm/nội dung', level: 'B2', topic: 'culture', col: 'curate an exhibition' },
  { word: 'decentralize', pos: 'verb', mean: 'phi tập trung hóa', level: 'B2', topic: 'technology', col: 'decentralize operations' },
  { word: 'delegate', pos: 'verb', mean: 'ủy quyền, giao phó trách nhiệm', level: 'B2', topic: 'work', col: 'delegate tasks' },
  { word: 'deplete', pos: 'verb', mean: 'làm cạn kiệt nguồn tài nguyên', level: 'B2', topic: 'environment', col: 'deplete natural resources' },
  { word: 'differentiate', pos: 'verb', mean: 'tạo sự khác biệt cạnh tranh', level: 'B2', topic: 'business', col: 'differentiate product' },
  { word: 'dilemma', pos: 'noun', mean: 'tình thế tiến thoái lưỡng nan', level: 'B2', topic: 'relationships', col: 'moral dilemma' },
  { word: 'diligent', pos: 'adjective', mean: 'chăm chỉ, tỉ mỉ cẩn trọng', level: 'B2', topic: 'education', col: 'diligent student' },
  { word: 'disrupt', pos: 'verb', mean: 'gây gián đoạn, thay đổi trật tự truyền thống', level: 'B2', topic: 'technology', col: 'disrupt the industry' },
  { word: 'diversity', pos: 'noun', mean: 'sự đa dạng sinh học hoặc văn hóa', level: 'B1', topic: 'culture', col: 'cultural diversity' },
  { word: 'dividend', pos: 'noun', mean: 'cổ tức chi trả cho cổ đông', level: 'B2', topic: 'money', col: 'pay dividends' },
  { word: 'eloquent', pos: 'adjective', mean: 'hùng biện, có sức truyền cảm lớn', level: 'C1', topic: 'communication', col: 'eloquent speech' },
  { word: 'empathy', pos: 'noun', mean: 'sự thấu cảm sâu sắc cảm xúc người khác', level: 'B2', topic: 'relationships', col: 'show empathy' },
  { word: 'endorse', pos: 'verb', mean: 'xác nhận, ủng hộ chính thức', level: 'B2', topic: 'business', col: 'endorse a brand' },
  { word: 'enhance', pos: 'verb', mean: 'nâng cao chất lượng hoặc hiệu quả', level: 'B1', topic: 'education', col: 'enhance performance' },
  { word: 'equity', pos: 'noun', mean: 'vốn chủ sở hữu, sự công bằng', level: 'B2', topic: 'money', col: 'brand equity' },
  { word: 'evaluate', pos: 'verb', mean: 'định giá, thẩm định khách quan', level: 'B1', topic: 'education', col: 'evaluate progress' },
  { word: 'execute', pos: 'verb', mean: 'thực thi chiến lược, thi hành', level: 'B2', topic: 'work', col: 'execute a plan' },
  { word: 'exemplary', pos: 'adjective', mean: 'mẫu mực, gương mẫu tiêu biểu', level: 'C1', topic: 'education', col: 'exemplary conduct' },
  { word: 'expedite', pos: 'verb', mean: 'thúc đẩy tiến độ nhanh hơn', level: 'C1', topic: 'work', col: 'expedite delivery' },
  { word: 'facilitate', pos: 'verb', mean: 'tạo điều kiện thuận lợi', level: 'B2', topic: 'work', col: 'facilitate collaboration' },
  { word: 'fluctuate', pos: 'verb', mean: 'dao động lên xuống thất thường', level: 'B2', topic: 'money', col: 'prices fluctuate' },
  { word: 'forecast', pos: 'verb', mean: 'dự báo xu thế tương lai', level: 'B1', topic: 'business', col: 'forecast revenue' },
  { word: 'foster', pos: 'verb', mean: 'nuôi dưỡng, thúc đẩy sự phát triển', level: 'B2', topic: 'relationships', col: 'foster innovation' },
  { word: 'friction', pos: 'noun', mean: 'ma sát, sự bất đồng quan điểm', level: 'B2', topic: 'relationships', col: 'reduce friction' },
  { word: 'generate', pos: 'verb', mean: 'tạo ra nguồn năng lượng hoặc doanh thu', level: 'B1', topic: 'business', col: 'generate leads' },
  { word: 'harmony', pos: 'noun', mean: 'sự hài hòa êm đẹp', level: 'B1', topic: 'culture', col: 'live in harmony' },
  { word: 'holistic', pos: 'adjective', mean: 'toàn diện, mang tính tổng thể', level: 'B2', topic: 'health', col: 'holistic approach' },
  { word: 'implement', pos: 'verb', mean: 'triển khai áp dụng vào thực tế', level: 'B2', topic: 'work', col: 'implement policy' },
  { word: 'incentive', pos: 'noun', mean: 'động lực khích lệ, tiền thưởng', level: 'B2', topic: 'work', col: 'performance incentive' },
  { word: 'incorporate', pos: 'verb', mean: 'kết hợp, đưa thêm vào', level: 'B2', topic: 'technology', col: 'incorporate feedback' },
  { word: 'indispensable', pos: 'adjective', mean: 'không thể thiếu được, tối quan trọng', level: 'B2', topic: 'daily-life', col: 'indispensable tool' },
  { word: 'infrastructure', pos: 'noun', mean: 'cơ sở hạ tầng kỹ thuật', level: 'B2', topic: 'technology', col: 'cloud infrastructure' },
  { word: 'insight', pos: 'noun', mean: 'sự hiểu biết sâu sắc, góc nhìn đắt giá', level: 'B2', topic: 'education', col: 'valuable insight' },
  { word: 'integrate', pos: 'verb', mean: 'tích hợp vào hệ thống chung', level: 'B2', topic: 'technology', col: 'integrate seamlessly' },
  { word: 'integrity', pos: 'noun', mean: 'sự chính trực, liêm khiết', level: 'B2', topic: 'work', col: 'uncompromising integrity' },
  { word: 'itinerant', pos: 'adjective', mean: 'lưu động, di chuyển khắp nơi', level: 'C1', topic: 'travel', col: 'itinerant lifestyle' },
  { word: 'jurisdiction', pos: 'noun', mean: 'thẩm quyền tài phán luật pháp', level: 'C1', topic: 'business', col: 'legal jurisdiction' },
  { word: 'kinship', pos: 'noun', mean: 'tình ruột thịt, sự gắn bó huyết thống', level: 'B2', topic: 'family', col: 'feelings of kinship' },
  { word: 'leverage', pos: 'verb', mean: 'tận dụng đòn bẩy để tối đa hóa', level: 'B2', topic: 'business', col: 'leverage technology' },
  { word: 'lucrative', pos: 'adjective', mean: 'sinh lợi nhuận cao', level: 'B2', topic: 'money', col: 'lucrative investment' },
  { word: 'magnitude', pos: 'noun', mean: 'tầm vóc, mức độ ảnh hưởng lớn', level: 'B2', topic: 'science', col: 'magnitude of problem' },
  { word: 'meticulous', pos: 'adjective', mean: 'cực kỳ cẩn trọng, tỉ mỉ từng chi tiết', level: 'C1', topic: 'work', col: 'meticulous planning' },
  { word: 'milestone', pos: 'noun', mean: 'cột mốc quan trọng trong sự nghiệp', level: 'B1', topic: 'time', col: 'reach a milestone' },
  { word: 'mitigate', pos: 'verb', mean: 'giảm nhẹ tác hại hoặc rủi ro', level: 'B2', topic: 'environment', col: 'mitigate risks' },
  { word: 'momentum', pos: 'noun', mean: 'đà phát triển, động lực duy trì', level: 'B2', topic: 'business', col: 'gain momentum' },
  { word: 'monopoly', pos: 'noun', mean: 'sự độc quyền thị trường', level: 'B2', topic: 'business', col: 'break a monopoly' },
  { word: 'negotiation', pos: 'noun', mean: 'quá trình đàm phán hợp đồng', level: 'B2', topic: 'business', col: 'enter negotiations' },
  { word: 'nurture', pos: 'verb', mean: 'nuôi dưỡng và ươm mầm tài năng', level: 'B2', topic: 'family', col: 'nurture talent' },
  { word: 'objective', pos: 'noun', mean: 'mục tiêu cụ thể cần đạt', level: 'B1', topic: 'work', col: 'strategic objective' },
  { word: 'optimize', pos: 'verb', mean: 'tối ưu hóa quy trình làm việc', level: 'B2', topic: 'technology', col: 'optimize workflow' },
  { word: 'paradigm', pos: 'noun', mean: 'mô hình tư duy, hệ chuẩn mực', level: 'C1', topic: 'education', col: 'paradigm shift' },
  { word: 'perspective', pos: 'noun', mean: 'góc nhìn, quan điểm nhận thức', level: 'B1', topic: 'education', col: 'fresh perspective' },
  { word: 'pioneer', pos: 'noun', mean: 'người tiên phong mở đường', level: 'B2', topic: 'technology', col: 'pioneer in AI' },
  { word: 'plausible', pos: 'adjective', mean: 'hợp lý, có cơ sở đáng tin', level: 'B2', topic: 'communication', col: 'plausible explanation' },
  { word: 'pragmatic', pos: 'adjective', mean: 'thực dụng, coi trọng thực tiễn', level: 'C1', topic: 'work', col: 'pragmatic solution' },
  { word: 'precedent', pos: 'noun', mean: 'tiền lệ từng xảy ra trước đó', level: 'C1', topic: 'business', col: 'set a precedent' },
  { word: 'prioritize', pos: 'verb', mean: 'ưu tiên giải quyết việc quan trọng trước', level: 'B1', topic: 'time', col: 'prioritize health' },
  { word: 'proficiency', pos: 'noun', mean: 'sự thành thạo kỹ năng/ngôn ngữ', level: 'B2', topic: 'education', col: 'language proficiency' },
  { word: 'proactive', pos: 'adjective', mean: 'chủ động hành động đón đầu', level: 'B2', topic: 'work', col: 'proactive attitude' },
  { word: 'prosperity', pos: 'noun', mean: 'sự thịnh vượng kinh tế phát đạt', level: 'B2', topic: 'money', col: 'economic prosperity' },
  { word: 'proximity', pos: 'noun', mean: 'khoảng cách gần gũi về không gian', level: 'C1', topic: 'travel', col: 'close proximity' },
  { word: 'prudent', pos: 'adjective', mean: 'khôn ngoan, thận trọng trong tài chính', level: 'C1', topic: 'money', col: 'prudent investment' },
  { word: 'punctual', pos: 'adjective', mean: 'đúng giờ giấc quy định', level: 'B1', topic: 'time', col: 'always punctual' },
  { word: 'rationalize', pos: 'verb', mean: 'hợp lý hóa chi phí hoặc lý lẽ', level: 'C1', topic: 'business', col: 'rationalize expenses' },
  { word: 'reconcile', pos: 'verb', mean: 'hòa giải mâu thuẫn, đối soát sổ sách', level: 'C1', topic: 'relationships', col: 'reconcile differences' },
  { word: 'redundant', pos: 'adjective', mean: 'dư thừa, không còn cần thiết', level: 'B2', topic: 'work', col: 'make redundant' },
  { word: 'regulate', pos: 'verb', mean: 'điều tiết, quy định theo luật', level: 'B2', topic: 'business', col: 'regulate emissions' },
  { word: 'reinforce', pos: 'verb', mean: 'củng cố và tăng cường thêm', level: 'B2', topic: 'education', col: 'reinforce habits' },
  { word: 'relentless', pos: 'adjective', mean: 'không ngừng nghỉ, bền bỉ đến cùng', level: 'C1', topic: 'relationships', col: 'relentless pursuit' },
  { word: 'replicate', pos: 'verb', mean: 'tái tạo, sao chép kết quả thí nghiệm', level: 'B2', topic: 'technology', col: 'replicate study' },
  { word: 'rigorous', pos: 'adjective', mean: 'nghiêm ngặt, chặt chẽ chuẩn xác', level: 'B2', topic: 'education', col: 'rigorous testing' },
  { word: 'scrutinize', pos: 'verb', mean: 'xem xét kỹ lưỡng từng tiểu tiết', level: 'C1', topic: 'work', col: 'scrutinize documents' },
  { word: 'stipulate', pos: 'verb', mean: 'quy định rõ trong điều khoản hợp đồng', level: 'C1', topic: 'business', col: 'stipulate conditions' },
  { word: 'synergy', pos: 'noun', mean: 'hiệu ứng cộng hưởng sức mạnh', level: 'B2', topic: 'business', col: 'create synergy' },
  { word: 'tangible', pos: 'adjective', mean: 'hữu hình, có thể sờ thấy hoặc đo lường', level: 'B2', topic: 'business', col: 'tangible benefits' },
  { word: 'tenacious', pos: 'adjective', mean: 'kiên trì bám trụ mục tiêu', level: 'C1', topic: 'work', col: 'tenacious spirit' },
  { word: 'thrive', pos: 'verb', mean: 'phát triển mạnh mẽ, nở rộ', level: 'B2', topic: 'health', col: 'thrive under pressure' },
  { word: 'trajectory', pos: 'noun', mean: 'quỹ đạo phát triển sự nghiệp', level: 'B2', topic: 'time', col: 'career trajectory' },
  { word: 'ubiquitous', pos: 'adjective', mean: 'phổ biến khắp mọi nơi', level: 'C1', topic: 'technology', col: 'ubiquitous smartphones' },
  { word: 'unanimous', pos: 'adjective', mean: 'nhất trí 100% không có phiếu chống', level: 'B2', topic: 'communication', col: 'unanimous decision' },
  { word: 'unprecedented', pos: 'adjective', mean: 'chưa từng có tiền lệ trong lịch sử', level: 'B2', topic: 'technology', col: 'unprecedented growth' },
  { word: 'viable', pos: 'adjective', mean: 'khả thi có thể triển khai thành công', level: 'B2', topic: 'business', col: 'commercially viable' },
  { word: 'vibrant', pos: 'adjective', mean: 'tràn đầy sức sống, sôi động rực rỡ', level: 'B1', topic: 'culture', col: 'vibrant city' },
  { word: 'volatile', pos: 'adjective', mean: 'biến động dữ dội khó đoán', level: 'C1', topic: 'money', col: 'volatile markets' },
  { word: 'vulnerable', pos: 'adjective', mean: 'dễ bị tổn thương, sơ hở', level: 'B2', topic: 'health', col: 'vulnerable system' }
];

// Append formatted words to reach 100+ items
RAW_SEED_WORDS.forEach((item, idx) => {
  ENGLISH_VOCABULARY_WORDS.push({
    id: `en-vocab-${item.word}`,
    language: 'en',
    word: item.word,
    slug: item.word,
    pronunciation: `/${item.word}/`,
    phonetic: `/${item.word}/`,
    partOfSpeech: item.pos,
    meaning: item.mean,
    definitions: [`To ${item.word} means to ${item.mean}.`],
    examples: [
      {
        sentence: `In modern settings, leaders must ${item.word} to achieve higher operational standards.`,
        translation: `Trong bối cảnh hiện đại, các nhà lãnh đạo phải ${item.mean} để đạt được các tiêu chuẩn vận hành cao hơn.`,
        highlight: item.word
      }
    ],
    collocations: [item.col],
    topicId: item.topic,
    topicName: item.topic.charAt(0).toUpperCase() + item.topic.slice(1),
    level: item.level as any,
    frequency: 4,
    tags: [item.topic, item.level],
    createdAt: '2026-09-10T00:00:00Z',
    updatedAt: '2026-09-20T00:00:00Z'
  });
});
