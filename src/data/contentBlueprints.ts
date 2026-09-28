import { LessonContentBlueprint } from '../types/content';

export const LESSON_CONTENT_BLUEPRINTS: LessonContentBlueprint[] = [
  {
    lessonSlug: 'en-linking-consonant-to-vowel',
    category: 'tieng-anh',
    learningObjective: [
      'Nhận diện C→V linking bằng âm thanh thay vì mặt chữ.',
      'Tự nối ít nhất 8 cụm từ thông dụng ở tốc độ hội thoại.',
      'Dùng shadowing 3 vòng: chậm → tự nhiên → không nhìn transcript.'
    ],
    prerequisite: ['Biết nguyên âm/phụ âm cơ bản và trọng âm từ.'],
    hook: 'Bạn không nghe kịp tiếng Anh không hẳn vì người ta nói quá nhanh; nhiều khi bạn đang chờ những ranh giới giữa các từ mà người nói không tạo ra.',
    misconception: 'Linking là “nuốt chữ”. Thực tế, mục tiêu là giữ luồng âm liên tục; âm cuối vẫn tồn tại nhưng được tái phân bố trong chuỗi âm thanh.',
    coreIdea: 'Nếu một từ kết thúc bằng phụ âm và từ sau bắt đầu bằng nguyên âm, hãy luyện nghe chúng như một cụm âm thanh duy nhất.',
    practicalChallenge: 'Shadow 10 lần: pick it up, turn it off, hold on, take it away; sau đó tự ghi âm và so sánh nhịp nối.',
    spacedReview: [
      'Sau 1 ngày: nghe và đánh dấu vị trí nối âm trong 5 câu mới.',
      'Sau 3 ngày: đọc lại không nhìn IPA.',
      'Sau 7 ngày: nghe đoạn hội thoại mới và ghi ra các cụm đã nối.'
    ],
    crossLabLinks: ['Vocabulary Lab: phrasal verbs', 'Grammar Lab: imperatives & requests', 'Listening Lab: At the Coffee Shop', 'Speaking Lab: shadowing'],
    sources: [
      { title: 'CEFR Companion Volume / CEFR descriptors', publisher: 'Council of Europe', url: 'https://www.coe.int/en/web/common-european-framework-reference-languages/cefr-descriptors', usage: 'framework' },
      { title: 'Pronunciation and connected speech teaching resources', publisher: 'British Council', url: 'https://www.teachingenglish.org.uk/', usage: 'teaching-method' }
    ],
    aiVideo: {
      id: 'ai-video-en-linking',
      title: 'AI Visual Lesson: 60 giây để “nghe thấy” nối âm',
      format: 'visual-dialogue',
      targetMinutes: 3,
      voiceLanguage: 'vi',
      status: 'script-ready',
      scenes: [
        { id: 's1', durationSeconds: 20, visual: 'Hai từ đứng tách rời trên màn hình, giữa chúng là một khoảng trống lớn; sau đó khoảng trống co lại thành một đường âm thanh.', narration: 'Hãy tưởng tượng bạn đang nghe “pick... it... up”. Người học thường chờ ba từ riêng biệt. Người bản ngữ thường tạo thành một dòng âm thanh liền nhau.', onScreen: ['PICK · IT · UP', '→ PICK-IT-UP'] },
        { id: 's2', durationSeconds: 30, visual: 'Hoạt hình khẩu hình: âm /k/ trượt sang nguyên âm /ɪ/.', narration: 'Điểm quan trọng không phải chữ cái mà là âm cuối và âm đầu. Pick kết thúc bằng /k/, it bắt đầu bằng /ɪ/, vì vậy /k/ nối thẳng sang /ɪ/.', onScreen: ['/k/ + /ɪ/', 'pick it → /pɪkɪt/'] },
        { id: 's3', durationSeconds: 30, visual: 'Waveform chuyển từ các đoạn rời sang một đường liên tục.', narration: 'Đừng cố nói nhanh. Hãy nói chậm nhưng không cắt luồng hơi giữa các từ.', onScreen: ['LIÊN TỤC ≠ NHANH'] },
        { id: 's4', durationSeconds: 35, visual: 'Bốn tình huống đời thực: gọi điện, gọi món, hỏi đường, họp.', narration: 'Bây giờ hãy nghe bốn cụm thực tế: hold on, turn it off, take it away, pick it up.', onScreen: ['HOLD ON', 'TURN IT OFF', 'TAKE IT AWAY', 'PICK IT UP'], interaction: 'Dừng video và đọc lại từng cụm 3 lần.' },
        { id: 's5', durationSeconds: 30, visual: 'Thanh tiến độ shadowing 3 vòng.', narration: 'Vòng một nhìn transcript. Vòng hai chỉ nhìn từ khóa. Vòng ba bỏ transcript và bắt chước nhịp.', onScreen: ['ROUND 1 · READ', 'ROUND 2 · SHADOW', 'ROUND 3 · RECALL'] },
        { id: 's6', durationSeconds: 25, visual: 'Mini challenge với câu “Can you pick it up for me?”.', narration: 'Thử thách cuối: nói câu này như một chuỗi âm thanh tự nhiên. Sau đó chuyển ngay sang Listening Lab.', onScreen: ['CAN YOU PICK IT UP FOR ME?', '→ LISTEN → SPEAK → REVIEW'] }
      ]
    }
  },
  {
    lessonSlug: 'en-vowel-to-vowel-glide',
    category: 'tieng-anh',
    learningObjective: [
      'Phân biệt /j/ và /w/ trong vowel-to-vowel linking.',
      'Nhận diện âm lướt trong hội thoại tự nhiên.',
      'Áp dụng vào 6 cụm câu giao tiếp.'
    ],
    hook: 'Hai nguyên âm đứng cạnh nhau có thể tạo cảm giác “gãy” nếu bạn đọc từng từ; âm lướt là chiếc cầu nhỏ giúp câu nói mượt hơn.',
    misconception: 'Âm /j/ hoặc /w/ là một từ mới. Không; nó chỉ là chuyển động nối giữa hai nguyên âm trong dòng nói.',
    coreIdea: 'Khi hai nguyên âm gặp nhau, người nói có thể tạo âm lướt để nối mượt; hãy ưu tiên nghe và bắt chước thay vì ép mình nhớ một quy tắc cứng.',
    practicalChallenge: 'Shadow các cụm: see it, I agree, go on, do it, how are you.',
    spacedReview: ['Sau 24 giờ: phân loại 10 cụm theo /j/ hoặc /w/.', 'Sau 4 ngày: shadow một đoạn hội thoại 30 giây.', 'Sau 7 ngày: tự tạo 5 câu và ghi âm.'],
    crossLabLinks: ['Pronunciation/Grammar Lab', 'Listening Lab', 'Speaking Lab'],
    sources: [
      { title: 'CEFR Companion Volume / phonological competence', publisher: 'Council of Europe', url: 'https://www.coe.int/en/web/common-european-framework-reference-languages', usage: 'framework' },
      { title: 'TeachingEnglish pronunciation resources', publisher: 'British Council', url: 'https://www.teachingenglish.org.uk/', usage: 'teaching-method' }
    ],
    aiVideo: {
      id: 'ai-video-en-glide',
      title: 'AI Visual Lesson: Âm lướt /j/ & /w/',
      format: 'whiteboard',
      targetMinutes: 3,
      voiceLanguage: 'vi',
      status: 'script-ready',
      scenes: [
        { id: 's1', durationSeconds: 25, visual: 'Hai nguyên âm tiến lại gần nhau như hai khối hình học.', narration: 'Khi hai nguyên âm chạm nhau, miệng cần chuyển vị trí rất nhanh. Âm lướt giúp chuyển động này liền mạch.', onScreen: ['VOWEL + VOWEL', '→ GLIDE'] },
        { id: 's2', durationSeconds: 30, visual: 'Khẩu hình môi bẹt chuyển sang âm /j/.', narration: 'Sau các nguyên âm phía trước như trong see hoặc I, bạn có thể nghe một âm /j/ rất nhẹ.', onScreen: ['SEE IT → /siː jɪt/', 'I AGREE → /aɪ jəˈɡriː/'] },
        { id: 's3', durationSeconds: 30, visual: 'Khẩu hình môi tròn chuyển sang âm /w/.', narration: 'Với các nguyên âm tròn như go hoặc do, âm /w/ thường tạo cây cầu tự nhiên.', onScreen: ['GO ON → /ɡoʊ wɒn/', 'DO IT → /duː wɪt/'] },
        { id: 's4', durationSeconds: 35, visual: 'Bảng so sánh /j/ và /w/.', narration: 'Đừng phát âm âm lướt quá mạnh. Nó phải gần như vô hình với người nghe.', onScreen: ['/j/ · môi bẹt', '/w/ · môi tròn'] },
        { id: 's5', durationSeconds: 35, visual: 'Đoạn hội thoại ở quán cà phê với các điểm nối sáng lên.', narration: 'Nghe toàn câu và tìm âm lướt thay vì nghe từng từ.', onScreen: ['Could you get it?', 'Go on.', 'How are you?'], interaction: 'Dừng video tại mỗi điểm nối và lặp lại.' },
        { id: 's6', durationSeconds: 25, visual: 'Challenge card.', narration: 'Tạo ba câu có vowel-to-vowel linking và nói liên tục một hơi.', onScreen: ['3 CÂU · 1 TAKE · KHÔNG DỊCH'] }
      ]
    }
  },
  {
    lessonSlug: 'zh-pinyin-nguyen-am-phu-am',
    category: 'tieng-trung',
    learningObjective: [
      'Phân biệt cặp bật hơi/không bật hơi trong Pinyin.',
      'Dùng “tờ giấy trước miệng” để tự kiểm tra luồng hơi.',
      'Đọc được các cặp b/p, d/t, g/k ở tốc độ chậm chính xác.'
    ],
    hook: 'Nếu Pinyin khiến bạn phát âm “đúng chữ nhưng sai người”, hãy bỏ chữ viết sang một bên và bắt đầu bằng luồng hơi.',
    misconception: 'b/p, d/t, g/k chỉ khác nhau ở chữ Latin. Thực tế, trong tiếng Quan thoại, đối lập bật hơi là một đặc điểm quan trọng.',
    coreIdea: 'Học Pinyin theo cặp âm và cảm giác cơ thể: vị trí lưỡi/môi + luồng hơi + thanh điệu.',
    practicalChallenge: 'Đọc 6 cặp tối thiểu trước gương và kiểm tra bằng mảnh giấy.',
    spacedReview: ['Ngày 1: b/p, d/t, g/k.', 'Ngày 3: j/q, zh/ch, z/c.', 'Ngày 7: đọc từ mới mà không nhìn chú thích tiếng Việt.'],
    crossLabLinks: ['Vocabulary Lab: HSK 1', 'Listening Lab: Chinese everyday', 'Speaking Lab: pronunciation'],
    sources: [
      { title: 'CEFR language-learning framework', publisher: 'Council of Europe', url: 'https://www.coe.int/en/web/common-european-framework-reference-languages', usage: 'framework' },
      { title: 'Chinese Proficiency Test ecosystem', publisher: 'Chinese Testing International', url: 'https://www.chinesetest.cn/', usage: 'framework' }
    ],
    aiVideo: {
      id: 'ai-video-zh-pinyin',
      title: 'AI Visual Lesson: Pinyin bằng khẩu hình + luồng hơi',
      format: 'whiteboard',
      targetMinutes: 4,
      voiceLanguage: 'vi',
      status: 'script-ready',
      scenes: [
        { id: 's1', durationSeconds: 25, visual: 'Màn hình chia đôi: b và p, có đồng hồ đo luồng hơi.', narration: 'Đừng học b và p như hai chữ cái. Hãy học chúng như hai cách điều khiển luồng hơi.', onScreen: ['b = không bật hơi', 'p = bật hơi'] },
        { id: 's2', durationSeconds: 35, visual: 'Hoạt hình tờ giấy trước miệng.', narration: 'Đặt một mảnh giấy mỏng trước miệng. Với p, bạn phải nhìn thấy giấy rung rõ hơn.', onScreen: ['P → AIR ↑', 'B → AIR ↓'] },
        { id: 's3', durationSeconds: 35, visual: 'So sánh d/t bằng vị trí đầu lưỡi.', narration: 'Tiếp theo là d và t. Hãy cảm nhận sự khác biệt bằng luồng hơi, không phải bằng việc cố tìm âm “đ” tiếng Việt.', onScreen: ['d / t', 'POSITION + AIR'] },
        { id: 's4', durationSeconds: 40, visual: 'Bảng 6 cặp âm và ví dụ ngắn.', narration: 'Bây giờ ghép âm vào từ. Mỗi từ được nghe hai lần: chậm và tự nhiên.', onScreen: ['bā / pā', 'dà / tà', 'gā / kā'] },
        { id: 's5', durationSeconds: 35, visual: 'Quiz trực quan: chọn âm đúng theo animation luồng hơi.', narration: 'Không nhìn chữ. Chỉ nhìn luồng hơi và chọn âm bạn nghe thấy.', onScreen: ['NGHE → CHỌN → GIẢI THÍCH'], interaction: 'Tạm dừng trước mỗi đáp án.' },
        { id: 's6', durationSeconds: 30, visual: 'Camera-style speaking challenge.', narration: 'Nói ba cặp âm vào điện thoại. Sau đó mở Speaking Lab để tự kiểm tra.', onScreen: ['3 PAIRS · 1 TAKE · SPEAKING LAB'] }
      ]
    }
  },
  {
    lessonSlug: 'gr-vong-lap-thoi-quen-cue-reward',
    category: 'phat-trien-ban-than',
    learningObjective: [
      'Mô tả một thói quen bằng 4 bước cue → craving → response → reward.',
      'Tìm một điểm can thiệp nhỏ thay vì dựa hoàn toàn vào ý chí.',
      'Thiết kế một thử nghiệm 7 ngày có thể đo được.'
    ],
    hook: 'Muốn thay đổi một hành vi lặp lại? Đừng bắt đầu bằng câu “mình phải kỷ luật hơn”. Hãy bắt đầu bằng câu “điều gì đang kích hoạt hành vi này?”.',
    misconception: 'Thói quen xấu chỉ là vấn đề ý chí. Môi trường, tín hiệu và phần thưởng cũng định hình hành vi.',
    coreIdea: 'Thay đổi hành vi bền vững thường bắt đầu bằng việc quan sát vòng lặp và thay đổi một mắt xích có đòn bẩy cao.',
    practicalChallenge: 'Chọn một hành vi xảy ra ít nhất 3 lần/tuần, ghi lại cue và reward trong 7 ngày, rồi thử thay đổi một yếu tố.',
    spacedReview: ['Ngày 1: vẽ vòng lặp của một thói quen.', 'Ngày 4: kiểm tra dữ liệu thực tế.', 'Ngày 7: viết post-mortem 5 dòng và quyết định thử nghiệm tiếp theo.'],
    crossLabLinks: ['Daily Learning', 'Progress', 'AI Tutor', 'Learning Path'],
    sources: [
      { title: 'Organizing Instruction and Study to Improve Student Learning', publisher: 'Institute of Education Sciences', url: 'https://ies.ed.gov/ncee/wwc/PracticeGuide/1', usage: 'teaching-method' }
    ],
    aiVideo: {
      id: 'ai-video-habit-loop',
      title: 'AI Visual Lesson: Bóc tách một thói quen trong 3 phút',
      format: 'scenario',
      targetMinutes: 3,
      voiceLanguage: 'vi',
      status: 'script-ready',
      scenes: [
        { id: 's1', durationSeconds: 25, visual: 'Một người vừa thức dậy và tự động mở điện thoại; timeline hiện lên.', narration: 'Hãy xem một hành vi rất quen thuộc: vừa thức dậy đã mở điện thoại.', onScreen: ['CUE → PHONE'] },
        { id: 's2', durationSeconds: 35, visual: 'Vòng tròn 4 bước xuất hiện quanh nhân vật.', narration: 'Thay vì gọi đó là “thiếu kỷ luật”, ta tách nó thành tín hiệu, khao khát, phản hồi và phần thưởng.', onScreen: ['CUE', 'CRAVING', 'RESPONSE', 'REWARD'] },
        { id: 's3', durationSeconds: 35, visual: 'Cận cảnh các trigger: điện thoại trên bàn, notification, cảm giác chán.', narration: 'Điểm thú vị là bạn có thể can thiệp trước khi hành vi xảy ra: đổi tín hiệu, đổi ma sát hoặc đổi phần thưởng.', onScreen: ['THAY CUE', 'GIẢM MA SÁT', 'ĐỔI REWARD'] },
        { id: 's4', durationSeconds: 35, visual: 'Hai timeline 7 ngày: không đo vs có đo.', narration: 'Một thử nghiệm tốt phải nhỏ và đo được. Ví dụ: để điện thoại ngoài phòng ngủ trong 7 ngày và ghi lại số buổi bạn mở máy trong 10 phút đầu.', onScreen: ['7-DAY EXPERIMENT', 'MEASURE → REVIEW'] },
        { id: 's5', durationSeconds: 30, visual: 'Dashboard mini với streak và biểu đồ.', narration: 'Bensop sẽ biến thử nghiệm thành dữ liệu: bạn làm được bao nhiêu ngày, ở thời điểm nào dễ thất bại và điều gì hiệu quả.', onScreen: ['TRACK', 'REFLECT', 'ADJUST'] },
        { id: 's6', durationSeconds: 20, visual: 'Challenge card.', narration: 'Viết một vòng lặp của chính bạn ngay bây giờ. Không cần hoàn hảo; chỉ cần cụ thể.', onScreen: ['MY HABIT = ?', 'MY NEXT EXPERIMENT = ?'] }
      ]
    }
  },
  {
    lessonSlug: 'hl-tinh-toan-tdee-macro',
    category: 'suc-khoe-doi-song',
    learningObjective: [
      'Hiểu TDEE là tổng của nhiều thành phần tiêu hao năng lượng.',
      'Biết vì sao công thức chỉ là điểm bắt đầu và cần đối chiếu dữ liệu thực tế.',
      'Tạo một kế hoạch theo dõi 2–3 tuần thay vì thay đổi quá nhiều biến cùng lúc.'
    ],
    hook: 'TDEE không phải một con số “thần kỳ”. Nó là một ước tính để bắt đầu một vòng lặp đo lường và điều chỉnh.',
    misconception: 'Một công thức TDEE có thể cho ra con số chính xác tuyệt đối cho từng người. Thực tế, mức tiêu hao thay đổi theo cơ thể, hoạt động và thời gian.',
    coreIdea: 'Dùng ước tính năng lượng như công cụ định hướng; sau đó theo dõi xu hướng cân nặng, hoạt động và mức ăn để điều chỉnh có kiểm soát.',
    practicalChallenge: 'Ghi nhận mức ăn, hoạt động và cân nặng theo cùng một cách trong ít nhất 14 ngày trước khi kết luận.',
    spacedReview: ['Ngày 1: tính một ví dụ giả định.', 'Ngày 7: kiểm tra dữ liệu hoạt động.', 'Ngày 14: xem xu hướng thay vì một ngày đơn lẻ.'],
    crossLabLinks: ['Health articles', 'Daily Learning', 'Progress'],
    sources: [
      { title: 'Physical activity guidelines', publisher: 'World Health Organization', url: 'https://www.who.int/europe/news-room/fact-sheets/item/physical-activity', usage: 'fact-check' },
      { title: 'About Sleep', publisher: 'CDC', url: 'https://www.cdc.gov/sleep/about/', usage: 'fact-check' }
    ],
    aiVideo: {
      id: 'ai-video-tdee',
      title: 'AI Visual Lesson: TDEE không phải “con số định mệnh”',
      format: 'whiteboard',
      targetMinutes: 4,
      voiceLanguage: 'vi',
      status: 'script-ready',
      scenes: [
        { id: 's1', durationSeconds: 30, visual: 'Một chiếc pin năng lượng với 4 dòng chảy: BMR, NEAT, EAT, TEF.', narration: 'TDEE là tổng năng lượng cơ thể sử dụng trong ngày. Hãy hình dung nó như bốn dòng chảy thay vì một con số đơn.', onScreen: ['BMR', 'NEAT', 'EAT', 'TEF'] },
        { id: 's2', durationSeconds: 40, visual: 'Biểu đồ minh họa các thành phần thay đổi theo ngày.', narration: 'Một ngày bạn đi bộ nhiều hơn, một ngày bạn ngồi nhiều hơn. Vì vậy TDEE thực tế luôn dao động.', onScreen: ['TDEE = ESTIMATE', 'REAL LIFE = VARIABLE'] },
        { id: 's3', durationSeconds: 40, visual: 'Ví dụ một người 65kg với bảng theo dõi 14 ngày.', narration: 'Thay vì tin tuyệt đối vào một công thức, hãy dùng nó làm điểm xuất phát rồi quan sát xu hướng trong nhiều ngày.', onScreen: ['START', 'TRACK 14 DAYS', 'ADJUST'] },
        { id: 's4', durationSeconds: 40, visual: 'WHO recommendation card về hoạt động thể chất.', narration: 'Một nền tảng sức khỏe tốt không chỉ là calories. WHO khuyến nghị người trưởng thành nên có 150 đến 300 phút hoạt động aerobic cường độ vừa mỗi tuần, cùng hoạt động tăng cường cơ ít nhất hai ngày.', onScreen: ['150–300 MIN/WEEK', 'STRENGTH ≥ 2 DAYS'] },
        { id: 's5', durationSeconds: 35, visual: 'Bảng “đừng thay 4 biến cùng lúc”.', narration: 'Nếu muốn hiểu điều gì đang hiệu quả, đừng đổi khẩu phần, lịch tập, giấc ngủ và mọi thứ cùng một lúc. Hãy thay đổi từng biến có chủ đích.', onScreen: ['ONE CHANGE', 'MEASURE', 'REVIEW'] },
        { id: 's6', durationSeconds: 25, visual: 'Checklist an toàn.', narration: 'Nếu bạn có bệnh nền, đang mang thai, hoặc có vấn đề sức khỏe đặc biệt, hãy trao đổi với chuyên gia y tế trước khi thay đổi chế độ ăn hoặc tập luyện đáng kể.', onScreen: ['EDUCATION ≠ MEDICAL DIAGNOSIS'] }
      ]
    }
  }
];

export const getLessonContentBlueprint = (lessonSlug: string) =>
  LESSON_CONTENT_BLUEPRINTS.find((item) => item.lessonSlug === lessonSlug);
