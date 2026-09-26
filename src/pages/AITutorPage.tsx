import React,{useMemo,useState}from'react';
import{Bot,Send,Target,RefreshCw}from'lucide-react';
import{aiTutorService}from'../services/aiTutorService';
import{TutorMessage}from'../types/aiTutor';

export function AITutorPage(){
  const[language,setLanguage]=useState<'en'|'zh'>('en');
  const context=useMemo(()=>aiTutorService.getLearnerContext(language),[language]);
  const[messages,setMessages]=useState<TutorMessage[]>([]);
  const[input,setInput]=useState(''),[busy,setBusy]=useState(false);
  const send=async(text=input.trim())=>{
    if(!text||busy)return;
    setInput('');
    setMessages(m=>[...m,{id:String(Date.now()),role:'user',content:text,createdAt:new Date().toISOString()}]);
    setBusy(true);
    const r=await aiTutorService.reply(text,context);
    setMessages(m=>[...m,{id:String(Date.now()+1),role:'assistant',content:r.content,createdAt:new Date().toISOString()}]);
    setBusy(false);
  };
  const starter=language==='zh'?'你好！我可以根据你的学习记录帮你决定下一步练什么。':'Hello! I can use your learning evidence to help decide what to practise next.';
  const weak=context.learner?.weakestSkill,weakScore=context.learner?.weakestScore;
  const quick=language==='zh'?['接下来我该学什么？','帮我检查语法','给我一个练习']:['What should I learn next?','Check my grammar','Give me a practice task'];
  return <div className="min-h-[75vh] bg-[#050505] py-10"><div className="mx-auto max-w-4xl px-5 sm:px-8">
    <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div><div className="mb-3 flex items-center gap-2 text-xs font-mono text-[#D9FF3F]"><Bot className="h-4 w-4"/>AI COACH</div><h1 className="text-4xl font-black sm:text-5xl">HỌC CÓ <span className="text-[#D9FF3F]">NGƯỜI DẪN.</span></h1><p className="mt-3 max-w-2xl text-sm leading-6 text-[#888]">AI Tutor giờ có thể đọc tín hiệu học tập gần đây để đưa ra gợi ý phù hợp hơn.</p></div>
      <div className="flex gap-2"><button onClick={()=>setLanguage('en')} className={language==='en'?'bg-[#D9FF3F] text-black':'bg-[#141414] text-white'}>EN</button><button onClick={()=>setLanguage('zh')} className={language==='zh'?'bg-[#D9FF3F] text-black':'bg-[#141414] text-white'}>中</button></div>
    </div>
    <div className="mb-5 grid gap-3 sm:grid-cols-3">
      <div className="border border-[#292929] bg-[#0d0d0d] p-4"><div className="text-xs text-[#777]">LEARNER MASTERY</div><div className="mt-1 text-2xl font-black">{context.learner?.overall??0}%</div></div>
      <div className="border border-[#292929] bg-[#0d0d0d] p-4"><div className="text-xs text-[#777]">FOCUS AREA</div><div className="mt-1 text-lg font-bold">{weak||'Chưa đủ dữ liệu'}</div>{weakScore!==undefined&&<div className="text-xs text-[#777]">mastery {weakScore}%</div>}</div>
      <div className="border border-[#292929] bg-[#0d0d0d] p-4"><div className="text-xs text-[#777]">REVIEWS DUE</div><div className="mt-1 flex items-center gap-2 text-2xl font-black"><RefreshCw className="h-5 w-5"/>{context.learner?.dueReviews??0}</div></div>
    </div>
    <div className="mb-4 flex flex-wrap gap-2">{quick.map(q=><button key={q} onClick={()=>send(q)} className="border border-[#333] bg-[#101010] px-3 py-2 text-xs text-[#ccc] hover:border-[#D9FF3F]">{q}</button>)}</div>
    <div className="border border-[#292929] bg-[#0d0d0d] p-5"><div className="min-h-[420px] space-y-4">
      {!messages.length&&<div className="flex justify-start"><div className="max-w-[85%] bg-[#171717] p-4 text-sm leading-7 text-[#ccc]"><Target className="mb-2 h-4 w-4 text-[#D9FF3F]"/>{starter}</div></div>}
      {messages.map(m=><div key={m.id} className={m.role==='user'?'flex justify-end':'flex justify-start'}><div className={m.role==='user'?'max-w-[80%] bg-[#D9FF3F] p-4 text-sm text-black':'max-w-[80%] bg-[#171717] p-4 text-sm leading-7 text-[#ccc]'}>{m.content}</div></div>)}
    </div><div className="mt-8 flex gap-2 border-t border-[#222] pt-4"><input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} placeholder="Viết câu hỏi..." className="flex-1 bg-transparent p-3 text-sm outline-none"/><button onClick={()=>send()} disabled={busy} className="bg-[#D9FF3F] p-3 text-black"><Send className="h-4 w-4"/></button></div></div>
  </div></div>
}
