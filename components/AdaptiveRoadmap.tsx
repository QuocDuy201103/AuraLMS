'use client';

import React from 'react';
import Link from 'next/link';
import { Student, Lesson, INITIAL_LESSONS } from '@/lib/store';
import { CheckCircle2, Lock, Play, GitBranch, Sparkles, ChevronRight, Clock } from 'lucide-react';

interface AdaptiveRoadmapProps {
  student: Student;
}

export default function AdaptiveRoadmap({ student }: AdaptiveRoadmapProps) {
  const isUnlocked = (lessonId: string) => student.unlockedLessons.includes(lessonId);
  const isCompleted = (lessonId: string) => student.completedLessons.includes(lessonId);

  const getLessonById = (id: string) => INITIAL_LESSONS.find((l) => l.id === id);

  const lesson1 = getLessonById('lesson-1')!;
  const lesson2 = getLessonById('lesson-2')!;
  const lesson2Ref = getLessonById('lesson-2-ref')!;
  const lesson3 = getLessonById('lesson-3')!;
  const lesson3Boost = getLessonById('lesson-3-boost')!;
  const lesson4Adv = getLessonById('lesson-4-adv')!;
  const lesson5Proj = getLessonById('lesson-5-proj')!;

  const getBadgeStyle = (type: Lesson['tierType']) => {
    switch (type) {
      case 'refresher':
        return { label: '🌿 Bổ Trợ (Vy)', border: 'border-emerald-500/50 bg-emerald-950/60 text-emerald-300' };
      case 'boost':
        return { label: '⚡ Tăng Tốc (Nam)', border: 'border-indigo-500/50 bg-indigo-950/60 text-indigo-300' };
      case 'advanced':
        return { label: '💎 Chuyên Sâu (Anh)', border: 'border-fuchsia-500/50 bg-fuchsia-950/60 text-fuchsia-300' };
      default:
        return { label: '🌳 Thân Cây Chính', border: 'border-slate-700 bg-slate-900/90 text-slate-200' };
    }
  };

  const renderNodeCard = (lesson: Lesson) => {
    const unlocked = isUnlocked(lesson.id);
    const completed = isCompleted(lesson.id);
    const badge = getBadgeStyle(lesson.tierType);

    return (
      <div
        key={lesson.id}
        className={`relative z-10 p-4 sm:p-5 rounded-2xl transition-all duration-300 border glass-panel backdrop-blur-md shadow-xl flex flex-col justify-between h-full ${
          completed
            ? 'bg-emerald-950/30 border-emerald-500/50 shadow-emerald-500/10 hover:scale-[1.01]'
            : unlocked
            ? 'bg-slate-900/90 border-slate-700 hover:border-emerald-500/60 hover:scale-[1.01]'
            : 'bg-slate-950/60 border-slate-800/80 opacity-60'
        }`}
      >
        <div className="space-y-3">
          {/* Card Top Row */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              {completed ? (
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
              ) : unlocked ? (
                <div className="w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-400 flex items-center justify-center shrink-0">
                  <Play className="w-3.5 h-3.5 text-indigo-400 ml-0.5" />
                </div>
              ) : (
                <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
                  <Lock className="w-3.5 h-3.5 text-slate-500" />
                </div>
              )}

              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border whitespace-nowrap shrink-0 ${badge.border}`}>
                {badge.label}
              </span>
            </div>

            <span className="text-[10px] text-slate-400 font-mono whitespace-nowrap shrink-0 flex items-center gap-1">
              <Clock className="w-3 h-3" /> {lesson.timeEstimate}
            </span>
          </div>

          {/* Title & Description */}
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-100 mb-1 leading-snug line-clamp-2">
              {lesson.title}
            </h3>
            <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2">
              {lesson.description}
            </p>
          </div>
        </div>

        {/* Card Footer */}
        <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-800/80 gap-2">
          <span className="text-[10px] text-slate-400 shrink-0">
            Độ khó: <strong className="text-slate-200">{lesson.difficulty}</strong>
          </span>
          {unlocked ? (
            <Link
              href={`/lessons/${lesson.id}`}
              className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-emerald-500 to-indigo-600 hover:from-emerald-400 hover:to-indigo-500 text-slate-950 font-bold text-[11px] flex items-center gap-1 transition-all shadow-md shadow-emerald-500/20 shrink-0"
            >
              <span>{completed ? 'Xem Bài' : 'Học Ngay'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          ) : (
            <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-500 text-[10px] font-medium flex items-center gap-1 shrink-0">
              <Lock className="w-3 h-3" /> Đã khóa
            </span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="glass-panel p-4 sm:p-6 lg:p-8 rounded-3xl border border-slate-800 space-y-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[450px] h-[450px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-emerald-400 shrink-0" />
            <h2 className="text-base font-bold text-slate-100">Cây Lộ Trình Học Tập Thích Ứng (Adaptive Tree Diagram)</h2>
          </div>
          <p className="text-xs text-slate-400">
            Sơ đồ rẽ nhánh tự động mở khóa các bài học bổ trợ và thử thách chuyên sâu cho <strong>{student.name}</strong>.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-[10px]">
          <span className="flex items-center gap-1 text-emerald-400 shrink-0"><CheckCircle2 className="w-3.5 h-3.5" /> Đã hoàn thành</span>
          <span className="flex items-center gap-1 text-indigo-400 shrink-0"><Play className="w-3.5 h-3.5" /> Khả dụng</span>
          <span className="flex items-center gap-1 text-slate-500 shrink-0"><Lock className="w-3.5 h-3.5" /> Đã khóa</span>
        </div>
      </div>

      {/* TREE GRAPH CONTAINER */}
      <div className="relative py-4 space-y-10">

        {/* LEVEL 1: ROOT NODE */}
        <div className="flex flex-col items-center">
          <div className="w-full max-w-lg">
            <div className="text-center mb-2">
              <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30 inline-block whitespace-nowrap">
                🌱 Gốc Cây - Bài 1 (Nhập môn)
              </span>
            </div>
            {renderNodeCard(lesson1)}
          </div>
          <div className="w-0.5 h-8 bg-gradient-to-b from-emerald-500 to-indigo-500 my-2" />
        </div>

        {/* LEVEL 2: NODE 2 & REFRESHER BRANCH */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative items-stretch max-w-5xl mx-auto">
          {/* Left Branch: Refresher Lesson (Vy) */}
          <div className="space-y-2 flex flex-col justify-between">
            <div className="text-center lg:text-left">
              <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30 inline-block whitespace-nowrap">
                🌿 Nhánh Rẽ Bổ Trợ (Học viên Vy)
              </span>
            </div>
            {renderNodeCard(lesson2Ref)}
          </div>

          {/* Main Trunk Node 2 */}
          <div className="space-y-2 flex flex-col justify-between">
            <div className="text-center lg:text-left">
              <span className="text-[10px] uppercase font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/30 inline-block whitespace-nowrap">
                🌳 Thân Cây Chính - Bài 2
              </span>
            </div>
            {renderNodeCard(lesson2)}
          </div>
        </div>

        {/* Connecting Stem */}
        <div className="flex justify-center -my-4">
          <div className="w-0.5 h-8 bg-gradient-to-b from-indigo-500 to-fuchsia-500" />
        </div>

        {/* LEVEL 3: NODE 3 & BOOST/ADVANCED BRANCHES */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative items-stretch">
          {/* Main Trunk Node 3 */}
          <div className="space-y-2 flex flex-col justify-between">
            <div className="text-center lg:text-left">
              <span className="text-[10px] uppercase font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/30 inline-block whitespace-nowrap">
                🌳 Thân Cây Chính - Bài 3
              </span>
            </div>
            {renderNodeCard(lesson3)}
          </div>

          {/* Branch 2: Boost Lesson (Nam) */}
          <div className="space-y-2 flex flex-col justify-between">
            <div className="text-center lg:text-left">
              <span className="text-[10px] uppercase font-bold text-indigo-300 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/30 inline-block whitespace-nowrap">
                ⚡ Nhánh Tăng Tốc (Học viên Nam)
              </span>
            </div>
            {renderNodeCard(lesson3Boost)}
          </div>

          {/* Branch 3: Advanced Challenge (Anh) */}
          <div className="space-y-2 flex flex-col justify-between">
            <div className="text-center lg:text-left">
              <span className="text-[10px] uppercase font-bold text-fuchsia-400 bg-fuchsia-500/10 px-2.5 py-1 rounded-full border border-fuchsia-500/30 inline-block whitespace-nowrap">
                💎 Nhánh Chuyên Sâu (Học viên Anh)
              </span>
            </div>
            {renderNodeCard(lesson4Adv)}
          </div>
        </div>

        {/* Connecting Stem */}
        <div className="flex justify-center -my-4">
          <div className="w-0.5 h-8 bg-gradient-to-b from-fuchsia-500 via-amber-400 to-emerald-400" />
        </div>

        {/* LEVEL 4: TREE CROWN / FINAL PROJECT */}
        <div className="flex flex-col items-center">
          <div className="w-full max-w-lg">
            <div className="text-center mb-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-extrabold bg-gradient-to-r from-amber-400 to-emerald-400 text-slate-950 uppercase tracking-wider inline-flex items-center gap-1 shadow-lg shadow-amber-400/20 whitespace-nowrap">
                <Sparkles className="w-3.5 h-3.5" /> Đỉnh Cây - Đồ Án Cuối Khóa
              </span>
            </div>
            {renderNodeCard(lesson5Proj)}
          </div>
        </div>

      </div>
    </div>
  );
}
