'use client';

import React, { useState } from 'react';
import { useApp, UserSession } from '@/context/AppContext';
import CreateUserModal from '@/components/CreateUserModal';
import {
  ShieldAlert,
  Users,
  UserPlus,
  Trash2,
  Edit3,
  Search,
  Filter,
  CheckCircle2,
  Activity,
  Award,
  Sparkles,
  Database,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';

export default function AdminDashboard() {
  const { allUsers, allStudents, deleteUser, updateUserRoleOrTier, isSupabaseConnected } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'student' | 'teacher' | 'admin'>('all');
  const [editingUserId, setEditingUserId] = useState<string | null>(null);

  // Compute metrics
  const totalUsers = allUsers.length;
  const totalStudents = allUsers.filter((u) => u.role === 'student').length;
  const totalTeachers = allUsers.filter((u) => u.role === 'teacher').length;
  const totalAdmins = allUsers.filter((u) => u.role === 'admin').length;

  const strugglingCount = allStudents.filter((s) => s.tier === 'struggling').length;
  const averageCount = allStudents.filter((s) => s.tier === 'average').length;
  const excellentCount = allStudents.filter((s) => s.tier === 'excellent').length;

  // Filtered users list
  const filteredUsers = allUsers.filter((u) => {
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    const matchesSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRole && matchesSearch;
  });

  const handleDelete = async (user: UserSession) => {
    if (user.role === 'admin' && totalAdmins <= 1) {
      alert('Không thể xóa tài khoản Admin duy nhất của hệ thống.');
      return;
    }
    if (confirm(`Bạn có chắc chắn muốn xóa tài khoản "${user.name}" (${user.email}) khỏi hệ thống?`)) {
      await deleteUser(user.id);
    }
  };

  const getTierBadge = (studentId?: string) => {
    if (!studentId) return null;
    const st = allStudents.find((s) => s.id === studentId);
    if (!st) return null;

    switch (st.tier) {
      case 'struggling':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">🌿 Cần hỗ trợ</span>;
      case 'average':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">⚡ Khá / Bứt phá</span>;
      case 'excellent':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/40">💎 Xuất sắc</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* Modal create user */}
      <CreateUserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-emerald-400 p-[2px] shadow-lg shadow-indigo-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                <ShieldCheck className="w-7 h-7 text-indigo-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold text-slate-100">Bảng Điều Khiển Quản Trị Hệ Thống (Admin Dashboard)</h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  SYSTEM ADMIN
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Quản lý toàn bộ danh sách Học viên, Giáo viên, cấp phát quyền truy cập & giám sát phân nhóm thích ứng.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-indigo-600 hover:from-emerald-400 hover:to-indigo-500 text-slate-950 font-extrabold text-xs flex items-center gap-2 transition-all shadow-lg shadow-emerald-500/20 hover:scale-105 shrink-0"
          >
            <UserPlus className="w-4 h-4" />
            <span>Thêm Tài Khoản Mới</span>
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-slate-400 font-medium">Tổng Người Dùng</span>
            <p className="text-2xl font-black text-slate-100">{totalUsers}</p>
            <span className="text-[10px] text-slate-500">{totalStudents} Học viên • {totalTeachers} Giáo viên</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-slate-400 font-medium">Nhóm Cần Hỗ Trợ</span>
            <p className="text-2xl font-black text-emerald-400">{strugglingCount}</p>
            <span className="text-[10px] text-emerald-500">Kích hoạt bài học bổ trợ</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Sparkles className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-slate-400 font-medium">Nhóm Khá & Xuất Sắc</span>
            <p className="text-2xl font-black text-fuchsia-400">{averageCount + excellentCount}</p>
            <span className="text-[10px] text-fuchsia-500">{averageCount} Khá • {excellentCount} Xuất sắc</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/30 flex items-center justify-center text-fuchsia-400">
            <Award className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-slate-400 font-medium">Kết Nối Database</span>
            <p className="text-sm font-bold text-emerald-400 flex items-center gap-1.5 mt-1">
              <Database className="w-4 h-4" /> Supabase Live DB
            </p>
            <span className="text-[10px] text-slate-400 font-mono">SLA Phản hồi: 131ms</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Activity className="w-6 h-6 animate-pulse" />
          </div>
        </div>
      </div>

      {/* User Roster Table Section */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-6">
        {/* Table Filters & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-400" /> Quản Lý Danh Sách Người Dùng
            </h2>
            <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-slate-800 text-slate-300">
              {filteredUsers.length}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-grow sm:w-60">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm tên hoặc email..."
                className="w-full pl-8 pr-3 py-1.5 rounded-xl glass-input text-xs text-slate-100 placeholder-slate-500 focus:outline-none"
              />
            </div>

            {/* Role Filter Tabs */}
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => setRoleFilter('all')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  roleFilter === 'all' ? 'bg-slate-800 text-emerald-400 font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Tất cả
              </button>
              <button
                onClick={() => setRoleFilter('student')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  roleFilter === 'student' ? 'bg-slate-800 text-emerald-400 font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Học viên
              </button>
              <button
                onClick={() => setRoleFilter('teacher')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  roleFilter === 'teacher' ? 'bg-slate-800 text-indigo-400 font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Giáo viên
              </button>
              <button
                onClick={() => setRoleFilter('admin')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  roleFilter === 'admin' ? 'bg-slate-800 text-fuchsia-400 font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Admin
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Người Dùng</th>
                <th className="py-3 px-4">Email Đăng Nhập</th>
                <th className="py-3 px-4">Vai Trò</th>
                <th className="py-3 px-4">Phân Nhóm Tier (Học Viên)</th>
                <th className="py-3 px-4 text-right">Thao Tác Admin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredUsers.map((u) => {
                const isStudent = u.role === 'student';
                const isTeacher = u.role === 'teacher';
                const isAdmin = u.role === 'admin';

                return (
                  <tr key={u.id} className="hover:bg-slate-900/40 transition-colors">
                    {/* Name & Avatar */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                            isAdmin
                              ? 'bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-400'
                              : isTeacher
                              ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-400'
                              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-400'
                          }`}
                        >
                          {u.avatar}
                        </div>
                        <span className="font-bold text-slate-200">{u.name}</span>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="py-3.5 px-4 text-slate-400 font-mono">{u.email}</td>

                    {/* Role Badge */}
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                          isAdmin
                            ? 'bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/30'
                            : isTeacher
                            ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30'
                            : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        }`}
                      >
                        {isAdmin ? '🛡️ Admin' : isTeacher ? '👨‍🏫 Giáo viên' : '🎓 Học viên'}
                      </span>
                    </td>

                    {/* Tier Badge */}
                    <td className="py-3.5 px-4">
                      {isStudent ? (
                        getTierBadge(u.studentId)
                      ) : (
                        <span className="text-slate-600 text-[10px]">—</span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* Quick Change Tier if Student */}
                        {isStudent && (
                          <select
                            onChange={(e) => updateUserRoleOrTier(u.id, u.role, e.target.value as any)}
                            defaultValue={allStudents.find((s) => s.id === u.studentId)?.tier || 'average'}
                            className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-300 focus:outline-none"
                            title="Thay đổi phân nhóm học lực thích ứng"
                          >
                            <option value="struggling">🌿 Cần hỗ trợ</option>
                            <option value="average">⚡ Khá / Bứt phá</option>
                            <option value="excellent">💎 Xuất sắc</option>
                          </select>
                        )}

                        {/* Delete User Action */}
                        <button
                          onClick={() => handleDelete(u)}
                          className="p-1.5 rounded-lg bg-slate-900 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 border border-slate-800 hover:border-rose-500/30 transition-all"
                          title="Xóa tài khoản người dùng"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
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
