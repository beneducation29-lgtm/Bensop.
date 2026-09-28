import { QuizResult } from '../types/quiz';
import { MasteryRecord, MasterySnapshot } from '../types/mastery';
import { LanguageCode } from '../types/vocabulary';

const STORAGE_KEY = 'bensop_mastery';
const emptySnapshot = (): MasterySnapshot => ({ overall: 0, skills: [], topics: [], questions: [], updatedAt: new Date().toISOString() });
const categoryForLanguage = (language: LanguageCode) => language === 'zh' ? 'tieng-trung' : 'tieng-anh';
const read = (): MasterySnapshot => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptySnapshot();
    const parsed = JSON.parse(raw) as MasterySnapshot;
    return { overall:Number(parsed.overall)||0, skills:Array.isArray(parsed.skills)?parsed.skills:[], topics:Array.isArray(parsed.topics)?parsed.topics:[], questions:Array.isArray(parsed.questions)?parsed.questions:[], updatedAt:parsed.updatedAt||new Date().toISOString() };
  } catch { return emptySnapshot(); }
};
const write = (snapshot: MasterySnapshot) => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot)); } catch {} };
const applyForgettingSignal = (record: MasteryRecord, now = new Date()): MasteryRecord => {
  const last = new Date(record.lastAttemptAt).getTime();
  if (!Number.isFinite(last)) return record;
  const daysSinceAttempt = Math.max(0, (now.getTime() - last) / 86400000);
  if (daysSinceAttempt < 14 || record.mastery < 70) return record;

  const decaySteps = Math.floor(daysSinceAttempt / 14);
  const decay = Math.min(20, decaySteps * 4);
  const effectiveMastery = Math.max(0, record.mastery - decay);
  const confidenceDecay = Math.min(40, decaySteps * 8);
  const effectiveConfidence = Math.max(0, (record.confidence ?? Math.min(100, record.attempts * 20)) - confidenceDecay);
  const evidenceLevel: MasteryRecord['evidenceLevel'] =
    effectiveMastery < 70 || effectiveConfidence < 40
      ? 'developing'
      : effectiveMastery < 85 || effectiveConfidence < 70
        ? 'established'
        : record.evidenceLevel === 'mastered'
          ? 'mastered'
          : record.evidenceLevel || 'established';

  return {
    ...record,
    mastery: effectiveMastery,
    confidence: effectiveConfidence,
    evidenceLevel,
    trend: effectiveMastery < record.mastery ? 'down' : record.trend,
    recoveryStatus,
    recoveryCount: record.recoveryCount ?? 0,
    lastRecoveryAt: record.lastRecoveryAt,
  };
};
const upsert = (records: MasteryRecord[], input: Omit<MasteryRecord,'mastery'|'attempts'|'correct'|'lastScore'|'lastAttemptAt'|'trend'>, score:number, correct:number, attempted:number): MasteryRecord[] => {
  const index=records.findIndex(item=>item.id===input.id);
  const previous=index>=0?records[index]:undefined;
  const previousMastery=previous?.mastery??0;
  const mastery=previous?Math.round(previousMastery*0.6+score*0.4):Math.round(score);
  const attempts=(previous?.attempts??0)+attempted;
  const totalCorrect=(previous?.correct??0)+correct;
  const accuracy=attempts>0?Math.round((totalCorrect/attempts)*100):0;
  const confidence=Math.min(100,attempts*20);
  const boundedMastery=Math.max(0,Math.min(100,mastery));
  const evidenceLevel:MasteryRecord['evidenceLevel'] =
    attempts < 2 ? 'new' :
    attempts < 3 || boundedMastery < 70 ? 'developing' :
    attempts < 5 || boundedMastery < 85 || accuracy < 80 ? 'established' :
    'mastered';
  const next:MasteryRecord={
    ...input,
    mastery:boundedMastery,
    attempts,
    correct:totalCorrect,
    lastScore:score,
    lastAttemptAt:new Date().toISOString(),
    trend:mastery>previousMastery?'up':mastery<previousMastery?'down':'stable',
    accuracy,
    confidence,
    evidenceLevel,
  };
  if(index<0)return[...records,next];
  const clone=[...records];clone[index]=next;return clone;
};
const refreshForLearning = (snapshot: MasterySnapshot): MasterySnapshot => ({
  ...snapshot,
  skills: snapshot.skills.map(applyForgettingSignal),
  topics: snapshot.topics.map(applyForgettingSignal),
  questions: snapshot.questions.map(applyForgettingSignal),
});
export const masteryService = {
  getSnapshot(language?: LanguageCode): MasterySnapshot {
    const snapshot=refreshForLearning(read()); if(!language)return snapshot;
    const categoryId=categoryForLanguage(language);
    const skills=snapshot.skills.filter(item=>item.categoryId===categoryId).map(applyForgettingSignal);
    const topics=snapshot.topics.filter(item=>item.categoryId===categoryId).map(applyForgettingSignal);
    const questions=snapshot.questions.filter(item=>item.categoryId===categoryId).map(applyForgettingSignal);
    const overall=skills.length?Math.round(skills.reduce((sum,item)=>sum+item.mastery,0)/skills.length):0;
    return {overall,skills,topics,questions,updatedAt:snapshot.updatedAt};
  },
  recordQuizResult(result: QuizResult): MasterySnapshot {
    const snapshot=refreshForLearning(read());
    Object.entries(result.skillBreakdown).forEach(([skill,stat])=>{snapshot.skills=upsert(snapshot.skills,{id:`skill:${result.categoryId}:${skill}`,entityType:'skill',entityId:skill,label:skill,categoryId:result.categoryId,skill:skill as MasteryRecord['skill']},stat.percentage,stat.correct,stat.total);});
    Object.entries(result.topicBreakdown).forEach(([topic,stat])=>{snapshot.topics=upsert(snapshot.topics,{id:`topic:${result.categoryId}:${topic}`,entityType:'topic',entityId:topic,label:topic,categoryId:result.categoryId},stat.percentage,stat.correct,stat.total);});
    result.questionBreakdowns.forEach(item=>{const q=item.question;const score=item.possiblePoints>0?Math.round(item.earnedPoints/item.possiblePoints*100):0;snapshot.questions=upsert(snapshot.questions,{id:`question:${q.id}`,entityType:'question',entityId:q.id,label:q.question,categoryId:q.categoryId,skill:q.skill,topicId:q.topicId},score,item.isCorrect?1:0,1);});
    snapshot.overall=snapshot.skills.length?Math.round(snapshot.skills.reduce((sum,item)=>sum+item.mastery,0)/snapshot.skills.length):result.accuracy;snapshot.updatedAt=new Date().toISOString();write(snapshot);return snapshot;
  },
  recordSpeakingEvaluation(input:{language:LanguageCode;sessionId:string;score:number;fluency?:number;grammar?:number;vocabulary?:number;relevance?:number;pronunciation?:number}): MasterySnapshot {
    const snapshot=refreshForLearning(read());const categoryId=categoryForLanguage(input.language);
    const metrics:[string,number|undefined][]=[['speaking',input.score],['fluency',input.fluency],['grammar',input.grammar],['vocabulary',input.vocabulary],['pronunciation',input.pronunciation],['relevance',input.relevance]];
    metrics.forEach(([skill,value])=>{if(typeof value!=='number')return;snapshot.skills=upsert(snapshot.skills,{id:`skill:${categoryId}:${skill}`,entityType:'skill',entityId:skill,label:skill,categoryId},value,value>=60?1:0,1);});
    snapshot.topics=upsert(snapshot.topics,{id:`topic:${categoryId}:ai-speaking`,entityType:'topic',entityId:'ai-speaking',label:input.language==='zh'?'中文 AI 口语':'English AI Speaking',categoryId},input.score,input.score>=60?1:0,1);
    snapshot.overall=snapshot.skills.length?Math.round(snapshot.skills.filter(item=>item.categoryId===categoryId).reduce((sum,item)=>sum+item.mastery,0)/Math.max(1,snapshot.skills.filter(item=>item.categoryId===categoryId).length)):snapshot.overall;
    snapshot.updatedAt=new Date().toISOString();write(snapshot);return snapshot;
  },
  recordReadingEvaluation(input:{language:LanguageCode;passageId:string;score:number}): MasterySnapshot {
    const snapshot=refreshForLearning(read()); const categoryId=categoryForLanguage(input.language);
    snapshot.skills=upsert(snapshot.skills,{id:`skill:${categoryId}:reading`,entityType:'skill',entityId:'reading',label:'reading',categoryId},input.score,input.score>=60?1:0,1);
    snapshot.topics=upsert(snapshot.topics,{id:`topic:${categoryId}:reading`,entityType:'topic',entityId:'reading',label:input.language==='zh'?'中文阅读':'English Reading',categoryId},input.score,input.score>=60?1:0,1);
    const categorySkills=snapshot.skills.filter(item=>item.categoryId===categoryId);
    snapshot.overall=categorySkills.length?Math.round(categorySkills.reduce((sum,item)=>sum+item.mastery,0)/categorySkills.length):snapshot.overall;
    snapshot.updatedAt=new Date().toISOString(); write(snapshot); return snapshot;
  },
  recordListeningEvaluation(input:{language:LanguageCode;lessonId:string;score:number}): MasterySnapshot {
    const snapshot=refreshForLearning(read()); const categoryId=categoryForLanguage(input.language);
    snapshot.skills=upsert(snapshot.skills,{id:`skill:${categoryId}:listening`,entityType:'skill',entityId:'listening',label:'listening',categoryId},input.score,input.score>=60?1:0,1);
    snapshot.topics=upsert(snapshot.topics,{id:`topic:${categoryId}:listening`,entityType:'topic',entityId:'listening',label:input.language==='zh'?'中文听力':'English Listening',categoryId},input.score,input.score>=60?1:0,1);
    const categorySkills=snapshot.skills.filter(item=>item.categoryId===categoryId);
    snapshot.overall=categorySkills.length?Math.round(categorySkills.reduce((sum,item)=>sum+item.mastery,0)/categorySkills.length):snapshot.overall;
    snapshot.updatedAt=new Date().toISOString(); write(snapshot); return snapshot;
  },
  recordWritingEvaluation(input:{language:LanguageCode;promptId:string;score:number;task?:number;organization?:number;grammar?:number;vocabulary?:number}): MasterySnapshot {
    const snapshot=refreshForLearning(read());
    const categoryId=categoryForLanguage(input.language);
    const metrics:[string,number|undefined][]=[['writing',input.score],['writing-task',input.task],['writing-organization',input.organization],['writing-grammar',input.grammar],['writing-vocabulary',input.vocabulary]];
    metrics.forEach(([skill,value])=>{if(typeof value!=='number')return;snapshot.skills=upsert(snapshot.skills,{id:`skill:${categoryId}:${skill}`,entityType:'skill',entityId:skill,label:skill,categoryId},value,value>=60?1:0,1);});
    snapshot.topics=upsert(snapshot.topics,{id:`topic:${categoryId}:ai-writing`,entityType:'topic',entityId:'ai-writing',label:input.language==='zh'?'中文 AI 写作':'English AI Writing',categoryId},input.score,input.score>=60?1:0,1);
    const categorySkills=snapshot.skills.filter(item=>item.categoryId===categoryId);
    snapshot.overall=categorySkills.length?Math.round(categorySkills.reduce((sum,item)=>sum+item.mastery,0)/categorySkills.length):snapshot.overall;
    snapshot.updatedAt=new Date().toISOString();write(snapshot);return snapshot;
  },
  getWeakQuestions(limit=5,language?:LanguageCode):MasteryRecord[]{
    return this.getSnapshot(language).questions
      .filter(item=>item.mastery<70 || item.evidenceLevel === 'new' || item.evidenceLevel === 'developing')
      .sort((a,b)=>{
        const aPriority=(a.mastery<70?0:1)+(a.evidenceLevel==='new'?0:a.evidenceLevel==='developing'?0.5:1);
        const bPriority=(b.mastery<70?0:1)+(b.evidenceLevel==='new'?0:b.evidenceLevel==='developing'?0.5:1);
        return aPriority-bPriority || a.mastery-b.mastery || (a.confidence??0)-(b.confidence??0) || b.attempts-a.attempts;
      })
      .slice(0,limit);
  },
  getWeakAreas(limit=5,language?:LanguageCode):MasteryRecord[]{
    return this.getSnapshot(language).topics.filter(item=>item.mastery<80).sort((a,b)=>a.mastery-b.mastery || b.attempts-a.attempts).slice(0,limit);
  },
  getForgettingRisks(limit=5,language?:LanguageCode):MasteryRecord[]{
    const now=Date.now();
    return this.getSnapshot(language).questions
      .filter(item=>item.mastery>=70 && (now-new Date(item.lastAttemptAt).getTime())/86400000>=14)
      .sort((a,b)=>new Date(a.lastAttemptAt).getTime()-new Date(b.lastAttemptAt).getTime())
      .slice(0,limit);
  }
};