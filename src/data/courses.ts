import { Course } from '../types';

export const COURSES: Course[] = [
  {
    id: 'course-zh-01',
    categoryId: 'tieng-trung',
    categoryName: 'TIẾNG TRUNG',
    topicSlug: 'hsk',
    title: 'TIẾNG TRUNG THỰC CHIẾN TỪ CON SỐ 0',
    slug: 'tieng-trung-thuc-chien-tu-con-so-0',
    description: 'Chinh phục bảng chữ cái Pinyin, 300 chữ Hán cốt lõi và khả năng phản xạ giao tiếp cơ bản chỉ trong 60 ngày.',
    level: 'Sơ cấp (HSK 1 - HSK 2)',
    duration: '45 giờ học · 32 bài giảng',
    lessonsCount: 32,
    image: '/src/assets/images/bensop_chinese_bw_1790320769606.jpg',
    firstLessonSlug: 'zh-pinyin-nguyen-am-phu-am',
    relatedArticleSlugs: ['100-tu-vung-tieng-trung-thuong-gap', 'giai-ma-4-thanh-dieu-tieng-trung'],
    relatedQuizId: 'quiz-zh-01',
    modules: [
      {
        title: 'Phần 1: Giải mã Bính âm (Pinyin) & Thanh điệu chuẩn',
        lessons: [
          { title: 'Hệ thống nguyên âm & phụ âm Pinyin cơ bản', slug: 'zh-pinyin-nguyen-am-phu-am', duration: '18 phút' },
          { title: 'Quy tắc biến điệu thanh 3 & thanh nhẹ trong khẩu ngữ', slug: 'zh-bien-dieu-thanh-3', duration: '15 phút' },
          { title: 'Phương pháp gõ chữ Hán chuẩn xác trên thiết bị số', slug: 'zh-go-chu-han-chuan', duration: '12 phút' }
        ]
      },
      {
        title: 'Phần 2: 214 Bộ thủ & Kỹ thuật Chiết tự chữ Hán',
        lessons: [
          { title: '50 bộ thủ xuất hiện trong 80% từ vựng thông dụng', slug: 'zh-50-bo-thu-cot-loi', duration: '22 phút' },
          { title: 'Quy tắc bút thuận viết chữ đẹp cân đối và dễ nhớ', slug: 'zh-quy-tac-but-thuan', duration: '16 phút' },
          { title: 'Giải mã cấu trúc hình thanh của chữ Hán hiện đại', slug: 'zh-cau-truc-hinh-thanh', duration: '20 phút' }
        ]
      },
      {
        title: 'Phần 3: Giao tiếp sinh hoạt & Công việc hàng ngày',
        lessons: [
          { title: 'Chào hỏi, giới thiệu bản thân & chức danh công sở', slug: 'zh-chao-hoi-gioi-thieu', duration: '25 phút' },
          { title: 'Hỏi giá, đặt hàng thương mại & thương lượng đơn giản', slug: 'zh-hoi-gia-dat-hang', duration: '24 phút' },
          { title: 'Di chuyển, định vị bản đồ & gọi món ăn Trung Hoa', slug: 'zh-di-chuyen-goi-mon', duration: '20 phút' }
        ]
      }
    ]
  },
  {
    id: 'course-en-01',
    categoryId: 'tieng-anh',
    categoryName: 'TIẾNG ANH',
    topicSlug: 'speaking',
    title: 'CONNECTED SPEECH & THỰC HÀNH SPEAKING TỰ NHIÊN',
    slug: 'connected-speech-speaking-tu-nhien',
    description: 'Bí mật làm chủ ngữ điệu, nối âm, nuốt âm và trọng âm câu giúp bạn nói tiếng Anh lưu loát, tự tin và tự nhiên.',
    level: 'Trung cấp (B1 - B2)',
    duration: '38 giờ học · 28 bài giảng',
    lessonsCount: 28,
    image: '/src/assets/images/bensop_english_bw_1790320781718.jpg',
    firstLessonSlug: 'en-linking-consonant-to-vowel',
    relatedArticleSlugs: ['100-phrasal-verbs-ban-nen-biet', '50-cum-tu-tieng-anh-cong-viec'],
    relatedQuizId: 'quiz-en-01',
    modules: [
      {
        title: 'Phần 1: Nhận diện và thực hành Nối âm (Linking)',
        lessons: [
          { title: 'Nối phụ âm sang nguyên âm (Consonant to Vowel Linking)', slug: 'en-linking-consonant-to-vowel', duration: '20 phút' },
          { title: 'Nguyên âm sang nguyên âm với âm lướt /w/ & /j/', slug: 'en-vowel-to-vowel-glide', duration: '18 phút' },
          { title: 'Hiện tượng đồng hóa âm (Assimilation) trong giao tiếp', slug: 'en-assimilation-in-context', duration: '22 phút' }
        ]
      },
      {
        title: 'Phần 2: Nuốt âm & Âm Schwa - Linh hồn tiếng Anh',
        lessons: [
          { title: 'Quy tắc âm Schwa /ə/ trong từ không nhấn trọng âm', slug: 'en-schwa-sound-rules', duration: '19 phút' },
          { title: 'Nuốt âm /t/ và /d/ trong văn nói tốc độ cao', slug: 'en-elision-t-d', duration: '17 phút' },
          { title: 'Rút gọn trợ động từ và giới từ (Weak Forms)', slug: 'en-weak-forms-grammar', duration: '21 phút' }
        ]
      },
      {
        title: 'Phần 3: Shadowing Technique nâng cao',
        lessons: [
          { title: 'Luyện ngữ điệu cảm xúc với TED Talks ngắn', slug: 'en-shadowing-ted-talks', duration: '25 phút' },
          { title: 'Mô phỏng phỏng vấn xin việc bằng tiếng Anh tự nhiên', slug: 'en-interview-simulation', duration: '30 phút' },
          { title: 'Tư duy phản xạ trực tiếp không dịch nhẩm tiếng Việt', slug: 'en-direct-english-thinking', duration: '26 phút' }
        ]
      }
    ]
  },
  {
    id: 'course-growth-01',
    categoryId: 'phat-trien-ban-than',
    categoryName: 'PHÁT TRIỂN BẢN THÂN',
    topicSlug: 'discipline',
    title: 'HỆ THỐNG KỶ LUẬT TỰ THÂN & HIỆU SUẤT ĐỈNH CAO',
    slug: 'ky-luat-tu-than-hieu-suat-dinh-cao',
    description: 'Xây dựng hệ thống vận hành cá nhân để duy trì thói quen tốt bền bỉ, làm việc sâu (Deep Work) và đạt mục tiêu dài hạn.',
    level: 'Mọi cấp độ',
    duration: '24 giờ học · 20 bài giảng',
    lessonsCount: 20,
    image: '/src/assets/images/bensop_growth_bw_1790320796588.jpg',
    firstLessonSlug: 'gr-vong-lap-thoi-quen-cue-reward',
    relatedArticleSlugs: ['ky-luat-khong-phai-lam-nhieu-hon', 'deep-work-la-gi-cach-thuc-hien'],
    relatedQuizId: 'quiz-growth-01',
    modules: [
      {
        title: 'Phần 1: Tâm lý học hành vi & Ma sát môi trường',
        lessons: [
          { title: 'Vòng lặp thói quen Cue - Craving - Response - Reward', slug: 'gr-vong-lap-thoi-quen-cue-reward', duration: '24 phút' },
          { title: 'Thiết kế không gian loại bỏ 90% xao nhãng ngoại cảnh', slug: 'gr-thiet-ke-khong-gian-deep-work', duration: '18 phút' },
          { title: 'Khoa học về Dopamine và chứng nghiện kích thích ngắn', slug: 'gr-khoa-hoc-dopamine-reset', duration: '22 phút' }
        ]
      },
      {
        title: 'Phần 2: Phương pháp Deep Work 90 phút',
        lessons: [
          { title: 'Chiến lược Time Blocking hiệu quả trên lịch số', slug: 'gr-time-blocking-hieu-qua', duration: '20 phút' },
          { title: 'Bảo vệ năng lượng buổi sáng: 3 tiếng vàng tạo đột phá', slug: 'gr-3-tieng-vang-buoi-sang', duration: '19 phút' },
          { title: 'Cách khắc phục tình trạng trì hoãn mãn tính', slug: 'gr-khac-phuc-tri-hoan', duration: '25 phút' }
        ]
      }
    ]
  },
  {
    id: 'course-health-01',
    categoryId: 'suc-khoe-doi-song',
    categoryName: 'SỨC KHỎE & ĐỜI SỐNG',
    topicSlug: 'fitness',
    title: 'KHOA HỌC THỂ LỰC, DINH DƯỠNG & PHỤC HỒI TOÀN DIỆN',
    slug: 'khoa-hoc-the-luc-dinh-duong-phuc-hoi',
    description: 'Xây dựng chế độ dinh dưỡng lành mạnh, bài tập vận động kháng lực tại nhà và nghi thức phục hồi hệ thần kinh.',
    level: 'Mọi cấp độ',
    duration: '30 giờ học · 24 bài giảng',
    lessonsCount: 24,
    image: '/src/assets/images/bensop_health_bw_1790320807310.jpg',
    firstLessonSlug: 'hl-tinh-toan-tdee-macro',
    relatedArticleSlugs: ['dong-bo-nhip-sinh-hoc-giac-ngu-sau', 'van-dong-hang-ngay-co-y-nghia-gi'],
    relatedQuizId: 'quiz-health-01',
    modules: [
      {
        title: 'Phần 1: Dinh dưỡng dựa trên bằng chứng khoa học',
        lessons: [
          { title: 'Tính toán TDEE và nhu cầu đa lượng Protein - Carb - Fat', slug: 'hl-tinh-toan-tdee-macro', duration: '22 phút' },
          { title: 'Ăn gì để duy trì đường huyết ổn định suốt ngày dài', slug: 'hl-duong-huyet-on-dinh', duration: '18 phút' },
          { title: 'Sự thật về thực phẩm bổ sung: Cái gì thực sự cần thiết?', slug: 'hl-thuc-pham-bo-sung-khoa-hoc', duration: '21 phút' }
        ]
      },
      {
        title: 'Phần 2: Vận động chức năng & Kháng lực',
        lessons: [
          { title: '5 chuyển động cơ bản của con người: Squat, Hinge, Push, Pull, Carry', slug: 'hl-5-chuyen-dong-co-ban', duration: '25 phút' },
          { title: 'Lịch tập 30 phút mỗi ngày tối ưu hóa thời gian', slug: 'hl-lich-tap-30-phut', duration: '20 phút' },
          { title: 'Kéo giãn cơ gân kheo và cột sống giảm đau lưng dân văn phòng', slug: 'hl-giam-dau-lung-van-phong', duration: '19 phút' }
        ]
      }
    ]
  }
];
