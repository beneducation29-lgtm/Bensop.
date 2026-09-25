import { ListeningLesson } from '../../types/listening';

export const CHINESE_LISTENING_LESSONS: ListeningLesson[] = [
  {
    id: 'zh-listen-01',
    language: 'zh',
    title: '在咖啡馆点单 (Ordering at a Cafe)',
    slug: 'zai-kafeiguan-diandan',
    level: 'HSK 2',
    topic: '饮食',
    duration: 130,
    difficulty: 'Elementary',
    tags: ['点单', '咖啡', '日常汉语', '饮食'],
    vocabularyIds: ['zh-vocab-ren-01'],
    grammarIds: ['zh-ba-sentence'],
    questionIds: ['zh-lq-01', 'zh-lq-02'],
    comprehensionPoints: [
      '顾客想要一杯热拿铁和一份牛角面包。',
      '服务员询问是否需要加糖以及打包还是堂食。',
      '顾客选择扫微信支付。'
    ],
    culturalNote: '在中国，扫码支付（微信支付、支付宝）在各类咖啡馆和餐厅已全面普及，非常便捷。',
    createdAt: '2026-03-01',
    updatedAt: '2026-03-10',
    transcript: `服务员：您好！欢迎光临，请问想喝点什么？
李明：你好，请给我一杯中杯热拿铁。
服务员：好的。请问需要加糖吗？
李明：不要糖，谢谢。再要一个牛角面包。
服务员：好的。面包需要帮您加热一下吗？
李明：请加热一下，谢谢。
服务员：请问您是在这里吃，还是带走？
李明：在这里吃。
服务员：一共是三十五元。请问怎么支付？
李明：我扫微信。
服务员：好的，请扫这边。拿好您的小票，请在旁边稍等叫号。`,
    transcriptSegments: [
      {
        id: 'seg-zh-01-1',
        startTime: 0,
        endTime: 4.5,
        speaker: '服务员',
        text: '您好！欢迎光临，请问想喝点什么？',
        pinyin: 'Nín hǎo! Huānyíng guānglín, qǐngwèn xiǎng hē diǎn shénme?',
        translation: 'Xin chào! Kính chào quý khách, xin hỏi quý khách muốn uống gì ạ?'
      },
      {
        id: 'seg-zh-01-2',
        startTime: 4.5,
        endTime: 8.5,
        speaker: '李明',
        text: '你好，请给我一杯中杯热拿铁。',
        pinyin: 'Nǐ hǎo, qǐng gěi wǒ yì bēi zhōng bēi rè nátiě.',
        translation: 'Chào bạn, cho mình một ly latte nóng cỡ vừa nhé.'
      },
      {
        id: 'seg-zh-01-3',
        startTime: 8.5,
        endTime: 12.0,
        speaker: '服务员',
        text: '好的。请问需要加糖吗？',
        pinyin: 'Hǎo de. Qǐngwèn xūyào jiā táng ma?',
        translation: 'Dạ được. Xin hỏi bạn có cần thêm đường không?'
      },
      {
        id: 'seg-zh-01-4',
        startTime: 12.0,
        endTime: 16.5,
        speaker: '李明',
        text: '不要糖，谢谢。再要一个牛角面包。',
        pinyin: 'Bú yào táng, xièxie. Zài yào yí gè niújiǎo miànbāo.',
        translation: 'Không cần đường, cảm ơn bạn. Cho mình thêm một chiếc bánh sừng bò nữa.'
      },
      {
        id: 'seg-zh-01-5',
        startTime: 16.5,
        endTime: 21.0,
        speaker: '服务员',
        text: '好的。面包需要帮您加热一下吗？',
        pinyin: 'Hǎo de. Miànbāo xūyào bāng nín jiārè yíxià ma?',
        translation: 'Dạ. Bánh mì có cần hâm nóng lại giúp bạn không?'
      },
      {
        id: 'seg-zh-01-6',
        startTime: 21.0,
        endTime: 24.5,
        speaker: '李明',
        text: '请加热一下，谢谢。',
        pinyin: 'Qǐng jiārè yíxià, xièxie.',
        translation: 'Làm nóng giúp mình nhé, cảm ơn bạn.'
      },
      {
        id: 'seg-zh-01-7',
        startTime: 24.5,
        endTime: 29.0,
        speaker: '服务员',
        text: '请问您是在这里吃，还是带走？',
        pinyin: 'Qǐngwèn nín shì zài zhèlǐ chī, háishì dài zǒu?',
        translation: 'Xin hỏi bạn dùng tại quán hay mang về?'
      },
      {
        id: 'seg-zh-01-8',
        startTime: 29.0,
        endTime: 32.0,
        speaker: '李明',
        text: '在这里吃。',
        pinyin: 'Zài zhèlǐ chī.',
        translation: 'Mình dùng tại quán.'
      },
      {
        id: 'seg-zh-01-9',
        startTime: 32.0,
        endTime: 37.0,
        speaker: '服务员',
        text: '一共是三十五元。请问怎么支付？',
        pinyin: 'Yígòng shì sānshíwǔ yuán. Qǐngwèn zěnme zhīfù?',
        translation: 'Tổng cộng là 35 tệ. Bạn thanh toán bằng cách nào?'
      },
      {
        id: 'seg-zh-01-10',
        startTime: 37.0,
        endTime: 40.0,
        speaker: '李明',
        text: '我扫微信。',
        pinyin: 'Wǒ sǎo Wēixìn.',
        translation: 'Tôi quét WeChat.'
      },
      {
        id: 'seg-zh-01-11',
        startTime: 40.0,
        endTime: 48.0,
        speaker: '服务员',
        text: '好的，请扫这边。拿好您的小票，请在旁边稍等叫号。',
        pinyin: 'Hǎo de, qǐng sǎo zhè biān. Ná hǎo nín de xiǎopiào, qǐng zài pángbiān shāoděng jiàohào.',
        translation: 'Dạ được, mời quét bên này. Quý khách giữ phiếu thanh toán và đợi gọi số bên cạnh nhé.'
      }
    ]
  },
  {
    id: 'zh-listen-02',
    language: 'zh',
    title: '在北京首都机场 (At Beijing Airport)',
    slug: 'zai-beijing-shoudu-jichang',
    level: 'HSK 3',
    topic: '旅行',
    duration: 155,
    difficulty: 'Intermediate',
    tags: ['机场', '登机', '行李', '旅行'],
    vocabularyIds: [],
    grammarIds: [],
    questionIds: ['zh-lq-03'],
    transcript: `地勤人员：先生您好，请出示您的护照和机票信息。
张伟：您好，这是我的护照。我乘坐飞往上海的MU5186次航班。
地勤人员：好的，张先生。请问您有几件托运行李？
张伟：我有一件托运行李，还有一个随身背包。
地勤人员：请把行李箱放在秤上。行李重十六公斤，没有超重。请问随身行李里有充电宝吗？
张伟：充电宝放在我的随身背包里。
地勤人员：好的，充电宝不能托运，必须随身携带。这是您的登机牌，在28号登机口，下午三点开始登机。祝您旅途愉快！`,
    transcriptSegments: [
      { id: 'seg-zh-02-1', startTime: 0, endTime: 5.5, speaker: '地勤人员', text: '先生您好，请出示您的护照和机票信息。', pinyin: 'Xiānsheng nín hǎo, qǐng chūshì nín de hùzhào hé jīpiào xìnxī.', translation: 'Chào anh, xin vui lòng xuất trình hộ chiếu và thông tin vé máy bay.' },
      { id: 'seg-zh-02-2', startTime: 5.5, endTime: 12.0, speaker: '张伟', text: '您好，这是我的护照。我乘坐飞往上海的MU5186次航班。', pinyin: 'Nín hǎo, zhè shì wǒ de hùzhào. Wǒ chéngzuò fēiwǎng Shànghǎi de MU5186 cì hángbān.', translation: 'Chào chị, đây là hộ chiếu của tôi. Tôi đi chuyến bay MU5186 đến Thượng Hải.' },
      { id: 'seg-zh-02-3', startTime: 12.0, endTime: 17.5, speaker: '地勤人员', text: '好的，张先生。请问您有几件托运行李？', pinyin: 'Hǎo de, Zhāng xiānsheng. Qǐngwèn nín yǒu jǐ jiàn tuōyùn xíngli?', translation: 'Dạ được, anh Trương. Xin hỏi anh có mấy kiện hành lý ký gửi?' },
      { id: 'seg-zh-02-4', startTime: 17.5, endTime: 23.0, speaker: '张伟', text: '我有一件托运行李，还有一个随身背包。', pinyin: 'Wǒ yǒu yí jiàn tuōyùn xíngli, hái yǒu yí gè suíshēn bèibāo.', translation: 'Tôi có một kiện ký gửi và một balo mang theo người.' },
      { id: 'seg-zh-02-5', startTime: 23.0, endTime: 32.5, speaker: '地勤人员', text: '请把行李箱放在秤上。行李重十六公斤，没有超重。请问随身行李里有充电宝吗？', pinyin: 'Qǐng bǎ xínglixiāng fàng zài chèng shàng. Xíngli zhòng shíliù gōngjīn, méiyǒu chāozhòng. Qǐngwèn suíshēn xíngli lǐ yǒu chōngdiànbǎo ma?', translation: 'Mời anh đặt vali lên cân. Hành lý nặng 16 kg, không bị quá cân. Cho hỏi trong hành lý xách tay có sạc dự phòng không?' },
      { id: 'seg-zh-02-6', startTime: 32.5, endTime: 37.0, speaker: '张伟', text: '充电宝放在我的随身背包里。', pinyin: 'Chōngdiànbǎo fàng zài wǒ de suíshēn bèibāo lǐ.', translation: 'Sạc dự phòng tôi để trong balo mang theo người.' },
      { id: 'seg-zh-02-7', startTime: 37.0, endTime: 48.0, speaker: '地勤人员', text: '好的，充电宝不能托运，必须随身携带。这是您的登机牌，在28号登机口，下午三点开始登机。祝您旅途愉快！', pinyin: 'Hǎo de, chōngdiànbǎo bù néng tuōyùn, bìxū suíshēn xiédài. Zhè shì nín de dēngjīpái, zài èrshíbā hào dēngjīkǒu, xiàwǔ sān diǎn kāishǐ dēngjī. Zhù nín lǚtú yúkuài!', translation: 'Vâng, sạc dự phòng không được ký gửi mà phải mang theo người. Đây là thẻ lên máy bay của anh, ở Cổng 28, 3 giờ chiều bắt đầu lên máy bay. Chúc anh chuyến đi vui vẻ!' }
    ]
  },
  {
    id: 'zh-listen-03',
    language: 'zh',
    title: '向同事请教工作 (Asking a Colleague for Work Advice)',
    slug: 'xiang-tongshi-qingjiao-gongzuo',
    level: 'HSK 4',
    topic: '工作',
    duration: 165,
    difficulty: 'Intermediate',
    tags: ['工作', '职场', '项目', '同事'],
    vocabularyIds: [],
    grammarIds: [],
    questionIds: [],
    transcript: `王芳：陈明，你现在方便吗？我想请教你一个关于季度数据报表的问题。
陈明：没问题，你说吧。是哪个模块的数据有疑问？
王芳：就是用户留存率这一块。我发现采用新的统计口径后，次月留存率上升了百分之五。
陈明：这个很正常。上个月产品团队优化了新手引导流程，而且针对活跃用户推送了专属权益，所以整体留存明显改善了。
王芳：原来是这样！那我在汇报PPT里把这个背景原因加上，这样领导看得更清楚。多谢你！`,
    transcriptSegments: [
      { id: 'seg-zh-03-1', startTime: 0, endTime: 7.0, speaker: '王芳', text: '陈明，你现在方便吗？我想请教你一个关于季度数据报表的问题。', pinyin: 'Chén Míng, nǐ xiànzài fāngbiàn ma? Wǒ xiǎng qǐngjiào nǐ yí gè guānyú jìdù shùjù bàobiǎo de wèntí.', translation: 'Trần Minh, bây giờ cậu có tiện không? Mình muốn hỏi cậu chút về báo cáo số liệu quý.' },
      { id: 'seg-zh-03-2', startTime: 7.0, endTime: 13.0, speaker: '陈明', text: '没问题，你说吧。是哪个模块的数据有疑问？', pinyin: 'Méi wèntí, nǐ shuō ba. Shì nǎge mókuài de shùjù yǒu yíwèn?', translation: 'Được chứ, cậu nói đi. Số liệu ở phần nào làm cậu băn khoăn?' },
      { id: 'seg-zh-03-3', startTime: 13.0, endTime: 21.0, speaker: '王芳', text: '就是用户留存率这一块。我发现采用新的统计口径后，次月留存率上升了百分之五。', pinyin: 'Jiùshì yònghù liúcún lǜ zhè yí kuài. Wǒ fāxiàn cǎiyòng xīn de tǒngjì kǒujìng hòu, cìyuè liúcún lǜ shàngshēng le bǎifēnzhī wǔ.', translation: 'Chính là tỷ lệ giữ chân người dùng. Mình thấy sau khi áp dụng tiêu chuẩn thống kê mới, tỷ lệ giữ chân tháng sau tăng 5%.' },
      { id: 'seg-zh-03-4', startTime: 21.0, endTime: 32.0, speaker: '陈明', text: '这个很正常。上个月产品团队优化了新手引导流程，而且针对活跃用户推送了专属权益，所以整体留存明显改善了。', pinyin: 'Zhège hěn zhèngcháng. Shàng gè yuè chǎnpǐn tuánduì yōuhuà le xīnshǒu yǐndǎo liúchéng, érqiě zhēnduì huóyuè yònghù tuīsòng le zhuānshǔ quányì, suǒyǐ zhěngtǐ liúcún míngxiǎn gǎishàn le.', translation: 'Điều đó rất bình thường. Tháng trước đội sản phẩm đã tối ưu luồng hướng dẫn người dùng mới, đồng thời gửi quyền lợi đặc quyền cho người dùng tích cực, nên mức giữ chân chung cải thiện rõ rệt.' },
      { id: 'seg-zh-03-5', startTime: 32.0, endTime: 41.0, speaker: '王芳', text: '原来是这样！那我在汇报PPT里把这个背景原因加上，这样领导看得更清楚。多谢你！', pinyin: 'Yuánlái shì zhèyàng! Nà wǒ zài huìbào PPT lǐ bǎ zhège bèijǐng yuányīn jiā shàng, zhèyàng lǐngdǎo kàn de gèng qīngchu. Duōxiè nǐ!', translation: 'Hóa ra là vậy! Thế mình sẽ thêm nguyên nhân bối cảnh này vào slide báo cáo để sếp nắm rõ hơn. Cảm ơn cậu nhiều!' }
    ]
  },
  {
    id: 'zh-listen-04',
    language: 'zh',
    title: '在菜市场买新鲜蔬菜 (Buying Fresh Vegetables at the Wet Market)',
    slug: 'zai-caishichang-mai-shucai',
    level: 'HSK 1',
    topic: '购物',
    duration: 110,
    difficulty: 'Beginner',
    tags: ['买菜', '蔬菜', '价格', '日常'],
    vocabularyIds: [],
    grammarIds: [],
    questionIds: [],
    transcript: `顾客：阿姨，西红柿多少钱一斤？
摊主：三块五一斤，非常新鲜，今天早上刚摘的！
顾客：给我称两斤吧。还有黄瓜怎么卖？
摊主：黄瓜两块钱一斤。要几根？
顾客：拿三根黄瓜。一共多少钱？
摊主：两斤西红柿七块，三根黄瓜三块，一共刚好十块钱！`,
    transcriptSegments: [
      { id: 'seg-zh-04-1', startTime: 0, endTime: 4.0, speaker: '顾客', text: '阿姨，西红柿多少钱一斤？', pinyin: 'Āyí, xīhóngshì duōshǎo qián yì jīn?', translation: 'Dì ơi, cà chua bao nhiêu tiền một cân (nửa kg) ạ?' },
      { id: 'seg-zh-04-2', startTime: 4.0, endTime: 9.5, speaker: '摊主', text: '三块五一斤，非常新鲜，今天早上刚摘的！', pinyin: 'Sān kuài wǔ yì jīn, fēicháng xīnxiān, jīntiān zǎoshang gāng zhāi de!', translation: 'Ba tệ rưỡi một cân, tươi lắm cháu ơi, sáng nay mới hái đấy!' },
      { id: 'seg-zh-04-3', startTime: 9.5, endTime: 15.0, speaker: '顾客', text: '给我称两斤吧。还有黄瓜怎么卖？', pinyin: 'Gěi wǒ chēng liǎng jīn ba. Hái yǒu huángguā zěnme mài?', translation: 'Cân cho cháu hai cân nhé. Còn dưa chuột bán thế nào ạ?' },
      { id: 'seg-zh-04-4', startTime: 15.0, endTime: 19.5, speaker: '摊主', text: '黄瓜两块钱一斤。要几根？', pinyin: 'Huángguā liǎng kuài qián yì jīn. Yào jǐ gēn?', translation: 'Dưa chuột hai tệ một cân. Cháu lấy mấy quả?' },
      { id: 'seg-zh-04-5', startTime: 19.5, endTime: 24.0, speaker: '顾客', text: '拿三根黄瓜。一共多少钱？', pinyin: 'Ná sān gēn huángguā. Yígòng duōshǎo qián?', translation: 'Cháu lấy ba quả dưa chuột. Tổng cộng hết bao nhiêu ạ?' },
      { id: 'seg-zh-04-6', startTime: 24.0, endTime: 31.0, speaker: '摊主', text: '两斤西红柿七块，三根黄瓜三块，一共刚好十块钱！', pinyin: 'Liǎng jīn xīhóngshì qī kuài, sān gēn huángguā sān kuài, yígòng gānghǎo shí kuài qián!', translation: 'Hai cân cà chua bảy tệ, ba quả dưa ba tệ, tổng cộng vừa đúng mười tệ!' }
    ]
  },
  {
    id: 'zh-listen-05',
    language: 'zh',
    title: '出租车上与司机的对话 (Chat with a Taxi Driver in Shanghai)',
    slug: 'chuzuche-shang-duihua',
    level: 'HSK 3',
    topic: '旅行',
    duration: 140,
    difficulty: 'Intermediate',
    tags: ['出租车', '问路', '上海', '交通'],
    vocabularyIds: [],
    grammarIds: [],
    questionIds: [],
    transcript: `乘客：师傅，去外滩和平饭店，大概需要多长时间？
司机：现在正是下班晚高峰，延安高架路有点堵，差不多得四十分钟。
乘客：师傅，那走地面道路会不会快一些？
司机：地面红绿灯多，走高架虽然慢一点，但不容易彻底卡住。您赶时间吗？
乘客：我跟朋友约了七点半吃晚饭。
司机：放心吧，现在才六点四十，七点十五分之前肯定能把您送到！`,
    transcriptSegments: [
      { id: 'seg-zh-05-1', startTime: 0, endTime: 6.0, speaker: '乘客', text: '师傅，去外滩和平饭店，大概需要多长时间？', pinyin: 'Shīfu, qù Wàitān Hépíng Fàndiàn, dàgài xūyào duō cháng shíjiān?', translation: 'Bác tài ơi, đến khách sạn Hòa Bình ở Bến Thượng Hải mất khoảng bao lâu ạ?' },
      { id: 'seg-zh-05-2', startTime: 6.0, endTime: 13.5, speaker: '司机', text: '现在正是下班晚高峰，延安高架路有点堵，差不多得四十分钟。', pinyin: 'Xiànzài zhèng shì xiàbān wǎn gāofēng, Yán\'ān gāojià lù yǒudiǎn dǔ, chàbuduō děi sìshí fēnzhōng.', translation: 'Bây giờ đúng lúc cao điểm tan tầm chiều, đường trên cao Diên An hơi tắc, chắc mất chừng 40 phút.' },
      { id: 'seg-zh-05-3', startTime: 13.5, endTime: 18.0, speaker: '乘客', text: '师傅，那走地面道路会不会快一些？', pinyin: 'Shīfu, nà zǒu dǐmiàn dàolù huì bu huì kuài yìxiē?', translation: 'Bác tài ơi, thế đi đường bên dưới có nhanh hơn không?' },
      { id: 'seg-zh-05-4', startTime: 18.0, endTime: 26.0, speaker: '司机', text: '地面红绿灯多，走高架虽然慢一点，但不容易彻底卡住。您赶时间吗？', pinyin: 'Dǐmiàn hónglǜdēng duō, zǒu gāojià suīrán màn yìdiǎn, dàn bù róngyì chèdǐ kǎ zhù. Nín gǎn shíjiān ma?', translation: 'Dưới đất nhiều đèn đỏ lắm, đi đường trên cao tuy hơi chậm nhưng không bị nghẽn cứng ngắc. Bạn có đang vội không?' },
      { id: 'seg-zh-05-5', startTime: 26.0, endTime: 30.0, speaker: '乘客', text: '我跟朋友约了七点半吃晚饭。', pinyin: 'Wǒ gēn péngyou yuē le qī diǎn bàn chī wǎnfàn.', translation: 'Tôi có hẹn ăn tối với bạn lúc 7 giờ rưỡi.' },
      { id: 'seg-zh-05-6', startTime: 30.0, endTime: 37.0, speaker: '司机', text: '放心吧，现在才六点四十，七点十五分之前肯定能把您送到！', pinyin: 'Fàngxīn ba, xiànzài cái liù diǎn sìshí, qī diǎn shíwǔ fēn zhīqián kěndìng néng bǎ nín sòng dào!', translation: 'Yên tâm đi, bây giờ mới 6 giờ 40, trước 7 giờ 15 chắc chắn tôi đưa bạn đến nơi an toàn!' }
    ]
  },
  {
    id: 'zh-listen-06',
    language: 'zh',
    title: '在医院挂号与看诊 (Visiting a Doctor at the Hospital)',
    slug: 'zai-yiyuan-guahao-kanzhen',
    level: 'HSK 3',
    topic: '日常生活',
    duration: 150,
    difficulty: 'Intermediate',
    tags: ['医院', '健康', '感冒', '看病'],
    vocabularyIds: [],
    grammarIds: [],
    questionIds: [],
    transcript: `医生：请坐。哪里不舒服？
患者：医生，我这两天咳嗽得厉害，喉咙也疼，量体温有点低烧，三十七度八。
医生：张开嘴巴，我看看咽喉。咽喉部位明显充血红肿。有痰吗？
患者：有一点黄色的浓痰。
医生：初步看是急性上呼吸道感染。我先给你开个血常规化验单，查一下是否有细菌感染。
患者：好的，请问化验室在几楼？
医生：就在二楼尽头，抽血后二十分钟可以在自助机上打印报告。`,
    transcriptSegments: [
      { id: 'seg-zh-06-1', startTime: 0, endTime: 3.5, speaker: '医生', text: '请坐。哪里不舒服？', pinyin: 'Qǐng zuò. Nǎlǐ bù shūfu?', translation: 'Mời ngồi. Bạn thấy khó chịu ở đâu?' },
      { id: 'seg-zh-06-2', startTime: 3.5, endTime: 11.0, speaker: '患者', text: '医生，我这两天咳嗽得厉害，喉咙也疼，量体温有点低烧，三十七度八。', pinyin: 'Yīshēng, wǒ zhè liǎng tiān késou de lìhai, hóulóng yě téng, liáng tǐwēn yǒudiǎn dīshāo, sānshíqī dù bā.', translation: 'Bác sĩ ơi, hai ngày nay tôi ho nhiều, đau họng, đo nhiệt độ thì sốt nhẹ 37 độ 8.' },
      { id: 'seg-zh-06-3', startTime: 11.0, endTime: 17.0, speaker: '医生', text: '张开嘴巴，我看看咽喉。咽喉部位明显充血红肿。有痰吗？', pinyin: 'Zhāng kāi zuǐba, wǒ kànkan yānhóu. Yānhóu bùwèi míngxiǎn chōngxiè hóngzhǒng. Yǒu tán ma?', translation: 'Há miệng ra tôi xem họng nào. Vùng họng sưng đỏ rõ rệt. Bạn có đờm không?' },
      { id: 'seg-zh-06-4', startTime: 17.0, endTime: 20.0, speaker: '患者', text: '有一点黄色的浓痰。', pinyin: 'Yǒu yìdiǎn huángsè de nóng tán.', translation: 'Có một chút đờm đặc màu vàng ạ.' },
      { id: 'seg-zh-06-5', startTime: 20.0, endTime: 27.0, speaker: '医生', text: '初步看是急性上呼吸道感染。我先给你开个血常规化验单，查一下是否有细菌感染。', pinyin: 'Chūbù kàn shì jíxìng shàng hūxīdào gǎnrǎn. Wǒ xiān gěi nǐ kāi gè xiěchángguī huàyàndān, chá yíxià shìfǒu yǒu xìjūn gǎnrǎn.', translation: 'Bước đầu chẩn đoán là viêm đường hô hấp trên cấp tính. Tôi kê giấy xét nghiệm máu trước để kiểm tra có nhiễm khuẩn không nhé.' },
      { id: 'seg-zh-06-6', startTime: 27.0, endTime: 30.5, speaker: '患者', text: '好的，请问化验室在几楼？', pinyin: 'Hǎo de, qǐngwèn huàyànshì zài jǐ lóu?', translation: 'Dạ vâng, xin hỏi phòng xét nghiệm ở tầng mấy ạ?' },
      { id: 'seg-zh-06-7', startTime: 30.5, endTime: 38.0, speaker: '医生', text: '就在二楼尽头，抽血后二十分钟可以在自助机上打印报告。', pinyin: 'Jiù zài èr lóu jìntóu, chōuxiě hòu èrshí fēnzhōng kěyǐ zài zìzhùjī shàng dǎyìn bàogào.', translation: 'Ở ngay cuối hành lang tầng hai, lấy máu xong 20 phút sau có thể in kết quả tại máy tự động.' }
    ]
  },
  {
    id: 'zh-listen-07',
    language: 'zh',
    title: '租房与房东签约 (Signing an Apartment Lease)',
    slug: 'zufang-yu-fangdong-qianyue',
    level: 'HSK 4',
    topic: '日常生活',
    duration: 160,
    difficulty: 'Intermediate',
    tags: ['租房', '合同', '房东', '生活'],
    vocabularyIds: [],
    grammarIds: [],
    questionIds: [],
    transcript: `房东：小李，合同我都打印好了。租期是一年，押一付三，每月租金三千八百元。
租客：阿姨，请问宽带和物业费包含在房租里吗？
房东：物业费是由我来交的，宽带已经装好了千兆光纤，你每个月分摊五十块钱就可以。
租客：好的。如果屋里的空调或者洗衣机坏了，谁负责维修？
房东：非人为损坏的情况下，大电器的维修费用都由我承担。如果有问题你随时在微信上告诉我。
租客：太好了，条款很清楚，我现在就可以签字按手印。`,
    transcriptSegments: [
      { id: 'seg-zh-07-1', startTime: 0, endTime: 8.0, speaker: '房东', text: '小李，合同我都打印好了。租期是一年，押一付三，每月租金三千八百元。', pinyin: 'Xiǎo Lǐ, hétong wǒ dōu dǎyìn hǎo le. Zūqī shì yì nián, yā yī fù sān, měi yuè zūjīn sānqiān bābǎi yuán.', translation: 'Tiểu Lý, hợp đồng cô in sẵn rồi nhé. Thời hạn thuê một năm, cọc một tháng trả ba tháng, mỗi tháng 3800 tệ.' },
      { id: 'seg-zh-07-2', startTime: 8.0, endTime: 14.0, speaker: '租客', text: '阿姨，请问宽带和物业费包含在房租里吗？', pinyin: 'Āyí, qǐngwèn kuāndài hé wùyèfèi bāohán zài fángzū lǐ ma?', translation: 'Cô ơi, tiền mạng internet và phí quản lý tòa nhà đã bao gồm trong tiền thuê chưa ạ?' },
      { id: 'seg-zh-07-3', startTime: 14.0, endTime: 22.0, speaker: '房东', text: '物业费是由我来交的，宽带已经装好了千兆光纤，你每个月分摊五十块钱就可以。', pinyin: 'Wùyèfèi shì yóu wǒ lái jiāo de, kuāndài yǐjīng zhuāng hǎo le qiān zhào guāngxiān, nǐ měi gè yuè fēntān wǔshí kuài qián jiù kěyǐ.', translation: 'Phí tòa nhà cô trả, còn mạng đã lắp sẵn cáp quang 1000 Mbps, mỗi tháng cháu đóng góp 50 tệ là được.' },
      { id: 'seg-zh-07-4', startTime: 22.0, endTime: 27.5, speaker: '租客', text: '好的。如果屋里的空调或者洗衣机坏了，谁负责维修？', pinyin: 'Hǎo de. Rúguǒ wū lǐ de kōngtiáo huòzhě xǐyījī huài le, shéi fùzé wéixiū?', translation: 'Vâng ạ. Nếu điều hòa hay máy giặt trong phòng bị hỏng thì ai chịu trách nhiệm sửa chữa?' },
      { id: 'seg-zh-07-5', startTime: 27.5, endTime: 35.5, speaker: '房东', text: '非人为损坏的情况下，大电器的维修费用都由我承担。如果有问题你随时在微信上告诉我。', pinyin: 'Fēi rénwéi sǔnhuài de qíngkuàng xià, dà diànqì de wéixiū fèiyong dōu yóu wǒ chéngdān. Rúguǒ yǒu wèntí nǐ suíshí zài Wēixìn shàng gàosu wǒ.', translation: 'Nếu không phải lỗi do người dùng làm hỏng thì chi phí sửa đồ điện lớn cô chịu hết. Có vấn đề gì cứ nhắn WeChat cho cô bất cứ lúc nào.' },
      { id: 'seg-zh-07-6', startTime: 35.5, endTime: 41.0, speaker: '租客', text: '太好了，条款很清楚，我现在就可以签字按手印。', pinyin: 'Tài hǎo le, tiáokuǎn hěn qīngchu, wǒ xiànzài jiù kěyǐ qiānzì àn shǒuyìn.', translation: 'Tuyệt quá, các điều khoản rất rõ ràng, cháu có thể ký tên điểm chỉ ngay bây giờ.' }
    ]
  },
  {
    id: 'zh-listen-08',
    language: 'zh',
    title: '讨论周末出游计划 (Discussing Weekend Hiking Plans)',
    slug: 'taolun-zhoumo-chuyou-jihua',
    level: 'HSK 2',
    topic: '朋友',
    duration: 130,
    difficulty: 'Elementary',
    tags: ['周末', '爬山', '朋友', '计划'],
    vocabularyIds: [],
    grammarIds: [],
    questionIds: [],
    transcript: `小明：小雨，这个周六天气预报说晴空万里，我们要不要去香山看红叶？
小雨：好主意！不过周末去香山的人肯定特别多，我们最好早点出发。
小明：那我们周六早上七点在地铁站集合，坐西郊线直达，怎么样？
小雨：没问题。我负责带水果和零食，你记得带两瓶矿泉水。
小明：太好了，周六早上见！`,
    transcriptSegments: [
      { id: 'seg-zh-08-1', startTime: 0, endTime: 7.0, speaker: '小明', text: '小雨，这个周六天气预报说晴空万里，我们要不要去香山看红叶？', pinyin: 'Xiǎo Yǔ, zhège zhōuliù tiānqì yùbào shuō qíngkōng wànlǐ, wǒmen yào bu yào qù Xiāngshān kàn hóngyè?', translation: 'Tiểu Vũ, thứ Bảy này dự báo thời tiết trời trong xanh không một gợn mây, chúng mình đi Hương Sơn ngắm lá đỏ không?' },
      { id: 'seg-zh-08-2', startTime: 7.0, endTime: 13.5, speaker: '小雨', text: '好主意！不过周末去香山的人肯定特别多，我们最好早点出发。', pinyin: 'Hǎo zhǔyi! Búguò zhōumò qù Xiāngshān de rén kěndìng tèbié duō, wǒmen zuìhǎo zǎodiǎn chūfā.', translation: 'Ý hay đấy! Nhưng cuối tuần người đi Hương Sơn chắc đông lắm, chúng mình nên xuất phát sớm.' },
      { id: 'seg-zh-08-3', startTime: 13.5, endTime: 19.5, speaker: '小明', text: '那我们周六早上七点在地铁站集合，坐西郊线直达，怎么样？', pinyin: 'Nà wǒmen zhōuliù zǎoshang qī diǎn zài dìtiězhàn jíhé, zuò Xījiāo xiàn zhídá, zěnmeyàng?', translation: 'Vậy 7 giờ sáng thứ Bảy chúng mình tập trung ở ga tàu điện ngầm, đi tuyến Tây Giao thẳng đến nơi, được không?' },
      { id: 'seg-zh-08-4', startTime: 19.5, endTime: 25.0, speaker: '小雨', text: '没问题。我负责带水果和零食，你记得带两瓶矿泉水。', pinyin: 'Méi wèntí. Wǒ fùzé dài shuǐguǒ hé língshí, nǐ jìde dài liǎng píng kuàngquánshuǐ.', translation: 'Không thành vấn đề. Mình sẽ mang hoa quả và đồ ăn vặt, cậu nhớ mang hai chai nước khoáng nhé.' },
      { id: 'seg-zh-08-5', startTime: 25.0, endTime: 29.0, speaker: '小明', text: '太好了，周六早上见！', pinyin: 'Tài hǎo le, zhōuliù zǎoshang jiàn!', translation: 'Tuyệt quá, hẹn gặp cậu sáng thứ Bảy nhé!' }
    ]
  },
  {
    id: 'zh-listen-09',
    language: 'zh',
    title: '大学选课与教授交流 (Course Selection with Professor)',
    slug: 'daxue-xuanke-jiaoshou',
    level: 'HSK 5',
    topic: '学校',
    duration: 180,
    difficulty: 'Advanced',
    tags: ['大学', '选课', '学术', '教授'],
    vocabularyIds: [],
    grammarIds: [],
    questionIds: [],
    transcript: `学生：刘教授您好，打扰您了。我是软件工程专业大二的学生，想咨询您下学期的《人工智能前沿算法》研讨课。
教授：请进。这门课程要求先修过离散数学与高等概率统计，并且需要具备扎实的Python编程基础。
学生：这些先修课程我都已经修读完毕，期末成绩都在九十分以上。
教授：很好。本课程注重理论与前沿论文复现相结合，期末需要分组完成一个关于多模态深度学习的开源实验项目。
学生：这正是我想深入钻研的方向。感谢教授，我今天就提交选课申请！`,
    transcriptSegments: [
      { id: 'seg-zh-09-1', startTime: 0, endTime: 9.0, speaker: '学生', text: '刘教授您好，打扰您了。我是软件工程专业大二的学生，想咨询您下学期的《人工智能前沿算法》研讨课。', pinyin: 'Liú jiàoshòu nín hǎo, dǎrǎo nín le. Wǒ shì ruǎnjiàn gōngchéng zhuānyè dà\'èr de xuésheng, xiǎng zīxún nín xià xuéqī de Rén\'gōng Zhìnéng Qiányán Suànfǎ yántǎokè.', translation: 'Chào Giáo sư Lưu, làm phiền thầy ạ. Em là sinh viên năm hai chuyên ngành Kỹ thuật Phần mềm, em muốn xin tư vấn về khóa hội thảo Thuật toán Tiên phong AI kỳ tới.' },
      { id: 'seg-zh-09-2', startTime: 9.0, endTime: 18.0, speaker: '教授', text: '请进。这门课程要求先修过离散数学与高等概率统计，并且需要具备扎实的Python编程基础。', pinyin: 'Qǐng jìn. Zhè mén kèchéng yāoqiú xiān xiū guò lísàn shùxué yǔ gāoděng gàilǜ tǒngjì, bìngqiě xūyào jùbèi zhāshi de Python biānchéng jīchǔ.', translation: 'Mời vào. Khóa học này yêu cầu đã học qua Toán rời rạc và Xác suất thống kê nâng cao, đồng thời cần có nền tảng lập trình Python vững chắc.' },
      { id: 'seg-zh-09-3', startTime: 18.0, endTime: 24.0, speaker: '学生', text: '这些先修课程我都已经修读完毕，期末成绩都在九十分以上。', pinyin: 'Zhèxiē xiānxiū kèchéng wǒ dōu yǐjīng xiūdú wánbì, qīmò chéngjì dōu zài jiǔshí fēn yǐshàng.', translation: 'Những môn tiên quyết đó em đều đã hoàn thành xong, điểm thi cuối kỳ đều trên 90 điểm ạ.' },
      { id: 'seg-zh-09-4', startTime: 24.0, endTime: 34.0, speaker: '教授', text: '很好。本课程注重理论与前沿论文复现相结合，期末需要分组完成一个关于多模态深度学习的开源实验项目。', pinyin: 'Hěn hǎo. Běn kèchéng zhùzhòng lǐlùn yǔ qiányán lùnwén fùxiàn xiāng jiéhé, qīmò xūyào fēnzǔ wánchéng yí gè guānyú duōmótài shēndù xuéxí de kāiyuán shíyàn xiàngmù.', translation: 'Rất tốt. Môn này chú trọng kết hợp lý thuyết và tái hiện bài báo khoa học tiên tiến, cuối kỳ phải làm việc nhóm hoàn thành dự án mã nguồn mở về deep learning đa phương thức.' },
      { id: 'seg-zh-09-5', startTime: 34.0, endTime: 41.0, speaker: '学生', text: '这正是我想深入钻研的方向。感谢教授，我今天就提交选课申请！', pinyin: 'Zhè zhèng shì wǒ xiǎng shēnrù zuānyán de fāngxiàng. Gǎnxiè jiàoshòu, wǒ jīntiān jiù tíjiāo xuǎnkè shēnqǐng!', translation: 'Đó chính là hướng em muốn nghiên cứu sâu. Em cảm ơn giáo sư, hôm nay em sẽ nộp đơn đăng ký học phần luôn ạ!' }
    ]
  },
  {
    id: 'zh-listen-10',
    language: 'zh',
    title: '春节家庭聚会 (Chinese New Year Family Reunion)',
    slug: 'chunjie-jiating-juhui',
    level: 'HSK 3',
    topic: '家庭',
    duration: 145,
    difficulty: 'Intermediate',
    tags: ['春节', '家庭', '年夜饭', '饺子'],
    vocabularyIds: [],
    grammarIds: [],
    questionIds: [],
    transcript: `奶奶：明亮，快进屋暖和暖和，外面下大雪了吧？
明亮：奶奶新年好！外面雪下得挺大，不过路上很顺畅。爸妈在厨房包饺子吗？
奶奶：对，你妈妈正拌三鲜馅呢，你爸爸在擀饺子皮。
明亮：那我洗个手也去帮忙包饺子。今年春晚几点开始？
奶奶：八点整开始。快去吧，包完饺子咱们全家一起看春晚吃年夜饭！`,
    transcriptSegments: [
      { id: 'seg-zh-10-1', startTime: 0, endTime: 5.0, speaker: '奶奶', text: '明亮，快进屋暖和暖和，外面下大雪了吧？', pinyin: 'Míngliàng, kuài jìn wū nuǎnhuo nuǎnhuo, wàimiàn xià dà xuě le ba?', translation: 'Minh Lượng, mau vào nhà cho ấm, bên ngoài đang tuyết rơi to lắm phải không cháu?' },
      { id: 'seg-zh-10-2', startTime: 5.0, endTime: 12.0, speaker: '明亮', text: '奶奶新年好！外面雪下得挺大，不过路上很顺畅。爸妈在厨房包饺子吗？', pinyin: 'Nǎinai xīnnián hǎo! Wàimiàn xuě xià de tǐng dà, búguò lù shang hěn shùnchàng. Bà mā zài chúfáng bāo jiǎozi ma?', translation: 'Bà ơi chúc mừng năm mới bà! Ngoài trời tuyết rơi khá lớn nhưng đường đi thông thoáng. Bố mẹ đang gói sủi cảo trong bếp ạ?' },
      { id: 'seg-zh-10-3', startTime: 12.0, endTime: 17.5, speaker: '奶奶', text: '对，你妈妈正拌三鲜馅呢，你爸爸在擀饺子皮。', pinyin: 'Duì, nǐ māma zhèng bàn sānxiān xiàn ne, nǐ bàba zài gǎn jiǎozi pí.', translation: 'Đúng rồi, mẹ cháu đang trộn nhân tam tiên, bố cháu thì đang cán vỏ bánh.' },
      { id: 'seg-zh-10-4', startTime: 17.5, endTime: 22.5, speaker: '明亮', text: '那我洗个手也去帮忙包饺子。今年春晚几点开始？', pinyin: 'Nà wǒ xǐ gè shǒu yě qù bāngmáng bāo jiǎozi. Jīnnián Chūnwǎn jǐ diǎn kāishǐ?', translation: 'Thế để cháu rửa tay rồi vào phụ gói sủi cảo. Gala Tết năm nay mấy giờ bắt đầu ạ?' },
      { id: 'seg-zh-10-5', startTime: 22.5, endTime: 29.0, speaker: '奶奶', text: '八点整开始。快去吧，包完饺子咱们全家一起看春晚吃年夜饭！', pinyin: 'Bā diǎn zhěng kāishǐ. Kuài qù ba, bāo wán jiǎozi zánmen quánjiā yìqǐ kàn Chūnwǎn chī niányèfàn!', translation: 'Đúng 8 giờ bắt đầu. Đi mau đi, gói xong sủi cảo cả nhà mình cùng xem Gala đón giao thừa ăn cơm tất niên!' }
    ]
  },
  {
    id: 'zh-listen-11',
    language: 'zh',
    title: '天气预报与出行提醒 (Weather Forecast & Travel Advisory)',
    slug: 'tianqi-yubao-chuxing',
    level: 'HSK 2',
    topic: '天气',
    duration: 120,
    difficulty: 'Elementary',
    tags: ['天气', '降温', '预报', '穿衣'],
    vocabularyIds: [],
    grammarIds: [],
    questionIds: [],
    transcript: `播音员：各位听众朋友早上好，这里是中央气象台早间天气播报。
受强冷空气南下影响，华北地区今天傍晚将迎来大幅度降温，伴随四到五级偏北风。
夜间最低气温将骤降至零下五度。提醒广大市民朋友添衣保暖，谨防感冒。
明后两天全省天气以晴转多云为主，气温将缓慢回升。`,
    transcriptSegments: [
      { id: 'seg-zh-11-1', startTime: 0, endTime: 5.0, speaker: '播音员', text: '各位听众朋友早上好，这里是中央气象台早间天气播报。', pinyin: 'Gèwèi tīngzhòng péngyou zǎoshang hǎo, zhèlǐ shì Zhōngyāng Qìxiàngtái zǎojiān tiānqì bōbào.', translation: 'Kính chào quý vị thính giả, đây là bản tin thời tiết buổi sáng từ Đài Khí tượng Trung ương.' },
      { id: 'seg-zh-11-2', startTime: 5.0, endTime: 13.0, speaker: '播音员', text: '受强冷空气南下影响，华北地区今天傍晚将迎来大幅度降温，伴随四到五级偏北风。', pinyin: 'Shòu qiáng lěng kōngqì nánxià yǐngxiǎng, Huáběi dìqū jīntiān bàngwǎn jiāng yínglái dà fúdù jiàngwēn, bànsuí sì dào wǔ jí piān běi fēng.', translation: 'Do ảnh hưởng của không khí lạnh tràn về phía nam, khu vực Hoa Bắc chiều tối nay nhiệt độ giảm sâu, kèm theo gió bắc cấp 4 đến cấp 5.' },
      { id: 'seg-zh-11-3', startTime: 13.0, endTime: 20.0, speaker: '播音员', text: '夜间最低气温将骤降至零下五度。提醒广大市民朋友添衣保暖，谨防感冒。', pinyin: 'Yèjiān zuìdī qìwēn jiāng zhòujiàng zhì língxià wǔ dù. Tíxǐng guǎngdà shìmín péngyou tiānyī bǎonuǎn, jǐnfáng gǎnmào.', translation: 'Nhiệt độ thấp nhất ban đêm sẽ tụt xuống âm 5 độ. Xin nhắc nhở quý bà con mặc ấm giữ nhiệt, phòng tránh cảm cúm.' },
      { id: 'seg-zh-11-4', startTime: 20.0, endTime: 27.0, speaker: '播音员', text: '明后两天全省天气以晴转多云为主，气温将缓慢回升。', pinyin: 'Míng hòu liǎng tiān quán shěng tiānqì yǐ qíng zhuǎn duōyún wéizhǔ, qìwēn jiāng huǎnmàn huíshēng.', translation: 'Hai ngày tới thời tiết toàn tỉnh chủ yếu nắng chuyển nhiều mây, nhiệt độ sẽ nhích tăng trở lại.' }
    ]
  },
  {
    id: 'zh-listen-12',
    language: 'zh',
    title: '在书店选购历史书籍 (Browsing Books at the Bookstore)',
    slug: 'zai-shudian-xuangou-tushu',
    level: 'HSK 4',
    topic: '购物',
    duration: 140,
    difficulty: 'Intermediate',
    tags: ['书店', '阅读', '历史', '文化'],
    vocabularyIds: [],
    grammarIds: [],
    questionIds: [],
    transcript: `顾客：你好，请问中国古代通史类的专架在哪个区域？
店员：您好！人文历史专区在三楼右侧，按照朝代编年顺序陈列。
顾客：我想找一本适合初学者读的《史记》白话文译本，有推荐的吗？
店员：中华书局出版的这套精注精译本很受欢迎，左侧是原文，右侧是通俗流畅的现代汉语翻译，还配有插图。
顾客：这本编排得很清晰，我买这套了。`,
    transcriptSegments: [
      { id: 'seg-zh-12-1', startTime: 0, endTime: 5.5, speaker: '顾客', text: '你好，请问中国古代通史类的专架在哪个区域？', pinyin: 'Nǐ hǎo, qǐngwèn Zhōngguó gǔdài tōngshǐ lèi de zhuānjià zài nǎge qūyù?', translation: 'Chào bạn, cho mình hỏi giá sách thông sử cổ đại Trung Quốc ở khu vực nào vậy?' },
      { id: 'seg-zh-12-2', startTime: 5.5, endTime: 11.5, speaker: '店员', text: '您好！人文历史专区在三楼右侧，按照朝代编年顺序陈列。', pinyin: 'Nín hǎo! Rénwén lìshǐ zhuānqū zài sān lóu yòucè, ànzhào cháodài biānnián shùnxù chénliè.', translation: 'Chào bạn! Khu vực lịch sử nhân văn ở bên phải tầng ba, xếp theo trình tự niên đại các triều đại.' },
      { id: 'seg-zh-12-3', startTime: 11.5, endTime: 17.5, speaker: '顾客', text: '我想找一本适合初学者读的《史记》白话文译本，有推荐的吗？', pinyin: 'Wǒ xiǎng zhǎo yì běn shìhé chūxuézhě dú de Shǐjì báihuàwén yìběn, yǒu tuījiàn de ma?', translation: 'Mình muốn tìm một bản dịch bạch thoại Sử Ký phù hợp cho người mới bắt đầu đọc, bạn có gợi ý cuốn nào không?' },
      { id: 'seg-zh-12-4', startTime: 17.5, endTime: 26.5, speaker: '店员', text: '中华书局出版的这套精注精译本很受欢迎，左侧是原文，右侧是通俗流畅的现代汉语翻译，还配有插图。', pinyin: 'Zhōnghuá Shūjú chūbǎn de zhè tào jīngzhù jīngyì běn hěn shòu huānyíng, zuǒcè shì yuánwén, yòucè shì tōngsú liùchàng de xiàndài Hànyǔ fānyì, hái pèi yǒu chātú.', translation: 'Bộ sách dịch và chú giải kỹ lưỡng của Trung Hoa Thư Cục được rất nhiều người chuộng, bên trái là nguyên văn, bên phải là bản dịch hiện đại dễ hiểu và có minh họa.' },
      { id: 'seg-zh-12-5', startTime: 26.5, endTime: 31.0, speaker: '顾客', text: '这本编排得很清晰，我买这套了。', pinyin: 'Zhè běn biānpái de hěn qīngxī, wǒ mǎi zhè tào le.', translation: 'Bản này trình bày rất rõ ràng, mình sẽ mua bộ này.' }
    ]
  },
  {
    id: 'zh-listen-13',
    language: 'zh',
    title: '预订高铁车票 (Reserving High-Speed Rail Tickets)',
    slug: 'yuding-gaotie-chepiao',
    level: 'HSK 3',
    topic: '旅行',
    duration: 135,
    difficulty: 'Intermediate',
    tags: ['高铁', '12306', '车票', '出行'],
    vocabularyIds: [],
    grammarIds: [],
    questionIds: [],
    transcript: `旅客：你好，我想买一张明天上午从北京南站到南京南站的高铁二等座。
售票员：明天上午八点半的G11次列车，二等座还有票，票价是四百六十元。
旅客：好的，请帮我选一个靠窗的座位。
售票员：好的，为您选择了07车厢12F座，靠窗。请把二代身份证放在识读区。
旅客：好的，放好了。可以用支付宝付款吗？
售票员：可以，出票成功，直接刷身份证进站即可，无需换取纸质车票。`,
    transcriptSegments: [
      { id: 'seg-zh-13-1', startTime: 0, endTime: 6.0, speaker: '旅客', text: '你好，我想买一张明天上午从北京南站到南京南站的高铁二等座。', pinyin: 'Nǐ hǎo, wǒ xiǎng mǎi yì zhāng míngtiān shàngwǔ cóng Běijīng Nán Zhàn dào Nánjīng Nán Zhàn de gāotiě èrděngzuò.', translation: 'Chào chị, tôi muốn mua một vé hạng hai tàu cao tốc từ ga Bắc Kinh Nam đi Nam Kinh Nam sáng mai.' },
      { id: 'seg-zh-13-2', startTime: 6.0, endTime: 13.0, speaker: '售票员', text: '明天上午八点半的G11次列车，二等座还有票，票价是四百六十元。', pinyin: 'Míngtiān shàngwǔ bā diǎn bàn de G11 cì lièchē, èrděngzuò hái yǒu piào, piàojià shì sìbǎi liùshí yuán.', translation: 'Chuyến G11 khởi hành 8h30 sáng mai hạng hai vẫn còn vé, giá là 460 tệ.' },
      { id: 'seg-zh-13-3', startTime: 13.0, endTime: 16.5, speaker: '旅客', text: '好的，请帮我选一个靠窗的座位。', pinyin: 'Hǎo de, qǐng bāng wǒ xuǎn yí gè kào chuāng de zuòwèi.', translation: 'Vâng, chọn giúp tôi ghế ngồi gần cửa sổ nhé.' },
      { id: 'seg-zh-13-4', startTime: 16.5, endTime: 23.0, speaker: '售票员', text: '好的，为您选择了07车厢12F座，靠窗。请把二代身份证放在识读区。', pinyin: 'Hǎo de, wèi nín xuǎnzé le 07 chēxiāng 12F zuò, kào chuāng. Qǐng bǎ èrdài shēnfènzhèng fàng zài shìdú qū.', translation: 'Được rồi, đã chọn cho anh toa 07 ghế 12F sát cửa sổ. Mời đặt căn cước vào máy đọc.' },
      { id: 'seg-zh-13-5', startTime: 23.0, endTime: 27.0, speaker: '旅客', text: '好的，放好了。可以用支付宝付款吗？', pinyin: 'Hǎo de, fàng hǎo le. Kěyǐ yòng Zhīfùbǎo fùkuǎn ma?', translation: 'Vâng, tôi đặt rồi. Trả bằng Alipay được chứ?' },
      { id: 'seg-zh-13-6', startTime: 27.0, endTime: 34.0, speaker: '售票员', text: '可以，出票成功，直接刷身份证进站即可，无需换取纸质车票。', pinyin: 'Kěyǐ, chūpiào chénggōng, zhíjiē shuā shēnfènzhèng jìnzhàn jíkě, wúxū huànqǔ zhǐzhì chēpiào.', translation: 'Được ạ, xuất vé thành công rồi, anh chỉ cần quẹt căn cước vào ga, không cần đổi vé giấy.' }
    ]
  },
  {
    id: 'zh-listen-14',
    language: 'zh',
    title: '在公司面试自我介绍 (Self-Introduction at Job Interview)',
    slug: 'gongsi-mianshi-ziwo-jieshao',
    level: 'HSK 5',
    topic: '工作',
    duration: 175,
    difficulty: 'Advanced',
    tags: ['面试', '求职', '自我介绍', '职场'],
    vocabularyIds: [],
    grammarIds: [],
    questionIds: [],
    transcript: `面试官：张先生，欢迎参加今天的复试。请用两到三分钟简要介绍一下您的专业背景和核心优势。
张先生：各位面试官下午好。我硕士毕业于复旦大学计算机系，拥有四年的云原生架构研发经验。
在上一家科技公司，我主导了微服务架构迁移工程，将核心交易接口的峰值吞吐量提升了三倍。
我善于跨团队沟通协作，能够快速将复杂的业务诉求转化为技术方案。非常期待加入贵公司的基础架构平台部。`,
    transcriptSegments: [
      { id: 'seg-zh-14-1', startTime: 0, endTime: 7.5, speaker: '面试官', text: '张先生，欢迎参加今天的复试。请用两到三分钟简要介绍一下您的专业背景和核心优势。', pinyin: 'Zhāng xiānsheng, huānyíng cānjiā jīntiān de fùshì. Qǐng yòng liǎng dào sān fēnzhōng jiǎnyào jièshào yíxià nín de zhuānyè bèijǐng hé héxīn yōushì.', translation: 'Chào anh Trương, chào mừng anh đến với vòng phỏng vấn thứ hai. Mời anh dành 2-3 phút giới thiệu tóm tắt nền tảng chuyên môn và thế mạnh cốt lõi.' },
      { id: 'seg-zh-14-2', startTime: 7.5, endTime: 16.5, speaker: '张先生', text: '各位面试官下午好。我硕士毕业于复旦大学计算机系，拥有四年的云原生架构研发经验。', pinyin: 'Gèwèi miànshìguān xiàwǔ hǎo. Wǒ shuòshì bìyè yú Fùdàn Dàxué jìsuànjī xì, yǒngyǒu sì nián de yún yuánshēng jiàgòu yánfā jīngyàn.', translation: 'Chào các vị phỏng vấn viên. Tôi tốt nghiệp thạc sĩ khoa máy tính ĐH Phục Đán, có 4 năm kinh nghiệm nghiên cứu kiến trúc cloud-native.' },
      { id: 'seg-zh-14-3', startTime: 16.5, endTime: 26.5, speaker: '张先生', text: '在上一家科技公司，我主导了微服务架构迁移工程，将核心交易接口的峰值吞吐量提升了三倍。', pinyin: 'Zài shàng yì jiā kējì gōngsī, wǒ zhǔdǎo le wēifúwù jiàgòu qiānyí gōngchéng, jiāng héxīn jiāoyì jiēkǒu de fēngzhí tūngtǔliàng tíshēng le sān bèi.', translation: 'Tại công ty công nghệ trước, tôi chủ trì dự án chuyển đổi kiến trúc microservices, nâng sản lượng xử lý đỉnh của cổng giao dịch cốt lõi lên gấp ba lần.' },
      { id: 'seg-zh-14-4', startTime: 26.5, endTime: 36.0, speaker: '张先生', text: '我善于跨团队沟通协作，能够快速将复杂的业务诉求转化为技术方案。非常期待加入贵公司的基础架构平台部。', pinyin: 'Wǒ shànyú kuà tuánduì gōutōng xiézuò, nénggòu kuàisù jiāng fùzá de yèwù sùqiú zhuǎnhuà wéi jìshù fāng\'àn. Fēicháng qīdài jiārù guì gōngsī de jīchǔ jiàgòu píngtáibù.', translation: 'Tôi có khả năng giao tiếp phối hợp liên đội ngũ, chuyển đổi nhanh nhu cầu nghiệp vụ phức tạp thành giải pháp kỹ thuật. Rất mong muốn được gia nhập bộ phận hạ tầng nền tảng của quý công ty.' }
    ]
  },
  {
    id: 'zh-listen-15',
    language: 'zh',
    title: '在理发店修剪发型 (At the Hair Salon)',
    slug: 'zai-lifadian-xiujian-faxing',
    level: 'HSK 2',
    topic: '日常生活',
    duration: 130,
    difficulty: 'Elementary',
    tags: ['理发', '发型', '日常', '服务'],
    vocabularyIds: [],
    grammarIds: [],
    questionIds: [],
    transcript: `理发师：帅哥您好，今天想怎么剪？
顾客：两侧和后面帮我推短一点，上面稍微打薄，刘海剪到眉毛上面一点。
理发师：好的。后面需要剃个渐变过渡吗？
顾客：可以，自然过渡就好。另外两边鬓角留着不用剪。
理发师：收到。我们先洗个头，然后再细剪。`,
    transcriptSegments: [
      { id: 'seg-zh-15-1', startTime: 0, endTime: 4.0, speaker: '理发师', text: '帅哥您好，今天想怎么剪？', pinyin: 'Shuàigē nín hǎo, jīntiān xiǎng zěnme jiǎn?', translation: 'Chào anh đẹp trai, hôm nay anh muốn cắt thế nào?' },
      { id: 'seg-zh-15-2', startTime: 4.0, endTime: 11.0, speaker: '顾客', text: '两侧和后面帮我推短一点，上面稍微打薄，刘海剪到眉毛上面一点。', pinyin: 'Liǎng cè hé hòumiàn bāng wǒ tuī duǎn yìdiǎn, shàngmiàn shāowēi dǎ báo, liúhǎi jiǎn dào méimao shàngmiàn yìdiǎn.', translation: 'Hai bên và đằng sau đẩy ngắn giúp tôi một chút, phía trên tỉa mỏng nhẹ, mái cắt trên lông mày một tí.' },
      { id: 'seg-zh-15-3', startTime: 11.0, endTime: 15.0, speaker: '理发师', text: '好的。后面需要剃个渐变过渡吗？', pinyin: 'Hǎo de. Hòumiàn xūyào tì gè jiànbiàn guòdù ma?', translation: 'Được ạ. Phía sau có cần cạo fade chuyển màu dần không anh?' },
      { id: 'seg-zh-15-4', startTime: 15.0, endTime: 21.0, speaker: '顾客', text: '可以，自然过渡就好。另外两边鬓角留着不用剪。', pinyin: 'Kěyǐ, zìrán guòdù jiù hǎo. Lìngwài liǎng biān bìnjiǎo liú zhe bú yòng jiǎn.', translation: 'Được, mượt mà tự nhiên là được. Ngoài ra hai bên mai giữ lại đừng cắt nhé.' },
      { id: 'seg-zh-15-5', startTime: 21.0, endTime: 26.0, speaker: '理发师', text: '收到。我们先洗个头，然后再细剪。', pinyin: 'Shōudào. Wǒmen xiān xǐ gè tóu, ránhòu zài xì jiǎn.', translation: 'Đã rõ. Mời anh gội đầu trước rồi mình cắt tỉa chi tiết.' }
    ]
  },
  {
    id: 'zh-listen-16',
    language: 'zh',
    title: '讨论中国传统茶文化 (Exploring Chinese Tea Culture)',
    slug: 'chuantong-cha-wenhua',
    level: 'HSK 5',
    topic: '饮食',
    duration: 185,
    difficulty: 'Advanced',
    tags: ['茶文化', '龙井', '普洱', '传统文化'],
    vocabularyIds: [],
    grammarIds: [],
    questionIds: [],
    transcript: `茶艺师：中国茶道讲究“和、敬、清、寂”。绿茶清冽甘甜，而发酵茶则醇厚温润。
茶友：请问明前龙井为什么格外珍贵？
茶艺师：清明节前采摘的茶叶，经历了一个冬天的休眠，嫩芽初展，氨基酸含量极高，且产量十分有限。
冲泡明前龙井时，水温以八十五度为佳，过热容易烫坏娇嫩的芽叶，破坏清甜口感。`,
    transcriptSegments: [
      { id: 'seg-zh-16-1', startTime: 0, endTime: 9.0, speaker: '茶艺师', text: '中国茶道讲究“和、敬、清、寂”。绿茶清冽甘甜，而发酵茶则醇厚温润。', pinyin: 'Zhōngguó chádào jiǎngjiu "hé, jìng, qīng, jì". Lǜchá qīngliè gāntián, ér fājiào chá zé chúnhòu wēnrùn.', translation: 'Trà đạo Trung Hoa đề cao chữ "Hòa, Kính, Thanh, Tịch". Trà xanh thanh khiết ngọt lành, còn trà lên men thì đậm đà đằm ấm.' },
      { id: 'seg-zh-16-2', startTime: 9.0, endTime: 14.5, speaker: '茶友', text: '请问明前龙井为什么格外珍贵？', pinyin: 'Qǐngwèn míngqián Lóngjǐng wèishénme géwài zhēnguì?', translation: 'Xin hỏi vì sao trà Long Tỉnh hái trước Tiết Thanh Minh lại quý giá đến vậy?' },
      { id: 'seg-zh-16-3', startTime: 14.5, endTime: 24.0, speaker: '茶艺师', text: '清明节前采摘的茶叶，经历了一个冬天的休眠，嫩芽初展，氨基酸含量极高，且产量十分有限。', pinyin: 'Qīngmíngjié qián cǎizhāi de cháyè, jīnglì le yí gè dōngtiān de xiūmián, nènyá chū zhǎn, ānjīsuān hánliàng jí gāo, qiě chǎnliàng shífēn yǒuxiàn.', translation: 'Lá trà hái trước tiết Thanh Minh đã qua một mùa đông ngủ đông, búp non mới hé, hàm lượng axit amin cực cao mà sản lượng lại rất khan hiếm.' },
      { id: 'seg-zh-16-4', startTime: 24.0, endTime: 33.0, speaker: '茶艺师', text: '冲泡明前龙井时，水温以八十五度为佳，过热容易烫坏娇嫩的芽叶，破坏清甜口感。', pinyin: 'Chōngpào míngqián Lóngjǐng shí, shuǐwēn yǐ bāshíwǔ dù wéi jiā, guò rè róngyì tàng huài jiāonèn de yáyè, pòhuài qīngtián kǒugǎn.', translation: 'Khi pha Long Tỉnh trước Thanh Minh, nhiệt độ nước 85 độ là chuẩn nhất, nóng quá sẽ làm nát búp trà non, mất đi vị ngọt thanh.' }
    ]
  },
  {
    id: 'zh-listen-17',
    language: 'zh',
    title: '智能手机售后服务咨询 (Smartphone Customer Support)',
    slug: 'zhineng-shouji-shouhou',
    level: 'HSK 3',
    topic: '日常生活',
    duration: 140,
    difficulty: 'Intermediate',
    tags: ['手机', '维修', '售后', '科技'],
    vocabularyIds: [],
    grammarIds: [],
    questionIds: [],
    transcript: `客服：您好，官方售后服务中心，请问您的手机遇到了什么问题？
用户：你好，我的手机昨天不小心掉进水里了，虽然马上捞了出来，但是现在屏幕无法点亮。
客服：请问您手机进水后有尝试开机或者充电吗？
用户：没有，我立刻关机了，也没有插充电器。
客服：您的处理非常正确！请带好购机发票，尽快送至附近的服务门店，技术人员会为您拆机清洁并检测主板。`,
    transcriptSegments: [
      { id: 'seg-zh-17-1', startTime: 0, endTime: 6.0, speaker: '客服', text: '您好，官方售后服务中心，请问您的手机遇到了什么问题？', pinyin: 'Nín hǎo, guānfāng shòuhòu fúwù zhōngxīn, qǐngwèn nín de shǒujī yùdào le shénme wèntí?', translation: 'Xin chào, trung tâm bảo hành chính hãng xin nghe, điện thoại của bạn gặp sự cố gì ạ?' },
      { id: 'seg-zh-17-2', startTime: 6.0, endTime: 14.0, speaker: '用户', text: '你好，我的手机昨天不小心掉进水里了，虽然马上捞了出来，但是现在屏幕无法点亮。', pinyin: 'Nǐ hǎo, wǒ de shǒujī zuótiān bù xiǎoxīn diào jìn shuǐ lǐ le, suīrán mǎshàng lāo le chūlái, dànshì xiànzài píngmù wúfǎ diǎnliàng.', translation: 'Chào bạn, hôm qua điện thoại tôi vô tình rơi xuống nước, dù vớt lên ngay nhưng giờ màn hình không lên nữa.' },
      { id: 'seg-zh-17-3', startTime: 14.0, endTime: 18.5, speaker: '客服', text: '请问您手机进水后有尝试开机或者充电吗？', pinyin: 'Qǐngwèn nín shǒujī jìn shuǐ hòu yǒu chángshì kāijī huòzhě chōngdiàn ma?', translation: 'Cho hỏi sau khi rơi vào nước bạn có thử bật máy hay cắm sạc không?' },
      { id: 'seg-zh-17-4', startTime: 18.5, endTime: 22.5, speaker: '用户', text: '没有，我立刻关机了，也没有插充电器。', pinyin: 'Méiyǒu, wǒ lìkè guānjī le, yě méiyǒu chā chōngdiànqì.', translation: 'Không có, tôi tắt máy ngay lập tức và không cắm sạc.' },
      { id: 'seg-zh-17-5', startTime: 22.5, endTime: 32.0, speaker: '客服', text: '您的处理非常正确！请带好购机发票，尽快送至附近的服务门店，技术人员会为您拆机清洁并检测主板。', pinyin: 'Nín de chǔlǐ fēicháng zhèngquè! Qǐng dài hǎo gòujī fāpiào, jǐnkuài sòng zhì fùjìn de fúwù méndiàn, jìshù rényuán huì wèi nín chāijī qīngjié bìng jiǎncè zhǔbǎn.', translation: 'Xử lý như vậy rất chuẩn xác! Bạn mang theo hóa đơn mua máy qua cửa hàng gần nhất, kỹ thuật viên sẽ tháo máy vệ sinh và đo bo mạch.' }
    ]
  },
  {
    id: 'zh-listen-18',
    language: 'zh',
    title: '在北京胡同漫步 (Strolling through Beijing Hutongs)',
    slug: 'zai-beijing-hutong-manbu',
    level: 'HSK 3',
    topic: '旅行',
    duration: 150,
    difficulty: 'Intermediate',
    tags: ['胡同', '北京', '四合院', '文化'],
    vocabularyIds: [],
    grammarIds: [],
    questionIds: [],
    transcript: `导游：各位游客，我们现在漫步的南锣鼓巷是北京最古老的街区之一，至今已有七百多年的历史。
游客：请问胡同两边灰色砖墙里的大院子就是四合院吗？
导游：对。四合院由正房、倒座房、东厢房和西厢房围合而成，中间是一个宽敞的天井，种着枣树和石榴树。
不仅居住舒适，更体现了中国传统家族长幼有序、阖家团圆的文化理念。`,
    transcriptSegments: [
      { id: 'seg-zh-18-1', startTime: 0, endTime: 8.0, speaker: '导游', text: '各位游客，我们现在漫步的南锣鼓巷是北京最古老的街区之一，至今已有七百多年的历史。', pinyin: 'Gèwèi yóukè, wǒmen xiànzài mànbù de Nánluógǔxiàng shì Běijīng zuì gǔlǎo de jiēqū zhīyī, zhìjīn yǐ yǒu qībǎi duō nián de lìshǐ.', translation: 'Kính thưa quý khách, con hẻm Nam La Cổ Hạng chúng ta đang tản bộ là một trong những khu phố cổ nhất Bắc Kinh, đã có hơn 700 năm lịch sử.' },
      { id: 'seg-zh-18-2', startTime: 8.0, endTime: 14.0, speaker: '游客', text: '请问胡同两边灰色砖墙里的大院子就是四合院吗？', pinyin: 'Qǐngwèn hútòng liǎngbiān huīsè zhuānqiáng lǐ de dà yuànzi jiùshì sìhéyuàn ma?', translation: 'Cho hỏi sân lớn đằng sau bức tường gạch xám hai bên ngõ kia có phải Tứ Hợp Viện không ạ?' },
      { id: 'seg-zh-18-3', startTime: 14.0, endTime: 23.0, speaker: '导游', text: '对。四合院由正房、倒座房、东厢房和西厢房围合而成，中间是一个宽敞的天井，种着枣树和石榴树。', pinyin: 'Duì. Sìhéyuàn yóu zhèngfáng, dàozuòfáng, dōng xiāngfáng hé xī xiāngfáng wéihé ér chéng, zhōngjiān shì yí gè kuānchang de tiānjǐng, zhòng zhe zǎoshù hé shíliushù.', translation: 'Đúng vậy. Tứ hợp viện được bao bọc bởi nhà chính, nhà đảo tọa, sương phòng đông và sương phòng tây, giữa là giếng trời rộng trồng táo và lựu.' },
      { id: 'seg-zh-18-4', startTime: 23.0, endTime: 32.0, speaker: '导游', text: '不仅居住舒适，更体现了中国传统家族长幼有序、阖家团圆的文化理念。', pinyin: 'Bùjǐn jūzhù shūshì, gèng tǐxiàn le Zhōngguó chuántǒng jiāzú zhǎngyòu yǒuxù, héjiā tuányuán de wénhuà lǐniàn.', translation: 'Không những ở thoải mái mà còn thể hiện đạo lý gia tộc truyền thống trên kính dưới nhường, sum vầy đoàn viên.' }
    ]
  },
  {
    id: 'zh-listen-19',
    language: 'zh',
    title: '健身房私教体能评估 (Personal Training Fitness Assessment)',
    slug: 'jianshenfang-sijiao-pinggu',
    level: 'HSK 3',
    topic: '日常生活',
    duration: 145,
    difficulty: 'Intermediate',
    tags: ['健身', '运动', '健康', '习惯'],
    vocabularyIds: [],
    grammarIds: [],
    questionIds: [],
    transcript: `教练：王先生，我们刚刚测完身体成分指标。目前您的体脂率是百分之二十二，骨骼肌含量稍显不足。
学员：对，平时在办公室久坐，很少做力量训练。我的主要目标是减掉腰腹赘肉，改善含胸驼背。
教练：非常明确的目标。建议每周进行三次抗阻力量训练，配合两次中等强度的有氧运动。
我们先从深蹲和核心平板支撑开始，调整您的身体发力习惯。`,
    transcriptSegments: [
      { id: 'seg-zh-19-1', startTime: 0, endTime: 8.0, speaker: '教练', text: '王先生，我们刚刚测完身体成分指标。目前您的体脂率是百分之二十二，骨骼肌含量稍显不足。', pinyin: 'Wáng xiānsheng, wǒmen gānggang cè wán shēntǐ chéngfèn zhǐbiāo. Mùqián nín de tǐzhǐ lǜ shì bǎifēnzhī èrshí\'èr, gǔgéjī hánliàng shāoxiǎn bùzú.', translation: 'Anh Vương, chúng ta vừa đo xong chỉ số cơ thể. Hiện tỷ lệ mỡ của anh là 22%, lượng cơ bắp hơi thiếu một chút.' },
      { id: 'seg-zh-19-2', startTime: 8.0, endTime: 16.0, speaker: '学员', text: '对，平时在办公室久坐，很少做力量训练。我的主要目标是减掉腰腹赘肉，改善含胸驼背。', pinyin: 'Duì, píngshí zài bàngōngshì jiǔzuò, hěn shǎo zuò lìliang xùnliàn. Wǒ de zhǔyào mùbiāo shì jiǎn diào yāofù zhuìròu, gǎishàn hánxiōng tuóbèi.', translation: 'Đúng vậy, bình thường tôi ngồi văn phòng nhiều, ít tập tạ. Mục tiêu chính là giảm mỡ bụng eo và sửa dáng gù lưng.' },
      { id: 'seg-zh-19-3', startTime: 16.0, endTime: 24.0, speaker: '教练', text: '非常明确的目标。建议每周进行三次抗阻力量训练，配合两次中等强度的有氧运动。', pinyin: 'Fēicháng míngquè de mùbiāo. Jiànyì měi zhōu jìnxíng sān cì kàngzǔ lìliang xùnliàn, pèihé liǎng cì zhōngděng qiángdù de yǒuyǎng yùndòng.', translation: 'Mục tiêu rất rõ ràng. Tôi đề xuất mỗi tuần tập tạ kháng lực 3 buổi, kết hợp 2 buổi cardio cường độ vừa.' },
      { id: 'seg-zh-19-4', startTime: 24.0, endTime: 31.0, speaker: '教练', text: '我们先从深蹲和核心平板支撑开始，调整您的身体发力习惯。', pinyin: 'Wǒmen xiān cóng shēndūn hé héxīn píngbǎn zhīchēng kāishǐ, tiáozhěng nín de shēntǐ fālì xíguàn.', translation: 'Chúng ta sẽ bắt đầu từ bài squat và plank cơ lõi để điều chỉnh thói quen phát lực cơ thể nhé.' }
    ]
  },
  {
    id: 'zh-listen-20',
    language: 'zh',
    title: '数字经济与绿色可持续发展 (Digital Economy & Green Growth)',
    slug: 'shuzi-jingji-yu-lvse-fazhan',
    level: 'HSK 6',
    topic: '工作',
    duration: 210,
    difficulty: 'Advanced',
    tags: ['数字经济', '绿色金融', '可持续发展', '宏观经济'],
    vocabularyIds: [],
    grammarIds: [],
    questionIds: [],
    transcript: `主持人：各位学者专家，当前全球产业链重塑与低碳转型交织，中国如何依托数字基建赋能绿色发展？
经济学家：数字技术与实体经济深度融合是实现双碳目标的关键支点。
通过在能源互联网部署智能调度算法，不仅能有效平抑新能源发电的间歇性波动，更能催生碳资产数字化交易等新型金融业态。
这为全球可持续治理提供了兼具效率与包容性的创新范式。`,
    transcriptSegments: [
      { id: 'seg-zh-20-1', startTime: 0, endTime: 11.0, speaker: '主持人', text: '各位学者专家，当前全球产业链重塑与低碳转型交织，中国如何依托数字基建赋能绿色发展？', pinyin: 'Gèwèi xuézhě zhuānjiā, dāngqián quánqiú chǎnyèliàn chóngshù yǔ dītàn zhuǎnxíng jiāozhī, Zhōngguó rúhé yītuō shùzì jījiàn fùnéng lǜsè fāzhǎn?', translation: 'Kính thưa các học giả chuyên gia, hiện nay tái định hình chuỗi sản xuất toàn cầu đang đan xen với chuyển đổi phát thải thấp, Trung Quốc dựa vào hạ tầng số để trợ lực cho phát triển xanh ra sao?' },
      { id: 'seg-zh-20-2', startTime: 11.0, endTime: 18.0, speaker: '经济学家', text: '数字技术与实体经济深度融合是实现双碳目标的关键支点。', pinyin: 'Shùzì jìshù yǔ shítǐ jīngjì shēndù rónghé shì shíxiàn shuāng tàn mùbiāo de guānjiàn zhīdiǎn.', translation: 'Sự dung hợp sâu sắc giữa công nghệ số và nền kinh tế thực chính là điểm tựa mấu chốt để hiện thực hóa mục tiêu kép về carbon.' },
      { id: 'seg-zh-20-3', startTime: 18.0, endTime: 28.0, speaker: '经济学家', text: '通过在能源互联网部署智能调度算法，不仅能有效平抑新能源发电的间歇性波动，更能催生碳资产数字化交易等新型金融业态。', pinyin: 'Tōngguò zài néngyuán hùliánwǎng bùshǔ zhìnéng diàodù suànfǎ, bùjǐn néng yǒuxiào píngyì xīn néngyuán fādiàn de jiànxiēxìng bōdòng, gèng néng cuīshēng tàn zīchǎn shùzìhuà jiāoyì děng xīnxíng jīnróng yètài.', translation: 'Nhờ triển khai thuật toán điều phối thông minh trên mạng lưới internet năng lượng, không chỉ triệt tiêu dao động gián đoạn của năng lượng mới mà còn khai sinh hình thái tài chính số mới như giao dịch tài sản carbon.' },
      { id: 'seg-zh-20-4', startTime: 28.0, endTime: 37.0, speaker: '经济学家', text: '这为全球可持续治理提供了兼具效率与包容性的创新范式。', pinyin: 'Zhè wèi quánqiú kěchíxù zhìlǐ tígōng le jiānjù xiàolǜ yǔ bāoróngxìng de chuàngxīn fànshì.', translation: 'Điều này mang đến mô hình đổi mới vừa giàu hiệu suất vừa mang tính bao trùm cho nền quản trị bền vững toàn cầu.' }
    ]
  }
];
