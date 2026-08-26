'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Student } from '@/lib/store';
import { Bot, Send, Sparkles, User, RefreshCw, X, MessageSquare } from 'lucide-react';

interface AICompanionProps {
  student: Student;
}

interface Message {
  sender: 'ai' | 'user';
  text: string;
}

export default function AICompanion({ student }: AICompanionProps) {
  const getInitialMessages = (tier: string): Message[] => {
    switch (tier) {
      case 'struggling':
        return [
          {
            sender: 'ai',
            text: `Chào ${student.name}! Mình là Trợ lý Thân Thiện. Đừng lo lắng nếu bài tập Vòng Lặp có chút rối nhé. Hãy cùng chia nhỏ từng bước một, bạn làm rất tốt đấy! 🌟`,
          },
        ];
      case 'average':
        return [
          {
            sender: 'ai',
            text: `Chào ${student.name}! Mình là Trợ lý Tối Ưu. Bạn đang giữ phong độ khá tốt (Điểm TB 8.2). Hãy thử nghiệm kỹ thuật Con Trỏ Đôi để tăng tốc thuật toán nhé! 🚀`,
          },
        ];
      case 'excellent':
        return [
          {
            sender: 'ai',
            text: `Chào ${student.name}! Trợ lý Thách Thức ở đây. Bạn đã hoàn thành đệ quy Fibonacci O(N). Thách thức mới: Bạn có thể giảm không gian bộ nhớ về O(1) không? 💎`,
          },
        ];
      default:
        return [{ sender: 'ai', text: `Chào ${student.name}, bạn cần trợ giúp bài học nào?` }];
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(getInitialMessages(student.tier));
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Sync messages when active student changes
  useEffect(() => {
    setMessages(getInitialMessages(student.tier));
  }, [student.id, student.tier]);

  // Auto scroll to latest message
  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userText = input;
    setInput('');
    setMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setIsTyping(true);

    setTimeout(() => {
      let reply = '';
      const lower = userText.toLowerCase();

      if (student.tier === 'struggling') {
        if (lower.includes('vòng lặp') || lower.includes('loop') || lower.includes('lỗi')) {
          reply =
            'Vòng lặp giống như việc bạn tập thể dục 10 lần vậy! Mỗi lần tăng lên 1 đơn vị. Nếu quên tăng biến i (i++), vòng lặp sẽ chạy mãi không dừng (lặp vô tận). Hãy kiểm tra lại dòng i++ nhé!';
        } else {
          reply = `Tuyệt lắm ${student.name}! Cứ bình tĩnh làm theo hướng dẫn bài học bổ trợ, mình luôn ở đây đồng hành cùng bạn! 🌱`;
        }
      } else if (student.tier === 'average') {
        if (lower.includes('mảng') || lower.includes('con trỏ') || lower.includes('tối ưu')) {
          reply =
            'Để tối ưu mảng, bạn có thể dùng 2 con trỏ left và right bắt đầu từ 2 đầu mảng. Cách này tránh việc lồng 2 vòng lặp (O(N^2)) và đưa về O(N)!';
        } else {
          reply = `Gợi ý dành cho Nam: Đừng chỉ dừng lại ở cách giải thông thường, hãy suy nghĩ xem có thể cắt giảm thêm thời gian thực thi không nhé! ⚡`;
        }
      } else {
        if (lower.includes('đệ quy') || lower.includes('bộ nhớ') || lower.includes('fibonacci')) {
          reply =
            'Chính xác! Thay vì dùng mảng đệ quy lưu trữ toàn bộ N kết quả, ta chỉ cần 2 biến cuộn `prev` và `curr` để tính số tiếp theo. Nhờ đó bộ nhớ tiêu tốn giảm về O(1)!';
        } else {
          reply = `Thử thách cho Anh: Hãy viết chương trình kiểm tra chuỗi Palindrome bằng quy hoạch động trong dưới 10 dòng code! 🔥`;
        }
      }

      setMessages((prev) => [...prev, { sender: 'ai', text: reply }]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <>
      {/* FLOATING BOT TRIGGER BUTTON - Fixed Bottom Right */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative group w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 via-indigo-500 to-fuchsia-500 p-[2px] shadow-2xl shadow-emerald-500/30 transition-transform duration-300 hover:scale-110 active:scale-95"
          title="Mở Trợ lý AI Thích ứng"
        >
          <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            {isOpen ? (
              <X className="w-6 h-6 text-slate-200" />
            ) : (
              <div className="relative">
                <Bot className="w-6 h-6 text-emerald-400 animate-pulse" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-950 animate-ping" />
              </div>
            )}
          </div>
        </button>
      </div>

      {/* FLOATING CHAT WINDOW POPUP */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-[380px] h-[500px] max-h-[75vh] z-50 rounded-3xl border border-slate-700/80 shadow-2xl glass-panel flex flex-col overflow-hidden backdrop-blur-xl animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="px-4 py-3.5 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-400 via-indigo-500 to-fuchsia-500 p-[2px]">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Bot className="w-4 h-4 text-emerald-400" />
                </div>
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
                  AI Companion
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase">
                    {student.tier}
                  </span>
                </h3>
                <p className="text-[10px] text-slate-400">Trợ lý học tập riêng cho {student.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setMessages(getInitialMessages(student.tier))}
                className="text-slate-400 hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
                title="Làm mới hội thoại"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
                title="Đóng cửa sổ chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-grow p-4 overflow-y-auto space-y-3 bg-slate-950/40">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs ${
                    msg.sender === 'user'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-900 border border-slate-700 text-emerald-400'
                  }`}
                >
                  {msg.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5" />}
                </div>
                <div
                  className={`p-3 rounded-2xl max-w-[85%] text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-indigo-600 text-slate-100 rounded-tr-none shadow-sm'
                      : 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-tl-none shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-slate-400 italic">
                <Sparkles className="w-3.5 h-3.5 animate-spin text-emerald-400" /> AI Companion đang soạn phản hồi...
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Form Input */}
          <form onSubmit={handleSend} className="p-3 border-t border-slate-800 bg-slate-950 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Đặt câu hỏi cho AI...`}
              className="flex-grow px-3 py-2 rounded-xl glass-input text-xs text-slate-100 placeholder-slate-500 focus:outline-none"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="p-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 transition-all shadow-md shadow-emerald-500/20"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
