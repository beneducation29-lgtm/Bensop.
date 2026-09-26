import React,{useMemo,useState}from'react';
import{Mic,Search,ChevronRight,Sparkles,Volume2,Languages,MessageCircle,ArrowLeft,Loader2,Send}from'lucide-react';
import{speakingService}from'../services/speakingService';
import{mediaService}from'../services/mediaService';
import{aiSpeakingService}from'../services/aiSpeakingService';
import{browserSpeechRecognitionService}from'../services/browserSpeechRecognitionService';
import{masteryService}from'../services/masteryService';
import{learnerActivityService}from'../services/learnerActivityService';
import{spacedReviewService}from'../services/spacedReviewService';
import{AI_SPEAKING_TRACKS}from'../data/aiSpeakingTracks';
import{AISpeakingMode,AISpeakingTurnFeedback}from'../types/aiSpeaking';

type P={language:'en'|'zh';onNavigate:(p:string)=>void};

export function SpeakingLabPage({language,onNavigate}:P){
 const[q,setQ]=useState(''),[level,setLevel]=useState('ALL'),[room,setRoom]=useState(false);
 const list=useMemo(()=>speakingService.getActivities(language,{level,search:q}),[language,level,q]);
 const levels=Array.from(new Set(speakingService.getAllActivities(language).map(x=>x.level)));
 const track=AI_SPEAKING_TRACKS.find(x=>x.language===language)!;
 const[mode,setMode]=useState<AISpeakingMode>('role-play');
 const[session,setSession]=useState(()=>aiSpeakingService.getSession(language));
 const[response,setResponse]=useState(''),[loading,setLoading]=useState(false),[listening,setListening]=useState(false),[error,setError]=useState(''),[nextPrompt,setNextPrompt]=useState('');
 const modeInfo=track.modes.find(x=>x.id===mode)!;
 const feedbackTurns=(session?.turns||[]).filter(t=>t.role==='ai'&&t.feedback);
 const sessionScores=feedbackTurns.map(t=>t.feedback!).map(f=>[f.fluency,f.grammar,f.vocabulary,f.relevance].filter((v):v is number=>typeof v==='number')).filter(a=>a.length).map(a=>Math.round(a.reduce((x,y)=>x+y,0)/a.length));
 const sessionScore=sessionScores.length?Math.round(sessionScores.reduce((a,b)=>a+b,0)/sessionScores.length):0;
 const weakMetrics=['fluency','grammar','vocabulary','relevance'].map(key=>({key,label:key==='fluency'?'Fluency':key==='grammar'?'Grammar':key==='vocabulary'?'Vocabulary':'Relevance',score:feedbackTurns.length?Math.round(feedbackTurns.reduce((sum,t)=>sum+(typeof t.feedback?.[key as keyof AISpeakingTurnFeedback]==='number'?(t.feedback?.[key as keyof AISpeakingTurnFeedback] as number):0),0)/feedbackTurns.length):0})).filter(x=>x.score>0).sort((a,b)=>a.score-b.score);

 const openRoom=()=>{
   const next=aiSpeakingService.createSession({language,level:levels[0]||'B1',mode,topic:language==='zh'?'日常生活':'Everyday Life'});
   setSession(next);setNextPrompt('');setError('');setRoom(true);
 };
 const speakPrompt=(text:string)=>{void mediaService.speak(text,language);};
 const addSample=()=>{
   if(!session)return;
   const text=language==='zh'?'你好！今天过得怎么样？':'Hello! How are you doing today?';
   const next=aiSpeakingService.addTurn(session.id,{role:'ai',text,display:language==='zh'?{text,pinyin:'Nǐ hǎo! Jīntiān guò de zěnmeyàng?',vietnameseTranslation:'Xin chào! Hôm nay bạn thế nào?'}:{text,vietnameseTranslation:'Xin chào! Hôm nay bạn thế nào?'}});
   setSession(next);
 };
 const listenForResponse=async()=>{
   if(listening){browserSpeechRecognitionService.stop();setListening(false);return;}
   setError('');setListening(true);
   try{
     const result=await browserSpeechRecognitionService.listen(language);
     setResponse(result.transcription);
   }catch(e){setError(e instanceof Error?e.message:'Không thể nhận diện giọng nói.');}
   finally{setListening(false);}
 };
 const sendResponse=async()=>{
   if(!session||!response.trim()||loading)return;
   const transcript=response.trim();
   const withLearner=aiSpeakingService.addTurn(session.id,{role:'learner',text:transcript});
   if(!withLearner)return;
   setSession(withLearner);setResponse('');setError('');setLoading(true);
   try{
     const reply=await aiSpeakingService.reply({language,level:session.level,mode:session.mode,topic:session.topic,scenario:session.scenario},transcript,withLearner.turns);
     const aiTurn=aiSpeakingService.addTurn(session.id,{role:'ai',text:reply.text,display:{text:reply.text,pinyin:reply.pinyin,vietnameseTranslation:reply.vietnameseTranslation},feedback:reply.feedback});
     setNextPrompt(reply.nextPrompt||'');
     if(reply.feedback){
       const f=reply.feedback;
       const scores=[f.fluency,f.grammar,f.vocabulary,f.relevance].filter((v):v is number=>typeof v==='number');
       const score=scores.length?Math.round(scores.reduce((a,b)=>a+b,0)/scores.length):60;
       masteryService.recordSpeakingEvaluation({language,sessionId:session.id,score,fluency:f.fluency,grammar:f.grammar,vocabulary:f.vocabulary,relevance:f.relevance});
       learnerActivityService.record({skill:'speaking',language,activityId:`ai-speaking:${session.id}`,score,evidenceType:'assessment',timestamp:new Date().toISOString(),metadata:{mode:session.mode}});
       spacedReviewService.scheduleSkillReview('speaking',session.id,language==='zh'?'中文 AI 口语':'English AI Speaking',language==='zh'?'/tieng-trung/speaking':'/tieng-anh/speaking',score>=80?7:score>=60?3:1,new Date().toISOString(),language);
     }
     setSession(aiTurn||withLearner);
   }catch(e){
     setError(e instanceof Error?e.message:'Không thể kết nối AI Speaking lúc này.');
   }finally{setLoading(false);}
 };
 const feedback=(f?:AISpeakingTurnFeedback)=>{
   if(!f)return null;
   return <div className="mt-4 border-t border-[#242424] pt-4"><div className="mb-3 text-[10px] font-mono text-[#D9FF3F]">AI FEEDBACK</div><div className="grid grid-cols-2 gap-2 sm:grid-cols-5">{[['Phát âm',f.pronunciation],['Fluency',f.fluency],['Grammar',f.grammar],['Vocabulary',f.vocabulary],['Relevance',f.relevance]].map(([label,value])=><div key={String(label)} className="bg-[#0b0b0b] p-2"><div className="text-[9px] text-[#666]">{label}</div><div className="mt-1 font-bold">{typeof value==='number'?value+'%':'—'}</div></div>)}</div>{f.note&&<p className="mt-3 text-xs leading-5 text-[#aaa]">{f.note}</p>}{f.corrections?.length?<div className="mt-3 space-y-2">{f.corrections.map((c,i)=><div key={i} className="text-xs"><span className="text-[#777]">{c.original}</span><span className="mx-2 text-[#D9FF3F]">→</span><span>{c.improved}</span><div className="mt-1 text-[#666]">{c.explanation}</div></div>)}</div>:null}</div>;
 };

 return <div className="min-h-[70vh] bg-[#050505] py-12"><div className="mx-auto max-w-7xl px-5 sm:px-8">
  <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"><div><div className="mb-3 flex gap-2 text-xs font-mono text-[#D9FF3F]"><Mic className="h-4 w-4"/>SPEAKING LAB</div><h1 className="text-4xl font-black sm:text-6xl">NÓI TỰ TIN <span className="text-[#D9FF3F]">MỖI NGÀY.</span></h1></div><div className="relative lg:w-80"><Search className="absolute left-3 top-3.5 h-4 w-4 text-[#666]"/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Tìm bài nói..." className="w-full border border-[#292929] bg-[#111] px-10 py-3 text-sm outline-none"/></div></div>

  <button onClick={()=>room?setRoom(false):openRoom()} className="mb-10 w-full border border-[#D9FF3F]/40 bg-[#0d1107] p-6 text-left hover:border-[#D9FF3F]"><div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between"><div><div className="mb-2 flex items-center gap-2 text-xs font-mono text-[#D9FF3F]"><Sparkles className="h-4 w-4"/>AI SPEAKING ROOM</div><h2 className="text-2xl font-black">{track.title}</h2><p className="mt-2 max-w-2xl text-sm text-[#999]">{track.description}</p>{language==='zh'&&<p className="mt-3 text-xs text-[#D9FF3F]">中文简体 → Pinyin có dấu thanh → Tiếng Việt · không trộn English vào hội thoại.</p>}</div><div className="shrink-0 bg-[#D9FF3F] px-5 py-3 text-xs font-black text-black">{room?'ĐÓNG PHÒNG':'MỞ PHÒNG AI'}</div></div></button>

  {room&&<section className="mb-12 border border-[#292929] bg-[#0b0b0b] p-5 sm:p-7"><div className="mb-6 flex items-center justify-between gap-4"><div><div className="text-xs font-mono text-[#D9FF3F]">ROOM / {language==='zh'?'中文':'ENGLISH'}</div><h2 className="mt-2 text-2xl font-black">{modeInfo.title}</h2></div><button onClick={()=>setRoom(false)} className="text-xs text-[#777]"><ArrowLeft className="inline h-4 w-4"/> SPEAKING LAB</button></div>
   <div className="mb-6 flex flex-wrap gap-2">{track.modes.map(m=><button key={m.id} onClick={()=>{setMode(m.id);if(session)setSession(aiSpeakingService.createSession({language,level:session.level,mode:m.id,topic:session.topic}))}} className={`border px-3 py-2 text-xs ${mode===m.id?'border-[#D9FF3F] text-[#D9FF3F]':'border-[#292929] text-[#888]'}`}>{m.title}</button>)}</div>
   {feedbackTurns.length>=2&&<div className="mb-5 border border-[#D9FF3F]/20 bg-[#0d1107] p-5"><div className="text-[10px] font-mono text-[#D9FF3F]">SESSION CHECKPOINT</div><div className="mt-3 flex flex-wrap items-end gap-6"><div><div className="text-[10px] text-[#666]">ĐIỂM PHIÊN</div><div className="text-3xl font-black">{sessionScore}/100</div></div>{weakMetrics.slice(0,3).map(m=><div key={m.key}><div className="text-[10px] text-[#666]">{m.label}</div><div className="text-xl font-bold">{m.score}%</div></div>)}</div><p className="mt-3 text-xs text-[#888]">Điểm yếu hiện tại được lấy từ các lượt AI đã đánh giá trong phiên. Hãy luyện lại kỹ năng thấp nhất thay vì chỉ lặp lại toàn bộ bài.</p><button onClick={()=>onNavigate('/adaptive-session?lang='+language)} className="mt-4 border border-[#D9FF3F] px-4 py-2 text-xs font-black text-[#D9FF3F]">LUYỆN LẠI ĐIỂM YẾU</button></div>}
   <div className="grid gap-5 lg:grid-cols-[1fr_280px]">
    <div className="border border-[#242424] bg-[#111] p-6">
     <div className="mb-4 text-xs text-[#666]">AI COACH · {modeInfo.goal}</div>
     {nextPrompt&&<div className="mb-5 border border-[#292929] bg-[#090909] p-4"><div className="text-[9px] font-mono text-[#D9FF3F]">CÂU TIẾP THEO</div><div className="mt-2 text-base font-semibold">{nextPrompt}</div></div>}
     {session?.turns.length?<div className="mb-6 max-h-[520px] space-y-4 overflow-y-auto">{session.turns.map(turn=><div key={turn.id} className={turn.role==='ai'?'border-l-2 border-[#D9FF3F] pl-4':'border-l-2 border-[#333] pl-4'}><div className="mb-1 text-[9px] font-mono text-[#666]">{turn.role==='ai'?'AI':'YOU'}</div><div className="text-lg font-semibold">{turn.display?.text||turn.text}</div>{language==='zh'&&turn.role==='ai'&&turn.display?.pinyin&&<div className="mt-1 text-sm text-[#D9FF3F]">{turn.display.pinyin}</div>}{turn.role==='ai'&&turn.display?.vietnameseTranslation&&<div className="mt-1 text-sm text-[#999]">{turn.display.vietnameseTranslation}</div>}{feedback(turn.feedback)}</div>)}</div>:<div className="border-l-2 border-[#D9FF3F] pl-5"><div className="text-2xl font-bold">{language==='zh'?'你好！今天过得怎么样？':'Hello! How are you doing today?'}</div>{language==='zh'&&<div className="mt-2 text-base text-[#D9FF3F]">Nǐ hǎo! Jīntiān guò de zěnmeyàng?</div>}<div className="mt-2 text-sm text-[#999]">Xin chào! Hôm nay bạn thế nào?</div></div>}
     <div className="flex flex-wrap gap-3"><button onClick={()=>speakPrompt(language==='zh'?'你好！今天过得怎么样？':'Hello! How are you doing today?')} className="flex items-center gap-2 border border-[#333] px-4 py-3 text-xs font-bold"><Volume2 className="h-4 w-4"/>NGHE MẪU</button><button onClick={addSample} className="flex items-center gap-2 border border-[#333] px-4 py-3 text-xs font-bold"><MessageCircle className="h-4 w-4"/>LƯU CÂU MẪU</button></div>
     <div className="mt-7"><textarea value={response} onChange={e=>setResponse(e.target.value)} onKeyDown={e=>{if((e.ctrlKey||e.metaKey)&&e.key==='Enter')void sendResponse()}} placeholder={language==='zh'?'请输入你的回答…':'Type your response…'} className="min-h-28 w-full resize-none border border-[#292929] bg-[#090909] p-4 text-sm outline-none focus:border-[#D9FF3F]"/><div className="mt-3 flex flex-wrap items-center gap-3"><button onClick={()=>void listenForResponse()} disabled={loading} className="flex items-center gap-2 border border-[#333] px-4 py-3 text-xs font-bold disabled:opacity-30"><Mic className="h-4 w-4"/>{listening?'ĐANG NGHE…':'NÓI BẰNG MICRO'}</button><button onClick={()=>void sendResponse()} disabled={!response.trim()||loading} className="flex items-center gap-2 bg-[#D9FF3F] px-5 py-3 text-xs font-black text-black disabled:opacity-30">{loading?<Loader2 className="h-4 w-4 animate-spin"/>:<Send className="h-4 w-4"/>}{loading?'AI ĐANG PHẢN HỒI…':'GỬI CÂU TRẢ LỜI'}</button><span className="text-[10px] text-[#555]">Ctrl/⌘ + Enter để gửi</span></div>{error&&<div className="mt-3 border border-red-900/60 bg-red-950/20 p-3 text-xs text-red-300">{error}</div>}</div>
    </div>
    <aside className="border border-[#242424] bg-[#0f0f0f] p-5"><div className="flex items-center gap-2 text-xs font-mono text-[#D9FF3F]"><Languages className="h-4 w-4"/>LANGUAGE CONTRACT</div>{language==='zh'?<><p className="mt-4 text-sm font-bold">Chinese AI Room</p><ul className="mt-3 space-y-3 text-xs text-[#999]"><li>✓ 中文简体</li><li>✓ Pinyin có dấu thanh</li><li>✓ Dịch tiếng Việt</li><li>✓ Không trộn English vào hội thoại</li></ul></>:<><p className="mt-4 text-sm font-bold">English AI Room</p><ul className="mt-3 space-y-3 text-xs text-[#999]"><li>✓ English conversation</li><li>✓ Vietnamese support</li><li>✓ Không sinh Pinyin/Chinese</li></ul></>}<div className="mt-6 border-t border-[#222] pt-4 text-[11px] leading-5 text-[#666]">AI thật đã nối qua server endpoint. API key chỉ ở server; AI không được phép tự chọn route ngoài contract.</div></aside>
   </div>
  </section>}

  <div className="mb-8 flex flex-wrap gap-2"><button onClick={()=>setLevel('ALL')} className="rounded-full border border-[#D9FF3F] px-4 py-2 text-xs">TẤT CẢ</button>{levels.map(l=><button key={l} onClick={()=>setLevel(l)} className="rounded-full border border-[#292929] px-4 py-2 text-xs text-[#999]">{l}</button>)}</div>
  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{list.map(a=><button key={a.id} onClick={()=>onNavigate('/'+(language==='en'?'tieng-anh':'tieng-trung')+'/speaking/'+a.slug)} className="group border border-[#202020] bg-[#0d0d0d] p-5 text-left hover:border-[#D9FF3F]"><span className="text-[10px] text-[#D9FF3F]">{a.level} · {a.type}</span><h2 className="mt-5 text-xl font-bold group-hover:text-[#D9FF3F]">{a.title}</h2><p className="mt-2 line-clamp-2 text-sm text-[#777]">{a.prompt}</p><div className="mt-6 flex justify-end text-xs font-bold">LUYỆN NÓI <ChevronRight className="h-4 w-4"/></div></button>)}</div>
 </div></div>;
}