type Req={method?:string;body?:unknown};
type Res={status:(code:number)=>Res;json:(body:unknown)=>void;setHeader:(name:string,value:string)=>void};

const ACTION_PATHS = new Set([
  '/adaptive-session?lang=en',
  '/adaptive-session?lang=zh',
  '/tieng-anh/vocabulary/practice',
  '/tieng-trung/vocabulary/practice',
  '/tieng-anh/grammar/review',
  '/tieng-trung/grammar/review',
  '/tieng-anh/listening',
  '/tieng-trung/listening',
  '/tieng-anh/speaking',
  '/tieng-trung/speaking',
  '/tieng-anh/reading',
  '/tieng-trung/reading',
  '/tieng-anh/writing',
  '/tieng-trung/writing',
]);

const fallbackActionPath=(language:string)=>language==='zh'?'/adaptive-session?lang=zh':'/adaptive-session?lang=en';

const sanitizeAction=(action:unknown,language:string)=>{
  if(!action || typeof action!=='object') return undefined;
  const candidate=action as {label?:unknown;path?:unknown};
  const path=typeof candidate.path==='string' && ACTION_PATHS.has(candidate.path)
    ? candidate.path
    : fallbackActionPath(language);
  const label=typeof candidate.label==='string' && candidate.label.trim()
    ? candidate.label.trim().slice(0,80)
    : 'OPEN NEXT STEP';
  return {label,path};
};

export default async function handler(req:Req,res:Res){
  res.setHeader('Cache-Control','no-store');
  if(req.method!=='POST'){res.status(405).json({error:'Method not allowed'});return;}
  const body=(req.body||{}) as {message?:string;context?:any;history?:Array<{role:'user'|'assistant';content:string}>};
  const message=typeof body.message==='string'?body.message.trim().slice(0,2000):'';
  if(!message){res.status(400).json({error:'Missing message'});return;}
  const apiKey=process.env.GEMINI_API_KEY||process.env.GOOGLE_API_KEY;
  if(!apiKey){res.status(503).json({error:'AI service is not configured'});return;}
  const context=body.context||{};
  const history=Array.isArray(body.history)
    ? body.history.filter(m=>m && (m.role==='user'||m.role==='assistant') && typeof m.content==='string').slice(-8).map(m=>({role:m.role,content:m.content.slice(0,2000)}))
    : [];
  const language=context.language==='zh'?'Chinese':'English';
  const weak=context.learner?.weakestSkill||'not enough evidence';
  const system=`You are Bensop AI Coach, a concise language-learning tutor. Respond in ${language}. Learner level: ${context.level||'B1'}. Overall mastery: ${context.learner?.overall??0}%. Weakest skill: ${weak}. Weakest score: ${context.learner?.weakestScore??'unknown'}%. Trend: ${context.learner?.weakestTrend||'unknown'}. Reviews due: ${context.learner?.dueReviews??0}. Recent evidence count: ${context.learner?.recentEvidenceCount??0}. Give practical, accurate guidance. Do not invent learner history. Keep answers short and actionable. When useful, include one small exercise. Return ONLY valid JSON with keys: content (string), suggestions (string[]), action (object|null). action must have label and path; allowed paths are the supplied Bensop learning routes. Use null if no action is appropriate.`;
  const contents=[...history.map(m=>({role:m.role==='assistant'?'model':'user',parts:[{text:m.content}]})),{role:'user',parts:[{text:system+'\n\nCurrent learner request: '+message}]}];
  try{
    const upstream=await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key='+encodeURIComponent(apiKey),{
      method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({contents,generationConfig:{temperature:0.4,responseMimeType:'application/json'}}),
    });
    if(!upstream.ok){res.status(502).json({error:'Gemini request failed'});return;}
    const data=await upstream.json() as any;
    const raw=data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if(typeof raw!=='string'){res.status(502).json({error:'Gemini returned no content'});return;}
    try{
      const parsed=JSON.parse(raw);
      const content=String(parsed.content||'').trim();
      if(!content){res.status(502).json({error:'Gemini returned empty content'});return;}
      res.status(200).json({
        content,
        suggestions:Array.isArray(parsed.suggestions)?parsed.suggestions.map(String).map(s=>s.slice(0,160)).slice(0,4):[],
        action:sanitizeAction(parsed.action,context.language),
        source:'ai',
      });
    }catch{
      res.status(200).json({content:raw.trim(),suggestions:[],source:'ai'});
    }
  }catch{
    res.status(502).json({error:'Gemini request unavailable'});
  }
}