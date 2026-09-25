import { VocabularyItem } from '../types';

export const LAB_MODULES = [
  {
    id: 'lab-vocab',
    type: 'vocabulary',
    title: 'VOCABULARY',
    name: 'Từ vựng cốt lõi',
    tagline: 'Học từ vựng theo chủ đề & thẻ flashcard tương tác.',
    description: 'Ứng dụng nguyên lý lặp lại ngắt quãng (Spaced Repetition) với ví dụ câu thực tế và phiên âm chuẩn quốc tế.',
    itemsCount: '1.200+ từ',
    actionText: 'Luyện từ vựng ngay →'
  },
  {
    id: 'lab-grammar',
    type: 'grammar',
    title: 'GRAMMAR',
    name: 'Ngữ pháp thực dụng',
    tagline: 'Hiểu ngữ pháp qua ví dụ thực tế, không học vẹt công thức.',
    description: 'Phân tích các mẫu câu có tần suất sử dụng cao nhất trong đời sống và môi trường làm việc chuyên nghiệp.',
    itemsCount: '150+ cấu trúc',
    actionText: 'Khám phá ngữ pháp →'
  },
  {
    id: 'lab-quiz',
    type: 'quiz',
    title: 'QUIZ',
    name: 'Kiểm tra & Củng cố',
    tagline: 'Thử thách phản xạ với các bài quiz trắc nghiệm ngắn 3 phút.',
    description: 'Đo lường tiến độ tức thì, giải thích chi tiết đáp án đúng/sai giúp khắc sâu kiến thức vào trí nhớ dài hạn.',
    itemsCount: '60+ bài kiểm tra',
    actionText: 'Bắt đầu bài kiểm tra →'
  },
  {
    id: 'lab-speaking',
    type: 'speaking',
    title: 'SPEAKING',
    name: 'Phản xạ phát âm',
    tagline: 'Luyện nói câu mẫu, trọng âm và nhịp điệu tự nhiên.',
    description: 'Thực hành kỹ thuật Shadowing theo câu chuẩn bản ngữ để nâng cao độ trôi chảy và loại bỏ giọng gượng gạo.',
    itemsCount: '300+ hội thoại',
    actionText: 'Luyện nói ngay →'
  },
  {
    id: 'lab-listening',
    type: 'listening',
    title: 'LISTENING',
    name: 'Luyện nghe ngữ cảnh',
    tagline: 'Bắt nhịp từ khóa và nối âm trong hội thoại đời thực.',
    description: 'Nghe hội thoại đa tốc độ (0.8x, 1.0x, 1.25x) kèm bản gỡ băng phân tích các hiện tượng ngữ âm.',
    itemsCount: '80+ audio clips',
    actionText: 'Luyện nghe ngay →'
  },
  {
    id: 'lab-reading',
    type: 'reading',
    title: 'READING',
    name: 'Đọc hiểu sâu sắc',
    tagline: 'Rèn luyện khả năng đọc tài liệu chuyên ngành & tư duy phản biện.',
    description: 'Các bài đọc chọn lọc từ ấn phẩm khoa học, triết học và kinh doanh quốc tế được dịch và chú thích tỉ mỉ.',
    itemsCount: '95+ bài luận',
    actionText: 'Đọc bài mới →'
  }
];

export const VOCABULARY_SAMPLE: VocabularyItem[] = [
  {
    id: 'v-zh-1',
    word: '坚持 (jiānchí)',
    phonetic: 'jiān chí',
    meaning: 'Kiên trì, giữ vững',
    example: '只要坚持下去，就一定能取得成功。',
    exampleTranslation: 'Chỉ cần kiên trì tới cùng, nhất định sẽ đạt được thành công.',
    category: 'TIẾNG TRUNG',
    level: 'HSK 3'
  },
  {
    id: 'v-zh-2',
    word: '习惯 (xíguàn)',
    phonetic: 'xí guàn',
    meaning: 'Thói quen, tập quán / quen với',
    example: '我已经习惯了早起读书。',
    exampleTranslation: 'Tôi đã quen với việc dậy sớm đọc sách.',
    category: 'TIẾNG TRUNG',
    level: 'HSK 3'
  },
  {
    id: 'v-en-1',
    word: 'Resilience',
    phonetic: '/rɪˈzɪl.jəns/',
    meaning: 'Khả năng phục hồi, kiên cường vượt khó',
    example: 'True resilience comes from reflecting and adapting after failure.',
    exampleTranslation: 'Sự kiên cường thực sự đến từ việc chiêm nghiệm và thích ứng sau thất bại.',
    category: 'TIẾNG ANH',
    level: 'B2 / C1'
  },
  {
    id: 'v-en-2',
    word: 'Figure out',
    phonetic: '/ˈfɪɡ.jər aʊt/',
    meaning: 'Tìm ra giải pháp, hiểu ra vấn đề',
    example: 'We need to figure out how to optimize this system before launch.',
    exampleTranslation: 'Chúng ta cần tìm ra cách tối ưu hệ thống này trước khi phát hành.',
    category: 'TIẾNG ANH',
    level: 'B1'
  },
  {
    id: 'v-gr-1',
    word: 'Deep Work',
    phonetic: '/diːp wɜːk/',
    meaning: 'Làm việc sâu không xao nhãng',
    example: 'Two hours of deep work outperform eight hours of fragmented multitasking.',
    exampleTranslation: 'Hai tiếng làm việc sâu mang lại hiệu quả vượt xa tám tiếng đa nhiệm bị phân mảnh.',
    category: 'PHÁT TRIỂN BẢN THÂN',
    level: 'Hiệu suất'
  },
  {
    id: 'v-hl-1',
    word: 'Circadian Rhythm',
    phonetic: '/sɜːˈkeɪ.di.ən ˈrɪð.əm/',
    meaning: 'Nhịp sinh học 24 giờ tự nhiên của cơ thể',
    example: 'Morning sunlight exposure aligns your circadian rhythm for optimal energy.',
    exampleTranslation: 'Ánh nắng buổi sáng giúp đồng bộ nhịp sinh học cho năng lượng tối ưu cả ngày.',
    category: 'SỨC KHỎE',
    level: 'Khoa học'
  }
];

export const GRAMMAR_SAMPLE = [
  {
    id: 'g-zh-1',
    title: 'Cấu trúc câu chữ 把 (Bǎ) trong tiếng Trung',
    formula: 'Chủ ngữ + 把 + Tân ngữ + Động từ + Thành phần khác',
    explanation: 'Dùng khi muốn nhấn mạnh tác động của hành động làm thay đổi trạng thái hoặc vị trí của tân ngữ.',
    example: '请把门关上。 (Qǐng bǎ mén guān shàng.) - Xin hãy đóng cửa lại.',
    category: 'TIẾNG TRUNG'
  },
  {
    id: 'g-en-1',
    title: 'Đảo ngữ với cụm từ phủ định (Inversion)',
    formula: 'Phủ định (Not only / Seldom / Rarely / Under no circumstances) + Trợ động từ + S + V',
    explanation: 'Tạo sắc thái nhấn mạnh mạnh mẽ trong văn viết học thuật hoặc bài phát biểu quan trọng.',
    example: 'Rarely do we encounter a solution so elegant yet practical.',
    category: 'TIẾNG ANH'
  },
  {
    id: 'g-gr-1',
    title: 'Quy tắc 2 Phút (The 2-Minute Rule) trong thiết kế thói quen',
    formula: 'Bắt đầu hành vi mới sao cho chỉ mất dưới 2 phút để thực hiện',
    explanation: 'Giúp não bộ vượt qua quán tính trì hoãn ban đầu. Khi đã bắt đầu, động lực sẽ tự sản sinh.',
    example: 'Thay vì "Đọc 30 trang sách mỗi ngày", hãy đặt mục tiêu "Mở sách và đọc 1 trang duy nhất".',
    category: 'PHÁT TRIỂN BẢN THÂN'
  }
];
