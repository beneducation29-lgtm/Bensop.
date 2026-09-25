import { LearningPath } from '../types';

export const LEARNING_PATHS: LearningPath[] = [
  {
    id: 'path-en-speaking',
    categoryId: 'tieng-anh',
    categoryName: 'TIẾNG ANH',
    title: 'ENGLISH SPEAKING & FLUENCY PATH',
    slug: 'english-speaking-path',
    description: 'Lộ trình 4 giai đoạn chuẩn hóa ngữ âm, phản xạ tư duy trực tiếp và làm chủ khả năng thuyết trình, đàm phán quốc tế.',
    estimatedHours: '120 giờ học',
    levels: [
      {
        levelNumber: 'Level 01',
        title: 'Foundation & Connected Speech',
        subtitle: 'Bản đồ ngữ âm & Phản xạ câu đơn',
        description: 'Làm chủ 44 âm IPA, kỹ thuật nối âm (Linking), nuốt âm (Elision) và nhịp điệu trọng âm câu tự nhiên.',
        status: 'completed',
        courseSlugs: ['connected-speech-speaking-tu-nhien'],
        lessonCount: 28,
        quizCount: 4,
        skills: ['Nối âm C+V', 'Nuốt âm Schwa', 'Trọng âm từ & câu', 'Shadowing cơ bản']
      },
      {
        levelNumber: 'Level 02',
        title: 'Everyday Conversation & Collocations',
        subtitle: 'Giao tiếp đời thực không cần dịch nhẩm',
        description: 'Tích lũy 300 cụm từ Collocations và Phrasal verbs phổ biến nhất trong đời sống thường nhật.',
        status: 'in-progress',
        courseSlugs: ['connected-speech-speaking-tu-nhien'],
        lessonCount: 32,
        quizCount: 5,
        skills: ['Particle Logic', 'Small talk tự nhiên', 'Đặt câu hỏi phản xạ', 'Xử lý tình huống giao tiếp']
      },
      {
        levelNumber: 'Level 03',
        title: 'Workplace English & Negotiation',
        subtitle: 'Tiếng Anh công sở & Đàm phán chuyên nghiệp',
        description: 'Thuyết trình dự án, dẫn dắt cuộc họp đa quốc gia, viết email súc tích và kỹ thuật ngoại giao ngôn từ.',
        status: 'locked',
        courseSlugs: ['connected-speech-speaking-tu-nhien'],
        lessonCount: 30,
        quizCount: 4,
        skills: ['Diplomatic language', 'Trình bày số liệu biểu đồ', 'Phản biện lịch thiệp', 'Thương lượng hợp đồng']
      },
      {
        levelNumber: 'Level 04',
        title: 'Advanced Public Speaking & Debate',
        subtitle: 'Hùng biện, tranh biện & Tư duy phản biện',
        description: 'Nâng cao nghệ thuật dùng từ ngữ hình tượng, kể chuyện (Storytelling) và bảo vệ luận điểm sắc bén.',
        status: 'locked',
        courseSlugs: ['connected-speech-speaking-tu-nhien'],
        lessonCount: 24,
        quizCount: 3,
        skills: ['Storytelling Framework', 'Rhetorical devices', 'Tranh biện học thuật', 'Lãnh đạo bằng ngôn từ']
      }
    ]
  },
  {
    id: 'path-zh-mastery',
    categoryId: 'tieng-trung',
    categoryName: 'TIẾNG TRUNG',
    title: 'CHINESE HSK & BUSINESS MASTERY PATH',
    slug: 'chinese-mastery-path',
    description: 'Từ người mới bắt đầu đến khả năng làm việc độc lập với đối tác Trung Quốc và vượt qua kỳ thi HSK 4 - 5.',
    estimatedHours: '150 giờ học',
    levels: [
      {
        levelNumber: 'Level 01',
        title: 'Pinyin & HSK 1 Nền tảng',
        subtitle: 'Bính âm chuẩn, 4 thanh điệu & 150 chữ Hán đầu tiên',
        description: 'Giải mã quy tắc ghép âm Pinyin, làm quen với 50 bộ thủ thông dụng nhất và giao tiếp sinh hoạt cơ bản.',
        status: 'completed',
        courseSlugs: ['tieng-trung-thuc-chien-tu-con-so-0'],
        lessonCount: 32,
        quizCount: 5,
        skills: ['4 Thanh điệu chuẩn', 'Quy tắc bút thuận', 'Chào hỏi & mua sắm', 'Đọc hiểu biển hiệu']
      },
      {
        levelNumber: 'Level 02',
        title: 'HSK 2 - 3 Everyday Communication',
        subtitle: 'Mở rộng 600 từ vựng & Ngữ pháp cấu trúc',
        description: 'Làm chủ các cấu trúc câu chữ 把, chữ 被, bổ ngữ trạng thái và giao tiếp trôi chảy khi du lịch, đặt hàng.',
        status: 'in-progress',
        courseSlugs: ['tieng-trung-thuc-chien-tu-con-so-0'],
        lessonCount: 40,
        quizCount: 6,
        skills: ['Câu chữ 把', 'Phân biệt 的 得 地', 'Thương lượng giá cả', 'Luyện nghe phản xạ']
      },
      {
        levelNumber: 'Level 03',
        title: 'HSK 4 Commercial & Workplace Chinese',
        subtitle: 'Tiếng Trung thương mại & Đàm phán xuất nhập khẩu',
        description: 'Đọc hiểu hợp đồng thương mại, trao đổi thư tín văn phòng, làm việc với nhà máy và sàn 1688/Taobao.',
        status: 'locked',
        courseSlugs: ['tieng-trung-thuc-chien-tu-con-so-0'],
        lessonCount: 36,
        quizCount: 5,
        skills: ['Từ vựng logistics', 'Ký kết biên bản', 'Viết thư tín kinh doanh', 'Phỏng vấn việc làm']
      },
      {
        levelNumber: 'Level 04',
        title: 'HSK 5 - 6 Professional Fluency',
        subtitle: 'Thành thạo văn bản học thuật & Thành ngữ Thành ngữ (Thành ngữ)',
        description: 'Đọc hiểu báo chí chính luận, phân tích thị trường kinh tế và sử dụng linh hoạt các thành ngữ 4 chữ cổ điển.',
        status: 'locked',
        courseSlugs: ['tieng-trung-thuc-chien-tu-con-so-0'],
        lessonCount: 30,
        quizCount: 4,
        skills: ['Thành ngữ Thành ngữ', 'Đọc báo chuyên sâu', 'Phiên dịch hội nghị', 'Văn phong trang trọng']
      }
    ]
  },
  {
    id: 'path-gr-discipline',
    categoryId: 'phat-trien-ban-than',
    categoryName: 'PHÁT TRIỂN BẢN THÂN',
    title: 'PERSONAL DISCIPLINE & HIGH-PERFORMANCE PATH',
    slug: 'personal-discipline-path',
    description: 'Xây dựng hệ thống vận hành cá nhân dựa trên khoa học hành vi, mô hình tư duy và hiệu suất đỉnh cao.',
    estimatedHours: '80 giờ học',
    levels: [
      {
        levelNumber: 'Level 01',
        title: 'Mindset & Mental Models',
        subtitle: 'Cài đặt hệ điều hành tư duy mới',
        description: 'Nguyên lý thứ nhất (First Principles), tư duy bậc hai và loại bỏ những định kiến nhận thức sai lầm.',
        status: 'completed',
        courseSlugs: ['ky-luat-tu-than-hieu-suat-dinh-cao'],
        lessonCount: 20,
        quizCount: 3,
        skills: ['First Principles Thinking', 'Second-Order Thinking', 'Chủ nghĩa Khắc kỷ', 'Kiểm soát cảm xúc']
      },
      {
        levelNumber: 'Level 02',
        title: 'Atomic Habits & Environment Design',
        subtitle: 'Thiết kế thói quen vi mô bền vững',
        description: 'Làm chủ vòng lặp 4 bước thói quen, giảm thiểu ma sát môi trường và duy trì kỷ luật không cần ý chí.',
        status: 'in-progress',
        courseSlugs: ['ky-luat-tu-than-hieu-suat-dinh-cao'],
        lessonCount: 22,
        quizCount: 4,
        skills: ['Quy tắc 2 phút', 'Habit Stacking', 'Tối ưu không gian sống', 'Theo dõi thói quen']
      },
      {
        levelNumber: 'Level 03',
        title: 'Deep Work & Focus Architecture',
        subtitle: 'Làm việc sâu không xao nhãng',
        description: 'Thiết lập các khối tập trung 90 phút, bảo vệ năng lượng buổi sáng và giải phóng chứng nghiện dopamine ngắn hạn.',
        status: 'locked',
        courseSlugs: ['ky-luat-tu-than-hieu-suat-dinh-cao'],
        lessonCount: 18,
        quizCount: 3,
        skills: ['Time-Blocking', 'Digital Minimalism', 'Dopamine Detox', 'Quản trị năng lượng']
      },
      {
        levelNumber: 'Level 04',
        title: 'Self-Leadership & Long-term Vision',
        subtitle: 'Lãnh đạo cuộc đời & Tự do tài chính',
        description: 'Hoạch định chiến lược sự nghiệp 5 năm, quản trị tài sản cá nhân và xây dựng di sản có ý nghĩa.',
        status: 'locked',
        courseSlugs: ['ky-luat-tu-than-hieu-suat-dinh-cao'],
        lessonCount: 16,
        quizCount: 2,
        skills: ['Career Capital', 'Tư duy tài sản', 'Quản trị khủng hoảng', 'Mục đích sống']
      }
    ]
  },
  {
    id: 'path-hl-vitality',
    categoryId: 'suc-khoe-doi-song',
    categoryName: 'SỨC KHỎE & ĐỜI SỐNG',
    title: 'CIRCADIAN HEALTH & LONGEVITY PROTOCOL',
    slug: 'circadian-health-path',
    description: 'Giao thức chăm sóc sức khỏe toàn diện dựa trên y học lối sống và khoa học trường thọ (Longevity Science).',
    estimatedHours: '90 giờ học',
    levels: [
      {
        levelNumber: 'Level 01',
        title: 'Circadian Sync & Deep Sleep',
        subtitle: 'Đồng bộ nhịp sinh học & Giấc ngủ sâu phục hồi',
        description: 'Khoa học về ánh sáng mặt trời, tối ưu nhiệt độ phòng ngủ và quy tắc 10-3-2-1-0 cho giấc ngủ chất lượng cao.',
        status: 'completed',
        courseSlugs: ['khoa-hoc-the-luc-dinh-duong-phuc-hoi'],
        lessonCount: 24,
        quizCount: 3,
        skills: ['Ánh sáng buổi sáng', 'Giao thức 10-3-2-1-0', 'Bảo vệ Melatonin', 'Thức dậy tự nhiên']
      },
      {
        levelNumber: 'Level 02',
        title: 'Functional Nutrition & Metabolic Health',
        subtitle: 'Dinh dưỡng chức năng & Ổn định đường huyết',
        description: 'Tối ưu tỷ lệ Protein, kiểm soát dao động Glucose máu và lựa chọn thực phẩm giàu vi chất tự nhiên.',
        status: 'in-progress',
        courseSlugs: ['khoa-hoc-the-luc-dinh-duong-phuc-hoi'],
        lessonCount: 26,
        quizCount: 4,
        skills: ['Tính TDEE & Macro', 'Kiểm soát Glucose', 'Hệ vi sinh Gut Microbiome', 'Uống nước điện giải']
      },
      {
        levelNumber: 'Level 03',
        title: 'Strength, Mobility & Zone 2 Cardio',
        subtitle: 'Kháng lực, dẻo dai & Sức khỏe tim mạch',
        description: '5 chuyển động cơ bản, bài tập nâng cao VO2 Max và phục hồi cơ bắp chống chấn thương văn phòng.',
        status: 'locked',
        courseSlugs: ['khoa-hoc-the-luc-dinh-duong-phuc-hoi'],
        lessonCount: 22,
        quizCount: 3,
        skills: ['Tập Zone 2 Cardio', '5 chuyển động Functional', 'Kéo giãn cột sống', 'VO2 Max Training']
      },
      {
        levelNumber: 'Level 04',
        title: 'Nervous System Recovery & Longevity',
        subtitle: 'Điều hòa hệ thần kinh & Thích ứng stress',
        description: 'Kỹ thuật thở Box Breathing, Physiological Sigh, tiếp xúc nhiệt nóng/lạnh và phục hồi tinh thần bền bỉ.',
        status: 'locked',
        courseSlugs: ['khoa-hoc-the-luc-dinh-duong-phuc-hoi'],
        lessonCount: 18,
        quizCount: 2,
        skills: ['Physiological Sigh', 'Sauna & Cold exposure', 'HRV Monitoring', 'Thiền định tỉnh thức']
      }
    ]
  }
];
