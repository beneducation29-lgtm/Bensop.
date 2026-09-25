import { SpeakingActivity, SpeakingEvaluation } from '../types/speaking';
import { pronunciationService } from './pronunciationService';

class SpeakingEvaluationService {
  /**
   * Mock evaluation service based on activity type, text length, and duration.
   * Architecture matches real AI evaluation contract.
   */
  public async evaluate(params: {
    activity: SpeakingActivity;
    duration: number;
    transcription?: string;
  }): Promise<SpeakingEvaluation> {
    const { activity, duration } = params;
    const targetText = activity.targetText || activity.prompt;

    // Simulate short analysis latency
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Calculate score factors with subtle deterministic variance
    const durationRatio = activity.expectedDuration > 0
      ? Math.min(1.2, Math.max(0.6, duration / activity.expectedDuration))
      : 1.0;

    const baseScore = Math.floor(78 + Math.random() * 12);
    const pronunciationScore = Math.min(96, Math.max(68, Math.round(baseScore + (Math.random() * 8 - 4))));
    const fluencyScore = Math.min(95, Math.max(65, Math.round(baseScore * (durationRatio > 0.8 ? 1.02 : 0.92))));
    const accuracyScore = Math.min(98, Math.max(70, Math.round(baseScore + 3)));
    const vocabularyScore = Math.min(95, Math.max(68, Math.round(baseScore - 1)));
    const grammarScore = Math.min(96, Math.max(72, Math.round(baseScore + 2)));

    const overallScore = Math.round(
      pronunciationScore * 0.3 +
      fluencyScore * 0.25 +
      accuracyScore * 0.2 +
      grammarScore * 0.15 +
      vocabularyScore * 0.1
    );

    const wordFeedbacks = pronunciationService.analyzeWords(targetText, activity.language);

    const isZh = activity.language === 'zh';

    const strengths = isZh
      ? [
          '声调平稳，第一声与第四声发音干脆有力',
          '句子主干语法结构清晰，没有生硬断句',
          '语速适中，停顿位置符合现代汉语呼吸节奏'
        ]
      : [
          'Clear consonant articulation and confident delivery',
          'Accurate sentence stress on operative content words',
          'Natural breathing rhythm between structural clauses'
        ];

    const areasToImprove = isZh
      ? [
          '部分轻声词和儿化音的发音略显刻意，可以更松弛',
          '遇到复合句时可以尝试稍微加快连读速度',
          '注意前后鼻音（如 en 与 eng）的共鸣区分'
        ]
      : [
          'Slight hesitation before complex multi-syllabic words',
          'Work on connected speech linking between ending consonants and vowels',
          'Practice variable intonation on questioning inflections'
        ];

    const nextPracticeSuggestions = isZh
      ? [
          '建议进入【影子跟读 (Shadowing)】练习强化语感',
          '复习本次活动关联的词汇与句型',
          '尝试【情景模拟 (Role Play)】进行开放式对话训练'
        ]
      : [
          'Try Shadowing mode to sync pacing with native cadence',
          'Review the linked vocabulary flashcards in Vocabulary Lab',
          'Challenge yourself with an open-ended Question & Answer activity'
        ];

    const detectedErrors = isZh
      ? ['轻声词尾音略微偏重', '第三声转调可更加舒缓']
      : ['Slightly shortened vowel sound in middle syllables', 'Mild aspiration on unaspirated stops'];

    const feedback = isZh
      ? `整体发音表现优秀！您的汉语声调准确度达到了 ${pronunciationScore}%，语流自然，能够准确传达语义核心。继续保持每天十分钟的高频口语练习！`
      : `Great effort! Your pronunciation reached ${pronunciationScore}% accuracy with smooth pacing. You conveyed the intended meaning confidently with natural cadence.`;

    return {
      pronunciationScore,
      fluencyScore,
      accuracyScore,
      vocabularyScore,
      grammarScore,
      overallScore,
      feedback,
      detectedErrors,
      suggestions: nextPracticeSuggestions,
      wordFeedbacks,
      transcription: params.transcription || targetText,
      strengths,
      areasToImprove,
      nextPracticeSuggestions
    };
  }
}

export const speakingEvaluationService = new SpeakingEvaluationService();
