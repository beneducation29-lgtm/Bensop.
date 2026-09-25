import { QuizModel } from '../types/quiz';
import { QUIZ_MODELS } from '../data/quizModels';
import { VocabularyWord, LanguageCode } from '../types/vocabulary';
import { GrammarConcept } from '../types/grammar';
import { QUESTIONS_BANK } from '../data/questions';

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
}

export const quizService = new QuizService();
