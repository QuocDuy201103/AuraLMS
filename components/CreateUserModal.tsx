'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { UserPlus, X, Mail, Lock, User, ShieldCheck, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateUserModal({ isOpen, onClose }: CreateUserModalProps) {
  const { addNewUser } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('123456');
  const [role, setRole] = useState<'student' | 'teacher'>('student');
  const [tier, setTier] = useState<'struggling' | 'average' | 'excellent'>('average');
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setSubmitting(true);
    await addNewUser({
      name: name.trim(),
      email: email.trim(),
      password: password.trim() || '123456',
      role,
      tier: role === 'student' ? tier : undefined,
    });
    setSubmitting(false);
    setSuccessMsg(`Đã khởi tạo thành công tài khoản ${role === 'student' ? 'Học viên' : 'Giáo viên'}: ${name}`);

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.6 },
    });

    setTimeout(() => {
      setSuccessMsg('');
      setName('');
      setEmail('');
      setPassword('123456');
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-lg w-full glass-panel p-6 sm:p-8 rounded-3xl border border-slate-700/80 shadow-2xl relative space-y-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 via-indigo-500 to-fuchsia-500 p-[2px]">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <UserPlus className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-100">Thêm Tài Khoản Người Dùng Mới</h2>
            <p className="text-xs text-slate-400">Cấp phát tài khoản Học viên / Giáo viên & đồng bộ cơ sở dữ liệu Supabase</p>
          </div>
        </div>

        {successMsg ? (
          <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2 text-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{successMsg}</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role Selection */}
            <div className="space-y-1">
              <label className="text-[10px] font-semibold text-slate-300 uppercase">Loại tài khoản</label>
              <div className="grid grid-cols-2 p-1 rounded-xl bg-slate-900 border border-slate-800">
                <button
                  type="button"
                  onClick={() => setRole('student')}
                  className={`py-2 rounded-lg text-xs font-bold transition-all ${
                    role === 'student'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  🎓 Học Viên
                </button>
                <button
                  type="button"
                  onClick={() => setRole('teacher')}
                  className={`py-2 rounded-lg text-xs font-bold transition-all ${
                    role === 'teacher'
                      ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  👨‍🏫 Giáo Viên
                </button>
              </div>
            </div>

            {/* Full Name */}
            <div className="space-y-1">
              <label className="text-[10px] font-semibold text-slate-300 uppercase">Họ và tên người dùng</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ví dụ: Nguyễn Hoàng Yến"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl glass-input text-xs text-slate-100 placeholder-slate-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="text-[10px] font-semibold text-slate-300 uppercase">Email đăng nhập</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="hoangyen@auralms.edu.vn"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl glass-input text-xs text-slate-100 placeholder-slate-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <label className="text-[10px] font-semibold text-slate-300 uppercase">Mật khẩu khởi tạo</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="123456"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl glass-input text-xs text-slate-100 placeholder-slate-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Student Tier Selection (if student) */}
            {role === 'student' && (
              <div className="space-y-1">
                <label className="text-[10px] font-semibold text-slate-300 uppercase">Phân nhóm thích ứng đầu vào (Tier)</label>
                <select
                  value={tier}
                  onChange={(e) => setTier(e.target.value as any)}
                  className="w-full px-3 py-2.5 rounded-xl glass-input text-xs text-slate-100 bg-slate-900 focus:outline-none"
                >
                  <option value="struggling">🌿 Nhóm Cần Hỗ Trợ (Struggling)</option>
                  <option value="average">⚡ Nhóm Khá / Bứt Phá (Average)</option>
                  <option value="excellent">💎 Nhóm Xuất Sắc (Excellent)</option>
                </select>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-indigo-600 hover:from-emerald-400 hover:to-indigo-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/20"
            >
              <UserPlus className="w-4 h-4" />
              <span>{submitting ? 'Đang Khởi Tạo...' : 'Tạo Tài Khoản & Đồng Bộ DB'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
