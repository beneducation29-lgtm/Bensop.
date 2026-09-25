import { GrammarTopic } from '../types/grammar';

export const ENGLISH_GRAMMAR_TOPICS: GrammarTopic[] = [
  {
    id: 'tenses',
    language: 'en',
    name: 'Verb Tenses',
    slug: 'tenses',
    description: 'Hệ thống 12 thì động từ trong tiếng Anh, từ các thì đơn giản đến các thì hoàn thành tiếp diễn nâng cao.',
    conceptCount: 12,
    levelRange: 'A1–C1',
    image: '/src/assets/images/bensop_english_bw_1790320781718.jpg'
  },
  {
    id: 'conditionals',
    language: 'en',
    name: 'Conditionals & Wishes',
    slug: 'conditionals',
    description: 'Câu điều kiện loại 0, 1, 2, 3, câu điều kiện hỗn hợp (Mixed Conditionals) và cấu trúc điều ước.',
    conceptCount: 6,
    levelRange: 'A2–C1',
    image: '/src/assets/images/bensop_hero_bw_1790320756330.jpg'
  },
  {
    id: 'passive-voice',
    language: 'en',
    name: 'Passive Voice',
    slug: 'passive-voice',
    description: 'Thể bị động cơ bản, bị động kép với động từ tường thuật, và cấu trúc bị động truyền khiến (Causative).',
    conceptCount: 5,
    levelRange: 'B1–B2',
    image: '/src/assets/images/bensop_growth_bw_1790320796588.jpg'
  },
  {
    id: 'modal-verbs',
    language: 'en',
    name: 'Modal Verbs',
    slug: 'modal-verbs',
    description: 'Động từ khuyết thiếu thể hiện khả năng, nghĩa vụ, phỏng đoán trong hiện tại và quá khứ (Modal Perfects).',
    conceptCount: 7,
    levelRange: 'A2–B2',
    image: '/src/assets/images/bensop_english_bw_1790320781718.jpg'
  },
  {
    id: 'relative-clauses',
    language: 'en',
    name: 'Relative Clauses',
    slug: 'relative-clauses',
    description: 'Mệnh đề quan hệ xác định, không xác định và các cách rút gọn mệnh đề quan hệ tự nhiên.',
    conceptCount: 5,
    levelRange: 'B1–C1',
    image: '/src/assets/images/bensop_hero_bw_1790320756330.jpg'
  },
  {
    id: 'reported-speech',
    language: 'en',
    name: 'Reported Speech',
    slug: 'reported-speech',
    description: 'Tường thuật câu trần thuật, câu hỏi Yes/No, câu hỏi Wh-, câu mệnh lệnh và lùi thì quy chuẩn.',
    conceptCount: 4,
    levelRange: 'B1–B2',
    image: '/src/assets/images/bensop_growth_bw_1790320796588.jpg'
  },
  {
    id: 'gerunds-infinitives',
    language: 'en',
    name: 'Gerunds & Infinitives',
    slug: 'gerunds-infinitives',
    description: 'Động từ nguyên mẫu (to V / bare V), danh động từ (V-ing) và những động từ thay đổi nghĩa theo dạng thức.',
    conceptCount: 5,
    levelRange: 'A2–B2',
    image: '/src/assets/images/bensop_health_bw_1790320807310.jpg'
  },
  {
    id: 'inversion',
    language: 'en',
    name: 'Inversion & Emphasis',
    slug: 'inversion',
    description: 'Đảo ngữ với trạng từ phủ định (Never, Rarely, Seldom), cấu trúc Not only... but also và Cleft Sentences.',
    conceptCount: 4,
    levelRange: 'B2–C1',
    image: '/src/assets/images/bensop_hero_bw_1790320756330.jpg'
  },
  {
    id: 'prepositions',
    language: 'en',
    name: 'Prepositions & Collocations',
    slug: 'prepositions',
    description: 'Giới từ chỉ thời gian, địa điểm, phương hướng và các cụm giới từ cố định trong văn phong học thuật.',
    conceptCount: 6,
    levelRange: 'A1–B2',
    image: '/src/assets/images/bensop_english_bw_1790320781718.jpg'
  },
  {
    id: 'comparatives',
    language: 'en',
    name: 'Comparatives & Superlatives',
    slug: 'comparatives',
    description: 'So sánh hơn, so sánh nhất, so sánh kép (The more... the more), và các cấu trúc so sánh tăng tiến.',
    conceptCount: 4,
    levelRange: 'A2–B1',
    image: '/src/assets/images/bensop_growth_bw_1790320796588.jpg'
  }
];

export const CHINESE_GRAMMAR_TOPICS: GrammarTopic[] = [
  {
    id: 'zh-ba-bei',
    language: 'zh',
    name: '把字句与被字句 — Câu Chữ 把 & 被',
    slug: 'ba-bei-sentences',
    description: 'Hai cấu trúc ngữ pháp then chốt trong tiếng Trung thể hiện sự tác động, xử lý và bị động.',
    conceptCount: 4,
    levelRange: 'HSK 3–4',
    image: '/src/assets/images/bensop_chinese_bw_1790320769606.jpg'
  },
  {
    id: 'zh-aspect',
    language: 'zh',
    name: '动态助词 — Trợ Từ Động Thái (了, 过, 着)',
    slug: 'aspect-particles',
    description: 'Biểu thị sự hoàn thành, trải nghiệm đã qua hoặc trạng thái đang tiếp diễn trong tiếng Trung.',
    conceptCount: 5,
    levelRange: 'HSK 1–3',
    image: '/src/assets/images/bensop_hero_bw_1790320756330.jpg'
  },
  {
    id: 'zh-shi-de',
    language: 'zh',
    name: '是...的 结构 — Cấu Trúc Nhấn Mạnh 是...的',
    slug: 'shi-de-construction',
    description: 'Dùng để nhấn mạnh thời gian, địa điểm, phương thức hoặc đối tượng thực hiện hành động đã xảy ra.',
    conceptCount: 3,
    levelRange: 'HSK 2–3',
    image: '/src/assets/images/bensop_chinese_bw_1790320769606.jpg'
  },
  {
    id: 'zh-complements',
    language: 'zh',
    name: '补语系统 — Hệ Thống Bổ Ngữ',
    slug: 'complements',
    description: 'Bổ ngữ kết quả (完, 好, 见), bổ ngữ phương hướng (来, 去), bổ ngữ khả năng và bổ ngữ mức độ.',
    conceptCount: 6,
    levelRange: 'HSK 2–4',
    image: '/src/assets/images/bensop_growth_bw_1790320796588.jpg'
  },
  {
    id: 'zh-measure',
    language: 'zh',
    name: '量词搭配 — Lượng Từ & Danh Từ',
    slug: 'measure-words',
    description: 'Nguyên tắc kết hợp lượng từ: 个, 张, 本, 条, 只, 件, 瓶, 辆 và các lượng từ chuyên biệt.',
    conceptCount: 4,
    levelRange: 'HSK 1–3',
    image: '/src/assets/images/bensop_health_bw_1790320807310.jpg'
  },
  {
    id: 'zh-comparison',
    language: 'zh',
    name: '比较句 — Các Cấu Trúc So Sánh',
    slug: 'comparisons',
    description: 'So sánh với 比, 没有, 不如, 一样...一样, 越来越 và càng... càng...',
    conceptCount: 4,
    levelRange: 'HSK 2–3',
    image: '/src/assets/images/bensop_hero_bw_1790320756330.jpg'
  },
  {
    id: 'zh-conjunctions',
    language: 'zh',
    name: '关联词 — Cặp Liên Từ Phức Hợp',
    slug: 'conjunctions',
    description: 'Cặp từ nối: 因为...所以, 虽然...但是, 不但...而且, 只有...才, 如果...就.',
    conceptCount: 5,
    levelRange: 'HSK 2–4',
    image: '/src/assets/images/bensop_chinese_bw_1790320769606.jpg'
  }
];

export function getGrammarTopics(language: 'en' | 'zh'): GrammarTopic[] {
  return language === 'en' ? ENGLISH_GRAMMAR_TOPICS : CHINESE_GRAMMAR_TOPICS;
}
