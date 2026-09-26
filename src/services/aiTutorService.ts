import { TutorContext, TutorReply } from '../types/aiTutor';
import { learnerProfileService } from './learnerProfileService';
import { spacedReviewService } from './spacedReviewService';
import { recommendationService } from './recommendationService';

const skillLabels:Record<string,{en:string;zh:string}>={
  vocabulary:{en:'vocabulary',zh:'词汇'},grammar:{en:'grammar',zh:'语法'},listening:{en:'listening',zh:'听力'},
  speaking:{en:'speaking',zh:'口语'},reading:{en:'reading',zh:'阅读'},writing:{en:'writing',zh:'写作'},
};
const skillPaths:Record<string,Record<'en'|'zh',string>>={
  vocabulary:{en:'/tieng-anh/vocabulary/practice',zh:'/tieng-trung/vocabulary/practice'},
  grammar:{en:'/tieng-anh/grammar/review',zh:'/tieng-trung/grammar/review'},
  listening:{en:'/tieng-anh/listening',zh:'/tieng-trung/listening'},
  speaking:{en:'/tieng-anh/speaking',zh:'/tieng-trung/speaking'},
  reading:{en:'/tieng-anh/reading',zh:'/tieng-trung/reading'},
  writing:{en:'/tieng-anh/writing',zh:'/tieng-trung/writing'},
};

type ConversationMessage={role:'user'|'assistant';content:string};

class AITutorService{
  getLearnerContext(language:'en'|'zh'='en'):TutorContext{
    const profile=learnerProfileService.getSnapshot(language),weakest=profile.needsAttention[0];
    return{language,level:'B1',learner:{overall:profile.overall,weakestSkill:weakest?.key,weakestScore:weakest?.score,weakestTrend:weakest?.trend,dueReviews:spacedReviewService.getDue().length,recentEvidenceCount:profile.recentEvidence.length}};
  }
  getRecommendedAction(language:'en'|'zh'='en'){
    const action=recommendationService.getNextLearningActions(1,language)[0];
    return action?{label:action.cta,path:action.path}:null;
  }
  async reply(message:string,context:TutorContext,history:ConversationMessage[]=[]):Promise<TutorReply>{
    try{
      const response=await fetch('/api/ai-tutor',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({message,context,history:history.slice(-8)}),
      });
      if(response.ok){
        const data=await response.json() as Partial<TutorReply>;
        if(typeof data.content==='string'&&data.content.trim()){
          return{content:data.content,suggestions:Array.isArray(data.suggestions)?data.suggestions:[],source:'ai',action:data.action};
        }
      }
    }catch{
      // Keep AI Coach usable when the server/API key is unavailable.
    }
    return this.fallbackReply(message,context);
  }
  private fallbackReply(message:string,context:TutorContext):TutorReply{
    const q=message.toLowerCase(),zh=context.language==='zh',learner=context.learner;
    const weakest=learner?.weakestSkill,weakLabel=weakest?skillLabels[weakest]?.[zh?'zh':'en']:undefined;
    let content=zh?'我可以根据你的学习记录，帮你练习中文。':'I can use your recent learning evidence to guide your practice.';
    let suggestions=zh?['练习一个句子','检查语法','开始一次短练习']:['Practise a sentence','Check my grammar','Start a short practice'];
    let action=this.getRecommendedAction(context.language);
    if(q.includes('grammar')||q.includes('ngữ pháp')||q.includes('语法')){
      content=zh?'我们可以一起检查句子结构、语序和语法。先写一个你最近学过的句子。':'Let’s check your sentence structure, tense and grammar. Send me one sentence you recently studied.';
      suggestions=zh?['给我一个语法题','改正我的句子','解释语序']:['Give me a grammar question','Correct my sentence','Explain the word order'];
      action={label:zh?'进入语法练习':'OPEN GRAMMAR PRACTICE',path:skillPaths.grammar[context.language]};
    }else if(q.includes('vocab')||q.includes('từ vựng')||q.includes('词汇')){
      content=zh?'我会给你词义、例句和一个小练习。':'I’ll give you meaning, an example, and a short retrieval task.';
      suggestions=zh?['给我3个新词','做词汇回忆','用新词造句']:['Give me 3 words','Test my vocabulary','Make a sentence with me'];
      action={label:zh?'进入词汇练习':'OPEN VOCABULARY PRACTICE',path:skillPaths.vocabulary[context.language]};
    }else if(q.includes('what should i')||q.includes('học gì')||q.includes('nên học gì')||q.includes('接下来')){
      content=weakLabel
        ?(zh?'根据你的学习记录，建议先加强'+weakLabel+'。当前记录约为'+(learner?.weakestScore??0)+'%。':'Based on your recent learning evidence, I’d start with '+weakLabel+'. Your current record is about '+(learner?.weakestScore??0)+'%.')
        :(zh?'目前还没有足够的学习证据。先完成一次短练习。':'There is not enough learning evidence yet. Complete one short practice first.');
      suggestions=zh?['开始自适应学习','查看待复习内容','练习最弱项']:['Start adaptive session','Review due items','Practise my weakest skill'];
      action={label:zh?'开始自适应学习':'START ADAPTIVE SESSION',path:'/adaptive-session'};
    }else if(q.includes('adaptive')||q.includes('tự động')||q.includes('自适应')){
      content=zh?'我会把到期复习、薄弱问题和最近趋势组合成一段短学习流程。':'I’ll combine due reviews, weak areas, and recent trends into one short learning session.';
      suggestions=zh?['开始自适应学习','先看我的弱项']:['Start adaptive session','Show my weak area'];
      action={label:zh?'开始自适应学习':'START ADAPTIVE SESSION',path:'/adaptive-session'};
    }else if(q.includes('hello')||q.includes('xin chào')||q.includes('你好')){
      content=zh?'你好！'+(weakLabel?'你最近可以重点练习'+weakLabel+'。':'')+'今天想练习什么？':'Hello!'+(weakLabel?' Your recent evidence suggests focusing on '+weakLabel+'.':'')+' What would you like to practise today?';
    }else if(learner?.dueReviews){
      content=zh?'我看到你有'+learner.dueReviews+'项复习已经到期。你也可以告诉我一个具体问题，我会结合你的学习记录给出练习。':'You have '+learner.dueReviews+' review item'+(learner.dueReviews===1?'':'s')+' due. Tell me a specific question and I’ll tailor the practice.';
    }
    return{content,suggestions,source:'fallback',action};
  }
}
export const aiTutorService=new AITutorService();
