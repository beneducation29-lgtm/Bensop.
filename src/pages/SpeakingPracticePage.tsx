import React,{useEffect,useMemo,useState}from'react';
import{ArrowLeft,Mic,Volume2,Loader2,Sparkles,MessageCircle,Languages,RotateCcw}from'lucide-react';
import{speakingService}from'../services/speakingService';
import{mediaService}from'../services/mediaService';
import{aiSpeakingService}from'../services/aiSpeakingService';
import{browserSpeechRecognitionService}from'../services/browserSpeechRecognitionService';
import{masteryService}from'../services/masteryService';
import{learnerActivityService}from'../services/learnerActivityService';
import{spacedReviewService}from'../services/spacedReviewService';
import{AISpeakingMode,AISpeakingTurnFeedback}from'../types/aiSpeaking';

type P={language:'en'|'zh';slug:string;onNavigate:(p:string)=>void};

const zhOpening={text:'你好！我们一起练习吧。请先告诉我，你今天早上做了什么？',pinyin:'Nǐ hǎo! Wǒmen yìqǐ liànxí ba. Qǐng xiān gàosu wǒ, nǐ jīntiān zǎoshang zuò le shénme?',vi:'Xin chào! Chúng ta cùng luyện tập nhé. Trước tiên hãy kể cho mình nghe sáng nay bạn đã làm gì?'};

export function SpeakingPracticePage({language,slug,onNavigate}:P){
 const activity=useMemo(()=>speakingService.getActivityBySlug(slug,language),[slug,language]);
 const[session,setSession]=useState(()=>{const existing=aiSpeakingService.getSession(language);return existing?.topic===activity?.title?existing:null;});
 const[response,setResponse]=useState(''),[lastTranscript,setLastTranscript]=useState(''),[loading,setLoading]=useState(false),[listening,setListening]=useState(false),[error,setError]=useState('');
 const[mode,setMode]=useState<AISpeakingMode>('role-play');

 useEffect(()=>{mediaService.stop();return()=>mediaService.stop()},[]);
 if(!activity)return <div className="p-20 text-white">Không tìm thấy bài luyện nói.</div>;

 const startRoom=()=>{
   const next=aiSpeakingService.createSession({language,level:activity.level,mode,topic:activity.title,scenario:activity.prompt});
   const seeded=aiSpeakingService.addTurn(next.id,{role:'ai',text:language==='zh'?zhOpening.text:'Hello! Let’s practise this situation together. Tell me one thing you would do first.',display:language==='zh'?{text:zhOpening.text,pinyin:zhOpening.pinyin,vietnameseTranslation:zhOpening.vi}:{text:'Hello! Let’s practise this situation together. Tell me one thing you would do first.',vietnameseTranslation:'Xin chào! Hãy cùng luyện tình huống này nhé. Hãy nói cho mình một việc bạn sẽ làm đầu tiên.'}});
   setSession(seeded||next);setResponse('');setLastTranscript('');setError('');
 };

 const submitTranscript=async(transcriptInput?:string)=>{
   const transcript=(transcriptInput??response).trim();
   if(!session||!transcript||loading)return;
   setLastTranscript(transcript);
   const learner=aiSpeakingService.addTurn(session.id,{role:'learner',text:transcript});
   if(!learner)return;
   setSession(learner);setResponse('');setLoading(true);setError('');
   try{
     const reply=await aiSpeakingService.reply({language,level:activity.level,mode:session.mode,topic:activity.title,scenario:activity.prompt,learnerGoal:session.scenario},transcript,learner.turns);
     const ai=aiSpeakingService.addTurn(session.id,{role:'ai',text:reply.text,display:{text:reply.text,pinyin:reply.pinyin,vietnameseTranslation:reply.vietnameseTranslation},feedback:reply.feedback});
     if(reply.conversationMemory)aiSpeakingService.updateMemory(session.id,reply.conversationMemory);
     if(reply.feedback){
       const f=reply.feedback,scores=[f.fluency,f.grammar,f.vocabulary,f.relevance].filter((v):v is number=>typeof v==='number');
       const score=scores.length?Math.round(scores.reduce((a,b)=>a+b,0)/scores.length):60;
       masteryService.recordSpeakingEvaluation({language,sessionId:session.id,score,fluency:f.fluency,grammar:f.grammar,vocabulary:f.vocabulary,relevance:f.relevance});
       learnerActivityService.record({skill:'speaking',language,activityId:`ai-speaking:${session.id}`,score,evidenceType:'assessment',timestamp:new Date().toISOString(),metadata:{mode:session.mode,activityId:activity.id}});
       spacedReviewService.scheduleSkillReview('speaking',session.id,language==='zh'?'中文 AI 口语':'English AI Speaking',language==='zh'?'/tieng-trung/speaking':'/tieng-anh/speaking',score>=80?7:score>=60?3:1,new Date().toISOString(),language);
     }
     setSession(ai||learner);
     if(ai)void mediaService.speak(ai.text,language);
   }catch(e){setError(e instanceof Error?e.message:'Không thể kết nối AI Speaking lúc này.');}
   finally{setLoading(false);}
 };

 const listen=async()=>{
   if(listening){browserSpeechRecognitionService.stop();setListening(false);return}
   setListening(true);setError('');
   try{const r=await browserSpeechRecognitionService.listen(language);setResponse(r.transcription);await submitTranscript(r.transcription)}
   catch(e){setError(e instanceof Error?e.message:'Không thể nhận diện giọng nói.')}
   finally{setListening(false)}
 };

 const feedback=(f?:AISpeakingTurnFeedback)=>{
   if(!f)return null;
   const items=[['Phát âm',f.pronunciation],['Fluency',f.fluency],['Grammar',f.grammar],['Vocabulary',f.vocabulary],['Relevance',f.relevance]];
   return <div className="mt-4 border-t border-[#242424] pt-4"><div className="mb-3 text-[10px] font-mono text-[#D9FF3F]">AI FEEDBACK · 1 ĐIỂM QUAN TRỌNG</div><div className="grid grid-cols-2 gap-2 sm:grid-cols-5">{items.map(([label,value])=><div key={String(label)} className="bg-[#0a0a0a] p-2"><div className="text-[9px] text-[#666]">{label}</div><div className="mt-1 font-bold">{typeof value==='number'?value+'%':'—'}</div></div>)}</div>{f.note&&<p className="mt-3 text-xs leading-5 text-[#aaa]">{f.note}</p>}{f.corrections?.length?<div className="mt-3 space-y-2">{f.corrections.slice(0,2).map((c,i)=><div key={i} className="text-xs"><span className="text-[#777]">{c.original}</span><span className="mx-2 text-[#D9FF3F]">→</span><span>{c.improved}</span><div className="mt-1 text-[#666]">{c.explanation}</div></div>)}</div>:null}</div>;
 };

 return <div className="min-h-[78vh] bg-[#050505] py-8 sm:py-10"><div className="mx-auto max-w-6xl px-5 sm:px-8">
  <button onClick={()=>onNavigate('/'+(language==='en'?'tieng-anh':'tieng-trung')+'/speaking')} className="mb-6 flex items-center gap-2 text-xs text-[#777]"><ArrowLeft className="h-4 w-4"/>SPEAKING LAB</button>

  <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"><div><div className="mb-2 flex items-center gap-2 text-xs font-mono text-[#D9FF3F]"><Sparkles className="h-4 w-4"/>AI SPEAKING LAB · {language==='zh'?'中文':'ENGLISH'}</div><h1 className="text-3xl font-black sm:text-5xl">{activity.title}</h1><p className="mt-3 max-w-3xl text-sm leading-6 text-[#999]">{activity.prompt}</p></div><div className="border border-[#292929] bg-[#0d0d0d] px-4 py-3 text-xs"><span className="text-[#D9FF3F]">{activity.level}</span><span className="mx-2 text-[#444]">·</span>AI giao tiếp trực tiếp</div></div>

  <div className="mb-5 grid gap-3 sm:grid-cols-3"><div className="border border-[#242424] bg-[#0c0c0c] p-4"><div className="text-[9px] font-mono text-[#D9FF3F]">01 · SPEAK</div><div className="mt-2 text-sm font-bold">Bạn nói bằng micro</div></div><div className="border border-[#242424] bg-[#0c0c0c] p-4"><div className="text-[9px] font-mono text-[#D9FF3F]">02 · AI LISTENS</div><div className="mt-2 text-sm font-bold">AI hiểu ý và nhớ ngữ cảnh</div></div><div className="border border-[#242424] bg-[#0c0c0c] p-4"><div className="text-[9px] font-mono text-[#D9FF3F]">03 · AI REPLIES</div><div className="mt-2 text-sm font-bold">AI phản hồi + đẩy hội thoại</div></div></div>

  {!session||!session.turns.length?<div className="border border-[#D9FF3F]/30 bg-[#0b0f07] p-6 sm:p-8"><div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between"><div><div className="text-xs font-mono text-[#D9FF3F]">START AI CONVERSATION</div><h2 className="mt-2 text-2xl font-black">Đừng đọc thuộc. Hãy nói chuyện.</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-[#999]">{language==='zh'?'AI sẽ nói tiếng Trung giản thể, luôn kèm Pinyin có dấu thanh và tiếng Việt để bạn hiểu nhanh.':'AI sẽ trò chuyện bằng English và dùng tiếng Việt hỗ trợ khi cần.'}</p><div className="mt-4 flex flex-wrap gap-2">{(['role-play','free-conversation','interview'] as AISpeakingMode[]).map(m=><button key={m} onClick={()=>setMode(m)} className={`border px-3 py-2 text-xs ${mode===m?'border-[#D9FF3F] text-[#D9FF3F]':'border-[#333] text-[#888]'}`}>{m==='role-play'?'ROLE-PLAY':m==='free-conversation'?'FREE TALK':'INTERVIEW'}</button>)}</div></div><button onClick={startRoom} className="shrink-0 bg-[#D9FF3F] px-6 py-4 text-xs font-black text-black"><MessageCircle className="mr-2 inline h-4 w-4"/>BẮT ĐẦU AI LAB</button></div></div>:
  <section className="border border-[#292929] bg-[#0b0b0b]">
   <div className="flex flex-col gap-3 border-b border-[#242424] p-5 sm:flex-row sm:items-center sm:justify-between"><div><div className="flex items-center gap-2 text-xs font-mono text-[#D9FF3F]"><Languages className="h-4 w-4"/>AI CONVERSATION · {mode.toUpperCase()}</div><div className="mt-1 text-xs text-[#666]">AI giữ ngữ cảnh, không lặp lại máy móc · {language==='zh'?'中文 → Pinyin → Tiếng Việt':'English → Tiếng Việt hỗ trợ'}</div></div><button onClick={startRoom} className="flex items-center gap-2 border border-[#333] px-3 py-2 text-xs text-[#888]"><RotateCcw className="h-3.5 w-3.5"/>PHIÊN MỚI</button></div>
   <div className="grid gap-0 lg:grid-cols-[1fr_280px]">
    <div className="p-5 sm:p-7">
     <div className="max-h-[560px] space-y-5 overflow-y-auto pr-1">{session.turns.map(t=><div key={t.id} className={t.role==='ai'?'border-l-2 border-[#D9FF3F] pl-4':'border-l-2 border-[#333] pl-4'}><div className="mb-1 text-[9px] font-mono text-[#666]">{t.role==='ai'?'AI COACH':'BẠN'}</div><div className="text-lg font-semibold leading-8">{t.text}</div>{t.role==='ai'&&language==='zh'&&t.display?.pinyin&&<div className="mt-1 text-sm leading-6 text-[#D9FF3F]">{t.display.pinyin}</div>}{t.role==='ai'&&t.display?.vietnameseTranslation&&<div className="mt-1 text-sm leading-6 text-[#999]">{t.display.vietnameseTranslation}</div>}{t.role==='ai'&&<button onClick={()=>void mediaService.speak(t.text,language)} className="mt-2 text-[10px] text-[#777]"><Volume2 className="mr-1 inline h-3 w-3"/>NGHE AI</button>}{feedback(t.feedback)}</div>)}</div>
    <div className="mt-6 border-t border-[#242424] pt-5"><div className="border border-[#292929] bg-[#080808] p-4"><div className="text-[9px] font-mono text-[#666]">LIVE TRANSCRIPT</div><div className="mt-2 min-h-10 text-sm text-[#aaa]">{response||lastTranscript||'Bấm “NÓI VỚI AI”, nói tự nhiên, Bensop sẽ tự nhận diện và gửi câu nói cho AI.'}</div></div><div className="mt-3 flex flex-wrap items-center gap-3"><button onClick={()=>void listen()} disabled={loading} className={`flex items-center gap-2 px-5 py-3 text-xs font-black ${listening?'bg-[#D9FF3F] text-black':'border border-[#333]'}`}><Mic className="h-4 w-4"/>{listening?'ĐANG NGHE…':'NÓI VỚI AI'}</button>{loading&&<div className="flex items-center gap-2 text-xs text-[#888]"><Loader2 className="h-4 w-4 animate-spin text-[#D9FF3F]"/>AI đang nghe hiểu và phản hồi…</div>}<div className="text-[10px] text-[#555]">Không cần bấm GỬI — nhận diện xong sẽ tự chuyển cho AI.</div></div>{error&&<div className="mt-3 border border-red-900/60 bg-red-950/20 p-3 text-xs text-red-300">{error}</div>}</div>
  
    <aside className="border-t border-[#242424] bg-[#0f0f0f] p-5 lg:border-l lg:border-t-0"><div className="text-xs font-mono text-[#D9FF3F]">LANGUAGE CONTRACT</div>{language==='zh'?<><div className="mt-4 space-y-3 text-xs text-[#aaa]"><div><span className="text-[#D9FF3F]">中文</span><br/>AI trả lời bằng tiếng Trung giản thể.</div><div><span className="text-[#D9FF3F]">Pinyin</span><br/>Luôn hiển thị dưới câu AI để học viên đọc được.</div><div><span className="text-[#D9FF3F]">Tiếng Việt</span><br/>Luôn có bản dịch ngắn, tự nhiên.</div></div></>:<div className="mt-4 space-y-3 text-xs text-[#aaa]"><div><span className="text-[#D9FF3F]">English</span><br/>AI giữ hội thoại bằng English.</div><div><span className="text-[#D9FF3F]">Vietnamese</span><br/>Chỉ dùng để hỗ trợ hiểu nhanh.</div></div>}<div className="mt-6 border-t border-[#222] pt-4 text-[10px] leading-5 text-[#666]">Mục tiêu của AI Lab: không chỉ chấm điểm. AI phải nhớ điều bạn vừa nói, hỏi tiếp hợp lý và thay đổi cách phản hồi theo cuộc hội thoại.</div></aside>
   </div>
  </section>}
 </div></div>;
}
