import { stateManager } from '../state.js';

export function renderGrading(containerId, activeStudentId = null, activeAssignmentId = null) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const state = stateManager.state;
  
  // Find all pending and graded assignments in the class
  const allSubmissions = [];
  state.students.forEach(student => {
    student.submittedAssignments.forEach(sub => {
      const assignment = state.assignments.find(a => a.id === sub.assignmentId);
      allSubmissions.push({
        student,
        submission: sub,
        assignment
      });
    });
  });

  // Sort submissions: pending first, then by date desc
  allSubmissions.sort((a, b) => {
    if (a.submission.status === 'pending' && b.submission.status !== 'pending') return -1;
    if (a.submission.status !== 'pending' && b.submission.status === 'pending') return 1;
    return new Date(b.submission.submittedDate) - new Date(a.submission.submittedDate);
  });

  // Find active submission to grade
  let activeSub = null;
  if (activeStudentId && activeAssignmentId) {
    activeSub = allSubmissions.find(s => s.student.id === activeStudentId && s.assignment.id === activeAssignmentId);
  } else if (activeStudentId) {
    // Backward compatibility: if only one parameter is passed, treat it as activeAssignmentId
    activeSub = allSubmissions.find(s => s.assignment.id === activeStudentId);
  }
  if (!activeSub && allSubmissions.length > 0) {
    activeSub = allSubmissions[0];
  }

  // Create list of submissions for sidebar list
  let listHtml = '';
  if (allSubmissions.length === 0) {
    listHtml = `<div style="padding: 20px; text-align: center; color: var(--text-muted); font-size:14px;">Chưa có bài nộp nào cần chấm.</div>`;
  } else {
    allSubmissions.forEach(sub => {
      const isActive = activeSub && 
                       activeSub.student.id === sub.student.id && 
                       activeSub.assignment.id === sub.assignment.id;
      
      const statusText = sub.submission.status === 'pending' ? 'Chưa chấm' : `Điểm: ${sub.submission.grade}`;
      const statusClass = sub.submission.status === 'pending' ? 'pending' : 'graded';

      let tierBadge = '';
      if (sub.student.tier === 'excellent') tierBadge = `<span class="badge-pill core" style="font-size:9px; background:var(--tier-excellent-bg); color:var(--tier-excellent)">Xuất sắc</span>`;
      if (sub.student.tier === 'average') tierBadge = `<span class="badge-pill core" style="font-size:9px; background:var(--tier-average-bg); color:var(--tier-average)">Trung bình</span>`;
      if (sub.student.tier === 'struggling') tierBadge = `<span class="badge-pill core" style="font-size:9px; background:var(--tier-struggling-bg); color:var(--tier-struggling)">Cần hỗ trợ</span>`;

      listHtml += `
        <div class="quest-item homework-card-item ${isActive ? 'active' : ''}" 
             data-student-id="${sub.student.id}" 
             data-assign-id="${sub.assignment.id}"
             style="cursor:pointer; margin-bottom: 8px;">
          <div class="quest-left">
            <div class="user-avatar" style="width:32px; height:32px; font-size:12px; box-shadow:none;">
              ${sub.student.avatar}
            </div>
            <div class="quest-info">
              <span class="quest-title" style="font-size:13px;">${sub.student.name} ${tierBadge}</span>
              <span style="font-size:11px; color:var(--text-secondary);">${sub.assignment.title}</span>
            </div>
          </div>
          <span class="homework-status-badge ${statusClass}">${statusText}</span>
        </div>
      `;
    });
  }

  // Create grading panel
  let gradingFormHtml = '';
  if (activeSub) {
    const student = activeSub.student;
    const sub = activeSub.submission;
    const assignment = activeSub.assignment;
    const isGraded = sub.status === 'graded';

    // Get current rubric scores or set default weights
    const scores = sub.rubricGrading || {
      content: 20, // default half values
      argument: 15,
      language: 10,
      effort: 5
    };

    const currentGrade = isGraded ? sub.grade : ((scores.content + scores.argument + scores.language + scores.effort) / 10).toFixed(1);

    gradingFormHtml = `
      <div class="glass-card" style="display:flex; flex-direction:column; gap:16px;">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom: 1px solid var(--border-light); padding-bottom:12px;">
          <div>
            <span style="font-size:12px; color:var(--accent-purple); font-weight:700;">ĐANG CHẤM BÀI</span>
            <h3 style="font-size:18px; margin-top:2px;">${assignment.title}</h3>
          </div>
          <div style="text-align:right;">
            <div style="font-size:14px; font-weight:700; color:var(--text-primary);">${student.name}</div>
            <span class="tier-tag ${student.tier}" style="font-size:9px; padding:2px 8px; margin-top:4px;">Nhóm: ${student.tier === 'excellent' ? 'Xuất sắc' : student.tier === 'average' ? 'Trung bình' : 'Cần hỗ trợ'}</span>
          </div>
        </div>

        <div>
          <h4 style="font-size:14px; color:var(--text-secondary); margin-bottom:8px;">Đề bài yêu cầu:</h4>
          <p style="font-size:13px; color:var(--text-muted); line-height:1.5; background:rgba(255,255,255,0.01); border:1px solid var(--border-light); padding:10px 14px; border-radius:8px;">
            ${assignment.questionText}
          </p>
        </div>

        <div>
          <h4 style="font-size:14px; color:var(--text-secondary); margin-bottom:8px;">Bài làm của học viên (Tự luận):</h4>
          <div class="submitted-answer-box">
${escapeHtml(sub.studentAnswer)}
          </div>
        </div>
      </div>

      <div class="glass-card" style="display:flex; flex-direction:column; gap:18px;">
        <h3 style="font-size:16px; border-bottom: 1px solid var(--border-light); padding-bottom:8px;">Tiêu chí chấm điểm (Rubrics)</h3>
        
        <div class="rubric-interactive-list">
          <!-- Content score -->
          <div class="rubric-slider-group">
            <div class="slider-label-row">
              <span class="slider-title">1. Độ chính xác nội dung (Tối đa 40)</span>
              <span class="slider-max"><span id="lbl-score-content">${scores.content}</span> / 40</span>
            </div>
            <input type="range" class="rubric-slider" id="slider-content" min="0" max="40" value="${scores.content}" ${isGraded ? 'disabled' : ''}>
            <div class="slider-description">${assignment.rubric[0].desc}</div>
          </div>

          <!-- Argument score -->
          <div class="rubric-slider-group">
            <div class="slider-label-row">
              <span class="slider-title">2. Lập luận & Phân tích (Tối đa 30)</span>
              <span class="slider-max"><span id="lbl-score-argument">${scores.argument}</span> / 30</span>
            </div>
            <input type="range" class="rubric-slider" id="slider-argument" min="0" max="30" value="${scores.argument}" ${isGraded ? 'disabled' : ''}>
            <div class="slider-description">${assignment.rubric[1].desc}</div>
          </div>

          <!-- Language score -->
          <div class="rubric-slider-group">
            <div class="slider-label-row">
              <span class="slider-title">3. Khả năng diễn đạt & Mã nguồn (Tối đa 20)</span>
              <span class="slider-max"><span id="lbl-score-language">${scores.language}</span> / 20</span>
            </div>
            <input type="range" class="rubric-slider" id="slider-language" min="0" max="20" value="${scores.language}" ${isGraded ? 'disabled' : ''}>
            <div class="slider-description">${assignment.rubric[2].desc}</div>
          </div>

          <!-- Effort score (PROPOSAL FOR FAIR GRADING) -->
          <div class="rubric-slider-group">
            <div class="slider-label-row">
              <span class="slider-title">4. Sự nỗ lực & Cải thiện (Tối đa 10)</span>
              <span class="slider-max"><span id="lbl-score-effort">${scores.effort}</span> / 10</span>
            </div>
            <input type="range" class="rubric-slider" id="slider-effort" min="0" max="10" value="${scores.effort}" ${isGraded ? 'disabled' : ''}>
            <div class="slider-description">Nhằm khích lệ sự nỗ lực vượt khó (đặc biệt quan trọng đối với học viên mất gốc).</div>
          </div>
        </div>

        <div class="grade-visualizer">
          <div>
            <span style="font-size:12px; color:var(--text-secondary); font-weight:600;">ĐIỂM SỐ TÍNH TOÁN:</span>
            <div style="font-size:11px; color:var(--text-muted); margin-top:2px;">Tổng điểm quy đổi về thang 10</div>
          </div>
          <div class="visual-grade-badge"><span id="lbl-final-grade">${currentGrade}</span> / 10</div>
        </div>

        <!-- AI Feedback Draft Generator -->
        <div class="ai-feedback-generation-panel">
          <div class="ai-header-bar">
            <span class="ai-title">
              <svg style="width:14px; height:14px;" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"/>
              </svg>
              AI Feedback Draft Assistant
            </span>
            ${!isGraded ? `<button class="btn-ai-generate" id="btn-generate-feedback">Soạn Thảo Phản Hồi Bằng AI</button>` : ''}
          </div>
          <div style="font-size:11px; color:var(--text-secondary); margin-bottom:8px;">
            AI tự động thiết kế nội dung nhận xét dựa trên điểm rubric và mức độ học lực của học sinh để đảm bảo tính khích lệ, công bằng.
          </div>
          <textarea class="editor-textarea" id="txt-feedback-content" style="min-height: 120px; font-size:12px;" placeholder="Bấm nút soạn phản hồi AI hoặc tự viết nhận xét tại đây..." ${isGraded ? 'readonly' : ''}>${escapeHtml(sub.teacherFeedback)}</textarea>
        </div>

        ${!isGraded ? `
          <button class="action-btn" id="btn-submit-grade" style="width:100%; justify-content:center;">
            <span>LƯU ĐIỂM & GỬI PHẢN HỒI</span>
          </button>
        ` : `
          <div style="display:flex; align-items:center; gap:8px; background:rgba(16,185,129,0.06); border:1px solid rgba(16,185,129,0.2); padding:12px; border-radius:8px; color:var(--tier-excellent); font-size:13px; font-weight:600;">
            <svg style="width:18px; height:18px;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Bài tập này đã được chấm điểm thành công.
          </div>
        `}
      </div>
    `;
  } else {
    gradingFormHtml = `
      <div class="glass-card" style="grid-column: span 2; display:flex; flex-direction:column; justify-content:center; align-items:center; height:300px; color:var(--text-muted);">
        <svg style="width:48px;height:48px;stroke:currentColor;opacity:0.3;margin-bottom:12px;" fill="none" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
        <span>Chưa chọn bài làm nào để chấm.</span>
      </div>
    `;
  }

  container.innerHTML = `
    <div class="grading-split">
      <div class="glass-card" style="display:flex; flex-direction:column; gap:16px; height:fit-content;">
        <div>
          <h3 style="font-size: 18px; margin-bottom:4px;">Danh sách bài nộp</h3>
          <p class="dashboard-title-sub">Tổng số: ${allSubmissions.length} bài đã nộp từ học sinh</p>
        </div>
        <div class="homework-list" style="margin-top: 10px;">
          ${listHtml}
        </div>
      </div>
      
      <div style="display:flex; flex-direction:column; gap:24px;">
        ${gradingFormHtml}
      </div>
    </div>
  `;

  // Attach event handlers
  const submissionItems = container.querySelectorAll('.homework-card-item');
  submissionItems.forEach(item => {
    item.addEventListener('click', () => {
      const studentId = item.getAttribute('data-student-id');
      const assignId = item.getAttribute('data-assign-id');
      renderGrading(containerId, studentId, assignId);
    });
  });

  // Calculate live score adjustments
  if (activeSub && activeSub.submission.status === 'pending') {
    const sliderContent = document.getElementById('slider-content');
    const sliderArgument = document.getElementById('slider-argument');
    const sliderLanguage = document.getElementById('slider-language');
    const sliderEffort = document.getElementById('slider-effort');

    const sliders = [sliderContent, sliderArgument, sliderLanguage, sliderEffort];

    sliders.forEach(slider => {
      slider.addEventListener('input', () => {
        const cVal = parseInt(sliderContent.value);
        const aVal = parseInt(sliderArgument.value);
        const lVal = parseInt(sliderLanguage.value);
        const eVal = parseInt(sliderEffort.value);

        // Update labels
        document.getElementById('lbl-score-content').innerText = cVal;
        document.getElementById('lbl-score-argument').innerText = aVal;
        document.getElementById('lbl-score-language').innerText = lVal;
        document.getElementById('lbl-score-effort').innerText = eVal;

        // Calculate live grade
        const total = cVal + aVal + lVal + eVal;
        const finalGrade = (total / 10).toFixed(1);
        document.getElementById('lbl-final-grade').innerText = finalGrade;
      });
    });

    // AI Feedback Generator Button Click
    const btnGenerate = document.getElementById('btn-generate-feedback');
    if (btnGenerate) {
      btnGenerate.addEventListener('click', () => {
        const cVal = parseInt(sliderContent.value);
        const aVal = parseInt(sliderArgument.value);
        const lVal = parseInt(sliderLanguage.value);
        const eVal = parseInt(sliderEffort.value);
        const total = cVal + aVal + lVal + eVal;
        const finalGrade = total / 10;

        const draft = generateAIFeedbackDraft(activeSub.student, activeSub.assignment, {
          content: cVal,
          argument: aVal,
          language: lVal,
          effort: eVal,
          finalGrade
        });
        
        document.getElementById('txt-feedback-content').value = draft;
      });
    }

    // Submit Grading Button Click
    const btnSubmit = document.getElementById('btn-submit-grade');
    if (btnSubmit) {
      btnSubmit.addEventListener('click', () => {
        const cVal = parseInt(sliderContent.value);
        const aVal = parseInt(sliderArgument.value);
        const lVal = parseInt(sliderLanguage.value);
        const eVal = parseInt(sliderEffort.value);
        const feedback = document.getElementById('txt-feedback-content').value;

        // Grade via state
        stateManager.gradeAssignment(activeSub.student.id, activeSub.assignment.id, {
          content: cVal,
          argument: aVal,
          language: lVal,
          effort: eVal
        }, feedback);

        // Show a popup toast to confirm
        showNotification(`Đã chấm điểm thành công cho học viên ${activeSub.student.name}!`, 'success');

        // Re-render
        renderGrading(containerId, activeSub.student.id, activeSub.assignment.id);
      });
    }
  }
}

// Function to generate the AI draft based on students' performance and tier (Problem 2)
function generateAIFeedbackDraft(student, assignment, scores) {
  const finalGrade = scores.finalGrade;
  
  if (student.tier === 'struggling') {
    // Encouraging and warm feedback structure for struggling student
    let intro = `Chào Vy, cô rất trân trọng nỗ lực của em khi hoàn thành bài tự luận này. Đọc bài làm của em, cô thấy được sự cố gắng lớn để củng cố gốc rễ lập trình.`;
    
    let contentFeedback = '';
    if (scores.content >= 28) {
      contentFeedback = `Em đã hiểu rất tốt ý chính của bài giảng, nắm bắt chính xác logic cốt lõi.`;
    } else {
      contentFeedback = `Mặc dù còn một số khái niệm nhỏ chưa thật sự chính xác, nhưng em đã định hình được ý tưởng cốt lõi. Điều này rất đáng khen ngợi!`;
    }

    let effortFeedback = `Cô đánh giá cao điểm Sự nỗ lực cải thiện của em (${scores.effort}/10). Em đã viết nắn nót, giải thích bằng ngôn ngữ tự nhiên rất dễ hiểu.`;
    
    let advice = '';
    if (finalGrade >= 7.0) {
      advice = `Với kết quả rất khả quan này (${finalGrade}/10), hệ thống đã mở khóa chương tiếp theo là "Mảng & Cấu trúc dữ liệu". Em có thể quay lại Bản đồ học tập để học tiếp ngay. Cố lên nhé, cô tin em đang tiến bộ từng ngày!`;
    } else {
      advice = `Để hiểu rõ hơn và củng cố thêm, em hãy cùng Trợ lý AI ở góc phải màn hình trao đổi về bài tập ôn tập vòng lặp bổ trợ. Chúng ta sẽ cùng nhau tháo gỡ từng bước một!`;
    }

    return `${intro}\n\n- Nhận xét nội dung: ${contentFeedback}\n- Nhận xét sự tiến bộ: ${effortFeedback}\n\nLời khuyên: ${advice}`;
  } 
  
  if (student.tier === 'average') {
    // Constructive growth-mindset feedback for average student
    let intro = `Chào Nam, bài làm của em rất đầy đủ và phong độ ổn định. Em đã hoàn thành tốt các yêu cầu cơ bản của bài tập này.`;
    
    let critique = '';
    if (scores.argument >= 24) {
      critique = `Khả năng phân tích của em tương đối tốt.`;
    } else {
      critique = `Phần giải thích lý thuyết và ví dụ bổ trợ còn hơi sơ sài. Để bứt phá lên nhóm xuất sắc, em cần giải thích sâu hơn về nguyên lý hoạt động của cấu trúc hoặc độ phức tạp.`;
    }

    let boostAdvice = '';
    if (finalGrade >= 8.5) {
      boostAdvice = `Điểm số tuyệt vời (${finalGrade}/10)! Em đã vượt ngưỡng thử thách thành công. Cô đã đặc biệt mở khóa bài học Chuyên sâu Đệ quy nâng cao cho em thử sức. Hãy chứng tỏ năng lực của mình ở mốc học tiếp theo nhé!`;
    } else {
      boostAdvice = `Để bứt phá điểm số cao hơn ở các bài sau, em nên tập trung vào các câu hỏi phụ mang tính tư duy tối ưu trong các bài học "Bứt phá" (Boost). Cố gắng đẩy mạnh tư duy logic hơn nữa nhé!`;
    }

    return `${intro}\n\n- Ưu điểm: Lập trình chạy đúng và viết code tương đối sạch.\n- Điểm cần cải thiện: ${critique}\n\nLộ trình đề xuất: ${boostAdvice}`;
  }

  if (student.tier === 'excellent') {
    // Critical thinking and deep challenge feedback for excellent student
    let intro = `Chào Minh Anh, bài làm xuất sắc như thường lệ. Em nắm bắt tư duy thuật toán vô cùng nhanh và áp dụng lý thuyết vào bài viết rất chuyên nghiệp.`;
    
    let analysis = `Lập luận của em về độ phức tạp bộ nhớ và thuật toán cực kỳ chặt chẽ. Cách em so sánh Big O giữa các thuật toán chứng tỏ tư duy phân tích sâu sắc.`;
    
    let challenge = '';
    if (finalGrade >= 9.5) {
      challenge = `Để thử thách khả năng của em hơn nữa, cô có câu hỏi phụ này: Em nghĩ thuật toán này sẽ bị ảnh hưởng như thế nào nếu dữ liệu đầu vào phân bố theo một mô hình đặc biệt (ví dụ: mảng đã gần sắp xếp hoàn toàn)? Hãy nghiên cứu sâu hơn và thảo luận cùng cô trong giờ sau nhé! Lộ trình của em đã được chuyển thẳng tới Project thực tế nâng cao.`;
    } else {
      challenge = `Hãy chú ý tối ưu hóa hơn nữa về mặt tài nguyên bộ nhớ (space complexity) trong các dòng code mẫu. Em đã hoàn thành phần học này và sẵn sàng chuyển sang phần nâng cao kế tiếp.`;
    }

    return `${intro}\n\n- Nhận xét chi tiết: ${analysis}\n\nThử thách thêm: ${challenge}`;
  }

  return `Chào em, bài làm của em đã được chấm thành công với điểm số là ${finalGrade}/10. Hãy xem bảng phân tích Rubric để biết chi tiết nhé!`;
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
