import { Lesson } from '../types';

export const LESSONS: Lesson[] = [
  // --- LESSON 1: TIẾNG ANH (Connected Speech: Linking Consonant to Vowel) ---
  {
    id: 'les-en-01',
    courseSlug: 'connected-speech-speaking-tu-nhien',
    courseTitle: 'CONNECTED SPEECH & THỰC HÀNH SPEAKING TỰ NHIÊN',
    categoryId: 'tieng-anh',
    categoryName: 'TIẾNG ANH',
    title: 'Nối phụ âm sang nguyên âm (Consonant to Vowel Linking)',
    slug: 'en-linking-consonant-to-vowel',
    order: 1,
    totalLessonsInCourse: 28,
    duration: '20 phút',
    summary: 'Hiểu nguyên lý cơ bản nhất của Connected Speech: cách phụ âm kết thúc của từ trước tự động trượt sang nguyên âm bắt đầu của từ kế tiếp để tạo luồng âm thanh liền mạch.',
    content: [
      'Trong tiếng Việt, mỗi từ là một âm tiết đơn lập, chúng ta phát âm ngắt quãng và rõ ràng từng từ: "tôi - đang - học - bài". Tuy nhiên, tiếng Anh là ngôn ngữ dựa trên trọng âm nhịp điệu (Stress-timed language). Khi người bản ngữ nói chuyện, họ không dừng hơi giữa các từ mà nối chúng lại thành một dải âm thanh liên tục.',
      'Quy tắc Consonant to Vowel (C + V) là quy tắc phổ biến nhất trong đời sống. Khi một từ kết thúc bằng một phụ âm (consonant sound) và từ tiếp theo bắt đầu bằng một nguyên âm (vowel sound), phụ âm đó sẽ chuyển sang đứng đầu âm tiết tiếp theo.',
      'Ví dụ kinh điển: cụm từ "hold on" không được phát âm là /həʊld/ rồi dừng lại rồi mới nói /ɒn/. Thay vào đó, âm /d/ cuối của "hold" chuyển sang gắn liền với "on", tạo thành /həʊl - dɒn/.'
    ],
    keyPoints: [
      'Không dừng hơi giữa từ kết thúc bằng phụ âm và từ bắt đầu bằng nguyên âm.',
      'Tập trung vào âm thanh thực tế (sound), không phải chữ cái viết (spelling). Ví dụ: "take" kết thúc bằng chữ "e" nhưng âm cuối là phụ âm /k/.',
      'Thực hành Shadowing tốc độ chậm trước khi tăng dần lên tốc độ tự nhiên.'
    ],
    examples: [
      {
        label: 'Cụm từ 1',
        target: 'Pick it up',
        translation: 'Nhặt nó lên / Nghe máy',
        note: 'Âm /k/ nối vào "it", âm /t/ nối vào "up" -> /pɪ.kɪ.tʌp/'
      },
      {
        label: 'Cụm từ 2',
        target: 'Hold on a second',
        translation: 'Chờ một chút nhé',
        note: 'Nối âm: /həʊl.dɒ.nə ˈsek.ənd/'
      },
      {
        label: 'Cụm từ 3',
        target: 'Turn off the lights',
        translation: 'Tắt đèn đi',
        note: 'Âm /n/ nối vào "off" -> /ˈtɜː.nɒf ðə laɪts/'
      }
    ],
    exercise: {
      question: 'Trong câu "Check it out", các phụ âm nào sẽ nối sang các nguyên âm tiếp theo?',
      options: [
        'Không có hiện tượng nối âm nào',
        'Âm /k/ nối vào "it", âm /t/ nối vào "out" -> /tʃe.kɪ.taʊt/',
        'Chỉ có âm /t/ nối vào "out"',
        'Chỉ có âm /k/ nối vào "it"'
      ],
      correctIndex: 1,
      explanation: 'Chính xác! "Check" kết thúc bằng /k/ nối vào nguyên âm /ɪ/ của "it", "it" kết thúc bằng /t/ nối vào nguyên âm /aʊ/ của "out".'
    },
    relatedArticleSlug: '100-phrasal-verbs-ban-nen-biet',
    relatedQuizId: 'quiz-en-01',
    prevLessonSlug: undefined,
    nextLessonSlug: 'en-vowel-to-vowel-glide'
  },

  // --- LESSON 2: TIẾNG ANH (Vowel to Vowel Glide) ---
  {
    id: 'les-en-02',
    courseSlug: 'connected-speech-speaking-tu-nhien',
    courseTitle: 'CONNECTED SPEECH & THỰC HÀNH SPEAKING TỰ NHIÊN',
    categoryId: 'tieng-anh',
    categoryName: 'TIẾNG ANH',
    title: 'Nguyên âm sang nguyên âm với âm lướt /w/ & /j/',
    slug: 'en-vowel-to-vowel-glide',
    order: 2,
    totalLessonsInCourse: 28,
    duration: '18 phút',
    summary: 'Khám phá cách cơ miệng chèn âm lướt /w/ hoặc /j/ khi hai nguyên âm đứng liền kề nhau để tránh va đập luồng hơi ngắt quãng.',
    content: [
      'Khi một từ kết thúc bằng nguyên âm và từ tiếp theo cũng bắt đầu bằng nguyên âm, việc dừng hơi đột ngột sẽ tạo ra âm tắc thanh hầu (glottal stop) nghe rất gượng gạo.',
      'Để âm thanh mượt mà, người bản xứ tự động thêm một âm lướt nhẹ: âm /j/ (như âm "d" nhẹ) nếu nguyên âm trước kết thúc ở vị trí môi bẹt (/iː/, /eɪ/, /aɪ/, /ɔɪ/), hoặc âm /w/ nếu nguyên âm trước kết thúc ở vị trí môi tròn (/uː/, /oʊ/, /aʊ/).',
      'Ví dụ: "I agree" sẽ được phát âm là /aɪ jəˈɡriː/, và "Go on" sẽ là /ɡoʊ wɒn/.'
    ],
    keyPoints: [
      'Quy tắc môi bẹt (/iː/, /eɪ/) -> chèn âm lướt /j/.',
      'Quy tắc môi tròn (/uː/, /oʊ/) -> chèn âm lướt /w/.',
      'Âm lướt không được phát âm quá to, chỉ là cây cầu kết nối mềm mại giữa hai âm tiết.'
    ],
    examples: [
      {
        label: 'Âm lướt /j/',
        target: 'He asked me',
        translation: 'Anh ấy đã hỏi tôi',
        note: 'Phát âm: /hiː jɑːskt miː/'
      },
      {
        label: 'Âm lướt /w/',
        target: 'Do it now',
        translation: 'Làm việc đó ngay đi',
        note: 'Phát âm: /duː wɪt naʊ/'
      }
    ],
    exercise: {
      question: 'Khi phát âm cụm từ "See you later", âm lướt nào xuất hiện giữa "See" và "it" trong câu "See it"?',
      options: [
        'Âm lướt /w/',
        'Âm lướt /j/',
        'Âm /r/',
        'Không chèn âm lướt'
      ],
      correctIndex: 1,
      explanation: '"See" kết thúc bằng nguyên âm dài /iː/ (môi bẹt), nên âm lướt /j/ tự nhiên được sinh ra để nối vào "it": /siː jɪt/.'
    },
    relatedArticleSlug: '100-phrasal-verbs-ban-nen-biet',
    relatedQuizId: 'quiz-en-01',
    prevLessonSlug: 'en-linking-consonant-to-vowel',
    nextLessonSlug: 'en-assimilation-in-context'
  },

  // --- LESSON 3: TIẾNG TRUNG (Pinyin Nguyên âm & Phụ âm) ---
  {
    id: 'les-zh-01',
    courseSlug: 'tieng-trung-thuc-chien-tu-con-so-0',
    courseTitle: 'TIẾNG TRUNG THỰC CHIẾN TỪ CON SỐ 0',
    categoryId: 'tieng-trung',
    categoryName: 'TIẾNG TRUNG',
    title: 'Hệ thống nguyên âm & phụ âm Pinyin cơ bản',
    slug: 'zh-pinyin-nguyen-am-phu-am',
    order: 1,
    totalLessonsInCourse: 32,
    duration: '18 phút',
    summary: 'Bản đồ bính âm ngữ âm tiếng Trung: Phân biệt các cặp phụ âm bật hơi (p, t, k, q, ch) và không bật hơi (b, d, g, j, zh).',
    content: [
      'Bính âm (Pinyin) là hệ thống ký âm Latinh chính thức của tiếng Trung Quốc hiện đại. Nắm vững Pinyin là chiếc chìa khóa đầu tiên giúp bạn phát âm chuẩn xác mọi từ ngữ và có thể gõ chữ Hán mượt mà trên điện thoại và máy tính.',
      'Sự khác biệt lớn nhất giữa phát âm tiếng Trung và tiếng Việt nằm ở cặp âm Bật hơi (Aspirated) và Không bật hơi (Unaspirated).',
      'Trong tiếng Việt, chữ "b" và "p" khác nhau về độ thanh (hữu thanh vs vô thanh). Nhưng trong tiếng Trung, cả "b" và "p" đều là âm vô thanh, sự khác biệt duy nhất là "p" có một luồng hơi nén cực mạnh bắn ra từ hai môi.'
    ],
    keyPoints: [
      'Cặp âm môi: b (không bật hơi, đọc gần như "p" tiếng Việt) vs p (bật hơi mạnh, làm bay tờ giấy trước miệng).',
      'Cặp âm đầu lưỡi: d (đọc gần như "t" tiếng Việt) vs t (bật hơi mạnh như "th").',
      'Nhóm âm mặt lưỡi j, q, x: Đầu lưỡi đặt dưới răng dưới, luồng hơi đi qua khe giữa mặt lưỡi và vòm họng.'
    ],
    examples: [
      {
        label: 'So sánh 1',
        target: 'bàba (爸爸) vs pà (怕)',
        translation: 'Bố vs Sợ hãi',
        note: 'bàba đọc như "pà-pa", pà bật hơi mạnh'
      },
      {
        label: 'So sánh 2',
        target: 'dà (大) vs tà (踏)',
        translation: 'To lớn vs Giẫm đạp',
        note: 'dà đọc như "ta", tà đọc bật hơi như "tha"'
      }
    ],
    exercise: {
      question: 'Khi phát âm thanh mẫu "p" trong Pinyin, điều gì phải xảy ra?',
      options: [
        'Phát âm rung dây thanh quản như chữ "b" tiếng Việt',
        'Hai môi mím chặt, nén hơi rồi mở ra để luồng hơi mạnh phóng ra ngoài',
        'Đặt đầu lưỡi chạm vào răng trên',
        'Uốn cong đầu lưỡi lên vòm họng'
      ],
      correctIndex: 1,
      explanation: 'Chính xác! "p" là âm tắc vô thanh bật hơi hai môi. Luồng hơi phát ra phải đủ mạnh để làm rung tờ giấy đặt trước miệng.'
    },
    relatedArticleSlug: 'giai-ma-4-thanh-dieu-tieng-trung',
    relatedQuizId: 'quiz-zh-01',
    prevLessonSlug: undefined,
    nextLessonSlug: 'zh-bien-dieu-thanh-3'
  },

  // --- LESSON 4: PHÁT TRIỂN BẢN THÂN (Vòng lặp thói quen) ---
  {
    id: 'les-gr-01',
    courseSlug: 'ky-luat-tu-than-hieu-suat-dinh-cao',
    courseTitle: 'HỆ THỐNG KỶ LUẬT TỰ THÂN & HIỆU SUẤT ĐỈNH CAO',
    categoryId: 'phat-trien-ban-than',
    categoryName: 'PHÁT TRIỂN BẢN THÂN',
    title: 'Vòng lặp thói quen Cue - Craving - Response - Reward',
    slug: 'gr-vong-lap-thoi-quen-cue-reward',
    order: 1,
    totalLessonsInCourse: 20,
    duration: '24 phút',
    summary: 'Bóc tách cơ chế giải phóng dopamine và vòng cung phản xạ thần kinh của mọi hành vi con người theo cuốn sách Atomic Habits.',
    content: [
      'Bộ não con người là một cỗ máy tiết kiệm năng lượng tối thượng. Khi bạn lặp lại một hành động đủ nhiều lần trong cùng một bối cảnh, não bộ sẽ chuyển giao quyền điều khiển từ vỏ não trước trán (Prefrontal Cortex - nơi xử lý tư duy có ý thức) sang hạch nền (Basal Ganglia - nơi vận hành tự động).',
      'Mọi thói quen trong cuộc sống, từ việc với tay lấy điện thoại ngay khi vừa mở mắt đến việc xỏ giày chạy bộ, đều trải qua 4 bước: Gợi ý (Cue) -> Khao khát (Craving) -> Phản hồi (Response) -> Phần thưởng (Reward).',
      'Nếu bạn muốn thay đổi bất kỳ thói quen nào, đừng dựa vào ý chí suông. Hãy can thiệp trực tiếp vào 1 trong 4 mắt xích này.'
    ],
    keyPoints: [
      'Gợi ý (Cue): Tín hiệu kích hoạt não bộ dự đoán phần thưởng.',
      'Khao khát (Craving): Động lực nội tại thúc đẩy hành vi (không phải bản thân hành động, mà là sự thay đổi trạng thái tâm lý mà nó đem lại).',
      'Phản hồi (Response): Hành vi thực tế bạn thực hiện (phụ thuộc vào mức độ ma sát).',
      'Phần thưởng (Reward): Mục tiêu cuối cùng thỏa mãn khao khát và dạy não bộ ghi nhớ vòng lặp.'
    ],
    examples: [
      {
        label: 'Thói quen xấu',
        target: 'Nghe tiếng thông báo chuông điện thoại (Cue)',
        translation: 'Muốn biết ai nhắn tin (Craving) -> Mở điện thoại lướt mạng xã hội (Response) -> Dopamine tức thì (Reward)',
        note: 'Cách phá vỡ: Tắt toàn bộ thông báo (loại bỏ Cue)'
      },
      {
        label: 'Thói quen tốt',
        target: 'Đặt bình nước lớn trên bàn làm việc lúc 8h sáng (Cue)',
        translation: 'Muốn cơ thể sảng khoái (Craving) -> Cầm cốc uống nước (Response) -> Tỉnh táo làm việc (Reward)',
        note: 'Cách củng cố: Giảm ma sát môi trường tối đa'
      }
    ],
    exercise: {
      question: 'Để loại bỏ một thói quen xấu, nguyên tắc tối ưu nhất tác động vào bước Gợi ý (Cue) là gì?',
      options: [
        'Cố gắng chịu đựng cơn thèm muốn bằng ý chí sắt đá',
        'Làm cho tín hiệu gợi ý trở nên vô hình (Make it invisible)',
        'Tự phạt bản thân mỗi khi vi phạm',
        'Tăng thêm việc cần làm để quên đi'
      ],
      correctIndex: 1,
      explanation: 'Chính xác! "Make it invisible" (làm cho nó vô hình) là quy tắc đảo ngược số 1 của Atomic Habits. Loại bỏ tín hiệu kích hoạt là cách phòng bệnh từ gốc.'
    },
    relatedArticleSlug: 'ky-luat-khong-phai-lam-nhieu-hon',
    relatedQuizId: 'quiz-growth-01',
    prevLessonSlug: undefined,
    nextLessonSlug: 'gr-thiet-ke-khong-gian-deep-work'
  },

  // --- LESSON 5: SỨC KHỎE (TDEE & Macro) ---
  {
    id: 'les-hl-01',
    courseSlug: 'khoa-hoc-the-luc-dinh-duong-phuc-hoi',
    courseTitle: 'KHOA HỌC THỂ LỰC, DINH DƯỠNG & PHỤC HỒI TOÀN DIỆN',
    categoryId: 'suc-khoe-doi-song',
    categoryName: 'SỨC KHỎE & ĐỜI SỐNG',
    title: 'Tính toán TDEE và nhu cầu đa lượng Protein - Carb - Fat',
    slug: 'hl-tinh-toan-tdee-macro',
    order: 1,
    totalLessonsInCourse: 24,
    duration: '22 phút',
    summary: 'Làm chủ định luật nhiệt động lực học trong quản lý cân nặng: Cách tính BMR, TDEE và phân bổ tỷ lệ các chất đa lượng (Macronutrients) khoa học.',
    content: [
      'Mọi trào lưu ăn kiêng (Keto, Carnivore, Intermittent Fasting, Low Carb) đều phải tuân thủ một định luật vật lý cơ bản: Cân bằng năng lượng (Energy Balance). Năng lượng nạp vào (Calories In) so với Năng lượng tiêu hao (Calories Out).',
      'TDEE (Total Daily Energy Expenditure) là tổng mức năng lượng cơ thể bạn đốt cháy trong 24 giờ, bao gồm 4 thành phần: BMR (chuyển hóa cơ bản khi nghỉ ngơi), NEAT (vận động tự nhiên ngoài tập luyện như đi bộ, đứng, cử động), TEF (nhiệt sinh học từ tiêu hóa thức ăn) và EAT (năng lượng tiêu hao trong các buổi tập thể dục).',
      'Chỉ số quan trọng nhất cần tối ưu khi thiết lập dinh dưỡng là Protein: người trưởng thành vận động nên nạp từ 1.6g đến 2.2g Protein trên mỗi kg trọng lượng cơ thể để bảo tồn khối lượng cơ nạc.'
    ],
    keyPoints: [
      'BMR chiếm tới 60-70% tổng năng lượng tiêu hao hàng ngày.',
      'NEAT (đi lại, làm việc nhà) tiêu hao nhiều năng lượng hơn bạn nghĩ, thường vượt xa 45 phút chạy bộ trên máy.',
      'Protein có hiệu ứng sinh nhiệt tiêu hóa (TEF) cao nhất (20-30%), giúp bạn no lâu hơn và đốt cháy năng lượng ngay khi tiêu hóa.'
    ],
    examples: [
      {
        label: 'Ví dụ tính toán',
        target: 'Người nặng 65kg, ít vận động (TDEE ~ 1.900 kcal)',
        translation: 'Muốn giảm mỡ lành mạnh: Nạp 1.600 kcal (thâm hụt 300 kcal nhẹ nhàng)',
        note: 'Phân bổ: 130g Protein (520 kcal) + 55g Fat (495 kcal) + 146g Carb (585 kcal)'
      }
    ],
    exercise: {
      question: 'Thành phần nào chiếm tỷ trọng lớn nhất trong tổng mức tiêu hao năng lượng hàng ngày (TDEE) của một người bình thường?',
      options: [
        'Năng lượng tập gym (EAT)',
        'Hiệu ứng tiêu hóa thức ăn (TEF)',
        'Mức chuyển hóa cơ bản duy trì sự sống (BMR)',
        'Năng lượng đi lại mua sắm (NEAT)'
      ],
      correctIndex: 2,
      explanation: 'Chính xác! BMR (Basal Metabolic Rate) chiếm khoảng 60-70% tổng năng lượng cơ thể sử dụng để duy trì chức năng tim, phổi, não, gan khi nghỉ ngơi hoàn toàn.'
    },
    relatedArticleSlug: 'van-dong-hang-ngay-co-y-nghia-gi',
    relatedQuizId: 'quiz-health-01',
    prevLessonSlug: undefined,
    nextLessonSlug: 'hl-duong-huyet-on-dinh'
  }
];
