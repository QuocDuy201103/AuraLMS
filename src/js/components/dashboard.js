import { stateManager } from '../state.js';
import { openLectureModal } from './roadmap.js';

export function renderStudentDashboard(containerId, onSelectLesson) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const student = stateManager.getStudent();
  const recommended = stateManager.getRecommendedLesson();

  // Welcome message based on student level (Problem 1)
  let welcomeDesc = "";
  let bannerClass = "";
  if (student.tier === 'excellent') {
    welcomeDesc = "Bạn đang dẫn đầu lớp học với tư duy thuật toán vượt trội. Hãy tiếp tục thử thách bản thân với các bài tập chuyên sâu nhé!";
    bannerClass = "excellent-recom";
  } else if (student.tier === 'average') {
    welcomeDesc = "Phong độ học tập của bạn rất ổn định! Hãy chú ý các gợi ý 'Bứt phá' để trang bị kỹ năng nâng cao và vươn lên nhóm dẫn đầu nhé.";
    bannerClass = "average-recom";
  } else if (student.tier === 'struggling') {
    welcomeDesc = "Chào mừng Vy! Hãy đi từng bước nhỏ cùng Aura LMS. Mỗi bài ôn tập nhỏ sẽ giúp nền móng của em vững chắc hơn bao giờ hết.";
    bannerClass = "struggling-recom";
  }

  // Generate suggested quests based on level
  let quests = [];
  if (student.tier === 'struggling') {
    quests = [
      { name: "Đọc lý thuyết cấu trúc Vòng lặp", xp: "20 XP", done: student.completedLessons.includes('lesson-2') },
      { name: "Trao đổi với Trợ lý ảo AI về cách tránh lặp vô tận", xp: "10 XP", done: false },
      { name: "Nộp bài tập ôn tập vòng lặp vẽ hình", xp: "50 XP", done: student.submittedAssignments.some(a => a.assignmentId === 'assign-4') }
    ];
  } else if (student.tier === 'average') {
    quests = [
      { name: "Giải thích ưu/nhược điểm của Mảng", xp: "30 XP", done: student.submittedAssignments.some(a => a.assignmentId === 'assign-3') },
      { name: "Luyện tập tối ưu mảng trong bài học Bứt phá", xp: "40 XP", done: student.completedLessons.includes('lesson-3-boost') },
      { name: "Đạt điểm số từ 8.5 trở lên để mở khóa đệ quy nâng cao", xp: "60 XP", done: false }
    ];
  } else if (student.tier === 'excellent') {
    quests = [
      { name: "Phân tích bài toán Fibonacci độ phức tạp O(log n)", xp: "40 XP", done: student.completedLessons.includes('lesson-4-adv') },
      { name: "Đóng vai trò Trợ giảng: giải đáp thắc mắc cho bạn học", xp: "50 XP", done: true },
      { name: "Tối ưu hóa bộ nhớ hàm đệ quy xuống O(1)", xp: "60 XP", done: student.submittedAssignments.some(a => a.assignmentId === 'assign-2') }
    ];
  }

  let questHtml = '';
  quests.forEach(q => {
    questHtml += `
      <div class="quest-item">
        <div class="quest-left">
          <div class="quest-icon">${q.done ? '✓' : '🔥'}</div>
          <div class="quest-info">
            <span class="quest-title" style="${q.done ? 'text-decoration: line-through; color: var(--text-muted);' : ''}">${q.name}</span>
            <span class="quest-xp">${q.xp}</span>
          </div>
        </div>
        <span class="quest-status ${q.done ? 'completed' : 'todo'}">${q.done ? 'Đã xong' : 'Chưa làm'}</span>
      </div>
    `;
  });

  // Recommended Lesson HTML
  let recommendedHtml = '';
  if (recommended) {
    // Find associated assignment
    const assignment = stateManager.state.assignments.find(a => a.lessonId === recommended.id);
    let btnText = "Bắt đầu học ngay";
    if (assignment) {
      const sub = student.submittedAssignments.find(sa => sa.assignmentId === assignment.id);
      if (sub) {
        btnText = sub.status === 'graded' ? "Xem báo cáo chấm điểm" : "Xem bài đã nộp";
      } else {
        btnText = "Làm bài tập ngay";
      }
    }

    let typeBadgeHtml = '<span class="badge-pill core">Cốt lõi</span>';
    if (recommended.tierType === 'refresher') typeBadgeHtml = '<span class="badge-pill refresher">Bổ trợ</span>';
    if (recommended.tierType === 'advanced') typeBadgeHtml = '<span class="badge-pill advanced">Chuyên sâu</span>';
    if (recommended.tierType === 'boost') typeBadgeHtml = '<span class="badge-pill boost">Bứt phá</span>';

    recommendedHtml = `
      <div class="glass-card recommend-card ${bannerClass}" style="margin-top: 24px;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start;">
          <div>
            <div style="display:flex; align-items:center; gap:10px; margin-bottom: 6px;">
              ${typeBadgeHtml}
              <span style="font-size:12px; color:var(--text-secondary); font-weight:600;">Đề xuất tối ưu tiếp theo</span>
            </div>
            <h3 style="font-size: 18px; margin-bottom: 6px;">Bài học: ${recommended.title}</h3>
            <p style="font-size: 13px; color: var(--text-secondary); max-width: 500px; margin-bottom: 12px;">${recommended.description}</p>
            <div style="display:flex; gap:12px; font-size:12px; color:var(--text-muted); margin-bottom: 14px;">
              <span>Độ khó: ${recommended.difficulty}</span>
              <span>•</span>
              <span>Thời gian: ${recommended.time}</span>
            </div>
          </div>
          <button class="action-btn" id="btn-dashboard-recom">
            <span>${btnText}</span>
            <svg style="width:16px;height:16px;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    `;
  }

  // Achievements HTML
  let achievementsHtml = '';
  if (student.achievements.length === 0) {
    achievementsHtml = `<div style="grid-column: span 2; padding: 20px; text-align: center; color: var(--text-muted); font-size:12px;">Chưa đạt huy hiệu nào. Hãy hoàn thành bài học để mở khóa!</div>`;
  } else {
    student.achievements.forEach(ach => {
      achievementsHtml += `
        <div class="achievement-card">
          <div class="achievement-badge">${ach.icon}</div>
          <div class="achievement-name">${ach.name}</div>
          <div class="achievement-desc">${ach.description}</div>
        </div>
      `;
    });
  }

  // Graded homework logs for student transparent review (Problem 2)
  let homeworkReportHtml = '';
  const gradedAssignments = student.submittedAssignments.filter(a => a.status === 'graded');
  
  if (gradedAssignments.length === 0) {
    homeworkReportHtml = `
      <div style="padding: 16px; text-align: center; color: var(--text-muted); font-size: 13px;">
        Chưa có bài tập tự luận nào được chấm điểm.
      </div>
    `;
  } else {
    gradedAssignments.forEach(sub => {
      const assignment = stateManager.state.assignments.find(a => a.id === sub.assignmentId);
      if (!assignment) return;

      homeworkReportHtml += `
        <div style="background: rgba(255,255,255,0.01); border: 1px solid var(--border-light); padding:16px; border-radius:12px; margin-bottom:12px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <h4 style="font-size:14px; font-weight:600;">${assignment.title}</h4>
            <span class="homework-status-badge graded">Điểm số: ${sub.grade} / 10</span>
          </div>
          <div style="font-size:12px; color:var(--text-secondary); margin-bottom:8px; line-height: 1.5;">
            <strong>Bài viết của bạn:</strong> "${sub.studentAnswer.substring(0, 100)}..."
          </div>
          <div style="background: rgba(139, 92, 246, 0.04); border-left: 3px solid var(--accent-purple); padding:10px; border-radius:4px; font-size:12px; color:var(--text-primary); line-height: 1.5; margin-top:8px;">
            <strong>Nhận xét từ giáo viên:</strong> ${sub.teacherFeedback}
          </div>
        </div>
      `;
    });
  }

  container.innerHTML = `
    <div class="welcome-banner">
      <div>
        <span class="tier-tag ${student.tier}" style="margin-bottom:12px;">Nhóm học lực: ${student.tier === 'excellent' ? 'Xuất Sắc' : student.tier === 'average' ? 'Trung Bình' : 'Cần hỗ trợ'}</span>
        <h1 class="welcome-title">Chào mừng trở lại, ${student.name}!</h1>
        <p class="welcome-desc">${welcomeDesc}</p>
      </div>
      <div class="user-avatar" style="width:70px; height:70px; font-size:24px; box-shadow: 0 0 20px rgba(139,92,246,0.3)">
        ${student.avatar}
      </div>
    </div>

    <div class="student-grid">
      <div style="display:flex; flex-direction:column; gap:24px;">
        <!-- Adaptive progress stats cards -->
        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:16px;">
          <div class="glass-card">
            <span style="font-size:12px; color:var(--text-secondary); font-weight:600;">TIẾN ĐỘ LỘ TRÌNH</span>
            <div style="display:flex; align-items:center; justify-content:space-between; margin-top:8px;">
              <span class="stat-value">${student.progress}%</span>
              <div class="progress-bar-container">
                <div class="progress-bar-fill" style="width: ${student.progress}%"></div>
              </div>
            </div>
            <div class="stat-desc">Hoàn thành ${student.completedLessons.length} / ${stateManager.getRoadmapLessons().length} bài học phù hợp</div>
          </div>

          <div class="glass-card">
            <span style="font-size:12px; color:var(--text-secondary); font-weight:600;">HOẠT ĐỘNG TUẦN NÀY</span>
            <div class="stat-value">${student.weeklyStudyTime.reduce((a,b)=>a+b, 0)} Phút</div>
            <div class="stat-desc">Thời gian học tập tích lũy qua tương tác bài học & chatbot</div>
          </div>
        </div>

        ${recommendedHtml}

        <!-- Transparent report panel -->
        <div class="glass-card">
          <h3 style="font-size: 16px; border-bottom: 1px solid var(--border-light); padding-bottom:8px; margin-bottom:14px;">Báo cáo phản hồi & Điểm tự luận minh bạch</h3>
          ${homeworkReportHtml}
        </div>
      </div>

      <div style="display:flex; flex-direction:column; gap:24px;">
        <!-- Daily Quests Board -->
        <div class="glass-card">
          <h3 style="font-size: 16px; border-bottom: 1px solid var(--border-light); padding-bottom:8px;">Nhiệm vụ hàng ngày (Quest)</h3>
          <div class="quest-list">
            ${questHtml}
          </div>
        </div>

        <!-- Achievements Card -->
        <div class="glass-card">
          <h3 style="font-size: 16px; border-bottom: 1px solid var(--border-light); padding-bottom:8px;">Huy hiệu đã mở khóa</h3>
          <div class="achievement-grid">
            ${achievementsHtml}
          </div>
        </div>
      </div>
    </div>
  `;

  // Attach Recommended Card launch button event
  const recomBtn = document.getElementById('btn-dashboard-recom');
  if (recomBtn && recommended) {
    recomBtn.addEventListener('click', () => {
      openLectureModal(recommended, student, onSelectLesson);
    });
  }
}

export function renderTeacherDashboard(containerId, onSelectGrade) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const state = stateManager.state;

  // Calculate statistics
  const totalStudents = state.students.length;
  const excellentCount = state.students.filter(s => s.tier === 'excellent').length;
  const averageCount = state.students.filter(s => s.tier === 'average').length;
  const strugglingCount = state.students.filter(s => s.tier === 'struggling').length;

  const pendingGradings = [];
  state.students.forEach(student => {
    student.submittedAssignments.forEach(sub => {
      if (sub.status === 'pending') {
        const assignment = state.assignments.find(a => a.id === sub.assignmentId);
        pendingGradings.push({ student, submission: sub, assignment });
      }
    });
  });

  // Build automatic alerts (Problem 1 & 3)
  let alertsHtml = '';
  
  // Alert for Struggling Students
  const strugglingStudents = state.students.filter(s => s.tier === 'struggling');
  strugglingStudents.forEach(s => {
    // Check if they have pending/graded homework and need attention
    alertsHtml += `
      <div class="alert-message-card warning">
        <svg style="width:20px; height:20px; flex-shrink:0;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <div>
          <strong style="font-size:13px;">Cảnh báo học tập: Học viên ${s.name} (Nhóm Cần hỗ trợ)</strong>
          <p style="font-size:11px; margin-top:2px; opacity:0.9;">Học sinh có lực học logic tương đối thấp (${s.skills.logic}%). Lộ trình đã tự động kích hoạt bài giảng Bổ trợ Vòng lặp. Cần theo sát tiến trình làm bài tập.</p>
        </div>
      </div>
    `;
  });

  // Alert for Average Students (Opportunity to boost)
  const averageStudents = state.students.filter(s => s.tier === 'average');
  averageStudents.forEach(s => {
    alertsHtml += `
      <div class="alert-message-card info">
        <svg style="width:20px; height:20px; flex-shrink:0;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div>
          <strong style="font-size:13px;">Cơ hội bứt phá: Học viên ${s.name} (Nhóm Trung bình)</strong>
          <p style="font-size:11px; margin-top:2px; opacity:0.9;">Đạt tiến trình học tốt (${s.progress}%). Nếu bài tập Mảng sắp tới đạt điểm giỏi (>= 8.5), hệ thống sẽ gợi ý lộ trình Đệ quy nâng cao để thúc đẩy bứt phá.</p>
        </div>
      </div>
    `;
  });

  // Alert for Excellent Students (Needs more challenge)
  const excellentStudents = state.students.filter(s => s.tier === 'excellent');
  excellentStudents.forEach(s => {
    alertsHtml += `
      <div class="alert-message-card success">
        <svg style="width:20px; height:20px; flex-shrink:0;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div>
          <strong style="font-size:13px;">Thử thách bổ sung: Học viên ${s.name} (Nhóm Xuất sắc)</strong>
          <p style="font-size:11px; margin-top:2px; opacity:0.9;">Đã hoàn thành xuất sắc các chuyên đề cơ bản. Trợ lý AI đã mở chế độ gợi ý tài liệu học thuật toán CLRS/Graph để tránh gây nhàm chán.</p>
        </div>
      </div>
    `;
  });

  // Create pending grading list HTML
  let pendingHtml = '';
  if (pendingGradings.length === 0) {
    pendingHtml = `<div style="padding:16px; text-align:center; color:var(--text-muted); font-size:13px;">Tất cả các bài nộp đã được chấm xong! 🎉</div>`;
  } else {
    pendingGradings.forEach(p => {
      let tierBadge = '';
      if (p.student.tier === 'excellent') tierBadge = `<span class="badge-pill core" style="font-size:9px; background:var(--tier-excellent-bg); color:var(--tier-excellent)">Xuất sắc</span>`;
      if (p.student.tier === 'average') tierBadge = `<span class="badge-pill core" style="font-size:9px; background:var(--tier-average-bg); color:var(--tier-average)">Trung bình</span>`;
      if (p.student.tier === 'struggling') tierBadge = `<span class="badge-pill core" style="font-size:9px; background:var(--tier-struggling-bg); color:var(--tier-struggling)">Cần hỗ trợ</span>`;

      pendingHtml += `
        <div class="quest-item" style="margin-bottom:8px;">
          <div class="quest-left">
            <div class="user-avatar" style="width:32px; height:32px; font-size:12px; box-shadow:none;">
              ${p.student.avatar}
            </div>
            <div class="quest-info">
              <span class="quest-title">${p.student.name} ${tierBadge}</span>
              <span style="font-size:11px; color:var(--text-secondary);">${p.assignment.title}</span>
            </div>
          </div>
          <button class="btn-ai-generate btn-teacher-grade" data-student-id="${p.student.id}" data-assign-id="${p.assignment.id}" style="padding:6px 12px; font-size:11px;">Chấm bài</button>
        </div>
      `;
    });
  }

  // Create student roster list
  let rosterHtml = '';
  state.students.forEach(s => {
    let tierText = '';
    let alertLabel = '';
    
    if (s.tier === 'excellent') {
      tierText = `<span class="tier-tag excellent" style="font-size:10px;">Xuất sắc</span>`;
      alertLabel = `<span style="font-size:11px; color:var(--tier-excellent); font-weight:600;">Cần thêm thách thức</span>`;
    } else if (s.tier === 'average') {
      tierText = `<span class="tier-tag average" style="font-size:10px;">Trung bình</span>`;
      alertLabel = `<span style="font-size:11px; color:var(--tier-average); font-weight:600;">Ổn định - Đang bứt phá</span>`;
    } else if (s.tier === 'struggling') {
      tierText = `<span class="tier-tag struggling" style="font-size:10px;">Cần hỗ trợ</span>`;
      alertLabel = `<span style="font-size:11px; color:var(--tier-struggling); font-weight:600;">Cần hỗ trợ sát sao</span>`;
    }

    // Calculate completed assignments
    const submittedCount = s.submittedAssignments.length;
    const gradedCount = s.submittedAssignments.filter(a => a.status === 'graded').length;

    rosterHtml += `
      <div class="student-row-card">
        <div style="display:flex; align-items:center; gap:16px;">
          <div class="user-avatar" style="width:40px; height:40px; font-size:14px; box-shadow:none;">
            ${s.avatar}
          </div>
          <div>
            <div style="font-size:14px; font-weight:700;">${s.name} ${tierText}</div>
            <div style="font-size:11px; color:var(--text-muted); margin-top:2px;">${s.email}</div>
          </div>
        </div>
        
        <div style="display:flex; flex-direction:column; gap:4px; align-items:center;">
          <div style="font-size:12px; font-weight:600; color:var(--text-secondary);">Tiến trình lộ trình</div>
          <div style="display:flex; align-items:center; gap:8px;">
            <div class="progress-bar-container" style="width:100px;">
              <div class="progress-bar-fill" style="width: ${s.progress}%"></div>
            </div>
            <span style="font-size:11px; font-weight:700;">${s.progress}%</span>
          </div>
        </div>

        <div style="display:flex; flex-direction:column; gap:4px; align-items:center;">
          <div style="font-size:12px; font-weight:600; color:var(--text-secondary);">Bài tập nộp</div>
          <span style="font-size:11px; font-weight:700; color:var(--text-primary);">${submittedCount} nộp (${gradedCount} đã chấm)</span>
        </div>

        <div style="text-align:right;">
          <div>${alertLabel}</div>
          <button class="btn-ai-generate btn-teacher-view-analytics" data-student-id="${s.id}" style="margin-top:6px; font-size:10px;">Xem Báo Cáo Kỹ Năng</button>
        </div>
      </div>
    `;
  });

  container.innerHTML = `
    <!-- Top Stats Row -->
    <div style="display:grid; grid-template-columns: repeat(4, 1fr); gap:16px; margin-bottom:24px;">
      <div class="glass-card">
        <span style="font-size:12px; color:var(--text-secondary); font-weight:600;">SĨ SỐ LỚP HỌC</span>
        <div class="stat-value">${totalStudents} Học viên</div>
        <div class="stat-desc">Đăng ký hoạt động học lập trình</div>
      </div>
      <div class="glass-card">
        <span style="font-size:12px; color:var(--text-secondary); font-weight:600;">NHÓM XUẤT SẮC</span>
        <div class="stat-value" style="background:var(--tier-excellent); -webkit-text-fill-color: var(--tier-excellent);">${excellentCount}</div>
        <div class="stat-desc">Nắm bắt nhanh, cần thử thách sâu</div>
      </div>
      <div class="glass-card">
        <span style="font-size:12px; color:var(--text-secondary); font-weight:600;">NHÓM TRUNG BÌNH</span>
        <div class="stat-value" style="background:var(--tier-average); -webkit-text-fill-color: var(--tier-average);">${averageCount}</div>
        <div class="stat-desc">Ổn định, đang đẩy nhanh bứt phá</div>
      </div>
      <div class="glass-card">
        <span style="font-size:12px; color:var(--text-secondary); font-weight:600;">NHÓM CẦN HỖ TRỢ</span>
        <div class="stat-value" style="background:var(--tier-struggling); -webkit-text-fill-color: var(--tier-struggling);">${strugglingCount}</div>
        <div class="stat-desc">Mất gốc, cần chia nhỏ từng bước</div>
      </div>
    </div>

    <div class="student-grid">
      <div style="display:flex; flex-direction:column; gap:24px;">
        <!-- Class list roster -->
        <div class="glass-card">
          <h3 style="font-size: 16px; border-bottom: 1px solid var(--border-light); padding-bottom:8px; margin-bottom:16px;">Sổ điểm & Tiến trình học viên</h3>
          ${rosterHtml}
        </div>
      </div>

      <div style="display:flex; flex-direction:column; gap:24px;">
        <!-- Pending Assignments List -->
        <div class="glass-card">
          <h3 style="font-size: 16px; border-bottom: 1px solid var(--border-light); padding-bottom:8px; margin-bottom:12px;">Bài tập tự luận đang chờ chấm</h3>
          <div class="quest-list">
            ${pendingHtml}
          </div>
        </div>

        <!-- Automatic notifications / Warnings -->
        <div class="glass-card">
          <h3 style="font-size: 16px; border-bottom: 1px solid var(--border-light); padding-bottom:8px;">Hệ thống cảnh báo học tập</h3>
          <div class="alerts-panel">
            ${alertsHtml}
          </div>
        </div>
      </div>
    </div>
  `;

  // Attach roster buttons event handlers
  const gradeButtons = container.querySelectorAll('.btn-teacher-grade');
  gradeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const studentId = btn.getAttribute('data-student-id');
      const assignId = btn.getAttribute('data-assign-id');
      onSelectGrade(studentId, assignId);
    });
  });

  const viewButtons = container.querySelectorAll('.btn-teacher-view-analytics');
  viewButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const studentId = btn.getAttribute('data-student-id');
      stateManager.selectStudent(studentId);
      // Switch to student view's analytics to inspect their charts
      stateManager.setRole('student');
      stateManager.setTab('analytics');
      
      // Update global UI elements
      const roleStudentBtn = document.getElementById('role-student');
      const roleTeacherBtn = document.getElementById('role-teacher');
      const studentPicker = document.getElementById('student-picker');
      
      if (roleStudentBtn && roleTeacherBtn && studentPicker) {
        roleTeacherBtn.classList.remove('active');
        roleStudentBtn.classList.add('active');
        studentPicker.style.display = 'block';
        studentPicker.value = studentId;
      }
    });
  });
}
