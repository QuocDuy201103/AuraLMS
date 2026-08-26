'use client';

import React from 'react';
import Link from 'next/link';
import { HelpCircle, Heart, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-zinc-800 bg-zinc-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-zinc-950 font-black text-sm">
                A
              </div>
              <span className="font-extrabold text-lg text-white">
                Aura<span className="text-zinc-400">LMS</span>
              </span>
            </Link>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Nền tảng quản lý học tập cá nhân hóa dành cho học viên lập trình. Tự động điều chỉnh lộ trình thích ứng & đánh giá minh bạch qua ma trận Rubrics.
            </p>
          </div>

          {/* User Nav Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white tracking-wider uppercase">Khám Phá</h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Trang Chủ
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors">
                  Bảng Điều Khiển Học Tập
                </Link>
              </li>
              <li>
                <Link href="/grading" className="hover:text-white transition-colors">
                  Trình Chấm Bài & Nhận Xét
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Information */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white tracking-wider uppercase">Hỗ Trợ & Thông Tin</h4>
            <ul className="space-y-2 text-xs text-zinc-400">
              <li className="flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-zinc-300" />
                <Link href="/faq" className="hover:text-white transition-colors">
                  Hỏi Đáp Thường Gặp (FAQs)
                </Link>
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-zinc-300" />
                <Link href="/thank-you" className="hover:text-white transition-colors">
                  Trang Xác Nhận Nộp Bài
                </Link>
              </li>
            </ul>
          </div>

          {/* Service Commitments */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white tracking-wider uppercase">Tiêu Chuẩn Hệ Thống</h4>
            <div className="glass-panel p-3.5 rounded-xl border border-zinc-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400">Thời gian trả nhận xét:</span>
                <span className="text-white font-bold">&lt; 24h</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400">Đánh giá minh bạch:</span>
                <span className="text-white font-bold">4 Tiêu chí Rubrics</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-400">Cơ sở dữ liệu:</span>
                <span className="text-emerald-400 font-bold">Supabase Live Sync</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© 2026 AuraLMS. Tất cả các quyền được bảo lưu.</p>
          <div className="flex items-center gap-1">
            <span>Đồng hành cùng học viên lập trình</span>
            <Heart className="w-3.5 h-3.5 text-zinc-400 fill-zinc-400 ml-1" />
          </div>
        </div>
      </div>
    </footer>
  );
}
