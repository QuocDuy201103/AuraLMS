'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { User, GraduationCap, Sparkles, Lock, Mail, ArrowRight, AlertCircle, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { loginWithCredentials, isLoggedIn } = useApp();

  const [activeTab, setActiveTab] = useState<'student' | 'teacher' | 'admin'>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Auto redirect if already logged in
  React.useEffect(() => {
    if (isLoggedIn) {
      router.push('/dashboard');
    }
  }, [isLoggedIn, router]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password.trim()) {
      setErrorMessage('Vui lòng nhập đầy đủ Email và Mật khẩu.');
      return;
    }

    setLoading(true);
    const res = await loginWithCredentials(email, password);
    setLoading(false);

    if (res.success) {
      router.push('/dashboard');
    } else {
      setErrorMessage(res.message || 'Xác thực tài khoản thất bại.');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full glass-panel p-8 rounded-3xl border border-slate-700/60 shadow-2xl space-y-6 relative z-10">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-br from-emerald-400 via-indigo-500 to-fuchsia-500 p-[2px] shadow-lg shadow-emerald-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-emerald-400 animate-pulse" />
            </div>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-100">Đăng Nhập AuraLMS</h1>
          <p className="text-xs text-slate-400">Xác thực tài khoản lưu trữ trên Supabase PostgreSQL Database</p>
        </div>

        {/* 3-Role Tabs */}
        <div className="grid grid-cols-3 p-1 rounded-xl bg-slate-900/90 border border-slate-800">
          <button
            type="button"
            onClick={() => {
              setActiveTab('student');
              setErrorMessage('');
            }}
            className={`py-2 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 transition-all ${
              activeTab === 'student'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Học Viên</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('teacher');
              setErrorMessage('');
            }}
            className={`py-2 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 transition-all ${
              activeTab === 'teacher'
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Giáo Viên</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('admin');
              setErrorMessage('');
            }}
            className={`py-2 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1 transition-all ${
              activeTab === 'admin'
                ? 'bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin</span>
          </button>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Email & Password Form */}
        <form onSubmit={handleFormSubmit} className="space-y-4 pt-2">
          <div className="space-y-1">
            <label className="text-[10px] font-semibold text-slate-300 uppercase">Email tài khoản</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={
                  activeTab === 'student'
                    ? 'hocvien@auralms.edu.vn'
                    : activeTab === 'teacher'
                    ? 'giaovien@auralms.edu.vn'
                    : 'admin@auralms.edu.vn'
                }
                className="w-full pl-9 pr-4 py-2.5 rounded-xl glass-input text-xs text-slate-100 placeholder-slate-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-semibold text-slate-300 uppercase">Mật khẩu</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl glass-input text-xs text-slate-100 placeholder-slate-500 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all ${
              activeTab === 'student'
                ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20'
                : activeTab === 'teacher'
                ? 'bg-indigo-600 hover:bg-indigo-500 text-slate-100 shadow-indigo-500/20'
                : 'bg-fuchsia-600 hover:bg-fuchsia-500 text-slate-100 shadow-fuchsia-500/20'
            }`}
          >
            <span>
              {loading
                ? 'Đang Kiểm Tra DB...'
                : `Đăng Nhập Vai Trò ${
                    activeTab === 'student' ? 'Học Viên' : activeTab === 'teacher' ? 'Giáo Viên' : 'Admin'
                  }`}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
