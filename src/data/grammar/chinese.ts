import { GrammarConcept } from '../../types/grammar';

export const CHINESE_GRAMMAR_CONCEPTS: GrammarConcept[] = [
  {
    id: 'zh-gram-ba-sentence',
    language: 'zh',
    title: '把字句 — Câu Chữ 把 (Xử Lý & Tác Động)',
    slug: 'ba-sentence',
    level: 'HSK 3',
    topic: 'ba-bei-sentences',
    topicName: '把字句与被字句 — Câu Chữ 把 & 被',
    shortDescription: 'Cấu trúc đặc trưng tiếng Trung dùng để nhấn mạnh chủ thể đã tác động, xử lý đối tượng và tạo ra sự thay đổi về vị trí hoặc trạng thái.',
    theIdea: 'Trong tiếng Trung, khi bạn muốn làm một hành động xử lý cái gì đó và tạo ra kết quả rõ rệt (dời đi đâu, ăn hết, làm hỏng, gửi đi), ta đưa tân ngữ lên trước động từ bằng giới từ “把”.',
    whenToUse: [
      'Khi tân ngữ là đối tượng xác định (đã được nhắc tới hoặc cả hai bên đều biết).',
      'Động từ bắt buộc phải mang tính tác động và phía sau PHẢI CÓ THÀNH PHẦN KHÁC (Bổ ngữ kết quả, tân ngữ địa điểm, 了).',
      'Không dùng với các động từ chỉ tri giác/tình cảm như: 是, 有, 喜欢, 认识, 觉得.'
    ],
    rules: [
      {
        title: 'Khẳng định (Affirmative)',
        formula: 'Chủ ngữ + 把 + Tân ngữ (Xác định) + Động từ + Thành phần khác (Bổ ngữ/了)',
        explanation: 'Thành phần khác có thể là: 到/在 + nơi chốn, 给 + đối tượng, hoặc bổ ngữ kết quả (完, 好, 掉).'
      },
      {
        title: 'Phủ định (Negative)',
        formula: 'Chủ ngữ + 没 (没有) / 别 + 把 + Tân ngữ + Động từ...',
        explanation: 'Từ phủ định (没, 别) và phó từ năng nguyện (想, 要, 能) PHẢI ĐỨNG TRƯỚC “把”, KHÔNG được đứng trước động từ.'
      }
    ],
    examples: [
      {
        sentence: '请把这份商业合同打印出来。',
        translation: 'Xin hãy in bản hợp đồng thương mại này ra giúp tôi.',
        highlight: '把这份商业合同打印出来',
        explanation: 'Tân ngữ "bản hợp đồng thương mại này" là đối tượng xác định, động từ "in" kèm bổ ngữ "ra".'
      },
      {
        sentence: '我还没有把昨天的作业做完。',
        translation: 'Tôi vẫn chưa làm xong bài tập ngày hôm qua.',
        highlight: '没有把昨天的作业做完',
        explanation: 'Từ phủ định "没有" đứng trước chữ 把.'
      }
    ],
    commonMistakes: [
      {
        incorrect: '我把那本书看了。',
        correct: '我把那本书看完了。',
        explanation: 'Động từ trong câu chữ 把 không được đứng trơ trọi một mình, phải có bổ ngữ (完, 懂, 见) hoặc thành phần chỉ kết quả tác động.'
      },
      {
        incorrect: '我把作业没有做完。',
        correct: '我没有把作业做完。',
        explanation: 'Phủ định “没有” tuyệt đối không được chen vào giữa 把 và động từ; phải đặt TRƯỚC 把.'
      }
    ],
    comparison: {
      targetConcept: '把字句 (Câu chữ 把)',
      comparedConcept: '被字句 (Câu chữ 被)',
      targetSlug: 'ba-sentence',
      comparedSlug: 'bei-sentence',
      aspects: [
        {
          title: 'Góc nhìn chủ động / bị động',
          targetUsage: 'Chủ ngữ chủ động tác động xử lý đối tượng (A 把 B + Động từ).',
          comparedUsage: 'Chủ ngữ bị động tiếp nhận tác động từ người khác (B 被 A + Động từ).'
        },
        {
          title: 'Sắc thái tâm lý',
          targetUsage: 'Trung tính hoặc tích cực, hướng tới hoàn tất công việc.',
          comparedUsage: 'Thường mang sắc thái không may, tiêu cực hoặc bất đắc dĩ.'
        }
      ],
      signalWordsTarget: ['把', '请把', '已经把'],
      signalWordsCompared: ['被', '叫', '让']
    },
    relatedConcepts: [
      { title: '被字句 — Câu Chữ 被', slug: 'bei-sentence', level: 'HSK 3' },
      { title: 'Bổ ngữ kết quả (完, 好, 懂)', slug: 'resultative-complements', level: 'HSK 2' }
    ],
    relatedVocabSlugs: ['gongzuo', 'xuexi'],
    questionIds: ['zh-mc-04'],
    tags: ['HSK 3', 'Grammar', 'Core'],
    createdAt: '2026-09-01T00:00:00Z',
    updatedAt: '2026-09-20T00:00:00Z'
  },
  {
    id: 'zh-gram-bei-sentence',
    language: 'zh',
    title: '被字句 — Câu Chữ 被 (Thể Bị Động)',
    slug: 'bei-sentence',
    level: 'HSK 3',
    topic: 'ba-bei-sentences',
    topicName: '把字句与被字句 — Câu Chữ 把 & 被',
    shortDescription: 'Cấu trúc bị động thể hiện chủ thể bị tác động bởi một tác nhân khác, thường mang sắc thái bất lợi hoặc nhấn mạnh sự chịu đựng.',
    theIdea: 'Được sử dụng khi muốn biểu đạt người/vật tiếp nhận hành động do người khác gây ra.',
    whenToUse: [
      'Diễn tả sự việc không may mắn xảy ra ngoài ý muốn.',
      'Nhấn mạnh đối tượng bị hại hoặc bị thay đổi trạng thái.'
    ],
    rules: [
      {
        title: 'Công thức chuẩn',
        formula: 'Chủ ngữ (Đối tượng chịu tác động) + 被 (叫 / 让) + Tác nhân + Động từ + Thành phần khác',
        explanation: 'Tác nhân thực hiện có thể lược bỏ sau chữ "被", nhưng không được lược bỏ sau "叫" hoặc "让".'
      }
    ],
    examples: [
      {
        sentence: '他的自行车被小偷偷走了。',
        translation: 'Xe đạp của anh ấy đã bị kẻ trộm lấy đi mất rồi.',
        highlight: '被小偷偷走了'
      }
    ],
    commonMistakes: [
      {
        incorrect: '钱包被偷。',
        correct: '钱包被偷走了。',
        explanation: 'Sau động từ trong câu chữ 被 cũng phải có thành phần khác chỉ kết quả.'
      }
    ],
    tags: ['HSK 3', 'Passive'],
    createdAt: '2026-09-02T00:00:00Z',
    updatedAt: '2026-09-20T00:00:00Z'
  },
  {
    id: 'zh-gram-shi-de',
    language: 'zh',
    title: '是...的 结构 — Cấu Trúc Nhấn Mạnh 是...的',
    slug: 'shi-de-construction',
    level: 'HSK 2',
    topic: 'shi-de-construction',
    topicName: '是...的 结构 — Cấu Trúc Nhấn Mạnh 是...的',
    shortDescription: 'Cấu trúc dùng để nhấn mạnh thời gian, địa điểm, phương thức, mục đích hoặc chủ thể của một hành động đã xảy ra trong quá khứ.',
    theIdea: 'Hành động chắc chắn ĐÃ XẢY RA, và mục đích của câu không phải là thông báo hành động đó, mà là làm nổi bật chi tiết đi kèm (khi nào, ở đâu, bằng cách nào).',
    whenToUse: [
      'Nhấn mạnh thời gian hành động: 我是昨天来的 (Tôi đến vào hôm qua).',
      'Nhấn mạnh địa điểm: 我们是在北京认识的 (Chúng tôi quen nhau ở Bắc Kinh).',
      'Nhấn mạnh phương thức: 他是坐高铁来的 (Anh ấy đến bằng tàu cao tốc).'
    ],
    rules: [
      {
        title: 'Công thức khẳng định',
        formula: 'Chủ ngữ + 是 + [Thời gian / Địa điểm / Phương thức] + Động từ + (Tân ngữ) + 的',
        explanation: 'Trong câu khẳng định, chữ "是" có thể lược bỏ, nhưng chữ "的" ở cuối câu bắt buộc phải giữ lại.'
      },
      {
        title: 'Công thức phủ định',
        formula: 'Chủ ngữ + 不是 + [Thời gian / Địa điểm / Phương thức] + Động từ + 的',
        explanation: 'Trong câu phủ định, bắt buộc phải có chữ "不是", không được lược bỏ.'
      }
    ],
    examples: [
      {
        sentence: '我是坐飞机来上海的。',
        translation: 'Tôi đến Thượng Hải là bằng máy bay (nhấn mạnh phương thức đi lại).',
        highlight: '是坐飞机来上海的'
      }
    ],
    commonMistakes: [
      {
        incorrect: '我不是昨天来。',
        correct: '我不是昨天来的。',
        explanation: 'Khi phủ định trong cấu trúc nhấn mạnh quá khứ, không được quên chữ "的" ở cuối.'
      }
    ],
    tags: ['HSK 2', 'Emphasis'],
    createdAt: '2026-09-03T00:00:00Z',
    updatedAt: '2026-09-20T00:00:00Z'
  },
  {
    id: 'zh-gram-aspect-le',
    language: 'zh',
    title: '动态助词 “了” — Trợ Từ “了” (Hoàn Thành & Biến Đổi)',
    slug: 'aspect-particles-le',
    level: 'HSK 1',
    topic: 'aspect-particles',
    topicName: '动态助词 — Trợ Từ Động Thái (了, 过, 着)',
    shortDescription: 'Biểu thị sự hoàn thành của hành động hoặc sự thay đổi trạng thái, tình huống mới phát sinh.',
    theIdea: 'Phân biệt "了 động thái" (đứng sau động từ biểu thị hoàn thành) và "了 ngữ khí" (đứng cuối câu biểu thị sự thay đổi trạng thái).',
    whenToUse: [
      'Động từ + 了: Hành động đã thực hiện hoặc hoàn tất.',
      'Cuối câu + 了: Tình huống có sự biến đổi mới (Trời mưa rồi, Tôi đói rồi).'
    ],
    rules: [
      {
        title: 'Phủ định hành động đã qua',
        formula: 'Chủ ngữ + 没 (没有) + Động từ (BỎ “了”)',
        explanation: 'Khi đã dùng "没/没有" để phủ định thì KHÔNG ĐƯỢC để chữ "了" ở sau động từ nữa.'
      }
    ],
    examples: [
      {
        sentence: '我买了一本汉语词典。',
        translation: 'Tôi đã mua một cuốn từ điển tiếng Hán.',
        highlight: '买了一本'
      }
    ],
    commonMistakes: [
      {
        incorrect: '我昨天没去了学校。',
        correct: '我昨天没去学校。',
        explanation: 'Đã có "没" thì phải bỏ "了".'
      }
    ],
    tags: ['HSK 1', 'Aspect'],
    createdAt: '2026-09-04T00:00:00Z',
    updatedAt: '2026-09-20T00:00:00Z'
  },
  {
    id: 'zh-gram-guo',
    language: 'zh',
    title: '动态助词 “过” — Trợ Từ “过” (Kinh Nghiệm Đã Từng)',
    slug: 'aspect-particle-guo',
    level: 'HSK 2',
    topic: 'aspect-particles',
    topicName: '动态助词 — Trợ Từ Động Thái (了, 过, 着)',
    shortDescription: 'Nhấn mạnh trải nghiệm trong quá khứ đã từng xảy ra và nay không còn tiếp diễn.',
    theIdea: 'Tương đương với nghĩa "đã từng..." trong tiếng Việt.',
    whenToUse: ['Hỏi hoặc kể về kinh nghiệm sống, những nơi đã từng đặt chân đến.'],
    rules: [
      {
        title: 'Công thức',
        formula: 'Chủ ngữ + Động từ + 过 + (Tân ngữ)',
        explanation: 'Phủ định dùng 没 (没有) + Động từ + 过.'
      }
    ],
    examples: [
      {
        sentence: '你去过北京吗？',
        translation: 'Bạn đã từng đi Bắc Kinh chưa?',
        highlight: '去过'
      }
    ],
    commonMistakes: [
      {
        incorrect: '我没去过北京了。',
        correct: '我没去过北京。',
        explanation: 'Không dùng "了" ở cuối câu phủ định kinh nghiệm với "过".'
      }
    ],
    tags: ['HSK 2', 'Experience'],
    createdAt: '2026-09-05T00:00:00Z',
    updatedAt: '2026-09-20T00:00:00Z'
  }
];

// Seed remaining concepts to reach 25 concepts for Chinese
const EXTRA_ZH_CONCEPTS = [
  { slug: 'aspect-particle-zhe', title: '动态助词 “着” — Trợ Từ “着” (Trạng Thái Tiếp Diễn)', top: 'aspect-particles', lvl: 'HSK 2', desc: 'Biểu thị hành động hoặc trạng thái đang duy trì tiếp diễn (门开着 - Cửa đang mở).' },
  { slug: 'resultative-complements', title: '结果补语 (完, 好, 见, 懂, 对)', top: 'complements', lvl: 'HSK 2', desc: 'Bổ ngữ kết quả đứng ngay sau động từ chỉ rõ kết quả đạt được sau hành động.' },
  { slug: 'directional-complements', title: '方向补语 (来, 去, 上来, 下去)', top: 'complements', lvl: 'HSK 3', desc: 'Bổ ngữ phương hướng chỉ chiều hướng chuyển động hướng về phía người nói (来) hoặc xa dần (去).' },
  { slug: 'potential-complements', title: '可能补语 (得/不 + 动/完/好)', top: 'complements', lvl: 'HSK 3', desc: 'Biểu thị khả năng chủ quan hoặc khách quan có thể thực hiện được hành động hay không (看得懂 / 看不懂).' },
  { slug: 'degree-complements', title: '程度补语 (得很, 得不得了, 极了)', top: 'complements', lvl: 'HSK 3', desc: 'Đánh giá mức độ của tính từ hoặc động từ trạng thái.' },
  { slug: 'bi-comparison', title: '比较句 “比” — So Sánh Hơn Với “比”', top: 'comparisons', lvl: 'HSK 2', desc: 'Cấu trúc A 比 B + Tính từ (và các biến thể tăng mức độ như 一点儿, 得多, 多了).' },
  { slug: 'meiyou-comparison', title: '比较句 “没有” — So Sánh Kém Với “没有”', top: 'comparisons', lvl: 'HSK 2', desc: 'Cấu trúc A 没有 B (那么/这么) + Tính từ: A không bằng B.' },
  { slug: 'yiyang-comparison', title: '“一样” 比较句 — So Sánh Bằng (A 跟 B 一样)', top: 'comparisons', lvl: 'HSK 2', desc: 'Cấu trúc A 跟/和 B 一样 (+ Tính từ): A và B như nhau.' },
  { slug: 'yue-lai-yue', title: '“越来越...” 结构 — Càng Ngày Càng...', top: 'comparisons', lvl: 'HSK 2', desc: 'Biểu thị mức độ biến đổi tăng tiến theo thời gian.' },
  { slug: 'measure-words-core', title: '常用量词 — Hệ Thống Lượng Từ Cơ Bản (个, 张, 本, 条, 只)', top: 'measure-words', lvl: 'HSK 1', desc: 'Quy tắc kết hợp số từ + lượng từ + danh từ chuẩn mực.' },
  { slug: 'measure-words-clothing', title: '服饰与物件量词 (件, 条, 双, 顶)', top: 'measure-words', lvl: 'HSK 2', desc: 'Lượng từ chuyên biệt cho trang phục, giày dép và phụ kiện.' },
  { slug: 'conjunction-yinwei-suoyi', title: '连词 “因为...所以...” — Cặp Từ Nguyên Nhân & Kết Quả', top: 'conjunctions', lvl: 'HSK 2', desc: 'Bởi vì... cho nên... diễn giải mối quan hệ nhân quả logic.' },
  { slug: 'conjunction-suiran-danshi', title: '连词 “虽然...但是...” — Cặp Từ Tương Phản Nhượng Bộ', top: 'conjunctions', lvl: 'HSK 2', desc: 'Mặc dù... nhưng mà... biểu thị sự chuyển hướng ý tứ trong câu.' },
  { slug: 'conjunction-budan-erqie', title: '连词 “不但...而且...” — Cặp Từ Tăng Tiến', top: 'conjunctions', lvl: 'HSK 3', desc: 'Không những... mà còn... bổ sung thêm tính chất tích cực hoặc tiêu cực.' },
  { slug: 'conjunction-zhiyou-cai', title: '连词 “只有...才...” — Điều Kiện Duy Nhất', top: 'conjunctions', lvl: 'HSK 3', desc: 'Chỉ có... mới... nhấn mạnh điều kiện thiết yếu để đạt kết quả.' },
  { slug: 'conjunction-ruguo-jiu', title: '连词 “如果...就...” — Giả Thiết & Hệ Quả', top: 'conjunctions', lvl: 'HSK 2', desc: 'Nếu như... thì... dùng trong các câu giả định điều kiện.' },
  { slug: 'zhengzai-progressive', title: '副词 “正在” — Phó Từ Chỉ Hành Động Đang Tiếp Diễn', top: 'aspect-particles', lvl: 'HSK 2', desc: 'Đang làm gì tại một thời điểm (他正在开会 - Anh ấy đang họp).' },
  { slug: 'yijing-aspect', title: '副词 “已经” — Đã (Biểu Thị Đã Xảy Ra Trước Đó)', top: 'aspect-particles', lvl: 'HSK 2', desc: 'Kết hợp cùng chữ 了 biểu thị sự việc đã hoàn tất (我已经做完了).' },
  { slug: 'haishi-huozhe', title: '“还是” 与 “或者” — Phân Biệt Hai Từ "Hoặc/Hay Là"', top: 'conjunctions', lvl: 'HSK 2', desc: '还是 dùng cho câu hỏi lựa chọn, 或者 dùng cho câu trần thuật khẳng định.' },
  { slug: 'preposition-zai-cong-dao', title: '介词 “在、从、到” — Giới Từ Chỉ Không Gian & Thời Gian', top: 'aspect-particles', lvl: 'HSK 1', desc: 'Vị trí ở đâu (在), điểm xuất phát (从) và đích đến (到).' }
];

EXTRA_ZH_CONCEPTS.forEach((item) => {
  CHINESE_GRAMMAR_CONCEPTS.push({
    id: `zh-gram-${item.slug}`,
    language: 'zh',
    title: item.title,
    slug: item.slug,
    level: item.lvl as any,
    topic: item.top,
    topicName: item.top === 'ba-bei-sentences' ? '把字句与被字句' : item.top === 'complements' ? '补语系统' : item.top === 'comparisons' ? '比较句' : '语法核心',
    shortDescription: item.desc,
    theIdea: `Nắm vững ${item.title} giúp bạn xây dựng câu tiếng Trung tự nhiên, chuẩn văn phong HSK.`,
    whenToUse: ['Dùng trong giao tiếp thường nhật và các bài thi HSK.'],
    rules: [
      {
        title: 'Cấu trúc tổng quát',
        formula: 'Chủ ngữ + Thành phần ngữ pháp + Vị ngữ + Bổ ngữ',
        explanation: 'Tuân thủ chặt chẽ trật tự từ tiếng Hán hiện đại.'
      }
    ],
    examples: [
      {
        sentence: `掌握 ${item.title} 能让汉语表达更加地道。`,
        translation: `Làm chủ ${item.title} sẽ giúp cách diễn đạt tiếng Trung chuẩn xác hơn.`,
        highlight: item.title
      }
    ],
    commonMistakes: [
      {
        incorrect: 'Sai trật tự phó từ hoặc bổ ngữ.',
        correct: 'Đảm bảo phó từ đứng trước vị ngữ động từ.',
        explanation: 'Tránh dịch từng chữ theo tư duy tiếng Việt mà hãy tuân theo quy tắc tiếng Hán.'
      }
    ],
    tags: [item.top, item.lvl],
    createdAt: '2026-09-10T00:00:00Z',
    updatedAt: '2026-09-20T00:00:00Z'
  });
});
