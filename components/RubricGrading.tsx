'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Student } from '@/lib/store';
import { Sliders, Sparkles, Send, CheckCircle2, Award } from 'lucide-react';

interface RubricGradingProps {
  student: Student;
  assignmentTitle: string;
  submissionAnswer?: string;
  onGradeSubmit?: (finalScore: number, feedback: string) => void;
}

export default function RubricGrading({
  student,
  assignmentTitle,
  submissionAnswer = 'Thưa thầy/cô, em đã viết thuật toán kiểm tra vòng lặp for từ 1 đến N và tính tổng các số chia hết cho 3...',
  onGradeSubmit,
}: RubricGradingProps) {
  const router = useRouter();
  const [content, setContent] = useState(30); // max 40
  const [argument, setArgument] = useState(22); // max 30
  const [language, setLanguage] = useState(15); // max 20
  const [effort, setEffort] = useState(9); // max 10

  const [feedback, setFeedback] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const totalPoints = content + argument + language + effort;
  const finalScore = Number((totalPoints / 10).toFixed(1));

  // AI Feedback Assistant auto generator
  const generateAIFeedback = () => {
    setIsGenerating(true);
    setTimeout(() => {
      let draft = '';
      if (student.tier === 'struggling') {
        draft = `Chào Vy, thầy/cô ghi nhận sự nỗ lực rất lớn của em (${effort}/10 điểm nỗ lực)! Bài làm thuật toán đã nắm được ý chính (${content}/40). Hãy tiếp tục duy trì tinh thần tự học này nhé! 🌟`;
      } else if (student.tier === 'average') {
        draft = `Bài làm của Nam có lập luận khá chặt chẽ (${argument}/30). Điểm nỗ lực tốt (${effort}/10). Lần tới em có thể tối ưu thêm độ phức tạp bộ nhớ để bài hoàn hảo hơn! 🚀`;
      } else {
        draft = `Bài luận của Anh rất xuất sắc (${totalPoints}/100)! Ngôn từ chuyên môn chuẩn xác (${language}/20) và tư duy giải thuật tối ưu ấn tượng. Thầy/cô khuyến khích em thử sức bài đệ quy nâng cao! 💎`;
      }
      setFeedback(draft);
      setIsGenerating(false);
    }, 400);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onGradeSubmit) {
      onGradeSubmit(finalScore, feedback);
    }
    router.push('/thank-you');
  };

  return (
    <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
            Interactive Rubrics
          </span>
          <h2 className="text-base font-bold text-slate-100 mt-1">Chấm Điểm Bài Tập: {assignmentTitle}</h2>
          <p className="text-xs text-slate-400">Học viên: <strong className="text-slate-200">{student.name}</strong></p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-black text-emerald-400 font-mono">{finalScore} / 10</div>
          <span className="text-[10px] text-slate-400">Tổng: {totalPoints}/100 điểm</span>
        </div>
      </div>

      {/* Student Answer Box */}
      <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
        <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
          <Award className="w-3.5 h-3.5 text-indigo-400" /> Bài làm của học sinh:
        </span>
        <p className="text-xs text-slate-300 italic leading-relaxed bg-slate-950/60 p-3 rounded-lg border border-slate-800">
          &quot;{submissionAnswer}&quot;
        </p>
      </div>

      {/* 4 Rubric Sliders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Criterion 1: Content (40%) */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
          <div className="flex justify-between text-xs">
            <span className="font-bold text-slate-200">1. Nội dung chính xác (40%)</span>
            <span className="font-mono text-emerald-400 font-bold">{content} / 40</span>
          </div>
          <input
            type="range"
            min="0"
            max="40"
            value={content}
            onChange={(e) => setContent(Number(e.target.value))}
            className="w-full accent-emerald-500 cursor-pointer"
          />
        </div>

        {/* Criterion 2: Argument (30%) */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
          <div className="flex justify-between text-xs">
            <span className="font-bold text-slate-200">2. Lập luận & Logic (30%)</span>
            <span className="font-mono text-indigo-400 font-bold">{argument} / 30</span>
          </div>
          <input
            type="range"
            min="0"
            max="30"
            value={argument}
            onChange={(e) => setArgument(Number(e.target.value))}
            className="w-full accent-indigo-500 cursor-pointer"
          />
        </div>

        {/* Criterion 3: Language (20%) */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
          <div className="flex justify-between text-xs">
            <span className="font-bold text-slate-200">3. Ngôn từ diễn đạt (20%)</span>
            <span className="font-mono text-fuchsia-400 font-bold">{language} / 20</span>
          </div>
          <input
            type="range"
            min="0"
            max="20"
            value={language}
            onChange={(e) => setLanguage(Number(e.target.value))}
            className="w-full accent-fuchsia-500 cursor-pointer"
          />
        </div>

        {/* Criterion 4: Effort (10%) */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
          <div className="flex justify-between text-xs">
            <span className="font-bold text-slate-200">4. Nỗ lực & Tiến bộ (10%)</span>
            <span className="font-mono text-amber-400 font-bold">{effort} / 10</span>
          </div>
          <input
            type="range"
            min="0"
            max="10"
            value={effort}
            onChange={(e) => setEffort(Number(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />
        </div>
      </div>

      {/* AI Feedback Assistant */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-200">Lời phê cá nhân hóa cho học viên:</label>
          <button
            type="button"
            onClick={generateAIFeedback}
            disabled={isGenerating}
            className="px-3 py-1 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-500/30 text-indigo-300 text-xs font-semibold flex items-center gap-1.5 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-spin" />
            <span>Tự Soạn Lời Phê (AI Assistant)</span>
          </button>
        </div>
        <textarea
          rows={3}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Nhập nhận xét của giáo viên hoặc bấm nút AI soạn lời phê tự động..."
          className="w-full p-3 rounded-xl glass-input text-xs text-slate-100 placeholder-slate-400 focus:outline-none"
        />
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          onClick={handleSubmit}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-indigo-600 hover:from-emerald-400 hover:to-indigo-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.01]"
        >
          <Send className="w-4 h-4" />
          <span>Gửi Kết Quả Chấm Điểm & Cập Nhật Lộ Trình Thích Ứng</span>
        </button>
      </div>
    </div>
  );
}
