import React, { useEffect, useState } from 'react';
import { Lesson, Course, SavedItem } from '../types';
import { LESSONS } from '../data/lessons';
import { contentService } from '../services/contentService';
import { spacedReviewService } from '../services/spacedReviewService';
import { COURSES } from '../data/courses';
import { BookmarkButton } from '../components/BookmarkButton';
import { 
  ArrowLeft, ArrowRight, CheckCircle2, Play, Pause, Volume2, Sparkles, Film, Clock3, 
  HelpCircle, ChevronDown, BookOpen, Check, Award, AlertCircle 
} from 'lucide-react';

interface LessonDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
  onSelectLesson: (lessonSlug: string) => void;
  onSelectCourse: (course: Course) => void;
  completedLessons: string[];
  onToggleCompleteLesson: (lessonSlug: string) => void;
  savedItems: SavedItem[];
  onToggleBookmark: (item: SavedItem) => void;
}

export const LessonDetailPage: React.FC<LessonDetailPageProps> = ({
  slug,
  onNavigate,
  onSelectLesson,
  onSelectCourse,
  completedLessons,
  onToggleCompleteLesson,
  savedItems,
  onToggleBookmark,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [selectedExerciseOption, setSelectedExerciseOption] = useState<number | null>(null);
  const [exerciseSubmitted, setExerciseSubmitted] = useState(false);
  const [mobileSyllabusOpen, setMobileSyllabusOpen] = useState(false);
  const [videoSceneIndex, setVideoSceneIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [, setReviewRefresh] = useState(0);

  const lesson = LESSONS.find((l) => l.slug === slug) || LESSONS[0];
  const course = COURSES.find((c) => c.slug === lesson.courseSlug) || COURSES[0];

  const isCompleted = completedLessons.includes(lesson.slug);
  const isSaved = savedItems.some((s) => s.slug === lesson.slug);
  const contentBlueprint = contentService.getBlueprint(lesson.slug);
  const video = contentBlueprint?.aiVideo;
  const activeVideoScene = video?.scenes[videoSceneIndex];
  const ecosystemLinks = contentService.getEcosystemLinks(lesson.slug).filter((link) => link.kind !== 'course');
  const reviewItems = spacedReviewService.getForLesson(lesson.slug);
  const now = Date.now();

  useEffect(() => {
    if (!isVideoPlaying || !video || !activeVideoScene) return;
    const timer = window.setTimeout(() => {
      if (videoSceneIndex >= video.scenes.length - 1) setIsVideoPlaying(false);
      else setVideoSceneIndex((index) => index + 1);
    }, activeVideoScene.durationSeconds * 1000);
    return () => window.clearTimeout(timer);
  }, [isVideoPlaying, video, activeVideoScene, videoSceneIndex]);

  const speakVideoScene = () => {
    if (!activeVideoScene || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(activeVideoScene.narration);
    utterance.lang = video?.voiceLanguage === 'en' ? 'en-US' : video?.voiceLanguage === 'zh' ? 'zh-CN' : 'vi-VN';
    utterance.rate = 0.96;
    window.speechSynthesis.speak(utterance);
  };

  // Flatten course lessons for sidebar
  const allCourseLessons = course.modules.flatMap((m) => m.lessons);
  const currentLessonIndex = allCourseLessons.findIndex((l) => l.slug === lesson.slug);
  const progressPercent = Math.round(((currentLessonIndex + 1) / allCourseLessons.length) * 100);

  const handleExerciseSubmit = () => {
    if (selectedExerciseOption !== null) {
      setExerciseSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col font-sans">
      
      {/* Minimalist Top App Bar for Focused Learning */}
      <header className="sticky top-0 z-40 bg-[#050505]/95 backdrop-blur-md border-b border-[#1C1C1C] py-3.5 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Back to Course */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onSelectCourse(course)}
              className="flex items-center gap-2 text-xs font-mono text-[#888] hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">VỀ KHÓA HỌC:</span>
              <span className="text-white font-bold truncate max-w-[180px] sm:max-w-xs">{course.title}</span>
            </button>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center gap-3 sm:gap-6">
            <div className="flex items-center gap-2 text-xs font-mono text-[#888]">
              <span className="hidden md:inline">TIẾN ĐỘ:</span>
              <span className="text-white font-bold">BÀI {currentLessonIndex + 1} / {allCourseLessons.length}</span>
              <span className="text-[#D9FF3F] font-bold">({progressPercent}%)</span>
            </div>

            {/* Mobile Syllabus Toggle Button */}
            <button
              onClick={() => setMobileSyllabusOpen(!mobileSyllabusOpen)}
              className="lg:hidden px-3 py-1.5 bg-[#141414] border border-[#262626] rounded text-xs font-mono text-white flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#D9FF3F]" />
              <span>Mục lục</span>
            </button>

            {/* Bookmark button */}
            <BookmarkButton
              item={{
                id: `save-les-${lesson.id}`,
                type: 'lesson',
                title: lesson.title,
                slug: lesson.slug,
                category: lesson.categoryName,
                savedAt: 'Hôm nay',
                meta: lesson.duration,
              }}
              isBookmarked={isSaved}
              onToggle={onToggleBookmark}
            />
          </div>

        </div>

        {/* Progress Bar line */}
        <div className="w-full h-1 bg-[#1A1A1A] absolute bottom-0 left-0 right-0">
          <div
            className="h-full bg-[#D9FF3F] transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </header>

      {/* Main Learning Canvas Layout */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-5 sm:px-8 py-8 sm:py-12 flex flex-col lg:flex-row gap-10">
        
        {/* Main Content Column (70%) */}
        <main className="flex-1 max-w-3xl">
          
          {/* Header */}
          <div className="pb-8 mb-8 border-b border-[#1E1E1E]">
            <div className="flex items-center gap-3 text-xs font-mono text-[#777] mb-2">
              <span className="text-[#D9FF3F] uppercase font-bold">{lesson.categoryName}</span>
              <span>·</span>
              <span>Thời lượng học: {lesson.duration}</span>
              {isCompleted && (
                <>
                  <span>·</span>
                  <span className="text-[#D9FF3F] font-bold flex items-center gap-1">
                    <Check className="w-3 h-3" /> Đã hoàn thành
                  </span>
                </>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.1] mb-4 font-display">
              {lesson.title}
            </h1>

            <p className="text-sm sm:text-base text-[#9A9A9A] leading-relaxed">
              {lesson.summary}
            </p>
          </div>

          {/* AI Visual Lesson — content-first video layer */}
          {video && activeVideoScene && (
            <section className="mb-10 overflow-hidden rounded-2xl border border-[#292929] bg-[#0A0A0A] shadow-[0_20px_70px_rgba(0,0,0,0.35)]">
              <div className="flex items-center justify-between gap-4 border-b border-[#202020] px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#D9FF3F] text-black"><Sparkles className="h-4 w-4" /></div>
                  <div><div className="text-[10px] font-mono font-bold tracking-[0.18em] text-[#D9FF3F]">BENSOP AI VISUAL LESSON</div><h2 className="mt-1 text-sm font-bold text-white sm:text-base">{video.title}</h2></div>
                </div>
                <div className="hidden items-center gap-3 text-[10px] font-mono text-[#666] sm:flex"><span className="flex items-center gap-1"><Clock3 className="h-3.5 w-3.5" /> {video.targetMinutes} phút</span><span className="flex items-center gap-1"><Film className="h-3.5 w-3.5" /> SCRIPT READY</span></div>
              </div>
              <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
                <div className="relative min-h-[330px] overflow-hidden border-b border-[#202020] bg-[#111] p-6 lg:border-b-0 lg:border-r">
                  <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(#242424_1px,transparent_1px),linear-gradient(90deg,#242424_1px,transparent_1px)] [background-size:32px_32px]" />
                  <div className="relative flex h-full min-h-[280px] flex-col justify-between">
                    <div className="flex items-center justify-between text-[10px] font-mono text-[#666]"><span>SCENE {videoSceneIndex + 1} / {video.scenes.length}</span><span>{activeVideoScene.durationSeconds}s</span></div>
                    <div className="my-8">
                      <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#303030] bg-[#0B0B0B] px-3 py-1 text-[10px] font-mono text-[#D9FF3F]"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#D9FF3F]" /> AI STORYBOARD</div>
                      <h3 className="max-w-xl text-2xl font-black leading-tight text-white sm:text-3xl">{activeVideoScene.visual}</h3>
                      <p className="mt-5 max-w-xl text-sm leading-relaxed text-[#999]">{activeVideoScene.narration}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">{activeVideoScene.onScreen.map((label) => <span key={label} className="rounded-md border border-[#2D2D2D] bg-[#0C0C0C] px-3 py-2 text-[10px] font-mono font-bold text-white">{label}</span>)}</div>
                  </div>
                </div>
                <div className="p-5 sm:p-6">
                  <div className="mb-5 flex gap-2">
                    <button onClick={() => { setIsVideoPlaying((playing) => !playing); if (!isVideoPlaying) speakVideoScene(); }} className="flex items-center gap-2 rounded-lg bg-[#D9FF3F] px-4 py-2.5 text-xs font-extrabold text-black transition hover:bg-[#cbf532]">{isVideoPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-current" />}{isVideoPlaying ? 'TẠM DỪNG' : 'XEM BÀI GIẢNG'}</button>
                    <button onClick={speakVideoScene} className="rounded-lg border border-[#2C2C2C] px-3 py-2.5 text-xs font-bold text-white hover:border-[#555]">🔊 Nghe lời thoại</button>
                  </div>
                  <div className="mb-5 h-1.5 overflow-hidden rounded-full bg-[#202020]"><div className="h-full bg-[#D9FF3F] transition-all" style={{ width: ((videoSceneIndex + 1) / video.scenes.length * 100) + '%' }} /></div>
                  <div className="space-y-2">
                    {video.scenes.map((scene, index) => (
                      <button key={scene.id} onClick={() => { setVideoSceneIndex(index); setIsVideoPlaying(false); }} className={"w-full rounded-lg border p-3 text-left transition " + (index === videoSceneIndex ? 'border-[#D9FF3F] bg-[#171717]' : 'border-[#222] bg-[#0D0D0D] hover:border-[#3A3A3A]')}>
                        <div className="flex items-center justify-between gap-3"><span className={"text-[10px] font-mono font-bold " + (index === videoSceneIndex ? 'text-[#D9FF3F]' : 'text-[#666]')}>SCENE {index + 1}</span><span className="text-[10px] font-mono text-[#555]">{scene.durationSeconds}s</span></div>
                        <div className="mt-1 line-clamp-2 text-xs text-[#AAA]">{scene.onScreen.join(' · ')}</div>
                      </button>
                    ))}
                  </div>
                  {activeVideoScene.interaction && <div className="mt-5 border-l-2 border-[#D9FF3F] bg-[#121212] p-3 text-[11px] leading-relaxed text-[#CCC]"><span className="font-bold text-[#D9FF3F]">THỬ NGAY · </span>{activeVideoScene.interaction}</div>}
                  <p className="mt-5 text-[10px] leading-relaxed text-[#555]">Pipeline video: script → visual scenes → AI voice → motion → subtitles → checkpoint → export. Khi có file video thật, chỉ cần gắn vào <span className="text-[#888]">videoUrl</span>.</p>
                </div>
              </div>
            </section>
          )}
          {contentBlueprint && (
            <section className="mb-10 space-y-5">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-[#252525] bg-[#0B0B0B] p-5">
                  <div className="mb-3 text-[10px] font-mono font-bold tracking-[0.18em] text-[#D9FF3F]">SAU BÀI NÀY, BẠN LÀM ĐƯỢC</div>
                  <ul className="space-y-2.5">
                    {contentBlueprint.learningObjective.map((item) => (
                      <li key={item} className="flex gap-2 text-xs leading-relaxed text-[#CCC]"><CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#D9FF3F]" />{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl border border-[#252525] bg-[#0B0B0B] p-5">
                  <div className="mb-3 text-[10px] font-mono font-bold tracking-[0.18em] text-[#D9FF3F]">CORE IDEA</div>
                  <p className="text-sm leading-relaxed text-[#AAA]">{contentBlueprint.coreIdea}</p>
                  <div className="mt-4 border-l-2 border-[#333] pl-3 text-[11px] leading-relaxed text-[#777]">
                    <span className="font-bold text-[#999]">DỄ NHẦM: </span>{contentBlueprint.misconception}
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-[#252525] bg-[#0B0B0B] p-5">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <div className="text-[10px] font-mono font-bold tracking-[0.18em] text-[#D9FF3F]">THỬ THÁCH THỰC HÀNH</div>
                  <span className="text-[9px] font-mono text-[#555]">DO → MEASURE → REVIEW</span>
                </div>
                <p className="text-sm leading-relaxed text-[#CCC]">{contentBlueprint.practicalChallenge}</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-[#252525] bg-[#0B0B0B] p-5">
                  <div className="mb-3 text-[10px] font-mono font-bold tracking-[0.18em] text-[#D9FF3F]">SPACED REVIEW</div>
                  <div className="space-y-2">
                    {contentBlueprint.spacedReview.map((item, index) => (
                      <div key={item} className="flex gap-3 text-xs text-[#AAA]"><span className="font-mono font-bold text-[#555]">0{index + 1}</span><span>{item}</span></div>
                    ))}
                  </div>
                  {reviewItems.length > 0 && (
                    <div className="mt-4 border-t border-[#1D1D1D] pt-4">
                      <div className="mb-2 text-[9px] font-mono font-bold tracking-[0.16em] text-[#666]">LỊCH ÔN TẬP ĐÃ KÍCH HOẠT</div>
                      <div className="space-y-2">
                        {reviewItems.map((item) => {
                          const due = new Date(item.dueAt);
                          const isDue = !item.completedAt && due.getTime() <= now;
                          return (
                            <div key={item.id} className="flex items-center justify-between gap-3 rounded-lg border border-[#202020] bg-[#101010] px-3 py-2">
                              <div>
                                <div className="text-[10px] font-bold text-white">Sau {item.intervalDays} ngày</div>
                                <div className="text-[9px] font-mono text-[#555]">
                                  {item.completedAt ? 'ĐÃ ÔN' : isDue ? 'ĐẾN HẠN' : due.toLocaleDateString('vi-VN')}
                                </div>
                              </div>
                              {isDue && (
                                <button
                                  onClick={() => { spacedReviewService.markComplete(item.id); setReviewRefresh((v) => v + 1); }}
                                  className="rounded-md border border-[#D9FF3F] px-2.5 py-1.5 text-[9px] font-bold text-[#D9FF3F] hover:bg-[#D9FF3F] hover:text-black"
                                >
                                  ĐÁNH DẤU ĐÃ ÔN
                                </button>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
                <div className="rounded-xl border border-[#252525] bg-[#0B0B0B] p-5">
                  <div className="mb-3 text-[10px] font-mono font-bold tracking-[0.18em] text-[#D9FF3F]">BENSOP ECOSYSTEM</div>
                  <div className="flex flex-wrap gap-2">
                    {contentBlueprint.crossLabLinks.map((item) => (
                      <span key={item} className="rounded-md border border-[#292929] bg-[#111] px-2.5 py-1.5 text-[10px] text-[#AAA]">{item}</span>
                    ))}
                  </div>
                  {ecosystemLinks.length > 0 && (
                    <div className="mt-4 border-t border-[#1D1D1D] pt-4">
                      <div className="mb-2 text-[9px] font-mono font-bold tracking-[0.16em] text-[#555]">ĐI TIẾP TỪ BÀI NÀY</div>
                      <div className="flex flex-wrap gap-2">
                        {ecosystemLinks.map((link) => (
                          <button
                            key={link.kind}
                            onClick={() => onNavigate(link.path)}
                            className="rounded-md border border-[#2D2D2D] bg-[#151515] px-3 py-2 text-[10px] font-bold text-[#D9FF3F] transition hover:border-[#D9FF3F]"
                          >
                            {link.label} →
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <details className="rounded-xl border border-[#202020] bg-[#090909] p-4">
                <summary className="cursor-pointer list-none text-[10px] font-mono font-bold tracking-[0.18em] text-[#777]">NGUỒN & BIÊN SOẠN BENSOP</summary>
                <div className="mt-4 space-y-3">
                  {contentBlueprint.sources.map((source) => (
                    <div key={source.title} className="flex flex-col gap-1 border-b border-[#181818] pb-3 last:border-0 last:pb-0">
                      <div className="text-xs font-bold text-[#CCC]">{source.title}</div>
                      <div className="text-[10px] font-mono text-[#555]">{source.publisher} · {source.usage}</div>
                      <a href={source.url} target="_blank" rel="noreferrer" className="text-[10px] text-[#777] hover:text-[#D9FF3F]">{source.url}</a>
                    </div>
                  ))}
                </div>
              </details>
            </section>
          )}

          {/* Interactive Audio Simulation Player */}
          <div className="p-4 sm:p-5 bg-[#0E0E0E] border border-[#222] rounded-xl mb-10 flex items-center justify-between gap-4 shadow-lg">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                  isPlayingAudio
                    ? 'bg-[#D9FF3F] text-black shadow-[0_0_15px_rgba(217,255,63,0.3)]'
                    : 'bg-[#181818] border border-[#333] text-white hover:border-[#D9FF3F]'
                }`}
                title="Nghe phát âm chuẩn bản ngữ"
              >
                {isPlayingAudio ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
              </button>
              <div>
                <span className="text-xs font-bold text-white block">
                  Bản ghi âm hướng dẫn phát âm chuẩn
                </span>
                <span className="text-[11px] font-mono text-[#777]">
                  {isPlayingAudio ? 'Đang phát âm thanh mẫu...' : 'Nhấn để nghe giảng giải và audio phát âm mẫu'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-[#666]">
              <Volume2 className="w-4 h-4 text-[#D9FF3F]" />
              <span className="hidden sm:inline">Studio Audio 320kbps</span>
            </div>
          </div>

          {/* Body Content Paragraphs */}
          <div className="space-y-6 text-base text-[#D0D0D0] leading-relaxed mb-12">
            {lesson.content.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Key Points Callout */}
          <div className="p-6 bg-[#0E0E0E] border-l-2 border-[#D9FF3F] rounded-r-xl mb-12">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#D9FF3F] font-bold mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              ĐIỂM THEN CHỐT CỦA BÀI HỌC:
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-[#CCC]">
              {lesson.keyPoints.map((pt, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#D9FF3F] font-mono font-bold">•</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Practical Examples */}
          <div className="mb-12">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#777] font-bold mb-4">
              VÍ DỤ THỰC TẾ & PHÂN TÍCH ÂM
            </h3>
            <div className="space-y-3">
              {lesson.examples.map((ex, i) => (
                <div key={i} className="p-4 bg-[#111111] border border-[#222] rounded-xl">
                  <div className="flex items-baseline justify-between mb-1.5">
                    <span className="text-xs font-mono text-[#D9FF3F] uppercase">{ex.label}</span>
                    <strong className="text-base text-white">{ex.target}</strong>
                  </div>
                  <div className="text-xs text-[#AAA] mb-1">
                    Nghĩa: {ex.translation}
                  </div>
                  {ex.note && (
                    <div className="text-[11px] font-mono text-[#888] pt-2 border-t border-[#1C1C1C]">
                      💡 {ex.note}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Checkpoint Exercise */}
          {lesson.exercise && (
            <div className="p-6 sm:p-8 bg-[#0E0E0E] border border-[#262626] rounded-2xl mb-14">
              <div className="flex items-center gap-2 text-xs font-mono text-[#D9FF3F] mb-3 uppercase tracking-wider">
                <HelpCircle className="w-4 h-4" />
                <span>CHECKPOINT BÀI HỌC (KIỂM TRA TỨC THÌ)</span>
              </div>

              <h4 className="text-lg font-bold text-white mb-6">
                {lesson.exercise.question}
              </h4>

              <div className="space-y-3 mb-6">
                {lesson.exercise.options.map((opt, optIdx) => {
                  const isSelected = selectedExerciseOption === optIdx;
                  const isCorrect = optIdx === lesson.exercise!.correctIndex;

                  let optClass = 'bg-[#141414] border-[#222] text-[#CCC] hover:border-[#444]';
                  if (exerciseSubmitted) {
                    if (isCorrect) optClass = 'bg-[#142D14] border-[#D9FF3F] text-white';
                    else if (isSelected && !isCorrect) optClass = 'bg-[#2E1414] border-red-500 text-red-200';
                    else optClass = 'bg-[#141414] border-[#222] text-[#555] opacity-50';
                  } else if (isSelected) {
                    optClass = 'bg-[#1C1C1C] border-[#D9FF3F] text-white';
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={exerciseSubmitted}
                      onClick={() => setSelectedExerciseOption(optIdx)}
                      className={`w-full text-left p-3.5 rounded-lg border text-xs sm:text-sm font-medium transition-all flex items-start gap-3 cursor-pointer ${optClass}`}
                    >
                      <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] font-mono shrink-0 mt-0.5">
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span className="flex-1">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {exerciseSubmitted && (
                <div className="p-4 bg-[#141414] border-l-2 border-[#D9FF3F] rounded-r-lg mb-6 text-xs text-[#CCC]">
                  <strong className="text-white block mb-1">Giải thích đáp án:</strong>
                  {lesson.exercise.explanation}
                </div>
              )}

              {!exerciseSubmitted ? (
                <button
                  disabled={selectedExerciseOption === null}
                  onClick={handleExerciseSubmit}
                  className="px-5 py-2.5 bg-[#D9FF3F] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#cbf532] text-black font-extrabold text-xs tracking-tight rounded transition-all cursor-pointer"
                >
                  Xác nhận câu trả lời
                </button>
              ) : (
                <div className="text-xs font-mono text-[#D9FF3F] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Đã kiểm tra thành công! Hãy hoàn thành bài học bên dưới.</span>
                </div>
              )}
            </div>
          )}

          {/* Blueprint-driven ecosystem routing: the lesson now hands the learner directly into the next practice surface. */}
          {contentBlueprint && ecosystemLinks.length > 0 && (
            <div className="mb-10 rounded-2xl border border-[#222] bg-[#0B0B0B] p-6">
              <div className="mb-4">
                <span className="text-[10px] font-mono font-bold tracking-[0.18em] text-[#D9FF3F]">LEARN → PRACTICE → REVIEW</span>
                <h4 className="mt-2 text-lg font-black text-white">Không dừng ở bài đọc — đi thẳng vào kỹ năng tiếp theo.</h4>
                <p className="mt-2 max-w-2xl text-xs leading-relaxed text-[#777]">
                  Bensop dùng chính blueprint của lesson để nối nội dung với lab phù hợp, giúp người học chuyển từ hiểu khái niệm sang thực hành và kiểm tra.
                </p>
              </div>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {ecosystemLinks.map((link) => (
                  <button
                    key={link.kind}
                    onClick={() => onNavigate(link.path)}
                    className="group rounded-xl border border-[#242424] bg-[#111] p-4 text-left transition hover:border-[#D9FF3F]"
                  >
                    <div className="text-xs font-bold text-white group-hover:text-[#D9FF3F]">{link.label}</div>
                    <div className="mt-1 text-[10px] font-mono text-[#555]">MỞ MODULE →</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quick Learning Lab Integration (Phase 4) */}
          {(lesson.categoryId === 'tieng-anh' || lesson.categoryId === 'tieng-trung') && (
            <div className="p-6 rounded-2xl bg-[#0F0F0F] border border-[#222] mb-10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono text-[#D9FF3F] uppercase tracking-wider block mb-1">
                  BENSOP INTERACTIVE LABS
                </span>
                <h4 className="text-base font-bold text-white">
                  Luyện tập chuyên sâu với Vocabulary & Grammar Lab
                </h4>
                <p className="text-xs text-[#888] mt-1">
                  Ghi nhớ từ vựng qua Spaced Repetition và làm chủ cấu trúc ngữ pháp thông qua câu hỏi thực chiến.
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => onNavigate(`/${lesson.categoryId}/vocabulary`)}
                  className="px-4 py-2 bg-[#181818] hover:bg-[#242424] text-white border border-[#2F2F2F] text-xs font-mono rounded-lg transition-colors cursor-pointer"
                >
                  Từ vựng Lab →
                </button>
                <button
                  onClick={() => onNavigate(`/${lesson.categoryId}/grammar`)}
                  className="px-4 py-2 bg-[#D9FF3F] hover:bg-[#cbf532] text-black font-bold text-xs font-mono rounded-lg transition-colors cursor-pointer"
                >
                  Ngữ pháp Lab →
                </button>
              </div>
            </div>
          )}

          {/* Bottom Actions Bar */}
          <div className="pt-8 border-t border-[#1E1E1E] flex flex-col sm:flex-row items-center justify-between gap-4">
            {lesson.prevLessonSlug ? (
              <button
                onClick={() => onSelectLesson(lesson.prevLessonSlug!)}
                className="w-full sm:w-auto px-5 py-3 bg-[#111] hover:bg-[#1C1C1C] border border-[#242424] text-xs font-bold rounded flex items-center justify-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Bài trước</span>
              </button>
            ) : <div />}

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <button
                onClick={() => onToggleCompleteLesson(lesson.slug)}
                className={`px-5 py-3 rounded text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  isCompleted
                    ? 'bg-[#181818] border border-[#D9FF3F]/50 text-[#D9FF3F]'
                    : 'bg-[#181818] border border-[#333] text-white hover:border-white'
                }`}
              >
                <Check className="w-4 h-4" />
                <span>{isCompleted ? 'ĐÃ HOÀN THÀNH' : 'ĐÁNH DẤU HOÀN THÀNH'}</span>
              </button>

              {lesson.nextLessonSlug && (
                <button
                  onClick={() => {
                    if (!isCompleted) onToggleCompleteLesson(lesson.slug);
                    onSelectLesson(lesson.nextLessonSlug!);
                  }}
                  className="px-6 py-3 bg-[#D9FF3F] hover:bg-[#cbf532] text-black font-extrabold text-xs tracking-tight rounded transition-all cursor-pointer flex items-center gap-2 shadow-[0_0_20px_rgba(217,255,63,0.15)]"
                >
                  <span>BÀI TIẾP THEO</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

        </main>

        {/* Sidebar Syllabus (Desktop & Mobile Drawer) */}
        <aside
          className={`lg:w-80 shrink-0 ${
            mobileSyllabusOpen
              ? 'fixed inset-0 z-50 bg-[#050505] p-6 overflow-y-auto block'
              : 'hidden lg:block'
          }`}
        >
          {mobileSyllabusOpen && (
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-[#222]">
              <h3 className="font-bold text-white">Mục lục khóa học</h3>
              <button
                onClick={() => setMobileSyllabusOpen(false)}
                className="text-xs text-[#D9FF3F] underline"
              >
                Đóng lại
              </button>
            </div>
          )}

          <div className="sticky top-20 bg-[#0E0E0E] border border-[#222] rounded-xl p-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#1C1C1C] mb-4">
              <span className="text-xs font-mono text-[#D9FF3F] uppercase font-bold">
                GIÁO TRÌNH
              </span>
              <span className="text-[11px] font-mono text-[#666]">
                {completedLessons.length} / {allCourseLessons.length} bài
              </span>
            </div>

            <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
              {course.modules.map((m, mIdx) => (
                <div key={mIdx}>
                  <div className="text-[11px] font-mono text-[#777] uppercase mb-2">
                    Phần 0{mIdx + 1}: {m.title.replace(/^Phần \d+: /, '')}
                  </div>
                  <div className="space-y-1 pl-2 border-l border-[#222]">
                    {m.lessons.map((les, lIdx) => {
                      const isCurrent = les.slug === lesson.slug;
                      const isLesDone = completedLessons.includes(les.slug);

                      return (
                        <button
                          key={lIdx}
                          onClick={() => {
                            onSelectLesson(les.slug);
                            setMobileSyllabusOpen(false);
                          }}
                          className={`w-full text-left p-2 rounded text-xs transition-colors flex items-center justify-between gap-2 cursor-pointer ${
                            isCurrent
                              ? 'bg-[#181818] text-[#D9FF3F] font-bold border-l-2 border-[#D9FF3F]'
                              : 'text-[#888] hover:text-white hover:bg-[#141414]'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            {isLesDone ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#D9FF3F] shrink-0" />
                            ) : (
                              <span className="w-1.5 h-1.5 rounded-full bg-[#444] shrink-0" />
                            )}
                            <span className="truncate">{les.title}</span>
                          </div>
                          <span className="text-[10px] font-mono text-[#555] shrink-0">{les.duration}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </aside>

      </div>
    </div>
  );
};
