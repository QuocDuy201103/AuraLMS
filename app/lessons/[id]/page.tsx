'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { INITIAL_LESSONS } from '@/lib/store';
import { ArrowLeft, BookOpen, Send, CheckCircle2, Clock } from 'lucide-react';

export default function LessonDetailPage() {
  const router = useRouter();
  const params = useParams();
  const lessonId = params.id as string;
  const { submitStudentAssignment, currentStudent } = useApp();

  const lesson = INITIAL_LESSONS.find((l) => l.id === lessonId) || INITIAL_LESSONS[0];

  const [answer, setAnswer] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!answer.trim()) return;

    setSubmitting(true);
    await submitStudentAssignment(lesson.id, lesson.title, answer.trim());
    setSubmitting(false);
    router.push('/thank-you');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Back button */}
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-emerald-400 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Quay lại Dashboard Học Viên ({currentStudent.name})
      </Link>

      {/* Lesson Content Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        <div className="space-y-2 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              {lesson.difficulty}
            </span>
            <span className="text-[10px] text-slate-400 flex items-center gap-1">
              <Clock className="w-3 h-3" /> {lesson.timeEstimate}
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-100">{lesson.title}</h1>
          <p className="text-xs text-slate-400 leading-relaxed">{lesson.description}</p>
        </div>

        {/* HTML Content Body */}
        <div
          className="prose prose-invert prose-xs text-slate-300 max-w-none space-y-4"
          dangerouslySetInnerHTML={{ __html: lesson.content }}
        />
      </div>

      {/* Assignment Submission Form */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-100">
          <BookOpen className="w-4 h-4 text-emerald-400" />
          <span>Bài Tập Tự Luận Thuộc Bài Học</span>
        </div>
        <p className="text-xs text-slate-400">
          Hãy trình bày câu trả lời của bạn. Sau khi nộp bài, hệ thống sẽ tự động đồng bộ vào Supabase Database, mở khóa các bài học tiếp theo trên Cây Lộ Trình Thích Ứng và gửi bài đến Bảng Điều Khiển Giáo Viên.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            rows={5}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Nhập câu trả lời hoặc đoạn mã lập trình của bạn tại đây..."
            className="w-full p-4 rounded-xl glass-input text-xs text-slate-100 placeholder-slate-400 focus:outline-none"
            required
          />
          <button
            type="submit"
            disabled={submitting || !answer.trim()}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-indigo-600 hover:from-emerald-400 hover:to-indigo-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.01] disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            <span>{submitting ? 'Đang Lưu DB & Mở Khóa Lộ Trình...' : 'Nộp Bài Tập & Mở Khóa Bài Tiếp Theo'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
