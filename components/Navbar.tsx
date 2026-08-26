'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { Sparkles, HelpCircle, LayoutDashboard, CheckSquare, LogIn, LogOut, ShieldCheck, Menu, X, Sun, Moon } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { user, isLoggedIn, logout, themeMode, toggleThemeMode } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAdmin = user?.role === 'admin';
  const isTeacher = user?.role === 'teacher';
  const isStudent = user?.role === 'student';

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-zinc-100 p-[1px] shadow-lg group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-zinc-950 rounded-[11px] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg text-white tracking-tight leading-none group-hover:text-zinc-300 transition-colors">
              Aura<span className="text-zinc-400">LMS</span>
            </span>
            <span className="text-[9px] text-zinc-400 tracking-wider uppercase font-semibold">ADAPTIVE ENGINE</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-zinc-900/90 p-1 rounded-full border border-zinc-800">
          <Link
            href="/"
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
              pathname === '/' ? 'bg-white text-zinc-950 shadow-sm' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Trang Chủ
          </Link>

          {isAdmin && (
            <Link
              href="/dashboard"
              className={`px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all ${
                pathname === '/dashboard' ? 'bg-white text-zinc-950 shadow-sm' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Dashboard Admin
            </Link>
          )}

          {isStudent && (
            <Link
              href="/dashboard"
              className={`px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all ${
                pathname === '/dashboard' ? 'bg-white text-zinc-950 shadow-sm' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              Dashboard Học Viên
            </Link>
          )}

          {isTeacher && (
            <>
              <Link
                href="/dashboard"
                className={`px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all ${
                  pathname === '/dashboard' ? 'bg-white text-zinc-950 shadow-sm' : 'text-zinc-400 hover:text-white'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                Dashboard Quản Lý
              </Link>
              <Link
                href="/grading"
                className={`px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all ${
                  pathname === '/grading' ? 'bg-white text-zinc-950 shadow-sm' : 'text-zinc-400 hover:text-white'
                }`}
              >
                <CheckSquare className="w-3.5 h-3.5" />
                Chấm bài Rubric
              </Link>
            </>
          )}

          <Link
            href="/faq"
            className={`px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all ${
              pathname === '/faq' ? 'bg-white text-zinc-950 shadow-sm' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            Hỏi Đáp (FAQs)
          </Link>
        </nav>

        {/* Theme Switcher & User Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Light / Dark Mode Toggle Button */}
          <button
            type="button"
            onClick={toggleThemeMode}
            className="p-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white transition-all shadow-sm flex items-center justify-center"
            title={themeMode === 'dark' ? 'Chuyển sang Giao diện Sáng (Light Mode)' : 'Chuyển sang Giao diện Tối (Dark Mode)'}
          >
            {themeMode === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400 animate-pulse" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-500" />
            )}
          </button>

          {isLoggedIn && user ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 shadow-sm">
                <div className="w-6 h-6 rounded-lg bg-zinc-100 text-zinc-950 flex items-center justify-center text-[10px] font-black shrink-0">
                  {user.avatar}
                </div>
                <div className="hidden sm:flex flex-col text-left leading-tight">
                  <span className="text-xs font-bold text-white line-clamp-1">{user.name}</span>
                  <span className="text-[9px] uppercase tracking-wider font-semibold text-zinc-400">
                    {isAdmin ? 'Quản Trị Viên' : isTeacher ? 'Giáo viên' : 'Học viên'}
                  </span>
                </div>
              </div>

              <button
                onClick={logout}
                className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 text-xs font-bold flex items-center gap-1.5 transition-all"
                title="Đăng xuất khỏi hệ thống"
              >
                <LogOut className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                <span className="hidden sm:inline">Đăng xuất</span>
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-black text-xs flex items-center gap-1.5 transition-all shadow-md"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Đăng Nhập</span>
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 border-t border-zinc-800 bg-zinc-950 space-y-2">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-xs font-bold text-white hover:bg-zinc-900"
          >
            Trang Chủ
          </Link>
          {isAdmin && (
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-xs font-bold text-white hover:bg-zinc-900"
            >
              Dashboard Admin
            </Link>
          )}
          {isStudent && (
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-xl text-xs font-bold text-white hover:bg-zinc-900"
            >
              Dashboard Học Viên
            </Link>
          )}
          {isTeacher && (
            <>
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-xs font-bold text-white hover:bg-zinc-900"
              >
                Dashboard Quản Lý (Giáo viên)
              </Link>
              <Link
                href="/grading"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl text-xs font-bold text-white hover:bg-zinc-900"
              >
                Chấm bài Rubric
              </Link>
            </>
          )}
          <Link
            href="/faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-xs font-bold text-white hover:bg-zinc-900"
          >
            Hỏi Đáp (FAQs)
          </Link>
        </div>
      )}
    </header>
  );
}
