type Req={method?:string;body?:unknown};
type Res={status:(code:number)=>Res;json:(body:unknown)=>void;setHeader:(name:string,value:string)=>void};

const MODES = new Set(['shadowing','role-play','free-conversation','interview','pronunciation-coach']);
const LANGUAGES = new Set(['en','zh']);

const cleanText=(value:unknown,max:number)=>{
  return typeof value==='string' ? value.trim().slice(0,max) : '';
};

const cleanFeedback=(value:unknown)=>{
  if(!value || typeof value!=='object') return undefined;
  const raw=value as Record<string,unknown>;
  const feedback:any={note:cleanText(raw.note,500)};
  for(const key of ['pronunciation','fluency','grammar','vocabulary','relevance']){
    const n=Number(raw[key]);
    if(Number.isFinite(n)) feedback[key]=Math.max(0,Math.min(100,Math.round(n)));
  }
  if(Array.isArray(raw.corrections)){
    feedback.corrections=raw.corrections.slice(0,4).map((item:any)=>({
      original:cleanText(item?.original,180),
      improved:cleanText(item?.improved,180),
      explanation:cleanText(item?.explanation,240),
    })).filter((item:any)=>item.original&&item.improved);
  }
  return feedback.note ? feedback : undefined;
};

export default async function handler(req:Req,res:Res){
  res.setHeader('Cache-Control','no-store');
  if(req.method!=='POST'){res.status(405).json({error:'Method not allowed'});return;}
  const body=(req.body||{}) as any;
  const language=LANGUAGES.has(body.language)?body.language:'';
  const mode=MODES.has(body.mode)?body.mode:'';
  const level=cleanText(body.level,40);
  const topic=cleanText(body.topic,120);
  const transcript=cleanText(body.transcript,2000);
  if(!language||!mode||!level||!transcript){
    res.status(400).json({error:'Missing speaking context'});
    return;
  }
  const apiKey=process.env.GEMINI_API_KEY||process.env.GOOGLE_API_KEY;
  if(!apiKey){res.status(503).json({error:'AI speaking service is not configured'});return;}
  const history=Array.isArray(body.history)
    ? body.history.filter((t:any)=>t&&((t.role==='learner')||(t.role==='ai'))&&typeof t.text==='string')
      .slice(-10).map((t:any)=>({role:t.role,text:String(t.text).slice(0,1200)}))
    : [];
  const targetLanguage=language==='zh'?'Simplified Chinese (Mandarin)':'English';
  const chineseContract=language==='zh'
    ? 'Every AI response MUST contain Simplified Chinese in text, Pinyin with tone marks in pinyin, and a natural Vietnamese translation in vietnameseTranslation. Never put English or another learning language in the Chinese dialogue.'
    : 'Return English only in text. Do not return pinyin. Do not return Chinese characters. Vietnamese translation is optional support only and must not replace the English reply.';
  const system=`You are Bensop AI Speaking Room. Coach a learner at level ${level} in ${targetLanguage}. Mode: ${mode}. Topic: ${topic||'general conversation'}.
${chineseContract}
Keep the dialogue natural and concise. Evaluate the learner's transcript conservatively; do not claim to hear pronunciation from text alone. Pronunciation can be marked as null when audio evidence is unavailable. Return ONLY valid JSON with keys:
text (string), pinyin (string|null), vietnameseTranslation (string|null), nextPrompt (string|null), feedback (object|null), suggestedModes (string[]).
feedback may contain pronunciation, fluency, grammar, vocabulary, relevance (0-100 numbers or null), note (string), corrections (array of original/improved/explanation).
Do not invent learner history. Do not output markdown.`;
  const historyText=history.map((t:any)=>`${t.role.toUpperCase()}: ${t.text}`).join('\n');
  const prompt=system+'\n\nConversation:\n'+historyText+'\n\nLEARNER CURRENT TURN:\n'+transcript;
  try{
    const upstream=await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key='+encodeURIComponent(apiKey),{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        contents:[{role:'user',parts:[{text:prompt}]}],
        generationConfig:{temperature:0.35,responseMimeType:'application/json'},
      }),
    });
    if(!upstream.ok){res.status(502).json({error:'Gemini speaking request failed'});return;}
    const data=await upstream.json() as any;
    const raw=data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if(typeof raw!=='string'){res.status(502).json({error:'Gemini returned no speaking content'});return;}
    let parsed:any;
    try{parsed=JSON.parse(raw);}catch{res.status(502).json({error:'Gemini returned invalid speaking JSON'});return;}
    const text=cleanText(parsed.text,900);
    if(!text){res.status(502).json({error:'Gemini returned empty speaking text'});return;}
    const reply:any={
      text,
      nextPrompt:cleanText(parsed.nextPrompt,500)||undefined,
      feedback:cleanFeedback(parsed.feedback),
      suggestedModes:Array.isArray(parsed.suggestedModes)?parsed.suggestedModes.filter((m:any)=>MODES.has(m)).slice(0,3):[],
    };
    if(language==='zh'){
      reply.pinyin=cleanText(parsed.pinyin,900)||undefined;
      reply.vietnameseTranslation=cleanText(parsed.vietnameseTranslation,900)||undefined;
      if(!reply.pinyin||!reply.vietnameseTranslation){
        res.status(502).json({error:'Chinese speaking response must include Pinyin and Vietnamese translation'});return;
      }
    }else{
      reply.pinyin=undefined;
      reply.vietnameseTranslation=cleanText(parsed.vietnameseTranslation,900)||undefined;
    }
    res.status(200).json(reply);
  }catch{
    res.status(502).json({error:'Gemini speaking request unavailable'});
  }
}