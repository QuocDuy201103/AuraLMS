import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { Home, ArrowLeft, HelpCircle, LayoutDashboard, AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: '404 - Trang Không Tồn Tại',
  description: 'Trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển trên AuraLMS.',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 relative overflow-hidden">
      {/* Glowing Neon Background Spheres */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-fuchsia-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full glass-panel p-8 rounded-3xl border border-slate-700/60 shadow-2xl text-center relative z-10 space-y-6 backdrop-blur-xl">
        <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-tr from-rose-500/20 via-slate-800 to-emerald-500/20 border border-rose-500/30 flex items-center justify-center shadow-lg shadow-rose-500/10">
          <AlertCircle className="w-10 h-10 text-rose-400 animate-bounce" />
        </div>

        <div className="space-y-2">
          <span className="text-6xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-fuchsia-400 to-emerald-400">
            404
          </span>
          <h1 className="text-xl font-bold text-slate-100">Trang Không Tồn Tại</h1>
          <p className="text-xs text-slate-400 leading-relaxed">
            Đường dẫn bạn truy cập không nằm trong lộ trình thuật toán của AuraLMS hoặc đã được điều hướng rẽ nhánh sang vị trí khác.
          </p>
        </div>

        {/* Quick Nav Suggestions */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-xs font-medium text-slate-200 transition-all hover:scale-105"
          >
            <Home className="w-4 h-4 text-emerald-400" />
            Trang Chủ
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-xs font-medium text-slate-200 transition-all hover:scale-105"
          >
            <LayoutDashboard className="w-4 h-4 text-indigo-400" />
            Dashboard
          </Link>
        </div>

        <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <Link href="/faq" className="flex items-center gap-1 hover:text-emerald-400 transition-colors">
            <HelpCircle className="w-3.5 h-3.5" />
            Xem trang FAQs
          </Link>
          <Link href="/" className="flex items-center gap-1 hover:text-emerald-400 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            Quay lại
          </Link>
        </div>
      </div>
    </div>
  );
}
