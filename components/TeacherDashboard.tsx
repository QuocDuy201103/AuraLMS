'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import {
  GraduationCap,
  Users,
  Award,
  AlertTriangle,
  CheckSquare,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Clock,
  FileText,
  CheckCircle2,
  Filter,
} from 'lucide-react';

export default function TeacherDashboard() {
  const { allStudents, setActiveStudentId, submissions } = useApp();
  const [submissionFilter, setSubmissionFilter] = useState<'all' | 'pending' | 'graded'>('all');

  const totalStudents = allStudents.length;
  const averageScore = (
    allStudents.reduce((acc, curr) => {
      const latest = curr.weeklyScores[curr.weeklyScores.length - 1] || 0;
      return acc + latest;
    }, 0) / (totalStudents || 1)
  ).toFixed(1);

  const pendingCount = submissions.filter((s) => s.status === 'pending').length;

  const filteredSubmissions = submissions.filter((s) => {
    if (submissionFilter === 'pending') return s.status === 'pending';
    if (submissionFilter === 'graded') return s.status === 'graded';
    return true;
  });

  const getTierBadge = (tier: string) => {
    switch (tier) {
      case 'struggling':
        return { label: 'Cần Hỗ Trợ', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' };
      case 'average':
        return { label: 'Khá / Bứt Phá', color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30' };
      case 'excellent':
        return { label: 'Xuất Sắc', color: 'bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/30' };
      default:
        return { label: tier, color: 'bg-slate-800 text-slate-300 border-slate-700' };
    }
  };

  const handleGradeStudent = (studentId: string) => {
    setActiveStudentId(studentId);
  };

  return (
    <div className="space-y-8">
      {/* Teacher Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-indigo-500/30 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 border border-indigo-400 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <GraduationCap className="w-7 h-7 text-indigo-400" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold text-slate-100">Thầy Nguyễn Văn Minh</h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Giáo viên Quản nhiệm
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Quản lý bài tập nộp theo thời gian thực từ Supabase PostgreSQL DB, chấm điểm Rubrics & theo dõi học sinh.
              </p>
            </div>
          </div>

          <Link
            href="/grading"
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-emerald-500 hover:from-indigo-400 hover:to-emerald-400 text-slate-950 font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-indigo-500/20 transition-all hover:scale-105 self-start md:self-auto"
          >
            <CheckSquare className="w-4 h-4" />
            <span>Mở Trình Chấm Bài Rubrics ({pendingCount} Bài Chờ)</span>
          </Link>
        </div>
      </div>

      {/* Class Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Sĩ số lớp học</span>
            <Users className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-slate-100 font-mono">{totalStudents} Học sinh</div>
          <span className="text-[10px] text-slate-500">Đã đồng bộ Supabase DB</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Điểm TB Lớp</span>
            <TrendingUp className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-extrabold text-indigo-400 font-mono">{averageScore} / 10</div>
          <span className="text-[10px] text-emerald-400">Cập nhật tự động sau khi chấm</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-indigo-500/30 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Bài tập nộp chờ chấm</span>
            <CheckSquare className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-extrabold text-amber-400 font-mono">{pendingCount} Bài Nộp</div>
          <span className="text-[10px] text-amber-300">Cần chấm Rubrics 4 tiêu chí</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Cảnh báo cần hỗ trợ</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-extrabold text-amber-400 font-mono">1 Học sinh</div>
          <span className="text-[10px] text-emerald-300">Trần Thị Vy (Đã mở bài bổ trợ)</span>
        </div>
      </div>

      {/* SUBMISSIONS QUEUE SECTION (Danh sách bài học viên đã nộp) */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="space-y-1">
            <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-400" /> Danh Sách Bài Tập Học Viên Đã Nộp Chấm Điểm (Live DB)
            </h2>
            <p className="text-xs text-slate-400">
              Dữ liệu bài tự luận kết nối trực tiếp với Supabase PostgreSQL Database. Khi chấm xong, kết quả sẽ tự động lưu lại.
            </p>
          </div>

          {/* Submission Filter Tabs */}
          <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs shrink-0">
            <button
              onClick={() => setSubmissionFilter('all')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                submissionFilter === 'all' ? 'bg-slate-800 text-indigo-400 shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Tất cả ({submissions.length})
            </button>
            <button
              onClick={() => setSubmissionFilter('pending')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                submissionFilter === 'pending' ? 'bg-slate-800 text-amber-400 shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Chờ chấm ({pendingCount})
            </button>
            <button
              onClick={() => setSubmissionFilter('graded')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                submissionFilter === 'graded' ? 'bg-slate-800 text-emerald-400 shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Đã chấm ({submissions.length - pendingCount})
            </button>
          </div>
        </div>

        {/* Submissions List Grid / Cards */}
        <div className="grid grid-cols-1 gap-4">
          {filteredSubmissions.map((sub) => {
            const badge = getTierBadge(sub.tier);
            const isPending = sub.status === 'pending';

            return (
              <div
                key={sub.id}
                className={`p-5 rounded-2xl border transition-all glass-panel flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                  isPending
                    ? 'bg-amber-950/10 border-amber-500/40 hover:border-amber-500'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start gap-4 flex-grow">
                  {/* Student Avatar */}
                  <div className="w-11 h-11 rounded-xl bg-indigo-500/20 border border-indigo-400 flex items-center justify-center font-black text-sm text-indigo-300 shrink-0">
                    {sub.studentAvatar}
                  </div>

                  <div className="space-y-1.5 flex-grow min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm font-extrabold text-slate-100">{sub.studentName}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${badge.color}`}>
                        {badge.label}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold border flex items-center gap-1 ${
                          isPending
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                            : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        }`}
                      >
                        {isPending ? <Clock className="w-3 h-3 text-amber-400" /> : <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                        {isPending ? 'Chờ Chấm Bài' : `Đã Chấm Điểm (${sub.grade}/10)`}
                      </span>
                    </div>

                    <p className="text-xs font-bold text-indigo-300">{sub.assignmentTitle}</p>
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs text-slate-300 leading-relaxed font-mono">
                      "{sub.studentAnswer}"
                    </div>

                    {sub.teacherFeedback && (
                      <div className="p-2.5 rounded-lg bg-indigo-950/40 border border-indigo-500/30 text-xs text-indigo-200">
                        💬 <strong>Lời phê của Giáo viên:</strong> {sub.teacherFeedback}
                      </div>
                    )}

                    <div className="text-[10px] text-slate-500">🕒 Ngày nộp bài: {sub.submittedDate}</div>
                  </div>
                </div>

                {/* Grade Button */}
                <div className="shrink-0 self-end md:self-center">
                  <Link
                    href="/grading"
                    onClick={() => handleGradeStudent(sub.studentId)}
                    className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-md ${
                      isPending
                        ? 'bg-gradient-to-r from-amber-500 to-indigo-600 hover:from-amber-400 hover:to-indigo-500 text-slate-950 shadow-amber-500/20 hover:scale-105'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700'
                    }`}
                  >
                    <CheckSquare className="w-4 h-4" />
                    <span>{isPending ? '🎯 Chấm Bài Rubric Ngay' : 'Chấm Lại / Xem Nhận Xét'}</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Class Student Progress Roster */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-base font-bold text-slate-100">Danh Sách Học Viên Lớp Lập Trình</h2>
            <p className="text-xs text-slate-400">Xem tiến độ học tập và phân nhóm của tất cả học sinh trong lớp.</p>
          </div>
          <span className="text-[10px] bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full border border-slate-700">
            Real-time Sync
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Học Viên</th>
                <th className="py-3 px-4">Phân Nhóm Tier</th>
                <th className="py-3 px-4">Tiến Độ Lộ Trình</th>
                <th className="py-3 px-4">Điểm Số TB (Mới nhất)</th>
                <th className="py-3 px-4 text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {allStudents.map((s) => {
                const badge = getTierBadge(s.tier);
                const latestScore = s.weeklyScores[s.weeklyScores.length - 1];

                return (
                  <tr key={s.id} className="hover:bg-slate-900/60 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-slate-200">
                          {s.avatar}
                        </div>
                        <div>
                          <div className="font-bold text-slate-100">{s.name}</div>
                          <div className="text-[10px] text-slate-500">{s.email}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border ${badge.color}`}>
                        {badge.label}
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      <div className="w-32 space-y-1">
                        <div className="flex justify-between text-[10px]">
                          <span className="text-slate-400">Tiến độ</span>
                          <span className="text-emerald-400 font-bold">{s.progress}%</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                          <div className="h-full bg-emerald-400" style={{ width: `${s.progress}%` }} />
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <span className="font-mono font-bold text-slate-100 text-sm">{latestScore}</span>
                      <span className="text-[10px] text-slate-500"> / 10</span>
                    </td>

                    <td className="py-4 px-4 text-right">
                      <Link
                        href="/grading"
                        onClick={() => handleGradeStudent(s.id)}
                        className="px-3 py-1.5 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-500/40 text-indigo-300 text-xs font-semibold inline-flex items-center gap-1 transition-all"
                      >
                        <CheckSquare className="w-3.5 h-3.5" />
                        <span>Chấm Bài</span>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
