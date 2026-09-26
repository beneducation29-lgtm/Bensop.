export interface TutorMessage{id:string;role:'user'|'assistant';content:string;createdAt:string}
export interface TutorContext{
  language:'en'|'zh';
  level:string;
  topic?:string;
  learner?:{
    overall:number;
    weakestSkill?:string;
    weakestScore?:number;
    weakestTrend?:'up'|'down'|'stable';
    dueReviews:number;
    recentEvidenceCount:number;
  };
}
export interface TutorReply{content:string;suggestions:string[];source:'fallback'|'ai'}
