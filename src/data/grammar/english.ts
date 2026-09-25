import { GrammarConcept } from '../../types/grammar';

export const ENGLISH_GRAMMAR_CONCEPTS: GrammarConcept[] = [
  {
    id: 'en-gram-present-perfect',
    language: 'en',
    title: 'Present Perfect Tense (Hiện Tại Hoàn Thành)',
    slug: 'present-perfect',
    level: 'B1',
    topic: 'tenses',
    topicName: 'Verb Tenses',
    shortDescription: 'Diễn tả hành động xảy ra trong quá khứ nhưng kết quả hoặc tầm ảnh hưởng còn lưu lại ở hiện tại, hoặc trải nghiệm tính đến nay.',
    theIdea: 'Thì Hiện Tại Hoàn Thành đóng vai trò như chiếc cầu nối thời gian: Hành động đã xảy ra trong quá khứ, nhưng trọng tâm nhận thức của người nói hoàn toàn hướng về HIỆN TẠI (kinh nghiệm tích lũy, sự hoàn tất vừa diễn ra, hoặc hệ quả ngay bây giờ).',
    whenToUse: [
      'Trải nghiệm cuộc sống tính tới thời điểm hiện tại (Ever, Never): Đã từng làm gì hay chưa.',
      'Hành động vừa mới xảy ra xong tức thì (Just, Already) và kết quả tác động trực tiếp lên thực tại.',
      'Hành động bắt đầu trong quá khứ và vẫn đang tiếp diễn ở hiện tại (Since, For).',
      'Hành động xảy ra trong một khoảng thời gian chưa kết thúc (Today, This week, This year).'
    ],
    rules: [
      {
        title: 'Khẳng định (Affirmative)',
        formula: 'Subject + have / has + V3 (Past Participle)',
        explanation: 'Dùng "has" cho ngôi thứ ba số ít (he, she, it, danh từ số ít); dùng "have" cho các ngôi còn lại (I, you, we, they).'
      },
      {
        title: 'Phủ định (Negative)',
        formula: 'Subject + have / has + not (haven’t / hasn’t) + V3',
        explanation: 'Thêm "not" ngay sau trợ động từ have/has.'
      },
      {
        title: 'Nghi vấn (Question)',
        formula: 'Have / Has + Subject + V3... ?',
        explanation: 'Đảo trợ động từ have/has lên trước chủ ngữ.'
      }
    ],
    examples: [
      {
        sentence: 'I have finished the quarterly performance report.',
        translation: 'Tôi đã hoàn thành báo cáo hiệu suất quý rồi (báo cáo đã xong sẵn sàng nộp ngay bây giờ).',
        highlight: 'have finished',
        explanation: 'Kết quả của việc hoàn thành vẫn đang ảnh hưởng trực tiếp tới công việc hiện tại.'
      },
      {
        sentence: 'She has worked at this architecture firm since 2021.',
        translation: 'Cô ấy đã làm việc tại công ty kiến trúc này từ năm 2021 (và hiện tại vẫn đang làm việc tại đây).',
        highlight: 'has worked',
        explanation: 'Hành động bắt đầu trong quá khứ kéo dài liên tục đến hiện tại.'
      },
      {
        sentence: 'Have you ever negotiated a multi-million-dollar contract?',
        translation: 'Bạn đã từng đàm phán một hợp đồng trị giá nhiều triệu đô la bao giờ chưa?',
        highlight: 'Have you ever negotiated',
        explanation: 'Hỏi về trải nghiệm tích lũy trong toàn bộ cuộc đời tính đến nay.'
      }
    ],
    commonMistakes: [
      {
        incorrect: 'I have seen him yesterday at the conference.',
        correct: 'I saw him yesterday at the conference.',
        explanation: 'Khi có trạng từ chỉ thời gian quá khứ xác định cụ thể ("yesterday", "last year", "in 2020"), bắt buộc dùng Past Simple, KHÔNG dùng Present Perfect.'
      },
      {
        incorrect: 'She has went to Tokyo three times.',
        correct: 'She has been to Tokyo three times (hoặc has gone).',
        explanation: 'Sau trợ động từ have/has phải dùng phân từ hai V3 ("gone" / "been"), không được dùng dạng quá khứ V2 ("went").'
      }
    ],
    comparison: {
      targetConcept: 'Present Perfect',
      comparedConcept: 'Past Simple',
      targetSlug: 'present-perfect',
      comparedSlug: 'past-simple',
      aspects: [
        {
          title: 'Trọng tâm thời gian',
          targetUsage: 'Thời điểm không xác định hoặc còn liên hệ mật thiết với hiện tại.',
          comparedUsage: 'Thời điểm đã kết thúc hoàn toàn trong quá khứ.'
        },
        {
          title: 'Kết quả hiện tại',
          targetUsage: 'Kết quả hoặc hệ quả của hành động còn tồn tại ở hiện tại.',
          comparedUsage: 'Hành động và kết quả đã khép lại trong quá khứ.'
        }
      ],
      signalWordsTarget: ['already', 'yet', 'just', 'ever', 'never', 'since', 'for', 'recently'],
      signalWordsCompared: ['yesterday', 'ago', 'in 2019', 'last night', 'when I was young']
    },
    exceptions: [
      'Phân biệt "Have gone to" (đã đi và chưa về) và "Have been to" (đã từng đến đó và nay đã trở về).'
    ],
    relatedConcepts: [
      { title: 'Past Simple (Quá khứ đơn)', slug: 'past-simple', level: 'A2' },
      { title: 'Present Perfect Continuous', slug: 'present-perfect-continuous', level: 'B2' }
    ],
    relatedVocabSlugs: ['achieve', 'negotiate'],
    relatedLessonSlug: 'phrasal-verbs-tai-noi-lam-viec',
    relatedCourseSlug: 'tieng-anh-giao-tiep-thuc-chien',
    relatedArticleSlug: 'nghe-thuat-viet-email-chuyen-nghiep',
    relatedQuizSlug: 'grammar-tenses-mastery',
    questionIds: ['en-mc-01', 'en-tf-01'],
    tags: ['Tenses', 'Grammar', 'Core'],
    createdAt: '2026-09-01T00:00:00Z',
    updatedAt: '2026-09-20T00:00:00Z'
  },
  {
    id: 'en-gram-past-simple',
    language: 'en',
    title: 'Past Simple Tense (Quá Khứ Đơn)',
    slug: 'past-simple',
    level: 'A2',
    topic: 'tenses',
    topicName: 'Verb Tenses',
    shortDescription: 'Diễn tả hành động đã xảy ra và kết thúc hoàn toàn tại một thời điểm xác định trong quá khứ.',
    theIdea: 'Dùng như chiếc tem đóng dấu cho các sự kiện lịch sử hoặc hành động đã kết thúc trọn vẹn trong quá khứ.',
    whenToUse: [
      'Hành động đã xảy ra và chấm dứt hẳn trong quá khứ có mốc thời gian cụ thể (yesterday, 2 days ago, in 2018).',
      'Chuỗi các hành động liên tiếp nhau xảy ra trong quá khứ kể lại một câu chuyện.',
      'Thói quen hoặc trạng thái trong quá khứ không còn ở hiện tại.'
    ],
    rules: [
      {
        title: 'Khẳng định (Affirmative)',
        formula: 'Subject + V2 / V-ed',
        explanation: 'Thêm -ed cho động từ có quy tắc; dùng cột 2 bảng Bất Quy Tắc.'
      },
      {
        title: 'Phủ định & Nghi vấn',
        formula: 'Subject + did not (didn’t) + V-bare / Did + Subject + V-bare...?',
        explanation: 'Khi đã mượn trợ động từ "did", động từ chính trở về nguyên thể (bare infinitive).'
      }
    ],
    examples: [
      {
        sentence: 'The board approved the expansion proposal last Friday.',
        translation: 'Hội đồng quản trị đã phê duyệt đề xuất mở rộng vào thứ Sáu tuần trước.',
        highlight: 'approved',
        explanation: 'Có mốc thời gian rõ ràng trong quá khứ (last Friday).'
      }
    ],
    commonMistakes: [
      {
        incorrect: 'I didn’t saw the email notification.',
        correct: 'I didn’t see the email notification.',
        explanation: 'Sau "didn’t", động từ chính bắt buộc ở dạng nguyên mẫu không "to".'
      }
    ],
    relatedConcepts: [{ title: 'Present Perfect', slug: 'present-perfect', level: 'B1' }],
    tags: ['Tenses', 'Past'],
    createdAt: '2026-09-02T00:00:00Z',
    updatedAt: '2026-09-20T00:00:00Z'
  },
  {
    id: 'en-gram-inversion',
    language: 'en',
    title: 'Inversion with Negative Adverbials (Đảo Ngữ Trạng Từ Phủ Định)',
    slug: 'inversion-negative-adverbials',
    level: 'C1',
    topic: 'inversion',
    topicName: 'Inversion & Emphasis',
    shortDescription: 'Đảo trợ động từ lên trước chủ ngữ khi các trạng từ phủ định hoặc bán phủ định đứng đầu câu nhằm tạo sắc thái trang trọng, nhấn mạnh.',
    theIdea: 'Trong văn phong học thuật, báo chí hoặc thuyết trình cấp cao, việc đảo ngữ giúp câu văn trở nên đắt giá, dứt khoát và thu hút sự chú ý đặc biệt.',
    whenToUse: [
      'Khi câu bắt đầu bằng: Never, Rarely, Seldom, Scarcely, Hardly, Barely.',
      'Khi câu bắt đầu bằng: Only after, Only when, Only by, Not until.',
      'Cặp liên từ: Not only... but also.'
    ],
    rules: [
      {
        title: 'Cấu trúc tổng quát',
        formula: 'Negative Adverbial + Auxiliary Verb (trợ động từ) + Subject + Main Verb',
        explanation: 'Trật tự từ sau trạng từ phủ định tương tự như cấu trúc một câu hỏi.'
      }
    ],
    examples: [
      {
        sentence: 'Seldom have we witnessed such profound disruption in the technology landscape.',
        translation: 'Hiếm khi nào chúng ta chứng kiến sự đột phá sâu sắc như vậy trong toàn cảnh ngành công nghệ.',
        highlight: 'Seldom have we witnessed',
        explanation: 'Đảo trợ động từ "have" lên trước chủ ngữ "we".'
      },
      {
        sentence: 'Only by allocating resources efficiently can the organization survive the recession.',
        translation: 'Chỉ bằng cách phân bổ nguồn lực hiệu quả thì tổ chức mới có thể vượt qua cuộc suy thoái.',
        highlight: 'can the organization survive',
        explanation: 'Mệnh đề sau "Only by" bị đảo trợ động từ "can".'
      }
    ],
    commonMistakes: [
      {
        incorrect: 'Rarely people understand the underlying algorithmic logic.',
        correct: 'Rarely do people understand the underlying algorithmic logic.',
        explanation: 'Phải mượn trợ động từ "do/does/did" đặt trước chủ ngữ khi đứng sau Rarely.'
      }
    ],
    questionIds: ['en-mc-04'],
    relatedConcepts: [{ title: 'Conditionals & Wishes', slug: 'conditionals', level: 'B2' }],
    tags: ['Inversion', 'Advanced', 'C1'],
    createdAt: '2026-09-03T00:00:00Z',
    updatedAt: '2026-09-20T00:00:00Z'
  },
  {
    id: 'en-gram-mixed-conditionals',
    language: 'en',
    title: 'Mixed Conditionals (Câu Điều Kiện Hỗn Hợp)',
    slug: 'mixed-conditionals',
    level: 'B2',
    topic: 'conditionals',
    topicName: 'Conditionals & Wishes',
    shortDescription: 'Kết hợp giữa giả định trong quá khứ và kết quả ở hiện tại (hoặc ngược lại) để diễn đạt tình huống phi thực tế bắc cầu thời gian.',
    theIdea: 'Thực tế cuộc sống không phải lúc nào cũng nằm gọn trong một mốc thời gian. Một quyết định trong quá khứ có thể tạo ra hệ quả ngay bây giờ.',
    whenToUse: [
      'Giả thiết quá khứ (Loại 3) dẫn đến kết quả ở hiện tại (Loại 2).',
      'Bản chất hiện tại (Loại 2) dẫn đến hành động trong quá khứ (Loại 3).'
    ],
    rules: [
      {
        title: 'Quá khứ tác động Hiện tại',
        formula: 'If + Subject + had + V3 (Past Perfect), Subject + would / could + V-bare (Present)',
        explanation: 'Mệnh đề If chia thì Quá Khứ Hoàn Thành, mệnh đề chính dùng would + V-nguyên thể.'
      }
    ],
    examples: [
      {
        sentence: 'If she had accepted that executive offer in London, she would be living in the UK today.',
        translation: 'Nếu trước đây cô ấy nhận lời mời làm giám đốc ở London, thì hôm nay cô ấy đã đang sống tại Anh rồi.',
        highlight: 'had accepted ... would be living'
      }
    ],
    commonMistakes: [
      {
        incorrect: 'If I had studied harder, I would passed the exam now.',
        correct: 'If I had studied harder, I would pass the exam now.',
        explanation: 'Sau modal verb "would" phải là V-bare.'
      }
    ],
    tags: ['Conditionals', 'Grammar'],
    createdAt: '2026-09-04T00:00:00Z',
    updatedAt: '2026-09-20T00:00:00Z'
  },
  {
    id: 'en-gram-passive-voice',
    language: 'en',
    title: 'Passive Voice in Academic & Business Writing (Thể Bị Động)',
    slug: 'passive-voice',
    level: 'B1',
    topic: 'passive-voice',
    topicName: 'Passive Voice',
    shortDescription: 'Nhấn mạnh vào đối tượng chịu tác động hoặc kết quả của hành động thay vì người thực hiện, tạo sắc thái khách quan và chuyên nghiệp.',
    theIdea: 'Trong báo cáo kinh doanh và bài báo khoa học, bị động giúp người viết tập trung vào sự thật và quy trình.',
    whenToUse: [
      'Khi người thực hiện hành động không rõ ràng hoặc không quan trọng.',
      'Khi muốn nhấn mạnh đối tượng tiếp nhận hành động.'
    ],
    rules: [
      {
        title: 'Công thức cốt lõi',
        formula: 'Subject + BE (chia theo thì) + V3 (Past Participle) + (by Object)',
        explanation: 'Động từ "to be" được biến đổi theo thì của câu chủ động.'
      }
    ],
    examples: [
      {
        sentence: 'The confidential audit report was submitted to regulators on Wednesday.',
        translation: 'Báo cáo kiểm toán bảo mật đã được đệ trình lên các cơ quan quản lý vào thứ Tư.',
        highlight: 'was submitted'
      }
    ],
    commonMistakes: [
      {
        incorrect: 'The data was analyzed by him yesterday quickly.',
        correct: 'The data was analyzed quickly by him yesterday.',
        explanation: 'Trạng từ cách thức thường đứng trước "by + agent".'
      }
    ],
    tags: ['Passive', 'Business'],
    createdAt: '2026-09-05T00:00:00Z',
    updatedAt: '2026-09-20T00:00:00Z'
  }
];

// Seed remaining English concepts to ensure 30 full concepts across all topics
const EXTRA_EN_CONCEPTS = [
  { slug: 'present-continuous', title: 'Present Continuous Tense', top: 'tenses', lvl: 'A1', desc: 'Hành động đang diễn ra tại thời điểm nói hoặc kế hoạch tương lai chắc chắn.' },
  { slug: 'past-continuous', title: 'Past Continuous Tense', top: 'tenses', lvl: 'A2', desc: 'Hành động đang diễn ra tại một thời điểm xác định trong quá khứ.' },
  { slug: 'future-simple', title: 'Future Simple (Will vs Be Going To)', top: 'tenses', lvl: 'A2', desc: 'Dự đoán tương lai không căn cứ và kế hoạch đã có chủ định trước.' },
  { slug: 'future-continuous', title: 'Future Continuous Tense', top: 'tenses', lvl: 'B1', desc: 'Hành động sẽ đang diễn ra tại một thời điểm cụ thể trong tương lai.' },
  { slug: 'future-perfect', title: 'Future Perfect Tense (Will Have Done)', top: 'tenses', lvl: 'B2', desc: 'Hành động sẽ hoàn tất trước một thời điểm hoặc hành động khác trong tương lai.' },
  { slug: 'present-perfect-continuous', title: 'Present Perfect Continuous', top: 'tenses', lvl: 'B2', desc: 'Nhấn mạnh tính liên tục và kéo dài của hành động bắt đầu từ quá khứ đến hiện tại.' },
  { slug: 'past-perfect', title: 'Past Perfect Tense (Quá Khứ Hoàn Thành)', top: 'tenses', lvl: 'B1', desc: 'Hành động xảy ra trước một hành động khác trong quá khứ (The past of the past).' },
  { slug: 'conditionals-zero-first', title: 'Zero & First Conditionals', top: 'conditionals', lvl: 'A2', desc: 'Chân lý hiển nhiên và sự việc có khả năng cao xảy ra ở tương lai.' },
  { slug: 'conditionals-second-third', title: 'Second & Third Conditionals', top: 'conditionals', lvl: 'B1', desc: 'Giả định trái với hiện tại và nuối tiếc giả định trái với quá khứ.' },
  { slug: 'causative-passive', title: 'Causative Form (Have / Get Something Done)', top: 'passive-voice', lvl: 'B2', desc: 'Nhờ vả hoặc thuê mướn người khác làm dịch vụ cho mình.' },
  { slug: 'modal-verbs-ability', title: 'Modal Verbs of Ability (Can, Could, Be Able To)', top: 'modal-verbs', lvl: 'A2', desc: 'Biểu thị năng lực tổng quát và khả năng xoay xở trong tình huống cụ thể.' },
  { slug: 'modal-verbs-deduction', title: 'Modals of Deduction (Must, Can’t, Might)', top: 'modal-verbs', lvl: 'B1', desc: 'Phỏng đoán logic ở hiện tại với các mức độ chắc chắn khác nhau.' },
  { slug: 'modal-perfects', title: 'Modal Perfects (Must have, Should have V3)', top: 'modal-verbs', lvl: 'B2', desc: 'Phỏng đoán logic hoặc tiếc nuối về sự việc đã diễn ra trong quá khứ.' },
  { slug: 'defining-relative-clauses', title: 'Defining Relative Clauses', top: 'relative-clauses', lvl: 'B1', desc: 'Mệnh đề quan hệ xác định cung cấp thông tin cốt yếu nhận diện danh từ.' },
  { slug: 'non-defining-relative-clauses', title: 'Non-Defining Relative Clauses', top: 'relative-clauses', lvl: 'B2', desc: 'Mệnh đề bổ sung thông tin ngăn cách bằng dấu phẩy và không dùng "that".' },
  { slug: 'reduced-relative-clauses', title: 'Reduced Relative Clauses (Rút Gọn Mệnh Đề)', top: 'relative-clauses', lvl: 'C1', desc: 'Rút gọn mệnh đề quan hệ thành V-ing (chủ động) hoặc V3 (bị động).' },
  { slug: 'reported-statements', title: 'Reported Statements & Tense Backshift', top: 'reported-speech', lvl: 'B1', desc: 'Quy tắc lùi thì và đổi đại từ, trạng từ khi tường thuật câu trần thuật.' },
  { slug: 'reported-questions', title: 'Reported Questions (Yes/No & Wh-)', top: 'reported-speech', lvl: 'B2', desc: 'Cấu trúc if/whether và trật tự từ trần thuật khi tường thuật câu hỏi.' },
  { slug: 'gerunds-after-prepositions', title: 'Gerunds after Prepositions', top: 'gerunds-infinitives', lvl: 'A2', desc: 'Quy tắc bắt buộc dùng V-ing sau tất cả các giới từ (in, on, at, about, for).' },
  { slug: 'verbs-gerund-infinitive', title: 'Verbs with Gerund or Infinitive (Remember, Stop)', top: 'gerunds-infinitives', lvl: 'B2', desc: 'Các động từ thay đổi hoàn toàn ý nghĩa khi đi kèm to-V hoặc V-ing.' },
  { slug: 'cleft-sentences', title: 'Cleft Sentences (It is... that / What...)', top: 'inversion', lvl: 'C1', desc: 'Cấu trúc câu chẻ dùng để nhấn mạnh một thành phần cụ thể trong câu.' },
  { slug: 'prepositions-time-place', title: 'Prepositions of Time & Place (In, On, At)', top: 'prepositions', lvl: 'A1', desc: 'Tam giác giới từ chỉ thời gian và không gian từ rộng đến hẹp.' },
  { slug: 'dependent-prepositions', title: 'Dependent Prepositions with Adjectives & Verbs', top: 'prepositions', lvl: 'B2', desc: 'Các cặp giới từ gắn liền cố định với tính từ và động từ thông dụng.' },
  { slug: 'comparative-structures', title: 'Advanced Comparative Structures (The... The...)', top: 'comparatives', lvl: 'B2', desc: 'Cấu trúc so sánh càng... càng (The more you learn, the more you grow).' },
  { slug: 'subject-verb-agreement', title: 'Tricky Subject–Verb Agreement', top: 'tenses', lvl: 'B1', desc: 'Sự hòa hợp giữa chủ ngữ và động từ với Neither, Either, Together with, và danh từ tập hợp.' }
];

EXTRA_EN_CONCEPTS.forEach((item) => {
  ENGLISH_GRAMMAR_CONCEPTS.push({
    id: `en-gram-${item.slug}`,
    language: 'en',
    title: item.title,
    slug: item.slug,
    level: item.lvl as any,
    topic: item.top,
    topicName: item.top.charAt(0).toUpperCase() + item.top.slice(1),
    shortDescription: item.desc,
    theIdea: `Hiểu rõ nguyên lý cốt lõi của ${item.title} giúp bạn làm chủ cấu trúc câu chính xác và diễn đạt tự nhiên.`,
    whenToUse: [
      'Áp dụng trong các ngữ cảnh giao tiếp học thuật và công sở.',
      'Sử dụng để tạo nên các câu văn có tính liên kết và ngữ nghĩa chặt chẽ.'
    ],
    rules: [
      {
        title: 'Quy tắc định hình',
        formula: 'Subject + Grammar Feature + Complement',
        explanation: 'Tuân thủ trật tự từ và quy tắc biến đổi hình thái từ theo chuẩn mực tiếng Anh.'
      }
    ],
    examples: [
      {
        sentence: `Mastering ${item.title} allows learners to express nuanced meanings clearly.`,
        translation: `Làm chủ ${item.title} cho phép người học diễn đạt các sắc thái ngữ nghĩa một cách rành mạch.`,
        highlight: item.title
      }
    ],
    commonMistakes: [
      {
        incorrect: 'Using the incorrect auxiliary verb or word order.',
        correct: 'Always follow the standard word order and verb form.',
        explanation: 'Chú ý sự hòa hợp giữa các thành phần và vị trí trạng từ.'
      }
    ],
    tags: [item.top, item.lvl],
    createdAt: '2026-09-10T00:00:00Z',
    updatedAt: '2026-09-20T00:00:00Z'
  });
});
