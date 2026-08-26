'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import AdaptiveRoadmap from '@/components/AdaptiveRoadmap';
import AICompanion from '@/components/AICompanion';
import AnalyticsCharts from '@/components/AnalyticsCharts';
import TeacherDashboard from '@/components/TeacherDashboard';
import AdminDashboard from '@/components/AdminDashboard';
import DiagnosticQuizModal from '@/components/DiagnosticQuizModal';
import { Sparkles, Trophy, LogIn, Lock, Brain } from 'lucide-react';

export default function DashboardPage() {
  const { role, currentStudent, isLoggedIn, user } = useApp();
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  // If not logged in, prompt user to log in first
  if (!isLoggedIn || !user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full glass-panel p-8 rounded-3xl border border-slate-800 text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-500/20 border border-indigo-400 flex items-center justify-center">
            <Lock className="w-8 h-8 text-indigo-400" />
          </div>
          <div className="space-y-2">
            <h1 className="text-xl font-bold text-slate-100">Yêu Cầu Đăng Nhập</h1>
            <p className="text-xs text-slate-400">
              Vui lòng đăng nhập với tài khoản **Học Viên**, **Giáo Viên** hoặc **Admin** để truy cập Bảng điều khiển tương ứng.
            </p>
          </div>
          <Link
            href="/login"
            className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/20"
          >
            <LogIn className="w-4 h-4" />
            <span>Đi Đến Trang Đăng Nhập</span>
          </Link>
        </div>
      </div>
    );
  }

  // If logged in as Admin -> Render Admin System Dashboard
  if (user.role === 'admin') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AdminDashboard />
      </div>
    );
  }

  // If logged in as Teacher -> Render Teacher Management Dashboard
  if (user.role === 'teacher') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TeacherDashboard />
      </div>
    );
  }

  // If logged in as Student -> Render Student Adaptive Dashboard
  const getTierDetails = (tier: string) => {
    switch (tier) {
      case 'struggling':
        return {
          title: 'Nhóm Cần Hỗ Trợ',
          desc: 'Giao diện & AI Companion tự điều chỉnh tông màu xanh tươi mát, giải thích từng bước trực quan.',
          badgeColor: 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10',
        };
      case 'average':
        return {
          title: 'Nhóm Khá / Bứt Phá',
          desc: 'Giao diện & AI Companion tập trung vào gợi ý phương pháp tối ưu giải thuật và thử thách bứt phá.',
          badgeColor: 'border-indigo-500/40 text-indigo-400 bg-indigo-500/10',
        };
      case 'excellent':
        return {
          title: 'Nhóm Xuất Sắc',
          desc: 'Giao diện & AI Companion Cyberpunk tương phản cao, gợi ý các thử thách toán học và quy hoạch động.',
          badgeColor: 'border-fuchsia-500/40 text-fuchsia-400 bg-fuchsia-500/10',
        };
      default:
        return {
          title: tier,
          desc: '',
          badgeColor: 'border-slate-700 text-slate-300 bg-slate-800',
        };
    }
  };

  const tierInfo = getTierDetails(currentStudent.tier);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 relative">
      {/* Floating AI Companion Bot Widget */}
      <AICompanion student={currentStudent} />

      {/* Diagnostic Test Modal */}
      <DiagnosticQuizModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />

      {/* Student Profile Header Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 via-indigo-500 to-fuchsia-500 p-[2px] shadow-lg shadow-emerald-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center font-black text-xl text-slate-100">
                {currentStudent.avatar}
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-extrabold text-slate-100">{currentStudent.name}</h1>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${tierInfo.badgeColor}`}>
                  {tierInfo.title}
                </span>
                <button
                  type="button"
                  onClick={() => setIsQuizOpen(true)}
                  className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-emerald-500/30 flex items-center gap-1 transition-all"
                >
                  <Brain className="w-3 h-3 text-emerald-400" />
                  <span>Test Đánh Giá Đầu Vào</span>
                </button>
              </div>
              <p className="text-xs text-slate-400 max-w-xl">{tierInfo.desc}</p>
            </div>
          </div>

          {/* Progress Bar & Key Stats */}
          <div className="w-full md:w-72 glass-panel p-4 rounded-2xl border border-slate-800/80 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 flex items-center gap-1">
                <Trophy className="w-3.5 h-3.5 text-amber-400" /> Tiến độ lộ trình:
              </span>
              <span className="font-bold text-emerald-400">{currentStudent.progress}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 via-indigo-500 to-fuchsia-500 transition-all duration-500"
                style={{ width: `${currentStudent.progress}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>Đã xong: {currentStudent.completedLessons.length} bài</span>
              <span>Đã mở: {currentStudent.unlockedLessons.length} bài</span>
            </div>
          </div>
        </div>
      </div>

      {/* Adaptive SVG Tree Roadmap Section */}
      <div className="space-y-4">
        <AdaptiveRoadmap student={currentStudent} />
      </div>

      {/* Analytics Charts Section */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-400" /> Phân Tích Kỹ Năng & Tiến Độ Cá Nhân
        </h2>
        <AnalyticsCharts student={currentStudent} />
      </div>
    </div>
  );
}
