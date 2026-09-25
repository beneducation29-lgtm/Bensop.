import { Quiz } from '../types';
export { QUIZ_MODELS } from './quizModels';

export const QUIZZES: Quiz[] = [
  {
    id: 'quiz-zh-01',
    categoryId: 'tieng-trung',
    categoryName: 'TIẾNG TRUNG',
    title: 'KIỂM TRA PHẢN XẠ TỪ VỰNG & THANH ĐIỆU HSK',
    subtitle: '5 câu hỏi trắc nghiệm kiểm tra độ nhạy âm và từ vựng thông dụng',
    difficulty: 'Cơ bản',
    timeLimit: '3 phút',
    questions: [
      {
        id: 1,
        question: 'Trong tiếng Trung, thanh 4 (四声) có đặc điểm phát âm như thế nào?',
        options: [
          'Cao và ngân bằng đều hơi (từ 5 đến 5)',
          'Hạ từ cao độ 5 xuống 1 một cách nhanh, mạnh và dứt khoát',
          'Xuống thấp rồi vểnh nhẹ lên (từ 2 xuống 1 rồi lên 4)',
          'Giống hệt dấu huyền nhẹ của tiếng Việt'
        ],
        correctIndex: 1,
        explanation: 'Thanh 4 là thanh rơi gấp từ mức cao nhất (5) xuống thấp nhất (1), phát âm dứt khoát và ngắn, không kéo dài hay luyến âm.'
      },
      {
        id: 2,
        question: 'Từ "坚持" (jiānchí) có nghĩa chuẩn xác nhất là gì?',
        options: [
          'Kiên trì, bền bỉ đến cùng',
          'Từ bỏ, buông xuôi',
          'Khám phá điều mới',
          'Giao tiếp hợp tác'
        ],
        correctIndex: 0,
        explanation: '坚持 (jiānchí) là một từ HSK 3 rất phổ biến, có nghĩa là giữ vững lập trường, kiên trì không lùi bước.'
      },
      {
        id: 3,
        question: 'Điền từ thích hợp vào chỗ trống: "我们正在 ______ 一个好的解决方案。"',
        options: [
          '学习 (học tập)',
          '寻找 (tìm kiếm)',
          '说话 (nói chuyện)',
          '睡觉 (đi ngủ)'
        ],
        correctIndex: 1,
        explanation: '寻找 (xúnzhǎo) có nghĩa là tìm kiếm. Câu hoàn chỉnh: "Chúng tôi đang tìm kiếm một phương án giải quyết tốt."'
      }
    ]
  },
  {
    id: 'quiz-en-01',
    categoryId: 'tieng-anh',
    categoryName: 'TIẾNG ANH',
    title: 'CHINH PHỤC PHRASAL VERBS TRONG GIAO TIẾP CÔNG SỞ',
    subtitle: 'Đánh giá khả năng hiểu và sử dụng cụm động từ tự nhiên',
    difficulty: 'Trung cấp',
    timeLimit: '3 phút',
    questions: [
      {
        id: 1,
        question: 'Chọn cụm từ đồng nghĩa tự nhiên nhất với "to cancel a scheduled meeting":',
        options: [
          'Call off the meeting',
          'Call out the meeting',
          'Break down the meeting',
          'Put on the meeting'
        ],
        correctIndex: 0,
        explanation: '"Call off" là phrasal verb tự nhiên phổ biến nhất cho việc hủy bỏ một sự kiện hoặc cuộc họp đã lên lịch.'
      },
      {
        id: 2,
        question: 'Ý nghĩa của câu: "She backed out of the agreement at the last minute"?',
        options: [
          'Cô ấy ký hợp đồng đúng giờ',
          'Cô ấy rút lui khỏi thỏa thuận vào phút chót',
          'Cô ấy ủng hộ thỏa thuận hết mình',
          'Cô ấy gia hạn thỏa thuận thêm một tuần'
        ],
        correctIndex: 1,
        explanation: '"Back out of something" nghĩa là rút lui, không thực hiện điều mình đã cam kết hoặc đồng ý trước đó.'
      },
      {
        id: 3,
        question: 'Trong hiện tượng nối âm (Linking), "pick it up" thường được phát âm liền mạch như thế nào?',
        options: [
          '/pɪk - ɪt - ʌp/ ngắt quãng',
          '/pɪ.kɪ.tʌp/ (âm /k/ nối vào "it", âm /t/ nối vào "up")',
          '/pɪk - tʌp/',
          '/pɪ.kɪt/'
        ],
        correctIndex: 1,
        explanation: 'Khi phụ âm cuối đi trước nguyên âm đầu tiếp theo, chúng tự động nối thành các âm tiết liền mạch: pick + it + up -> /pɪ.kɪ.tʌp/.'
      }
    ]
  },
  {
    id: 'quiz-growth-01',
    categoryId: 'phat-trien-ban-than',
    categoryName: 'PHÁT TRIỂN BẢN THÂN',
    title: 'ĐO LƯỜNG TƯ DUY HIỆU SUẤT & THIẾT KẾ THÓI QUEN',
    subtitle: 'Khám phá xem bạn đang kiểm soát thời gian hay bị ngoại cảnh cuốn trôi',
    difficulty: 'Nâng cao',
    timeLimit: '4 phút',
    questions: [
      {
        id: 1,
        question: 'Theo cuốn Atomic Habits của James Clear, 4 bước trong vòng lặp thói quen là gì?',
        options: [
          'Gợi ý (Cue) -> Khao khát (Craving) -> Phản hồi (Response) -> Phần thưởng (Reward)',
          'Mục tiêu -> Kế hoạch -> Hành động -> Kết quả',
          'Động lực -> Cố gắng -> Mệt mỏi -> Dừng lại',
          'Ý chí -> Kỷ luật -> Kiên trì -> Thành công'
        ],
        correctIndex: 0,
        explanation: 'Vòng lặp thần kinh sinh học của mọi thói quen gồm 4 giai đoạn: Gợi ý (Cue) tạo ra Khao khát (Craving), dẫn đến Phản hồi/Hành vi (Response) và nhận Phần thưởng (Reward).'
      },
      {
        id: 2,
        question: 'Tại sao việc phụ thuộc vào ý chí (willpower) thuần túy lại dễ dẫn đến thất bại trong việc bỏ thói quen xấu?',
        options: [
          'Vì ý chí không có tác dụng gì',
          'Vì ý chí là tài nguyên năng lượng thần kinh bị cạn kiệt dần theo quyết định trong ngày (Ego Depletion)',
          'Vì thói quen chỉ được hình thành sau 21 ngày',
          'Vì người khác luôn ngăn cản bạn'
        ],
        correctIndex: 1,
        explanation: 'Khi bạn mệt mỏi vào cuối ngày, vỏ não trước trán (Prefrontal Cortex) giảm hoạt động, khiến khả năng tự kiềm chế suy yếu. Thiết kế môi trường để giảm ma sát luôn vượt trội hơn dựa vào ý chí đơn thuần.'
      }
    ]
  }
];
