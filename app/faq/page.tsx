'use client';

import React, { useState } from 'react';
import JsonLd from '@/components/JsonLd';
import { INITIAL_FAQS } from '@/lib/store';
import { HelpCircle, Search, ChevronDown, Sparkles, BookOpen, Clock, ShieldCheck } from 'lucide-react';

export default function FAQPage() {
  const [search, setSearch] = useState('');
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const filteredFaqs = INITIAL_FAQS.filter(
    (faq) =>
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase()) ||
      faq.category.toLowerCase().includes(search.toLowerCase())
  );

  // Structured Data JSON-LD for Google SEO Rich Snippet
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: INITIAL_FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <JsonLd data={faqJsonLd} />

      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Giải Đáp Thắc Mắc</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-100 sm:text-4xl">
          Câu Hỏi Thường Gặp (<span className="text-emerald-400">FAQs</span>)
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
          Tất cả thông tin chi tiết về cơ chế lộ trình thích ứng, trợ lý AI đa tính cách, hệ thống Rubrics chấm điểm và cam kết thời gian phản hồi của AuraLMS.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md mx-auto">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm kiếm câu hỏi (lộ trình, AI, rubrics, 131ms...)"
          className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs text-slate-100 placeholder-slate-400 focus:outline-none"
        />
      </div>

      {/* Categories Summary Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="glass-panel p-3 rounded-xl border border-slate-800 text-center space-y-1">
          <BookOpen className="w-5 h-5 text-emerald-400 mx-auto" />
          <h2 className="text-xs font-bold text-slate-200">Lộ Trình</h2>
          <p className="text-[10px] text-slate-400">Rẽ nhánh SVG</p>
        </div>
        <div className="glass-panel p-3 rounded-xl border border-slate-800 text-center space-y-1">
          <Sparkles className="w-5 h-5 text-indigo-400 mx-auto" />
          <h2 className="text-xs font-bold text-slate-200">AI Companion</h2>
          <p className="text-[10px] text-slate-400">Đa tính cách</p>
        </div>
        <div className="glass-panel p-3 rounded-xl border border-slate-800 text-center space-y-1">
          <ShieldCheck className="w-5 h-5 text-fuchsia-400 mx-auto" />
          <h2 className="text-xs font-bold text-slate-200">Rubrics</h2>
          <p className="text-[10px] text-slate-400">4 Tiêu chí</p>
        </div>
        <div className="glass-panel p-3 rounded-xl border border-slate-800 text-center space-y-1">
          <Clock className="w-5 h-5 text-amber-400 mx-auto" />
          <h2 className="text-xs font-bold text-slate-200">SLA 131ms</h2>
          <p className="text-[10px] text-slate-400">Phản hồi siêu tốc</p>
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.length === 0 ? (
          <div className="glass-panel p-8 rounded-2xl text-center text-slate-400 text-xs">
            Không tìm thấy câu hỏi phù hợp với từ khóa &quot;{search}&quot;.
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`glass-panel rounded-2xl border transition-all duration-200 ${
                  isOpen ? 'border-emerald-500/40 shadow-lg shadow-emerald-500/5' : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left gap-4"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                      {faq.category}
                    </span>
                    <h3 className="text-sm font-bold text-slate-100">{faq.question}</h3>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-emerald-400' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 pt-1 text-xs text-slate-300 border-t border-slate-800/60 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
