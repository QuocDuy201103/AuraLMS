import { initialStudents, lessons, assignments } from './mockData.js';

class StateManager {
  constructor() {
    this.state = {
      currentRole: 'student', // 'student' | 'teacher'
      currentStudentId: 'student-vy', // default to Vy (struggling student) to demonstrate the core adaptive helpers
      activeTab: 'dashboard', // student: 'dashboard', 'roadmap', 'assignments', 'analytics' | teacher: 'overview', 'grading', 'students'
      students: [],
      lessons: lessons,
      assignments: assignments
    };
    this.listeners = [];
  }

  init() {
    const saved = localStorage.getItem('auralms_state');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        this.state = { ...this.state, ...parsed };

        // Defensively merge any new mock submissions into the current state
        initialStudents.forEach(initStudent => {
          const stateStudent = this.state.students.find(s => s.id === initStudent.id);
          if (stateStudent) {
            initStudent.submittedAssignments.forEach(initSub => {
              const hasSub = stateStudent.submittedAssignments.some(s => s.assignmentId === initSub.assignmentId);
              if (!hasSub) {
                stateStudent.submittedAssignments.push(initSub);
              }
            });
          }
        });
        this.save();
      } catch (e) {
        console.error("Error loading state from localStorage", e);
        this.loadDefaults();
      }
    } else {
      this.loadDefaults();
    }
  }

  loadDefaults() {
    this.state.students = JSON.parse(JSON.stringify(initialStudents));
    this.save();
  }

  save() {
    localStorage.setItem('auralms_state', JSON.stringify({
      currentRole: this.state.currentRole,
      currentStudentId: this.state.currentStudentId,
      activeTab: this.state.activeTab,
      students: this.state.students
    }));
    this.notify();
  }

  // Event dispatching for reactive UI updates
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  notify() {
    this.listeners.forEach(listener => listener(this.state));
  }

  // Actions
  setRole(role) {
    this.state.currentRole = role;
    if (role === 'teacher') {
      this.state.activeTab = 'overview';
    } else {
      this.state.activeTab = 'dashboard';
    }
    this.save();
  }

  selectStudent(studentId) {
    this.state.currentStudentId = studentId;
    if (this.state.currentRole === 'student') {
      this.state.activeTab = 'dashboard';
    }
    this.save();
  }

  setTab(tab) {
    this.state.activeTab = tab;
    this.save();
  }

  getStudent(studentId = this.state.currentStudentId) {
    return this.state.students.find(s => s.id === studentId);
  }

  submitAssignment(studentId, assignmentId, answerText) {
    const student = this.state.students.find(s => s.id === studentId);
    if (!student) return;

    const existingIndex = student.submittedAssignments.findIndex(a => a.assignmentId === assignmentId);
    const submission = {
      assignmentId,
      submittedDate: new Date().toISOString().split('T')[0],
      studentAnswer: answerText,
      status: 'pending',
      grade: null,
      rubricGrading: null,
      teacherFeedback: ''
    };

    if (existingIndex >= 0) {
      student.submittedAssignments[existingIndex] = submission;
    } else {
      student.submittedAssignments.push(submission);
    }

    this.save();
  }

  completeLesson(studentId, lessonId) {
    const student = this.state.students.find(s => s.id === studentId);
    if (!student) return;

    if (!student.completedLessons.includes(lessonId)) {
      student.completedLessons.push(lessonId);

      // Auto-unlock next core lesson for smoother navigation!
      const lesson = this.state.lessons.find(l => l.id === lessonId);
      if (lesson && lesson.tierType === 'core') {
        const nextCore = this.state.lessons.find(l => l.tierType === 'core' && l.order === lesson.order + 1);
        if (nextCore && !student.unlockedLessons.includes(nextCore.id)) {
          student.unlockedLessons.push(nextCore.id);
        }
      }

      // Add simple skill points for reading
      student.skills.knowledge = Math.min(100, student.skills.knowledge + 5);
      student.skills.consistency = Math.min(100, student.skills.consistency + 2);

      this.save();
    }
  }

  gradeAssignment(studentId, assignmentId, rubricScores, teacherFeedback) {
    const student = this.state.students.find(s => s.id === studentId);
    if (!student) return;

    const submission = student.submittedAssignments.find(a => a.assignmentId === assignmentId);
    if (!submission) return;

    // Calculate score out of 10 based on rubric weights
    // rubricScores is an object: { content: score0-40, argument: score0-30, language: score0-20, effort: score0-10 }
    const totalPoints = (rubricScores.content || 0) + 
                        (rubricScores.argument || 0) + 
                        (rubricScores.language || 0) + 
                        (rubricScores.effort || 0);
    
    // Scale total points (0-100) to grade (0-10)
    const grade = Math.round((totalPoints / 10) * 10) / 10;

    submission.status = 'graded';
    submission.grade = grade;
    submission.rubricGrading = { ...rubricScores };
    submission.teacherFeedback = teacherFeedback;

    // Log this score to weeklyScores and update study statistics
    student.weeklyScores.push(grade);
    if (student.weeklyScores.length > 7) {
      student.weeklyScores.shift();
    }

    // Adaptive skill updates based on rubric
    student.skills.knowledge = Math.min(100, Math.round(student.skills.knowledge * 0.9 + (rubricScores.content / 40) * 100 * 0.1));
    student.skills.logic = Math.min(100, Math.round(student.skills.logic * 0.9 + (rubricScores.argument / 30) * 100 * 0.1));
    student.skills.presentation = Math.min(100, Math.round(student.skills.presentation * 0.9 + (rubricScores.language / 20) * 100 * 0.1));
    student.skills.consistency = Math.min(100, student.skills.consistency + 3);

    // Apply adaptive path unlocking and tier shifts
    this.applyAdaptiveRules(student, assignmentId, grade);

    this.save();
  }

  applyAdaptiveRules(student, assignmentId, grade) {
    // 1. Rule for Vy (Struggling):
    if (student.id === 'student-vy' && assignmentId === 'assign-4') {
      if (grade >= 7.0) {
        // Vy passes the loop refresher with high colors!
        // Unlocks next core lesson (Mảng)
        if (!student.completedLessons.includes('lesson-2-ref')) {
          student.completedLessons.push('lesson-2-ref');
        }
        if (!student.completedLessons.includes('lesson-2')) {
          student.completedLessons.push('lesson-2'); // Automatically marks Core 2 as complete
        }
        if (!student.unlockedLessons.includes('lesson-3')) {
          student.unlockedLessons.push('lesson-3');
        }
        
        // Add Achievement
        if (!student.achievements.find(a => a.id === 'ach-pass-ref')) {
          student.achievements.push({
            id: 'ach-pass-ref',
            name: "Bứt Phá Gốc Rễ",
            description: "Chinh phục bài toán Vòng lặp bổ trợ để tiến lên cấp độ mới",
            icon: "⚡",
            date: new Date().toISOString().split('T')[0]
          });
        }
        
        // Boost tier status or show improvement
        student.progress = Math.max(student.progress, 40);
      }
    }

    // 2. Rule for Nam (Average):
    if (student.id === 'student-nam' && assignmentId === 'assign-3') {
      if (grade >= 8.5) {
        // Nam did excellent on the Array Boost assignment!
        if (!student.completedLessons.includes('lesson-3-boost')) {
          student.completedLessons.push('lesson-3-boost');
        }
        if (!student.completedLessons.includes('lesson-3')) {
          student.completedLessons.push('lesson-3');
        }
        // Unlock both Core 4 and Advanced 4 (Recursion challenge) for him to challenge himself!
        if (!student.unlockedLessons.includes('lesson-4')) {
          student.unlockedLessons.push('lesson-4');
        }
        if (!student.unlockedLessons.includes('lesson-4-adv')) {
          student.unlockedLessons.push('lesson-4-adv');
        }

        // Add Achievement
        if (!student.achievements.find(a => a.id === 'ach-pass-boost')) {
          student.achievements.push({
            id: 'ach-pass-boost',
            name: "Vượt Ngưỡng Thành Công",
            description: "Đạt điểm giỏi ở bài tập Mảng tăng tốc để thách thức bản thân",
            icon: "🚀",
            date: new Date().toISOString().split('T')[0]
          });
        }

        student.progress = Math.max(student.progress, 70);
      }
    }

    // 3. Rule for Anh (Excellent):
    if (student.id === 'student-anh' && assignmentId === 'assign-2') {
      if (grade >= 9.0) {
        if (!student.completedLessons.includes('lesson-4-adv')) {
          student.completedLessons.push('lesson-4-adv');
        }
        if (!student.completedLessons.includes('lesson-4')) {
          student.completedLessons.push('lesson-4');
        }
        if (!student.unlockedLessons.includes('lesson-5')) {
          student.unlockedLessons.push('lesson-5');
        }

        // Add Achievement
        if (!student.achievements.find(a => a.id === 'ach-pass-adv')) {
          student.achievements.push({
            id: 'ach-pass-adv',
            name: "Đại Cao Thủ Thuật Toán",
            description: "Giải bài toán Fibonacci bằng Quy hoạch động tối ưu tuyệt đối",
            icon: "👑",
            date: new Date().toISOString().split('T')[0]
          });
        }
        
        student.progress = 100; // Unlocked the final project module!
      }
    }

    // General lesson unlock logic
    // If a student finishes a core lesson's assignment with a pass grade, unlock next core lesson
    if (assignmentId === 'assign-1' && grade >= 5.0) {
      if (!student.completedLessons.includes('lesson-1')) {
        student.completedLessons.push('lesson-1');
      }
      if (!student.unlockedLessons.includes('lesson-2')) {
        student.unlockedLessons.push('lesson-2');
      }
      // For Vy, also unlock the refresher lesson
      if (student.tier === 'struggling' && !student.unlockedLessons.includes('lesson-2-ref')) {
        student.unlockedLessons.push('lesson-2-ref');
      }
      // For Anh, also unlock the advanced lesson
      if (student.tier === 'excellent' && !student.unlockedLessons.includes('lesson-2-adv')) {
        student.unlockedLessons.push('lesson-2-adv');
      }
    }
  }

  // Get active lessons that should display in student's roadmap based on tier
  getRoadmapLessons(studentId = this.state.currentStudentId) {
    const student = this.getStudent(studentId);
    if (!student) return [];

    return this.state.lessons.filter(lesson => {
      // Core lessons are shown to all
      if (lesson.tierType === 'core') return true;

      // Refresher lessons are only shown to Struggling students (or if unlocked)
      if (lesson.tierType === 'refresher') {
        return student.tier === 'struggling' || student.unlockedLessons.includes(lesson.id);
      }

      // Advanced lessons are shown to Excellent students (or if unlocked for average to challenge)
      if (lesson.tierType === 'advanced') {
        return student.tier === 'excellent' || student.unlockedLessons.includes(lesson.id);
      }

      // Boost lessons are shown to Average students
      if (lesson.tierType === 'boost') {
        return student.tier === 'average' || student.unlockedLessons.includes(lesson.id);
      }

      return false;
    }).sort((a, b) => a.order - b.order);
  }

  getRecommendedLesson(studentId = this.state.currentStudentId) {
    const student = this.getStudent(studentId);
    if (!student) return null;

    const roadmap = this.getRoadmapLessons(studentId);
    // Find the first unlocked lesson that is not completed
    const incomplete = roadmap.find(lesson => 
      student.unlockedLessons.includes(lesson.id) && !student.completedLessons.includes(lesson.id)
    );

    return incomplete || roadmap[roadmap.length - 1]; // return last if all complete
  }
}

export const stateManager = new StateManager();
