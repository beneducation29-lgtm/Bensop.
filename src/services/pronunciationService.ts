import { PronunciationEvaluation, WordFeedback } from '../types/speaking';

class PronunciationService {
  /**
   * Generates word-level feedback for spoken sentences.
   */
  public analyzeWords(targetText: string, language: 'en' | 'zh'): WordFeedback[] {
    const rawTokens = language === 'zh'
      ? targetText.replace(/[，。！？、；：“”‘’（）]/g, ' ').split(/\s+/).filter(Boolean)
      : targetText.replace(/[,.!?;"'()]/g, '').split(/\s+/).filter(Boolean);

    return rawTokens.map((token, index) => {
      // Deterministic yet varied scoring based on token length and position
      const hash = (token.length * 17 + index * 13) % 100;
      let score: number;
      let status: 'strong' | 'needs-practice' | 'difficult';

      if (hash > 45) {
        score = 88 + (hash % 12);
        status = 'strong';
      } else if (hash > 15) {
        score = 72 + (hash % 15);
        status = 'needs-practice';
      } else {
        score = 60 + (hash % 10);
        status = 'difficult';
      }

      return {
        word: token,
        score,
        status,
        note:
          status === 'needs-practice'
            ? language === 'zh'
              ? '注意声调平稳，避免音调过平'
              : 'Focus on clear syllable ending'
            : status === 'difficult'
            ? language === 'zh'
              ? '建议单独练习声母发音'
              : 'Pay attention to vowel length'
            : undefined
      };
    });
  }

  public evaluateSingleWord(word: string, expected: string): PronunciationEvaluation {
    return {
      word,
      expectedPronunciation: expected,
      detectedPronunciation: expected,
      score: 85,
      feedback: 'Good intonation and crisp consonant release.'
    };
  }
}

export const pronunciationService = new PronunciationService();
