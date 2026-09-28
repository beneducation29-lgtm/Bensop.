import { LanguageCode } from '../types/vocabulary';
import { MasteryRecord } from '../types/mastery';
import { masteryService } from './masteryService';

export type LearningState =
  | 'new'
  | 'developing'
  | 'weak'
  | 'recovering'
  | 'verified'
  | 'stable'
  | 'forgetting-risk';

export interface LearningStateDecision {
  language: LanguageCode;
  state: LearningState;
  label: string;
  reason: string;
  recommendedAction: 'learn-foundation' | 'targeted-practice' | 'recovery' | 'spaced-review' | 'verify-parent' | 'continue' | 'challenge';
  source?: MasteryRecord;
}

const statePriority: Record<LearningState, number> = {
  recovering: 0,
  'forgetting-risk': 1,
  weak: 2,
  new: 3,
  developing: 4,
  verified: 5,
  stable: 6,
};

const daysSince = (iso?: string) => {
  if (!iso) return Infinity;
  const time = new Date(iso).getTime();
  if (!Number.isFinite(time)) return Infinity;
  return Math.max(0, (Date.now() - time) / 86400000);
};

const getRecordState = (record: MasteryRecord): LearningState => {
  if (record.parentVerificationStatus === 'needs-review') return 'recovering';
  if (record.recoveryStatus === 'relearning' || record.recoveryStatus === 'recovering') return 'recovering';

  const age = daysSince(record.lastAttemptAt);
  if (age >= 14 && record.mastery >= 60) return 'forgetting-risk';

  if (record.parentVerificationStatus === 'verified' && record.mastery >= 70) return 'verified';
  if (record.evidenceLevel === 'new' || record.attempts < 2) return 'new';
  if (record.mastery < 50 || (record.failureStreak ?? 0) >= 3) return 'weak';
  if (record.mastery < 70 || record.evidenceLevel === 'developing') return 'developing';

  if (
    record.mastery >= 85 &&
    (record.evidenceLevel === 'mastered' || (record.confidence ?? 0) >= 80) &&
    record.trend !== 'down'
  ) {
    return 'stable';
  }

  return 'verified';
};

const decisionFor = (
  state: LearningState,
  language: LanguageCode,
  source?: MasteryRecord,
): LearningStateDecision => {
  const mastery = source?.mastery ?? 0;
  const labelByState: Record<LearningState, string> = {
    new: 'MỚI · CẦN TẠO EVIDENCE',
    developing: 'ĐANG HÌNH THÀNH',
    weak: 'ĐIỂM YẾU CẦN XỬ LÝ',
    recovering: 'ĐANG PHỤC HỒI',
    'forgetting-risk': 'CÓ NGUY CƠ QUÊN',
    verified: 'ĐÃ XÁC MINH',
    stable: 'ỔN ĐỊNH',
  };
  const reasonByState: Record<LearningState, string> = {
    new: 'Kiến thức này còn ít evidence. Bensop ưu tiên một lượt luyện ngắn để xác định nền tảng.',
    developing: 'Mastery hoặc evidence chưa đủ ổn định. Bensop tiếp tục luyện có mục tiêu trước khi mở rộng.',
    weak: 'Mastery thấp hoặc có chuỗi sai lặp lại. Bensop đưa kiến thức về phiên sửa điểm yếu.',
    recovering: 'Kiến thức đang trong quá trình phục hồi hoặc vừa trượt kiểm tra xác minh. Cần củng cố trước khi đi tiếp.',
    'forgetting-risk': 'Đã lâu chưa kiểm tra lại. Bensop ưu tiên Spaced Review để kiểm tra khả năng nhớ trước khi học mới.',
    verified: 'Kiến thức đã có evidence đủ để tiếp tục sang bước kế tiếp.',
    stable: 'Mastery cao và evidence ổn định. Bensop có thể mở rộng sang nội dung thử thách hơn.',
  };
  const actionByState: Record<LearningState, LearningStateDecision['recommendedAction']> = {
    new: 'learn-foundation',
    developing: 'targeted-practice',
    weak: 'targeted-practice',
    recovering: 'recovery',
    'forgetting-risk': 'spaced-review',
    verified: 'continue',
    stable: 'challenge',
  };

  return {
    language,
    state,
    label: labelByState[state],
    reason: source
      ? reasonByState[state] + ' Mastery hiện tại: ' + mastery + '%.'
      : reasonByState[state],
    recommendedAction: actionByState[state],
    source,
  };
};

class LearningStateService {
  getState(record: MasteryRecord): LearningState {
    return getRecordState(record);
  }

  getPriorityDecision(language: LanguageCode): LearningStateDecision {
    const snapshot = masteryService.getSnapshot(language);
    const records = [...snapshot.questions, ...snapshot.topics, ...snapshot.skills]
      .filter((record) => record.attempts > 0);

    if (!records.length) {
      return decisionFor('new', language);
    }

    const ranked = records
      .map((record) => ({ record, state: getRecordState(record) }))
      .sort((a, b) => {
        const priorityDiff = statePriority[a.state] - statePriority[b.state];
        if (priorityDiff !== 0) return priorityDiff;
        return a.record.mastery - b.record.mastery ||
          (a.record.confidence ?? 0) - (b.record.confidence ?? 0) ||
          a.record.attempts - b.record.attempts;
      });

    const winner = ranked[0];
    return decisionFor(winner.state, language, winner.record);
  }

  getSummary(language: LanguageCode) {
    const snapshot = masteryService.getSnapshot(language);
    const records = [...snapshot.questions, ...snapshot.topics, ...snapshot.skills];
    const counts = records.reduce<Record<LearningState, number>>((acc, record) => {
      const state = getRecordState(record);
      acc[state] = (acc[state] ?? 0) + 1;
      return acc;
    }, {} as Record<LearningState, number>);

    return {
      language,
      counts,
      priority: this.getPriorityDecision(language),
    };
  }
}

export const learningStateService = new LearningStateService();
