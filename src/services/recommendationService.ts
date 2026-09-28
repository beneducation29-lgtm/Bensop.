import { LanguageCode } from '../types/vocabulary';
import { DailyLearningSession } from '../types/learningProgress';
import { vocabularyService } from './vocabularyService';
import { grammarService } from './grammarService';
import { masteryService } from './masteryService';
import { spacedReviewService } from './spacedReviewService';
import { quizSessionStorage } from './quizSessionStorage';
import { learnerActivityService } from './learnerActivityService';
import { learnerProfileService } from './learnerProfileService';

export type LearningActionType='review'|'weakness'|'lesson'|'vocabulary'|'grammar'|'listening'|'speaking'|'reading'|'writing'|'quiz';
export interface NextLearningAction{type:LearningActionType;title:string;description:string;cta:string;path:string;reason:string;priority:'high'|'medium'|'normal';durationMinutes:number}

class RecommendationService{
 getDailyLearningSession(language:LanguageCode):DailyLearningSession{
  const allWords=vocabularyService.getAllWords(language),allConcepts=grammarService.getAllConcepts(language),todayStr=new Date().toISOString().split('T')[0],daySeed=new Date().getDate();
  const wordStartIndex=(daySeed*3)%Math.max(1,allWords.length-6),conceptIndex=daySeed%Math.max(1,allConcepts.length);
  return{date:todayStr,newWords:allWords.slice(wordStartIndex,wordStartIndex+5),grammarConcept:allConcepts[conceptIndex]||allConcepts[0],practiceQuestionCount:10,reviewWordCount:8,isCompleted:false};
 }
 getPersonalizedRecommendations(language:LanguageCode){
  const allWords=vocabularyService.getAllWords(language),allConcepts=grammarService.getAllConcepts(language);
  return{suggestedWords:allWords.slice(0,4),suggestedConcept:allConcepts[0],suggestedQuizSlug:language==='en'?'phrasal-verbs-cong-so':'hsk-phan-xa-tu-vung-thanh-dieu',weakTopicSuggestion:language==='en'?'Verb Tenses & Inversion':'把字句与被字句'};
 }
 getLearningSkillSnapshot(language:LanguageCode='en'){return learnerProfileService.getSnapshot(language).skills}
 private getPreferredLanguage():LanguageCode{
  const history=quizSessionStorage.getHistory();
  const recentQuiz=history[0];
  if(recentQuiz?.categoryId==='tieng-trung') return 'zh';
  if(recentQuiz?.categoryId==='tieng-anh') return 'en';
  const recent=learnerActivityService.getRecent(undefined,1)[0];
  if(recent?.language) return recent.language;
  return 'en';
 }
 getNextLearningActions(limit=3,language:LanguageCode=this.getPreferredLanguage()):NextLearningAction[]{
  const actions:NextLearningAction[]=[];
  const add=(action:NextLearningAction)=>{if(!actions.some(x=>x.path===action.path&&x.type===action.type))actions.push(action)};
  const dueReviews=spacedReviewService.getDue(new Date(),language);
  dueReviews.slice(0,2).forEach((next,index)=>{
   const path=next.path || (next.quizSlug?'/quiz/'+next.quizSlug:next.lessonSlug?'/bai-hoc/'+next.lessonSlug:'/luyen-tap');
   add({type:'review',title:index===0?'Ôn tập đúng lúc':'Tiếp tục lượt ôn',description:'Nội dung này đã đến hạn theo lịch Spaced Review của bạn.',cta:'ÔN NGAY',path,reason:`${dueReviews.length} lượt ôn đang đến hạn.`,priority:'high',durationMinutes:next.reviewType==='quiz'?8:10});
  });
  const mastery=masteryService.getSnapshot(language);
  const weakQuestions=mastery.questions.filter(x=>x.mastery<70).sort((a,b)=>a.mastery-b.mastery).slice(0,2);
  if(weakQuestions.length)add({type:'weakness',title:'Củng cố câu hỏi yếu',description:`Bạn có ${weakQuestions.length} câu hỏi dưới ngưỡng mastery 70%. Phiên luyện sẽ tập trung vào các lỗi này.`,cta:'LUYỆN ĐIỂM YẾU',path:'/luyen-tap',reason:`Câu yếu nhất: “${weakQuestions[0].label}” · mastery ${weakQuestions[0].mastery}%.`,priority:'high',durationMinutes:10});
  const weakTopic=mastery.topics.filter(x=>x.mastery<80).sort((a,b)=>a.mastery-b.mastery)[0];
  if(weakTopic)add({type:'weakness',title:'Củng cố chủ đề',description:`Chủ đề “${weakTopic.label}” đang ở mức ${weakTopic.mastery}%. Một phiên luyện ngắn sẽ giúp củng cố kiến thức.`,cta:'MỞ PHÒNG LUYỆN',path:'/luyen-tap',reason:'Chủ đề có mastery dưới 80%.',priority:'medium',durationMinutes:12});
  const skills=this.getLearningSkillSnapshot(language),labels:Record<string,string>={vocabulary:'Tăng vốn từ',grammar:'Củng cố ngữ pháp',listening:'Luyện nghe',speaking:'Luyện nói',reading:'Luyện đọc',writing:'Luyện viết'};
  const skillCandidates=skills.filter(s=>s.total>0).map(skill=>{const coverage=skill.activityCount/skill.total,scoreSignal=skill.activityCount===0?50:skill.score,momentumSignal=skill.activityCount<2?0:skill.momentum,recencySignal=skill.evidenceCount===0?0:Math.min(10,skill.evidenceCount/3),priorityScore=scoreSignal-coverage*15-momentumSignal*.8-recencySignal*.5;return{skill,priorityScore}}).sort((a,b)=>a.priorityScore-b.priorityScore);
  skillCandidates.forEach(({skill})=>{if(actions.length>=limit+2)return;add({type:skill.key as LearningActionType,title:labels[skill.key]||'Tiếp tục học',description:skill.activityCount===0?`Bạn chưa có dữ liệu luyện ${skill.label}. Bắt đầu một phiên ngắn để Bensop có thêm tín hiệu cá nhân hóa.`:`Bensop đang ưu tiên ${skill.label} dựa trên mastery, lịch sử evidence và xu hướng gần đây.`,cta:'BẮT ĐẦU NGAY',path:skill.path,reason:`${skill.label}: mastery ${skill.score}% · xu hướng ${skill.trend==='up'?'đang tăng':skill.trend==='down'?'đang giảm':'ổn định'}${skill.momentum?` · momentum ${skill.momentum>0?'+':''}${skill.momentum}`:''} · đã luyện ${skill.activityCount}/${skill.total} nội dung.`,priority:skill.activityCount===0?'medium':'normal',durationMinutes:skill.key==='vocabulary'||skill.key==='grammar'?8:10})});
  if(actions.length<limit)add({type:'quiz',title:'Tiếp tục nhịp học',description:'Duy trì một phiên luyện tập ngắn để Bensop tiếp tục cập nhật hồ sơ học tập.',cta:'LUYỆN TẬP TIẾP',path:'/luyen-tap',reason:'Chưa có tín hiệu ưu tiên rõ ràng từ các phòng học.',priority:'normal',durationMinutes:10});
  return actions.slice(0,limit);
 }
 getNextLearningAction():NextLearningAction{return this.getNextLearningActions(1)[0]}
}
export const recommendationService=new RecommendationService();