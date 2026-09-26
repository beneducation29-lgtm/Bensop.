/** @license SPDX-License-Identifier: Apache-2.0 */
import React,{useState,useEffect} from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryCards } from './components/CategoryCards';
import { FeaturedContent } from './components/FeaturedContent';
import { LearningLab } from './components/LearningLab';
import { PersonalDashboard } from './components/PersonalDashboard';
import { SearchOverlay } from './components/SearchOverlay';
import { QuizModal } from './components/QuizModal';
import { Footer } from './components/Footer';
import { ChinesePage } from './pages/ChinesePage';
import { EnglishPage } from './pages/EnglishPage';
import { PersonalGrowthPage } from './pages/PersonalGrowthPage';
import { HealthLifePage } from './pages/HealthLifePage';
import { TopicPage } from './pages/TopicPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { CourseDetailPage } from './pages/CourseDetailPage';
import { LessonDetailPage } from './pages/LessonDetailPage';
import { SavedPage } from './pages/SavedPage';
import { DashboardPage } from './pages/DashboardPage';
import { PracticeHubPage } from './pages/PracticeHubPage';
import { QuizRunnerPage } from './pages/QuizRunnerPage';
import { QuizResultPage } from './pages/QuizResultPage';
import { QuestionBankPage } from './pages/QuestionBankPage';
import { VocabularyLabPage } from './pages/VocabularyLabPage';
import { VocabularyDetailPage } from './pages/VocabularyDetailPage';
import { VocabularyPracticePage } from './pages/VocabularyPracticePage';
import { VocabularyReviewPage } from './pages/VocabularyReviewPage';
import { GrammarLabPage } from './pages/GrammarLabPage';
import { GrammarDetailPage } from './pages/GrammarDetailPage';
import { GrammarReviewPage } from './pages/GrammarReviewPage';
import { NotFoundPage } from './components/NotFoundPage';
import { ListeningLabPage } from './pages/ListeningLabPage';
import { ListeningLessonPage } from './pages/ListeningLessonPage';
import { SpeakingLabPage } from './pages/SpeakingLabPage';
import { SpeakingPracticePage } from './pages/SpeakingPracticePage';
import { ReadingLabPage } from './pages/ReadingLabPage';
import { ReadingPracticePage } from './pages/ReadingPracticePage';
import { WritingLabPage } from './pages/WritingLabPage';
import { WritingPracticePage } from './pages/WritingPracticePage';
import { AITutorPage } from './pages/AITutorPage';
import { ContentLibraryPage } from './pages/ContentLibraryPage';
import { QuizMasteryPage } from './pages/QuizMasteryPage';
import { quizLearningService } from './services/quizLearningService';
import { quizService } from './services/quizService';
import { AdaptiveSessionRunnerPage } from './pages/AdaptiveSessionRunnerPage';
import { adaptiveSessionService } from './services/adaptiveSessionService';
import { INITIAL_USER } from './data/users';
import { ARTICLES } from './data/articles';
import { COURSES } from './data/courses';
import { LESSONS } from './data/lessons';
import { Article,Course,SavedItem,UserProgress } from './types';
import { ArrowRight } from 'lucide-react';
import { spacedReviewService } from './services/spacedReviewService';
import { learnerActivityService } from './services/learnerActivityService';

export default function App(){
 const [currentPath,setCurrentPath]=useState<string>(()=>window.location.pathname+window.location.search||'/');
 const [isSearchOpen,setIsSearchOpen]=useState(false);
 const [isLoggedIn,setIsLoggedIn]=useState(true);
 const [user,setUser]=useState<UserProgress>(()=>{try{const s=localStorage.getItem('bensop_user_progress');return s?JSON.parse(s) as UserProgress:INITIAL_USER}catch{return INITIAL_USER}});
 const [activeQuizId,setActiveQuizId]=useState<string|null>(null);
 useEffect(()=>{try{localStorage.setItem('bensop_user_progress',JSON.stringify(user))}catch{}},[user]);
 useEffect(()=>{const h=()=>setCurrentPath(window.location.pathname+window.location.search||'/');window.addEventListener('popstate',h);return()=>window.removeEventListener('popstate',h)},[]);
 const navigateTo=(path:string)=>{setCurrentPath(path);const current=window.location.pathname+window.location.search;if(current!==path)window.history.pushState({},'',path);window.scrollTo({top:0,behavior:'smooth'})};
 useEffect(()=>{const h=(e:KeyboardEvent)=>{if((e.metaKey||e.ctrlKey)&&e.key==='k'){e.preventDefault();setIsSearchOpen(true)}};window.addEventListener('keydown',h);return()=>window.removeEventListener('keydown',h)},[]);
 useEffect(()=>{const route=currentPath.split('?')[0];if(route==='/')document.title='BENSOP — Học mỗi ngày. Sống tốt hơn.';else if(route==='/dashboard')document.title=`Bảng học tập của ${user.name} — BENSOP`;else if(route.startsWith('/bai-viet/')){const a=ARTICLES.find(x=>x.slug===route.replace('/bai-viet/',''));document.title=a?`${a.title} — BENSOP`:'Bài viết — BENSOP'}else if(route.startsWith('/khoa-hoc/')){const c=COURSES.find(x=>x.slug===route.replace('/khoa-hoc/',''));document.title=c?`${c.title} — BENSOP`:'Khóa học — BENSOP'}else if(route.startsWith('/bai-hoc/')){const l=LESSONS.find(x=>x.slug===route.replace('/bai-hoc/',''));document.title=l?`${l.title} — BENSOP`:'Bài học — BENSOP'}else if(route==='/adaptive-session')document.title='Adaptive Learning Session — BENSOP';else if(route==='/ai-tutor')document.title='AI Coach — BENSOP';else if(route==='/content-lab')document.title='BENSOP Content Engine — Thư viện học liệu';else if(route==='/luyen-tap')document.title='Phòng Luyện Tập & Đánh Giá Năng Lực — BENSOP';else if(route.startsWith('/quiz/'))document.title='Bài Thi Đang Diễn Ra — BENSOP Quiz Engine';else if(route.startsWith('/quiz-result/'))document.title='Kết Quả & Phân Tích Bài Thi — BENSOP';else if(route.startsWith('/quiz-mastery/'))document.title='Mastery & Lịch Ôn — BENSOP';else if(route==='/ngan-hang-cau-hoi')document.title='Ngân Hàng Câu Hỏi — BENSOP';else document.title='BENSOP — Học mỗi ngày. Sống tốt hơn.'},[currentPath,user.name]);
 const handleToggleBookmark=(item:SavedItem)=>setUser(p=>{const e=p.savedItems.some(s=>s.slug===item.slug);return {...p,savedItems:e?p.savedItems.filter(s=>s.slug!==item.slug):[item,...p.savedItems]}});
 const handleToggleCompleteLesson=(lessonSlug:string)=>{setUser(prev=>{const isDone=prev.completedLessons.includes(lessonSlug),updated=isDone?prev.completedLessons.filter(s=>s!==lessonSlug):[...prev.completedLessons,lessonSlug],lesson=LESSONS.find(x=>x.slug===lessonSlug),activity=lesson?{id:`activity-${lessonSlug}-${Date.now()}`,title:isDone?`Bỏ hoàn thành: ${lesson.title}`:`Hoàn thành bài học: ${lesson.title}`,type:'lesson' as const,slug:lessonSlug,timestamp:new Date().toISOString(),category:lesson.categoryName}:null;if(isDone)spacedReviewService.clearLesson(lessonSlug);else{spacedReviewService.scheduleLesson(lessonSlug, new Date().toISOString(), lesson?.categoryId === 'tieng-trung' ? 'zh' : 'en');learnerActivityService.record({skill:'lesson',language:lesson?.categoryId==='tieng-trung'?'zh':'en',activityId:lessonSlug,score:100,evidenceType:'completion',timestamp:new Date().toISOString(),metadata:{completed:true}})}return {...prev,completedLessons:updated,lessonsCompleted:isDone?Math.max(0,prev.lessonsCompleted-1):prev.lessonsCompleted+1,recentActivity:activity?[activity,...prev.recentActivity.filter(i=>i.slug!==lessonSlug)].slice(0,12):prev.recentActivity}})};
 const renderRoute=()=>{const route=currentPath.split('?')[0];
  if(route==='/')return <><Hero onExploreClick={()=>document.getElementById('categories-section')?.scrollIntoView({behavior:'smooth'})} onStartLearningClick={()=>navigateTo('/tieng-trung')}/><CategoryCards onSelectCategory={navigateTo}/><FeaturedContent onSelectArticle={a=>navigateTo(`/bai-viet/${a.slug}`)} onExploreCategory={navigateTo}/><LearningLab onStartQuiz={id=>navigateTo(`/quiz/${id}`)}/>{isLoggedIn&&<PersonalDashboard onContinueLearning={navigateTo}/>}<section className="py-24 sm:py-32 bg-[#090909] border-b border-[#1A1A1A]"><div className="max-w-5xl mx-auto px-5 sm:px-8 text-center"><div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161616] border border-[#2A2A2A] text-xs font-mono text-[#D9FF3F] mb-6"><span className="w-1.5 h-1.5 rounded-full bg-[#D9FF3F]"/><span>BẮT ĐẦU NGAY HÔM NAY</span></div><h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white uppercase font-display mb-6 leading-tight">BẮT ĐẦU HÀNH TRÌNH<br/><span className="text-[#D9FF3F]">CỦA BẠN.</span></h2><p className="text-base sm:text-lg text-[#A0A0A0] max-w-2xl mx-auto mb-10 leading-relaxed font-normal">Gia nhập cùng hơn 4.000.000 người học đang nâng cấp tư duy, làm chủ ngoại ngữ và rèn luyện lối sống lành mạnh mỗi ngày trên Bensop.</p><div className="flex flex-col sm:flex-row items-center justify-center gap-4"><button onClick={()=>navigateTo('/tieng-trung')} className="w-full sm:w-auto px-8 py-4 bg-[#D9FF3F] text-black font-extrabold text-xs rounded cursor-pointer flex items-center justify-center gap-2"><span>KHÁM PHÁ TIẾNG TRUNG</span><ArrowRight className="w-4 h-4"/></button><button onClick={()=>navigateTo('/tieng-anh')} className="w-full sm:w-auto px-8 py-4 bg-[#141414] text-white font-bold text-xs border border-[#2A2A2A] cursor-pointer flex items-center justify-center gap-2"><span>KHÁM PHÁ TIẾNG ANH</span><ArrowRight className="w-4 h-4 text-[#888]"/></button></div></div></section></>;
  if(route.startsWith('/adaptive-session')){const language=new URLSearchParams(currentPath.split('?')[1]||'').get('lang')==='zh'?'zh':'en';const session=adaptiveSessionService.buildSession(language);return <AdaptiveSessionRunnerPage items={session.items} totalMinutes={session.totalMinutes} onNavigate={navigateTo}/>;}
  if(route==='/tieng-trung')return <ChinesePage onBack={()=>navigateTo('/')} onNavigate={navigateTo} onSelectArticle={a=>navigateTo(`/bai-viet/${a.slug}`)} onSelectCourse={c=>navigateTo(`/khoa-hoc/${c.slug}`)} onStartQuiz={id=>navigateTo(`/quiz/${id}`)}/>;
  if(route==='/tieng-anh')return <EnglishPage onBack={()=>navigateTo('/')} onNavigate={navigateTo} onSelectArticle={a=>navigateTo(`/bai-viet/${a.slug}`)} onSelectCourse={c=>navigateTo(`/khoa-hoc/${c.slug}`)} onStartQuiz={id=>navigateTo(`/quiz/${id}`)}/>;
  if(route==='/phat-trien-ban-than')return <PersonalGrowthPage onBack={()=>navigateTo('/')} onNavigate={navigateTo} onSelectArticle={a=>navigateTo(`/bai-viet/${a.slug}`)} onSelectCourse={c=>navigateTo(`/khoa-hoc/${c.slug}`)} onStartQuiz={id=>navigateTo(`/quiz/${id}`)}/>;
  if(route==='/suc-khoe-doi-song')return <HealthLifePage onBack={()=>navigateTo('/')} onNavigate={navigateTo} onSelectArticle={a=>navigateTo(`/bai-viet/${a.slug}`)} onSelectCourse={c=>navigateTo(`/khoa-hoc/${c.slug}`)}/>;
  const langRoute=(prefix:string)=>route.startsWith(prefix)?'en':'zh';
  if(route==='/tieng-anh/vocabulary'||route==='/tieng-trung/vocabulary'){const lang=route.startsWith('/tieng-anh')?'en':'zh';return <VocabularyLabPage language={lang} onNavigate={navigateTo} onSelectWord={w=>navigateTo(`/${lang==='en'?'tieng-anh':'tieng-trung'}/vocabulary/${w.slug}`)}/>;}
  if(route==='/tieng-anh/vocabulary/practice'||route==='/tieng-trung/vocabulary/practice'){const lang=route.startsWith('/tieng-anh')?'en':'zh';return <VocabularyPracticePage language={lang} onNavigate={navigateTo} onTakeQuiz={s=>navigateTo(`/quiz/${s}`)}/>;}
  if(route==='/tieng-anh/vocabulary/review'||route==='/tieng-trung/vocabulary/review'){const lang=route.startsWith('/tieng-anh')?'en':'zh';return <VocabularyReviewPage language={lang} onNavigate={navigateTo} onTakeQuiz={s=>navigateTo(`/quiz/${s}`)}/>;}
  const vm=route.match(/^\/(tieng-anh|tieng-trung)\/vocabulary\/([a-zA-Z0-9_-]+)$/);if(vm){const lang=vm[1]==='tieng-anh'?'en':'zh';return <VocabularyDetailPage slug={vm[2]} language={lang} onNavigate={navigateTo} onTakeQuiz={s=>navigateTo(`/quiz/${s}`)}/>;}
  if(route==='/tieng-anh/grammar'||route==='/tieng-trung/grammar'){const lang=route.startsWith('/tieng-anh')?'en':'zh';return <GrammarLabPage language={lang} onNavigate={navigateTo} onSelectConcept={c=>navigateTo(`/${lang==='en'?'tieng-anh':'tieng-trung'}/grammar/${c.slug}`)}/>;}
  if(route==='/tieng-anh/grammar/review'||route==='/tieng-trung/grammar/review'){const lang=route.startsWith('/tieng-anh')?'en':'zh';return <GrammarReviewPage language={lang} onNavigate={navigateTo} onTakeQuiz={s=>navigateTo(`/quiz/${s}`)}/>;}
  const gm=route.match(/^\/(tieng-anh|tieng-trung)\/grammar\/([a-zA-Z0-9_-]+)$/);if(gm){const lang=gm[1]==='tieng-anh'?'en':'zh';return <GrammarDetailPage slug={gm[2]} language={lang} onNavigate={navigateTo} onTakeQuiz={s=>navigateTo(`/quiz/${s}`)}/>;}
  if(route==='/content-lab')return <ContentLibraryPage onNavigate={navigateTo}/>;

  if(route==='/tieng-anh/listening'||route==='/tieng-trung/listening'){const language=route.startsWith('/tieng-anh')?'en':'zh';return <ListeningLabPage language={language} onNavigate={navigateTo}/>;}
  const lm=route.match(/^\/(tieng-anh|tieng-trung)\/listening\/([a-zA-Z0-9_-]+)$/);if(lm)return <ListeningLessonPage language={lm[1]==='tieng-anh'?'en':'zh'} slug={lm[2]} onNavigate={navigateTo}/>;
  if(route==='/tieng-anh/speaking'||route==='/tieng-trung/speaking'){const language=route.startsWith('/tieng-anh')?'en':'zh';return <SpeakingLabPage language={language} onNavigate={navigateTo}/>;}
  const sm=route.match(/^\/(tieng-anh|tieng-trung)\/speaking\/([a-zA-Z0-9_-]+)$/);if(sm)return <SpeakingPracticePage language={sm[1]==='tieng-anh'?'en':'zh'} slug={sm[2]} onNavigate={navigateTo}/>;
  if(route==='/tieng-anh/reading'||route==='/tieng-trung/reading'){const language=route.startsWith('/tieng-anh')?'en':'zh';return <ReadingLabPage language={language} onNavigate={navigateTo}/>;}
  const rm=route.match(/^\/(tieng-anh|tieng-trung)\/reading\/([a-zA-Z0-9_-]+)$/);if(rm)return <ReadingPracticePage language={rm[1]==='tieng-anh'?'en':'zh'} slug={rm[2]} onNavigate={navigateTo}/>;
  if(route==='/tieng-anh/writing'||route==='/tieng-trung/writing'){const language=route.startsWith('/tieng-anh')?'en':'zh';return <WritingLabPage language={language} onNavigate={navigateTo}/>;}
  const wm=route.match(/^\/(tieng-anh|tieng-trung)\/writing\/([a-zA-Z0-9_-]+)$/);if(wm)return <WritingPracticePage language={wm[1]==='tieng-anh'?'en':'zh'} slug={wm[2]} onNavigate={navigateTo}/>;
  const tm=route.match(/^\/(tieng-trung|tieng-anh|phat-trien-ban-than|suc-khoe-doi-song)\/([a-zA-Z0-9_-]+)$/);if(tm)return <TopicPage categorySlug={tm[1]} topicSlug={tm[2]} onNavigate={navigateTo} onSelectArticle={a=>navigateTo(`/bai-viet/${a.slug}`)} onSelectCourse={c=>navigateTo(`/khoa-hoc/${c.slug}`)} savedItems={user.savedItems} onToggleBookmark={handleToggleBookmark}/>;
  if(route.startsWith('/bai-viet/'))return <ArticleDetailPage slug={route.replace('/bai-viet/','')} onNavigate={navigateTo} onSelectArticle={a=>navigateTo(`/bai-viet/${a.slug}`)} onSelectCourse={c=>navigateTo(`/khoa-hoc/${c.slug}`)} onStartQuiz={id=>navigateTo(`/quiz/${id}`)} savedItems={user.savedItems} onToggleBookmark={handleToggleBookmark}/>;
  if(route.startsWith('/khoa-hoc/'))return <CourseDetailPage slug={route.replace('/khoa-hoc/','')} onNavigate={navigateTo} onSelectLesson={s=>navigateTo(`/bai-hoc/${s}`)} onSelectArticle={a=>navigateTo(`/bai-viet/${a.slug}`)} onStartQuiz={id=>navigateTo(`/quiz/${id}`)} savedItems={user.savedItems} onToggleBookmark={handleToggleBookmark} completedLessons={user.completedLessons} isLoggedIn={isLoggedIn}/>;
  if(route.startsWith('/bai-hoc/'))return <LessonDetailPage slug={route.replace('/bai-hoc/','')} onNavigate={navigateTo} onSelectLesson={s=>navigateTo(`/bai-hoc/${s}`)} onSelectCourse={c=>navigateTo(`/khoa-hoc/${c.slug}`)} completedLessons={user.completedLessons} onToggleCompleteLesson={handleToggleCompleteLesson} savedItems={user.savedItems} onToggleBookmark={handleToggleBookmark}/>;
  if(route==='/saved')return <SavedPage savedItems={user.savedItems} onToggleBookmark={handleToggleBookmark} onNavigate={navigateTo} onSelectArticle={a=>navigateTo(`/bai-viet/${a.slug}`)} onSelectCourse={c=>navigateTo(`/khoa-hoc/${c.slug}`)} onSelectLesson={s=>navigateTo(`/bai-hoc/${s}`)}/>;
  if(route==='/dashboard')return <DashboardPage user={user} onNavigate={navigateTo} onSelectArticle={a=>navigateTo(`/bai-viet/${a.slug}`)} onSelectCourse={c=>navigateTo(`/khoa-hoc/${c.slug}`)} onSelectLesson={s=>navigateTo(`/bai-hoc/${s}`)}/>;
  if(route==='/luyen-tap')return <PracticeHubPage onNavigate={navigateTo} onStartQuiz={s=>navigateTo(`/quiz/${s}`)}/>;
  if(route.startsWith('/quiz/'))return <QuizRunnerPage quizSlug={route.replace('/quiz/','')} onNavigate={navigateTo} onFinishQuiz={res=>{quizLearningService.recordResult(res);navigateTo(`/quiz-result/${res.sessionId}`)}}/>;
  if(route.startsWith('/quiz-result/')){const id=route.replace('/quiz-result/','');return <QuizResultPage sessionId={id} onNavigate={navigateTo} onRetakeQuiz={s=>navigateTo(`/quiz/${s}`)} onPracticeWrongQuestions={ids=>{const s=quizService.createReviewQuiz(ids,'Quiz gần nhất');navigateTo(`/quiz/${s}`)}}/>;}
  if(route.startsWith('/quiz-mastery/'))return <QuizMasteryPage sessionId={route.replace('/quiz-mastery/','')} onNavigate={navigateTo}/>;
  if(route==='/ngan-hang-cau-hoi')return <QuestionBankPage onNavigate={navigateTo} onPracticeQuiz={s=>navigateTo(`/quiz/${s}`)}/>;
  if(route==='/tieng-anh/listening'||route==='/tieng-trung/listening'){const language=route.startsWith('/tieng-anh')?'en':'zh';return <ListeningLabPage language={language} onNavigate={navigateTo}/>;}
  const lm=route.match(/^\/(tieng-anh|tieng-trung)\/listening\/([a-zA-Z0-9_-]+)$/);if(lm)return <ListeningLessonPage language={lm[1]==='tieng-anh'?'en':'zh'} slug={lm[2]} onNavigate={navigateTo}/>;
  if(route==='/tieng-anh/speaking'||route==='/tieng-trung/speaking'){const language=route.startsWith('/tieng-anh')?'en':'zh';return <SpeakingLabPage language={language} onNavigate={navigateTo}/>;}
  const sm=route.match(/^\/(tieng-anh|tieng-trung)\/speaking\/([a-zA-Z0-9_-]+)$/);if(sm)return <SpeakingPracticePage language={sm[1]==='tieng-anh'?'en':'zh'} slug={sm[2]} onNavigate={navigateTo}/>;
  if(route==='/tieng-anh/reading'||route==='/tieng-trung/reading'){const language=route.startsWith('/tieng-anh')?'en':'zh';return <ReadingLabPage language={language} onNavigate={navigateTo}/>;}
  const rm=route.match(/^\/(tieng-anh|tieng-trung)\/reading\/([a-zA-Z0-9_-]+)$/);if(rm)return <ReadingPracticePage language={rm[1]==='tieng-anh'?'en':'zh'} slug={rm[2]} onNavigate={navigateTo}/>;
  if(route==='/tieng-anh/writing'||route==='/tieng-trung/writing'){const language=route.startsWith('/tieng-anh')?'en':'zh';return <WritingLabPage language={language} onNavigate={navigateTo}/>;}
  const wm=route.match(/^\/(tieng-anh|tieng-trung)\/writing\/([a-zA-Z0-9_-]+)$/);if(wm)return <WritingPracticePage language={wm[1]==='tieng-anh'?'en':'zh'} slug={wm[2]} onNavigate={navigateTo}/>;
  if(route==='/ai-tutor')return <AITutorPage onNavigate={navigateTo}/>;
  return <NotFoundPage onNavigateHome={()=>navigateTo('/')}/>;
 };
 const isLessonMode=currentPath.startsWith('/bai-hoc/'),isQuizRunnerMode=currentPath.startsWith('/quiz/'),isDistractionFreeMode=isLessonMode||isQuizRunnerMode;
 return <div className="min-h-screen bg-[#050505] text-white flex flex-col font-sans"><>{!isDistractionFreeMode&&<Header currentPath={currentPath.split('?')[0]} onNavigate={navigateTo} onOpenSearch={()=>setIsSearchOpen(true)} isLoggedIn={isLoggedIn} onToggleLogin={()=>setIsLoggedIn(!isLoggedIn)} savedCount={user.savedItems.length}/>}</><main className="flex-1">{renderRoute()}</main>{!isDistractionFreeMode&&<Footer onNavigate={navigateTo}/>}<SearchOverlay isOpen={isSearchOpen} onClose={()=>setIsSearchOpen(false)} onSelectArticle={a=>navigateTo(`/bai-viet/${a.slug}`)} onSelectCourse={c=>navigateTo(`/khoa-hoc/${c.slug}`)} onSelectLesson={s=>navigateTo(`/bai-hoc/${s}`)} onSelectQuiz={id=>{setIsSearchOpen(false);navigateTo(`/quiz/${id}`)}} onNavigate={navigateTo}/><QuizModal quizId={activeQuizId} onClose={()=>setActiveQuizId(null)}/></div>;
}