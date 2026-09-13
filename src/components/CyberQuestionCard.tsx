import React, { useState } from 'react';
import { Check, X, ArrowRight, HelpCircle, RotateCcw, ShieldCheck } from 'lucide-react';
import { playSynthBeep } from '../lib/audio';

export interface QuestionOption {
  id: string;
  label: string; // 'A', 'B', 'C', 'D'
  text: string;
  isCorrect: boolean;
}

export interface CyberQuestionProps {
  category?: string;
  difficulty?: string;
  question: string;
  options: QuestionOption[];
  explanation: string;
  showMoreButton?: boolean;
  showCategoryTag?: boolean;
  onNavigateMore?: () => void;
}

export const CyberQuestionCard: React.FC<CyberQuestionProps> = ({
  category = 'IDENTITY & ACCESS MANAGEMENT',
  difficulty = 'FUNDAMENTAL',
  question,
  options,
  explanation,
  showMoreButton = true,
  showCategoryTag = true,
  onNavigateMore,
}) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  const handleSelectOption = (optionId: string) => {
    if (selectedOptionId !== null) return; // Prevent changing after selected
    playSynthBeep('click');
    setSelectedOptionId(optionId);
  };

  const handleReset = () => {
    playSynthBeep('click');
    setSelectedOptionId(null);
  };

  const isAnswered = selectedOptionId !== null;
  const selectedOption = options.find((o) => o.id === selectedOptionId);
  const isCorrect = selectedOption?.isCorrect ?? false;

  return (
    <div className="w-full bg-[#040906] border border-[#00ff88]/20 hover:border-[#00ff88]/30 transition-all duration-300 rounded-2xl p-5 sm:p-7 md:p-8 shadow-[0_0_30px_rgba(0,0,0,0.6)] relative overflow-hidden group">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#00ff88]/[0.02] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#00ff88]/[0.015] rounded-full blur-3xl pointer-events-none" />

      {/* Header bar */}
      {showCategoryTag && (
        <div className="flex items-center justify-between gap-2 pb-4 mb-5 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#00ff88]/10 text-[#00ff88] border border-[#00ff88]/20">
              <HelpCircle className="w-4 h-4" />
            </span>
            <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider text-[#00ff88]/90">
              {category}
            </span>
          </div>
        </div>
      )}

      {/* Question Text */}
      <div className="mb-6 space-y-2">
        <h3 className="text-base sm:text-lg md:text-xl font-display font-bold text-white leading-snug tracking-tight">
          {question}
        </h3>
        <p className="text-xs text-zinc-400 font-sans">
          Select the correct answer from the choices below:
        </p>
      </div>

      {/* Options List */}
      <div className="space-y-3 mb-6">
        {options.map((option) => {
          const isSelected = selectedOptionId === option.id;
          let containerStyle =
            'border-white/[0.08] bg-[#070e0a]/80 text-zinc-300 hover:border-[#00ff88]/40 hover:bg-[#00ff88]/5 cursor-pointer';
          let badgeStyle = 'bg-[#00ff88]/15 text-[#00ff88] border border-[#00ff88]/30 font-semibold';
          let icon = null;

          if (isAnswered) {
            if (option.isCorrect) {
              containerStyle =
                'border-[#00ff88] bg-[#00ff88]/10 text-white shadow-[0_0_20px_rgba(0,255,136,0.15)] cursor-default';
              badgeStyle = 'bg-[#00ff88] text-black font-bold';
              icon = <Check className="w-4 h-4 text-black stroke-[3]" />;
            } else if (isSelected && !option.isCorrect) {
              containerStyle =
                'border-rose-500 bg-rose-500/10 text-rose-200 shadow-[0_0_20px_rgba(244,63,94,0.15)] cursor-default';
              badgeStyle = 'bg-rose-500 text-white font-bold';
              icon = <X className="w-4 h-4 text-white stroke-[3]" />;
            } else {
              containerStyle = 'opacity-40 border-white/[0.04] bg-white/[0.01] text-zinc-500 cursor-default';
              badgeStyle = 'bg-white/[0.04] text-zinc-600';
            }
          }

          return (
            <button
              key={option.id}
              onClick={() => handleSelectOption(option.id)}
              disabled={isAnswered}
              className={`w-full flex items-center justify-between p-3.5 sm:p-4 rounded-xl border text-left transition-all duration-200 select-none group ${containerStyle}`}
            >
              <div className="flex items-center gap-3.5 pr-2">
                <span
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center font-mono text-xs sm:text-sm shrink-0 transition-colors ${badgeStyle}`}
                >
                  {icon || option.label}
                </span>
                <span className="text-xs sm:text-sm font-sans font-medium leading-relaxed">
                  {option.text}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Explanation Banner when answered */}
      {isAnswered && (
        <div
          className={`p-4 rounded-xl border mb-6 transition-all animate-fadeIn ${
            isCorrect
              ? 'bg-[#00ff88]/10 border-[#00ff88]/30 text-emerald-200'
              : 'bg-rose-500/10 border-rose-500/30 text-rose-200'
          }`}
        >
          <div className="flex items-start gap-3">
            <span
              className={`p-1 rounded-full shrink-0 mt-0.5 ${
                isCorrect ? 'bg-[#00ff88]/20 text-[#00ff88]' : 'bg-rose-500/20 text-rose-400'
              }`}
            >
              {isCorrect ? <ShieldCheck className="w-4 h-4" /> : <X className="w-4 h-4" />}
            </span>
            <div className="space-y-1">
              <h4 className="text-xs sm:text-sm font-display font-bold uppercase tracking-wider">
                {isCorrect ? 'Correct Answer' : 'Incorrect Answer'}
              </h4>
              <p className="text-xs font-sans text-zinc-300 leading-relaxed">
                {explanation}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Action Footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        {isAnswered && (
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-white/[0.1] bg-white/[0.02] text-zinc-300 hover:text-white hover:bg-white/[0.06] hover:border-white/[0.2] transition-all text-xs font-mono font-medium cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#00ff88]" />
            <span>Try Again</span>
          </button>
        )}

        {showMoreButton && (
          <button
            onClick={onNavigateMore}
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-lg bg-[#00ff88] text-black hover:bg-[#00e67a] shadow-[0_0_15px_rgba(0,255,136,0.2)] hover:shadow-[0_0_22px_rgba(0,255,136,0.35)] transition-all text-xs sm:text-sm font-brand font-bold uppercase tracking-wider cursor-pointer ml-auto select-none"
          >
            <span>Answer More Questions</span>
            <ArrowRight className="w-4 h-4 text-black shrink-0" />
          </button>
        )}
      </div>
    </div>
  );
};
