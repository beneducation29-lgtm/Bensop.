import { LanguageCode } from '../types/vocabulary';
import { vocabularyService } from './vocabularyService';
import { grammarService } from './grammarService';
import { listeningService } from './listeningService';
import { speakingService } from './speakingService';
import { readingService } from './readingService';
import { writingService } from './writingService';
import { masteryService } from './masteryService';

export interface LearnerSkillProfile {
  key: 'vocabulary'|'grammar'|'listening'|'speaking'|'reading'|'writing';
  label: string;
  score: number;
  coverage: number;
  activityCount: number;
  total: number;
  evidenceCount: number;
  path: string;
}

export interface LearnerProfileSnapshot {
  language: LanguageCode;
  overall: number;
  skills: LearnerSkillProfile[];
  strongest: LearnerSkillProfile | null;
  needsAttention: LearnerSkillProfile[];
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
    const quizSkills = masteryService.getSnapshot().skills.filter(x=>x.categoryId===(language==='zh'?'tieng-trung':'tieng-anh'));

    const skills:LearnerSkillProfile[]=[
      {key:'vocabulary',label:'Vocabulary',score:average(Object.values(vocab).map(x=>x.masteryScore)),coverage:Object.keys(vocab).length/Math.max(1,vocabularyService.getAllWords(language).length),activityCount:Object.keys(vocab).length,total:vocabularyService.getAllWords(language).length,evidenceCount:Object.values(vocab).reduce((n,x)=>n+x.reviewCount,0),path:`/tieng-${language==='en'?'anh':'trung'}/vocabulary/practice`},
      {key:'grammar',label:'Grammar',score:average(Object.values(grammar).map(x=>x.masteryScore)),coverage:Object.keys(grammar).length/Math.max(1,grammarService.getAllConcepts(language).length),activityCount:Object.keys(grammar).length,total:grammarService.getAllConcepts(language).length,evidenceCount:Object.values(grammar).reduce((n,x)=>n+x.practiceCount,0),path:`/tieng-${language==='en'?'anh':'trung'}/grammar/review`},
      {key:'listening',label:'Listening',score:average(listening.map(x=>x.accuracy)),coverage:listening.length/Math.max(1,listeningService.getAllLessons(language).length),activityCount:listening.length,total:listeningService.getAllLessons(language).length,evidenceCount:listening.reduce((n,x)=>n+x.attempts,0),path:`/tieng-${language==='en'?'anh':'trung'}/listening`},
      {key:'speaking',label:'Speaking',score:average(speaking.map(x=>x.bestScore)),coverage:speaking.length/Math.max(1,speakingService.getAllActivities(language).length),activityCount:speaking.length,total:speakingService.getAllActivities(language).length,evidenceCount:speaking.reduce((n,x)=>n+x.attempts,0),path:`/tieng-${language==='en'?'anh':'trung'}/speaking`},
      {key:'reading',label:'Reading',score:average(reading.map(x=>x.bestScore)),coverage:reading.length/Math.max(1,readingService.getAll(language).length),activityCount:reading.length,total:readingService.getAll(language).length,evidenceCount:reading.reduce((n,x)=>n+x.attempts,0),path:`/tieng-${language==='en'?'anh':'trung'}/reading`},
      {key:'writing',label:'Writing',score:average(writing.map(x=>x.bestScore)),coverage:writing.length/Math.max(1,writingService.getAll(language).length),activityCount:writing.length,total:writingService.getAll(language).length,evidenceCount:writing.reduce((n,x)=>n+x.attempts,0),path:`/tieng-${language==='en'?'anh':'trung'}/writing`},
    ];

    const quizOverall=quizSkills.length?average(quizSkills.map(x=>x.mastery)):0;
    const active=skills.filter(x=>x.activityCount>0);
    const overall=active.length?Math.round((average(active.map(x=>x.score))+quizOverall)/2):quizOverall;
    const sorted=skills.slice().sort((a,b)=>b.score-a.score);
    return {language,overall,skills,strongest:sorted[0]||null,needsAttention:skills.slice().sort((a,b)=>(a.score-a.coverage*15)-(b.score-b.coverage*15)).slice(0,3),updatedAt:new Date().toISOString()};
  }
};
