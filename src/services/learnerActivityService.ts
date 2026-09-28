export type LearnerActivitySkill = 'lesson'|'vocabulary'|'grammar'|'listening'|'speaking'|'reading'|'writing'|'quiz';

export interface LearnerActivityEvent {
  id: string;
  skill: LearnerActivitySkill;
  language: 'en'|'zh';
  activityId: string;
  score: number;
  evidenceType: 'mastery'|'completion'|'assessment';
  timestamp: string;
  metadata?: Record<string,string|number|boolean>;
}

const KEY='bensop_learner_activity';

const read=():LearnerActivityEvent[]=>{
  try{return JSON.parse(localStorage.getItem(KEY)||'[]') as LearnerActivityEvent[]}catch{return[]}
};

const write=(events:LearnerActivityEvent[])=>{
  try{localStorage.setItem(KEY,JSON.stringify(events.slice(-500)))}catch{}
};

export const learnerActivityService={
  getAll():LearnerActivityEvent[]{return read().sort((a,b)=>b.timestamp.localeCompare(a.timestamp))},
  record(input:Omit<LearnerActivityEvent,'id'>):LearnerActivityEvent{
    const event:LearnerActivityEvent={...input,id:input.skill+'-'+input.activityId+'-'+Date.now()+'-'+Math.random().toString(36).slice(2,7)};
    write([...read(),event]);
    return event;
  },
  getRecent(language?:'en'|'zh',limit=10):LearnerActivityEvent[]{
    return this.getAll().filter(e=>!language||e.language===language).slice(0,limit);
  },
  getSince(timestamp:string, language?:'en'|'zh'):LearnerActivityEvent[]{
    if(!timestamp) return this.getAll().filter(e=>!language||e.language===language);
    return this.getAll().filter(e=>(!language||e.language===language)&&e.timestamp>timestamp);
  },
  getSinceForSkills(timestamp:string, skills:LearnerActivitySkill[], language?:'en'|'zh'):LearnerActivityEvent[]{
    const allowed=new Set(skills);
    return this.getSince(timestamp,language).filter(e=>allowed.has(e.skill));
  },
  getActiveDates(language?:'en'|'zh'):string[]{
    return Array.from(new Set(this.getAll().filter(e=>!language||e.language===language).map(e=>e.timestamp.slice(0,10))));
  }
};
