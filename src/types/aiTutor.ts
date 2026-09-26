export interface TutorMessage{id:string;role:'user'|'assistant';content:string;createdAt:string}
export interface TutorContext{language:'en'|'zh';level:string;topic?:string}
export interface TutorReply{content:string;suggestions:string[];source:'fallback'|'ai'}