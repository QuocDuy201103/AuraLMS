'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Sparkles, HelpCircle, CheckCircle2, Trophy, ArrowRight, X, Brain } from 'lucide-react';
import confetti from 'canvas-confetti';

interface DiagnosticQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: '1. Bạn đã có kinh nghiệm gì về thuật toán & lập trình trước đây?',
    options: [
      { label: 'Chưa từng lập trình, bắt đầu từ con số 0', points: 2 },
      { label: 'Đã biết biến số, câu lệnh if-else và vòng lặp cơ bản', points: 6 },
      { label: 'Đã làm quen mảng, đệ quy và các cấu trúc dữ liệu', points: 10 },
    ],
  },
  {
    id: 2,
    question: '2. Khi đoạn mã bị lỗi lặp vô tận (Infinite Loop), bạn thường làm gì?',
    options: [
      { label: 'Cần hướng dẫn giải thích từng bước bằng hình ảnh/ví dụ đời thực', points: 2 },
      { label: 'Tự xem lại điều kiện dừng và bước tăng biến i++', points: 6 },
      { label: 'Phân tích độ phức tạp thời gian và dùng Debugger kiểm tra bộ nhớ', points: 10 },
    ],
  },
  {
    id: 3,
    question: '3. Phương pháp nào giúp tìm kiếm một phần tử trong danh sách 1 triệu số đã sắp xếp nhanh nhất?',
    options: [
      { label: 'Duyệt lần lượt từ phần tử đầu tiên tới cuối cùng (O(N))', points: 2 },
      { label: 'Chia đôi danh sách liên tục - Tìm kiếm Nhị phân (O(log N))', points: 6 },
      { label: 'Dùng Bảng băm (Hash Table / Map) truy xuất tức thì O(1) và nhớ kết quả', points: 10 },
    ],
  },
];

export default function DiagnosticQuizModal({ isOpen, onClose }: DiagnosticQuizModalProps) {
  const { currentStudent, updateStudentScore, loginAsStudent } = useApp();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizResult, setQuizResult] = useState<{
    tier: 'struggling' | 'average' | 'excellent';
    score: number;
    title: string;
    description: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleNext = () => {
    if (selectedOption === null) return;
    const newAnswers = [...answers, selectedOption];
    setAnswers(newAnswers);
    setSelectedOption(null);

    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate total score and determine tier
      const totalPoints = newAnswers.reduce((a, b) => a + b, 0);
      const avgScore = Number((totalPoints / 3).toFixed(1));

      let resultTier: 'struggling' | 'average' | 'excellent' = 'average';
      let title = 'Nhóm Khá / Bứt Phá (Average)';
      let description = 'Bạn đã có nền tảng thuật toán khá vững! Hệ thống sẽ gợi ý các mẹo tối ưu và bài tập tăng tốc kỹ thuật Con Trỏ Đôi.';

      if (avgScore <= 4.0) {
        resultTier = 'struggling';
        title = 'Nhóm Cần Hỗ Trợ (Struggling)';
        description = 'Đừng lo lắng! AuraLMS đã tự động kích hoạt giao diện thân thiện, bài học bổ trợ trực quan và Trợ lý AI động viên bạn từng bước.';
      } else if (avgScore >= 8.0) {
        resultTier = 'excellent';
        title = 'Nhóm Xuất Sắc (Excellent)';
        description = 'Ấn tượng! Bạn nắm rất vững tư duy tối ưu bộ nhớ O(1). Hệ thống mở sớm các thử thách Đệ quy & Quy hoạch động nâng cao.';
      }

      setQuizResult({
        tier: resultTier,
        score: avgScore,
        title,
        description,
      });

      // Update student score & trigger confetti
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
      });
    }
  };

  const handleFinish = () => {
    if (quizResult) {
      // Auto select matching student demo account or update active student
      if (quizResult.tier === 'struggling') loginAsStudent('student-vy');
      else if (quizResult.tier === 'average') loginAsStudent('student-nam');
      else loginAsStudent('student-anh');
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-lg w-full glass-panel p-6 sm:p-8 rounded-3xl border border-slate-700/80 shadow-2xl relative space-y-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 via-indigo-500 to-fuchsia-500 p-[2px]">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Brain className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-100">Bài Đánh Giá Năng Lực Đầu Vào (Diagnostic Quiz)</h2>
            <p className="text-xs text-slate-400">Xác định phân nhóm học lực thích ứng tự động (Cần hỗ trợ / Khá / Xuất sắc)</p>
          </div>
        </div>

        {/* Quiz Steps Body */}
        {!quizResult ? (
          <div className="space-y-6">
            {/* Step Progress */}
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Câu hỏi {currentStep + 1} / {QUIZ_QUESTIONS.length}</span>
              <span className="text-emerald-400 font-mono font-bold">
                {Math.round(((currentStep + 1) / QUIZ_QUESTIONS.length) * 100)}%
              </span>
            </div>

            <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-indigo-500 transition-all duration-300"
                style={{ width: `${((currentStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
              />
            </div>

            {/* Current Question */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-100">
                {QUIZ_QUESTIONS[currentStep].question}
              </h3>

              <div className="space-y-2.5">
                {QUIZ_QUESTIONS[currentStep].options.map((opt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedOption(opt.points)}
                    className={`w-full p-3.5 rounded-xl border text-left text-xs font-medium transition-all ${
                      selectedOption === opt.points
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-200 shadow-md'
                        : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Action */}
            <button
              onClick={handleNext}
              disabled={selectedOption === null}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-indigo-600 hover:from-emerald-400 hover:to-indigo-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50"
            >
              <span>{currentStep === QUIZ_QUESTIONS.length - 1 ? 'Xem Phân Nhóm Thích Ứng' : 'Câu Tiếp Theo'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          /* Quiz Result View */
          <div className="text-center space-y-5 py-2">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center">
              <Trophy className="w-8 h-8 text-emerald-400 animate-bounce" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Kết quả đánh giá đầu vào</span>
              <h3 className="text-xl font-extrabold text-slate-100">{quizResult.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed max-w-sm mx-auto">{quizResult.description}</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-left text-xs space-y-1.5">
              <span className="font-bold text-slate-200 block">Hệ thống AuraLMS đã tự động kích hoạt:</span>
              <ul className="text-slate-400 text-[11px] space-y-1 list-disc list-inside">
                <li>Bảng chủ đề giao diện màu sắc cá nhân hóa tương ứng ({quizResult.tier}).</li>
                <li>Mở khóa bài học và lộ trình rẽ nhánh SVG thích ứng.</li>
                <li>Thiết lập phong cách Trợ lý AI Companion phù hợp với tâm lý học viên.</li>
              </ul>
            </div>

            <button
              onClick={handleFinish}
              className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all hover:scale-105"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Vào Học Với Lộ Trình Thích Ứng Của Bạn</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
