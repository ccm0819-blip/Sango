import React from 'react';
import { Character } from '../types';
import { Sparkles, MessageSquare, BookOpen, Shield, Feather, Sword, Flame, Zap, Skull, Compass, Handshake, Crown, Target } from 'lucide-react';

interface CharacterCardProps {
  character: Character;
  onSelectDossier: (character: Character) => void;
  onDirectConsult: (character: Character) => void;
}

const getIconComponent = (name: string) => {
  switch (name) {
    case 'Feather': return Feather;
    case 'Sword': return Sword;
    case 'Shield': return Shield;
    case 'Flame': return Flame;
    case 'Zap': return Zap;
    case 'Skull': return Skull;
    case 'Compass': return Compass;
    case 'Handshake': return Handshake;
    case 'Crown': return Crown;
    case 'Target': return Target;
    default: return Sparkles;
  }
};

const getFactionBadge = (faction: Character['faction']) => {
  switch (faction) {
    case 'shu':
      return { text: '蜀漢', bg: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40' };
    case 'wei':
      return { text: '曹魏', bg: 'bg-blue-950/80 text-blue-300 border-blue-500/40' };
    case 'wu':
      return { text: '東吳', bg: 'bg-rose-950/80 text-rose-300 border-rose-500/40' };
    case 'qun':
      return { text: '群雄', bg: 'bg-amber-950/80 text-amber-300 border-amber-500/40' };
  }
};

export const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  onSelectDossier,
  onDirectConsult,
}) => {
  const IconComp = getIconComponent(character.iconName);
  const factionStyle = getFactionBadge(character.faction);

  return (
    <div className="ink-card rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-ink group relative overflow-hidden">
      {/* 陣營底色流光背景 */}
      <div 
        className="absolute -right-12 -top-12 w-32 h-32 rounded-full blur-3xl opacity-15 pointer-events-none group-hover:opacity-30 transition-opacity"
        style={{ backgroundColor: character.accentColor }}
      />

      <div>
        {/* Header: Faction & Courtesy Name */}
        <div className="flex items-center justify-between mb-3">
          <span className={`text-[11px] font-serif px-2.5 py-0.5 rounded-full border ${factionStyle.bg}`}>
            {factionStyle.text}
          </span>
          <span className="text-xs font-serif text-slate-400">
            字 {character.courtesyName}
          </span>
        </div>

        {/* Name & Title */}
        <div className="flex items-start gap-3 mb-3">
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border border-white/10 shadow-md group-hover:scale-105 transition-transform"
            style={{ backgroundColor: `${character.accentColor}20`, borderColor: `${character.accentColor}50` }}
          >
            <IconComp className="w-6 h-6" style={{ color: character.accentColor }} />
          </div>
          <div>
            <h3 className="text-xl font-serif font-bold text-slate-100 group-hover:text-amber-200 transition-colors flex items-center gap-2">
              {character.name}
            </h3>
            <p className="text-xs text-amber-400/90 font-serif line-clamp-1 mt-0.5">
              {character.title}
            </p>
          </div>
        </div>

        {/* 箴言 Quote */}
        <div className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800/80 mb-3 text-xs italic text-slate-300 font-serif leading-relaxed line-clamp-2">
          「{character.quote}」
        </div>

        {/* 思維模型預覽 */}
        <div className="mb-4">
          <div className="text-[11px] uppercase tracking-wider text-slate-500 font-mono mb-1">
            CORE MENTAL MODEL
          </div>
          <div className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: character.accentColor }} />
            {character.mentalModel.name}
          </div>
          <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
            {character.mentalModel.summary}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {character.tags.slice(0, 3).map((tag, idx) => (
            <span 
              key={idx} 
              className="text-[10px] px-2 py-0.5 rounded bg-slate-800/60 text-slate-400 border border-slate-700/50"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-800/80">
        <button
          onClick={() => onSelectDossier(character)}
          className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-xs text-slate-300 font-serif transition-colors"
        >
          <BookOpen className="w-3.5 h-3.5 text-amber-400" />
          檔案 / Skill
        </button>

        <button
          onClick={() => onDirectConsult(character)}
          className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-amber-600/90 hover:bg-amber-500 text-slate-950 font-serif font-bold text-xs shadow-sm transition-all hover:shadow-glow-gold"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          召喚問策
        </button>
      </div>
    </div>
  );
};
