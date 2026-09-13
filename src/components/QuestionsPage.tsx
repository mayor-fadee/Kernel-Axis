import React, { useEffect, useState } from 'react';
import { HelpCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CyberQuestionCard } from './CyberQuestionCard';
import { questionsData } from '../data/questionsData';
import { playSynthBeep } from '../lib/audio';

export const QuestionsPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('network');

  useEffect(() => {
    document.title = 'Cybersecurity Questions | Kernel Axis';
  }, []);

  const categories = [
    { id: 'all', label: 'All Topics' },
    { id: 'network', label: 'Network Security' },
    { id: 'iam', label: 'Identity & Access' },
    { id: 'web', label: 'Web Security' },
    { id: 'crypto', label: 'Cryptography' }
  ];

  const filteredQuestions = questionsData.filter((q) => {
    if (selectedCategory === 'all') return true;
    return q.categoryId === selectedCategory;
  });

  const getCategoryCount = (catId: string) => {
    if (catId === 'all') return questionsData.length;
    return questionsData.filter((q) => q.categoryId === catId).length;
  };

  const activeCategoryLabel = categories.find((c) => c.id === selectedCategory)?.label || 'All Topics';

  return (
    <div className="w-full min-h-screen bg-[#020504] text-zinc-300">
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 sm:space-y-10">
        
        {/* Navigation Breadcrumb / Back button */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
          <button
            onClick={() => {
              playSynthBeep('click');
              navigate('/');
            }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/[0.08] bg-white/[0.02] text-xs font-mono text-zinc-400 hover:text-[#00ff88] hover:border-[#00ff88]/30 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </button>
        </div>

        {/* Page Header */}
        <div className="space-y-3 border-b border-white/[0.08] pb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight">
            Cybersecurity Questions
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-zinc-400 font-sans leading-relaxed max-w-3xl">
            Test your knowledge of essential cybersecurity concepts, threat mechanisms, and defensive protocols with our advanced scenario-based questions.
          </p>
        </div>

        {/* Category Filters Bar */}
        <div className="flex items-center justify-between gap-4 bg-[#040906] border border-white/[0.08] p-3 rounded-xl overflow-hidden">
          <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-none py-1 max-w-full">
            {categories.map((cat) => {
              const count = getCategoryCount(cat.id);
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    playSynthBeep('click');
                    setSelectedCategory(cat.id);
                  }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer flex items-center gap-2 shrink-0 whitespace-nowrap ${
                    selectedCategory === cat.id
                      ? 'bg-[#00ff88]/15 text-[#00ff88] border border-[#00ff88]/40 shadow-sm shadow-[#00ff88]/10'
                      : 'bg-white/[0.02] border border-white/[0.06] text-zinc-400 hover:text-white hover:border-white/[0.2]'
                  }`}
                >
                  <span>{cat.label}</span>
                  {count > 0 && (
                    <span
                      className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                        selectedCategory === cat.id
                          ? 'bg-[#00ff88]/20 text-[#00ff88]'
                          : 'bg-white/[0.06] text-zinc-500'
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="text-xs font-mono text-zinc-500 hidden md:block shrink-0 whitespace-nowrap pl-2">
            Showing <span className="text-white font-bold">{filteredQuestions.length}</span> question{filteredQuestions.length !== 1 ? 's' : ''} in <span className="text-[#00ff88]">{activeCategoryLabel}</span>
          </div>
        </div>

        {/* Main Section: Questions Stream */}
        <div className="space-y-6">
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((q) => (
              <CyberQuestionCard
                key={q.id}
                category={q.category}
                difficulty={q.difficulty}
                question={q.question}
                options={q.options}
                explanation={q.explanation}
                showMoreButton={false}
                showCategoryTag={selectedCategory === 'all'}
              />
            ))
          ) : (
            <div className="p-8 sm:p-12 rounded-2xl border border-white/[0.08] bg-[#040906] text-center space-y-3">
              <HelpCircle className="w-10 h-10 text-zinc-500 mx-auto" />
              <h3 className="text-base sm:text-lg font-display font-bold text-white uppercase tracking-wider">
                Category Questions Coming Soon
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
                Questions for this category are currently being curated. Select "Network Security" or "All Topics" to attempt our live practice questions.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};


