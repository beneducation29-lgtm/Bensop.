import { LanguageCode } from '../types/vocabulary';
import { DailyLearningSession } from '../types/learningProgress';
import { vocabularyService } from './vocabularyService';
import { grammarService } from './grammarService';

class RecommendationService {
  getDailyLearningSession(language: LanguageCode): DailyLearningSession {
    const allWords = vocabularyService.getAllWords(language);
    const allConcepts = grammarService.getAllConcepts(language);

    // Pick 5 words and 1 concept based on current date
    const todayStr = new Date().toISOString().split('T')[0];
    const daySeed = new Date().getDate();

    const wordStartIndex = (daySeed * 3) % Math.max(1, allWords.length - 6);
    const conceptIndex = daySeed % Math.max(1, allConcepts.length);

    const selectedWords = allWords.slice(wordStartIndex, wordStartIndex + 5);
    const selectedConcept = allConcepts[conceptIndex] || allConcepts[0];

    return {
      date: todayStr,
      newWords: selectedWords,
      grammarConcept: selectedConcept,
      practiceQuestionCount: 10,
      reviewWordCount: 8,
      isCompleted: false
    };
  }

  getPersonalizedRecommendations(language: LanguageCode) {
    const allWords = vocabularyService.getAllWords(language);
    const allConcepts = grammarService.getAllConcepts(language);

    return {
      suggestedWords: allWords.slice(0, 4),
      suggestedConcept: allConcepts[0],
      suggestedQuizSlug: language === 'en' ? 'phrasal-verbs-cong-so' : 'hsk-phan-xa-tu-vung-thanh-dieu',
      weakTopicSuggestion: language === 'en' ? 'Verb Tenses & Inversion' : '把字句与被字句'
    };
  }
}

export const recommendationService = new RecommendationService();
