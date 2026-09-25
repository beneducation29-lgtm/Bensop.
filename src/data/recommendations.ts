import { ARTICLES } from './articles';
import { COURSES } from './courses';
import { Article, Course } from '../types';

export interface RecommendedItem {
  id: string;
  type: 'article' | 'course';
  title: string;
  category: string;
  slug: string;
  reason: string;
  meta: string;
  image?: string;
}

/**
 * Rule-based recommendation engine for BENSOP frontend.
 * Prepares the abstraction layer for future AI-powered recommendation backend.
 */
export function getRecommendations(
  userInterest: 'tieng-anh' | 'tieng-trung' | 'phat-trien-ban-than' | 'suc-khoe-doi-song' = 'tieng-anh'
): RecommendedItem[] {
  const recommendations: RecommendedItem[] = [];

  if (userInterest === 'tieng-anh') {
    recommendations.push(
      {
        id: 'rec-en-1',
        type: 'course',
        title: 'CONNECTED SPEECH & THỰC HÀNH SPEAKING TỰ NHIÊN',
        category: 'TIẾNG ANH',
        slug: 'connected-speech-speaking-tu-nhien',
        reason: 'Dựa trên mục tiêu cải thiện phản xạ giao tiếp tự nhiên của bạn',
        meta: 'Khóa học · 28 bài giảng',
        image: '/src/assets/images/bensop_english_bw_1790320781718.jpg'
      },
      {
        id: 'rec-en-2',
        type: 'article',
        title: '50 CỤM TỪ TIẾNG ANH DÙNG TRONG CÔNG VIỆC VÀ ĐÀM PHÁN',
        category: 'TIẾNG ANH',
        slug: '50-cum-tu-tieng-anh-cong-viec',
        reason: 'Nâng cao khả năng đàm phán và viết email công sở chuẩn mực',
        meta: 'Bài viết · 7 phút đọc',
        image: '/src/assets/images/bensop_english_bw_1790320781718.jpg'
      },
      {
        id: 'rec-en-3',
        type: 'article',
        title: 'PRESENT PERFECT: KHI NÀO NÊN SỬ DỤNG VÀ LỖI SAI KINH ĐIỂN',
        category: 'TIẾNG ANH',
        slug: 'present-perfect-khi-nao-su-dung',
        reason: 'Củng cố nền tảng ngữ pháp kết nối quá khứ và hiện tại',
        meta: 'Bài viết · 6 phút đọc'
      }
    );
  } else if (userInterest === 'tieng-trung') {
    recommendations.push(
      {
        id: 'rec-zh-1',
        type: 'course',
        title: 'TIẾNG TRUNG THỰC CHIẾN TỪ CON SỐ 0',
        category: 'TIẾNG TRUNG',
        slug: 'tieng-trung-thuc-chien-tu-con-so-0',
        reason: 'Lộ trình tối ưu cho người mới bắt đầu làm chủ Pinyin & HSK',
        meta: 'Khóa học · 32 bài giảng',
        image: '/src/assets/images/bensop_chinese_bw_1790320769606.jpg'
      },
      {
        id: 'rec-zh-2',
        type: 'article',
        title: 'PHÂN BIỆT 的, 得 VÀ 地 TRONG NGỮ PHÁP TIẾNG TRUNG',
        category: 'TIẾNG TRUNG',
        slug: 'phan-biet-de-de-de-tieng-trung',
        reason: 'Khắc phục triệt để lỗi sai ngữ pháp thường gặp nhất',
        meta: 'Bài viết · 6 phút đọc',
        image: '/src/assets/images/bensop_chinese_bw_1790320769606.jpg'
      }
    );
  } else if (userInterest === 'phat-trien-ban-than') {
    recommendations.push(
      {
        id: 'rec-gr-1',
        type: 'course',
        title: 'HỆ THỐNG KỶ LUẬT TỰ THÂN & HIỆU SUẤT ĐỈNH CAO',
        category: 'PHÁT TRIỂN BẢN THÂN',
        slug: 'ky-luat-tu-than-hieu-suat-dinh-cao',
        reason: 'Học cách thiết lập hệ thống thay vì phụ thuộc ý chí',
        meta: 'Khóa học · 20 bài giảng',
        image: '/src/assets/images/bensop_growth_bw_1790320796588.jpg'
      },
      {
        id: 'rec-gr-2',
        type: 'article',
        title: 'DEEP WORK LÀ GÌ? PHƯƠNG PHÁP LÀM VIỆC SÂU TRONG THỜI ĐẠI PHÂN TÂM',
        category: 'PHÁT TRIỂN BẢN THÂN',
        slug: 'deep-work-la-gi-cach-thuc-hien',
        reason: 'Gia tăng gấp đôi hiệu suất làm việc trí tuệ của bạn',
        meta: 'Bài viết · 8 phút đọc',
        image: '/src/assets/images/bensop_growth_bw_1790320796588.jpg'
      }
    );
  } else {
    recommendations.push(
      {
        id: 'rec-hl-1',
        type: 'course',
        title: 'KHOA HỌC THỂ LỰC, DINH DƯỠNG & PHỤC HỒI TOÀN DIỆN',
        category: 'SỨC KHỎE & ĐỜI SỐNG',
        slug: 'khoa-hoc-the-luc-dinh-duong-phuc-hoi',
        reason: 'Cân bằng nhịp sinh học và năng lượng thể chất bền vững',
        meta: 'Khóa học · 24 bài giảng',
        image: '/src/assets/images/bensop_health_bw_1790320807310.jpg'
      },
      {
        id: 'rec-hl-2',
        type: 'article',
        title: 'NHỮNG NGUYÊN TẮC CƠ BẢN ĐỂ NGỦ TỐT HƠN VÀ THỨC DẬY TỈNH TÁO',
        category: 'SỨC KHỎE & ĐỜI SỐNG',
        slug: 'nhung-nguyen-tac-co-ban-de-ngu-tot-hon',
        reason: 'Giao thức hạ nhiệt độ phòng và bóng tối phục hồi',
        meta: 'Bài viết · 6 phút đọc',
        image: '/src/assets/images/bensop_health_bw_1790320807310.jpg'
      }
    );
  }

  return recommendations;
}
