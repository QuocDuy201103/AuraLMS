import { stateManager } from '../state.js';

let skillsChart = null;
let performanceChart = null;

export function renderAnalytics(skillsCanvasId, performanceCanvasId) {
  const student = stateManager.getStudent();
  if (!student) return;

  const ctxSkills = document.getElementById(skillsCanvasId);
  const ctxPerformance = document.getElementById(performanceCanvasId);

  if (!ctxSkills || !ctxPerformance) return;

  // Clean up existing charts to prevent memory leaks and hover issues
  if (skillsChart) {
    skillsChart.destroy();
  }
  if (performanceChart) {
    performanceChart.destroy();
  }

  // Define tier colors for styling
  let primaryColor = '#8b5cf6'; // default purple
  let glowColor = 'rgba(139, 92, 246, 0.2)';
  
  if (student.tier === 'excellent') {
    primaryColor = '#10b981'; // Emerald
    glowColor = 'rgba(16, 185, 129, 0.2)';
  } else if (student.tier === 'average') {
    primaryColor = '#3b82f6'; // Blue
    glowColor = 'rgba(59, 130, 246, 0.2)';
  } else if (student.tier === 'struggling') {
    primaryColor = '#f97316'; // Orange
    glowColor = 'rgba(249, 115, 22, 0.2)';
  }

  // --- 1. SKILLS RADAR CHART ---
  skillsChart = new Chart(ctxSkills, {
    type: 'radar',
    data: {
      labels: ['Kiến thức nền', 'Tư duy Logic', 'Kỹ năng Trình bày', 'Độ Kiên trì'],
      datasets: [{
        label: 'Điểm kỹ năng (%)',
        data: [
          student.skills.knowledge,
          student.skills.logic,
          student.skills.presentation,
          student.skills.consistency
        ],
        backgroundColor: glowColor,
        borderColor: primaryColor,
        borderWidth: 2,
        pointBackgroundColor: primaryColor,
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: primaryColor
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        r: {
          angleLines: {
            color: 'rgba(255, 255, 255, 0.08)'
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.08)'
          },
          pointLabels: {
            color: '#a1a1aa',
            font: {
              size: 11,
              weight: 'bold'
            }
          },
          ticks: {
            display: false,
            stepSize: 20
          },
          min: 0,
          max: 100
        }
      }
    }
  });

  // --- 2. PERFORMANCE TREND CHART (MIXED BAR/LINE) ---
  const days = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ Nhật'];
  
  // Align data arrays to 7 days
  const studyTimeData = student.weeklyStudyTime;
  const scoresData = student.weeklyScores;

  performanceChart = new Chart(ctxPerformance, {
    type: 'bar',
    data: {
      labels: days,
      datasets: [
        {
          label: 'Thời gian học (Phút)',
          data: studyTimeData,
          backgroundColor: 'rgba(139, 92, 246, 0.35)',
          borderColor: 'rgba(139, 92, 246, 0.8)',
          borderWidth: 1,
          borderRadius: 4,
          yAxisID: 'yStudy',
          order: 2
        },
        {
          label: 'Điểm số trung bình',
          data: scoresData,
          type: 'line',
          borderColor: primaryColor,
          backgroundColor: 'transparent',
          borderWidth: 3,
          pointBackgroundColor: '#fff',
          pointBorderWidth: 2,
          pointBorderColor: primaryColor,
          tension: 0.35,
          yAxisID: 'yScores',
          order: 1
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: '#a1a1aa',
            font: {
              size: 11
            }
          }
        }
      },
      scales: {
        x: {
          grid: {
            display: false
          },
          ticks: {
            color: '#a1a1aa'
          }
        },
        yStudy: {
          type: 'linear',
          position: 'left',
          title: {
            display: true,
            text: 'Thời gian học (phút)',
            color: '#a1a1aa'
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.05)'
          },
          ticks: {
            color: '#a1a1aa'
          },
          min: 0
        },
        yScores: {
          type: 'linear',
          position: 'right',
          title: {
            display: true,
            text: 'Thang điểm 10',
            color: '#a1a1aa'
          },
          grid: {
            display: false // only show grid lines for left axis
          },
          ticks: {
            color: '#a1a1aa'
          },
          min: 0,
          max: 10
        }
      }
    }
  });
}
