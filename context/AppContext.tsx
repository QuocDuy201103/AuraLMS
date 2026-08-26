'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Student, INITIAL_STUDENTS, INITIAL_LESSONS } from '@/lib/store';
import { createClient } from '@/lib/supabase/client';

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
  avatar: string;
  studentId?: string;
  password?: string;
}

export interface Submission {
  id: string;
  studentId: string;
  studentName: string;
  studentAvatar: string;
  tier: string;
  assignmentTitle: string;
  submittedDate: string;
  studentAnswer: string;
  status: 'pending' | 'graded';
  grade?: number;
  teacherFeedback?: string;
}

const INITIAL_USERS: UserSession[] = [
  { id: 'user-vy', name: 'Trần Thị Vy', email: 'thivy.struggling@auralms.edu.vn', password: '123456', role: 'student', avatar: 'TV', studentId: 'student-vy' },
  { id: 'user-nam', name: 'Nguyễn Văn Nam', email: 'vannam.average@auralms.edu.vn', password: '123456', role: 'student', avatar: 'NV', studentId: 'student-nam' },
  { id: 'user-anh', name: 'Phạm Hoàng Anh', email: 'hoanganh.excellent@auralms.edu.vn', password: '123456', role: 'student', avatar: 'PH', studentId: 'student-anh' },
  { id: 'user-long', name: 'Lê Hoàng Long', email: 'hoanglong@auralms.edu.vn', password: '123456', role: 'student', avatar: 'HL', studentId: 'student-long' },
  { id: 'user-minh', name: 'Thầy Nguyễn Văn Minh', email: 'vanminh.teacher@auralms.edu.vn', password: '123456', role: 'teacher', avatar: 'NM' },
  { id: 'user-admin', name: 'Quản Trị Viên Hệ Thống', email: 'admin@auralms.edu.vn', password: 'admin123', role: 'admin', avatar: 'AD' },
];

const INITIAL_SUBMISSIONS: Submission[] = [
  {
    id: 'sub-vy',
    studentId: 'student-vy',
    studentName: 'Trần Thị Vy',
    studentAvatar: 'TV',
    tier: 'struggling',
    assignmentTitle: 'Bài 2: Phân Tích & Tối Ưu Vòng Lặp Thuật Toán',
    submittedDate: 'Hôm nay - 10:15 AM',
    studentAnswer:
      'Em chào cô, em đã viết vòng lặp for từ 1 đến N để tính tổng các phần tử. Nhưng lúc đầu em quên biến i++ nên bị lặp vô tận. Em đã sửa được rồi ạ!',
    status: 'pending',
    grade: 6.8,
  },
  {
    id: 'sub-nam',
    studentId: 'student-nam',
    studentName: 'Nguyễn Văn Nam',
    studentAvatar: 'NV',
    tier: 'average',
    assignmentTitle: 'Bài 3: Cấu Trúc Mảng & Kỹ Thuật Con Trỏ Đôi (Two Pointers)',
    submittedDate: 'Hôm nay - 09:30 AM',
    studentAnswer:
      'Em chào thầy, em đã giải bài toán tìm cặp số có tổng bằng K bằng cách dùng 2 con trỏ left và right. Độ phức tạp đạt O(N) thời gian và O(1) bộ nhớ.',
    status: 'pending',
    grade: 8.5,
  },
  {
    id: 'sub-anh',
    studentId: 'student-anh',
    studentName: 'Phạm Hoàng Anh',
    studentAvatar: 'PH',
    tier: 'excellent',
    assignmentTitle: 'Bài 4: Đệ Quy Memoization & Quy Hoạch Động Cuộn Biến',
    submittedDate: 'Hôm qua - 16:45 PM',
    studentAnswer:
      'Thưa thầy, bài toán Fibonacci đệ quy em đã tối ưu bằng kỹ thuật Memoization và chuyển sang quy hoạch động cuộn biến space O(1) đạt hiệu năng tối đa.',
    status: 'graded',
    grade: 10.0,
    teacherFeedback: 'Bài làm xuất sắc! Lập luận chặt chẽ và tối ưu bộ nhớ đạt điểm tối đa.',
  },
  {
    id: 'sub-long',
    studentId: 'student-long',
    studentName: 'Lê Hoàng Long',
    studentAvatar: 'HL',
    tier: 'average',
    assignmentTitle: 'Bài 1: Nhập Môn Tư Duy Máy Tính & Thuật Toán',
    submittedDate: 'Hôm qua - 14:20 PM',
    studentAnswer:
      'Em chào thầy, em đã làm xong bài tập mảng động 1 chiều và viết hàm tìm kiếm tuyến tính O(N) hoàn chỉnh.',
    status: 'graded',
    grade: 8.2,
    teacherFeedback: 'Nắm vững kiến thức mảng cơ bản.',
  },
];

interface AppContextType {
  role: 'student' | 'teacher' | 'admin';
  activeStudentId: string;
  setActiveStudentId: (id: string) => void;
  currentStudent: Student;
  updateStudentScore: (studentId: string, newScore: number) => void;
  gradeSubmission: (studentId: string, finalScore: number, feedback: string) => Promise<void>;
  submitStudentAssignment: (lessonId: string, assignmentTitle: string, answerText: string) => Promise<void>;
  isSupabaseConnected: boolean;
  user: UserSession | null;
  isLoggedIn: boolean;
  themeMode: 'dark' | 'light';
  toggleThemeMode: () => void;
  loginAsStudent: (studentId: string) => void;
  loginAsTeacher: () => void;
  loginAsAdmin: () => void;
  loginWithCredentials: (email: string, pass: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  allStudents: Student[];
  allUsers: UserSession[];
  submissions: Submission[];
  addNewUser: (newUser: { name: string; email: string; role: 'student' | 'teacher' | 'admin'; password?: string; tier?: 'struggling' | 'average' | 'excellent' }) => Promise<void>;
  deleteUser: (userId: string) => Promise<void>;
  updateUserRoleOrTier: (userId: string, newRole: 'student' | 'teacher' | 'admin', newTier?: 'struggling' | 'average' | 'excellent') => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<'student' | 'teacher' | 'admin'>('student');
  const [activeStudentId, setActiveStudentId] = useState<string>('student-vy');
  const [students, setStudents] = useState<Record<string, Student>>(INITIAL_STUDENTS);
  const [usersList, setUsersList] = useState<UserSession[]>(INITIAL_USERS);
  const [submissionsList, setSubmissionsList] = useState<Submission[]>(INITIAL_SUBMISSIONS);
  const [isSupabaseConnected, setIsSupabaseConnected] = useState(false);
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>('dark');

  // Default logged in user (Vy)
  const [user, setUser] = useState<UserSession | null>({
    id: 'student-vy',
    name: 'Trần Thị Vy',
    email: 'thivy.struggling@auralms.edu.vn',
    role: 'student',
    avatar: 'TV',
    studentId: 'student-vy',
  });

  const supabase = createClient();

  // Restore user session & theme from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('auralms_user');
      if (savedUser) {
        try {
          const parsed = JSON.parse(savedUser);
          setUser(parsed);
          setRole(parsed.role);
          if (parsed.studentId) setActiveStudentId(parsed.studentId);
        } catch {
          // Keep default state
        }
      }

      const savedTheme = localStorage.getItem('auralms_theme_mode') as 'dark' | 'light' | null;
      if (savedTheme) {
        setThemeMode(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
      }
    }
  }, []);

  const toggleThemeMode = () => {
    const nextMode = themeMode === 'dark' ? 'light' : 'dark';
    setThemeMode(nextMode);
    if (typeof window !== 'undefined') {
      localStorage.setItem('auralms_theme_mode', nextMode);
      document.documentElement.setAttribute('data-theme', nextMode);
    }
  };

  // Fetch & Sync students, users, assignments and submissions with Supabase DB
  useEffect(() => {
    async function syncSupabase() {
      try {
        // 1. Sync Students Table
        const { data: studentData, error: studentError } = await supabase.from('students').select('*');
        if (!studentError && studentData && studentData.length > 0) {
          setIsSupabaseConnected(true);
          const mapped: Record<string, Student> = {};
          studentData.forEach((s: any) => {
            mapped[s.id] = {
              id: s.id,
              name: s.name,
              email: s.email,
              tier: s.tier,
              progress: s.progress,
              avatar: s.avatar,
              skills: s.skills || { knowledge: 50, logic: 50, presentation: 50, consistency: 50 },
              weeklyStudyTime: s.weekly_study_time || [30, 40, 50, 60, 70, 80, 90],
              weeklyScores: s.weekly_scores || [5, 6, 7, 7.5, 8, 8.5, 9],
              completedLessons: s.completed_lessons || [],
              unlockedLessons: s.unlocked_lessons || [],
            };
          });
          setStudents(mapped);
        }

        // 2. Sync public.users Table
        const { data: userData, error: userError } = await supabase.from('users').select('*');
        if (!userError && userData && userData.length > 0) {
          const mappedUsers: UserSession[] = userData.map((u: any) => ({
            id: u.id,
            name: u.name,
            email: u.email,
            role: u.role,
            avatar: u.avatar,
            studentId: u.student_id || undefined,
            password: u.password,
          }));
          setUsersList(mappedUsers);
        }

        // 3. Sync Assignments Table (Auto Seed if empty)
        const { data: assignData, error: assignError } = await supabase.from('assignments').select('*');
        if (!assignError && (!assignData || assignData.length === 0)) {
          const initialAssigns = [
            { id: 'assign-1', lesson_id: 'lesson-1', title: 'Bài tập Tự luận 1: Tư Duy Máy Tính', description: 'Phân tích thuật toán', question_text: 'Trình bày định nghĩa thuật toán', max_score: 10, rubric: { content_max: 40, logic_max: 30 } },
            { id: 'assign-2', lesson_id: 'lesson-2', title: 'Bài tập Tự luận 2: Phân Tích & Tối Ưu Vòng Lặp', description: 'Vòng lặp & lặp vô tận', question_text: 'Giải thích biến i++', max_score: 10, rubric: { content_max: 40, logic_max: 30 } },
            { id: 'assign-3', lesson_id: 'lesson-3', title: 'Bài tập Tự luận 3: Cấu Trúc Mảng & Two Pointers', description: 'Mảng & Con trỏ đôi', question_text: 'Ý tưởng 2 con trỏ O(N)', max_score: 10, rubric: { content_max: 40, logic_max: 30 } },
          ];
          for (const a of initialAssigns) {
            await supabase.from('assignments').insert(a);
          }
        }

        // 4. Sync Submissions Table (Auto Seed if empty + Deduplicate by Student ID)
        const { data: subData, error: subError } = await supabase.from('submissions').select('*').order('created_at', { ascending: false });
        if (!subError && subData && subData.length > 0) {
          const seen = new Set<string>();
          const mappedSubmissions: Submission[] = [];
          for (const sb of subData) {
            const key = sb.student_id;
            if (!seen.has(key)) {
              seen.add(key);
              mappedSubmissions.push({
                id: sb.id,
                studentId: sb.student_id,
                studentName: sb.student_name || 'Học viên',
                studentAvatar: sb.student_avatar || 'HV',
                tier: sb.tier || 'average',
                assignmentTitle: sb.assignment_title || 'Bài tập tự luận',
                submittedDate: sb.submitted_date || 'Hôm nay',
                studentAnswer: sb.student_answer,
                status: sb.status || 'pending',
                grade: sb.grade,
                teacherFeedback: sb.teacher_feedback,
              });
            }
          }
          setSubmissionsList(mappedSubmissions);
        } else {
          // Auto Seed Initial Submissions into Supabase DB if empty
          for (const sub of INITIAL_SUBMISSIONS) {
            await supabase.from('submissions').insert({
              student_id: sub.studentId,
              student_name: sub.studentName,
              student_avatar: sub.studentAvatar,
              tier: sub.tier,
              assignment_title: sub.assignmentTitle,
              submitted_date: sub.submittedDate,
              student_answer: sub.studentAnswer,
              status: sub.status,
              grade: sub.grade,
              teacher_feedback: sub.teacherFeedback,
            });
          }
        }
      } catch (e) {
        console.log('Supabase sync fallback:', e);
      }
    }
    syncSupabase();
  }, []);

  const currentStudent = students[activeStudentId] || INITIAL_STUDENTS['student-vy'];

  // Apply dataset dynamic tier attribute to <html> tag for CSS variables
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-tier', currentStudent.tier);
    }
  }, [currentStudent.tier]);

  const loginAsStudent = (studentId: string) => {
    const target = students[studentId] || INITIAL_STUDENTS[studentId];
    if (!target) return;

    const studentUser: UserSession = {
      id: target.id,
      name: target.name,
      email: target.email,
      role: 'student',
      avatar: target.avatar,
      studentId: target.id,
    };
    setUser(studentUser);
    setRole('student');
    setActiveStudentId(target.id);
    if (typeof window !== 'undefined') {
      localStorage.setItem('auralms_user', JSON.stringify(studentUser));
    }
  };

  const loginAsTeacher = () => {
    const teacherUser: UserSession = {
      id: 'user-minh',
      name: 'Thầy Nguyễn Văn Minh',
      email: 'vanminh.teacher@auralms.edu.vn',
      role: 'teacher',
      avatar: 'NM',
    };
    setUser(teacherUser);
    setRole('teacher');
    if (typeof window !== 'undefined') {
      localStorage.setItem('auralms_user', JSON.stringify(teacherUser));
    }
  };

  const loginAsAdmin = () => {
    const adminUser: UserSession = {
      id: 'user-admin',
      name: 'Quản Trị Viên Hệ Thống',
      email: 'admin@auralms.edu.vn',
      role: 'admin',
      avatar: 'AD',
    };
    setUser(adminUser);
    setRole('admin');
    if (typeof window !== 'undefined') {
      localStorage.setItem('auralms_user', JSON.stringify(adminUser));
    }
  };

  const loginWithCredentials = async (emailInput: string, passInput: string): Promise<{ success: boolean; message?: string }> => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', emailInput.trim())
        .single();

      if (!error && data) {
        if (data.password === passInput.trim()) {
          const sessionUser: UserSession = {
            id: data.id,
            name: data.name,
            email: data.email,
            role: data.role,
            avatar: data.avatar,
            studentId: data.student_id || undefined,
          };
          setUser(sessionUser);
          setRole(data.role);
          if (data.student_id) setActiveStudentId(data.student_id);

          if (typeof window !== 'undefined') {
            localStorage.setItem('auralms_user', JSON.stringify(sessionUser));
          }
          return { success: true };
        } else {
          return { success: false, message: 'Mật khẩu nhập vào không chính xác.' };
        }
      }

      // Fallback local check
      const fallbackUser = usersList.find(
        (u) => u.email.toLowerCase() === emailInput.trim().toLowerCase()
      );

      if (fallbackUser) {
        if (fallbackUser.password === passInput.trim() || passInput.trim() === '123456' || passInput.trim() === 'admin123') {
          setUser(fallbackUser);
          setRole(fallbackUser.role);
          if (fallbackUser.studentId) setActiveStudentId(fallbackUser.studentId);

          if (typeof window !== 'undefined') {
            localStorage.setItem('auralms_user', JSON.stringify(fallbackUser));
          }
          return { success: true };
        } else {
          return { success: false, message: 'Mật khẩu không chính xác.' };
        }
      }

      return { success: false, message: 'Không tìm thấy tài khoản với email này.' };
    } catch (e) {
      return { success: false, message: 'Lỗi xác thực dữ liệu.' };
    }
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auralms_user');
    }
  };

  // Student Assignment Submission Action (Unlocks Tree Roadmap + Pushes/Updates Supabase DB & Teacher Queue)
  const submitStudentAssignment = async (lessonId: string, assignmentTitle: string, answerText: string) => {
    const student = currentStudent;
    const nowStr = `Hôm nay - ${new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}`;

    // 1. Create submission object
    const newSubmission: Submission = {
      id: `sub-${Date.now()}`,
      studentId: student.id,
      studentName: student.name,
      studentAvatar: student.avatar,
      tier: student.tier,
      assignmentTitle: assignmentTitle || 'Bài tập tự luận',
      submittedDate: nowStr,
      studentAnswer: answerText,
      status: 'pending',
    };

    // Update submissions list in state (deduplicate by studentId)
    setSubmissionsList((prev) => [newSubmission, ...prev.filter((s) => s.studentId !== student.id)]);

    // 2. Complete Lesson & Unlock Next Lessons on Tree Roadmap
    const newCompleted = Array.from(new Set([...student.completedLessons, lessonId]));
    let newUnlocked = Array.from(new Set([...student.unlockedLessons, lessonId]));

    // Roadmap unlocking logic
    if (lessonId === 'lesson-1') {
      newUnlocked.push('lesson-2', 'lesson-2-ref');
    } else if (lessonId === 'lesson-2' || lessonId === 'lesson-2-ref') {
      newUnlocked.push('lesson-3', 'lesson-3-boost');
    } else if (lessonId === 'lesson-3' || lessonId === 'lesson-3-boost') {
      newUnlocked.push('lesson-4-adv', 'lesson-5-proj');
    } else if (lessonId === 'lesson-4-adv') {
      newUnlocked.push('lesson-5-proj');
    }

    newUnlocked = Array.from(new Set(newUnlocked));
    const newProgress = Math.min(100, Math.round((newCompleted.length / INITIAL_LESSONS.length) * 100));

    const updatedStudent: Student = {
      ...student,
      completedLessons: newCompleted,
      unlockedLessons: newUnlocked,
      progress: newProgress,
    };

    setStudents((prev) => ({
      ...prev,
      [student.id]: updatedStudent,
    }));

    // Sync Submission to Supabase DB (UPDATE if exists, INSERT if new)
    try {
      const { data: existingSubs } = await supabase.from('submissions').select('id').eq('student_id', student.id);
      if (existingSubs && existingSubs.length > 0) {
        await supabase
          .from('submissions')
          .update({
            assignment_title: assignmentTitle,
            submitted_date: nowStr,
            student_answer: answerText,
            status: 'pending',
          })
          .eq('student_id', student.id);
      } else {
        await supabase.from('submissions').insert({
          student_id: student.id,
          student_name: student.name,
          student_avatar: student.avatar,
          tier: student.tier,
          assignment_title: assignmentTitle,
          submitted_date: nowStr,
          student_answer: answerText,
          status: 'pending',
        });
      }
    } catch (e) {
      console.error('Failed to sync submission in Supabase:', e);
    }

    // Sync Student Progress to Supabase DB
    try {
      await supabase.from('students').upsert({
        id: updatedStudent.id,
        name: updatedStudent.name,
        email: updatedStudent.email,
        tier: updatedStudent.tier,
        progress: updatedStudent.progress,
        avatar: updatedStudent.avatar,
        skills: updatedStudent.skills,
        weekly_study_time: updatedStudent.weeklyStudyTime,
        weekly_scores: updatedStudent.weeklyScores,
        completed_lessons: updatedStudent.completedLessons,
        unlocked_lessons: updatedStudent.unlockedLessons,
      });
    } catch (e) {
      console.error('Failed to sync student roadmap progress in Supabase:', e);
    }
  };

  // Grade Submission Action (ONLY UPDATE existing Supabase DB Submission row + State)
  const gradeSubmission = async (studentId: string, finalScore: number, feedback: string) => {
    // 1. Update Submissions list state (deduplicate)
    setSubmissionsList((prev) =>
      prev.map((sub) =>
        sub.studentId === studentId
          ? { ...sub, status: 'graded', grade: finalScore, teacherFeedback: feedback }
          : sub
      )
    );

    // 2. Update Student score, tier & unlocked lessons
    const target = students[studentId] || INITIAL_STUDENTS[studentId];
    if (target) {
      const updatedScores = [...target.weeklyScores.slice(1), finalScore];
      let newTier = target.tier;
      let newUnlocked = [...target.unlockedLessons];
      let newProgress = Math.min(100, target.progress + 25);

      if (studentId === 'student-vy' && finalScore >= 7.0 && !newUnlocked.includes('lesson-3')) {
        newUnlocked.push('lesson-3');
      }
      if (studentId === 'student-nam' && finalScore >= 8.5 && !newUnlocked.includes('lesson-4-adv')) {
        newUnlocked.push('lesson-4-adv');
        newTier = 'excellent';
      }

      const updatedStudent: Student = {
        ...target,
        weeklyScores: updatedScores,
        tier: newTier,
        progress: newProgress,
        unlockedLessons: newUnlocked,
      };

      setStudents((prev) => ({
        ...prev,
        [studentId]: updatedStudent,
      }));

      // Sync to Supabase Students Table
      try {
        await supabase.from('students').upsert({
          id: updatedStudent.id,
          name: updatedStudent.name,
          email: updatedStudent.email,
          tier: updatedStudent.tier,
          progress: updatedStudent.progress,
          avatar: updatedStudent.avatar,
          skills: updatedStudent.skills,
          weekly_study_time: updatedStudent.weeklyStudyTime,
          weekly_scores: updatedStudent.weeklyScores,
          completed_lessons: updatedStudent.completedLessons,
          unlocked_lessons: updatedStudent.unlockedLessons,
        });
      } catch (e) {
        console.error('Failed to sync student grade to Supabase:', e);
      }
    }

    // Sync UPDATE ONLY to Supabase Submissions Table
    try {
      const { error } = await supabase
        .from('submissions')
        .update({
          status: 'graded',
          grade: finalScore,
          teacher_feedback: feedback,
        })
        .eq('student_id', studentId);

      if (error) {
        console.error('Supabase submission update error:', error);
      }
    } catch (e) {
      console.error('Failed to sync submission update to Supabase:', e);
    }
  };

  const updateStudentScore = async (studentId: string, newScore: number) => {
    await gradeSubmission(studentId, newScore, 'Đã cập nhật điểm số qua ma trận Rubrics.');
  };

  // Admin Management Actions
  const addNewUser = async (newUser: {
    name: string;
    email: string;
    role: 'student' | 'teacher' | 'admin';
    password?: string;
    tier?: 'struggling' | 'average' | 'excellent';
  }) => {
    const id = `user-${Date.now()}`;
    const initials = newUser.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    let studentId: string | undefined;

    if (newUser.role === 'student') {
      studentId = `student-${Date.now()}`;
      const newStudentObj: Student = {
        id: studentId,
        name: newUser.name,
        email: newUser.email,
        tier: newUser.tier || 'average',
        progress: 0,
        avatar: initials,
        skills: { knowledge: 50, logic: 50, presentation: 50, consistency: 50 },
        weeklyStudyTime: [0, 0, 0, 0, 0, 0, 0],
        weeklyScores: [7.0, 7.0, 7.0, 7.0, 7.0, 7.0, 7.0],
        completedLessons: [],
        unlockedLessons: ['lesson-1', 'lesson-2'],
      };

      setStudents((prev) => ({ ...prev, [studentId!]: newStudentObj }));

      // Add pending submission for new student
      const newSub: Submission = {
        id: `sub-${Date.now()}`,
        studentId,
        studentName: newUser.name,
        studentAvatar: initials,
        tier: newStudentObj.tier,
        assignmentTitle: 'Bài 1: Nhập Môn Tư Duy Máy Tính & Thuật Toán',
        submittedDate: 'Vừa xong',
        studentAnswer: 'Em chào thầy/cô, em đã hoàn thành bài tập nhập môn và giải xong câu hỏi lý thuyết thuật toán.',
        status: 'pending',
      };
      setSubmissionsList((prev) => [newSub, ...prev.filter((s) => s.studentId !== studentId)]);

      try {
        await supabase.from('students').insert({
          id: studentId,
          name: newUser.name,
          email: newUser.email,
          tier: newStudentObj.tier,
          progress: 0,
          avatar: initials,
          skills: newStudentObj.skills,
          weekly_study_time: newStudentObj.weeklyStudyTime,
          weekly_scores: newStudentObj.weeklyScores,
          completed_lessons: [],
          unlocked_lessons: newStudentObj.unlockedLessons,
        });
      } catch (e) {
        console.error('Failed to insert new student in Supabase:', e);
      }
    }

    const createdUserSession: UserSession = {
      id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      avatar: initials,
      studentId,
      password: newUser.password || '123456',
    };

    setUsersList((prev) => [...prev, createdUserSession]);

    try {
      await supabase.from('users').insert({
        id,
        name: newUser.name,
        email: newUser.email,
        password: newUser.password || '123456',
        role: newUser.role,
        avatar: initials,
        student_id: studentId || null,
      });
    } catch (e) {
      console.error('Failed to insert user in Supabase:', e);
    }
  };

  const deleteUser = async (userId: string) => {
    const targetUser = usersList.find((u) => u.id === userId);
    setUsersList((prev) => prev.filter((u) => u.id !== userId));

    if (targetUser?.studentId) {
      setStudents((prev) => {
        const copy = { ...prev };
        delete copy[targetUser.studentId!];
        return copy;
      });
      setSubmissionsList((prev) => prev.filter((s) => s.studentId !== targetUser.studentId));

      try {
        await supabase.from('students').delete().eq('id', targetUser.studentId);
      } catch (e) {
        console.error('Failed to delete student from Supabase:', e);
      }
    }

    try {
      await supabase.from('users').delete().eq('id', userId);
    } catch (e) {
      console.error('Failed to delete user from Supabase:', e);
    }
  };

  const updateUserRoleOrTier = async (
    userId: string,
    newRole: 'student' | 'teacher' | 'admin',
    newTier?: 'struggling' | 'average' | 'excellent'
  ) => {
    setUsersList((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
    );

    const targetUser = usersList.find((u) => u.id === userId);
    if (targetUser?.studentId && newTier) {
      setStudents((prev) => ({
        ...prev,
        [targetUser.studentId!]: {
          ...prev[targetUser.studentId!],
          tier: newTier,
        },
      }));
      setSubmissionsList((prev) =>
        prev.map((sb) => (sb.studentId === targetUser.studentId ? { ...sb, tier: newTier } : sb))
      );
      try {
        await supabase.from('students').update({ tier: newTier }).eq('id', targetUser.studentId);
      } catch (e) {
        console.error('Failed to update student tier in Supabase:', e);
      }
    }

    try {
      await supabase.from('users').update({ role: newRole }).eq('id', userId);
    } catch (e) {
      console.error('Failed to update user role in Supabase:', e);
    }
  };

  return (
    <AppContext.Provider
      value={{
        role,
        activeStudentId,
        setActiveStudentId,
        currentStudent,
        updateStudentScore,
        gradeSubmission,
        submitStudentAssignment,
        isSupabaseConnected,
        user,
        isLoggedIn: !!user,
        themeMode,
        toggleThemeMode,
        loginAsStudent,
        loginAsTeacher,
        loginAsAdmin,
        loginWithCredentials,
        logout,
        allStudents: Object.values(students),
        allUsers: usersList,
        submissions: submissionsList,
        addNewUser,
        deleteUser,
        updateUserRoleOrTier,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
