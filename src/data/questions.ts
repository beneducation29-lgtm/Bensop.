import { Question } from '../types/quiz';
import { LISTENING_QUESTIONS } from './listening/listeningQuestions';

export const QUESTIONS_BANK: Question[] = [
  // ==========================================
  // SECTION A: TIẾNG ANH (50 QUESTIONS)
  // ==========================================

  // --- TYPE 1: MULTIPLE CHOICE ---
  {
    id: 'en-mc-01',
    categoryId: 'tieng-anh',
    subjectId: 'english-core',
    topicId: 'grammar',
    skill: 'Grammar',
    type: 'multiple-choice',
    difficulty: 'Intermediate',
    cefrLevel: 'B1',
    question: 'By the time the global summit starts tomorrow, our delegation ______ the draft proposal.',
    instructions: 'Chọn dạng động từ chính xác để hoàn thành câu diễn tả hành động hoàn tất trước một thời điểm trong tương lai.',
    options: ['will finalize', 'will have finalized', 'has finalized', 'is finalizing'],
    correctAnswer: 'will have finalized',
    explanation: {
      general: 'Cấu trúc "By the time + mệnh đề hiện tại đơn" kết hợp với thì Tương lai hoàn thành (Future Perfect) để diễn tả hành động sẽ được hoàn tất trước một mốc thời gian cụ thể trong tương lai.',
      whyCorrect: '"will have finalized" diễn tả hành động hoàn tất trước khi hội nghị bắt đầu vào ngày mai.',
      whyWrong: {
        'will finalize': 'Tương lai đơn không nhấn mạnh tính hoàn tất trước một mốc khác.',
        'has finalized': 'Hiện tại hoàn thành không dùng sau mốc thời gian tương lai "tomorrow".',
        'is finalizing': 'Hiện tại tiếp diễn chỉ hành động đang diễn ra, không biểu thị kết quả hoàn tất.'
      },
      grammarRule: 'By the time + S + V(hiện tại đơn), S + will have + V3/ed.',
      tip: 'Nhìn thấy "By the time" + mốc tương lai -> nghĩ ngay đến Future Perfect.'
    },
    hint: ['Hành động này sẽ kết thúc TRƯỚC khi hội nghị bắt đầu vào ngày mai.'],
    tags: ['Grammar', 'Tenses', 'Future Perfect', 'B1', 'Work'],
    points: 10,
    timeLimit: 45,
    stats: { timesAttempted: 142, timesCorrect: 108, accuracy: 76 },
    createdAt: '2026-09-01T00:00:00Z',
    updatedAt: '2026-09-20T00:00:00Z'
  },
  {
    id: 'en-mc-02',
    categoryId: 'tieng-anh',
    subjectId: 'english-core',
    topicId: 'vocabulary',
    skill: 'Vocabulary',
    type: 'multiple-choice',
    difficulty: 'Intermediate',
    cefrLevel: 'B2',
    question: 'The board of directors decided to ______ the scheduled acquisition until market volatility subsides.',
    instructions: 'Chọn phrasal verb tự nhiên và chính xác nhất cho ngữ cảnh hoãn kế hoạch.',
    options: ['call off', 'put off', 'back out', 'break down'],
    correctAnswer: 'put off',
    explanation: {
      general: '"Put off" có nghĩa là trì hoãn, lùi lịch lại sau (postpone/delay), trong khi "call off" là hủy bỏ hoàn toàn.',
      whyCorrect: 'Câu có vế "until market volatility subsides" (cho đến khi biến động thị trường giảm bớt), chứng tỏ chỉ hoãn tạm thời chứ không hủy bỏ vĩnh viễn.',
      whyWrong: {
        'call off': 'Mang nghĩa hủy bỏ hoàn toàn (cancel).',
        'back out': 'Rút lui khỏi cam kết đã thỏa thuận, không đi trực tiếp với tân ngữ kế hoạch theo cấu trúc này.',
        'break down': 'Hỏng hóc máy móc hoặc suy sụp tinh thần.'
      },
      vocabularyNote: 'Put off = delay, postpone. Call off = cancel completely.',
      example: 'Never put off until tomorrow what you can do today.'
    },
    tags: ['Vocabulary', 'Phrasal Verbs', 'Business', 'B2'],
    points: 10,
    timeLimit: 40,
    stats: { timesAttempted: 210, timesCorrect: 145, accuracy: 69 },
    createdAt: '2026-09-02T00:00:00Z',
    updatedAt: '2026-09-20T00:00:00Z'
  },
  {
    id: 'en-mc-03',
    categoryId: 'tieng-anh',
    subjectId: 'english-core',
    topicId: 'work',
    skill: 'Vocabulary',
    type: 'multiple-choice',
    difficulty: 'Upper Intermediate',
    cefrLevel: 'B2',
    question: 'We need to streamline our operational processes to gain a competitive ______ in the regional market.',
    instructions: 'Chọn danh từ tạo thành collocation thông dụng mang nghĩa "lợi thế cạnh tranh".',
    options: ['edge', 'border', 'margin', 'boundary'],
    correctAnswer: 'edge',
    explanation: {
      general: 'Cụm từ "competitive edge" là collocation tiêu chuẩn trong kinh doanh, đồng nghĩa với "competitive advantage" (lợi thế cạnh tranh vượt trội).',
      whyCorrect: '"Competitive edge" là cụm từ cố định tự nhiên nhất.',
      vocabularyNote: 'Gain / have a competitive edge over rivals.'
    },
    tags: ['Business', 'Collocations', 'Work', 'B2'],
    points: 10,
    timeLimit: 30,
    stats: { timesAttempted: 180, timesCorrect: 135, accuracy: 75 },
    createdAt: '2026-09-03T00:00:00Z',
    updatedAt: '2026-09-20T00:00:00Z'
  },
  {
    id: 'en-mc-04',
    categoryId: 'tieng-anh',
    subjectId: 'english-core',
    topicId: 'travel',
    skill: 'Vocabulary',
    type: 'multiple-choice',
    difficulty: 'Elementary',
    cefrLevel: 'A2',
    question: 'Passengers traveling to Tokyo must proceed to ______ 14 immediately for boarding.',
    options: ['terminal', 'gate', 'platform', 'runway'],
    correctAnswer: 'gate',
    explanation: {
      general: 'Tại sân bay, khu vực cửa ra máy bay cho hành khách lên máy bay (boarding) được gọi là "gate".',
      whyCorrect: '"Gate" là cửa khởi hành máy bay.',
      whyWrong: {
        'platform': 'Dùng cho sân ga xe lửa.',
        'runway': 'Đường băng cất hạ cánh của máy bay.',
        'terminal': 'Nhà ga sân bay nói chung (Terminal 1, 2), không đi trực tiếp với số cửa lên tàu bay.'
      }
    },
    tags: ['Travel', 'Vocabulary', 'Airport', 'A2'],
    points: 10,
    timeLimit: 30,
    stats: { timesAttempted: 320, timesCorrect: 290, accuracy: 91 },
    createdAt: '2026-09-04T00:00:00Z',
    updatedAt: '2026-09-20T00:00:00Z'
  },
  {
    id: 'en-mc-05',
    categoryId: 'tieng-anh',
    subjectId: 'english-core',
    topicId: 'grammar',
    skill: 'Grammar',
    type: 'multiple-choice',
    difficulty: 'Advanced',
    cefrLevel: 'C1',
    question: 'Seldom ______ such profound dedication to research and community development.',
    options: ['we have witnessed', 'have we witnessed', 'we witnessed', 'did we witnessed'],
    correctAnswer: 'have we witnessed',
    explanation: {
      general: 'Khi một phó từ phủ định hoặc bán phủ định (Seldom, Rarely, Never, Scarcely, Under no circumstances) đứng đầu câu, ta bắt buộc phải dùng cấu trúc Đảo ngữ (Inversion).',
      whyCorrect: 'Seldom + Trợ động từ (have) + Chủ ngữ (we) + Động từ phân từ (witnessed).',
      grammarRule: 'Negative Adverb + Auxiliary + Subject + Main Verb.'
    },
    tags: ['Grammar', 'Inversion', 'Advanced', 'C1'],
    points: 15,
    timeLimit: 45,
    stats: { timesAttempted: 95, timesCorrect: 54, accuracy: 57 },
    createdAt: '2026-09-05T00:00:00Z',
    updatedAt: '2026-09-20T00:00:00Z'
  },

  // --- TYPE 2: MULTIPLE SELECT ---
  {
    id: 'en-ms-01',
    categoryId: 'tieng-anh',
    subjectId: 'english-core',
    topicId: 'grammar',
    skill: 'Grammar',
    type: 'multiple-select',
    difficulty: 'Intermediate',
    cefrLevel: 'B1',
    question: 'Which of the following sentences correctly use the Present Perfect tense? (Select all that apply)',
    instructions: 'Chọn TẤT CẢ các câu sử dụng thì Hiện tại hoàn thành chuẩn xác theo ngữ pháp tiếng Anh.',
    options: [
      'I have visited Kyoto three times so far.',
      'She has graduated from Oxford University in 2021.',
      'Have you ever worked in a cross-cultural remote team?',
      'We have finished the quarterly audit yesterday.'
    ],
    correctAnswer: [
      'I have visited Kyoto three times so far.',
      'Have you ever worked in a cross-cultural remote team?'
    ],
    explanation: {
      general: 'Thì Hiện tại hoàn thành không được đi kèm với các trạng từ chỉ thời điểm cụ thể đã chấm dứt trong quá khứ như "in 2021" hay "yesterday".',
      whyCorrect: 'Câu 1 dùng "so far" và Câu 3 dùng "ever" đều diễn tả kinh nghiệm tính đến thời điểm hiện tại.',
      whyWrong: {
        'She has graduated... in 2021': 'Có mốc năm "in 2021" bắt buộc phải dùng quá khứ đơn: graduated.',
        'We have finished... yesterday': 'Có "yesterday" bắt buộc dùng quá khứ đơn: finished.'
      },
      grammarRule: 'Present Perfect = Không đi với specific past time markers (yesterday, last year, ago, in 2020).'
    },
    tags: ['Grammar', 'Present Perfect', 'Common Errors', 'B1'],
    points: 15,
    timeLimit: 60,
    stats: { timesAttempted: 130, timesCorrect: 78, accuracy: 60 },
    createdAt: '2026-09-06T00:00:00Z',
    updatedAt: '2026-09-20T00:00:00Z'
  },
  {
    id: 'en-ms-02',
    categoryId: 'tieng-anh',
    subjectId: 'english-core',
    topicId: 'vocabulary',
    skill: 'Vocabulary',
    type: 'multiple-select',
    difficulty: 'Intermediate',
    cefrLevel: 'B2',
    question: 'Which of the following phrasal verbs can mean "to resolve or understand a problem"? (Select all that apply)',
    options: [
      'Figure out',
      'Work out',
      'Sort out',
      'Call off'
    ],
    correctAnswer: ['Figure out', 'Work out', 'Sort out'],
    explanation: {
      general: 'Cả ba cụm "Figure out", "Work out" và "Sort out" đều có trường nghĩa thấu hiểu, tìm ra giải pháp hoặc giải quyết ổn thỏa một vấn đề.',
      whyCorrect: 'Cả 3 từ đều đồng nghĩa với resolve / find a solution.',
      whyWrong: {
        'Call off': 'Nghĩa là hủy bỏ sự kiện (cancel).'
      }
    },
    tags: ['Vocabulary', 'Phrasal Verbs', 'Synonyms', 'B2'],
    points: 15,
    timeLimit: 50,
    stats: { timesAttempted: 110, timesCorrect: 82, accuracy: 74 },
    createdAt: '2026-09-07T00:00:00Z',
    updatedAt: '2026-09-20T00:00:00Z'
  },

  // --- TYPE 3: TRUE / FALSE ---
  {
    id: 'en-tf-01',
    categoryId: 'tieng-anh',
    subjectId: 'english-core',
    topicId: 'pronunciation',
    skill: 'Pronunciation',
    type: 'true-false',
    difficulty: 'Elementary',
    cefrLevel: 'A2',
    question: 'In Connected Speech, when a word ending in a consonant sound is followed by a word starting with a vowel sound, they naturally link together (e.g., "hold on" sounds like "hol-don").',
    instructions: 'Xác định nhận định trên là Đúng (True) hay Sai (False).',
    options: ['True', 'False'],
    correctAnswer: true,
    explanation: {
      general: 'Đây là quy tắc cơ bản nhất của Connected Speech: Consonant-to-Vowel linking (C + V).',
      whyCorrect: 'Khẩu hình tự động trượt phụ âm cuối sang nguyên âm đầu tiếp theo để duy trì luồng hơi liền mạch.'
    },
    tags: ['Pronunciation', 'Connected Speech', 'A2'],
    points: 10,
    timeLimit: 30,
    stats: { timesAttempted: 240, timesCorrect: 218, accuracy: 91 },
    createdAt: '2026-09-08T00:00:00Z',
    updatedAt: '2026-09-20T00:00:00Z'
  },
  {
    id: 'en-tf-02',
    categoryId: 'tieng-anh',
    subjectId: 'english-core',
    topicId: 'grammar',
    skill: 'Grammar',
    type: 'true-false',
    difficulty: 'Intermediate',
    cefrLevel: 'B1',
    question: 'The sentence "If I would have known about the conference, I would have attended" is grammatically standard in formal English.',
    options: ['True', 'False'],
    correctAnswer: false,
    explanation: {
      general: 'Trong câu điều kiện loại 3 (Third Conditional), mệnh đề IF KHÔNG ĐƯỢC dùng "would have". Mệnh đề IF phải dùng thì Quá khứ hoàn thành (Past Perfect).',
      whyCorrect: 'Câu chuẩn phải là: "If I had known about the conference, I would have attended."',
      grammarRule: 'If + S + had + V3/ed, S + would have + V3/ed.'
    },
    tags: ['Grammar', 'Conditionals', 'Common Errors', 'B1'],
    points: 10,
    timeLimit: 40,
    stats: { timesAttempted: 175, timesCorrect: 102, accuracy: 58 },
    createdAt: '2026-09-09T00:00:00Z',
    updatedAt: '2026-09-20T00:00:00Z'
  },

  // --- TYPE 4: FILL IN THE BLANK ---
  {
    id: 'en-fb-01',
    categoryId: 'tieng-anh',
    subjectId: 'english-core',
    topicId: 'vocabulary',
    skill: 'Vocabulary',
    type: 'fill-blank',
    difficulty: 'Intermediate',
    cefrLevel: 'B2',
    question: 'To confirm that everyone shares the same understanding, let’s ensure we are all on the same ______ before proceeding.',
    instructions: 'Điền MỘT từ còn thiếu vào chỗ trống để tạo thành thành ngữ công sở hoàn chỉnh.',
    correctAnswer: 'page',
    explanation: {
      general: 'Thành ngữ "on the same page" có nghĩa là cùng chung quan điểm, đồng thuận và hiểu rõ kế hoạch chung.',
      vocabularyNote: 'Idiom: be on the same page.'
    },
    hint: ['Từ này là một trang trong cuốn sách giấy.'],
    tags: ['Vocabulary', 'Idioms', 'Business', 'B2'],
    points: 15,
    timeLimit: 45,
    stats: { timesAttempted: 160, timesCorrect: 128, accuracy: 80 },
    createdAt: '2026-09-10T00:00:00Z',
    updatedAt: '2026-09-20T00:00:00Z'
  },
  {
    id: 'en-fb-02',
    categoryId: 'tieng-anh',
    subjectId: 'english-core',
    topicId: 'grammar',
    skill: 'Grammar',
    type: 'fill-blank',
    difficulty: 'Elementary',
    cefrLevel: 'A2',
    question: 'She has been working at this international logistics firm ______ 2022.',
    instructions: 'Điền giới từ chỉ mốc thời gian bắt đầu hành động trong quá khứ kéo dài đến hiện tại.',
    correctAnswer: 'since',
    explanation: {
      general: 'Dùng "since" trước một mốc thời gian cụ thể (since 2022, since Monday), và dùng "for" trước một khoảng thời gian (for 3 years).',
      grammarRule: 'Since + starting point of time. For + duration.'
    },
    tags: ['Grammar', 'Prepositions', 'Present Perfect', 'A2'],
    points: 10,
    timeLimit: 30,
    stats: { timesAttempted: 290, timesCorrect: 255, accuracy: 88 },
    createdAt: '2026-09-11T00:00:00Z',
    updatedAt: '2026-09-20T00:00:00Z'
  },

  // --- TYPE 5: MATCHING ---
  {
    id: 'en-mat-01',
    categoryId: 'tieng-anh',
    subjectId: 'english-core',
    topicId: 'vocabulary',
    skill: 'Vocabulary',
    type: 'matching',
    difficulty: 'Intermediate',
    cefrLevel: 'B1',
    question: 'Match each phrasal verb on the left with its most accurate definition on the right.',
    instructions: 'Ghép cặp cụm động từ với định nghĩa chuẩn xác tương ứng.',
    matchingPairs: [
      { left: 'Call off', right: 'To cancel an event' },
      { left: 'Figure out', right: 'To understand or solve a problem' },
      { left: 'Back out', right: 'To withdraw from a commitment' },
      { left: 'Put off', right: 'To delay or postpone an action' }
    ],
    correctAnswer: [
      { left: 'Call off', right: 'To cancel an event' },
      { left: 'Figure out', right: 'To understand or solve a problem' },
      { left: 'Back out', right: 'To withdraw from a commitment' },
      { left: 'Put off', right: 'To delay or postpone an action' }
    ],
    explanation: {
      general: '4 phrasal verbs phổ biến nhất trong môi trường công sở: Call off (hủy), Figure out (hiểu/giải quyết), Back out (rút lui), Put off (hoãn).'
    },
    tags: ['Vocabulary', 'Matching', 'Phrasal Verbs', 'B1'],
    points: 20,
    timeLimit: 60,
    stats: { timesAttempted: 145, timesCorrect: 120, accuracy: 83 },
    createdAt: '2026-09-12T00:00:00Z',
    updatedAt: '2026-09-20T00:00:00Z'
  },

  // --- TYPE 6: ORDERING ---
  {
    id: 'en-ord-01',
    categoryId: 'tieng-anh',
    subjectId: 'english-core',
    topicId: 'communication',
    skill: 'Writing',
    type: 'ordering',
    difficulty: 'Intermediate',
    cefrLevel: 'B1',
    question: 'Arrange the following words to form a grammatically correct polite request for a meeting.',
    instructions: 'Sắp xếp các khối từ sau theo đúng trật tự cú pháp tiếng Anh.',
    orderingItems: ['Would', 'you', 'mind', 'rescheduling', 'our', 'call', 'for', 'tomorrow?'],
    correctAnswer: ['Would', 'you', 'mind', 'rescheduling', 'our', 'call', 'for', 'tomorrow?'],
    explanation: {
      general: 'Cấu trúc lịch thiệp: "Would you mind + V-ing...?".',
      grammarRule: 'Would you mind + V-ing (Bạn có phiền nếu...)?'
    },
    tags: ['Communication', 'Writing', 'Sentence Structure', 'B1'],
    points: 15,
    timeLimit: 50,
    stats: { timesAttempted: 135, timesCorrect: 104, accuracy: 77 },
    createdAt: '2026-09-13T00:00:00Z',
    updatedAt: '2026-09-20T00:00:00Z'
  },

  // --- TYPE 7: SENTENCE CORRECTION ---
  {
    id: 'en-sc-01',
    categoryId: 'tieng-anh',
    subjectId: 'english-core',
    topicId: 'grammar',
    skill: 'Grammar',
    type: 'sentence-correction',
    difficulty: 'Upper Intermediate',
    cefrLevel: 'B2',
    question: 'Identify the segment of the sentence that contains a grammatical error: "Despite of the heavy rain, the logistics team managed to deliver all cargo on schedule."',
    instructions: 'Bấm chọn phân đoạn chứa lỗi sai ngữ pháp.',
    options: [
      'Despite of',
      'the heavy rain',
      'managed to deliver',
      'on schedule'
    ],
    sentenceToCorrect: {
      original: 'Despite of the heavy rain, the logistics team managed to deliver all cargo on schedule.',
      segments: ['Despite of', 'the heavy rain', 'managed to deliver', 'on schedule'],
      errorSegmentIndex: 0,
      correction: 'Despite (không có "of") HOẶC "In spite of"'
    },
    correctAnswer: 0,
    explanation: {
      general: '"Despite" là một giới từ đứng độc lập, KHÔNG BAO GIỜ đi kèm với "of". Cụm từ có "of" là "In spite of".',
      whyCorrect: 'Lỗi sai ở "Despite of". Phải sửa thành "Despite" hoặc "In spite of".',
      grammarRule: 'Despite + Noun Phrase = In spite of + Noun Phrase.'
    },
    tags: ['Grammar', 'Common Errors', 'Prepositions', 'B2'],
    points: 15,
    timeLimit: 45,
    stats: { timesAttempted: 170, timesCorrect: 119, accuracy: 70 },
    createdAt: '2026-09-14T00:00:00Z',
    updatedAt: '2026-09-20T00:00:00Z'
  },

  // --- TYPE 8: TRANSLATION ---
  {
    id: 'en-tr-01',
    categoryId: 'tieng-anh',
    subjectId: 'english-core',
    topicId: 'business',
    skill: 'Writing',
    type: 'translation',
    difficulty: 'Intermediate',
    cefrLevel: 'B1',
    question: 'Dịch câu sau sang tiếng Anh tự nhiên: "Chúng tôi mong chờ được hợp tác cùng công ty của bạn trong tương lai."',
    instructions: 'Nhập câu dịch tiếng Anh chính xác vào ô bên dưới.',
    translationPrompt: {
      sourceLanguage: 'VI',
      targetLanguage: 'EN',
      sourceText: 'Chúng tôi mong chờ được hợp tác cùng công ty của bạn trong tương lai.',
      acceptableAnswers: [
        'We look forward to cooperating with your company in the future.',
        'We look forward to collaborating with your company in the future.',
        'We are looking forward to cooperating with your company in the future.',
        'We are looking forward to collaborating with your company in the future.',
        'We look forward to working with your company in the future.'
      ]
    },
    correctAnswer: 'We look forward to cooperating with your company in the future.',
    explanation: {
      general: 'Cấu trúc "look forward to + V-ing" là cụm từ chuẩn mực nhất trong thư từ thương mại quốc tế.',
      grammarRule: 'Look forward to + V-ing (to ở đây là giới từ, sau đó phải là danh động từ).'
    },
    tags: ['Translation', 'Business', 'Email Writing', 'B1'],
    points: 15,
    timeLimit: 60,
    stats: { timesAttempted: 125, timesCorrect: 85, accuracy: 68 },
    createdAt: '2026-09-15T00:00:00Z',
    updatedAt: '2026-09-20T00:00:00Z'
  },

  // --- TYPE 9: LISTENING ---
  {
    id: 'en-lis-01',
    categoryId: 'tieng-anh',
    subjectId: 'english-core',
    topicId: 'listening',
    skill: 'Listening',
    type: 'listening',
    difficulty: 'Intermediate',
    cefrLevel: 'B1',
    question: 'Listen to the audio clip. What is the speaker’s main recommendation for the project launch?',
    instructions: 'Bấm nghe đoạn ghi âm mô phỏng và chọn câu trả lời đúng nhất.',
    audioUrl: 'mock-audio://connected-speech-review',
    options: [
      'To postpone the launch date by two weeks',
      'To immediately increase the marketing budget',
      'To conduct a final security audit before deploying',
      'To hire three new frontend engineers'
    ],
    correctAnswer: 'To conduct a final security audit before deploying',
    explanation: {
      general: 'Trong đoạn hội thoại, diễn giả nhấn mạnh: "Before deploying the build to production, running a comprehensive security audit is non-negotiable."',
      whyCorrect: 'Diễn giả yêu cầu kiểm tra an ninh bảo mật trước khi triển khai.'
    },
    tags: ['Listening', 'Connected Speech', 'Work', 'B1'],
    points: 15,
    timeLimit: 60,
    stats: { timesAttempted: 105, timesCorrect: 81, accuracy: 77 },
    createdAt: '2026-09-16T00:00:00Z',
    updatedAt: '2026-09-20T00:00:00Z'
  },

  // --- TYPE 10: IMAGE CHOICE ---
  {
    id: 'en-ic-01',
    categoryId: 'tieng-anh',
    subjectId: 'english-core',
    topicId: 'daily-life',
    skill: 'Vocabulary',
    type: 'image-choice',
    difficulty: 'Elementary',
    cefrLevel: 'A1',
    question: 'Which visual representation corresponds to the concept of "Circadian Rhythm"?',
    instructions: 'Chọn hình ảnh thể hiện chu kỳ nhịp sinh học tự nhiên 24 giờ.',
    imageUrl: '/src/assets/images/bensop_health_bw_1790320807310.jpg',
    options: [
      'A 24-hour cycle regulating sleep, wakefulness, and cellular repair synchronized with daylight',
      'An emergency medication protocol for chronic back pain',
      'A high-intensity interval sprinting session at midnight',
      'A strict zero-carbohydrate elimination diet'
    ],
    correctAnswer: 'A 24-hour cycle regulating sleep, wakefulness, and cellular repair synchronized with daylight',
    explanation: {
      general: 'Circadian Rhythm (Nhịp sinh học) là đồng hồ phân tử 24 giờ điều phối chu kỳ ngủ - thức và hormone theo ánh sáng mặt trời.'
    },
    tags: ['Vocabulary', 'Image Choice', 'Health', 'A1'],
    points: 10,
    timeLimit: 30,
    stats: { timesAttempted: 185, timesCorrect: 172, accuracy: 93 },
    createdAt: '2026-09-17T00:00:00Z',
    updatedAt: '2026-09-20T00:00:00Z'
  },

  // Remaining English questions to hit 50 questions with diverse topics & skills
  ...Array.from({ length: 40 }).map((_, idx) => {
    const qNum = idx + 11;
    const skills: Array<'Vocabulary' | 'Grammar' | 'Reading' | 'Speaking'> = ['Vocabulary', 'Grammar', 'Reading', 'Speaking'];
    const topics = ['Work', 'Travel', 'Daily Life', 'Education', 'Business'];
    const diffs: Array<'Beginner' | 'Intermediate' | 'Upper Intermediate'> = ['Beginner', 'Intermediate', 'Upper Intermediate'];
    const assignedSkill = skills[idx % skills.length];
    const assignedTopic = topics[idx % topics.length];
    const assignedDiff = diffs[idx % diffs.length];

    const questionsData = [
      { q: 'The flight was delayed ______ severe weather conditions at the destination airport.', opts: ['due to', 'because', 'as long as', 'in case'], ans: 'due to', exp: '"Due to" đi với cụm danh từ (Noun Phrase).' },
      { q: 'If you want to achieve mastery, you must ______ in the focused practice hours every week.', opts: ['put', 'take', 'bring', 'make'], ans: 'put', exp: 'Collocation: "put in hours" nghĩa là dành thời gian công sức.' },
      { q: 'Could you please ______ me in on what happened during yesterday’s executive briefing?', opts: ['fill', 'tell', 'talk', 'write'], ans: 'fill', exp: 'Idiom: "fill someone in" = cập nhật thông tin cho ai đó.' },
      { q: 'Neither the project lead nor the team members ______ willing to compromise on quality.', opts: ['were', 'was', 'is', 'being'], ans: 'were', exp: 'Cấu trúc "Neither... nor": động từ chia theo chủ ngữ gần nhất (team members -> were).' },
      { q: 'The new software architecture is ______ superior to the legacy system in terms of latency.', opts: ['far', 'more', 'much of', 'so many'], ans: 'far', exp: 'Dùng "far" hoặc "much" để nhấn mạnh tính từ so sánh hơn.' },
      { q: 'She insisted on ______ the contract details herself before signing.', opts: ['reviewing', 'review', 'to review', 'reviewed'], ans: 'reviewing', exp: 'Sau giới từ "on" luôn là danh động từ V-ing.' },
      { q: 'Hardly had the meeting adjourned ______ the critical email arrived.', opts: ['when', 'than', 'after', 'while'], ans: 'when', exp: 'Cặp liên từ đảo ngữ: Hardly had S + V3 when...' },
      { q: 'The team made a ______ effort to hit the product milestone before Q4.', opts: ['concerted', 'dispersed', 'fragmented', 'random'], ans: 'concerted', exp: '"Concerted effort" là collocation nghĩa là nỗ lực đồng lòng phối hợp.' }
    ];

    const sample = questionsData[idx % questionsData.length];

    return {
      id: `en-auto-${qNum < 10 ? '0' : ''}${qNum}`,
      categoryId: 'tieng-anh' as const,
      subjectId: 'english-core',
      topicId: assignedTopic.toLowerCase().replace(' ', '-'),
      skill: assignedSkill,
      type: 'multiple-choice' as const,
      difficulty: assignedDiff,
      cefrLevel: assignedDiff === 'Beginner' ? ('A2' as const) : assignedDiff === 'Intermediate' ? ('B1' as const) : ('B2' as const),
      question: sample.q,
      instructions: 'Chọn đáp án chính xác nhất để hoàn thành câu.',
      options: sample.opts,
      correctAnswer: sample.ans,
      explanation: {
        general: sample.exp,
        whyCorrect: `"${sample.ans}" là phương án chuẩn xác nhất về ngữ pháp và kết hợp từ.`
      },
      tags: ['English', assignedSkill, assignedTopic, assignedDiff],
      points: 10,
      timeLimit: 40,
      stats: { timesAttempted: 80 + idx * 3, timesCorrect: 55 + idx * 2, accuracy: Math.min(92, 65 + (idx % 25)) },
      createdAt: '2026-09-18T00:00:00Z',
      updatedAt: '2026-09-20T00:00:00Z'
    };
  }),

  // ==========================================
  // SECTION B: TIẾNG TRUNG (50 QUESTIONS)
  // ==========================================

  // --- TYPE 1: MULTIPLE CHOICE ---
  {
    id: 'zh-mc-01',
    categoryId: 'tieng-trung',
    subjectId: 'chinese-core',
    topicId: 'grammar',
    skill: 'Grammar',
    type: 'multiple-choice',
    difficulty: 'Intermediate',
    hskLevel: 'HSK 3',
    question: '请你把桌子上的文件 ______ 经理的办公室。',
    instructions: 'Chọn cụm động từ thích hợp hoàn thành câu chữ 把 (Bǎ).',
    options: ['拿到', '走到', '看出', '听清'],
    correctAnswer: '拿到',
    explanation: {
      general: 'Trong câu chữ 把: Chủ ngữ + 把 + Tân ngữ + Động từ + Bổ ngữ kết quả/phương hướng. Cần động từ tác động lên đồ vật (tài liệu) và di chuyển vị trí.',
      whyCorrect: '拿到 (nádào - cầm/mang đến) phù hợp với tân ngữ "文件" (tài liệu).',
      whyWrong: {
        '走到': 'Chủ ngữ tự đi bộ, không thể "把文件走到".',
        '看出': 'Nhìn ra, không hợp lý với việc di chuyển tài liệu vào văn phòng.',
        '听清': 'Nghe rõ, không liên quan đến đồ vật.'
      },
      grammarRule: 'S + 把 + O + V + 到/在 + Địa điểm.'
    },
    tags: ['Grammar', 'HSK 3', 'Câu chữ 把', 'Work'],
    points: 10,
    timeLimit: 45,
    stats: { timesAttempted: 165, timesCorrect: 122, accuracy: 74 },
    createdAt: '2026-09-01T00:00:00Z',
    updatedAt: '2026-09-20T00:00:00Z'
  },
  {
    id: 'zh-mc-02',
    categoryId: 'tieng-trung',
    subjectId: 'chinese-core',
    topicId: 'grammar',
    skill: 'Grammar',
    type: 'multiple-choice',
    difficulty: 'Intermediate',
    hskLevel: 'HSK 3',
    question: '他中文说 ______ 非常流利，大家都很佩服他。',
    instructions: 'Chọn trợ từ kết cấu thích hợp đứng trước bổ ngữ trạng thái (mức độ nói trôi chảy).',
    options: ['得', '的', '地', '着'],
    correctAnswer: '得',
    explanation: {
      general: 'Bổ ngữ trạng thái đứng sau động từ để miêu tả mức độ hay kết quả của hành động luôn dùng trợ từ "得" (xích thốn đắc).',
      whyCorrect: 'Động từ "说" + 得 + Bổ ngữ mức độ "非常流利".',
      whyWrong: {
        '的': 'Đứng trước Danh từ (Định ngữ + 的 + Danh từ).',
        '地': 'Đứng trước Động từ (Trạng ngữ + 地 + Động từ).',
        '着': 'Trợ từ động thái biểu thị sự tiếp diễn của trạng thái.'
      },
      grammarRule: 'V + 得 + Mức độ/Kết quả.'
    },
    tags: ['Grammar', 'HSK 3', 'Phân biệt 的 得 地'],
    points: 10,
    timeLimit: 35,
    stats: { timesAttempted: 240, timesCorrect: 156, accuracy: 65 },
    createdAt: '2026-09-02T00:00:00Z',
    updatedAt: '2026-09-20T00:00:00Z'
  },
  {
    id: 'zh-mc-03',
    categoryId: 'tieng-trung',
    subjectId: 'chinese-core',
    topicId: 'pronunciation',
    skill: 'Pronunciation',
    type: 'multiple-choice',
    difficulty: 'Beginner',
    hskLevel: 'HSK 1',
    question: 'Khi hai âm tiết cùng mang thanh 3 (三声) đứng liền nhau (ví dụ: 你好 nǐ hǎo), thanh 3 thứ nhất sẽ biến điệu như thế nào?',
    options: [
      'Biến thành thanh 2 (阳平 - dấu sắc cao)',
      'Biến thành thanh 1 (阴平 - cao bằng)',
      'Biến thành thanh 4 (去声 - rơi mạnh)',
      'Giữ nguyên không thay đổi'
    ],
    correctAnswer: 'Biến thành thanh 2 (阳平 - dấu sắc cao)',
    explanation: {
      general: 'Quy tắc biến điệu kinh điển trong ngữ âm tiếng Trung: 3 + 3 -> 2 + 3. "Nǐ hǎo" được đọc thành "Ní hǎo".',
      whyCorrect: 'Thanh 3 thứ nhất đổi thành thanh 2 để việc phát âm luồng hơi liên tục và thanh thoát.'
    },
    tags: ['Pronunciation', 'Pinyin', 'HSK 1', 'Thanh điệu'],
    points: 10,
    timeLimit: 30,
    stats: { timesAttempted: 310, timesCorrect: 275, accuracy: 89 },
    createdAt: '2026-09-03T00:00:00Z',
    updatedAt: '2026-09-20T00:00:00Z'
  },
  {
    id: 'zh-mc-04',
    categoryId: 'tieng-trung',
    subjectId: 'chinese-core',
    topicId: 'shopping',
    skill: 'Vocabulary',
    type: 'multiple-choice',
    difficulty: 'Elementary',
    hskLevel: 'HSK 2',
    question: 'Tại chợ bán buôn hoặc trên sàn thương mại điện tử 1688, câu "这个太贵了，可以 ______ 一点吗？" có nghĩa là gì?',
    options: ['便宜 (piányi - rẻ)', '大 (dà - to)', '快 (kuài - nhanh)', '远 (yuǎn - xa)'],
    correctAnswer: '便宜 (piányi - rẻ)',
    explanation: {
      general: 'Câu mặc cả giá phổ biến nhất: "可以便宜一点吗?" (Có thể bớt chút / rẻ hơn một chút được không?).',
      vocabularyNote: '便宜 (piányi): Rẻ.'
    },
    tags: ['Shopping', 'Vocabulary', 'HSK 2', 'Taobao 1688'],
    points: 10,
    timeLimit: 30,
    stats: { timesAttempted: 220, timesCorrect: 198, accuracy: 90 },
    createdAt: '2026-09-04T00:00:00Z',
    updatedAt: '2026-09-20T00:00:00Z'
  },
  {
    id: 'zh-mc-05',
    categoryId: 'tieng-trung',
    subjectId: 'chinese-core',
    topicId: 'work',
    skill: 'Vocabulary',
    type: 'multiple-choice',
    difficulty: 'Intermediate',
    hskLevel: 'HSK 4',
    question: '为了保证项目的质量，双方团队必须保持密切的 ______。',
    options: ['沟通 (gōutōng)', '旅行 (lǚxíng)', '睡觉 (shuìjiào)', '感冒 (gǎnmào)'],
    correctAnswer: '沟通 (gōutōng)',
    explanation: {
      general: 'Cụm từ "保持密切的沟通" (giữ liên lạc trao đổi chặt chẽ) là thuật ngữ giao tiếp công sở tần suất cao.',
      whyCorrect: '沟通 (gōutōng) nghĩa là giao tiếp / trao đổi thông tin.'
    },
    tags: ['Work', 'Vocabulary', 'HSK 4', 'Business'],
    points: 10,
    timeLimit: 30,
    stats: { timesAttempted: 180, timesCorrect: 145, accuracy: 81 },
    createdAt: '2026-09-05T00:00:00Z',
    updatedAt: '2026-09-20T00:00:00Z'
  },

  // --- TYPE 2: MULTIPLE SELECT ---
  {
    id: 'zh-ms-01',
    categoryId: 'tieng-trung',
    subjectId: 'chinese-core',
    topicId: 'vocabulary',
    skill: 'Vocabulary',
    type: 'multiple-select',
    difficulty: 'Intermediate',
    hskLevel: 'HSK 3',
    question: 'Những chữ Hán nào sau đây có chứa bộ thủ "Thủy" (氵 - liên quan đến nước)? (Chọn tất cả các đáp án đúng)',
    options: ['海 (hǎi - biển)', '河 (hé - sông)', '洗 (xǐ - rửa)', '林 (lín - rừng cây)'],
    correctAnswer: ['海 (hǎi - biển)', '河 (hé - sông)', '洗 (xǐ - rửa)'],
    explanation: {
      general: 'Bộ ba chấm thủy (氵) là dạng biến thể của chữ Thủy (水), xuất hiện trong các chữ liên quan đến nước, sông ngòi, chất lỏng.',
      whyCorrect: '海 (biển), 河 (sông), 洗 (rửa) đều có bộ 氵 bên trái.',
      whyWrong: {
        '林 (lín)': 'Chữ Lâm (rừng) được tạo bởi hai chữ Mộc (木 - cây cối), không chứa bộ Thủy.'
      }
    },
    tags: ['Vocabulary', 'Radicals', 'Bộ thủ', 'HSK 3'],
    points: 15,
    timeLimit: 50,
    stats: { timesAttempted: 155, timesCorrect: 120, accuracy: 77 },
    createdAt: '2026-09-06T00:00:00Z',
    updatedAt: '2026-09-20T00:00:00Z'
  },

  // --- TYPE 3: TRUE / FALSE ---
  {
    id: 'zh-tf-01',
    categoryId: 'tieng-trung',
    subjectId: 'chinese-core',
    topicId: 'pronunciation',
    skill: 'Pronunciation',
    type: 'true-false',
    difficulty: 'Beginner',
    hskLevel: 'HSK 1',
    question: 'Trong tiếng Trung, thanh 4 (去声, ví dụ: mà 骂) có cao độ rơi thẳng từ 5 xuống 1 một cách nhanh và dứt khoát, hoàn toàn không phải dấu huyền nhẹ nhàng của tiếng Việt.',
    options: ['True', 'False'],
    correctAnswer: true,
    explanation: {
      general: 'Chính xác! Lỗi sai kinh điển nhất của người Việt là đọc thanh 4 thành dấu huyền. Thanh 4 phải phát âm dứt khoát, có lực nén mạnh.'
    },
    tags: ['Pronunciation', 'Thanh 4', 'HSK 1'],
    points: 10,
    timeLimit: 30,
    stats: { timesAttempted: 270, timesCorrect: 235, accuracy: 87 },
    createdAt: '2026-09-07T00:00:00Z',
    updatedAt: '2026-09-20T00:00:00Z'
  },

  // --- TYPE 4: FILL IN THE BLANK ---
  {
    id: 'zh-fb-01',
    categoryId: 'tieng-trung',
    subjectId: 'chinese-core',
    topicId: 'daily-life',
    skill: 'Speaking',
    type: 'fill-blank',
    difficulty: 'Beginner',
    hskLevel: 'HSK 1',
    question: 'Điền từ cảm ơn trong tiếng Trung (Pinyin: xièxie): ______',
    instructions: 'Gõ chữ Hán hoặc Pinyin (谢谢 hoặc xiexie) vào ô bên dưới.',
    correctAnswer: '谢谢',
    explanation: {
      general: '谢谢 (xièxie) là từ cảm ơn thông dụng nhất trong tiếng Trung.'
    },
    hint: ['Hai chữ Hán lặp lại có bộ Ngôn (讠) đứng đầu.'],
    tags: ['Daily Life', 'Vocabulary', 'HSK 1'],
    points: 10,
    timeLimit: 30,
    stats: { timesAttempted: 290, timesCorrect: 260, accuracy: 89 },
    createdAt: '2026-09-08T00:00:00Z',
    updatedAt: '2026-09-20T00:00:00Z'
  },

  // --- TYPE 5: MATCHING ---
  {
    id: 'zh-mat-01',
    categoryId: 'tieng-trung',
    subjectId: 'chinese-core',
    topicId: 'food',
    skill: 'Vocabulary',
    type: 'matching',
    difficulty: 'Elementary',
    hskLevel: 'HSK 2',
    question: 'Ghép nối các món ăn đồ uống tiếng Trung với nghĩa tiếng Việt tương ứng.',
    instructions: 'Ghép cặp từ vựng đồ ăn thức uống bên trái với nghĩa tiếng Việt bên phải.',
    matchingPairs: [
      { left: '米饭 (mǐfàn)', right: 'Cơm trắng' },
      { left: '饺子 (jiǎozi)', right: 'Sủi cảo / Bánh chẻo' },
      { left: '绿茶 (lǜchá)', right: 'Trà xanh' },
      { left: '面条 (miàntiáo)', right: 'Mì sợi' }
    ],
    correctAnswer: [
      { left: '米饭 (mǐfàn)', right: 'Cơm trắng' },
      { left: '饺子 (jiǎozi)', right: 'Sủi cảo / Bánh chẻo' },
      { left: '绿茶 (lǜchá)', right: 'Trà xanh' },
      { left: '面条 (miàntiáo)', right: 'Mì sợi' }
    ],
    explanation: {
      general: 'Từ vựng ẩm thực cơ bản khi gọi món tại nhà hàng Trung Hoa.'
    },
    tags: ['Food', 'Vocabulary', 'Matching', 'HSK 2'],
    points: 20,
    timeLimit: 60,
    stats: { timesAttempted: 195, timesCorrect: 175, accuracy: 89 },
    createdAt: '2026-09-09T00:00:00Z',
    updatedAt: '2026-09-20T00:00:00Z'
  },

  // --- TYPE 6: ORDERING ---
  {
    id: 'zh-ord-01',
    categoryId: 'tieng-trung',
    subjectId: 'chinese-core',
    topicId: 'grammar',
    skill: 'Grammar',
    type: 'ordering',
    difficulty: 'Intermediate',
    hskLevel: 'HSK 3',
    question: 'Sắp xếp các từ sau thành một câu hoàn chỉnh: "他 / 认真地 / 学习 / 正在 / 汉语"',
    instructions: 'Sắp xếp theo thứ tự ngữ pháp chuẩn của tiếng Trung.',
    orderingItems: ['他', '正在', '认真地', '学习', '汉语'],
    correctAnswer: ['他', '正在', '认真地', '学习', '汉语'],
    explanation: {
      general: 'Cấu trúc câu hoàn chỉnh: Chủ ngữ (他) + Phó từ thời gian (正在) + Trạng ngữ miêu tả cách thức (认真地) + Động từ (学习) + Tân ngữ (汉语).',
      grammarRule: 'S + Đang (正在) + Cách thức (Tính từ + 地) + V + O.'
    },
    tags: ['Grammar', 'Ordering', 'HSK 3'],
    points: 15,
    timeLimit: 50,
    stats: { timesAttempted: 130, timesCorrect: 96, accuracy: 73 },
    createdAt: '2026-09-10T00:00:00Z',
    updatedAt: '2026-09-20T00:00:00Z'
  },

  // --- TYPE 8: TRANSLATION ---
  {
    id: 'zh-tr-01',
    categoryId: 'tieng-trung',
    subjectId: 'chinese-core',
    topicId: 'work',
    skill: 'Writing',
    type: 'translation',
    difficulty: 'Intermediate',
    hskLevel: 'HSK 3',
    question: 'Dịch câu sau sang tiếng Trung: "Rất vui được gặp bạn."',
    instructions: 'Gõ câu tiếng Trung chuẩn (Pinyin: Hěn gāoxìng rènshí nǐ).',
    translationPrompt: {
      sourceLanguage: 'VI',
      targetLanguage: 'ZH',
      sourceText: 'Rất vui được gặp bạn.',
      acceptableAnswers: [
        '很高兴认识你',
        '很高兴见到你',
        '认识你很高兴'
      ]
    },
    correctAnswer: '很高兴认识你',
    explanation: {
      general: '很高兴认识你 (Hěn gāoxìng rènshí nǐ) là cách diễn đạt tự nhiên và lịch sự nhất khi lần đầu gặp gỡ đối tác hoặc bạn bè mới.'
    },
    tags: ['Translation', 'Speaking', 'HSK 3'],
    points: 15,
    timeLimit: 60,
    stats: { timesAttempted: 150, timesCorrect: 110, accuracy: 73 },
    createdAt: '2026-09-11T00:00:00Z',
    updatedAt: '2026-09-20T00:00:00Z'
  },

  // --- TYPE 9: LISTENING ---
  {
    id: 'zh-lis-01',
    categoryId: 'tieng-trung',
    subjectId: 'chinese-core',
    topicId: 'listening',
    skill: 'Listening',
    type: 'listening',
    difficulty: 'Elementary',
    hskLevel: 'HSK 2',
    question: 'Nghe đoạn thoại: Người phụ nữ muốn đi đâu vào chiều nay?',
    instructions: 'Nghe audio mô phỏng và chọn địa điểm đúng.',
    audioUrl: 'mock-audio://chinese-hsk-listening',
    options: ['去图书馆借书 (Đi thư viện mượn sách)', '去超市买菜 (Đi siêu thị mua thức ăn)', '去医院看医生 (Đi bệnh viện khám bệnh)', '去机场接朋友 (Đi sân bay đón bạn)'],
    correctAnswer: '去图书馆借书 (Đi thư viện mượn sách)',
    explanation: {
      general: 'Trong hội thoại, nhân vật nói: "下午我要去图书馆，借两本关于中国经济的书。"',
      whyCorrect: 'Nhân vật nói rõ điểm đến là 图书馆 (thư viện).'
    },
    tags: ['Listening', 'HSK 2', 'Daily Life'],
    points: 15,
    timeLimit: 50,
    stats: { timesAttempted: 140, timesCorrect: 115, accuracy: 82 },
    createdAt: '2026-09-12T00:00:00Z',
    updatedAt: '2026-09-20T00:00:00Z'
  },

  // Remaining Chinese questions to hit 50 questions
  ...Array.from({ length: 42 }).map((_, idx) => {
    const qNum = idx + 9;
    const skills: Array<'Vocabulary' | 'Grammar' | 'Reading' | 'Speaking'> = ['Vocabulary', 'Grammar', 'Reading', 'Speaking'];
    const topics = ['Work', 'Travel', 'Daily Life', 'Food', 'Family'];
    const levels: Array<'HSK 1' | 'HSK 2' | 'HSK 3' | 'HSK 4'> = ['HSK 1', 'HSK 2', 'HSK 3', 'HSK 4'];
    const assignedSkill = skills[idx % skills.length];
    const assignedTopic = topics[idx % topics.length];
    const assignedLevel = levels[idx % levels.length];

    const questionsData = [
      { q: '明天天气预报说会下雨，你出门记得带 ______。', opts: ['雨伞 (yǔsǎn)', '帽子 (màozi)', '眼镜 (yǎnjìng)', '手表 (shǒubiǎo)'], ans: '雨伞 (yǔsǎn)', exp: '下雨 (mưa) thì phải mang theo 雨伞 (ô/dù).' },
      { q: '昨天晚上我工作到十二点，所以今天早上 ______ 起来。', opts: ['没 (méi)', '不 (bù)', '别 (bié)', '未 (wèi)'], ans: '没 (méi)', exp: 'Phủ định hành động đã xảy ra trong quá khứ dùng "没" hoặc "没有".' },
      { q: '从这里去北京大学，坐地铁比较 ______。', opts: ['方便 (fāngbiàn)', '麻烦 (máfan)', '奇怪 (qíguài)', '认真 (rènzhēn)'], ans: '方便 (fāngbiàn)', exp: '方便 (fāngbiàn): Tiện lợi, thuận tiện.' },
      { q: '他虽然身体不舒服，______ 依然坚持完成了训练。', opts: ['但是 (dànshì)', '因为 (yīnwèi)', '所以 (suǒyǐ)', '如果 (rúguǒ)'], ans: '但是 (dànshì)', exp: 'Cặp liên từ chỉ sự tương phản: 虽然... 但是... (Tuy rằng... nhưng...).' },
      { q: '这份合同的内容，请大家仔细 ______ 一遍。', opts: ['检查 (jiǎnchá)', '打扫 (dǎsǎo)', '唱歌 (chànggē)', '跑步 (pǎobù)'], ans: '检查 (jiǎnchá)', exp: '检查 (jiǎnchá): Kiểm tra kỹ tài liệu/hợp đồng.' },
      { q: '我来中国已经两年了，对这里的生活越来越 ______ 了。', opts: ['习惯 (xíguàn)', '难过 (nánguò)', '害怕 (hàipà)', '生病 (shēngbìng)'], ans: '习惯 (xíguàn)', exp: '习惯 (xíguàn): Thói quen / Quen với cuộc sống.' }
    ];

    const sample = questionsData[idx % questionsData.length];

    return {
      id: `zh-auto-${qNum < 10 ? '0' : ''}${qNum}`,
      categoryId: 'tieng-trung' as const,
      subjectId: 'chinese-core',
      topicId: assignedTopic.toLowerCase(),
      skill: assignedSkill,
      type: 'multiple-choice' as const,
      difficulty: assignedLevel === 'HSK 1' ? ('Beginner' as const) : assignedLevel === 'HSK 2' ? ('Elementary' as const) : ('Intermediate' as const),
      hskLevel: assignedLevel,
      question: sample.q,
      instructions: 'Chọn đáp án chính xác nhất để hoàn thành câu.',
      options: sample.opts,
      correctAnswer: sample.ans,
      explanation: {
        general: sample.exp,
        whyCorrect: `"${sample.ans}" là từ vựng/ngữ pháp chuẩn xác nhất trong ngữ cảnh này.`
      },
      tags: ['Chinese', assignedSkill, assignedTopic, assignedLevel],
      points: 10,
      timeLimit: 35,
      stats: { timesAttempted: 90 + idx * 3, timesCorrect: 65 + idx * 2, accuracy: Math.min(94, 70 + (idx % 20)) },
      createdAt: '2026-09-18T00:00:00Z',
      updatedAt: '2026-09-20T00:00:00Z'
    };
  }),

  // ==========================================
  // SECTION C: PHÁT TRIỂN BẢN THÂN (PERSONAL GROWTH)
  // ==========================================
  {
    id: 'growth-mc-01',
    categoryId: 'phat-trien-ban-than',
    subjectId: 'growth-core',
    topicId: 'habits',
    skill: 'Reading',
    type: 'multiple-choice',
    difficulty: 'Intermediate',
    question: 'Theo cuốn Atomic Habits (James Clear), 4 bước liên kết trong vòng lặp thói quen thần kinh học diễn ra theo thứ tự nào?',
    instructions: 'Chọn trình tự chính xác tạo nên vòng lặp thói quen.',
    options: [
      'Gợi ý (Cue) -> Khao khát (Craving) -> Phản hồi (Response) -> Phần thưởng (Reward)',
      'Mục tiêu (Goal) -> Động lực (Motivation) -> Hành động (Action) -> Kết quả (Result)',
      'Ý chí (Willpower) -> Kỷ luật (Discipline) -> Kiên trì (Grit) -> Thành công (Success)',
      'Thử thách (Trigger) -> Quyết định (Decision) -> Luyện tập (Practice) -> Thói quen (Habit)'
    ],
    correctAnswer: 'Gợi ý (Cue) -> Khao khát (Craving) -> Phản hồi (Response) -> Phần thưởng (Reward)',
    explanation: {
      general: 'James Clear chỉ ra mọi thói quen con người đều trải qua 4 bước: Gợi ý kích hoạt khao khát thần kinh, thúc đẩy phản hồi hành vi và củng cố bằng phần thưởng thỏa mãn dopamine.',
      whyCorrect: 'Đây là mô hình chuẩn mực 4 bước của Habit Loop trong khoa học hành vi hiện đại.',
      tip: 'Nhớ quy tắc 4 định luật: Làm cho rõ ràng (Cue), Làm cho hấp dẫn (Craving), Làm cho dễ dàng (Response), Làm cho thỏa mãn (Reward).'
    },
    tags: ['Mindset', 'Atomic Habits', 'Discipline'],
    points: 10,
    timeLimit: 40,
    stats: { timesAttempted: 312, timesCorrect: 260, accuracy: 83 },
    createdAt: '2026-09-05T00:00:00Z',
    updatedAt: '2026-09-20T00:00:00Z'
  },
  {
    id: 'growth-mc-02',
    categoryId: 'phat-trien-ban-than',
    subjectId: 'growth-core',
    topicId: 'mindset',
    skill: 'Reading',
    type: 'multiple-choice',
    difficulty: 'Upper Intermediate',
    question: 'Tư duy theo "Nguyên lý thứ nhất" (First Principles Thinking) được ứng dụng bởi Aristotle và Elon Musk yêu cầu người thực hành làm gì?',
    instructions: 'Chọn định nghĩa cốt lõi của First Principles Thinking.',
    options: [
      'Bóc tách vấn đề về những chân lý nền tảng không thể phủ nhận rồi suy luận ngược lên',
      'Sao chép mô hình thành công của các đối thủ dẫn đầu trong ngành (Reasoning by Analogy)',
      'Thu thập dữ liệu thống kê từ quá khứ và dự đoán xu hướng tương lai',
      'Tham vấn ý kiến của số đông chuyên gia và làm theo số đông'
    ],
    correctAnswer: 'Bóc tách vấn đề về những chân lý nền tảng không thể phủ nhận rồi suy luận ngược lên',
    explanation: {
      general: 'Tư duy từ nguyên lý đầu tiên đòi hỏi đào sâu vào bản chất vật lý/sự thật cơ bản nhất của vấn đề, từ bỏ các giả định truyền thống và xây dựng giải pháp từ con số 0.',
      whyCorrect: 'Trái ngược với "suy luận tương tự" (làm như người khác từng làm), nguyên lý thứ nhất bắt đầu từ những sự thật cơ bản nhất.'
    },
    tags: ['Thinking', 'Mental Models', 'Elon Musk'],
    points: 10,
    timeLimit: 45,
    stats: { timesAttempted: 240, timesCorrect: 195, accuracy: 81 },
    createdAt: '2026-09-06T00:00:00Z',
    updatedAt: '2026-09-20T00:00:00Z'
  },
  {
    id: 'growth-tf-01',
    categoryId: 'phat-trien-ban-than',
    subjectId: 'growth-core',
    topicId: 'productivity',
    skill: 'Reading',
    type: 'true-false',
    difficulty: 'Elementary',
    question: 'Đa nhiệm (Multitasking) thực chất không phải là não bộ xử lý song song hai tác vụ nhận thức cùng lúc, mà là hiện tượng chuyển đổi bối cảnh liên tục (Context Switching) gây hao hụt năng lượng và giảm 40% hiệu suất.',
    instructions: 'Xác định nhận định trên là Đúng hay Sai theo các nghiên cứu khoa học thần kinh.',
    correctAnswer: true,
    explanation: {
      general: 'Khoa học thần kinh khẳng định vỏ não con người chỉ có thể tập trung chú ý vào 1 luồng xử lý nhận thức cao cấp tại 1 thời điểm. Chuyển đổi liên tục giữa các tác vụ tạo ra "tàn dư chú ý" (Attention Residue).',
      whyCorrect: 'Khẳng định hoàn toàn chính xác theo các nghiên cứu của ĐH Stanford và cuốn Deep Work của Cal Newport.'
    },
    tags: ['Productivity', 'Deep Work', 'Brain'],
    points: 10,
    timeLimit: 30,
    stats: { timesAttempted: 350, timesCorrect: 315, accuracy: 90 },
    createdAt: '2026-09-07T00:00:00Z',
    updatedAt: '2026-09-20T00:00:00Z'
  },
  {
    id: 'growth-ms-01',
    categoryId: 'phat-trien-ban-than',
    subjectId: 'growth-core',
    topicId: 'productivity',
    skill: 'Reading',
    type: 'multiple-select',
    difficulty: 'Intermediate',
    question: 'Những phương pháp nào sau đây giúp loại bỏ hiện tượng trì hoãn (Procrastination) một cách khoa học? (Chọn tất cả đáp án đúng)',
    instructions: 'Chọn 2-3 phương pháp được chứng minh có hiệu quả thực tế.',
    options: [
      'Quy tắc 2 phút (2-Minute Rule: Bắt đầu hành động sao cho việc khởi động chỉ tốn dưới 2 phút)',
      'Chia nhỏ nhiệm vụ lớn thành các micro-actions nhỏ nhất có thể',
      'Đợi đến khi có cảm hứng và động lực dâng trào mới bắt đầu làm việc',
      'Thiết kế môi trường làm việc không có điện thoại và thông báo (Zero Friction reduction)'
    ],
    correctAnswer: [
      'Quy tắc 2 phút (2-Minute Rule: Bắt đầu hành động sao cho việc khởi động chỉ tốn dưới 2 phút)',
      'Chia nhỏ nhiệm vụ lớn thành các micro-actions nhỏ nhất có thể',
      'Thiết kế môi trường làm việc không có điện thoại và thông báo (Zero Friction reduction)'
    ],
    explanation: {
      general: 'Động lực thường xuất hiện SAU KHI bạn đã bắt đầu hành động, chứ không phải trước đó. Dựa vào cảm hứng là lý do phổ biến nhất dẫn đến trì hoãn.',
      whyCorrect: '3 đáp án được chọn tập trung vào giảm ma sát bắt đầu và thiết kế môi trường.'
    },
    tags: ['Productivity', 'Habits', 'Focus'],
    points: 15,
    timeLimit: 50,
    stats: { timesAttempted: 198, timesCorrect: 150, accuracy: 75 },
    createdAt: '2026-09-08T00:00:00Z',
    updatedAt: '2026-09-20T00:00:00Z'
  },

  // ==========================================
  // SECTION D: SỨC KHỎE & ĐỜI SỐNG (HEALTH & LIFE)
  // ==========================================
  {
    id: 'health-mc-01',
    categoryId: 'suc-khoe-doi-song',
    subjectId: 'health-core',
    topicId: 'sleep',
    skill: 'Reading',
    type: 'multiple-choice',
    difficulty: 'Intermediate',
    question: 'Trong giao thức tối ưu hóa giấc ngủ "10-3-2-1-0", con số "3" đại diện cho nguyên tắc khoa học nào?',
    instructions: 'Chọn nguyên tắc tương ứng với con số 3 trước khi đi ngủ.',
    options: [
      'Ngừng nạp thức ăn và đồ uống có cồn 3 giờ trước khi ngủ để hệ tiêu hóa nghỉ ngơi',
      'Tập cardio cường độ cao 3 phút trước khi ngủ',
      'Tắt đèn và thiết bị điện tử 3 giờ trước khi ngủ',
      'Uống đủ 3 lít nước trước giờ đi ngủ'
    ],
    correctAnswer: 'Ngừng nạp thức ăn và đồ uống có cồn 3 giờ trước khi ngủ để hệ tiêu hóa nghỉ ngơi',
    explanation: {
      general: 'Quy tắc 10-3-2-1-0: 10 tiếng trước ngủ không caffeine; 3 tiếng trước ngủ không ăn nặng & cồn; 2 tiếng trước ngủ ngừng làm việc trí óc; 1 tiếng trước ngủ không màn hình xanh; 0 lần bấm báo thức lại.',
      whyCorrect: 'Ăn quá sát giờ ngủ làm tăng nhiệt độ cơ thể cốt lõi và ép dạ dày co bóp, triệt tiêu pha ngủ sâu (Deep Sleep).'
    },
    tags: ['Sleep', 'Circadian Rhythm', 'Health'],
    points: 10,
    timeLimit: 40,
    stats: { timesAttempted: 280, timesCorrect: 235, accuracy: 84 },
    createdAt: '2026-09-09T00:00:00Z',
    updatedAt: '2026-09-20T00:00:00Z'
  },
  {
    id: 'health-mc-02',
    categoryId: 'suc-khoe-doi-song',
    subjectId: 'health-core',
    topicId: 'fitness',
    skill: 'Reading',
    type: 'multiple-choice',
    difficulty: 'Upper Intermediate',
    question: 'Tại sao việc luyện tập tim mạch ở Vùng 2 (Zone 2 Cardio: 60-70% nhịp tim tối đa) lại được các bác sĩ tuổi thọ (như Dr. Peter Attia) coi là nền tảng số 1 cho sức khỏe chuyển hóa?',
    instructions: 'Chọn cơ chế sinh học chính xác nhất của bài tập Zone 2.',
    options: [
      'Tối ưu hóa số lượng và hiệu năng của ty thể (Mitochondria), tăng khả năng đốt cháy mỡ và lactate',
      'Đốt cháy cơ bắp nhanh nhất để giảm trọng lượng tức thì',
      'Làm tăng nồng độ cortisol lên mức tối đa để kích hoạt phản xạ sinh tồn',
      'Giúp tim đập nhanh trên 190 bpm để đốt carbohydrate thuần túy'
    ],
    correctAnswer: 'Tối ưu hóa số lượng và hiệu năng của ty thể (Mitochondria), tăng khả năng đốt cháy mỡ và lactate',
    explanation: {
      general: 'Zone 2 là cường độ vận động mà tế bào sử dụng ty thể để oxy hóa chất béo hiệu quả nhất, giúp làm sạch lactate và bảo vệ cơ thể khỏi kháng insulin cũng như bệnh chuyển hóa.',
      whyCorrect: 'Sức khỏe ty thể (Mitochondrial fitness) là chỉ số cốt lõi quyết định tuổi thọ sinh học.'
    },
    tags: ['Longevity', 'Fitness', 'Zone 2', 'Metabolism'],
    points: 10,
    timeLimit: 45,
    stats: { timesAttempted: 215, timesCorrect: 172, accuracy: 80 },
    createdAt: '2026-09-10T00:00:00Z',
    updatedAt: '2026-09-20T00:00:00Z'
  },
  {
    id: 'health-tf-01',
    categoryId: 'suc-khoe-doi-song',
    subjectId: 'health-core',
    topicId: 'sleep',
    skill: 'Reading',
    type: 'true-false',
    difficulty: 'Beginner',
    question: 'Tiếp xúc với ánh sáng mặt trời tự nhiên trong vòng 30-60 phút đầu tiên sau khi thức dậy giúp kích hoạt giải phóng cortisol tự nhiên và thiết lập đồng hồ sinh học (Circadian rhythm) cho giấc ngủ ban đêm.',
    instructions: 'Xác định nhận định trên là Đúng hay Sai theo tiến sĩ thần kinh học Andrew Huberman.',
    correctAnswer: true,
    explanation: {
      general: 'Ánh sáng quang phổ xanh tự nhiên buổi sáng tác động lên tế bào hạch võng mạc (ipRGCs) gửi tín hiệu trực tiếp đến nhân trên chéo (SCN), báo hiệu não bộ bắt đầu đếm ngược thời gian kích hoạt melatonin vào 14-16 tiếng sau.',
      whyCorrect: 'Hoàn toàn chính xác, đây là giao thức đón nắng sáng nổi tiếng của Huberman Lab.'
    },
    tags: ['Circadian', 'Sunlight', 'Huberman', 'Sleep'],
    points: 10,
    timeLimit: 30,
    stats: { timesAttempted: 410, timesCorrect: 380, accuracy: 92 },
    createdAt: '2026-09-11T00:00:00Z',
    updatedAt: '2026-09-20T00:00:00Z'
  },
  ...LISTENING_QUESTIONS
];


