import { AISpeakingMode, AISpeakingReply, AISpeakingRoomContext, AISpeakingSession, AISpeakingTurn, AISpeakingConversationMemory } from '../types/aiSpeaking';
import { LanguageCode } from '../types/vocabulary';

const SESSION_KEY = 'bensop_ai_speaking_session';

const LANGUAGE_LABELS: Record<LanguageCode, string> = { en: 'English', zh: '中文' };
const MODE_LABELS: Record<AISpeakingMode, string> = {
  shadowing: 'Shadowing',
  'role-play': 'Role Play',
  'free-conversation': 'Free Conversation',
  interview: 'Interview',
  'pronunciation-coach': 'Pronunciation Coach',
};

const readSession = (): AISpeakingSession | null => {
  try {
    const raw=localStorage.getItem(SESSION_KEY);
    if(!raw)return null;
    const parsed=JSON.parse(raw) as AISpeakingSession;
    if(!parsed||!parsed.id||!['en','zh'].includes(parsed.language)||!Array.isArray(parsed.turns))return null;
    return parsed;
  } catch { return null; }
};
const writeSession = (session: AISpeakingSession) => { try { localStorage.setItem(SESSION_KEY, JSON.stringify(session)); } catch {} };
const createId = () => `ai-speaking-${Date.now()}-${Math.random().toString(36).slice(2,8)}`;

const normalizeChineseDisplay = (turn: AISpeakingTurn): AISpeakingTurn => {
  if(turn.role!=='ai') return turn;
  const display=turn.display||{text:turn.text};
  return {...turn,display:{
    text:display.text||turn.text,
    pinyin:display.pinyin?.trim()||undefined,
    vietnameseTranslation:display.vietnameseTranslation?.trim()||undefined,
  }};
};

export const aiSpeakingService = {
  getModeLabel:(mode:AISpeakingMode)=>MODE_LABELS[mode],
  getLanguageLabel:(language:LanguageCode)=>LANGUAGE_LABELS[language],
  getTurnDisplay:(turn:AISpeakingTurn,language:LanguageCode)=>language==='zh'?normalizeChineseDisplay(turn).display:turn.display,
  createSession(context:AISpeakingRoomContext):AISpeakingSession{
    const session:AISpeakingSession={id:createId(),language:context.language,mode:context.mode,level:context.level,topic:context.topic||(context.language==='zh'?'日常生活':'Everyday Life'),scenario:context.scenario,conversationMemory:{topicFocus:context.topic,scenarioState:context.scenario,learnerGoal:context.learnerGoal},startedAt:new Date().toISOString(),turns:[],status:'ready'};
    writeSession(session);return session;
  },
  getSession(language?:LanguageCode){const session=readSession();return !session||(language&&session.language!==language)?null:session;},
  addTurn(sessionId:string,turn:Omit<AISpeakingSession['turns'][number],'id'|'createdAt'>){
    const session=readSession();if(!session||session.id!==sessionId)return null;
    const nextTurn:AISpeakingTurn={...turn,id:createId(),createdAt:new Date().toISOString()};
    const normalized=session.language==='zh'?normalizeChineseDisplay(nextTurn):nextTurn;
    const next={...session,status:'active' as const,turns:[...session.turns,normalized]};
    writeSession(next);return next;
  },
  updateMemory(sessionId:string,memory:AISpeakingConversationMemory){
    const session=readSession();if(!session||session.id!==sessionId)return null;
    const safeArray=(value:unknown,max:number,itemMax:number)=>{
      if(!Array.isArray(value))return [];
      return value.filter(x=>typeof x==='string').slice(-max).map(x=>x.trim().slice(0,itemMax)).filter(Boolean);
    };
    const next={...session,conversationMemory:{
      topicFocus:typeof memory.topicFocus==='string'?memory.topicFocus.trim().slice(0,240):undefined,
      scenarioState:typeof memory.scenarioState==='string'?memory.scenarioState.trim().slice(0,500):undefined,
      learnerGoal:typeof memory.learnerGoal==='string'?memory.learnerGoal.trim().slice(0,240):undefined,
      stage:typeof memory.stage==='string'?memory.stage.trim().slice(0,80):undefined,
      openThread:typeof memory.openThread==='string'?memory.openThread.trim().slice(0,300):undefined,
      learnerDetails:safeArray(memory.learnerDetails,5,180),
      recentPreferences:safeArray(memory.recentPreferences,5,180),
      usedPrompts:safeArray(memory.usedPrompts,8,180),
      usefulCorrections:safeArray(memory.usefulCorrections,6,220),
      lastLearnerIntent:typeof memory.lastLearnerIntent==='string'?memory.lastLearnerIntent.trim().slice(0,240):undefined,
    }};
    writeSession(next);return next;
  },
  completeSession(sessionId:string){const session=readSession();if(!session||session.id!==sessionId)return null;const next={...session,status:'completed' as const};writeSession(next);return next;},
  async reply(context:AISpeakingRoomContext,transcript:string,history:AISpeakingSession['turns']):Promise<AISpeakingReply>{
    const controller=new AbortController();
    const timeout=window.setTimeout(()=>controller.abort(),18000);
    let response: Response;
    try {
      response=await fetch('/api/ai-speaking',{method:'POST',headers:{'Content-Type':'application/json'},signal:controller.signal,body:JSON.stringify({
      language:context.language,mode:context.mode,level:context.level,topic:context.topic,scenario:context.scenario,learnerGoal:context.learnerGoal,conversationMemory:history.length?this.getSession(context.language)?.conversationMemory:undefined,transcript,history:history.slice(-10).map(t=>({role:t.role,text:t.text})),
    })});
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') throw new Error('AI Speaking phản hồi quá lâu. Hãy thử gửi lại.');
      throw error;
    } finally {
      window.clearTimeout(timeout);
    }
    const data=await response.json().catch(()=>({}));
    if(!response.ok) throw new Error(typeof data?.error==='string'?data.error:'AI speaking request failed');
    if(typeof data?.text!=='string'||!data.text.trim()) throw new Error('AI speaking returned an empty response');
    if(context.language==='zh'&&(!data.pinyin||!data.vietnameseTranslation)) throw new Error('Chinese AI reply is missing Pinyin or Vietnamese translation');
    if(context.language==='en'&&data.pinyin) throw new Error('English AI reply violated language isolation');
    return data as AISpeakingReply;
  },
};