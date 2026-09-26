import React,{useEffect,useMemo,useState}from'react';
import{Bot,Send,Target,RefreshCw,ArrowRight,Trash2,Sparkles}from'lucide-react';
import{aiTutorService}from'../services/aiTutorService';
import{TutorMessage,TutorReply}from'../types/aiTutor';

const KEY='bensop_ai_tutor_messages';
type ChatMessage=TutorMessage&TutorReply;

export function AITutorPage({onNavigate}:{onNavigate?:(path:string)=>void}){
  const[language,setLanguage]=useState<'en'|'zh'>('en'),context=useMemo(()=>aiTutorService.getLearnerContext(language),[language]);
  const[messages,setMessages]=useState<ChatMessage[]>(()=>{try{return JSON.parse(localStorage.getItem(KEY)||'[]') as ChatMessage[]}catch{return[]}});
  const[input,setInput]=useState(''),[busy,setBusy]=useState(false);
  useEffect(()=>{try{localStorage.setItem(KEY,JSON.stringify(messages.slice(-30)))}catch{}},[messages]);
  const send=async(text=input.trim())=>{
    if(!text||busy)return;
    setInput('');
    const userMessage:ChatMessage={id:String(Date.now()),role:'user',content:text,createdAt:new Date().toISOString(),suggestions:[],source:'fallback'};
    const history=messages.slice(-8).map(m=>({role:m.role,content:m.content}));
    setMessages(m=>[...m,userMessage]); setBusy(true);
    const r=await aiTutorService.reply(text,context,history);
    setMessages(m=>[...m,{id:String(Date.now()+1),role:'assistant',content:r.content,createdAt:new Date().toISOString(),...r}]);
    setBusy(false);
  };
  const clear=()=>{setMessages([]);try{localStorage.removeItem(KEY)}catch{}};
  const starter=language==='zh'?'你好！我可以根据你的学习记录帮你决定下一步练什么。':'Hello! I can use your learning evidence to help decide what to practise next.';
  const weak=context.learner?.weakestSkill,weakScore=context.learner?.weakestScore;
  const quick=language==='zh'?['接下来我该学什么？','帮我检查语法','给我一个练习']:['What should I learn next?','Check my grammar','Give me a practice task'];
  const defaultAction=aiTutorService.getRecommendedAction(language);
  return <div className="min-h-[75vh] bg-[#050505] py-10"><div className="mx-auto max-w-4xl px-5 sm:px-8">
    <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><div><div className="mb-3 flex items-center gap-2 text-xs font-mono text-[#D9FF3F]"><Bot className="h-4 w-4"/>AI COACH <span className="inline-flex items-center gap-1 border border-[#D9FF3F]/30 px-2 py-1 text-[9px]"><Sparkles className="h-3 w-3"/>GEMINI READY</span></div><h1 className="text-4xl font-black sm:text-5xl">HỌC CÓ <span className="text-[#D9FF3F]">NGƯỜI DẪN.</span></h1><p className="mt-3 max-w-2xl text-sm leading-6 text-[#888]">AI Coach dùng context học tập + lịch sử hội thoại gần đây để đưa ra bước học có thể thực hiện ngay.</p></div><div className="flex gap-2"><button onClick={()=>setLanguage('en')} className={language==='en'?'bg-[#D9FF3F] text-black':'bg-[#141414] text-white'}>EN</button><button onClick={()=>setLanguage('zh')} className={language==='zh'?'bg-[#D9FF3F] text-black':'bg-[#141414] text-white'}>中</button></div></div>
    <div className="mb-5 grid gap-3 sm:grid-cols-3"><div className="border border-[#292929] bg-[#0d0d0d] p-4"><div className="text-xs text-[#777]">LEARNER MASTERY</div><div className="mt-1 text-2xl font-black">{context.learner?.overall??0}%</div></div><div className="border border-[#292929] bg-[#0d0d0d] p-4"><div className="text-xs text-[#777]">FOCUS AREA</div><div className="mt-1 text-lg font-bold">{weak||'Chưa đủ dữ liệu'}</div>{weakScore!==undefined&&<div className="text-xs text-[#777]">mastery {weakScore}%</div>}</div><div className="border border-[#292929] bg-[#0d0d0d] p-4"><div className="text-xs text-[#777]">REVIEWS DUE</div><div className="mt-1 flex items-center gap-2 text-2xl font-black"><RefreshCw className="h-5 w-5"/>{context.learner?.dueReviews??0}</div></div></div>
    {defaultAction&&<button onClick={()=>onNavigate?.(defaultAction.path)} className="mb-4 flex w-full items-center justify-between border border-[#D9FF3F]/30 bg-[#D9FF3F]/5 p-4 text-left"><div><div className="text-[9px] font-mono text-[#D9FF3F]">NEXT BEST ACTION</div><div className="mt-1 text-sm font-bold">{defaultAction.label}</div></div><ArrowRight className="h-4 w-4 text-[#D9FF3F]"/></button>}
    <div className="mb-4 flex items-center justify-between gap-3"><div className="flex flex-wrap gap-2">{quick.map(q=><button key={q} onClick={()=>send(q)} disabled={busy} className="border border-[#333] bg-[#101010] px-3 py-2 text-xs text-[#ccc] hover:border-[#D9FF3F]">{q}</button>)}</div>{messages.length>0&&<button onClick={clear} className="flex items-center gap-1 text-[10px] text-[#777] hover:text-white"><Trash2 className="h-3 w-3"/>XÓA HỘI THOẠI</button>}</div>
    <div className="border border-[#292929] bg-[#0d0d0d] p-5"><div className="min-h-[420px] space-y-4">{!messages.length&&<div className="flex justify-start"><div className="max-w-[85%] bg-[#171717] p-4 text-sm leading-7 text-[#ccc]"><Target className="mb-2 h-4 w-4 text-[#D9FF3F]"/>{starter}</div></div>}{messages.map(m=><div key={m.id}><div className={m.role==='user'?'flex justify-end':'flex justify-start'}><div className={m.role==='user'?'max-w-[80%] bg-[#D9FF3F] p-4 text-sm text-black':'max-w-[80%] bg-[#171717] p-4 text-sm leading-7 text-[#ccc]'}>{m.content}</div></div>{m.role==='assistant'&&m.action&&<button onClick={()=>onNavigate?.(m.action!.path)} className="mt-2 ml-2 flex items-center gap-2 text-[10px] font-bold text-[#D9FF3F]">{m.action.label}<ArrowRight className="h-3 w-3"/></button>}</div>)}{busy&&<div className="text-xs text-[#777]">AI Coach đang suy nghĩ…</div>}</div><div className="mt-8 flex gap-2 border-t border-[#222] pt-4"><input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} placeholder="Viết câu hỏi..." className="flex-1 bg-transparent p-3 text-sm outline-none"/><button onClick={()=>send()} disabled={busy} className="bg-[#D9FF3F] p-3 text-black"><Send className="h-4 w-4"/></button></div></div>
  </div></div>
}
