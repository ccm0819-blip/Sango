import React, { useState } from 'react';
import { Character } from '../types';
import { X, Copy, Check, MessageSquare, BookOpen, ShieldCheck, Sparkles } from 'lucide-react';

interface CharacterModalProps {
  character: Character | null;
  onClose: () => void;
  onConsult: (character: Character) => void;
}

export const CharacterModal: React.FC<CharacterModalProps> = ({
  character,
  onClose,
  onConsult,
}) => {
  const [copied, setCopied] = useState(false);

  if (!character) return null;

  const handleCopySkill = () => {
    navigator.clipboard.writeText(character.systemPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto ink-card border border-slate-700/80 rounded-2xl shadow-2xl p-6 sm:p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Character Title Header */}
        <div className="flex items-start gap-4 mb-6">
          <div 
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl font-serif font-black shadow-lg border shrink-0"
            style={{ 
              backgroundColor: `${character.accentColor}25`,
              borderColor: `${character.accentColor}60`,
              color: character.accentColor 
            }}
          >
            {character.name[0]}
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-2xl font-serif font-bold text-slate-100">
                {character.name}
              </h2>
              <span className="text-sm font-serif text-slate-400">
                （字 {character.courtesyName}）
              </span>
              <span className="chinese-seal text-xs">
                {character.faction === 'shu' ? '蜀' : character.faction === 'wei' ? '魏' : character.faction === 'wu' ? '吳' : '漢'}
              </span>
            </div>
            <p className="text-sm text-amber-400 font-serif">
              {character.title}
            </p>
          </div>
        </div>

        {/* 策士箴言 */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 mb-6 font-serif italic text-sm text-amber-100/90 leading-relaxed">
          「{character.quote}」
        </div>

        {/* 策士核心定位 */}
        <div className="mb-6">
          <h4 className="text-xs uppercase tracking-wider text-slate-400 font-mono mb-2 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-400" />
            策士定位與擅長領域
          </h4>
          <p className="text-sm text-slate-300 leading-relaxed">
            {character.description}
          </p>
        </div>

        {/* 核心思維模型 Mental Model */}
        <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-mono">
              MENTAL MODEL 核心思維架構
            </span>
            <span className="text-xs font-serif font-bold text-amber-300">
              {character.mentalModel.name}
            </span>
          </div>
          <p className="text-xs text-slate-300 mb-3 leading-relaxed">
            {character.mentalModel.summary}
          </p>
          <div className="space-y-1.5 border-t border-slate-800/80 pt-2.5">
            {character.mentalModel.principles.map((rule, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-400">
                <span className="text-amber-500 font-mono font-bold">0{idx + 1}.</span>
                <span>{rule}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 歷史戰績 */}
        <div className="mb-6">
          <h4 className="text-xs uppercase tracking-wider text-slate-400 font-mono mb-2 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            千古傳世戰績
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {character.historicalFeats.map((feat, idx) => (
              <div key={idx} className="text-xs p-2 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-300 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                {feat}
              </div>
            ))}
          </div>
        </div>

        {/* Agent Skill / System Prompt Block */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs uppercase tracking-wider text-slate-400 font-mono flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              AGENT SKILL / PROMPT 規格
            </h4>
            <button
              onClick={handleCopySkill}
              className="flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">已複製 Prompt</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>一鍵複製 Prompt</span>
                </>
              )}
            </button>
          </div>
          <pre className="text-[11px] p-3 rounded-xl bg-black/60 border border-slate-800 text-slate-300 font-mono whitespace-pre-wrap max-h-36 overflow-y-auto">
            {character.systemPrompt}
          </pre>
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-serif text-slate-400 hover:text-slate-200 transition-colors"
          >
            關閉
          </button>
          <button
            onClick={() => {
              onClose();
              onConsult(character);
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 font-serif font-bold text-xs shadow-glow-gold transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            即刻召喚 {character.name} 問策
          </button>
        </div>
      </div>
    </div>
  );
};
