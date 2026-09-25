import { LanguageCode } from '../types/vocabulary';
import { LanguageProgressSummary } from '../types/learningProgress';
import { vocabularyService } from './vocabularyService';
import { grammarService } from './grammarService';
import { Question } from '../types/quiz';

class LearningProgressService {
  getLanguageSummary(language: LanguageCode): LanguageProgressSummary {
    const allWords = vocabularyService.getAllWords(language);
    const vocabProgressMap = vocabularyService.getAllProgress(language);

    let seen = 0;
    let learning = 0;
    let learned = 0;
    let mastered = 0;
    let reviewNeeded = 0;
    let totalVocabAttempts = 0;
    let totalVocabCorrect = 0;

    allWords.forEach((w) => {
      const p = vocabProgressMap[w.id];
      if (p) {
        if (p.status !== 'NEW' || p.reviewCount > 0) seen++;
        if (p.status === 'LEARNING' || p.status === 'FAMILIAR') learning++;
        if (p.isMarkedLearned || p.status === 'STRONG' || p.status === 'MASTERED') learned++;
        if (p.status === 'MASTERED') mastered++;
        if (p.status === 'LEARNING' || p.wrongCount > p.correctCount) reviewNeeded++;

        totalVocabAttempts += (p.correctCount + p.wrongCount);
        totalVocabCorrect += p.correctCount;
      }
    });

    const vocabAccuracy = totalVocabAttempts > 0 ? Math.round((totalVocabCorrect / totalVocabAttempts) * 100) : 85;

    // Grammar summary
    const allConcepts = grammarService.getAllConcepts(language);
    const gramProgressMap = grammarService.getAllProgress(language);

    let viewed = 0;
    let practiced = 0;
    let strong = 0;
    let gramMastered = 0;
    let needsPractice = 0;
    let totalGramAttempts = 0;
    let totalGramCorrect = 0;

    allConcepts.forEach((c) => {
      const p = gramProgressMap[c.id];
      if (p) {
        if (p.status !== 'NEW') viewed++;
        if (p.practiceCount > 0) practiced++;
        if (p.status === 'STRONG' || p.status === 'MASTERED') strong++;
        if (p.status === 'MASTERED') gramMastered++;
        if (p.status === 'LEARNING' || (p.practiceCount > 0 && p.wrongCount > p.correctCount)) needsPractice++;

        totalGramAttempts += (p.correctCount + p.wrongCount);
        totalGramCorrect += p.correctCount;
      }
    });

    const gramAccuracy = totalGramAttempts > 0 ? Math.round((totalGramCorrect / totalGramAttempts) * 100) : 82;

    return {
      language,
      vocabulary: {
        seen,
        learning,
        learned,
        mastered,
        reviewNeeded,
        total: allWords.length,
        accuracy: vocabAccuracy
      },
      grammar: {
        viewed,
        practiced,
        strong,
        mastered: gramMastered,
        needsPractice,
        total: allConcepts.length,
        accuracy: gramAccuracy
      }
    };
  }

  processQuestionResult(question: Question, isCorrect: boolean, usedHint: boolean = false): void {
    const lang: LanguageCode = question.categoryId === 'tieng-trung' ? 'zh' : 'en';

    if (question.vocabularyId) {
      vocabularyService.updateWordMastery(question.vocabularyId, lang, isCorrect, usedHint);
    }

    if (question.grammarConceptId) {
      grammarService.updateConceptMastery(question.grammarConceptId, lang, isCorrect);
    }
  }
}

export const learningProgressService = new LearningProgressService();
