import React from 'react';
import { Metadata } from 'next';
import { Sparkles, GitFork, ShieldCheck, Users } from 'lucide-react';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'AuraLMS - Nền Tảng Học Lập Trình Cá Nhân Hóa Thích Ứng (Adaptive LMS)',
  description:
    'Nền tảng quản lý học tập cá nhân hóa thích ứng dành cho học sinh học lập trình. Tự động thay đổi lộ trình rẽ nhánh SVG, giao diện và AI Companion.',
};

export default function HomePage() {
  const courseJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Khóa Học Lập Trình Thích Ứng AuraLMS',
    description: 'Lộ trình học tư duy thuật toán và lập trình cá nhân hóa theo 3 nhóm học lực.',
    provider: {
      '@type': 'Organization',
      name: 'AuraLMS',
      sameAs: 'https://auralms.vercel.app',
    },
  };

  return (
    <div className="space-y-20 pb-16">
      <JsonLd data={courseJsonLd} />

      {/* Hero Section */}
      <section className="relative pt-12 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-8">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-emerald-500/15 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
          <Sparkles className="w-4 h-4 text-emerald-400 animate-spin" />
          <span>Giải Pháp Giải Quyết Sự Phân Hóa Học Lực Lớp Học</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-slate-100 tracking-tight leading-tight max-w-4xl mx-auto">
          Nền Tảng Học Lập Trình <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-indigo-400 to-fuchsia-400">
            Cá Nhân Hóa Thích Ứng (Adaptive LMS)
          </span>
        </h1>

        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          AuraLMS tự động thay đổi lộ trình học tập rẽ nhánh SVG, màu sắc giao diện và cách phản hồi của Trợ lý AI dựa trên năng lực và hành vi thực tế của học viên.
        </p>
      </section>

      {/* 3 Core Pillars Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100">3 Bài Toán Cốt Lõi AuraLMS Giải Quyết</h2>
          <p className="text-xs text-slate-400">Được tối ưu chuẩn SEO và trải nghiệm người dùng hiện đại</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pillar 1 */}
          <div className="glass-panel p-8 rounded-3xl border border-slate-800 hover:border-emerald-500/40 transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center">
              <Users className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-100">1. Adaptive UI & AI Companion</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Tự động điều chỉnh màu sắc và phong cách giao tiếp cho 3 nhóm học sinh: Thân thiện cho Vy (Cần hỗ trợ), gợi ý bứt phá cho Nam (Khá), và thử thách toán học cho Anh (Xuất sắc).
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="glass-panel p-8 rounded-3xl border border-slate-800 hover:border-indigo-500/40 transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-400 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-indigo-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-100">2. Interactive Rubrics 4 Tiêu Chí</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Ma trận chấm điểm minh bạch (Nội dung 40%, Lập luận 30%, Diễn đạt 20%, Nỗ lực 10%). Điểm nỗ lực khích lệ các học sinh yếu có tiến bộ vượt bậc.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="glass-panel p-8 rounded-3xl border border-slate-800 hover:border-fuchsia-500/40 transition-all space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-fuchsia-500/20 border border-fuchsia-400 flex items-center justify-center">
              <GitFork className="w-6 h-6 text-fuchsia-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-100">3. SVG Roadmap Rẽ Nhánh</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Tự động mở khóa bài học bổ trợ cho nhóm yếu hoặc mở khóa sớm các thử thách chuyên sâu nâng cao khi học sinh đạt mốc điểm số quy định.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
