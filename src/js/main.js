import { stateManager } from './state.js';
import { renderRoadmap } from './components/roadmap.js';
import { renderGrading } from './components/grading.js';
import { initAICompanion } from './components/companion.js';
import { renderAnalytics } from './components/analytics.js';
import { renderStudentDashboard, renderTeacherDashboard } from './components/dashboard.js';

// DOM Elements cache
const btnRoleStudent = document.getElementById('role-student');
const btnRoleTeacher = document.getElementById('role-teacher');
const studentPicker = document.getElementById('student-picker');
const pageTitle = document.getElementById('page-title');
const menuStudent = document.getElementById('menu-student');
const menuTeacher = document.getElementById('menu-teacher');
const sidebarAvatar = document.getElementById('sidebar-avatar');
const sidebarUsername = document.getElementById('sidebar-username');
const sidebarRolebadge = document.getElementById('sidebar-rolebadge');
const toastContainer = document.getElementById('toast-container');

// Initialize State
stateManager.init();

// Initialize UI Event Listeners
function setupEventHandlers() {
  const sidebar = document.querySelector('.sidebar');
  const menuToggleBtn = document.getElementById('menu-toggle-btn');

  // Role Switchers
  btnRoleStudent.addEventListener('click', () => {
    stateManager.setRole('student');
  });

  btnRoleTeacher.addEventListener('click', () => {
    stateManager.setRole('teacher');
  });

  // Student profile picker dropdown
  studentPicker.addEventListener('change', (e) => {
    stateManager.selectStudent(e.target.value);
  });

  // Sidebar Nav clicks
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const tab = item.getAttribute('data-tab');
      stateManager.setTab(tab);
      if (window.innerWidth <= 768 && sidebar) {
        sidebar.classList.remove('active');
      }
    });
  });

  // Mobile menu sidebar trigger
  if (menuToggleBtn && sidebar) {
    menuToggleBtn.addEventListener('click', (e) => {
      sidebar.classList.toggle('active');
      e.stopPropagation();
    });

    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 768 && !sidebar.contains(e.target) && sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
      }
    });
  }
}

// React to State Changes and update the DOM
stateManager.subscribe((state) => {
  const isStudent = state.currentRole === 'student';
  const student = stateManager.getStudent();

  // 1. Sync topbar role switcher and dropdown picker visibility
  if (isStudent) {
    btnRoleTeacher.classList.remove('active');
    btnRoleStudent.classList.add('active');
    studentPicker.style.display = 'block';
    studentPicker.value = state.currentStudentId;

    menuTeacher.style.display = 'none';
    menuStudent.style.display = 'flex';
  } else {
    btnRoleStudent.classList.remove('active');
    btnRoleTeacher.classList.add('active');
    studentPicker.style.display = 'none';

    menuStudent.style.display = 'none';
    menuTeacher.style.display = 'flex';
  }

  // 2. Sync sidebar user profile panel at bottom
  if (isStudent && student) {
    sidebarAvatar.innerText = student.avatar;
    sidebarUsername.innerText = student.name;
    sidebarRolebadge.innerText = student.tier === 'excellent' ? 'Học viên Xuất Sắc' : student.tier === 'average' ? 'Học viên Trung Bình' : 'Học viên Bổ Trợ';

    // Color style for sidebar profile
    if (student.tier === 'excellent') {
      sidebarRolebadge.style.background = 'var(--tier-excellent-bg)';
      sidebarRolebadge.style.color = 'var(--tier-excellent)';
      sidebarAvatar.style.boxShadow = 'var(--tier-excellent-glow)';
    } else if (student.tier === 'average') {
      sidebarRolebadge.style.background = 'var(--tier-average-bg)';
      sidebarRolebadge.style.color = 'var(--tier-average)';
      sidebarAvatar.style.boxShadow = 'var(--tier-average-glow)';
    } else if (student.tier === 'struggling') {
      sidebarRolebadge.style.background = 'var(--tier-struggling-bg)';
      sidebarRolebadge.style.color = 'var(--tier-struggling)';
      sidebarAvatar.style.boxShadow = 'var(--tier-struggling-glow)';
    }
  } else {
    sidebarAvatar.innerText = "GV";
    sidebarUsername.innerText = "Cô Nguyễn Mai";
    sidebarRolebadge.innerText = "Giảng viên";
    sidebarRolebadge.style.background = 'rgba(139, 92, 246, 0.15)';
    sidebarRolebadge.style.color = 'var(--accent-purple)';
    sidebarAvatar.style.boxShadow = '0 0 15px rgba(139, 92, 246, 0.4)';
  }

  // 3. Highlight correct nav item
  document.querySelectorAll('.nav-item').forEach(item => {
    if (item.getAttribute('data-tab') === state.activeTab) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  // 4. Update header title
  const titles = {
    dashboard: "Tổng quan học tập",
    roadmap: "Lộ trình cá nhân hóa",
    assignments: "Bài tập tự luận",
    analytics: "Báo cáo năng lực",
    overview: "Quản lý Lớp học",
    grading: "Hỗ trợ chấm bài"
  };
  pageTitle.innerText = titles[state.activeTab] || "Học tập";

  // 5. Hide all panels and show only the active one
  document.querySelectorAll('.page-panel').forEach(panel => {
    if (panel.getAttribute('data-panel') === state.activeTab) {
      panel.classList.add('active');
    } else {
      panel.classList.remove('active');
    }
  });

  // 6. Launch active tab renderer functions
  if (state.currentRole === 'student') {
    if (state.activeTab === 'dashboard') {
      renderStudentDashboard('panel-dashboard', handleRedirectToAssignment);
    } else if (state.activeTab === 'roadmap') {
      renderRoadmap('panel-roadmap', handleRedirectToAssignment);
    } else if (state.activeTab === 'assignments') {
      renderAssignmentsTab();
    } else if (state.activeTab === 'analytics') {
      renderAnalytics('chart-skills-radar', 'chart-performance-trend');
    }
  } else {
    // Teacher Views
    if (state.activeTab === 'overview') {
      renderTeacherDashboard('panel-overview', handleRedirectToGrading);
    } else if (state.activeTab === 'grading') {
      renderGrading('panel-grading');
    }
  }
});

// Helper: When Student clicks 'Go to homework' in recommended lesson or roadmap
function handleRedirectToAssignment(assignmentId) {
  stateManager.setTab('assignments');
  renderAssignmentsTab(assignmentId);
}

// Helper: When Teacher clicks 'Grade' in class overview
function handleRedirectToGrading(studentId, assignmentId) {
  stateManager.setTab('grading');
  renderGrading('panel-grading', studentId, assignmentId);
}

// Render student homework submission panel dynamically
let activeStudentAssignmentId = null;

function renderAssignmentsTab(targetAssignmentId = null) {
  const container = document.getElementById('panel-assignments');
  if (!container) return;

  const state = stateManager.state;
  const student = stateManager.getStudent();
  if (!student) return;

  // Filter assignments matching student tier or unlocked items
  const visibleLessons = stateManager.getRoadmapLessons();
  const visibleLessonIds = visibleLessons.map(l => l.id);
  const studentAssignments = state.assignments.filter(a => visibleLessonIds.includes(a.lessonId));

  if (targetAssignmentId) {
    activeStudentAssignmentId = targetAssignmentId;
  }
  if (!activeStudentAssignmentId && studentAssignments.length > 0) {
    activeStudentAssignmentId = studentAssignments[0].id;
  }

  // Build assignments list
  let listHtml = '';
  studentAssignments.forEach(assign => {
    const isCompleted = student.completedLessons.includes(assign.lessonId);
    const isUnlocked = student.unlockedLessons.includes(assign.lessonId);

    // Find matching submission
    const submission = student.submittedAssignments.find(sa => sa.assignmentId === assign.id);
    let statusText = "Chưa làm";
    let statusClass = "not-submitted";

    if (submission) {
      if (submission.status === 'graded') {
        statusText = `Đã chấm: ${submission.grade}/10`;
        statusClass = "graded";
      } else {
        statusText = "Đang chờ chấm";
        statusClass = "pending";
      }
    }

    const isActive = activeStudentAssignmentId === assign.id;
    listHtml += `
      <div class="quest-item homework-card-item ${isActive ? 'active' : ''}" 
           data-assign-id="${assign.id}" 
           style="cursor: pointer; margin-bottom: 8px;">
        <div class="quest-left">
          <div class="quest-icon">${isCompleted ? '✓' : '📝'}</div>
          <div class="quest-info">
            <span class="quest-title" style="font-size:13px;">${assign.title}</span>
            <span style="font-size:11px; color:var(--text-secondary);">Thang điểm: 10</span>
          </div>
        </div>
        <span class="homework-status-badge ${statusClass}">${statusText}</span>
      </div>
    `;
  });

  // Build active homework form details
  let detailHtml = '';
  const activeAssign = studentAssignments.find(a => a.id === activeStudentAssignmentId);
  if (activeAssign) {
    const submission = student.submittedAssignments.find(sa => sa.assignmentId === activeAssign.id);
    const lesson = state.lessons.find(l => l.id === activeAssign.lessonId);

    let submitAreaHtml = '';
    if (!submission) {
      // Show editable text area
      submitAreaHtml = `
        <div style="margin-top: 16px;">
          <h4 style="font-size:14px; margin-bottom:8px;">Nhập câu trả lời của em:</h4>
          <textarea class="editor-textarea" id="homework-answer-text" placeholder="Viết bài luận tự luận của em tại đây (ít nhất 150 từ)..."></textarea>
          <button class="action-btn" id="btn-submit-homework" style="margin-top:14px; width:100%; justify-content:center;">
            <span>NỘP BÀI TẬP TỰ LUẬN</span>
          </button>
        </div>
      `;
    } else if (submission.status === 'pending') {
      // Show submitted but pending grading
      submitAreaHtml = `
        <div style="margin-top: 16px;">
          <h4 style="font-size:14px; margin-bottom:8px; color:var(--accent-cyan);">Bài đã nộp thành công!</h4>
          <div class="submitted-answer-box" style="opacity: 0.85;">
${escapeHtml(submission.studentAnswer)}
          </div>
          <div style="margin-top:16px; padding:12px; background:rgba(234,179,8,0.06); border:1px solid rgba(234,179,8,0.2); border-radius:8px; font-size:13px; color:#f59e0b; display:flex; align-items:center; gap:8px;">
            <svg style="width:18px; height:18px;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Bài đang chờ giáo viên chấm điểm. Hãy chuyển sang vai trò GIÁO VIÊN để chấm điểm.
          </div>
        </div>
      `;
    } else if (submission.status === 'graded') {
      // Show rubric transparency report (Problem 2)
      let rubricRowsHtml = '';
      activeAssign.rubric.forEach(criterion => {
        const score = submission.rubricGrading[criterion.id] || 0;
        const maxScore = criterion.weight;
        const fillPercent = (score / maxScore) * 100;

        rubricRowsHtml += `
          <div class="rubric-report-row">
            <div class="rubric-row-left">
              <span class="rubric-row-title">${criterion.name}</span>
              <span class="rubric-row-desc">${criterion.desc}</span>
            </div>
            <div class="rubric-score-display">
              <span class="rubric-score-value">${score} / ${maxScore}</span>
              <div class="rubric-score-bar-bg">
                <div class="rubric-score-bar-fill" style="width: ${fillPercent}%"></div>
              </div>
            </div>
          </div>
        `;
      });

      submitAreaHtml = `
        <div style="margin-top: 16px;">
          <h4 style="font-size:14px; margin-bottom:8px; color:var(--tier-excellent);">Bài tập đã được chấm điểm!</h4>
          <div class="submitted-answer-box" style="max-height: 180px; opacity:0.85;">
${escapeHtml(submission.studentAnswer)}
          </div>
          
          <div class="transparency-report">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
              <h3 style="font-size: 16px;">Báo cáo điểm số minh bạch</h3>
              <span class="homework-status-badge graded" style="font-size:13px; padding:4px 10px;">Điểm số quy đổi: ${submission.grade} / 10</span>
            </div>
            <div class="rubric-grid-report">
              ${rubricRowsHtml}
            </div>

            <div style="margin-top:16px; padding:16px; background:rgba(139, 92, 246, 0.06); border-left:4px solid var(--accent-purple); border-radius:4px 8px 8px 4px; font-size:13px; line-height:1.6;">
              <strong>Lời nhắn chi tiết từ giáo viên:</strong>
              <p style="margin-top:6px; color:var(--text-primary);">${submission.teacherFeedback}</p>
            </div>
          </div>
        </div>
      `;
    }

    let diffBadgeHtml = '<span class="badge-pill core">Core</span>';
    if (lesson.tierType === 'refresher') diffBadgeHtml = '<span class="badge-pill refresher">Bổ trợ Mất Gốc</span>';
    if (lesson.tierType === 'advanced') diffBadgeHtml = '<span class="badge-pill advanced">Chuyên Sâu Thử Thách</span>';
    if (lesson.tierType === 'boost') diffBadgeHtml = '<span class="badge-pill boost">Bứt Phá Điểm Số</span>';

    detailHtml = `
      <div class="glass-card" style="display:flex; flex-direction:column; gap:16px;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; border-bottom: 1px solid var(--border-light); padding-bottom:12px;">
          <div>
            <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">
              ${diffBadgeHtml}
              <span style="font-size:11px; color:var(--text-secondary); font-weight:600;">Độ khó: ${lesson.difficulty}</span>
            </div>
            <h3 style="font-size: 18px;">${activeAssign.title}</h3>
          </div>
          <span class="quest-status todo">Mức điểm: 10đ</span>
        </div>

        <div>
          <h4 style="font-size:14px; color:var(--text-secondary); margin-bottom:6px;">Mô tả bài tập:</h4>
          <p style="font-size:13px; color:var(--text-muted); line-height:1.5;">${activeAssign.description}</p>
        </div>

        ${submitAreaHtml}
      </div>
    `;
  } else {
    detailHtml = `
      <div class="glass-card" style="display:flex; justify-content:center; align-items:center; height:300px; color:var(--text-muted);">
        Chưa có bài tập nào được chọn.
      </div>
    `;
  }

  container.innerHTML = `
    <div class="homework-panel">
      <div class="glass-card" style="display:flex; flex-direction:column; gap:16px; height:fit-content;">
        <h3 style="font-size:18px;">Bài tập tự luận của em</h3>
        <p class="dashboard-title-sub">Chọn một bài trong danh sách để xem chi tiết hoặc nộp câu trả lời</p>
        <div class="homework-list" style="margin-top: 10px;">
          ${listHtml}
        </div>
      </div>

      <div style="display:flex; flex-direction:column; gap:24px;">
        ${detailHtml}
      </div>
    </div>
  `;

  // Attach assignment click selectors
  const assignCards = container.querySelectorAll('.homework-card-item');
  assignCards.forEach(card => {
    card.addEventListener('click', () => {
      const assignId = card.getAttribute('data-assign-id');
      activeStudentAssignmentId = assignId;
      renderAssignmentsTab();
    });
  });

  // Attach Submission click event
  const submitBtn = document.getElementById('btn-submit-homework');
  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      const answerText = document.getElementById('homework-answer-text').value.trim();
      if (!answerText) {
        showNotification("Vy/Nam/Anh ơi, hãy điền câu trả lời trước khi nộp bài nhé!", "info");
        return;
      }
      if (answerText.length < 50) {
        showNotification("Bài giải quá ngắn. Em hãy phân tích chi tiết hơn để đạt điểm tốt nhé!", "info");
        return;
      }

      stateManager.submitAssignment(student.id, activeStudentAssignmentId, answerText);

      // Fun visual confetti celebration!
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.8 }
        });
      }

      showNotification("Đã nộp bài giải tự luận thành công! Chờ giáo viên chấm điểm nhé.", "success");
      renderAssignmentsTab();
    });
  }
}

// Utility notification popups
function showNotification(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  let icon = '🔔';
  if (type === 'success') icon = '✓';
  if (type === 'info') icon = 'ℹ️';

  toast.innerHTML = `
    <span>${icon}</span>
    <span>${message}</span>
  `;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'slideInRight 0.3s ease-in reverse';
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3500);
}

function escapeHtml(text) {
  if (!text) return '';
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Setup Event Handlers and init widgets
setupEventHandlers();
initAICompanion();

// Trigger first render
stateManager.notify();
