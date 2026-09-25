import { Article } from '../types';

export const ARTICLES: Article[] = [
  // --- TIẾNG ANH ---
  {
    id: 'art-en-01',
    categoryId: 'tieng-anh',
    categoryName: 'TIẾNG ANH',
    topicSlug: 'vocabulary',
    title: '100 PHRASAL VERBS BẠN NÊN BIẾT ĐỂ NÓI NHƯ NGƯỜI BẢN XỨ',
    subtitle: 'Nắm vững tư duy logic tiểu từ (Particle Logic) thay vì học vẹt máy móc',
    slug: '100-phrasal-verbs-ban-nen-biet',
    excerpt: 'Một hướng dẫn thực tế giúp bạn thoát khỏi cách dịch từng chữ (word-by-word) và sử dụng phrasal verbs tự nhiên trong công việc lẫn đời sống hàng ngày.',
    readingTime: '8 phút đọc',
    publishedAt: '24 Tháng 09, 2026',
    image: '/src/assets/images/bensop_english_bw_1790320781718.jpg',
    level: 'Intermediate',
    difficulty: 'Trung cấp',
    author: {
      name: 'Ben Nguyễn',
      role: 'Chuyên gia Ngôn ngữ học ứng dụng'
    },
    keyTakeaways: [
      'Hiểu rõ tính logic của các tiểu từ (prepositions/particles) như UP, DOWN, OFF, OUT thay vì cố học thuộc lòng máy móc.',
      'Sử dụng các cụm từ đa dụng như "figure out", "back out", "bring up", "call off" trong ngữ cảnh thực tế.',
      'Phương pháp Shadowing 15 phút mỗi ngày với phrasal verbs để biến thụ động thành chủ động.'
    ],
    vocabularyBox: [
      { word: 'Figure out', phonetic: '/ˈfɪɡ.jər aʊt/', meaning: 'Tìm ra giải pháp, hiểu ra vấn đề', example: 'We will figure out the issue soon.' },
      { word: 'Call off', phonetic: '/kɔːl ɒf/', meaning: 'Hủy bỏ sự kiện đã lên lịch', example: 'They called off the outdoor demo.' },
      { word: 'Back out', phonetic: '/bæk aʊt/', meaning: 'Rút lui khỏi thỏa thuận', example: 'Never back out of your core values.' }
    ],
    grammarBox: [
      {
        title: 'Vị trí của Tân ngữ (Object Placement) trong Phrasal Verbs',
        formula: 'Động từ + Đại từ (it/them) + Tiểu từ HOẶC Động từ + Tiểu từ + Danh từ',
        explanation: 'Nếu tân ngữ là đại từ (it, them, him), bắt buộc phải đứng giữa: "Pick it up" (đúng), KHÔNG nói "Pick up it" (sai).'
      }
    ],
    content: [
      'Hầu hết người học tiếng Anh tại Việt Nam dành nhiều năm ghi nhớ hàng nghìn từ vựng học thuật, nhưng khi bước vào một cuộc trò chuyện tự nhiên với đồng nghiệp quốc tế, họ lại cảm thấy lúng túng. Lý do lớn nhất: người bản ngữ ưa chuộng Phrasal Verbs (cụm động từ) trong hơn 70% các tương tác thường nhật.',
      'Thay vì nói "I am going to investigate the situation", họ sẽ nói "I will look into it". Thay vì nói "The event was cancelled", họ sẽ nói "They called it off". Sự khác biệt tuy nhỏ nhưng quyết định tính mượt mà và tự nhiên của lời nói.',
      'Bí quyết cốt lõi để làm chủ phrasal verbs không phải là danh sách hàng trăm từ xếp theo thứ tự A-Z. Hãy nhóm chúng theo hạt nhân tiểu từ (Particle Logic). Ví dụ, UP thường mang nghĩa "hoàn tất" (finish up, eat up, clean up) hoặc "tăng lên" (turn up, speak up). Khi nắm được quy luật này, bộ não sẽ tự động kết nối ý nghĩa nhanh gấp 3 lần.',
      'Hãy bắt đầu với 5 cụm động từ mỗi ngày, đặt trong 3 câu văn cụ thể gắn liền với công việc của bạn. Đọc to thành tiếng và ghi âm lại để kiểm tra ngữ điệu.'
    ],
    relatedLessonSlug: 'en-linking-consonant-to-vowel',
    relatedCourseSlug: 'connected-speech-speaking-tu-nhien',
    relatedQuizId: 'quiz-en-01',
    relatedArticleSlugs: ['50-cum-tu-tieng-anh-cong-viec', 'present-perfect-khi-nao-su-dung']
  },
  {
    id: 'art-en-02',
    categoryId: 'tieng-anh',
    categoryName: 'TIẾNG ANH',
    topicSlug: 'vocabulary',
    title: '50 CỤM TỪ TIẾNG ANH DÙNG TRONG CÔNG VIỆC VÀ ĐÀM PHÁN',
    subtitle: 'Nâng tầm cách giao tiếp chuyên nghiệp với đối tác toàn cầu',
    slug: '50-cum-tu-tieng-anh-cong-viec',
    excerpt: 'Tổng hợp 50 mẫu câu và cụm từ công sở thông dụng giúp bạn viết email ngắn gọn, trình bày quan điểm sắc bén trong cuộc họp và thương lượng tự tin.',
    readingTime: '7 phút đọc',
    publishedAt: '21 Tháng 09, 2026',
    image: '/src/assets/images/bensop_english_bw_1790320781718.jpg',
    level: 'Intermediate',
    difficulty: 'Trung cấp',
    author: {
      name: 'Ben Nguyễn',
      role: 'Chuyên gia Ngôn ngữ học ứng dụng'
    },
    keyTakeaways: [
      'Thay thế các từ ngữ thô mộc bằng ngôn từ đàm phán ngoại giao (Diplomatic Language).',
      'Cấu trúc đưa ra phản hồi mang tính xây dựng mà không gây đối đầu.',
      'Mẫu câu xác nhận tiến độ (Checking in) lịch thiệp và hiệu quả.'
    ],
    vocabularyBox: [
      { word: 'On the same page', phonetic: '/ɒn ðə seɪm peɪdʒ/', meaning: 'Cùng chung nhận thức, thống nhất quan điểm', example: 'Let’s align to make sure we are on the same page.' },
      { word: 'Touch base', phonetic: '/tʌtʃ beɪs/', meaning: 'Liên lạc nhanh để cập nhật tình hình', example: 'I will touch base with you after the client call.' },
      { word: 'Bandwidth', phonetic: '/ˈbænd.wɪtθ/', meaning: 'Quỹ thời gian / năng lượng sẵn có', example: 'Do you have the bandwidth to review this proposal?' }
    ],
    content: [
      'Giao tiếp nơi làm việc quốc tế không đòi hỏi bạn phải dùng những từ ngữ hoa mỹ hay phức tạp. Ngược lại, những nhà lãnh đạo xuất sắc nhất luôn đánh giá cao sự rõ ràng (Clarity) và tính xây dựng (Constructiveness).',
      'Khi muốn phản biện một ý kiến, thay vì nói "That will never work" (điều đó không khả thi), người chuyên nghiệp sẽ nói: "That is an intriguing angle, but what if we also factor in budget constraints?".',
      'Hãy ghi nhớ 3 nguyên tắc: Rõ ràng về mục tiêu, ngắn gọn về câu từ, và luôn kết thúc email bằng một lời kêu gọi hành động cụ thể (Call to Action).'
    ],
    relatedLessonSlug: 'en-linking-consonant-to-vowel',
    relatedCourseSlug: 'connected-speech-speaking-tu-nhien',
    relatedQuizId: 'quiz-en-01',
    relatedArticleSlugs: ['100-phrasal-verbs-ban-nen-biet', '30-cau-giao-tiep-tieng-anh-hang-ngay']
  },
  {
    id: 'art-en-03',
    categoryId: 'tieng-anh',
    categoryName: 'TIẾNG ANH',
    topicSlug: 'grammar',
    title: 'PRESENT PERFECT: KHI NÀO NÊN SỬ DỤNG VÀ LỖI SAI KINH ĐIỂN',
    subtitle: 'Giải mã sự khác biệt cốt lõi giữa Hiện tại hoàn thành và Quá khứ đơn',
    slug: 'present-perfect-khi-nao-su-dung',
    excerpt: 'Hiểu đúng bản chất của thì hiện tại hoàn thành qua lăng kính tư duy: kết nối một hành động quá khứ với hệ quả ở thời điểm hiện tại.',
    readingTime: '6 phút đọc',
    publishedAt: '18 Tháng 09, 2026',
    image: '/src/assets/images/bensop_english_bw_1790320781718.jpg',
    level: 'Beginner',
    difficulty: 'Cơ bản',
    author: {
      name: 'Ben Nguyễn',
      role: 'Chuyên gia Ngôn ngữ học ứng dụng'
    },
    keyTakeaways: [
      'Quá khứ đơn (Past Simple) cắt đứt liên hệ với hiện tại; Hiện tại hoàn thành (Present Perfect) kéo quá khứ chạm vào hiện tại.',
      'Không dùng Present Perfect khi có mốc thời gian cụ thể đã kết thúc (yesterday, last year, in 2020).',
      'Ứng dụng thì hoàn thành khi báo cáo kết quả và kinh nghiệm sống (Life experience).'
    ],
    content: [
      'Người Việt Nam thường gặp khó khăn với Present Perfect bởi vì ngữ pháp tiếng Việt không có sự biến đổi hình thái động từ theo thời gian. Chúng ta thường dùng từ "đã" cho cả hai trường hợp.',
      'Sự khác biệt thực sự là gì? Nếu bạn nói "I lost my keys", bạn đang kể một sự kiện trong quá khứ (có thể bây giờ bạn đã tìm lại được rồi). Nhưng nếu bạn nói "I have lost my keys", hệ quả trực tiếp ở hiện tại là: ngay lúc này bạn vẫn đang đứng ngoài cửa và không vào nhà được.',
      'Hãy nhớ công thức tư duy: Quá khứ đơn = Điểm thời gian cố định. Hiện tại hoàn thành = Cây cầu nối quá khứ tới hiện tại.'
    ],
    relatedLessonSlug: 'en-vowel-to-vowel-glide',
    relatedCourseSlug: 'connected-speech-speaking-tu-nhien',
    relatedQuizId: 'quiz-en-01',
    relatedArticleSlugs: ['100-phrasal-verbs-ban-nen-biet']
  },
  {
    id: 'art-en-04',
    categoryId: 'tieng-anh',
    categoryName: 'TIẾNG ANH',
    topicSlug: 'speaking',
    title: '30 CÂU GIAO TIẾP TIẾNG ANH HÀNG NGÀY CHO NGƯỜI BẬN RỘN',
    subtitle: 'Những câu nói cửa miệng tự nhiên nhất của người bản xứ',
    slug: '30-cau-giao-tiep-tieng-anh-hang-ngay',
    excerpt: 'Tập hợp các mẫu câu ngắn gọn, ứng dụng ngay khi đi cà phê, mua sắm, chào hỏi và kết nối bạn bè quốc tế.',
    readingTime: '5 phút đọc',
    publishedAt: '14 Tháng 09, 2026',
    image: '/src/assets/images/bensop_english_bw_1790320781718.jpg',
    level: 'All Levels',
    difficulty: 'Cơ bản',
    author: {
      name: 'Ben Nguyễn',
      role: 'Chuyên gia Ngôn ngữ học ứng dụng'
    },
    content: [
      'Giao tiếp đời thực khác xa sách giáo khoa. Thay vì hỏi "How are you? I am fine, thank you", người bản ngữ thường nói: "How is it going?", "What have you been up to?", hay "Can’t complain!".',
      'Hãy luyện tập phát âm cả cụm câu thay vì từng từ đơn lẻ. Điều này kích hoạt vùng phản xạ ngôn ngữ ở não bộ, giúp bạn nói mà không cần phải nhẩm dịch trong đầu.'
    ],
    relatedLessonSlug: 'en-linking-consonant-to-vowel',
    relatedCourseSlug: 'connected-speech-speaking-tu-nhien',
    relatedArticleSlugs: ['50-cum-tu-tieng-anh-cong-viec']
  },

  // --- TIẾNG TRUNG ---
  {
    id: 'art-zh-01',
    categoryId: 'tieng-trung',
    categoryName: 'TIẾNG TRUNG',
    topicSlug: 'vocabulary',
    title: '100 TỪ VỰNG TIẾNG TRUNG THƯỜNG GẶP TRONG GIAO TIẾP VÀ CÔNG VIỆC',
    subtitle: 'Nắm vững 900 chữ Hán cốt lõi chiếm 90% các tương tác thực tế',
    slug: '100-tu-vung-tieng-trung-thuong-gap',
    excerpt: 'Hệ thống hóa các từ vựng mang tần suất xuất hiện cao nhất trong đời sống và môi trường làm việc cùng đối tác Trung Quốc, kèm ví dụ song ngữ chuẩn xác.',
    readingTime: '7 phút đọc',
    publishedAt: '20 Tháng 09, 2026',
    image: '/src/assets/images/bensop_chinese_bw_1790320769606.jpg',
    level: 'Beginner',
    difficulty: 'Cơ bản',
    author: {
      name: 'Linh Đặng',
      role: 'Giảng viên Ngôn ngữ Hán & Phiên dịch cao cấp'
    },
    keyTakeaways: [
      'Phương pháp học từ vựng theo cặp tương phản và cụm từ liên kết ngữ cảnh thay vì từ đơn lẻ.',
      'Nắm vững 30 động từ then chốt chiếm 60% giao tiếp công sở hàng ngày.',
      'Quy tắc nhớ mặt chữ Hán qua các bộ thủ thông dụng nhất (Nhân, Thủy, Mộc, Tâm).'
    ],
    vocabularyBox: [
      { word: '沟通 (gōutōng)', phonetic: 'gōu tōng', meaning: 'Giao tiếp, trao đổi thông tin', example: '我们必须保持密切沟通。' },
      { word: '合作 (hézuò)', phonetic: 'hé zuò', meaning: 'Hợp tác cùng phát triển', example: '期待与您的进一步合作。' },
      { word: '解决 (jiějué)', phonetic: 'jiě jué', meaning: 'Giải quyết vấn đề', example: '方案已经成功解决了延迟问题。' }
    ],
    content: [
      'Chữ Hán là một hệ thống chữ tượng hình biểu ý, điều này khiến nhiều người học ban đầu cảm thấy choáng ngợp. Tuy nhiên, theo các thống kê ngôn ngữ học hiện đại, chỉ cần 900 chữ Hán thông dụng là bạn đã có thể đọc hiểu tới 90% các ấn phẩm tin tức và tài liệu văn phòng.',
      'Khi học một từ mới, đừng chỉ nhớ nghĩa tiếng Việt đơn thuần. Hãy gắn nó vào một cấu trúc câu mẫu thực tế. Ví dụ, với từ "沟通" (gōutōng - giao tiếp/trao đổi), hãy học cụm "保持沟通" (giữ liên lạc trao đổi) hay "沟通顺畅" (giao tiếp suôn sẻ).',
      'Đặc biệt lưu ý sự khác biệt giữa văn nói khẩu ngữ (口语) và văn bản thư tín thương mại (书面语) để ứng xử chuyên nghiệp trong công việc.'
    ],
    relatedLessonSlug: 'zh-pinyin-nguyen-am-phu-am',
    relatedCourseSlug: 'tieng-trung-thuc-chien-tu-con-so-0',
    relatedQuizId: 'quiz-zh-01',
    relatedArticleSlugs: ['giai-ma-4-thanh-dieu-tieng-trung', 'phan-biet-de-de-de-tieng-trung']
  },
  {
    id: 'art-zh-02',
    categoryId: 'tieng-trung',
    categoryName: 'TIẾNG TRUNG',
    topicSlug: 'grammar',
    title: 'PHÂN BIỆT 的, 得 VÀ 地 TRONG NGỮ PHÁP TIẾNG TRUNG',
    subtitle: 'Bí quyết không bao giờ nhầm lẫn 3 trợ từ kết cấu quan trọng nhất',
    slug: 'phan-biet-de-de-de-tieng-trung',
    excerpt: 'Một hướng dẫn súc tích và dễ nhớ nhất giúp bạn phân biệt chính xác chức năng ngữ pháp của 3 chữ "de" kinh điển.',
    readingTime: '6 phút đọc',
    publishedAt: '17 Tháng 09, 2026',
    image: '/src/assets/images/bensop_chinese_bw_1790320769606.jpg',
    level: 'Intermediate',
    difficulty: 'Trung cấp',
    author: {
      name: 'Linh Đặng',
      role: 'Giảng viên Ngôn ngữ Hán & Phiên dịch cao cấp'
    },
    keyTakeaways: [
      '的 đứng trước Danh từ: Định ngữ + 的 + Danh từ (Bạch bao đích).',
      '地 đứng trước Động từ: Trạng ngữ + 地 + Động từ (Thổ dã địa).',
      '得 đứng sau Động từ: Động từ + 得 + Bổ ngữ trạng thái (Xích thốn đắc).'
    ],
    grammarBox: [
      {
        title: '3 Công Thức Vàng Phân Biệt "de"',
        formula: '1. Tính từ + 的 + Danh từ | 2. Phó từ + 地 + Động từ | 3. Động từ + 得 + Mức độ/Kết quả',
        explanation: 'Ví dụ: 漂亮的花 (hoa đẹp) - 认真地学习 (chăm chỉ học) - 跑得很快 (chạy rất nhanh).'
      }
    ],
    content: [
      'Trong tiếng Trung hiện đại, cả 3 chữ 的, 得, 地 đều phát âm là "de" (thanh nhẹ). Nếu chỉ nghe thì không có sự khác biệt, nhưng khi viết văn bản hay làm bài thi HSK, việc dùng sai chữ sẽ bị trừ điểm ngay lập tức.',
      'Hãy nhớ thần chú: "Đích đứng trước Danh, Địa đứng trước Động, Đắc đứng sau Động".',
      'Khi muốn miêu tả mức độ của một hành động đã diễn ra (Bổ ngữ trạng thái), ta luôn dùng 得: "Anh ấy nói tiếng Trung rất lưu loát" -> "他说中文说得很流利".'
    ],
    relatedLessonSlug: 'zh-pinyin-nguyen-am-phu-am',
    relatedCourseSlug: 'tieng-trung-thuc-chien-tu-con-so-0',
    relatedQuizId: 'quiz-zh-01',
    relatedArticleSlugs: ['100-tu-vung-tieng-trung-thuong-gap', 'giai-ma-4-thanh-dieu-tieng-trung']
  },
  {
    id: 'art-zh-03',
    categoryId: 'tieng-trung',
    categoryName: 'TIẾNG TRUNG',
    topicSlug: 'pronunciation',
    title: 'GIẢI MÃ BÍ MẬT 4 THANH ĐIỆU TIẾNG TRUNG DÀNH CHO NGƯỜI VIỆT',
    subtitle: 'Tận dụng lợi thế ngữ âm tiếng Việt để phát âm chuẩn xác như phát thanh viên',
    slug: 'giai-ma-4-thanh-dieu-tieng-trung',
    excerpt: 'Lợi thế vượt trội của người Việt khi học tiếng Trung là hệ thống thanh điệu. Tận dụng sự tương đồng này để phát âm chuẩn xác như phát thanh viên đài CCTV.',
    readingTime: '5 phút đọc',
    publishedAt: '12 Tháng 09, 2026',
    image: '/src/assets/images/bensop_chinese_bw_1790320769606.jpg',
    level: 'Beginner',
    difficulty: 'Cơ bản',
    author: {
      name: 'Linh Đặng',
      role: 'Giảng viên Ngôn ngữ Hán & Phiên dịch cao cấp'
    },
    content: [
      'Tiếng Việt có 6 thanh điệu, trong khi tiếng Trung phổ thông chỉ có 4 thanh điệu chính và 1 khinh thanh. Đây là một lợi thế sinh học cực lớn của người Việt Nam so với người học phương Tây.',
      'Tuy nhiên, cái bẫy thường gặp là người Việt mang nguyên dấu tiếng Việt áp vào tiếng Trung. Thanh 1 (一声) cần giữ cao độ 5-5 ngân dài đều hơi, không được hạ xuống. Thanh 4 (四声) là thanh rơi từ cao độ 5 xuống 1 với tốc độ cực nhanh và dứt khoát, hoàn toàn không phải dấu huyền nhẹ nhàng của tiếng Việt.',
      'Hãy luyện tập thanh 4 bằng cách tưởng tượng bạn đang dậm mạnh chân hoặc nói một mệnh lệnh ngắn gọn: "Bán!", "Khán!", "Thính!". Khi cơ thể có lực, âm thanh sẽ tự động tròn và sắc nét.'
    ],
    relatedLessonSlug: 'zh-pinyin-nguyen-am-phu-am',
    relatedCourseSlug: 'tieng-trung-thuc-chien-tu-con-so-0',
    relatedQuizId: 'quiz-zh-01',
    relatedArticleSlugs: ['100-tu-vung-tieng-trung-thuong-gap']
  },
  {
    id: 'art-zh-04',
    categoryId: 'tieng-trung',
    categoryName: 'TIẾNG TRUNG',
    topicSlug: 'speaking',
    title: '50 CÂU GIAO TIẾP TIẾNG TRUNG THƯỜNG DÙNG TRONG ĐỜI SỐNG',
    subtitle: 'Mẫu câu ngắn gọn, chuẩn âm và tự nhiên trong sinh hoạt',
    slug: '50-cau-giao-tiep-tieng-trung-thuong-dung',
    excerpt: 'Tự tin nói tiếng Trung khi gọi đồ ăn, mua sắm trên Taobao/1688, hỏi đường và giao lưu với bạn bè quốc tế.',
    readingTime: '6 phút đọc',
    publishedAt: '08 Tháng 09, 2026',
    image: '/src/assets/images/bensop_chinese_bw_1790320769606.jpg',
    level: 'Beginner',
    difficulty: 'Cơ bản',
    author: {
      name: 'Linh Đặng',
      role: 'Giảng viên Ngôn ngữ Hán & Phiên dịch cao cấp'
    },
    content: [
      'Học ngoại ngữ bắt đầu từ việc nhại lại âm thanh chính xác. Đừng chờ đến khi thuộc hết ngữ pháp mới bắt đầu nói.',
      'Những câu nói thông dụng như "多少钱?" (Bao nhiêu tiền?), "可以便宜一点吗?" (Có thể bớt chút được không?), "帮我一下" (Giúp tôi một chút) sẽ lập tức mang lại cảm giác thành tựu khi sử dụng.'
    ],
    relatedLessonSlug: 'zh-pinyin-nguyen-am-phu-am',
    relatedCourseSlug: 'tieng-trung-thuc-chien-tu-con-so-0',
    relatedArticleSlugs: ['100-tu-vung-tieng-trung-thuong-gap']
  },

  // --- PHÁT TRIỂN BẢN THÂN ---
  {
    id: 'art-gr-01',
    categoryId: 'phat-trien-ban-than',
    categoryName: 'PHÁT TRIỂN BẢN THÂN',
    topicSlug: 'discipline',
    title: 'KỶ LUẬT KHÔNG PHẢI LÀ LÀM NHIỀU HƠN, MÀ LÀ BIẾT TỪ CHỐI NHIỀU HƠN',
    subtitle: 'Nghệ thuật thiết lập ranh giới bảo vệ sự tập trung tối thượng',
    slug: 'ky-luat-khong-phai-lam-nhieu-hon',
    excerpt: 'Khám phá sự thật về kỷ luật tự thân: không phải là gồng mình chịu đựng kiệt sức, mà là khả năng thiết lập ranh giới rõ ràng với những thứ không quan trọng.',
    readingTime: '6 phút đọc',
    publishedAt: '22 Tháng 09, 2026',
    image: '/src/assets/images/bensop_growth_bw_1790320796588.jpg',
    level: 'All Levels',
    difficulty: 'Trung cấp',
    author: {
      name: 'Minh Trần',
      role: 'Nhà nghiên cứu Hành vi & Hiệu suất'
    },
    keyTakeaways: [
      'Kỷ luật thực sự là nghệ thuật loại bỏ ma sát tâm lý và giảm thiểu số lượng quyết định cần đưa ra mỗi ngày.',
      'Ý chí (willpower) là một nguồn tài nguyên hữu hạn, đừng phụ thuộc vào nó để duy trì thói quen.',
      'Học cách nói "Không" một cách lịch thiệp nhưng dứt khoát với những lời mời làm phân tán mục tiêu cốt lõi.'
    ],
    content: [
      'Chúng ta thường hình dung người kỷ luật là người dậy từ 4 giờ sáng, tập gym điên cuồng, làm việc 14 tiếng và không bao giờ nghỉ ngơi. Nhưng trên thực tế, đó là con đường nhanh nhất dẫn đến kiệt quệ (burnout).',
      'Kỷ luật chân chính được xây dựng trên sự thấu suốt về thứ tự ưu tiên. Khi bạn biết điều gì là quan trọng nhất trong 90 ngày tới, bạn sẽ có dũng khí để từ chối 95% những yêu cầu ngoại cảnh kéo bạn ra khỏi trục chính.',
      'Thay vì cố gắng "tập trung hơn" bằng ý chí, hãy thay đổi môi trường vật lý. Đặt điện thoại ở một phòng khác khi làm việc sâu (Deep Work), dọn sạch bàn làm việc và chuẩn bị sẵn lịch trình từ đêm hôm trước.',
      'Kỷ luật tự do không giam cầm bạn. Ngược lại, chính kỷ luật bảo vệ thời gian của bạn để bạn có thể sống tự do, không âu lo và đạt được những thành tựu có ý nghĩa sâu sắc.'
    ],
    relatedLessonSlug: 'gr-vong-lap-thoi-quen-cue-reward',
    relatedCourseSlug: 'ky-luat-tu-than-hieu-suat-dinh-cao',
    relatedQuizId: 'quiz-growth-01',
    relatedArticleSlugs: ['xay-dung-thoi-quen-tu-nhung-viec-nho', 'deep-work-la-gi-cach-thuc-hien']
  },
  {
    id: 'art-gr-02',
    categoryId: 'phat-trien-ban-than',
    categoryName: 'PHÁT TRIỂN BẢN THÂN',
    topicSlug: 'habits',
    title: 'XÂY DỰNG THÓI QUEN TỪ NHỮNG VIỆC NHỎ: QUY TẮC 2 PHÚT',
    subtitle: 'Cách bộ não hình thành đường mòn thần kinh bền bỉ',
    slug: 'xay-dung-thoi-quen-tu-nhung-viec-nho',
    excerpt: 'Ứng dụng nguyên lý vi mô: một thói quen mới phải mất ít hơn 2 phút để thực hiện, giúp triệt tiêu hoàn toàn sức ì tâm lý trì hoãn.',
    readingTime: '5 phút đọc',
    publishedAt: '19 Tháng 09, 2026',
    image: '/src/assets/images/bensop_growth_bw_1790320796588.jpg',
    level: 'Beginner',
    difficulty: 'Cơ bản',
    author: {
      name: 'Minh Trần',
      role: 'Nhà nghiên cứu Hành vi & Hiệu suất'
    },
    keyTakeaways: [
      'Đừng đặt mục tiêu quá tham vọng ngay từ ngày đầu tiên.',
      'Quy tắc 2 phút giúp bạn xuất hiện (Show up) mỗi ngày.',
      'Sự đều đặn quan trọng hơn cường độ trong 30 ngày đầu.'
    ],
    content: [
      'Sai lầm phổ biến nhất khi bắt đầu một mục tiêu mới là quá hào hứng và đặt ra tiêu chuẩn quá cao: "Tôi sẽ đọc sách 1 tiếng mỗi ngày", "Tôi sẽ chạy bộ 5km mỗi sáng". Sau 3 ngày, năng lượng cạn kiệt và bạn bỏ cuộc.',
      'Quy tắc 2 phút dạy rằng: Hãy biến thói quen thành một cổng vào (Gateway habit). Thay vì "Đọc sách 1 tiếng", hãy là "Mở sách đọc 1 trang". Thay vì "Tập yoga 30 phút", hãy là "Trải thảm yoga ra sàn". Khi hành vi đã được khởi động, quán tính sẽ đưa bạn đi tiếp.'
    ],
    relatedLessonSlug: 'gr-vong-lap-thoi-quen-cue-reward',
    relatedCourseSlug: 'ky-luat-tu-than-hieu-suat-dinh-cao',
    relatedQuizId: 'quiz-growth-01',
    relatedArticleSlugs: ['ky-luat-khong-phai-lam-nhieu-hon', '5-cach-quan-ly-thoi-gian-thuc-te']
  },
  {
    id: 'art-gr-03',
    categoryId: 'phat-trien-ban-than',
    categoryName: 'PHÁT TRIỂN BẢN THÂN',
    topicSlug: 'productivity',
    title: 'DEEP WORK LÀ GÌ? PHƯƠNG PHÁP LÀM VIỆC SÂU TRONG THỜI ĐẠI PHÂN TÂM',
    subtitle: 'Vũ khí siêu cấp của những người tạo ra giá trị đột phá',
    slug: 'deep-work-la-gi-cach-thuc-hien',
    excerpt: 'Khám phá triết lý của Cal Newport: Khả năng tập trung không xao nhãng trong 90 phút mang lại kết quả vượt xa 8 tiếng làm việc đa nhiệm hời hợt.',
    readingTime: '8 phút đọc',
    publishedAt: '16 Tháng 09, 2026',
    image: '/src/assets/images/bensop_growth_bw_1790320796588.jpg',
    level: 'Intermediate',
    difficulty: 'Trung cấp',
    author: {
      name: 'Minh Trần',
      role: 'Nhà nghiên cứu Hành vi & Hiệu suất'
    },
    content: [
      'Trong nền kinh tế tri thức hiện đại, có hai năng lực quyết định sự thành bại: Khả năng nhanh chóng làm chủ những kiến thức phức tạp, và Khả năng sản xuất ra những thành quả ở trình độ ưu tú cả về tốc độ lẫn chất lượng. Cả hai năng lực này đều phụ thuộc vào Deep Work.',
      'Khi bạn chuyển đổi sự chú ý liên tục giữa email, chat Slack và công việc chuyên môn, não bộ chịu hiện tượng thặng dư chú ý (Attention Residue). Một phần năng lực xử lý vẫn bị kẹt ở công việc trước, khiến trí thông minh bị suy giảm tạm thời.',
      'Hãy bảo vệ tối thiểu 1 khối thời gian 90 phút mỗi ngày: ngắt toàn bộ wifi, đặt điện thoại sang phòng khác và chỉ giải quyết duy nhất một bài toán cốt lõi.'
    ],
    relatedLessonSlug: 'gr-vong-lap-thoi-quen-cue-reward',
    relatedCourseSlug: 'ky-luat-tu-than-hieu-suat-dinh-cao',
    relatedQuizId: 'quiz-growth-01',
    relatedArticleSlugs: ['ky-luat-khong-phai-lam-nhieu-hon', '5-cach-quan-ly-thoi-gian-thuc-te']
  },
  {
    id: 'art-gr-04',
    categoryId: 'phat-trien-ban-than',
    categoryName: 'PHÁT TRIỂN BẢN THÂN',
    topicSlug: 'productivity',
    title: '5 CÁCH QUẢN LÝ THỜI GIAN THỰC TẾ CHO NGƯỜI ĐA NHIỆM',
    subtitle: 'Chuyển dịch từ quản lý thời gian sang quản trị năng lượng sinh học',
    slug: '5-cach-quan-ly-thoi-gian-thuc-te',
    excerpt: 'Hệ thống hóa ma trận Eisenhower, phương pháp Time-blocking và cách sắp xếp công việc theo nhịp sinh học năng lượng cơ thể.',
    readingTime: '6 phút đọc',
    publishedAt: '11 Tháng 09, 2026',
    image: '/src/assets/images/bensop_growth_bw_1790320796588.jpg',
    level: 'All Levels',
    difficulty: 'Cơ bản',
    author: {
      name: 'Minh Trần',
      role: 'Nhà nghiên cứu Hành vi & Hiệu suất'
    },
    content: [
      'Thời gian là đại lượng cố định: ai cũng có 24 giờ như nhau. Thứ khác biệt giữa người thành tựu và người bận rộn hỗn loạn chính là Năng lượng.',
      'Dành năng lượng đỉnh cao buổi sáng cho công việc chiến lược, và dồn các công việc hành chính ít tốn tư duy (trả lời email, họp định kỳ) vào buổi chiều.'
    ],
    relatedLessonSlug: 'gr-vong-lap-thoi-quen-cue-reward',
    relatedCourseSlug: 'ky-luat-tu-than-hieu-suat-dinh-cao',
    relatedArticleSlugs: ['deep-work-la-gi-cach-thuc-hien']
  },

  // --- SỨC KHỎE & ĐỜI SỐNG ---
  {
    id: 'art-hl-01',
    categoryId: 'suc-khoe-doi-song',
    categoryName: 'SỨC KHỎE & ĐỜI SỐNG',
    topicSlug: 'sleep',
    title: 'ĐỒNG BỘ NHỊP SINH HỌC: CHÌA KHÓA CHO GIẤC NGỦ SÂU VÀ NĂNG LƯỢNG TRÀN ĐẦY',
    subtitle: 'Khoa học về ánh sáng, nhiệt độ cơ thể và hormone cortisol/melatonin',
    slug: 'dong-bo-nhip-sinh-hoc-giac-ngu-sau',
    excerpt: 'Khoa học về ánh sáng, nhiệt độ cơ thể và hormone cortisol/melatonin giúp bạn thức dậy sảng khoái mà không cần đến 3 ly cà phê mỗi sáng.',
    readingTime: '9 phút đọc',
    publishedAt: '18 Tháng 09, 2026',
    image: '/src/assets/images/bensop_health_bw_1790320807310.jpg',
    level: 'All Levels',
    difficulty: 'Trung cấp',
    author: {
      name: 'BS. Tuấn Phạm',
      role: 'Bác sĩ Y học Thể thao & Giấc ngủ'
    },
    keyTakeaways: [
      'Tiếp xúc với ánh sáng mặt trời tự nhiên trong 30 phút đầu sau khi thức dậy để kích hoạt chu kỳ năng lượng.',
      'Quy tắc 10-3-2-1-0 cho một giấc ngủ sâu phục hồi tối ưu.',
      'Tại sao việc đi ngủ và thức dậy cố định quan trọng hơn số giờ ngủ chênh lệch cuối tuần.'
    ],
    content: [
      'Mỗi tế bào trong cơ thể người đều sở hữu một chiếc đồng hồ phân tử được điều khiển bởi nhân trên chéo (Suprachiasmatic Nucleus - SCN) ở não bộ. Đồng hồ này phụ thuộc vào hai yếu tố chính: ánh sáng và thức ăn.',
      'Khi chúng ta nhìn vào màn hình điện thoại vào lúc 11 giờ đêm với ánh sáng xanh cường độ cao, não bộ bị đánh lừa rằng đây là buổi trưa. Quá trình tiết hormone melatonin bị ức chế tới 85%, khiến giai đoạn ngủ sóng chậm (Deep Sleep) bị rút ngắn nghiêm trọng.',
      'Hãy áp dụng quy tắc 10-3-2-1-0: 10 tiếng trước ngủ không caffeine, 3 tiếng trước ngủ không ăn no, 2 tiếng trước ngủ ngừng làm việc nặng, 1 tiếng trước ngủ tắt màn hình, và 0 lần bấm nút hoãn báo thức vào sáng hôm sau.',
      'Lưu ý: Mọi điều chỉnh lối sống cần thực hiện từng bước nhỏ để cơ thể thích nghi bền vững.'
    ],
    relatedLessonSlug: 'hl-tinh-toan-tdee-macro',
    relatedCourseSlug: 'khoa-hoc-the-luc-dinh-duong-phuc-hoi',
    relatedArticleSlugs: ['nhung-nguyen-tac-co-ban-de-ngu-tot-hon', 'van-dong-hang-ngay-co-y-nghia-gi']
  },
  {
    id: 'art-hl-02',
    categoryId: 'suc-khoe-doi-song',
    categoryName: 'SỨC KHỎE & ĐỜI SỐNG',
    topicSlug: 'sleep',
    title: 'NHỮNG NGUYÊN TẮC CƠ BẢN ĐỂ NGỦ TỐT HƠN VÀ THỨC DẬY TỈNH TÁO',
    subtitle: 'Nhiệt độ phòng ngủ, bóng tối tuyệt đối và nhịp thở phục hồi',
    slug: 'nhung-nguyen-tac-co-ban-de-ngu-tot-hon',
    excerpt: 'Thiết lập không gian phòng ngủ chuẩn khoa học: tại sao hạ nhiệt độ phòng xuống 18-20 độ C giúp bạn chìm vào giấc ngủ nhanh hơn 40%.',
    readingTime: '6 phút đọc',
    publishedAt: '15 Tháng 09, 2026',
    image: '/src/assets/images/bensop_health_bw_1790320807310.jpg',
    level: 'Beginner',
    difficulty: 'Cơ bản',
    author: {
      name: 'BS. Tuấn Phạm',
      role: 'Bác sĩ Y học Thể thao & Giấc ngủ'
    },
    content: [
      'Để bắt đầu quá trình ngủ, nhiệt độ lõi cơ thể cần giảm khoảng 1 độ C. Nếu phòng ngủ quá ấm hoặc bí khí, cơ thể sẽ liên tục trăn trở để tản nhiệt.',
      'Sử dụng rèm chắn sáng 100% hoặc bịt mắt ngủ để kích hoạt tối đa tuyến tùng tiết melatonin. Ngủ trong bóng tối tuyệt đối giúp tăng cường hệ miễn dịch và hỗ trợ thải độc não bộ qua hệ thống Glymphatic.'
    ],
    relatedLessonSlug: 'hl-tinh-toan-tdee-macro',
    relatedCourseSlug: 'khoa-hoc-the-luc-dinh-duong-phuc-hoi',
    relatedArticleSlugs: ['dong-bo-nhip-sinh-hoc-giac-ngu-sau', 'xay-dung-mot-loi-song-can-bang']
  },
  {
    id: 'art-hl-03',
    categoryId: 'suc-khoe-doi-song',
    categoryName: 'SỨC KHỎE & ĐỜI SỐNG',
    topicSlug: 'fitness',
    title: 'VẬN ĐỘNG HÀNG NGÀY CÓ Ý NGHĨA GÌ VỚI TUỔI THỌ VÀ NÃO BỘ?',
    subtitle: 'Khoa học về phân tử myokine và kích hoạt tế bào thần kinh mới',
    slug: 'van-dong-hang-ngay-co-y-nghia-gi',
    excerpt: 'Tập luyện thể thao không chỉ vì vóc dáng. Mỗi khi cơ bắp co bóp, nó giải phóng hàng trăm phân tử sinh học bảo vệ mạch máu và kích thích phát triển trí nhớ (BDNF).',
    readingTime: '7 phút đọc',
    publishedAt: '10 Tháng 09, 2026',
    image: '/src/assets/images/bensop_health_bw_1790320807310.jpg',
    level: 'All Levels',
    difficulty: 'Cơ bản',
    author: {
      name: 'BS. Tuấn Phạm',
      role: 'Bác sĩ Y học Thể thao & Giấc ngủ'
    },
    content: [
      'Tiến hóa đã thiết kế cơ thể con người để liên tục vận động. Ngồi một chỗ hơn 8 tiếng mỗi ngày làm chậm quá trình trao đổi chất và làm teo vùng hải mã (Hippocampus) ở não bộ.',
      'Chỉ cần 150 phút tập luyện tim mạch cường độ vừa phải mỗi tuần kết hợp với 2 buổi tập kháng lực là đủ để giảm 30% nguy cơ tử vong sớm do mọi nguyên nhân.'
    ],
    relatedLessonSlug: 'hl-tinh-toan-tdee-macro',
    relatedCourseSlug: 'khoa-hoc-the-luc-dinh-duong-phuc-hoi',
    relatedArticleSlugs: ['dong-bo-nhip-sinh-hoc-giac-ngu-sau', 'xay-dung-mot-loi-song-can-bang']
  },
  {
    id: 'art-hl-04',
    categoryId: 'suc-khoe-doi-song',
    categoryName: 'SỨC KHỎE & ĐỜI SỐNG',
    topicSlug: 'lifestyle',
    title: 'XÂY DỰNG MỘT LỐI SỐNG CÂN BẰNG GIỮA ÁP LỰC HIỆN ĐẠI',
    subtitle: 'Nghệ thuật làm chậm lại giữa nhịp sống công nghiệp hối hả',
    slug: 'xay-dung-mot-loi-song-can-bang',
    excerpt: 'Chiến lược cân bằng năng lượng: tách bạch công việc và cuộc sống cá nhân, thực hành giải độc số định kỳ và nuôi dưỡng các mối quan hệ chất lượng.',
    readingTime: '8 phút đọc',
    publishedAt: '05 Tháng 09, 2026',
    image: '/src/assets/images/bensop_health_bw_1790320807310.jpg',
    level: 'All Levels',
    difficulty: 'Trung cấp',
    author: {
      name: 'BS. Tuấn Phạm',
      role: 'Bác sĩ Y học Thể thao & Giấc ngủ'
    },
    content: [
      'Cân bằng không phải là chia đều 24 giờ cho công việc và nghỉ ngơi như chiếc cân tiểu ly. Cân bằng là trạng thái bạn hoàn toàn hiện diện ở bất cứ việc gì mình đang làm.',
      'Khi làm việc: tập trung sâu sắc không xao nhãng. Khi ở bên gia đình: đặt điện thoại xuống và kết nối bằng cả tâm trí.'
    ],
    relatedLessonSlug: 'hl-tinh-toan-tdee-macro',
    relatedCourseSlug: 'khoa-hoc-the-luc-dinh-duong-phuc-hoi',
    relatedArticleSlugs: ['dong-bo-nhip-sinh-hoc-giac-ngu-sau', 'nhung-nguyen-tac-co-ban-de-ngu-tot-hon']
  }
];
