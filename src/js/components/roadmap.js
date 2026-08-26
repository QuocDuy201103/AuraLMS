import { stateManager } from '../state.js';

export function renderRoadmap(containerId, onSelectLesson) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const student = stateManager.getStudent();
  const lessons = stateManager.getRoadmapLessons();
  const recommended = stateManager.getRecommendedLesson();

  // Coordinates mapping for beautiful path visualization
  const nodePositions = {
    "lesson-1": { x: 100, y: 250 },
    "lesson-2": { x: 260, y: 250 },
    "lesson-2-ref": { x: 260, y: 390 }, // Offset down for struggling
    "lesson-2-adv": { x: 260, y: 110 }, // Offset up for advanced
    "lesson-3": { x: 440, y: 250 },
    "lesson-3-boost": { x: 440, y: 110 }, // Offset up for boost average
    "lesson-4": { x: 620, y: 250 },
    "lesson-4-adv": { x: 620, y: 110 }, // Offset up for advanced
    "lesson-5": { x: 780, y: 250 }
  };

  // Define connection paths
  const connections = [
    { from: "lesson-1", to: "lesson-2", type: "core" },
    
    // Branching connections
    { from: "lesson-2", to: "lesson-2-ref", type: "refresher" },
    { from: "lesson-2-ref", to: "lesson-3", type: "refresher" },
    
    { from: "lesson-2", to: "lesson-2-adv", type: "advanced" },
    { from: "lesson-2-adv", to: "lesson-3", type: "advanced" },
    
    { from: "lesson-2", to: "lesson-3", type: "core" }, // normal bypass
    
    { from: "lesson-3", to: "lesson-3-boost", type: "boost" },
    { from: "lesson-3-boost", to: "lesson-4", type: "boost" },
    
    { from: "lesson-3", to: "lesson-4", type: "core" }, // normal bypass
    
    { from: "lesson-4", to: "lesson-4-adv", type: "advanced" },
    { from: "lesson-4-adv", to: "lesson-5", type: "advanced" },
    
    { from: "lesson-4", to: "lesson-5", type: "core" } // normal bypass
  ];

  let svgHtml = `<svg id="roadmap-svg" viewBox="0 0 900 500" width="100%" height="100%">
    <defs>
      <linearGradient id="core-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#8b5cf6" />
        <stop offset="100%" stop-color="#3b82f6" />
      </linearGradient>
      <linearGradient id="ref-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#f97316" />
        <stop offset="100%" stop-color="#fdba74" />
      </linearGradient>
      <linearGradient id="adv-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#10b981" />
        <stop offset="100%" stop-color="#34d399" />
      </linearGradient>
      <linearGradient id="boost-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#3b82f6" />
        <stop offset="100%" stop-color="#60a5fa" />
      </linearGradient>
      
      <filter id="glow-core" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="6" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
  `;

  // Filter connections to show only those relevant to the current student's visible roadmap
  const visibleLessonIds = lessons.map(l => l.id);
  const activeConnections = connections.filter(conn => {
    // If the node isn't in their visible roadmap, skip connection
    if (!visibleLessonIds.includes(conn.from) || !visibleLessonIds.includes(conn.to)) {
      return false;
    }
    
    // Special adaptive bypass rules to prevent visual overlap:
    // If they have a refresher branch visible (Struggling Vy), hide the direct lesson-2 -> lesson-3 line
    if (student.tier === 'struggling' && conn.from === 'lesson-2' && conn.to === 'lesson-3') {
      return false;
    }
    // If they have an advanced branch visible (Excellent Anh), hide direct lines
    if (student.tier === 'excellent') {
      if (conn.from === 'lesson-2' && conn.to === 'lesson-3') return false;
      if (conn.from === 'lesson-4' && conn.to === 'lesson-5') return false;
    }
    // If they have average boost visible (Nam), hide direct line-3 -> line-4
    if (student.tier === 'average' && conn.from === 'lesson-3' && conn.to === 'lesson-4') {
      return false;
    }

    return true;
  });

  // Render connection lines
  activeConnections.forEach(conn => {
    const fromPos = nodePositions[conn.from];
    const toPos = nodePositions[conn.to];
    if (!fromPos || !toPos) return;

    // Check status of connection (completed, unlocked, or locked)
    const isFromCompleted = student.completedLessons.includes(conn.from);
    const isToUnlocked = student.unlockedLessons.includes(conn.to);
    
    let lineClass = "svg-connection-line";
    if (isFromCompleted && isToUnlocked) {
      lineClass += " completed";
    } else if (isToUnlocked) {
      lineClass += " unlocked";
    }

    // Apply specific paths colors
    if (conn.type === 'refresher') lineClass += " refresher-path";
    if (conn.type === 'advanced') lineClass += " advanced-path";
    if (conn.type === 'boost') lineClass += " boost-path";

    // Draw lines as subtle Bezier curves for organic look
    const dx = toPos.x - fromPos.x;
    const dy = toPos.y - fromPos.y;
    
    let pathD = "";
    if (dy !== 0) {
      // Curved line for branches
      const cx1 = fromPos.x + dx * 0.4;
      const cy1 = fromPos.y;
      const cx2 = fromPos.x + dx * 0.6;
      const cy2 = toPos.y;
      pathD = `M ${fromPos.x} ${fromPos.y} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${toPos.x} ${toPos.y}`;
    } else {
      // Straight horizontal line for core path
      pathD = `M ${fromPos.x} ${fromPos.y} L ${toPos.x} ${toPos.y}`;
    }

    svgHtml += `<path d="${pathD}" class="${lineClass}" />`;
  });

  // Render Nodes
  lessons.forEach(lesson => {
    const pos = nodePositions[lesson.id];
    if (!pos) return;

    const isCompleted = student.completedLessons.includes(lesson.id);
    const isUnlocked = student.unlockedLessons.includes(lesson.id);
    const isActive = recommended && recommended.id === lesson.id;

    let nodeClass = "roadmap-node";
    if (isCompleted) nodeClass += " completed";
    else if (isActive) nodeClass += " active";
    else if (!isUnlocked) nodeClass += " locked";

    // Add path types
    if (lesson.tierType === 'refresher') nodeClass += " refresher";
    if (lesson.tierType === 'advanced') nodeClass += " advanced";
    if (lesson.tierType === 'boost') nodeClass += " boost";

    // Icon or short label inside circle
    let iconChar = "🔒";
    if (isUnlocked) {
      if (isCompleted) iconChar = "✓";
      else if (lesson.tierType === 'refresher') iconChar = "🛡️";
      else if (lesson.tierType === 'advanced') iconChar = "👑";
      else if (lesson.tierType === 'boost') iconChar = "🚀";
      else iconChar = "⚡";
    }

    svgHtml += `
      <g class="${nodeClass}" data-lesson-id="${lesson.id}">
        <circle cx="${pos.x}" cy="${pos.y}" r="${isActive ? 28 : 24}" class="node-circle" />
        <text x="${pos.x}" y="${pos.y + 5}" text-anchor="middle" font-size="${isCompleted ? '16px' : '14px'}" font-weight="bold" fill="white" style="user-select: none;">
          ${iconChar}
        </text>
        <text x="${pos.x}" y="${pos.y + 42}" text-anchor="middle" font-size="11px" font-weight="600" fill="#a1a1aa" style="user-select: none;">
          ${lesson.title.split(":")[0]}
        </text>
      </g>
    `;
  });

  svgHtml += `</svg>`;
  container.innerHTML = `
    <div class="glass-card" style="width:100%; overflow: auto;">
      <div class="dashboard-heading">
        <div>
          <h3 style="font-size: 18px; margin-bottom: 4px;">Bản đồ học tập cá nhân hóa</h3>
          <p class="dashboard-title-sub">Lộ trình động tự động rẽ nhánh dựa vào điểm kiểm tra và lực học</p>
        </div>
        <div style="display:flex; gap:10px; font-size:11px;">
          <span class="badge-pill core">Cốt lõi</span>
          ${student.tier === 'struggling' ? '<span class="badge-pill refresher">Bổ trợ gốc</span>' : ''}
          ${student.tier === 'average' ? '<span class="badge-pill boost">Bứt phá</span>' : ''}
          ${student.tier === 'excellent' ? '<span class="badge-pill advanced">Chuyên sâu</span>' : ''}
        </div>
      </div>
      <div class="roadmap-container">
        ${svgHtml}
      </div>
      <div id="lesson-detail-panel" class="lesson-quickview glass-card" style="margin-top: 24px; border-color: rgba(139, 92, 246, 0.15); display:none;">
        <!-- Details loaded dynamically -->
      </div>
    </div>
  `;

  // Attach click listeners to nodes
  const nodes = container.querySelectorAll('.roadmap-node');
  nodes.forEach(node => {
    node.addEventListener('click', () => {
      const lessonId = node.getAttribute('data-lesson-id');
      const lesson = lessons.find(l => l.id === lessonId);
      if (lesson) {
        showLessonDetails(lesson, student, onSelectLesson);
      }
    });
  });

  // Automatically select recommended lesson on load
  if (recommended) {
    const recommendedNode = container.querySelector(`[data-lesson-id="${recommended.id}"]`);
    if (recommendedNode) {
      showLessonDetails(recommended, student, onSelectLesson);
    }
  }
}

function showLessonDetails(lesson, student, onSelectLesson) {
  const panel = document.getElementById('lesson-detail-panel');
  if (!panel) return;

  const isUnlocked = student.unlockedLessons.includes(lesson.id);
  const isCompleted = student.completedLessons.includes(lesson.id);

  let statusText = "Đang khóa";
  let statusClass = "locked";
  if (isUnlocked) {
    if (isCompleted) {
      statusText = "Đã hoàn thành";
      statusClass = "completed";
    } else {
      statusText = "Sẵn sàng học";
      statusClass = "todo";
    }
  }

  // Find associated assignment
  const assignmentsList = stateManager.state.assignments;
  const assignment = assignmentsList.find(a => a.lessonId === lesson.id);

  panel.style.display = 'flex';
  panel.style.flexDirection = 'column';
  panel.style.gap = '14px';
  panel.classList.add('show');

  let typeBadgeHtml = '<span class="badge-pill core">Core</span>';
  if (lesson.tierType === 'refresher') typeBadgeHtml = '<span class="badge-pill refresher">Bổ trợ Mất Gốc</span>';
  if (lesson.tierType === 'advanced') typeBadgeHtml = '<span class="badge-pill advanced">Chuyên Sâu Thử Thách</span>';
  if (lesson.tierType === 'boost') typeBadgeHtml = '<span class="badge-pill boost">Bứt Phá Điểm Số</span>';
  let actionButtonHtml = '';
  if (isUnlocked) {
    actionButtonHtml += `
      <button class="action-btn" id="btn-read-lecture" style="margin-top: 8px; background: rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.1); color:var(--text-primary); box-shadow:none;">
        <svg style="width:16px;height:16px;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        <span>Đọc Bài Giảng Lý Thuyết</span>
      </button>
    `;

    if (assignment) {
      const submission = student.submittedAssignments.find(sa => sa.assignmentId === assignment.id);
      let btnText = "Làm Bài Tập Tự Luận";
      if (submission) {
        if (submission.status === 'graded') {
          btnText = "Xem Báo Cáo Chấm Điểm";
        } else {
          btnText = "Xem Bài Đã Nộp (Chờ chấm)";
        }
      }
      actionButtonHtml += `
        <button class="action-btn" id="btn-start-lesson" style="margin-top: 8px;">
          <span>${btnText}</span>
          <svg style="width:16px;height:16px;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      `;
    }
  } else {
    actionButtonHtml = `
      <button class="action-btn" style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.05); color:var(--text-muted); cursor:not-allowed; box-shadow:none; margin-top: 8px;" disabled>
        <span>Bài học đang được khóa</span>
      </button>
    `;
  }

  panel.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:flex-start;">
      <div>
        <div style="display:flex; align-items:center; gap:10px; margin-bottom: 6px;">
          ${typeBadgeHtml}
          <span style="font-size:12px; color:var(--text-secondary); font-weight:600;">Độ khó: ${lesson.difficulty}</span>
          <span style="font-size:12px; color:var(--text-muted);">• Thời gian học: ${lesson.time}</span>
        </div>
        <h4 style="font-size:18px; color:var(--text-primary); margin-bottom: 6px;">${lesson.title}</h4>
      </div>
      <span class="quest-status ${statusClass}">${statusText}</span>
    </div>
    <p style="font-size:14px; color:var(--text-secondary); line-height:1.6;">${lesson.description}</p>
    <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
      ${actionButtonHtml}
    </div>
  `;

  const readBtn = document.getElementById('btn-read-lecture');
  if (readBtn && isUnlocked) {
    readBtn.addEventListener('click', () => {
      openLectureModal(lesson, student, onSelectLesson);
    });
  }

  const startBtn = document.getElementById('btn-start-lesson');
  if (startBtn && isUnlocked) {
    startBtn.addEventListener('click', () => {
      if (assignment) {
        onSelectLesson(assignment.id);
      }
    });
  }
}

export function openLectureModal(lesson, student, onSelectLesson) {
  const modal = document.getElementById('lecture-modal');
  const title = document.getElementById('lecture-modal-title');
  const body = document.getElementById('lecture-modal-body');
  const closeBtn = document.getElementById('btn-close-lecture');
  const completeBtn = document.getElementById('btn-complete-lecture');

  if (!modal || !title || !body || !closeBtn || !completeBtn) return;

  title.innerText = lesson.title;
  body.innerHTML = lesson.content || '<p>Nội dung bài giảng đang được cập nhật...</p>';
  modal.style.display = 'flex';

  closeBtn.onclick = () => {
    modal.style.display = 'none';
  };

  // Find associated assignment
  const assignmentsList = stateManager.state.assignments;
  const assignment = assignmentsList.find(a => a.lessonId === lesson.id);

  if (assignment) {
    completeBtn.querySelector('span').innerText = "Đã hiểu bài giảng • Đi tới phần làm bài tập";
  } else {
    completeBtn.querySelector('span').innerText = "Đã học xong lý thuyết • Hoàn thành bài giảng";
  }

  completeBtn.onclick = () => {
    modal.style.display = 'none';
    
    // Play visual confetti
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 60,
        spread: 40,
        origin: { y: 0.8 }
      });
    }

    // Update state to mark this lesson completed
    stateManager.completeLesson(student.id, lesson.id);
    
    // Check if there is an assignment to redirect to
    if (assignment) {
      showNotification(`Chúc mừng! Bạn đã hoàn thành phần lý thuyết. Hãy làm bài tập tự luận bên dưới để củng cố nhé.`, 'success');
      onSelectLesson(assignment.id);
    } else {
      showNotification(`Chúc mừng! Bạn đã hoàn thành bài học: ${lesson.title}`, 'success');
    }
  };
}

function showNotification(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  let icon = '🔔';
  if (type === 'success') icon = '✓';
  if (type === 'info') icon = 'ℹ️';

  toast.innerHTML = `
    <span>${icon}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'slideInRight 0.3s ease-in reverse';
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3500);
}
