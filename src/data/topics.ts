import { Topic } from '../types';

export const TOPICS: Topic[] = [
  // --- TIẾNG TRUNG ---
  {
    id: 'topic-zh-vocab',
    categoryId: 'tieng-trung',
    name: 'Từ vựng (Vocabulary)',
    englishName: 'Vocabulary',
    slug: 'vocabulary',
    description: 'Từ vựng tiếng Trung từ HSK 1 đến HSK 6, bộ thủ chữ Hán và các chủ đề chuyên sâu cho công việc và đời sống.',
    stats: { lessonsCount: 45, itemsCount: '1.500+ từ', topicsCount: 18 },
    featuredArticleSlugs: ['100-tu-vung-tieng-trung-thuong-gap'],
    courseSlugs: ['tieng-trung-thuc-chien-tu-con-so-0']
  },
  {
    id: 'topic-zh-grammar',
    categoryId: 'tieng-trung',
    name: 'Ngữ pháp (Grammar)',
    englishName: 'Grammar',
    slug: 'grammar',
    description: 'Hệ thống ngữ pháp tiếng Trung ứng dụng: câu chữ 把, chữ 被, phân biệt trợ từ 的, 得, 地 và các liên từ logic.',
    stats: { lessonsCount: 38, itemsCount: '120 cấu trúc', topicsCount: 14 },
    featuredArticleSlugs: ['phan-biet-de-de-de-tieng-trung'],
    courseSlugs: ['tieng-trung-thuc-chien-tu-con-so-0']
  },
  {
    id: 'topic-zh-pronunciation',
    categoryId: 'tieng-trung',
    name: 'Phát âm (Pronunciation)',
    englishName: 'Pronunciation',
    slug: 'pronunciation',
    description: 'Làm chủ bảng bính âm Pinyin, quy tắc biến điệu thanh 3, âm uốn lưỡi 儿 hóa và chuẩn hóa 4 thanh điệu.',
    stats: { lessonsCount: 20, itemsCount: '4 thanh điệu', topicsCount: 8 },
    featuredArticleSlugs: ['giai-ma-4-thanh-dieu-tieng-trung'],
    courseSlugs: ['tieng-trung-thuc-chien-tu-con-so-0']
  },
  {
    id: 'topic-zh-listening',
    categoryId: 'tieng-trung',
    name: 'Luyện nghe (Listening)',
    englishName: 'Listening',
    slug: 'listening',
    description: 'Luyện tai nghe ngữ cảnh thực tế, bắt từ khóa khẩu ngữ và làm quen với tốc độ nói của người bản xứ.',
    stats: { lessonsCount: 30, itemsCount: '60 audio clips', topicsCount: 10 },
    featuredArticleSlugs: ['50-cau-giao-tiep-tieng-trung-thuong-dung']
  },
  {
    id: 'topic-zh-speaking',
    categoryId: 'tieng-trung',
    name: 'Khẩu ngữ (Speaking)',
    englishName: 'Speaking',
    slug: 'speaking',
    description: 'Rèn luyện phản xạ hội thoại theo chủ đề đàm phán thương mại, đặt hàng xuất nhập khẩu và giao tiếp thường nhật.',
    stats: { lessonsCount: 36, itemsCount: '85 hội thoại', topicsCount: 12 },
    featuredArticleSlugs: ['50-cau-giao-tiep-tieng-trung-thuong-dung'],
    courseSlugs: ['tieng-trung-thuc-chien-tu-con-so-0']
  },
  {
    id: 'topic-zh-reading',
    categoryId: 'tieng-trung',
    name: 'Đọc hiểu (Reading)',
    englishName: 'Reading',
    slug: 'reading',
    description: 'Đọc báo chí, hợp đồng thương mại, tài liệu công việc và truyện ngắn văn hóa Trung Hoa.',
    stats: { lessonsCount: 25, itemsCount: '45 bài đọc', topicsCount: 9 }
  },
  {
    id: 'topic-zh-hsk',
    categoryId: 'tieng-trung',
    name: 'Lộ trình HSK (HSK Track)',
    englishName: 'HSK',
    slug: 'hsk',
    description: 'Chiến thuật làm bài thi HSK 3.0 từ cấp độ 1 đến 6, bí quyết đạt điểm cao HSKK và ngân hàng đề thi thử chuẩn hóa.',
    stats: { lessonsCount: 40, itemsCount: '6 cấp độ', topicsCount: 15 },
    featuredArticleSlugs: ['100-tu-vung-tieng-trung-thuong-gap'],
    courseSlugs: ['tieng-trung-thuc-chien-tu-con-so-0']
  },
  {
    id: 'topic-zh-quiz',
    categoryId: 'tieng-trung',
    name: 'Thử thách Quiz (Quiz)',
    englishName: 'Quiz',
    slug: 'quiz',
    description: 'Bộ trắc nghiệm phản xạ từ vựng, ngữ pháp và nghe hiểu tiếng Trung với phản hồi tức thì.',
    stats: { lessonsCount: 25, itemsCount: '250 câu hỏi', topicsCount: 10 }
  },

  // --- TIẾNG ANH ---
  {
    id: 'topic-en-vocab',
    categoryId: 'tieng-anh',
    name: 'Từ vựng & Cụm từ (Vocabulary)',
    englishName: 'Vocabulary',
    slug: 'vocabulary',
    description: 'Collocations, Phrasal Verbs và Idioms thực chiến giúp diễn đạt tự nhiên như người bản xứ trong công việc và đời sống.',
    stats: { lessonsCount: 50, itemsCount: '1.200+ cụm từ', topicsCount: 24 },
    featuredArticleSlugs: ['100-phrasal-verbs-ban-nen-biet', '50-cum-tu-tieng-anh-cong-viec'],
    courseSlugs: ['connected-speech-speaking-tu-nhien']
  },
  {
    id: 'topic-en-grammar',
    categoryId: 'tieng-anh',
    name: 'Ngữ pháp ứng dụng (Grammar)',
    englishName: 'Grammar',
    slug: 'grammar',
    description: 'Thoát khỏi lối học ngữ pháp máy móc. Hiểu bản chất các thì, câu điều kiện, mệnh đề quan hệ và đảo ngữ qua ví dụ thực tế.',
    stats: { lessonsCount: 42, itemsCount: '90 cấu trúc', topicsCount: 16 },
    featuredArticleSlugs: ['present-perfect-khi-nao-su-dung'],
    courseSlugs: ['connected-speech-speaking-tu-nhien']
  },
  {
    id: 'topic-en-speaking',
    categoryId: 'tieng-anh',
    name: 'Luyện nói phản xạ (Speaking)',
    englishName: 'Speaking',
    slug: 'speaking',
    description: 'Kỹ thuật Shadowing, phương pháp tư duy trực tiếp bằng tiếng Anh và cấu trúc diễn đạt mạch lạc trong các cuộc họp quốc tế.',
    stats: { lessonsCount: 40, itemsCount: '80 chủ đề', topicsCount: 18 },
    featuredArticleSlugs: ['30-cau-giao-tiep-tieng-anh-hang-ngay'],
    courseSlugs: ['connected-speech-speaking-tu-nhien']
  },
  {
    id: 'topic-en-listening',
    categoryId: 'tieng-anh',
    name: 'Luyện nghe ngữ cảnh (Listening)',
    englishName: 'Listening',
    slug: 'listening',
    description: 'Luyện nghe qua podcast, TED Talks, bản tin BBC/NPR và các cuộc phỏng vấn chuyên ngành.',
    stats: { lessonsCount: 35, itemsCount: '75 audio clips', topicsCount: 12 },
    courseSlugs: ['connected-speech-speaking-tu-nhien']
  },
  {
    id: 'topic-en-reading',
    categoryId: 'tieng-anh',
    name: 'Đọc hiểu chuyên sâu (Reading)',
    englishName: 'Reading',
    slug: 'reading',
    description: 'Phương pháp đọc lướt (Skimming), đọc quét (Scanning) và phân tích các bài luận học thuật và báo cáo quốc tế.',
    stats: { lessonsCount: 28, itemsCount: '50 bài đọc', topicsCount: 10 }
  },
  {
    id: 'topic-en-writing',
    categoryId: 'tieng-anh',
    name: 'Kỹ năng Viết (Writing)',
    englishName: 'Writing',
    slug: 'writing',
    description: 'Viết email công sở súc tích, viết báo cáo phân tích và bài luận thể hiện quan điểm sắc bén.',
    stats: { lessonsCount: 26, itemsCount: '30 templates', topicsCount: 8 }
  },
  {
    id: 'topic-en-pronunciation',
    categoryId: 'tieng-anh',
    name: 'Ngữ âm Connected Speech (Pronunciation)',
    englishName: 'Pronunciation',
    slug: 'pronunciation',
    description: 'Bảng phiên âm quốc tế IPA, kỹ thuật nối âm (linking), nuốt âm (elision) và ngữ điệu (intonation).',
    stats: { lessonsCount: 24, itemsCount: '44 âm IPA', topicsCount: 8 },
    courseSlugs: ['connected-speech-speaking-tu-nhien']
  },
  {
    id: 'topic-en-quiz',
    categoryId: 'tieng-anh',
    name: 'Trắc nghiệm Quiz (Quiz)',
    englishName: 'Quiz',
    slug: 'quiz',
    description: 'Kiểm tra độ nhạy từ vựng và ngữ pháp tiếng Anh với các câu hỏi tình huống thực tế.',
    stats: { lessonsCount: 30, itemsCount: '300 câu hỏi', topicsCount: 12 }
  },

  // --- PHÁT TRIỂN BẢN THÂN ---
  {
    id: 'topic-gr-mindset',
    categoryId: 'phat-trien-ban-than',
    name: 'Tư duy & Mô hình trí tuệ (Mindset)',
    englishName: 'Mindset',
    slug: 'mindset',
    description: 'Nguyên lý thứ nhất (First Principles), tư duy bậc hai, định lý Bayes và triết học khắc kỷ để giải quyết bài toán phức tạp.',
    stats: { lessonsCount: 32, itemsCount: '15 mô hình', topicsCount: 8 },
    featuredArticleSlugs: ['mo-hinh-tu-duy-nguyen-ly-thu-nhat'],
    courseSlugs: ['ky-luat-tu-than-hieu-suat-dinh-cao']
  },
  {
    id: 'topic-gr-habits',
    categoryId: 'phat-trien-ban-than',
    name: 'Thiết kế thói quen (Habits)',
    englishName: 'Habits',
    slug: 'habits',
    description: 'Ứng dụng khoa học hành vi và Atomic Habits để xây dựng thói quen tốt bền vững và loại bỏ thói quen xấu.',
    stats: { lessonsCount: 28, itemsCount: '12 giao thức', topicsCount: 6 },
    featuredArticleSlugs: ['xay-dung-thoi-quen-tu-nhung-viec-nho'],
    courseSlugs: ['ky-luat-tu-than-hieu-suat-dinh-cao']
  },
  {
    id: 'topic-gr-discipline',
    categoryId: 'phat-trien-ban-than',
    name: 'Kỷ luật tự thân (Discipline)',
    englishName: 'Discipline',
    slug: 'discipline',
    description: 'Kỷ luật không phải chịu đựng khổ sở. Đó là nghệ thuật thiết lập môi trường để biến hành động đúng thành lựa chọn dễ nhất.',
    stats: { lessonsCount: 22, itemsCount: '10 chiến lược', topicsCount: 5 },
    featuredArticleSlugs: ['ky-luat-khong-phai-lam-nhieu-hon'],
    courseSlugs: ['ky-luat-tu-than-hieu-suat-dinh-cao']
  },
  {
    id: 'topic-gr-productivity',
    categoryId: 'phat-trien-ban-than',
    name: 'Hiệu suất & Deep Work (Productivity)',
    englishName: 'Productivity',
    slug: 'productivity',
    description: 'Phương pháp làm việc sâu (Deep Work), Time-blocking, kỹ thuật Pomodoro cải tiến và quản trị năng lượng sinh học.',
    stats: { lessonsCount: 30, itemsCount: '18 công cụ', topicsCount: 7 },
    featuredArticleSlugs: ['deep-work-la-gi-cach-thuc-hien', '5-cach-quan-ly-thoi-gian-thuc-te'],
    courseSlugs: ['ky-luat-tu-than-hieu-suat-dinh-cao']
  },
  {
    id: 'topic-gr-communication',
    categoryId: 'phat-trien-ban-than',
    name: 'Giao tiếp & Thuyết phục (Communication)',
    englishName: 'Communication',
    slug: 'communication',
    description: 'Nghệ thuật lắng nghe chủ động, đặt câu hỏi khai phóng và đàm phán dựa trên giá trị đôi bên cùng thắng.',
    stats: { lessonsCount: 24, itemsCount: '14 kỹ năng', topicsCount: 6 }
  },
  {
    id: 'topic-gr-career',
    categoryId: 'phat-trien-ban-than',
    name: 'Chiến lược sự nghiệp (Career)',
    englishName: 'Career',
    slug: 'career',
    description: 'Xây dựng vốn liếng sự nghiệp (Career Capital), định vị giá trị cá nhân và phương pháp tìm kiếm cơ hội bứt phá.',
    stats: { lessonsCount: 20, itemsCount: '12 lộ trình', topicsCount: 5 }
  },
  {
    id: 'topic-gr-leadership',
    categoryId: 'phat-trien-ban-than',
    name: 'Lãnh đạo & Ảnh hưởng (Leadership)',
    englishName: 'Leadership',
    slug: 'leadership',
    description: 'Lãnh đạo bản thân trước khi dẫn dắt người khác: tạo dựng niềm tin, truyền cảm hứng và giải quyết mâu thuẫn đội ngũ.',
    stats: { lessonsCount: 18, itemsCount: '10 nguyên tắc', topicsCount: 4 }
  },
  {
    id: 'topic-gr-finance',
    categoryId: 'phat-trien-ban-than',
    name: 'Tài chính cá nhân (Personal Finance)',
    englishName: 'Personal Finance',
    slug: 'personal-finance',
    description: 'Tư duy tài sản - tiêu sản, quản trị dòng tiền, lập ngân sách thông minh và nền tảng đầu tư dài hạn an toàn.',
    stats: { lessonsCount: 16, itemsCount: '8 quy tắc', topicsCount: 4 }
  },

  // --- SỨC KHỎE & ĐỜI SỐNG ---
  {
    id: 'topic-hl-fitness',
    categoryId: 'suc-khoe-doi-song',
    name: 'Vận động & Thể lực (Fitness)',
    englishName: 'Fitness',
    slug: 'fitness',
    description: 'Khoa học tập luyện kháng lực (hypertrophy & strength), cải thiện VO2 Max cho sức khỏe tim mạch và bài tập kéo giãn cơ thể.',
    stats: { lessonsCount: 26, itemsCount: '30 bài tập', topicsCount: 6 },
    featuredArticleSlugs: ['van-dong-hang-ngay-co-y-nghia-gi'],
    courseSlugs: ['khoa-hoc-the-luc-dinh-duong-phuc-hoi']
  },
  {
    id: 'topic-hl-nutrition',
    categoryId: 'suc-khoe-doi-song',
    name: 'Dinh dưỡng chức năng (Nutrition)',
    englishName: 'Nutrition',
    slug: 'nutrition',
    description: 'Hiểu rõ các nhóm chất đa lượng Macro, tối ưu đường huyết, hệ vi sinh đường ruột và chế độ ăn giàu dinh dưỡng tự nhiên.',
    stats: { lessonsCount: 28, itemsCount: '20 nguyên tắc', topicsCount: 7 },
    courseSlugs: ['khoa-hoc-the-luc-dinh-duong-phuc-hoi']
  },
  {
    id: 'topic-hl-sleep',
    categoryId: 'suc-khoe-doi-song',
    name: 'Khoa học Giấc ngủ (Sleep)',
    englishName: 'Sleep',
    slug: 'sleep',
    description: 'Đồng bộ nhịp sinh học Circadian, tối ưu môi trường ngủ (nhiệt độ, ánh sáng) và quy tắc 10-3-2-1-0 cho giấc ngủ sâu.',
    stats: { lessonsCount: 22, itemsCount: '12 giao thức', topicsCount: 5 },
    featuredArticleSlugs: ['dong-bo-nhip-sinh-hoc-giac-ngu-sau', 'nhung-nguyen-tac-co-ban-de-ngu-tot-hon'],
    courseSlugs: ['khoa-hoc-the-luc-dinh-duong-phuc-hoi']
  },
  {
    id: 'topic-hl-lifestyle',
    categoryId: 'suc-khoe-doi-song',
    name: 'Lối sống bền vững (Lifestyle)',
    englishName: 'Lifestyle',
    slug: 'lifestyle',
    description: 'Thực hành tối giản trong đời sống, giảm phụ thuộc vào thiết bị số (Digital Detox) và kết nối với thiên nhiên.',
    stats: { lessonsCount: 18, itemsCount: '15 phương pháp', topicsCount: 5 },
    featuredArticleSlugs: ['xay-dung-mot-loi-song-can-bang']
  },
  {
    id: 'topic-hl-wellbeing',
    categoryId: 'suc-khoe-doi-song',
    name: 'Sức khỏe tinh thần (Wellbeing)',
    englishName: 'Wellbeing',
    slug: 'wellbeing',
    description: 'Thiền định tỉnh thức (Mindfulness), kỹ thuật hít thở điều hòa thần kinh (Box Breathing, Physiological Sigh) và giảm căng thẳng mãn tính.',
    stats: { lessonsCount: 20, itemsCount: '10 bài tập thở', topicsCount: 5 }
  },
  {
    id: 'topic-hl-habits',
    categoryId: 'suc-khoe-doi-song',
    name: 'Thói quen lành mạnh (Healthy Habits)',
    englishName: 'Healthy Habits',
    slug: 'healthy-habits',
    description: 'Các thói quen vi mô buổi sáng và tối giúp duy trì năng lượng cao, uống đủ nước và duy trì thể trạng dẻo dai.',
    stats: { lessonsCount: 24, itemsCount: '16 thói quen', topicsCount: 6 }
  }
];
