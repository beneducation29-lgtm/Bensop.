import { LanguageCode } from '../types/vocabulary';
import { AdaptiveMemorySkill } from './adaptiveSessionMemoryService';
import { adaptiveLearningHistoryService, LearningEvidenceRecord } from './adaptiveLearningHistoryService';

export type LearningTrend = 'up' | 'down' | 'stable' | 'insufficient';

export interface SkillInsight {
  skill: AdaptiveMemorySkill;
  activities: number;
  averageScore: number;
  mastery: number;
  masteryDelta: number;
  trend: LearningTrend;
  consistency: number;
}

export interface LearningPeriodInsight {
  label: string;
  days: number;
  activities: number;
  activeDays: number;
  averageScore: number;
  mastery: number;
  masteryDelta: number;
}

export interface LongTermLearningInsight {
  language: LanguageCode;
  trend: LearningTrend;
  trendLabel: string;
  headline: string;
  explanation: string;
  periods: LearningPeriodInsight[];
  skills: SkillInsight[];
  improvingSkill?: SkillInsight;
  needsAttentionSkill?: SkillInsight;
}

const SKILLS: AdaptiveMemorySkill[] = ['vocabulary', 'grammar', 'listening', 'speaking', 'reading', 'writing'];

const round = (value: number) => Math.round(value * 10) / 10;

const periodFor = (record: LearningEvidenceRecord, now: number) => {
  const age = Math.max(0, (now - new Date(record.completedAt).getTime()) / 86400000);
  if (age < 7) return 0;
  if (age < 14) return 1;
  if (age < 21) return 2;
  return 3;
};

const buildPeriod = (records: LearningEvidenceRecord[], label: string, days: number): LearningPeriodInsight => {
  const activeDays = new Set(records.map((item) => item.date)).size;
  const averageScore = records.length
    ? Math.round(records.reduce((sum, item) => sum + item.score, 0) / records.length)
    : 0;
  const latest = records[0];
  const oldest = records[records.length - 1];
  const mastery = latest?.overallMastery ?? 0;
  const masteryDelta = latest && oldest
    ? round(latest.overallMastery - oldest.overallMastery)
    : 0;

  return { label, days, activities: records.length, activeDays, averageScore, mastery, masteryDelta };
};

class LongTermLearningInsightService {
  getInsight(language: LanguageCode): LongTermLearningInsight {
    const history = adaptiveLearningHistoryService.getHistory(language, 120);
    const now = Date.now();
    const buckets = [[], [], [], []] as LearningEvidenceRecord[][];
    history.forEach((record) => {
      const index = periodFor(record, now);
      if (index < buckets.length) buckets[index].push(record);
    });

    const periods = [
      buildPeriod(buckets[0], '7 NGÀY', 7),
      buildPeriod(buckets[1], '8–14 NGÀY', 7),
      buildPeriod(buckets[2], '15–21 NGÀY', 7),
      buildPeriod(buckets[3], '22–30 NGÀY', 9),
    ];

    const recent = history.filter((item) => (now - new Date(item.completedAt).getTime()) <= 30 * 86400000);
    const skills = SKILLS.map((skill): SkillInsight => {
      const items = recent.filter((item) => item.skill === skill);
      const latest = items[0];
      const oldest = items[items.length - 1];
      const delta = latest && oldest ? round(latest.mastery - oldest.mastery) : 0;
      const firstHalf = items.filter((item) => new Date(item.completedAt).getTime() >= now - 15 * 86400000);
      const secondHalf = items.filter((item) => new Date(item.completedAt).getTime() < now - 15 * 86400000);
      const recentScore = firstHalf.length ? firstHalf.reduce((s, i) => s + i.score, 0) / firstHalf.length : 0;
      const priorScore = secondHalf.length ? secondHalf.reduce((s, i) => s + i.score, 0) / secondHalf.length : 0;
      const trend: LearningTrend = items.length < 2 ? 'insufficient' : delta >= 2 || recentScore - priorScore >= 5 ? 'up' : delta <= -2 || recentScore - priorScore <= -5 ? 'down' : 'stable';
      const activeDays = new Set(items.map((item) => item.date)).size;
      const consistency = Math.min(100, Math.round((activeDays / 30) * 100));
      return {
        skill,
        activities: items.length,
        averageScore: items.length ? Math.round(items.reduce((s, i) => s + i.score, 0) / items.length) : 0,
        mastery: latest?.mastery ?? 0,
        masteryDelta: delta,
        trend,
        consistency,
      };
    }).filter((item) => item.activities > 0);

    const improvingSkill = skills.slice().filter((item) => item.trend === 'up').sort((a, b) => b.masteryDelta - a.masteryDelta || b.averageScore - a.averageScore)[0];
    const needsAttentionSkill = skills.slice().sort((a, b) => a.mastery - b.mastery || b.activities - a.activities)[0];

    const first = periods[3];
    const latest = periods[0];
    const overallDelta = history.length >= 2 ? round(latest.mastery - first.mastery) : 0;
    const trend: LearningTrend = history.length < 3 ? 'insufficient' : overallDelta >= 2 ? 'up' : overallDelta <= -2 ? 'down' : 'stable';

    const trendLabel = trend === 'up' ? 'ĐANG TIẾN BỘ' : trend === 'down' ? 'CẦN ĐIỀU CHỈNH' : trend === 'stable' ? 'ĐANG ỔN ĐỊNH' : 'ĐANG THU THẬP EVIDENCE';
    const headline = trend === 'up'
      ? 'Mastery đang tăng theo thời gian.'
      : trend === 'down'
        ? 'Mastery gần đây có dấu hiệu giảm.'
        : trend === 'stable'
          ? 'Năng lực đang duy trì tương đối ổn định.'
          : 'Bensop đang cần thêm dữ liệu để đọc xu hướng.';

    const explanation = improvingSkill
      ? `Trong 30 ngày gần đây, ${improvingSkill.skill} đang tạo tín hiệu tiến bộ rõ nhất. Bensop sẽ ưu tiên duy trì evidence mới thay vì lặp lại quá nhiều hoạt động đã ổn định.`
      : needsAttentionSkill
        ? `Bensop đang theo dõi ${needsAttentionSkill.skill} vì đây là kỹ năng có mastery thấp nhất trong các kỹ năng đã có evidence.`
        : 'Hãy hoàn thành thêm một vài hoạt động để Bensop có đủ dữ liệu so sánh theo thời gian.';

    return { language, trend, trendLabel, headline, explanation, periods, skills, improvingSkill, needsAttentionSkill };
  }
}

export const longTermLearningInsightService = new LongTermLearningInsightService();
