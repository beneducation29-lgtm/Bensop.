/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
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
import { Article, Course, SavedItem, UserProgress } from './types';
import { ArrowRight, BookOpen } from 'lucide-react';
import { spacedReviewService } from './services/spacedReviewService';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [user, setUser] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem('bensop_user_progress');
      return saved ? (JSON.parse(saved) as UserProgress) : INITIAL_USER;
    } catch {
      return INITIAL_USER;
    }
  });
  const [activeQuizId, setActiveQuizId] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('bensop_user_progress', JSON.stringify(user));
    } catch {
      // Keep the learning experience usable even when storage is unavailable.
    }
  }, [user]);

  // Sync with browser history
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    setCurrentPath(path);
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Keyboard shortcut ⌘K / Ctrl+K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Update document title for SEO
  useEffect(() => {
    if (currentPath === '/') {
      document.title = 'BENSOP — Học mỗi ngày. Sống tốt hơn.';
    } else if (currentPath === '/tieng-trung') {
      document.title = 'Tiếng Trung Thực Tế — BENSOP';
    } else if (currentPath === '/tieng-anh') {
      document.title = 'Tiếng Anh Thực Chiến — BENSOP';
    } else if (currentPath === '/phat-trien-ban-than') {
      document.title = 'Phát Triển Bản Thân — BENSOP';
    } else if (currentPath === '/suc-khoe-doi-song') {
      document.title = 'Sức Khỏe & Đời Sống — BENSOP';
    } else if (currentPath.startsWith('/bai-viet/')) {
      const slug = currentPath.replace('/bai-viet/', '');
      const art = ARTICLES.find((a) => a.slug === slug);
      document.title = art ? `${art.title} — BENSOP` : 'Bài viết — BENSOP';
    } else if (currentPath.startsWith('/khoa-hoc/')) {
      const slug = currentPath.replace('/khoa-hoc/', '');
      const crs = COURSES.find((c) => c.slug === slug);
      document.title = crs ? `${crs.title} — BENSOP` : 'Khóa học — BENSOP';
    } else if (currentPath.startsWith('/bai-hoc/')) {
      const slug = currentPath.replace('/bai-hoc/', '');
      const les = LESSONS.find((l) => l.slug === slug);
      document.title = les ? `${les.title} — BENSOP` : 'Bài học — BENSOP';
    } else if (currentPath === '/saved') {
      document.title = 'Nội dung đã lưu — BENSOP';
    } else if (currentPath === '/content-lab') {
      document.title = 'BENSOP Content Engine — Thư viện học liệu';
    } else if (currentPath === '/adaptive-session') {
      document.title = 'Adaptive Learning Session — BENSOP';
    } else if (currentPath === '/dashboard') {
      document.title = `Bảng học tập của ${user.name} — BENSOP`;
    } else if (currentPath === '/luyen-tap') {
      document.title = 'Phòng Luyện Tập & Đánh Giá Năng Lực — BENSOP';
    } else if (currentPath.startsWith('/quiz/')) {
      document.title = 'Bài Thi Đang Diễn Ra — BENSOP Quiz Engine';
    } else if (currentPath.startsWith('/quiz-result')) {
      document.title = 'Kết Quả & Phân Tích Bài Thi — BENSOP';
    } else if (currentPath === '/ngan-hang-cau-hoi') {
      document.title = 'Ngân Hàng Câu Hỏi — BENSOP';
    } else if (currentPath === '/tieng-anh/vocabulary') {
      document.title = 'Vocabulary Lab — Tiếng Anh | BENSOP';
    } else if (currentPath.startsWith('/tieng-anh/vocabulary/')) {
      document.title = 'Từ Vựng Tiếng Anh — BENSOP';
    } else if (currentPath === '/tieng-anh/grammar') {
      document.title = 'Grammar Lab — Tiếng Anh | BENSOP';
    } else if (currentPath.startsWith('/tieng-anh/grammar/')) {
      document.title = 'Ngữ Pháp Tiếng Anh — BENSOP';
    } else if (currentPath === '/tieng-trung/vocabulary') {
      document.title = 'Vocabulary Lab — Tiếng Trung | BENSOP';
    } else if (currentPath.startsWith('/tieng-trung/vocabulary/')) {
      document.title = 'Từ Vựng Tiếng Trung — BENSOP';
    } else if (currentPath === '/tieng-trung/grammar') {
      document.title = 'Grammar Lab — Tiếng Trung | BENSOP';
    } else if (currentPath.startsWith('/tieng-trung/grammar/')) {
      document.title = 'Ngữ Pháp Tiếng Trung — BENSOP';
    }
  }, [currentPath, user.name]);

  // Stateful Bookmark Toggle
  const handleToggleBookmark = (item: SavedItem) => {
    setUser((prev) => {
      const exists = prev.savedItems.some((s) => s.slug === item.slug);
      let updated: SavedItem[];
      if (exists) {
        updated = prev.savedItems.filter((s) => s.slug !== item.slug);
      } else {
        updated = [item, ...prev.savedItems];
      }
      return { ...prev, savedItems: updated };
    });
  };

  // Stateful Lesson Completion Toggle
  const handleToggleCompleteLesson = (lessonSlug: string) => {
    setUser((prev) => {
      const isDone = prev.completedLessons.includes(lessonSlug);
      const updated = isDone
        ? prev.completedLessons.filter((s) => s !== lessonSlug)
        : [...prev.completedLessons, lessonSlug];

      const lesson = LESSONS.find((item) => item.slug === lessonSlug);
      const activity = lesson
        ? {
            id: `activity-${lessonSlug}-${Date.now()}`,
            title: isDone ? `Bỏ hoàn thành: ${lesson.title}` : `Hoàn thành bài học: ${lesson.title}`,
            type: 'lesson' as const,
            slug: lessonSlug,
            timestamp: new Date().toISOString(),
            category: lesson.categoryName,
          }
        : null;

      if (isDone) spacedReviewService.clearLesson(lessonSlug);
      else spacedReviewService.scheduleLesson(lessonSlug);

      return {
        ...prev,
        completedLessons: updated,
        lessonsCompleted: isDone ? Math.max(0, prev.lessonsCompleted - 1) : prev.lessonsCompleted + 1,
        recentActivity: activity
          ? [activity, ...prev.recentActivity.filter((item) => item.slug !== lessonSlug)].slice(0, 12)
          : prev.recentActivity,
      };
    });
  };

  // Clean Route Resolver
  const renderRoute = () => {
    // 1. Homepage
    if (currentPath === '/') {
      return (
        <>
          <Hero
            onExploreClick={() => {
              const el = document.getElementById('categories-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            onStartLearningClick={() => navigateTo('/tieng-trung')}
          />
          <CategoryCards onSelectCategory={navigateTo} />
          <FeaturedContent
            onSelectArticle={(art) => navigateTo(`/bai-viet/${art.slug}`)}
            onExploreCategory={navigateTo}
          />
          <LearningLab onStartQuiz={(quizId) => navigateTo(`/quiz/${quizId}`)} />
          {isLoggedIn && <PersonalDashboard onContinueLearning={navigateTo} />}
          
          {/* CTA Section */}
          <section className="py-24 sm:py-32 bg-[#090909] border-b border-[#1A1A1A]">
            <div className="max-w-5xl mx-auto px-5 sm:px-8 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161616] border border-[#2A2A2A] text-xs font-mono text-[#D9FF3F] mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D9FF3F]" />
                <span>BẮT ĐẦU NGAY HÔM NAY</span>
              </div>
              <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white uppercase font-display mb-6 leading-tight">
                BẮT ĐẦU HÀNH TRÌNH<br />
                <span className="text-[#D9FF3F]">CỦA BẠN.</span>
              </h2>
              <p className="text-base sm:text-lg text-[#A0A0A0] max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
                Gia nhập cùng hơn 4.000.000 người học đang nâng cấp tư duy, làm chủ ngoại ngữ và rèn luyện lối sống lành mạnh mỗi ngày trên Bensop.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => navigateTo('/tieng-trung')}
                  className="w-full sm:w-auto px-8 py-4 bg-[#D9FF3F] hover:bg-[#cbf532] text-black font-extrabold text-xs tracking-tight rounded transition-all cursor-pointer flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(217,255,63,0.2)]"
                >
                  <span>KHÁM PHÁ TIẾNG TRUNG</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </button>
                <button
                  onClick={() => navigateTo('/tieng-anh')}
                  className="w-full sm:w-auto px-8 py-4 bg-[#141414] hover:bg-[#202020] text-white font-bold text-xs tracking-tight border border-[#2A2A2A] transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>KHÁM PHÁ TIẾNG ANH</span>
                  <ArrowRight className="w-4 h-4 text-[#888]" />
                </button>
              </div>
            </div>
          </section>
        </>
      );
    }

    // 1.5 Adaptive Learning Session
    if (currentPath === '/adaptive-session') {
      const session = adaptiveSessionService.buildSession();
      return (
        <AdaptiveSessionRunnerPage
          items={session.items}
          totalMinutes={session.totalMinutes}
          onNavigate={navigateTo}
        />
      );
    }

    // 2. Category Landing Pages
    if (currentPath === '/tieng-trung') {
      return (
        <ChinesePage
          onBack={() => navigateTo('/')}
          onNavigate={navigateTo}
          onSelectArticle={(art) => navigateTo(`/bai-viet/${art.slug}`)}
          onSelectCourse={(c) => navigateTo(`/khoa-hoc/${c.slug}`)}
          onStartQuiz={(quizId) => navigateTo(`/quiz/${quizId}`)}
        />
      );
    }

    if (currentPath === '/tieng-anh') {
      return (
        <EnglishPage
          onBack={() => navigateTo('/')}
          onNavigate={navigateTo}
          onSelectArticle={(art) => navigateTo(`/bai-viet/${art.slug}`)}
          onSelectCourse={(c) => navigateTo(`/khoa-hoc/${c.slug}`)}
          onStartQuiz={(quizId) => navigateTo(`/quiz/${quizId}`)}
        />
      );
    }

    if (currentPath === '/phat-trien-ban-than') {
      return (
        <PersonalGrowthPage
          onBack={() => navigateTo('/')}
          onNavigate={navigateTo}
          onSelectArticle={(art) => navigateTo(`/bai-viet/${art.slug}`)}
          onSelectCourse={(c) => navigateTo(`/khoa-hoc/${c.slug}`)}
          onStartQuiz={(quizId) => navigateTo(`/quiz/${quizId}`)}
        />
      );
    }

    if (currentPath === '/suc-khoe-doi-song') {
      return (
        <HealthLifePage
          onBack={() => navigateTo('/')}
          onNavigate={navigateTo}
          onSelectArticle={(art) => navigateTo(`/bai-viet/${art.slug}`)}
          onSelectCourse={(c) => navigateTo(`/khoa-hoc/${c.slug}`)}
        />
      );
    }

    // 2.1 Vocabulary Lab Homepage & Review/Practice Sub-routes
    if (currentPath === '/tieng-anh/vocabulary' || currentPath === '/tieng-trung/vocabulary') {
      const lang = currentPath.startsWith('/tieng-anh') ? 'en' : 'zh';
      return (
        <VocabularyLabPage
          language={lang}
          onNavigate={navigateTo}
          onSelectWord={(word) => navigateTo(`/${lang === 'en' ? 'tieng-anh' : 'tieng-trung'}/vocabulary/${word.slug}`)}
        />
      );
    }

    if (currentPath === '/tieng-anh/vocabulary/practice' || currentPath === '/tieng-trung/vocabulary/practice') {
      const lang = currentPath.startsWith('/tieng-anh') ? 'en' : 'zh';
      return (
        <VocabularyPracticePage
          language={lang}
          onNavigate={navigateTo}
          onTakeQuiz={(slug) => navigateTo(`/quiz/${slug}`)}
        />
      );
    }

    if (currentPath === '/tieng-anh/vocabulary/review' || currentPath === '/tieng-trung/vocabulary/review') {
      const lang = currentPath.startsWith('/tieng-anh') ? 'en' : 'zh';
      return (
        <VocabularyReviewPage
          language={lang}
          onNavigate={navigateTo}
          onTakeQuiz={(slug) => navigateTo(`/quiz/${slug}`)}
        />
      );
    }

    // Vocabulary Word Detail (/tieng-anh/vocabulary/:slug, /tieng-trung/vocabulary/:slug)
    const vocabDetailMatch = currentPath.match(/^\/(tieng-anh|tieng-trung)\/vocabulary\/([a-zA-Z0-9_-]+)$/);
    if (vocabDetailMatch) {
      const [, catSlug, wordSlug] = vocabDetailMatch;
      const lang = catSlug === 'tieng-anh' ? 'en' : 'zh';
      return (
        <VocabularyDetailPage
          slug={wordSlug}
          language={lang}
          onNavigate={navigateTo}
          onTakeQuiz={(quizSlug) => navigateTo(`/quiz/${quizSlug}`)}
        />
      );
    }

    // 2.2 Grammar Lab Homepage & Review Sub-routes
    if (currentPath === '/tieng-anh/grammar' || currentPath === '/tieng-trung/grammar') {
      const lang = currentPath.startsWith('/tieng-anh') ? 'en' : 'zh';
      return (
        <GrammarLabPage
          language={lang}
          onNavigate={navigateTo}
          onSelectConcept={(concept) => navigateTo(`/${lang === 'en' ? 'tieng-anh' : 'tieng-trung'}/grammar/${concept.slug}`)}
        />
      );
    }

    if (currentPath === '/tieng-anh/grammar/review' || currentPath === '/tieng-trung/grammar/review') {
      const lang = currentPath.startsWith('/tieng-anh') ? 'en' : 'zh';
      return (
        <GrammarReviewPage
          language={lang}
          onNavigate={navigateTo}
          onTakeQuiz={(slug) => navigateTo(`/quiz/${slug}`)}
        />
      );
    }

    // Grammar Concept Detail (/tieng-anh/grammar/:slug, /tieng-trung/grammar/:slug)
    const grammarDetailMatch = currentPath.match(/^\/(tieng-anh|tieng-trung)\/grammar\/([a-zA-Z0-9_-]+)$/);
    if (grammarDetailMatch) {
      const [, catSlug, conceptSlug] = grammarDetailMatch;
      const lang = catSlug === 'tieng-anh' ? 'en' : 'zh';
      return (
        <GrammarDetailPage
          slug={conceptSlug}
          language={lang}
          onNavigate={navigateTo}
          onTakeQuiz={(quizSlug) => navigateTo(`/quiz/${quizSlug}`)}
        />
      );
    }

    // 2.9 Content Engine / AI lesson library
    if (currentPath === '/content-lab') {
      return <ContentLibraryPage onNavigate={navigateTo} />;
    }

    // 3. Topic Page (/:category/:topic)
    const topicMatch = currentPath.match(/^\/(tieng-trung|tieng-anh|phat-trien-ban-than|suc-khoe-doi-song)\/([a-zA-Z0-9_-]+)$/);
    if (topicMatch) {
      const [, catSlug, topSlug] = topicMatch;
      return (
        <TopicPage
          categorySlug={catSlug}
          topicSlug={topSlug}
          onNavigate={navigateTo}
          onSelectArticle={(art) => navigateTo(`/bai-viet/${art.slug}`)}
          onSelectCourse={(c) => navigateTo(`/khoa-hoc/${c.slug}`)}
          savedItems={user.savedItems}
          onToggleBookmark={handleToggleBookmark}
        />
      );
    }

    // 4. Article Detail (/bai-viet/:slug)
    if (currentPath.startsWith('/bai-viet/')) {
      const slug = currentPath.replace('/bai-viet/', '');
      return (
        <ArticleDetailPage
          slug={slug}
          onNavigate={navigateTo}
          onSelectArticle={(art) => navigateTo(`/bai-viet/${art.slug}`)}
          onSelectCourse={(c) => navigateTo(`/khoa-hoc/${c.slug}`)}
          onStartQuiz={(quizId) => navigateTo(`/quiz/${quizId}`)}
          savedItems={user.savedItems}
          onToggleBookmark={handleToggleBookmark}
        />
      );
    }

    // 5. Course Detail (/khoa-hoc/:slug)
    if (currentPath.startsWith('/khoa-hoc/')) {
      const slug = currentPath.replace('/khoa-hoc/', '');
      return (
        <CourseDetailPage
          slug={slug}
          onNavigate={navigateTo}
          onSelectLesson={(lessonSlug) => navigateTo(`/bai-hoc/${lessonSlug}`)}
          onSelectArticle={(art) => navigateTo(`/bai-viet/${art.slug}`)}
          onStartQuiz={(quizId) => navigateTo(`/quiz/${quizId}`)}
          savedItems={user.savedItems}
          onToggleBookmark={handleToggleBookmark}
          completedLessons={user.completedLessons}
          isLoggedIn={isLoggedIn}
        />
      );
    }

    // 6. Lesson Page (/bai-hoc/:slug) - Focused learning experience
    if (currentPath.startsWith('/bai-hoc/')) {
      const slug = currentPath.replace('/bai-hoc/', '');
      return (
        <LessonDetailPage
          slug={slug}
          onNavigate={navigateTo}
          onSelectLesson={(lessonSlug) => navigateTo(`/bai-hoc/${lessonSlug}`)}
          onSelectCourse={(c) => navigateTo(`/khoa-hoc/${c.slug}`)}
          completedLessons={user.completedLessons}
          onToggleCompleteLesson={handleToggleCompleteLesson}
          savedItems={user.savedItems}
          onToggleBookmark={handleToggleBookmark}
        />
      );
    }

    // 7. Saved Items (/saved)
    if (currentPath === '/saved') {
      return (
        <SavedPage
          savedItems={user.savedItems}
          onToggleBookmark={handleToggleBookmark}
          onNavigate={navigateTo}
          onSelectArticle={(art) => navigateTo(`/bai-viet/${art.slug}`)}
          onSelectCourse={(c) => navigateTo(`/khoa-hoc/${c.slug}`)}
          onSelectLesson={(lessonSlug) => navigateTo(`/bai-hoc/${lessonSlug}`)}
        />
      );
    }

    // 8. User Dashboard (/dashboard)
    if (currentPath === '/dashboard') {
      return (
        <DashboardPage
          user={user}
          onNavigate={navigateTo}
          onSelectArticle={(art) => navigateTo(`/bai-viet/${art.slug}`)}
          onSelectCourse={(c) => navigateTo(`/khoa-hoc/${c.slug}`)}
          onSelectLesson={(lessonSlug) => navigateTo(`/bai-hoc/${lessonSlug}`)}
        />
      );
    }

    // 9. Practice Hub / Quiz Center (/luyen-tap)
    if (currentPath === '/luyen-tap') {
      return (
        <PracticeHubPage
          onNavigate={navigateTo}
          onStartQuiz={(slug) => navigateTo(`/quiz/${slug}`)}
        />
      );
    }

    // 10. Active Quiz Engine Runner (/quiz/:slug)
    if (currentPath.startsWith('/quiz/')) {
      const slug = currentPath.replace('/quiz/', '');
      return (
        <QuizRunnerPage
          quizSlug={slug}
          onNavigate={navigateTo}
          onFinishQuiz={(res) => {
            quizLearningService.recordResult(res);
            navigateTo(`/quiz-result/${res.sessionId}`);
          }}
        />
      );
    }

    // 11. Quiz Result & Detailed Review (/quiz-result/:sessionId)
    if (currentPath.startsWith('/quiz-result/')) {
      const sessionId = currentPath.replace('/quiz-result/', '');
      return (
        <QuizResultPage
          sessionId={sessionId}
          onNavigate={navigateTo}
          onRetakeQuiz={(slug) => navigateTo(`/quiz/${slug}`)}
          onPracticeWrongQuestions={(questionIds) => {
            const reviewSlug = quizService.createReviewQuiz(questionIds, 'Quiz gần nhất');
            navigateTo(`/quiz/${reviewSlug}`);
          }}
        />
      );
    }

    if (currentPath.startsWith('/quiz-mastery/')) {
      const sessionId = currentPath.replace('/quiz-mastery/', '');
      return <QuizMasteryPage sessionId={sessionId} onNavigate={navigateTo} />;
    }

    // 12. Question Bank Explorer (/ngan-hang-cau-hoi)
    if (currentPath === '/ngan-hang-cau-hoi') {
      return (
        <QuestionBankPage
          onNavigate={navigateTo}
          onPracticeQuiz={(slug) => navigateTo(`/quiz/${slug}`)}
        />
      );
    }

    // Phase 5 — Listening + Speaking
    if (currentPath === '/tieng-anh/listening' || currentPath === '/tieng-trung/listening') {
      const language = currentPath.startsWith('/tieng-anh') ? 'en' : 'zh';
      return <ListeningLabPage language={language} onNavigate={navigateTo} />;
    }
    const listeningMatch = currentPath.match(/^\/(tieng-anh|tieng-trung)\/listening\/([a-zA-Z0-9_-]+)$/);
    if (listeningMatch) {
      const language = listeningMatch[1] === 'tieng-anh' ? 'en' : 'zh';
      return <ListeningLessonPage language={language} slug={listeningMatch[2]} onNavigate={navigateTo} />;
    }
    if (currentPath === '/tieng-anh/speaking' || currentPath === '/tieng-trung/speaking') {
      const language = currentPath.startsWith('/tieng-anh') ? 'en' : 'zh';
      return <SpeakingLabPage language={language} onNavigate={navigateTo} />;
    }
    const speakingMatch = currentPath.match(/^\/(tieng-anh|tieng-trung)\/speaking\/([a-zA-Z0-9_-]+)$/);
    if (speakingMatch) {
      const language = speakingMatch[1] === 'tieng-anh' ? 'en' : 'zh';
      return <SpeakingPracticePage language={language} slug={speakingMatch[2]} onNavigate={navigateTo} />;
    }

    // Phase 6 — Reading + Writing + AI Tutor
    if (currentPath === '/tieng-anh/reading' || currentPath === '/tieng-trung/reading') {
      const language = currentPath.startsWith('/tieng-anh') ? 'en' : 'zh';
      return <ReadingLabPage language={language} onNavigate={navigateTo} />;
    }
    const readingMatch = currentPath.match(/^\/(tieng-anh|tieng-trung)\/reading\/([a-zA-Z0-9_-]+)$/);
    if (readingMatch) {
      const language = readingMatch[1] === 'tieng-anh' ? 'en' : 'zh';
      return <ReadingPracticePage language={language} slug={readingMatch[2]} onNavigate={navigateTo} />;
    }
    if (currentPath === '/tieng-anh/writing' || currentPath === '/tieng-trung/writing') {
      const language = currentPath.startsWith('/tieng-anh') ? 'en' : 'zh';
      return <WritingLabPage language={language} onNavigate={navigateTo} />;
    }
    const writingMatch = currentPath.match(/^\/(tieng-anh|tieng-trung)\/writing\/([a-zA-Z0-9_-]+)$/);
    if (writingMatch) {
      const language = writingMatch[1] === 'tieng-anh' ? 'en' : 'zh';
      return <WritingPracticePage language={language} slug={writingMatch[2]} onNavigate={navigateTo} />;
    }
    if (currentPath === '/ai-tutor') return <AITutorPage />;

    // 13. 404 Not Found Page
    return <NotFoundPage onNavigateHome={() => navigateTo('/')} />;
  };

  // Focused learning mode without regular navigation bar/footer
  const isLessonMode = currentPath.startsWith('/bai-hoc/');
  const isQuizRunnerMode = currentPath.startsWith('/quiz/');
  const isDistractionFreeMode = isLessonMode || isQuizRunnerMode;

  return (
    <div className="min-h-screen bg-[#050505] text-[#FFFFFF] flex flex-col font-sans selection:bg-[#D9FF3F] selection:text-black">
      
      {/* Top Fixed Header (Hidden on Focused Mode for distraction-free learning) */}
      {!isDistractionFreeMode && (
        <Header
          currentPath={currentPath}
          onNavigate={navigateTo}
          onOpenSearch={() => setIsSearchOpen(true)}
          isLoggedIn={isLoggedIn}
          onToggleLogin={() => setIsLoggedIn(!isLoggedIn)}
          savedCount={user.savedItems.length}
        />
      )}

      {/* Main Content View */}
      <main className="flex-1">{renderRoute()}</main>

      {/* Global Footer (Hidden on Focused Mode) */}
      {!isDistractionFreeMode && <Footer onNavigate={navigateTo} />}

      {/* Fullscreen Search Overlay */}
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectArticle={(art) => navigateTo(`/bai-viet/${art.slug}`)}
        onSelectCourse={(course) => navigateTo(`/khoa-hoc/${course.slug}`)}
        onSelectLesson={(lessonSlug) => navigateTo(`/bai-hoc/${lessonSlug}`)}
        onSelectQuiz={(quizId) => {
          setIsSearchOpen(false);
          navigateTo(`/quiz/${quizId}`);
        }}
        onNavigate={navigateTo}
      />

      {/* Interactive Quiz Runner Modal */}
      <QuizModal
        quizId={activeQuizId}
        onClose={() => setActiveQuizId(null)}
      />

    </div>
  );
}
