'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import RubricGrading from '@/components/RubricGrading';
import { GraduationCap, ShieldCheck, CheckSquare, Lock, LogIn, ArrowLeft, Users } from 'lucide-react';

export default function GradingPage() {
  const { currentStudent, setActiveStudentId, allStudents, gradeSubmission, user, isLoggedIn } = useApp();

  // Access Control: Only Teachers can access Rubric Grading page
  if (!isLoggedIn || user?.role !== 'teacher') {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full glass-panel p-8 rounded-3xl border border-slate-800 text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-indigo-500/20 border border-indigo-400 flex items-center justify-center">
            <Lock className="w-8 h-8 text-indigo-400" />
          </div>
          <div className="space-y-2">
            <h1 className="text-xl font-bold text-slate-100">Quyền Truy Cập Dành Cho Giáo Viên</h1>
            <p className="text-xs text-slate-400">
              Trang Chấm Bài Rubrics 4 Tiêu Chí chỉ dành cho tài khoản **Giáo Viên Quản Nhiệm**. Học viên không có quyền truy cập chức năng này.
            </p>
          </div>
          <Link
            href="/login"
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-slate-100 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-500/20"
          >
            <LogIn className="w-4 h-4" />
            <span>Đăng Nhập Với Tài Khoản Giáo Viên</span>
          </Link>
        </div>
      </div>
    );
  }

  const handleGradeSubmit = async (finalScore: number, feedback: string) => {
    await gradeSubmission(currentStudent.id, finalScore, feedback);
  };

  const getStudentAnswer = (studentId: string) => {
    if (studentId === 'student-vy') {
      return 'Em chào cô, em đã viết vòng lặp for từ 1 đến N để tính tổng các phần tử. Nhưng lúc đầu em quên biến i++ nên bị lặp vô tận. Em đã sửa được rồi ạ!';
    }
    if (studentId === 'student-nam') {
      return 'Em chào thầy, em đã giải bài toán tìm cặp số có tổng bằng K bằng cách dùng 2 con trỏ left và right. Độ phức tạp đạt O(N) thời gian và O(1) bộ nhớ.';
    }
    if (studentId === 'student-anh') {
      return 'Thưa thầy, bài toán Fibonacci đệ quy em đã tối ưu bằng kỹ thuật Memoization và chuyển sang quy hoạch động cuộn biến space O(1) đạt hiệu năng tối đa.';
    }
    return 'Em chào thầy, em đã làm xong bài tập mảng động 1 chiều và viết hàm tìm kiếm tuyến tính O(N) hoàn chỉnh ạ!';
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 glass-panel p-6 rounded-3xl border border-slate-800">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 transition-colors flex items-center gap-1 text-xs font-bold"
            title="Quay lại Bảng điều khiển Giáo viên"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Quay lại Dashboard</span>
          </Link>
          <div>
            <h1 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-indigo-400" /> Trình Chấm Điểm Rubrics (Đồng Bộ Supabase DB)
            </h1>
            <p className="text-xs text-slate-400">
              Đánh giá bài nộp tự luận & AI Assistant hỗ trợ gợi ý phản hồi cá nhân hóa.
            </p>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 inline-flex items-center gap-1 shrink-0">
          <ShieldCheck className="w-3.5 h-3.5" /> Thầy Nguyễn Văn Minh
        </span>
      </div>

      {/* STUDENT SELECTOR TABS (Chọn Học Sinh Để Chấm Bài) */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-3">
        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5 text-indigo-400" /> Chọn bài nộp của học viên cần chấm điểm:
        </span>

        <div className="flex flex-wrap items-center gap-2">
          {allStudents.map((s) => {
            const isSelected = s.id === currentStudent.id;

            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setActiveStudentId(s.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all border ${
                  isSelected
                    ? 'bg-gradient-to-r from-indigo-600 to-emerald-600 text-white border-indigo-400 shadow-md shadow-indigo-500/20 scale-[1.02]'
                    : 'bg-slate-900/90 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center font-black text-[10px] ${
                    isSelected ? 'bg-slate-950 text-emerald-400' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {s.avatar}
                </div>
                <span>{s.name}</span>
                <span
                  className={`text-[9px] px-1.5 py-0.5 rounded font-mono uppercase ${
                    s.tier === 'struggling'
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : s.tier === 'average'
                      ? 'bg-indigo-500/20 text-indigo-300'
                      : 'bg-fuchsia-500/20 text-fuchsia-300'
                  }`}
                >
                  {s.tier}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Rubric Grading Component for Selected Student */}
      <RubricGrading
        student={currentStudent}
        assignmentTitle={`Bài tập Tự luận: Phân tích & Tối ưu Thuật toán (${currentStudent.name})`}
        submissionAnswer={getStudentAnswer(currentStudent.id)}
        onGradeSubmit={handleGradeSubmit}
      />
    </div>
  );
}
