import { Category } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'tieng-trung',
    name: 'TIẾNG TRUNG',
    slug: '/tieng-trung',
    englishTitle: 'Chinese Learning',
    number: '01',
    shortDescription: 'Học tiếng Trung từ nền tảng ngữ âm, chữ Hán đến giao tiếp thực tế và ứng dụng công việc.',
    fullDescription: 'Hệ thống học tập chuyên sâu được tối ưu cho người Việt: giải mã quy tắc bính âm Pinyin, chiết tự chữ Hán, ngữ pháp thực dụng và lộ trình HSK tinh gọn không rườm rà.',
    image: '/src/assets/images/bensop_chinese_bw_1790320769606.jpg',
    topics: ['Từ vựng HSK', 'Ngữ pháp thực dụng', 'Phát âm chuẩn', 'Giao tiếp công sở', 'Luyện nghe & phản xạ', 'Chiết tự chữ Hán']
  },
  {
    id: 'tieng-anh',
    name: 'TIẾNG ANH',
    slug: '/tieng-anh',
    englishTitle: 'English Learning',
    number: '02',
    shortDescription: 'Phát triển tiếng Anh thực tế cho học tập, sự nghiệp toàn cầu và tư duy giao tiếp bản ngữ.',
    fullDescription: 'Phương pháp tiếp cận tiếng Anh không qua lối mòn học vẹt: làm chủ collocations, phrasal verbs, phát âm nối âm tự nhiên và tư duy trực tiếp bằng tiếng Anh.',
    image: '/src/assets/images/bensop_english_bw_1790320781718.jpg',
    topics: ['Collocations thực tế', 'Phrasal Verbs', 'Phát âm Connected Speech', 'Viết học thuật & công việc', 'Phản xạ Speaking', 'Tư duy ngoại ngữ']
  },
  {
    id: 'phat-trien-ban-than',
    name: 'PHÁT TRIỂN BẢN THÂN',
    slug: '/phat-trien-ban-than',
    englishTitle: 'Personal Growth',
    number: '03',
    shortDescription: 'Kiến thức và công cụ cốt lõi giúp bạn nâng cấp tư duy, kỷ luật sắt, hiệu suất cá nhân và lãnh đạo bản thân.',
    fullDescription: 'Tập hợp các mô hình tư duy (Mental Models), phương pháp xây dựng thói quen vi mô (Atomic Habits), quản trị năng lượng thay vì quản trị thời gian và sự kiên định dài hạn.',
    image: '/src/assets/images/bensop_growth_bw_1790320796588.jpg',
    topics: ['Tư duy bậc hai', 'Kỷ luật tự thân', 'Thiết kế thói quen', 'Deep Work & Hiệu suất', 'Giao tiếp thuyết phục', 'Quản trị năng lượng']
  },
  {
    id: 'suc-khoe-doi-song',
    name: 'SỨC KHỎE & ĐỜI SỐNG',
    slug: '/suc-khoe-doi-song',
    englishTitle: 'Health & Life',
    number: '04',
    shortDescription: 'Những nguyên lý khoa học thực tế giúp xây dựng một cơ thể khỏe mạnh, giấc ngủ sâu, tinh thần cân bằng.',
    fullDescription: 'Học cách đồng bộ nhịp sinh học tự nhiên (Circadian Rhythm), dinh dưỡng dựa trên bằng chứng khoa học, rèn luyện thể lực bền bỉ và giải tỏa căng thẳng thần kinh hiệu quả.',
    image: '/src/assets/images/bensop_health_bw_1790320807310.jpg',
    topics: ['Nhịp sinh học & Giấc ngủ', 'Dinh dưỡng cân bằng', 'Tập luyện kháng lực & tim mạch', 'Sức khỏe tinh thần', 'Hơi thở & Phục hồi', 'Lối sống bền vững']
  }
];
