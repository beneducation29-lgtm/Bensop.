import React,{useMemo,useState}from'react';
import{BookOpen,ChevronRight,Film,Filter,Search,Sparkles}from'lucide-react';
import{contentService}from'../services/contentService';

type Category='ALL'|'tieng-trung'|'tieng-anh'|'phat-trien-ban-than'|'suc-khoe-doi-song';

const labels:Record<Category,string>={
  ALL:'Tất cả',
  'tieng-trung':'Tiếng Trung',
  'tieng-anh':'Tiếng Anh',
  'phat-trien-ban-than':'Phát triển bản thân',
  'suc-khoe-doi-song':'Sức khỏe & đời sống'
};

export function ContentLibraryPage({onNavigate}:{onNavigate:(path:string)=>void}){
  const[q,setQ]=useState('');
  const[category,setCategory]=useState<Category>('ALL');
  const items=useMemo(()=>contentService.getAllBlueprints().filter(item=>{
    const hay=[item.lessonSlug,item.hook,item.coreIdea,...item.learningObjective,...item.crossLabLinks].join(' ').toLowerCase();
    return (category==='ALL'||item.category===category)&&(!q||hay.includes(q.toLowerCase()));
  }),[q,category]);
  return <div className="min-h-screen bg-[#050505] text-white">
    <main className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
      <div className="mb-12 border-b border-[#1E1E1E] pb-10">
        <div className="mb-3 flex items-center gap-2 text-[10px] font-mono font-bold tracking-[0.18em] text-[#D9FF3F]"><Sparkles className="h-4 w-4"/>BENSOP CONTENT ENGINE</div>
        <h1 className="max-w-4xl text-4xl font-black uppercase tracking-tight sm:text-6xl">THƯ VIỆN <span className="text-[#D9FF3F]">HỌC LIỆU.</span></h1>
        <p className="mt-5 max-w-3xl text-sm leading-relaxed text-[#888]">Mỗi lesson được biên soạn theo pipeline: nguồn đáng tin cậy → synthesis → learning objective → practice → spaced review → AI visual lesson.</p>
      </div>

      <div className="mb-8 flex flex-col gap-4 rounded-xl border border-[#252525] bg-[#0B0B0B] p-4 lg:flex-row lg:items-center">
        <div className="relative flex-1"><Search className="absolute left-3 top-3 h-4 w-4 text-[#555]"/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Tìm chủ đề, kỹ năng, lesson..." className="w-full border border-[#252525] bg-[#111] py-2.5 pl-10 pr-4 text-xs text-white outline-none focus:border-[#555]"/></div>
        <div className="flex items-center gap-2 overflow-x-auto"><Filter className="h-4 w-4 shrink-0 text-[#666]"/>{(Object.keys(labels) as Category[]).map(key=><button key={key} onClick={()=>setCategory(key)} className={"whitespace-nowrap rounded-md border px-3 py-2 text-[10px] font-mono transition "+(category===key?'border-[#D9FF3F] bg-[#D9FF3F] text-black':'border-[#292929] text-[#888] hover:text-white')}>{labels[key]}</button>)}</div>
      </div>

      <div className="mb-5 flex items-center justify-between text-[10px] font-mono text-[#555]"><span>{items.length} CONTENT BLUEPRINTS</span><span>{contentService.getVideoQueue().length} VIDEO SCRIPTS ĐANG CHỜ PRODUCTION</span></div>

      <div className="grid gap-5 lg:grid-cols-2">
        {items.map(item=><article key={item.lessonSlug} className="group rounded-2xl border border-[#252525] bg-[#090909] p-5 transition hover:border-[#3A3A3A]">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div><span className="text-[9px] font-mono font-bold uppercase tracking-[0.16em] text-[#D9FF3F]">{labels[item.category]}</span><h2 className="mt-2 text-lg font-black text-white">{item.aiVideo.title}</h2><p className="mt-2 text-xs leading-relaxed text-[#777]">{item.hook}</p></div>
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#292929] bg-[#111]"><Film className="h-4 w-4 text-[#D9FF3F]"/></div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-[#202020] bg-[#0D0D0D] p-3"><div className="mb-2 text-[9px] font-mono text-[#555]">OUTCOMES</div><div className="space-y-1.5">{item.learningObjective.slice(0,3).map(x=><div key={x} className="text-[11px] leading-relaxed text-[#AAA]">• {x}</div>)}</div></div>
            <div className="rounded-lg border border-[#202020] bg-[#0D0D0D] p-3"><div className="mb-2 text-[9px] font-mono text-[#555]">VIDEO FORMAT</div><div className="text-sm font-bold text-white">{item.aiVideo.format}</div><div className="mt-1 text-[10px] font-mono text-[#666]">{item.aiVideo.targetMinutes} phút · {item.aiVideo.scenes.length} scenes</div><div className="mt-3 flex flex-wrap gap-1.5">{item.sources.map(s=><span key={s.title} className="rounded bg-[#151515] px-2 py-1 text-[9px] text-[#666]">{s.publisher}</span>)}</div></div>
          </div>
          <div className="mt-5 flex items-center justify-between border-t border-[#1C1C1C] pt-4">
            <span className="flex items-center gap-2 text-[10px] font-mono text-[#555]"><BookOpen className="h-3.5 w-3.5"/> {item.crossLabLinks.length} ecosystem links</span>
            <button onClick={()=>onNavigate('/bai-hoc/'+item.lessonSlug)} className="flex items-center gap-1 text-[10px] font-bold text-[#D9FF3F]">MỞ LESSON <ChevronRight className="h-3.5 w-3.5"/></button>
          </div>
        </article>)}
      </div>
    </main>
  </div>
}
