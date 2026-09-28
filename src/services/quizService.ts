import { QuizModel } from '../types/quiz';
import { QUIZ_MODELS } from '../data/quizModels';
import { VocabularyWord, LanguageCode } from '../types/vocabulary';
import { GrammarConcept } from '../types/grammar';
import { QUESTIONS_BANK } from '../data/questions';
import { masteryService } from './masteryService';

class QuizService {
  getQuizBySlug(slug: string): QuizModel | undefined {
    return QUIZ_MODELS.find((q) => q.slug === slug || q.id === slug);
  }

  createQuizFromVocabulary(word: VocabularyWord): string {
    const slug = `quiz-vocab-${word.slug}`;
    const existing = this.getQuizBySlug(slug);
    if (existing) return existing.slug;

    // Find questions linked to this vocabulary or fallback to general language vocabulary questions
    const matchedQuestions = QUESTIONS_BANK.filter(
      (q) => q.vocabularyId === word.id || q.tags.includes(word.word.toLowerCase()) || q.topicId === word.topicId
    );

    const questionIds = matchedQuestions.length >= 3
      ? matchedQuestions.slice(0, 5).map((q) => q.id)
      : word.language === 'en'
      ? ['en-mc-02', 'en-mc-03', 'en-fb-01']
      : ['zh-mc-01', 'zh-mc-02', 'zh-fb-01'];

    const newQuiz: QuizModel = {
      id: `quiz-vocab-${word.id}`,
      slug,
      title: `Luyện Tập Từ Vựng: ${word.word.toUpperCase()} (${word.meaning})`,
      categoryId: word.language === 'en' ? 'tieng-anh' : 'tieng-trung',
      categoryName: word.language === 'en' ? 'TIẾNG ANH' : 'TIẾNG TRUNG',
      description: `Bài kiểm tra nhanh mức độ ghi nhớ nghĩa, ngữ cảnh sử dụng và collocations của từ "${word.word}".`,
      type: 'practice',
      skills: ['Vocabulary'],
      topics: [word.topicName, word.word],
      questionIds,
      questionCount: questionIds.length,
      difficulty: word.level.includes('B') || word.level.includes('3') ? 'Intermediate' : 'Beginner',
      duration: 5,
      passingScore: 70,
      randomizeQuestions: true,
      randomizeOptions: true,
      showExplanation: true,
      allowRetry: true,
      createdAt: new Date().toISOString()
    };

    QUIZ_MODELS.push(newQuiz);
    return newQuiz.slug;
  }

  createQuizFromGrammar(concept: GrammarConcept): string {
    const slug = `quiz-grammar-${concept.slug}`;
    const existing = this.getQuizBySlug(slug);
    if (existing) return existing.slug;

    const matchedQuestions = QUESTIONS_BANK.filter(
      (q) => q.grammarConceptId === concept.id || q.tags.includes(concept.slug) || q.topicId === concept.topic
    );

    const questionIds = matchedQuestions.length >= 3
      ? matchedQuestions.slice(0, 5).map((q) => q.id)
      : concept.language === 'en'
      ? ['en-mc-01', 'en-mc-04', 'en-tf-01', 'en-ord-01']
      : ['zh-mc-04', 'zh-ord-01', 'zh-tr-01'];

    const newQuiz: QuizModel = {
      id: `quiz-gram-${concept.id}`,
      slug,
      title: `Kiểm Tra Ngữ Pháp: ${concept.title}`,
      categoryId: concept.language === 'en' ? 'tieng-anh' : 'tieng-trung',
      categoryName: concept.language === 'en' ? 'TIẾNG ANH' : 'TIẾNG TRUNG',
      description: `Đánh giá khả năng nhận diện quy tắc, sửa lỗi sai và vận dụng chuẩn xác cấu trúc ${concept.title}.`,
      type: 'practice',
      skills: ['Grammar', 'Writing'],
      topics: [concept.topicName, concept.title],
      questionIds,
      questionCount: questionIds.length,
      difficulty: concept.level.includes('B2') || concept.level.includes('C') || concept.level.includes('4') ? 'Upper Intermediate' : 'Intermediate',
      duration: 8,
      passingScore: 75,
      randomizeQuestions: true,
      randomizeOptions: true,
      showExplanation: true,
      allowRetry: true,
      createdAt: new Date().toISOString()
    };

    QUIZ_MODELS.push(newQuiz);
    return newQuiz.slug;
  }

  createTopicQuiz(topicSlug: string, kind: 'vocabulary' | 'grammar', language: LanguageCode): string {
    const slug = `quiz-topic-${language}-${topicSlug}`;
    const existing = this.getQuizBySlug(slug);
    if (existing) return existing.slug;

    const fallbackQuestions = language === 'en'
      ? ['en-mc-01', 'en-mc-02', 'en-mc-03', 'en-fb-01', 'en-tf-01']
      : ['zh-mc-01', 'zh-mc-02', 'zh-mc-03', 'zh-fb-01', 'zh-ord-01'];

    const newQuiz: QuizModel = {
      id: slug,
      slug,
      title: `${kind === 'vocabulary' ? 'Từ Vựng Chuyên Đề' : 'Ngữ Pháp Chuyên Đề'}: ${topicSlug.toUpperCase()}`,
      categoryId: language === 'en' ? 'tieng-anh' : 'tieng-trung',
      categoryName: language === 'en' ? 'TIẾNG ANH' : 'TIẾNG TRUNG',
      description: `Bài luyện tập tổng hợp giúp bạn củng cố kiến thức theo chuyên đề ${topicSlug}.`,
      type: 'topic',
      skills: kind === 'vocabulary' ? ['Vocabulary'] : ['Grammar'],
      topics: [topicSlug],
      questionIds: fallbackQuestions,
      questionCount: fallbackQuestions.length,
      difficulty: 'Intermediate',
      duration: 10,
      passingScore: 70,
      randomizeQuestions: true,
      randomizeOptions: true,
      showExplanation: true,
      allowRetry: true,
      createdAt: new Date().toISOString()
    };

    QUIZ_MODELS.push(newQuiz);
    return newQuiz.slug;
  }
  createAdaptiveQuiz(language: LanguageCode, limit = 10): string {
    const categoryId = language === 'en' ? 'tieng-anh' : 'tieng-trung';
    const mastery = masteryService.getSnapshot(language);
    const targetSize = Math.max(5, Math.min(limit, 15));
    const languageQuestions = QUESTIONS_BANK.filter((q) => q.categoryId === categoryId);
    const weakRecords = masteryService.getWeakQuestions(Math.max(targetSize * 2, 10), language);
    const weakIds = new Set(weakRecords.map((q) => q.entityId));
    const weakQuestions = languageQuestions
      .filter((q) => weakIds.has(q.id))
      .sort((a, b) => {
        const am = mastery.questions.find((item) => item.entityId === a.id);
        const bm = mastery.questions.find((item) => item.entityId === b.id);
        const aEvidence = am?.evidenceLevel === 'new' ? 0 : am?.evidenceLevel === 'developing' ? 1 : 2;
        const bEvidence = bm?.evidenceLevel === 'new' ? 0 : bm?.evidenceLevel === 'developing' ? 1 : 2;
        return aEvidence - bEvidence || (am?.mastery ?? 0) - (bm?.mastery ?? 0);
      });
    const weakTopicIds = mastery.topics
      .filter((topic) => topic.mastery < 80)
      .sort((a, b) => a.mastery - b.mastery || b.attempts - a.attempts)
      .map((topic) => topic.entityId);
    const weakTopicSet = new Set(weakTopicIds);

    // First pass: weakest questions, while keeping topic diversity.
    const selectedQuestions: typeof languageQuestions = [];
    const selectedIds = new Set<string>();
    const topicCounts = new Map<string, number>();
    const addQuestion = (question: typeof languageQuestions[number], maxPerTopic = 2) => {
      if (selectedIds.has(question.id)) return false;
      const count = topicCounts.get(question.topicId) ?? 0;
      if (count >= maxPerTopic) return false;
      selectedQuestions.push(question);
      selectedIds.add(question.id);
      topicCounts.set(question.topicId, count + 1);
      return true;
    };

    weakQuestions.forEach((question) => {
      if (selectedQuestions.length < targetSize) addQuestion(question, 3);
    });

    // Second pass: fill from the weakest topics before falling back to general practice.
    languageQuestions
      .filter((question) => weakTopicSet.has(question.topicId))
      .sort((a, b) => {
        const ai = weakTopicIds.indexOf(a.topicId);
        const bi = weakTopicIds.indexOf(b.topicId);
        return ai - bi;
      })
      .forEach((question) => {
        if (selectedQuestions.length < targetSize) addQuestion(question, 2);
      });

    // Final pass: use unseen language-scoped questions so the session remains useful
    // even when the learner has little or no mastery history.
    languageQuestions.forEach((question) => {
      if (selectedQuestions.length < targetSize) addQuestion(question, 1);
    });

    const selected = selectedQuestions.slice(0, targetSize);
    if (!selected.length) return 'daily-challenge';
    const slug = `quiz-adaptive-${language}-${selected.map((q) => q.id).sort().join('-')}`;
    const existing = this.getQuizBySlug(slug);
    if (existing) return existing.slug;
    const newQuiz: QuizModel = {
      id: slug,
      slug,
      title: language === 'zh' ? 'Adaptive Quiz · Ôn đúng điểm yếu' : 'Adaptive Quiz · Targeted Practice',
      categoryId,
      categoryName: language === 'zh' ? 'TIẾNG TRUNG' : 'TIẾNG ANH',
      description: language === 'zh'
        ? 'Bài luyện được chọn từ những câu và chủ đề tiếng Trung bạn đang cần củng cố.'
        : 'Bài luyện được chọn từ những câu và chủ đề tiếng Anh bạn đang cần củng cố.',
      type: 'practice',
      skills: Array.from(new Set(selected.map((q) => q.skill))),
      topics: Array.from(new Set(selected.map((q) => q.topicId))),
      questionIds: selected.map((q) => q.id),
      questionCount: selected.length,
      difficulty: 'Intermediate',
      duration: Math.max(6, Math.ceil(selected.length * 1.2)),
      passingScore: 70,
      randomizeQuestions: true,
      randomizeOptions: true,
      showExplanation: true,
      allowRetry: true,
      createdAt: new Date().toISOString(),
    };
    QUIZ_MODELS.push(newQuiz);
    return newQuiz.slug;
  }

  createReviewQuiz(questionIds: string[], sourceQuizTitle = 'Quiz Review'): string {
    const validIds = questionIds.filter((id, index, arr) => arr.indexOf(id) === index);
    const slug = `quiz-review-${validIds.slice().sort().join('-')}`;
    const existing = this.getQuizBySlug(slug);
    if (existing) return existing.slug;

    const questions = validIds
      .map((id) => QUESTIONS_BANK.find((q) => q.id === id))
      .filter(Boolean);

    if (!questions.length) return 'daily-challenge';

    const categoryId = questions[0]!.categoryId;
    const categoryName =
      categoryId === 'tieng-anh' ? 'TIẾNG ANH' :
      categoryId === 'tieng-trung' ? 'TIẾNG TRUNG' :
      categoryId === 'phat-trien-ban-than' ? 'PHÁT TRIỂN BẢN THÂN' :
      'SỨC KHỎE & ĐỜI SỐNG';

    const newQuiz: QuizModel = {
      id: slug,
      slug,
      title: `Review câu sai · ${sourceQuizTitle}`,
      categoryId,
      categoryName,
      description: 'Bài luyện tập được tạo trực tiếp từ những câu bạn chưa làm đúng trong lần kiểm tra gần nhất.',
      type: 'review',
      skills: Array.from(new Set(questions.map((q) => q!.skill))),
      topics: Array.from(new Set(questions.map((q) => q!.topicId))),
      questionIds: questions.map((q) => q!.id),
      questionCount: questions.length,
      difficulty: 'Intermediate',
      duration: Math.max(5, questions.length * 2),
      passingScore: 70,
      randomizeQuestions: false,
      randomizeOptions: true,
      showExplanation: true,
      allowRetry: true,
      createdAt: new Date().toISOString(),
    };

    QUIZ_MODELS.push(newQuiz);
    return newQuiz.slug;
  }

}

export const quizService = new QuizService();
