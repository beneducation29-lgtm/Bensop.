import { LanguageCode } from '../types/vocabulary';
import { vocabularyService } from './vocabularyService';
import { grammarService } from './grammarService';
import { listeningService } from './listeningService';
import { speakingService } from './speakingService';
import { readingService } from './readingService';
import { writingService } from './writingService';
import { masteryService } from './masteryService';
import { learnerActivityService, LearnerActivityEvent } from './learnerActivityService';

export interface LearnerSkillProfile {
  key: 'vocabulary'|'grammar'|'listening'|'speaking'|'reading'|'writing';
  label: string;
  score: number;
  coverage: number;
  activityCount: number;
  total: number;
  evidenceCount: number;
  recentScore: number;
  momentum: number;
  trend: 'up' | 'down' | 'stable';
  path: string;
}

export interface LearnerProfileSnapshot {
  language: LanguageCode;
  overall: number;
  skills: LearnerSkillProfile[];
  strongest: LearnerSkillProfile | null;
  needsAttention: LearnerSkillProfile[];
  recentEvidence: LearnerActivityEvent[];
  lastActiveAt: string | null;
  streakDays: number;
  updatedAt: string;
}

const average = (values:number[]) => values.length ? Math.round(values.reduce((a,b)=>a+b,0)/values.length) : 0;

export const learnerProfileService = {
  getSnapshot(language:LanguageCode='en'): LearnerProfileSnapshot {
    const vocab = vocabularyService.getAllProgress(language);
    const grammar = grammarService.getAllProgress(language);
    const listening = listeningService.getProgressList().filter(x=>x.language===language);
    const speaking = speakingService.getProgressList().filter(x=>x.language===language);
    const reading = readingService.getProgress().filter(x=>x.language===language);
    const writing = writingService.getProgress().filter(x=>x.language===language);
    const recentEvidence = learnerActivityService.getRecent(language, 12);
    const activeDates = learnerActivityService.getActiveDates(language);
    const dateSet = new Set(activeDates);
    let streakDays = 0;
    const cursor = new Date();
    while (dateSet.has(cursor.toISOString().slice(0,10))) { streakDays += 1; cursor.setDate(cursor.getDate()-1); }
    const languageMastery = masteryService.getSnapshot(language);
    const masteryForSkill=(key:LearnerSkillProfile['key'],fallback:number)=>languageMastery.skills.find(x=>x.entityId===key)?.mastery??fallback;
    const speakingEvidence=learnerActivityService.getAll().filter(e=>e.language===language&&e.skill==='speaking');

    const evidenceFor=(skill:'vocabulary'|'grammar'|'listening'|'speaking'|'reading'|'writing')=>recentEvidence.filter(e=>e.skill===skill);
    const skillMomentum=(skill:'vocabulary'|'grammar'|'listening'|'speaking'|'reading'|'writing',base:number)=>{
      const ev=evidenceFor(skill).slice(0,6);
      if(ev.length<2) return {recentScore:ev[0]?.score??base,momentum:0,trend:'stable' as const};
      const recent=ev.slice(0,3).reduce((n,e)=>n+e.score,0)/Math.min(3,ev.length);
      const older=ev.slice(3,6);
      const olderAvg=older.length?older.reduce((n,e)=>n+e.score,0)/older.length:base;
      const momentum=Math.round(recent-olderAvg);
      return {recentScore:Math.round(recent),momentum,trend:(momentum>=5?'up':momentum<=-5?'down':'stable') as 'up'|'down'|'stable'};
    };

    const skills:LearnerSkillProfile[]=[
      {key:'vocabulary',label:'Vocabulary',score:masteryForSkill('vocabulary',average(Object.values(vocab).map(x=>x.masteryScore))),coverage:Object.keys(vocab).length/Math.max(1,vocabularyService.getAllWords(language).length),activityCount:Object.keys(vocab).length,total:vocabularyService.getAllWords(language).length,evidenceCount:Object.values(vocab).reduce((n,x)=>n+x.reviewCount,0),...skillMomentum('vocabulary',average(Object.values(vocab).map(x=>x.masteryScore))),path:`/tieng-${language==='en'?'anh':'trung'}/vocabulary/practice`},
      {key:'grammar',label:'Grammar',score:masteryForSkill('grammar',average(Object.values(grammar).map(x=>x.masteryScore))),coverage:Object.keys(grammar).length/Math.max(1,grammarService.getAllConcepts(language).length),activityCount:Object.keys(grammar).length,total:grammarService.getAllConcepts(language).length,evidenceCount:Object.values(grammar).reduce((n,x)=>n+x.practiceCount,0),...skillMomentum('grammar',average(Object.values(grammar).map(x=>x.masteryScore))),path:`/tieng-${language==='en'?'anh':'trung'}/grammar/review`},
      {key:'listening',label:'Listening',score:masteryForSkill('listening',average(listening.map(x=>x.accuracy))),coverage:listening.length/Math.max(1,listeningService.getAllLessons(language).length),activityCount:listening.length,total:listeningService.getAllLessons(language).length,evidenceCount:listening.reduce((n,x)=>n+x.attempts,0),...skillMomentum('listening',average(listening.map(x=>x.accuracy))),path:`/tieng-${language==='en'?'anh':'trung'}/listening`},
      {key:'speaking',label:'Speaking',score:masteryForSkill('speaking',average(speaking.map(x=>x.bestScore))),coverage:Math.min(1,Math.max(speaking.length,new Set(speakingEvidence.map(x=>x.activityId)).size)/Math.max(1,speakingService.getAllActivities(language).length)),activityCount:Math.min(speakingService.getAllActivities(language).length,Math.max(speaking.length,new Set(speakingEvidence.map(x=>x.activityId)).size)),total:speakingService.getAllActivities(language).length,evidenceCount:speaking.reduce((n,x)=>n+x.attempts,0),...skillMomentum('speaking',average(speaking.map(x=>x.bestScore))),path:`/tieng-${language==='en'?'anh':'trung'}/speaking`},
      {key:'reading',label:'Reading',score:masteryForSkill('reading',average(reading.map(x=>x.bestScore))),coverage:reading.length/Math.max(1,readingService.getAll(language).length),activityCount:reading.length,total:readingService.getAll(language).length,evidenceCount:reading.reduce((n,x)=>n+x.attempts,0),...skillMomentum('reading',average(reading.map(x=>x.bestScore))),path:`/tieng-${language==='en'?'anh':'trung'}/reading`},
      {key:'writing',label:'Writing',score:masteryForSkill('writing',average(writing.map(x=>x.bestScore))),coverage:writing.length/Math.max(1,writingService.getAll(language).length),activityCount:writing.length,total:writingService.getAll(language).length,evidenceCount:writing.reduce((n,x)=>n+x.attempts,0),...skillMomentum('writing',average(writing.map(x=>x.bestScore))),path:`/tieng-${language==='en'?'anh':'trung'}/writing`},
    ];

    const quizSkills=languageMastery.skills.filter(x=>x.categoryId===(language==='zh'?'tieng-trung':'tieng-anh'));
    const quizSkills=languageMastery.skills.filter(x=>x.categoryId===(language==='zh'?'tieng-trung':'tieng-anh'));
    const quizOverall=quizSkills.length?average(quizSkills.map(x=>x.mastery)):0;
    const active=skills.filter(x=>x.activityCount>0);
    const overall=active.length?Math.round((average(active.map(x=>x.score))+quizOverall)/2):quizOverall;
    const sorted=skills.slice().sort((a,b)=>b.score-a.score);
    return {language,overall,skills,strongest:sorted[0]||null,needsAttention:skills.slice().sort((a,b)=>(a.score-a.coverage*15)-(b.score-b.coverage*15)).slice(0,3),recentEvidence,lastActiveAt:recentEvidence[0]?.timestamp||null,streakDays,updatedAt:new Date().toISOString()};
  }
};
