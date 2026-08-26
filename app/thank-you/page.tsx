'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import { CheckCircle2, ArrowRight, LayoutDashboard, Sparkles, Trophy } from 'lucide-react';

export default function ThankYouPage() {
  useEffect(() => {
    // Trigger celebratory confetti effect
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#10b981', '#6366f1', '#d946ef'],
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#10b981', '#6366f1', '#d946ef'],
      });

      if (Date.now() < animationEnd) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-lg w-full glass-panel p-8 rounded-3xl border border-emerald-500/30 shadow-2xl text-center space-y-6 relative z-10">
        <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
          <CheckCircle2 className="w-10 h-10 text-emerald-400 animate-pulse" />
        </div>

        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 inline-flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> Nộp bài thành công!
          </span>
          <h1 className="text-2xl font-extrabold text-slate-100">Cảm Ơn Bạn Đã Hoàn Thành!</h1>
          <p className="text-xs text-slate-300 leading-relaxed">
            Hệ thống AuraLMS đã ghi nhận bài làm của bạn. Kết quả sẽ được đối chiếu qua ma trận Rubrics 4 tiêu chí và gợi ý phản hồi từ giáo viên trong thời gian ngắn nhất.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-left space-y-3">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-200">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Tiến trình mở khóa thích ứng tiếp theo:</span>
          </div>
          <ul className="text-xs text-slate-400 space-y-1.5 list-disc list-inside">
            <li>Dữ liệu điểm số sẽ tự động cập nhật biểu đồ kỹ năng Radar 4 khía cạnh.</li>
            <li>Trợ lý AI Companion sẽ đưa ra lời khuyên cá nhân hóa tương ứng với kết quả.</li>
            <li>Lộ trình SVG tự động mở khóa các bài học bổ trợ hoặc thử thách nâng cao.</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            href="/dashboard"
            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-indigo-600 hover:from-emerald-400 hover:to-indigo-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02]"
          >
            <LayoutDashboard className="w-4 h-4" />
            Về Bảng Điều Khiển
          </Link>
          <Link
            href="/faq"
            className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-medium flex items-center justify-center gap-1.5 transition-all"
          >
            <span>Hỏi Đáp FAQs</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
