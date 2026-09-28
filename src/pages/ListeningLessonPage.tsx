import React,{useEffect,useMemo,useState}from'react';
import{ArrowLeft,CheckCircle2,Eye,Headphones,Pause,Play,RotateCcw}from'lucide-react';
import{listeningService}from'../services/listeningService';
import{mediaService}from'../services/mediaService';
import{LISTENING_QUESTIONS}from'../data/listening/questions';

type P={language:'en'|'zh';slug:string;onNavigate:(p:string)=>void};

export function ListeningLessonPage({language,slug,onNavigate}:P){
 const lesson=listeningService.getLessonBySlug(slug,language);
 const[playing,setPlaying]=useState(false),[show,setShow]=useState(false),[answers,setAnswers]=useState<Record<string,string>>({}),[done,setDone]=useState(false),[score,setScore]=useState<number|null>(null),[startedAt]=useState(()=>Date.now());
 const questions=useMemo(()=>lesson?LISTENING_QUESTIONS.filter(q=>lesson.questionIds.includes(q.id)):[],[lesson]);
 useEffect(()=>()=>mediaService.stop(),[]);
 if(!lesson)return <div className="p-20 text-white">Không tìm thấy bài nghe.</div>;
 const backPath='/'+(language==='en'?'tieng-anh':'tieng-trung')+'/listening';
 const play=()=>{if(playing){mediaService.stop();setPlaying(false);return}setPlaying(true);if(lesson.audioUrl)mediaService.playAudio(lesson.audioUrl,{onEnd:()=>setPlaying(false)});else mediaService.speak(lesson.transcript,language,{onEnd:()=>setPlaying(false)})};
 const submit=()=>{const correct=questions.filter(q=>answers[q.id]===q.correctAnswer).length;const s=questions.length?Math.round(correct/questions.length*100):100;const completedAt=new Date().toISOString();listeningService.saveProgress({userId:'local-user',listeningLessonId:lesson.id,language,completed:true,attempts:1,accuracy:s,bestScore:s,timeSpent:Math.max(0,Math.round((Date.now()-startedAt)/1000)),lastAttemptAt:completedAt,completedAt});setScore(s);setDone(true)};
 const reset=()=>{setAnswers({});setScore(null);setDone(false)};
 return <div className="min-h-[75vh] bg-[#050505] py-10"><div className="mx-auto max-w-4xl px-5 sm:px-8">
  <button onClick={()=>onNavigate(backPath)} className="mb-8 flex items-center gap-2 text-xs text-[#888]"><ArrowLeft className="h-4 w-4"/>LISTENING LAB</button>
  <div className="mb-8"><div className="mb-3 flex gap-2 text-xs font-mono text-[#D9FF3F]"><Headphones className="h-4 w-4"/>{lesson.level} · {lesson.topic}</div><h1 className="text-4xl font-black">{lesson.title}</h1></div>
  <div className="border border-[#292929] bg-[#101010] p-6">
   <div className="flex flex-wrap gap-3"><button onClick={play} className="flex items-center gap-2 bg-[#D9FF3F] px-5 py-3 text-xs font-black text-black">{playing?<Pause/>:<Play/>}{playing?'TẠM DỪNG':'PHÁT AUDIO'}</button><button onClick={()=>setShow(!show)} className="flex items-center gap-2 border border-[#333] px-5 py-3 text-xs font-bold"><Eye className="h-4 w-4"/>{show?'ẨN TRANSCRIPT':'XEM TRANSCRIPT'}</button></div>
   {show&&<div className="mt-6 space-y-4 border-l-2 border-[#D9FF3F] bg-[#151515] p-5">{lesson.transcriptSegments.length?lesson.transcriptSegments.map(s=><div key={s.id}><div className="text-sm leading-7 text-[#ddd]">{s.text}</div>{language==='zh'&&s.pinyin&&<div className="mt-1 text-xs text-[#D9FF3F]">{s.pinyin}</div>}{s.translation&&<div className="mt-1 text-xs leading-5 text-[#777]">{s.translation}</div>}</div>):<div className="text-sm leading-7 text-[#bbb]">{lesson.transcript}</div>}</div>}
  </div>
  {questions.length>0&&<div className="mt-8 space-y-4"><div className="flex items-center justify-between"><div className="text-xs font-mono text-[#D9FF3F]">COMPREHENSION CHECK</div><span className="text-[10px] text-[#666]">{Object.keys(answers).length}/{questions.length} câu đã chọn</span></div>
   {questions.map((q,i)=><div key={q.id} className="border border-[#222] bg-[#0d0d0d] p-5"><div className="mb-4 text-sm font-bold">{i+1}. {q.question}</div><div className="grid gap-2">{q.options.map(o=><button key={o} onClick={()=>!done&&setAnswers({...answers,[q.id]:o})} className={(answers[q.id]===o?'border-[#D9FF3F] bg-[#171c0d] text-white':'border-[#292929] text-[#aaa]')+' border p-3 text-left text-sm'}>{o}</button>)}</div>{done&&answers[q.id]!==q.correctAnswer&&<div className="mt-3 text-xs leading-5 text-amber-300">Đáp án đúng: {q.correctAnswer}. {q.explanation}</div>}{done&&answers[q.id]===q.correctAnswer&&<div className="mt-3 text-xs text-[#D9FF3F]">✓ Chính xác. {q.explanation}</div>}</div>)}
   <div className="flex flex-wrap gap-3"><button onClick={submit} disabled={done||Object.keys(answers).length<questions.length} className="flex items-center gap-2 bg-[#D9FF3F] px-6 py-4 text-xs font-black text-black disabled:opacity-50">{done?<><CheckCircle2/>ĐÃ LƯU KẾT QUẢ</>:'NỘP BÀI & CẬP NHẬT MASTERY'}</button>{done&&<button onClick={reset} className="flex items-center gap-2 border border-[#292929] px-5 py-4 text-xs font-bold text-[#aaa]"><RotateCcw className="h-4 w-4"/>LÀM LẠI</button>}</div>
  </div>}
  {done&&score!==null&&<div className="mt-8 border border-[#D9FF3F]/30 bg-[#0d1107] p-6"><div className="text-[10px] font-mono text-[#D9FF3F]">LISTENING MASTERY</div><div className="mt-1 text-4xl font-black">{score}/100</div><p className="mt-3 text-xs text-[#888]">Bensop đã cập nhật mastery và tạo lịch ôn: {score>=80?'7 ngày':score>=60?'3 ngày':'1 ngày'}.</p><div className="mt-5 flex flex-wrap gap-3"><button onClick={()=>onNavigate('/dashboard')} className="bg-[#D9FF3F] px-5 py-3 text-xs font-black text-black">XEM TIẾN ĐỘ</button><button onClick={reset} className="border border-[#292929] px-5 py-3 text-xs font-bold text-[#aaa]">LUYỆN LẠI</button></div></div>}
 </div></div>
}