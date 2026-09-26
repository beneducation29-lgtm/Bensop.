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
  const hasEvidence=Object.keys(feedback).some(key=>key!=='note' && feedback[key]!==undefined);
  return feedback.note || hasEvidence ? feedback : undefined;
};

export default async function handler(req:Req,res:Res){
  res.setHeader('Cache-Control','no-store');
  if(req.method!=='POST'){res.status(405).json({error:'Method not allowed'});return;}
  const body=(req.body||{}) as any;
  const language=LANGUAGES.has(body.language)?body.language:'';
  const mode=MODES.has(body.mode)?body.mode:'';
  const level=cleanText(body.level,40);
  const topic=cleanText(body.topic,120);
  const scenario=cleanText(body.scenario,220);
  const learnerGoal=cleanText(body.learnerGoal,220);
  const rawMemory=body.conversationMemory&&typeof body.conversationMemory==='object'?body.conversationMemory:{};
  const conversationMemory={
    topicFocus:cleanText(rawMemory.topicFocus,240),
    scenarioState:cleanText(rawMemory.scenarioState,500),
    learnerGoal:cleanText(rawMemory.learnerGoal,240),
    stage:cleanText(rawMemory.stage,80),
    openThread:cleanText(rawMemory.openThread,300),
    lastLearnerIntent:cleanText(rawMemory.lastLearnerIntent,240),
    recentPreferences:Array.isArray(rawMemory.recentPreferences)?rawMemory.recentPreferences.filter((x:any)=>typeof x==='string').slice(-5).map((x:any)=>cleanText(x,180)):[],
    usedPrompts:Array.isArray(rawMemory.usedPrompts)?rawMemory.usedPrompts.filter((x:any)=>typeof x==='string').slice(-8).map((x:any)=>cleanText(x,180)):[],
    usefulCorrections:Array.isArray(rawMemory.usefulCorrections)?rawMemory.usefulCorrections.filter((x:any)=>typeof x==='string').slice(-6).map((x:any)=>cleanText(x,220)):[],
    learnerDetails:Array.isArray(rawMemory.learnerDetails)?rawMemory.learnerDetails.filter((x:any)=>typeof x==='string').slice(-5).map((x:any)=>cleanText(x,180)):[]
  };
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
  const conversationTurn=Math.max(1,history.filter((t:any)=>t.role==='learner').length);
  const targetLanguage=language==='zh'?'Simplified Chinese (Mandarin)':'English';
  const modeGuidance:Record<string,string>={
    'shadowing':'Give a short model line that is natural for the level. Keep the learner focused on repeating/improving that line rather than opening a long conversation.',
    'role-play':'Stay in character and advance the scenario. React specifically to what the learner said and introduce a realistic next turn.',
    'free-conversation':'Be a genuine conversation partner. Pick one interesting detail from the learner answer and explore it with one natural follow-up.',
    'interview':'Act as the interviewer. Ask one focused follow-up based on the learner answer and gradually deepen the topic.',
    'pronunciation-coach':'Focus on one pronunciation or phrasing target. Without audio evidence, discuss likely pronunciation risks but never claim to have heard them.'
  };
  const modeInstruction=modeGuidance[mode]||modeGuidance['free-conversation'];
  const feedbackGuidance:Record<string,string>={
    'shadowing':'Keep feedback extremely light: one pronunciation/phrasing target at a time. Prioritize retrying the model line over explaining.',
    'role-play':'Do not interrupt the role-play with a long correction. Give at most one high-value correction after the conversational reply.',
    'free-conversation':'Prioritize genuine conversation. Only correct an error when it materially affects clarity or when one correction is especially useful.',
    'interview':'Keep the interview moving. Give concise feedback and use it to shape the next deeper question.',
    'pronunciation-coach':'Make the feedback target-specific. Do not claim an audio pronunciation judgment unless actual audio evidence is provided.'
  };
  const feedbackInstruction=feedbackGuidance[mode]||feedbackGuidance['free-conversation'];
  const chineseContract=language==='zh'
    ? 'Every AI response MUST contain Simplified Chinese in text, Pinyin with tone marks in pinyin, and a natural Vietnamese translation in vietnameseTranslation. Never put English or another learning language in the Chinese dialogue.'
    : 'Return English only in text. Do not return pinyin. Do not return Chinese characters. Vietnamese translation is optional support only and must not replace the English reply.';
  const system=`You are Bensop AI Speaking Room. Coach a learner at level ${level} in ${targetLanguage}. Mode: ${mode}. Topic: ${topic||'general conversation'}. Scenario: ${scenario||'not specified'}. Learner goal: ${learnerGoal||'build confident, natural communication'}.
${chineseContract}
MODE BEHAVIOR: ${modeInstruction}
FEEDBACK RHYTHM: ${feedbackInstruction}
Keep the dialogue natural, warm and concise. Conversation depth: turn ${conversationTurn}. On early turns, establish context; on middle turns, deepen one thread; on later turns, connect ideas, introduce a small challenge or naturally wrap up instead of restarting the topic. React to meaning before correcting form. Use the learner's latest answer to choose the next move. Do not repeat recent questions, sentence starters, example answers, or corrections unless needed. Do not force every remembered detail into the reply; use memory only when it helps the current turn. nextPrompt must be a specific, natural follow-up in the target learning language. Maintain a compact conversationMemory object for this session: topicFocus, scenarioState, learnerGoal, stage, recentPreferences (max 5), usedPrompts (max 8), usefulCorrections (max 6), lastLearnerIntent, openThread, learnerDetails (max 5). openThread is the single unresolved detail worth exploring next; learnerDetails must contain only concrete, non-sensitive facts explicitly stated by the learner in this session. For stage, use a short progression appropriate to the mode: role-play opening/complication/resolution; interview background/example/challenge/reflection; free-conversation discover/deepen/connect/close; shadowing model/repeat/correction/retry; pronunciation-coach target/example/retry/reinforcement. Do not jump stages without evidence. For openThread, prefer one detail from the learner's latest answer that can naturally continue the conversation; replace it when the learner clearly moves to a new topic. For learnerDetails, retain only facts explicitly stated by the learner. Never infer age, location, family, identity, health, finances, beliefs, or other sensitive traits. Update it only with information grounded in the conversation; do not invent personal facts or sensitive information. Evaluate the learner's transcript conservatively; do not claim to hear pronunciation from text alone. Pronunciation can be marked as null when audio evidence is unavailable. Return ONLY valid JSON with keys:
text (string), pinyin (string|null), vietnameseTranslation (string|null), nextPrompt (string|null), conversationMemory (object|null), feedback (object|null), suggestedModes (string[]).
feedback may contain pronunciation, fluency, grammar, vocabulary, relevance (0-100 numbers or null), note (string), corrections (array of original/improved/explanation).
Do not invent learner history. Do not output markdown.`;
  const historyText=history.map((t:any)=>`${t.role.toUpperCase()}: ${t.text}`).join('\n');
  const memoryText=JSON.stringify(conversationMemory).slice(0,4000);
  const prompt=system+'\n\nSESSION MEMORY:\n'+memoryText+'\n\nConversation:\n'+historyText+'\n\nLEARNER CURRENT TURN:\n'+transcript;
  try{
    const upstream=await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key='+encodeURIComponent(apiKey),{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        contents:[{role:'user',parts:[{text:prompt}]}],
        generationConfig:{temperature:0.55,responseMimeType:'application/json'},
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
      conversationMemory:parsed.conversationMemory&&typeof parsed.conversationMemory==='object'?{
        topicFocus:cleanText(parsed.conversationMemory.topicFocus,240)||undefined,
        scenarioState:cleanText(parsed.conversationMemory.scenarioState,500)||undefined,
        learnerGoal:cleanText(parsed.conversationMemory.learnerGoal,240)||undefined,
        stage:cleanText(parsed.conversationMemory.stage,80)||undefined,
        openThread:cleanText(parsed.conversationMemory.openThread,300)||undefined,
        learnerDetails:Array.isArray(parsed.conversationMemory.learnerDetails)?parsed.conversationMemory.learnerDetails.slice(-5).map((x:any)=>cleanText(x,180)).filter(Boolean):[],
        recentPreferences:Array.isArray(parsed.conversationMemory.recentPreferences)?parsed.conversationMemory.recentPreferences.slice(-5).map((x:any)=>cleanText(x,180)).filter(Boolean):[],
        usedPrompts:Array.isArray(parsed.conversationMemory.usedPrompts)?parsed.conversationMemory.usedPrompts.slice(-8).map((x:any)=>cleanText(x,180)).filter(Boolean):[],
        usefulCorrections:Array.isArray(parsed.conversationMemory.usefulCorrections)?parsed.conversationMemory.usefulCorrections.slice(-6).map((x:any)=>cleanText(x,220)).filter(Boolean):[],
        lastLearnerIntent:cleanText(parsed.conversationMemory.lastLearnerIntent,240)||undefined,
      }:undefined,
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