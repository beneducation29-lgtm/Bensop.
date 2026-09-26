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
const upsert = (records: MasteryRecord[], input: Omit<MasteryRecord,'mastery'|'attempts'|'correct'|'lastScore'|'lastAttemptAt'|'trend'>, score:number, correct:number, attempted:number): MasteryRecord[] => {
  const index=records.findIndex(item=>item.id===input.id);
  const previous=index>=0?records[index]:undefined;
  const previousMastery=previous?.mastery??0;
  const mastery=previous?Math.round(previousMastery*0.6+score*0.4):Math.round(score);
  const next:MasteryRecord={...input,mastery:Math.max(0,Math.min(100,mastery)),attempts:(previous?.attempts??0)+attempted,correct:(previous?.correct??0)+correct,lastScore:score,lastAttemptAt:new Date().toISOString(),trend:mastery>previousMastery?'up':mastery<previousMastery?'down':'stable'};
  if(index<0)return[...records,next];
  const clone=[...records];clone[index]=next;return clone;
};
export const masteryService = {
  getSnapshot(language?: LanguageCode): MasterySnapshot {
    const snapshot=read(); if(!language)return snapshot;
    const categoryId=categoryForLanguage(language);
    const skills=snapshot.skills.filter(item=>item.categoryId===categoryId);
    const topics=snapshot.topics.filter(item=>item.categoryId===categoryId);
    const questions=snapshot.questions.filter(item=>item.categoryId===categoryId);
    const overall=skills.length?Math.round(skills.reduce((sum,item)=>sum+item.mastery,0)/skills.length):0;
    return {overall,skills,topics,questions,updatedAt:snapshot.updatedAt};
  },
  recordQuizResult(result: QuizResult): MasterySnapshot {
    const snapshot=read();
    Object.entries(result.skillBreakdown).forEach(([skill,stat])=>{snapshot.skills=upsert(snapshot.skills,{id:`skill:${result.categoryId}:${skill}`,entityType:'skill',entityId:skill,label:skill,categoryId:result.categoryId,skill:skill as MasteryRecord['skill']},stat.percentage,stat.correct,stat.total);});
    Object.entries(result.topicBreakdown).forEach(([topic,stat])=>{snapshot.topics=upsert(snapshot.topics,{id:`topic:${result.categoryId}:${topic}`,entityType:'topic',entityId:topic,label:topic,categoryId:result.categoryId},stat.percentage,stat.correct,stat.total);});
    result.questionBreakdowns.forEach(item=>{const q=item.question;const score=item.possiblePoints>0?Math.round(item.earnedPoints/item.possiblePoints*100):0;snapshot.questions=upsert(snapshot.questions,{id:`question:${q.id}`,entityType:'question',entityId:q.id,label:q.question,categoryId:q.categoryId,skill:q.skill},score,item.isCorrect?1:0,1);});
    snapshot.overall=snapshot.skills.length?Math.round(snapshot.skills.reduce((sum,item)=>sum+item.mastery,0)/snapshot.skills.length):result.accuracy;snapshot.updatedAt=new Date().toISOString();write(snapshot);return snapshot;
  },
  recordSpeakingEvaluation(input:{language:LanguageCode;sessionId:string;score:number;fluency?:number;grammar?:number;vocabulary?:number;relevance?:number;pronunciation?:number}): MasterySnapshot {
    const snapshot=read();const categoryId=categoryForLanguage(input.language);
    const metrics:[string,number|undefined][]=[['speaking',input.score],['fluency',input.fluency],['grammar',input.grammar],['vocabulary',input.vocabulary],['pronunciation',input.pronunciation],['relevance',input.relevance]];
    metrics.forEach(([skill,value])=>{if(typeof value!=='number')return;snapshot.skills=upsert(snapshot.skills,{id:`skill:${categoryId}:${skill}`,entityType:'skill',entityId:skill,label:skill,categoryId},value,value>=60?1:0,1);});
    snapshot.topics=upsert(snapshot.topics,{id:`topic:${categoryId}:ai-speaking`,entityType:'topic',entityId:'ai-speaking',label:input.language==='zh'?'中文 AI 口语':'English AI Speaking',categoryId},input.score,input.score>=60?1:0,1);
    snapshot.overall=snapshot.skills.length?Math.round(snapshot.skills.filter(item=>item.categoryId===categoryId).reduce((sum,item)=>sum+item.mastery,0)/Math.max(1,snapshot.skills.filter(item=>item.categoryId===categoryId).length)):snapshot.overall;
    snapshot.updatedAt=new Date().toISOString();write(snapshot);return snapshot;
  },
  getWeakAreas(limit=5,language?:LanguageCode):MasteryRecord[]{return this.getSnapshot(language).topics.filter(item=>item.mastery<80).sort((a,b)=>a.mastery-b.mastery).slice(0,limit);}
};