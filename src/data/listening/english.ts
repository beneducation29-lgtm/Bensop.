import { ListeningLesson } from '../../types/listening';

export const ENGLISH_LISTENING_LESSONS: ListeningLesson[] = [
  {
    id: 'en-listen-01',
    language: 'en',
    title: 'At the Coffee Shop',
    slug: 'at-the-coffee-shop',
    level: 'A2',
    topic: 'Daily Life',
    duration: 134, // 02:14
    difficulty: 'Elementary',
    tags: ['ordering', 'everyday english', 'coffee', 'polite requests'],
    vocabularyIds: ['en-vocab-res-01', 'en-vocab-adapt-02'],
    grammarIds: ['en-present-simple', 'en-future-simple'],
    questionIds: ['en-lq-01', 'en-lq-02', 'en-lq-03'],
    comprehensionPoints: [
      'Anna asks John about his drink preferences.',
      'John prefers oat milk instead of whole milk.',
      'Anna offers a pastry promotion with 20% discount.'
    ],
    culturalNote: 'In American and European coffee culture, barista tips and milk alternatives (oat, almond, soy) are very common customs.',
    createdAt: '2026-03-01',
    updatedAt: '2026-03-10',
    transcript: `BARISTA: Hi there! Welcome to Bean & Leaf. What can I get started for you today?
JOHN: Hi! Could I please get a medium iced latte?
BARISTA: Sure thing! What type of milk would you prefer? We have whole milk, skim, oat, and almond milk.
JOHN: Oat milk, please. And could you make it half-sweet?
BARISTA: Half-sweet oat latte, got it. Any pastry or snack to go with that? We have fresh blueberry muffins right out of the oven.
JOHN: That sounds tempting! Let's add one blueberry muffin, please.
BARISTA: Perfect! That will be six dollars and fifty cents altogether. Card or cash?
JOHN: Card, please. Here is my contactless card.
BARISTA: Tap right here... all set! Your order will be ready at the pick-up counter in just two minutes. Thanks John!`,
    transcriptSegments: [
      {
        id: 'seg-en-01-1',
        startTime: 0,
        endTime: 4.5,
        speaker: 'BARISTA',
        text: 'Hi there! Welcome to Bean & Leaf. What can I get started for you today?',
        translation: 'Xin chào! Chào mừng bạn đến Bean & Leaf. Tôi có thể lấy gì cho bạn hôm nay?'
      },
      {
        id: 'seg-en-01-2',
        startTime: 4.5,
        endTime: 8.5,
        speaker: 'JOHN',
        text: 'Hi! Could I please get a medium iced latte?',
        translation: 'Chào bạn! Cho mình xin một ly latte đá cỡ vừa được không?'
      },
      {
        id: 'seg-en-01-3',
        startTime: 8.5,
        endTime: 16.0,
        speaker: 'BARISTA',
        text: 'Sure thing! What type of milk would you prefer? We have whole milk, skim, oat, and almond milk.',
        translation: 'Dạ được chứ! Bạn muốn dùng loại sữa nào? Quán có sữa tươi nguyên kem, tách béo, sữa yến mạch và sữa hạnh nhân.'
      },
      {
        id: 'seg-en-01-4',
        startTime: 16.0,
        endTime: 21.0,
        speaker: 'JOHN',
        text: 'Oat milk, please. And could you make it half-sweet?',
        translation: 'Cho mình sữa yến mạch nhé. Và bạn làm ngọt một nửa giúp mình được không?'
      },
      {
        id: 'seg-en-01-5',
        startTime: 21.0,
        endTime: 29.0,
        speaker: 'BARISTA',
        text: 'Half-sweet oat latte, got it. Any pastry or snack to go with that? We have fresh blueberry muffins right out of the oven.',
        translation: 'Latte yến mạch nửa ngọt, đã ghi nhận. Bạn có muốn dùng thêm bánh ngọt gì không? Bánh muffin việt quất vừa mới ra lò nóng hổi đây.'
      },
      {
        id: 'seg-en-01-6',
        startTime: 29.0,
        endTime: 34.0,
        speaker: 'JOHN',
        text: "That sounds tempting! Let's add one blueberry muffin, please.",
        translation: 'Nghe hấp dẫn quá! Cho mình thêm một chiếc bánh muffin việt quất nhé.'
      },
      {
        id: 'seg-en-01-7',
        startTime: 34.0,
        endTime: 41.5,
        speaker: 'BARISTA',
        text: 'Perfect! That will be six dollars and fifty cents altogether. Card or cash?',
        translation: 'Tuyệt vời! Tổng cộng của bạn hết sáu đô năm mươi xu. Bạn thanh toán thẻ hay tiền mặt?'
      },
      {
        id: 'seg-en-01-8',
        startTime: 41.5,
        endTime: 46.0,
        speaker: 'JOHN',
        text: 'Card, please. Here is my contactless card.',
        translation: 'Mình trả thẻ. Đây là thẻ chạm của mình.'
      },
      {
        id: 'seg-en-01-9',
        startTime: 46.0,
        endTime: 54.0,
        speaker: 'BARISTA',
        text: 'Tap right here... all set! Your order will be ready at the pick-up counter in just two minutes. Thanks John!',
        translation: 'Chạm ngay đây ạ... Xong rồi! Đồ uống của bạn sẽ có ở quầy nhận đồ sau hai phút nữa nhé. Cảm ơn bạn!'
      }
    ]
  },
  {
    id: 'en-listen-02',
    language: 'en',
    title: 'Airport Check-in & Security',
    slug: 'airport-check-in-and-security',
    level: 'B1',
    topic: 'Travel',
    duration: 165,
    difficulty: 'Intermediate',
    tags: ['airport', 'travel', 'luggage', 'flight'],
    vocabularyIds: [],
    grammarIds: ['en-present-perfect'],
    questionIds: ['en-lq-04', 'en-lq-05'],
    comprehensionPoints: [
      'The passenger is flying to Tokyo with one checked suitcase.',
      'Hand luggage must not exceed 7 kilograms.',
      'The boarding gate is B24 and boarding begins at 14:15.'
    ],
    createdAt: '2026-03-01',
    updatedAt: '2026-03-10',
    transcript: `AGENT: Good afternoon. Where are you flying today?
PASSENGER: Good afternoon. I'm flying to Tokyo on flight NH892.
AGENT: May I have your passport and booking reference, please?
PASSENGER: Here you go. I have already checked in online, but I need to check one piece of luggage.
AGENT: Please place your suitcase onto the scale. It weighs 18 kilos, well within your 23-kilo allowance.
PASSENGER: Wonderful. Can I keep my backpack as a carry-on?
AGENT: Yes, carry-on bags must fit under the seat in front or in the overhead compartment. Here is your boarding pass.
PASSENGER: Which gate should I head to?
AGENT: You are departing from Gate B24. Boarding starts at 2:15 PM sharp. Have a wonderful flight!`,
    transcriptSegments: [
      { id: 'seg-en-02-1', startTime: 0, endTime: 3.5, speaker: 'AGENT', text: 'Good afternoon. Where are you flying today?', translation: 'Xin chào buổi chiều. Bạn sẽ bay đi đâu hôm nay?' },
      { id: 'seg-en-02-2', startTime: 3.5, endTime: 8.0, speaker: 'PASSENGER', text: "Good afternoon. I'm flying to Tokyo on flight NH892.", translation: 'Chào chị. Tôi bay đi Tokyo trên chuyến bay NH892.' },
      { id: 'seg-en-02-3', startTime: 8.0, endTime: 13.0, speaker: 'AGENT', text: 'May I have your passport and booking reference, please?', translation: 'Cho tôi xin hộ chiếu và mã đặt chỗ của bạn nhé?' },
      { id: 'seg-en-02-4', startTime: 13.0, endTime: 20.0, speaker: 'PASSENGER', text: 'Here you go. I have already checked in online, but I need to check one piece of luggage.', translation: 'Gửi chị. Tôi đã làm thủ tục online rồi, nhưng cần ký gửi một kiện hành lý.' },
      { id: 'seg-en-02-5', startTime: 20.0, endTime: 27.5, speaker: 'AGENT', text: 'Please place your suitcase onto the scale. It weighs 18 kilos, well within your 23-kilo allowance.', translation: 'Mời bạn đặt vali lên bàn cân. Vali nặng 18 kg, nằm trong mức quy định 23 kg.' },
      { id: 'seg-en-02-6', startTime: 27.5, endTime: 32.0, speaker: 'PASSENGER', text: 'Wonderful. Can I keep my backpack as a carry-on?', translation: 'Tuyệt quá. Tôi có thể mang balo làm hành lý xách tay chứ?' },
      { id: 'seg-en-02-7', startTime: 32.0, endTime: 40.0, speaker: 'AGENT', text: 'Yes, carry-on bags must fit under the seat in front or in the overhead compartment. Here is your boarding pass.', translation: 'Vâng, hành lý xách tay phải vừa dưới ghế phía trước hoặc trong khoang hành lý phía trên. Đây là thẻ lên máy bay của bạn.' },
      { id: 'seg-en-02-8', startTime: 40.0, endTime: 44.0, speaker: 'PASSENGER', text: 'Which gate should I head to?', translation: 'Tôi nên đến cổng nào?' },
      { id: 'seg-en-02-9', startTime: 44.0, endTime: 51.0, speaker: 'AGENT', text: 'You are departing from Gate B24. Boarding starts at 2:15 PM sharp. Have a wonderful flight!', translation: 'Bạn sẽ khởi hành từ Cổng B24. Giờ lên máy bay bắt đầu lúc 14:15 đúng. Chúc bạn chuyến bay tốt đẹp!' }
    ]
  },
  {
    id: 'en-listen-03',
    language: 'en',
    title: 'Daily Stand-up Meeting',
    slug: 'daily-stand-up-meeting',
    level: 'B2',
    topic: 'Work',
    duration: 180,
    difficulty: 'Upper Intermediate',
    tags: ['agile', 'scrum', 'tech', 'workplace'],
    vocabularyIds: [],
    grammarIds: ['en-present-perfect-continuous'],
    questionIds: ['en-lq-06'],
    transcript: `SARAH: Good morning team! Let's do a quick ten-minute stand-up. Leo, do you want to kick things off?
LEO: Sure. Yesterday, I finished the authentication refactoring and deployed the hotfix for the payment webhook.
SARAH: Any blockers on your side?
LEO: None right now. Today I'll collaborate with Elena on the search indexing latency. We're seeing slight response degradation on large query payloads.
ELENA: Right, I ran benchmark tests this morning. Memory utilization spikes whenever complex filters are combined.
SARAH: Sounds like a critical path. Let's schedule an architectural sync right after lunch if needed.`,
    transcriptSegments: [
      { id: 'seg-en-03-1', startTime: 0, endTime: 6.0, speaker: 'SARAH', text: "Good morning team! Let's do a quick ten-minute stand-up. Leo, do you want to kick things off?", translation: 'Chào buổi sáng cả nhóm! Chúng ta bắt đầu buổi họp nhanh 10 phút nhé. Leo, bạn bắt đầu trước được không?' },
      { id: 'seg-en-03-2', startTime: 6.0, endTime: 14.0, speaker: 'LEO', text: 'Sure. Yesterday, I finished the authentication refactoring and deployed the hotfix for the payment webhook.', translation: 'Được chứ. Hôm qua tôi đã tái cấu trúc xong phần xác thực và triển khai bản sửa lỗi cho cổng thanh toán.' },
      { id: 'seg-en-03-3', startTime: 14.0, endTime: 17.5, speaker: 'SARAH', text: 'Any blockers on your side?', translation: 'Bạn có gặp trở ngại nào không?' },
      { id: 'seg-en-03-4', startTime: 17.5, endTime: 27.0, speaker: 'LEO', text: "None right now. Today I'll collaborate with Elena on the search indexing latency. We're seeing slight response degradation on large query payloads.", translation: 'Hiện tại thì không. Hôm nay tôi sẽ phối hợp với Elena về độ trễ lập chỉ mục tìm kiếm. Hệ thống đang chậm phản hồi khi truy vấn lớn.' },
      { id: 'seg-en-03-5', startTime: 27.0, endTime: 34.0, speaker: 'ELENA', text: 'Right, I ran benchmark tests this morning. Memory utilization spikes whenever complex filters are combined.', translation: 'Đúng vậy, sáng nay tôi đã chạy thử tải. Bộ nhớ tăng đột biến khi kết hợp nhiều bộ lọc phức tạp.' },
      { id: 'seg-en-03-6', startTime: 34.0, endTime: 42.0, speaker: 'SARAH', text: "Sounds like a critical path. Let's schedule an architectural sync right after lunch if needed.", translation: 'Nghe có vẻ rất quan trọng. Nếu cần thì chúng ta sẽ họp kỹ thuật ngay sau bữa trưa nhé.' }
    ]
  },
  {
    id: 'en-listen-04',
    language: 'en',
    title: 'Negotiating a Contract Deadline',
    slug: 'negotiating-a-contract-deadline',
    level: 'C1',
    topic: 'Business',
    duration: 195,
    difficulty: 'Advanced',
    tags: ['negotiation', 'business', 'deadlines', 'contracts'],
    vocabularyIds: [],
    grammarIds: ['en-conditionals-2-3'],
    questionIds: [],
    transcript: `MICHAEL: Thanks for jumping on this call, Claire. We reviewed the preliminary statement of work, and while we are generally aligned on the scope, the proposed Q3 delivery timeline strikes us as overly ambitious.
CLAIRE: I appreciate your candor, Michael. From our vantage point, compressing milestone two was necessary to accommodate your board meeting in late September.
MICHAEL: Understood. However, if we were to rush the quality assurance phase, we risk shipping regression bugs to enterprise clients. Would your team be receptive to phasing the release?
CLAIRE: Phasing is certainly viable. We could deploy the core engine by September 15th, with advanced analytics following in mid-October. That allows rigorous soak testing without stalling the pilot.`,
    transcriptSegments: [
      { id: 'seg-en-04-1', startTime: 0, endTime: 11.0, speaker: 'MICHAEL', text: 'Thanks for jumping on this call, Claire. We reviewed the preliminary statement of work, and while we are generally aligned on the scope, the proposed Q3 delivery timeline strikes us as overly ambitious.', translation: 'Cảm ơn Claire đã tham gia cuộc gọi. Chúng tôi đã xem xét bản đề cương công việc sơ bộ, dù nhìn chung thống nhất về phạm vi, nhưng mốc bàn giao Quý 3 có vẻ quá gấp.' },
      { id: 'seg-en-04-2', startTime: 11.0, endTime: 19.5, speaker: 'CLAIRE', text: 'I appreciate your candor, Michael. From our vantage point, compressing milestone two was necessary to accommodate your board meeting in late September.', translation: 'Tôi rất trân trọng sự thẳng thắn của anh. Theo góc nhìn của chúng tôi, việc rút ngắn mốc hai là để kịp cho cuộc họp hội đồng quản trị của các bạn vào cuối tháng 9.' },
      { id: 'seg-en-04-3', startTime: 19.5, endTime: 30.0, speaker: 'MICHAEL', text: 'Understood. However, if we were to rush the quality assurance phase, we risk shipping regression bugs to enterprise clients. Would your team be receptive to phasing the release?', translation: 'Tôi hiểu. Tuy nhiên nếu thúc ép khâu kiểm thử chất lượng, chúng ta có nguy cơ để lọt lỗi đến tay khách hàng doanh nghiệp. Phía bạn có thể chia giai đoạn phát hành không?' },
      { id: 'seg-en-04-4', startTime: 30.0, endTime: 42.0, speaker: 'CLAIRE', text: 'Phasing is certainly viable. We could deploy the core engine by September 15th, with advanced analytics following in mid-October. That allows rigorous soak testing without stalling the pilot.', translation: 'Chia giai đoạn hoàn toàn khả thi. Chúng ta có thể bàn giao hệ thống lõi trước ngày 15/9, còn tính năng phân tích nâng cao bàn giao giữa tháng 10.' }
    ]
  },
  {
    id: 'en-listen-05',
    language: 'en',
    title: 'University Campus Tour',
    slug: 'university-campus-tour',
    level: 'B1',
    topic: 'Education',
    duration: 150,
    difficulty: 'Intermediate',
    tags: ['university', 'campus', 'student life', 'library'],
    vocabularyIds: [],
    grammarIds: ['en-passive-voice'],
    questionIds: [],
    transcript: `GUIDE: Welcome prospective students to Westlake University! Right behind me stands the historic Alden Memorial Library, constructed in 1912.
STUDENT: Excuse me, is the library open twenty-four seven during exam weeks?
GUIDE: Excellent question! Yes, during midterms and finals, the main reading hall remains open 24 hours with complimentary coffee provided by student council.
STUDENT: And where are freshmen dormitories located?
GUIDE: Just across the pedestrian footbridge on the north quadrangle. You can walk there in less than five minutes.`,
    transcriptSegments: [
      { id: 'seg-en-05-1', startTime: 0, endTime: 7.5, speaker: 'GUIDE', text: 'Welcome prospective students to Westlake University! Right behind me stands the historic Alden Memorial Library, constructed in 1912.', translation: 'Chào mừng các bạn sinh viên tương lai đến với Đại học Westlake! Ngay sau lưng tôi là Thư viện Tưởng niệm Alden lịch sử, được xây dựng năm 1912.' },
      { id: 'seg-en-05-2', startTime: 7.5, endTime: 13.0, speaker: 'STUDENT', text: 'Excuse me, is the library open twenty-four seven during exam weeks?', translation: 'Xin lỗi, thư viện có mở cửa 24/7 trong các tuần thi cử không ạ?' },
      { id: 'seg-en-05-3', startTime: 13.0, endTime: 22.5, speaker: 'GUIDE', text: 'Excellent question! Yes, during midterms and finals, the main reading hall remains open 24 hours with complimentary coffee provided by student council.', translation: 'Câu hỏi rất hay! Có chứ, trong mùa thi giữa kỳ và cuối kỳ, phòng đọc chính mở 24/24 và có phục vụ cà phê miễn phí từ hội sinh viên.' },
      { id: 'seg-en-05-4', startTime: 22.5, endTime: 26.5, speaker: 'STUDENT', text: 'And where are freshmen dormitories located?', translation: 'Còn ký túc xá cho sinh viên năm nhất nằm ở đâu ạ?' },
      { id: 'seg-en-05-5', startTime: 26.5, endTime: 34.0, speaker: 'GUIDE', text: 'Just across the pedestrian footbridge on the north quadrangle. You can walk there in less than five minutes.', translation: 'Ngay bên kia cầu đi bộ ở khu sân phía bắc. Các bạn chỉ mất chưa tới 5 phút đi bộ.' }
    ]
  },
  {
    id: 'en-listen-06',
    language: 'en',
    title: 'Ordering at an Italian Restaurant',
    slug: 'ordering-at-an-italian-restaurant',
    level: 'A2',
    topic: 'Food',
    duration: 140,
    difficulty: 'Elementary',
    tags: ['restaurant', 'dining', 'food', 'italian'],
    vocabularyIds: [],
    grammarIds: [],
    questionIds: [],
    transcript: `WAITER: Good evening! Are you ready to order, or would you like a few more minutes?
CUSTOMER: I think we're ready. What is the chef's special tonight?
WAITER: Tonight our chef prepared handmade fettuccine with wild truffles and parmesan crisps.
CUSTOMER: That sounds delicious. I'll take the fettuccine, and my partner would like the Margherita pizza with extra basil.
WAITER: Splendid choices. May I bring you sparkling or still water while you wait?
CUSTOMER: Still water with a slice of lemon, please.`,
    transcriptSegments: [
      { id: 'seg-en-06-1', startTime: 0, endTime: 5.0, speaker: 'WAITER', text: 'Good evening! Are you ready to order, or would you like a few more minutes?', translation: 'Chào buổi tối! Quý khách đã sẵn sàng gọi món hay cần thêm vài phút nữa ạ?' },
      { id: 'seg-en-06-2', startTime: 5.0, endTime: 10.0, speaker: 'CUSTOMER', text: "I think we're ready. What is the chef's special tonight?", translation: 'Tôi nghĩ chúng tôi đã sẵn sàng. Món đặc biệt của bếp trưởng tối nay là gì?' },
      { id: 'seg-en-06-3', startTime: 10.0, endTime: 18.0, speaker: 'WAITER', text: 'Tonight our chef prepared handmade fettuccine with wild truffles and parmesan crisps.', translation: 'Tối nay bếp trưởng làm món mì fettuccine thủ công sốt nấm cục rừng và bánh phô mai parmesan giòn.' },
      { id: 'seg-en-06-4', startTime: 18.0, endTime: 26.0, speaker: 'CUSTOMER', text: "That sounds delicious. I'll take the fettuccine, and my partner would like the Margherita pizza with extra basil.", translation: 'Nghe ngon quá. Cho tôi món fettuccine, và bạn tôi muốn pizza Margherita thêm lá húng tây.' },
      { id: 'seg-en-06-5', startTime: 26.0, endTime: 32.0, speaker: 'WAITER', text: 'Splendid choices. May I bring you sparkling or still water while you wait?', translation: 'Lựa chọn tuyệt vời. Tôi có thể mang nước khoáng có gas hay nước lọc trong lúc quý khách đợi ạ?' },
      { id: 'seg-en-06-6', startTime: 32.0, endTime: 37.0, speaker: 'CUSTOMER', text: 'Still water with a slice of lemon, please.', translation: 'Cho nước lọc kèm một lát chanh nhé.' }
    ]
  },
  {
    id: 'en-listen-07',
    language: 'en',
    title: 'Returning an Item at a Retail Store',
    slug: 'returning-an-item-at-a-retail-store',
    level: 'B1',
    topic: 'Shopping',
    duration: 145,
    difficulty: 'Intermediate',
    tags: ['shopping', 'refund', 'receipt', 'customer service'],
    vocabularyIds: [],
    grammarIds: [],
    questionIds: [],
    transcript: `CASHIER: Hello, how can I assist you today?
CUSTOMER: Hi. I purchased this wool sweater last Friday, but when I tried it on at home, the sleeves were slightly too short.
CASHIER: No problem at all. Do you have the original receipt and are the price tags still attached?
CUSTOMER: Yes, here is the sales slip, and the tags are untouched.
CASHIER: Wonderful. Would you prefer an exchange for a larger size, store credit, or a refund back to your original payment method?
CUSTOMER: A refund to my debit card would be great.`,
    transcriptSegments: [
      { id: 'seg-en-07-1', startTime: 0, endTime: 4.0, speaker: 'CASHIER', text: 'Hello, how can I assist you today?', translation: 'Xin chào, tôi có thể hỗ trợ gì cho bạn hôm nay?' },
      { id: 'seg-en-07-2', startTime: 4.0, endTime: 12.0, speaker: 'CUSTOMER', text: 'Hi. I purchased this wool sweater last Friday, but when I tried it on at home, the sleeves were slightly too short.', translation: 'Chào bạn. Tôi mua chiếc áo len này thứ Sáu tuần trước, nhưng về nhà mặc thử thì tay áo hơi ngắn.' },
      { id: 'seg-en-07-3', startTime: 12.0, endTime: 18.0, speaker: 'CASHIER', text: 'No problem at all. Do you have the original receipt and are the price tags still attached?', translation: 'Không sao cả. Bạn có giữ hóa đơn gốc và mác giá còn nguyên không?' },
      { id: 'seg-en-07-4', startTime: 18.0, endTime: 22.0, speaker: 'CUSTOMER', text: 'Yes, here is the sales slip, and the tags are untouched.', translation: 'Có chứ, đây là hóa đơn và mác vẫn còn nguyên vẹn.' },
      { id: 'seg-en-07-5', startTime: 22.0, endTime: 31.0, speaker: 'CASHIER', text: 'Wonderful. Would you prefer an exchange for a larger size, store credit, or a refund back to your original payment method?', translation: 'Tuyệt. Bạn muốn đổi kích cỡ lớn hơn, lấy điểm thưởng cửa hàng hay hoàn tiền về phương thức thanh toán ban đầu?' },
      { id: 'seg-en-07-6', startTime: 31.0, endTime: 36.0, speaker: 'CUSTOMER', text: 'A refund to my debit card would be great.', translation: 'Hoàn tiền vào thẻ ghi nợ giúp tôi là tốt nhất.' }
    ]
  },
  {
    id: 'en-listen-08',
    language: 'en',
    title: 'Catching Up with an Old Friend',
    slug: 'catching-up-with-an-old-friend',
    level: 'A2',
    topic: 'Relationships',
    duration: 130,
    difficulty: 'Elementary',
    tags: ['friendship', 'catching up', 'weekend', 'family'],
    vocabularyIds: [],
    grammarIds: [],
    questionIds: [],
    transcript: `EMMA: Mark! I cannot believe it's you! How long has it been?
MARK: Emma! Wow, it must be at least three years since graduation! You look fantastic.
EMMA: Thank you! Are you still living in Chicago?
MARK: No, I relocated to Austin six months ago for a software engineering role. The weather is so much warmer down there.
EMMA: That sounds like a wonderful adventure. Are you free this weekend for brunch?
MARK: Absolutely! Saturday morning works best for me. Let's exchange numbers.`,
    transcriptSegments: [
      { id: 'seg-en-08-1', startTime: 0, endTime: 5.0, speaker: 'EMMA', text: "Mark! I cannot believe it's you! How long has it been?", translation: 'Mark! Không thể tin được là gặp bạn ở đây! Bao lâu rồi nhỉ?' },
      { id: 'seg-en-08-2', startTime: 5.0, endTime: 11.0, speaker: 'MARK', text: 'Emma! Wow, it must be at least three years since graduation! You look fantastic.', translation: 'Emma! Oa, chắc cũng phải ít nhất 3 năm từ lúc tốt nghiệp rồi! Trông bạn tuyệt vời quá.' },
      { id: 'seg-en-08-3', startTime: 11.0, endTime: 15.0, speaker: 'EMMA', text: 'Thank you! Are you still living in Chicago?', translation: 'Cảm ơn bạn! Bạn vẫn sống ở Chicago chứ?' },
      { id: 'seg-en-08-4', startTime: 15.0, endTime: 22.5, speaker: 'MARK', text: 'No, I relocated to Austin six months ago for a software engineering role. The weather is so much warmer down there.', translation: 'Không, mình đã chuyển đến Austin 6 tháng trước để làm kỹ sư phần mềm. Thời tiết ở đó ấm hơn nhiều.' },
      { id: 'seg-en-08-5', startTime: 22.5, endTime: 27.5, speaker: 'EMMA', text: 'That sounds like a wonderful adventure. Are you free this weekend for brunch?', translation: 'Nghe như một trải nghiệm tuyệt vời. Cuối tuần này bạn có rảnh đi ăn brunch không?' },
      { id: 'seg-en-08-6', startTime: 27.5, endTime: 33.0, speaker: 'MARK', text: "Absolutely! Saturday morning works best for me. Let's exchange numbers.", translation: 'Chắc chắn rồi! Sáng thứ Bảy là tiện nhất cho mình. Chúng mình đổi số điện thoại nhé.' }
    ]
  },
  {
    id: 'en-listen-09',
    language: 'en',
    title: 'Troubleshooting Wi-Fi Connection',
    slug: 'troubleshooting-wifi-connection',
    level: 'B1',
    topic: 'Technology',
    duration: 150,
    difficulty: 'Intermediate',
    tags: ['tech support', 'router', 'internet', 'troubleshooting'],
    vocabularyIds: [],
    grammarIds: [],
    questionIds: [],
    transcript: `TECH: Customer Support, my name is David. How can I help you resolve your internet issue?
USER: Hi David. My broadband router keeps flashing an orange light on the internet indicator since this morning.
TECH: Understood. Let's first check whether the fiber optic cable in the back is securely plugged in.
USER: Yes, the blue connector clicked firmly into port one.
TECH: Great. Now please unplug the power adapter for thirty seconds to allow the internal capacitors to discharge.
USER: Okay, I have unplugged it... waiting thirty seconds... and plugging it back in now.
TECH: The router will take approximately ninety seconds to synchronize with our local exchange. Let me know when the light turns steady green.`,
    transcriptSegments: [
      { id: 'seg-en-09-1', startTime: 0, endTime: 6.0, speaker: 'TECH', text: 'Customer Support, my name is David. How can I help you resolve your internet issue?', translation: 'Hỗ trợ khách hàng, tôi là David. Tôi có thể giúp bạn giải quyết sự cố mạng thế nào?' },
      { id: 'seg-en-09-2', startTime: 6.0, endTime: 13.0, speaker: 'USER', text: 'Hi David. My broadband router keeps flashing an orange light on the internet indicator since this morning.', translation: 'Chào David. Cục router nhà tôi cứ nhấp nháy đèn cam ở biểu tượng internet từ sáng đến giờ.' },
      { id: 'seg-en-09-3', startTime: 13.0, endTime: 19.0, speaker: 'TECH', text: "Understood. Let's first check whether the fiber optic cable in the back is securely plugged in.", translation: 'Tôi hiểu rồi. Đầu tiên chúng ta kiểm tra xem dây cáp quang phía sau đã cắm chặt chưa nhé.' },
      { id: 'seg-en-09-4', startTime: 19.0, endTime: 23.0, speaker: 'USER', text: 'Yes, the blue connector clicked firmly into port one.', translation: 'Đã cắm, đầu nối màu xanh dương đã kêu tách vào cổng một rồi.' },
      { id: 'seg-en-09-5', startTime: 23.0, endTime: 30.0, speaker: 'TECH', text: 'Great. Now please unplug the power adapter for thirty seconds to allow the internal capacitors to discharge.', translation: 'Tốt. Giờ bạn vui lòng rút phích cắm nguồn trong 30 giây để xả điện bên trong.' },
      { id: 'seg-en-09-6', startTime: 30.0, endTime: 36.0, speaker: 'USER', text: 'Okay, I have unplugged it... waiting thirty seconds... and plugging it back in now.', translation: 'Được rồi, tôi đã rút ra... đợi 30 giây... và giờ đang cắm lại.' },
      { id: 'seg-en-09-7', startTime: 36.0, endTime: 44.0, speaker: 'TECH', text: 'The router will take approximately ninety seconds to synchronize with our local exchange. Let me know when the light turns steady green.', translation: 'Router sẽ mất khoảng 90 giây để đồng bộ với trạm địa phương. Khi nào đèn chuyển xanh lá đứng yên thì bạn báo tôi nhé.' }
    ]
  },
  {
    id: 'en-listen-10',
    language: 'en',
    title: 'Morning News Bulletin: Clean Energy Transition',
    slug: 'morning-news-bulletin-clean-energy',
    level: 'B2',
    topic: 'News',
    duration: 170,
    difficulty: 'Upper Intermediate',
    tags: ['news', 'environment', 'energy', 'policy'],
    vocabularyIds: [],
    grammarIds: [],
    questionIds: [],
    transcript: `NEWSCASTER: Good morning, this is the 8 o'clock National Broadcast. Solar power generation reached an all-time record yesterday, supplying over 42% of peak midday electricity demand across the region.
ANALYST: The accelerated adoption of high-efficiency photovoltaic panels coupled with industrial battery storage installations has significantly mitigated grid instability during summer heatwaves.
NEWSCASTER: Government regulators are expected to unveil additional subsidies for residential rooftop retrofits later this afternoon, paving the way towards carbon neutrality goals by 2035.`,
    transcriptSegments: [
      { id: 'seg-en-10-1', startTime: 0, endTime: 9.0, speaker: 'NEWSCASTER', text: "Good morning, this is the 8 o'clock National Broadcast. Solar power generation reached an all-time record yesterday, supplying over 42% of peak midday electricity demand across the region.", translation: 'Chào buổi sáng, đây là bản tin Quốc gia lúc 8 giờ. Sản lượng điện mặt trời hôm qua đã đạt kỷ lục mọi thời đại, cung cấp hơn 42% nhu cầu giờ cao điểm.' },
      { id: 'seg-en-10-2', startTime: 9.0, endTime: 21.0, speaker: 'ANALYST', text: 'The accelerated adoption of high-efficiency photovoltaic panels coupled with industrial battery storage installations has significantly mitigated grid instability during summer heatwaves.', translation: 'Việc áp dụng nhanh chóng pin quang điện hiệu suất cao kết hợp các trạm lưu trữ công nghiệp đã giảm thiểu đáng kể tình trạng mất ổn định lưới điện trong các đợt nắng nóng.' },
      { id: 'seg-en-10-3', startTime: 21.0, endTime: 31.0, speaker: 'NEWSCASTER', text: 'Government regulators are expected to unveil additional subsidies for residential rooftop retrofits later this afternoon, paving the way towards carbon neutrality goals by 2035.', translation: 'Dự kiến chiều nay các cơ quan quản lý sẽ công bố thêm gói trợ cấp cho việc lắp đặt điện áp mái hộ gia đình, mở đường cho mục tiêu trung hòa carbon vào năm 2035.' }
    ]
  },
  {
    id: 'en-listen-11',
    language: 'en',
    title: 'Booking a Hotel Room in London',
    slug: 'booking-a-hotel-room-london',
    level: 'A2',
    topic: 'Travel',
    duration: 140,
    difficulty: 'Elementary',
    tags: ['hotel', 'booking', 'london', 'reservations'],
    vocabularyIds: [],
    grammarIds: [],
    questionIds: [],
    transcript: `RECEPTIONIST: Good morning, St. James Hotel reservations. How may I be of service?
CALLER: Hello, I would like to reserve a double room for three nights starting on October 14th.
RECEPTIONIST: Let me check our availability. Yes, we have a deluxe double room overlooking the garden courtyard available.
CALLER: Does the room rate include complimentary breakfast?
RECEPTIONIST: Yes, a full continental breakfast is included every morning from seven to ten.
CALLER: Splendid. I will go ahead and book that room.`,
    transcriptSegments: [
      { id: 'seg-en-11-1', startTime: 0, endTime: 5.0, speaker: 'RECEPTIONIST', text: 'Good morning, St. James Hotel reservations. How may I be of service?', translation: 'Chào buổi sáng, bộ phận đặt phòng khách sạn St. James xin nghe. Tôi có thể giúp gì cho quý khách?' },
      { id: 'seg-en-11-2', startTime: 5.0, endTime: 11.5, speaker: 'CALLER', text: 'Hello, I would like to reserve a double room for three nights starting on October 14th.', translation: 'Xin chào, tôi muốn đặt một phòng đôi trong 3 đêm bắt đầu từ ngày 14 tháng 10.' },
      { id: 'seg-en-11-3', startTime: 11.5, endTime: 18.0, speaker: 'RECEPTIONIST', text: 'Let me check our availability. Yes, we have a deluxe double room overlooking the garden courtyard available.', translation: 'Để tôi kiểm tra phòng trống. Vâng, chúng tôi còn một phòng đôi deluxe hướng nhìn ra sân vườn.' },
      { id: 'seg-en-11-4', startTime: 18.0, endTime: 22.0, speaker: 'CALLER', text: 'Does the room rate include complimentary breakfast?', translation: 'Giá phòng đã bao gồm bữa sáng miễn phí chưa ạ?' },
      { id: 'seg-en-11-5', startTime: 22.0, endTime: 28.0, speaker: 'RECEPTIONIST', text: 'Yes, a full continental breakfast is included every morning from seven to ten.', translation: 'Có ạ, bữa sáng kiểu lục địa đầy đủ được phục vụ mỗi sáng từ 7 đến 10 giờ.' },
      { id: 'seg-en-11-6', startTime: 28.0, endTime: 32.0, speaker: 'CALLER', text: 'Splendid. I will go ahead and book that room.', translation: 'Tuyệt quá. Tôi sẽ đặt phòng đó nhé.' }
    ]
  },
  {
    id: 'en-listen-12',
    language: 'en',
    title: 'Movie Premiere & Film Review',
    slug: 'movie-premiere-and-film-review',
    level: 'B2',
    topic: 'Entertainment',
    duration: 160,
    difficulty: 'Upper Intermediate',
    tags: ['cinema', 'review', 'acting', 'entertainment'],
    vocabularyIds: [],
    grammarIds: [],
    questionIds: [],
    transcript: `HOST: Welcome back to Film Weekly. Tonight we discuss the sci-fi epic "Cosmic Drift". Elena, what was your initial impression?
CRITIC: Visually, it is an astonishing masterpiece. The cinematography makes outer space feel both vast and intimately claustrophobic.
HOST: How did you find the narrative pacing in the second act?
CRITIC: That was where it slightly stumbled. The character motivations felt a bit rushed, but the mesmerizing musical score completely carried the emotional weight of the finale.`,
    transcriptSegments: [
      { id: 'seg-en-12-1', startTime: 0, endTime: 8.0, speaker: 'HOST', text: 'Welcome back to Film Weekly. Tonight we discuss the sci-fi epic "Cosmic Drift". Elena, what was your initial impression?', translation: 'Chào mừng quay trở lại với Film Weekly. Tối nay chúng ta bàn luận về bộ phim khoa học viễn tưởng "Cosmic Drift". Elena, cảm nhận ban đầu của bạn thế nào?' },
      { id: 'seg-en-12-2', startTime: 8.0, endTime: 16.0, speaker: 'CRITIC', text: 'Visually, it is an astonishing masterpiece. The cinematography makes outer space feel both vast and intimately claustrophobic.', translation: 'Về mặt thị giác, đây là một kiệt tác đáng kinh ngạc. Kỹ xảo quay phim khiến vũ trụ vừa bao la lại vừa ngột ngạt một cách chân thực.' },
      { id: 'seg-en-12-3', startTime: 16.0, endTime: 21.0, speaker: 'HOST', text: 'How did you find the narrative pacing in the second act?', translation: 'Bạn thấy nhịp phim ở hồi thứ hai như thế nào?' },
      { id: 'seg-en-12-4', startTime: 21.0, endTime: 31.0, speaker: 'CRITIC', text: 'That was where it slightly stumbled. The character motivations felt a bit rushed, but the mesmerizing musical score completely carried the emotional weight of the finale.', translation: 'Đó là chỗ phim hơi vấp một chút. Động cơ nhân vật hơi vội, nhưng nhạc nền mê hoặc đã gánh trọn vẹn sức nặng cảm xúc của đoạn kết.' }
    ]
  },
  {
    id: 'en-listen-13',
    language: 'en',
    title: 'Doctor Appointment: Seasonal Allergies',
    slug: 'doctor-appointment-seasonal-allergies',
    level: 'B1',
    topic: 'Daily Life',
    duration: 155,
    difficulty: 'Intermediate',
    tags: ['healthcare', 'doctor', 'allergies', 'prescription'],
    vocabularyIds: [],
    grammarIds: [],
    questionIds: [],
    transcript: `DOCTOR: Come on in, Liam. What symptoms have you been experiencing?
LIAM: Doctor, for the past week I've had itchy watery eyes, frequent sneezing fits, and a persistent nasal congestion.
DOCTOR: It sounds like allergic rhinitis triggered by tree pollen. Do you have any fever or shortness of breath?
LIAM: No fever, just fatigue from disrupted sleep.
DOCTOR: I will prescribe a non-drowsy antihistamine spray and saline rinse. Take one puff in each nostril every morning.`,
    transcriptSegments: [
      { id: 'seg-en-13-1', startTime: 0, endTime: 5.0, speaker: 'DOCTOR', text: 'Come on in, Liam. What symptoms have you been experiencing?', translation: 'Mời vào, Liam. Bạn đang gặp phải những triệu chứng gì?' },
      { id: 'seg-en-13-2', startTime: 5.0, endTime: 14.0, speaker: 'LIAM', text: "Doctor, for the past week I've had itchy watery eyes, frequent sneezing fits, and a persistent nasal congestion.", translation: 'Thưa bác sĩ, suốt tuần qua tôi bị ngứa và chảy nước mắt, hắt hơi liên tục và nghẹt mũi dai dẳng.' },
      { id: 'seg-en-13-3', startTime: 14.0, endTime: 22.0, speaker: 'DOCTOR', text: 'It sounds like allergic rhinitis triggered by tree pollen. Do you have any fever or shortness of breath?', translation: 'Nghe có vẻ là viêm mũi dị ứng do phấn hoa cây cối. Bạn có bị sốt hay khó thở không?' },
      { id: 'seg-en-13-4', startTime: 22.0, endTime: 26.0, speaker: 'LIAM', text: 'No fever, just fatigue from disrupted sleep.', translation: 'Không sốt, chỉ thấy mệt mỏi vì ngủ không ngon giấc thôi ạ.' },
      { id: 'seg-en-13-5', startTime: 26.0, endTime: 34.0, speaker: 'DOCTOR', text: 'I will prescribe a non-drowsy antihistamine spray and saline rinse. Take one puff in each nostril every morning.', translation: 'Tôi sẽ kê đơn bình xịt kháng histamin không gây buồn ngủ và nước muối sinh lý rửa mũi. Xịt mỗi bên mũi một nhát vào mỗi sáng nhé.' }
    ]
  },
  {
    id: 'en-listen-14',
    language: 'en',
    title: 'Apartment Rental Inquiries',
    slug: 'apartment-rental-inquiries',
    level: 'B1',
    topic: 'Daily Life',
    duration: 150,
    difficulty: 'Intermediate',
    tags: ['apartment', 'rent', 'landlord', 'housing'],
    vocabularyIds: [],
    grammarIds: [],
    questionIds: [],
    transcript: `LANDLORD: Hello! Are you here to view the one-bedroom apartment on the third floor?
TENANT: Yes, good afternoon! I love the natural light in the living room. Does the rent include central heating and water?
LANDLORD: Water and garbage disposal are covered by the building maintenance fee. Electricity and gas are billed separately based on your meter readings.
TENANT: And is there dedicated parking available in the garage?
LANDLORD: Yes, an allocated subterranean parking bay is available for an extra eighty dollars per month.`,
    transcriptSegments: [
      { id: 'seg-en-14-1', startTime: 0, endTime: 6.0, speaker: 'LANDLORD', text: 'Hello! Are you here to view the one-bedroom apartment on the third floor?', translation: 'Xin chào! Bạn đến xem căn hộ một phòng ngủ ở tầng ba phải không?' },
      { id: 'seg-en-14-2', startTime: 6.0, endTime: 15.0, speaker: 'TENANT', text: 'Yes, good afternoon! I love the natural light in the living room. Does the rent include central heating and water?', translation: 'Vâng, chào bác! Cháu rất thích ánh sáng tự nhiên ở phòng khách. Tiền thuê đã gồm sưởi và tiền nước chưa ạ?' },
      { id: 'seg-en-14-3', startTime: 15.0, endTime: 24.0, speaker: 'LANDLORD', text: 'Water and garbage disposal are covered by the building maintenance fee. Electricity and gas are billed separately based on your meter readings.', translation: 'Tiền nước và rác đã tính trong phí bảo trì tòa nhà. Tiền điện và gas tính riêng theo đồng hồ đo.' },
      { id: 'seg-en-14-4', startTime: 24.0, endTime: 28.5, speaker: 'TENANT', text: 'And is there dedicated parking available in the garage?', translation: 'Và dưới hầm có chỗ đỗ xe riêng không ạ?' },
      { id: 'seg-en-14-5', startTime: 28.5, endTime: 36.0, speaker: 'LANDLORD', text: 'Yes, an allocated subterranean parking bay is available for an extra eighty dollars per month.', translation: 'Có chứ, vị trí đỗ xe riêng dưới tầng hầm có giá thêm 80 đô mỗi tháng.' }
    ]
  },
  {
    id: 'en-listen-15',
    language: 'en',
    title: 'Fintech Startup Pitch to Investors',
    slug: 'fintech-startup-pitch',
    level: 'C1',
    topic: 'Business',
    duration: 210,
    difficulty: 'Advanced',
    tags: ['pitch', 'fintech', 'venture capital', 'investment'],
    vocabularyIds: [],
    grammarIds: [],
    questionIds: [],
    transcript: `FOUNDER: Good morning partners. Cross-border payments between Southeast Asia and North America still incur exorbitant fees averaging 4.5% per remittance.
INVESTOR: We are aware of the friction. How does your liquidity bridge eliminate the correspondent banking network?
FOUNDER: By establishing localized real-time gross settlement nodes in Singapore and Frankfurt. We compress transaction settlement from three business days to under four seconds, while slashing merchant fees to eighty basis points.
INVESTOR: What does your customer acquisition cost look like over the last two quarters?
FOUNDER: We achieved an organic thirty percent month-over-month growth, driven primarily by enterprise B2B referrals.`,
    transcriptSegments: [
      { id: 'seg-en-15-1', startTime: 0, endTime: 10.0, speaker: 'FOUNDER', text: 'Good morning partners. Cross-border payments between Southeast Asia and North America still incur exorbitant fees averaging 4.5% per remittance.', translation: 'Chào buổi sáng các quý nhà đầu tư. Thanh toán xuyên biên giới giữa Đông Nam Á và Bắc Mỹ hiện vẫn chịu mức phí đắt đỏ trung bình 4.5% mỗi giao dịch.' },
      { id: 'seg-en-15-2', startTime: 10.0, endTime: 18.0, speaker: 'INVESTOR', text: 'We are aware of the friction. How does your liquidity bridge eliminate the correspondent banking network?', translation: 'Chúng tôi biết sự bất tiện đó. Cầu nối thanh khoản của các bạn loại bỏ hệ thống ngân hàng đại lý như thế nào?' },
      { id: 'seg-en-15-3', startTime: 18.0, endTime: 30.0, speaker: 'FOUNDER', text: 'By establishing localized real-time gross settlement nodes in Singapore and Frankfurt. We compress transaction settlement from three business days to under four seconds, while slashing merchant fees to eighty basis points.', translation: 'Bằng cách thiết lập các nút thanh toán tức thời tại Singapore và Frankfurt. Chúng tôi rút ngắn thời gian thanh toán từ 3 ngày xuống dưới 4 giây và giảm phí cho thương nhân xuống 0.8%.' },
      { id: 'seg-en-15-4', startTime: 30.0, endTime: 35.5, speaker: 'INVESTOR', text: 'What does your customer acquisition cost look like over the last two quarters?', translation: 'Chi phí thu hút khách hàng của các bạn trong hai quý vừa qua ra sao?' },
      { id: 'seg-en-15-5', startTime: 35.5, endTime: 44.0, speaker: 'FOUNDER', text: 'We achieved an organic thirty percent month-over-month growth, driven primarily by enterprise B2B referrals.', translation: 'Chúng tôi đạt mức tăng trưởng tự nhiên 30% mỗi tháng, chủ yếu nhờ các lượt giới thiệu doanh nghiệp B2B.' }
    ]
  },
  {
    id: 'en-listen-16',
    language: 'en',
    title: 'Asking for Directions in New York',
    slug: 'asking-for-directions-new-york',
    level: 'A1',
    topic: 'Travel',
    duration: 110,
    difficulty: 'Beginner',
    tags: ['directions', 'street', 'subway', 'tourist'],
    vocabularyIds: [],
    grammarIds: [],
    questionIds: [],
    transcript: `TOURIST: Excuse me, sir! Could you tell me where the nearest subway station is?
LOCAL: Sure! Walk straight down this avenue for two blocks, then turn left at the pharmacy.
TOURIST: Two blocks straight, then left at the pharmacy?
LOCAL: Exactly. You will see the entrance for the green line right next to the bank.
TOURIST: Thank you so much for your help!
LOCAL: You're welcome! Have a safe trip.`,
    transcriptSegments: [
      { id: 'seg-en-16-1', startTime: 0, endTime: 4.5, speaker: 'TOURIST', text: 'Excuse me, sir! Could you tell me where the nearest subway station is?', translation: 'Xin lỗi chú ơi! Chú có thể chỉ giúp cháu ga tàu điện ngầm gần nhất ở đâu không?' },
      { id: 'seg-en-16-2', startTime: 4.5, endTime: 11.0, speaker: 'LOCAL', text: 'Sure! Walk straight down this avenue for two blocks, then turn left at the pharmacy.', translation: 'Được chứ! Đi thẳng đại lộ này qua 2 dãy nhà, rồi rẽ trái ở hiệu thuốc.' },
      { id: 'seg-en-16-3', startTime: 11.0, endTime: 16.0, speaker: 'TOURIST', text: 'Two blocks straight, then left at the pharmacy?', translation: 'Hai dãy nhà đi thẳng, rồi rẽ trái chỗ hiệu thuốc đúng không ạ?' },
      { id: 'seg-en-16-4', startTime: 16.0, endTime: 22.0, speaker: 'LOCAL', text: 'Exactly. You will see the entrance for the green line right next to the bank.', translation: 'Chính xác. Cháu sẽ thấy lối vào tuyến xanh lá ngay cạnh ngân hàng.' },
      { id: 'seg-en-16-5', startTime: 22.0, endTime: 25.5, speaker: 'TOURIST', text: 'Thank you so much for your help!', translation: 'Cháu cảm ơn chú rất nhiều!' },
      { id: 'seg-en-16-6', startTime: 25.5, endTime: 29.0, speaker: 'LOCAL', text: "You're welcome! Have a safe trip.", translation: 'Không có gì! Chúc cháu đi lại an toàn.' }
    ]
  },
  {
    id: 'en-listen-17',
    language: 'en',
    title: 'Gym Membership & Fitness Consultation',
    slug: 'gym-membership-fitness-consultation',
    level: 'A2',
    topic: 'Daily Life',
    duration: 135,
    difficulty: 'Elementary',
    tags: ['gym', 'fitness', 'workout', 'health'],
    vocabularyIds: [],
    grammarIds: [],
    questionIds: [],
    transcript: `TRAINER: Welcome to Apex Fitness! Are you interested in our monthly or annual membership plan?
VISITOR: I'd like to hear about the monthly option first. Does it include access to the swimming pool and sauna?
TRAINER: Yes, the premium tier includes unrestricted access to all facilities, plus one complimentary personal training evaluation.
VISITOR: That sounds ideal. What are your peak hours during weekdays?
TRAINER: Peak hours are usually from 5:30 to 8:00 PM. If you train in the morning, the gym is remarkably quiet.`,
    transcriptSegments: [
      { id: 'seg-en-17-1', startTime: 0, endTime: 6.0, speaker: 'TRAINER', text: 'Welcome to Apex Fitness! Are you interested in our monthly or annual membership plan?', translation: 'Chào mừng bạn đến Apex Fitness! Bạn quan tâm đến gói tập tháng hay gói năm?' },
      { id: 'seg-en-17-2', startTime: 6.0, endTime: 13.0, speaker: 'VISITOR', text: "I'd like to hear about the monthly option first. Does it include access to the swimming pool and sauna?", translation: 'Tôi muốn tìm hiểu gói tháng trước. Gói này có gồm bể bơi và phòng xông hơi không?' },
      { id: 'seg-en-17-3', startTime: 13.0, endTime: 21.0, speaker: 'TRAINER', text: 'Yes, the premium tier includes unrestricted access to all facilities, plus one complimentary personal training evaluation.', translation: 'Có chứ, gói cao cấp được sử dụng toàn bộ tiện ích không giới hạn, kèm một buổi đánh giá thể lực miễn phí cùng PT.' },
      { id: 'seg-en-17-4', startTime: 21.0, endTime: 25.5, speaker: 'VISITOR', text: 'That sounds ideal. What are your peak hours during weekdays?', translation: 'Nghe rất hợp lý. Giờ cao điểm các ngày trong tuần là khi nào?' },
      { id: 'seg-en-17-5', startTime: 25.5, endTime: 33.0, speaker: 'TRAINER', text: 'Peak hours are usually from 5:30 to 8:00 PM. If you train in the morning, the gym is remarkably quiet.', translation: 'Giờ cao điểm thường từ 17:30 đến 20:00. Nếu bạn tập buổi sáng thì phòng rất thoáng và yên tĩnh.' }
    ]
  },
  {
    id: 'en-listen-18',
    language: 'en',
    title: 'Job Interview: Strengths & Professional Background',
    slug: 'job-interview-strengths',
    level: 'B2',
    topic: 'Work',
    duration: 180,
    difficulty: 'Upper Intermediate',
    tags: ['interview', 'career', 'job', 'strengths'],
    vocabularyIds: [],
    grammarIds: [],
    questionIds: [],
    transcript: `INTERVIEWER: Welcome, Rachel. Could you tell us about a time you led a cross-functional project under tight deadlines?
RACHEL: Certainly. At my previous firm, our product team needed to launch an internationalized mobile app within twelve weeks.
INTERVIEWER: How did you handle competing priorities between design and engineering?
RACHEL: I introduced weekly trade-off workshops and established clear definition-of-done criteria. That transparent framework prevented scope creep and allowed us to ship on schedule with zero critical post-release defects.`,
    transcriptSegments: [
      { id: 'seg-en-18-1', startTime: 0, endTime: 8.0, speaker: 'INTERVIEWER', text: 'Welcome, Rachel. Could you tell us about a time you led a cross-functional project under tight deadlines?', translation: 'Chào Rachel. Bạn có thể chia sẻ về một lần bạn dẫn dắt dự án liên phòng ban với thời hạn gấp không?' },
      { id: 'seg-en-18-2', startTime: 8.0, endTime: 16.0, speaker: 'RACHEL', text: 'Certainly. At my previous firm, our product team needed to launch an internationalized mobile app within twelve weeks.', translation: 'Chắc chắn rồi. Tại công ty cũ, nhóm sản phẩm của tôi phải ra mắt ứng dụng di động đa ngôn ngữ trong vòng 12 tuần.' },
      { id: 'seg-en-18-3', startTime: 16.0, endTime: 21.5, speaker: 'INTERVIEWER', text: 'How did you handle competing priorities between design and engineering?', translation: 'Bạn xử lý các ưu tiên mâu thuẫn giữa thiết kế và kỹ thuật như thế nào?' },
      { id: 'seg-en-18-4', startTime: 21.5, endTime: 33.0, speaker: 'RACHEL', text: 'I introduced weekly trade-off workshops and established clear definition-of-done criteria. That transparent framework prevented scope creep and allowed us to ship on schedule with zero critical post-release defects.', translation: 'Tôi tổ chức các buổi hội thảo đánh đổi hàng tuần và thiết lập tiêu chí hoàn thành rõ ràng. Khung làm việc minh bạch đó đã ngăn việc phát sinh tính năng và giúp chúng tôi ra mắt đúng hạn mà không có lỗi nghiêm trọng.' }
    ]
  },
  {
    id: 'en-listen-19',
    language: 'en',
    title: 'Supermarket Grocery Run',
    slug: 'supermarket-grocery-run',
    level: 'A1',
    topic: 'Food',
    duration: 115,
    difficulty: 'Beginner',
    tags: ['grocery', 'food', 'market', 'vegetables'],
    vocabularyIds: [],
    grammarIds: [],
    questionIds: [],
    transcript: `CLERK: Can I help you find anything on your shopping list?
SHOPPER: Yes, please. Where can I find organic olive oil and black pepper?
CLERK: Olive oil is on aisle 4 on your right, and spices are on aisle 5 right next to pasta.
SHOPPER: Thank you! Are the green apples on sale today?
CLERK: Yes, Granny Smith apples are two dollars a pound today.
SHOPPER: Excellent, I will pick up a couple of pounds!`,
    transcriptSegments: [
      { id: 'seg-en-19-1', startTime: 0, endTime: 4.5, speaker: 'CLERK', text: 'Can I help you find anything on your shopping list?', translation: 'Tôi có thể giúp bạn tìm món gì trong danh sách mua sắm không?' },
      { id: 'seg-en-19-2', startTime: 4.5, endTime: 11.0, speaker: 'SHOPPER', text: 'Yes, please. Where can I find organic olive oil and black pepper?', translation: 'Có ạ. Cho mình hỏi dầu ô liu hữu cơ và hạt tiêu đen ở đâu vậy?' },
      { id: 'seg-en-19-3', startTime: 11.0, endTime: 18.0, speaker: 'CLERK', text: 'Olive oil is on aisle 4 on your right, and spices are on aisle 5 right next to pasta.', translation: 'Dầu ô liu ở dãy 4 bên tay phải, còn gia vị ở dãy 5 ngay cạnh mì ý.' },
      { id: 'seg-en-19-4', startTime: 18.0, endTime: 22.0, speaker: 'SHOPPER', text: 'Thank you! Are the green apples on sale today?', translation: 'Cảm ơn bạn! Táo xanh hôm nay có giảm giá không?' },
      { id: 'seg-en-19-5', startTime: 22.0, endTime: 27.0, speaker: 'CLERK', text: 'Yes, Granny Smith apples are two dollars a pound today.', translation: 'Có chứ, táo Granny Smith hôm nay chỉ 2 đô một pound.' },
      { id: 'seg-en-19-6', startTime: 27.0, endTime: 31.0, speaker: 'SHOPPER', text: 'Excellent, I will pick up a couple of pounds!', translation: 'Tuyệt quá, mình sẽ lấy vài pound!' }
    ]
  },
  {
    id: 'en-listen-20',
    language: 'en',
    title: 'AI and the Future of Remote Collaboration',
    slug: 'ai-and-remote-collaboration',
    level: 'C2',
    topic: 'Technology',
    duration: 220,
    difficulty: 'Advanced',
    tags: ['ai', 'future of work', 'technology', 'remote work'],
    vocabularyIds: [],
    grammarIds: [],
    questionIds: [],
    transcript: `PROFESSOR: As algorithmic synthesis permeates knowledge work, asynchronous distributed teams are transitioning from static documentation to dynamic knowledge graphs.
MODERATOR: How does this paradigm shift impact individual agency and epistemic diversity within engineering organizations?
PROFESSOR: The paradox lies in homogenization. While real-time context-aware agents dramatically flatten onboarding friction, they also risk amplifying consensus bias if dissent is prematurely smoothed out by predictive autocomplete mechanisms.`,
    transcriptSegments: [
      { id: 'seg-en-20-1', startTime: 0, endTime: 11.0, speaker: 'PROFESSOR', text: 'As algorithmic synthesis permeates knowledge work, asynchronous distributed teams are transitioning from static documentation to dynamic knowledge graphs.', translation: 'Khi quá trình tổng hợp thuật toán thâm nhập vào công việc tri thức, các đội ngũ phân tán bất đồng bộ đang chuyển dịch từ tài liệu tĩnh sang đồ thị tri thức động.' },
      { id: 'seg-en-20-2', startTime: 11.0, endTime: 20.0, speaker: 'MODERATOR', text: 'How does this paradigm shift impact individual agency and epistemic diversity within engineering organizations?', translation: 'Sự chuyển dịch hệ hình này ảnh hưởng thế nào đến tính chủ động cá nhân và sự đa dạng nhận thức trong các tổ chức kỹ thuật?' },
      { id: 'seg-en-20-3', startTime: 20.0, endTime: 33.0, speaker: 'PROFESSOR', text: 'The paradox lies in homogenization. While real-time context-aware agents dramatically flatten onboarding friction, they also risk amplifying consensus bias if dissent is prematurely smoothed out by predictive autocomplete mechanisms.', translation: 'Nghịch lý nằm ở sự đồng nhất hóa. Mặc dù các tác tử nhận thức ngữ cảnh thời gian thực giảm đáng kể rào cản thích ứng, chúng cũng có nguy cơ khuếch đại định kiến đồng thuận nếu những ý kiến bất đồng bị triệt tiêu sớm bởi cơ chế tự động điền gợi ý.' }
    ]
  }
];
