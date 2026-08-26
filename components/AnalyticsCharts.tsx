'use client';

import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';
import { Radar, Line } from 'react-chartjs-2';
import { Student } from '@/lib/store';
import { Target, TrendingUp } from 'lucide-react';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

interface AnalyticsChartsProps {
  student: Student;
}

export default function AnalyticsCharts({ student }: AnalyticsChartsProps) {
  // Primary color based on tier
  const getThemeColor = (tier: string) => {
    switch (tier) {
      case 'struggling':
        return { border: 'rgba(16, 185, 129, 1)', bg: 'rgba(16, 185, 129, 0.25)' };
      case 'average':
        return { border: 'rgba(99, 102, 241, 1)', bg: 'rgba(99, 102, 241, 0.25)' };
      case 'excellent':
        return { border: 'rgba(217, 70, 239, 1)', bg: 'rgba(217, 70, 239, 0.25)' };
      default:
        return { border: 'rgba(16, 185, 129, 1)', bg: 'rgba(16, 185, 129, 0.25)' };
    }
  };

  const theme = getThemeColor(student.tier);

  const radarData = {
    labels: ['Kiến thức nền', 'Logic Thuật toán', 'Diễn đạt', 'Kiên trì'],
    datasets: [
      {
        label: `Năng lực ${student.name}`,
        data: [
          student.skills.knowledge,
          student.skills.logic,
          student.skills.presentation,
          student.skills.consistency,
        ],
        backgroundColor: theme.bg,
        borderColor: theme.border,
        borderWidth: 2,
        pointBackgroundColor: theme.border,
        pointBorderColor: '#fff',
      },
    ],
  };

  const radarOptions = {
    scales: {
      r: {
        angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        pointLabels: { color: '#cbd5e1', font: { size: 11 } },
        ticks: { color: '#94a3b8', backdropColor: 'transparent', stepSize: 20 },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const lineData = {
    labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
    datasets: [
      {
        label: 'Điểm số TB',
        data: student.weeklyScores,
        borderColor: theme.border,
        backgroundColor: theme.bg,
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    scales: {
      y: {
        min: 0,
        max: 10,
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#94a3b8' },
      },
      x: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#94a3b8' },
      },
    },
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Radar Chart */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-slate-100">Biểu Đồ Mạng Nhện Năng Lực</h3>
          </div>
          <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">4 Khía Cạnh</span>
        </div>
        <div className="h-64 flex items-center justify-center">
          <Radar data={radarData} options={radarOptions} />
        </div>
      </div>

      {/* Line Chart */}
      <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm font-bold text-slate-100">Xu Hướng Điểm Số 7 Ngày</h3>
          </div>
          <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">Thang 10</span>
        </div>
        <div className="h-64 flex items-center justify-center">
          <Line data={lineData} options={lineOptions} />
        </div>
      </div>
    </div>
  );
}
